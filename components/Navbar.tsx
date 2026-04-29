import Link from "next/link";
import Image from "next/image";
import "@/styles/navbar.css";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link href="/" className="navbar-brand">
          <Image
            src="/Virtual Mechatronics Lab Logo V2-01.png"
            alt="VML Logo"
            width={42}
            height={42}
            priority
            className="navbar-logo"
          />
          <div className="navbar-brand-text">
            <p className="navbar-title">Virtual Mechatronics Labs</p>
            <p className="navbar-subtitle">VR Learning Platform</p>
          </div>
        </Link>

        <nav className="navbar-links">
          <Link href="/" className="navbar-link">
            Home
          </Link>
          <Link href="/learn" className="navbar-link">
            Learner Portal
          </Link>
          <Link href="/learn/apps" className="navbar-link">
            Learner Apps
          </Link>
          <Link href="/instructor" className="navbar-link">
            Instructor Portal
          </Link>
          <Link href="/instructor/apps" className="navbar-link">
            Instructor Apps
          </Link>
        </nav>
      </div>
    </header>
  );
}