'use client';

import AuthModal from '@/components/AuthModal';
import { useEffect, useState } from 'react';

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  // never render a model in server-side rendering - hydration issues (?)
  // if we use useEffect we're def on the client side, so then we can set isMounted to true
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // if we're on server side it'll return null
  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AuthModal />
    </>
  );
};

export default ModalProvider;
