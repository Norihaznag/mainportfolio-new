"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '@/lib/language-context';
import { getTranslation } from '@/lib/translations';

const PROJECT_TYPES = [
  'food',
  'ecommerce',
  'rental',
  'other',
];

export default function FeaturedProjects() {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { language } = useLanguage();

  useEffect(() => {
    fetchFeaturedProjects();
  }, []);

  const fetchFeaturedProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching featured projects:', error);
        setError(error.message);
      } else {
        setFeaturedProjects(data || []);
      }
    } catch (err) {
      console.error('Error fetching featured projects:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Group projects by type
  const grouped = PROJECT_TYPES.reduce((acc, type) => {
    acc[type] = featuredProjects.filter(p => (p.type || 'other') === type);
    return acc;
  }, {});

  if (loading) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-red-500">Error loading projects: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            {getTranslation('featuredProjectsTitle', language)}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {getTranslation('featuredProjectsDescription', language)}
          </p>
        </motion.div>

        {PROJECT_TYPES.map(type =>
          grouped[type] && grouped[type].length > 0 ? (
            <div key={type} className="mb-16">
              <h3 className="text-2xl md:text-3xl font-semibold mb-8 text-primary text-center">
                {getTranslation(`projectType_${type}`, language)}
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-4">
                {grouped[type].map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-background rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-3">
                        {(project.link || project.liveUrl || project.githubUrl) ? (
                          (project.link || project.liveUrl || project.githubUrl).startsWith('/') ? (
                            <Link
                              href={project.link || project.liveUrl || project.githubUrl}
                              className="hover:underline text-primary"
                            >
                              {project.title}
                            </Link>
                          ) : (
                            <a
                              href={project.link || project.liveUrl || project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline text-primary"
                            >
                              {project.title}
                            </a>
                          )
                        ) : (
                          project.title
                        )}
                      </h3>
                      <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech?.map((tech) => (
                          <span
                            key={tech}
                            className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-4">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors text-sm"
                          >
                            <ExternalLink size={16} />
                            {getTranslation('liveDemo', language)}
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors text-sm"
                          >
                            <Github size={16} />
                            {getTranslation('viewCode', language)}
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : null
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/apps"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium hover:bg-primary/90 transition-colors group"
          >
            See All Apps
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}