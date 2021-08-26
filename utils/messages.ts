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

const errorCommandNotFound = (c: string) =>
  `
Command ${c} not found
`;

export { banner, helpText, errorCommandNotFound };
