import { FormCard, FormField, InputControl, SelectControl, SubmitButton } from "@/app/components/ui/FormControls";

type Option = {
  id: string;
  name: string;
};

type Props = {
  title: string;
  authorId: string;
  authorOptions: Option[];
  onTitleChange: (value: string) => void;
  onAuthorChange: (value: string) => void;
  onSubmit: () => void;
};

export default function BookForm({
  title,
  authorId,
  authorOptions,
  onTitleChange,
  onAuthorChange,
  onSubmit
}: Props) {
  return (
    <FormCard>
      <div className="grid gap-4">
        <FormField label="Title">
          <InputControl
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Enter book title"
          />
        </FormField>

        <FormField label="Author" className="mt-2">
          <SelectControl value={authorId} onChange={(e) => onAuthorChange(e.target.value)}>
            <option value="">Select author</option>
            {authorOptions.map((item) => (
              <option key={item.id} value={item.id}>{item.name}</option>
            ))}
          </SelectControl>
        </FormField>
      </div>

      <SubmitButton className="bg-cyan-600 hover:bg-cyan-500" onClick={onSubmit}>
        Create Book
      </SubmitButton>
    </FormCard>
  );
}
