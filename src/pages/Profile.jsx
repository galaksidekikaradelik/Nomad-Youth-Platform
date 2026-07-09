// src/pages/Profile.jsx
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth'; // öz yoluna uyğunlaşdır
import { Settings, ArrowDown } from 'lucide-react';
import './Profile.css';

// Backend gələnə kimi mock data
const mockSelectedCountries = [
  'Türkiyə',
  'Almaniya',
  'Polşa',
  'İtaliya',
  'İspaniya',
];

const mockSavedItems = [
  { id: 1, title: 'Gənclər Mübadiləsi - Berlin', daysLeft: 1 },
  { id: 2, title: 'Təlim Kursu - Varşava', daysLeft: 3 },
];

const Profile = () => {
  const { user } = useAuth();
  const [selectedCountries] = useState(mockSelectedCountries);
  const [savedItems] = useState(mockSavedItems);

  const firstNameValue = user
    ? `${user.firstName || ''}`.trim()
    : '';
  const name = firstNameValue || 'İstifadəçi';

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>Xoş gəlmisiniz, {name}!</h1>
        <button className="profile-settings-btn" aria-label="Ayarlar">
          <Settings size={22} />
        </button>
      </div>

      <div className="profile-sections">
        {/* Seçimlilər */}
        <div className="profile-section">
          <h2>Seçilmişlər</h2>
          <ArrowDown className="section-arrow" size={20} />
          <ul className="country-list">
            {selectedCountries.length > 0 ? (
              selectedCountries.map((country) => (
                <li key={country}>{country}</li>
              ))
            ) : (
              <li className="empty-text">Hələ ölkə seçilməyib</li>
            )}
          </ul>
        </div>

        {/* Yadda saxlanılanlar */}
        <div className="profile-section">
          <h2>Yadda saxlanılanlar</h2>
          <ArrowDown className="section-arrow" size={20} />
          <ul className="saved-list">
            {savedItems.length > 0 ? (
              savedItems.map((item) => (
                <li key={item.id} className="saved-item">
                  <span>{item.title}</span>
                  {item.daysLeft <= 1 && (
                    <span className="badge-urgent">
                      Son {item.daysLeft} gün qalıb!
                    </span>
                  )}
                </li>
              ))
            ) : (
              <li className="empty-text">Yadda saxlanılan yoxdur</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;