interface ParticipantBoxProps {
  children: React.ReactNode;
  className?: string;
  team?: string;
  position?: number;
  points?: number;
}

const ParticipantBox: React.FC<ParticipantBoxProps> = ({
  children,
  team,
  position,
  className,
  points,
}) => {
  return (
    <div
      className={
        "flex gap-6 self-stretch  items-center bg-black py-1 rounded-sm px-5 opacity-95 min-w-[250px] " +
        className
      }
    >
      {position && (
        <div
          className={
            {
              1: "text-yellow-200",
              2: "text-gray-300",
              3: "text-amber-700",
            }[position] || "text-gray-500"
          }
        >
          {position}
        </div>
      )}
      <div className="text-white">{children}</div>
      <div className=" text-red-800">{team}</div>
      <div className=" text-red-800 self-end">{points}</div>
    </div>
  );
};

export default ParticipantBox;
