import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Instagram,
  Twitter,
  Github,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050505] border-t border-white/10 text-white snap-start">
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
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/our-agents"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Our Agents
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  AI Agents
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Web Development
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Mobile Apps
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Cloud Solutions
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Data Analytics
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
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
                <Phone className="h-5 w-5 text-purple-400 mr-2" />
                <a
                  href="tel:+15551234567"
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
