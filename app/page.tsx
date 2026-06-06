"use client";

import { useState } from "react";

export default function Home() {
  const [market, setMarket] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  async function generateReport() {
    setLoading(true);
    setResult("");
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ market }),
      });
      const data = await response.json();
      setResult(data.result);
    } catch {
      setResult("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-white">
      <div className="w-full max-w-xl">
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">Sizeup</h1>
        <p className="text-gray-600 mb-8">
          Investor-ready market sizing in minutes. Describe your market and get
          an instant overview.
        </p>

        <label className="block text-sm font-medium text-gray-700 mb-2">
          Describe your market
        </label>
        <textarea
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          placeholder="e.g. HR software for small businesses"
          value={market}
          onChange={(e) => setMarket(e.target.value)}
        />

        <button
          onClick={generateReport}
          disabled={loading || market.length < 5}
          className="w-full bg-blue-600 text-white font-medium rounded-lg py-3 hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {loading ? "Generating…" : "Generate report"}
        </button>

        {result && (
          <div className="mt-8 border border-gray-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Market overview
            </h2>
            <p className="text-gray-700 whitespace-pre-line">{result}</p>
          </div>
        )}
      </div>
    </main>
  );
}