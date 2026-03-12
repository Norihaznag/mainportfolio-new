'use client';

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="text-center py-16 px-6 bg-[#f5f5f7] rounded-3xl border-3 border-black border-dashed shadow-neo-sm">
      <p className="text-black text-2xl font-black mb-3.5 uppercase">{title}</p>
      {description && <p className="text-gray-700 font-bold mb-8 text-lg">{description}</p>}
      {action && (
        <button
          onClick={action.onClick}
          className="bg-cartoon-yellow text-black border-3 border-black shadow-neo px-8 py-3 rounded-xl font-black uppercase tracking-wide hover:-translate-y-1 hover:shadow-neo-md active:translate-y-1 active:shadow-none transition-all"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
