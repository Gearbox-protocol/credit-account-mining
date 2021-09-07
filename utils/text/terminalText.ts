const messages = {
  banner: `


                        #####  #######    #    ######  ######  ####### #     #
                      #     # #          # #   #     # #     # #     #  #   # 
                      #       #         #   #  #     # #     # #     #   # #  
                      #  #### #####    #     # ######  ######  #     #    #   
                      #     # #        ####### #   #   #     # #     #   # #  
                      #     # #        #     # #    #  #     # #     #  #   # 
                        #####  ####### #     # #     # ######  ####### #     #
                                                                              
                        
                        
                        
                             Type "help" to see list of available commands
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
  amountOfMineAccounts: (c: number) => `
  You have ${c} credit accounts to mine
  `,
  claim: `
  Do you want to mine credit account? Type y/n.
  `,

  almostDone: `
  We're almost done. Now wait till tx is confirmed.
  `,

  congratulations: `
  Congratulations! Future of France is coming!
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
  permissionDenied: `
  Permission to join Gearbox Launch Community is denied
`,
  alreadyClaimed: `
  you already mined your Credit Account. Thanks for joining to Gearbox Launch Community.
`,
  denied: `
  you skip our movement to Freedom.
`,
  accountChanged: `
  you have just changed your account. Please, try again.
`,
  chainChanged: `
  you have just changed your chain. Please, try again.
`,
  disconnected: `
  you have just disconnected. Please, try again.
`,
};

export { messages, errors };
