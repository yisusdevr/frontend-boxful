'use client';

import React, { useState } from 'react';
import { Form, Input, Button, notification, Card } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { authApi } from '../../services/api';
import { ROUTES } from '../../routes';
import styles from '../styles/login.module.css';


interface RegisterForm {
  email: string;
  password: string;
  name: string;
}

const Register: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = async (values: RegisterForm) => {
    try {
      setLoading(true);
      await authApi.register(values);
      notification.success({
        message: 'Success',
        description: 'Registration successful'
      });
      router.push('/');
    } catch (error: any) {
      notification.error({
        message: 'Error',
        description: error.response?.data?.message || 'Registration failed'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
 
    <div className={styles.loginContainer}>
      <Card className={styles.cardContainer}>
        <h1 className={styles.title}>Registro</h1>
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Ingresa tu nombre' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Name"
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Ingresa tu correo' },
              { type: 'email', message: 'Ingresa un correo valido' }
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Ingresa tu contraseña' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Register
            </Button>
          </Form.Item>
          <div style={{ textAlign: 'center' }}>
            ¿Ya tienes una cuenta?{' '}
            <a onClick={() => router.push(ROUTES.HOME)}>
              Inicia sesión
            </a>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Register;