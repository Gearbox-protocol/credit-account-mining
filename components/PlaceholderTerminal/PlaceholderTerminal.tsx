import React, { useEffect, useRef } from 'react';
import { terminal, ITerminalObject } from 'crt-terminal';
import { Prompt, Links } from 'utils/API/messages/messages';

const notLiveBanner = `



                                                                

                      ██████╗  ███████╗ █████╗ ██████╗ ██████╗  ██████╗ ██╗  ██╗
                      ██╔════╝ ██╔════╝██╔══██╗██╔══██╗██╔══██╗██╔═══██╗╚██╗██╔╝
                      ██║  ███╗█████╗  ███████║██████╔╝██████╔╝██║   ██║ ╚███╔╝ 
                      ██║   ██║██╔══╝  ██╔══██║██╔══██╗██╔══██╗██║   ██║ ██╔██╗ 
                      ╚██████╔╝███████╗██║  ██║██║  ██║██████╔╝╚██████╔╝██╔╝ ██╗
                       ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝  ╚═════╝ ╚═╝  ╚═╝
                                                            
                          Welcome to the Gearbox Protocol governance launch!

        Once this stage is completed, the community is taking over Credit Account primitive 
                                  and the control over the codebase. 
                  Read all about launch phases and how that is achieved: ${Links.ABOUT}
                       
                       YOU will be in charge of what Gearbox shall become.
                       
                                    Let’s get this machine going!
                     
  `;

const NOT_STARTED = `  
  MACHINE NOT STARTED
  `;

const EmptyTerminal = () => {
  const terminalRoot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRoot.current !== null) {
      const t: ITerminalObject = terminal({
        root: terminalRoot.current,
        callback: () => t.print(NOT_STARTED, false),
        prompt: () => Prompt.PROMPT,
        banner: notLiveBanner,
      });
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

export default EmptyTerminal;
