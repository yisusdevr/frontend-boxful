import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '../routes';

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push(ROUTES.HOME);
    }
  }, [router]);

  return <>{children}</>;
};

export default AuthGuard;