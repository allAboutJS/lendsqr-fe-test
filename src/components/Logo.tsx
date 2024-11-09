import type { ImgHTMLAttributes } from "react";
import logo from "../assets/images/logo.png";

const Logo = ({ width, ...otherProps}: Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'>) => <img width={width || 173.76} src={logo} alt="Company Logo" {...otherProps} />;

export default Logo;
