import React, { useState } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { bsc } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import "./style.css";
import Reward from "./pages/reward/Reward";
import Calculator from "./pages/calculator/Calculator";
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
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider modalSize="compact" chains={chains}>
        <div className="App">
          <Navbar />
          <div className="contentWrapper">
            <Sidebar options={options} setOptions={setOptions} />
            <div className="mainContent">
              <div className="connectedWallet">Connected wallet address</div>
              {options === "reward" ? <Reward /> : <Calculator />}
            </div>
          </div>
          <Footer />
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
