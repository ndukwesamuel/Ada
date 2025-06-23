export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-purple-800 mb-4">
          Welcome to <span className="text-purple-600">SavingsGuardian</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your personal savings companion that helps you stay committed to your
          financial goals
        </p>
      </div>

      {/* Personalized Welcome */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-2xl shadow-xl mb-10">
        <div className="flex items-center">
          <div className="bg-white/20 p-3 rounded-full mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Welcome back, Adaolisa!</h2>
            <p className="opacity-90">
              You're making great progress toward your goals
            </p>
          </div>
        </div>
      </div>

      {/* Savings Progress */}
      <div className="bg-white p-6 rounded-2xl shadow-md mb-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Vacation Fund</h3>
          <span className="text-purple-600 font-medium">35% complete</span>
        </div>

        <div className="mb-4">
          <div className="h-4 bg-gray-200 rounded-full w-full">
            <div
              className="h-4 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
              style={{ width: "35%" }}
            ></div>
          </div>
        </div>

        <div className="flex justify-between text-sm text-gray-600">
          <span>£1,250 saved</span>
          <span>£3,500 goal</span>
        </div>
      </div>

      {/* Key Features */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="bg-purple-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-purple-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h3 className="font-semibold text-lg mb-2">Smart Reminders</h3>
          <p className="text-gray-600">
            Never miss a savings day with our intelligent alerts
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="bg-indigo-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h3 className="font-semibold text-lg mb-2">Family Monitoring</h3>
          <p className="text-gray-600">
            Let loved ones cheer you on and track your progress
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </div>
          <h3 className="font-semibold text-lg mb-2">Visual Progress</h3>
          <p className="text-gray-600">
            See your savings grow with beautiful charts
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
          Start Saving Today - It's Free!
        </button>
        <p className="mt-4 text-gray-500">
          Join thousands who've already reached their savings goals
        </p>
      </div>

      {/* Testimonial */}
      <div className="mt-16 bg-purple-50 p-8 rounded-2xl">
        <div className="max-w-2xl mx-auto text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-purple-400 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <p className="text-xl italic text-gray-700 mb-4">
            "SavingsGuardian helped me save £5,000 for my wedding in just 6
            months! The reminders kept me accountable and my family could see my
            progress."
          </p>
          <p className="font-medium text-purple-600">— Sarah K., London</p>
        </div>
      </div>
    </div>
  );
}
