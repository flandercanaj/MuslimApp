const PrayerCard = ({ name, time }) => (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl">{name}</h2>
      <p className="text-lg">{time}</p>
    </div>
  );
  
  export default PrayerCard;
  