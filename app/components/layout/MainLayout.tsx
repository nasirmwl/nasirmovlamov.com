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
  margin-left: ${LAYOUT_CONSTANTS.SIDEBAR_WIDTH}px;
  min-height: 100vh;
  display: flex;
  justify-content: center;

  @media (max-width: ${LAYOUT_CONSTANTS.MOBILE_BREAKPOINT}px) {
    margin-left: 0;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: calc(100vw - ${LAYOUT_CONSTANTS.SIDEBAR_WIDTH}px - 4rem);
  display: flex;
  padding: 0 0.5rem;

  @media (max-width: ${LAYOUT_CONSTANTS.MOBILE_BREAKPOINT}px) {
    padding: 4rem 1rem 1rem 1rem;
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
