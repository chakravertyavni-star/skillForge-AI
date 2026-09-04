import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import { learnerNav, adminNav } from './navigation';

import LandingPage from '../pages/LandingPage';
import DashboardPage from '../pages/DashboardPage';
import ProfilePage from '../pages/ProfilePage';
import SkillsPage from '../pages/SkillsPage';
import AssessmentPage from '../pages/AssessmentPage';
import AssessmentResultsPage from '../pages/AssessmentResultsPage';
import RecommendationsPage from '../pages/RecommendationsPage';
import LearningPage from '../pages/LearningPage';
import ProgressPage from '../pages/ProgressPage';
import AIAssistantPage from '../pages/AIAssistantPage';
import NotFoundPage from '../pages/NotFoundPage';

import AdminDashboardPage from '../pages/admin/AdminDashboardPage';
import LearnerManagementPage from '../pages/admin/LearnerManagementPage';
import SkillManagementPage from '../pages/admin/SkillManagementPage';
import CourseManagementPage from '../pages/admin/CourseManagementPage';
import AssessmentManagementPage from '../pages/admin/AssessmentManagementPage';

/**
 * Route map for the whole application.
 *
 * `/`       public landing page
 * `/app`    learner workspace (shared layout)
 * `/admin`  administration area (same layout, different navigation)
 *
 * There is no authentication yet, so every route is open. Route guards will be
 * added in the authentication phase.
 */
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/app" element={<AppLayout items={learnerNav} area="learner" />}>
        <Route index element={<DashboardPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="skills" element={<SkillsPage />} />
        <Route path="assessment" element={<AssessmentPage />} />
        <Route path="assessment/results" element={<AssessmentResultsPage />} />
        <Route path="recommendations" element={<RecommendationsPage />} />
        <Route path="learning" element={<LearningPage />} />
        <Route path="progress" element={<ProgressPage />} />
        <Route path="assistant" element={<AIAssistantPage />} />
      </Route>

      <Route path="/admin" element={<AppLayout items={adminNav} area="admin" />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="learners" element={<LearnerManagementPage />} />
        <Route path="skills" element={<SkillManagementPage />} />
        <Route path="courses" element={<CourseManagementPage />} />
        <Route path="assessments" element={<AssessmentManagementPage />} />
      </Route>

      <Route path="/dashboard" element={<Navigate to="/app" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
