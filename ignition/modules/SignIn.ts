// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const SignInModule = buildModule("SignInModule", (m) => {

  const signIn = m.contract("SignIn");

  return { signIn };
});

export default SignInModule;
