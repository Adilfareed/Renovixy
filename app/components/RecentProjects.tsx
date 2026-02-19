"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useGetProjects } from '../data/hooks';
import ProjectCard from './ProjectCard';
import type { Project } from '../types';

export default function RecentProjects() {
  const { projects, isLoading } = useGetProjects();
  
  // Get featured projects or first 4 projects
  const featuredProjects = React.useMemo(() => {
    if (isLoading) return [];
    const featured = projects.filter((project: Project) => project?.featured);
    return featured.length > 0 ? featured.slice(0, 3) : projects.slice(0, 4);
  }, [projects, isLoading]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Recent <span className="renovixy-gradient-text">Projects</span></h2>
          <p className="text-lg text-gray-600">
            Discover our latest construction and renovation projects
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-renovixy-blue-600"></div>
          </div>
        ) : featuredProjects.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500">No projects available</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featuredProjects.map((project: Project, idx: number) => (
              <ProjectCard 
                key={project._id} 
                project={project} 
                index={idx} 
                onClick={() => {
                  // Navigate to project detail or modal
                  window.location.href = `/projects/${project._id}`;
                }}
              />
            ))}
          </motion.div>
        )}

        {/* View All Button */}
        <div className="mt-12 text-center">
          <button 
            onClick={() => {
              // Navigate to projects page
              window.location.href = '/projects';
            }}
            className="px-8 py-3 text-lg renovixy-gradient font-semibold text-white rounded-full hover:bg-indigo-700 transition renovixy-shadow hover:shadow-xl"
          >
            View All Projects
          </button>
        </div>
      </div>
    </div>
  );
}
