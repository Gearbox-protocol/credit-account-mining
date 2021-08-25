import React, { useRef, useEffect, useState } from 'react';

import { terminal } from 'components/TerminalLib/terminal';
import * as Styled from './Terminal.styled';

interface ITerminalPropsTypes {}

const Terminal: React.FC<ITerminalPropsTypes> = () => {
  const terminalRef = useRef(null);
  const [state, setState] = useState<any>({});

  useEffect(() => {
    const t = terminal({
      root: terminalRef.current,
      callback,
      prompt: () => `$ ${browser.cwd()} > `,
      banner,
    });
    setState(t);

    return () => {
      terminalRef.current.innerHTML = '';
      setState(null);
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
              <div id="terminal" ref={terminalRef}></div>
            </div>
          </div>
        </div>
      </div>
    </Styled.Terminal>
  );
};

export default Terminal;
export type { ITerminalPropsTypes };
