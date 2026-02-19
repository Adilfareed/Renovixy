"use client";

import React from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function TermsAndConditionsPage() {
  const sections = [
    {
      title: "1. Definitions",
      content: [
        '"Company" / "We" / "Us" / "Renovixy" refers to Renovixy and its in-house employees, technicians, and staff.',
        '"User" / "Client" / "You" refers to any person or entity using Renovixy services.',
        '"Services" refers to repair, renovation, maintenance, epoxy flooring, mobile, laptop, printer, and CCTV repair services provided through Renovixy.'
      ]
    },
    {
      title: "2. Scope of Services",
      content: [
        "Renovixy provides doorstep technical and construction-related services through its own qualified in-house technicians, engineers, and staff.",
        "All services are subject to availability, location coverage, and technical feasibility.",
        "Renovixy reserves the right to refuse or cancel any service request if it is unsafe, illegal, or beyond technical capability."
      ]
    },
    {
      title: "3. Booking and Service Requests",
      content: [
        "Users must provide accurate and complete information when booking a service.",
        "Service schedules are subject to technician availability and may be rescheduled due to unforeseen circumstances.",
        "For laptop, mobile, and printer repair services, the price will be quoted on the spot after inspection, and repairs will be carried out during the same visit where possible.",
        "The quotation will be sent electronically to the Client's provided mobile number (via SMS, WhatsApp, or email)."
      ]
    },
    {
      title: "4. Pricing and Payment Terms",
      content: [
        "A 50% advance payment is required before commencement of any repair, renovation, maintenance, or epoxy flooring work, and 50% payment is due after completion of the work.",
        "For certain jobs, Renovixy reserves the right to modify the payment terms (including full advance or milestone-based payments) depending on the nature, size, and risk of the job.",
        "A site visit/inspection charge of PKR 100 per visit will be applicable.",
        "After the site visit, the final quotation will be submitted on the next day based on inspection findings.",
        "Prices may include labor, materials, spare parts, and transportation unless stated otherwise. Quoted prices are estimates and may change based on actual site conditions or additional work requirements.",
        "Renovixy reserves the right to suspend services in case of non-payment."
      ]
    },
    {
      title: "5. Warranty and Liability",
      content: [
        "Warranty on repairs or installations is limited to workmanship and manufacturer warranty on parts, if applicable.",
        "Renovixy is not responsible for pre-existing faults, hidden defects, or damages caused by misuse, power fluctuations, water damage, or third-party interventions.",
        "The Company shall not be liable for indirect, incidental, or consequential damages."
      ]
    },
    {
      title: "6. Client Responsibilities",
      content: [
        "The Client must provide safe access to the site and ensure availability of electricity, water, and workspace where required.",
        "The Client is responsible for removing valuables and sensitive data from devices before repair.",
        "The Client must inform Renovixy of any hazards or special site conditions before service execution."
      ]
    },
    {
      title: "7. Cancellation and Refund Policy",
      content: [
        "Service cancellations must be requested at least 2 hours before the scheduled visit.",
        "Inspection or visit charges are non-refundable once the technician has been dispatched or the visit has been completed.",
        "Refunds, if applicable, will be processed within 7 working days through the original payment method."
      ]
    },
    {
      title: "8. Safety and Compliance",
      content: [
        "Renovixy follows standard safety practices for repair, renovation, and epoxy flooring works.",
        "The Client must ensure compliance with local laws, building regulations, and permits for renovation works.",
        "Renovixy is not responsible for penalties or legal issues arising from non-compliance by the Client."
      ]
    },
    {
      title: "9. Intellectual Property",
      content: [
        "All content, logos, designs, and materials on the Renovixy platform are the property of Renovixy and may not be used without prior written permission."
      ]
    },
    {
      title: "10. Privacy and Data Protection",
      content: [
        "User information is collected and used in accordance with Renovixy's Privacy Policy.",
        "The Client agrees that Renovixy may use service-related data for quality improvement and communication purposes."
      ]
    },
    {
      title: "11. Force Majeure",
      content: [
        "Renovixy shall not be liable for delays or failure in performance due to events beyond its control, including natural disasters, strikes, power outages, or government restrictions."
      ]
    },
    {
      title: "12. Dispute Resolution",
      content: [
        "Any disputes shall be resolved through mutual negotiation.",
        "If unresolved, disputes shall be subject to the laws and jurisdiction of Pakistan."
      ]
    },
    {
      title: "13. Amendments",
      content: [
        "Renovixy reserves the right to modify these Terms at any time. Updated Terms will be published on the platform and effective immediately."
      ]
    },
    {
      title: "14. Contact Information",
      content: [
        "For any questions or complaints, please contact:",
        "Renovixy Support Team",
        "Email: support@renovixy.com",
        "Phone/WhatsApp: +92 300 1234567"
      ]
    }
  ];

  return (
    <>
      
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Terms and Conditions
            </h1>
            <p className="text-lg text-gray-600">
              Last Updated: {new Date().toLocaleDateString()}
            </p>
            <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
              Welcome to Renovixy. These Terms and Conditions ("Terms") govern your access to and use of Renovixy's website, mobile application, and services related to repair, renovation, maintenance, epoxy flooring, mobile, laptop, printer, and CCTV repair services at the customer's doorstep. By using our platform or booking any service, you agree to be bound by these Terms.
            </p>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className={`mb-8 ${index < sections.length - 1 ? 'border-b border-gray-200 pb-8' : ''}`}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {section.title}
                </h2>
                <div className="space-y-3">
                  {section.content.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-gray-600 leading-relaxed">
                      {paragraph.startsWith('•') ? (
                        <span className="block pl-4">• {paragraph.substring(1).trim()}</span>
                      ) : (
                        paragraph
                      )}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Final Agreement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-200"
            >
              <p className="text-blue-800 font-medium text-center">
                By using Renovixy services, you acknowledge that you have read, understood, and agreed to these Terms and Conditions.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </>
  );
}
