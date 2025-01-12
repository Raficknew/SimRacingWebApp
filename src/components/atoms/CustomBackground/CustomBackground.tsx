interface ChampionshipBackgroundProps {
  bg: string;
}

const CustomBackground: React.FC<ChampionshipBackgroundProps> = ({ bg }) => {
  return (
    <div>
      <div
        className="absolute top-0 left-0 z-[-2] min-h-screen w-full bg-cover bg-center flex justify-center items-center"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="absolute top-0 left-0 z-[-1] min-h-screen w-full bg-cover bg-center flex justify-center items-center bg-black opacity-30"></div>
    </div>
  );
};

export default CustomBackground;
