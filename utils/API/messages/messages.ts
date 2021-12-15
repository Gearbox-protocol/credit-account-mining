import {
  RootControllerActions,
  MineChoiceActions,
} from 'redux/terminalController/terminalControllerActionTypes';

enum Prompt {
  PROMPT = '/gearbox/mining $ ',
}

enum Prefix {
  PREFIX = '>',
}

enum Links {
  ABOUT = '<>link<>',
  WALLETS_TO_PARTICIPATE = '<>link<>',
  CLAIM = '<>link<>',
}

const messages = {
  banner: `



                                                                

                      ██████╗  ███████╗ █████╗ ██████╗ ██████╗  ██████╗ ██╗  ██╗
                      ██╔════╝ ██╔════╝██╔══██╗██╔══██╗██╔══██╗██╔═══██╗╚██╗██╔╝
                      ██║  ███╗█████╗  ███████║██████╔╝██████╔╝██║   ██║ ╚███╔╝ 
                      ██║   ██║██╔══╝  ██╔══██║██╔══██╗██╔══██╗██║   ██║ ██╔██╗ 
                      ╚██████╔╝███████╗██║  ██║██║  ██║██████╔╝╚██████╔╝██╔╝ ██╗
                       ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝  ╚═════╝ ╚═╝  ╚═╝
                                                            
                            Welcome to Gearbox Protocol launch ceremony!

                            Once these stages are completed, the DAO will 
                            take over the Credit Account primitive and 
                            control over the codebase. Read all about 
                            launch phases on Gearbox Medium and join Discord.
                       
                            YOU will be in charge of what Gearbox is to become!
                     
                            Type ${Prefix.PREFIX}${RootControllerActions.HELP} to see list of available commands
  `,

  helpText: `
  Available commands:

  ${Prefix.PREFIX}${RootControllerActions.HELP} - this output
  ${Prefix.PREFIX}${RootControllerActions.JOIN} - our path to freedom
  ${Prefix.PREFIX}${RootControllerActions.MINED} - total accounts mined
  ${Prefix.PREFIX}${RootControllerActions.LINKS} - links to social media channels of Gearbox
  `,
  links: `
  Links to social media channels of Gearbox:

  Twitter:  https://twitter.com/GearboxProtocol  
  Discord:  https://discord.com/invite/Gearbox
  `,
  metamaskConnected: `
  Metamask connected
  `,
  permissionCheckingStarted: `
  ...the machine is checking if you are in the snapshot...
  Learn more about which wallets are allowed to participate: ${Links.WALLETS_TO_PARTICIPATE}
  `,
  amountOfMineAccounts: `
  You have 1 credit accounts to mine
  `,
  claim: `
  Do you wish to mine a Credit Account? Type ${Prefix.PREFIX}${MineChoiceActions.YES} to proceed or ${Prefix.PREFIX}${MineChoiceActions.NO} to reject. 

  Just to make sure once again… you understand what’s about to happen, right? 

  If no, then check this article for complete information: ${Links.CLAIM}

  Ok, now maybe ${Prefix.PREFIX}${MineChoiceActions.YES} then!
  `,
  almostDone: `
  We're almost done. Now wait till tx is confirmed.
  `,
  yourHash: (h: string) => `
  Congratulations, captain! 

  You have received GEAR tokens for your contribution: https://kovan.etherscan.io/tx/${h}

  It’s now time to check the ${Prefix.PREFIX}${RootControllerActions.LINKS} command and join Gearbox socials!

  Governance work is about to begin… in a matter of days.
  `,
  accountsMined: (n: number) => `
  Accounts mined: ${n}
  `,

  isGaryQuestion: `
  Is your name GARY by any chance? Please confirm this is NOT the case by typing ${Prefix.PREFIX}${MineChoiceActions.NO}.
  `,
  isGary: `
  Ok, we assume you were joking. Carry on!
  `,
};

export { Prefix, Links, Prompt };
export default messages;
