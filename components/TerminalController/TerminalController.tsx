import React, { useRef, useState } from 'react';
import Terminal, { ITerminalObject } from 'components/Terminal/Terminal';
import { banner, helpText, errorCommandNotFound } from 'utils/messages';

const TerminalController: React.FC = () => {
  const terminalRoot = useRef<HTMLDivElement>(null);
  const [terminalObject, setTerminalObject] = useState<ITerminalObject>({});

  const print = (s: string): void => {
    console.log(s, terminalObject);
    terminalObject.print(s, false);
  };

  const handleCommand = (c: string): void => {
    switch (c) {
      case 'help': {
        print(helpText);
        break;
      }
      default:
        print(errorCommandNotFound(c));
        break;
    }
  };

  const handleSetTerminal = (c: ITerminalObject): void => {
    setTerminalObject(c);
  };

  console.log(terminalObject);

  return (
    <Terminal
      banner={banner}
      ref={terminalRoot}
      onCommand={handleCommand}
      setTerminalCallback={handleSetTerminal}
    />
  );
};

export default TerminalController;
