'use client';

import useLoadImage from '@/hooks/useLoadImage';
import { Song } from '@/types';

interface SongItemProps {
  data: Song;
  onClick: (id: string) => void;
}

const SongItem: React.FC<SongItemProps> = ({ onClick, data }) => {
  const imagePath = useLoadImage(data);

  return (
    <div onClick={() => onClick(data.id)} className="">
      SongItem
    </div>
  );
};

export default SongItem;
