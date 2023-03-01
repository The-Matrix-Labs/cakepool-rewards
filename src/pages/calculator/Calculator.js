import React, { useEffect, useState } from "react";
import editIcon from "../../components/assests/images/edit-icon.svg";
import infoIcon from "../../components/assests/images/info-icon.svg";
import closeIcon from "../../components/assests/images/icon-close.svg";
import style from "./style.module.css";
import CakePoolAbi from "../../Abi/CakePoolAbi.json";
import PancakeSwapAbi from "../../Abi/PancakeSwapAbi.json";
import TokenAbi from "../../Abi/TokenAbi.json";
import value from "../../value.json";
import { ContractInstance, getTokenPrice } from "../../helperFunctions";
import { useProvider } from "wagmi";
export default function Calculator() {
  const [usdVolume, setUsdVolume] = useState(10000);
  const [tokenAmount, setTokenAmount] = useState("");
  const [tokenPrice, setTokenPrice] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [estimatedEarnings, setEstimatedEarnings] = useState(1);
  const provider = useProvider();
  useEffect(() => {
    const pancakeSwapRouter = ContractInstance(
      provider,
      value.pancakeSwap,
      PancakeSwapAbi
    );
    const busdContract = ContractInstance(provider, value.busd, TokenAbi);
    const cakepoolContract = ContractInstance(
      provider,
      value.cakepoolReward,
      CakePoolAbi
    );
    async function callGetTokenPrice() {
      const temp = await getTokenPrice(
        cakepoolContract,
        busdContract,
        pancakeSwapRouter
      );
      setTokenPrice(temp);
    }
    callGetTokenPrice();
  }, []);
  useEffect(() => {
    const temp2 = tokenAmount * tokenPrice;
    const temp3 = (temp2 / (usdVolume * 3)) * 30;
    setEstimatedEarnings(temp3);
  }, [tokenPrice, usdVolume, tokenAmount]);
  return (
    <>
      <div className="calculatorGrid">
        <div className="calculatorGridItem">
          {!isEdit ? (
            <>
              <div className="calculatorDiv">
                <div>{usdVolume} USD</div>
                <div>24h volume in USD</div>
              </div>
              <button
                className={style.noStyle}
                onClick={() => {
                  setIsEdit(true);
                }}
              >
                <img src={editIcon} alt="edit-icon" />
              </button>
            </>
          ) : (
            <div className={style.usdInputDiv}>
              <div className="calculatorDiv">
                <input
                  type="text"
                  placeholder="0.00"
                  value={usdVolume}
                  onChange={(e) => setUsdVolume(e.target.value)}
                />
              </div>
              <button
                className={style.closeBtn}
                onClick={() => {
                  setIsEdit(false);
                }}
              >
                <img src={closeIcon} className={style.inputClose} alt="" />
              </button>
            </div>
          )}
        </div>
        <div className="calculatorGridItem">
          <div className="calculatorDiv">
            <input
              type="text"
              placeholder="0.00"
              onChange={(e) => setTokenAmount(e.target.value)}
              value={tokenAmount}
            />
            Amount of tokens you own
          </div>
        </div>
      </div>
      <div className="tokenCrousel">
        <div className="estimatedEarningDiv">
          <div className="amountChange">~{estimatedEarnings}&nbsp;USD</div>
          <div className="estimatedTime">Estimated Daily Earnings</div>
        </div>
        <div className="estimatedEarningDiv">
          <div className="amountChange">~{7 * estimatedEarnings}&nbsp;USD</div>
          <div className="estimatedTime">Estimated Weekly Earnings</div>
        </div>
        <div className="estimatedEarningDiv">
          <div className="amountChange">~{30 * estimatedEarnings}&nbsp;USD</div>
          <div className="estimatedTime">Estimated Monthly Earnings</div>
        </div>
        <div className="estimatedEarningDiv">
          <div className="amountChange">
            ~{365 * estimatedEarnings}&nbsp;USD
          </div>
          <div className="estimatedTime">Estimated Yearly Earnings</div>
        </div>
      </div>
      <div className="disclaimer">
        <img src={infoIcon} alt="info-icon" />
        <div>
          Disclaimer all calculations are based on last 24hrs volume and only
          estimates.
        </div>
      </div>
    </>
  );
}
