import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from 'redux/root/rootReducer';
import { terminalControllerCommand } from 'redux/terminalController/terminalControllerActions';

import Terminal from 'components/Terminal/Terminal';
import { banner } from 'utils/messages';

const TerminalController: React.FC = () => {
  const dispatch = useDispatch();
  const terminalRoot = useRef<HTMLDivElement>(null);
  /* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
  const { terminalController } = useSelector((state: IState) => state);

  console.log(terminalController);

  const handleCommand = (c: string): void => {
    if (!c) return;
    dispatch(terminalControllerCommand(c.trim()));
  };

  return <Terminal banner={banner} ref={terminalRoot} onCommand={handleCommand} />;
};

export default TerminalController;
