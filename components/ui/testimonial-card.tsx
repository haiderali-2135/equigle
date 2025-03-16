"use client";
import { useState } from "react";
import Image from "next/image";
import { User } from "lucide-react";

interface Testimonial {
  name: string;
  company: string;
  review: string;
  imageUrl: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="flex items-center justify-center mx-auto">
      <div className="flex flex-col max-w-sm mx-auto my-6 shadow-lg rounded-lg overflow-hidden transition-all duration-700">
        <div className="px-4 py-10 bg-[#0a0a0a] text-white rounded-t-lg sm:px-8 md:px-12 border border-white/10">
          <p className="relative px-6 py-1 text-sm italic text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill="currentColor"
              className="w-6 h-6 text-violet-400"
            >
              <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
              <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
            </svg>
            {testimonial.review}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill="currentColor"
              className="absolute right-0 w-6 h-6 text-violet-400"
            >
              <path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
              <path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
            </svg>
          </p>
        </div>
        <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-purple-600 to-purple-800 text-white">
          <div className="relative w-16 h-16 mb-2 -mt-16 rounded-full overflow-hidden border-4 border-[#0a0a0a] shadow-lg">
            {!imageError ? (
              <Image
                src={testimonial.imageUrl || "/placeholder.svg"}
                alt={testimonial.name}
                fill
                className="object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-700">
                <User className="w-8 h-8 text-white" />
              </div>
            )}
          </div>
          <p className="text-xl font-semibold">{testimonial.name}</p>
          <p className="text-sm uppercase">{testimonial.company}</p>
        </div>
      </div>
    </div>
  );
}

export default TestimonialCard;
