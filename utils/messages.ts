const banner = `
Hello
World!
Available commands:
help - prints available commands
join - join gearbox
`;

const helpText = `
Available commands:

help - This output
join - join gearbox 
`;

const errorCommandNotFound = (c: string) =>
  `
Command ${c} not found
`;

export { banner, helpText, errorCommandNotFound };
