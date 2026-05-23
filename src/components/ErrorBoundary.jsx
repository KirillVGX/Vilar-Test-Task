import { Button, Card, Flex, Result } from "antd";
import { Component } from "react";

class ErrorBoundary extends Component {
    state = {
        hasError: false,
    };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        if (import.meta.env.DEV) {
            console.error("Unhandled React error:", error, errorInfo);
        }
    }

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <Flex align="center" justify="center" style={{ minHeight: "100vh", padding: 24 }}>
                    <Card>
                        <Result
                            status="error"
                            title="Something went wrong"
                            subTitle="The dashboard hit an unexpected error. Reload the page to try again."
                            extra={
                                <Button type="primary" onClick={this.handleReload}>
                                    Reload page
                                </Button>
                            }
                        />
                    </Card>
                </Flex>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
