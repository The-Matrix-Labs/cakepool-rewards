import React from "react";
import editIcon from "../../components/assests/images/edit-icon.svg";
import infoIcon from "../../components/assests/images/info-icon.svg";
export default function Calculator() {
  return (
    <>
      <div className="calculatorGrid">
        <div className="calculatorGridItem">
          <div className="calculatorDiv">
            <div>NaN USD</div>
            <div>24h volume in USD</div>
          </div>
          <img src={editIcon} alt="edit-icon" />
        </div>
        <div className="calculatorGridItem">
          <div className="calculatorDiv">
            <input type="text" placeholder="0.00" />
            Amount of tokens you own
          </div>
        </div>
      </div>
      <div className="tokenCrousel">
        <div className="estimatedEarningDiv">
          <div className="tokenAmount">0&nbsp;BTCB</div>
          <div className="amountChange">~0&nbsp;USD</div>
          <div className="estimatedTime">Estimated Daily Earnings</div>
        </div>
        <div className="estimatedEarningDiv">
          <div className="tokenAmount">0&nbsp;BTCB</div>
          <div className="amountChange">~0&nbsp;USD</div>
          <div className="estimatedTime">Estimated Daily Earnings</div>
        </div>
        <div className="estimatedEarningDiv">
          <div className="tokenAmount">0&nbsp;BTCB</div>
          <div className="amountChange">~0&nbsp;USD</div>
          <div className="estimatedTime">Estimated Daily Earnings</div>
        </div>
        <div className="estimatedEarningDiv">
          <div className="tokenAmount">0&nbsp;BTCB</div>
          <div className="amountChange">~0&nbsp;USD</div>
          <div className="estimatedTime">Estimated Daily Earnings</div>
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
