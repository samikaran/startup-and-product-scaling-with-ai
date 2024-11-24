"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Decision {
  id: string;
  title: string;
  description: string;
  impact: number;
  risk: number;
  effort: number;
  probability: number;
  category: string;
  deadline: Date;
  stakeholders: string[];
}

const mockDecisions: Decision[] = [
  {
    id: "1",
    title: "International Expansion",
    description: "Expand operations to European market",
    impact: 85,
    risk: 65,
    effort: 80,
    probability: 70,
    category: "Growth",
    deadline: new Date("2024-12-31"),
    stakeholders: ["CEO", "Sales Director", "Operations Lead"],
  },
  {
    id: "2",
    title: "Product Line Extension",
    description: "Launch enterprise version of the product",
    impact: 75,
    risk: 45,
    effort: 60,
    probability: 85,
    category: "Product",
    deadline: new Date("2024-09-30"),
    stakeholders: ["Product Manager", "Engineering Lead", "Sales Director"],
  },
  {
    id: "3",
    title: "Strategic Partnership",
    description: "Form partnership with major cloud provider",
    impact: 90,
    risk: 55,
    effort: 70,
    probability: 75,
    category: "Partnership",
    deadline: new Date("2024-10-31"),
    stakeholders: ["CEO", "Business Development", "Legal"],
  },
];

export default function DecisionSupport() {
  const [decisions] = useState(mockDecisions);

  return (
    <div className="space-y-6">
      {/* Decision Matrix Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Decision Impact vs Risk Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer>
              <BarChart data={decisions}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="title" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="impact" fill="#8884d8" name="Impact" />
                <Bar dataKey="risk" fill="#82ca9d" name="Risk" />
                <Bar
                  dataKey="probability"
                  fill="#ffc658"
                  name="Success Probability"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Decision Cards */}
      <div className="grid grid-cols-1 gap-4">
        {decisions.map((decision) => (
          <Card key={decision.id}>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{decision.title}</h3>
                    <p className="text-sm text-gray-500">
                      {decision.description}
                    </p>
                  </div>
                  <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                    {decision.category}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Impact</p>
                    <p className="text-lg font-semibold">{decision.impact}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Risk</p>
                    <p
                      className={`text-lg font-semibold ${
                        decision.risk > 70
                          ? "text-red-500"
                          : decision.risk > 40
                          ? "text-yellow-500"
                          : "text-green-500"
                      }`}
                    >
                      {decision.risk}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Effort</p>
                    <p className="text-lg font-semibold">{decision.effort}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Success Probability</p>
                    <p className="text-lg font-semibold text-blue-500">
                      {decision.probability}%
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-gray-500 mb-2">Stakeholders</p>
                  <div className="flex flex-wrap gap-2">
                    {decision.stakeholders.map((stakeholder) => (
                      <span
                        key={stakeholder}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {stakeholder}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-gray-500">Deadline</p>
                  <p className="text-sm">
                    {decision.deadline.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
