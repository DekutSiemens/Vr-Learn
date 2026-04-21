type PageProps = {
    params: Promise<{ slug: string }>;
  };
  
  const modules = [
    {
      slug: "intro-to-ph-testing",
      number: 1,
      title: "Introduction to pH Testing",
      description: "Learn the purpose, safety, and tools used in pH measurement.",
      lessons: 4,
      progress: 100,
    },
    {
      slug: "ph-meter-setup",
      number: 2,
      title: "pH Meter Setup",
      description: "Set up and calibrate the pH meter before testing.",
      lessons: 5,
      progress: 45,
    },
    {
      slug: "sample-testing",
      number: 3,
      title: "Sample Testing",
      description: "Run the sample reading and interpret results accurately.",
      lessons: 3,
      progress: 0,
    },
  ];
  export default async function SingleLearningAppPage({ params }: PageProps) {
    const { slug } = await params;
  
    return (
      <div className="space-y-8 p-6">
        <section className="grid gap-6 rounded-2xl border bg-white p-6 shadow-sm lg:grid-cols-[280px_1fr]">
          <div className="h-56 rounded-2xl bg-slate-200" />
          <div>
            <p className="text-sm text-slate-500">App</p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900 capitalize">
              {slug.replace(/-/g, " ")}
            </h1>
            <p className="mt-3 text-sm text-slate-600">
              Guided VR learning experience with modules, lessons, videos, and instructor notes.
            </p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-600">
              <span className="rounded-full bg-slate-100 px-3 py-1">Intermediate</span>
              <span className="rounded-full bg-slate-100 px-3 py-1">3 hrs total</span>
              <span className="rounded-full bg-slate-100 px-3 py-1">45% progress</span>
            </div>
            <div className="mt-5 flex gap-3">
              <a href={`/learn/apps/${slug}/modules/ph-meter-setup`} className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white">
                Continue
              </a>
              <button className="rounded-xl border px-4 py-2 text-sm font-medium text-slate-700">
                Start Learning
              </button>
            </div>
          </div>
        </section>
  
        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">About this App</h2>
          <div className="mt-4 grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-slate-900">Learning Objectives</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
                <li>Understand the workflow of the VR training module</li>
                <li>Follow lessons in sequence</li>
                <li>Complete learning activities and track progress</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-slate-900">Prerequisites</h3>
              <p className="mt-2 text-sm text-slate-600">Basic familiarity with the lab or learning topic.</p>
            </div>
            <div>
              <h3 className="font-medium text-slate-900">Supported Devices</h3>
              <p className="mt-2 text-sm text-slate-600">Desktop, tablet, and VR headset companion learning flow.</p>
            </div>
          </div>
        </section>
        <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-900">Modules</h2>
        <div className="grid gap-4">
          {modules.map((module) => (
            <div key={module.slug} className="rounded-2xl border bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm text-slate-500">Module {module.number}</p>
                  <h3 className="text-lg font-semibold text-slate-900">{module.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{module.description}</p>
                  <p className="mt-2 text-sm text-slate-500">{module.lessons} lessons</p>
                </div>
                <div className="w-full max-w-xs">
                  <div className="h-2 rounded-full bg-slate-200">
                    <div className="h-2 rounded-full bg-blue-600" style={{ width: `${module.progress}%` }} />
                  </div>
                  <p className="mt-2 text-sm text-slate-500">{module.progress}% complete</p>
                  <a
                    href={`/learn/apps/${slug}/modules/${module.slug}`}
                    className="mt-3 inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white"
                  >
                    Open Module
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Resources</h2>
        <div className="mt-4 space-y-3 text-sm text-slate-600">
          <div className="flex items-center justify-between rounded-xl border p-4">
            <span>Wet Lab Safety Guide.pdf</span>
            <button className="font-medium text-blue-600">Open</button>
          </div>
          <div className="flex items-center justify-between rounded-xl border p-4">
            <span>Calibration Checklist.pdf</span>
            <button className="font-medium text-blue-600">Open</button>
          </div>
        </div>
      </section>
    </div>
  );
}