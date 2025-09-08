import { useState } from "react";
import Link from "next/link";
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
  // Sample values
  const [temperature] = useState(28);
  const [humidity] = useState(55);
  const [brightness] = useState(70);
  const [peopleCount, setPeopleCount] = useState(3);
  const [totalPeopleCount, setTotalPeopleCount] = useState(15);
  const [doorOpen, setDoorOpen] = useState(false);
  const [lightOn, setLightOn] = useState(false);
  const [FanOn, setFanOn] = useState(false);
  const [energySaving] = useState(123456);

  // Dummy analytics data for charts
  const tempData = [
    { time: "10AM", value: 25 },
    { time: "11AM", value: 27 },
    { time: "12PM", value: 28 },
    { time: "1PM", value: 30 },
    { time: "2PM", value: 29 },
  ];

  const peopleData = [
    { time: "10AM", count: 2 },
    { time: "11AM", count: 4 },
    { time: "12PM", count: 6 },
    { time: "1PM", count: 3 },
    { time: "2PM", count: 5 },
  ];

  const resetPeopleCount = () => {
    setTotalPeopleCount(totalPeopleCount + peopleCount);
    setPeopleCount(0);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black p-6">
            <div className="flex items-center justify-between mb-12">
                {/* Left: Logo + Dashboard */}
                <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                </div>

                {/* Right: Home Button */}
                <Link href="/" passHref>
                <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-500 transition">
                    Home
                </button>
                </Link>
            </div>
      
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">🌡️ Temperature</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-5xl font-semibold">{temperature} °C</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">💧 Humidity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-5xl font-semibold">{humidity} %</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">💡 Brightness</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-5xl font-semibold">{brightness} %</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">👥 People Count</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-5xl font-semibold">{peopleCount}</p>
            <button
              onClick={resetPeopleCount}
              className="mt-2 px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
            >
              Reset Count
            </button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">📊 Total People Count</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-5xl font-semibold">{totalPeopleCount}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">⚡ Energy Saving</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-5xl font-semibold">{energySaving} ms</p>
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

      {/* Manual Override */}
      <Card>
        <CardHeader>
          <CardTitle>🛠 Manual Override</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <button
              onClick={() => setDoorOpen(!doorOpen)}
              className={`px-4 py-2 rounded-lg ${
                doorOpen ? "bg-red-600" : "bg-green-400"
              }`}
            >
              {doorOpen ? "Close Door" : "Open Door"}
            </button>

            <button
              onClick={() => setLightOn(!lightOn)}
              className={`px-4 py-2 rounded-lg ${
                lightOn ? "bg-yellow-500" : "bg-gray-600"
              }`}
            >
              {lightOn ? "Turn Off Lights" : "Turn On Lights"}
            </button>

            <button
              onClick={() => setFanOn(!FanOn)}
              className={`px-4 py-2 rounded-lg ${
                FanOn ? "bg-blue-500" : "bg-rose-600"
              }`}
            >
              {FanOn ? "Turn Off Fans" : "Turn On Fans"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
