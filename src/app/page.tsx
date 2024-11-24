import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const sections = [
    {
      title: "Product Management",
      description: "Manage features, analyze feedback, and track user behavior",
      link: "/product",
    },
    {
      title: "Business Scaling",
      description:
        "Monitor growth metrics, optimize resources, and forecast revenue",
      link: "/business",
    },
    {
      title: "Startup Leadership",
      description:
        "Track team performance, make data-driven decisions, and plan strategy",
      link: "/leadership",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">Welcome to AI Startup Suite</h1>
      <p className="text-xl text-gray-600">
        Your all-in-one platform for managing and scaling your startup with AI
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {sections.map((section) => (
          <Link key={section.title} href={section.link}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{section.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
