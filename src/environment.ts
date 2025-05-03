function getEnv(): string {
  return window.location.href.includes("localhost")
    ? "localhost:8800"
    : "devenv";
}
const env = getEnv();
export default env;
