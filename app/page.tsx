import Link from "next/link";

const learnerHighlights = [
  {
    title: "Track Learning Progress",
    description:
      "Follow enrolled apps, continue lessons, and monitor completion in one place.",
  },
  {
    title: "Structured VR Modules",
    description:
      "Organize learning into apps, modules, lessons, videos, and supporting resources.",
  },
  {
    title: "Simple Learner Flow",
    description:
      "Help learners move from dashboard to module to lesson without confusion.",
  },
];

const instructorHighlights = [
  {
    title: "Manage Content Easily",
    description:
      "Create modules, edit lessons, attach documents, and publish learning material.",
  },
  {
    title: "Instructor Dashboard",
    description:
      "See assigned apps, lesson counts, drafts, and published content quickly.",
  },
  {
    title: "CMS-Style Workflow",
    description:
      "Give instructors a clean content management experience without touching code.",
  },
];

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <span className="badge badge-default">VR Learning Platform</span>

            <h1 className="hero-title">
              Learn and manage VR training content in one platform
            </h1>

            <p className="hero-text">
              A clean learning experience for learners and a CMS-style dashboard
              for instructors, built for structured VR apps, modules, lessons,
              videos, notes, and resources.
            </p>

            <div className="hero-actions">
              <Link href="/learn" className="btn btn-primary">
                Go to Learner Portal
              </Link>

              <Link href="/instructor" className="btn btn-secondary">
                Go to Instructor Portal
              </Link>
            </div>
          </div>

          <div className="hero-cards">
            <div className="card card-padding">
              <p className="card-label">Learner Features</p>
              <h2 className="card-hero-title">Study with clarity</h2>
              <p className="card-text">
                Move from enrolled app to module to lesson with progress
                tracking and attached learning resources.
              </p>
            </div>

            <div className="card card-padding">
              <p className="card-label">Instructor Features</p>
              <h2 className="card-hero-title">Manage without code</h2>
              <p className="card-text">
                Create modules, edit lesson content, upload resources, and
                publish updates from one dashboard.
              </p>
            </div>

            <div className="card card-padding full-width-card">
              <p className="card-label">Phase 1 Goal</p>
              <h2 className="card-hero-title">
                Build the core learner flow and instructor CMS flow first
              </h2>
              <p className="card-text">
                Start with dashboards, app pages, module pages, lesson pages,
                the lesson editor, and reusable layout components.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container two-column-grid">
          <div>
            <h2 className="section-title">For Learners</h2>
            <div className="stack-lg">
              {learnerHighlights.map((item) => (
                <div key={item.title} className="card card-padding">
                  <h3 className="item-title">{item.title}</h3>
                  <p className="item-text">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="section-title">For Instructors</h2>
            <div className="stack-lg">
              {instructorHighlights.map((item) => (
                <div key={item.title} className="card card-padding">
                  <h3 className="item-title">{item.title}</h3>
                  <p className="item-text">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section bottom-section">
        <div className="container">
          <div className="card card-padding">
            <h2 className="section-title">Quick Access</h2>
            <p className="item-text">
              Use these routes to move directly into the platform sections
              during development.
            </p>

            <div className="quick-access-grid">
              <Link href="/learn" className="quick-link">
                /learn
              </Link>

              <Link href="/learn/apps" className="quick-link">
                /learn/apps
              </Link>

              <Link href="/instructor" className="quick-link">
                /instructor
              </Link>

              <Link href="/instructor/apps" className="quick-link">
                /instructor/apps
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}