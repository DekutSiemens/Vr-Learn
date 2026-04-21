type PageProps = {
    params: Promise<{ lessonSlug: string }>;
  };
  
  const lessonList = [
    "Introduction to the pH Meter",
    "Prepare the Buffer Solution",
    "Calibrate the Meter",
    "Run the Sample Test",
  ];
  
  const resources = [
    { name: "Calibration Guide.pdf", type: "PDF" },
    { name: "Lab Worksheet.docx", type: "DOCX" },
  ];
  
  export default async function LessonPage({ params }: PageProps) {
    const { lessonSlug } = await params;

    return (
        <div className="space-y-6 p-6">
          <div className="text-sm text-slate-500">
            <a href="/learn" className="hover:underline">Learn</a> /{" "}
            <a href="/learn/apps/wet-lab-vr" className="hover:underline">Wet Lab VR</a> / Lesson
          </div>
    
          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 capitalize">
                  {lessonSlug.replace(/-/g, " ")}
                </h1>
                <p className="mt-2 text-sm text-slate-600">Module: pH Test Module • Estimated time: 10 min</p>
              </div>
              <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-700">
                In Progress
              </span>
            </div>
          </section>
    
          <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)_280px]">
            <aside className="rounded-2xl border bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Module Lessons</h2>
              <div className="mt-4 space-y-3">
                {lessonList.map((lesson) => {
                  const slug = lesson.toLowerCase().replace(/\s+/g, "-");
                  const active = slug === lessonSlug;
                  return (
                    <a
                      key={lesson}
                      href={`/learn/lessons/${slug}`}
                      className={`block rounded-xl border px-4 py-3 text-sm ${
                        active ? "border-slate-900 bg-slate-900 text-white" : "text-slate-700"
                      }`}
                    >
                      {lesson}
                    </a>
                  );
                })}
              </div>
            </aside>

            <main className="space-y-6">
          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Lesson Video</h2>
            <div className="mt-4 aspect-video rounded-2xl bg-slate-200" />
            <p className="mt-3 text-sm text-slate-600">
              Watch the guided lesson video before reading the notes below.
            </p>
          </section>

          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Notes / Documentation</h2>
            <div className="prose prose-slate mt-4 max-w-none">
              <h3>Lesson Introduction</h3>
              <p>
                This lesson helps the learner understand the correct workflow for preparing the pH meter and
                ensuring accurate readings in the wet lab.
              </p>
              <h3>Steps</h3>
              <ol>
                <li>Inspect the pH meter and probe condition.</li>
                <li>Prepare the calibration solution.</li>
                <li>Rinse the probe before calibration.</li>
                <li>Record the value shown after stabilization.</li>
              </ol>
              <p>
                Instructor notes entered through the editor can render here using Tiptap content later.
              </p>
            </div>
          </section>
          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Attached Resources</h2>
            <div className="mt-4 space-y-3">
              {resources.map((resource) => (
                <div key={resource.name} className="flex items-center justify-between rounded-xl border p-4">
                  <div>
                    <p className="font-medium text-slate-900">{resource.name}</p>
                    <p className="text-sm text-slate-500">{resource.type}</p>
                  </div>
                  <button className="text-sm font-medium text-blue-600">Open</button>
                </div>
              ))}
            </div>
          </section>
        </main>

        <aside className="space-y-4">
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Lesson Progress</h2>
            <div className="mt-4 h-2 rounded-full bg-slate-200">
              <div className="h-2 w-[60%] rounded-full bg-blue-600" />
            </div>
            <p className="mt-2 text-sm text-slate-500">60% completed</p>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Quick Actions</h2>
            <div className="mt-4 flex flex-col gap-3">
              <button className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white">
                Mark as Complete
              </button>
              <button className="rounded-xl border px-4 py-2 text-sm font-medium text-slate-700">
                Previous Lesson
              </button>
              <button className="rounded-xl border px-4 py-2 text-sm font-medium text-slate-700">
                Next Lesson
              </button>
            </div>
          </div>
          </aside>
      </div>
    </div>
  );
}