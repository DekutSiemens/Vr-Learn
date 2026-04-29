import Link from "next/link";
import "@/styles/instructorModule.css";
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
    <div className="instructor-module-page">
      <div className="instructor-module-breadcrumbs">
        <Link href="/instructor" className="instructor-module-breadcrumb-link">
          Instructor
        </Link>
        <span>/</span>
        <Link
          href={`/instructor/apps/${id}`}
          className="instructor-module-breadcrumb-link"
        >
          App
        </Link>
        <span>/</span>
        <span className="instructor-module-breadcrumb-current">Module</span>
      </div>

      <section className="instructor-module-hero">
        <div className="instructor-module-hero-layout">
          <div>
            <h1 className="instructor-module-title">Module {moduleId}</h1>

            <p className="instructor-module-subtitle">
              Manage the lessons inside this module.
            </p>

            <p className="instructor-module-meta">
              Lesson count: {lessons.length}
            </p>
          </div>

          <Link
            href="/instructor/lessons/lesson-1/edit"
            className="instructor-module-primary-btn"
          >
            Add Lesson
          </Link>
        </div>
      </section>

      <section className="instructor-module-table-card">
        <h2 className="instructor-module-section-title">Lessons</h2>

        <div className="instructor-module-table-wrapper">
          <table className="instructor-module-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Title</th>
                <th>Status</th>
                <th>Video</th>
                <th>Documents</th>
                <th>Last Updated</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {lessons.map((lesson) => (
                <tr key={lesson.order}>
                  <td>{lesson.order}</td>

                  <td className="instructor-module-table-strong">
                    {lesson.title}
                  </td>

                  <td>
                    <span
                      className={
                        lesson.status === "Published"
                          ? "instructor-module-status instructor-module-status-published"
                          : "instructor-module-status instructor-module-status-draft"
                      }
                    >
                      {lesson.status}
                    </span>
                  </td>

                  <td>{lesson.video ? "Yes" : "No"}</td>

                  <td>{lesson.documents ? "Yes" : "No"}</td>

                  <td>{lesson.updated}</td>

                  <td>
                    <div className="instructor-module-actions">
                      <Link
                        href={`/instructor/lessons/${lesson.id}/edit`}
                        className="instructor-module-action-link instructor-module-action-edit"
                      >
                        Edit
                      </Link>

                      <button
                        type="button"
                        className="instructor-module-action-link instructor-module-action-secondary"
                      >
                        {lesson.status === "Published"
                          ? "Unpublish"
                          : "Publish"}
                      </button>

                      <button
                        type="button"
                        className="instructor-module-action-link instructor-module-action-delete"
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