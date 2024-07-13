import { useTheme } from "@/context/ThemeContext";
import { MoonLoader } from "react-spinners";

const Loader = () => {
  const { theme } = useTheme();
  return (
    <div className="fixed top-0 left-0 w-full h-screen mt-10 flex justify-center items-center bg-slate-200 dark:bg-gray-900">
      <MoonLoader color={theme === "dark" ? "#fff" : "#000"} />
    </div>
  );
};

export default Loader;
