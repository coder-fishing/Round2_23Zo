import ActionButtons from "@/app/components/ui/ActionButtons";
import TableShell from "@/app/components/ui/TableShell";

export type ReviewRow = {
  id: string;
  content: string;
  bookId: string;
  bookTitle: string | null;
  authorName: string | null;
};

type Props = {
  rows: ReviewRow[];
  page: number;
  onDelete: (id: string, label: string) => void;
  onEdit: (item: ReviewRow) => void;
};

export default function ReviewsTable({ rows, page, onDelete, onEdit }: Props) {
  return (
    <TableShell>
        <thead className="bg-slate-100 text-slate-700">
          <tr>
            <th className="border-b border-slate-200 px-4 py-3 text-center">No</th>
            <th className="border-b border-slate-200 px-4 py-3 text-left">Review</th>
            <th className="border-b border-slate-200 px-4 py-3 text-left">Book</th>
            <th className="border-b border-slate-200 px-4 py-3 text-left">Author</th>
            <th className="border-b border-slate-200 px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((item, index) => (
            <tr key={item.id} className="odd:bg-white even:bg-slate-50/60 hover:bg-slate-100/80">
              <td className="px-4 py-3 text-center">{(page - 1) * 5 + index + 1}</td>
              <td className="px-4 py-3 font-semibold text-slate-800">{item.content}</td>
              <td className="px-4 py-3">{item.bookTitle || "-"}</td>
              <td className="px-4 py-3">{item.authorName || "-"}</td>
              <td className="px-4 py-3">
                <ActionButtons
                  onEdit={() => {onEdit(item)}}
                  onDelete={() => onDelete(item.id, item.content)}
                />
              </td>
            </tr>
          ))}
        </tbody>
    </TableShell>
  );
}
