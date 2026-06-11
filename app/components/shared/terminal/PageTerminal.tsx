import React, { ReactNode } from 'react';

import { LAYOUT_CONSTANTS } from '@styles/layout-constants';
import styled, { keyframes } from 'styled-components';

const blink = keyframes`
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
`;

export const PageShell = styled.div`
  position: relative;
  z-index: 1;
  max-width: 860px;
  width: 100%;
  margin: 0 auto;
  padding: 0.5rem 1rem 3rem;

  @media (max-width: ${LAYOUT_CONSTANTS.MOBILE_BREAKPOINT}px) {
    padding: 0.5rem 0.25rem 1.5rem;
  }
`;

const Window = styled.div`
  background: ${(props) => props.theme.colors.backgroundSecondary}d9;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 4px;
  box-shadow:
    0 0 0 1px rgba(94, 227, 151, 0.06),
    0 16px 48px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  backdrop-filter: blur(1px);
  margin-bottom: 2rem;
`;

const Bar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 1rem;
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
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.textTertiary};
  text-shadow: none;
`;

const Body = styled.div`
  padding: 1.4rem 1.5rem 1.6rem;

  @media (max-width: ${LAYOUT_CONSTANTS.MOBILE_BREAKPOINT}px) {
    padding: 1.1rem 1rem 1.3rem;
  }
`;

const PromptLine = styled.div`
  font-size: 0.9rem;
  line-height: 1.6;
  word-break: break-word;
`;

const PromptUser = styled.span`
  color: ${(props) => props.theme.colors.textTertiary};
`;

const PromptSym = styled.span`
  color: ${(props) => props.theme.colors.primary};
`;

const Cmd = styled.span`
  color: ${(props) => props.theme.colors.text};
`;

export const Caret = styled.span`
  display: inline-block;
  width: 0.55em;
  height: 1em;
  margin-left: 2px;
  vertical-align: text-bottom;
  background: ${(props) => props.theme.colors.primary};
  box-shadow: 0 0 8px rgba(94, 227, 151, 0.6);
  animation: ${blink} 1s step-end infinite;
`;

const TitleText = styled.h1`
  font-size: 2.25rem;
  font-weight: 800;
  color: ${(props) => props.theme.colors.text};
  letter-spacing: -0.01em;
  margin: 0.75rem 0 0;

  @media (max-width: ${LAYOUT_CONSTANTS.MOBILE_BREAKPOINT}px) {
    font-size: 1.9rem;
  }
`;

const Sub = styled.p`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.textSecondary};
  line-height: 1.7;
  margin-top: 0.6rem;
`;

interface TerminalHeaderProps {
  command: string;
  title?: string;
  subtitle?: ReactNode;
  children?: ReactNode;
}

export const TerminalHeader: React.FC<TerminalHeaderProps> = ({
  command,
  title,
  subtitle,
  children,
}) => (
  <Window>
    <Bar>
      <TermTitle>nasir@portfolio — shell</TermTitle>
      <Dots>
        <Dot $color="#888888" aria-hidden="true">–</Dot>
        <Dot $color="#888888" aria-hidden="true">□</Dot>
        <Dot $color="#e95420" aria-hidden="true">✕</Dot>
      </Dots>
    </Bar>
    <Body>
      <PromptLine>
        <PromptUser>nasir@portfolio</PromptUser>
        <PromptSym>:~$</PromptSym> <Cmd>{command}</Cmd>
        <Caret />
      </PromptLine>
      {title && <TitleText>{title}</TitleText>}
      {subtitle && <Sub>{subtitle}</Sub>}
      {children}
    </Body>
  </Window>
);

/** Square, CRT-styled content card with a phosphor accent edge. */
export const CrtCard = styled.div`
  padding: 1.5rem;
  background: ${(props) => props.theme.colors.backgroundSecondary}b3;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-left: 2px solid ${(props) => props.theme.colors.border};
  border-radius: 2px;
  transition: border-color 0.2s, transform 0.2s;

  &:hover {
    border-color: ${(props) => props.theme.colors.primary};
    border-left-color: ${(props) => props.theme.colors.primary};
  }

  @media (max-width: ${LAYOUT_CONSTANTS.MOBILE_BREAKPOINT}px) {
    padding: 1.1rem;
  }
`;

export const CrtTag = styled.span`
  padding: 0.3rem 0.7rem;
  background: ${(props) => props.theme.colors.backgroundTertiary};
  color: ${(props) => props.theme.colors.primary};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 2px;
  font-size: 0.75rem;
  letter-spacing: 0.04em;

  &::before {
    content: '#';
    opacity: 0.6;
  }
`;
