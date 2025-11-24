import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/" className="mr-6 flex items-center space-x-2">
      <span className="special-font text-5xl text-white">
        <b>nexar</b>
      </span>
    </Link>
  );
};
