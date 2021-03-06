export const GameStatesEnum = Object.freeze({
  SETTING_UP_BUILDERS: 0,
  CHOOSING_BUILDER: 1,
  CHOOSING_MOVE: 2,
  CHOOSING_BUILD: 3,
  WAITING_ENEMY_MOVE: 4,
  WAITING_ENEMY_SETUP_MOVES: 5,
  WAITING_AVAILABLE_MOVES: 6,
  DO_ENEMY_MOVE: 7,
});

export const GameTypesEnum = Object.freeze({
  HUMAN_VS_AI: 0,
  AI_VS_AI: 1,
  HUMAN_VS_HUMAN: 2,
});

export const Algorithms = Object.freeze({
  MINIMAX: 'minimax',
  ALPHA_BETA: 'alphaBeta',
  ALPHA_BETA_CUSTOM_HEURISTICS: 'alphaBetaCustom',
});
