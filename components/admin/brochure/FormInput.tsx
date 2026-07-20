interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

export default function FormInput({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
}: FormInputProps) {
  return (
    <div className="space-y-2">
      <label className="font-medium text-gray-700">
        {label}
      </label>

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-500"
      />
    </div>
  );
}