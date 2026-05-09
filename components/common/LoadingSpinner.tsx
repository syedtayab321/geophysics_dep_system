export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center min-h-[200px]">
      <div className="relative">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-3 w-3 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}