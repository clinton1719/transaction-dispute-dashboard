import { Outlet } from "react-router-dom";
import NavBar from "@/components/NavBar";

const Layout = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <main className="container mx-auto px-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
