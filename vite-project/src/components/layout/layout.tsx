import SideMenu from "../menu-lateral/menu-lateral";

const Layout = ({ children }) => (
    <div className="flex">
      <SideMenu />
      <div className="flex-1">{children}</div>
    </div>
  );
  export default Layout;