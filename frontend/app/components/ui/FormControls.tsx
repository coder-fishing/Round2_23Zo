import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

type FieldProps = {
  label: string;
  children: ReactNode;
  className?: string;
};

export function FormCard({ children }: { children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_40px_rgba(2,6,23,0.06)] sm:p-8">
      {children}
    </section>
  );
}

export function FormField({ label, children, className = "" }: FieldProps) {
  return (
    <div className={`grid gap-2 ${className}`.trim()}>
      <label className="text-sm font-bold uppercase tracking-wider text-slate-600">{label}</label>
      {children}
    </div>
  );
}

export function InputControl(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="h-12 rounded-xl border border-slate-300 px-4 text-slate-800 outline-none ring-cyan-400 transition focus:border-cyan-500 focus:ring-2"
    />
  );
}

export function SelectControl(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className="h-12 rounded-xl border border-slate-300 px-4 text-slate-800 outline-none ring-cyan-400 transition focus:border-cyan-500 focus:ring-2"
    />
  );
}

export function TextareaControl(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className="min-h-32 rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none ring-cyan-400 transition focus:border-cyan-500 focus:ring-2"
    />
  );
}

export function SubmitButton({
  children,
  className = "",
  onClick
}: {
  children: ReactNode;
  className?: string;
  onClick: () => void;
}) {
  return (
    <button
      className={`mt-6 rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition ${className}`.trim()}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
