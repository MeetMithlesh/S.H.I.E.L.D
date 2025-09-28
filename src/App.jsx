import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import LearningPath from './components/LearningPath';
import DisasterPrepGame from './components/DisasterPrepGame';   
import AdminDashboard from './components/AdminDashboard';
// import { I18nextProvider } from 'react-i18next';
// import i18n from './i18n'; // Import the i18n configuration

function App() {
  return (
    // <I18nextProvider i18n={i18n}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/learning-path" element={<LearningPath />} />
            <Route path="/disaster-prep-game" element={<DisasterPrepGame />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Routes>
        </div>
      </Router>
    // </I18nextProvider>
  );
}

export default App;
