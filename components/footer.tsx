"use client";
import Link from "next/link";
import {
  Mail,
  MapPin,
  Linkedin,
  Instagram,
  Twitter,
  Github,
} from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { urlToHttpOptions } from "url";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [snapClass, setSnapClass] = useState("snap-none");
  const currentPath = usePathname();

  useEffect(() => {
    // Set snap-none on initial load or route change
    setSnapClass("snap-none");

    // Delay changing to snap-start after 0.5 seconds
    const timeout = setTimeout(() => {
      setSnapClass("snap-start");
    }, 500);

    // Clear timeout on cleanup to avoid memory leaks
    return () => clearTimeout(timeout);
  }, []);

  const navigation = [
    { name: "Home", target: "hero" },
    { name: "About", target: "about" },
    { name: "Our-Agents", target: "agents" },
    { name: "All Services", target: "services" },
    { name: "Testimonials", target: "testimonials" },
  ];

  const services = [
    { name: "AI Agents", target: "services" },
    { name: "Web Development", target: "services" },
    { name: "Mobile Apps", target: "services" },
    { name: "Clound Solutions", target: "services" },
    { name: "Data Analytics", target: "services" },
  ];

  const scrollToSection = (target: string) => {
    const section = document.getElementById(target);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer
      className={`bg-[#0a0a0a] border-t border-white/10 text-white ${snapClass}`}
    >
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold mb-4">equigle</h3>
            <p className="text-gray-400 mb-4 text-sm">
              Building intelligent AI agents that automate tasks, provide
              insights, and enhance productivity across your organization.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/5 rounded-full hover:bg-purple-900/30 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/5 rounded-full hover:bg-purple-900/30 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/5 rounded-full hover:bg-purple-900/30 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-purple-400">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {navigation.map((Item) => (
                <li key={Item.name}>
                  <button
                    onClick={() => scrollToSection(Item.target)}
                    className="text-gray-400 hover:text-white transition-colors"
                    style={{ cursor: "pointer" }}
                  >
                    {Item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-purple-400">
              Our Services
            </h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <button
                    onClick={() => scrollToSection(service.target)}
                    className="text-gray-400 hover:text-white transition-colors"
                    style={{ cursor: "pointer" }}
                  >
                    {service.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-purple-400">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-purple-400 mr-2 mt-0.5" />
                <span className="text-gray-400">
                  123 Innovation Drive
                  <br />
                  Tech City, TC 10101
                </span>
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-purple-400 mr-2"
                >
                  <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                  <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                  <path d="M13.5 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                  <path d="M9 13.5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 0-1h-5a.5.5 0 0 0-.5.5Z" />
                </svg>
                <a
                  href="https://wa.me/15551234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-purple-400 mr-2" />
                <a
                  href="mailto:contact@equigle.com"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  contact@equigle.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} Equigle. All rights reserved.
          </p>

          <div className="mt-4 md:mt-0 flex items-center">
            <span className="text-gray-500 text-sm">
              Designed & Developed by
            </span>
            <a
              href="https://github.com/developer"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center ml-2 text-purple-400 hover:text-purple-300 transition-colors"
            >
              <span className="text-sm">Developer</span>
              <Github className="h-4 w-4 ml-1" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
