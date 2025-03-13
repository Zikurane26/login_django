// src/App.tsx
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import Login from "./components/Login";
import BeneficiariosCRUD from "./components/BeneficiariosCrud";
import ChalecosCRUD from "./components/ChalecosCrud";
import FiltrarChalecos from "./components/FiltrarChalecos";

interface PrivateRouteProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

// Componente para rutas protegidas
const PrivateRoute: React.FC<PrivateRouteProps> = ({
  isAuthenticated,
  children,
}) => {
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    localStorage.getItem("isAuthenticated") === "true"
  );

  return (
    <Router>
      {isAuthenticated && (
        <nav className="nav-unp">
          <Link className="nav-link" to="/beneficiarios">
            Beneficiarios
          </Link>
          <Link className="nav-link" to="/chalecos">
            Chalecos
          </Link>
          <Link className="nav-link" to="/filtrado">
            Filtrar Chalecos
          </Link>
          <Link
            className="nav-link logout-btn"
            to="/login"
            onClick={() => {
              localStorage.removeItem("isAuthenticated");
              setIsAuthenticated(false);
            }}
          >
            Cerrar Sesión
          </Link>
        </nav>
      )}
      <Routes>
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/beneficiarios"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <BeneficiariosCRUD />
            </PrivateRoute>
          }
        />
        <Route
          path="/chalecos"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <ChalecosCRUD />
            </PrivateRoute>
          }
        />
        <Route
          path="/filtrado"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <FiltrarChalecos />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
