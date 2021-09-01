const messages = {
  banner: `
  Hello
  World!
  
  help - prints available commands
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
  congratulations: `
Congratulations! Future of France is coming!
`,
};

const errors = {
  commandNotFound: (c: string) => `
  Command ${c} not found
`,
  noMetamask: `
 Failed. Please install Metamask
`,
  metamaskNotConnected: `
  Failed to connect Metamask
`,
  metamaskWrongNetwork: `
  Please switch to Mainnet and try again.
`,
  gearboxNetwork: `
  Target network not specified
`,
  metamaskLogin: `
  Log in and try again
`,
  permissionDenied: `
  Permission to join Gearbox Launch Community is denied
`,
  alreadyClaimed: `
  you already mined your Credit Account. Thanks for joining to Gearbox Launch Community.
`,
  denied: `
  you skip our movement to Freedom.
`,
};

export { messages, errors };
