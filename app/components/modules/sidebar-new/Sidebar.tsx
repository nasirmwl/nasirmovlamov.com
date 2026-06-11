import React, { useEffect, useState } from 'react';

import { LAYOUT_CONSTANTS } from '@styles/layout-constants';
import Link from 'next/link';
import styled, { keyframes } from 'styled-components';
import { useRouter } from 'next/router';

const blink = keyframes`
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
`;

const SidebarContainer = styled.aside<{ $isOpen: boolean }>`
  width: ${LAYOUT_CONSTANTS.SIDEBAR_WIDTH}px;
  max-width: 85vw;
  height: 100vh;
  box-sizing: border-box;
  background: ${(props) =>
    props.theme.backgrounds?.sidebar || props.theme.colors.backgroundSecondary};
  padding: 1.5rem 1.4rem;
  position: fixed;
  left: 0;
  top: 0;
  overflow-y: auto;
  border-right: 1px solid ${(props) => props.theme.colors.border};
  display: flex;
  flex-direction: column;
  z-index: 200;

  /* Hidden by default on every viewport — opens as an overlay drawer */
  transform: ${(props) => (props.$isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  box-shadow: ${(props) =>
    props.$isOpen
      ? '1px 0 0 rgba(94, 227, 151, 0.25), 8px 0 40px rgba(0, 0, 0, 0.6)'
      : 'none'};

  /* Scanline overlay */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 1;
    background: repeating-linear-gradient(
      transparent 0,
      transparent 2px,
      rgba(0, 0, 0, 0.13) 2px,
      rgba(0, 0, 0, 0.13) 4px
    );
  }

  > * {
    position: relative;
    z-index: 2;
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
  width: 40px;
  height: 40px;
  background: ${(props) => props.theme.colors.backgroundTertiary};
  border: 1px solid ${(props) => props.theme.colors.primary};
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: ${(props) => props.theme.colors.primary};
  box-shadow: 0 0 12px rgba(94, 227, 151, 0.22);
  transition: box-shadow 0.2s;

  ${SiteTitleLink}:hover & {
    box-shadow: 0 0 18px rgba(94, 227, 151, 0.4);
  }
`;

const SiteName = styled.div`
  font-size: 1.05rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text};
  letter-spacing: 0.02em;

  &::after {
    content: '_';
    color: ${(props) => props.theme.colors.primary};
    animation: ${blink} 1s step-end infinite;
  }
`;

const Section = styled.section`
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

const SectionTitle = styled.h3`
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: ${(props) => props.theme.colors.textMuted};
  margin-bottom: 1rem;

  &::before {
    content: '// ';
    color: ${(props) => props.theme.colors.primary};
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
  gap: 0.6rem;
  padding: 0.45rem 0.6rem;
  border: 1px solid ${(props) => (props.$active ? props.theme.colors.border : 'transparent')};
  border-left: 2px solid
    ${(props) => (props.$active ? props.theme.colors.primary : 'transparent')};
  border-radius: 2px;
  background: ${(props) => (props.$active ? props.theme.colors.backgroundTertiary : 'transparent')};
  color: ${(props) => (props.$active ? props.theme.colors.text : props.theme.colors.textSecondary)};
  font-size: 0.95rem;
  text-decoration: none;
  transition: all 0.15s ease;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.colors.text};
    border-left-color: ${(props) => props.theme.colors.primary};
    background: ${(props) => props.theme.colors.backgroundTertiary}99;
  }
`;

const NavMarker = styled.span<{ $active?: boolean }>`
  color: ${(props) => (props.$active ? props.theme.colors.primary : props.theme.colors.textMuted)};
  font-size: 0.95rem;
  line-height: 1;
`;

const StayConnected = styled.div`

  @media (max-width: 768px) {
    margin-top: 1.5rem;
  }
`;

const ConnectedTitle = styled.h3`
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: ${(props) => props.theme.colors.textMuted};
  margin-bottom: 1rem;

  &::before {
    content: '// ';
    color: ${(props) => props.theme.colors.primary};
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
  color: ${(props) => props.theme.colors.primary};
  font-size: 0.95rem;
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

const MenuButton = styled.button<{ $isOpen: boolean }>`
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 250;
  display: ${(props) => (props.$isOpen ? 'none' : 'flex')};
  align-items: center;
  gap: 0.5rem;
  height: 40px;
  padding: 0 0.85rem;
  border-radius: 2px;
  background: ${(props) => props.theme.colors.backgroundSecondary}e6;
  border: 1px solid ${(props) => props.theme.colors.border};
  color: ${(props) => props.theme.colors.primary};
  font-family: inherit;
  font-size: 0.8rem;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 0 12px rgba(94, 227, 151, 0.12);
  backdrop-filter: blur(2px);

  &:hover {
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 16px rgba(94, 227, 151, 0.28);
  }

  &:active {
    transform: scale(0.97);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const MenuLabel = styled.span`
  @media (max-width: 480px) {
    display: none;
  }
`;

const Overlay = styled.div<{ $isOpen: boolean }>`
  display: ${(props) => (props.$isOpen ? 'block' : 'none')};
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(1px);
  z-index: 150;
`;

const CloseButton = styled.button`
  display: flex;
  align-self: flex-end;
  margin-bottom: 0.5rem;
  width: 30px;
  height: 30px;
  border-radius: 2px;
  background: transparent;
  border: 1px solid ${(props) => props.theme.colors.border};
  color: ${(props) => props.theme.colors.text};
  cursor: pointer;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  padding: 0;
  font-size: 1.1rem;
  line-height: 1;

  &:hover {
    border-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.primary};
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
      <MenuButton onClick={toggleSidebar} aria-label="Open menu" $isOpen={isOpen}>
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
        <MenuLabel>menu</MenuLabel>
      </MenuButton>
      <Overlay $isOpen={isOpen} onClick={closeSidebar} />
      <SidebarContainer $isOpen={isOpen}>
        <CloseButton onClick={closeSidebar} aria-label="Close menu">
          ×
        </CloseButton>
        <TopBar>
          <SiteTitleLink as={Link} href="/" onClick={closeSidebar}>
            <SiteLogo>NM</SiteLogo>
            <SiteName>nasir.dev</SiteName>
          </SiteTitleLink>
        </TopBar>

      <Section>
        <SectionTitle>about</SectionTitle>
        <BioText>
          I&apos;m <Link href="/about" onClick={closeSidebar}>Nasir</Link>, a software engineer who likes building
          things and learning more about technology along the way.
        </BioText>
      </Section>

      <Section>
        <SectionTitle>navigation</SectionTitle>
        <NavList>
          <NavItem as={Link} href="/blog" $active={currentPath.startsWith('/blog')} onClick={closeSidebar}>
            <NavMarker $active={currentPath.startsWith('/blog')}>
              {currentPath.startsWith('/blog') ? '▸' : '>'}
            </NavMarker>
            blog
          </NavItem>
          <NavItem as={Link} href="/snippets" $active={currentPath === '/snippets'} onClick={closeSidebar}>
            <NavMarker $active={currentPath === '/snippets'}>
              {currentPath === '/snippets' ? '▸' : '>'}
            </NavMarker>
            notes
          </NavItem>
          <NavItem as={Link} href="/about" $active={currentPath === '/about'} onClick={closeSidebar}>
            <NavMarker $active={currentPath === '/about'}>
              {currentPath === '/about' ? '▸' : '>'}
            </NavMarker>
            about
          </NavItem>
          <NavItem as={Link} href="/recently-played" $active={currentPath === '/recently-played'} onClick={closeSidebar}>
            <NavMarker $active={currentPath === '/recently-played'}>
              {currentPath === '/recently-played' ? '▸' : '>'}
            </NavMarker>
            recently-played
          </NavItem>
        </NavList>
      </Section>



      <StayConnected>
        <ConnectedTitle>connect</ConnectedTitle>
        <ConnectedList>
          <ConnectedItem
            href="https://github.com/nasirmwl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ConnectedIcon>-</ConnectedIcon>
            GitHub
          </ConnectedItem>

        </ConnectedList>
      </StayConnected>
      </SidebarContainer>
    </>
  );
};
