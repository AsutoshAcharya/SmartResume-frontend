import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./AppRoute/Routes";
const queryClient = new QueryClient();
function App() {
  return (
    <Fragment>
      <ToastContainer
        pauseOnFocusLoss={false}
        position="bottom-left"
        pauseOnHover={false}
      />
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
      </QueryClientProvider>
    </Fragment>
  );
}

export default App;
