import { Link, NavLink, Outlet } from "react-router-dom";
import { CheckSquare, PenTool, Eye } from "lucide-react";
import layout from "@/styles/Layout.module.css";

const navItems = [
  { to: "/todos", label: "Todos", icon: CheckSquare },
  { to: "/form-builder", label: "Form Builder", icon: PenTool },
  { to: "/form-preview", label: "Form Preview", icon: Eye },
];

const AppLayout = () => {
  return (
    <div className={layout.shell}>
      <nav className={layout.nav}>
        <div className={layout.navInner}>
          <Link to="/todos" className={layout.brandContainer}>
            <img src="/favicon.svg" alt="QPro" className={layout.brandImage} />
            <span className={layout.brand}>QPro - Builder</span>
          </Link>
          <div className={layout.navLinks}>
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  isActive
                    ? `${layout.navLink} ${layout.navLinkActive}`
                    : layout.navLink
                }
              >
                <Icon size={16} />
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
      <main className={layout.main}>
        <Outlet />
      </main>
      <footer className={layout.footer}>
        <span className={layout.footerText}>
          © {new Date().getFullYear()}{" "}
          <a
            className={layout.footerLink}
            href="https://irfanhsajid.vercel.app"
            target="_blank"
            rel="noreferrer"
          >
            Irfan H Sajid
          </a>
          &nbsp;|&nbsp;All rights reserved
        </span>
      </footer>
    </div>
  );
};

export default AppLayout;
