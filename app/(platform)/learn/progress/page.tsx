const appProgress = [
    {
      title: "SMSCP SkillDrive",
      modules: "5 / 6",
      lessons: "18 / 24",
      progress: 72,
      slug: "smscp-skilldrive",
    },
    {
      title: "Wet Lab VR",
      modules: "2 / 4",
      lessons: "6 / 16",
      progress: 38,
      slug: "wet-lab-vr",
    },
  ];
  
  const completions = [
    { lesson: "Sensor Basics", date: "Apr 20, 2026", context: "SMSCP SkillDrive / Module 1" },
    { lesson: "Safety Introduction", date: "Apr 18, 2026", context: "Wet Lab VR / Module 1" },
  ];
  
  export default function LearnProgressPage() {
    return (
        <div className="space-y-6 p-6">
        <header>
          <h1 className="text-2xl font-bold text-slate-900">My Progress</h1>
          <p className="mt-1 text-sm text-slate-600">Track your learning journey</p>
        </header>
  
        <section className="grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Apps Enrolled</p>
            <h2 className="mt-2 text-3xl font-bold">4</h2>
          </div>
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Lessons Completed</p>
            <h2 className="mt-2 text-3xl font-bold">18</h2>
          </div>
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Modules Completed</p>
            <h2 className="mt-2 text-3xl font-bold">7</h2>
          </div>
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Overall Completion</p>
            <h2 className="mt-2 text-3xl font-bold">62%</h2>
          </div>
        </section>
  
        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Progress by App</h2>
          <div className="mt-4 space-y-4">
            {appProgress.map((app) => (
              <div key={app.slug} className="rounded-2xl border p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900">{app.title}</h3>
                    <p className="mt-1 text-sm text-slate-500">Modules: {app.modules} • Lessons: {app.lessons}</p>
                  </div>
                  <a href={`/learn/apps/${app.slug}`} className="text-sm font-medium text-blue-600">
                    View App
                  </a>
                </div>
                <div className="mt-4 h-2 rounded-full bg-slate-200">
                  <div className="h-2 rounded-full bg-blue-600" style={{ width: `${app.progress}%` }} />
                </div>
              </div>
            ))}
            </div>
      </section>

      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Recent Completions</h2>
        <div className="mt-4 space-y-3">
          {completions.map((item) => (
            <div key={item.lesson} className="rounded-xl border p-4">
              <p className="font-medium text-slate-900">{item.lesson}</p>
              <p className="mt-1 text-sm text-slate-500">{item.context}</p>
              <p className="mt-1 text-sm text-slate-500">Completed on {item.date}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}