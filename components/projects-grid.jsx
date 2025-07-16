"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Lock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '@/lib/language-context';
import { getTranslation } from '@/lib/translations';
import Link from 'next/link';

const PROJECT_TYPES = [
  'food',
  'ecommerce',
  'rental',
  'other',
];

const CARD_GRADIENTS = [
  'bg-gradient-to-br from-blue-900 via-purple-900 to-pink-600',
  'bg-gradient-to-br from-green-900 via-teal-800 to-blue-600',
  'bg-gradient-to-br from-orange-900 via-red-800 to-pink-600',
  'bg-gradient-to-br from-indigo-900 via-purple-800 to-cyan-600',
  'bg-gradient-to-br from-yellow-900 via-orange-800 to-red-600',
  'bg-gradient-to-br from-violet-900 via-indigo-800 to-blue-600',
];

export default function ProjectsGrid() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeType, setActiveType] = useState('all');
  const { language } = useLanguage();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching projects:', error);
        setError(error.message);
      } else {
        setProjects(data || []);
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Group projects by type
  const grouped = PROJECT_TYPES.reduce((acc, type) => {
    acc[type] = projects.filter(p => (p.type || 'other') === type);
    return acc;
  }, {});

  // Filtered projects for active tab
  const filteredProjects =
    activeType === 'all'
      ? projects
      : grouped[activeType] || [];

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-muted-foreground">Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500">Error loading projects: {error}</p>
      </div>
    );
  }

  return (
    <div>
      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <button
          className={`px-6 py-2 rounded-full font-medium border transition-colors ${activeType === 'all' ? 'bg-primary text-primary-foreground border-primary' : 'bg-background text-primary border-primary/30 hover:bg-primary/10'}`}
          onClick={() => setActiveType('all')}
        >
          {getTranslation('projectType_all', language)}
        </button>
        {PROJECT_TYPES.map(type => (
          grouped[type] && grouped[type].length > 0 ? (
            <button
              key={type}
              className={`px-6 py-2 rounded-full font-medium border transition-colors ${activeType === type ? 'bg-primary text-primary-foreground border-primary' : 'bg-background text-primary border-primary/30 hover:bg-primary/10'}`}
              onClick={() => setActiveType(type)}
            >
              {getTranslation(`projectType_${type}`, language)}
            </button>
          ) : null
        ))}
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center text-muted-foreground py-20">
          {getTranslation('noProjects', language)}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => {
            const gradientIndex = index % CARD_GRADIENTS.length;
            const gradientBg = CARD_GRADIENTS[gradientIndex];
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative rounded-3xl overflow-hidden ${gradientBg} p-8 flex flex-col justify-between min-h-[400px] hover:scale-105 transition-all duration-300`}
              >
                {/* Top Section - Icon */}
                <div className="flex justify-start mb-6">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Lock className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Middle Section - Content */}
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="text-3xl font-bold text-white mb-4 leading-tight">
                    {(project.link || project.liveUrl || project.githubUrl) ? (
                      (project.link || project.liveUrl || project.githubUrl).startsWith('/') ? (
                        <Link
                          href={project.link || project.liveUrl || project.githubUrl}
                          className="hover:underline"
                        >
                          {project.title}
                        </Link>
                      ) : (
                        <a
                          href={project.link || project.liveUrl || project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {project.title}
                        </a>
                      )
                    ) : (
                      project.title
                    )}
                  </h3>
                  
                  <p className="text-white/80 text-lg leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech?.map((tech) => (
                      <span
                        key={tech}
                        className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Section - CTA */}
                <div className="mt-auto">
                  {(project.liveUrl || project.githubUrl) && (
                    <a
                      href={project.liveUrl || project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-white font-medium text-lg hover:gap-3 transition-all duration-300 underline underline-offset-4"
                    >
                      Learn more <ArrowRight size={20} />
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}