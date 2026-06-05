import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-white">
      <div className="w-full max-w-xl">
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">
          Sizeup
        </h1>
        <p className="text-gray-600 mb-8">
          Investor-ready market sizing in minutes. Describe your market and get
          TAM, SAM, SOM, and growth estimates — with sources.
        </p>

        <label className="block text-sm font-medium text-gray-700 mb-2">
          Describe your market
        </label>
        <textarea
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          placeholder="e.g. HR software for small businesses"
        />

        <label className="block text-sm font-medium text-gray-700 mb-2">
          Geography
        </label>
        <select className="w-full border border-gray-300 rounded-lg p-3 mb-6 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Global</option>
          <option>United States</option>
          <option>Europe</option>
          <option>Other</option>
        </select>

        <button className="w-full bg-blue-600 text-white font-medium rounded-lg py-3 hover:bg-blue-700 transition">
        <Link
          href="/report"
          className="block text-center w-full bg-blue-600 text-white font-medium rounded-lg py-3 hover:bg-blue-700 transition"
        >
          Generate report
        </Link>
        </button>
      </div>
    </main>
  );
}