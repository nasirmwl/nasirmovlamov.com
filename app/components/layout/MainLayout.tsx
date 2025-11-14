import React from 'react';
import { Sidebar } from '@components/modules/sidebar-new/Sidebar';
import styled from 'styled-components';

const LayoutContainer = styled.div`
  min-height: 100vh;
  background: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  position: relative;
`;

const MainContent = styled.main`
  margin-left: 300px;
  min-height: 100vh;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  padding: 0 1.5rem;

  @media (max-width: 768px) {
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
