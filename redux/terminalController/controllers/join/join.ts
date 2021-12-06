import {
  controllerJoinContinue,
  controllerJoinAccepted,
  controllerJoinDenied,
  controllerIsGary,
} from 'redux/terminalController/actions/terminalControllerUserActions';
import {
  SystemActions,
  MineChoiceActions,
} from 'redux/terminalController/terminalControllerActionTypes';
import { Controller } from 'redux/terminalController/controllers/root';

const choice: Controller = {
  userActions: {
    [MineChoiceActions.YES]: controllerJoinAccepted,
    [MineChoiceActions.NO]: controllerJoinDenied,
    [SystemActions.DEFAULT_ACTION]: controllerJoinDenied,
  },
  children: null,
};

const notGary: Controller = {
  children: { choice },
};

const isGaryQuestion: Controller = {
  userActions: {
    [MineChoiceActions.NO]: controllerJoinContinue,
    [SystemActions.DEFAULT_ACTION]: controllerIsGary,
  },
  children: { notGary },
};

const join: Controller = {
  children: {
    isGaryQuestion,
  },
};

export default join;
