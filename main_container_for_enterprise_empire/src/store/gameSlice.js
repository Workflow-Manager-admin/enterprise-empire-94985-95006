import { createSlice } from '@reduxjs/toolkit';
import { 
  GAME_PHASES, 
  BUSINESS_TYPES, 
  DIFFICULTY_LEVELS 
} from '../utils/constants';

/**
 * Initial game state
 */
const initialState = {
  player: {
    id: '1',
    name: 'Player',
    experience: 0
  },
  company: {
    id: '1',
    name: 'My Enterprise',
    type: BUSINESS_TYPES.TECH,
    value: 100000,
    resources: {
      cash: 50000,
      employees: 5,
      inventory: 100,
      reputation: 10,
      research: 0
    }
  },
  financials: [],
  marketing: [],
  operations: [],
  currentPhase: GAME_PHASES.SETUP,
  currentTurn: 1,
  difficulty: DIFFICULTY_LEVELS.MEDIUM,
  gameStarted: false,
  gameOver: false
};

/**
 * Game state slice for managing all game-related state
 */
export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    // Setup actions
    startNewGame: (state, action) => {
      const { playerName, companyName, businessType, difficulty } = action.payload;
      state.player.name = playerName;
      state.company.name = companyName;
      state.company.type = businessType;
      state.difficulty = difficulty;
      state.currentPhase = GAME_PHASES.PLANNING;
      state.gameStarted = true;
    },
    
    // Phase management
    setGamePhase: (state, action) => {
      state.currentPhase = action.payload;
    },
    
    // Turn management
    advanceTurn: (state) => {
      state.currentTurn += 1;
      // Reset to planning phase at the start of a new turn
      state.currentPhase = GAME_PHASES.PLANNING;
    },
    
    // Company resource management
    updateResources: (state, action) => {
      const { resourceType, amount } = action.payload;
      state.company.resources[resourceType] += amount;
    },
    
    // Financial actions
    addFinancialRecord: (state, action) => {
      state.financials.push({
        ...action.payload,
        id: `fin-${Date.now()}`,
        turn: state.currentTurn
      });
      
      // Update cash based on financial action
      state.company.resources.cash += action.payload.type === 'revenue' || action.payload.type === 'loan'
        ? action.payload.amount
        : -action.payload.amount;
    },
    
    // Marketing actions
    startMarketingCampaign: (state, action) => {
      const { name, channel, cost, effectiveness, duration } = action.payload;
      
      // Deduct the cost
      state.company.resources.cash -= cost;
      
      // Add the campaign
      state.marketing.push({
        id: `mkt-${Date.now()}`,
        name,
        channel,
        cost,
        effectiveness,
        turnCreated: state.currentTurn,
        duration
      });
    },
    
    // Operations actions
    startOperationActivity: (state, action) => {
      const { name, type, cost, efficiency } = action.payload;
      
      // Deduct the cost
      state.company.resources.cash -= cost;
      
      // Add the activity
      state.operations.push({
        id: `op-${Date.now()}`,
        name,
        type,
        cost,
        efficiency,
        turnCreated: state.currentTurn
      });
    },
    
    // Game end
    endGame: (state) => {
      state.gameOver = true;
    },
    
    // Reset game
    resetGame: () => initialState
  }
});

// Export actions
export const {
  startNewGame,
  setGamePhase,
  advanceTurn,
  updateResources,
  addFinancialRecord,
  startMarketingCampaign,
  startOperationActivity,
  endGame,
  resetGame
} = gameSlice.actions;

// Export selectors
export const selectGameState = (state) => state.game;
export const selectPlayer = (state) => state.game.player;
export const selectCompany = (state) => state.game.company;
export const selectResources = (state) => state.game.company.resources;
export const selectCurrentPhase = (state) => state.game.currentPhase;
export const selectCurrentTurn = (state) => state.game.currentTurn;
export const selectFinancials = (state) => state.game.financials;
export const selectMarketing = (state) => state.game.marketing;
export const selectOperations = (state) => state.game.operations;

export default gameSlice.reducer;
