/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../common";
import type { Nft, NftInterface } from "../../contracts/Nft";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "ERC721IncorrectOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ERC721InsufficientApproval",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address",
      },
    ],
    name: "ERC721InvalidApprover",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "ERC721InvalidOperator",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "ERC721InvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "ERC721InvalidReceiver",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "ERC721InvalidSender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ERC721NonexistentToken",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_fromTokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_toTokenId",
        type: "uint256",
      },
    ],
    name: "BatchMetadataUpdate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "MetadataUpdate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "projectId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "jobId",
        type: "uint256",
      },
    ],
    name: "getTokenIdByProjectAndJob",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "hookAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "projectId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "jobId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "tokenUri",
        type: "string",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_hookAddress",
        type: "address",
      },
    ],
    name: "setHookAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50336040518060400160405280600881526020017f536e6170747572650000000000000000000000000000000000000000000000008152506040518060400160405280600481526020017f534e415000000000000000000000000000000000000000000000000000000000815250816000908161008d9190610445565b50806001908161009d9190610445565b505050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036101125760006040517f1e4fbdf70000000000000000000000000000000000000000000000000000000081526004016101099190610558565b60405180910390fd5b6101218161012f60201b60201c565b506000600981905550610573565b6000600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061027657607f821691505b6020821081036102895761028861022f565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026102f17fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826102b4565b6102fb86836102b4565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b600061034261033d61033884610313565b61031d565b610313565b9050919050565b6000819050919050565b61035c83610327565b61037061036882610349565b8484546102c1565b825550505050565b600090565b610385610378565b610390818484610353565b505050565b5b818110156103b4576103a960008261037d565b600181019050610396565b5050565b601f8211156103f9576103ca8161028f565b6103d3846102a4565b810160208510156103e2578190505b6103f66103ee856102a4565b830182610395565b50505b505050565b600082821c905092915050565b600061041c600019846008026103fe565b1980831691505092915050565b6000610435838361040b565b9150826002028217905092915050565b61044e826101f5565b67ffffffffffffffff81111561046757610466610200565b5b610471825461025e565b61047c8282856103b8565b600060209050601f8311600181146104af576000841561049d578287015190505b6104a78582610429565b86555061050f565b601f1984166104bd8661028f565b60005b828110156104e5578489015182556001820191506020850194506020810190506104c0565b8683101561050257848901516104fe601f89168261040b565b8355505b6001600288020188555050505b505050505050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061054282610517565b9050919050565b61055281610537565b82525050565b600060208201905061056d6000830184610549565b92915050565b612b99806105826000396000f3fe608060405234801561001057600080fd5b50600436106101375760003560e01c806370a08231116100b8578063a22cb4651161007c578063a22cb4651461033c578063b88d4fde14610358578063bb7fde7114610374578063c87b56dd14610390578063e985e9c5146103c0578063f2fde38b146103f057610137565b806370a0823114610296578063715018a6146102c65780638da5cb5b146102d057806395d89b41146102ee57806398cd585a1461030c57610137565b806323b872dd116100ff57806323b872dd146101f457806332a3cf961461021057806342842e0e1461022e578063458633221461024a5780636352211e1461026657610137565b806301ffc9a71461013c57806306fdde031461016c578063081812fc1461018a578063095ea7b3146101ba57806318160ddd146101d6575b600080fd5b61015660048036038101906101519190611dfa565b61040c565b6040516101639190611e42565b60405180910390f35b61017461046d565b6040516101819190611eed565b60405180910390f35b6101a4600480360381019061019f9190611f45565b6104ff565b6040516101b19190611fb3565b60405180910390f35b6101d460048036038101906101cf9190611ffa565b61051b565b005b6101de610531565b6040516101eb9190612049565b60405180910390f35b61020e60048036038101906102099190612064565b61053b565b005b61021861063d565b6040516102259190611fb3565b60405180910390f35b61024860048036038101906102439190612064565b610663565b005b610264600480360381019061025f91906120b7565b610683565b005b610280600480360381019061027b9190611f45565b6106cf565b60405161028d9190611fb3565b60405180910390f35b6102b060048036038101906102ab91906120b7565b6106e1565b6040516102bd9190612049565b60405180910390f35b6102ce61079b565b005b6102d86107af565b6040516102e59190611fb3565b60405180910390f35b6102f66107d9565b6040516103039190611eed565b60405180910390f35b610326600480360381019061032191906120e4565b61086b565b6040516103339190612049565b60405180910390f35b61035660048036038101906103519190612150565b610918565b005b610372600480360381019061036d91906122c5565b61092e565b005b61038e600480360381019061038991906123e9565b61094b565b005b6103aa60048036038101906103a59190611f45565b610af2565b6040516103b79190611eed565b60405180910390f35b6103da60048036038101906103d5919061246c565b610c05565b6040516103e79190611e42565b60405180910390f35b61040a600480360381019061040591906120b7565b610c99565b005b6000634906490660e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161480610466575061046582610d1f565b5b9050919050565b60606000805461047c906124db565b80601f01602080910402602001604051908101604052809291908181526020018280546104a8906124db565b80156104f55780601f106104ca576101008083540402835291602001916104f5565b820191906000526020600020905b8154815290600101906020018083116104d857829003601f168201915b5050505050905090565b600061050a82610e01565b5061051482610e89565b9050919050565b61052d8282610528610ec6565b610ece565b5050565b6000600954905090565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036105ad5760006040517f64a0ae920000000000000000000000000000000000000000000000000000000081526004016105a49190611fb3565b60405180910390fd5b60006105c183836105bc610ec6565b610ee0565b90508373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614610637578382826040517f64283d7b00000000000000000000000000000000000000000000000000000000815260040161062e9392919061250c565b60405180910390fd5b50505050565b600860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b61067e8383836040518060200160405280600081525061092e565b505050565b61068b6110fa565b80600860006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60006106da82610e01565b9050919050565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036107545760006040517f89c62b6400000000000000000000000000000000000000000000000000000000815260040161074b9190611fb3565b60405180910390fd5b600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6107a36110fa565b6107ad6000611181565b565b6000600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6060600180546107e8906124db565b80601f0160208091040260200160405190810160405280929190818152602001828054610814906124db565b80156108615780601f1061083657610100808354040283529160200191610861565b820191906000526020600020905b81548152906001019060200180831161084457829003601f168201915b5050505050905090565b600080600a60008581526020019081526020016000206000848152602001908152602001600020549050600073ffffffffffffffffffffffffffffffffffffffff166108b8600954611247565b73ffffffffffffffffffffffffffffffffffffffff160361090e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610905906125b5565b60405180910390fd5b8091505092915050565b61092a610923610ec6565b8383611284565b5050565b61093984848461053b565b610945848484846113f3565b50505050565b600860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614806109d957506109aa6107af565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b610a18576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a0f90612647565b60405180910390fd5b60096000815480929190610a2b90612696565b9190505550600073ffffffffffffffffffffffffffffffffffffffff16610a53600954611247565b73ffffffffffffffffffffffffffffffffffffffff1614610aa9576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610aa09061272a565b60405180910390fd5b600954600a6000858152602001908152602001600020600084815260200190815260200160002081905550610ae0846009546115aa565b610aec600954826115c8565b50505050565b6060610afd82610e01565b506000600660008481526020019081526020016000208054610b1e906124db565b80601f0160208091040260200160405190810160405280929190818152602001828054610b4a906124db565b8015610b975780601f10610b6c57610100808354040283529160200191610b97565b820191906000526020600020905b815481529060010190602001808311610b7a57829003601f168201915b505050505090506000610ba8611624565b90506000815103610bbd578192505050610c00565b600082511115610bf2578082604051602001610bda929190612786565b60405160208183030381529060405292505050610c00565b610bfb8461163b565b925050505b919050565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b610ca16110fa565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610d135760006040517f1e4fbdf7000000000000000000000000000000000000000000000000000000008152600401610d0a9190611fb3565b60405180910390fd5b610d1c81611181565b50565b60007f80ac58cd000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161480610dea57507f5b5e139f000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b80610dfa5750610df9826116a4565b5b9050919050565b600080610e0d83611247565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610e8057826040517f7e273289000000000000000000000000000000000000000000000000000000008152600401610e779190612049565b60405180910390fd5b80915050919050565b60006004600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b600033905090565b610edb838383600161170e565b505050565b600080610eec84611247565b9050600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614610f2e57610f2d8184866118d3565b5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614610fbf57610f7060008560008061170e565b6001600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055505b600073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1614611042576001600360008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b846002600086815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550838573ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4809150509392505050565b611102610ec6565b73ffffffffffffffffffffffffffffffffffffffff166111206107af565b73ffffffffffffffffffffffffffffffffffffffff161461117f57611143610ec6565b6040517f118cdaa70000000000000000000000000000000000000000000000000000000081526004016111769190611fb3565b60405180910390fd5b565b6000600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b60006002600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036112f557816040517f5b08ba180000000000000000000000000000000000000000000000000000000081526004016112ec9190611fb3565b60405180910390fd5b80600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31836040516113e69190611e42565b60405180910390a3505050565b60008373ffffffffffffffffffffffffffffffffffffffff163b11156115a4578273ffffffffffffffffffffffffffffffffffffffff1663150b7a02611437610ec6565b8685856040518563ffffffff1660e01b815260040161145994939291906127ff565b6020604051808303816000875af192505050801561149557506040513d601f19601f820116820180604052508101906114929190612860565b60015b611519573d80600081146114c5576040519150601f19603f3d011682016040523d82523d6000602084013e6114ca565b606091505b50600081510361151157836040517f64a0ae920000000000000000000000000000000000000000000000000000000081526004016115089190611fb3565b60405180910390fd5b805181602001fd5b63150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916146115a257836040517f64a0ae920000000000000000000000000000000000000000000000000000000081526004016115999190611fb3565b60405180910390fd5b505b50505050565b6115c4828260405180602001604052806000815250611997565b5050565b806006600084815260200190815260200160002090816115e89190612a39565b507ff8e1a15aba9398e019f0b49df1a4fde98ee17ae345cb5f6b5e2c27f5033e8ce7826040516116189190612049565b60405180910390a15050565b606060405180602001604052806000815250905090565b606061164682610e01565b506000611651611624565b90506000815111611671576040518060200160405280600081525061169c565b8061167b846119b3565b60405160200161168c929190612786565b6040516020818303038152906040525b915050919050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b80806117475750600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614155b1561187b57600061175784610e01565b9050600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141580156117c257508273ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614155b80156117d557506117d38184610c05565b155b1561181757826040517fa9fbf51f00000000000000000000000000000000000000000000000000000000815260040161180e9190611fb3565b60405180910390fd5b811561187957838573ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45b505b836004600085815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050505050565b6118de838383611a81565b61199257600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff160361195357806040517f7e27328900000000000000000000000000000000000000000000000000000000815260040161194a9190612049565b60405180910390fd5b81816040517f177e802f000000000000000000000000000000000000000000000000000000008152600401611989929190612b0b565b60405180910390fd5b505050565b6119a18383611b42565b6119ae60008484846113f3565b505050565b6060600060016119c284611c3b565b01905060008167ffffffffffffffff8111156119e1576119e061219a565b5b6040519080825280601f01601f191660200182016040528015611a135781602001600182028036833780820191505090505b509050600082602001820190505b600115611a76578080600190039150507f3031323334353637383961626364656600000000000000000000000000000000600a86061a8153600a8581611a6a57611a69612b34565b5b04945060008503611a21575b819350505050919050565b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614158015611b3957508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161480611afa5750611af98484610c05565b5b80611b3857508273ffffffffffffffffffffffffffffffffffffffff16611b2083610e89565b73ffffffffffffffffffffffffffffffffffffffff16145b5b90509392505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603611bb45760006040517f64a0ae92000000000000000000000000000000000000000000000000000000008152600401611bab9190611fb3565b60405180910390fd5b6000611bc283836000610ee0565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614611c365760006040517f73c6ac6e000000000000000000000000000000000000000000000000000000008152600401611c2d9190611fb3565b60405180910390fd5b505050565b600080600090507a184f03e93ff9f4daa797ed6e38ed64bf6a1f0100000000000000008310611c99577a184f03e93ff9f4daa797ed6e38ed64bf6a1f0100000000000000008381611c8f57611c8e612b34565b5b0492506040810190505b6d04ee2d6d415b85acef81000000008310611cd6576d04ee2d6d415b85acef81000000008381611ccc57611ccb612b34565b5b0492506020810190505b662386f26fc100008310611d0557662386f26fc100008381611cfb57611cfa612b34565b5b0492506010810190505b6305f5e1008310611d2e576305f5e1008381611d2457611d23612b34565b5b0492506008810190505b6127108310611d53576127108381611d4957611d48612b34565b5b0492506004810190505b60648310611d765760648381611d6c57611d6b612b34565b5b0492506002810190505b600a8310611d85576001810190505b80915050919050565b6000604051905090565b600080fd5b600080fd5b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b611dd781611da2565b8114611de257600080fd5b50565b600081359050611df481611dce565b92915050565b600060208284031215611e1057611e0f611d98565b5b6000611e1e84828501611de5565b91505092915050565b60008115159050919050565b611e3c81611e27565b82525050565b6000602082019050611e576000830184611e33565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015611e97578082015181840152602081019050611e7c565b60008484015250505050565b6000601f19601f8301169050919050565b6000611ebf82611e5d565b611ec98185611e68565b9350611ed9818560208601611e79565b611ee281611ea3565b840191505092915050565b60006020820190508181036000830152611f078184611eb4565b905092915050565b6000819050919050565b611f2281611f0f565b8114611f2d57600080fd5b50565b600081359050611f3f81611f19565b92915050565b600060208284031215611f5b57611f5a611d98565b5b6000611f6984828501611f30565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000611f9d82611f72565b9050919050565b611fad81611f92565b82525050565b6000602082019050611fc86000830184611fa4565b92915050565b611fd781611f92565b8114611fe257600080fd5b50565b600081359050611ff481611fce565b92915050565b6000806040838503121561201157612010611d98565b5b600061201f85828601611fe5565b925050602061203085828601611f30565b9150509250929050565b61204381611f0f565b82525050565b600060208201905061205e600083018461203a565b92915050565b60008060006060848603121561207d5761207c611d98565b5b600061208b86828701611fe5565b935050602061209c86828701611fe5565b92505060406120ad86828701611f30565b9150509250925092565b6000602082840312156120cd576120cc611d98565b5b60006120db84828501611fe5565b91505092915050565b600080604083850312156120fb576120fa611d98565b5b600061210985828601611f30565b925050602061211a85828601611f30565b9150509250929050565b61212d81611e27565b811461213857600080fd5b50565b60008135905061214a81612124565b92915050565b6000806040838503121561216757612166611d98565b5b600061217585828601611fe5565b92505060206121868582860161213b565b9150509250929050565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6121d282611ea3565b810181811067ffffffffffffffff821117156121f1576121f061219a565b5b80604052505050565b6000612204611d8e565b905061221082826121c9565b919050565b600067ffffffffffffffff8211156122305761222f61219a565b5b61223982611ea3565b9050602081019050919050565b82818337600083830152505050565b600061226861226384612215565b6121fa565b90508281526020810184848401111561228457612283612195565b5b61228f848285612246565b509392505050565b600082601f8301126122ac576122ab612190565b5b81356122bc848260208601612255565b91505092915050565b600080600080608085870312156122df576122de611d98565b5b60006122ed87828801611fe5565b94505060206122fe87828801611fe5565b935050604061230f87828801611f30565b925050606085013567ffffffffffffffff8111156123305761232f611d9d565b5b61233c87828801612297565b91505092959194509250565b600067ffffffffffffffff8211156123635761236261219a565b5b61236c82611ea3565b9050602081019050919050565b600061238c61238784612348565b6121fa565b9050828152602081018484840111156123a8576123a7612195565b5b6123b3848285612246565b509392505050565b600082601f8301126123d0576123cf612190565b5b81356123e0848260208601612379565b91505092915050565b6000806000806080858703121561240357612402611d98565b5b600061241187828801611fe5565b945050602061242287828801611f30565b935050604061243387828801611f30565b925050606085013567ffffffffffffffff81111561245457612453611d9d565b5b612460878288016123bb565b91505092959194509250565b6000806040838503121561248357612482611d98565b5b600061249185828601611fe5565b92505060206124a285828601611fe5565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806124f357607f821691505b602082108103612506576125056124ac565b5b50919050565b60006060820190506125216000830186611fa4565b61252e602083018561203a565b61253b6040830184611fa4565b949350505050565b7f546f6b656e20646f6573206e6f7420657869737420666f72207468652067697660008201527f656e2070726f6a656374496420616e64206a6f62496400000000000000000000602082015250565b600061259f603683611e68565b91506125aa82612543565b604082019050919050565b600060208201905081810360008301526125ce81612592565b9050919050565b7f4f6e6c792074686520686f6f6b20636f6e7472616374206f72206f776e65722060008201527f63616e2063616c6c20746869732066756e6374696f6e00000000000000000000602082015250565b6000612631603683611e68565b915061263c826125d5565b604082019050919050565b6000602082019050818103600083015261266081612624565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006126a182611f0f565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036126d3576126d2612667565b5b600182019050919050565b7f746f6b656e496420616c72656164792065786973747300000000000000000000600082015250565b6000612714601683611e68565b915061271f826126de565b602082019050919050565b6000602082019050818103600083015261274381612707565b9050919050565b600081905092915050565b600061276082611e5d565b61276a818561274a565b935061277a818560208601611e79565b80840191505092915050565b60006127928285612755565b915061279e8284612755565b91508190509392505050565b600081519050919050565b600082825260208201905092915050565b60006127d1826127aa565b6127db81856127b5565b93506127eb818560208601611e79565b6127f481611ea3565b840191505092915050565b60006080820190506128146000830187611fa4565b6128216020830186611fa4565b61282e604083018561203a565b818103606083015261284081846127c6565b905095945050505050565b60008151905061285a81611dce565b92915050565b60006020828403121561287657612875611d98565b5b60006128848482850161284b565b91505092915050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026128ef7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826128b2565b6128f986836128b2565b95508019841693508086168417925050509392505050565b6000819050919050565b600061293661293161292c84611f0f565b612911565b611f0f565b9050919050565b6000819050919050565b6129508361291b565b61296461295c8261293d565b8484546128bf565b825550505050565b600090565b61297961296c565b612984818484612947565b505050565b5b818110156129a85761299d600082612971565b60018101905061298a565b5050565b601f8211156129ed576129be8161288d565b6129c7846128a2565b810160208510156129d6578190505b6129ea6129e2856128a2565b830182612989565b50505b505050565b600082821c905092915050565b6000612a10600019846008026129f2565b1980831691505092915050565b6000612a2983836129ff565b9150826002028217905092915050565b612a4282611e5d565b67ffffffffffffffff811115612a5b57612a5a61219a565b5b612a6582546124db565b612a708282856129ac565b600060209050601f831160018114612aa35760008415612a91578287015190505b612a9b8582612a1d565b865550612b03565b601f198416612ab18661288d565b60005b82811015612ad957848901518255600182019150602085019450602081019050612ab4565b86831015612af65784890151612af2601f8916826129ff565b8355505b6001600288020188555050505b505050505050565b6000604082019050612b206000830185611fa4565b612b2d602083018461203a565b9392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fdfea26469706673582212204d46e2e5b09349e004960251538af46753d614a6c6bd1352916a9140bb5e767964736f6c634300081b0033";

type NftConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: NftConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Nft__factory extends ContractFactory {
  constructor(...args: NftConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      Nft & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): Nft__factory {
    return super.connect(runner) as Nft__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): NftInterface {
    return new Interface(_abi) as NftInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): Nft {
    return new Contract(address, _abi, runner) as unknown as Nft;
  }
}
