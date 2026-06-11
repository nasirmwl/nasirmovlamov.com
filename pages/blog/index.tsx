import { BlogPost, getAllPosts } from '../../lib/mdx';
import type { GetStaticProps, NextPage } from 'next';
import React, { useMemo } from 'react';

import { LAYOUT_CONSTANTS } from '@styles/layout-constants';
import Link from 'next/link';
import styled from 'styled-components';
import { PageShell, TerminalHeader } from '@components/shared/terminal/PageTerminal';

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
  font-size: 1.5rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text};
  letter-spacing: 0.02em;

  &::before {
    content: '// ';
    color: ${(props) => props.theme.colors.primary};
  }
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
    <PageShell>
      <TerminalHeader
        command="ls ~/blog --all"
        title="Blog"
        subtitle="Guides, references, and tutorials on programming, web development, and design."
      />

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
                  <PostLink as={Link} href={`/blog/${post.slug}`}>
                    <PostTitle>{post.title}</PostTitle>
                  </PostLink>
                </PostItem>
              ))}
            </PostsList>
          </YearSection>
        ))
      )}
    </PageShell>
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
