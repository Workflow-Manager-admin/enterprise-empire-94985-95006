import React from 'react';
import styled from 'styled-components';
import BusinessMetrics from './BusinessMetrics';

/**
 * Dashboard component for displaying game information and actions
 */
const Dashboard = ({ title, children, actionButtons }) => {
  return (
    <DashboardContainer>
      <DashboardTitle>{title}</DashboardTitle>
      
      {/* Business metrics shown at the top of every dashboard */}
      <BusinessMetrics />
      
      {/* Main content area */}
      <ContentArea>
        {children}
      </ContentArea>
      
      {/* Action buttons at the bottom if provided */}
      {actionButtons && (
        <ActionButtonsContainer>
          {actionButtons}
        </ActionButtonsContainer>
      )}
    </DashboardContainer>
  );
};

// Styled components
const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const DashboardTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  color: var(--kavia-orange);
`;

const ContentArea = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

export default Dashboard;
