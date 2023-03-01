import React, { useEffect, useState } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
  Theme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { bsc } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import "./style.css";
import Reward from "./pages/reward/Reward";
import Calculator from "./pages/calculator/Calculator";
import WalletAddress from "./components/WalletAddress";
const { chains, provider } = configureChains([bsc], [publicProvider()]);
const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});
function App() {
  const [options, setOptions] = useState("reward");
  const [signerVar, setSignerVar] = useState(undefined);
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        modalSize="compact"
        chains={chains}
        theme={darkTheme({
          accentColor: "#035d68",
          accentColorForeground: "white",
          overlayBlur: "small",
          borderRadius: "medium",
        })}
      >
        <div className="App">
          <Navbar />
          <div className="contentWrapper">
            <Sidebar options={options} setOptions={setOptions} />
            <div className="mainContent">
              <WalletAddress signerVar={signerVar} />
              {options === "reward" ? (
                <Reward setSignerVar={setSignerVar} />
              ) : (
                <Calculator />
              )}
            </div>
          </div>
          <Footer />
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
