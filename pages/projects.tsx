import type { NextPage } from 'next';
import styled from 'styled-components';

const ProjectsContainer = styled.div`
  max-width: 800px;
  padding: 3rem 2rem;
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

const Header = styled.header`
  margin-bottom: 4rem;
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

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: ${(props) => props.theme.colors.textSecondary};
  line-height: 1.75;
`;

const ProjectsGrid = styled.div`
  display: grid;
  gap: 2rem;
`;

const ProjectCard = styled.article`
  padding: 2rem;
  background: ${(props) => props.theme.colors.backgroundSecondary};
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.colors.border};
  transition: all 0.2s;

  &:hover {
    border-color: ${(props) => props.theme.colors.primary};
    transform: translateY(-2px);
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 0.75rem;
`;

const ProjectDescription = styled.p`
  font-size: 1.0625rem;
  line-height: 1.7;
  color: ${(props) => props.theme.colors.textSecondary};
  margin-bottom: 1.25rem;
`;

const ProjectTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
`;

const Tag = styled.span`
  padding: 0.375rem 0.875rem;
  background: ${(props) => props.theme.colors.backgroundTertiary};
  color: ${(props) => props.theme.colors.textSecondary};
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid ${(props) => props.theme.colors.border};
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const ProjectLink = styled.a`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.link};
  text-decoration: none;
  transition: color 0.15s ease;

  &:hover {
    color: ${(props) => props.theme.colors.linkHover};
  }

  &::before {
    content: '→ ';
    margin-right: 0.25rem;
  }
`;

const Projects: NextPage = () => {
  return (
    <ProjectsContainer>
      <Header>
        <Title>Projects</Title>
        <Subtitle>
          A collection of open-source projects, tools, and experiments I&apos;ve built over the years.
        </Subtitle>
      </Header>

      <ProjectsGrid>
        <ProjectCard>
          <ProjectTitle>Personal Portfolio & Blog</ProjectTitle>
          <ProjectDescription>
            A modern portfolio website built with Next.js, TypeScript, and styled-components. 
            Features MDX-powered blog posts, dark mode, and a notes section for quick technical tips.
          </ProjectDescription>
          <ProjectTags>
            <Tag>Next.js</Tag>
            <Tag>TypeScript</Tag>
            <Tag>styled-components</Tag>
            <Tag>MDX</Tag>
          </ProjectTags>
          <ProjectLinks>
            <ProjectLink href="https://github.com/nasirmovlamov/nasirmovlamov.me" target="_blank" rel="noopener noreferrer">
              View on GitHub
            </ProjectLink>
          </ProjectLinks>
        </ProjectCard>

        <ProjectCard>
          <ProjectTitle>Micro-Frontend Architecture</ProjectTitle>
          <ProjectDescription>
            Enterprise-scale micro-frontend architecture using Webpack Module Federation. 
            Successfully increased test coverage from 10% to 80% and improved developer experience.
          </ProjectDescription>
          <ProjectTags>
            <Tag>React</Tag>
            <Tag>Webpack</Tag>
            <Tag>Module Federation</Tag>
            <Tag>Testing</Tag>
          </ProjectTags>
          <ProjectLinks>
            <ProjectLink href="#" onClick={(e) => e.preventDefault()}>
              Private Project
            </ProjectLink>
          </ProjectLinks>
        </ProjectCard>

        <ProjectCard>
          <ProjectTitle>More Projects Coming Soon</ProjectTitle>
          <ProjectDescription>
            I&apos;m constantly working on new projects and open-source contributions. 
            Check back later or follow me on GitHub to see what I&apos;m building next.
          </ProjectDescription>
          <ProjectTags>
            <Tag>Open Source</Tag>
            <Tag>React</Tag>
            <Tag>TypeScript</Tag>
          </ProjectTags>
          <ProjectLinks>
            <ProjectLink href="https://github.com/nasirmovlamov" target="_blank" rel="noopener noreferrer">
              View on GitHub
            </ProjectLink>
          </ProjectLinks>
        </ProjectCard>
      </ProjectsGrid>
    </ProjectsContainer>
  );
};

export default Projects;

