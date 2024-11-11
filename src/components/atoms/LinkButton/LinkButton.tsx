import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

interface LinkButton {
  children: React.ReactNode;
  href: string;
  classname?: string;
}

const LinkButton: React.FC<LinkButton> = ({ children, href, classname }) => {
  return (
    <Link
      className={buttonVariants({
        variant: "outline",
        className: "flex gap-1" + classname,
      })}
      href={href}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
