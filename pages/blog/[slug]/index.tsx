import React from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import styled from 'styled-components';
import { getAllPostSlugs, getPostBySlug, BlogPost } from '../../../lib/mdx';
import MDXComponents from '../../../app/components/modules/blog/MDXComponents';
import { LAYOUT_CONSTANTS } from '@styles/layout-constants';

const Container = styled.div`
  max-width: 800px;
  width: 100%;
  padding: 4rem 2rem;
  margin: 0 auto;
  
  @media (max-width: ${LAYOUT_CONSTANTS.MOBILE_BREAKPOINT}px) {
    padding: 2rem 1.5rem;
  }
`;

const Header = styled.header`
  margin-bottom: 4rem;
  padding-bottom: 2.5rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: ${(props) => props.theme.colors.text};
  line-height: 1.2;
  letter-spacing: -0.03em;

  @media (max-width: 768px) {
    font-size: 2.25rem;
  }
`;

const Description = styled.p`
  font-size: 1.25rem;
  color: ${(props) => props.theme.colors.textSecondary};
  line-height: 1.7;
  margin-bottom: 2rem;
`;

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  color: ${(props) => props.theme.colors.textMuted};
  font-size: 0.9375rem;
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1.5rem;
`;

const Tag = styled.span`
  background: transparent;
  color: ${(props) => props.theme.colors.textMuted};
  padding: 0;
  font-size: 0.9rem;
  
  &:not(:last-child)::after {
    content: ',';
    margin-right: 0.375rem;
  }
`;

const Content = styled.article`
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: 1.125rem;
  line-height: 1.8;
  font-family: ${(props) => props.theme.font?.families?.body};

  h1, h2, h3, h4, h5, h6 {
    color: ${(props) => props.theme.colors.text};
    font-weight: 700;
    line-height: 1.3;
    margin-top: 3rem;
    margin-bottom: 1.25rem;
    letter-spacing: -0.02em;
    scroll-margin-top: 2rem;
  }

  h1 {
    font-size: 2.25rem;
    margin-top: 3.5rem;
  }

  h2 {
    font-size: 2rem;
    margin-top: 3.5rem;
  }

  h3 {
    font-size: 1.625rem;
    margin-top: 2.5rem;
  }

  h4 {
    font-size: 1.375rem;
  }

  p {
    margin-bottom: 1.75rem;
    line-height: 1.8;
  }

  a {
    color: ${(props) => props.theme.colors.link};
    text-decoration: none;
    border-bottom: 1px solid ${(props) => props.theme.colors.link}40;
    transition: all 0.15s ease;

    &:hover {
      color: ${(props) => props.theme.colors.linkHover};
      border-bottom-color: ${(props) => props.theme.colors.linkHover};
    }
  }

  code {
    background: ${(props) => props.theme.colors.codeBackground || props.theme.colors.gray_1};
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.9em;
    font-family: 'Monaco', 'Menlo', 'Consolas', 'Courier New', monospace;
    color: ${(props) => props.theme.colors.codeText || props.theme.colors.primary};
    border: 1px solid ${(props) => props.theme.colors.codeBorder || props.theme.colors.border};
  }

  pre {
    background: ${(props) => props.theme.colors.codeBackground || props.theme.colors.gray_1};
    padding: 1.5rem;
    border-radius: 8px;
    overflow-x: auto;
    margin: 2.5rem 0;
    border: 1px solid ${(props) => props.theme.colors.codeBorder || props.theme.colors.border};
    line-height: 1.6;

    code {
      background: none;
      padding: 0;
      font-size: 0.9375rem;
      border: none;
      color: ${(props) => props.theme.colors.codeText || props.theme.colors.textSecondary};
    }
  }

  blockquote {
    border-left: 3px solid ${(props) => props.theme.colors.primary};
    padding-left: 1.5rem;
    margin: 2.5rem 0;
    font-style: italic;
    color: ${(props) => props.theme.colors.textMuted};
    font-size: 1.125rem;
  }

  ul, ol {
    margin: 1.75rem 0;
    padding-left: 1.75rem;
  }

  li {
    margin-bottom: 0.875rem;
    padding-left: 0.5rem;
    line-height: 1.7;
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 2.5rem 0;
    border: 1px solid ${(props) => props.theme.colors.gray_1};
  }

  strong {
    font-weight: 600;
    color: ${(props) => props.theme.colors.text};
  }

  em {
    font-style: italic;
  }

  hr {
    border: none;
    border-top: 1px solid ${(props) => props.theme.colors.border};
    margin: 3rem 0;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 2.5rem 0;
    font-size: 1rem;
  }

  th, td {
    padding: 0.75rem 1rem;
    border: 1px solid ${(props) => props.theme.colors.border};
    text-align: left;
  }

  th {
    background: ${(props) => props.theme.colors.gray_1};
    font-weight: 600;
    color: ${(props) => props.theme.colors.text};
  }

  td {
    color: ${(props) => props.theme.colors.textSecondary};
  }

  @media (max-width: 768px) {
    font-size: 1.0625rem;
    
    h1 {
      font-size: 1.875rem;
    }

    h2 {
      font-size: 1.625rem;
    }

    h3 {
      font-size: 1.375rem;
    }

    pre {
      padding: 1rem;
      margin: 2rem -0.5rem;
    }
  }
`;

interface BlogPostPageProps {
  post: BlogPost;
  mdxSource: MDXRemoteSerializeResult;
}

const BlogPostPage: NextPage<BlogPostPageProps> = ({ post, mdxSource }) => {
  return (
    <Container>
      <Header>
        <Title>{post.title}</Title>
        {post.description && <Description>{post.description}</Description>}
        <Meta>
          {post.date && (
            <MetaItem>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </MetaItem>
          )}
          {post.readingTime && <MetaItem>• {post.readingTime}</MetaItem>}
          {post.author && <MetaItem>• {post.author}</MetaItem>}
        </Meta>
        {post.tags && post.tags.length > 0 && (
          <Tags>
            {post.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </Tags>
        )}
      </Header>
      <Content>
        <MDXRemote {...mdxSource} components={MDXComponents} />
      </Content>
    </Container>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostSlugs();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  const mdxSource = await serialize(post.content);

  return {
    props: {
      post,
      mdxSource,
    },
  };
};

export default BlogPostPage;
