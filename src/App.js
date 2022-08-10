import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import ThemeWrapper from "./wrappers/Theme";
import store from "./store";
import Login from "./pages/Login";
import ForgetPassword from "./pages/forget-password";
import RestorePassword from "./pages/Restore-Password";
import Register from "./pages/Register";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthGuard } from "./wrappers/Auth";
import Registered from "./pages/Registered";
import Activate from "./pages/activate";
import { useLayoutEffect } from "react";
import HttpClient from "./Http-Client";
//import Dashboard from "./pages/Dashboard";

library.add(fas);
library.add(far);
library.add(fab);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 5 * 60 * 1000,
    },
    mutations: {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

const routes = [
  {
    path: "/login",
    Page: Login,
  },
  {
    path: "/forget-password",
    Page: ForgetPassword,
  },
  {
    path: "/restore/:token",
    Page: RestorePassword,
  },
  {
    path: "/register",
    Page: Register,
  },
  {
    path: "/app",
    Page: () => <AuthGuard> i am authenticated </AuthGuard>,
  },
  {
    path: "/info",
    Page: Registered,
  },
  {
    path: "/activate/:token",
    Page: Activate,
  },
];

function App() {
  useLayoutEffect(() => {
    HttpClient.get("/csrf")
      .then(({ data }) => {
        localStorage.setItem("csrf", data ?? null);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ThemeWrapper>
            <Routes>
              {routes.map(({ Page, path }, i) => {
                return (
                  <Route
                    path={path}
                    caseSensitive={true}
                    element={<Page />}
                    key={`pg-${i}`}
                  />
                );
              })}
            </Routes>
          </ThemeWrapper>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
