import React, {useEffect, useState} from 'react';
import './App.css';
import {ethers} from "ethers";
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json'
import Test from './artifacts/contracts/Test.sol/Test.json'
// const greeterAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3"
const greeterAddress = "0xa8400B1Cf509D6b66c6734523529D7b5abF12363"
const messageAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"
const depositAddress = "0x7befc4bf6a5102b476f0a865e2d4203f9159421b"
//const contract = new ethers.Contract()
const abi = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "share",
        "type": "uint256"
      }
    ],
    "name": "AddShare",
    "type": "event",
    "signature": "0xdbdb2d65c9e75a246e9a50307e793774f5ad8d986766a102b8a0eacb58208da2"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "lpTokenAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "lpAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "debtToken",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "liqAmount",
        "type": "uint256"
      }
    ],
    "name": "Liquidate",
    "type": "event",
    "signature": "0x290dd7c4b59375cb1ccc04df55e3ce258f58f1777a03713ecafbd23f8ec864be"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "caller",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "reward",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "bounty",
        "type": "uint256"
      }
    ],
    "name": "Reinvest",
    "type": "event",
    "signature": "0xc003f45bc224d116b6d079100d4ab57a5b9633244c47a5a92a176c5b79a85f28"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "share",
        "type": "uint256"
      }
    ],
    "name": "RemoveShare",
    "type": "event",
    "signature": "0xca07b1e9ff462c1feca0fa258869d03f3657c3a02eaceed810db4f58848856dc"
  },
  {
    "inputs": [],
    "name": "acceptGovernor",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xe58bb639"
  },
  {
    "inputs": [],
    "name": "addStrat",
    "outputs": [
      {
        "internalType": "contract Strategy",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true,
    "signature": "0x57899399"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "balance",
        "type": "uint256"
      }
    ],
    "name": "balanceToShare",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true,
    "signature": "0x1363bdd3"
  },
  {
    "inputs": [],
    "name": "baseToken",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true,
    "signature": "0xc55dae63"
  },
  {
    "inputs": [],
    "name": "cake",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true,
    "signature": "0xdce17484"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "cakeshares",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true,
    "signature": "0x1674efe2"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "lpwantshares",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true,
    "signature": "0x3001facc"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "addr",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "status",
        "type": "bool"
      }
    ],
    "name": "createkillWhitelist",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x2939f425"
  },
  {
    "inputs": [],
    "name": "debtToken",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true,
    "signature": "0xf8d89898"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_wantAmt",
        "type": "uint256"
      }
    ],
    "name": "deposit",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xb6b55f25"
  },
  {
    "inputs": [],
    "name": "devAddr",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true,
    "signature": "0xda09c72c"
  },
  {
    "inputs": [],
    "name": "factory",
    "outputs": [
      {
        "internalType": "contract IUniswapV2Factory",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true,
    "signature": "0xc45a0155"
  },
  {
    "inputs": [],
    "name": "fairLaunchAddr",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true,
    "signature": "0x5c23aed6"
  },
  {
    "inputs": [],
    "name": "fairLaunchPoolId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true,
    "signature": "0x81a47ba9"
  },
  {
    "inputs": [],
    "name": "farmingToken",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true,
    "signature": "0xad24dce7"
  },
  {
    "inputs": [],
    "name": "feeBps",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true,
    "signature": "0x24a9d853"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "aIn",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "rIn",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "rOut",
        "type": "uint256"
      }
    ],
    "name": "getMktSellAmount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "pure",
    "type": "function",
    "constant": true,
    "signature": "0xd75734c8"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "borrowToken",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "debt",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "whichWantBack",
        "type": "uint256"
      }
    ],
    "name": "getWithdrawData",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "tansAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "retBorrow",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "retRelative",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true,
    "signature": "0x633d1175"
  },
  {
    "inputs": [],
    "name": "governor",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true,
    "signature": "0x0c340a24"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "borrowToken",
        "type": "address"
      }
    ],
    "name": "health",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true,
    "signature": "0xee9e9bc9"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_operator",
        "type": "address"
      },
      {
        "internalType": "contract IMasterChef",
        "name": "_masterChef",
        "type": "address"
      },
      {
        "internalType": "contract IUniswapV2Router02",
        "name": "_router",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_pid",
        "type": "uint256"
      },
      {
        "internalType": "contract Strategy",
        "name": "_addStrat",
        "type": "address"
      },
      {
        "internalType": "contract Strategy",
        "name": "_liqStrat",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_reinvestBountyBps",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_feeBps",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_devAddr",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_fairLaunchAddr",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_baseToken",
        "type": "address"
      }
    ],
    "name": "initialize",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x004e58a9"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "killWhitelist",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true,
    "signature": "0xa4f5c88c"
  },
  {
    "inputs": [],
    "name": "liqStrat",
    "outputs": [
      {
        "internalType": "contract Strategy",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true,
    "signature": "0x6191e37b"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "borrowToken",
        "type": "address"
      }
    ],
    "name": "liquidate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x060336ec"
  },
  {
    "inputs": [],
    "name": "lpToken",
    "outputs": [
      {
        "internalType": "contract IUniswapV2Pair",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true,
    "signature": "0x5fcbd285"
  },
  {
    "inputs": [],
    "name": "masterChef",
    "outputs": [
      {
        "internalType": "contract IMasterChef",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true,
    "signature": "0x575a86b2"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "okStrats",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true,
    "signature": "0xf3b8912b"
  },
  {
    "inputs": [],
    "name": "operator",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true,
    "signature": "0x570ca735"
  },
  {
    "inputs": [],
    "name": "pendingGovernor",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true,
    "signature": "0xe3056a34"
  },
  {
    "inputs": [],
    "name": "pid",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true,
    "signature": "0xf1068454"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "recover",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x1ec82cb8"
  },
  {
    "inputs": [],
    "name": "reinvest",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xfdb5a03e"
  },
  {
    "inputs": [],
    "name": "reinvestBountyBps",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true,
    "signature": "0xc7aa6ae7"
  },
  {
    "inputs": [],
    "name": "router",
    "outputs": [
      {
        "internalType": "contract IUniswapV2Router02",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true,
    "signature": "0xf887ea40"
  },
  {
    "inputs": [
      {
        "internalType": "contract Strategy",
        "name": "_addStrat",
        "type": "address"
      },
      {
        "internalType": "contract Strategy",
        "name": "_liqStrat",
        "type": "address"
      }
    ],
    "name": "setCriticalStrategies",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x8fa4a940"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_addr",
        "type": "address"
      }
    ],
    "name": "setDevAddr",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x6ebb64a2"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_poolId",
        "type": "uint256"
      }
    ],
    "name": "setFairLaunchPoolId",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x947e81a2"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_feeBps",
        "type": "uint256"
      }
    ],
    "name": "setFeeBps",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x72c27b62"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_pendingGovernor",
        "type": "address"
      }
    ],
    "name": "setPendingGovernor",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xf235757f"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_reinvestBountyBps",
        "type": "uint256"
      }
    ],
    "name": "setReinvestBountyBps",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x1620fbd5"
  },
  {
    "inputs": [
      {
        "internalType": "address[]",
        "name": "strats",
        "type": "address[]"
      },
      {
        "internalType": "bool",
        "name": "isOk",
        "type": "bool"
      }
    ],
    "name": "setStrategyOk",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xe7956f21"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "share",
        "type": "uint256"
      }
    ],
    "name": "shareToBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true,
    "signature": "0x81955105"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "shares",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true,
    "signature": "0x57a858fc"
  },
  {
    "inputs": [],
    "name": "token0",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true,
    "signature": "0x0dfe1681"
  },
  {
    "inputs": [],
    "name": "token1",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true,
    "signature": "0xd21220a7"
  },
  {
    "inputs": [],
    "name": "totalShare",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true,
    "signature": "0x026c4207"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_newOperator",
        "type": "address"
      }
    ],
    "name": "transferOperator",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x29605e77"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_debtToken",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_newPid",
        "type": "uint256"
      }
    ],
    "name": "updateDebtToken",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xb5167a0f"
  },
  {
    "inputs": [],
    "name": "wbnb",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true,
    "signature": "0x8d72647e"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_wantAmt",
        "type": "uint256"
      }
    ],
    "name": "withdraw",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x2e1a7d4d"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "borrowToken",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "borrow",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "debt",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "work",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true,
    "signature": "0x62896f1e"
  },
  {
    "stateMutability": "payable",
    "type": "receive",
    "payable": true
  }
]
function App() {
  const [greeting, setGreetingValue] = useState('')
  const [message, setMessageValue] = useState('')
  async function requestAccount() {
    await window.ethereum.request!({ method: 'eth_requestAccounts' });
  }

  async function doDeposit() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(depositAddress, abi, signer)
      console.log(contract)
      // try {
      //   const data = await contract.greet()
      //   console.log('data: ', data)
      // } catch (err) {
      //   console.log("Error: ", err)
      // }
    }
  }


  // call the smart contract, read the current greeting value
  async function fetchGreeting() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider)
      try {
        const data = await contract.greet()
        console.log('data: ', data)
      } catch (err) {
        console.log("Error: ", err)
      }
    }
  }
  async function fetchMessage() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(messageAddress, Test.abi, provider)
      try {
        const data = await contract.getMessage()
        console.log('data: ', data)
      } catch (err) {
        console.log("Error: ", err)
      }
    }
  }

// call the smart contract, send an update
  async function setGreeting() {
    if (!greeting) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer)
      console.log(contract)
      const transaction = await contract.setGreeting(greeting)
      await transaction.wait()
      fetchGreeting().then()
    }
  }

 async function setMessage() {
    if (!message) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(messageAddress, Test.abi, signer)
      console.log(contract)
      const transaction = await contract.setMessage(message)
      await transaction.wait()
      fetchMessage().then()
    }
  }

  return (
      <div className="App">
        <header className="App-header">
          {/*<button onClick={fetchGreeting}>Fetch Greeting</button>*/}
          {/*<button onClick={setGreeting}>Set Greeting</button>*/}
          {/*<input onChange={e => setGreetingValue(e.target.value)} placeholder="Set message" />*/}
          <br/>
          <button onClick={doDeposit}>do deposit</button>
          <button onClick={fetchMessage}>Fetch Message</button>
          <button onClick={setMessage}>Set Message</button>
          <input onChange={e => setMessageValue(e.target.value)} placeholder="Set message" />
        </header>
      </div>
  );
}

export default App;
