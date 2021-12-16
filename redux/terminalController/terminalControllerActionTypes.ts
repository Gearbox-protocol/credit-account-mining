enum ActionType {
  GOTO_ROOT = 'GOTO_ROOT',
  GOTO = 'GOTO',
  ADD_ACTION = 'ADD_ACTION',
  COMMAND = 'COMMAND',
  CONTROLLER_ERROR = 'CONTROLLER_ERROR',
  HELP = 'HELP',
  JOIN = 'JOIN',
  IS_GARY = 'IS_GARY',
  JOIN_CONTINUE = 'JOIN_CONTINUE',
  JOIN_ACCEPTED = 'JOIN_ACCEPTED',
  JOIN_DENIED = 'JOIN_DENIED',
  MINED = 'MINED',
  LINKS = 'LINKS',
}

enum SystemActions {
  DEFAULT_ACTION = 'defaultAction',
}

enum OptionalActions {
  MINE = 'mine',
}

enum RootControllerActions {
  HELP = 'help',
  JOIN = 'join',
  MINED = 'mined',
  LINKS = 'links',

}

enum MineChoiceActions {
  YES = 'mine',
  NO = 'no',
}

enum NotGaryQuestionActions {
  NO = 'no',
}

export {
  ActionType,
  SystemActions,
  OptionalActions,
  RootControllerActions,
  MineChoiceActions,
  NotGaryQuestionActions,
};
