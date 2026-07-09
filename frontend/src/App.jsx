import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Public Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// User Pages
import Dashboard from "./pages/Dashboard";
import Problems from "./pages/Problems";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProblems from "./pages/admin/problems/Problems";
import CreateProblem from "./pages/admin/problems/CreateProblem";
import UpdateProblem from "./pages/admin/problems/UpdateProblem";
import DeleteProblem from "./pages/admin/problems/DeleteProblem";

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />

      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ================= USER ROUTES ================= */}

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/problems" element={<Problems />} />

        {/* ================= ADMIN ROUTES ================= */}

        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        <Route
          path="/admin/problems"
          element={<AdminProblems />}
        />

        <Route
          path="/admin/problems/create"
          element={<CreateProblem />}
        />

        <Route
          path="/admin/problems/update/:id"
          element={<UpdateProblem />}
        />

<Route
  path="/admin/problems/delete/:id"
  element={<DeleteProblem />}
/>

        {/* ================= 404 ================= */}

        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
              <h1 className="text-5xl font-bold text-gray-700">
                404 | Page Not Found
              </h1>
            </div>
          }
        />

      </Routes>
    </>
  );
}

export default App;