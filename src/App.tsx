import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./AppRoute/Routes";
import { Provider } from "react-redux";
import { store } from "./redux/store";
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
        <Provider store={store}>
          <AppRoutes />
        </Provider>
      </QueryClientProvider>
    </Fragment>
  );
}

export default App;
