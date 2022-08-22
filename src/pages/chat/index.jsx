import { AuthGuard } from "../../wrappers/Auth";
import { Layout } from "../../components/base";
import { Button, Grid, Input, Text, Loading } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Bar from "simplebar-react";
import Moment from "react-moment";
import clsx from "clsx";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import { useMemo } from "react";

const socket_ = () =>
  io.connect("http://localhost:4000", {
    auth: {
      token: window?.localStorage?.getItem("X-AUTH-TOKEN"),
    },
    closeOnBeforeunload: true,
    withCredentials: true,
  });

const Message = (props) => {
  return (
    <div
      className={clsx({
        "mb-4 w-2/5": true,
      })}
    >
      <div className="flex flex-row items-center w-full">
        <img
          className={clsx({
            "w-10 h-10 rounded-full border-2  border-light": true,
          })}
          src={props.img}
        />

        <span className="ml-4 w-full">
          <span>
            <Text small className="flex flex-col">
              {props.user}
            </Text>
          </span>
          <p
            className={clsx({
              "text-xs mt-2   p-2 rounded-lg flex flex-col ": true,
              "bg-light": !props?.isUser,
              "bg-sub text-white": props?.isUser,
            })}
          >
            <span>{props.content}</span>
            <span className="text-2xs opacity-50 mt-1">
              <Moment fromNow={props.date} />
            </span>
          </p>
        </span>
      </div>
    </div>
  );
};

const msgs = [
  {
    username: "ahmed saeed",
    content: "hello world i am just testing this message",
    img: "https://res.cloudinary.com/islam-saeed/image/upload/v1660596786/62fab231b8d606033511c262.webp",
    date: new Date(),
  },
  {
    username: "islam saeed",
    content: "hello world",
    img: "https://res.cloudinary.com/islam-saeed/image/upload/v1660596786/62fab231b8d606033511c262.webp",
    date: new Date(),
  },
  {
    username: "islam saeed",
    content: "hello world",
    img: "https://res.cloudinary.com/islam-saeed/image/upload/v1660596786/62fab231b8d606033511c262.webp",
    date: new Date(),
  },
  {
    username: "ahmed saeed",
    content: "hello world i am just testing this message",
    img: "https://res.cloudinary.com/islam-saeed/image/upload/v1660596786/62fab231b8d606033511c262.webp",
    date: new Date(),
  },
  {
    username: "ahmed saeed",
    content: "hello world i am just testing this message",
    img: "https://res.cloudinary.com/islam-saeed/image/upload/v1660596786/62fab231b8d606033511c262.webp",
    date: new Date(),
  },
];

export default function Chat(props) {
  const user = useSelector((st) => st?.auth?.user);
  const [messages, setMessages] = useState([]);
  const [joined, setJoined] = useState(false);
  const socket = useMemo(() => socket_(), []);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [isAdminConnected, setIsAdminConnected] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [waitForAdmin, setWaitForAdmin] = useState(false);
  const [peek, setPeek] = useState(-1);
  const [room, setRoom] = useState(null);
  const [msg, setMsg] = useState("");

  const sendMessage = useCallback(() => {
    if (msg && room) {
      socket.emit("push.message", {
        date: Date.now(),
        content: msg,
        sender: user?._id,
        room,
      });
      setMsg("");
    }
  }, [msg, room]);

  const requestChat = useCallback(() => {
    if (socket && isConnected && !joined && user) {
      socket.emit("user.require-chat", { id: user._id });
    }
  }, [user, joined, isConnected]);

  useEffect(() => {
    if (socket && user) {
      socket.on("connect", () => {
        console.log("connected");
        setIsConnected(true);
      });

      socket.on("disconnect", () => {
        setIsConnected(false);
      });

      /**
       * base events
       */

      socket.on("wait.for.accept", (data) => {
        setPeek(parseInt(data.peek));
        setWaitForAdmin(true);
      });

      socket.on("socket.ready", (data) => {
        setAdmin(data.admin);
        setIsAdminConnected(true);
        socket.emit("socket.ok", {
          admin_id: data?.admin?._id,
          user_id: user?._id,
        });
      });

      socket.on("session.starts", (data) => {
        console.log("session starts");
        setRoom(data.room);
        setJoined(true);
        setWaitForAdmin(false);
      });

      socket.on("messages", ({ messages }) => {
        setMessages(messages);
      });

      window.addEventListener("close", (t) => {
        socket.emit("user.disconnect", { id: user?._id });
      });

      window.addEventListener("beforeunload", () => {
        socket.emit("user.disconnect", { id: user?._id });
      });

      window.addEventListener("offline", () => {
        socket.emit("user.disconnect", { id: user?._id });
      });

      window.addEventListener("unload", () => {
        socket.emit("user.disconnect", { id: user?._id });
      });

      return () => {
        socket.emit("user.disconnect", { id: user?._id });
        socket.off("connect");
        socket.off("disconnect");
        socket.off("user.queue");
        socket.off("room.init");
        socket.off("room.message");
        socket.off("error");
        socket.off("user.leave.message");
      };
    }
  }, [user, socket]);
  return (
    <AuthGuard>
      <Layout>
        <section className="min-h-screen">
          <div>
            <Text h3>chat with us !</Text>
          </div>
          <div className="flex flex-col bg-white rounded-lg relative">
            {waitForAdmin ? (
              <div className="h-full bg-white z-30 flex flex-col rounded-md justify-center items-center w-full absolute top-0 left-0">
                <Loading type="points" />
                <Text className="pt-5">please wait for admin</Text>
                <Text>your queue number is : {peek}</Text>
              </div>
            ) : null}
            <div className="flex flex-row w-full justify-between">
              <div className="p-4 flex flex-row items-center justify-start">
                <span className="mr-4">
                  <FontAwesomeIcon
                    className={clsx({
                      "opacity-50": !isAdminConnected,
                      "text-success": isAdminConnected,
                    })}
                    icon="headset"
                  />
                </span>
                {admin?.username || "no admins connected yet"}
              </div>
              <div className="p-4 flex flex-row items-center justify-start">
                <FontAwesomeIcon
                  icon="dot-circle"
                  className={clsx({
                    "opacity-50": !isAdminConnected,
                    "text-success": isAdminConnected,
                  })}
                />
              </div>
            </div>
            <hr />
            <div className="flex-1 p-4">
              <Bar style={{ height: 300 }} className="relative">
                {joined ? (
                  messages.map((m, x) => {
                    return (
                      <Message
                        x={x}
                        img={m?.sender?.profileImg}
                        content={m?.content}
                        user={m?.sender?.username}
                        date={m?.date}
                        isUser={m?.sender?.username === user?.username}
                      />
                    );
                  })
                ) : (
                  <p className="absolute top-0 left-0  w-full h-full flex flex-col  justify-center items-center">
                    <FontAwesomeIcon icon={"face-frown"} size="xl" />
                    <span className="text-primary bold text-xl">
                      there is no messages yet !
                    </span>
                  </p>
                )}
              </Bar>
            </div>
            <hr />
            <div className="relative">
              <input
                className={clsx({
                  "input w-full bg-lighter rounded-b-lg rounded-t-none": true,
                  "input-disabled": !joined,
                })}
                disabled={!joined}
                placeholder="type a message here !"
                type={"text"}
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                    setMsg("");
                  }
                }}
              />
              <button
                onClick={() => sendMessage()}
                className={clsx({
                  "absolute btn btn-ghost right-0": true,
                  "btn-disabled": !joined,
                })}
                disabled={!joined}
              >
                <FontAwesomeIcon icon="paper-plane" size="lg" />
              </button>
            </div>
          </div>
          <div className="mt-4">
            {joined ? (
              <Button onClick={() => window.location.replace("/")}>
                leave
              </Button>
            ) : (
              <Button onClick={() => requestChat()} disabled={waitForAdmin}>
                {waitForAdmin ? <Loading color="primary" /> : "request a chat"}
              </Button>
            )}
          </div>
        </section>
      </Layout>
    </AuthGuard>
  );
}
