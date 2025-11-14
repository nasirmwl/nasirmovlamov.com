import { BlogPost, getAllPosts } from '../../lib/mdx';
import type { GetStaticProps, NextPage } from 'next';
import React, { useMemo, useState } from 'react';

import Link from 'next/link';
import styled from 'styled-components';

const BlogContainer = styled.div`
  max-width: 800px;
  padding: 3rem 0;
  width: 100%;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }
`;

const Header = styled.header`
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
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
    margin-bottom: 0.75rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: ${(props) => props.theme.colors.textSecondary};
  line-height: 1.75;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
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

const SearchContainer = styled.div`
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 450px;
  padding: 0.875rem 1.25rem;
  padding-left: 2.75rem;
  background: ${(props) => props.theme.colors.gray_1};
  border: 1px solid ${(props) => props.theme.colors.gray_1};
  border-radius: 8px;
  color: ${(props) => props.theme.colors.text};
  font-size: 0.9375rem;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${(props) => props.theme.colors.borderLight};
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.textMuted};
  }
`;

const SearchWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  max-width: 450px;

  &::before {
    content: '🔍';
    position: absolute;
    left: 0.875rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.125rem;
  }
`;

const YearSection = styled.section`
  margin-bottom: 5rem;

  @media (max-width: 768px) {
    margin-bottom: 2.5rem;
  }
`;

const YearHeader = styled.div`
  display: flex;
  align-items: baseline;
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const YearTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text};
  letter-spacing: -0.02em;
`;

const PostCount = styled.span`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.textMuted};
`;

const PostsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const PostItem = styled.article`
  display: flex;
  gap: 1.5rem;
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

const NoResults = styled.div`
  text-align: center;
  padding: 3rem 0;
  color: ${(props) => props.theme.colors.textMuted};
  font-size: 1rem;
`;

interface PostsByYear {
  [year: string]: BlogPost[];
}

interface BlogProps {
  posts: BlogPost[];
}

const Blog: NextPage<BlogProps> = ({ posts }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Group posts by year and filter by search
  const postsByYear = useMemo(() => {
    const filtered = posts.filter((post) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        post.title.toLowerCase().includes(searchLower) ||
        post.description?.toLowerCase().includes(searchLower) ||
        post.tags?.some((tag) => tag.toLowerCase().includes(searchLower))
      );
    });

    return filtered.reduce((acc: PostsByYear, post) => {
      const year = new Date(post.date).getFullYear().toString();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(post);
      return acc;
    }, {});
  }, [posts, searchQuery]);

  const years = Object.keys(postsByYear).sort((a, b) => parseInt(b) - parseInt(a));
  const totalPosts = posts.length;

  return (
    <BlogContainer>
      <Header>
        <Title>Blog</Title>
        <Subtitle>
          Guides, references, and tutorials on programming, web development, and design.
        </Subtitle>

        <SearchContainer>
          <SearchWrapper>
            <SearchInput
              type="text"
              placeholder={`Search ${totalPosts} articles...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchWrapper>
        </SearchContainer>
      </Header>

      {years.length > 0 ? (
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
      ) : (
        <NoResults>No posts found matching &quot;{searchQuery}&quot;</NoResults>
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
