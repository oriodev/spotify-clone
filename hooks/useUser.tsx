import { Subscription, UserDetails } from '@/types';
import { User } from '@supabase/auth-helpers-nextjs';
import {
  useSessionContext,
  useUser as useSupaUser,
} from '@supabase/auth-helpers-react';
import { createContext, useContext, useEffect, useState } from 'react';

// this sets the types for the usercontext hook.
type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  subscription: Subscription | null;
};

// this creates a context (?)
export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

// this sets the types of props for the custom hook.
export interface Props {
  [propName: string]: any;
}

// ok so this is a custom hook for checking authentication.
export const MyUserContextProvider = (props: Props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext();

  const user = useSupaUser();
  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  // now we're getting the user details.
  const getUserDetails = () => supabase.from('users').select('*').single();

  // and here we're getting the subscription.
  const getSubscription = () =>
    supabase
      .from('subscriptions')
      .select('*, prices(*, products(*))')
      .in('status', ['trialing', 'active'])
      .single();

  useEffect(() => {
    // user is true, but loadingData is false and no userdetails or subscriptions
    if (user && !isLoadingData && !userDetails && !subscription) {
      // so now we're loading data
      setIsLoadingData(true);

      // so we're getting the user details and subscription details from the database
      Promise.allSettled([getUserDetails(), getSubscription()]).then(
        (results) => {
          // and setting that data to these variables
          const userDetailsPromise = results[0];
          const subscriptionPromise = results[1];

          // once the promise is fulfilled, set user details
          if (userDetailsPromise.status === 'fulfilled') {
            setUserDetails(userDetailsPromise.value.data as UserDetails);
          }

          if (subscriptionPromise.status === 'fulfilled') {
            setSubscription(subscriptionPromise.value.data as Subscription);
          }

          // now we're done loading data
          setIsLoadingData(false);
        }
      );
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null);
      setSubscription(null);
    }
  }, [user, isLoadingUser]);

  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
    subscription,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUser must be used within a MyUserContextProvider');
  }

  return context;
};
