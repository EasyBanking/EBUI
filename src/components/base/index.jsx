import {
  Button,
  Container,
  Grid,
  Link as LinkUi,
  Input,
  Dropdown,
  Text,
  Popover,
} from "@nextui-org/react";
import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Momment from "react-moment";
import Bar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import Icon from "../../logo.svg";
import { toggleLeftBar, toggleRightBar } from "../../store/slices/theme";
import { useClickOutside, useWindowResize } from "use-events";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import HttpClient from "../../Http-Client";
import Info from "./icons8-info-96.png";

function SideBar(props) {
  const location = useLocation();
  const router = useNavigate();
  const isActive = useCallback(
    (path) => location.pathname === path,
    [location]
  );
  const theme = useSelector((state) => state.theme);
  const classes = clsx(
    {
      "md:w-72 w-full": theme.leftbar,
      "w-0 hidden overflow-hidden": !theme.leftbar,
    },
    "bg-white h-full fixed md:px-0 px-8"
  );

  return (
    <div className={classes}>
      <Container lg className="h-full max-h-screen">
        <div className="w-full shadow-r z-10 flex flex-col  h-full lg:pt-20 pt-44">
          <div className="">
            <Bar className="md:h-screen">
              <ul className="mx-0 px-0">
                {sideLinks.map((s) => {
                  if (isActive(s.link)) {
                    return (
                      <li>
                        <button
                          onClick={() => router(s.link)}
                          className="p-2 bg-primary hover:bg-light  rounded w-full flex flex-row items-start text-white hover:text-primary transition-all"
                        >
                          <FontAwesomeIcon
                            icon={s.icon}
                            size="lg"
                            style={{ width: 35 }}
                          />
                          <span className="ml-4 bold capitalize">
                            {s.title}
                          </span>
                        </button>
                      </li>
                    );
                  }
                  return (
                    <li>
                      <button
                        onClick={() => router(s.link)}
                        className="p-2  hover:bg-light  cursor-pointer rounded w-full flex flex-row items-start text-primary hover:text-primary transition-all"
                      >
                        <FontAwesomeIcon
                          icon={s.icon}
                          size="lg"
                          style={{ width: 35 }}
                        />
                        <span className="ml-4 bold capitalize">{s.title}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </Bar>
          </div>
        </div>
      </Container>
    </div>
  );
}

const TransactionsItem = (props) => {
  return (
    <li className="m-0 p-0 text-sm flex flex-col justify-start py-2 hover:bg-light rounded px-2">
      <Link to={`/transactions/${props.id}`} className="text-dark">
        <div className="flex flex-col">
          <span className="flex flex-row items-center mb-3">
            <span className="w-full flex flex-row items-center">
              <img
                src={props.img ? props.img : Info}
                className="w-8 h-8 rounded-full"
                alt=""
              />
              <span className="flex flex-col ml-2 text-xs capitalize">
                <b className="opacity-70 bold">
                  {props.sender ? "Sender" : "Receiver"}
                </b>
                <span>{props.description ? props.description : "payment"}</span>
                <span className="opacity-70 flex w-full flex-row">
                  <small className="opacity-70 lowercase mt-1">
                    <Momment from={props.datetime} />
                  </small>
                </span>
              </span>
            </span>

            <span className="flex flex-col h-full">
              <span className="bg-primary text-white text-xs rounded px-2 py-1">
                {props.status}
              </span>
              <span className="opacity-70 flex w-full flex-row">
                <small className="text-primary mt-3">{props.amount} EGP</small>
              </span>
            </span>
          </span>
        </div>
      </Link>
    </li>
  );
};

const RightSideBar = (props) => {
  const location = useLocation();
  const [selected, setSelected] = useState(new Set([""]));
  const [isSearch, setIsSearch] = useState(false);
  const [filter, setFilters] = useState(false);
  const theme = useSelector((state) => state.theme);
  const [width, height] = useWindowResize();
  const user = useSelector((state) => state?.auth?.user);
  const [transactions, setTransactions] = useState([]);
  const isActive = useCallback(
    (path) => location.pathname === path,
    [location]
  );
  const isSender = (sender) => sender?._id === user?.account?._id;

  const classes = clsx(
    {
      "md:w-72 w-full": theme.rightbar,
      "w-0 hidden overflow-hidden": !theme.rightbar,
    },
    "bg-white h-full fixed top-0 right-0 md:px-0 px-8"
  );

  useEffect(() => {
    if (user) {
      console.log(user);
      HttpClient.get("/account/transactions")
        .then(({ data }) => {
          setTransactions(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  return (
    <div className={classes}>
      <Container lg className="h-full max-h-screen">
        <div className="w-full shadow-r z-10 flex flex-col h-full  lg:pt-20 pt-44">
          {user?.account?.schedules ? (
            <div className="bg-light py-4 px-4 rounded">
              <div className="flex flex-row items-center">
                <span className="w-full">
                  <FontAwesomeIcon icon="calendar" className="text-primary" />
                  <span className="ml-3 bold">schedule</span>
                </span>
                <span className="text-sm">
                  {user?.account?.schedules[0]?.priority}
                </span>
              </div>
              <div className="flex flex-col mt-2">
                <small className="capitalize  flex flex-row w-full  items-center justify-between text-xs">
                  <small>{user?.account?.schedules[0]?.type}</small>
                  <Momment to={user?.account?.schedules[0]?.date} />
                </small>
                <small className="text-xs">
                  {user?.account?.schedules[0]?.location_id?.address}
                </small>
              </div>
            </div>
          ) : null}

          <div className="mt-4">
            <div className="flex flex-row items-center justify-between">
              <Text h5 transform="capitalize">
                recent transactions
              </Text>
            </div>
            <Bar className="md:max-h-screen max-h-64">
              <ul className="m-0 p-0 mt-2">
                {transactions
                  .filter((t, i) => i < 4)
                  .map((t) => {
                    return (
                      <TransactionsItem
                        id={t?._id}
                        title={"test"}
                        description={
                          isSender(t.sender)
                            ? t?.receiver?.firstName + t?.receiver?.lastName
                            : t?.sender?.firstName + t?.sender?.lastName
                        }
                        datetime={t.datetime}
                        amount={t?.amount}
                        status={t?.status}
                        sender={isSender(t.sender)}
                        img={
                          isSender(t.sender)
                            ? t?.receiver?.user?.profile_img
                            : t?.sender?.user?.profile_img
                        }
                      />
                    );
                  })}
              </ul>
            </Bar>
          </div>
        </div>
      </Container>
    </div>
  );
};

const AuthenticatedRightBar = (props) => {
  const [urgentsOpen, setUrgentsOpen] = useState(false);
  const [notficationsOpen, setNotficationsOpen] = useState(false);

  return (
    <span className="flex flex-row items-center justify-between w-full">
      <div className="my-auto flex items-center justify-end h-full">
        <Dropdown isOpen={notficationsOpen} type="listbox">
          <Dropdown.Trigger>
            <Button
              onClick={() => {
                setNotficationsOpen(!notficationsOpen);
              }}
              size={"sm"}
              className="relative"
              auto
              light
              animated={false}
              css={{ border: 0, overflow: "visible", ml: 10 }}
              color="primary"
            >
              <span className="relative">
                <FontAwesomeIcon icon="bell" size="xl" className="text-dark" />
                <small
                  className="absolute flex items-center bold justify-center top-2 left-3 bg-error rounded-full p-1 text-white text-xs"
                  style={{ width: 15, height: 15, fontSize: 10 }}
                >
                  {props?.user?.notfications?.filter((n) => !n?.viewed)?.length}
                </small>
              </span>
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Menu>
            {props?.user?.notfications
              ?.filter((n) => !n?.viewed)
              .map((n, i) => {
                if (i < 5) {
                  return (
                    <Dropdown.Item className="py-8 text-2xs">{n?.content}</Dropdown.Item>
                  );
                }
              })}
            <Dropdown.Item withDivider className="text-center">
              <small className="text-xs text-center">see all</small>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        {props.user.account ? (
          <Dropdown isOpen={urgentsOpen}>
            <Dropdown.Trigger>
              <Button
                size={"sm"}
                className="relative"
                auto
                onClick={() => setUrgentsOpen(!urgentsOpen)}
                light
                animated={false}
                css={{ border: 0, overflow: "visible", ml: 10 }}
                color="primary"
              >
                <span className="relative">
                  <FontAwesomeIcon
                    icon="envelope"
                    size="xl"
                    className="text-dark"
                  />
                  <small
                    className="absolute flex items-center bold justify-center top-2 left-3 bg-error rounded-full p-1 text-white text-xs"
                    style={{ width: 15, height: 15, fontSize: 10 }}
                  >
                    {
                      props?.user?.account?.urgents?.filter((u) => !u?.viewed)
                        .length
                    }
                  </small>
                </span>
              </Button>
            </Dropdown.Trigger>

            <Dropdown.Menu>
              {props?.user?.account?.urgents
                ?.filter((u, i) => !u?.viewed && i < 5)
                .map((u) => {
                  return (
                    <Dropdown.Item>
                      <small>{u.content}</small>
                    </Dropdown.Item>
                  );
                })}

              <Dropdown.Item className="text-center" withDivider>
                <small>see all</small>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : null}
      </div>
      <div className="flex items-center">
        <Dropdown borderWeight={0}>
          <Dropdown.Button isBordered={false} borderWeight={0} light>
            <img
              className="rounded-full mr-2 border-1"
              alt="profile-img"
              style={{ width: 30 }}
              src={props?.user?.profileImg}
            />
            {props?.user?.username}
          </Dropdown.Button>
          <Dropdown.Menu aria-label="Static Actions">
            <Dropdown.Item key="profile">
              <Link to="/profile">profile</Link>
            </Dropdown.Item>
            <Dropdown.Item key="logout">
              <LinkUi
                onClick={() => {
                  window?.localStorage?.removeItem("X-AUTH-TOKEN");
                  window.location.replace("/");
                }}
              >
                logout
              </LinkUi>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </span>
  );
};

const RightBar = (props) => {
  return (
    <>
      <div className="my-auto flex items-center justify-end  h-full">
        <Link to="/login">
          <LinkUi color="primary" className="mr-4 bold capitalize text-sm">
            Login
          </LinkUi>
        </Link>
        <Link to="/register">
          <LinkUi color="primary" className="mr-4 bold capitalize text-sm">
            Register
          </LinkUi>
        </Link>
      </div>
    </>
  );
};

const TopBar = (props) => {
  const [search, setSearch] = useState(false);
  return (
    <>
      <nav className="bg-white fixed top-0 z-10 w-full shadow-lg  rounded py-1">
        <Container lg>
          <Grid.Container gap={1}>
            <Grid md={4} xs={12}>
              <div className="flex items-center">
                <Link to="/app" className="w-full flex">
                  <Text h6 transform="capitalize" color="primary">
                    {props.appName}
                  </Text>
                </Link>
              </div>
              <div className="flex items-center px-2  relative ml-auto">
                <Link to="/" className="m-0 p-0">
                  <LinkUi
                    color="primary"
                    className="mr-4 bold capitalize text-sm"
                  >
                    home
                  </LinkUi>
                </Link>
                <Link to="/about" className="m-0 p-0">
                  <LinkUi
                    color="primary"
                    className="mr-4 bold capitalize text-sm"
                  >
                    about
                  </LinkUi>
                </Link>

                <Link to="/faqs" className="m-0 p-0">
                  <LinkUi
                    color="primary"
                    className="mr-4 bold capitalize text-sm"
                  >
                    faqs
                  </LinkUi>
                </Link>
                <Link to="/contact" className="m-0 p-0">
                  <LinkUi
                    color="primary"
                    className="mr-2 bold capitalize text-sm"
                  >
                    contact
                  </LinkUi>
                </Link>
              </div>
            </Grid>
            <Grid md={5} xs={12}>
              <div className="flex flex-row w-full md:justify-center">
                <div className="w-full">
                  <Input
                    type="text"
                    bordered
                    fullWidth
                    onClick={() => {
                      setSearch(true);
                    }}
                    color="primary"
                    animated={false}
                    clearable
                    placeholder="how can we help ?"
                  />
                </div>
                {search ? (
                  <SearchDialog
                    search={search}
                    onClickOutside={() => {
                      setSearch(false);
                    }}
                    onClose={() => {
                      setSearch(false);
                    }}
                    height="100%"
                    result={{
                      count: 0,
                      data: [],
                    }}
                  />
                ) : null}
              </div>
            </Grid>
            <Grid md={3} xs={12}>
              {props?.user ? (
                <AuthenticatedRightBar {...props} />
              ) : (
                <RightBar {...props} />
              )}
            </Grid>
          </Grid.Container>
        </Container>
      </nav>
    </>
  );
};

const SearchDialog = (props) => {
  const refs = [useRef(null), useRef(null)];
  const [active] = useClickOutside([refs[1]], props.onClickOutside);
  const [searchText, setSearchText] = useState("");
  const [result, setResult] = useState({});
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (searchText.length >= 3) {
      setTimeout(() => {
        HttpClient.get("/user/search", { params: { q: searchText } })
          .then(({ data }) => {
            setResult(data.result[0]);
            setCount(data.count);
          })
          .catch((err) => {
            setResult({});
            setCount(0);
            console.log(err);
          });
      }, 200);
    }
  }, [searchText]);

  useEffect(() => {
    if (props.search) {
      refs[0].current.focus();
    }
  }, [refs, props.search]);

  return (
    <section
      style={{ backgroundColor: "rgba(0,0,0,0.50)" }}
      className="z-10 fixed w-full top-0  left-0 h-full flex items-center justify-center"
    >
      <div className="bg-white rounded-md md:w-2/5 p-4 shadow-lg" ref={refs[1]}>
        <Input
          ref={refs[0]}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          clearable
          size="lg"
          fullWidth
          placeholder="type to search "
          bordered
          color="primary"
        />

        {count ? (
          <>
            <Bar style={{ height: 200 }}>
              <ul className="mx-0 px-0">
                {result?.locations?.map((r, i) => {
                  return (
                    <li className="m-0 my-2 p-0 border-l-2  border-light pl-4 rounded-l">
                      <Link to={`/locations/${r?._id}`}>
                        <span
                          className="bg-primary inline-block text-white rounded text-xs py-1 px-2 text-center mr-2"
                          style={{ width: 72 }}
                        >
                          location
                        </span>
                        <LinkUi>{r.address}</LinkUi>
                      </Link>
                    </li>
                  );
                })}
                {result?.transactions?.map((r, i) => {
                  return (
                    <li className="m-0 my-2 p-0 border-l-2  border-light pl-4 rounded-l">
                      <Link to={`/transactions/${r?._id}`}>
                        <span
                          className="bg-primary inline-block text-white rounded text-xs py-1 px-2 text-center mr-2"
                          style={{ width: 72 }}
                        >
                          transcation
                        </span>
                        <LinkUi>
                          {r.amount}EGP from {r?.sender?.firstName}
                          {r?.receiver?.firstName
                            ? ` to ${r?.receiver?.firstName}`
                            : " as a qr code"}
                        </LinkUi>
                      </Link>
                    </li>
                  );
                })}
                {result?.urgents?.map((r, i) => {
                  return (
                    <li className="m-0 my-2 p-0 border-l-2  border-light pl-4 rounded-l">
                      <Link to={`/urgents/${r?._id}`}>
                        <span
                          className="bg-primary inline-block text-white rounded text-xs py-1 px-2 text-center mr-2"
                          style={{ width: 72 }}
                        >
                          Urgent
                        </span>
                        <LinkUi>{r.content}</LinkUi>
                      </Link>
                    </li>
                  );
                })}
                {result?.notfications?.map((r, i) => {
                  return (
                    <li className="m-0 my-2 p-0 border-l-2  border-light pl-4 rounded-l">
                      <Link to={`/notfications/${r?._id}`}>
                        <span
                          className="bg-primary inline-block text-white rounded text-xs py-1 px-2 text-center mr-2"
                          style={{ width: 72 }}
                        >
                          Urgent
                        </span>
                        <LinkUi>{r.content}</LinkUi>
                      </Link>
                    </li>
                  );
                })}

                {result?.schedules?.map((r, i) => {
                  return (
                    <li className="m-0 my-2 p-0 border-l-2  border-light pl-4 rounded-l">
                      <Link to={`/schedules/${r?._id}`}>
                        <span
                          className="bg-primary inline-block text-white rounded text-xs py-1 px-2 text-center mr-2"
                          style={{ width: 72 }}
                        >
                          Schedule
                        </span>
                        <LinkUi>
                          {r?.type} - {r?.date} - {r?.location_id?.address}
                        </LinkUi>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </Bar>
            <div className="flex items-center justify-between">
              <p className="inline-block">
                <span className="mr-2">result : </span>
                <span className="bg-info rounded-full inline-block text-white text-xs px-2 ml-auto">
                  {count}
                </span>
              </p>
              <span>
                <Button
                  auto
                  light
                  color="error"
                  size="sm"
                  onClick={props.onClose}
                >
                  <FontAwesomeIcon icon="times" size="xl" />
                </Button>
              </span>
            </div>
          </>
        ) : (
          <small>no records .</small>
        )}
      </div>
    </section>
  );
};

const sideLinks = [
  {
    title: "app",
    icon: "window-maximize",
    link: "/app",
  },
  {
    title: "transfer",
    icon: "money-bill-transfer",
    link: "/transfer",
  },
  {
    title: "pay",
    icon: "cart-shopping",
    link: "/pay",
  },
  {
    title: "transactions",
    icon: "archive",
    link: "/transactions",
  },
  {
    title: "schedules",
    icon: "calendar",
    link: "/schedules",
  },
  {
    title: "chat",
    icon: "headset",
    link: "/chat",
  },
];

const NavigationBottomBar = (props) => {
  const dispatch = useDispatch();
  const theme = useSelector((s) => s.theme);

  const handleLeftToggle = useCallback(
    (e) => {
      dispatch(toggleLeftBar());
    },
    [dispatch]
  );
  const handleRightToggle = useCallback(
    (e) => {
      dispatch(toggleRightBar());
    },
    [dispatch]
  );

  return (
    <div className="w-full bg-primary fixed bottom-0 md:hidden block shadow-lg rounded-t-md">
      <div className="w-72 mx-auto py-2">
        <ul className="m-0 p-0 flex flex-row items-center justify-center">
          <li className="p-0 m-0 mr-4">
            <Button auto size="sm" onClick={handleLeftToggle} light>
              <FontAwesomeIcon
                icon="list"
                size="xl"
                className={clsx({
                  "text-white": !theme.leftbar,
                  "text-warning": theme.leftbar,
                })}
              />
            </Button>
          </li>
          <li className="p-0 m-0">
            <Button auto size="sm" onClick={handleRightToggle} light>
              <FontAwesomeIcon
                icon="info-circle"
                size="xl"
                className={clsx({
                  "text-white": !theme.rightbar,
                  "text-warning": theme.rightbar,
                })}
              />
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export const Layout = (props) => {
  const theme = useSelector((st) => st.theme);
  const auth = useSelector((st) => st.auth);

  const bodyCLs = clsx(
    {
      "ml-0": !theme.leftbar,
      "ml-72": theme.leftbar,
      "mr-0": !theme.rightbar,
      "mr-72": theme.rightbar,
    },
    "bg-light",
    "lg:pt-24 pt-44"
  );

  return (
    <>
      <TopBar
        appName="easy banking"
        notfications={{
          count: 5,
        }}
        urgents={{
          count: 1,
        }}
        user={auth?.user}
      />
      <div className="h-screen">
        <SideBar />
        <section className={bodyCLs}>
          <Container lg>{props.children}</Container>
        </section>
        <RightSideBar />
      </div>
      <NavigationBottomBar />
    </>
  );
};
