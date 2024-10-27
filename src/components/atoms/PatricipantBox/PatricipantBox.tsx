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
        "flex gap-6 self-stretch justify-between bg-black py-1 rounded-sm px-5 opacity-95 min-w-[250px] " +
        className
      }
    >
      {position && (
        <p
          className={
            {
              1: "text-yellow-200",
              2: "text-gray-300",
              3: "text-amber-700",
            }[position] || "text-gray-500"
          }
        >
          {position}
        </p>
      )}
      <p className="text-white">{children}</p>
      {team && <p className=" text-red-800">{team}</p>}
      {points && <p className="text-red-300">{points}</p>}
    </div>
  );
};

export default ParticipantBox;
