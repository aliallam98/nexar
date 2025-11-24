import React from "react";
import { cn } from "../../lib/utils"; // utility to combine Tailwind classes

interface StyledSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

const StyledSection: React.FC<StyledSectionProps> = ({
  title,
  description,
  children,
  className,
  ...props
}) => {
  return (
    <section className={cn("w-full p-6 md:py-10 ", className)} {...props}>
      <div className="container">
        {(title || description) && (
          <div className="mb-4">
            {title && (
              <h1 className="text-3xl font-semibold tracking-tight ">
                {title}
              </h1>
            )}
            {description && (
              <p className="text-muted-foreground text-sm mt-1">
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

export default StyledSection;
