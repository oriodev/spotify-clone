'use client';

import {
  useSessionContext,
  useSupabaseClient,
} from '@supabase/auth-helpers-react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import useAuthModal from '@/hooks/useAuthModal';

import Modal from './Modal';

const AuthModal = () => {
  // returns shit from the supabase provider
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const session = useSessionContext();

  // set object to our custom hook
  // that returns an object of isOpen/isClosed setting.
  const { onClose, isOpen } = useAuthModal();

  // if we click the close btn, set auth modal to closed.
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  // close modal after login.
  useEffect(() => {
    if (session) {
      // refresh the current route
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);

  return (
    <Modal
      title="welcome back!"
      description="login to your account"
      isOpen={isOpen}
      onChange={onChange}
    >
      <Auth
        // overall light/dark theme
        theme="dark"
        // who u can log in with, eg. google, github, discord.
        providers={['github']}
        // attaches auth model to ur supabase client.
        supabaseClient={supabaseClient}
        // so u can log in with a link to ur email account.
        magicLink
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#404040',
                brandAccent: '#22c55e',
              },
            },
          },
        }}
      />
    </Modal>
  );
};

export default AuthModal;
