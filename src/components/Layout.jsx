/* eslint-disable react/prop-types */
import Footer from "./Footer";
import Nav from "./Nav";
import SideBar from "./SideBar";

const Layout = ({ role = localStorage.getItem("role"), main, page }) => {
  return (
    <div className="layout">
      <header className="flex">{<Nav role={role} page={page} />}</header>
      <section className="midle-section flex h-screen">
        <aside>{<SideBar role={role} />}</aside>
        <main>{main}</main>
      </section>
      <footer>{<Footer />}</footer>
    </div>
  );
};

export default Layout;
