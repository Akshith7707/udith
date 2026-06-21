import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { pageEnter } from './lib/motion';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import ProfilerPage from './pages/ProfilerPage';
import CareersPage from './pages/CareersPage';
import CareerDetailPage from './pages/CareerDetailPage';
import ComparePage from './pages/ComparePage';
import ResourcesPage from './pages/ResourcesPage';
import MentorsPage from './pages/MentorsPage';
import SharedResultsPage from './pages/SharedResultsPage';
import ResumePage from './pages/ResumePage';

function AnimatedRoutes() {
  const location = useLocation();
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) pageEnter(ref.current);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div ref={ref}>
      <Routes location={location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profiler" element={<ProfilerPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/careers/:id" element={<CareerDetailPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/mentors" element={<MentorsPage />} />
        <Route path="/shared" element={<SharedResultsPage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return <AnimatedRoutes />;
}
