import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LoaderWrapper } from "../components/Loader";

const AUTKEY = "X-AUTH-TOKEN";

export const AuthGuard = (props) => {
  const [isLoad, setIsLoad] = useState(false);
  const router = useNavigate();

  useEffect(() => {
    const authenticated = localStorage.getItem(AUTKEY);

    if (!authenticated) {
      router("/login");
    } else {
      setIsLoad(true);
    }
  }, [router]);

  if (isLoad) {
    return props.children;
  }

  return <LoaderWrapper />;
};

export const AuthenticatedWrapper = (props) => {
  const [isLoad, setIsLoad] = useState(false);
  const router = useNavigate();

  useEffect(() => {
    const authenticated = localStorage.getItem(AUTKEY);

    if (authenticated) {
      router("/app");
    } else {
      setIsLoad(true);
    }
  }, [router]);

  if (isLoad) {
    return props.children;
  }

  return <LoaderWrapper />;
};
