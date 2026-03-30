import { navItems } from "@/utils/NavItems";
import Link from "next/link";

const NavBarComponent = () => {
  const leftItems = navItems.filter((item) => item.position === "left");
  const centerItems = navItems.filter((item) => item.position === "center");
  const rightItems = navItems.filter((item) => item.position === "right");

  return (
    <nav className="grid grid-cols-3 items-center px-2 py-2">
      <div className="flex items-center gap-4 ml-4">
        {leftItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-2xl font-extrabold tracking-tight text-[#1f2a44]"
          >
            {item.label}
          </Link>
        ))}
      </div>

      <div className="flex justify-center">
        <div className="hidden md:flex items-center gap-2 rounded-full border border-[#d9dde7] bg-white/80 px-3 py-2 shadow-sm backdrop-blur">
          {centerItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-5 py-2 text-sm font-medium text-[#1f2a44] transition hover:bg-[#eef2f7]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex justify-end items-center gap-4 mr-4">
        {rightItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="inline-flex items-center gap-2 rounded-full border border-[#d9dde7] bg-white/80 px-5 py-3 text-sm font-semibold text-[#1f2a44] shadow-sm backdrop-blur transition hover:bg-white"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavBarComponent;
