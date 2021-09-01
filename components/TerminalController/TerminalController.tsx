import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { controllerCommand } from 'redux/terminalController/terminalControllerActions';
import Block from 'components/Block/Block';
import Button from 'components/Button/Button';
import Terminal from 'components/Terminal/Terminal';
import { messages } from 'utils/text/terminalText';
import goBack from 'utils/text/buttons';
import isMobile from 'utils/helpers/helpers';

const TerminalController: React.FC = () => {
  const dispatch = useDispatch();
  const terminalRoot = useRef<HTMLDivElement>(null);
  const mobile = /*isMobile() !!!!!!!!!!!!!!!*/ false;

  const handleCommand = (c: string): void => {
    if (!c) return;
    dispatch(controllerCommand(c.trim()));
  };

  return (
    <Block variant="viewport-sized">
      {mobile && <Button title={goBack.title} href={goBack.href} />}
      {!mobile && (
        <Terminal banner={messages.banner} ref={terminalRoot} onCommand={handleCommand} />
      )}
    </Block>
  );
};

export default TerminalController;
