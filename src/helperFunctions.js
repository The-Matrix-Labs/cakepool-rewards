import { ethers, BigNumber } from "ethers";
import CakePoolAbi from "./Abi/CakePoolAbi.json";
import value from "./value.json";
export function ContractInstance(signer, address, abi) {
  try {
    return new ethers.Contract(address, abi, signer);
  } catch (error) {
    console.log(address, error);
  }
}

export async function getTokenPrice(
  tokenContract,
  busdContract,
  pancakeSwapRouter
) {
  try {
    const deci1 = await tokenContract.decimals();
    const deci2 = await busdContract.decimals();
    const inputBigNumber = BigNumber.from(1).mul(BigNumber.from(10).pow(deci1));
    const amountOut = await pancakeSwapRouter.getAmountsOut(inputBigNumber, [
      value.cakeToken,
      value.busd,
    ]);
    return parseFloat(ethers.utils.formatUnits(amountOut[1], deci2)).toFixed(4);
  } catch (e) {
    console.log(e, "get token price");
    return 0;
  }
}

export async function getTotalSupply(tokenContract) {
  try {
    const deci1 = await tokenContract.decimals();
    const totalSupply = await tokenContract.totalSupply();
    return parseFloat(ethers.utils.formatUnits(totalSupply, deci1)).toFixed(4);
  } catch (error) {
    console.log(error, "get total supply");
    return 0;
  }
}

export async function getTotalDividendsDistributed(cakepoolContract) {
  const totalDividendsDistributed =
    await cakepoolContract.getTotalDividendsDistributed();
  const totalDividendToken = await cakepoolContract.getNumberOfDividendTokens();
  const decimals = await cakepoolContract.decimals();
  const temp1 = parseFloat(
    ethers.utils.formatUnits(totalDividendsDistributed, decimals)
  ).toFixed(4);
  console.log(totalDividendToken);
  const temp2 = parseFloat(
    ethers.utils.formatUnits(
      totalDividendToken.sub(totalDividendsDistributed),
      decimals
    )
  ).toFixed(4);
  if (totalDividendToken.eq(0)) return { temp1, temp2, temp3: 0 };
  const temp3 = totalDividendsDistributed
    .mul(100)
    .div(totalDividendToken)
    .toString();
  return { temp1, temp2, temp3 };
}

export async function getBurnedTokens(tokenContract) {
  try {
    const burnedTokens = await tokenContract.balanceOf(value.deadAddress);
    const totalSupply = await tokenContract.totalSupply();
    const decimals = await tokenContract.decimals();
    const circulatingSupply = parseFloat(
      ethers.utils.formatUnits(totalSupply.sub(burnedTokens), decimals)
    ).toFixed(4);
    const percentageBurned = burnedTokens.mul(100).div(totalSupply).toString();
    const temp = parseFloat(
      ethers.utils.formatUnits(burnedTokens, decimals)
    ).toFixed(4);
    return { temp, percentageBurned, circulatingSupply };
  } catch (e) {
    console.log(e, "get burned tokens");
    return { temp: 0, percentageBurned: 0, circulatingSupply: 0 };
  }
}

export async function getDividentHolders(cakepoolContract) {
  const dividentHolders =
    await cakepoolContract.getNumberOfDividendTokenHolders();
  return dividentHolders.toString();
}
