import hre from "hardhat"
import { BuyItem, BuyItem__factory } from "../typechain-types";



async function test(){

       const provider = new hre.ethers.JsonRpcProvider("https://localhost:8545"); 
       const abi = [
              {
                inputs: [
                  {
                    internalType: "bytes",
                    name: "payload",
                    type: "bytes",
                  },
                ],
                name: "buy",
                outputs: [],
                stateMutability: "payable",
                type: "function",
              }
            ];

const contract = new hre.ethers.Contract("0x7e415C51E137a2b39A81D8c35C4911d73295b9eF",
       abi, provider);



      const gasEstimate =  await provider.estimateGas({
              // Wrapped ETH address
              to: "0x7e415C51E137a2b39A81D8c35C4911d73295b9eF",
            
              // `function deposit() payable`
              data: "0x4559b8920000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000005b7b22717561223a332c2277616c6c657441646472657373223a22307836436231393435666437353465396335463832383036384633614639633643326333303332314632222c2274696d65223a313734323236363538333830397d0000000000",
            
              // 1 ether
              value: hre.ethers.parseEther("0.1")
            });

           const fee = await provider.getFeeData() 

           
       
       console.log(`Estimated Gas: ${gasEstimate.toString()}`,fee.gasPrice!, hre.ethers.formatEther( gasEstimate * fee.gasPrice!));

}

test()