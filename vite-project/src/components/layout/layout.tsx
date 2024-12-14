import { Outlet } from "react-router-dom";
import Box from "../box/box";
import ContainerMaster from "../container-master/container-master";
import SideMenu from "../menu-lateral/menu-lateral";

const Layout = () => {
  return (
    <div className="flex h-screen">
      <SideMenu />
      <ContainerMaster>
        <Box>
          <Outlet />
        </Box>
      </ContainerMaster>
    </div>
  );
};

export default Layout;