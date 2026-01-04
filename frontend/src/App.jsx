import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, useState, useEffect } from "react";
import { AuthProvider } from "./context/AuthContext";

// --- Layouts ---
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/partials/Footer";
import ProtectedRoute from "./components/layouts/ProtectedRoute";
import Oops from "./components/partials/404";

// --- Pages ---
import HomePage from "./pages/Home";
import CitizenLogin from "./pages/login/CitizenLogin";
import StaffLogin from "./pages/login/StaffLogin";
import RegisterPage from "./pages/register/RegisterPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import ComplaintsPage from "./pages/complaints/ComplaintsPage";
import AnnouncementsPage from "./pages/announcements/AnnouncementsPageWrapper";
import NewService from "./pages/services/NewService";
import { CitizenServices } from "./components/Home/CitizenServices";
import Tracker from "./pages/services/Tracker";
import IoTPage from "./pages/iot/IoTPage";
import AdminPage from "./pages/admin/AdminPage";
import GalleryPage from "./pages/Gallery";
import UploadPhoto from "./pages/UploadPhoto";
import Feedback from "./pages/feedback/Feedback";
import { About } from "./pages/about/About";
import ChatbotPopup from "./pages/chat/ChatbotPopup";

// --- Staff Management Pages ---
import StaffComplaints from "./pages/staff/StaffComplaints";
import StaffServices from "./pages/staff/StaffServices";

// --- UI Components ---
import Spinner from "./components/features/UI/Spinner";

// Loading Fallback Component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <Spinner size={40} className="text-[#9f1239] mx-auto mb-4" />
      <p className="text-slate-600 font-medium">Loading...</p>
    </div>
  </div>
);

function App() {
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (isInitializing) {
    return <LoadingSpinner />;
  }

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Navbar />
          <main className="flex-1 pt-20 md:pt-24">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                {/* --- Public Routes --- */}
                <Route path="/" element={<HomePage />} />
                <Route path="/citizenlogin" element={<CitizenLogin />} />
                <Route path="/staff-login" element={<StaffLogin />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/announcements" element={<AnnouncementsPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/citizen-services" element={<CitizenServices />} />
                <Route path="/about" element={<About />} />

                {/* --- Protected Routes (Citizen) --- */}
                <Route
                  path="/gallery/upload-photo"
                  element={
                    <ProtectedRoute requiredRole="citizen">
                      <UploadPhoto />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/iot"
                  element={
                    <ProtectedRoute requiredRole="citizen">
                      <IoTPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/feedback"
                  element={
                    <ProtectedRoute requiredRole="citizen">
                      <Feedback />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute requiredRole="citizen">
                      <DashboardPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/complaints/*"
                  element={
                    <ProtectedRoute requiredRole="citizen">
                      <ComplaintsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/services/*"
                  element={
                    <ProtectedRoute requiredRole="citizen">
                      <NewService />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/services/tracker*"
                  element={
                    <ProtectedRoute requiredRole="citizen">
                      <Tracker />
                    </ProtectedRoute>
                  }
                />

                {/* --- Admin / Staff Routes --- */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminPage />
                    </ProtectedRoute>
                  }
                />

                {/* STAFF: Complaints Management */}
                <Route
                  path="/staff/complaints"
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <StaffComplaints />
                    </ProtectedRoute>
                  }
                />

                {/* STAFF: Services Management */}
                <Route
                  path="/staff/services"
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <StaffServices />
                    </ProtectedRoute>
                  }
                />

                {/* --- 404 Route --- */}
                <Route path="*" element={<Oops />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <ChatbotPopup />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
