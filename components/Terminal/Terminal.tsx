import React, { useEffect, useRef } from 'react';

import { useDispatch } from 'react-redux';
import { setTerminal } from 'redux/terminal/terminalAction';
import { terminal } from 'components/TerminalLib/terminal';

interface ITerminalProps {
  banner: string;
  prompt: string;
  onCommand: (c: string) => void;
}

interface ITerminalObject {
  focus: () => NodeJS.Timeout;
  parse: (str: any) => void;
  clear: () => string;
  print: (output: any, center: any) => void;
  destroy: () => void;
  inputLock: (lock: any) => any;
  setLoading: (status: boolean) => void;
}

const Terminal: React.FC<ITerminalProps> = ({ onCommand, banner, prompt }) => {
  const terminalRoot = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const t: ITerminalObject = terminal({
      root: terminalRoot.current,
      callback: onCommand,
      prompt: () => prompt,
      banner,
    });

    dispatch(setTerminal(t));

    return () => {
      t.destroy();
    };
  }, []);

  return (
    <div id="crt">
      <div id="screen">
        <div id="wrapper">
          <div id="interlace"></div>
          <div id="scanline"></div>
          <div id="envelope">
            <div id="terminal" ref={terminalRoot}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export type { ITerminalObject };
export default Terminal;
