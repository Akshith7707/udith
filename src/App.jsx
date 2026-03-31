import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProfilerPage from './pages/ProfilerPage';
import CareersPage from './pages/CareersPage';
import ResourcesPage from './pages/ResourcesPage';
import MentorsPage from './pages/MentorsPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/profiler" element={<ProfilerPage />} />
      <Route path="/careers" element={<CareersPage />} />
      <Route path="/resources" element={<ResourcesPage />} />
      <Route path="/mentors" element={<MentorsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
