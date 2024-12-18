interface ParticipantBoxProps {
  children: React.ReactNode;
  className?: string;
  position?: number;
  points?: number;
}

const ParticipantBox: React.FC<ParticipantBoxProps> = ({
  children,
  position,
  className,
  points,
}) => {
  // ! Podzielnic na kilka komponentow
  return (
    <div
      className={
        " flex gap-6 justify-between self-stretch items-center bg-[#303030] bg-opacity-50 py-1 rounded-sm px-5 opacity-95" +
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
      <div className="text-white ">{points}</div>
    </div>
  );
};

export default ParticipantBox;
