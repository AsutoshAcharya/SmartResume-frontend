const localUrl = "http://localhost:8800";
const prodUrl = "https://smart-resume.onrender.com";

function getEnv(): string {
  return window.location.href.includes("localhost") ? prodUrl : prodUrl;
}
const env = getEnv();
export default env;
