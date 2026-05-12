import Link from "next/link";
import "@/styles/instructor.css";

export default function InstructorResourcesPage() {
  return (
    <div className="instructor-dashboard-page">
      <div className="instructor-dashboard-header">
        <div>
          <h1 className="instructor-dashboard-title">Resources</h1>
          <p className="instructor-dashboard-subtitle">
            Upload and manage supporting documents, media, and classroom assets.
          </p>
        </div>
      </div>

      <section className="instructor-card">
        <h2 className="instructor-section-title">Resource library</h2>
        <p className="card-text">
          Resource upload and organization controls can be connected here when
          the instructor workflow is ready.
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
