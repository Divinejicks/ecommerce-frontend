import { useEffect, useState } from "react";
import { Form, Input, InputNumber, Button, Select, Switch } from "antd";
import { CategoryService } from "../../services/categoryService";
import { toast } from "react-toastify";
import { ProductService } from "../../services/productService";
import { useNavigate } from "react-router-dom";
import { AppRoutesPaths } from "../../components/routes/app-routes";

const { TextArea } = Input;

export const CreateProductPage = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()

    const fetchCategories = async () => {
        try {
            const res = await CategoryService.GetAllCategories();
            setCategories(res.data);
        } catch (err) {
            toast.error("Failed to load categories");
            console.error(err);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            await ProductService.AddNewProduct(values);
            toast.success("Product created successfully");
            navigate(AppRoutesPaths.products)
        } catch (err) {
            toast.error("Failed to create product");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-dark-700 rounded shadow">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">Add New Product</h2>

            <Form layout="vertical" onFinish={onFinish}>
                <div className="mb-4">
                    <label className="block mb-1 font-medium text-sm text-gray-700 dark:text-white">
                        Product Name
                    </label>
                    <Form.Item name="name" rules={[{ required: true, message: "Please enter product name" }]}>
                        <Input placeholder="Enter product name" />
                    </Form.Item>
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium text-sm text-gray-700 dark:text-white">
                        Description
                    </label>
                    <Form.Item name="description">
                        <TextArea rows={4} placeholder="Enter product description" />
                    </Form.Item>
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium text-sm text-gray-700 dark:text-white">Price</label>
                    <Form.Item
                        name="price"
                        rules={[{ required: true, message: "Please enter product price" }]}
                    >
                        <InputNumber prefix="FCFA" min={0} style={{ width: "100%" }} />
                    </Form.Item>
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium text-sm text-gray-700 dark:text-white">Stock</label>
                    <Form.Item
                        name="stock"
                        rules={[{ required: true, message: "Please enter stock quantity" }]}
                    >
                        <InputNumber min={0} style={{ width: "100%" }} />
                    </Form.Item>
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium text-sm text-gray-700 dark:text-white">Category</label>
                    <Form.Item
                        name="categoryId"
                        rules={[{ required: true, message: "Please select a category" }]}
                    >
                        <Select placeholder="Select category">
                            {categories.map((cat) => (
                                <Select.Option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium text-sm text-gray-700 dark:text-white">Published</label>
                    <Form.Item name="isPublished" valuePropName="checked" initialValue={false}>
                        <Switch />
                    </Form.Item>
                </div>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Create Product
                    </Button>
                </Form.Item>
            </Form>

        </div>
    );
};
