type Props = {
  open: boolean;
  label: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function DeleteConfirmModal({ open, label, onCancel, onConfirm }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/45 p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
        <h3 className="text-xl font-bold text-slate-800">Confirm Delete</h3>
        <p className="mt-3 text-sm text-slate-600">Do you want to delete <span className="font-semibold text-slate-900">{label}</span>?</p>

        <div className="mt-6 flex justify-end gap-2">
          <button className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium" onClick={onCancel}>Cancel</button>
          <button className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-500" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}
