interface StatisticProps {
  title: string;
  children: React.ReactNode;
  number: number;
  classname: string;
}

const Statistic: React.FC<StatisticProps> = ({
  number,
  title,
  children,
  classname,
}) => {
  return (
    <div
      className={`flex flex-col w-[120px] gap-2 items-center bg-[#363636] px-6 border-none py-3 *:text-white ${classname}`}
    >
      {children}
      <p className="w-full text-center">{title}</p>
      <p className="w-full text-center">{number}</p>
    </div>
  );
};

export default Statistic;
