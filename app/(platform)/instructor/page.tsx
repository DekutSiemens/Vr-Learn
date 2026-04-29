import Link from "next/link";
import "@/styles/instructor.css";

const stats = [
  { label: "Assigned Apps", value: 3 },
  { label: "Total Modules", value: 12 },
  { label: "Total Lessons", value: 48 },
  { label: "Draft Lessons", value: 7 },
  { label: "Published Lessons", value: 41 },
];

const assignedApps = [
  { id: "1", title: "SMSCP SkillDrive", modules: 6, lessons: 24, status: "Active" },
  { id: "2", title: "VR Fluid Power System", modules: 4, lessons: 16, status: "Active" },
];

const recentLessons = [
  {
    title: "pH Meter Setup",
    module: "pH Test Module",
    app: "VR Fluid Power System",
    status: "Draft",
    updated: "Today",
  },
  {
    title: "Sensor Basics",
    module: "Sensors",
    app: "SMSCP SkillDrive",
    status: "Published",
    updated: "Yesterday",
  },
];

export default function InstructorDashboardPage() {
  return (
    <div className="instructor-dashboard-page">
      <header className="instructor-dashboard-header">
        <div>
          <h1 className="instructor-dashboard-title">Instructor Dashboard</h1>
          <p className="instructor-dashboard-subtitle">
            Manage learning content, lessons, and resources
          </p>
        </div>

        <div className="instructor-dashboard-header-actions">
          <input
            type="text"
            placeholder="Search apps or lessons..."
            className="instructor-dashboard-search"
          />
          <div className="instructor-dashboard-avatar">I</div>
        </div>
      </header>

      <section className="instructor-stats-grid">
        {stats.map((stat) => (
          <div key={stat.label} className="instructor-stat-card">
            <p className="instructor-stat-label">{stat.label}</p>
            <h2 className="instructor-stat-value">{stat.value}</h2>
          </div>
        ))}
      </section>

      <section className="instructor-card">
        <h2 className="instructor-section-title">Quick Actions</h2>

        <div className="instructor-quick-actions">
          <Link href="/instructor/modules/new" className="instructor-primary-btn">
            Create Module
          </Link>

          <Link
            href="/instructor/lessons/lesson-1/edit"
            className="instructor-secondary-btn"
          >
            Add Lesson
          </Link>

          <Link href="/instructor/resources" className="instructor-secondary-btn">
            Upload Resource
          </Link>
        </div>
      </section>

      <section className="instructor-section">
        <h2 className="instructor-section-title">Assigned Apps</h2>

        <div className="instructor-apps-grid">
          {assignedApps.map((app) => (
            <div key={app.id} className="instructor-app-card">
              <div className="instructor-app-image" />

              <h3 className="instructor-app-title">{app.title}</h3>

              <p className="instructor-app-meta">
                {app.modules} modules • {app.lessons} lessons
              </p>

              <span className="instructor-app-status">{app.status}</span>

              <Link
                href={`/instructor/apps/${app.id}`}
                className="instructor-primary-btn instructor-app-btn"
              >
                Manage App
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="instructor-card">
        <h2 className="instructor-section-title instructor-section-spacing">
          Recent Lessons
        </h2>

        <div className="instructor-table-wrapper">
          <table className="instructor-table">
            <thead>
              <tr>
                <th>Lesson</th>
                <th>Module</th>
                <th>App</th>
                <th>Status</th>
                <th>Last Updated</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {recentLessons.map((lesson) => (
                <tr key={lesson.title}>
                  <td className="instructor-table-strong">{lesson.title}</td>
                  <td>{lesson.module}</td>
                  <td>{lesson.app}</td>
                  <td>{lesson.status}</td>
                  <td>{lesson.updated}</td>
                  <td>
                    <Link
                      href="/instructor/lessons/lesson-1/edit"
                      className="instructor-table-link"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}