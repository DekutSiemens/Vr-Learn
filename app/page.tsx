"use client";

import Image from "next/image";
import {
  BookOpen,
  Boxes,
  ChevronDown,
  CircleHelp,
  Code2,
  Cpu,
  GraduationCap,
  Home,
  Library,
  Monitor,
  Orbit,
  Search,
  Settings2,
  Sparkles,
  Users,
} from "lucide-react";
import type { ComponentType } from "react";
import { useState } from "react";
import styles from "./page.module.css";

type UserRole = "student" | "instructor";

type SidebarTopic = {
  title: string;
  icon: ComponentType<{ className?: string }>;
  subtopics: string[];
};

const topics: SidebarTopic[] = [
  {
    title: "VR Development",
    icon: Monitor,
    subtopics: ["Unity Setup", "XR Interaction Toolkit", "Scripting for VR"],
  },
  {
    title: "App Management",
    icon: Boxes,
    subtopics: ["Meta Store Guidelines", "SideQuest Sideloading", "ADB Commands"],
  },
  {
    title: "Troubleshooting",
    icon: CircleHelp,
    subtopics: ["Link Cable Issues", "Tracking Errors", "Performance Optimization"],
  },
  {
    title: "Resources",
    icon: Library,
    subtopics: ["Documentation", "Asset Store", "Community Forums"],
  },
];

const moduleCards = [
  {
    title: "XR Interaction Toolkit",
    status: "In progress",
    progress: "74%",
    accentClass: styles.accentCyan,
  },
  {
    title: "Physics Driven Grabbing",
    status: "Next lesson",
    progress: "42%",
    accentClass: styles.accentFuchsia,
  },
  {
    title: "Quest Build Pipeline",
    status: "Ready",
    progress: "91%",
    accentClass: styles.accentAmber,
  },
];

const metrics = [
  { label: "Lessons", value: "18", icon: BookOpen },
  { label: "Labs", value: "06", icon: Orbit },
  { label: "Scripts", value: "24", icon: Code2 },
];

export default function HomePage() {
  const [user, setUser] = useState<{ role: UserRole }>({ role: "student" });
  const [openTopics, setOpenTopics] = useState<Record<string, boolean>>({
    "VR Development": true,
  });

  const toggleTopic = (title: string) => {
    setOpenTopics((current) => ({
      ...current,
      [title]: !current[title],
    }));
  };

  const switchRole = () => {
    setUser((current) => ({
      role: current.role === "student" ? "instructor" : "student",
    }));
  };

  return (
    <main className={styles.page}>
      <div className={styles.backgroundGlow} />
      <div className={styles.shell}>
        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
              <div>
                <p className={styles.sidebarKicker}>Course Map</p>
                <h2 className={styles.sidebarTitle}>VR Development</h2>
              </div>
              <Cpu className={styles.headerIcon} />
            </div>

            <div className={styles.topicList}>
              {topics.map((topic) => {
                const TopicIcon = topic.icon;
                const isOpen = openTopics[topic.title];

                return (
                  <div key={topic.title} className={styles.topic}>
                    <button
                      type="button"
                      onClick={() => toggleTopic(topic.title)}
                      className={styles.topicButton}
                    >
                      <span className={styles.topicTitle}>
                        <TopicIcon className={styles.topicIcon} />
                        <span>{topic.title}</span>
                      </span>
                      <ChevronDown
                        className={`${styles.chevron} ${
                          isOpen ? styles.chevronOpen : ""
                        }`}
                      />
                    </button>

                    {isOpen ? (
                      <div className={styles.subtopicList}>
                        {topic.subtopics.map((subtopic) => (
                          <a
                            href={`#${subtopic.toLowerCase().replaceAll(" ", "-")}`}
                            key={subtopic}
                            className={styles.subtopicLink}
                          >
                            {subtopic}
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </aside>

          <section id="dashboard" className={styles.content}>
            <div className={styles.heroRow}>
              <div>
                <div className={styles.workspaceBadge}>
                  <Sparkles className={styles.smallIcon} />
                  Immersive LMS Workspace
                </div>
                <h1 className={styles.pageTitle}>
                  Build, test, and publish VR learning experiences.
                </h1>
              </div>

              <label className={styles.searchBox}>
                <Search className={styles.searchIcon} />
                <input
                  className={styles.searchInput}
                  placeholder="Search lessons, labs, or resources"
                />
              </label>
            </div>

            <div className={styles.metricsGrid}>
              {metrics.map((metric) => {
                const MetricIcon = metric.icon;

                return (
                  <div key={metric.label} className={styles.metricCard}>
                    <MetricIcon className={styles.metricIcon} />
                    <p className={styles.metricValue}>{metric.value}</p>
                    <p className={styles.metricLabel}>{metric.label}</p>
                  </div>
                );
              })}
            </div>

            <div className={styles.dashboardGrid}>
              <div className={styles.panel}>
                <div className={styles.panelHeader}>
                  <div>
                    <p className={styles.panelKicker}>Active Modules</p>
                    <h2 className={styles.panelTitle}>VR Development Course</h2>
                  </div>
                  <Monitor className={styles.panelIcon} />
                </div>

                <div className={styles.moduleGrid}>
                  {moduleCards.map((module) => (
                    <article key={module.title} className={styles.moduleCard}>
                      <div className={`${styles.accentBar} ${module.accentClass}`} />
                      <p className={styles.moduleStatus}>{module.status}</p>
                      <h3 className={styles.moduleTitle}>{module.title}</h3>
                      <div className={styles.progressTrack}>
                        <div
                          className={`${styles.progressFill} ${module.accentClass}`}
                          style={{ width: module.progress }}
                        />
                      </div>
                      <p className={styles.progressText}>
                        {module.progress} complete
                      </p>
                    </article>
                  ))}
                </div>
              </div>

              <div className={styles.labPanel}>
                <p className={styles.labKicker}>Current Lab</p>
                <h2 className={styles.labTitle}>Hand Presence Calibration</h2>
                <p className={styles.labText}>
                  Tune controller poses, attach interaction layers, and validate
                  grab targets in a headset-ready scene.
                </p>
                <div className={styles.taskList}>
                  {["Import XR Rig", "Bind Input Actions", "Profile Frame Time"].map(
                    (task, index) => (
                      <div key={task} className={styles.taskItem}>
                        <span className={styles.taskNumber}>{index + 1}</span>
                        <span>{task}</span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
