import { FormCard, FormField, SelectControl, SubmitButton, TextareaControl } from "@/app/components/ui/FormControls";

type Option = {
  id: string;
  title: string;
  authorName: string | null;
};

type Props = {
  content: string;
  bookId: string;
  bookOptions: Option[];
  onContentChange: (value: string) => void;
  onBookChange: (value: string) => void;
  onSubmit: () => void;
};

export default function ReviewForm({
  content,
  bookId,
  bookOptions,
  onContentChange,
  onBookChange,
  onSubmit
}: Props) {
  return (
    <FormCard>
      <div className="grid gap-4">
        <FormField label="Book">
          <SelectControl value={bookId} onChange={(e) => onBookChange(e.target.value)}>
            <option value="">Select book</option>
            {bookOptions.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title}{item.authorName ? ` - ${item.authorName}` : ""}
              </option>
            ))}
          </SelectControl>
        </FormField>

        <FormField label="Review" className="mt-2">
          <TextareaControl
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            placeholder="Write your review"
          />
        </FormField>
      </div>

      <SubmitButton className="bg-violet-600 hover:bg-violet-500" onClick={onSubmit}>
        Create Review
      </SubmitButton>
    </FormCard>
  );
}
