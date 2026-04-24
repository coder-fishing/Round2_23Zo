import type { SectionKey } from "@/app/lib/api";

const sectionLabel: Record<SectionKey, string> = {
  authors: "Authors",
  books: "Books",
  reviews: "Reviews"
};

export function Header() {
  return (
    <header className="relative overflow-hidden border-b border-slate-700 bg-slate-900 px-6 py-6 text-white sm:px-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(14,165,233,0.22),transparent_36%),radial-gradient(circle_at_90%_80%,rgba(56,189,248,0.14),transparent_34%)]" />
      <div className="relative">
        <h1 className="text-2xl font-bold tracking-[0.04em] sm:text-3xl">Haibazo Book Review</h1>
        <p className="mt-1 text-sm text-slate-300 sm:text-base">Manage your authors, books, and reviews</p>
      </div>
    </header>
  );
}

export function Breadcrumb({ section, mode }: { section: SectionKey; mode: "list" | "create" }) {
  return (
    <div className="border-b border-slate-200 bg-sky-50/70 px-6 py-3 text-sm font-semibold tracking-wide text-slate-700 sm:px-10 sm:text-base">
      {sectionLabel[section]} <span className="mx-2 text-sky-600">/</span> {mode === "list" ? "View List" : "Create"}
    </div>
  );
}
