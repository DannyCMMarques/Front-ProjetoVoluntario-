import { RiHomeHeartFill } from "react-icons/ri";

import { useContext, useEffect } from "react";
import { BiSolidCalendarHeart, BiSolidLogOut } from "react-icons/bi";
import { BsPersonHeart } from "react-icons/bs";
import { FaUserEdit } from "react-icons/fa";
import { MdVolunteerActivism } from "react-icons/md";
import MenuContents from "../../utils/content/MenuContents";
import { ThemeContext } from "./../../utils/context/ThemeContext/ThemeContext";

const SideMenu = () => {
  const { isOpen, toggle, setIsOpen, setToggle } = useContext(ThemeContext);

  const menuCardContent = MenuContents({
    home: <RiHomeHeartFill />,
    dados: <FaUserEdit />,
    voluntarios: <MdVolunteerActivism />,
    idosos: <BsPersonHeart />,
    atividades: <BiSolidCalendarHeart />,
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 760) {
        setIsOpen(true);
        setToggle(true);
      } else {
        setIsOpen(false);
        setToggle(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [setIsOpen, setToggle]);

  const toggleSideMenu = () => {
    if (window.innerWidth > 760) {
      setIsOpen(!isOpen);
    }
  };

  const handleNavegar = (href) => {
    if (href !== "/sair") {
      window.location.href = href;
    } else {
      localStorage.removeItem("access_token");
      window.location.href = "/";
    }
  };

  return (
    <div className="mr-7">
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-md transition-all duration-200 ${
          isOpen ? "w-20" : "w-44"
        }`}
      >
        <div
          className="flex justify-center items-center cursor-pointer mt-3"
          onClick={() => (!toggle ? toggleSideMenu() : undefined)}
        >
          <img
            className={isOpen ? "w-52" : "w-28"}
            src="imagens/logo.png"
            alt="Icon"
          />
        </div>
        <ul className="mt-4">
          {menuCardContent.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-center gap-4 p-2 hover:bg-gradient-to-r hover:from-teal-500 hover:to-blue-500 cursor-pointer transition-all"
            >
              <a
                onClick={() => handleNavegar(item.href)}
                className="flex items-center gap-4 w-full group"
              >
                <div
                  className={`flex items-center justify-around w-full gap-5 text-blue-500 text-2xl group-hover:text-white ${
                    isOpen ? "ml-0 text-[25px]" : " ml-3 text-2xl"
                  }`}
                >
                  <p>{item.icones}</p>
                  {!isOpen && (
                    <p className="text-gray-500 text-base font-medium w-full  group-hover:text-white">
                      {item.titulo}
                    </p>
                  )}
                </div>
              </a>
            </li>
          ))}
          <li className="fixed bottom-3 flex items-center justify-center gap-4 p-2 hover:bg-gradient-to-r hover:from-teal-500 hover:to-blue-500 cursor-pointer transition-all">
            <a
              onClick={() => handleNavegar("/sair")}
              className="flex items-center gap-4 w-full group"
            >
              <div
                className={`flex items-center justify-around w-full gap-5 text-blue-500 text-2xl group-hover:text-white ${
                  isOpen ? "ml-1 text-[30px]" : " ml-3 text-2xl"
                }`}
              >
                <p>
                  <BiSolidLogOut />
                </p>
                {!isOpen && (
                  <p className="text-gray-500 text-base font-medium w-full group-hover:text-white">
                    Log Out
                  </p>
                )}
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideMenu;
