import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { useTranslation } from "react-i18next";

const InfoButton = ({
  tipMessage,
  ariaLabel,
}: {
  tipMessage: string;
  ariaLabel: string;
}) => {
  const { t } = useTranslation();
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <button
          type="button"
          className="text-gray-400 hover:text-gray-500 size-4"
          tabIndex={-1}
          aria-label={t(ariaLabel)}
        >
          <Info className="h-full w-full" />
        </button>
      </TooltipTrigger>
      <TooltipContent className="max-w-md text-sm text-left">
        {t(tipMessage)}
        <br />
      </TooltipContent>
    </Tooltip>
  );
};

export default InfoButton;
