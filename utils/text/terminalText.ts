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
};

export { messages, errors };
