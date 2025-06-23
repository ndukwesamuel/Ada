import { MessageSquare } from "lucide-react";
export const ErrorState = ({ onRetry }) => (
  <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">
          <MessageSquare className="w-12 h-12 mx-auto" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Failed to load forum data
        </h3>
        <p className="text-gray-500 mb-4">
          There was an error loading the forum posts.
        </p>
        <button
          onClick={onRetry}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Try Again
        </button>
      </div>
    </div>
  </div>
);
