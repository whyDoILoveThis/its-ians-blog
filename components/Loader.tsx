import { useTheme } from "@/context/ThemeContext";
import { MoonLoader } from "react-spinners";

const Loader = () => {
  const { theme } = useTheme();
  return (
    <div className=" h-screen flex justify-center items-center">
      <MoonLoader color={theme === "dark" ? "#fff" : "#000"} />
    </div>
  );
};

export default Loader;
