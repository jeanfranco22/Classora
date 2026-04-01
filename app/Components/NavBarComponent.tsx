import { navItems } from "@/utils/NavItems";
import Link from "next/link";

const NavBarComponent = () => {
  const leftItems = navItems.filter((item) => item.position === "left");
  const centerItems = navItems.filter((item) => item.position === "center");
  const rightItems = navItems.filter((item) => item.position === "right");

  return (
    <nav className="relative overflow-hidden bg-[#f7f7f5]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(31,42,68,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(31,42,68,0.06)_1px,transparent_1px)] bg-[size:72px_72px]" />
      <div className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70 blur-3xl" />

      <div className="relative z-10 grid grid-cols-3 items-center px-2 py-2">
        <div className="ml-4 flex items-center gap-4">
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

        <div className="mr-4 flex items-center justify-end gap-4">
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
      </div>
    </nav>
  );
};

export default NavBarComponent;
