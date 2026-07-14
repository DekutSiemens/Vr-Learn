"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../app/page.module.css";
import { Home, Settings2, Users } from "lucide-react";
import type { AuthUser } from "@/lib/api/types";
import useCurrentUser from "@/components/auth/useCurrentUser";

const hasInstructorAccess = (user: AuthUser) =>
  user.role === "DEVELOPER" ||
  user.role === "ADMIN" ||
  Boolean(user.developerEnabled || user.developer);

export default function Navbar() {
  const pathname = usePathname();
  const user = useCurrentUser();
  const isInstructor = user
    ? hasInstructorAccess(user)
    : pathname.startsWith("/instructor");

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    isInstructor
      ? { href: "/instructor", label: "Instructor", icon: Settings2 }
      : { href: "/learn", label: "Learner Dashboard", icon: Users },
  ];

  return (
    <header className={styles.navbar}>
     <div className={styles.navbarInner}>
            <div className={styles.brand}>
              <div className={styles.logoFrame}>
                <Image
                  src="/Virtual Mechatronics Lab Logo V2-01.png"
                  alt="Virtual Mechatronics Labs logo"
                  width={40}
                  height={40}
                  priority
                />
              </div>
              <div>
                <p className={styles.brandKicker}>VR Learn</p>
                <p className={styles.brandTitle}>
                  {isInstructor ? "Instructor Studio" : "Learning Hub"}
                </p>
              </div>
            </div>

            <div className={styles.navLinks}>
              {navLinks.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    href={item.href}
                    className={`${styles.navLink} ${
                      isActive ? styles.activeNavLink : ""
                    }`}
                    key={item.href}
                  >
                    <Icon className={styles.smallIcon} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
    </header>
  );
}
