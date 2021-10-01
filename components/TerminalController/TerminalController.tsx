import React from 'react';
import { isMobile } from 'react-device-detect';
import { useDispatch } from 'react-redux';
import { controllerCommand } from 'redux/terminalController/terminalControllerActions';
import Block from 'components/Block/Block';
import Button from 'components/Button/Button';
import Terminal from 'components/Terminal/Terminal';
import messages from 'utils/API/messages/messages';
import goBack from 'utils/text/buttons';

const TerminalController: React.FC = () => {
  const dispatch = useDispatch();

  const handleCommand = (c: string): void => {
    if (!c) return;
    dispatch(controllerCommand(c.trim()));
  };

  return (
    <Block variant="viewport-sized">
      {isMobile && <Button title={goBack.title} href={goBack.href} />}
      {!isMobile && (
        <Terminal banner={messages.banner} prompt="/gearbox/mining $ " onCommand={handleCommand} />
      )}
    </Block>
  );
};

export default TerminalController;
