import {
  RootControllerActions,
  MineChoiceActions,
} from 'redux/terminalController/terminalControllerActionTypes';

enum Prefix {
  PREFIX = '>',
}

const messages = {
  banner: `



                                                                

                      ██████╗  ███████╗ █████╗ ██████╗ ██████╗  ██████╗ ██╗  ██╗
                      ██╔════╝ ██╔════╝██╔══██╗██╔══██╗██╔══██╗██╔═══██╗╚██╗██╔╝
                      ██║  ███╗█████╗  ███████║██████╔╝██████╔╝██║   ██║ ╚███╔╝ 
                      ██║   ██║██╔══╝  ██╔══██║██╔══██╗██╔══██╗██║   ██║ ██╔██╗ 
                      ╚██████╔╝███████╗██║  ██║██║  ██║██████╔╝╚██████╔╝██╔╝ ██╗
                       ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝  ╚═════╝ ╚═╝  ╚═╝
                                                            
                          Welcome to the Gearbox Protocol governance launch!

        Once this stage is completed, the community is taking over Credit Account primitive 
                                  and the control over the codebase. 
                  Read all about launch phases and how that is achieved: <>link<>
                       
                       YOU will be in charge of what Gearbox shall become.
                       
                                    Let’s get this machine going!
                     
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
  Discord:  https://discord.com/invite/jJuABVH9Pg
  `,
  metamaskConnected: `
  Metamask connected
  `,
  permissionCheckingStarted: `
  ...the machine is checking if you are in the snapshot...
  Learn more about which wallets are allowed to participate: <>link<>
  `,
  amountOfMineAccounts: `
  You have 1 credit accounts to mine
  `,
  claim: `
  Do you wish to mine a Credit Account? Type ${Prefix.PREFIX}${MineChoiceActions.YES} to proceed or ${Prefix.PREFIX}${MineChoiceActions.NO} to reject. 

  Just to make sure once again… you understand what’s about to happen, right? 

  If no, then check this article for complete information: <>link<>

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

export { Prefix };
export default messages;
