interface Params<T> {
  fn: () => Promise<T>;
  beforeCall?: () => void;
  afterCall?: () => void;
  onSuccess?: (data: T) => void;
  onError?: (data: T) => void;
  setLoading?: (val: boolean) => void;
}
async function apiCall<T extends Record<string, any> = Record<string, any>>({
  fn,
  afterCall,
  beforeCall,
  onSuccess,
  onError,
  setLoading,
}: Params<T>) {
  beforeCall?.();
  setLoading?.(true);

  try {
    const resp: T = await fn();
    const status = resp.status || 500;
    console.warn(resp);
    if (status >= 200 && status < 210) {
      onSuccess && onSuccess(resp?.data);
    } else {
      onError && onError(resp?.data);
    }
    return resp?.data;
  } catch (err: any) {
    console.error("API call failed", err);
    onError && onError(err?.data || err);
    return err?.data || { message: "Unexpected error" };
  } finally {
    setLoading && setLoading(false);
    afterCall && afterCall();
  }
}

export default apiCall;
