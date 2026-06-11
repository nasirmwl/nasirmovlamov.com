import { BlogPost, getAllPosts } from '../lib/mdx';
import type { GetStaticProps, NextPage } from 'next';
import styled, { keyframes } from 'styled-components';

import { LAYOUT_CONSTANTS } from '@styles/layout-constants';
import Link from 'next/link';
import SEO from '../app/components/shared/SEO';
import { MatrixRain } from '@components/shared/MatrixRain/MatrixRain';
import { useTypewriter } from '@helpers/hooks/useTypewriter';

const WHOAMI =
  "I'm a software engineer who likes building things and learning more about technology along the way.";

const HomeContainer = styled.div`
  position: relative;
  z-index: 1;
  max-width: 820px;
  padding: 0.5rem 1rem 3rem;
  width: 100%;
  margin: 0 auto;

  @media (max-width: ${LAYOUT_CONSTANTS.MOBILE_BREAKPOINT}px) {
    padding: 0.5rem 0.5rem 1.5rem;
  }
`;

const Terminal = styled.div`
  background: ${(props) => props.theme.colors.backgroundSecondary}d9;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 4px;
  box-shadow:
    0 0 0 1px rgba(94, 227, 151, 0.06),
    0 16px 48px rgba(0, 0, 0, 0.55);
  overflow: hidden;
  backdrop-filter: blur(1px);
`;

const TerminalBar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.65rem 1rem;
  background: ${(props) => props.theme.colors.background}cc;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;

const Dots = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-left: auto;
`;

const Dot = styled.span<{ $color: string }>`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: ${(props) => props.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  line-height: 1;
  color: rgba(0, 0, 0, 0.6);
  text-shadow: none;
`;

const TermTitle = styled.span`
  font-size: 0.8125rem;
  color: ${(props) => props.theme.colors.textTertiary};
  text-shadow: none;
`;

const TerminalBody = styled.div`
  padding: 1.5rem 1.5rem 2rem;

  @media (max-width: ${LAYOUT_CONSTANTS.MOBILE_BREAKPOINT}px) {
    padding: 1.25rem 1rem 1.5rem;
  }
`;

const Line = styled.div`
  font-size: 0.95rem;
  line-height: 1.7;
  word-break: break-word;
`;

const Prompt = styled.span`
  color: ${(props) => props.theme.colors.primary};
`;

const PromptUser = styled.span`
  color: ${(props) => props.theme.colors.textTertiary};
`;

const Command = styled.span`
  color: ${(props) => props.theme.colors.text};
`;

const Output = styled.div`
  font-size: 1rem;
  line-height: 1.7;
  color: ${(props) => props.theme.colors.textSecondary};
  margin: 0.35rem 0 0.5rem;
`;

const blink = keyframes`
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
`;

const Cursor = styled.span`
  display: inline-block;
  width: 0.6em;
  height: 1.05em;
  margin-left: 2px;
  vertical-align: text-bottom;
  background: ${(props) => props.theme.colors.primary};
  box-shadow: 0 0 8px rgba(94, 227, 151, 0.6);
  animation: ${blink} 1s step-end infinite;
`;

const Block = styled.div`
  margin-top: 1.75rem;
`;

const CommandLine = styled.div`
  font-size: 0.95rem;
  margin-bottom: 0.85rem;
`;

const Comment = styled.div`
  color: ${(props) => props.theme.colors.textMuted};
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
`;

const HighlightsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const HighlightCard = styled.div`
  padding: 1rem 1.15rem;
  background: ${(props) => props.theme.colors.backgroundTertiary}99;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-left: 2px solid ${(props) => props.theme.colors.primary};
  border-radius: 2px;
`;

const HighlightTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 0.4rem;
`;

const HighlightDescription = styled.p`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.textSecondary};
  line-height: 1.6;
`;

const PostsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const PostItem = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: baseline;

  &::before {
    content: '>';
    color: ${(props) => props.theme.colors.primary};
    flex-shrink: 0;
  }

  @media (max-width: ${LAYOUT_CONSTANTS.MOBILE_BREAKPOINT}px) {
    flex-wrap: wrap;
  }
`;

const PostDate = styled.time`
  font-size: 0.85rem;
  color: ${(props) => props.theme.colors.textMuted};
  min-width: 120px;
  flex-shrink: 0;
`;

const PostLink = styled(Link)`
  font-size: 0.95rem;
  color: ${(props) => props.theme.colors.link};
  flex: 1;

  &:hover {
    color: ${(props) => props.theme.colors.linkHover};
    text-decoration: underline;
  }
`;

const ViewAllLink = styled(Link)`
  display: inline-block;
  margin-top: 1rem;
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.link};

  &::before {
    content: '$ ';
    color: ${(props) => props.theme.colors.textMuted};
  }

  &:hover {
    color: ${(props) => props.theme.colors.linkHover};
    text-decoration: underline;
  }
`;

const Links = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  font-size: 0.95rem;

  a {
    color: ${(props) => props.theme.colors.link};

    &::before {
      content: '- ';
      color: ${(props) => props.theme.colors.textMuted};
    }

    &:hover {
      color: ${(props) => props.theme.colors.linkHover};
      text-decoration: underline;
    }
  }
`;

const ShellPrompt = ({ command }: { command: string }) => (
  <CommandLine>
    <PromptUser>nasir@portfolio</PromptUser>
    <Prompt>:~$</Prompt> <Command>{command}</Command>
  </CommandLine>
);

interface HomeProps {
  recentPosts: BlogPost[];
}

const Home: NextPage<HomeProps> = ({ recentPosts }) => {
  const { text: typed, done } = useTypewriter(WHOAMI);

  return (
    <>
      <SEO />
      <MatrixRain />
      <HomeContainer>
        <Terminal>
          <TerminalBar>
            <TermTitle>nasir@portfolio — shell</TermTitle>
            <Dots>
              <Dot $color="#888888" aria-hidden="true">–</Dot>
              <Dot $color="#888888" aria-hidden="true">□</Dot>
              <Dot $color="#e95420" aria-hidden="true">✕</Dot>
            </Dots>
          </TerminalBar>

          <TerminalBody>
            <Line>
              <PromptUser>nasir@portfolio</PromptUser>
              <Prompt>:~$</Prompt> <Command>whoami</Command>
            </Line>
            <Output>
              {typed}
              {!done && <Cursor />}
            </Output>

            {done && (
              <>
                <Block>
                  <ShellPrompt command="cat highlights.txt" />
                  <HighlightsList>
                    <HighlightCard>
                      <HighlightTitle>Open Source &amp; Tech Writing</HighlightTitle>
                      <HighlightDescription>
                        Sharing knowledge through blog posts and contributing to open-source
                        projects. Writing about software engineering, React, and technology trends.
                      </HighlightDescription>
                    </HighlightCard>

                    <HighlightCard>
                      <HighlightTitle>Senior Software Engineer at NAIC (naic.az)</HighlightTitle>
                      <HighlightDescription>
                        Building Azerbaijan&apos;s unified Digital Logistics Platform (dlp.gov.az),
                        streamlining international trade through centralized document management and
                        automated workflows.
                      </HighlightDescription>
                    </HighlightCard>

                    <HighlightCard>
                      <HighlightTitle>Master&apos;s in Artificial Intelligence</HighlightTitle>
                      <HighlightDescription>
                        Advanced studies in AI covering Neural Networks, Deep Learning,
                        Reinforcement Learning, and Data Mining. Always exploring the intersection
                        of AI and web development.
                      </HighlightDescription>
                    </HighlightCard>
                  </HighlightsList>
                </Block>

                <Block>
                  <ShellPrompt command="ls ~/blog --recent" />
                  {recentPosts.length === 0 ? (
                    <Comment># no posts yet</Comment>
                  ) : (
                    <PostsList>
                      {recentPosts.map((post) => (
                        <PostItem key={post.slug}>
                          <PostDate dateTime={post.date}>
                            {new Date(post.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </PostDate>
                          <PostLink href={`/blog/${post.slug}`}>{post.title}</PostLink>
                        </PostItem>
                      ))}
                    </PostsList>
                  )}
                  {recentPosts.length > 0 && (
                    <ViewAllLink href="/blog">cd ~/blog</ViewAllLink>
                  )}
                </Block>

                <Block>
                  <ShellPrompt command="contact --list" />
                  <Links>
                    <a
                      href="https://github.com/nasirmwl"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </a>
                    <a
                      href="https://www.linkedin.com/in/nasirmovlamov/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn
                    </a>
                  </Links>
                </Block>

                <Block>
                  <Line>
                    <PromptUser>nasir@portfolio</PromptUser>
                    <Prompt>:~$</Prompt> <Cursor />
                  </Line>
                </Block>
              </>
            )}
          </TerminalBody>
        </Terminal>
      </HomeContainer>
    </>
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
