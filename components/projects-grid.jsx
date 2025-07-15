"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink, Github } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '@/lib/language-context';
import { getTranslation } from '@/lib/translations';

const PROJECT_TYPES = [
  'food',
  'ecommerce',
  'rental',
  'other',
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
                <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
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
      )}
    </div>
  );
}