'use client';

import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { supabase } from '@supabase/auth-ui-shared';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

interface LikeButtonProps {
  songId: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ songId }) => {
  // inits the router and supabase connection.
  const router = useRouter();
  const { supabaseClient } = useSessionContext();

  // gives us access to authentication shit.
  const authModal = useAuthModal();
  const { user } = useUser();

  // sets a state for whether the song has been liked or not.
  const [isLiked, setIsLiked] = useState(false);

  // this just checks whether the song is liked or not
  // in order to determine how we render the like button
  useEffect(() => {
    if (!user?.id) {
      return;
    }

    const fetchData = async () => {
      // try and fetch a song
      // with that user id
      // and that song id

      const { data, error } = await supabaseClient
        .from('liked_songs')
        .select('*')
        .eq('user_id', user.id)
        .eq('song_id', songId)
        .single(); // just returns a single property

      if (!error && data) {
        setIsLiked(true);
      }
    };

    fetchData();
  }, [songId, supabaseClient, user?.id]);

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  return (
    <button className="">
      <Icon color={isLiked ? '#22c55e' : 'white'} size={25} />
    </button>
  );
};

export default LikeButton;
