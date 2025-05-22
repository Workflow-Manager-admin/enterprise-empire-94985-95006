import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Dashboard from '../components/Dashboard';
import { 
  selectCompany, 
  selectResources, 
  updateResources,
  startNewGame
} from '../store/gameSlice';
import { BUSINESS_TYPES, DIFFICULTY_LEVELS } from '../utils/constants';

/**
 * Company management page for company setup and management
 */
const CompanyPage = () => {
  const dispatch = useDispatch();
  const company = useSelector(selectCompany);
  const resources = useSelector(selectResources);
  
  // Form state for company setup
  const [formData, setFormData] = useState({
    playerName: 'Player',
    companyName: 'My Enterprise',
    businessType: BUSINESS_TYPES.TECH,
    difficulty: DIFFICULTY_LEVELS.MEDIUM
  });
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handle company setup submission
  const handleCompanySetup = (e) => {
    e.preventDefault();
    dispatch(startNewGame(formData));
  };
  
  // Handle hiring employees
  const handleHireEmployee = () => {
    const hireCost = 5000; // Cost per employee
    
    if (resources.cash >= hireCost) {
      dispatch(updateResources({ resourceType: 'cash', amount: -hireCost }));
      dispatch(updateResources({ resourceType: 'employees', amount: 1 }));
    }
  };
  
  return (
    <Dashboard title="Company Management">
      {company.name === 'My Enterprise' ? (
        <SetupContainer>
          <h3>Set Up Your Company</h3>
          <CompanyForm onSubmit={handleCompanySetup}>
            <FormGroup>
              <label htmlFor="playerName">Your Name</label>
              <input
                type="text"
                id="playerName"
                name="playerName"
                value={formData.playerName}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <label htmlFor="companyName">Company Name</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <label htmlFor="businessType">Business Type</label>
              <select
                id="businessType"
                name="businessType"
                value={formData.businessType}
                onChange={handleInputChange}
                required
              >
                <option value={BUSINESS_TYPES.TECH}>Technology</option>
                <option value={BUSINESS_TYPES.RETAIL}>Retail</option>
                <option value={BUSINESS_TYPES.MANUFACTURING}>Manufacturing</option>
                <option value={BUSINESS_TYPES.SERVICE}>Service</option>
                <option value={BUSINESS_TYPES.FOOD}>Food</option>
              </select>
            </FormGroup>
            
            <FormGroup>
              <label htmlFor="difficulty">Game Difficulty</label>
              <select
                id="difficulty"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleInputChange}
                required
              >
                <option value={DIFFICULTY_LEVELS.EASY}>Easy</option>
                <option value={DIFFICULTY_LEVELS.MEDIUM}>Medium</option>
                <option value={DIFFICULTY_LEVELS.HARD}>Hard</option>
              </select>
            </FormGroup>
            
            <SubmitButton type="submit">Start Company</SubmitButton>
          </CompanyForm>
        </SetupContainer>
      ) : (
        <CompanyContainer>
          <CompanyInfoSection>
            <h3>Company Information</h3>
            <InfoGrid>
              <InfoItem>
                <InfoLabel>Company Name</InfoLabel>
                <InfoValue>{company.name}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Business Type</InfoLabel>
                <InfoValue>
                  {Object.entries(BUSINESS_TYPES).find(([_, value]) => value === company.type)?.[0] || 'Unknown'}
                </InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Founded</InfoLabel>
                <InfoValue>Turn 1</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Company Value</InfoLabel>
                <InfoValue>${company.value.toLocaleString()}</InfoValue>
              </InfoItem>
            </InfoGrid>
          </CompanyInfoSection>
          
          <ResourcesSection>
            <h3>Resources & Assets</h3>
            <InfoGrid>
              <InfoItem>
                <InfoLabel>Cash</InfoLabel>
                <InfoValue>${resources.cash.toLocaleString()}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Employees</InfoLabel>
                <InfoValue>{resources.employees}</InfoValue>
                <ActionButton onClick={handleHireEmployee} disabled={resources.cash < 5000}>
                  Hire (+$5,000)
                </ActionButton>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Inventory</InfoLabel>
                <InfoValue>{resources.inventory} units</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Reputation</InfoLabel>
                <InfoValue>{resources.reputation} points</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Research</InfoLabel>
                <InfoValue>{resources.research} points</InfoValue>
              </InfoItem>
            </InfoGrid>
          </ResourcesSection>
        </CompanyContainer>
      )}
    </Dashboard>
  );
};

// Styled components
const SetupContainer = styled.div`
  h3 {
    margin-top: 0;
    color: var(--kavia-orange);
    margin-bottom: 20px;
  }
`;

const CompanyForm = styled.form`
  max-width: 500px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  
  label {
    display: block;
    margin-bottom: 5px;
    color: var(--text-secondary);
  }
  
  input, select {
    width: 100%;
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.1);
    border: 1px solid var(--border-color);
    border-radius: 4px;
    color: var(--text-color);
    font-size: 1rem;
    
    &:focus {
      outline: none;
      border-color: var(--kavia-orange);
    }
  }
  
  select {
    appearance: none;
    background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    background-size: 10px;
    padding-right: 30px;
  }
`;

const SubmitButton = styled.button`
  background-color: var(--kavia-orange);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 20px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-top: 10px;
  
  &:hover {
    background-color: #FF8B4D;
  }
`;

const CompanyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const CompanyInfoSection = styled.section`
  h3 {
    margin-top: 0;
    color: var(--kavia-orange);
    margin-bottom: 20px;
  }
`;

const ResourcesSection = styled.section`
  h3 {
    margin-top: 0;
    color: var(--kavia-orange);
    margin-bottom: 20px;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const InfoItem = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  padding: 15px;
  display: flex;
  flex-direction: column;
`;

const InfoLabel = styled.span`
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 5px;
`;

const InfoValue = styled.span`
  font-size: 1.1rem;
  font-weight: 500;
`;

const ActionButton = styled.button`
  background-color: var(--kavia-orange);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  font-size: 0.8rem;
  margin-top: 10px;
  cursor: pointer;
  align-self: flex-start;
  
  &:disabled {
    background-color: #666;
    cursor: not-allowed;
  }
  
  &:hover:not(:disabled) {
    background-color: #FF8B4D;
  }
`;

export default CompanyPage;
