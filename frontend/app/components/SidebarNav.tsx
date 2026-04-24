import type { SectionKey } from "@/app/lib/api";
import { BookOpenText, ChevronDown, ChevronRight, PenSquare, Star } from "lucide-react";
import type { ComponentType } from "react";

type Props = {
  section: SectionKey;
  mode: "list" | "create";
  expanded: Record<SectionKey, boolean>;
  onToggle: (key: SectionKey) => void;
  onSelect: (section: SectionKey, mode: "list" | "create") => void;
};

const sections: Array<{ key: SectionKey; label: string; icon: ComponentType<{ size?: number; className?: string }> }> = [
  { key: "authors", label: "Authors", icon: PenSquare },
  { key: "books", label: "Books", icon: BookOpenText },
  { key: "reviews", label: "Reviews", icon: Star }
];

export default function SidebarNav({ section, mode, expanded, onToggle, onSelect }: Props) {
  return (
    <aside className="border-r border-slate-200 bg-white/85 p-5 backdrop-blur-sm sm:p-6">
      <div className="space-y-6">
        {sections.map((item) => (
          <div key={item.key} className="rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_8px_20px_rgba(15,23,42,0.06)]">
            <button
              className="flex w-full items-center justify-between rounded-xl bg-linear-to-r from-slate-50 to-sky-50 px-3 py-2.5 text-left text-sm font-bold tracking-wide text-slate-700"
              onClick={() => onToggle(item.key)}
            >
              <span className="flex items-center gap-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-sky-100 text-sky-700">
                  <item.icon size={15} />
                </span>
                {item.label}
              </span>
              <span className="text-slate-500">
                {expanded[item.key] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </span>
            </button>

            {expanded[item.key] ? (
              <div className="mt-3 grid gap-2 pl-1">
                <button
                  className={`rounded-lg border-l-4 px-3 py-2 text-left text-sm font-semibold transition ${
                    section === item.key && mode === "list"
                      ? "border-sky-500 bg-sky-50 text-sky-800"
                      : "border-transparent bg-slate-50 text-slate-700 hover:bg-slate-100"
                  }`}
                  onClick={() => onSelect(item.key, "list")}
                >
                  View List
                </button>
                <button
                  className={`rounded-lg border-l-4 px-3 py-2 text-left text-sm font-semibold transition ${
                    section === item.key && mode === "create"
                      ? "border-sky-500 bg-sky-50 text-sky-800"
                      : "border-transparent bg-slate-50 text-slate-700 hover:bg-slate-100"
                  }`}
                  onClick={() => onSelect(item.key, "create")}
                >
                  Create New
                </button>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </aside>
  );
}
