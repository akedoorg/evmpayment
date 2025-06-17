import hre from "hardhat"
import { BuyItem, BuyItem__factory } from "../typechain-types";



async function test(){

       const provider = new hre.ethers.JsonRpcProvider("https://opbnb-testnet.publicnode.com"); 
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
              data: "0x4559b892000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000307b22706c617965724964223a37373330393431313332383031382c226f726465724964223a226f4c724431704854227d00000000000000000000000000000000",

              /*
              0x4559b892000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000307b22706c617965724964223a37373330393431313332383130322c226f726465724964223a226f75567157576b38227d00000000000000000000000000000000
              */
            
              // 1 ether
              value: hre.ethers.parseEther("0.1")
            });

           const fee = await provider.getFeeData() 

           
       
       console.log(`Estimated Gas: ${gasEstimate.toString()}`,fee.gasPrice!, hre.ethers.formatEther( gasEstimate * fee.gasPrice!));

}

test()