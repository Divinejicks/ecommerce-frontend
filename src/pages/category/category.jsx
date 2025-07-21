import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input } from "antd";
import { Plus } from "lucide-react";
import axios from "axios";
import { CategoryService } from "../../services/categoryService";
import { useAuthentication } from "../../utils/provider";
import { toast } from "react-toastify";

export const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 5, total: 0 });
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const { ensureLogin, currentUser, isAdmin } = useAuthentication()

  useEffect(() => {
    ensureLogin()
  }, [currentUser])

  const fetchCategories = async (page = 1, pageSize = 5) => {
    try {
      setLoading(true);
      const response = await CategoryService.GetAllCAtegoryByPagination(page, pageSize)

      const { data, total } = response.data;

      setCategories(data);
      setPagination({ current: page, pageSize, total });
    } catch (error) {
      toast.error("Failed to fetch categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories(pagination.current, pagination.pageSize);
  }, []);

  const handleTableChange = (pagination) => {
    fetchCategories(pagination.current, pagination.pageSize);
  };

  const handleAddCategory = async (values) => {
    try {
      await CategoryService.AddNewCategory(values)
      toast.success("Category added successfully");
      setIsModalOpen(false);
      form.resetFields();
      fetchCategories(pagination.current, pagination.pageSize);
    } catch (error) {
      toast.error("Failed to add category");
    }
  };

  const columns = [
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold dark:text-white">Categories</h1>
        {isAdmin && (
          <Button
            icon={<Plus />}
            type="default"
            onClick={() => setIsModalOpen(true)}
          >
            Add Category
          </Button>
        )}
      </div>

      <Table
        columns={columns}
        dataSource={categories}
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
        rowKey="id"
      />

      <Modal
        title="Add New Category"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAddCategory}>
          <Form.Item
            name="name"
            label="Category Name"
            rules={[{ required: true, toast: "Please enter the category name" }]}
          >
            <Input placeholder="e.g. Electronics" />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary" className="bg-blue-600 w-full">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
