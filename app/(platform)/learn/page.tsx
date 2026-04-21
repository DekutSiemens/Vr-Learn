'use client';

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
      slug: "wet-lab-vr",
      title: "Wet Lab VR",
      description: "Study practical wet lab procedures and experiments.",
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
      app: "Wet Lab VR",
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
    app: "Wet Lab VR",
    module: "pH Test Module",
    lesson: "pH Meter Setup",
    description: "Set up the pH meter and prepare the sample correctly.",
    progress: 45,
  };
  
  export default function LearnDashboardPage() {
    return (
        <div className="space-y-8 p-6">
          <header className="flex flex-col gap-4 rounded-2xl border bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Learning Dashboard</h1>
              <p className="text-sm text-slate-600">Welcome back, Learner</p>
            </div>
            <div className="flex w-full max-w-md items-center gap-3 md:w-auto">
              <input
                type="text"
                placeholder="Search lessons, apps, or modules..."
                className="w-full rounded-xl border px-4 py-2 text-sm outline-none ring-0"
              />
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 font-semibold text-slate-700">
                D
              </div>
            </div>
          </header>
    
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border bg-white p-5 shadow-sm">
                <p className="text-sm text-slate-500">{stat.label}</p>
                <h2 className="mt-2 text-3xl font-bold text-slate-900">{stat.value}</h2>
                {stat.label === "Overall Progress" && (
                  <div className="mt-4 h-2 rounded-full bg-slate-200">
                    <div className="h-2 w-[62%] rounded-full bg-slate-900" />
                  </div>
                )}
              </div>
            ))}
          </section>

          <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">Continue Learning</h2>
          <a href="/learn/apps/wet-lab-vr/modules/ph-test" className="text-sm font-medium text-blue-600">
            Resume Lesson
          </a>
        </div>

        <div className="grid gap-6 md:grid-cols-[160px_1fr]">
          <div className="h-40 rounded-2xl bg-slate-200" />
          <div>
            <p className="text-sm text-slate-500">{continueLearning.app}</p>
            <h3 className="mt-1 text-2xl font-bold text-slate-900">{continueLearning.lesson}</h3>
            <p className="mt-1 text-sm text-slate-600">Module: {continueLearning.module}</p>
            <p className="mt-3 text-sm text-slate-600">{continueLearning.description}</p>
            <div className="mt-4 h-2 rounded-full bg-slate-200">
              <div
                className="h-2 rounded-full bg-blue-600"
                style={{ width: `${continueLearning.progress}%` }}
              />
            </div>
            <p className="mt-2 text-sm text-slate-500">{continueLearning.progress}% complete</p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">My Learning Apps</h2>
          <a href="/learn/apps" className="text-sm font-medium text-blue-600">
            Browse all
          </a>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {learningApps.map((app) => (
            <div key={app.slug} className="rounded-2xl border bg-white p-5 shadow-sm">
              <div className="mb-4 h-40 rounded-2xl bg-slate-200" />
              <h3 className="text-lg font-semibold text-slate-900">{app.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{app.description}</p>
              <p className="mt-3 text-sm text-slate-500">{app.modules} modules</p>
              <div className="mt-4 h-2 rounded-full bg-slate-200">
                <div className="h-2 rounded-full bg-slate-900" style={{ width: `${app.progress}%` }} />
              </div>
              <p className="mt-2 text-sm text-slate-500">{app.progress}% progress</p>
              <a
                href={`/learn/apps/${app.slug}`}
                className="mt-4 inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white"
              >
                Open App
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold text-slate-900">Recent Activity</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b text-slate-500">
              <tr>
                <th className="py-3 pr-4">Lesson</th>
                <th className="py-3 pr-4">App</th>
                <th className="py-3 pr-4">Last Opened</th>
                <th className="py-3 pr-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.map((item) => (
                <tr key={`${item.lesson}-${item.app}`} className="border-b last:border-b-0">
                  <td className="py-3 pr-4 font-medium text-slate-900">{item.lesson}</td>
                  <td className="py-3 pr-4 text-slate-600">{item.app}</td>
                  <td className="py-3 pr-4 text-slate-600">{item.date}</td>
                  <td className="py-3 pr-4">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                      {item.status}
                    </span>
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
