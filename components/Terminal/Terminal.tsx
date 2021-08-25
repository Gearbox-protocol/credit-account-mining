import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTerminal } from 'redux/terminal/terminalAction';
import { terminal } from 'components/TerminalLib/terminal';
import * as Styled from './Terminal.styled';

interface ITerminalProps {
  banner: string;
  onCommand: (c: string) => void;
}

interface ITerminalObject {
  focus: () => NodeJS.Timeout;
  parse: (str: any) => void;
  clear: () => string;
  print: (output: any, center: any) => void;
  destroy: () => void;
}

const Terminal = React.forwardRef<HTMLDivElement, ITerminalProps>(({ banner, onCommand }, ref) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const terminalRed = ref as React.RefObject<HTMLDivElement>;

    const t: ITerminalObject = terminal({
      root: terminalRed.current,
      callback: onCommand,
      banner,
    });

    dispatch(setTerminal(t));

    return () => {
      t.destroy();
    };
  }, []);

  return (
    <Styled.Terminal>
      <div id="crt">
        <div id="screen">
          <div id="wrapper">
            <div id="interlace"></div>
            <div id="scanline"></div>
            <div id="envelope">
              <div id="terminal" ref={ref}></div>
            </div>
          </div>
        </div>
      </div>
    </Styled.Terminal>
  );
});

export type { ITerminalObject };
export default Terminal;
