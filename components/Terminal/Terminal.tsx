import React, { useEffect, useRef } from 'react';
import { terminal, ITerminalObject } from 'crt-terminal';
import { useDispatch } from 'react-redux';
import { setTerminal } from 'redux/terminal/terminalAction';

interface ITerminalProps {
  banner: string;
  prompt: string;
  onCommand: (c: string) => void;
}

const Terminal = ({ onCommand, banner, prompt }: ITerminalProps) => {
  const terminalRoot = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (terminalRoot.current !== null) {
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
    }
    return () => {};
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
