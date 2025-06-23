export const LoadingState = () => (
  <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
        <div className="space-y-4">
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  </div>
);
