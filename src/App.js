import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Login from "./pages/Login";
import ThemeWrapper from "./wrappers/Theme";
import store from "./store";

const routes = [
  {
    path: "",
    Page: Login,
  },
];

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeWrapper>
          <Routes>
            {routes.map(({ Page, path }, i) => {
              return <Route path={path} element={<Page />} key={`pg-${i}`} />;
            })}
          </Routes>
        </ThemeWrapper>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
