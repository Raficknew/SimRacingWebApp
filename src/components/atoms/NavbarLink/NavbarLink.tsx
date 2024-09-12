import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

type NavbarlinkProps = {
  icon: React.ReactNode;
  link: string;
  title: string;
};

const Navbarlink: React.FC<NavbarlinkProps> = ({ link, icon, title }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Link
            href={link}
            className="hidden md:flex  bg-white p-2 rounded-lg text-red-400 hover:bg-red-400 hover:text-white"
          >
            {icon}
          </Link>
        </TooltipTrigger>
        <TooltipContent className="border-white">
          <p className="text-red-400 ">{title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Navbarlink;
