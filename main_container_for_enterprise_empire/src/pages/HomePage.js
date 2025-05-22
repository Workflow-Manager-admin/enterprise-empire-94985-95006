import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import { selectCompany, selectCurrentTurn, selectGameState, advanceTurn } from '../store/gameSlice';

/**
 * Home/Overview page - main dashboard for the game
 */
const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { gameStarted } = useSelector(selectGameState);
  const company = useSelector(selectCompany);
  const currentTurn = useSelector(selectCurrentTurn);
  
  // Start a new game if not already started
  const handleStartGame = () => {
    // For now, we'll just navigate to company page
    // In a full implementation, this would show a setup dialog
    navigate('/company');
  };
  
  // Advance to the next turn
  const handleNextTurn = () => {
    dispatch(advanceTurn());
  };
  
  // Define action buttons based on game state
  const actionButtons = gameStarted ? (
    <PrimaryButton onClick={handleNextTurn}>
      Next Turn
    </PrimaryButton>
  ) : (
    <PrimaryButton onClick={handleStartGame}>
      Start New Game
    </PrimaryButton>
  );
  
  return (
    <Dashboard 
      title="Enterprise Empire" 
      actionButtons={actionButtons}
    >
      {gameStarted ? (
        <GameContent>
          <WelcomeMessage>
            <h3>Welcome to {company.name}</h3>
            <p>Turn {currentTurn}</p>
          </WelcomeMessage>
          
          <InfoSection>
            <h4>Recent Events</h4>
            <EventList>
              <EventItem>
                <EventIcon>💼</EventIcon>
                <EventText>New competitor entered the market!</EventText>
              </EventItem>
              <EventItem>
                <EventIcon>📈</EventIcon>
                <EventText>Market growth increased by 2%</EventText>
              </EventItem>
              <EventItem>
                <EventIcon>🏭</EventIcon>
                <EventText>Production capacity increased</EventText>
              </EventItem>
            </EventList>
          </InfoSection>
          
          <InfoSection>
            <h4>Your Tasks</h4>
            <TaskList>
              <TaskItem>
                <TaskCheckbox type="checkbox" />
                <TaskText>Manage company finances</TaskText>
                <TaskAction onClick={() => navigate('/finance')}>Go</TaskAction>
              </TaskItem>
              <TaskItem>
                <TaskCheckbox type="checkbox" />
                <TaskText>Plan marketing campaigns</TaskText>
                <TaskAction onClick={() => navigate('/marketing')}>Go</TaskAction>
              </TaskItem>
              <TaskItem>
                <TaskCheckbox type="checkbox" />
                <TaskText>Optimize operations</TaskText>
                <TaskAction onClick={() => navigate('/operations')}>Go</TaskAction>
              </TaskItem>
            </TaskList>
          </InfoSection>
        </GameContent>
      ) : (
        <IntroContent>
          <h2>Welcome to Enterprise Empire!</h2>
          <p>Build your business from the ground up, make strategic decisions, and become a market leader.</p>
          <p>Click "Start New Game" to begin your journey as a business tycoon.</p>
        </IntroContent>
      )}
    </Dashboard>
  );
};

// Styled components
const GameContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const WelcomeMessage = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 15px 20px;
  margin-bottom: 10px;
  
  h3 {
    margin: 0;
    color: var(--kavia-orange);
  }
  
  p {
    margin: 5px 0 0;
    color: var(--text-secondary);
    font-size: 0.9rem;
  }
`;

const InfoSection = styled.div`
  h4 {
    margin-top: 0;
    margin-bottom: 15px;
    color: var(--text-color);
    font-size: 1.1rem;
  }
`;

const EventList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const EventItem = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  padding: 10px 15px;
  border-radius: 6px;
  display: flex;
  align-items: center;
`;

const EventIcon = styled.span`
  margin-right: 15px;
  font-size: 1.2rem;
`;

const EventText = styled.span`
  font-size: 0.95rem;
`;

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TaskItem = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  padding: 10px 15px;
  border-radius: 6px;
  display: flex;
  align-items: center;
`;

const TaskCheckbox = styled.input`
  margin-right: 15px;
`;

const TaskText = styled.span`
  flex: 1;
  font-size: 0.95rem;
`;

const TaskAction = styled.button`
  background-color: var(--kavia-orange);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 0.8rem;
  
  &:hover {
    background-color: #FF8B4D;
  }
`;

const IntroContent = styled.div`
  text-align: center;
  padding: 40px 20px;
  
  h2 {
    color: var(--kavia-orange);
    margin-bottom: 20px;
  }
  
  p {
    font-size: 1.1rem;
    margin-bottom: 15px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    color: var(--text-secondary);
  }
`;

const PrimaryButton = styled.button`
  background-color: var(--kavia-orange);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #FF8B4D;
  }
`;

export default HomePage;
