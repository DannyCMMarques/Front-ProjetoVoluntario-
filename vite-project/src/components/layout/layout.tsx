import Box from "../box/box";
import ContainerMaster from "../container-master/container-master";
import SideMenu from "../menu-lateral/menu-lateral";

const Layout = ({ children }) => {
    return (
      <div className="flex h-screen">
        <SideMenu />
        <ContainerMaster>
          <Box>{children}</Box>
        </ContainerMaster>
      </div>
    );
  };
  export default Layout;