import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { print, clear } from 'redux/terminal/terminalAction';
import { IState } from 'redux/root/rootReducer/rootReducer';
import Terminal from 'components/Terminal/Terminal';
import { banner, helpText, errorCommandNotFound } from 'utils/messages';

const TerminalController: React.FC = () => {
  const dispatch = useDispatch();
  const terminalRoot = useRef<HTMLDivElement>(null);
  const { terminal } = useSelector((state: IState) => state.terminal);

  const handleCommand = (c: string): void => {
    console.log(c);
    switch (c) {
      case 'help': {
        dispatch(print({ msg: helpText, center: false }));
        break;
      }
      default:
        dispatch(print({ msg: errorCommandNotFound(c), center: false }));
        break;
    }
  };

  console.log(terminal);

  return <Terminal banner={banner} ref={terminalRoot} onCommand={handleCommand} />;
};

export default TerminalController;
