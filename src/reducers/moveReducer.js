import createReducer from 'redux-toolkit/lib/createReducer';
import Alert from 'react-native';

import {GameStatesEnum} from '../gameStatesEnum';

export const moveReducer = createReducer([], {
  SET_UP_BUILDER: (state, action) => {
    const {cellIndex} = action.payload.cellIndex;

    if (state.cells[cellIndex] === 0) {
      if (state.firstJu === -1) {
        state.firstJu = cellIndex;
        state.gameState = GameStatesEnum.SETTING_UP_BUILDERS;
      } else {
        state.secondJu = cellIndex;
        state.gameState = GameStatesEnum.WAITING_AI_MOVE;
      }

      state.cells[cellIndex] = 9;
    } else {
      alertMessage('This cell is already taken, please try again.');
    }
  },
  SELECT_BUILDER: (state, action) => {
    const {selectedId} = action.payload.selectedId;

    if (selectedId !== state.firstJu || selectedId !== state.secondJu) {
      alertMessage('Please choose your builder.');
      return;
    }

    state.selected = selectedId;
    state.gameState = GameStatesEnum.CHOOSING_MOVE;
  },
  UNSELECT_BUILDER: (state, action) => {
    state.selected = -1;
    state.gameState = GameStatesEnum.CHOOSING_BUILDER;
  },
  MOVE_BUILDER: (state, action) => {
    const {fromCell} = action.payload.fromCell;
    const {toCell} = action.payload.toCell;

    if (state.availableMovesOrBuilds.find(x => x === toCell) === null) {
      alertMessage('Cannot move builder here, please try again.');
      return;
    }

    const multiplier = Math.floor((this.state.cells[fromCell] + 1) / 5);

    state.cells[fromCell] =
      state.cells[fromCell] >= 9
        ? (state.cells[fromCell] + 1) % 5
        : state.cells[fromCell] % 5;

    state.cells[toCell] =
      state.cells[toCell] >= 9
        ? 5 * multiplier + state.cells[toCell] - 1
        : 5 * multiplier + state.cells[toCell];

    state.gameState = GameStatesEnum.CHOOSING_BUILD;
  },
  BUILD_BLOCK: (state, action) => {
    const {onCell} = action.payload.toCell;

    if (state.availableMovesOrBuilds.find(x => x === onCell) === null) {
      alertMessage('Cannot build here, please try again.');
      return;
    }

    state.cells[onCell] += 1;

    state.selected = -1;
    state.gameState = GameStatesEnum.WAITING_AI_MOVE;
  },
});

function alertMessage(message) {
  Alert.Alert('Warning', message, [{text: 'OK'}]);
}
