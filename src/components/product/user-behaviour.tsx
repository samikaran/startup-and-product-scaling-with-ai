"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
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
import { Users, Clock, ArrowUp, ArrowDown } from "lucide-react";

interface UserMetrics {
  date: string;
  activeUsers: number;
  sessionDuration: number;
  retentionRate: number;
  engagement: number;
}

interface FeatureUsage {
  name: string;
  usage: number;
  trend: number;
}

const mockUserMetrics: UserMetrics[] = [
  {
    date: "Mon",
    activeUsers: 1200,
    sessionDuration: 15,
    retentionRate: 85,
    engagement: 75,
  },
  {
    date: "Tue",
    activeUsers: 1350,
    sessionDuration: 17,
    retentionRate: 82,
    engagement: 78,
  },
  {
    date: "Wed",
    activeUsers: 1500,
    sessionDuration: 14,
    retentionRate: 88,
    engagement: 80,
  },
  {
    date: "Thu",
    activeUsers: 1400,
    sessionDuration: 16,
    retentionRate: 86,
    engagement: 77,
  },
  {
    date: "Fri",
    activeUsers: 1600,
    sessionDuration: 18,
    retentionRate: 84,
    engagement: 82,
  },
  {
    date: "Sat",
    activeUsers: 1300,
    sessionDuration: 15,
    retentionRate: 83,
    engagement: 76,
  },
  {
    date: "Sun",
    activeUsers: 1100,
    sessionDuration: 13,
    retentionRate: 81,
    engagement: 74,
  },
];

const mockFeatureUsage: FeatureUsage[] = [
  { name: "Dashboard", usage: 850, trend: 12 },
  { name: "Analytics", usage: 650, trend: 8 },
  { name: "Reports", usage: 450, trend: -5 },
  { name: "Settings", usage: 350, trend: 3 },
  { name: "Profile", usage: 250, trend: 6 },
];

const summaryMetrics = [
  {
    title: "Total Active Users",
    value: "1,600",
    change: "+12%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Avg. Session Duration",
    value: "16 min",
    change: "+8%",
    trend: "up",
    icon: Clock,
  },
  {
    title: "Retention Rate",
    value: "85%",
    change: "+5%",
    trend: "up",
    icon: ArrowUp,
  },
];

export default function UserBehavior() {
  const [metrics] = useState(mockUserMetrics);
  const [featureUsage] = useState(mockFeatureUsage);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {summaryMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.title}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {metric.title}
                    </p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                  </div>
                  <Icon className="h-8 w-8 text-gray-400" />
                </div>
                <div className="mt-2 flex items-center">
                  {metric.trend === "up" ? (
                    <ArrowUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowDown className="h-4 w-4 text-red-500" />
                  )}
                  <span
                    className={`ml-1 ${
                      metric.trend === "up" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {metric.change}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Active Users Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Active Users Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={metrics}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="activeUsers"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Engagement Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Engagement Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={metrics}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="engagement"
                  stroke="#8884d8"
                  name="Engagement Rate %"
                />
                <Line
                  type="monotone"
                  dataKey="retentionRate"
                  stroke="#82ca9d"
                  name="Retention Rate %"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Feature Usage */}
      <Card>
        <CardHeader>
          <CardTitle>Feature Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={featureUsage}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="usage" fill="#8884d8" name="Usage Count" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Feature Usage Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {featureUsage.map((feature) => (
          <Card key={feature.name}>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">{feature.name}</h3>
                <span
                  className={`flex items-center ${
                    feature.trend > 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {feature.trend > 0 ? (
                    <ArrowUp className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDown className="h-4 w-4 mr-1" />
                  )}
                  {Math.abs(feature.trend)}%
                </span>
              </div>
              <p className="text-2xl font-bold mt-2">{feature.usage}</p>
              <p className="text-sm text-gray-500">total uses</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
