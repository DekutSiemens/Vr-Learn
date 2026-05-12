export type DocumentationSection = {
  heading: string;
  body?: string[];
  list?: string[];
};

export type DocumentationItem = {
  id: string;
  title: string;
  group: string;
  description: string;
  sections: DocumentationSection[];
};

export type SidebarItem = {
  id: string;
  title: string;
};

export type SidebarGroup = {
  title: string;
  items: SidebarItem[];
};

const createDocumentationItem = (
  id: string,
  title: string,
  group: string,
  description: string,
  body: string[],
  list: string[],
): DocumentationItem => ({
  id,
  title,
  group,
  description,
  sections: [
    {
      heading: title,
      body,
    },
    {
      heading: "What to know",
      list,
    },
    {
      heading: "Where this happens",
      body: [
        group === "For learners"
          ? "Actual course work happens in the learner dashboard after login. This public page explains the workflow without replacing the dashboard."
          : group === "For instructors"
            ? "Instructor actions happen in the instructor dashboard after login. This public page explains the workflow without exposing management tools."
            : "Use this public documentation page to understand the workflow before entering a dashboard or opening a VR app.",
      ],
    },
  ],
});

export const documentationItems: DocumentationItem[] = [
  {
    id: "welcome-creators",
    title: "Welcome creators!",
    group: "main",
    description: "Learn how to use the VR learning platform.",
    sections: [
      {
        heading: "Welcome creators!",
        body: [
          "This public Learn page is a documentation area for learners, instructors, and new visitors.",
          "It explains how the platform works before users enter their dashboards.",
        ],
      },
      {
        heading: "Who is this page for?",
        list: [
          "New visitors who want to understand the platform.",
          "Learners who want guidance before accessing courses.",
          "Instructors who want to understand how to manage learning materials.",
        ],
      },
      {
        heading: "Public docs vs dashboards",
        body: [
          "The public Learn page is for guidance, orientation, and platform documentation.",
          "Learners use their separate dashboard for real course progress, lessons, videos, documents, and VR modules.",
          "Instructors use their separate dashboard to manage notes, documentation, resources, and module content.",
        ],
      },
    ],
  },
  {
    id: "platform-overview",
    title: "Platform overview",
    group: "Get started",
    description: "Understand the purpose of the VR learning platform.",
    sections: [
      {
        heading: "Platform overview",
        body: [
          "The platform provides learning documentation, videos, notes, and VR app modules in one place.",
          "The public Learn page is for documentation, while the learner dashboard is for actual course progress and lesson content.",
        ],
      },
      {
        heading: "Core areas",
        list: [
          "Public Learn documentation for orientation and help.",
          "Learner dashboard for course modules and progress.",
          "Instructor dashboard for managing notes, documents, and resources.",
          "VR app pages for module-specific learning experiences.",
        ],
      },
    ],
  },
  createDocumentationItem(
    "create-an-account",
    "Create an account",
    "Get started",
    "Learn what account access is used for before entering protected areas.",
    [
      "Visitors can read the public Learn documentation without signing in.",
      "An account is needed when a learner wants to access course modules or when an instructor wants to manage learning materials.",
    ],
    [
      "Use the account role that matches your work.",
      "Learners should use learner access for modules and progress.",
      "Instructors should use instructor access for resource management.",
      "Keep account details private and sign out on shared devices.",
    ],
  ),
  createDocumentationItem(
    "login-as-learner",
    "Login as learner",
    "Get started",
    "Understand what learners can do after signing in.",
    [
      "Learners sign in to reach their course dashboard, continue lessons, open documents, watch videos, and track progress.",
      "The public Learn page remains available as a reference before and after login.",
    ],
    [
      "Open the learner dashboard after login.",
      "Choose the assigned VR app or learning module.",
      "Resume lessons from the latest progress point.",
      "Use public documentation when you need workflow guidance.",
    ],
  ),
  createDocumentationItem(
    "login-as-instructor",
    "Login as instructor",
    "Get started",
    "Understand what instructors can manage after signing in.",
    [
      "Instructors sign in to manage learning materials, update module guidance, add notes, and organize resources for learners.",
      "Instructor tools remain separate from the public documentation page.",
    ],
    [
      "Open the instructor dashboard after login.",
      "Review apps, modules, lessons, and resources.",
      "Add or update notes and documentation.",
      "Check learner-facing content before publishing updates.",
    ],
  ),
  createDocumentationItem(
    "choose-a-vr-app",
    "Choose a VR app",
    "Get started",
    "Learn how users choose the right VR app for a learning goal.",
    [
      "VR apps group related modules, lessons, documents, and activities around a specific training area.",
      "Learners choose apps from their dashboard, while visitors can use public documentation to understand what each app is for.",
    ],
    [
      "Match the VR app to the course objective.",
      "Review module descriptions before starting.",
      "Check required devices or preparation notes.",
      "Start with introductory lessons when available.",
    ],
  ),
  {
    id: "access-learning-modules",
    title: "Access learning modules",
    group: "For learners",
    description: "Learn how learners access course modules after logging in.",
    sections: [
      {
        heading: "Access learning modules",
        body: [
          "Learners access real course content from the learner dashboard after login.",
          "This public Learn page only explains the process and does not replace the learner dashboard.",
        ],
      },
      {
        heading: "Module access flow",
        list: [
          "Sign in with a learner account.",
          "Open the learner dashboard.",
          "Select the assigned VR app.",
          "Choose a module and begin the available lesson content.",
        ],
      },
    ],
  },
  createDocumentationItem(
    "open-lessons",
    "Open lessons",
    "For learners",
    "Understand how learners open lesson pages from modules.",
    [
      "Lessons contain the practical steps, guidance, media, and resources learners need for a specific activity.",
      "Opening a lesson from the learner dashboard keeps progress tied to the learner account.",
    ],
    [
      "Start from the learner dashboard.",
      "Open the correct VR app and module.",
      "Select the lesson title.",
      "Follow the lesson instructions and complete checkpoints.",
    ],
  ),
  createDocumentationItem(
    "watch-videos",
    "Watch videos",
    "For learners",
    "Use videos to prepare for VR learning activities.",
    [
      "Videos can introduce procedures, demonstrate equipment, or explain the goal of a VR module before learners begin practice.",
      "Learners should watch assigned videos from their course or lesson pages so completion context stays clear.",
    ],
    [
      "Watch the full introduction before starting a new procedure.",
      "Replay complex steps when needed.",
      "Use videos together with written notes and documents.",
      "Ask an instructor when video instructions conflict with module guidance.",
    ],
  ),
  createDocumentationItem(
    "read-documents",
    "Read documents",
    "For learners",
    "Use documents and notes as supporting learning material.",
    [
      "Documents provide reference material, safety notes, worksheets, and module-specific guidance.",
      "The learner dashboard is the source for assigned course documents, while this public page explains how documents fit into the workflow.",
    ],
    [
      "Read preparation documents before opening a VR module.",
      "Keep procedure notes available during practice.",
      "Review instructor notes for module-specific expectations.",
      "Use documents to revise after completing a lesson.",
    ],
  ),
  createDocumentationItem(
    "track-learning-progress",
    "Track learning progress",
    "For learners",
    "Understand how learners monitor completion and continue courses.",
    [
      "Progress tracking helps learners see completed lessons, in-progress modules, and next steps.",
      "Progress belongs in the learner dashboard and should not be confused with this public documentation page.",
    ],
    [
      "Check completed and in-progress lessons.",
      "Resume modules from the dashboard.",
      "Review feedback or notes before moving forward.",
      "Use progress information to plan the next study session.",
    ],
  ),
  createDocumentationItem(
    "instructor-dashboard-overview",
    "Instructor dashboard overview",
    "For instructors",
    "Understand the instructor area for managing learning content.",
    [
      "The instructor dashboard is the protected area for creating, reviewing, and updating learning resources.",
      "This public documentation explains the instructor workflow without changing dashboard access or route protection.",
    ],
    [
      "Review available VR apps and modules.",
      "Create or update module guidance.",
      "Manage lesson resources and notes.",
      "Prepare learner-facing content before release.",
    ],
  ),
  {
    id: "add-documentation",
    title: "Add documentation",
    group: "For instructors",
    description: "Learn how instructors can add notes and documentation.",
    sections: [
      {
        heading: "Add documentation",
        body: [
          "Instructors can use their dashboard to add notes, upload learning documents, and update module guidance without coding.",
        ],
      },
      {
        heading: "Good documentation includes",
        list: [
          "A clear learning objective.",
          "Step-by-step learner instructions.",
          "Required tools, documents, or safety context.",
          "Expected outcomes and review notes.",
        ],
      },
    ],
  },
  createDocumentationItem(
    "add-notes",
    "Add notes",
    "For instructors",
    "Use notes to give learners extra context inside modules.",
    [
      "Notes help instructors clarify procedures, highlight safety details, and add reminders that support lesson completion.",
      "Notes should be concise, practical, and tied to the module or lesson where learners need them.",
    ],
    [
      "Write notes for a specific lesson or module.",
      "Use direct language and short steps.",
      "Keep safety notes visible and unambiguous.",
      "Review notes after module updates.",
    ],
  ),
  createDocumentationItem(
    "manage-learning-resources",
    "Manage learning resources",
    "For instructors",
    "Organize documents, videos, and supporting materials.",
    [
      "Learning resources support the VR experience with preparation materials, references, and follow-up activities.",
      "Instructors should keep resources organized so learners can find the right material at the right time.",
    ],
    [
      "Group resources by app, module, or lesson.",
      "Use clear titles and descriptions.",
      "Remove outdated files when content changes.",
      "Check that learner-facing links and files open correctly.",
    ],
  ),
  createDocumentationItem(
    "update-module-content",
    "Update module content",
    "For instructors",
    "Refresh module guidance and resources as courses evolve.",
    [
      "Module content should be updated when procedures, documents, videos, or learning objectives change.",
      "Updates happen in the instructor dashboard and should be reviewed before learners rely on them.",
    ],
    [
      "Confirm what changed in the course or VR app.",
      "Update notes, documents, and descriptions together.",
      "Preview learner-facing pages after editing.",
      "Communicate important changes to learners.",
    ],
  ),
  createDocumentationItem(
    "browse-available-vr-apps",
    "Browse available VR apps",
    "VR apps",
    "Learn how users discover available VR learning apps.",
    [
      "VR apps organize learning experiences around a training domain, system, or procedure.",
      "Visitors can read documentation about the app structure, while learners open assigned apps after login.",
    ],
    [
      "Review app titles and descriptions.",
      "Check module counts and learning focus.",
      "Confirm whether the app matches your course assignment.",
      "Open the app from the correct dashboard when signed in.",
    ],
  ),
  createDocumentationItem(
    "understand-modules",
    "Understand modules",
    "VR apps",
    "Learn how modules structure VR app content.",
    [
      "Modules break a VR app into focused learning units with lessons, documents, videos, and practical activities.",
      "A module should have a clear objective and a manageable scope for learners.",
    ],
    [
      "Use module descriptions to understand the objective.",
      "Complete prerequisite modules first when required.",
      "Follow lesson order when the module is sequential.",
      "Review module resources before hands-on practice.",
    ],
  ),
  createDocumentationItem(
    "open-app-documentation",
    "Open app documentation",
    "VR apps",
    "Use app documentation to understand the learning context before starting.",
    [
      "App documentation explains what the VR app teaches, which modules it includes, and what learners should prepare.",
      "It is different from the live learner dashboard content, which tracks progress and active lessons.",
    ],
    [
      "Read the app overview first.",
      "Check device or setup requirements.",
      "Review module descriptions.",
      "Move to the learner dashboard when ready to begin assigned content.",
    ],
  ),
  createDocumentationItem(
    "frequently-asked-questions",
    "Frequently asked questions",
    "Support",
    "Find answers to common questions about the platform.",
    [
      "The FAQ helps visitors, learners, and instructors understand where to go for common tasks.",
      "Use it when you are unsure whether a task belongs on the public Learn page, learner dashboard, or instructor dashboard.",
    ],
    [
      "Public documentation is available at /learn.",
      "Learner course progress belongs in the learner dashboard.",
      "Instructor content management belongs in the instructor dashboard.",
      "VR app content may include modules, lessons, videos, notes, and documents.",
    ],
  ),
  createDocumentationItem(
    "troubleshooting",
    "Troubleshooting",
    "Support",
    "Resolve common access, content, and module issues.",
    [
      "Troubleshooting starts by identifying whether the issue is with public documentation, learner access, instructor tools, or a VR module.",
      "Keeping these areas separate makes issues easier to diagnose.",
    ],
    [
      "Refresh the page if documentation content does not update.",
      "Confirm you are signed in before opening protected dashboard content.",
      "Check that the selected VR app or module is assigned to your account.",
      "Contact an instructor or support contact if required resources are missing.",
    ],
  ),
  createDocumentationItem(
    "contact-support",
    "Contact support",
    "Support",
    "Know what information to include when asking for help.",
    [
      "Support requests are easier to resolve when they include the page, account role, app, module, and a short description of what happened.",
      "Avoid including passwords or private account details in support messages.",
    ],
    [
      "Include whether you are a visitor, learner, or instructor.",
      "Name the VR app, module, or lesson if relevant.",
      "Describe the expected result and what happened instead.",
      "Attach screenshots only when they do not expose private information.",
    ],
  ),
];

export const sidebarGroups: SidebarGroup[] = [
  {
    title: "Get started",
    items: [
      { id: "platform-overview", title: "Platform overview" },
      { id: "create-an-account", title: "Create an account" },
      { id: "login-as-learner", title: "Login as learner" },
      { id: "login-as-instructor", title: "Login as instructor" },
      { id: "choose-a-vr-app", title: "Choose a VR app" },
    ],
  },
  {
    title: "For learners",
    items: [
      { id: "access-learning-modules", title: "Access learning modules" },
      { id: "open-lessons", title: "Open lessons" },
      { id: "watch-videos", title: "Watch videos" },
      { id: "read-documents", title: "Read documents" },
      { id: "track-learning-progress", title: "Track learning progress" },
    ],
  },
  {
    title: "For instructors",
    items: [
      {
        id: "instructor-dashboard-overview",
        title: "Instructor dashboard overview",
      },
      { id: "add-documentation", title: "Add documentation" },
      { id: "add-notes", title: "Add notes" },
      { id: "manage-learning-resources", title: "Manage learning resources" },
      { id: "update-module-content", title: "Update module content" },
    ],
  },
  {
    title: "VR apps",
    items: [
      { id: "browse-available-vr-apps", title: "Browse available VR apps" },
      { id: "understand-modules", title: "Understand modules" },
      { id: "open-app-documentation", title: "Open app documentation" },
    ],
  },
  {
    title: "Support",
    items: [
      {
        id: "frequently-asked-questions",
        title: "Frequently asked questions",
      },
      { id: "troubleshooting", title: "Troubleshooting" },
      { id: "contact-support", title: "Contact support" },
    ],
  },
];
