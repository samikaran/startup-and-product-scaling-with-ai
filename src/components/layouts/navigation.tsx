"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BoxesIcon, UsersIcon } from "lucide-react";

export default function Navigation() {
  const pathname = usePathname();

  const navigation = [
    { name: "Product", href: "/product", icon: BoxesIcon },
    { name: "Business", href: "/business", icon: LayoutDashboard },
    { name: "Leadership", href: "/leadership", icon: UsersIcon },
  ];

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <span className="text-xl font-bold">
                <Link href={"/"}>AI Startup Suite</Link>
              </span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                      pathname.startsWith(item.href)
                        ? "border-b-2 border-indigo-500 text-gray-900"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
