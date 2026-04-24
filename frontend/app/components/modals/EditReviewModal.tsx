import type { BookSelectOption } from "@/app/services";

type Props = {
  open: boolean;
  content: string;
  bookId: string;
  bookOptions: BookSelectOption[];
  onContentChange: (value: string) => void;
  onBookChange: (value: string) => void;
  onCancel: () => void;
  onSave: () => void;
};

export default function EditReviewModal({
  open,
  content,
  bookId,
  bookOptions,
  onContentChange,
  onBookChange,
  onCancel,
  onSave
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/45 p-4">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
        <h3 className="text-xl font-bold text-slate-800">Edit Review</h3>

        <select
          className="mt-4 h-11 w-full rounded-xl border border-slate-300 px-4 outline-none ring-cyan-400 focus:border-cyan-500 focus:ring-2"
          value={bookId}
          onChange={(e) => onBookChange(e.target.value)}
        >
          <option value="">Select book</option>
          {bookOptions.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title}{item.authorName ? ` - ${item.authorName}` : ""}
            </option>
          ))}
        </select>

        <textarea
          className="mt-3 min-h-28 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none ring-cyan-400 focus:border-cyan-500 focus:ring-2"
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          placeholder="Review content"
        />

        <div className="mt-6 flex justify-end gap-2">
          <button className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium" onClick={onCancel}>Cancel</button>
          <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800" onClick={onSave}>Save</button>
        </div>
      </div>
    </div>
  );
}
