type PageProps = {
    params: Promise<{ id: string }>;
  };
  
  const modules = [
    {
      id: "m1",
      title: "Introduction to Wet Lab",
      description: "Foundation concepts and lab workflow.",
      lessons: 4,
      order: 1,
      status: "Published",
    },
    {
      id: "m2",
      title: "pH Test Module",
      description: "Guided content for pH testing procedure.",
      lessons: 5,
      order: 2,
      status: "Draft",
    },
  ];
  
  export default async function InstructorSingleAppPage({ params }: PageProps) {
    const { id } = await params;
  
    return (
      <div className="space-y-6 p-6">
        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">App Management #{id}</h1>
              <p className="mt-2 text-sm text-slate-600">Manage modules, lessons, and content structure for this learning app.</p>
            </div>
            <div className="flex gap-3">
              <a href="/instructor/modules/new" className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white">
                Add Module
              </a>
              <button className="rounded-xl border px-4 py-2 text-sm font-medium text-slate-700">
              Edit App
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">Modules</p><h2 className="mt-2 text-3xl font-bold">4</h2></div>
        <div className="rounded-2xl border bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">Lessons</p><h2 className="mt-2 text-3xl font-bold">16</h2></div>
        <div className="rounded-2xl border bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">Published</p><h2 className="mt-2 text-3xl font-bold">12</h2></div>
        <div className="rounded-2xl border bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">Drafts</p><h2 className="mt-2 text-3xl font-bold">4</h2></div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-900">Modules</h2>
        {modules.map((module) => (
          <div key={module.id} className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm text-slate-500">Order {module.order}</p>
                <h3 className="text-lg font-semibold text-slate-900">{module.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{module.description}</p>
                <p className="mt-2 text-sm text-slate-500">{module.lessons} lessons</p>
                <span className="mt-3 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                  {module.status}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <a href={`/instructor/apps/${id}/modules/${module.id}`} className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white">
                  Open Module
                </a>
                <button className="rounded-xl border px-4 py-2 text-sm font-medium text-slate-700">Edit</button>
                <button className="rounded-xl border border-red-200 px-4 py-2 text-sm font-medium text-red-600">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}