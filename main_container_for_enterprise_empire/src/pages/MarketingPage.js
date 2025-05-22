import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Dashboard from '../components/Dashboard';
import { 
  selectMarketing, 
  selectResources,
  startMarketingCampaign
} from '../store/gameSlice';
import { MARKETING_CHANNELS } from '../utils/constants';

/**
 * Marketing page for managing marketing campaigns
 */
const MarketingPage = () => {
  const dispatch = useDispatch();
  const marketingCampaigns = useSelector(selectMarketing);
  const resources = useSelector(selectResources);
  
  // Marketing campaign templates
  const campaignTemplates = [
    {
      name: 'Social Media Campaign',
      channel: MARKETING_CHANNELS.SOCIAL,
      cost: 10000,
      effectiveness: 7,
      duration: 3,
      description: 'Launch a targeted social media campaign to increase brand awareness.'
    },
    {
      name: 'Print Advertisement',
      channel: MARKETING_CHANNELS.PRINT,
      cost: 15000,
      effectiveness: 5,
      duration: 4,
      description: 'Traditional print advertisements in relevant publications.'
    },
    {
      name: 'Radio Spot',
      channel: MARKETING_CHANNELS.RADIO,
      cost: 20000,
      effectiveness: 6,
      duration: 3,
      description: 'Run radio advertisements to reach local audiences.'
    },
    {
      name: 'Television Commercial',
      channel: MARKETING_CHANNELS.TV,
      cost: 50000,
      effectiveness: 9,
      duration: 2,
      description: 'High-impact television commercials during prime viewing hours.'
    },
    {
      name: 'Online Advertising',
      channel: MARKETING_CHANNELS.ONLINE,
      cost: 25000,
      effectiveness: 8,
      duration: 3,
      description: 'Digital advertising including search engine marketing and display ads.'
    }
  ];
  
  // State for custom campaign form
  const [customCampaign, setCustomCampaign] = useState({
    name: '',
    channel: MARKETING_CHANNELS.SOCIAL,
    cost: 10000,
    duration: 3
  });
  
  // Handle custom campaign input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomCampaign({
      ...customCampaign,
      [name]: name === 'cost' || name === 'duration' ? Number(value) : value
    });
  };
  
  // Start a templated campaign
  const handleStartTemplateCampaign = (campaign) => {
    if (resources.cash < campaign.cost) {
      alert('Insufficient funds!');
      return;
    }
    
    dispatch(startMarketingCampaign(campaign));
  };
  
  // Start a custom campaign
  const handleStartCustomCampaign = (e) => {
    e.preventDefault();
    
    if (!customCampaign.name) {
      alert('Please enter a campaign name');
      return;
    }
    
    if (resources.cash < customCampaign.cost) {
      alert('Insufficient funds!');
      return;
    }
    
    // Calculate effectiveness based on cost and duration
    // This is a simple formula for demo purposes
    const effectiveness = Math.min(10, Math.round(customCampaign.cost / 10000) + 
      (customCampaign.duration > 2 ? 2 : 0));
    
    dispatch(startMarketingCampaign({
      ...customCampaign,
      effectiveness
    }));
    
    // Reset form
    setCustomCampaign({
      name: '',
      channel: MARKETING_CHANNELS.SOCIAL,
      cost: 10000,
      duration: 3
    });
  };
  
  return (
    <Dashboard title="Marketing Management">
      <MarketingContainer>
        <MarketingMetrics>
          <h3>Marketing Metrics</h3>
          <MetricsGrid>
            <MetricCard>
              <MetricValue>{marketingCampaigns.length}</MetricValue>
              <MetricLabel>Active Campaigns</MetricLabel>
            </MetricCard>
            <MetricCard>
              <MetricValue>
                {marketingCampaigns.reduce((sum, camp) => sum + camp.effectiveness, 0)}
              </MetricValue>
              <MetricLabel>Total Effectiveness</MetricLabel>
            </MetricCard>
            <MetricCard>
              <MetricValue>
                ${marketingCampaigns.reduce((sum, camp) => sum + camp.cost, 0).toLocaleString()}
              </MetricValue>
              <MetricLabel>Marketing Spend</MetricLabel>
            </MetricCard>
            <MetricCard>
              <MetricValue>${resources.cash.toLocaleString()}</MetricValue>
              <MetricLabel>Available Budget</MetricLabel>
            </MetricCard>
          </MetricsGrid>
        </MarketingMetrics>
        
        <CampaignTemplatesSection>
          <h3>Marketing Campaign Templates</h3>
          <TemplatesGrid>
            {campaignTemplates.map((campaign, index) => (
              <TemplateCard key={index}>
                <TemplateName>{campaign.name}</TemplateName>
                <TemplateChannel>Channel: {formatChannel(campaign.channel)}</TemplateChannel>
                <TemplateDescription>{campaign.description}</TemplateDescription>
                <TemplateDetails>
                  <DetailItem>
                    <DetailLabel>Cost:</DetailLabel>
                    <DetailValue>${campaign.cost.toLocaleString()}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Effectiveness:</DetailLabel>
                    <DetailValue>{campaign.effectiveness}/10</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Duration:</DetailLabel>
                    <DetailValue>{campaign.duration} turns</DetailValue>
                  </DetailItem>
                </TemplateDetails>
                <TemplateButton 
                  onClick={() => handleStartTemplateCampaign(campaign)}
                  disabled={resources.cash < campaign.cost}
                >
                  Launch Campaign
                </TemplateButton>
              </TemplateCard>
            ))}
          </TemplatesGrid>
        </CampaignTemplatesSection>
        
        <CustomCampaignSection>
          <h3>Create Custom Campaign</h3>
          <CustomForm onSubmit={handleStartCustomCampaign}>
            <FormGroup>
              <label>Campaign Name</label>
              <input 
                type="text"
                name="name"
                value={customCampaign.name}
                onChange={handleInputChange}
                placeholder="Enter campaign name..."
                required
              />
            </FormGroup>
            
            <FormGroup>
              <label>Marketing Channel</label>
              <select 
                name="channel"
                value={customCampaign.channel}
                onChange={handleInputChange}
              >
                <option value={MARKETING_CHANNELS.SOCIAL}>Social Media</option>
                <option value={MARKETING_CHANNELS.PRINT}>Print</option>
                <option value={MARKETING_CHANNELS.RADIO}>Radio</option>
                <option value={MARKETING_CHANNELS.TV}>Television</option>
                <option value={MARKETING_CHANNELS.ONLINE}>Online</option>
              </select>
            </FormGroup>
            
            <FormGroup>
              <label>Budget (Cost)</label>
              <input 
                type="range"
                name="cost"
                min="5000"
                max="100000"
                step="5000"
                value={customCampaign.cost}
                onChange={handleInputChange}
              />
              <RangeValue>${customCampaign.cost.toLocaleString()}</RangeValue>
            </FormGroup>
            
            <FormGroup>
              <label>Duration (Turns)</label>
              <input 
                type="range"
                name="duration"
                min="1"
                max="5"
                step="1"
                value={customCampaign.duration}
                onChange={handleInputChange}
              />
              <RangeValue>{customCampaign.duration} turns</RangeValue>
            </FormGroup>
            
            <SubmitButton 
              type="submit"
              disabled={!customCampaign.name || resources.cash < customCampaign.cost}
            >
              Launch Custom Campaign
            </SubmitButton>
          </CustomForm>
        </CustomCampaignSection>
        
        <ActiveCampaignsSection>
          <h3>Active Marketing Campaigns</h3>
          {marketingCampaigns.length === 0 ? (
            <EmptyMessage>No active marketing campaigns.</EmptyMessage>
          ) : (
            <CampaignsTable>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Channel</th>
                  <th>Cost</th>
                  <th>Effectiveness</th>
                  <th>Turn Created</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                {marketingCampaigns.map((campaign) => (
                  <tr key={campaign.id}>
                    <td>{campaign.name}</td>
                    <td>{formatChannel(campaign.channel)}</td>
                    <td>${campaign.cost.toLocaleString()}</td>
                    <td>{campaign.effectiveness}/10</td>
                    <td>{campaign.turnCreated}</td>
                    <td>{campaign.duration} turns</td>
                  </tr>
                ))}
              </tbody>
            </CampaignsTable>
          )}
        </ActiveCampaignsSection>
      </MarketingContainer>
    </Dashboard>
  );
};

// Helper function to format channel names
const formatChannel = (channel) => {
  switch(channel) {
    case MARKETING_CHANNELS.SOCIAL: return 'Social Media';
    case MARKETING_CHANNELS.PRINT: return 'Print';
    case MARKETING_CHANNELS.RADIO: return 'Radio';
    case MARKETING_CHANNELS.TV: return 'Television';
    case MARKETING_CHANNELS.ONLINE: return 'Online';
    default: return channel;
  }
};

// Styled components
const MarketingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const MarketingMetrics = styled.section`
  h3 {
    margin-top: 0;
    color: var(--kavia-orange);
    margin-bottom: 20px;
  }
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
`;

const MetricCard = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const MetricValue = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 5px;
  color: var(--kavia-orange);
`;

const MetricLabel = styled.div`
  color: var(--text-secondary);
  font-size: 0.9rem;
`;

const CampaignTemplatesSection = styled.section`
  h3 {
    margin-top: 0;
    color: var(--kavia-orange);
    margin-bottom: 20px;
  }
`;

const TemplatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const TemplateCard = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-3px);
  }
`;

const TemplateName = styled.h4`
  margin: 0;
  font-size: 1.1rem;
  color: var(--kavia-orange);
`;

const TemplateChannel = styled.div`
  font-size: 0.9rem;
  color: var(--text-secondary);
`;

const TemplateDescription = styled.p`
  font-size: 0.95rem;
  margin: 5px 0;
`;

const TemplateDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 5px;
`;

const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DetailLabel = styled.span`
  color: var(--text-secondary);
  font-size: 0.9rem;
`;

const DetailValue = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
`;

const TemplateButton = styled.button`
  background-color: var(--kavia-orange);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px;
  font-size: 0.9rem;
  margin-top: 10px;
  cursor: pointer;
  
  &:disabled {
    background-color: #666;
    cursor: not-allowed;
  }
  
  &:hover:not(:disabled) {
    background-color: #FF8B4D;
  }
`;

const CustomCampaignSection = styled.section`
  h3 {
    margin-top: 0;
    color: var(--kavia-orange);
    margin-bottom: 20px;
  }
`;

const CustomForm = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const FormGroup = styled.div`
  label {
    display: block;
    margin-bottom: 5px;
    color: var(--text-secondary);
    font-size: 0.9rem;
  }
  
  input[type="text"], select {
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
  
  input[type="range"] {
    width: 100%;
    background: rgba(255, 255, 255, 0.1);
    height: 6px;
    border-radius: 3px;
    appearance: none;
    
    &::-webkit-slider-thumb {
      appearance: none;
      width: 16px;
      height: 16px;
      background-color: var(--kavia-orange);
      border-radius: 50%;
      cursor: pointer;
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

const RangeValue = styled.div`
  text-align: center;
  margin-top: 5px;
  font-size: 0.9rem;
`;

const SubmitButton = styled.button`
  background-color: var(--kavia-orange);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px;
  font-size: 0.9rem;
  cursor: pointer;
  grid-column: 1 / -1;
  margin-top: 10px;
  
  &:disabled {
    background-color: #666;
    cursor: not-allowed;
  }
  
  &:hover:not(:disabled) {
    background-color: #FF8B4D;
  }
`;

const ActiveCampaignsSection = styled.section`
  h3 {
    margin-top: 0;
    color: var(--kavia-orange);
    margin-bottom: 20px;
  }
`;

const EmptyMessage = styled.div`
  padding: 20px;
  text-align: center;
  color: var(--text-secondary);
  font-style: italic;
`;

const CampaignsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid var(--border-color);
  }
  
  th {
    color: var(--text-secondary);
    font-weight: 500;
    font-size: 0.9rem;
  }
`;

export default MarketingPage;
