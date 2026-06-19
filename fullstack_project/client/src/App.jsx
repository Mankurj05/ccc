import { Briefcase, CheckCircle2, Pencil, Plus, Search, Trash2, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  createApplication,
  deleteApplication,
  getApplications,
  updateApplication
} from "./api.js";

const emptyForm = {
  company: "",
  role: "",
  status: "Applied",
  packageLpa: "",
  appliedDate: new Date().toISOString().slice(0, 10),
  notes: ""
};

const fallbackStatuses = [
  "Applied",
  "Online Assessment",
  "Interview",
  "Offer",
  "Rejected",
  "On Hold"
];

function formatDate(value) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(value));
}

function App() {
  const [applications, setApplications] = useState([]);
  const [statuses, setStatuses] = useState(fallbackStatuses);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const summary = useMemo(() => {
    return {
      total: applications.length,
      interviews: applications.filter((item) => item.status === "Interview").length,
      offers: applications.filter((item) => item.status === "Offer").length
    };
  }, [applications]);

  async function loadApplications() {
    try {
      setLoading(true);
      setError("");
      const data = await getApplications({ search, status: statusFilter });
      setApplications(data.applications || []);
      setStatuses(data.statuses || fallbackStatuses);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const handle = setTimeout(loadApplications, 250);
    return () => clearTimeout(handle);
  }, [search, statusFilter]);

  function updateForm(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function startEdit(application) {
    setEditingId(application._id);
    setForm({
      company: application.company,
      role: application.role,
      status: application.status,
      packageLpa: application.packageLpa || "",
      appliedDate: application.appliedDate?.slice(0, 10) || emptyForm.appliedDate,
      notes: application.notes || ""
    });
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const payload = {
      ...form,
      packageLpa: Number(form.packageLpa || 0)
    };

    try {
      setSaving(true);
      setError("");

      if (editingId) {
        await updateApplication(editingId, payload);
      } else {
        await createApplication(payload);
      }

      resetForm();
      await loadApplications();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function removeApplication(id) {
    const confirmed = window.confirm("Delete this application?");
    if (!confirmed) return;

    try {
      setError("");
      await deleteApplication(id);
      await loadApplications();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="app-shell">
      <section className="topbar">
        <div>
          <p className="eyebrow">Full Stack Placement Dashboard</p>
          <h1>Placement Tracker</h1>
        </div>
        <div className="brand-mark">
          <Briefcase size={28} />
        </div>
      </section>

      <section className="summary-grid" aria-label="Application summary">
        <article>
          <span>Total Applications</span>
          <strong>{summary.total}</strong>
        </article>
        <article>
          <span>Interviews</span>
          <strong>{summary.interviews}</strong>
        </article>
        <article>
          <span>Offers</span>
          <strong>{summary.offers}</strong>
        </article>
      </section>

      <section className="workspace">
        <form className="application-form" onSubmit={handleSubmit}>
          <div className="form-title">
            <h2>{editingId ? "Edit Application" : "Add Application"}</h2>
            {editingId && (
              <button type="button" className="icon-button" onClick={resetForm} aria-label="Cancel edit">
                <X size={18} />
              </button>
            )}
          </div>

          <label>
            Company
            <input name="company" value={form.company} onChange={updateForm} required />
          </label>

          <label>
            Role
            <input name="role" value={form.role} onChange={updateForm} required />
          </label>

          <div className="form-row">
            <label>
              Status
              <select name="status" value={form.status} onChange={updateForm}>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Package LPA
              <input
                name="packageLpa"
                type="number"
                min="0"
                step="0.1"
                value={form.packageLpa}
                onChange={updateForm}
              />
            </label>
          </div>

          <label>
            Applied Date
            <input name="appliedDate" type="date" value={form.appliedDate} onChange={updateForm} />
          </label>

          <label>
            Notes
            <textarea name="notes" rows="4" value={form.notes} onChange={updateForm} />
          </label>

          <button className="primary-button" type="submit" disabled={saving}>
            {editingId ? <CheckCircle2 size={18} /> : <Plus size={18} />}
            {saving ? "Saving..." : editingId ? "Update" : "Add"}
          </button>
        </form>

        <section className="list-panel">
          <div className="filters">
            <label className="search-box">
              <Search size={18} />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search applications"
              />
            </label>

            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
              <option value="All">All Statuses</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {error && <div className="error-banner">{error}</div>}

          <div className="application-list">
            {loading ? (
              <p className="empty-state">Loading applications...</p>
            ) : applications.length === 0 ? (
              <p className="empty-state">No applications found.</p>
            ) : (
              applications.map((application) => (
                <article className="application-card" key={application._id}>
                  <div>
                    <div className="card-heading">
                      <h3>{application.company}</h3>
                      <span>{application.status}</span>
                    </div>
                    <p className="role">{application.role}</p>
                    <p className="meta">
                      {formatDate(application.appliedDate)} · {application.packageLpa || 0} LPA
                    </p>
                    {application.notes && <p className="notes">{application.notes}</p>}
                  </div>

                  <div className="card-actions">
                    <button type="button" className="icon-button" onClick={() => startEdit(application)} aria-label="Edit">
                      <Pencil size={17} />
                    </button>
                    <button
                      type="button"
                      className="icon-button danger"
                      onClick={() => removeApplication(application._id)}
                      aria-label="Delete"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </section>
    </main>
  );
}

export default App;
