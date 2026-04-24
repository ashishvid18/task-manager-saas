import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    try {
      await API.post("/tasks", { title });
      setTitle("");
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleTask = async (id, status) => {
    try {
      await API.put(`/tasks/${id}`, {
        status: status === "pending" ? "completed" : "pending",
      });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === "completed").length,
    pending: tasks.filter(t => t.status === "pending").length,
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
        <div>
          <h1 className="text-5xl font-black text-slate-900 mb-3 tracking-tight">Your Workspace</h1>
          <p className="text-emerald-800 font-semibold text-lg flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Stay organized and boost your productivity
          </p>
        </div>
        <button 
          onClick={handleLogout}
          className="bg-white border-2 border-emerald-100 px-6 py-3 rounded-2xl text-slate-700 font-bold hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 transition-all flex items-center gap-2 group shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          Sign Out
        </button>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {[
          { label: "Total Tasks", value: stats.total, color: "from-emerald-500 to-teal-400", shadow: "shadow-emerald-200" },
          { label: "Done", value: stats.completed, color: "from-teal-500 to-cyan-400", shadow: "shadow-teal-200" },
          { label: "In Progress", value: stats.pending, color: "from-emerald-600 to-emerald-500", shadow: "shadow-emerald-300" },
        ].map((stat, i) => (
          <div key={i} className={`glass-card relative overflow-hidden group border-2 ${stat.shadow}`}>
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity`}></div>
            <p className="text-slate-500 text-sm font-black uppercase tracking-wider mb-2">{stat.label}</p>
            <p className="text-5xl font-black text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Input Section */}
        <div className="lg:col-span-1">
          <div className="glass-card sticky top-8 border-2 border-emerald-100">
            <h2 className="text-2xl font-black text-slate-900 mb-8">Add New Task</h2>
            <form onSubmit={createTask} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Task Description</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Buy groceries"
                  className="input-field border-2"
                />
              </div>
              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-3 text-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Create Task
              </button>
            </form>
          </div>
        </div>

        {/* Task List Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-black text-slate-900">Task List</h2>
            <span className="bg-emerald-100 text-emerald-800 text-sm px-4 py-1.5 rounded-full font-black ring-2 ring-emerald-200">
              {tasks.length} {tasks.length === 1 ? 'Task' : 'Tasks'}
            </span>
          </div>
          
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 text-emerald-600">
              <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin mb-6"></div>
              <p className="font-bold text-lg text-slate-600">Loading your space...</p>
            </div>
          ) : tasks.length === 0 ? (
            <div className="glass-card py-24 text-center border-dashed border-4 border-emerald-100">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-50 text-emerald-300 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
              </div>
              <p className="text-slate-800 text-2xl font-black mb-2">No tasks found</p>
              <p className="text-slate-500 font-medium">Add something to your list to get started!</p>
            </div>
          ) : (
            <div className="space-y-4 animate-in slide-in-from-bottom-8 duration-700">
              {tasks.map((task) => (
                <div key={task.id} className={`glass-card group flex items-center justify-between p-6 border-2 hover:border-emerald-300 ${task.status === "completed" ? "bg-emerald-50/50 border-emerald-200" : "border-emerald-100"}`}>
                  <div className="flex items-center gap-6 flex-1">
                    <button 
                      onClick={() => toggleTask(task.id, task.status)}
                      className={`w-8 h-8 rounded-xl border-3 transition-all flex items-center justify-center ${
                        task.status === "completed" 
                          ? "bg-emerald-600 border-emerald-600 shadow-lg shadow-emerald-200" 
                          : "bg-white border-emerald-100 hover:border-emerald-400"
                      }`}
                    >
                      {task.status === "completed" && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="text-white"><polyline points="20 6 9 17 4 12"/></svg>
                      )}
                    </button>
                    <span className={`text-xl font-bold transition-all ${task.status === "completed" ? "line-through text-slate-400" : "text-slate-800"}`}>
                      {task.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => deleteTask(task.id)}
                      className="p-3 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                      title="Delete task"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
