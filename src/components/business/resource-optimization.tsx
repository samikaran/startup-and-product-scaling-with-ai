"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Users, DollarSign, Briefcase, TrendingUp } from "lucide-react";

interface Department {
  name: string;
  budget: number;
  utilized: number;
  headcount: number;
  efficiency: number;
}

interface ResourceAllocation {
  name: string;
  value: number;
  color: string;
}

const mockDepartments: Department[] = [
  {
    name: "Engineering",
    budget: 120000,
    utilized: 95000,
    headcount: 12,
    efficiency: 85,
  },
  {
    name: "Sales",
    budget: 80000,
    utilized: 75000,
    headcount: 8,
    efficiency: 90,
  },
  {
    name: "Marketing",
    budget: 60000,
    utilized: 55000,
    headcount: 5,
    efficiency: 75,
  },
  {
    name: "Operations",
    budget: 40000,
    utilized: 38000,
    headcount: 4,
    efficiency: 95,
  },
];

const mockAllocation: ResourceAllocation[] = [
  { name: "Salaries", value: 65, color: "#0088FE" },
  { name: "Tools", value: 15, color: "#00C49F" },
  { name: "Infrastructure", value: 12, color: "#FFBB28" },
  { name: "Training", value: 8, color: "#FF8042" },
];

const summaryMetrics = [
  {
    title: "Total Headcount",
    value: "29",
    subtext: "+5 from last month",
    icon: Users,
  },
  {
    title: "Total Budget",
    value: "$300,000",
    subtext: "75% utilized",
    icon: DollarSign,
  },
  {
    title: "Avg Efficiency",
    value: "86%",
    subtext: "+3% from last month",
    icon: TrendingUp,
  },
  {
    title: "Departments",
    value: "4",
    subtext: "All operational",
    icon: Briefcase,
  },
];

export default function ResourceOptimization() {
  const [departments] = useState(mockDepartments);
  const [allocation] = useState(mockAllocation);

  return (
    <div className="space-y-6">
      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                    <p className="text-sm text-gray-500">{metric.subtext}</p>
                  </div>
                  <Icon className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Budget Utilization */}
      <Card>
        <CardHeader>
          <CardTitle>Department Budget Utilization</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departments}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Legend />
                <Bar dataKey="budget" fill="#8884d8" name="Budget" />
                <Bar dataKey="utilized" fill="#82ca9d" name="Utilized" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Resource Allocation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Resource Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={allocation}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {allocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Department Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departments} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Bar
                    dataKey="efficiency"
                    fill="#8884d8"
                    name="Efficiency %"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {departments.map((dept) => (
          <Card key={dept.name}>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2">{dept.name}</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Budget</span>
                  <span className="font-medium">
                    ${dept.budget.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Utilized</span>
                  <span className="font-medium">
                    ${dept.utilized.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Headcount</span>
                  <span className="font-medium">{dept.headcount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Efficiency</span>
                  <span className="font-medium">{dept.efficiency}%</span>
                </div>
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${(dept.utilized / dept.budget) * 100}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
