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

export const AppRoutesPaths = {
    dashboard: "/",
    createProduct: "/create-product",
    products: "/products"
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
            </Routes>
        </React.Suspense>
    );
}
