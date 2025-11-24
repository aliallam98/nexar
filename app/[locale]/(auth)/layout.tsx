import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="min-h-[90dvh] flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-8">{children}</div>
    </section>
  );
};

export default AuthLayout;
