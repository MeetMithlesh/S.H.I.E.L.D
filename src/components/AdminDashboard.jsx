import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../css/AdminDashboard.css';
import { useNavigate } from 'react-router-dom';
import schoolIconPng from '../assets/image.png';
import alertIconPng from '../assets/image1.png';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';

// Fix for default icon issues with Leaflet and Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const schoolIcon = new L.Icon({
  iconUrl: schoolIconPng,
  iconSize: [40, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const alertIcon = new L.Icon({
  iconUrl: alertIconPng,
  iconSize: [40, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function AdminDashboard() {
  const { t } = useTranslation();
  const [alerts, setAlerts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const navigate = useNavigate();

  const indianStatesAndCities = {
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur"],
    "Assam": ["Guwahati", "Silchar", "Dibrugarh"],
    "Bihar": ["Patna", "Gaya", "Bhagalpur"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara"],
    "Karnataka": ["Bengaluru", "Mysuru", "Hubballi"],
    "Kerala": ["Kochi", "Thiruvananthapuram", "Kozhikode"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi"],
    "West Bengal": ["Kolkata", "Howrah", "Durgapur"]
  };

  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [floodPrediction, setFloodPrediction] = useState(null);

  const generateRandomIndianCoordinates = () => {
    // Approximate bounding box for India
    const minLat = 8.4;
    const maxLat = 37.6;
    const minLng = 68.7;
    const maxLng = 97.2;

    const lat = Math.random() * (maxLat - minLat) + minLat;
    const lng = Math.random() * (maxLng - minLng) + minLng;
    return [lat, lng];
  };

  const mockSchools = Array.from({ length: 20 }, (_, i) => {
    const [lat, lng] = generateRandomIndianCoordinates();
    return {
      id: `school-${i}`,
      name: `School ${i + 1} Name`,
      address: `${i + 1} Main Street, City, State, India`,
      latitude: lat,
      longitude: lng,
    };
  });

  const [schools, setSchools] = useState(mockSchools);

  const handlePredictFlood = () => {
    if (selectedState && selectedCity) {
      // Make API call to backend for flood prediction
      fetch('http://localhost:8000/predict/location', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify({ state: selectedState, city: selectedCity }),
      })
        .then(response => response.json())
        .then(data => {
          let predictionMessage = '';
          let riskLevelClass = '';
          if (data.Flood_Occurred === 0) {
            predictionMessage = `No chances of flood in ${selectedCity}.`;
            riskLevelClass = 'low';
          } else if (data.risk_level) {
            predictionMessage = `Flood risk in ${selectedCity}: ${data.risk_level}.`;
            riskLevelClass = data.risk_level.toLowerCase();
          } else {
            predictionMessage = `Could not determine flood risk for ${selectedCity}.`;
            riskLevelClass = 'unknown';
          }
          setFloodPrediction({ message: predictionMessage, class: riskLevelClass });
        })
        .catch(error => {
          console.error('Error predicting flood:', error);
          setFloodPrediction({ message: 'Error predicting flood.', class: 'unknown' });
        });
    } else {
      setFloodPrediction('Please select both state and city.');
    }
  };

  useEffect(() => {
    // Fetch alerts from the backend API
    fetch('http://localhost:8000/api/alerts')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          const validAlerts = data.filter(alert => 
            alert.latitude !== undefined && 
            alert.longitude !== undefined
          );
          setAlerts(validAlerts);
        } else {
          console.error('API response is not an array:', data);
          setAlerts([]); // Ensure alerts is an empty array
        }
      })
      .catch(error => {
        console.error('Error fetching alerts:', error);
        setAlerts([]); // Ensure alerts is an empty array on error
      });
  }, []);

  const filteredAlerts = alerts.filter(alert => {
    const alertTitle = alert.title || '';
    const alertDescription = alert.description || '';
    const alertType = alert.analysis?.disaster_type || '';
    const matchesSearch = alertTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          alertDescription.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || alertType.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-left">
          <div className="home-icon" onClick={() => navigate('/')}>🏠</div>
          <h1>{t('admin_dashboard')}</h1>
        </div>
        <LanguageSwitcher />
      </div>
      <div className="dashboard-grid">
        <div className="map-card card">
          <div className="card-header">
            <h2>{t('real_time_hazard_map')}</h2>
          </div>
          <div className="map-content">
            <MapContainer center={[22.3511147, 78.6677428]} zoom={5} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              {schools.map(school => (
                <React.Fragment key={school.id}>
                  <Marker position={[school.latitude, school.longitude]} icon={schoolIcon}>
                    <Popup>
                      <h3>{school.name}</h3>
                      <p>{school.address}</p>
                    </Popup>
                  </Marker>
                  <Circle
                    center={[school.latitude, school.longitude]}
                    radius={50000} // 50 km in meters
                    color="blue"
                    fillColor="#0000ff"
                    fillOpacity={0.1}
                  />
                </React.Fragment>
              ))}
              {filteredAlerts.map(alert => (
                <Marker key={alert.id} position={[alert.latitude, alert.longitude]} icon={alertIcon}>
                  <Popup>
                    <h3>{alert.title}</h3>
                    <p>{alert.description}</p>
                    <p><strong>{t('type')}:</strong> {alert.analysis?.disaster_type}</p>
                    <p><strong>{t('severity')}:</strong> {alert.analysis?.severity}</p>
                    <p><strong>{t('date')}:</strong> {new Date(alert.timestamp).toLocaleString()}</p>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
        <div className="alerts-list-card card">
          <div className="card-header">
            <h2>{t('all_alerts')}</h2>
          </div>
          <div className="alerts-list-content">
            <div className="controls">
              <input
                type="text"
                placeholder={t('search_alerts')}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <select value={filterType} onChange={e => setFilterType(e.target.value)}>
                <option value="all">{t('all_types')}</option>
                {[...new Set(alerts.map(alert => alert.analysis?.disaster_type).filter(Boolean))].map((type, index) => (
                  <option key={`${type}-${index}`} value={type.toLowerCase()}>{type}</option>
                ))}
              </select>
            </div>
            <div className="alerts-list">
              {filteredAlerts.length > 0 ? (
                filteredAlerts.map(alert => (
                  <div key={alert.id} className="alert-item">
                    <h3>{alert.title}</h3>
                    <p>{alert.description}</p>
                    <p><strong>{t('type')}:</strong> {alert.analysis?.disaster_type}</p>
                    <p><strong>{t('severity')}:</strong> {alert.analysis?.severity}</p>
                    <p><strong>{t('date')}:</strong> {new Date(alert.timestamp).toLocaleString()}</p>
                  </div>
                ))
              ) : (
                <p>{t('no_alerts_found')}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="prediction-card card">
        <div className="card-header">
          <h2>{t('flood_prediction')}</h2>
        </div>
        <div className="prediction-content">
          <div className="controls">
            <select value={selectedState} onChange={e => {
              setSelectedState(e.target.value);
              setSelectedCity(''); // Reset city when state changes
            }}>
              <option value="">{t('select_state')}</option>
              {Object.keys(indianStatesAndCities).map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            <select value={selectedCity} onChange={e => setSelectedCity(e.target.value)} disabled={!selectedState}>
              <option value="">{t('select_city')}</option>
              {selectedState && indianStatesAndCities[selectedState].map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            <button onClick={handlePredictFlood} disabled={!selectedCity}>{t('predict_flood')}</button>
          </div>
          <div className={`prediction-result ${floodPrediction?.class}`}>
            {floodPrediction ? 
              (floodPrediction.message.includes('No chances') ? t('no_chances_of_flood', { city: selectedCity }) :
              (floodPrediction.message.includes('Flood risk') ? t('flood_risk_in', { city: selectedCity, risk_level: floodPrediction.class }) :
              (floodPrediction.message.includes('Could not determine') ? t('could_not_determine_flood_risk', { city: selectedCity }) :
              t('error_predicting_flood'))))
              : 
              t('select_a_city_and_predict_flood_chances')
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
