import React, { useContext, useEffect, useState } from 'react';

import { GlobalContext } from '@store/context/global.context';
import { LAYOUT_CONSTANTS } from '@styles/layout-constants';
import Link from 'next/link';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const SidebarContainer = styled.aside<{ $isOpen: boolean }>`
  width: ${LAYOUT_CONSTANTS.SIDEBAR_WIDTH}px;
  min-height: 100vh;
  box-sizing: content-box;
  background: ${(props) =>
    props.theme.backgrounds?.sidebar || props.theme.colors.backgroundSecondary};
  padding: 2.5rem 2rem;
  position: fixed;
  left: 0;
  top: 0;
  overflow-y: auto;
  border-right: 1px solid ${(props) => props.theme.colors.border};
  display: flex;
  flex-direction: column;
  z-index: 100;
  transition: transform 0.3s ease-in-out;

  @media (max-width: ${LAYOUT_CONSTANTS.MOBILE_BREAKPOINT}px) {
    transform: ${(props) => (props.$isOpen ? 'translateX(0)' : 'translateX(-100%)')};
    box-shadow: ${(props) => (props.$isOpen ? '2px 0 8px rgba(0, 0, 0, 0.15)' : 'none')};
  }
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};

  @media (max-width: ${LAYOUT_CONSTANTS.MOBILE_BREAKPOINT}px) {
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
  }
`;

const SiteTitleLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  cursor: pointer;
`;

const SiteLogo = styled.div`
  width: 48px;
  height: 48px;
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.pink_1} 0%,
    ${(props) => props.theme.colors.pink_2} 100%
  );
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: ${LAYOUT_CONSTANTS.MOBILE_BREAKPOINT}px) {
    width: 40px;
    height: 40px;
    font-size: 1.25rem;
  }
`;

const SiteName = styled.div`
  font-size: 1.375rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text};
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

const TopButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const IconButton = styled.button`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 1.5rem;
  color: ${(props) => props.theme.colors.text};
  padding: 0;

  svg {
    width: 24px;
    height: 24px;
  }

  &:hover {
    transform: scale(1.1);
    color: ${(props) => props.theme.colors.primary};
  }

  &:active {
    transform: scale(0.95);
  }
`;

const Section = styled.section`
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 1.25rem;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 1.125rem;
    margin-bottom: 0.875rem;
  }
`;

const BioText = styled.p`
  font-size: 1.0625rem;
  line-height: 1.7;
  color: ${(props) => props.theme.colors.textSecondary};

  a {
    color: ${(props) => props.theme.colors.link};
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 0.2s;

    &:hover {
      color: ${(props) => props.theme.colors.linkHover};
      border-bottom-color: ${(props) => props.theme.colors.linkHover};
    }
  }
`;

const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const NavItem = styled.a<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
  color: ${(props) => (props.$active ? props.theme.colors.text : props.theme.colors.textSecondary)};
  font-size: 1.125rem;
  text-decoration: none;
  transition: all 0.15s ease;
  cursor: pointer;
  font-weight: ${(props) => (props.$active ? '500' : '400')};

  &:hover {
    color: ${(props) => props.theme.colors.text};
  }
`;

const NavIcon = styled.span`
  font-size: 1.25rem;
  line-height: 1;
`;

const StayConnected = styled.div`

  @media (max-width: 768px) {
    margin-top: 1.5rem;
  }
`;

const ConnectedTitle = styled.h3`
  font-size: 1.375rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 1rem;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 1.125rem;
    margin-bottom: 0.75rem;
  }
`;

const ConnectedList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const ConnectedItem = styled.a`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: 1.0625rem;
  text-decoration: none;
  transition: color 0.15s ease;

  &:hover {
    color: ${(props) => props.theme.colors.text};
  }
`;

const ConnectedIcon = styled.span`
  font-size: 1.25rem;
  line-height: 1;
`;

const MusicSection = styled.div`
  margin-bottom: 2rem;

  @media (max-width: ${LAYOUT_CONSTANTS.MOBILE_BREAKPOINT}px) {
    margin-bottom: 1.5rem;
  }
`;

const MusicTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: ${LAYOUT_CONSTANTS.MOBILE_BREAKPOINT}px) {
    font-size: 1rem;
    margin-bottom: 0.75rem;
  }
`;

const NowPlayingCard = styled.a`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem;
  background: ${(props) => props.theme.colors.backgroundSecondary};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    border-color: ${(props) => props.theme.colors.primary};
    transform: translateY(-2px);
  }

  @media (max-width: ${LAYOUT_CONSTANTS.MOBILE_BREAKPOINT}px) {
    padding: 0.75rem;
    gap: 0.625rem;
  }
`;

const AlbumArt = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 4px;
  flex-shrink: 0;

  @media (max-width: ${LAYOUT_CONSTANTS.MOBILE_BREAKPOINT}px) {
    width: 40px;
    height: 40px;
  }
`;

const TrackInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const TrackName = styled.div`
  font-size: 0.9375rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: ${LAYOUT_CONSTANTS.MOBILE_BREAKPOINT}px) {
    font-size: 0.875rem;
  }
`;

const ArtistName = styled.div`
  font-size: 0.8125rem;
  color: ${(props) => props.theme.colors.textMuted};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: ${LAYOUT_CONSTANTS.MOBILE_BREAKPOINT}px) {
    font-size: 0.75rem;
  }
`;

const StatusBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.75rem;
  color: ${(props) => props.theme.colors.textMuted};
  margin-bottom: 0.75rem;
`;

const PulsingDot = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  background: #1DB954;
  border-radius: 50%;
  animation: pulse 2s infinite;

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

const NotPlaying = styled.div`
  padding: 1rem;
  background: ${(props) => props.theme.colors.backgroundSecondary};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 8px;
  text-align: center;
  color: ${(props) => props.theme.colors.textMuted};
  font-size: 0.875rem;

  @media (max-width: ${LAYOUT_CONSTANTS.MOBILE_BREAKPOINT}px) {
    padding: 0.875rem;
    font-size: 0.8125rem;
  }
`;

const RecentlyPlayedList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`;

const RecentTrackCard = styled.a`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.625rem;
  background: ${(props) => props.theme.colors.backgroundSecondary};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    border-color: ${(props) => props.theme.colors.borderLight};
    transform: translateX(2px);
  }

  @media (max-width: ${LAYOUT_CONSTANTS.MOBILE_BREAKPOINT}px) {
    padding: 0.5rem;
  }
`;

const SmallAlbumArt = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  flex-shrink: 0;

  @media (max-width: ${LAYOUT_CONSTANTS.MOBILE_BREAKPOINT}px) {
    width: 36px;
    height: 36px;
  }
`;

const RecentTrackInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const RecentTrackName = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 0.125rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: ${LAYOUT_CONSTANTS.MOBILE_BREAKPOINT}px) {
    font-size: 0.8125rem;
  }
`;

const RecentArtistName = styled.div`
  font-size: 0.75rem;
  color: ${(props) => props.theme.colors.textMuted};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: ${LAYOUT_CONSTANTS.MOBILE_BREAKPOINT}px) {
    font-size: 0.6875rem;
  }
`;

const MobileMenuButton = styled.button<{ $isOpen: boolean }>`
  display: none;
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 150;
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: ${(props) => props.theme.colors.backgroundSecondary};
  border: 1px solid ${(props) => props.theme.colors.border};
  color: ${(props) => props.theme.colors.text};
  cursor: pointer;
  transition: all 0.2s;
  padding: 0;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.05);
    background: ${(props) => props.theme.colors.background};
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    display: ${(props) => (props.$isOpen ? 'none' : 'flex')};
  }
`;

const Overlay = styled.div<{ $isOpen: boolean }>`
  display: none;

  @media (max-width: 768px) {
    display: ${(props) => (props.$isOpen ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 99;
  }
`;

const CloseButton = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 36px;
    height: 36px;
    border-radius: 6px;
    background: transparent;
    border: 1px solid ${(props) => props.theme.colors.border};
    color: ${(props) => props.theme.colors.text};
    cursor: pointer;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    padding: 0;
    font-size: 1.5rem;

    &:hover {
      background: ${(props) => props.theme.colors.background};
    }
  }
`;

interface NowPlayingData {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
}

interface RecentTrack {
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
  playedAt: string;
}

export const Sidebar: React.FC = () => {
  const router = useRouter();
  const currentPath = router.pathname;
  const { darkMode, toggleTheme } = useContext(GlobalContext);
  const [isOpen, setIsOpen] = useState(false);
  const [nowPlaying, setNowPlaying] = useState<NowPlayingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const response = await fetch('/api/spotify/now-playing');
        if (response.ok) {
          const data = await response.json();
          setNowPlaying(data);
        }
      } catch (error) {
        console.error('Error fetching now playing:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNowPlaying();
    // Refresh every 30 seconds
    const interval = setInterval(fetchNowPlaying, 30000);
    return () => clearInterval(interval);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      <MobileMenuButton onClick={toggleSidebar} aria-label="Toggle menu" $isOpen={isOpen}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </MobileMenuButton>
      <Overlay $isOpen={isOpen} onClick={closeSidebar} />
      <SidebarContainer $isOpen={isOpen}>
        <CloseButton onClick={closeSidebar} aria-label="Close menu">
          ×
        </CloseButton>
        <TopBar>
          <SiteTitleLink as={Link} href="/" onClick={closeSidebar}>
            <SiteLogo>💾</SiteLogo>
            <SiteName>nasir.dev</SiteName>
          </SiteTitleLink>
          <TopButtons>
            <IconButton
              onClick={toggleTheme}
              title={darkMode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
            {darkMode === 'dark' ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </IconButton>
        </TopButtons>
      </TopBar>

      <Section>
        <SectionTitle>About Me</SectionTitle>
        <BioText>
          I&apos;m <Link href="/about" onClick={closeSidebar}>Nasir</Link>, senior software engineer and open-source creator. This
          is my digital garden. 🌱
        </BioText>
      </Section>

      <Section>
        <NavList>
          <NavItem as={Link} href="/blog" $active={currentPath.startsWith('/blog')} onClick={closeSidebar}>
            <NavIcon>📄</NavIcon>
            Blog
          </NavItem>
          <NavItem as={Link} href="/snippets" $active={currentPath === '/snippets'} onClick={closeSidebar}>
            <NavIcon>📝</NavIcon>
            Notes
          </NavItem>
          <NavItem as={Link} href="/about" $active={currentPath === '/about'} onClick={closeSidebar}>
            <NavIcon>💾</NavIcon>
            About Me
          </NavItem>
          <NavItem as={Link} href="/recently-played" $active={currentPath === '/recently-played'} onClick={closeSidebar}>
            <NavIcon>🎵</NavIcon>
            Recently Played
          </NavItem>
        </NavList>
      </Section>



      <StayConnected>
        <ConnectedTitle>Stay Connected</ConnectedTitle>
        <ConnectedList>
          <ConnectedItem
            href="https://github.com/nasirmovlamov"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ConnectedIcon>💻</ConnectedIcon>
            GitHub
          </ConnectedItem>

        </ConnectedList>
      </StayConnected>
      </SidebarContainer>
    </>
  );
};
