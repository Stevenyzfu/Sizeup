"use client";

import { useState } from "react";

type Figure = { value: string; methodology: string; confidence: string };
type Report = {
  marketName: string;
  overallConfidence: string;
  tam: Figure;
  sam: Figure;
  som: Figure;
  cagr: Figure & { period: string };
};

function ConfidenceBadge({ level }: { level: string }) {
  const colors: { [key: string]: string } = {
    High: "bg-green-100 text-green-800",
    Medium: "bg-amber-100 text-amber-800",
    Low: "bg-red-100 text-red-800",
  };
  return (
    <span className={`text-xs font-medium px-2 py-1 rounded-full ${colors[level] || "bg-gray-100 text-gray-700"}`}>
      {level}
    </span>
  );
}

function FigureCard({ label, figure }: { label: string; figure: Figure }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-1">
        <span className="font-medium text-gray-900">
          {label}: {figure.value}
        </span>
        <ConfidenceBadge level={figure.confidence} />
      </div>
      <p className="text-sm text-gray-600">{figure.methodology}</p>
    </div>
  );
}

export default function Home() {
  const [market, setMarket] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<Report | null>(null);
  const [error, setError] = useState("");

  async function generateReport() {
    setLoading(true);
    setReport(null);
    setError("");
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ market }),
      });
      const data = await response.json();
      if (data.report) {
        setReport(data.report);
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-10 bg-white">
      <div className="w-full max-w-xl">
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">Sizeup</h1>
        <p className="text-gray-600 mb-8">
          Investor-ready market sizing in minutes.
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

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        {report && (
          <div className="mt-8">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {report.marketName}
              </h2>
              <ConfidenceBadge level={report.overallConfidence} />
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">Market size</h3>
            <div className="space-y-3 mb-6">
              <FigureCard label="TAM" figure={report.tam} />
              <FigureCard label="SAM" figure={report.sam} />
              <FigureCard label="SOM" figure={report.som} />
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">Growth rate</h3>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-gray-900">
                  CAGR: {report.cagr.value} ({report.cagr.period})
                </span>
                <ConfidenceBadge level={report.cagr.confidence} />
              </div>
              <p className="text-sm text-gray-600">{report.cagr.methodology}</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}