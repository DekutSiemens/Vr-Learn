"use client";

import Image from "next/image";
import styles from "../app/page.module.css";
import { Home, Users, GraduationCap, Settings2 } from "lucide-react";
import { useState } from "react";
type UserRole = "student" | "instructor";

export default function Navbar() {
  const [user, setUser] = useState<{ role: UserRole }>({ role: "student" });
   const switchRole = () => {
    setUser((current) => ({
      role: current.role === "student" ? "instructor" : "student",
    }));
  };
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
                <p className={styles.brandTitle}>Development Dashboard</p>
              </div>
            </div>

            <div className={styles.navLinks}>
              <a href="/" className={`${styles.navLink} ${styles.activeNavLink}`}>
                <Home className={styles.smallIcon} />
                Home
              </a>

              {/* Conditional rendering: instructors see Learners, while students see Instructors. */}
              {user.role === "instructor" ? (
                <a href="/learn" className={styles.navLink}>
                  <Users className={styles.smallIcon} />
                  Learners
                </a>
              ) : (
                <a href="/instructors" className={styles.navLink}>
                  <GraduationCap className={styles.smallIcon} />
                  Instructors
                </a>
              )}

              <button
                type="button"
                onClick={switchRole}
                className={styles.roleButton}
              >
                <Settings2 className={styles.smallIcon} />
                {user.role}
              </button>
            </div>
          </div>
    </header>
  );
}