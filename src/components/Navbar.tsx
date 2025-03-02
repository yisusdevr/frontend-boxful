import { Menu, Button } from 'antd';
import Link from 'next/link';

import { useRouter, usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    router.push('/');
  };

  const showLogout = ['/step-one', '/step-two'].includes(pathname);

  const items = [
    {
      label: <strong> <Link href="/" style={{color:'#FF4300',}}>boxful</Link></strong>,
      key: 'home',
          
    },
    ...(showLogout ? [
      {
        label: <Link href="" onClick={handleLogout}>Cerrar sesion</Link>,
        key: 'logout',
      }
    ] : [])
  ];

  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem',
      fontFamily: 'var(--font-albert-sans)'
    }}>
      <Menu
        mode="horizontal"
        items={items}
        style={{ 
          padding: '0 20px',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1,
          fontSize: '23px',
          fontFamily: 'var(--font-albert-sans)'
        }}
      />
    </nav>
  );
};

export default Navbar;