import { Wallet } from "ethers";


function main(){
    const wallet = Wallet.createRandom()
    console.log(wallet.mnemonic)
    console.log(wallet.address)
    console.log(wallet.privateKey)
    console.log(wallet.publicKey)
}

main()