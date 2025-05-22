import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { selectCompany, selectCurrentTurn, selectResources, setGamePhase } from '../store/gameSlice';
import { GAME_PHASES } from '../utils/constants';

/**
 * Header component with navigation and game information
 */
const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const company = useSelector(selectCompany);
  const resources = useSelector(selectResources);
  const currentTurn = useSelector(selectCurrentTurn);
  
  // Navigation links configuration
  const navLinks = [
    { to: '/', label: 'Overview', phase: GAME_PHASES.PLANNING },
    { to: '/company', label: 'Company', phase: GAME_PHASES.PLANNING },
    { to: '/finance', label: 'Finance', phase: GAME_PHASES.FINANCE },
    { to: '/marketing', label: 'Marketing', phase: GAME_PHASES.MARKETING },
    { to: '/operations', label: 'Operations', phase: GAME_PHASES.OPERATIONS }
  ];
  
  // Handle navigation and phase change
  const handleNavClick = (phase) => {
    dispatch(setGamePhase(phase));
  };
  
  return (
    <HeaderContainer>
      <TopBar>
        <Logo>
          <span className="logo-symbol">*</span> Enterprise Empire
        </Logo>
        <TurnInfo>Turn: {currentTurn}</TurnInfo>
      </TopBar>
      
      <ResourcesBar>
        <ResourceItem>
          <ResourceLabel>Company:</ResourceLabel>
          <ResourceValue>{company.name}</ResourceValue>
        </ResourceItem>
        <ResourceItem>
          <ResourceLabel>Cash:</ResourceLabel>
          <ResourceValue>${resources.cash.toLocaleString()}</ResourceValue>
        </ResourceItem>
        <ResourceItem>
          <ResourceLabel>Employees:</ResourceLabel>
          <ResourceValue>{resources.employees}</ResourceValue>
        </ResourceItem>
        <ResourceItem>
          <ResourceLabel>Reputation:</ResourceLabel>
          <ResourceValue>{resources.reputation}</ResourceValue>
        </ResourceItem>
      </ResourcesBar>
      
      <Navigation>
        {navLinks.map(link => (
          <NavItem 
            key={link.to} 
            isActive={location.pathname === link.to}
            onClick={() => handleNavClick(link.phase)}
          >
            <Link to={link.to}>{link.label}</Link>
          </NavItem>
        ))}
      </Navigation>
    </HeaderContainer>
  );
};

// Styled components
const HeaderContainer = styled.header`
  background-color: var(--kavia-dark);
  border-bottom: 1px solid var(--border-color);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
`;

const Logo = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  
  .logo-symbol {
    color: var(--kavia-orange);
  }
`;

const TurnInfo = styled.div`
  background-color: var(--kavia-orange);
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-weight: 600;
`;

const ResourcesBar = styled.div`
  display: flex;
  justify-content: space-evenly;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 8px 20px;
`;

const ResourceItem = styled.div`
  display: flex;
  align-items: center;
`;

const ResourceLabel = styled.span`
  color: var(--text-secondary);
  margin-right: 5px;
  font-size: 0.9rem;
`;

const ResourceValue = styled.span`
  font-weight: 600;
  font-size: 0.9rem;
`;

const Navigation = styled.nav`
  display: flex;
  padding: 0 20px;
`;

const NavItem = styled.div`
  padding: 10px 20px;
  border-bottom: 3px solid ${props => props.isActive ? 'var(--kavia-orange)' : 'transparent'};
  
  a {
    color: ${props => props.isActive ? 'var(--kavia-orange)' : 'var(--text-color)'};
    text-decoration: none;
    font-weight: ${props => props.isActive ? '600' : '400'};
    display: block;
    
    &:hover {
      color: var(--kavia-orange);
    }
  }
`;

export default Header;
