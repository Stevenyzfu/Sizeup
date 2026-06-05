import Link from "next/link";

function ConfidenceBadge({ level }: { level: string }) {
  const colors: { [key: string]: string } = {
    High: "bg-green-100 text-green-800",
    Medium: "bg-amber-100 text-amber-800",
    Low: "bg-red-100 text-red-800",
  };
  return (
    <span className={`text-xs font-medium px-2 py-1 rounded-full ${colors[level]}`}>
      {level} confidence
    </span>
  );
}

export default function Report() {
  return (
    <main className="min-h-screen bg-white px-4 py-10">
      <div className="w-full max-w-2xl mx-auto">
        <Link href="/" className="text-blue-600 text-sm hover:underline">
          ← Back
        </Link>

        <div className="flex items-center gap-3 mt-4 mb-1">
          <h1 className="text-2xl font-semibold text-gray-900">
            HR software for small businesses
          </h1>
          <ConfidenceBadge level="Medium" />
        </div>
        <p className="text-gray-500 text-sm mb-8">Global · Generated June 2026</p>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Market size</h2>
          <div className="space-y-3">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-gray-900">TAM: $18B–$24B</span>
                <ConfidenceBadge level="Medium" />
              </div>
              <p className="text-sm text-gray-600">
                Derived from global HR software revenue reported by Workday, SAP,
                and ADP, adjusted for SMB segment share.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-gray-900">SAM: $5B–$8B</span>
                <ConfidenceBadge level="Medium" />
              </div>
              <p className="text-sm text-gray-600">
                English-speaking markets where SMB HR software adoption is highest.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-gray-900">SOM: $10M–$80M</span>
                <ConfidenceBadge level="Low" />
              </div>
              <p className="text-sm text-gray-600">
                Realistic capture for a new entrant with no existing distribution.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Growth rate</h2>
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium text-gray-900">CAGR: 10%–14% (2024–2029)</span>
              <ConfidenceBadge level="Medium" />
            </div>
            <p className="text-sm text-gray-600">
              Based on public revenue growth of major HR software players and
              adjacent HCM market estimates.
            </p>
          </div>
        </section>

        <button className="w-full bg-gray-900 text-white font-medium rounded-lg py-3 hover:bg-gray-800 transition">
          Download PDF
        </button>
      </div>
    </main>
  );
}