const API_URL = "http://localhost:5001/api";

export const fetchPrayerTimes = async () => {
  const res = await fetch(`${API_URL}/prayer`);
  return res.json();
};
