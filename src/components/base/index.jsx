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
import { useRef, useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Bar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import Icon from "../../logo.svg";
import { toggleLeftBar, toggleRightBar } from "../../store/slices/theme";
import { useClickOutside, useWindowResize } from "use-events";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";

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
            <Bar className="md:h-screen" style={{ height: "92%" }}>
              <ul className="mx-0 px-0">
                {sideLinks.map((s) => {
                  if (isActive(s.link)) {
                    return (
                      <li>
                        <button
                          onClick={() => router(s.link)}
                          className="p-2 bg-sub hover:bg-light  rounded w-full flex flex-row items-start text-white hover:text-sub transition-all"
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
                        className="p-2  hover:bg-light  cursor-pointer rounded w-full flex flex-row items-start text-sub hover:text-sub transition-all"
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

const RightSideBar = (props) => {
  const location = useLocation();
  const [selected, setSelected] = useState(new Set([""]));
  const [isSearch, setIsSearch] = useState(false);
  const [filter, setFilters] = useState(false);
  const theme = useSelector((state) => state.theme);
  const [width, height] = useWindowResize();
  const isActive = useCallback(
    (path) => location.pathname === path,
    [location]
  );

  const classes = clsx(
    {
      "md:w-72 w-full": theme.rightbar,
      "w-0 hidden overflow-hidden": !theme.rightbar,
    },
    "bg-white h-full fixed top-0 right-0 md:px-0 px-8"
  );

  useEffect(() => {
    if (width > 768) {
    }
  }, [width]);

  return (
    <div className={classes}>
      <Container lg className="h-full max-h-screen">
        <div className="w-full shadow-r z-10 flex flex-col h-full  lg:pt-20 pt-44">
          <div className="bg-light py-4 px-4 rounded">
            <div className="flex flex-row items-center">
              <span className="w-full">
                <FontAwesomeIcon icon="calendar" className="text-sub" />
                <span className="ml-3 bold">schedule</span>
              </span>
              <span className="text-sm">22</span>
            </div>
            <div className="flex flex-col mt-2">
              <small className="capitalize text-sm">
                teller at (cairo) - tomorrow{" "}
              </small>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex flex-row items-center justify-between">
              <Text h5 transform="capitalize">
                recent
              </Text>
              <span className="flex flex-row">
                <span className="mr-4">
                  <Popover
                    placement="left"
                    isOpen={isSearch}
                    isDismissable
                    isBordered={false}
                  >
                    <Popover.Trigger>
                      <button auto light onClick={() => setIsSearch(!isSearch)}>
                        <FontAwesomeIcon icon="search" />
                      </button>
                    </Popover.Trigger>
                    <Popover.Content>
                      <Input placeholder="search" fullWidth bordered />
                    </Popover.Content>
                  </Popover>
                </span>
                <Dropdown
                  placement="left"
                  isOpen={filter}
                  isDismissable
                  isBordered={false}
                >
                  <Dropdown.Trigger>
                    <button onClick={() => setFilters(!filter)}>
                      <FontAwesomeIcon icon="ellipsis" />
                    </button>
                  </Dropdown.Trigger>
                  <Dropdown.Menu
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={selected}
                    onSelectionChange={setSelected}
                    aria-label="Static Actions"
                  >
                    <Dropdown.Item key="new">New file</Dropdown.Item>
                    <Dropdown.Item key="copy">Copy link</Dropdown.Item>
                    <Dropdown.Item key="edit">Edit file</Dropdown.Item>
                    <Dropdown.Item key="delete" color="error">
                      Delete file
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </span>
            </div>
            <Bar className="md:max-h-screen max-h-64">
              <ul className="m-0 p-0 mt-2">
                <li className="m-0 p-0 text-sm flex flex-col justify-start py-2 hover:bg-light rounded px-2">
                  <Link to="" className="text-dark">
                    <div className="flex flex-col">
                      <span className="flex flex-row items-center">
                        <span className="w-full flex flex-row items-center">
                          <img
                            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                            className="w-8 h-8 rounded-full"
                            alt=""
                          />
                          <span className="flex flex-col ml-2 text-xs capitalize">
                            <b className="opacity-70 bold">receiver</b>
                            <span>ahmed ramadan</span>
                            <span className="opacity-70 flex w-full flex-row">
                              <small className="opacity-70 lowercase mt-1">
                                6 hours ago
                              </small>
                            </span>
                          </span>
                        </span>

                        <span className="flex flex-col h-full">
                          <span className="bg-success text-xs rounded px-2 py-1">
                            success
                          </span>
                          <span className="opacity-70 flex w-full flex-row">
                            <small className="text-sub mt-3">10 EGP</small>
                          </span>
                        </span>
                      </span>
                    </div>
                  </Link>
                </li>
                <li className="m-0 p-0 text-sm flex flex-col justify-start py-2 hover:bg-light rounded px-2">
                  <Link to="" className="text-dark">
                    <div className="flex flex-col">
                      <span className="flex flex-row items-center">
                        <span className="w-full flex flex-row items-center">
                          <img
                            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                            className="w-8 h-8 rounded-full"
                            alt=""
                          />
                          <span className="flex flex-col ml-2 text-xs capitalize">
                            <b className="opacity-70 bold">receiver</b>
                            <span>ahmed ramadan</span>
                            <span className="opacity-70 flex w-full flex-row">
                              <small className="opacity-70 lowercase mt-1">
                                6 hours ago
                              </small>
                            </span>
                          </span>
                        </span>

                        <span className="flex flex-col h-full">
                          <span className="bg-success text-xs rounded px-2 py-1">
                            success
                          </span>
                          <span className="opacity-70 flex w-full flex-row">
                            <small className="text-sub mt-3">10 EGP</small>
                          </span>
                        </span>
                      </span>
                    </div>
                  </Link>
                </li>
                <li className="m-0 p-0 text-sm flex flex-col justify-start py-2 hover:bg-light rounded px-2">
                  <Link to="" className="text-dark">
                    <div className="flex flex-col">
                      <span className="flex flex-row items-center">
                        <span className="w-full flex flex-row items-center">
                          <img
                            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                            className="w-8 h-8 rounded-full"
                            alt=""
                          />
                          <span className="flex flex-col ml-2 text-xs capitalize">
                            <b className="opacity-70 bold">receiver</b>
                            <span>ahmed ramadan</span>
                            <span className="opacity-70 flex w-full flex-row">
                              <small className="opacity-70 lowercase mt-1">
                                6 hours ago
                              </small>
                            </span>
                          </span>
                        </span>

                        <span className="flex flex-col h-full">
                          <span className="bg-success text-xs rounded px-2 py-1">
                            success
                          </span>
                          <span className="opacity-70 flex w-full flex-row">
                            <small className="text-sub mt-3">10 EGP</small>
                          </span>
                        </span>
                      </span>
                    </div>
                  </Link>
                </li>
                <li className="m-0 p-0 text-sm flex flex-col justify-start py-2 hover:bg-light rounded px-2">
                  <Link to="" className="text-dark">
                    <div className="flex flex-col">
                      <span className="flex flex-row items-center">
                        <span className="w-full flex flex-row items-center">
                          <img
                            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                            className="w-8 h-8 rounded-full"
                            alt=""
                          />
                          <span className="flex flex-col ml-2 text-xs capitalize">
                            <b className="opacity-70 bold">receiver</b>
                            <span>ahmed ramadan</span>
                            <span className="opacity-70 flex w-full flex-row">
                              <small className="opacity-70 lowercase mt-1">
                                6 hours ago
                              </small>
                            </span>
                          </span>
                        </span>

                        <span className="flex flex-col h-full">
                          <span className="bg-success text-xs rounded px-2 py-1">
                            success
                          </span>
                          <span className="opacity-70 flex w-full flex-row">
                            <small className="text-sub mt-3">10 EGP</small>
                          </span>
                        </span>
                      </span>
                    </div>
                  </Link>
                </li>
                <li className="m-0 p-0 text-sm flex flex-col justify-start py-2 hover:bg-light rounded px-2">
                  <Link to="" className="text-dark">
                    <div className="flex flex-col">
                      <span className="flex flex-row items-center">
                        <span className="w-full flex flex-row items-center">
                          <img
                            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                            className="w-8 h-8 rounded-full"
                            alt=""
                          />
                          <span className="flex flex-col ml-2 text-xs capitalize">
                            <b className="opacity-70 bold">receiver</b>
                            <span>ahmed ramadan</span>
                            <span className="opacity-70 flex w-full flex-row">
                              <small className="opacity-70 lowercase mt-1">
                                6 hours ago
                              </small>
                            </span>
                          </span>
                        </span>

                        <span className="flex flex-col h-full">
                          <span className="bg-success text-xs rounded px-2 py-1">
                            success
                          </span>
                          <span className="opacity-70 flex w-full flex-row">
                            <small className="text-sub mt-3">10 EGP</small>
                          </span>
                        </span>
                      </span>
                    </div>
                  </Link>
                </li>
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
        <Dropdown isOpen={notficationsOpen}>
          <Dropdown.Trigger>
            <Button
              onClick={() => setNotficationsOpen(!notficationsOpen)}
              size={"sm"}
              className="relative"
              auto
              light
              animated={false}
              css={{ border: 0, overflow: "visible", ml: 10 }}
              color="sub"
            >
              <span className="relative">
                <FontAwesomeIcon icon="bell" size="xl" className="text-dark" />
                <small
                  className="absolute flex items-center bold justify-center top-2 left-3 bg-error rounded-full p-1 text-white text-xs"
                  style={{ width: 15, height: 15, fontSize: 10 }}
                >
                  {props?.urgents?.count}
                </small>
              </span>
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item>hello world</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

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
              color="sub"
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
                  {props?.urgents?.count}
                </small>
              </span>
            </Button>
          </Dropdown.Trigger>

          <Dropdown.Menu>
            <Dropdown.Item>hello world urgents</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
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
            <Dropdown.Item key="profile">profile</Dropdown.Item>
            <Dropdown.Item key="logout">logout</Dropdown.Item>
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
          <LinkUi color="sub" className="mr-4 bold capitalize text-sm">
            Login
          </LinkUi>
        </Link>
        <Link to="/register">
          <LinkUi color="sub" className="mr-4 bold capitalize text-sm">
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
                  <img src={Icon} style={{ width: 50 }} alt="icon" />
                  <Text h6 transform="capitalize">
                    {props.appName}
                  </Text>
                </Link>
              </div>
              <div className="flex items-center px-2  relative ml-auto">
                <Link to="/" className="m-0 p-0">
                  <LinkUi color="sub" className="mr-4 bold capitalize text-sm">
                    home
                  </LinkUi>
                </Link>
                <Link to="/about" className="m-0 p-0">
                  <LinkUi color="sub" className="mr-4 bold capitalize text-sm">
                    about
                  </LinkUi>
                </Link>

                <Link to="/faqs" className="m-0 p-0">
                  <LinkUi color="sub" className="mr-4 bold capitalize text-sm">
                    faqs
                  </LinkUi>
                </Link>
                <Link to="/contact" className="m-0 p-0">
                  <LinkUi color="sub" className="mr-2 bold capitalize text-sm">
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
                    color="sub"
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
  const [active] = useClickOutside([refs[0]], props.onClickOutside);
  const [searchText, setSearchText] = useState("");

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
          color="sub"
        />

        {props?.result?.count ? (
          <>
            <Bar style={{ height: 200 }}>
              <ul className="mx-0 px-0">
                {props?.result?.data.map((r, i) => {
                  return (
                    <li className="m-0 my-2 p-0 border-l-2  border-light pl-4 rounded-l">
                      <Link to={`${r.category}/${r.id}`}>
                        <span
                          className="bg-sub inline-block text-white rounded text-xs py-1 px-2 text-center mr-2"
                          style={{ width: 72 }}
                        >
                          {r.category}
                        </span>
                        <LinkUi>{r.content}</LinkUi>
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
                  {props.result.count}
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
    <div className="w-full bg-sub fixed bottom-0 md:hidden block shadow-lg rounded-t-md">
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
  const [width] = useWindowResize();
  const dispatch = useDispatch();
  const theme = useSelector((st) => st.theme);

  const bodyCLs = clsx(
    {
      "ml-0": !theme.leftbar,
      "ml-72": theme.leftbar,
    },
    "bg-light",
    "lg:pt-24 pt-44"
  );

  /* useLayoutEffect(() => {
    if (theme) {
      if (width > 960 && !theme?.leftbar) {
        dispatch(toggleLeftBar());
      }

      if (width > 960 && !theme?.rightbar) {
        dispatch(toggleRightBar());
      }
    }
  }, [width]);*/

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
        user={{
          username: "islam saeed",
          profileImg: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        }}
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
