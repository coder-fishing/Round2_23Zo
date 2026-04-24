import { Pencil, Trash2 } from "lucide-react";

type Props = {
  onEdit?: () => void;
  onDelete: () => void;
  editDisabled?: boolean;
  editTitle?: string;
  deleteTitle?: string;
};

export default function ActionButtons({
  onEdit,
  onDelete,
  editDisabled = false,
  editTitle = "Edit",
  deleteTitle = "Delete"
}: Props) {
  return (
    <div className="flex items-center gap-2">
      <button
        className={`rounded-lg border px-2.5 py-2.5 transition duration-200 hover:scale-105 ${
          editDisabled
            ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
            : "border-sky-200 bg-sky-50 text-sky-700 hover:bg-sky-100"
        }`}
        onClick={onEdit}
        disabled={editDisabled}
        title={editTitle}
      >
        <Pencil size={18} />
      </button>

      <button
        className="rounded-lg border border-rose-300 bg-rose-100 px-2.5 py-2.5 text-rose-700 transition duration-200 hover:scale-105 hover:bg-rose-200"
        onClick={onDelete}
        title={deleteTitle}
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}
