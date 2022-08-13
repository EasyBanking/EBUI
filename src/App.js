import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
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
import Registered from "./pages/Registered";
import { NextUIProvider, createTheme } from "@nextui-org/react";
import Activate from "./pages/activate";
import Main from "./pages/main";
import { useLayoutEffect } from "react";
import HttpClient from "./Http-Client";
//import Dashboard from "./pages/Dashboard";

library.add(fas);
library.add(far);
library.add(fab);

const AppTheme = createTheme({
  type: "light",
  theme: {
    colors: {
      primary: "#3a0ca3",
      secondary: "#7209b7",
      info: "#f72585",
      sub: "#4361ee",
      extra: "#4cc9f0",
      error: "#e63946",
      warning: "#ffc300",
      success: "#00af54",
      light: "#e5e5e5",
      dark: "#323031",
      white: "#ffff",
    },
  },
});

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
    Page: Main,
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
        <NextUIProvider theme={AppTheme}>
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
        </NextUIProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
