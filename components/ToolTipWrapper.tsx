import { ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { useTranslation } from "react-i18next";

const ToolTipWrapper = ({
  children,
  tipMessage,
  ariaLabel = "info",
}: {
  children: ReactNode;
  tipMessage: string;
  ariaLabel?: string;
}) => {
  const { t } = useTranslation();
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button type="button" tabIndex={-1} aria-label={t(ariaLabel)}>
          {children}
        </button>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs text-sm text-left">
        {t(tipMessage)}
        <br />
      </TooltipContent>
    </Tooltip>
  );
};

export default ToolTipWrapper;
