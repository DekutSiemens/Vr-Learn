"use client";

import "@/styles/learn.css";

const stats = [
  { label: "Enrolled Apps", value: 4 },
  { label: "Lessons Completed", value: 18 },
  { label: "In Progress", value: 3 },
  { label: "Overall Progress", value: "62%" },
];

const learningApps = [
  {
    slug: "smscp-skilldrive",
    title: "SMSCP SkillDrive",
    description: "Learn industrial automation concepts in VR.",
    progress: 72,
    modules: 6,
  },
  {
    slug: "fluid-power-vr",
    title: "VR Fluid Power System",
    description: "Study practical Fluid Power System procedures and experiments.",
    progress: 38,
    modules: 4,
  },
  {
    slug: "gear-systems",
    title: "Gear Systems VR",
    description: "Explore gear types, motion transfer, and application.",
    progress: 15,
    modules: 3,
  },
];

const recentActivity = [
  {
    lesson: "Sensor Basics",
    app: "SMSCP SkillDrive",
    date: "Today",
    status: "Completed",
  },
  {
    lesson: "pH Meter Setup",
    app: "VR Fluid Power System",
    date: "Yesterday",
    status: "In Progress",
  },
  {
    lesson: "Spur Gears",
    app: "Gear Systems VR",
    date: "2 days ago",
    status: "Completed",
  },
];

const continueLearning = {
  app: "VR Fluid Power System",
  module: "pH Test Module",
  lesson: "pH Meter Setup",
  description: "Set up the pH meter and prepare the sample correctly.",
  progress: 45,
};

export default function LearnDashboardPage() {
  return (
    <div className="learn-page">
      <header className="learn-header">
        <div>
          <h1 className="learn-title">Learning Dashboard</h1>
          <p className="learn-subtitle">Welcome back, Learner</p>
        </div>

        <div className="learn-header-actions">
          <input
            type="text"
            placeholder="Search lessons, apps, or modules..."
            className="learn-search"
          />
          <div className="learn-avatar">D</div>
        </div>
      </header>

      <section className="stats-grid">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card">
            <p className="stat-label">{stat.label}</p>
            <h2 className="stat-value">{stat.value}</h2>

            {stat.label === "Overall Progress" && (
              <div className="progress-track stat-progress-track">
                <div className="progress-fill dark-fill" style={{ width: "62%" }} />
              </div>
            )}
          </div>
        ))}
      </section>

      <section className="section-card">
        <div className="section-head">
          <h2 className="section-title">Continue Learning</h2>
          <a href="/learn/apps/fluid-power-vr/modules/ph-test" className="section-link">
            Resume Lesson
          </a>
        </div>

        <div className="continue-grid">
          <div className="continue-image" />

          <div>
            <p className="muted-text">{continueLearning.app}</p>
            <h3 className="continue-title">{continueLearning.lesson}</h3>
            <p className="small-text">Module: {continueLearning.module}</p>
            <p className="description-text">{continueLearning.description}</p>

            <div className="progress-track">
              <div
                className="progress-fill blue-fill"
                style={{ width: `${continueLearning.progress}%` }}
              />
            </div>

            <p className="small-text">{continueLearning.progress}% complete</p>
          </div>
        </div>
      </section>

      <section className="learn-section">
        <div className="section-head">
          <h2 className="section-title">My Learning Apps</h2>
          <a href="/learn/apps" className="section-link">
            Browse all
          </a>
        </div>

        <div className="apps-grid">
          {learningApps.map((app) => (
            <div key={app.slug} className="app-card">
              <div className="app-image" />
              <h3 className="app-title">{app.title}</h3>
              <p className="app-description">{app.description}</p>
              <p className="small-text">{app.modules} modules</p>

              <div className="progress-track">
                <div
                  className="progress-fill dark-fill"
                  style={{ width: `${app.progress}%` }}
                />
              </div>

              <p className="small-text">{app.progress}% progress</p>

              <a href={`/learn/apps/${app.slug}`} className="open-app-btn">
                Open App
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="section-card">
        <h2 className="section-title section-title-spacing">Recent Activity</h2>

        <div className="table-wrapper">
          <table className="activity-table">
            <thead>
              <tr>
                <th>Lesson</th>
                <th>App</th>
                <th>Last Opened</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {recentActivity.map((item) => (
                <tr key={`${item.lesson}-${item.app}`}>
                  <td className="strong-text">{item.lesson}</td>
                  <td>{item.app}</td>
                  <td>{item.date}</td>
                  <td>
                    <span className="status-badge">{item.status}</span>
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