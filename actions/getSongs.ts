import { Song } from '@/types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const getSongs = async (): Promise<Song[]> => {
    // i think it makes a supabase client on the server side
    const supabase = createServerComponentClient({
        cookies: cookies
    })

    // returns in data a list of all songs in descending order of creation.
    const { data, error } = await supabase
        .from('songs')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.log(error)
    }

    // returns data as any type or return an empty array
    return (data as any) || []
}

export default getSongs