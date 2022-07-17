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

library.add(fas);
library.add(far);
library.add(fab);

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
    path: "/restore-password",
    Page: RestorePassword,
  },
  {
    path: "/register",
    Page: Register,
  },
];

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
