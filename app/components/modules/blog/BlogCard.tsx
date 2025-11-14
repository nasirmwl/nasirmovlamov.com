import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { BlogPost } from '../../../../lib/mdx';

const Card = styled.div`
  background: ${(props) => props.theme.colors.backgroundSecondary};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
`;

const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: ${(props) => props.theme.colors.text};
`;

const Description = styled.p`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.textSecondary};
  margin-bottom: 1rem;
  line-height: 1.6;
  flex-grow: 1;
`;

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.textSecondary};
  margin-top: auto;
`;

const DateText = styled.span`
  font-weight: 500;
`;

const ReadingTime = styled.span``;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
`;

const Tag = styled.span`
  background: ${(props) => props.theme.colors.primary}20;
  color: ${(props) => props.theme.colors.primary};
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
`;

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
      <Card as={Link} href={`/blog/${post.slug}`}>
        <Title>{post.title}</Title>
        <Description>{post.description}</Description>
        <Meta>
          {post.date && <DateText>{new Date(post.date).toLocaleDateString()}</DateText>}
          {post.readingTime && <ReadingTime>{post.readingTime}</ReadingTime>}
        </Meta>
        {post.tags && post.tags.length > 0 && (
          <Tags>
            {post.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </Tags>
        )}
      </Card>
  );
};

