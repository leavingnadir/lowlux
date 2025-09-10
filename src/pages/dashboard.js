import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [data, setData] = useState({
  temperature: 0,
  humidity: 0,
  brightness: 0,
  peopleCount: 0,
  energySaving: 0,
  });

  const [tempData, setTempData] = useState([]);
  const [peopleData, setPeopleData] = useState([]);
  const [totalPeopleCount, setTotalPeopleCount] = useState(0);

  const ws = useRef(null);

  // ✅ Load saved data after mount (avoid SSR hydration issues)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTemp = localStorage.getItem("tempData");
      const savedPeople = localStorage.getItem("peopleData");
      const savedTotal = localStorage.getItem("totalPeopleCount");

      if (savedTemp) setTempData(JSON.parse(savedTemp));
      if (savedPeople) setPeopleData(JSON.parse(savedPeople));
      if (savedTotal) setTotalPeopleCount(JSON.parse(savedTotal));
    }
  }, []);

  useEffect(() => {
    ws.current = new WebSocket("ws://192.168.8.198:5000");

    ws.current.onmessage = (event) => {
      const newData = JSON.parse(event.data);

      // Update live data
      setData((prev) => ({ ...prev, ...newData }));

      // Temperature history
      setTempData((prev) => {
        const updated = [
          ...prev,
          { time: new Date().toLocaleTimeString(), value: newData.temperature },
        ];
        if (updated.length > 10) updated.shift();
        localStorage.setItem("tempData", JSON.stringify(updated));
        return updated;
      });

      // People count history
      setPeopleData((prev) => {
        const updated = [
          ...prev,
          { time: new Date().toLocaleTimeString(), count: newData.peopleCount },
        ];
        if (updated.length > 10) updated.shift();
        localStorage.setItem("peopleData", JSON.stringify(updated));
        return updated;
      });
    };

    return () => ws.current && ws.current.close();
  }, [data.peopleCount]);

  return (
    <>
    {/* Head Section */}
      <Head>
        <title>Lowlux Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

    <div className="min-h-screen bg-gray-100 text-black p-6">
            <div className="flex items-center justify-between mb-12">
                {/* Left: Logo + Dashboard */}
                <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold">LOWLUX Dashboard</h1>
                </div>

                {/* Right: Home Button */}
                <Link href="/" passHref>
                <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-700 transition">
                    Home
                </button>
                </Link>
            </div>
      
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Temperature */}
          <Card className="text-black p-4 rounded-2xl shadow-md border">
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-medium">🌡️ Temperature</span>
            </div>
            <h2 className="text-4xl font-semibold">{data.temperature} °C</h2>
            <div className="h-20 mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={tempData}>
                  <defs>
                    <linearGradient id="tempFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#e5e5e5" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#000000"
                    strokeWidth={2}
                    dot={false}
                    fill="url(#tempFill)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        <Card className="rounded-2xl shadow-md border">
          <CardHeader>
            <CardTitle className="text-lg font-medium">💧 Humidity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-6xl font-semibold">{data.humidity} %</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-md border">
          <CardHeader>
            <CardTitle className="text-lg font-medium">💡 Brightness</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-6xl font-semibold">{data.brightness} %</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-md border">
          <CardHeader>
            <CardTitle className="text-lg font-medium">👥 People Count</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-5xl font-semibold">{data.peopleCount}</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-md border">
          <CardHeader>
            <CardTitle className="text-lg font-medium">⚡ Energy Saving</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-5xl font-semibold">{data.energySaving} ms</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                <div>
                    <CardTitle>Temperature Analytics</CardTitle>
                </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={tempData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#f87171"
                        strokeWidth={3}
                        dot={{ r: 6, fill: "#f87171" }}
                        activeDot={{ r: 8 }}
                    />
                    </LineChart>
                </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>

        {/* People Count Analytics */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>People Count Analytics</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={peopleData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#0c0c0cff" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </>
  );
}
