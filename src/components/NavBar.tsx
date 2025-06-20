import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();

  const linkClass = (path: string) =>
    `text-sm ${location.pathname === path ? "font-semibold" : "text-muted-foreground"}`;

  return (
    <div className="border-b mb-6">
      <div className="container mx-auto px-4 py-3 flex items-center gap-4">
        <Link to="/" className={linkClass("/")}>
          <Button variant="ghost">Dashboard</Button>
        </Link>
        <Link to="/disputes/new" className={linkClass("/disputes/new")}>
          <Button variant="ghost">Raise Dispute</Button>
        </Link>
        <Link to="/admin" className={linkClass("/admin")}>
          <Button variant="ghost">Admin Panel</Button>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
