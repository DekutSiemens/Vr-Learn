import Link from "next/link";
import "@/styles/singleApp.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const modules = [
  {
    slug: "intro-to-ph-testing",
    number: 1,
    title: "Introduction to pH Testing",
    description: "Learn the purpose, safety, and tools used in pH measurement.",
    lessons: 4,
    progress: 100,
  },
  {
    slug: "ph-meter-setup",
    number: 2,
    title: "pH Meter Setup",
    description: "Set up and calibrate the pH meter before testing.",
    lessons: 5,
    progress: 45,
  },
  {
    slug: "sample-testing",
    number: 3,
    title: "Sample Testing",
    description: "Run the sample reading and interpret results accurately.",
    lessons: 3,
    progress: 0,
  },
];

export default async function SingleLearningAppPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <div className="single-learning-app-page">
      <section className="single-learning-app-hero">
        <div className="single-learning-app-hero-image" />

        <div className="single-learning-app-hero-content">
          <p className="single-learning-app-label">App</p>

          <h1 className="single-learning-app-title">
            {slug.replace(/-/g, " ")}
          </h1>

          <p className="single-learning-app-description">
            Guided VR learning experience with modules, lessons, videos, and
            instructor notes.
          </p>

          <div className="single-learning-app-tags">
            <span className="single-learning-app-tag">Intermediate</span>
            <span className="single-learning-app-tag">3 hrs total</span>
            <span className="single-learning-app-tag">45% progress</span>
          </div>

          <div className="single-learning-app-actions">
            <Link
              href={`/learn/apps/${slug}/modules/ph-meter-setup`}
              className="single-learning-app-primary-btn"
            >
              Continue
            </Link>

            <button className="single-learning-app-secondary-btn">
              Start Learning
            </button>
          </div>
        </div>
      </section>

      <section className="single-learning-app-card">
        <h2 className="single-learning-app-section-title">About this App</h2>

        <div className="single-learning-app-about-grid">
          <div>
            <h3 className="single-learning-app-subtitle">Learning Objectives</h3>
            <ul className="single-learning-app-list">
              <li>Understand the workflow of the VR training module</li>
              <li>Follow lessons in sequence</li>
              <li>Complete learning activities and track progress</li>
            </ul>
          </div>

          <div>
            <h3 className="single-learning-app-subtitle">Prerequisites</h3>
            <p className="single-learning-app-text">
              Basic familiarity with the lab or learning topic.
            </p>
          </div>

          <div>
            <h3 className="single-learning-app-subtitle">Supported Devices</h3>
            <p className="single-learning-app-text">
              Desktop, tablet, and VR headset companion learning flow.
            </p>
          </div>
        </div>
      </section>

      <section className="single-learning-app-modules-section">
        <h2 className="single-learning-app-section-title">Modules</h2>

        <div className="single-learning-app-modules-grid">
          {modules.map((module) => (
            <div key={module.slug} className="single-learning-app-module-card">
              <div className="single-learning-app-module-layout">
                <div>
                  <p className="single-learning-app-module-label">
                    Module {module.number}
                  </p>

                  <h3 className="single-learning-app-module-title">
                    {module.title}
                  </h3>

                  <p className="single-learning-app-module-description">
                    {module.description}
                  </p>

                  <p className="single-learning-app-module-lessons">
                    {module.lessons} lessons
                  </p>
                </div>

                <div className="single-learning-app-module-side">
                  <div className="single-learning-app-progress-track">
                    <div
                      className="single-learning-app-progress-fill"
                      style={{ width: `${module.progress}%` }}
                    />
                  </div>

                  <p className="single-learning-app-progress-text">
                    {module.progress}% complete
                  </p>

                  <Link
                    href={`/learn/apps/${slug}/modules/${module.slug}`}
                    className="single-learning-app-module-btn"
                  >
                    Open Module
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="single-learning-app-card">
        <h2 className="single-learning-app-section-title">Resources</h2>

        <div className="single-learning-app-resources">
          <div className="single-learning-app-resource-row">
            <span>VR Fluid Power System Safety Guide.pdf</span>
            <button className="single-learning-app-resource-btn">Open</button>
          </div>

          <div className="single-learning-app-resource-row">
            <span>Calibration Checklist.pdf</span>
            <button className="single-learning-app-resource-btn">Open</button>
          </div>
        </div>
      </section>
    </div>
  );
}