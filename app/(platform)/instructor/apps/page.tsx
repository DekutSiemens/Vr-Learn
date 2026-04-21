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
      title: "Wet Lab VR",
      description: "Wet lab simulations and guided lesson content.",
      modules: 4,
      lessons: 16,
      status: "Active",
    },
  ];
  
  export default function InstructorAppsPage() {
    return (
      <div className="space-y-6 p-6">
        <header>
          <h1 className="text-2xl font-bold text-slate-900">My Apps</h1>
          <p className="mt-1 text-sm text-slate-600">Manage your assigned learning apps</p>
        </header>
        <section className="grid gap-3 rounded-2xl border bg-white p-4 shadow-sm md:grid-cols-3">
        <input placeholder="Search apps..." className="rounded-xl border px-4 py-2 text-sm outline-none" />
        <select className="rounded-xl border px-4 py-2 text-sm outline-none">
          <option>All Statuses</option>
          <option>Active</option>
          <option>Draft</option>
        </select>
        <select className="rounded-xl border px-4 py-2 text-sm outline-none">
          <option>Recently Updated</option>
          <option>Alphabetical</option>
        </select>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {apps.map((app) => (
          <div key={app.id} className="overflow-hidden rounded-2xl border bg-white shadow-sm">
            <div className="h-44 bg-slate-200" />
            <div className="p-5">
              <h2 className="text-lg font-semibold text-slate-900">{app.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{app.description}</p>
              <p className="mt-4 text-sm text-slate-500">{app.modules} modules • {app.lessons} lessons</p>
              <span className="mt-3 inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                {app.status}
              </span>
              <a href={`/instructor/apps/${app.id}`} className="mt-4 inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white">
                Manage App
              </a>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}