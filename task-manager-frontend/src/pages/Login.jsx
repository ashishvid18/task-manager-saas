import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="glass-card w-full max-w-md animate-in fade-in zoom-in duration-700">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-emerald-100 text-emerald-600 mb-6 border border-emerald-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Welcome Back</h1>
          <p className="text-emerald-700 font-medium mt-3">Sign in to manage your tasks</p>
        </div>

        {error && (
          <div className="bg-red-50 border-2 border-red-100 text-red-700 p-4 rounded-2xl mb-8 text-sm flex items-center gap-3 font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              className="input-field"
              required
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="input-field"
              required
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary w-full mt-6 flex items-center justify-center gap-3 text-lg"
          >
            {loading ? (
              <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              "Sign In"
            )}
          </button>

          <p className="mt-10 text-center text-slate-600 font-medium">
            Don't have an account? <Link to="/signup" className="text-emerald-600 hover:text-emerald-700 font-bold underline decoration-2 underline-offset-4">Create one free</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
