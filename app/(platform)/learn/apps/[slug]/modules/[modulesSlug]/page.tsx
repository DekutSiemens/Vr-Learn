type PageProps = {
    params: Promise<{ slug: string; moduleSlug: string }>;
  };
  
  const lessons = [
    {
      order: 1,
      title: "Introduction to the pH Meter",
      description: "Understand the parts and role of the pH meter.",
      type: "video",
      duration: "6 min",
      status: "Completed",
    },
    {
      order: 2,
      title: "Prepare the Buffer Solution",
      description: "Set up the right solution for calibration.",
      type: "document",
      duration: "8 min",
      status: "In Progress",
    },
    {
      order: 3,
      title: "Calibrate the Meter",
      description: "Perform accurate calibration step by step.",
      type: "note",
      duration: "10 min",
      status: "Not Started",
    },
  ];
  
  export default async function LearningModulePage({ params }: PageProps) {
    const { slug, moduleSlug } = await params;
    return (
        <div className="space-y-6 p-6">
          <div className="text-sm text-slate-500">
            <a href="/learn" className="hover:underline">Learn</a> /{" "}
            <a href={`/learn/apps/${slug}`} className="hover:underline">App</a> / Module
          </div>
    
          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <h1 className="text-2xl font-bold text-slate-900 capitalize">{moduleSlug.replace(/-/g, " ")}</h1>
            <p className="mt-2 text-sm text-slate-600">
              Module description goes here. This module guides the learner through practical steps and lesson flow.
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500">
              <span>Total lessons: 8</span>
              <span>Completion: 3/8</span>
            </div>
          </section>
    
          <section className="rounded-2xl border bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>3 of 8 lessons completed</span>
              <span>38%</span>
            </div>
            <div className="mt-3 h-2 rounded-full bg-slate-200">
              <div className="h-2 w-[38%] rounded-full bg-blue-600" />
            </div>
          </section>
    
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900">Lessons</h2>
            {lessons.map((lesson) => (
              <div key={lesson.order} className="rounded-2xl border bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Lesson {lesson.order}</p>
                    <h3 className="text-lg font-semibold text-slate-900">{lesson.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{lesson.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
                      <span className="rounded-full bg-slate-100 px-3 py-1">{lesson.type}</span>
                      <span className="rounded-full bg-slate-100 px-3 py-1">{lesson.duration}</span>
                      <span className="rounded-full bg-slate-100 px-3 py-1">{lesson.status}</span>
                    </div>
                  </div>
                  <a
                    href={`/learn/lessons/${lesson.title.toLowerCase().replace(/\s+/g, "-")}`}
                    className="inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white"
                  >
                    {lesson.status === "Completed"
                      ? "Review"
                      : lesson.status === "In Progress"
                      ? "Continue"
                      : "Start"}
                  </a>
                </div>
              </div>
            ))}
          </section>
        </div>
      );
    }