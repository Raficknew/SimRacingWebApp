import Link from "next/link";

interface LinkButton {
  children: React.ReactNode;
  href: string;
  classname?: string;
}

const LinkButton: React.FC<LinkButton> = ({ children, href, classname }) => {
  return (
    <Link
      className={`flex items-center justify-center p-2 rounded-sm w-full gap-2 ${classname}`}
      href={href}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
