import { IRoute } from "@/constants/marketing-links";
import { cn } from "../../lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

export const NavLink = ({ route }: { route: IRoute }) => {
  const pathname = usePathname();
  const isActive = pathname.startsWith(route.href);
  const { t } = useTranslation(["main"]);
  return (
    <Link
      href={route.href}
      className={cn(
        isActive ? "text-violet-300" : "text-white",
        "font-zentry w-fit flex justify-center items-center group relative h-12 rounded-full bg-transparent px-4 text-sm font-medium transition-colors hover:text-violet-300"
      )}
    >
      <span className="relative inline-flex overflow-hidden">
        <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:-translate-y-[130%] group-hover:skew-y-12">
          {t(route.label)}
        </div>
        <div className="absolute translate-y-[110%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
          {t(route.label)}
        </div>
      </span>
    </Link>
  );
};
