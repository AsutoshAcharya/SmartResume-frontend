import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { TextField } from "../../Components/TextField";
import { emptyRegisterFormData, registerDataFields } from "./DataField";
import { RForm } from "./type";

const Register = () => {
  const [formData, setFormData] = useState<RForm>(emptyRegisterFormData);

  const [errors, setErrors] = useState<Record<string, string>>({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  const [preview, setPreview] = useState<string | null>(null);

  function handleChange<T extends keyof RForm>(key: T, value: RForm[T]) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  function handleBlur<T extends keyof RForm>(key: T) {
    let error = "";
    let kee = key as Exclude<keyof RForm, "avatar">;
    const value = formData[kee];
    switch (key) {
      case "name":
        error =
          value.length > 4
            ? ""
            : value.length > 50
            ? "Name is must have maximum of 50 characters"
            : "Name is must have minimum of 4 characters";
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

    setErrors((prev) => ({ ...prev, [key]: error }));
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert("Registered");
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-2xl space-y-6 w-[400px]"
      >
        <motion.h2
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-2xl font-bold text-center text-gray-400"
        >
          Create Your Account
        </motion.h2>

        {registerDataFields.map((field, i) => (
          <motion.div
            key={field.label}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 * (i + 1) }}
          >
            <TextField
              type={field.type}
              label={field.label}
              value={formData[field.key]}
              placeholder={field.placeholder}
              onChange={(val) => handleChange(field.key, val)}
              required={field.required}
              onBlur={() => {
                console.warn("blur");
                handleBlur(field.key);
              }}
            />
            {errors[field.key as keyof typeof errors] && (
              <motion.p
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-sm text-red-400 mt-1"
              >
                {errors[field.key as keyof typeof errors]}
              </motion.p>
            )}
          </motion.div>
        ))}

        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <label className="block mb-1 text-sm font-medium text-gray-500">
            Avatar
          </label>
          <input
            name="avatar"
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
              alt="Preview"
              className="w-16 h-16 mt-2 rounded-full object-cover border"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            />
          )}
          {errors.avatar && (
            <p className="text-sm text-red-400  mt-1">{errors.avatar}</p>
          )}
        </motion.div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition cursor-pointer"
          disabled={Object.keys(errors).some((kee) => errors[kee].length > 0)}
        >
          Register
        </motion.button>
      </motion.form>
    </div>
  );
};

export default Register;
