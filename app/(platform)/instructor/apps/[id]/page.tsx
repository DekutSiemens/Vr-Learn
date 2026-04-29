import Link from "next/link";
import "@/styles/instructorSingleApp.css";

type PageProps = {
  params: Promise<{ id: string }>;
};

const modules = [
  {
    id: "m1",
    title: "Introduction to Fluid Power System Lab",
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
    <div className="instructor-single-app-page">
      <section className="instructor-single-app-hero">
        <div className="instructor-single-app-hero-layout">
          <div>
            <h1 className="instructor-single-app-title">
              App Management #{id}
            </h1>

            <p className="instructor-single-app-subtitle">
              Manage modules, lessons, and content structure for this learning
              app.
            </p>
          </div>

          <div className="instructor-single-app-actions">
            <Link
              href="/instructor/modules/new"
              className="instructor-single-app-primary-btn"
            >
              Add Module
            </Link>

            <button className="instructor-single-app-secondary-btn">
              Edit App
            </button>
          </div>
        </div>
      </section>

      <section className="instructor-single-app-stats-grid">
        <div className="instructor-single-app-stat-card">
          <p className="instructor-single-app-stat-label">Modules</p>
          <h2 className="instructor-single-app-stat-value">4</h2>
        </div>

        <div className="instructor-single-app-stat-card">
          <p className="instructor-single-app-stat-label">Lessons</p>
          <h2 className="instructor-single-app-stat-value">16</h2>
        </div>

        <div className="instructor-single-app-stat-card">
          <p className="instructor-single-app-stat-label">Published</p>
          <h2 className="instructor-single-app-stat-value">12</h2>
        </div>

        <div className="instructor-single-app-stat-card">
          <p className="instructor-single-app-stat-label">Drafts</p>
          <h2 className="instructor-single-app-stat-value">4</h2>
        </div>
      </section>

      <section className="instructor-single-app-section">
        <h2 className="instructor-single-app-section-title">Modules</h2>

        <div className="instructor-single-app-modules-list">
          {modules.map((module) => (
            <div
              key={module.id}
              className="instructor-single-app-module-card"
            >
              <div className="instructor-single-app-module-layout">
                <div>
                  <p className="instructor-single-app-module-order">
                    Order {module.order}
                  </p>

                  <h3 className="instructor-single-app-module-title">
                    {module.title}
                  </h3>

                  <p className="instructor-single-app-module-description">
                    {module.description}
                  </p>

                  <p className="instructor-single-app-module-lessons">
                    {module.lessons} lessons
                  </p>

                  <span className="instructor-single-app-module-status">
                    {module.status}
                  </span>
                </div>

                <div className="instructor-single-app-module-actions">
                  <Link
                    href={`/instructor/apps/${id}/modules/${module.id}`}
                    className="instructor-single-app-primary-btn"
                  >
                    Open Module
                  </Link>

                  <button className="instructor-single-app-secondary-btn">
                    Edit
                  </button>

                  <button className="instructor-single-app-danger-btn">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}