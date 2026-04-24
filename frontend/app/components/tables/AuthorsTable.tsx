import ActionButtons from "@/app/components/ui/ActionButtons";
import TableShell from "@/app/components/ui/TableShell";

export type AuthorRow = {
  id: string;
  name: string;
  booksCount: number;
};

type Props = {
  rows: AuthorRow[];
  page: number;
  onEdit: (item: AuthorRow) => void;
  onDelete: (id: string, label: string) => void;
};

export default function AuthorsTable({ rows, page, onEdit, onDelete }: Props) {
  return (
    <TableShell>
        <thead className="bg-slate-100 text-slate-700">
          <tr>
            <th className="border-b border-slate-200 px-4 py-3 text-center">No</th>
            <th className="border-b border-slate-200 px-4 py-3 text-left">Name</th>
            <th className="border-b border-slate-200 px-4 py-3 text-center">Books</th>
            <th className="border-b border-slate-200 px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((item, index) => (
            <tr key={item.id} className="odd:bg-white even:bg-slate-50/60 hover:bg-slate-100/80">
              <td className="px-4 py-3 text-center">{(page - 1) * 5 + index + 1}</td>
              <td className="px-4 py-3 font-semibold text-slate-800">{item.name}</td>
              <td className="px-4 py-3 text-center">
                <span className="inline-flex min-w-9 items-center justify-center rounded-full bg-sky-100 px-2 py-0.5 text-xs font-bold text-sky-700">
                  {item.booksCount}
                </span>
              </td>
              <td className="px-4 py-3">
                <ActionButtons onEdit={() => onEdit(item)} onDelete={() => onDelete(item.id, item.name)} />
              </td>
            </tr>
          ))}
        </tbody>
    </TableShell>
  );
}
