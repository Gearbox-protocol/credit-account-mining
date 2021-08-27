import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { controllerCommand } from 'redux/terminalController/terminalControllerActions';

import Terminal from 'components/Terminal/Terminal';
import { messages } from 'utils/terminalText';

const TerminalController: React.FC = () => {
  const dispatch = useDispatch();
  const terminalRoot = useRef<HTMLDivElement>(null);

  const handleCommand = (c: string): void => {
    if (!c) return;
    dispatch(controllerCommand(c.trim()));
  };

  return <Terminal banner={messages.banner} ref={terminalRoot} onCommand={handleCommand} />;
};

export default TerminalController;
