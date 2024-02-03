'use client';

import {
  useSessionContext,
  useSupabaseClient,
} from '@supabase/auth-helpers-react';
import Modal from './Modal';
import { useRouter } from 'next/navigation';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

const AuthModal = () => {
  // returns shit from the supabase provider
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const session = useSessionContext();

  return (
    <Modal
      title="welcome back!"
      description="login to your account"
      isOpen
      onChange={() => {}}
    >
      <Auth
        supabaseClient={supabaseClient}
        appearance={{
          theme: ThemeSupa,
        }}
      />
    </Modal>
  );
};

export default AuthModal;
