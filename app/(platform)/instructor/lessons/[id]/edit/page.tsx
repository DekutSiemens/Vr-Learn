import Link from "next/link";
import "@/styles/lesson.css";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditLessonPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className="lesson-page">
      <nav className="lesson-breadcrumbs" aria-label="Breadcrumb">
        <Link href="/instructor" className="lesson-breadcrumb-link">
          Instructor
        </Link>
        <span>/</span>
        <span>Edit lesson</span>
      </nav>

      <section className="lesson-header-card">
        <div className="lesson-header-layout">
          <div>
            <h1 className="lesson-title">Edit {id}</h1>
            <p className="lesson-subtitle">
              Update lesson details, media, documents, and publishing status.
            </p>
          </div>
          <span className="lesson-status-badge">Draft</span>
        </div>
      </section>

      <section className="lesson-card">
        <h2 className="card-title">Lesson editor</h2>
        <p className="card-text">
          Lesson editing controls can be connected here when the instructor
          workflow is ready.
        </p>
      </section>
    </div>
  );
}
