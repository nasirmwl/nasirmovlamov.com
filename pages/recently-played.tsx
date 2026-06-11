import type { NextPage } from 'next';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { LAYOUT_CONSTANTS } from '@styles/layout-constants';
import { PageShell, TerminalHeader } from '@components/shared/terminal/PageTerminal';

const TracksList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const TrackCard = styled.a`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1rem;
  background: ${(props) => props.theme.colors.backgroundSecondary}b3;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-left: 2px solid ${(props) => props.theme.colors.border};
  border-radius: 2px;
  text-decoration: none;
  transition: border-color 0.2s, transform 0.2s;
  cursor: pointer;

  &:hover {
    border-color: ${(props) => props.theme.colors.primary};
    border-left-color: ${(props) => props.theme.colors.primary};
    transform: translateX(2px);
  }

  @media (max-width: ${LAYOUT_CONSTANTS.MOBILE_BREAKPOINT}px) {
    padding: 0.85rem;
    gap: 1rem;
  }
`;

const AlbumArt = styled.img`
  width: 72px;
  height: 72px;
  border-radius: 2px;
  flex-shrink: 0;

  @media (max-width: ${LAYOUT_CONSTANTS.MOBILE_BREAKPOINT}px) {
    width: 60px;
    height: 60px;
  }
`;

const TrackInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const TrackName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 0.375rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: ${LAYOUT_CONSTANTS.MOBILE_BREAKPOINT}px) {
    font-size: 1.0625rem;
  }
`;

const ArtistName = styled.div`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.textSecondary};
  margin-bottom: 0.375rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: ${LAYOUT_CONSTANTS.MOBILE_BREAKPOINT}px) {
    font-size: 0.9375rem;
  }
`;

const AlbumName = styled.div`
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.textMuted};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: ${LAYOUT_CONSTANTS.MOBILE_BREAKPOINT}px) {
    font-size: 0.8125rem;
  }
`;

const PlayedAt = styled.div`
  font-size: 0.8125rem;
  color: ${(props) => props.theme.colors.textMuted};
  text-align: right;
  flex-shrink: 0;

  @media (max-width: ${LAYOUT_CONSTANTS.MOBILE_BREAKPOINT}px) {
    font-size: 0.75rem;
  }
`;

const Loading = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${(props) => props.theme.colors.textMuted};
  font-size: 1rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${(props) => props.theme.colors.textMuted};
  font-size: 1rem;
`;

interface Track {
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
  playedAt: string;
}

const RecentlyPlayed: NextPage = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecentlyPlayed = async () => {
      try {
        const response = await fetch('/api/spotify/recently-played');
        if (response.ok) {
          const data = await response.json();
          setTracks(data.tracks || []);
        }
      } catch (error) {
        console.error('Error fetching recently played:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentlyPlayed();
  }, []);

  const formatPlayedAt = (playedAt: string) => {
    const date = new Date(playedAt);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <PageShell>
      <TerminalHeader
        command="spotify --recently-played"
        title="Recently Played"
        subtitle="Tracks I've been listening to on Spotify recently."
      />

      {isLoading ? (
        <Loading>Loading tracks...</Loading>
      ) : tracks.length > 0 ? (
        <TracksList>
          {tracks.map((track, index) => (
            <TrackCard 
              key={`${track.songUrl}-${index}`}
              href={track.songUrl} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <AlbumArt src={track.albumImageUrl} alt={track.album} />
              <TrackInfo>
                <TrackName>{track.title}</TrackName>
                <ArtistName>{track.artist}</ArtistName>
                <AlbumName>{track.album}</AlbumName>
              </TrackInfo>
              <PlayedAt>{formatPlayedAt(track.playedAt)}</PlayedAt>
            </TrackCard>
          ))}
        </TracksList>
      ) : (
        <EmptyState>No recently played tracks found.</EmptyState>
      )}
    </PageShell>
  );
};

export default RecentlyPlayed;

