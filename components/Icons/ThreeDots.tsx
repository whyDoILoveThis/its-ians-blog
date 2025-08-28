import { BsThreeDotsVertical } from "react-icons/bs";

interface Props {
  size?: number;
}

const ThreeDots = ({ size = 20 }: Props) => {
  return <BsThreeDotsVertical size={size} />;
};

export default ThreeDots;
