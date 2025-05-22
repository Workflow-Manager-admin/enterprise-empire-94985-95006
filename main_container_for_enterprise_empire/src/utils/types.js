/**
 * Type definitions for Enterprise Empire game
 */

/**
 * Player information structure
 * @typedef {Object} Player
 * @property {string} id - Unique player identifier
 * @property {string} name - Player name
 * @property {number} experience - Player experience points
 */

/**
 * Company information structure
 * @typedef {Object} Company
 * @property {string} id - Unique company identifier
 * @property {string} name - Company name
 * @property {string} type - Business type (from BUSINESS_TYPES)
 * @property {number} value - Current company valuation
 * @property {Object} resources - Available resources
 * @property {number} resources.cash - Available cash
 * @property {number} resources.employees - Number of employees
 * @property {number} resources.inventory - Current inventory
 * @property {number} resources.reputation - Company reputation score
 * @property {number} resources.research - Research points
 */

/**
 * Financial record structure
 * @typedef {Object} FinancialRecord
 * @property {string} id - Unique record identifier
 * @property {string} type - Transaction type (from FINANCIAL_ACTIONS)
 * @property {number} amount - Transaction amount
 * @property {string} description - Transaction description
 * @property {number} turn - Game turn when transaction occurred
 */

/**
 * Marketing campaign structure
 * @typedef {Object} MarketingCampaign
 * @property {string} id - Unique campaign identifier
 * @property {string} name - Campaign name
 * @property {string} channel - Marketing channel (from MARKETING_CHANNELS)
 * @property {number} cost - Campaign cost
 * @property {number} effectiveness - Campaign effectiveness score
 * @property {number} turnCreated - Game turn when campaign was created
 * @property {number} duration - Duration in turns
 */

/**
 * Operation activity structure
 * @typedef {Object} OperationActivity
 * @property {string} id - Unique activity identifier
 * @property {string} name - Activity name
 * @property {string} type - Activity type (from OPERATION_TYPES)
 * @property {number} cost - Activity cost
 * @property {number} efficiency - Activity efficiency score
 * @property {number} turnCreated - Game turn when activity was created
 */

/**
 * Game state structure
 * @typedef {Object} GameState
 * @property {Player} player - Current player information
 * @property {Company} company - Player's company information
 * @property {FinancialRecord[]} financials - Financial records
 * @property {MarketingCampaign[]} marketing - Marketing campaigns
 * @property {OperationActivity[]} operations - Operation activities
 * @property {string} currentPhase - Current game phase (from GAME_PHASES)
 * @property {number} currentTurn - Current game turn
 * @property {string} difficulty - Game difficulty (from DIFFICULTY_LEVELS)
 */
