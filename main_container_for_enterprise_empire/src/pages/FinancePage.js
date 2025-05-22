import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Dashboard from '../components/Dashboard';
import { 
  selectFinancials, 
  selectResources,
  addFinancialRecord
} from '../store/gameSlice';
import { FINANCIAL_ACTIONS } from '../utils/constants';

/**
 * Finance page for managing company finances
 */
const FinancePage = () => {
  const dispatch = useDispatch();
  const financials = useSelector(selectFinancials);
  const resources = useSelector(selectResources);
  
  // State for new financial transaction
  const [transaction, setTransaction] = useState({
    type: FINANCIAL_ACTIONS.INVEST,
    amount: 10000,
    description: ''
  });
  
  // Handle transaction input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransaction({
      ...transaction,
      [name]: name === 'amount' ? Number(value) : value
    });
  };
  
  // Handle financial transaction submission
  const handleSubmitTransaction = (e) => {
    e.preventDefault();
    
    // Validate transaction
    if (transaction.type === FINANCIAL_ACTIONS.EXPENSE || 
        transaction.type === FINANCIAL_ACTIONS.INVEST) {
      if (transaction.amount > resources.cash) {
        alert('Insufficient funds!');
        return;
      }
    }
    
    // Dispatch the financial record
    dispatch(addFinancialRecord(transaction));
    
    // Reset form
    setTransaction({
      ...transaction,
      description: ''
    });
  };
  
  return (
    <Dashboard title="Financial Management">
      <FinanceContainer>
        <FinancialSummary>
          <h3>Financial Summary</h3>
          <SummaryItem>
            <SummaryLabel>Available Cash</SummaryLabel>
            <SummaryValue>${resources.cash.toLocaleString()}</SummaryValue>
          </SummaryItem>
          <SummaryItem>
            <SummaryLabel>Revenue (This Turn)</SummaryLabel>
            <SummaryValue>
              ${financials
                .filter(f => f.type === FINANCIAL_ACTIONS.REVENUE)
                .reduce((sum, f) => sum + f.amount, 0)
                .toLocaleString()}
            </SummaryValue>
          </SummaryItem>
          <SummaryItem>
            <SummaryLabel>Expenses (This Turn)</SummaryLabel>
            <SummaryValue style={{ color: '#ff6b6b' }}>
              ${financials
                .filter(f => f.type === FINANCIAL_ACTIONS.EXPENSE)
                .reduce((sum, f) => sum + f.amount, 0)
                .toLocaleString()}
            </SummaryValue>
          </SummaryItem>
          <SummaryItem>
            <SummaryLabel>Net Cash Flow</SummaryLabel>
            <SummaryValue>
              ${financials
                .reduce((sum, f) => {
                  if (f.type === FINANCIAL_ACTIONS.REVENUE || f.type === FINANCIAL_ACTIONS.LOAN) {
                    return sum + f.amount;
                  } else if (f.type === FINANCIAL_ACTIONS.EXPENSE || f.type === FINANCIAL_ACTIONS.INVEST) {
                    return sum - f.amount;
                  }
                  return sum;
                }, 0)
                .toLocaleString()}
            </SummaryValue>
          </SummaryItem>
        </FinancialSummary>
        
        <TransactionSection>
          <h3>Financial Actions</h3>
          <TransactionForm onSubmit={handleSubmitTransaction}>
            <FormGroup>
              <label>Transaction Type</label>
              <select 
                name="type"
                value={transaction.type}
                onChange={handleInputChange}
              >
                <option value={FINANCIAL_ACTIONS.INVEST}>Investment</option>
                <option value={FINANCIAL_ACTIONS.LOAN}>Take Loan</option>
                <option value={FINANCIAL_ACTIONS.EXPENSE}>Record Expense</option>
                <option value={FINANCIAL_ACTIONS.REVENUE}>Record Revenue</option>
              </select>
            </FormGroup>
            
            <FormGroup>
              <label>Amount ($)</label>
              <input 
                type="number"
                name="amount"
                min="1000"
                step="1000"
                value={transaction.amount}
                onChange={handleInputChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>Description</label>
              <input 
                type="text"
                name="description"
                value={transaction.description}
                placeholder="Enter a description..."
                onChange={handleInputChange}
              />
            </FormGroup>
            
            <SubmitButton type="submit">
              {transaction.type === FINANCIAL_ACTIONS.INVEST ? 'Invest' : 
               transaction.type === FINANCIAL_ACTIONS.LOAN ? 'Take Loan' :
               transaction.type === FINANCIAL_ACTIONS.EXPENSE ? 'Record Expense' : 'Record Revenue'}
            </SubmitButton>
          </TransactionForm>
        </TransactionSection>
        
        <TransactionHistorySection>
          <h3>Transaction History</h3>
          {financials.length === 0 ? (
            <EmptyMessage>No transactions recorded yet.</EmptyMessage>
          ) : (
            <TransactionTable>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Description</th>
                  <th>Turn</th>
                </tr>
              </thead>
              <tbody>
                {financials.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{formatTransactionType(transaction.type)}</td>
                    <td className={getAmountClass(transaction.type)}>
                      {transaction.type === FINANCIAL_ACTIONS.REVENUE || transaction.type === FINANCIAL_ACTIONS.LOAN
                        ? `+$${transaction.amount.toLocaleString()}`
                        : `-$${transaction.amount.toLocaleString()}`}
                    </td>
                    <td>{transaction.description || '-'}</td>
                    <td>{transaction.turn}</td>
                  </tr>
                ))}
              </tbody>
            </TransactionTable>
          )}
        </TransactionHistorySection>
      </FinanceContainer>
    </Dashboard>
  );
};

// Helper functions
const formatTransactionType = (type) => {
  switch(type) {
    case FINANCIAL_ACTIONS.INVEST: return 'Investment';
    case FINANCIAL_ACTIONS.LOAN: return 'Loan';
    case FINANCIAL_ACTIONS.EXPENSE: return 'Expense';
    case FINANCIAL_ACTIONS.REVENUE: return 'Revenue';
    default: return type;
  }
};

const getAmountClass = (type) => {
  return type === FINANCIAL_ACTIONS.REVENUE || type === FINANCIAL_ACTIONS.LOAN
    ? 'positive'
    : 'negative';
};

// Styled components
const FinanceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const FinancialSummary = styled.section`
  h3 {
    margin-top: 0;
    color: var(--kavia-orange);
    margin-bottom: 20px;
  }
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid var(--border-color);
  
  &:last-child {
    border-bottom: none;
    margin-top: 10px;
    padding-top: 20px;
    border-top: 1px solid var(--border-color);
    font-weight: 600;
  }
`;

const SummaryLabel = styled.span`
  color: var(--text-secondary);
`;

const SummaryValue = styled.span`
  font-weight: 500;
`;

const TransactionSection = styled.section`
  h3 {
    margin-top: 0;
    color: var(--kavia-orange);
    margin-bottom: 20px;
  }
`;

const TransactionForm = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  align-items: end;
`;

const FormGroup = styled.div`
  label {
    display: block;
    margin-bottom: 5px;
    color: var(--text-secondary);
    font-size: 0.9rem;
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
  
  &:hover {
    background-color: #FF8B4D;
  }
`;

const TransactionHistorySection = styled.section`
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

const TransactionTable = styled.table`
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
  
  .positive {
    color: #4CAF50;
  }
  
  .negative {
    color: #ff6b6b;
  }
`;

export default FinancePage;
