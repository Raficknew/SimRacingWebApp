import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

interface LinkButton {
  title: string;
  icon?: React.ReactNode;
  href: string;
}

const LinkButton: React.FC<LinkButton> = ({ title, icon, href }) => {
  return (
    <Link
      className={buttonVariants({
        variant: "outline",
        className: "self-end flex",
      })}
      href={href}
    >
      {icon}
      <p className="pl-2">{title}</p>
    </Link>
  );
};

export default LinkButton;
