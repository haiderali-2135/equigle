"use client";

import type React from "react";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, Send, Linkedin, Instagram, Twitter } from "lucide-react";
import { useVisibility } from "@/hooks/usevisibility";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const isVisible = useVisibility("contact-section");
  const [hasAnimated, setHasAnimated] = useState(false);

  if (isVisible && !hasAnimated) {
    setHasAnimated(true);
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Reset form
      setFormData({ name: "", email: "", message: "" });
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      setSubmitError(
        "There was an error submitting your message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact-section"
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] px-4 sm:px-6 md:px-8 snap-start py-16"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0a0a0a] to-purple-900/20 pointer-events-none"></div>

      <div className="relative z-10 container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: hasAnimated ? 1 : 0, y: hasAnimated ? 0 : 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-[5vw] sm:text-[4vw] md:text-[3.5vw] font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
            Get in Touch
          </h2>
          <p className="text-[2.5vw] sm:text-[2vw] md:text-[1.8vw] lg:text-[1.5vw] text-gray-300 max-w-2xl mx-auto">
            Have a project in mind or want to learn more about our services?
            We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: hasAnimated ? 1 : 0, x: hasAnimated ? 0 : -20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-semibold text-purple-400 mb-6">
              Contact Information
            </h3>

            {/* Contact Cards */}
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 transition-all hover:border-purple-500/30 hover:bg-white/10">
                <div className="flex items-start">
                  <div className="p-3 rounded-full bg-purple-900/30 mr-4">
                    <Mail className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white mb-1">
                      Email
                    </h4>
                    <p className="text-gray-400 mb-3">contact@equigle.com</p>
                    <a
                      href="mailto:contact@equigle.com"
                      className="inline-flex items-center text-sm text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      Send an email <Send className="ml-1 h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 transition-all hover:border-purple-500/30 hover:bg-white/10">
                <div className="flex items-start">
                  <div className="p-3 rounded-full bg-purple-900/30 mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-purple-400"
                    >
                      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                      <path d="M13.5 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                      <path d="M9 13.5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 0-1h-5a.5.5 0 0 0-.5.5Z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white mb-1">
                      WhatsApp
                    </h4>
                    <p className="text-gray-400 mb-3">+1 (555) 123-4567</p>
                    <a
                      href="https://wa.me/15551234567"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      Message us <Send className="ml-1 h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-xl font-medium text-purple-400 mb-4">
                Connect With Us
              </h4>
              <div className="flex space-x-4">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full hover:bg-purple-900/30 hover:border-purple-500/30 transition-all"
                >
                  <Linkedin className="h-6 w-6 text-white" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full hover:bg-purple-900/30 hover:border-purple-500/30 transition-all"
                >
                  <Instagram className="h-6 w-6 text-white" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full hover:bg-purple-900/30 hover:border-purple-500/30 transition-all"
                >
                  <Twitter className="h-6 w-6 text-white" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: hasAnimated ? 1 : 0, x: hasAnimated ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-2xl font-semibold text-purple-400 mb-6">
              Send Us a Message
            </h3>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <div className="absolute -top-3 left-4 px-2 bg-[#0a0a0a] text-sm text-gray-400">
                  Name
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border border-white/20 rounded-xl p-4 text-white focus:border-purple-500 focus:outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div className="relative">
                <div className="absolute -top-3 left-4 px-2 bg-[#0a0a0a] text-sm text-gray-400">
                  Email
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border border-white/20 rounded-xl p-4 text-white focus:border-purple-500 focus:outline-none transition-colors"
                  placeholder="Your email"
                />
              </div>

              <div className="relative">
                <div className="absolute -top-3 left-4 px-2 bg-[#0a0a0a] text-sm text-gray-400">
                  Message
                </div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full bg-transparent border border-white/20 rounded-xl p-4 text-white focus:border-purple-500 focus:outline-none transition-colors resize-none"
                  placeholder="Tell us about your project"
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 rounded-xl flex items-center justify-center transition-all ${
                    isSubmitting
                      ? "bg-purple-900/50 cursor-not-allowed"
                      : "bg-purple-600 hover:bg-purple-700"
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </span>
                  )}
                </button>

                {submitSuccess && (
                  <div className="mt-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 text-sm">
                    Your message has been sent successfully. We'll get back to
                    you soon!
                  </div>
                )}

                {submitError && (
                  <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
                    {submitError}
                  </div>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
