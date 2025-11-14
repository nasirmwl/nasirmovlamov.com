import type { NextApiRequest, NextApiResponse } from 'next';
import { getNowPlaying } from '../../../app/helpers/api/spotify';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await getNowPlaying();
    
    if (response.status === 204 || response.status > 400) {
      return res.status(200).json({ isPlaying: false });
    }

    const song = response.data;

    if (!song || !song.item) {
      return res.status(200).json({ isPlaying: false });
    }

    const isPlaying = song.is_playing;
    const title = song.item.name;
    const artist = song.item.artists.map((artist: any) => artist.name).join(', ');
    const album = song.item.album.name;
    const albumImageUrl = song.item.album.images[0]?.url;
    const songUrl = song.item.external_urls.spotify;

    return res.status(200).json({
      isPlaying,
      title,
      artist,
      album,
      albumImageUrl,
      songUrl,
    });
  } catch (error: any) {
    console.error('Error fetching now playing:', error);
    return res.status(200).json({ isPlaying: false });
  }
}

