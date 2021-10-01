import { TerminalErrorCodes } from 'utils/API/errors/TerminalError/TerminalError';

const notFoundStrings = [
  `
  Don’t break the gears! Machines are orderly systems, so don’t disrupt the engines. Follow the process by typing /help in the command line below.
  `,

  `
  Don’t touch my gears this way! Such actions are not allowed. Switch to /help.
  `,

  `
  What in the hentai are you doing?! This is not banteg’s platform. You need /help.
  `,

  `
  Anon-kun, did 0xtuba bite you? Stop doing weird stuff and go seek /help.
  `,

  `
  No, Maki isn’t going to play with you here. Get /help and take care.
  `,

  `
  Tutorials for grilling steaks are at Joseph’s twitter, not here. Press /help.
  `,

  `
  Dan Robinson doesn’t own 50% of this project yet. Should he /help?
  `,

  `
  Will Jeff fork Gearbox? Maybe yes, maybe no, but we won’t /help him.
  `,

  `
  Andre Cronje is an amazing builder, and if you think otherwise - you need /help.
  `,

  `
  How many times have you typed random stuff? Seems like you need /help.
  `,

  `
  You might be attracted to scoopy so you need /help.
  `,

  `
  If Michael Egorov ever liked your tweet, we might want to /help you integrate.
  `,

  `
  If Gauntlet doesn’t /help us with the math, we might all be rekt.
  `,

  `
  DegenSpartan needs your /help to get more stables.
  `,

  `
  If you are from a16z, feel free to reach out for /help with your due diligence.
  `,

  `
  Can you /help us get one of those infamous Multicoin twitter threads? Or maybe not...
  `,

  `
  If you don’t have a comfy couch, reach out to mewny and he might /help you.
  `,

  `
  We hope Cobie donates a lot of money to Gearbox liquidators. We need your /help ser!
  `,

  `
  Konstantin has diamond hands. He will never sell GEAR. Or we will all need /help.
  `,

  `
  Fiskantes will /help Gearbox reach the Greek gods homeland. Aka OHM.
  `,
];

const errorStrings: Record<TerminalErrorCodes, string> = {
  get COMMAND_NOT_FOUND() {
    return notFoundStrings[Math.floor(Math.random() * notFoundStrings.length)];
  },
  NO_METAMASK: `
  Metamask not found. Please install Metamask.
  `,
  METAMASK_NOT_CONNECTED: `
  Failed to connect to Metamask. Try again.
  `,
  METAMASK_WRONG_NETWORK: `
  Please switch to Mainnet.
  `,
  NO_GEARBOX_NETWORK: `
  Target network not specified
  `,
  METAMASK_RELOGIN: `
  Log in and try again
  `,
  GET_ADDRESS_FAILED: `
  Failed to get your account address
  `,
  PERMISSION_DENIED: `
  Houston, we have a problem! 

  Looks like you haven’t been active in the governance of protocols selected. 

  Please check other activities you can join in order to become part of Gearbox governance: <>link<>
  `,
  ALREADY_CLAIMED: `
  Hold up, you have already mined 1 Credit Account designated for you.

  It’s now time to check the /link command and join Gearbox socials!
  `,
  DENIED_BY_USER: `
  Seems like you are NGMI, anon! You skipped financial freedom.

  Type /mine if you exited by mistake.
  `,
  ACCOUNT_CHANGED: `
  You have just changed your account. All active actions were aborted.
  `,
  CHAIN_CHANGED: `
  You have just changed active chain. All active actions were aborted.
  `,
  DISCONNECTED: `
  You have just disconnected. Please, connect and try again.
  `,
  UNEXPECTED_ERROR: `
  Unexpected Error
  `,
  ACTION_ABORTED: '',
} as const;

export default errorStrings;
