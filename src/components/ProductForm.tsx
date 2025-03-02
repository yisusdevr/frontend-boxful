import React, { useState } from 'react';
import { Form, Input, Button, Card, Row, Col, Space, notification } from 'antd';
import { 
  CodeSandboxOutlined, 
  DeleteOutlined, 
  ArrowRightOutlined, 
  ArrowLeftOutlined,
  PlusOutlined 
} from '@ant-design/icons';
import { useRouter, useSearchParams } from 'next/navigation';
import { stepsApi } from '../services/api';
import { ROUTES } from '../routes';
import styles from '../app/styles/productForm.module.css';

interface Product {
  id: number;
  length: string;
  height: string;
  width: string;
  weight: string;
  content: string;
}

const ProductForm: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleAddProduct = () => {
    form.validateFields().then(values => {
      const newProduct = {
        id: Date.now(),
        length: values.length || '',
        height: values.height || '',
        width: values.width || '',
        weight: values.weight || '',
        content: values.content || ''
      };
      setProducts([...products, newProduct]);
      form.resetFields();
    });
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const handleProductChange = (id: number, field: keyof Product, value: string) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, [field]: value } : product
    ));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const stepOneId = searchParams.get('stepOneId');
      
      if (!stepOneId) {
        throw new Error('No stepOneId provided');
      }
  
      if (products.length === 0) {
        notification.error({
          message: 'Error',
          description: 'Please add at least one product'
        });
        return;
      }
  
      const formattedProducts = products.map(({ id, ...rest }) => rest);
      const response = await stepsApi.submitStepTwo({
        products: formattedProducts
      }, stepOneId);
  
      notification.success({
        message: 'Success',
        description: 'Products saved successfully'
      });
  

      localStorage.removeItem('stepOneData');
      localStorage.removeItem('products');
  
      setTimeout(() => {
        router.push(ROUTES.STEP_ONE);
      }, 1500);
  
    } catch (error) {
      console.error('Submit error:', error);
      notification.error({
        message: 'Error',
        description: 'Failed to save products'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    localStorage.setItem('products', JSON.stringify(products));
    router.push(ROUTES.STEP_ONE);
  };

  return (
    <div>
      <Form.Item className={styles.inputForm}>
        <strong style={{ fontFamily: 'var(--font-albert-sans)' }}>Agrega tus bultos</strong>
      </Form.Item>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Row gutter={16} style={{ marginBottom: '16px' }}>
          <Col xs={24} md={8}>
            <Space.Compact className={styles.spaceContainer}>
              <CodeSandboxOutlined style={{ paddingRight: '10%', fontSize: '30px', color: 'gray' }} />
              <Form.Item
                label="Largo"
                name="length"
                className={styles.inputInline}
              >
                <Input placeholder="cm" suffix="cm" className={styles.inputItem} />
              </Form.Item>
              <Form.Item
                label="Alto"
                name="height"
                className={styles.inputInline}
              >
                <Input placeholder="cm" suffix="cm" className={styles.inputItem} />
              </Form.Item>
              <Form.Item
                label="Ancho"
                name="width"
                className={styles.inputInline}
              >
                <Input placeholder="cm" suffix="cm" className={styles.inputItem} />
              </Form.Item>
            </Space.Compact>
          </Col>

          <Col xs={24} md={4}>
            <Form.Item
              label="Peso"
              name="weight"
            >
              <Input placeholder="Ej: 2 lb" className={styles.inputItem} />
            </Form.Item>
          </Col>

          <Col xs={24} md={4}>
            <Form.Item
              label="Contenido"
              name="content"
              className={styles.containInput}
            >
              <Input
                placeholder="Descripción del contenido"
                className={styles.descriptionInput}
              />
            </Form.Item>
          </Col>
        </Row>

        <div className={styles.divButton}>
          <Button
            type="dashed"
            onClick={handleAddProduct}
            className={styles.addButton}
            icon={<PlusOutlined />}
            style={{ marginBottom: 16 }}
          >
            Agregar producto
          </Button>
        </div>

      
      </Form>

      <Form.Item className={styles.bultosLabel}>
        <strong style={{ fontFamily: 'var(--font-albert-sans)' }}>Agrega tus bultos</strong>
      </Form.Item>
      {products.length > 0 && (
        <Card style={{ marginTop: '24px' }}>
          {products.map((product) => (
            <div key={product.id} className={styles.divProducts}>
              <Row gutter={8}>
                <Col xs={24} md={4}>
                  <div>
                    <label style={{ fontFamily: 'var(--font-albert-sans)' }}>Peso</label>
                    <Input
                      value={product.weight}
                      onChange={(e) => handleProductChange(product.id, 'weight', e.target.value)}
                      style={{ height: '50px' }}
                    />
                  </div>
                </Col>

                <Col xs={24} md={8}>
                  <div className={styles.divContainer}>
                    <label style={{ fontFamily: 'var(--font-albert-sans)' }}>Contenido</label>
                    <Input
                      value={product.content}
                      onChange={(e) => handleProductChange(product.id, 'content', e.target.value)}
                      className={styles.inputContainer}
                    />
                  </div>
                </Col>

                <Col xs={24} md={8} offset={4}>
                  <Space.Compact style={{ width: '100%' }}>
                    <CodeSandboxOutlined style={{
                      paddingRight: '5%', fontSize: '30px', color: 'gray'
                    }} />
                    <div className={styles.inputInline}>
                      <label style={{ fontFamily: 'var(--font-albert-sans)' }}>Largo</label>
                      <Input
                        value={`${product.length} cm`}
                        onChange={(e) => handleProductChange(product.id, 'length', e.target.value.replace(' cm', ''))}
                        className={styles.inputProducts}
                      />
                    </div>
                    <div className={styles.inputInline}>
                      <label style={{ fontFamily: 'var(--font-albert-sans)' }}>Alto</label>
                      <Input
                        value={`${product.height} cm`}
                        onChange={(e) => handleProductChange(product.id, 'height', e.target.value.replace(' cm', ''))}
                        className={styles.inputProducts}
                      />
                    </div>
                    <div className={styles.inputInline}>
                      <label style={{ fontFamily: 'var(--font-albert-sans)' }}>Ancho</label>
                      <Input
                        value={`${product.width} cm`}
                        onChange={(e) => handleProductChange(product.id, 'width', e.target.value.replace(' cm', ''))}
                        className={styles.inputProducts}
                      />
                      <DeleteOutlined
                        onClick={() => handleDeleteProduct(product.id)}
                        className={styles.deleteButton}
                      />
                    </div>
                  </Space.Compact>
                </Col>
              </Row>
            </div>
          ))}
        </Card>
      )}
       <div className={styles.buttonsContainer}>
  <Button 

  className={styles.backButton}
  onClick={handleBack}

  >
    <ArrowLeftOutlined /> Regresar
  </Button>

  <Button 
      onClick={handleSubmit}
className={styles.sendButton}
  >
    Enviar <ArrowRightOutlined />
  </Button>
  
</div>
      <div style={{ paddingTop: '94px' }}>

      </div>
    </div>
  );
};

export default ProductForm;