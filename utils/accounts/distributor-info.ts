import { MerkleDistributorInfo } from 'utils/merkle/parse-accounts';

const distributorInfo: MerkleDistributorInfo = {
  merkleRoot: '0xd8f9121f6ea829353eadc9c66ecb69d4291c4a536c84f536058f9e641ba76c37',
  tokenTotal: '0x029ff557db033b9d10da95eaab1be4e011a01311cb',
  claims: {
    '0x375461CeB4934C62223a382C13798a459EBE1939': {
      index: 0,
      salt: '0x375461CeB4934C62223a382C13798a459EBE1939',
      proof: [
        '0xcfecde56fbc09ca79ebf7d1804d58da416b1ee1bb5f3b7ff0f625b16ab1e328b',
        '0xb41f4fc27b47c303ca01bc8486994522c0bab4d748eb28ab411ab6956f39bace',
        '0xdfaf876ec1432947f57cd584142e991e901c24470dd91dff19813860b6cd9bd2',
      ],
    },
    '0x54d66a77e36fD14f9f92Cd0285a42f0Ef28f05e1': {
      index: 1,
      salt: '0x54d66a77e36fD14f9f92Cd0285a42f0Ef28f05e1',
      proof: [
        '0xc816ee99c4727ad352982d4ab8de65c546ea396e731b74f54ca91b2225bd159b',
        '0xb41f4fc27b47c303ca01bc8486994522c0bab4d748eb28ab411ab6956f39bace',
        '0xdfaf876ec1432947f57cd584142e991e901c24470dd91dff19813860b6cd9bd2',
      ],
    },
    '0x8C37D9f394A5976c4E45Db7a3Ec93e0b517f025B': {
      index: 2,
      salt: '0x8C37D9f394A5976c4E45Db7a3Ec93e0b517f025B',
      proof: [
        '0x0e89b8834fa38bf42c2aec3a5a75b8a17ec025112e700a2e7acd5e7322df3a9d',
        '0x326b8a410c3c73fbb5cf6659f8595a56a6f3f306011f48538fed0b17fa145c16',
        '0xdfaf876ec1432947f57cd584142e991e901c24470dd91dff19813860b6cd9bd2',
      ],
    },
    '0x9654bA3Ae38e6Fa1fBa4Af58460bdE9F15e770e6': {
      index: 3,
      salt: '0x9654bA3Ae38e6Fa1fBa4Af58460bdE9F15e770e6',
      proof: ['0x4e1810c490e3d8337c6e7d828ce041c94cc515c2054ba3fdff6ae1b7fcbb7786'],
    },
    '0xf13df765f3047850Cede5aA9fDF20a12A75f7F70': {
      index: 4,
      salt: '0xf13df765f3047850Cede5aA9fDF20a12A75f7F70',
      proof: [
        '0xc4a54987369bdc37c45ae9a9cd79b4c74a778cf706b0b03c7c7cbb867f9accce',
        '0x326b8a410c3c73fbb5cf6659f8595a56a6f3f306011f48538fed0b17fa145c16',
        '0xdfaf876ec1432947f57cd584142e991e901c24470dd91dff19813860b6cd9bd2',
      ],
    },
  },
};

export default distributorInfo;
