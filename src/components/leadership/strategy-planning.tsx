"use client";

import { useState } from "react";
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
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Target, CheckCircle, AlertCircle, Clock } from "lucide-react";

interface OKR {
  id: string;
  objective: string;
  description: string;
  progress: number;
  status: "on_track" | "at_risk" | "behind";
  keyResults: {
    id: string;
    description: string;
    target: number;
    current: number;
    unit: string;
  }[];
  timeline: {
    start: Date;
    end: Date;
  };
}

interface Initiative {
  id: string;
  name: string;
  status: "not_started" | "in_progress" | "completed" | "blocked";
  progress: number;
  owner: string;
  priority: "high" | "medium" | "low";
  dependencies: string[];
  deadline: Date;
}

const mockData = {
  okrs: [
    {
      id: "1",
      objective: "Achieve Market Leadership",
      description: "Become the top player in our market segment",
      progress: 75,
      status: "on_track",
      keyResults: [
        {
          id: "kr1",
          description: "Increase market share",
          target: 30,
          current: 22,
          unit: "%",
        },
        {
          id: "kr2",
          description: "Customer satisfaction score",
          target: 90,
          current: 85,
          unit: "%",
        },
        {
          id: "kr3",
          description: "Monthly active users",
          target: 100000,
          current: 75000,
          unit: "users",
        },
      ],
      timeline: {
        start: new Date("2024-01-01"),
        end: new Date("2024-12-31"),
      },
    },
    {
      id: "2",
      objective: "Scale Operations",
      description: "Expand operational capabilities globally",
      progress: 60,
      status: "at_risk",
      keyResults: [
        {
          id: "kr4",
          description: "New market penetration",
          target: 5,
          current: 2,
          unit: "markets",
        },
        {
          id: "kr5",
          description: "Operational efficiency",
          target: 95,
          current: 82,
          unit: "%",
        },
      ],
      timeline: {
        start: new Date("2024-01-01"),
        end: new Date("2024-12-31"),
      },
    },
  ],
  initiatives: [
    {
      id: "1",
      name: "Global Platform Launch",
      status: "in_progress",
      progress: 65,
      owner: "Product Team",
      priority: "high",
      dependencies: ["Market Research", "Tech Infrastructure"],
      deadline: new Date("2024-06-30"),
    },
    {
      id: "2",
      name: "Customer Success Program",
      status: "in_progress",
      progress: 80,
      owner: "Customer Success",
      priority: "medium",
      dependencies: ["Training Materials", "Support Tools"],
      deadline: new Date("2024-04-30"),
    },
  ],
  progressTrend: Array.from({ length: 6 }, (_, i) => ({
    month: new Date(2024, i).toLocaleString("default", { month: "short" }),
    objectives: Math.floor(Math.random() * 20) + 70,
    initiatives: Math.floor(Math.random() * 20) + 60,
  })),
};

export default function StrategyPlanning() {
  const [data] = useState(mockData);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on_track":
        return "text-green-500";
      case "at_risk":
        return "text-yellow-500";
      case "behind":
      case "blocked":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "on_track":
        return "bg-green-100 text-green-800";
      case "at_risk":
        return "bg-yellow-100 text-yellow-800";
      case "behind":
      case "blocked":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Overview Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Strategic Progress Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer>
              <LineChart data={data.progressTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="objectives"
                  stroke="#8884d8"
                  name="Objectives Progress"
                />
                <Line
                  type="monotone"
                  dataKey="initiatives"
                  stroke="#82ca9d"
                  name="Initiatives Progress"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* OKRs */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Objectives & Key Results</h2>
        {data.okrs.map((okr) => (
          <Card key={okr.id}>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{okr.objective}</h3>
                    <p className="text-sm text-gray-500">{okr.description}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${getStatusBg(
                      okr.status
                    )}`}
                  >
                    {okr.status.replace("_", " ").toUpperCase()}
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${
                      okr.progress >= 75
                        ? "bg-green-600"
                        : okr.progress >= 50
                        ? "bg-yellow-600"
                        : "bg-red-600"
                    }`}
                    style={{ width: `${okr.progress}%` }}
                  ></div>
                </div>

                <div className="space-y-3">
                  {okr.keyResults.map((kr) => (
                    <div
                      key={kr.id}
                      className="pl-4 border-l-2 border-gray-200"
                    >
                      <div className="flex justify-between items-center">
                        <p className="text-sm">{kr.description}</p>
                        <p className="text-sm font-semibold">
                          {kr.current}
                          {kr.unit} / {kr.target}
                          {kr.unit}
                        </p>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5 mt-1">
                        <div
                          className="bg-blue-600 h-1.5 rounded-full"
                          style={{
                            width: `${(kr.current / kr.target) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between text-sm text-gray-500">
                  <span>Start: {okr.timeline.start.toLocaleDateString()}</span>
                  <span>End: {okr.timeline.end.toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Strategic Initiatives */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Strategic Initiatives</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.initiatives.map((initiative) => (
            <Card key={initiative.id}>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{initiative.name}</h3>
                      <p className="text-sm text-gray-500">
                        Owner: {initiative.owner}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getStatusBg(
                        initiative.status
                      )}`}
                    >
                      {initiative.status.replace("_", " ").toUpperCase()}
                    </span>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-1">Progress</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          initiative.priority === "high"
                            ? "bg-red-600"
                            : initiative.priority === "medium"
                            ? "bg-yellow-600"
                            : "bg-green-600"
                        }`}
                        style={{ width: `${initiative.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-1">Dependencies</p>
                    <div className="flex flex-wrap gap-2">
                      {initiative.dependencies.map((dep) => (
                        <span
                          key={dep}
                          className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                        >
                          {dep}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">
                      Deadline: {initiative.deadline.toLocaleDateString()}
                    </span>
                    <span
                      className={`font-medium ${
                        initiative.priority === "high"
                          ? "text-red-500"
                          : initiative.priority === "medium"
                          ? "text-yellow-500"
                          : "text-green-500"
                      }`}
                    >
                      {initiative.priority.toUpperCase()} Priority
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
