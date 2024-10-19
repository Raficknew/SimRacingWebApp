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
            className="hidden text-white md:flex  rounded-l hover:text-white h-7 w-7"
          >
            {icon}
          </Link>
        </TooltipTrigger>
        <TooltipContent className="border-white">
          <p className="text-black ">{title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Navbarlink;
