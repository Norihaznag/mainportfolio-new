"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Lock, Globe, UserCog, MessageCircle, CreditCard, AppWindow } from 'lucide-react';
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

const CARD_COLORS = [
  'bg-red-100 text-red-600',
  'bg-blue-100 text-blue-600',
  'bg-green-100 text-green-600',
  'bg-yellow-100 text-yellow-600',
  'bg-purple-100 text-purple-600',
  'bg-pink-100 text-pink-600',
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
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-2xl shadow-sm flex flex-col overflow-hidden transition-transform duration-200 hover:scale-[1.02]"
            >
              {/* App Icon with Colored Background */}
              <div className={`relative w-full h-40 flex items-center justify-center rounded-t-2xl ${CARD_COLORS[index % CARD_COLORS.length]}`}>
                <AppWindow size={56} className="" />
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col justify-center p-6">
                <h3 className="text-2xl font-bold text-foreground mb-2 leading-tight">
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
                <p className="text-muted-foreground text-base leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Features Row */}
                {Array.isArray(project.features) && project.features.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.features.map((feature) => {
                      let icon = null;
                      let label = feature;
                      switch (feature.toLowerCase()) {
                        case 'domain':
                          icon = <Globe className="w-4 h-4 mr-1" />;
                          label = 'Domain';
                          break;
                        case 'admin':
                        case 'admin panel':
                          icon = <UserCog className="w-4 h-4 mr-1" />;
                          label = 'Admin';
                          break;
                        case 'whatsapp':
                          icon = <MessageCircle className="w-4 h-4 mr-1" />;
                          label = 'WhatsApp';
                          break;
                        case 'stripe':
                          icon = <CreditCard className="w-4 h-4 mr-1" />;
                          label = 'Stripe';
                          break;
                        default:
                          icon = null;
                      }
                      return (
                    <span
                          key={feature}
                          className="inline-flex items-center bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium"
                    >
                          {icon}
                          {label}
                    </span>
                      );
                    })}
                </div>
                )}

                {/* CTA */}
                <div className="mt-auto">
                  {(project.liveUrl || project.githubUrl) && (
                    <a
                      href={project.liveUrl || project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary font-medium text-base hover:gap-3 transition-all duration-200 underline underline-offset-4"
                    >
                      Learn more <ArrowRight size={18} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}