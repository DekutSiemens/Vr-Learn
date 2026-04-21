import Link from "next/link";
// import StatusBadge from "@/components/ui/StatusBadge";

type PageProps = {
  params: Promise<{ id: string; moduleId: string }>;
};

const lessons = [
  {
    order: 1,
    id: "lesson-1",
    title: "Introduction to the pH Meter",
    status: "Published",
    video: true,
    documents: true,
    updated: "Today",
  },
  {
    order: 2,
    id: "lesson-2",
    title: "Prepare the Buffer Solution",
    status: "Draft",
    video: false,
    documents: true,
    updated: "Yesterday",
  },
];

export default async function InstructorModulePage({ params }: PageProps) {
  const { id, moduleId } = await params;

  return (
    <div className="space-y-6 p-6">
      <div className="text-sm text-slate-500">
        <Link href="/instructor" className="hover:underline">
          Instructor
        </Link>{" "}
        /{" "}
        <Link href={`/instructor/apps/${id}`} className="hover:underline">
          App
        </Link>{" "}
        /{" "}
        <span className="text-slate-700">Module</span>
      </div>

      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Module {moduleId}
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Manage the lessons inside this module.
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Lesson count: {lessons.length}
            </p>
          </div>

          <Link
            href="/instructor/lessons/lesson-1/edit"
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white"
          >
            Add Lesson
          </Link>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold text-slate-900">Lessons</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b text-slate-500">
              <tr>
                <th className="py-3 pr-4">Order</th>
                <th className="py-3 pr-4">Title</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3 pr-4">Video</th>
                <th className="py-3 pr-4">Documents</th>
                <th className="py-3 pr-4">Last Updated</th>
                <th className="py-3 pr-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {lessons.map((lesson) => (
                <tr key={lesson.order} className="border-b last:border-b-0">
                  <td className="py-3 pr-4">{lesson.order}</td>

                  <td className="py-3 pr-4 font-medium text-slate-900">
                    {lesson.title}
                  </td>

                  {/* <td className="py-3 pr-4">
                    <StatusBadge
                      label={lesson.status}
                      tone={lesson.status === "Published" ? "success" : "warning"}
                    />
                  </td> */}

                  <td className="py-3 pr-4">
                    {lesson.video ? "Yes" : "No"}
                  </td>

                  <td className="py-3 pr-4">
                    {lesson.documents ? "Yes" : "No"}
                  </td>

                  <td className="py-3 pr-4">{lesson.updated}</td>

                  <td className="py-3 pr-4">
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={`/instructor/lessons/${lesson.id}/edit`}
                        className="font-medium text-blue-600 hover:underline"
                      >
                        Edit
                      </Link>

                      <button
                        type="button"
                        className="font-medium text-slate-700 hover:underline"
                      >
                        {lesson.status === "Published"
                          ? "Unpublish"
                          : "Publish"}
                      </button>

                      <button
                        type="button"
                        className="font-medium text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
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