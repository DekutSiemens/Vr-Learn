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
      slug: "wet-lab-vr",
      title: "Wet Lab VR",
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
      <div className="space-y-6 p-6">
        <header>
          <h1 className="text-2xl font-bold text-slate-900">Learning Apps</h1>
          <p className="mt-1 text-sm text-slate-600">Browse available VR learning modules</p>
        </header>
  
        <section className="grid gap-3 rounded-2xl border bg-white p-4 shadow-sm md:grid-cols-3">
          <input
            placeholder="Search apps..."
            className="rounded-xl border px-4 py-2 text-sm outline-none"
          />
          <select className="rounded-xl border px-4 py-2 text-sm outline-none">
            <option>All</option>
            <option>In Progress</option>
            <option>Completed</option>
            <option>Not Started</option>
          </select>
          <select className="rounded-xl border px-4 py-2 text-sm outline-none">
            <option>Recently Opened</option>
            <option>Alphabetical</option>
            <option>Progress</option>
          </select>
        </section>
  
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {apps.map((app) => (
            <div key={app.slug} className="overflow-hidden rounded-2xl border bg-white shadow-sm">
              <div className="h-44 bg-slate-200" />
              <div className="p-5">
                <h2 className="text-lg font-semibold text-slate-900">{app.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{app.description}</p>
                <div className="mt-4 flex gap-4 text-sm text-slate-500">
                  <span>{app.modules} modules</span>
                  <span>{app.lessons} lessons</span>
                </div>
                <div className="mt-4 h-2 rounded-full bg-slate-200">
                  <div className="h-2 rounded-full bg-blue-600" style={{ width: `${app.progress}%` }} />
                </div>
                <p className="mt-2 text-sm text-slate-500">{app.progress}% progress</p>
                <a
                  href={`/learn/apps/${app.slug}`}
                  className="mt-4 inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white"
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