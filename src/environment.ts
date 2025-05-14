function getEnv(): string {
  return window.location.href.includes("localhost")
    ? "http://localhost:8800"
    : "devenv";
}
const env = getEnv();
export default env;
