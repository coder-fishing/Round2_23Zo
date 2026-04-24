type Props = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

export default function PaginationControls({ page, totalPages, onChange }: Props) {
  if (totalPages <= 1) return null;

  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, start + 4);
  const pages: number[] = [];

  for (let p = start; p <= end; p += 1) {
    pages.push(p);
  }

  return (
    <div className="mt-6 flex flex-wrap items-center justify-end gap-2">
      <button
        className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-400"
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page <= 1}
      >
        Prev
      </button>

      {pages.map((p) => (
        <button
          key={p}
          className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
            p === page
              ? "border-sky-500 bg-sky-500 text-white"
              : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
          }`}
          onClick={() => onChange(p)}
        >
          {p}
        </button>
      ))}

      <button
        className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-400"
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page >= totalPages}
      >
        Next
      </button>
    </div>
  );
}
