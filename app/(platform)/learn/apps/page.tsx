import "@/styles/learningApps.css";

const apps = [
  {
    slug: "smscp-skilldrive",
    title: "SMSCP SkillDrive",
    description: "Explore industrial training modules in immersive VR.",
    modules: 6,
    lessons: 24,
    progress: 72,
  },
  {
    slug: "fluid-power-vr",
    title: "VR Fluid Power System",
    description: "Perform guided lab experiments with step-by-step lessons.",
    modules: 4,
    lessons: 16,
    progress: 38,
  },
  {
    slug: "gear-systems",
    title: "Gear Systems VR",
    description: "Understand gears, transmission, and applications in machines.",
    modules: 3,
    lessons: 12,
    progress: 15,
  },
];

export default function LearningAppsPage() {
  return (
    <div className="learning-apps-page">
      <header className="learning-apps-header">
        <h1 className="learning-apps-title">Learning Apps</h1>
        <p className="learning-apps-subtitle">
          Browse available VR learning modules
        </p>
      </header>

      <section className="learning-apps-filters">
        <input
          placeholder="Search apps..."
          className="learning-apps-input"
        />

        <select className="learning-apps-select">
          <option>All</option>
          <option>In Progress</option>
          <option>Completed</option>
          <option>Not Started</option>
        </select>

        <select className="learning-apps-select">
          <option>Recently Opened</option>
          <option>Alphabetical</option>
          <option>Progress</option>
        </select>
      </section>

      <section className="learning-apps-grid">
        {apps.map((app) => (
          <div key={app.slug} className="learning-app-card">
            <div className="learning-app-card-image" />

            <div className="learning-app-card-body">
              <h2 className="learning-app-card-title">{app.title}</h2>
              <p className="learning-app-card-description">{app.description}</p>

              <div className="learning-app-meta">
                <span>{app.modules} modules</span>
                <span>{app.lessons} lessons</span>
              </div>

              <div className="learning-app-progress-track">
                <div
                  className="learning-app-progress-fill"
                  style={{ width: `${app.progress}%` }}
                />
              </div>

              <p className="learning-app-progress-text">
                {app.progress}% progress
              </p>

              <a
                href={`/learn/apps/${app.slug}`}
                className="learning-app-button"
              >
                View Modules
              </a>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}