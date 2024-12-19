import { useEffect, useState } from "react";
import { BsCalendarHeartFill, BsPersonHeart } from "react-icons/bs";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { RiHomeHeartFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../loading";
import MenuContents from "./../../utils/mocks/menu/MenuContents";

const SideMenu = () => {
  const [isExpanded, setIsExpanded] = useState(window.innerWidth > 768);
  const [selectedMenu, setSelectedMenu] = useState("");
  const [selectedSubmenu, setSelectedSubmenu] = useState("");
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [shouldRenderText, setShouldRenderText] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const menuItems = MenuContents({
    home: <RiHomeHeartFill />,
    users: <BsPersonHeart />,
    calendar: <BsCalendarHeartFill />,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (isExpanded) {
      const timeout = setTimeout(() => setShouldRenderText(true), 100);
      if (selectedMenu) {
        setIsSubmenuOpen(true);
      }
      return () => clearTimeout(timeout);
    } else {
      setShouldRenderText(false);
      setIsSubmenuOpen(false);
    }
  }, [isExpanded, selectedMenu]);

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };

  const handleMenuClick = (menuId) => {
    if (selectedMenu === menuId) {
      setIsSubmenuOpen(!isSubmenuOpen);
    } else {
      setSelectedMenu(menuId);
      setIsSubmenuOpen(true);
      setSelectedSubmenu("");
    }
  };
  const handleSubmenuClick = (submenuId) => {
    setSelectedSubmenu(submenuId);
     handleNavigate(submenuId, true)
  };
  const handleNavigate = (link, isSubmenu = false) => {
    navigate(link);

    if (!isSubmenu) {
      setIsSubmenuOpen(false);
      setSelectedSubmenu("");
    }
  };
  const handleLogout = () => {
    setIsLoading(true)
    localStorage.removeItem("access_token");
    setTimeout(() => {
      setIsLoading(false)
      navigate("/login");
    }, 1000)
  };

  return (
    <div className="flex h-screen sticky bottom-8">
            {isLoading && (
        <LoadingComponent />
      )}
      <div
        className={`bg-white border-r border-gray-300 transition-all duration-300 relative ${
          isExpanded ? "w-48" : "w-28"
        } sticky  bottom-0 h-screen`}
      >
        <button
          onClick={toggleMenu}
          className="absolute top-4 right-[-12px] bg-[#3a4dff] text-white text-xs font-bold w-5 h-5 flex justify-center items-center rounded-full shadow-md"
        >
          {isExpanded ? (
            <span className="text-[12px]">
              <MdChevronLeft />
            </span>
          ) : (
            <span className="text-[12px]">
              <MdChevronRight />
            </span>
          )}
        </button>

        <div
          className={`flex items-center justify-center mt-8 transition-all duration-300`}
        >
          <img
            src="imagens/logo.png"
            alt="logo"
            className={`${isExpanded ? "w-[100px]" : "w-[80px]"}`}
          />
        </div>

        <div className="mt-10">
          {menuItems.map((menu) => (
            <div key={menu.id}>
              <div
                className={`flex items-center py-2 px-4 gap-3 cursor-pointer hover:bg-gray relative ${
                  selectedMenu === menu.id ? "bg-white" : ""
                } ${isExpanded ? "justify-start" : "justify-center"}`}
                onClick={() => handleMenuClick(menu.id)}
              >
                <span
                  onClick={
                    !isExpanded ? () => handleNavigate(menu.id) : undefined
                  }
                  className={`flex items-center text-[#1225d8] ${
                    isExpanded ? "text-[20px]" : "text-[25px]"
                  }`}
                >
                  {menu.icon}
                </span>

                {shouldRenderText && (
                  <p
                    className={`text-gray-700 transform transition-all duration-100 ${
                      isExpanded
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-[-10px]"
                    } ${
                      selectedMenu === menu.id ? "font-bold" : "font-medium"
                    }`}
                    onClick={
                      menu.id !== "usuarios"
                        ? () => handleNavigate(menu.id)
                        : undefined
                    }
                  >
                    {menu.label}
                  </p>
                )}
                {selectedMenu === menu.id && (
                  <span
                    className={`absolute right-0 bg-blue-700 w-[3px] animate-grow rounded-full`}
                  ></span>
                )}
              </div>

              {menu.submenus && selectedMenu === menu.id && (
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    isSubmenuOpen
                      ? "max-h-40"
                      : "max-h-0"
                  }`}
                >
                  <div className={
                    isExpanded ? "pl-14" :"p-2"
                  } >
                    {menu.submenus.map((submenu) => (
                      <div
                        key={submenu.id}
                        className={`flex items-center py-2 px-1 text-[14px] cursor-pointer hover:bg-gray-50 transform transition-all duration-0                        ${
                          selectedSubmenu === submenu.id
                            ? "text-[#9a89ff]"
                            : "text-gray-700"
                        }`}
                        onClick={() => handleSubmenuClick(submenu.id, true)}
                      >
                        <span className="text-[14px]">
                          <MdChevronRight />
                        </span>
                        <span>
                          {submenu.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div
          className={`absolute bottom-4 w-full flex items-center cursor-pointer ${
            isExpanded ? "px-4 gap-3" : "justify-center"
          }`}
        >
          {!isExpanded && (
            <span
              className={`material-icons items-center text-[#1225d8] ${
                isExpanded ? "text-[20px]" : "text-[25px]"
              }`}
              onClick={handleLogout}
            >
              <span className="material-symbols-outlined">logout</span>
            </span>
          )}
          {isExpanded && (
            <span
              onClick={handleLogout}
              className={`material-icons items-center text-[#1225d8] ${
                isExpanded ? "text-[20px]" : "text-[25px]"
              }`}
            >
              <span className="material-symbols-outlined">logout</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
