import React, { useEffect } from 'react';
import { terminal } from 'components/TerminalLib/terminal';
import * as Styled from './Terminal.styled';

interface ITerminalProps {
  banner: string;
  onCommand: (c: string) => void;
  setTerminalCallback: (t: ITerminalObject) => void;
}

interface ITerminalObject {
  focus: () => NodeJS.Timeout;
  parse: (str: any) => void;
  clear: () => string;
  print: (output: any, center: any) => void;
  destroy: () => void;
}

const Terminal = React.forwardRef<HTMLDivElement, ITerminalProps>(
  ({ banner, onCommand, setTerminalCallback }, ref) => {
    useEffect(() => {
      const terminalRed = ref as React.RefObject<HTMLDivElement>;

      const t: ITerminalObject = terminal({
        root: terminalRed.current,
        callback: onCommand,
        banner,
      });

      setTerminalCallback(t);

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
  },
);

export type { ITerminalObject };
export default Terminal;
