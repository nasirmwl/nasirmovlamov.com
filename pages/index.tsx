import { BlogPost, getAllPosts } from '../lib/mdx';
import type { GetStaticProps, NextPage } from 'next';

import Link from 'next/link';
import styled from 'styled-components';

const HomeContainer = styled.div`
  max-width: 800px;
  padding: 3rem 2rem;
  width: 100%;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
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

  @media (max-width: 768px) {
    font-size: 2.75rem;
  }
`;

const Description = styled.p`
  font-size: 1.125rem;
  color: ${(props) => props.theme.colors.textSecondary};
  line-height: 1.75;
  margin-bottom: 1.25rem;

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
  margin-bottom: 5rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.25rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 2.5rem;
  letter-spacing: -0.02em;
`;

const PostsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
`;

const PostItem = styled.article`
  display: flex;
  gap: 2.5rem;
  align-items: baseline;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const PostDate = styled.time`
  font-size: 0.9375rem;
  color: ${(props) => props.theme.colors.textMuted};
  min-width: 110px;
  flex-shrink: 0;

  @media (max-width: 768px) {
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
  line-height: 1.4;

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
  display: grid;
  gap: 2rem;
  margin-top: 2rem;
`;

const HighlightCard = styled.div`
  padding: 1.75rem;
  background: ${(props) => props.theme.colors.gray_1};
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.colors.gray_1};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${(props) => props.theme.colors.borderLight};
    background: ${(props) => props.theme.colors.gray_1}cc;
  }
`;

const HighlightTitle = styled.h3`
  font-size: 1.375rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 0.75rem;
  line-height: 1.3;
`;

const HighlightDescription = styled.p`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.textSecondary};
  line-height: 1.7;
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
        <Description>Everything on this site is written by me, not AI.</Description>
      </Hero>

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
        <ViewAllLink href="/blog">View all posts</ViewAllLink>
      </Section>

      <Section>
        <SectionTitle>Notes</SectionTitle>
        <Description>Life, projects, and everything else.</Description>
        <ViewAllLink href="/snippets">View all notes</ViewAllLink>
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
