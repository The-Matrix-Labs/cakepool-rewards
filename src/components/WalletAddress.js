import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useSigner } from "wagmi";
export default function WalletAddress({ signerVar }) {
  const [address, setAddress] = useState("");
  useEffect(() => {
    console.log(signerVar, "jfdskjagiaosngroiknd");
    if (signerVar !== null && signerVar !== undefined) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      provider
        .getSigner()
        .getAddress()
        .then((res) => {
          setAddress(res);
        });
    }
  }, [signerVar]);
  return (
    <>
      {signerVar ? (
        <div className="connectedWallet">Wallet address: {address}</div>
      ) : (
        <div className="connectedWallet">Connect Your Wallet</div>
      )}
    </>
  );
}
