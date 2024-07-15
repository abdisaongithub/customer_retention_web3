import { Outlet } from "react-router-dom";
import Footer from "./footer";
import Header from "./header";
import { useLocation } from "react-router-dom";

const Layout = (props) => {
  const location = useLocation();
  const { hash, pathname, search } = location;

  return (
    <>
      <div className="bg-gypsum overflow-hidden flex flex-col min-h-screen">
        {pathname.includes("profile") ? <></> : <Header />}

        <div className="py-0 max-w-7xl mx-0 space-y-8 sm:px-6 lg:px-8">
          <Outlet />
        </div>
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default Layout;
