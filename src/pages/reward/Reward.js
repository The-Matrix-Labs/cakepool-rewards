import React from "react";

export default function Reward() {
  return (
    <>
      <div className="topGrid">
        <div className="tokenInfoDiv">
          <div className="infoValue">$ ~0.00000000000 </div>
          <div>Token&nbsp;Price</div>
        </div>
        <div className="tokenInfoDiv">
          <div className="infoValue">$ ~0.00000000000 </div>
          <div>Token&nbsp;Market&nbsp;Cap</div>
        </div>
        <div className="tokenInfoDiv">
          <div className="infoValue">$ ~0.00000000000 </div>
          <div>Total&nbsp;Dividend&nbsp;Distributed</div>
        </div>
      </div>
      <div className="centerGrid">
        <div className="tokenMetadata">
          <div className="tokenMetaDataHeading">Token Metadata</div>
          <div className="tokenMetaDataGrid mb-5">
            <div className="addressTxt">Contract Address</div>
            <div className="addressTxtValue">0x12391u...u3901u3</div>
          </div>
          <div className="tokenMetaDataGrid">
            <div className="tokenMetadataInfoTxt">Token Name:</div>
            <div className="metaDataInforValues"></div>
          </div>
          <div className="tokenMetaDataGrid">
            <div className="tokenMetadataInfoTxt">Token Symbol:</div>
            <div className="metaDataInforValues"></div>
          </div>
          <div className="tokenMetaDataGrid">
            <div className="tokenMetadataInfoTxt">Token Total Supply:</div>
            <div className="metaDataInforValues">0</div>
          </div>
          <div className="tokenMetaDataGrid">
            <div className="tokenMetadataInfoTxt">Token Price:</div>
            <div className="metaDataInforValues">~$ 0.000000000000</div>
          </div>
          <div className="tokenMetaDataGrid">
            <div className="tokenMetadataInfoTxt">Circulation Supply:</div>
            <div className="metaDataInforValues">0</div>
          </div>
          <div className="tokenMetaDataGrid">
            <div className="tokenMetadataInfoTxt">Total Burned Tokens:</div>
            <div className="metaDataInforValues">0</div>
          </div>
          <div className="tokenMetaDataGrid">
            <div className="tokenMetadataInfoTxt">Total Burned Percentage:</div>
            <div className="metaDataInforValues">0%</div>
          </div>
          <div className="tokenMetaDataGrid">
            <div className="tokenMetadataInfoTxt">Market Cap:</div>
            <div className="metaDataInforValues">~$ 0</div>
          </div>
        </div>
        <div className="tokenMetadata">
          <div className="tokenMetaDataHeading">Dividend Details</div>
          <div className="tokenMetaDataGrid mb-5">
            <div className="addressTxt">Dividend Contract Address:</div>
            <div className="addressTxtValue">0x12391u...u3901u3</div>
          </div>
          <div className="tokenMetaDataGrid">
            <div className="tokenMetadataInfoTxt">
              Total Dividend Distributed:
            </div>
            <div className="metaDataInforValues">0 CP</div>
          </div>
          <div className="tokenMetaDataGrid">
            <div className="tokenMetadataInfoTxt">
              Total Dividend Distributed USD:
            </div>
            <div className="metaDataInforValues">0</div>
          </div>
          <div className="tokenMetaDataGrid">
            <div className="tokenMetadataInfoTxt">Dividend Cycle</div>
            <div className="metaDataInforValues">0</div>
          </div>
          <div className="tokenMetaDataGrid">
            <div className="tokenMetadataInfoTxt">Total Dividend Holders</div>
            <div className="metaDataInforValues">~$ 0.000000000000</div>
          </div>
          <div className="tokenMetaDataGrid">
            <div className="tokenMetadataInfoTxt">
              Current Dividend Processing Index
            </div>
            <div className="metaDataInforValues">0</div>
          </div>
          <div className="tokenMetaDataGrid">
            <div className="tokenMetadataInfoTxt">
              Pending Dividend Holders Count
            </div>
            <div className="metaDataInforValues">0</div>
          </div>
          <div className="tokenMetaDataGrid">
            <div className="tokenMetadataInfoTxt">
              Dividend Distribution Completion:
            </div>
            <div className="metaDataInforValues">0%</div>
          </div>
          <div className="DividentDistriTxt">
            Dividend Distribution Progress
          </div>
          <div className="breakLine" />
        </div>
      </div>
      <div className="bottomGrid">
        <div className="totalDividend">
          <div>Total Dividend Distributed So Far</div>
          <div className="infoValue">~ 0 USD</div>
        </div>
        <div className="totalDividend">
          <div>Total Pending Dividend</div>
          <div className="infoValue">~ 0 USD</div>
        </div>
      </div>
    </>
  );
}
