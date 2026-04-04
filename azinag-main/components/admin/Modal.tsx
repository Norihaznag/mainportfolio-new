'use client';

import { useState, ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}

export default function Modal({ isOpen, title, children, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white border-4 border-black shadow-neo-lg rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-8 sticky top-0 bg-white z-10 pb-4 border-b-3 border-black">
          <h2 className="text-3xl font-black text-black uppercase tracking-wide">{title}</h2>
          <button
            onClick={onClose}
            className="text-black hover:text-cartoon-pink hover:-translate-y-1 hover:rotate-90 text-4xl font-black transition-all"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
