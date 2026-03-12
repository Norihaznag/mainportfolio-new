'use client';

interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select';
  placeholder?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  required?: boolean;
  options?: { value: string; label: string }[];
  error?: string;
}

export default function FormField({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  required,
  options,
  error,
}: FormFieldProps) {
  return (
    <div className="mb-6">
      <label htmlFor={name} className="block text-lg font-bold text-black mb-2 uppercase tracking-wide">
        {label}
        {required && <span className="text-cartoon-pink ml-1">*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full px-5 py-3 border-3 rounded-xl focus:bg-white focus:outline-none focus:shadow-neo-sm resize-none font-bold text-black transition-all ${
            error ? 'border-cartoon-pink bg-red-50' : 'border-black bg-[#FFFDF0]'
          }`}
          rows={5}
        />
      ) : type === 'select' ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full px-5 py-3 border-3 rounded-xl focus:bg-white focus:outline-none focus:shadow-neo-sm font-bold text-black transition-all appearance-none cursor-pointer ${
            error ? 'border-cartoon-pink bg-red-50' : 'border-black bg-[#FFFDF0]'
          }`}
        >
          <option value="">Select {label}</option>
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full px-5 py-3 border-3 rounded-xl focus:bg-white focus:outline-none focus:shadow-neo-sm font-bold text-black transition-all ${
            error ? 'border-cartoon-pink bg-red-50' : 'border-black bg-[#FFFDF0]'
          }`}
        />
      )}
      {error && <p className="text-cartoon-pink font-bold mt-2">{error}</p>}
    </div>
  );
}
