import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const prayerTimes = [
    { prayer: 'Fajr', time: '5:30 AM' },
    { prayer: 'Dhuhr', time: '12:45 PM' },
    { prayer: 'Asr', time: '4:15 PM' },
    { prayer: 'Maghrib', time: '6:30 PM' },
    { prayer: 'Isha', time: '8:00 PM' }
  ];



  const handleViewUniversities = () => {
    navigate('/universities'); // Navigon te faqja e universiteteve
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-green-600 mb-6">Orari i Lutjeve</h1>

        {user && user.role === "admin" && (
          <button
            onClick={handleCreateLecture}
            className="mb-6 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
          >
            Create Lecture
          </button>
        )}

        {/* Butoni për të parë universitetet */}
        <button
          onClick={handleViewUniversities}
          className="mb-6 ml-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          View Universities
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {prayerTimes.map((time, index) => (
            <div key={index} className="bg-green-100 p-5 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-green-700 mb-3">{time.prayer}</h2>
              <p className="text-lg text-gray-700">Koha: {time.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
