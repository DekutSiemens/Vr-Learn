import RoleGuard from "@/components/auth/RoleGuard";

export default function InstructorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RoleGuard allowedRoles={["DEVELOPER", "ADMIN"]}>{children}</RoleGuard>;
}
