"use client";

import { useState, useEffect } from "react";
import TestimonialCard from "../ui/testimonial-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    company: "Acme Corp",
    review: "This product changed my life! Highly recommended.",
    imageUrl: "https://source.unsplash.com/50x50/?portrait?1",
  },
  {
    id: 2,
    name: "Jane Smith",
    company: "Tech Innovate",
    review: "Exceptional service and quality. Will definitely come back!",
    imageUrl: "https://source.unsplash.com/50x50/?portrait?2",
  },
  {
    id: 3,
    name: "Samuel Green",
    company: "GreenTech",
    review: "Reliable and efficient. Great experience overall.",
    imageUrl: "https://source.unsplash.com/50x50/?portrait?3",
  },
  {
    id: 4,
    name: "Alice Blue",
    company: "Creative Minds",
    review: "Outstanding support and quality. Highly satisfied!",
    imageUrl: "https://source.unsplash.com/50x50/?portrait?4",
  },
  {
    id: 5,
    name: "Michael Black",
    company: "Blackstone Ltd",
    review: "Top-notch service and incredible results!",
    imageUrl: "https://source.unsplash.com/50x50/?portrait?5",
  },
];

function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Automatically move to the next slide
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === testimonials.length - 2 ? 0 : prevIndex + 1
      );
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Clean up on component unmount
  }, []);

  // Handle manual navigation
  const goToPrevious = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 2 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === testimonials.length - 2 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="my-8 dark:bg-gray-100 dark:text-gray-800 snap-start">
      <div className="container flex flex-col items-center mx-auto mb-12 md:p-10 md:px-12">
        <h1 className="p-4 text-4xl font-semibold leading-none text-center">
          What our customers are saying about us
        </h1>
      </div>
      <div className="container flex flex-col items-center justify-center mx-auto lg:px-10">
        <Carousel className="w-full max-w-2xl">
          <CarouselPrevious
            onClick={goToPrevious}
            className="p-2 text-gray-800 bg-gray-200 rounded-full hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            &#10094;
          </CarouselPrevious>
          <CarouselContent className="flex space-x-4 overflow-hidden">
            {testimonials.map((testimonial, index) => (
              <CarouselItem
                key={testimonial.id}
                className={`flex-shrink-0 transition-transform duration-300 ease-in-out ${
                  index >= activeIndex && index < activeIndex + 2
                    ? "block"
                    : "hidden"
                }`}
                style={{ flexBasis: "50%" }}
              >
                <div className="p-2">
                  <TestimonialCard testimonial={testimonial} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext
            onClick={goToNext}
            className="p-2 text-gray-800 bg-gray-200 rounded-full hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            &#10095;
          </CarouselNext>
        </Carousel>
      </div>
    </section>
  );
}

export default TestimonialsSection;
