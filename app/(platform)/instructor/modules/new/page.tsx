import Link from "next/link";
import "@/styles/instructor.css";

export default function NewModulePage() {
  return (
    <div className="instructor-dashboard-page">
      <div className="instructor-dashboard-header">
        <div>
          <h1 className="instructor-dashboard-title">Create Module</h1>
          <p className="instructor-dashboard-subtitle">
            Add a new module to organize lessons inside an assigned VR app.
          </p>
        </div>
      </div>

      <section className="instructor-card">
        <h2 className="instructor-section-title">Module details</h2>
        <p className="card-text">
          Module creation controls can be connected here when the instructor
          authoring workflow is ready.
        </p>

        <div className="instructor-quick-actions">
          <Link href="/instructor" className="instructor-secondary-btn">
            Back to dashboard
          </Link>
        </div>
      </section>
    </div>
  );
}
