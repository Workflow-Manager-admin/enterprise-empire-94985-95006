import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectCompany, selectResources } from '../store/gameSlice';

/**
 * Business metrics component to display key performance indicators
 */
const BusinessMetrics = () => {
  const company = useSelector(selectCompany);
  const resources = useSelector(selectResources);
  
  // Calculate some derived metrics
  const marketShare = Math.min(25, resources.reputation / 4); // Simple formula for demo purposes
  const growth = 5 + (resources.research / 20); // Simple formula for demo purposes
  const efficiency = 60 + (resources.employees * 2); // Simple formula for demo purposes
  
  // Metrics configuration
  const metrics = [
    {
      label: 'Company Value',
      value: `$${company.value.toLocaleString()}`,
      color: '#4CAF50' // Green
    },
    {
      label: 'Market Share',
      value: `${marketShare.toFixed(1)}%`,
      color: '#2196F3' // Blue
    },
    {
      label: 'Growth Rate',
      value: `${growth.toFixed(1)}%`,
      color: '#FF9800' // Orange
    },
    {
      label: 'Operational Efficiency',
      value: `${efficiency.toFixed(1)}%`,
      color: '#9C27B0' // Purple
    }
  ];
  
  return (
    <MetricsContainer>
      <MetricsTitle>Business Performance</MetricsTitle>
      <MetricsGrid>
        {metrics.map((metric, index) => (
          <MetricCard key={index}>
            <MetricValue style={{ color: metric.color }}>{metric.value}</MetricValue>
            <MetricLabel>{metric.label}</MetricLabel>
          </MetricCard>
        ))}
      </MetricsGrid>
    </MetricsContainer>
  );
};

// Styled components
const MetricsContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 30px;
`;

const MetricsTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 20px;
  color: var(--text-color);
  font-size: 1.2rem;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`;

const MetricCard = styled.div`
  padding: 15px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const MetricValue = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 5px;
`;

const MetricLabel = styled.div`
  color: var(--text-secondary);
  font-size: 0.9rem;
`;

export default BusinessMetrics;
