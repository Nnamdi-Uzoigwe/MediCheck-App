export default function QuickStats() {
  const stats = [
    { label: "Health Checks", value: "3 total assessments" },
    { label: "Facilities Saved", value: "2 favorite locations" },
    { label: "Account Active", value: "Since January 2025" },
    { label: "Last Assessment", value: "3 days ago" },
  ];

  return (
    <section className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-3xl font-semibold mb-4 text-gray-700">Your Health Journey</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition"
          >
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-lg font-medium text-gray-800">{stat.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
