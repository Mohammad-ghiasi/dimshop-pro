// components/ui/spinner.tsx
export default function Spinner() {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="h-6 w-6 animate-spin rounded-full border-4 border-t-transparent border-gray-500 dark:border-gray-300" />
    </div>
  );
}
