import RoleGuard from "@/components/auth/RoleGuard";
import "@/styles/instructor.css";

export default function LearnLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RoleGuard allowedRoles={["USER", "DEVELOPER", "ADMIN"]}>{children}</RoleGuard>;
}
