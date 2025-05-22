import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';
import { selectGameState } from '../store/gameSlice';

/**
 * Main layout component for the Enterprise Empire game
 */
const Layout = () => {
  const { gameStarted, gameOver } = useSelector(selectGameState);
  
  return (
    <LayoutContainer>
      <Header />
      <MainContent>
        {gameOver ? (
          <GameOverMessage>
            <h2>Game Over</h2>
            <p>Your final company value: $1,234,567</p>
          </GameOverMessage>
        ) : (
          <Outlet />
        )}
      </MainContent>
      <Footer>
        <p>© Enterprise Empire Simulation Game</p>
      </Footer>
    </LayoutContainer>
  );
};

// Styled components
const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--kavia-dark);
  color: var(--text-color);
`;

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
  margin-top: 60px;
  max-width: 1200px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`;

const GameOverMessage = styled.div`
  text-align: center;
  padding: 40px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  margin-top: 40px;
  
  h2 {
    color: var(--kavia-orange);
    font-size: 2.5rem;
  }
  
  p {
    font-size: 1.5rem;
    margin-top: 20px;
  }
`;

const Footer = styled.footer`
  background-color: rgba(0, 0, 0, 0.3);
  padding: 10px 20px;
  text-align: center;
  font-size: 0.9rem;
  color: var(--text-secondary);
`;

export default Layout;
