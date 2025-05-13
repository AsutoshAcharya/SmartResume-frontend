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
  beforeCall && beforeCall();
  setLoading && setLoading(true);
  const resp: T = await fn();
  const status = resp.status || 500;
  if (status >= 200 && status < 210) onSuccess && onSuccess(resp?.data);
  else onError && onError(resp?.data);
  setLoading && setLoading(false);
  afterCall && afterCall();
  return resp?.data;
}

export default apiCall;
