import { RootControllerActions } from 'redux/terminalController/terminalControllerActionTypes';
import { Prefix } from '../../messages/messages';

const notFoundStrings = [
  `
  Don’t break the gears! Machines are orderly systems, so don’t disrupt the engines. Follow the process by typing ${Prefix.PREFIX}${RootControllerActions.HELP} in the command line below.
  `,
  `
  Don’t touch my gears this way! Such actions are not allowed. Type ${Prefix.PREFIX}${RootControllerActions.HELP}.
  `,
  `
  What in the hentai are you doing?! This is not banteg’s platform. Type ${Prefix.PREFIX}${RootControllerActions.HELP}.
  `,
  `
  Anon-kun, did 0xtuba bite you? Stop doing weird stuff and go type ${Prefix.PREFIX}${RootControllerActions.HELP}.
  `,
  `
  No, Maki isn’t going to play with you here. Type ${Prefix.PREFIX}${RootControllerActions.HELP} and take care.
  `,
  `
  Tutorials for grilling steaks are at Joseph’s twitter, not here. Type ${Prefix.PREFIX}${RootControllerActions.HELP}.
  `,
  `
  Dan Robinson doesn’t own 50% of this project yet. Type ${Prefix.PREFIX}${RootControllerActions.HELP}?
  `,
  `
  Will Jeff fork Gearbox? Maybe yes, maybe no. Type ${Prefix.PREFIX}${RootControllerActions.HELP}.
  `,
  `
  Andre Cronje is an amazing builder, and if you think otherwise - type ${Prefix.PREFIX}${RootControllerActions.HELP}.
  `,
  `
  How many times have you typed random stuff? You need to type ${Prefix.PREFIX}${RootControllerActions.HELP}.
  `,
  `
  You might be attracted to scoopy so you need to type ${Prefix.PREFIX}${RootControllerActions.HELP}.
  `,
  `
  If Michael Egorov ever liked your tweet, type ${Prefix.PREFIX}${RootControllerActions.HELP} and rejoice again.
  `,
  `
  If Gauntlet doesn’t help us with the math, we might all be rekt. Type ${Prefix.PREFIX}${RootControllerActions.HELP}!
  `,
  `
  DegenSpartan needs your help to get more stables. Type ${Prefix.PREFIX}${RootControllerActions.HELP} quick!
  `,
  `
  If you are from a16z, feel free to type ${Prefix.PREFIX}${RootControllerActions.HELP} for your due diligence.
  `,
  `
  Can you type ${Prefix.PREFIX}${RootControllerActions.HELP} and get us one of those infamous Multicoin twitter threads?
  `,
  `
  If you don’t have a comfy couch, reach out to mewny. But first, type ${Prefix.PREFIX}${RootControllerActions.HELP}.
  `,
  `
  We hope Cobie donates a lot of money to Gearbox liquidators. Type ${Prefix.PREFIX}${RootControllerActions.HELP} ser!
  `,
  `
  Konstantin has diamond hands. He will never sell GEAR. Type ${Prefix.PREFIX}${RootControllerActions.HELP} to confirm.
  `,
  `
  Fiskantes will ${Prefix.PREFIX}${RootControllerActions.HELP} Gearbox reach the Greek homeland. Type ${Prefix.PREFIX}${RootControllerActions.HELP} to confirm.
  `,
  `
  Larry has confirmed being sushichef, sauces said. Type ${Prefix.PREFIX}${RootControllerActions.HELP} to continue.
  `,
  `
  Ivangbi has a terrible sense of humour, type ${Prefix.PREFIX}${RootControllerActions.HELP} to literally help him with the recovery.
  `,
  `
  Mikael hasn’t slept for 9 months and it shows. Type ${Prefix.PREFIX}${RootControllerActions.HELP} to finally rescue him.
  `,
  `
  Let’s collect NFTs, screw DeFi? Type ${Prefix.PREFIX}${RootControllerActions.HELP} if you want to proceed.
  `,
];

export default notFoundStrings;
