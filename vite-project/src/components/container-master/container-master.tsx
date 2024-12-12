import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../utils/context/ThemeContext/ThemeContext";

const ContainerMaster = ({ children}) => {
  const { isOpen } = useContext(ThemeContext);
  const [containerStyle, setContainerStyle] = useState({
    marginLeft: "250px",
    marginRight:"250px"
  });

  useEffect(() => {
    const sideMenuWidth = isOpen ? 90 : 250;
    const realSideMenuWith = isOpen ? 64 :175
    setContainerStyle({
      marginLeft: `${sideMenuWidth}px`,
      marginRight:`${sideMenuWidth - realSideMenuWith}px`
    });
  }, [isOpen]);

  return (
    <div
      className="flex-1 w-auto mt-16   transition-all duration-300"
      style={containerStyle}
    >
      {children}
    </div>
  );
};

export default ContainerMaster;
