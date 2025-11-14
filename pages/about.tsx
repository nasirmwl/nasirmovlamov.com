import { useEffect, useState } from 'react';

import { LAYOUT_CONSTANTS } from '@styles/layout-constants';
import type { NextPage } from 'next';
import axios from 'axios';
import { getAccessToken } from '@helpers/api/spotify';
import styled from 'styled-components';

const AboutContainer = styled.div`
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
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 1.5rem;
  line-height: 1.15;
  letter-spacing: -0.03em;

  @media (max-width: ${LAYOUT_CONSTANTS.MOBILE_BREAKPOINT}px) {
    font-size: 2.75rem;
  }
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 1.25rem;
  letter-spacing: -0.02em;
`;

const Paragraph = styled.p`
  font-size: 1.125rem;
  line-height: 1.75;
  color: ${(props) => props.theme.colors.textSecondary};
  margin-bottom: 1.5rem;

  a {
    color: ${(props) => props.theme.colors.link};
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: all 0.2s;

    &:hover {
      color: ${(props) => props.theme.colors.linkHover};
      border-bottom-color: ${(props) => props.theme.colors.linkHover};
    }
  }
`;

const ExperienceItem = styled.div`
  margin-bottom: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray_1};

  &:last-child {
    border-bottom: none;
  }
`;

const JobTitle = styled.h3`
  font-size: 1.375rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 0.5rem;
`;

const Company = styled.div`
  font-size: 1.125rem;
  color: ${(props) => props.theme.colors.link};
  margin-bottom: 0.375rem;
  font-weight: 500;
`;

const Duration = styled.div`
  font-size: 0.9375rem;
  color: ${(props) => props.theme.colors.textMuted};
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.0625rem;
  line-height: 1.7;
  color: ${(props) => props.theme.colors.textSecondary};
`;

const SkillsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const SkillTag = styled.span`
  padding: 0.375rem 0.875rem;
  background: ${(props) => props.theme.colors.gray_1};
  color: ${(props) => props.theme.colors.textSecondary};
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
`;

const LinksList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
`;

const LinkItem = styled.a`
  font-size: 1.125rem;
  color: ${(props) => props.theme.colors.link};
  text-decoration: none;
  transition: color 0.15s ease;

  &:hover {
    color: ${(props) => props.theme.colors.linkHover};
  }

  &::before {
    content: '→ ';
    margin-right: 0.5rem;
  }
`;

const SpotifyContainer = styled.div`
  margin-top: 1.5rem;
  padding: 1.5rem;
  background: ${(props) => props.theme.colors.gray_1};
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.colors.borderLight};
`;

const SpotifyStatus = styled.div`
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.textMuted};
  margin-bottom: 0.75rem;
`;

const SpotifyContent = styled.a`
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const SpotifyImage = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 8px;
  object-fit: cover;
`;

const SpotifyInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const SpotifyTrack = styled.div`
  font-size: 1.0625rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SpotifyArtist = styled.div`
  font-size: 0.9375rem;
  color: ${(props) => props.theme.colors.textSecondary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const About: NextPage = () => {
  const [loading, setLoading] = useState<'idle' | 'pending' | 'error'>('pending');
  const [spotifyData, setSpotifyData] = useState<any>(null);

  const getSpotifyData = async () => {
    try {
      setLoading('pending');
      const {
        data: { access_token: token },
      } = await getAccessToken();
      const request = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      setSpotifyData(request.data);
      setLoading('idle');
    } catch (error) {
      console.log(error);
      setSpotifyData(null);
      setLoading('idle');
    }
  };

  useEffect(() => {
    getSpotifyData();
  }, []);

  useEffect(() => {
    const interval = setInterval(getSpotifyData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AboutContainer>
      <Header>
        <Title>About Me</Title>
        <Paragraph>
          Hi, I&apos;m Nasir Movlamov, a Lead Software Engineer at ABB with over 4 years of professional experience
          in building modern web applications. I hold a Master&apos;s degree in Artificial Intelligence and a
          Bachelor&apos;s degree in Computer Engineering.
        </Paragraph>
        <Paragraph>
          I specialize in micro-frontend architectures, React ecosystems, and creating scalable, maintainable
          software solutions. I&apos;m passionate about testing, code quality, and mentoring junior engineers.
        </Paragraph>
      </Header>

      <Section>
        <SectionTitle>Experience</SectionTitle>

        <ExperienceItem>
          <JobTitle>Lead Software Engineer</JobTitle>
          <Company>ABB</Company>
          <Duration>Oct 2022 - Present · 3 yrs 2 mos · Baku, Azerbaijan (Hybrid)</Duration>
          <Description>
            Currently part of the Mortgage Tribe, developing software to automate mortgage processes.
            Previously worked in the Digital Innovations Unit, focusing on internal software solutions
            and developing micro-frontend architecture supporting various banking products.
          </Description>
          <Description>
            Key achievements include:
          </Description>
          <Description>
            • Developed and maintained micro-frontend architecture for mortgage workflows<br/>
            • Wrote and maintained internal documentation for the frontend chapter<br/>
            • Mentored junior engineers on best practices and architecture patterns
          </Description>
          <SkillsList>
            <SkillTag>Webpack</SkillTag>
            <SkillTag>React.js</SkillTag>
            <SkillTag>Micro-frontends</SkillTag>
          </SkillsList>
        </ExperienceItem>

        <ExperienceItem>
          <JobTitle>Software Engineer</JobTitle>
          <Company>A2Z Technologies</Company>
          <Duration>Apr 2022 - Oct 2022 · 7 mos · Baku, Azerbaijan</Duration>
          <Description>
            Worked in the ICT Department&apos;s Product Service Development Unit, creating software for
            internal usage and customer-facing services.
          </Description>
          <SkillsList>
            <SkillTag>React.js</SkillTag>
            <SkillTag>Tailwind CSS</SkillTag>
            <SkillTag>TypeScript</SkillTag>
          </SkillsList>
        </ExperienceItem>

        <ExperienceItem>
          <JobTitle>Software Engineering Instructor</JobTitle>
          <Company>Code Academy</Company>
          <Duration>Jan 2022 - Jun 2022 · 6 mos · Baku, Azerbaijan</Duration>
          <Description>
            Taught at Azerbaijan&apos;s most prestigious coding bootcamp. Participated in curriculum development,
            teaching, and programming competitions. Main responsibilities included teaching &quot;Data Structures
            and Algorithms&quot; and &quot;Introduction to Programming with Javascript, HTML, CSS.&quot;
          </Description>
          <SkillsList>
            <SkillTag>React.js</SkillTag>
            <SkillTag>JavaScript</SkillTag>
            <SkillTag>Data Structures</SkillTag>
            <SkillTag>Algorithms</SkillTag>
          </SkillsList>
        </ExperienceItem>

        <ExperienceItem>
          <JobTitle>Software Engineer</JobTitle>
          <Company>Abyss</Company>
          <Duration>Aug 2021 - Feb 2022 · 7 mos · Azerbaijan</Duration>
          <Description>
            In this startup environment, handled multiple roles including software requirements analysis,
            code review, software architecture, deployment, security validation, and software development.
          </Description>
          <SkillsList>
            <SkillTag>React.js</SkillTag>
            <SkillTag>styled-components</SkillTag>
            <SkillTag>Architecture</SkillTag>
          </SkillsList>
        </ExperienceItem>

        <ExperienceItem>
          <JobTitle>Junior Software Engineer</JobTitle>
          <Company>JedAi | Digital Marketing Agency</Company>
          <Duration>Oct 2020 - Sep 2021 · 1 yr · Baku, Azerbaijan</Duration>
          <Description>
            Designed efficient and scalable APIs as well as sophisticated user interfaces for all
            business and product websites.
          </Description>
          <SkillsList>
            <SkillTag>Bootstrap</SkillTag>
            <SkillTag>React.js</SkillTag>
            <SkillTag>API Design</SkillTag>
          </SkillsList>
        </ExperienceItem>
      </Section>

      <Section>
        <SectionTitle>Education</SectionTitle>

        <ExperienceItem>
          <JobTitle>Master&apos;s Degree in Artificial Intelligence</JobTitle>
          <Company>Azerbaijan State Oil and Industry University</Company>
          <Duration>Sep 2022 - Jun 2024 · Grade: 86/100</Duration>
          <Description>
            Coursework: Data Mining, Neural Networks, Reinforcement Learning, Deep Learning
          </Description>
        </ExperienceItem>

        <ExperienceItem>
          <JobTitle>Bachelor&apos;s Degree in Computer Engineering</JobTitle>
          <Company>Azerbaijan State Oil and Industry University</Company>
          <Duration>Sep 2018 - Jun 2022 · Grade: 88/100</Duration>
          <Description>
            Coursework: Data Structures & Algorithms, Object-Oriented Programming, Computer Architecture,
            Design Patterns, Computer Networks, Operating Systems, Unix Tools and Scripting
          </Description>
        </ExperienceItem>
      </Section>

      <Section>
        <SectionTitle>Currently Listening 🎵</SectionTitle>
        {loading === 'pending' ? (
          <SpotifyContainer>
            <SpotifyStatus>Loading...</SpotifyStatus>
          </SpotifyContainer>
        ) : spotifyData && spotifyData.is_playing ? (
          <SpotifyContainer>
            <SpotifyStatus>🎧 Now Playing on Spotify</SpotifyStatus>
            <SpotifyContent
              href={spotifyData.item.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
            >
              <SpotifyImage
                src={spotifyData.item.album.images[0].url}
                alt={`${spotifyData.item.name} album cover`}
              />
              <SpotifyInfo>
                <SpotifyTrack>{spotifyData.item.name}</SpotifyTrack>
                <SpotifyArtist>{spotifyData.item.artists[0].name}</SpotifyArtist>
              </SpotifyInfo>
            </SpotifyContent>
          </SpotifyContainer>
        ) : (
          <SpotifyContainer>
            <SpotifyStatus>Not currently listening to anything</SpotifyStatus>
          </SpotifyContainer>
        )}
      </Section>

      <Section>
        <SectionTitle>Connect</SectionTitle>
        <LinksList>
          <LinkItem href="https://github.com/nasirmovlamov" target="_blank" rel="noopener noreferrer">
            GitHub @nasirmovlamov
          </LinkItem>
          <LinkItem href="https://www.linkedin.com/in/nasirmovlamov/" target="_blank" rel="noopener noreferrer">
            LinkedIn @nasirmovlamov
          </LinkItem>
          <LinkItem href="https://twitter.com/nasirmovlamov" target="_blank" rel="noopener noreferrer">
            Twitter @nasirmovlamov
          </LinkItem>
          <LinkItem href="mailto:nasirmovlamov@gmail.com">
            Email nasirmovlamov@gmail.com
          </LinkItem>
        </LinksList>
      </Section>
    </AboutContainer>
  );
};

export default About;
