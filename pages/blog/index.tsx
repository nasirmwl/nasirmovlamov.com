import { BlogPost, getAllPosts } from '../../lib/mdx';
import type { GetStaticProps, NextPage } from 'next';
import React, { useMemo } from 'react';

import { LAYOUT_CONSTANTS } from '@styles/layout-constants';
import Link from 'next/link';
import styled from 'styled-components';

const BlogContainer = styled.div`
  max-width: 800px;
  padding: 4rem 2rem;
  width: 100%;
  margin: 0 auto;

  @media (max-width: ${LAYOUT_CONSTANTS.MOBILE_BREAKPOINT}px) {
    padding: 2rem 1.5rem;
  }
`;

const Header = styled.header`
  margin-bottom: 2.5rem;

  @media (max-width: ${LAYOUT_CONSTANTS.MOBILE_BREAKPOINT}px) {
    margin-bottom: 1.5rem;
  }
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
    margin-bottom: 0.75rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: ${(props) => props.theme.colors.textSecondary};
  line-height: 1.75;
  margin-bottom: 2rem;

  @media (max-width: ${LAYOUT_CONSTANTS.MOBILE_BREAKPOINT}px) {
    margin-bottom: 1rem;
  }

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

const YearSection = styled.section`
  margin-bottom: 2rem;

  @media (max-width: ${LAYOUT_CONSTANTS.MOBILE_BREAKPOINT}px) {
    margin-bottom: 1.5rem;
  }
`;

const YearHeader = styled.div`
  display: flex;
  align-items: baseline;
  gap: 1rem;
  margin-bottom: 0.75rem;

  @media (max-width: ${LAYOUT_CONSTANTS.MOBILE_BREAKPOINT}px) {
    margin-bottom: 0.5rem;
  }
`;

const YearTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text};
  letter-spacing: -0.02em;
`;

const PostCount = styled.span`
  font-size: 0.9375rem;
  color: ${(props) => props.theme.colors.textMuted};
`;

const PostsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (max-width: ${LAYOUT_CONSTANTS.MOBILE_BREAKPOINT}px) {
    gap: 0.5rem;
  }
`;

const PostItem = styled.article`
  display: flex;
  gap: 0.75rem;
  align-items: baseline;

  @media (max-width: ${LAYOUT_CONSTANTS.MOBILE_BREAKPOINT}px) {
    flex-direction: column;
    gap: 0.25rem;
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
  line-height: 1.4;

  &:hover {
    color: ${(props) => props.theme.colors.linkHover};
  }
`;

const PostLink = styled.a`
  text-decoration: none;
  flex: 1;
`;

interface PostsByYear {
  [year: string]: BlogPost[];
}

interface BlogProps {
  posts: BlogPost[];
}

const Blog: NextPage<BlogProps> = ({ posts }) => {
  // Group posts by year
  const postsByYear = useMemo(() => {
    return posts.reduce((acc: PostsByYear, post) => {
      const year = new Date(post.date).getFullYear().toString();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(post);
      return acc;
    }, {});
  }, [posts]);

  const years = Object.keys(postsByYear).sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <BlogContainer>
      <Header>
        <Title>Blog</Title>
        <Subtitle>
          Guides, references, and tutorials on programming, web development, and design.
        </Subtitle>
      </Header>

      {years.length > 0 && (
        years.map((year) => (
          <YearSection key={year}>
            <YearHeader>
              <YearTitle>{year}</YearTitle>
              <PostCount>
                {postsByYear[year].length} {postsByYear[year].length === 1 ? 'post' : 'posts'}
              </PostCount>
            </YearHeader>
            <PostsList>
              {postsByYear[year].map((post) => (
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
          </YearSection>
        ))
      )}
    </BlogContainer>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts();
  return {
    props: {
      posts,
    },
  };
};

export default Blog;
