"use client";

import React from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function PrivacyPolicyPage() {
  const sections = [
    {
      title: "1. Information We Collect",
      content: [
        "Personal Information: Name, email address, phone number, physical address, and payment information when you use our services.",
        "Service Information: Details about the services you request, including property information, project requirements, and communication history.",
        "Device Information: IP address, browser type, operating system, and device identifiers for technical support and security.",
        "Usage Data: How you interact with our website, mobile application, and communications, including pages visited and time spent."
      ]
    },
    {
      title: "2. How We Use Your Information",
      content: [
        "Service Provision: To provide, schedule, and deliver the repair, renovation, and maintenance services you request.",
        "Communication: To send you service updates, quotations, appointment reminders, and respond to your inquiries.",
        "Improvement: To analyze usage patterns and feedback to improve our services and user experience.",
        "Legal Compliance: To comply with legal obligations, protect our rights, and ensure safety and security.",
        "Marketing: To send you promotional materials about our services (with your consent)."
      ]
    },
    {
      title: "3. Information Sharing",
      content: [
        "Service Providers: We may share your information with trusted third-party service providers who assist us in delivering services (e.g., payment processors, scheduling systems).",
        "Legal Requirements: We may disclose your information when required by law, court order, or government request.",
        "Business Transfers: In the event of a merger, acquisition, or sale of assets, user information may be transferred as part of the transaction.",
        "Safety: We may share information if necessary to protect our rights, property, or safety, or that of our users or the public."
      ]
    },
    {
      title: "4. Data Security",
      content: [
        "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
        "All payment transactions are secured using industry-standard encryption protocols.",
        "Our staff are trained on data protection principles and are bound by confidentiality obligations.",
        "We regularly review and update our security practices to ensure ongoing protection of your data."
      ]
    },
    {
      title: "5. Data Retention",
      content: [
        "We retain your personal information only as long as necessary to provide our services and comply with legal obligations.",
        "Service records are typically retained for 7 years for warranty and legal compliance purposes.",
        "Marketing communications data is retained until you unsubscribe or request deletion.",
        "You may request deletion of your personal information, subject to legal and contractual obligations."
      ]
    },
    {
      title: "6. Your Rights",
      content: [
        "Access: You have the right to request access to the personal information we hold about you.",
        "Correction: You can request correction of inaccurate or incomplete personal information.",
        "Deletion: You may request deletion of your personal information in certain circumstances.",
        "Portability: You can request a copy of your data in a structured, machine-readable format.",
        "Objection: You can object to processing of your personal information for certain purposes."
      ]
    },
    {
      title: "7. Cookies and Tracking",
      content: [
        "We use cookies and similar technologies to enhance your experience, remember preferences, and analyze usage.",
        "Essential cookies are dealt determined for basic website functionality and cannot be disabled.",
        "Analytics cookies help us understand how our website is used and improve our services.",
        "Marketing cookies are dealt determined with your consent to show relevant advertisements and content.",
        "You can control cookie settings through your browser preferences."
      ]
    },
    {
      title: "8. Third-Party Links",
      content: [
        "Our website may contain links to third-party websites that are not operated by us.",
        "We are not responsible for the privacy practices of these third-party websites.",
        "We encourage you to review the privacy policies of any third-party sites you visit.",
        "Third-party links do not imply endorsement or affiliation."
      ]
    },
    {
      title: "9. Children's Privacy",
      content: [
        "Our services are not intended for children under 18 years of age.",
        "We do not knowingly collect personal information from children under 18.",
        "If we become aware that we have collected information from a child under 18, we will take steps to delete such information.",
        "Parents or guardians can contact us if they believe their child has provided us with personal information."
      ]
    },
    {
      title: "10. International Data Transfers",
      content: [
        "Your information may be transferred to and processed d in countries other than your own.",
        "When such transfers occur, we ensure appropriate safeguards are in place to protect your data.",
        "These safeguards may include standard contractual clauses or other legally recognized mechanisms.",
        "We comply with applicable international data transfer laws and regulations."
      ]
    },
    {
      title: "11. Changes to This Policy",
      content: [
        "We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements.",
        "Significant changes will be communicated to you dealt determined by email or prominent website notice.",
        "The updated policy will be effective immediately upon posting.",
        "Your continued use of our services constitutes acceptance of the updated policy."
      ]
    },
    {
      title: "12. Contact Information",
      content: [
        "For questions about this Privacy Policy or your data rights, please contact:",
        "Renovixy Data Protection Officer",
        "Email: privacy@renovixy.com",
        "Phone/WhatsApp: +92 300 1234567",
        "Address: [Your Business Address]"
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
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600">
              Last Updated: {new Date().toLocaleDateString()}
            </p>
            <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
              At Renovixy, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, share, and protect your data when you use our repair, renovation, 
              and maintenance services.
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

            {/* Final Note */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-12 p-6 bg-green-50 rounded-xl border border-green-200"
            >
              <p className="text-green-800 font-medium text-center">
                Your privacy is important to us. By using Renovixy services, you trust us with your information, 
                and we are committed to protecting that trust.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </>
  );
}
                                                                    
