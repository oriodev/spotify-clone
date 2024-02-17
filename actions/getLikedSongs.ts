import { Song } from '@/types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const getLikedSongs = async (): Promise<Song[]> => {
    // i think it makes a supabase client on the server side
    const supabase = createServerComponentClient({
        cookies: cookies
    })

    // get ur auth session cookie stuff.
    const {
        data: {
            session
        }
    } = await supabase.auth.getSession()

    // returns in data a list of all songs in descending order of creation.
    const { data, error } = await supabase
        .from('liked_songs')
        .select('*, songs(*)')
        .eq('user_id', session?.user?.id)
        .order('created_at', { ascending: false })

    if (error) {
        console.log(error)
        return [];
    }

    if (!data) {
        return [];
    }

    // spreading relation. idk what that means lol.
    return data.map((item) => ({
        ...item.songs
    }))
}

export default getLikedSongs