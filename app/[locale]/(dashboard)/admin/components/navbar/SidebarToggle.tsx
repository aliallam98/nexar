import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

type Props = {
  onClick: () => void;
};

export default function SidebarToggle({ onClick }: Props) {
  return (
    <IconButton edge="start" onClick={onClick}>
      <MenuIcon />
    </IconButton>
  );
}
