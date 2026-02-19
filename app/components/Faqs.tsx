"use client";

import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  { question: "What is a chiller van or truck used for?", answer: "Chiller vans and trucks are designed to transport perishable goods, ensuring they remain at the right temperature during transit, such as food, pharmaceuticals, and flowers." },
  { question: "How do I know which chiller van or truck size to rent?", answer: "Our fleet includes a range of sizes from 3.5 tons to 10 tons. We can assist you in selecting the appropriate size based on your cargo volume and weight." },
  { question: "What types of goods can be transported in a chiller van or truck?", answer: "Chiller vehicles are ideal for transporting perishable items such as fresh food, dairy products, flowers, and temperature-sensitive pharmaceuticals." },
  { question: "How do I maintain the right temperature in a chiller van or truck?", answer: "Our chiller vans and trucks are equipped with state-of-the-art refrigeration systems. We ensure that all vehicles are regularly maintained and monitored to guarantee optimal performance.     " },
];

export default function Faqs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => toggle(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
              >
                <span className="font-medium text-gray-800">{faq.question}</span>
                {openIndex === index ? <FaMinus /> : <FaPlus />}
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 text-gray-600 border-t border-gray-200">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
