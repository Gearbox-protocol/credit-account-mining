import { TerminalErrorCodes } from 'utils/API/errors/terminal-error';

const messages = {
  banner: `



                                                                

                      ██████╗  ███████╗ █████╗ ██████╗ ██████╗  ██████╗ ██╗  ██╗
                      ██╔════╝ ██╔════╝██╔══██╗██╔══██╗██╔══██╗██╔═══██╗╚██╗██╔╝
                      ██║  ███╗█████╗  ███████║██████╔╝██████╔╝██║   ██║ ╚███╔╝ 
                      ██║   ██║██╔══╝  ██╔══██║██╔══██╗██╔══██╗██║   ██║ ██╔██╗ 
                      ╚██████╔╝███████╗██║  ██║██║  ██║██████╔╝╚██████╔╝██╔╝ ██╗
                       ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝  ╚═════╝ ╚═╝  ╚═╝
                                                            
  
                       
                        
                            Type "help" to see list of available commands
  `,

  helpText: `
  Available commands:
  
  help - This output
  join - join gearbox 
  clear - clear terminal
  `,
  metamaskConnected: `
  Metamask connected
  `,
  amountOfMineAccounts: (c: number) => `
  You have ${c} credit accounts to mine
  `,
  claim: `
  Do you want to mine credit account? Type y/n.
  `,

  almostDone: `
  We're almost done. Now wait till tx is confirmed.
  `,
  yourHash: (h: string) => `
  Your transaction hash: https://kovan.etherscan.io/tx/${h}
  `,
  congratulations: `
  Congratulations! Future of France is coming!
  `,
};

type ErrorStrings = {
  [K in TerminalErrorCodes]: string;
};

const errorStrings: ErrorStrings = {
  [TerminalErrorCodes.COMMAND_NOT_FOUND]: `
  Command not found
`,
  [TerminalErrorCodes.NO_METAMASK]: `
 Failed. Please install Metamask
`,
  [TerminalErrorCodes.METAMASK_NOT_CONNECTED]: `
  Failed to connect Metamask
`,
  [TerminalErrorCodes.METAMASK_WRONG_NETWORK]: `
  Please switch to Mainnet and try again.
`,
  [TerminalErrorCodes.NO_GEARBOX_NETWORK]: `
  Target network not specified
`,
  [TerminalErrorCodes.METAMASK_RELOGIN]: `
  Log in and try again
`,
  [TerminalErrorCodes.GET_ADDRESS_FAILED]: `
  Failed to get your account address
`,
  [TerminalErrorCodes.PERMISSION_DENIED]: `
  Permission to join Gearbox Launch Community is denied
`,
  [TerminalErrorCodes.ALREADY_CLAIMED]: `
  you already mined your Credit Account. Thanks for joining to Gearbox Launch Community.
`,
  [TerminalErrorCodes.DENIED_BY_USER]: `
  you skip our movement to Freedom.
`,
  [TerminalErrorCodes.ACCOUNT_CHANGED]: `
you have just changed your account. All active actions were aborted.
`,
  [TerminalErrorCodes.CHAIN_CHANGED]: `
you have just changed your chain. All active actions were aborted.
`,
  [TerminalErrorCodes.DISCONNECTED]: `
you have just disconnected. Please, connect and try again.
`,
  [TerminalErrorCodes.ACTION_ABORTED]: '',
} as const;

export { messages, errorStrings };
