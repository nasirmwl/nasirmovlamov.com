import type { NextPage } from 'next';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { LAYOUT_CONSTANTS } from '@styles/layout-constants';

const Container = styled.div`
  max-width: 800px;
  padding: 4rem 2rem;
  width: 100%;
  margin: 0 auto;

  @media (max-width: ${LAYOUT_CONSTANTS.MOBILE_BREAKPOINT}px) {
    padding: 2rem 1.5rem;
  }
`;

const Header = styled.header`
  margin-bottom: 3rem;

  @media (max-width: ${LAYOUT_CONSTANTS.MOBILE_BREAKPOINT}px) {
    margin-bottom: 2rem;
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 1rem;
  line-height: 1.15;
  letter-spacing: -0.03em;

  @media (max-width: ${LAYOUT_CONSTANTS.MOBILE_BREAKPOINT}px) {
    font-size: 2.75rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: ${(props) => props.theme.colors.textSecondary};
  line-height: 1.75;

  @media (max-width: ${LAYOUT_CONSTANTS.MOBILE_BREAKPOINT}px) {
    font-size: 1rem;
  }
`;

const TracksList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TrackCard = styled.a`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.25rem;
  background: ${(props) => props.theme.colors.backgroundSecondary};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    border-color: ${(props) => props.theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: ${LAYOUT_CONSTANTS.MOBILE_BREAKPOINT}px) {
    padding: 1rem;
    gap: 1rem;
  }
`;

const AlbumArt = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  @media (max-width: ${LAYOUT_CONSTANTS.MOBILE_BREAKPOINT}px) {
    width: 64px;
    height: 64px;
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
    <Container>
      <Header>
        <Title>🎵 Recently Played</Title>
        <Subtitle>
          Tracks I&apos;ve been listening to on Spotify recently.
        </Subtitle>
      </Header>

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
    </Container>
  );
};

export default RecentlyPlayed;

