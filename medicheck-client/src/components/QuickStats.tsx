import { useEffect, useState } from "react";

export default function QuickStats() {
  const [stats, setStats] = useState({
    diagnosesCount: 0,
    favoritesCount: 0,
    accountCreated: "",
    lastAssessment: "",
    loading: true,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const user = JSON.parse(sessionStorage.getItem("user") || "{}"); // stored at login
        if (!user?.id) {
          console.error("No user found in sessionStorage");
          return;
        }

        // fetch diagnoses (auth required)
        const diagnosesRes = await fetch("https://medicheck-app-3.onrender.com/api/diagnosis", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const diagnoses = await diagnosesRes.json();

        // fetch saved hospitals for this user
        const favoritesRes = await fetch(
          `https://medicheck-app-3.onrender.com/api/save-hospital/${user.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const favorites = await favoritesRes.json();

        // build stats
        setStats({
          diagnosesCount: Array.isArray(diagnoses) ? diagnoses.length : 0,
          favoritesCount: Array.isArray(favorites) ? favorites.length : 0,
          accountCreated: user.createdAt
            ? new Date(user.createdAt).toLocaleDateString()
            : "N/A",
          lastAssessment:
            Array.isArray(diagnoses) && diagnoses.length > 0
              ? new Date(
                  diagnoses[diagnoses.length - 1].createdAt
                ).toLocaleDateString()
              : "No assessments yet",
          loading: false,
        });
      } catch (err) {
        console.error("Failed to fetch stats:", err);
        setStats((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      label: "Health Checks",
      value: `${stats.diagnosesCount} total assessments`,
    },
    {
      label: "Facilities Saved",
      value: `${stats.favoritesCount} favorite locations`,
    },
    {
      label: "Account Active",
      value: `Since ${stats.accountCreated}`,
    },
    { label: "Last Assessment", value: stats.lastAssessment },
  ];

  return (
    <section className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-3xl font-semibold mb-4 text-gray-700">
        Your Health Journey
      </h2>
      {stats.loading ? (
        <p className="text-gray-500">Loading stats...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {statCards.map((stat, idx) => (
            <div
              key={idx}
              className="border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition"
            >
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-lg font-medium text-gray-800">{stat.value}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
