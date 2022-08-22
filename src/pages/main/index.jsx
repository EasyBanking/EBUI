import { AuthGuard } from "../../wrappers/Auth";
import { Layout } from "../../components/base";
import { Container, Grid, Text } from "@nextui-org/react";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import HttpClient from "../../Http-Client";
import { useNavigate } from "react-router-dom";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function Main(props) {
  const user = useSelector((st) => st?.auth?.user);
  const router = useNavigate();

  const [topSenders, setTopSenders] = useState([]);
  const [topReceviers, setTopReceviers] = useState([]);

  useEffect(() => {
    HttpClient.get("/account/stats")
      .then(({ data }) => {
        setTopReceviers(data?.["TOP Receivers"] || []);
        setTopReceviers(data?.["TOP Senders"] || []);
      })
      .catch((err) => {
        console.log(err);
        router("/error");
      });
  }, []);

  return (
    <AuthGuard>
      <Layout>
        <section className="min-h-screen">
          <div>
            <Text weight={"bold"} h2>
              welcome back{" "}
              <span className="text-primary">{user?.account?.firstName}</span>
            </Text>
          </div>
          <div className="shadow-lg bg-primary w-1/2 text-white p-4 rounded-lg mt-6">
            <div className="flex flex-row justify-between items-center">
              <span>balance</span>
              <span>{user?.account?.balance}EGP</span>
            </div>
          </div>

          {topReceviers.length ? (
            <div className="mt-5">
              <div className="mb-4">
                <Text h5>Most Receivers</Text>
              </div>
              <Grid.Container gap={1}>
                {topReceviers?.map((t) => {
                  return (
                    <Grid sm={4}>
                      <div className="bg-primary rounded-md  flex flex-col items-center justify-center shadow-2xl w-full h-40 text-white">
                        <Text h6 color="white">
                          {t?.account?.[0]?.firstName +
                            " " +
                            t?.account?.[0]?.lastName}
                        </Text>
                        <span className="mt-2 bold text-xs">{t?.count}</span>
                      </div>
                    </Grid>
                  );
                })}
              </Grid.Container>
            </div>
          ) : null}

          {topSenders?.length ? (
            <div className="mt-5">
              <div className="mb-4">
                <Text h5>Most Senders</Text>
              </div>
              <Grid.Container gap={1}>
                {topSenders?.map((t) => {
                  return (
                    <Grid sm={4}>
                      <div className="bg-primary rounded-md  flex flex-col items-center justify-center shadow-2xl w-full h-40 text-white">
                        <Text h6 color="white">
                          {t?.account?.[0]?.firstName +
                            " " +
                            t?.account?.[0]?.lastName}
                        </Text>
                        <span className="mt-2 bold text-xs">{t?.count}</span>
                      </div>
                    </Grid>
                  );
                })}
              </Grid.Container>
            </div>
          ) : null}

          <div className="mt-12" style={{ height: 280 }}>
            <Text h5>monthly receevs</Text>
            <ResponsiveContainer width="100%" height="100%" className={"mt-5"}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="uv" fill="#7209b7" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-12" style={{ height: 280 }}>
            <Text h5>monthly tranforms</Text>
            <ResponsiveContainer width="100%" height="100%" className={"mt-5"}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="uv" fill="#3a0ca3" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </Layout>
    </AuthGuard>
  );
}
