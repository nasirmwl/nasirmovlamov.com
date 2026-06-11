import { useEffect, useState } from 'react';

import { LAYOUT_CONSTANTS } from '@styles/layout-constants';
import type { NextPage } from 'next';
import axios from 'axios';
import { getAccessToken } from '@helpers/api/spotify';
import styled from 'styled-components';
import { PageShell, TerminalHeader } from '@components/shared/terminal/PageTerminal';

const Section = styled.section`
  margin-bottom: 2.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 1.25rem;
  letter-spacing: 0.02em;

  &::before {
    content: '// ';
    color: ${(props) => props.theme.colors.primary};
  }
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
  padding: 0.3rem 0.7rem;
  background: ${(props) => props.theme.colors.backgroundTertiary};
  color: ${(props) => props.theme.colors.textSecondary};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 2px;
  font-size: 0.8rem;

  &::before {
    content: '> ';
    color: ${(props) => props.theme.colors.primary};
  }
`;

const LinksList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
`;

const LinkItem = styled.a`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.link};
  text-decoration: none;
  transition: color 0.15s ease;

  &:hover {
    color: ${(props) => props.theme.colors.linkHover};
    text-decoration: underline;
  }

  &::before {
    content: '> ';
    color: ${(props) => props.theme.colors.primary};
    margin-right: 0.4rem;
  }
`;

const SpotifyContainer = styled.div`
  margin-top: 1.5rem;
  padding: 1.25rem;
  background: ${(props) => props.theme.colors.backgroundTertiary}80;
  border-radius: 2px;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-left: 2px solid ${(props) => props.theme.colors.primary};
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
    <PageShell>
      <TerminalHeader command="cat about.md" title="About Me" />

      <Section>
        <Paragraph>
          Hi, I&apos;m Nasir Movlamov, a Senior Software Engineer at the National Artificial Intelligence Center (NAIC). 
          I specialize in building modern web applications with over 5 years of professional experience. 
          I hold a Master&apos;s degree in Artificial Intelligence and a Bachelor&apos;s degree in Computer Engineering.
        </Paragraph>
        <Paragraph>
          I specialize in micro-frontend architectures, React ecosystems, and creating scalable, maintainable
          software solutions. I&apos;m passionate about testing, code quality, and mentoring junior engineers.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>experience</SectionTitle>

        <ExperienceItem>
          <JobTitle>Senior Software Engineer</JobTitle>
          <Company>National Artificial Intelligence Center (NAIC) — naic.az</Company>
          <Duration>Feb 2026 - Present · Baku, Azerbaijan</Duration>
          <Description>
            Building Azerbaijan’s unified Single Window for international trade (dlp.gov.az). 
            Streamlining end-to-end logistics through centralized document management, real-time tracking, 
            integrated workflows with government agencies, and automated business process execution.
          </Description>
          <SkillsList>
            <SkillTag>JavaScript</SkillTag>
            <SkillTag>TypeScript</SkillTag>
            <SkillTag>React.js</SkillTag>
          </SkillsList>
        </ExperienceItem>

        <ExperienceItem>
          <JobTitle>Lead Software Engineer</JobTitle>
          <Company>ABB</Company>
          <Duration>Oct 2022 - Feb 2026 · 3 yrs 5 mos · Baku, Azerbaijan (Hybrid)</Duration>
          <Description>
            Built and scaled frontend systems powering ABB’s mortgage ecosystem (abbhome.az), 
            one of the largest mortgage portfolios in Azerbaijan.
          </Description>
          <Description>
            Key achievements include:
          </Description>
          <Description>
            • Maintained and implemented a micro-frontend platform for complex mortgage workflows.<br/>
            • Increased test coverage from 10% → 80%, significantly improving system reliability.<br/>
            • Implemented Google, Apple, and card payment systems within the mortgage flow.<br/>
            • Authored and maintained frontend architecture documentation, standardizing practices.<br/>
            • Mentored junior engineers and drove adoption of clean code and scalable patterns.
          </Description>
          <SkillsList>
            <SkillTag>Micro-frontends</SkillTag>
            <SkillTag>React.js</SkillTag>
            <SkillTag>TypeScript</SkillTag>
            <SkillTag>Testing</SkillTag>
          </SkillsList>
        </ExperienceItem>

        <ExperienceItem>
          <JobTitle>Software Engineer</JobTitle>
          <Company>A2Z Technologies</Company>
          <Duration>Oct 2021 - Oct 2022 · 1 yr 1 mo · Baku, Azerbaijan</Duration>
          <Description>
            Worked in the ICT Department&apos;s Product Service Development Unit, developing proprietary 
            software solutions for government institutions.
          </Description>
          <SkillsList>
            <SkillTag>React.js</SkillTag>
            <SkillTag>Tailwind CSS</SkillTag>
            <SkillTag>TypeScript</SkillTag>
          </SkillsList>
        </ExperienceItem>

        <ExperienceItem>
          <JobTitle>Software Engineer</JobTitle>
          <Company>Abyss</Company>
          <Duration>Aug 2021 - Feb 2022 · 7 mos · Azerbaijan</Duration>
          <Description>
            In this startup environment, handled end-to-end ownership across requirements analysis, 
            system design, development, deployment, and security validation.
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
            Built efficient and sophisticated user interfaces for all business and product websites.
          </Description>
          <SkillsList>
            <SkillTag>Bootstrap</SkillTag>
            <SkillTag>React.js</SkillTag>
          </SkillsList>
        </ExperienceItem>
      </Section>

      <Section>
        <SectionTitle>education</SectionTitle>

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
        <SectionTitle>currently listening</SectionTitle>
        {loading === 'pending' ? (
          <SpotifyContainer>
            <SpotifyStatus>Loading...</SpotifyStatus>
          </SpotifyContainer>
        ) : spotifyData && spotifyData.is_playing ? (
          <SpotifyContainer>
            <SpotifyStatus>now playing on spotify</SpotifyStatus>
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
        <SectionTitle>connect</SectionTitle>
        <LinksList>
          <LinkItem href="https://github.com/nasirmwl" target="_blank" rel="noopener noreferrer">
            GitHub @nasirmwl
          </LinkItem>
          <LinkItem href="https://www.linkedin.com/in/nasirmovlamov/" target="_blank" rel="noopener noreferrer">
            LinkedIn @nasirmovlamov
          </LinkItem>
        </LinksList>
      </Section>
    </PageShell>
  );
};

export default About;
