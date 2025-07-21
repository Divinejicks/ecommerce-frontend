import { useEffect, useState } from "react";
import { Table, Pagination, Tag, Button } from "antd";
import { OrderService } from "../../services/orderService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AppRoutesPaths } from "../../components/routes/app-routes";
import { useAuthentication } from "../../utils/provider";

export const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const { isAdmin } = useAuthentication()

  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      if (isAdmin) {
        const res = await OrderService.GetAllOrders(page, pageSize);
        setOrders(res.data.data);
        setTotal(res.total);
      } else {
        const res = await OrderService.GetMyOrders(page, pageSize);
        setOrders(res.data.data);
        setTotal(res.total);
      }
    } catch (err) {
      toast.error("Failed to fetch orders");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page]);

  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amount) => `FCFA ${amount.toFixed(2)}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "PENDING" ? "orange" : "green"}>{status}</Tag>
      ),
    },
  ];

  return (
    <div className="p-6 bg-white dark:bg-dark-700 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold dark:text-white">My Orders</h2>
        <Button type="default" onClick={() => navigate(AppRoutesPaths.createOrder)}>
          Place an Order
        </Button>
      </div>

      <Table
        dataSource={orders}
        columns={columns}
        pagination={false}
        rowKey="id"
        bordered
        className="dark:text-white"
        expandable={{
          expandedRowRender: (order) => (
            <div className="pl-4">
              <h4 className="font-semibold mb-2">Order Items:</h4>
              <Table
                dataSource={order.orderItems || []}
                pagination={false}
                rowKey={(item) => item.productId}
                size="small"
                columns={[
                  {
                    title: "Product ID",
                    dataIndex: "productId",
                    key: "productId",
                  },
                  {
                    title: "Quantity",
                    dataIndex: "quantity",
                    key: "quantity",
                  },
                  {
                    title: "Price",
                    dataIndex: "price",
                    key: "price",
                    render: (price) => `FCFA ${price.toFixed(2)}`,
                  },
                ]}
              />
            </div>
          ),
        }}
      />

      <div className="mt-4">
        <Pagination
          current={page}
          pageSize={pageSize}
          total={total}
          onChange={(page) => setPage(page)}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};
