import { FormOutlined, ReloadOutlined, SendOutlined } from "@ant-design/icons";
import {
    Button,
    Card,
    Descriptions,
    Flex,
    Form,
    Input,
    InputNumber,
    Select,
    Space,
    Typography,
} from "antd";
import { useEffect, useState } from "react";

const { Title, Text } = Typography;

const countryOptions = [
    { label: "United States", value: "United States" },
    { label: "United Kingdom", value: "United Kingdom" },
    { label: "Germany", value: "Germany" },
    { label: "France", value: "France" },
    { label: "Ukraine", value: "Ukraine" },
    { label: "Canada", value: "Canada" },
];

function Wizard() {
    const [form] = Form.useForm();
    const values = Form.useWatch([], form);
    const [canSubmit, setCanSubmit] = useState(false);
    const [submittedValues, setSubmittedValues] = useState(null);

    useEffect(() => {
        form.validateFields({ validateOnly: true })
            .then(() => setCanSubmit(true))
            .catch(() => setCanSubmit(false));
    }, [form, values]);

    function handleSubmit(nextValues) {
        setSubmittedValues(nextValues);
    }

    function handleRestart() {
        setSubmittedValues(null);
        setCanSubmit(false);
        form.resetFields();
    }

    return (
        <Space direction="vertical" size={16} style={{ width: "100%" }}>
            <div>
                <Title level={2}>User Details Wizard</Title>
                <Text type="secondary">Complete the form to generate a validated summary.</Text>
            </div>

            <Card>
                {submittedValues ? (
                    <Space direction="vertical" size={16} style={{ width: "100%" }}>
                        <Flex align="center" gap={10}>
                            <FormOutlined />
                            <Text strong>Submitted summary</Text>
                        </Flex>

                        <Descriptions bordered column={{ xs: 1, sm: 1, md: 2 }}>
                            <Descriptions.Item label="Name">
                                {submittedValues.name}
                            </Descriptions.Item>
                            <Descriptions.Item label="Email">
                                {submittedValues.email}
                            </Descriptions.Item>
                            <Descriptions.Item label="Country">
                                {submittedValues.country}
                            </Descriptions.Item>
                            <Descriptions.Item label="Age">
                                {submittedValues.age}
                            </Descriptions.Item>
                        </Descriptions>

                        <Button icon={<ReloadOutlined />} onClick={handleRestart}>
                            {"\u041f\u043e\u0447\u0430\u0442\u0438 \u0437\u0430\u043d\u043e\u0432\u043e"}
                        </Button>
                    </Space>
                ) : (
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                        requiredMark="optional"
                        validateTrigger={["onBlur", "onChange"]}
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[
                                { required: true, message: "Please enter your name." },
                                { min: 2, message: "Name must be at least 2 characters." },
                            ]}
                        >
                            <Input placeholder="Jane Smith" autoComplete="name" />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: "Please enter your email." },
                                { type: "email", message: "Please enter a valid email address." },
                            ]}
                        >
                            <Input placeholder="jane@example.com" autoComplete="email" />
                        </Form.Item>

                        <Form.Item
                            label="Country"
                            name="country"
                            rules={[{ required: true, message: "Please select your country." }]}
                        >
                            <Select
                                placeholder="Select country"
                                options={countryOptions}
                                showSearch
                                optionFilterProp="label"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Age"
                            name="age"
                            rules={[{ required: true, message: "Please enter your age." }]}
                        >
                            <InputNumber min={18} max={100} style={{ width: "100%" }} />
                        </Form.Item>

                        <Button
                            type="primary"
                            htmlType="submit"
                            icon={<SendOutlined />}
                            disabled={!canSubmit}
                        >
                            Submit
                        </Button>
                    </Form>
                )}
            </Card>
        </Space>
    );
}

export default Wizard;
