import React, { useState } from 'react';
import { Form, Input, Button, notification, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { authApi } from '../services/api';
import styles from '../app/styles/login.module.css';
import { ROUTES } from '../routes';

interface LoginForm {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = async (values: LoginForm) => {
    try {
      setLoading(true);
      const response = await authApi.login(values);

      if (response.access_token) {
        // Store token in both localStorage and cookie
        localStorage.setItem('token', response.access_token);
        document.cookie = `token=${response.access_token}; path=/`;

        notification.success({
          message: 'Success',
          description: 'Login successful'
        });
        router.push(ROUTES.STEP_ONE);
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Invalid credentials'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <Card className={styles.cardContainer}>
        <h1 className={styles.title}>Login</h1>
        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Email"
              className={styles.formInput}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              className={styles.formInput}
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit"
              loading={loading}
              block
              className={styles.submitButton}
            >
              Log in
            </Button>
          </Form.Item>
          <div style={{ textAlign: 'center' }}>
            ¿No tienes una cuenta?{' '}
            <a onClick={() => router.push(ROUTES.REGISTER)}>
              Registrate
            </a>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;