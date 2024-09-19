import { memo } from "react";
import "./index.css";

const Button = ({ text, onClick, children,className }) => {
  return (
    <div className={`${className} button-container`}>
      <button className="px-5 rounded-lg mb-5 py-2 bg-orange-400  text-sm font-semibold" onClick={onClick}>{text || children}</button>
    </div>
  );
};

export default memo(Button);
