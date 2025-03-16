"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navigation = [
  { name: "About", target: "about" },
  { name: "Our-Agents", target: "agents" },
  { name: "All Services", target: "services" },
  { name: "Testimonials", target: "testimonials" },
];

export default function Header2() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide header when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    const handleMouseMove = (event: MouseEvent) => {
      // Show header when the mouse is near the top of the viewport (within 50px)
      if (event.clientY <= 50) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [lastScrollY]);

  // Smooth scroll to section
  const scrollToSection = (target: string) => {
    const section = document.getElementById(target);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <button
            onClick={() => scrollToSection("hero")}
            className="-m-1.5 p-1.5 text-xl font-bold text-white cursor-pointer"
          >
            equigle
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Menu className="text-white h-6 w-6 cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#0a0a0a] border border-white/10 text-white mt-2 rounded-lg shadow-lg">
              {navigation.map((item) => (
                <DropdownMenuItem key={item.name}>
                  <button
                    onClick={() => {
                      scrollToSection(item.target);
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full px-4 py-2 text-left"
                    style={{ cursor: "pointer" }}
                  >
                    {item.name}
                  </button>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem>
                <Button className="w-full mt-2 bg-white text-black">
                  Get Started
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.target)}
              className="text-sm font-semibold leading-6 text-white/70 hover:text-white transition-colors"
              style={{ cursor: "pointer" }}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Contact button */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Button
            asChild
            className="bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
          >
            <button onClick={() => scrollToSection("contact")}>Contact</button>
          </Button>
        </div>
      </nav>
    </header>
  );
}
