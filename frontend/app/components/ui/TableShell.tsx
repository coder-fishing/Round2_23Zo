import type { ReactNode } from "react";

export default function TableShell({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50/50 shadow-[0_10px_30px_rgba(2,6,23,0.06)]">
      <table className="w-full border-collapse text-sm sm:text-base [&_tbody_tr]:border-b [&_tbody_tr]:border-slate-100">
        {children}
      </table>
    </div>
  );
}
