"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Users, TrendingUp, Award, Target } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  performance: number;
  engagement: number;
  skills: {
    area: string;
    score: number;
  }[];
  projects: {
    name: string;
    completion: number;
    status: "on_track" | "at_risk" | "delayed";
  }[];
}

interface TeamMetrics {
  date: string;
  productivity: number;
  engagement: number;
  satisfaction: number;
  retention: number;
}

const mockData = {
  members: [
    {
      id: "1",
      name: "John Doe",
      role: "Engineering Lead",
      performance: 92,
      engagement: 88,
      skills: [
        { area: "Technical", score: 95 },
        { area: "Leadership", score: 85 },
        { area: "Communication", score: 80 },
        { area: "Innovation", score: 90 },
        { area: "Teamwork", score: 88 },
      ],
      projects: [
        { name: "API Development", completion: 75, status: "on_track" },
        { name: "System Architecture", completion: 60, status: "at_risk" },
      ],
    },
    {
      id: "2",
      name: "Jane Smith",
      role: "Product Manager",
      performance: 95,
      engagement: 90,
      skills: [
        { area: "Strategy", score: 92 },
        { area: "Leadership", score: 88 },
        { area: "Communication", score: 95 },
        { area: "Analysis", score: 85 },
        { area: "Execution", score: 90 },
      ],
      projects: [
        { name: "Product Roadmap", completion: 85, status: "on_track" },
        { name: "Market Research", completion: 90, status: "on_track" },
      ],
    },
  ],
  metrics: Array.from({ length: 6 }, (_, i) => ({
    date: new Date(2024, i).toLocaleString("default", { month: "short" }),
    productivity: Math.floor(Math.random() * 15) + 80,
    engagement: Math.floor(Math.random() * 15) + 75,
    satisfaction: Math.floor(Math.random() * 15) + 78,
    retention: Math.floor(Math.random() * 10) + 85,
  })),
};

export default function TeamPerformance() {
  const [data] = useState(mockData);

  const overallMetrics = [
    {
      title: "Team Size",
      value: data.members.length,
      icon: Users,
    },
    {
      title: "Avg Performance",
      value:
        data.members.reduce((acc, m) => acc + m.performance, 0) /
        data.members.length,
      icon: TrendingUp,
    },
    {
      title: "Avg Engagement",
      value:
        data.members.reduce((acc, m) => acc + m.engagement, 0) /
        data.members.length,
      icon: Award,
    },
    {
      title: "Projects On Track",
      value: data.members.reduce(
        (acc, m) =>
          acc + m.projects.filter((p) => p.status === "on_track").length,
        0
      ),
      icon: Target,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Overall Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {overallMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.title}>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">{metric.title}</p>
                    <p className="text-2xl font-bold">
                      {typeof metric.value === "number"
                        ? metric.title.includes("Avg")
                          ? `${metric.value.toFixed(1)}%`
                          : metric.value
                        : metric.value}
                    </p>
                  </div>
                  <Icon className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Team Metrics Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Team Performance Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer>
              <LineChart data={data.metrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="productivity"
                  stroke="#8884d8"
                  name="Productivity"
                />
                <Line
                  type="monotone"
                  dataKey="engagement"
                  stroke="#82ca9d"
                  name="Engagement"
                />
                <Line
                  type="monotone"
                  dataKey="satisfaction"
                  stroke="#ffc658"
                  name="Satisfaction"
                />
                <Line
                  type="monotone"
                  dataKey="retention"
                  stroke="#ff7300"
                  name="Retention"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Individual Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.members.map((member) => (
          <div key={member.id} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{member.name} - Skills Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer>
                    <RadarChart cx="50%" cy="50%" outerRadius="80%">
                      <PolarGrid />
                      <PolarAngleAxis dataKey="area" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar
                        name="Skills"
                        dataKey="score"
                        data={member.skills}
                        fill="#8884d8"
                        fillOpacity={0.6}
                      />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Project Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {member.projects.map((project) => (
                    <div key={project.name} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{project.name}</span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            project.status === "on_track"
                              ? "bg-green-100 text-green-800"
                              : project.status === "at_risk"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {project.status.replace("_", " ").toUpperCase()}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full ${
                            project.status === "on_track"
                              ? "bg-green-600"
                              : project.status === "at_risk"
                              ? "bg-yellow-600"
                              : "bg-red-600"
                          }`}
                          style={{ width: `${project.completion}%` }}
                        ></div>
                      </div>
                      <p className="text-right text-sm text-gray-500">
                        {project.completion}% Complete
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
