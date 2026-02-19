"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaAward, FaUsers, FaTools, FaClock, FaCheckCircle, FaHandshake } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  const stats = [
    { icon: FaAward, number: 15, label: 'Years Experience', suffix: '+' },
    { icon: FaUsers, number: 500, label: 'Happy Clients', suffix: '+' },
    { icon: FaTools, number: 1000, label: 'Projects Completed', suffix: '+' },
    { icon: FaClock, number: 98, label: 'On-Time Delivery', suffix: '%' }
  ];

  const values = [
    {
      icon: FaCheckCircle,
      title: 'Quality First',
      description: 'We never compromise on quality. Every project is executed with the highest standards of craftsmanship and attention to detail.'
    },
    {
      icon: FaHandshake,
      title: 'Integrity & Trust',
      description: 'We build lasting relationships with our clients through transparency, honesty, and delivering on our promises.'
    },
    {
      icon: FaUsers,
      title: 'Customer Focus',
      description: 'Our clients are at the heart of everything we do. We listen, understand, and deliver solutions that exceed expectations.'
    }
  ];

  const team = [
    {
      name: 'John Anderson',
      position: 'Founder & CEO',
      experience: '20+ years in construction industry',
      image: '/assets/team/ceo.jpg'
    },
    {
      name: 'Sarah Mitchell',
      position: 'Head of Operations',
      experience: '15+ years in project management',
      image: '/assets/team/operations.jpg'
    },
    {
      name: 'Michael Chen',
      position: 'Lead Architect',
      experience: '12+ years in architectural design',
      image: '/assets/team/architect.jpg'
    },
    {
      name: 'Emily Rodriguez',
      position: 'Head of Design',
      experience: '10+ years in interior design',
      image: '/assets/team/design.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              About <span className="renovixy-gradient-text">R Construction</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Building dreams into reality since 2009. We are a leading construction company 
              dedicated to delivering excellence in every project we undertake.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 2009, R Construction began as a small family-owned business with a big dream: 
                  to transform the construction industry through quality, innovation, and customer satisfaction.
                </p>
                <p>
                  Over the past 15 years, we've grown from a local contractor to a trusted name in the industry, 
                  completing over 1000 projects across residential, commercial, and industrial sectors.
                </p>
                <p>
                  Our success is built on a foundation of trust, quality craftsmanship, and an unwavering commitment 
                  to our clients' vision. We don't just build structures; we build lasting relationships.
                </p>
              </div>
              <div className="mt-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Start Your Project
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-blue-400 to-indigo-600"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <FaTools className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-xl font-semibold">15 Years of Excellence</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <stat.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-gray-900">
                    {stat.number}{stat.suffix}
                  </div>
                  <div className="text-gray-600 mt-2">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-blue-50 rounded-lg p-8 h-full">
                  <value.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The talented professionals behind our success
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-blue-600 mb-2">{member.position}</p>
                  <p className="text-sm text-gray-600">{member.experience}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Build Your Dream Project?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Let's discuss how we can bring your vision to life with our expertise and commitment to excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="/projects"
                className="px-8 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
              >
                View Our Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
