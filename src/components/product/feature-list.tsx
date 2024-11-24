"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Badge } from "@/components/ui/badge";
// Updated imports from lucide-react
import { ArrowUp, ArrowDown, Target, Wrench, Clock } from "lucide-react";

interface Feature {
  id: string;
  name: string;
  description: string;
  priority: number;
  status: "planned" | "in_progress" | "completed";
  impact: number;
  effort: number;
}

const mockFeatures: Feature[] = [
  {
    id: "1",
    name: "User Authentication",
    description: "Implement OAuth and social login options",
    priority: 8,
    status: "in_progress",
    impact: 9,
    effort: 7,
  },
  {
    id: "2",
    name: "Dashboard Analytics",
    description: "Create comprehensive analytics dashboard",
    priority: 7,
    status: "planned",
    impact: 8,
    effort: 6,
  },
  {
    id: "3",
    name: "File Sharing",
    description: "Add file sharing and collaboration features",
    priority: 6,
    status: "planned",
    impact: 7,
    effort: 5,
  },
  {
    id: "4",
    name: "Mobile App",
    description: "Develop mobile application version",
    priority: 9,
    status: "in_progress",
    impact: 9,
    effort: 8,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800";
    case "in_progress":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function FeaturesList() {
  const [features] = useState<Feature[]>(mockFeatures);

  return (
    <div className="space-y-6">
      {/* Priority Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Feature Priority Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={features}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="impact" fill="#8884d8" name="Impact" />
                <Bar dataKey="effort" fill="#82ca9d" name="Effort" />
                <Bar dataKey="priority" fill="#ffc658" name="Priority" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feature) => (
          <Card key={feature.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">
                {feature.name}
              </CardTitle>
              <Badge className={getStatusColor(feature.status)}>
                {feature.status.replace("_", " ").toUpperCase()}
              </Badge>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                {feature.description}
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">
                    Priority
                  </span>
                  <div className="flex items-center mt-1">
                    <Target className="w-4 h-4 mr-1 text-blue-500" />
                    <span className="text-lg font-bold">
                      {feature.priority}/10
                    </span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">
                    Impact
                  </span>
                  <div className="flex items-center mt-1">
                    <ArrowUp className="w-4 h-4 mr-1 text-green-500" />
                    <span className="text-lg font-bold">
                      {feature.impact}/10
                    </span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">
                    Effort
                  </span>
                  <div className="flex items-center mt-1">
                    <Wrench className="w-4 h-4 mr-1 text-orange-500" />
                    <span className="text-lg font-bold">
                      {feature.effort}/10
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
