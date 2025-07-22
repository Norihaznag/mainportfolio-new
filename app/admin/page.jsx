"use client";
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { LogOut, PlusCircle, List, User } from 'lucide-react';

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
const ADMIN_AUTH_KEY = 'azinag_admin_authed';

export default function AdminPage() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [form, setForm] = useState({
    title: '',
    description: '',
    link: '',
    featured: false,
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [message, setMessage] = useState(null);
  const [apps, setApps] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem(ADMIN_AUTH_KEY) === 'true') {
        setIsAuthed(true);
      }
    }
  }, []);

  useEffect(() => {
    if (isAuthed) fetchApps();
  }, [isAuthed]);

  const fetchApps = async () => {
    setFetching(true);
    const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (!error) setApps(data);
    setFetching(false);
  };

  const handleAuth = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthed(true);
      setPassword('');
      if (typeof window !== 'undefined') {
        localStorage.setItem(ADMIN_AUTH_KEY, 'true');
      }
    } else {
      setMessage({ type: 'error', text: 'Incorrect password.' });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    const { error } = await supabase.from('projects').insert([
      {
        title: form.title,
        description: form.description,
        link: form.link,
        featured: form.featured,
      },
    ]);
    setLoading(false);
    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setMessage({ type: 'success', text: 'App added successfully!' });
      setForm({
        title: '',
        description: '',
        link: '',
        featured: false,
      });
      fetchApps();
    }
  };

  const handleEdit = (app) => {
    setEditingId(app.id);
    setEditForm({
      title: app.title || '',
      description: app.description || '',
      link: app.link || '',
      featured: !!app.featured,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    // Debug: log the update payload and id
    console.log('Updating app:', editingId, editForm);
    const { error, data } = await supabase.from('projects').update({
      title: editForm.title,
      description: editForm.description,
      link: editForm.link,
      featured: editForm.featured,
    }).eq('id', editingId).select();
    setLoading(false);
    // Debug: log the response
    console.log('Update response:', { error, data });
    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setMessage({ type: 'success', text: 'App updated successfully!' });
      setEditingId(null);
      setEditForm({});
      fetchApps();
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this app?')) return;
    setLoading(true);
    setMessage(null);
    const { error } = await supabase.from('projects').delete().eq('id', id);
    setLoading(false);
    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setMessage({ type: 'success', text: 'App deleted successfully!' });
      fetchApps();
    }
  };

  const handleLogout = () => {
    setIsAuthed(false);
    setMessage(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(ADMIN_AUTH_KEY);
    }
  };

  if (!isAuthed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-900 px-4">
        <form onSubmit={handleAuth} className="bg-neutral-800 p-8 rounded-xl shadow-md w-full max-w-sm border border-neutral-700">
          <h2 className="text-2xl font-bold mb-4 text-white">Admin Login</h2>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 px-4 py-2 border border-neutral-700 rounded bg-neutral-900 text-white"
            required
          />
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded font-semibold hover:bg-green-700 transition">Login</button>
          {message && <p className={`mt-4 text-${message.type === 'error' ? 'red' : 'green'}-400`}>{message.text}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-neutral-900">
      {/* Sidebar */}
      <aside className="w-64 bg-neutral-950 text-white flex flex-col py-8 px-4 border-r border-neutral-800 min-h-screen">
        <div className="mb-10 flex items-center gap-2 text-2xl font-bold tracking-tight">
          <span className="text-green-500">&#9679;</span> Azinag Admin
        </div>
        <nav className="flex flex-col gap-2 flex-1">
          <button onClick={() => setActiveTab('dashboard')} className={`flex items-center gap-2 px-4 py-2 rounded transition ${activeTab === 'dashboard' ? 'bg-neutral-800 text-green-400' : 'hover:bg-neutral-800'}`}><User size={18}/> Dashboard</button>
          <button onClick={() => { setActiveTab('add'); setEditingId(null); }} className={`flex items-center gap-2 px-4 py-2 rounded transition ${activeTab === 'add' ? 'bg-neutral-800 text-green-400' : 'hover:bg-neutral-800'}`}><PlusCircle size={18}/> Add App</button>
          <button onClick={() => { setActiveTab('all'); setEditingId(null); }} className={`flex items-center gap-2 px-4 py-2 rounded transition ${activeTab === 'all' ? 'bg-neutral-800 text-green-400' : 'hover:bg-neutral-800'}`}><List size={18}/> All Apps</button>
        </nav>
        <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 rounded bg-neutral-800 text-red-400 mt-8 hover:bg-neutral-700 transition"><LogOut size={18}/> Logout</button>
      </aside>
      {/* Main Content */}
      <main className="flex-1 min-h-screen flex flex-col">
        {/* Top Bar */}
        <header className="w-full flex items-center justify-end px-8 py-4 border-b border-neutral-800 bg-neutral-950">
          <div className="flex items-center gap-2 text-white">
            <User size={20} /> Admin
          </div>
        </header>
        <section className="flex-1 p-8 bg-neutral-900">
          {message && <div className={`mb-6 px-4 py-2 rounded text-center font-medium ${message.type === 'error' ? 'bg-red-900 text-red-300' : 'bg-green-900 text-green-300'}`}>{message.text}</div>}
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
                <h3 className="text-lg font-semibold text-white mb-4">Total Apps</h3>
                <div className="text-5xl font-bold text-green-400">{apps.length}</div>
              </div>
              <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
                <h3 className="text-lg font-semibold text-white mb-4">Featured Apps</h3>
                <div className="text-5xl font-bold text-green-400">{apps.filter(a => a.featured).length}</div>
              </div>
            </div>
          )}
          {activeTab === 'add' && (
            <form onSubmit={handleSubmit} className="bg-neutral-800 p-8 rounded-xl shadow-md w-full max-w-xl mx-auto border border-neutral-700 mt-8">
              <h3 className="text-xl font-semibold mb-6 text-white">Add New App</h3>
              <div className="mb-4">
                <label className="block mb-1 font-medium text-neutral-200">Title</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-neutral-700 rounded bg-neutral-900 text-white"
                  required
                  disabled={loading}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium text-neutral-200">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-neutral-700 rounded bg-neutral-900 text-white"
                  rows={3}
                  required
                  disabled={loading}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium text-neutral-200">Reference Link (optional)</label>
                <input
                  type="url"
                  name="link"
                  value={form.link}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-neutral-700 rounded bg-neutral-900 text-white"
                  placeholder="https://..."
                  disabled={loading}
                />
              </div>
              <div className="mb-6 flex items-center gap-2">
                <input
                  type="checkbox"
                  name="featured"
                  checked={form.featured}
                  onChange={handleChange}
                  id="featured"
                  disabled={loading}
                />
                <label htmlFor="featured" className="font-medium text-neutral-200">Featured</label>
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded font-semibold disabled:opacity-60 hover:bg-green-700 transition"
                disabled={loading}
              >
                {loading ? 'Adding...' : 'Add App'}
              </button>
            </form>
          )}
          {activeTab === 'all' && (
            <div className="max-w-2xl mx-auto mt-8">
              <h3 className="text-xl font-semibold mb-4 text-white">All Apps</h3>
              {fetching ? (
                <div className="text-center py-8">
                  <span className="inline-block w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></span>
                </div>
              ) : (
                <div className="space-y-6">
                  {apps.map((app) => (
                    <div key={app.id} className="bg-neutral-800 border border-neutral-700 rounded-lg p-4 flex flex-col gap-2">
                      {editingId === app.id ? (
                        <form onSubmit={handleEditSubmit} className="space-y-2">
                          <input
                            type="text"
                            name="title"
                            value={editForm.title}
                            onChange={handleEditChange}
                            className="w-full px-3 py-2 border border-neutral-700 rounded bg-neutral-900 text-white"
                            required
                            disabled={loading}
                          />
                          <textarea
                            name="description"
                            value={editForm.description}
                            onChange={handleEditChange}
                            className="w-full px-3 py-2 border border-neutral-700 rounded bg-neutral-900 text-white"
                            rows={2}
                            required
                            disabled={loading}
                          />
                          <input
                            type="url"
                            name="link"
                            value={editForm.link}
                            onChange={handleEditChange}
                            className="w-full px-3 py-2 border border-neutral-700 rounded bg-neutral-900 text-white"
                            placeholder="https://..."
                            disabled={loading}
                          />
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              name="featured"
                              checked={editForm.featured}
                              onChange={handleEditChange}
                              id={`featured-edit-${app.id}`}
                              disabled={loading}
                            />
                            <label htmlFor={`featured-edit-${app.id}`} className="font-medium text-neutral-200">Featured</label>
                          </div>
                          <div className="flex gap-2 mt-2">
                            <button type="submit" className="bg-green-600 text-white px-4 py-1 rounded font-semibold hover:bg-green-700 transition" disabled={loading}>Save</button>
                            <button type="button" onClick={() => { setEditingId(null); setEditForm({}); }} className="bg-neutral-700 text-white px-4 py-1 rounded font-semibold" disabled={loading}>Cancel</button>
                          </div>
                        </form>
                      ) : (
                        <>
                          <div className="flex flex-wrap gap-2 items-center">
                            <span className="font-bold text-lg text-white">{app.title}</span>
                            {app.featured && <span className="bg-green-900 text-green-300 px-2 py-1 rounded text-xs font-medium">Featured</span>}
                          </div>
                          <div className="text-neutral-300 text-sm">{app.description}</div>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {app.link && <a href={app.link} target="_blank" rel="noopener noreferrer" className="text-green-400 underline">Link</a>}
                          </div>
                          <div className="flex gap-2 mt-2">
                            <button onClick={() => handleEdit(app)} className="bg-blue-900 text-blue-300 px-3 py-1 rounded text-xs font-semibold hover:bg-blue-800 transition">Edit</button>
                            <button onClick={() => handleDelete(app.id)} className="bg-red-900 text-red-300 px-3 py-1 rounded text-xs font-semibold hover:bg-red-800 transition">Delete</button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
} 