import { Moon, Sun, Plus, LogOut } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { Button, Dropdown, Menu } from "antd";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token_key");
    navigate("/");
    window.location.reload()
  };

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <div className="flex items-center gap-2" onClick={handleLogout}>
              <LogOut size={16} />
              Logout
            </div>
          ),
        },
      ]}
    />
  );

  return (
    <header className="flex items-center justify-between p-4 bg-white dark:bg-dark-800 shadow">
      <h2 className="text-lg font-bold dark:text-white">Dashboard</h2>

      <div className="flex items-center gap-4">
        <Button
          type="primary"
          icon={<Plus />}
          onClick={() => navigate("/products/create-product")}
          className="bg-blue-600 hover:bg-blue-700 border-none"
        >
          New Product
        </Button>

        <button
          className="text-white bg-dark-700 hover:bg-black/70 dark:hover:bg-white/10 p-2 rounded-lg transition-colors cursor-pointer"
          onClick={toggleTheme}
        >
          {theme === "light" ? <Sun size={25} /> : <Moon size={25} />}
        </button>

        <Dropdown overlay={menu} placement="bottomRight" trigger={["click"]}>
          <img
            src="https://www.gravatar.com/avatar?d=mp"
            alt="user"
            className="w-9 h-9 rounded-full cursor-pointer"
          />
        </Dropdown>
      </div>
    </header>
  );
};
