import type { ImgHTMLAttributes } from "react";
import logo from "../assets/images/logo.png";
import '../styles/components/Logo.scss'

const Logo = ({ width, ...otherProps}: Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'>) => <img className="logo" width={width || 173.76} src={logo} alt="Company Logo" {...otherProps} />;

export default Logo;
