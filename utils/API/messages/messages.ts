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
  
  ${RootControllerActions.HELP} - This output
  ${RootControllerActions.JOIN} - join gearbox 
  ${RootControllerActions.MINED} - shows number of mined accounts 
  ${RootControllerActions.CLEAR} - clear terminal
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
