import { Spin } from "antd";
import React from "react";
import { Route, Routes } from "react-router-dom";

// Doing lazy loading here
const DashboardPage = React.lazy(async () => ({
    default: (await import("../../pages/dashboard/dashboard")).DashboardPage,
}));

const CreateProductPage = React.lazy(async () => ({
    default: (await import("../../pages/product/create-product")).CreateProductPage,
}));

const ProductsPage = React.lazy(async () => ({
    default: (await import("../../pages/product/products")).ProductsPage,
}));

const CategoryPage = React.lazy(async () => ({
    default: (await import("../../pages/category/category")).CategoryPage,
}));

const OrderPage = React.lazy(async () => ({
    default: (await import("../../pages/order/orders")).OrdersPage,
}));

const CreateOrderPage = React.lazy(async () => ({
    default: (await import("../../pages/order/create-order")).CreateOrderPage,
}));

export const AppRoutesPaths = {
    dashboard: "/",
    createProduct: "/products/create-product",
    products: "/products",
    category: "/categories",
    orders: "/orders",
    createOrder: "/orders/place-order"
};

const CenteredSpinner = () => (
    <div className="flex items-center justify-center h-screen">
        <Spin size="large" />
    </div>
);

export function AppRoute() {
    return (
        <React.Suspense fallback={<CenteredSpinner />}>
            <Routes>
                <Route path={AppRoutesPaths.dashboard} element={<DashboardPage />} />
                <Route path={AppRoutesPaths.createProduct} element={<CreateProductPage />} />
                <Route path={AppRoutesPaths.products} element={<ProductsPage />} />
                <Route path={AppRoutesPaths.category} element={<CategoryPage />} />
                <Route path={AppRoutesPaths.orders} element={<OrderPage />} />
                <Route path={AppRoutesPaths.createOrder} element={<CreateOrderPage />} />
            </Routes>
        </React.Suspense>
    );
}
