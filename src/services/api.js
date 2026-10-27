const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:8000/api";

export const api = {
  getHomeSummary: async () => {
    const res = await fetch(`${API_BASE}/stats/summary`);
    if (!res.ok) throw new Error("Failed to fetch summary stats");
    return res.json();
  },

  getPlayers: async ({ role, team, search, maxPrice } = {}) => {
    const params = new URLSearchParams();
    if (role && role !== "All") params.append("role", role);
    if (team && team !== "All") params.append("team", team);
    if (search) params.append("search", search);
    if (maxPrice) params.append("max_price", maxPrice);

    const res = await fetch(`${API_BASE}/players?${params.toString()}`);
    if (!res.ok) throw new Error("Failed to fetch players");
    return res.json();
  },

  comparePlayers: async (p1Id, p2Id) => {
    const res = await fetch(`${API_BASE}/compare?p1_id=${p1Id}&p2_id=${p2Id}`);
    if (!res.ok) throw new Error("Failed to compare players");
    return res.json();
  },

  saveDreamTeam: async ({ teamName, creatorName, playerIds, maxBudget = 100 }) => {
    const res = await fetch(`${API_BASE}/teams`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        team_name: teamName,
        creator_name: creatorName,
        player_ids: playerIds,
        max_budget: maxBudget,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || "Failed to save team");
    return data;
  },

  getSavedTeams: async () => {
    const res = await fetch(`${API_BASE}/teams`);
    if (!res.ok) throw new Error("Failed to load saved teams");
    return res.json();
  },

  getQuizQuestions: async (count = 5) => {
    const res = await fetch(`${API_BASE}/quiz/generate?count=${count}`);
    if (!res.ok) throw new Error("Failed to generate quiz");
    return res.json();
  },

  submitQuizScore: async ({ username, score, totalQuestions }) => {
    const res = await fetch(`${API_BASE}/quiz/leaderboard`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        score,
        total_questions: totalQuestions,
      }),
    });
    return res.json();
  },
};
