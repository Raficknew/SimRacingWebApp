import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

interface LinkButton {
  children: React.ReactNode;
  href: string;
}

const LinkButton: React.FC<LinkButton> = ({ children, href }) => {
  return (
    <Link
      className={buttonVariants({
        variant: "outline",
        className: "self-end flex",
      })}
      href={href}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
