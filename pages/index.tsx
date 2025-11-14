import { BlogPost, getAllPosts } from '../lib/mdx';
import type { GetStaticProps, NextPage } from 'next';

import { LAYOUT_CONSTANTS } from '@styles/layout-constants';
import Link from 'next/link';
import styled from 'styled-components';

const HomeContainer = styled.div`
  max-width: 800px;
  padding: 4rem 2rem;
  width: 100%;
  margin: 0 auto;

  @media (max-width: ${LAYOUT_CONSTANTS.MOBILE_BREAKPOINT}px) {
    padding: 2rem 1rem;
  }
`;

const Hero = styled.section`
  margin-bottom: 5rem;
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

const Description = styled.p`
  font-size: 1.125rem;
  color: ${(props) => props.theme.colors.textSecondary};
  height:auto;
  margin:0;
  padding:0;
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

const Section = styled.section`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.25rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 0.1rem;
  letter-spacing: -0.02em;
`;

const PostsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PostItem = styled.article`
  display: flex;
  gap: 1rem;
  align-items: baseline;

  @media (max-width: ${LAYOUT_CONSTANTS.MOBILE_BREAKPOINT}px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const PostDate = styled.time`
  font-size: 0.9375rem;
  color: ${(props) => props.theme.colors.textMuted};
  min-width: 110px;
  flex-shrink: 0;

  @media (max-width: ${LAYOUT_CONSTANTS.MOBILE_BREAKPOINT}px) {
    min-width: auto;
  }
`;

const PostTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.link};
  text-decoration: none;
  transition: color 0.15s ease;
  cursor: pointer;
  line-height: 1;
  padding: 0;
  margin: 0;

  &:hover {
    color: ${(props) => props.theme.colors.linkHover};
  }
`;

const PostLink = styled.a`
  text-decoration: none;
  flex: 1;
`;

const ViewAllLink = styled(Link)`
  display: inline-block;
  margin-top: 1.5rem;
  font-size: 1rem;
  color: ${(props) => props.theme.colors.link};
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: all 0.15s ease;

  &:hover {
    color: ${(props) => props.theme.colors.linkHover};
    border-bottom-color: ${(props) => props.theme.colors.linkHover};
  }

  &::after {
    content: ' →';
  }
`;

const HighlightsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;

  @media (max-width: ${LAYOUT_CONSTANTS.MOBILE_BREAKPOINT}px) {
    gap: 1rem;
    margin-top: 1.5rem;
  }
`;

const HighlightCard = styled.div`
  padding: 2rem;
  background: ${(props) => props.theme.colors.gray_1};
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.colors.gray_1};
  transition: all 0.2s ease;
  width: 100%;
  box-sizing: border-box;

  &:hover {
    border-color: ${(props) => props.theme.colors.borderLight};
    background: ${(props) => props.theme.colors.gray_1}cc;
  }

  @media (max-width: ${LAYOUT_CONSTANTS.MOBILE_BREAKPOINT}px) {
    padding: 1rem;
    border-radius: 8px;
  }
`;

const HighlightTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 0.625rem;
  line-height: 1.4;

  @media (max-width: ${LAYOUT_CONSTANTS.MOBILE_BREAKPOINT}px) {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
`;

const HighlightDescription = styled.p`
  font-size: 0.9375rem;
  color: ${(props) => props.theme.colors.textSecondary};
  line-height: 1.6;

  @media (max-width: ${LAYOUT_CONSTANTS.MOBILE_BREAKPOINT}px) {
    font-size: 0.875rem;
    line-height: 1.5;
  }
`;

interface HomeProps {
  recentPosts: BlogPost[];
}

const Home: NextPage<HomeProps> = ({ recentPosts }) => {
  return (
    <HomeContainer>
      <Hero>
        <Title>Hey, I&apos;m Nasir!</Title>
        <Description>
          I&apos;m a software engineer, open-source creator, and lifelong learner. I&apos;ve been
          making websites and writing about technology for years!
        </Description>
      </Hero>

      <Section>
        <SectionTitle>Highlights</SectionTitle>
        <HighlightsList>
          <HighlightCard>
            <HighlightTitle>💻 Open Source & Tech Writing</HighlightTitle>
            <HighlightDescription>
              Passionate about sharing knowledge through blog posts and contributing to open-source projects.
              Writing about software engineering, React, and technology trends.
            </HighlightDescription>
          </HighlightCard>

          <HighlightCard>
            <HighlightTitle>🚀 Lead Software Engineer at ABB</HighlightTitle>
            <HighlightDescription>
              Leading frontend development for the Mortgage Tribe, building scalable micro-frontend architectures
              that automate banking processes. Mentored junior engineers on best practices and architecture patterns.
            </HighlightDescription>
          </HighlightCard>

          <HighlightCard>
            <HighlightTitle>🎓 Master&apos;s in Artificial Intelligence</HighlightTitle>
            <HighlightDescription>
              Completed advanced studies in AI, covering Neural Networks, Deep Learning, Reinforcement Learning,
              and Data Mining. Always exploring the intersection of AI and web development.
            </HighlightDescription>
          </HighlightCard>
        </HighlightsList>
      </Section>

      <Section>
        <SectionTitle>Blog</SectionTitle>
        <PostsList>
          {recentPosts.map((post) => (
            <PostItem key={post.slug}>
              <PostDate dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                })}
              </PostDate>
              <Link href={`/blog/${post.slug}`} passHref>
                <PostLink>
                  <PostTitle>{post.title}</PostTitle>
                </PostLink>
              </Link>
            </PostItem>
          ))}
        </PostsList>
        {recentPosts.length > 0 && (
          <ViewAllLink href="/blog">View all posts</ViewAllLink>
        )}
      </Section>

      <Section>
        <SectionTitle>Connect</SectionTitle>
        <Description>
          Find me on{' '}
          <a href="https://github.com/nasirmovlamov" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          ,{' '}
          <a href="https://www.linkedin.com/in/nasirmovlamov/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          ,{' '}
          <a href="https://twitter.com/nasirmovlamov" target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
          , or reach out via{' '}
          <a href="mailto:nasirmovlamov@gmail.com">
            email
          </a>
          .
        </Description>
      </Section>
    </HomeContainer>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = getAllPosts();
  const recentPosts = allPosts.slice(0, 5);

  return {
    props: {
      recentPosts,
    },
  };
};

export default Home;
