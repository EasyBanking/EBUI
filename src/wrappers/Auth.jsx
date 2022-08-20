import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import HttpClient from "../Http-Client";
import { LoaderWrapper } from "../components/Loader";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/auth";
const AUTH_KEY = "X-AUTH-TOKEN";

export const AuthGuard = (props) => {
  const [isLoad, setIsLoad] = useState(false);
  const router = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    HttpClient.get("/auth/checkme")
      .then(({ data }) => {
        const { user } = data;
        dispatch(login(user));
        if (!user.account) {
          return router("/create-account", { replace: true, state: user });
        }
        setIsLoad(true);
      })
      .catch((err) => {
        console.log(err);
        localStorage?.removeItem(AUTH_KEY);
        router("/login", { replace: true });
      });
  }, []);

  if (isLoad) {
    return props.children;
  }

  return <LoaderWrapper />;
};

export const AuthenticatedWrapper = (props) => {
  const [isLoad, setIsLoad] = useState(false);
  const { state } = useLocation();
  const router = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem(AUTH_KEY)) {
      router("/app", { replace: true });
    } else {
      setIsLoad(true);
    }
  }, []);

  if (!isLoad) {
    return <LoaderWrapper />;
  }

  return props.children;
};

export const PassWithCondition = (props) => {
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    if (props.isLoad && props.condition) {
      setIsLoad(true);
    }

    if (props.isLoad && !props.condition && props.fallback) {
      props.fallback();
    }
  }, [props]);

  if (!isLoad) {
    return <LoaderWrapper />;
  }

  return props.children;
};
