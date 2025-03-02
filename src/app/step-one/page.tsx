'use client';

import React, { useEffect } from 'react';
import { 
  Form, 
  Input, 
  Button, 
  Card, 
  DatePicker, 
  Space,
  Row,
  Col,
  notification
} from 'antd';
import { CalendarOutlined , EnvironmentOutlined, ArrowRightOutlined} from '@ant-design/icons';
import dayjs from 'dayjs';
import PhoneNumberSelector from '../../components/phoneTexts';
import DepartmentCountry from '../../components/deparmentCountry';
import MunicipalitiesCountry from '../../components/municipalitiesCountry';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import Navbar from '../../components/Navbar';
import styles from '../styles/step-one.module.css';
import { useRouter } from 'next/navigation';
import { ROUTES } from '../../routes';
import { stepsApi } from '../../services/api';
import AuthGuard from '../../components/AuthGuard';

const StepOne: React.FC = () => {

  const [form] = Form.useForm();
  const router = useRouter();

  useEffect(() => {
    // Get saved stepOne data
    const savedData = localStorage.getItem('stepOneData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      form.setFieldsValue(parsedData);
    }
  }, [form]);

  const onFinish = async (values: any) => {
    try {
      // Save form data before submitting
      localStorage.setItem('stepOneData', JSON.stringify(values));
      const response = await stepsApi.submitStepOne(values);
      if (response && response.id) {
        router.push(`${ROUTES.STEP_TWO}?stepOneId=${response.id}`);
      }
    } catch (error) {
      console.error('Error:', error);
      notification.error({
        message: 'Error',
        description: 'Hubo un error al guardar los datos'
      });
    }
  };
  
  dayjs.extend(customParseFormat);

  const dateFormat = 'YYYY-MM-DD';
  
  return (
    <AuthGuard>
      <div>
        
        <Navbar />
        <div style={{ paddingTop: '78px' }}>
  </div>
        <div className={styles.stepOneContainer}>
          <h3 className={styles.title}>
            Crea una orden
          </h3>
          <h5  className={styles.subtitle}>
            Dale una ventaja competitiva a tu negocio con entregas <strong>el mismo día</strong> (Área Metropolitana) <strong>y el día siguiente</strong> a nivel nacional.
          </h5>
          
          <Card className={styles.cardContainer}>
            <Form
              form={form}
              name="basic"
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off"
            >
              {/* Primera fila: Dirección de recolección y Fecha de recolección */}
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Dirección de recolección"
                    name="directionRecolection"
                    rules={[{ 
                      required: true, 
                      message: 'Por favor ingresa la dirección de recolección' 
                    }]}
                  >
                    <Input 
                      placeholder="Ej: Colonia Las Magnolias Calle ruta militar #1, San Miguel, San Miguel."
                      className={styles.input}                
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    label="Fecha de recolección"
                    name="dateRecolection"
                    rules={[{ 
                      required: true, 
                      message: 'Por favor ingresa la fecha de recolección' 
                    }]}
                  >
                    <Space.Compact className={styles.spaceContainer}>
                      <span className={styles.spanContainer}>
                        <CalendarOutlined style={{ fontSize: '28px' }}/>
                      </span>

                      <DatePicker
                        placeholder="Selecciona una fecha"
                        format="YYYY-MM-DD"
                        style={{ width: '100%', height: '50px' }}
                        onChange={(date) => {
                          if (date) {
                            form.setFieldValue('dateRecolection', date.format('YYYY-MM-DD'));
                          }
                        }}
                      />
                    </Space.Compact>
                  </Form.Item>
                </Col>
              </Row>

              {/* Segunda fila: Nombres, Apellidos, Correo */}
              <Row gutter={16}>
                <Col xs={24} md={8}>
                  <Form.Item
                    label="Nombres"
                    name="nameClient"
                    rules={[{ required: true, message: 'Por favor ingresa tu nombre' }]}
                  >
                    <Input 
                      placeholder="Ej: Gabriel Renee"
                      style={{ height: '50px' }} 
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item
                    label="Apellidos"
                    name="lastNameClient"
                    rules={[{ required: true, message: 'Por favor ingresa tu apellido' }]}
                  >
                    <Input 
                      placeholder="Ej: Diaz Lopez"
                      className={styles.input}                
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item
                    label="Correo Electrónico"
                    name="email"
                    rules={[
                      { 
                        required: true, 
                        message: 'Por favor ingresa el correo electrónico' 
                      },
                      {
                        type: 'email',
                        message: 'Por favor ingresa un correo electrónico válido'
                      }
                    ]}
                  >
                    <Input 
                      placeholder="Ej: gabbydiaz@gmail.com"
                      className={styles.input}                
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={18}>
                <Col xs={24} md={10}>
                  <Form.Item
                    label="Teléfono"
          
                    rules={[{ 
                      required: false, 
                      message: 'Por favor ingresa el número de teléfono' 
                    }]}
                  >
                    <PhoneNumberSelector />
                  </Form.Item>
                </Col>
                <Col xs={24} md={14}>
                  <Form.Item
                    label="Dirección del destinatario"
                    name="directionDestinario"
                    rules={[{ 
                      required: true, 
                      message: 'Por favor ingresa la dirección del destinatario' 
                    }]}
                    style={{ marginLeft: '-8px' }}
                  >
                    <Space style={{ width: '100%' }}>
                     
                     
                    <EnvironmentOutlined  style={{ fontSize: '28px' }}/>
                   
                      <Input 
                        placeholder="Ej: Colonia Las Magnolias Calle ruta militar #1, San Miguel, San Miguel."
                        className={styles.inputDestiny}
                      />
                    </Space>
                  </Form.Item>
                </Col>
              </Row>
              
              <Row gutter={16}>
                <Col xs={24} md={8}>
                  <Form.Item
                    label="Departamento"    
                    name="department"
                    rules={[{ required: true, message: 'Por favor ingresa tu departamento' }]}
                  >
                    <DepartmentCountry />
                  </Form.Item>
                </Col>
                
                <Col xs={24} md={8}>
                  <Form.Item
                    label="Municipio"    
                    name="municipalities"
                    rules={[{ required: true, message: 'Por favor ingresa tu municipio' }]}
                  >
                    <MunicipalitiesCountry />
                  </Form.Item>
                </Col>
                
                <Col xs={24} md={8}>
                  <Form.Item
                    label="Punto de referencia"    
                    name="referencePoint"
                    rules={[{ required: true, message: 'Por favor ingresa un punto de referencia' }]}
                  >
                    <Input 
                      placeholder="Ej: Cerca de redondel Arbol de la Paz"
                      className={styles.input}                
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                    label="Indicaciones"    
                    name="indications"
                    rules={[{ required: false }]}
                  >
               <Input 
                      placeholder="Ej: Llamar antes de entregar"
                      className={styles.input}                
                  />
                  </Form.Item>
              {/* Botón de enviar, si lo necesitas */}
              <Form.Item style={{ textAlign: 'right' }}>
                <Button 
                  type="primary" 
                  htmlType="submit"
                 className={styles.submitButton}
                >
        Siguiente
          
                </Button>
              </Form.Item>
            </Form>
          </Card>
          <div style={{ paddingTop: '94px' }}>
    </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default StepOne;
