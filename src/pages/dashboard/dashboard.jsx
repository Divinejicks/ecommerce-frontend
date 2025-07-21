import { useEffect, useState } from "react";
import { Modal, Input, Button } from "antd";
import { toast } from "react-toastify";
import { useAuthentication } from "../../utils/provider";
import { AuthService } from "../../services/authService";
import { DashboardService } from "../../services/dashboardService";
import { RefreshTokenAccess } from "../../utils/refresh-token";

export const DashboardPage = () => {
    const [data, setData] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const { getCurrentUser, isAdmin, currentUser } = useAuthentication();

    useEffect(() => {
        const initialize = async () => {
            const token = localStorage.getItem("token_key");
            const refreshToken = localStorage.getItem("token_key_refresh");

            if (!token && refreshToken) {
                try {
                    await RefreshTokenAccess(); 
                    return;
                } catch (err) {
                    setShowLogin(true);
                    return;
                }
            }

            if (!token && !refreshToken) {
                setShowLogin(true);
                return;
            }

            fetchData();
        };

        initialize();
    }, [isAdmin, currentUser]);

    const fetchData = async () => {
        try {
            const res = isAdmin
                ? await DashboardService.GetDashboardData()
                : await DashboardService.GetUserDashboardData();
            setData(res);
        } catch (err) {
            toast.error("Error fetching data");
            setShowLogin(true);
        }
    };

    const handleLogin = async () => {
        const res = await AuthService.SignInAuth(credentials, getCurrentUser);
        if (res) {
            toast.success("Login successfully");
            setShowLogin(false);
            fetchData();
        } else {
            toast.error("Invalid credentials");
        }
    };

    return (
        <>
            <Modal
                title="Login Required"
                open={showLogin}
                closable={false}
                footer={null}
                centered
            >
                <div className="flex flex-col gap-4">
                    <Input
                        placeholder="Email"
                        value={credentials.email}
                        onChange={(e) =>
                            setCredentials({ ...credentials, email: e.target.value })
                        }
                    />
                    <Input.Password
                        placeholder="Password"
                        value={credentials.password}
                        onChange={(e) =>
                            setCredentials({ ...credentials, password: e.target.value })
                        }
                    />
                    <Button type="primary" onClick={handleLogin} block>
                        Login
                    </Button>
                </div>
            </Modal>

            {!showLogin && data && (
                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 dark:bg-dark-900 min-h-screen">
                    <Card title="Total Orders" value={data.totalOrders} />
                    {isAdmin && <Card title="Total Users" value={data.totalUsers} />}
                    <Card title="Total Products" value={data.totalProducts} />
                    <Card title="Top Products" value={data.topThreeProducts.length} />

                    <div className="col-span-full mt-6">
                        <h3 className="text-lg font-semibold dark:text-white mb-2">Top 3 Products</h3>
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {data.topThreeProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="p-4 bg-white dark:bg-dark-800 dark:text-white rounded shadow"
                                >
                                    <h4 className="font-bold">{product.name}</h4>
                                    <p className="text-sm">Sold: {product.quantitySold}</p>
                                    <p className="text-xs text-gray-500">{product.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

const Card = ({ title, value }) => (
    <div className="bg-white dark:bg-dark-800 dark:text-white p-4 rounded shadow text-center">
        <h4 className="text-sm text-gray-500 mb-1">{title}</h4>
        <p className="text-xl font-bold mt-10">{value}</p>
    </div>
);
