import { Song } from '@/types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const getSongsByUserId = async (): Promise<Song[]> => {
    // i think it makes a supabase client on the server side
    const supabase = createServerComponentClient({
        cookies: cookies
    })

    const { data: sessionData, error: sessionError } = await supabase.auth.getSession()

    if (sessionError) {
        console.log(sessionError.message)
        return []
    }

    const { data, error } = await supabase
        .from('songs')
        .select('*')
        .eq('user_id', sessionData.session?.user.id)
        .order('created_at', { ascending: false })

    if (error) {
        console.log(error.message)
    }

    // returns data as any type or return an empty array
    return (data as any) || []
}

export default getSongsByUserId