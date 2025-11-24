// components/breadcrumbs/LinkRouter.tsx
import { styled } from "@mui/material/styles";
import Link from "next/link";

const StyledLink = styled(Link)(({ theme }) => ({
  fontSize: "0.9rem",
  textTransform: "capitalize",
  textDecoration: "none",
  color: theme.palette.primary.main,
  "&:hover": {
    textDecoration: "underline",
  },
}));

interface LinkRouterProps {
  to: string;
  children: React.ReactNode;
  disabled?: boolean;
}

const LinkRouter = ({ to, children }: LinkRouterProps) => {
  return <StyledLink href={to}>{children}</StyledLink>;
};

export default LinkRouter;
