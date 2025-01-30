import { IImageProps } from "./CustomImage.props";

const CustomImage: React.FC<IImageProps> = ({ path, alt }) => {
  return <img src={path} alt={alt} />;
};

export default CustomImage;
