import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/authStore";

// Layout
import { AppLayout } from "./components/layout/AppLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";

// Public Pages
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

// Private Pages
import { Dashboard } from "./pages/Dashboard";
import { MisAutos } from "./pages/MisAutos";
import { VerificarAuto } from "./pages/VerificarAuto";
import { Cuenta } from "./pages/Cuenta";

import CarDetail from "./pages/autos/AutoDetalle";

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            !isAuthenticated ? <Login /> : <Navigate to="/app" replace />
          }
        />
        <Route
          path="/registro"
          element={
            !isAuthenticated ? <Register /> : <Navigate to="/app" replace />
          }
        />

        {/* Protected Routes */}
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="autos" element={<MisAutos />} />
          <Route path="autos/:id" element={<CarDetail />} />
          <Route path="verificar" element={<VerificarAuto />} />
          <Route path="cuenta" element={<Cuenta />} />
        </Route>

        {/* Redirect root to appropriate page */}
        <Route
          path="/"
          element={
            <Navigate to={isAuthenticated ? "/app" : "/login"} replace />
          }
        />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
