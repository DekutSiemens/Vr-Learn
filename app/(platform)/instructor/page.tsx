const stats = [
    { label: "Assigned Apps", value: 3 },
    { label: "Total Modules", value: 12 },
    { label: "Total Lessons", value: 48 },
    { label: "Draft Lessons", value: 7 },
    { label: "Published Lessons", value: 41 },
  ];
  
  const assignedApps = [
    { id: "1", title: "SMSCP SkillDrive", modules: 6, lessons: 24, status: "Active" },
    { id: "2", title: "Wet Lab VR", modules: 4, lessons: 16, status: "Active" },
  ];
  
  const recentLessons = [
    {
      title: "pH Meter Setup",
      module: "pH Test Module",
      app: "Wet Lab VR",
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
      <div className="space-y-8 p-6">
        <header className="flex flex-col gap-4 rounded-2xl border bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Instructor Dashboard</h1>
            <p className="text-sm text-slate-600">Manage learning content, lessons, and resources</p>
          </div>
          <div className="flex w-full max-w-md items-center gap-3 md:w-auto">
            <input
              type="text"
              placeholder="Search apps or lessons..."
              className="w-full rounded-xl border px-4 py-2 text-sm outline-none"
            />
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 font-semibold text-slate-700">
              I
            </div>
          </div>
        </header>
  
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">{stat.label}</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">{stat.value}</h2>
            </div>
          ))}
        </section>
        <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Quick Actions</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <a href="/instructor/modules/new" className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white">
            Create Module
          </a>
          <a href="/instructor/lessons/lesson-1/edit" className="rounded-xl border px-4 py-2 text-sm font-medium text-slate-700">
            Add Lesson
          </a>
          <a href="/instructor/resources" className="rounded-xl border px-4 py-2 text-sm font-medium text-slate-700">
            Upload Resource
          </a>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-900">Assigned Apps</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {assignedApps.map((app) => (
            <div key={app.id} className="rounded-2xl border bg-white p-5 shadow-sm">
              <div className="mb-4 h-40 rounded-2xl bg-slate-200" />
              <h3 className="text-lg font-semibold text-slate-900">{app.title}</h3>
              <p className="mt-2 text-sm text-slate-500">{app.modules} modules • {app.lessons} lessons</p>
              <span className="mt-3 inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                {app.status}
              </span>
              <a href={`/instructor/apps/${app.id}`} className="mt-4 inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white">
                Manage App
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold text-slate-900">Recent Lessons</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b text-slate-500">
              <tr>
              <th className="py-3 pr-4">Lesson</th>
                <th className="py-3 pr-4">Module</th>
                <th className="py-3 pr-4">App</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3 pr-4">Last Updated</th>
                <th className="py-3 pr-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {recentLessons.map((lesson) => (
                <tr key={lesson.title} className="border-b last:border-b-0">
                  <td className="py-3 pr-4 font-medium text-slate-900">{lesson.title}</td>
                  <td className="py-3 pr-4 text-slate-600">{lesson.module}</td>
                  <td className="py-3 pr-4 text-slate-600">{lesson.app}</td>
                  <td className="py-3 pr-4 text-slate-600">{lesson.status}</td>
                  <td className="py-3 pr-4 text-slate-600">{lesson.updated}</td>
                  <td className="py-3 pr-4">
                    <a href="/instructor/lessons/lesson-1/edit" className="text-blue-600 font-medium">Edit</a>
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