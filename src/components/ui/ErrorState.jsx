import { Alert } from "antd";

function ErrorState({ message = "Something went wrong", description, type = "warning", ...props }) {
    return <Alert type={type} showIcon message={message} description={description} {...props} />;
}

export default ErrorState;
