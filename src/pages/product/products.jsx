import { useEffect, useState } from "react";
import { Table, Button } from "antd";
import axios from "axios";
import { ProductService } from "../../services/productService";

export const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (page = 1, pageSize = 5) => {
    setLoading(true);
    try {
      const res = await ProductService.GetAllProductsByPagination(page, pageSize)
      setProducts(res.data.data);
      setPagination({ current: page, pageSize, total: res.data.total });
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(pagination.current, pagination.pageSize);
  }, []);

  const handleTableChange = (pagination) => {
    fetchProducts(pagination.current, pagination.pageSize);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: ["category", "name"],
      key: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (val) => `FCFA ${val.toFixed(2)}`
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Published",
      dataIndex: "isPublished",
      key: "isPublished",
      render: (val) => val ? "Yes" : "No"
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold dark:text-white">Products</h2>
      </div>
      <Table
        rowKey="id"
        loading={loading}
        dataSource={products}
        columns={columns}
        pagination={pagination}
        onChange={handleTableChange}
      />
    </div>
  );
};
