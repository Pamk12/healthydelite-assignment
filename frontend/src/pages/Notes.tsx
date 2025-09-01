import { useEffect, useState } from "react";
import axios from "axios";
import "./Notes.css";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:5000";

/* ===== Types ===== */
interface User {
  name: string;
  email: string;
}

interface Note {
  _id: string;
  content: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNoteContent, setNewNoteContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string>("");

  const client = axios.create({
    baseURL: API_BASE,
    headers: { "Content-Type": "application/json" },
  });

  useEffect(() => {
    // 🔑 Get saved name from localStorage
    const savedName = localStorage.getItem("name");

    if (!savedName) {
      navigate("/signin");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await client.get<User>(`/api/auth/user/${savedName}`);
        if (!res.data) {
          navigate("/signin");
          return;
        }
        setUser(res.data);
      } catch (e) {
        console.error(e);
        navigate("/signin");
      }
    };

    const fetchNotes = async () => {
      try {
        const res = await client.get<Note[]>("/api/notes");
        setNotes(res.data);
      } catch (e) {
        console.error(e);
        setErr("Failed to load notes. Please refresh.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser().then(fetchNotes);
  }, [navigate]);

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteContent.trim()) return;
    setErr("");
    try {
      const res = await client.post<Note>("/api/notes", {
        content: newNoteContent,
      });
      setNotes((prev) => [res.data, ...prev]);
      setNewNoteContent("");
    } catch (e) {
      console.error(e);
      setErr("Could not create note.");
    }
  };

  const handleDeleteNote = async (id: string) => {
    setErr("");
    try {
      await client.delete(`/api/notes/${id}`);
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (e) {
      console.error(e);
      setErr("Could not delete note.");
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("name");
    navigate("/signin");
  };

  if (loading && !user) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner" aria-hidden="true"></div>
        <span>Loading…</span>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="left-panel">
        <header className="topbar">
          <div className="brand">
            <div className="brand-spinner" aria-hidden="true"></div>
            <h1>Dashboard</h1>
          </div>
          <button className="link-btn" onClick={handleSignOut}>
            Sign Out
          </button>
        </header>

        {err && <div className="alert">{err}</div>}

        {user && (
          <section className="card user-card">
            <h2 className="card-title">Welcome, {user.name}!</h2>
            <p className="muted">Email: {user.email}</p>
          </section>
        )}

        <form className="create-note-form" onSubmit={handleCreateNote}>
          <textarea
            value={newNoteContent}
            onChange={(e) => setNewNoteContent(e.target.value)}
            placeholder="Create a new note..."
            rows={3}
          />
          <button type="submit" className="primary-btn">
            Add Note
          </button>
        </form>

        <section className="notes-wrap">
          <h3 className="section-title">Notes</h3>
          {notes.length === 0 && !loading ? (
            <p className="muted">No notes yet. Create one above!</p>
          ) : (
            <div className="notes-list">
              {notes.map((note) => (
                <div key={note._id} className="note-item">
                  <span className="note-text">{note.content}</span>
                  <button
                    className="icon-btn"
                    aria-label="Delete note"
                    title="Delete"
                    onClick={() => handleDeleteNote(note._id)}
                  >
                    🗑
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <div className="right-panel">
        <div className="image-overlay" />
      </div>
    </div>
  );
}
