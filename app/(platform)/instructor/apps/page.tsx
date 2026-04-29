import Link from "next/link";
import "@/styles/instructorApps.css";

const apps = [
  {
    id: "1",
    title: "SMSCP SkillDrive",
    description: "Industrial learning modules for immersive training.",
    modules: 6,
    lessons: 24,
    status: "Active",
  },
  {
    id: "2",
    title: "Fluid Power system VR",
    description: "Vr lab simulations and guided lesson content.",
    modules: 4,
    lessons: 16,
    status: "Active",
  },
];

export default function InstructorAppsPage() {
  return (
    <div className="instructor-apps-page">
      <header className="instructor-apps-header">
        <h1 className="instructor-apps-title">My Apps</h1>
        <p className="instructor-apps-subtitle">
          Manage your assigned learning apps
        </p>
      </header>

      <section className="instructor-apps-filters">
        <input
          placeholder="Search apps..."
          className="instructor-apps-input"
        />

        <select className="instructor-apps-select">
          <option>All Statuses</option>
          <option>Active</option>
          <option>Draft</option>
        </select>

        <select className="instructor-apps-select">
          <option>Recently Updated</option>
          <option>Alphabetical</option>
        </select>
      </section>

      <section className="instructor-apps-grid">
        {apps.map((app) => (
          <div key={app.id} className="instructor-apps-card">
            <div className="instructor-apps-card-image" />

            <div className="instructor-apps-card-body">
              <h2 className="instructor-apps-card-title">{app.title}</h2>

              <p className="instructor-apps-card-description">
                {app.description}
              </p>

              <p className="instructor-apps-card-meta">
                {app.modules} modules • {app.lessons} lessons
              </p>

              <span className="instructor-apps-status-badge">
                {app.status}
              </span>

              <Link
                href={`/instructor/apps/${app.id}`}
                className="instructor-apps-button"
              >
                Manage App
              </Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}