"use client";

import { useState, useEffect, useCallback } from "react";
import TestimonialCard from "../ui/testimonial-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    company: "Acme Corp",
    review:
      "This product changed my life! Highly recommended. The AI agents have automated so many of our processes and saved us countless hours.",
    imageUrl:
      "https://images.unsplash.com/photo-1613323593608-abc90fec84ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    name: "Jane Smith",
    company: "Tech Innovate",
    review:
      "Exceptional service and quality. Will definitely come back! The team at Equigle really understood our business needs and delivered beyond expectations.",
    imageUrl: "https://source.unsplash.com/50x50/?portrait?2",
  },
  {
    id: 3,
    name: "Samuel Green",
    company: "GreenTech",
    review:
      "Reliable and efficient. Great experience overall. Their AI agents have transformed how we handle customer support, and our satisfaction ratings have improved by 30%.",
    imageUrl: "https://source.unsplash.com/50x50/?portrait?3",
  },
  {
    id: 4,
    name: "Alice Blue",
    company: "Creative Minds",
    review:
      "Outstanding support and quality. Highly satisfied! The web development team created a beautiful, responsive site that has increased our conversions significantly.",
    imageUrl: "https://source.unsplash.com/50x50/?portrait?4",
  },
  {
    id: 5,
    name: "Michael Black",
    company: "Blackstone Ltd",
    review:
      "Top-notch service and incredible results! The data analytics solutions provided by Equigle have given us insights we never thought possible.",
    imageUrl: "https://source.unsplash.com/50x50/?portrait?5",
  },
];

function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [api, setApi] = useState<any>(null);

  // Handle manual navigation
  const goToSlide = useCallback(
    (index: number) => {
      if (api) {
        api.scrollTo(index);
      }
      setActiveIndex(index);
    },
    [api]
  );

  // Automatically move to the next slide
  useEffect(() => {
    const interval = setInterval(() => {
      if (api) {
        const nextIndex = (activeIndex + 1) % testimonials.length;
        api.scrollTo(nextIndex);
        setActiveIndex(nextIndex);
      }
    }, 7000); // Change slide every 7 seconds (slower)

    return () => clearInterval(interval); // Clean up on component unmount
  }, [activeIndex, api]);

  // Update active index when carousel changes
  const handleSelect = useCallback(() => {
    if (!api) return;
    setActiveIndex(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    api.on("select", handleSelect);
    api.on("reInit", handleSelect);
    return () => {
      api.off("select", handleSelect);
      api.off("reInit", handleSelect);
    };
  }, [api, handleSelect]);

  return (
    <section className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-gray-100 snap-start overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-5 mt-5">
          <h1 className="text-4xl font-semibold leading-none text-center mb-4">
            What our customers are saying
          </h1>
        </div>

        <div className="relative max-w-6xl mx-auto mt-10">
          <div className="w-30 h-1 bg-violet-400 rounded mx-auto"></div>
          <Carousel
            setApi={setApi}
            className="w-full"
            opts={{
              align: "center",
              loop: true,
              containScroll: false,
            }}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem
                  key={testimonial.id}
                  className="pl-2 md:pl-4 md:basis-2/3 lg:basis-1/2 transition-all duration-1000 ease-in-out"
                >
                  <div
                    className={cn(
                      "transition-all duration-1000 ease-in-out transform",
                      activeIndex === index
                        ? "opacity-100 scale-100"
                        : index === (activeIndex + 1) % testimonials.length ||
                          index ===
                            (activeIndex - 1 + testimonials.length) %
                              testimonials.length
                        ? "opacity-50 scale-90"
                        : "opacity-30 scale-85"
                    )}
                  >
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Custom navigation buttons */}
            <div className="absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2 z-10 sm:opacity-100 opacity-0">
              <button
                onClick={() => {
                  const prevIndex =
                    (activeIndex - 1 + testimonials.length) %
                    testimonials.length;
                  goToSlide(prevIndex);
                }}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-lg backdrop-blur-sm hover:bg-violet-100 dark:hover:bg-violet-900/50 transition-all duration-300"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6 text-violet-600 dark:text-violet-400" />
              </button>
            </div>

            <div className="absolute -right-4 md:-right-8 top-1/2 -translate-y-1/2 z-10 sm:opacity-100 opacity-0">
              <button
                onClick={() => {
                  const nextIndex = (activeIndex + 1) % testimonials.length;
                  goToSlide(nextIndex);
                }}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-lg backdrop-blur-sm hover:bg-violet-100 dark:hover:bg-violet-900/50 transition-all duration-300"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6 text-violet-600 dark:text-violet-400" />
              </button>
            </div>
          </Carousel>

          {/* Navigation dots */}
          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-500 ease-in-out rounded-full ${
                  activeIndex === index
                    ? "bg-violet-500 w-8 h-3"
                    : "bg-gray-300 dark:bg-gray-600 w-3 h-3 hover:bg-violet-300 dark:hover:bg-violet-700"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
