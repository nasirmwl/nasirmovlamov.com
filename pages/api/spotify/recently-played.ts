import type { NextApiRequest, NextApiResponse } from 'next';
import { getRecentlyPlayed } from '../../../app/helpers/api/spotify';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await getRecentlyPlayed();
    
    if (!response.data || !response.data.items) {
      return res.status(200).json({ tracks: [] });
    }

    const tracks = response.data.items.map((item: any) => ({
      title: item.track.name,
      artist: item.track.artists.map((artist: any) => artist.name).join(', '),
      album: item.track.album.name,
      albumImageUrl: item.track.album.images[0]?.url,
      songUrl: item.track.external_urls.spotify,
      playedAt: item.played_at,
    }));

    return res.status(200).json({ tracks });
  } catch (error: any) {
    console.error('Error fetching recently played:', error);
    return res.status(200).json({ tracks: [] });
  }
}

