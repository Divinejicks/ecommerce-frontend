import { useEffect, useState } from "react";
import { Form, InputNumber, Button, Select, Space, Divider } from "antd";
import { ProductService } from "../../services/productService";
import { OrderService } from "../../services/orderService";
import { useNavigate } from "react-router-dom";
import { AppRoutesPaths } from "../../components/routes/app-routes";
import { toast } from "react-toastify";

export const CreateOrderPage = () => {
  const [products, setProducts] = useState([]);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await ProductService.GetAllProducts();
      setProducts(res.data);
    } catch (err) {
      toast.error("Failed to load products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const calculateTotalAmount = (items) => {
    return items.reduce((acc, item) => {
      const product = products.find((p) => p.id === item.productId);
      return acc + (product?.price || 0) * item.quantity;
    }, 0);
  };

  const onFinish = async (values) => {
    const items = values.items.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return {
        ...item,
        price: product?.price || 0,
      };
    });

    const totalAmount = calculateTotalAmount(items);

    try {
      await OrderService.AddNewOrder({ items, totalAmount });
      toast.success("Order placed successfully");
      navigate(AppRoutesPaths.orders);
    } catch (err) {
      toast.error("Failed to place order");
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-dark-700 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Place a New Order</h2>

      <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{ items: [{}] }}>
        <Form.List name="items">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }, index) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 16 }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "productId"]}
                    label={`Product ${index + 1}`}
                    rules={[{ required: true, message: "Select a product" }]}
                  >
                    <Select placeholder="Select product" style={{ width: 200 }}>
                      {products.map((p) => (
                        <Select.Option key={p.id} value={p.id}>
                          {p.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "quantity"]}
                    label="Quantity"
                    rules={[{ required: true, message: "Enter quantity" }]}
                  >
                    <InputNumber min={1} style={{ width: 120 }} />
                  </Form.Item>

                  <Button type="link" danger onClick={() => remove(name)}>
                    Remove
                  </Button>
                </Space>
              ))}

              <Form.Item>
                <Button type="dashed" onClick={() => add()} block>
                  + Add Another Product
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Divider />

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Place Order
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
