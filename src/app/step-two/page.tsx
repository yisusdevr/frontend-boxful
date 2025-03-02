'use client';
import React from 'react';
import { Form} from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import { ROUTES } from '../../routes';
import Navbar from '@/components/Navbar';
import styles from '../styles/step-two.module.css';
import ProductForm from '@/components/ProductForm';
import { stepsApi } from '@/services/api';
import AuthGuard from '../../components/AuthGuard';

const StepTwo: React.FC = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const handleBack = () => {
    router.push(ROUTES.STEP_ONE);
  };

  const onFinish = async (values: any) => {
    try {
      const stepOneId = searchParams.get('stepOneId');
      if (!stepOneId) {
        throw new Error('No stepOneId provided');
      }
      await stepsApi.submitStepTwo(values, stepOneId);
      // Add success notification here
    } catch (error) {
      console.error('Error:', error);
      // Add error notification here
    }
  };

  return (
    <AuthGuard>
      <html lang="en" >
          <div className={styles.mainDiv}>
          <Navbar />
          <main style={{ paddingTop: '94px' }}>
          <h3 className={styles.mainTitle}>
          Crea una orden
        </h3>
        <h5 className={styles.mainSubtitle}>
          Dale una ventaja competitiva a tu negocio con entregas <strong>el mismo día</strong> (Área Metropolitana) <strong>y el día siguiente</strong> a nivel nacional.
        </h5>
        <ProductForm />
      
  <div style={{ paddingTop: '94px' }}>
  </div>
          </main>
          
          </div>
        <body style={{ margin: 0, padding: 0 }}>
        
        </body>
      </html>
    </AuthGuard>
  );
}

export default StepTwo;