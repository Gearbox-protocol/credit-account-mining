import React from 'react';
import { useDispatch } from 'react-redux';
import { controllerCommand } from 'redux/terminalController/actions/terminalControllerActions';
import Block from 'components/Block/Block';
import Terminal from 'components/Terminal/Terminal';
import messages from 'utils/API/messages/messages';

function TerminalController() {
  const dispatch = useDispatch();

  const handleCommand = (c: string): void => {
    if (!c) return;
    dispatch(controllerCommand(c.trim()));
  };

  return (
    <Block variant="viewport-sized">
      <Terminal banner={messages.banner} prompt="/gearbox/mining $ " onCommand={handleCommand} />
    </Block>
  );
}

export default TerminalController;
