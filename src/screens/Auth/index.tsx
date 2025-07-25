import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TextField } from "../../Components/TextField";
import {
  emptyErrors,
  emptyRegisterFormData,
  registerDataFields,
} from "./DataField";
import { RForm } from "./type";
import Text from "../../Components/Text";
import { useNavigate, useSearchParams } from "react-router-dom";
import AllRoutes from "../../AppRoute/AllRoutes";
import { Button } from "../../Components/Button";
import apiCall from "../../helpers/apiCall";
import AuthService from "../../services/Auth";
import { toast } from "react-toastify";
import { Some } from "../../helpers/Some";
import { useAuthStore } from "../../store";
import { toCred } from "../../store/authStore";

enum AuthPage {
  Login = "login",
  Register = "register",
}

const Auth = () => {
  const { signIn } = useAuthStore();
  const [formData, setFormData] = useState<RForm>(emptyRegisterFormData);
  const [params] = useSearchParams();
  const isRegister = params.get("type") === AuthPage.Register;

  const [errors, setErrors] = useState<Record<string, string>>(emptyErrors);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function validateField<T extends keyof RForm>(key: T, value: RForm[T]) {
    let error = "";
    if (key === "avatar") return error;

    switch (key) {
      case "name":
        error =
          value?.toString()?.length! >= 4
            ? value?.toString()?.length! <= 50
              ? ""
              : "Name must have maximum 50 characters"
            : "Name must have minimum 4 characters";
        break;
      case "email":
        error = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value as string)
          ? ""
          : "Invalid email";
        break;
      case "password":
        error =
          (value as string).length >= 6
            ? ""
            : "Password must be at least 6 characters";
        break;
    }

    return error;
  }

  function handleChange<T extends keyof RForm>(key: T, value: RForm[T]) {
    setFormData((prev) => ({ ...prev, [key]: value }));

    if (errors[key]) {
      const newError = validateField(key, value);
      setErrors((prev) => ({ ...prev, [key]: newError }));
    }
  }

  function handleBlur<T extends keyof RForm>(key: T) {
    const value = formData[key];
    const error = validateField(key, value);
    setErrors((prev) => ({ ...prev, [key]: error }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    if (!isRegister) {
      const apiData = {
        data: {
          email: formData.email,
          password: formData.password,
        },
      };

      apiCall({
        fn: () => AuthService.login(apiData),
        onSuccess: (res) => {
          const creds = toCred(res);
          signIn(creds);
          navigate(`${AllRoutes.PRIVATE.HOME.path}`);
          toast.success("Login Successful");
        },
        onError: (d) => {
          toast.error(d?.message || "Something went wrong", {
            toastId: "error",
          });
        },
        afterCall: () => setLoading(false),
      });
      return;
    }

    try {
      let avatarUrl = "";
      if (formData.avatar) {
        const fd = new FormData();
        fd.append("file", formData.avatar);
        fd.append("upload_preset", "upload");
        fd.append("cloud_name", "dtl3zxaep");

        const resp = await AuthService.uploadFile({ data: fd });
        avatarUrl = resp.data.secure_url || resp.data.url;
      }

      const registrationData = {
        data: {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          avatar: avatarUrl,
        },
      };

      await AuthService.register(registrationData);
      toast.success("Registration successful");
      params.set("type", AuthPage.Login);
      navigate(`${AllRoutes.PUBLIC.AUTH.path}?${params.toString()}`);
    } catch (err: any) {
      toast.error(
        Array.isArray(err?.message)
          ? Some.Array(err?.message).join(",")
          : err?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex justify-center items-center p-4">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md bg-white/80 backdrop-blur-lg shadow-xl rounded-3xl px-8 py-10 space-y-6 border border-white/30"
      >
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-semibold text-center text-gray-700"
        >
          {!isRegister ? "Login" : "Create an Account"}
        </motion.h2>

        <AnimatePresence mode="wait">
          {registerDataFields.map((field, i) => {
            if (
              !isRegister &&
              (field.key === "name" || field.key === "avatar")
            ) {
              return null;
            }

            return (
              <motion.div
                key={field.key}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ delay: 0.05 * i }}
              >
                <TextField
                  type={field.type}
                  label={field.label}
                  value={formData[field.key]}
                  placeholder={field.placeholder}
                  onChange={(val) => handleChange(field.key, val)}
                  onBlur={() => handleBlur(field.key)}
                  required={field.required}
                  error={errors[field.key]}
                  disabled={loading}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>

        <AnimatePresence>
          {isRegister && (
            <motion.div
              key="avatar"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 20, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Avatar
              </label>
              <input
                key={preview?.toString()}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const { files } = e.target;
                  if (files) {
                    const file = files[0];
                    setFormData((prev) => ({ ...prev, avatar: file }));
                    setPreview(URL.createObjectURL(file));
                  }
                }}
                className="block w-full text-sm text-gray-600"
              />
              {preview && (
                <motion.img
                  src={preview}
                  alt="Avatar Preview"
                  className="w-16 h-16 mt-3 rounded-full border-2 border-blue-400 object-cover"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 200 }}
                />
              )}
              {errors.avatar && (
                <p className="text-sm text-red-500 mt-1">{errors.avatar}</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          type="submit"
          disabled={Object.values(errors).some((err) => err) || loading}
          className="w-full py-2 px-4 text-white rounded-xl font-medium shadow-sm transition cursor-pointer"
          loading={loading}
        >
          {!isRegister ? "Login" : "Register"}
        </Button>

        <div className="flex justify-center items-center gap-2 pt-2 text-sm">
          <Text
            children={
              !isRegister
                ? "Don’t have an account?"
                : "Already have an account?"
            }
            variant="subtle"
          />
          <button
            type="button"
            className="text-blue-600 font-medium underline cursor-pointer"
            onClick={() => {
              params.set(
                "type",
                !isRegister ? AuthPage.Register : AuthPage.Login
              );
              navigate(`${AllRoutes.PUBLIC.AUTH.path}?${params.toString()}`);
              setFormData(emptyRegisterFormData);
              setErrors(emptyErrors);
              setPreview(null);
            }}
            disabled={loading}
          >
            {!isRegister ? "Register" : "Login"}
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export default Auth;
