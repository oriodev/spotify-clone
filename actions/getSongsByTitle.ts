import { Song } from '@/types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import getSongs from './getSongs';

const getSongsByTitle = async (title: string): Promise<Song[]> => {
    // i think it makes a supabase client on the server side
    const supabase = createServerComponentClient({
        cookies: cookies
    })

    // check if song
    if (!title) {
        const allSongs = await getSongs()
        return allSongs;
    }

    // returns in data a list of all songs in descending order of creation.
    const { data, error } = await supabase
        .from('songs')
        .select('*')
        .ilike('title', `%${title}%`)
        .order('created_at', { ascending: false })

    if (error) {
        console.log(error)
    }

    // returns data as any type or return an empty array
    return (data as any) || []
}

export default getSongsByTitle