import { RootControllerActions } from 'redux/terminalController/terminalControllerReducer';

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

  ${RootControllerActions.HELP} - this output
  ${RootControllerActions.JOIN} - our path to freedom
  ${RootControllerActions.MINED} - shows number of mined accounts 
  ${RootControllerActions.LINKS} - links to social media channels of Gearbox
  `,
  links: `
  links to social media channels of Gearbox

  Twitter:  https://twitter.com/GearboxProtocol  
  Discord:  https://discord.com/invite/jJuABVH9Pg
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
  accountsMined: (n: number) => `
  Accounts mined: ${n}
  `,
  congratulations: `
  Congratulations! Future of France is coming!
  `,
};

export default messages;
