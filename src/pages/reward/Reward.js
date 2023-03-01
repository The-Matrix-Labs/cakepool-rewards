import React, { useEffect, useState } from "react";
import PancakeSwapAbi from "../../Abi/PancakeSwapAbi.json";
import TokenAbi from "../../Abi/TokenAbi.json";
import { ethers, BigNumber } from "ethers";
import value from "../../value.json";
import CakePoolAbi from "../../Abi/CakePoolAbi.json";
import LinearProgress from "@mui/material/LinearProgress";
import {
  ContractInstance,
  getTokenPrice,
  getTotalSupply,
  getTotalDividendsDistributed,
  getBurnedTokens,
  getDividentHolders,
} from "../../helperFunctions";
import { useSigner, useProvider } from "wagmi";
export default function Reward({ setSignerVar }) {
  const { data: signer, isError, isLoading } = useSigner();
  const provider = useProvider();
  const callerMap = {
    signer: signer,
    provider: provider,
  };
  const [tokenPrice, setTokenPrice] = useState(0);
  const [marketCap, setMarketCap] = useState(0);
  const [totalDividendsDistributed, setTotalDividendsDistributed] = useState(0);
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [totalSupply, setTotalSupply] = useState(0);
  const [burnedTokens, setBurnedTokens] = useState(0);
  const [percentageBurned, setPercentageBurned] = useState(0);
  const [circulatingSupply, setCirculatingSupply] = useState(0);
  const [dividentUsd, setDividentUsd] = useState(0);
  const [dividentHolder, setDividentHolder] = useState(0);
  const [pendingTokens, setPendingTokens] = useState(0);
  const [distributedTokensPercent, setDistributedTokensPercent] = useState(0);
  const [processingIndex, setProcessingIndex] = useState(0);
  const pancakeSwapRouter = ContractInstance(
    callerMap.provider,
    value.pancakeSwap,
    PancakeSwapAbi
  );
  const tokenContract = ContractInstance(
    callerMap.provider,
    value.cakeToken,
    TokenAbi
  );
  const busdContract = ContractInstance(
    callerMap.provider,
    value.busd,
    TokenAbi
  );
  const cakepoolContract = ContractInstance(
    callerMap.provider,
    value.cakepoolReward,
    CakePoolAbi
  );
  useEffect(() => {
    async function callGetTokenPrice() {
      const temp = await getTokenPrice(
        tokenContract,
        busdContract,
        pancakeSwapRouter
      );
      setTokenPrice(temp);
    }
    async function callTotalDividendsDistributed() {
      const totalDividendsDistributed = await getTotalDividendsDistributed(
        cakepoolContract
      );
      setTotalDividendsDistributed(totalDividendsDistributed.temp1);
      setPendingTokens(totalDividendsDistributed.temp2);
      setDistributedTokensPercent(totalDividendsDistributed.temp3);
    }
    async function getTokenNameAndSymbol() {
      const name = await tokenContract.name();
      const symbol = await tokenContract.symbol();
      setTokenName(name);
      setTokenSymbol(symbol);
    }
    async function callBurnedTokens() {
      const burnedTokensTemp = await getBurnedTokens(tokenContract);
      setBurnedTokens(burnedTokensTemp.temp);
      setPercentageBurned(burnedTokensTemp.percentageBurned);
      setCirculatingSupply(burnedTokensTemp.circulatingSupply);
    }
    async function callDividentHolder() {
      const dividentHolderTemp = await getDividentHolders(cakepoolContract);
      setDividentHolder(dividentHolderTemp);
    }
    async function getProcessingIndex() {
      const processingIndexTemp =
        await cakepoolContract.getLastProcessedIndex();
      setProcessingIndex(processingIndexTemp.toString());
    }
    callGetTokenPrice();
    callTotalDividendsDistributed();
    getTokenNameAndSymbol();
    callBurnedTokens();
    callDividentHolder();
    getProcessingIndex();
  }, []);
  useEffect(() => {
    async function callGetTotalSupply() {
      const temp = await getTotalSupply(tokenContract);
      setTotalSupply(temp);
      setMarketCap((parseFloat(temp) * parseFloat(tokenPrice)).toFixed(4));
    }
    callGetTotalSupply();
  }, [tokenPrice]);

  useEffect(() => {
    setDividentUsd(
      (parseFloat(totalDividendsDistributed) * parseFloat(tokenPrice)).toFixed(
        4
      )
    );
  }, [tokenPrice, totalDividendsDistributed]);
  useEffect(() => {
    setSignerVar(signer);
  }, [signer]);
  return (
    <>
      <div className="topGrid">
        <div className="tokenInfoDiv">
          <div className="infoValue">$&nbsp;~{tokenPrice} </div>
          <div>Token&nbsp;Price</div>
        </div>
        <div className="tokenInfoDiv">
          <div className="infoValue">$&nbsp;~{marketCap} </div>
          <div>Token&nbsp;Market&nbsp;Cap</div>
        </div>
        <div className="tokenInfoDiv">
          <div className="infoValue">{totalDividendsDistributed}</div>
          <div>Total&nbsp;Dividend&nbsp;Distributed</div>
        </div>
      </div>
      <div className="centerGrid">
        <div className="tokenMetadata">
          <div className="tokenMetaDataHeading">Token Metadata</div>
          <div className="tokenMetaDataGrid mb-5">
            <div className="addressTxt">Contract Address</div>
            <div className="addressTxtValue">
              {value.cakeToken.slice(0, 8) + "..." + value.cakeToken.slice(35)}
            </div>
          </div>
          <div className="tokenMetaDataGrid">
            <div className="tokenMetadataInfoTxt">Token Name:</div>
            <div className="metaDataInforValues">{tokenName}</div>
          </div>
          <div className="tokenMetaDataGrid">
            <div className="tokenMetadataInfoTxt">Token Symbol:</div>
            <div className="metaDataInforValues">{tokenSymbol}</div>
          </div>
          <div className="tokenMetaDataGrid">
            <div className="tokenMetadataInfoTxt">Token Total Supply:</div>
            <div className="metaDataInforValues">{totalSupply}</div>
          </div>
          <div className="tokenMetaDataGrid">
            <div className="tokenMetadataInfoTxt">Token Price:</div>
            <div className="metaDataInforValues">~$ {tokenPrice}</div>
          </div>
          <div className="tokenMetaDataGrid">
            <div className="tokenMetadataInfoTxt">Circulation Supply:</div>
            <div className="metaDataInforValues">{circulatingSupply}</div>
          </div>
          <div className="tokenMetaDataGrid">
            <div className="tokenMetadataInfoTxt">Total Burned Tokens:</div>
            <div className="metaDataInforValues">{burnedTokens}</div>
          </div>
          <div className="tokenMetaDataGrid">
            <div className="tokenMetadataInfoTxt">Total Burned Percentage:</div>
            <div className="metaDataInforValues">{percentageBurned}%</div>
          </div>
          <div className="tokenMetaDataGrid">
            <div className="tokenMetadataInfoTxt">Market Cap:</div>
            <div className="metaDataInforValues">~$ {marketCap}</div>
          </div>
        </div>
        <div className="tokenMetadata">
          <div className="tokenMetaDataHeading">Dividend Details</div>
          <div className="tokenMetaDataGrid mb-5">
            <div className="addressTxt">Dividend Contract Address:</div>
            <div className="addressTxtValue">
              {value.cakepoolReward.slice(0, 8) +
                "..." +
                value.cakepoolReward.slice(35)}
            </div>
          </div>
          <div className="tokenMetaDataGrid">
            <div className="tokenMetadataInfoTxt">
              Total Dividend Distributed:
            </div>
            <div className="metaDataInforValues">
              {totalDividendsDistributed}
            </div>
          </div>
          <div className="tokenMetaDataGrid">
            <div className="tokenMetadataInfoTxt">
              Total Dividend Distributed USD:
            </div>
            <div className="metaDataInforValues">{dividentUsd}</div>
          </div>
          <div className="tokenMetaDataGrid">
            <div className="tokenMetadataInfoTxt">Dividend Cycle</div>
            <div className="metaDataInforValues">{"24 Hrs"}</div>
          </div>
          <div className="tokenMetaDataGrid">
            <div className="tokenMetadataInfoTxt">Total Dividend Holders</div>
            <div className="metaDataInforValues">{dividentHolder}</div>
          </div>
          <div className="tokenMetaDataGrid">
            <div className="tokenMetadataInfoTxt">
              Current Dividend Processing Index
            </div>
            <div className="metaDataInforValues">{processingIndex}</div>
          </div>
          <div className="tokenMetaDataGrid">
            <div className="tokenMetadataInfoTxt">
              Pending Dividend Holders Count
            </div>
            <div className="metaDataInforValues">{pendingTokens}</div>
          </div>
          <div className="tokenMetaDataGrid">
            <div className="tokenMetadataInfoTxt">
              Dividend Distribution Completion:
            </div>
            <div className="metaDataInforValues">
              {distributedTokensPercent}%
            </div>
          </div>
          <div className="DividentDistriTxt">
            Dividend Distribution Progress
          </div>
          {/* <div className="breakLine" /> */}
          <LinearProgress
            variant="determinate"
            value={parseFloat(distributedTokensPercent)}
            color="info"
          />
        </div>
      </div>
      <div className="bottomGrid">
        <div className="totalDividend">
          <div>Total Dividend Distributed So Far</div>
          <div className="infoValue">~ {dividentUsd} USD</div>
        </div>
        <div className="totalDividend">
          <div>Total Pending Dividend</div>
          <div className="infoValue">
            ~ {parseFloat(pendingTokens) * parseFloat(tokenPrice)} USD
          </div>
        </div>
      </div>
    </>
  );
}
