import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import LearningPath from './components/LearningPath';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/learning-path" element={<LearningPath />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
