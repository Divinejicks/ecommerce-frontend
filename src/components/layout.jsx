import { Header } from "./Navs/header";
import { Sidebar } from "./Navs/sidebar";


export const Layout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-auto bg-gray-50 dark:bg-dark-900">
        <Header />

        <div className="p-4 flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};
