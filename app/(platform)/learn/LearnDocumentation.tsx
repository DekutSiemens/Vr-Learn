"use client";

import { useMemo, useState } from "react";
import { documentationItems, sidebarGroups } from "./documentationData";
import type { SidebarGroup } from "./documentationData";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default function LearnDocumentation() {
  const [activeId, setActiveId] = useState("welcome-creators");
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    "Get started": true,
  });

  const activeDocument = useMemo(
    () =>
      documentationItems.find((documentItem) => documentItem.id === activeId) ??
      documentationItems[0],
    [activeId],
  );

  const handleGroupClick = (group: SidebarGroup) => {
    setActiveId(group.items[0]?.id ?? "welcome-creators");
    setOpenGroups((current) => ({
      ...current,
      [group.title]: !current[group.title],
    }));
  };

  const handleItemClick = (groupTitle: string, itemId: string) => {
    setActiveId(itemId);
    setOpenGroups((current) => ({
      ...current,
      [groupTitle]: true,
    }));
  };
  

  return (
    <main className="learn-docs-page">
      <div className="learn-docs-shell">
        <aside className="learn-docs-sidebar" aria-label="Learn documentation">
          <div className="learn-docs-sidebar-header">
            <p className="learn-docs-label">Learn</p>
            <button
              type="button"
              className={`learn-docs-welcome ${
                activeId === "welcome-creators" ? "is-active" : ""
              }`}
              onClick={() => setActiveId("welcome-creators")}
            >
              Welcome creators!
            </button>
          </div>

          <nav className="learn-docs-nav" aria-label="Documentation topics">
            {sidebarGroups.map((group) => {
              const isGroupActive = group.items.some(
                (item) => item.id === activeId,
              );
              const isOpen = openGroups[group.title] ?? false;
              const accordionPanelId = `learn-docs-${slugify(group.title)}-items`;

              return (
                <section className="learn-docs-nav-group" key={group.title}>
                  <button
                    type="button"
                    className={`learn-docs-group-button ${
                      isGroupActive ? "is-active" : ""
                    }`}
                    onClick={() => handleGroupClick(group)}
                    aria-expanded={isOpen}
                    aria-controls={accordionPanelId}
                  >
                    <span>{group.title}</span>
                    <span
                      className={`learn-docs-accordion-icon ${
                        isOpen ? "is-open" : ""
                      }`}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>

                  <div
                    className="learn-docs-nav-items"
                    id={accordionPanelId}
                    hidden={!isOpen}
                  >
                    {group.items.map((item) => (
                      <button
                        type="button"
                        key={item.id}
                        className={`learn-docs-nav-item ${
                          activeId === item.id ? "is-active" : ""
                        }`}
                        onClick={() => handleItemClick(group.title, item.id)}
                      >
                        {item.title}
                      </button>
                    ))}
                  </div>
                </section>
              );
            })}
          </nav>
        </aside>

        <article
          className={`learn-docs-content ${
            activeDocument.id === "welcome-creators" ? "is-welcome-content" : ""
          }`}
        >
          <div className="learn-docs-page-header">
            <p className="learn-docs-breadcrumb">
              {activeDocument.group === "main"
                ? "Public Learn"
                : activeDocument.group}
            </p>
            <h1>{activeDocument.title}</h1>
            <p className="learn-docs-description">{activeDocument.description}</p>
          </div>

          <div className="learn-docs-section-list">
            {activeDocument.sections.map((section) => (
              <section
                className="learn-docs-section"
                id={slugify(section.heading)}
                key={section.heading}
              >
                <h2>{section.heading}</h2>
                {section.body?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.list && (
                  <ul>
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </article>

        <aside className="learn-docs-on-page" aria-label="On this page">
          <p>On this page</p>
          <nav>
            {activeDocument.sections.map((section) => (
              <a href={`#${slugify(section.heading)}`} key={section.heading}>
                {section.heading}
              </a>
            ))}
          </nav>
        </aside>
      </div>
    </main>
  );
}
