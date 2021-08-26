const banner = `
Hello
World!

help - prints available commands
`;

const helpText = `
Available commands:

help - This output
join - join gearbox 
clear - clear terminal
`;

const errorCommandNotFound = (c: string) => `
  Command ${c} not found
`;

const errorNoMetamask = `
 Failed. Please install Metamask
`;

const errorMetamaskNotConnected = `
Failed to connect Metamask
`;

const errorMetamaskWrongNetwork = `
Please switch to Mainnet and try again.
`;

const errorMetamaskLogin = `
You should log in to proceed
`;

const metamaskConnected = `
Metamask connected
`;

export {
  banner,
  helpText,
  errorNoMetamask,
  errorMetamaskNotConnected,
  errorMetamaskWrongNetwork,
  errorMetamaskLogin,
  metamaskConnected,
  errorCommandNotFound,
};
