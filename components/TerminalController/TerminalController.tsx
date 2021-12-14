import React from 'react';
import { useDispatch } from 'react-redux';
import { controllerCommand } from 'redux/terminalController/actions/terminalControllerActions';
import Terminal from 'components/Terminal/Terminal';
import messages, { Prompt } from 'utils/API/messages/messages';

function TerminalController() {
  const dispatch = useDispatch();

  const handleCommand = (c: string): void => {
    if (!c) return;
    dispatch(controllerCommand(c.trim()));
  };

  return <Terminal banner={messages.banner} prompt={Prompt.PROMPT} onCommand={handleCommand} />;
}

export default TerminalController;
