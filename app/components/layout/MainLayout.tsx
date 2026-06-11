import React from 'react';
import { Sidebar } from '@components/modules/sidebar-new/Sidebar';
import styled from 'styled-components';
import { LAYOUT_CONSTANTS } from '@styles/layout-constants';

const LayoutContainer = styled.div`
  min-height: 100vh;
  background: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  position: relative;
`;

const MainContent = styled.main`
  min-height: 100vh;
  display: flex;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 980px;
  display: flex;
  padding: 4.5rem 1rem 2rem;

  @media (max-width: ${LAYOUT_CONSTANTS.MOBILE_BREAKPOINT}px) {
    padding: 4.5rem 1rem 1rem;
    max-width: 100%;
  }
`;

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <Sidebar />
      <MainContent>
        <ContentWrapper>{children}</ContentWrapper>
      </MainContent>
    </LayoutContainer>
  );
};
