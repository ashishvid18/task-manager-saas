import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await API.post("/auth/signup", form);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="glass-card w-full max-w-md animate-in fade-in zoom-in duration-700">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-emerald-100 text-emerald-600 mb-6 border border-emerald-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Create Account</h1>
          <p className="text-emerald-700 font-medium mt-3">Join our community today</p>
        </div>

        {error && (
          <div className="bg-red-50 border-2 border-red-100 text-red-700 p-4 rounded-2xl mb-8 text-sm flex items-center gap-3 font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Full Name</label>
            <input
              placeholder="John Doe"
              className="input-field"
              required
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

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
              "Get Started"
            )}
          </button>

          <p className="mt-10 text-center text-slate-600 font-medium">
            Already have an account? <Link to="/" className="text-emerald-600 hover:text-emerald-700 font-bold underline decoration-2 underline-offset-4">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
