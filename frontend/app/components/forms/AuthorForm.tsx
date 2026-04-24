import { FormCard, FormField, InputControl, SubmitButton } from "@/app/components/ui/FormControls";

type Props = {
  value: string;
  error: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export default function AuthorForm({ value, error, onChange, onSubmit }: Props) {
  return (
    <FormCard>
      <div className="grid gap-4">
        <FormField label="Author Name">
          <InputControl
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter author name"
          />
        </FormField>
        {error ? <p className="text-sm font-semibold text-rose-600">* {error}</p> : null}
      </div>

      <SubmitButton className="bg-slate-900 hover:bg-slate-800" onClick={onSubmit}>
        Create Author
      </SubmitButton>
    </FormCard>
  );
}
