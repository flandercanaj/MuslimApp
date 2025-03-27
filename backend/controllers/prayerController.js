exports.getPrayerTimes = async (req, res) => {
  try {
    const prayerTimes = [
      { prayer: "Imsaku", time: "04:37" },
      { prayer: "Lindja e diellit", time: "06:08" },
      { prayer: "Dreka", time: "11:51" },
      { prayer: "Ikindia", time: "14:58" },
      { prayer: "Akshami", time: "17:30" }
    ];
    res.json(prayerTimes); // Send the prayer times as JSON
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch prayer times' });
  }
};
