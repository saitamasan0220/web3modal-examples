import {
    EthereumClient,
    w3mConnectors,
    w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { useEffect, useState } from "react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import {
    arbitrum,
    avalanche,
    bsc,
    fantom,
    gnosis,
    mainnet,
    optimism,
    polygon,
} from "wagmi/chains";
import "../styles.css";

// 1. Get projectID at https://cloud.walletconnect.com
// if (!process.env.NEXT_PUBLIC_PROJECT_ID) {
//   throw new Error("You need to provide NEXT_PUBLIC_PROJECT_ID env variable");
// }
// const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

const projectId = "1b715d412045db4fb5b076f073a67de3";

// 2. Configure wagmi client
const chains = [
    mainnet,
    polygon,
    avalanche,
    arbitrum,
    bsc,
    optimism,
    gnosis,
    fantom,
];

const { provider } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiClient = createClient({
    autoConnect: true,
    connectors: w3mConnectors({ version: 1, chains, projectId }),
    provider,
});

// 3. Configure modal ethereum client
const ethereumClient = new EthereumClient(wagmiClient, chains);

// 4. Wrap your app with WagmiProvider and add <Web3Modal /> compoennt
export default function App({ Component, pageProps }) {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        setReady(true);
    }, []);

    return (
        <>
            {ready ? (
                <WagmiConfig client={wagmiClient}>
                    <Component {...pageProps} />
                </WagmiConfig>
            ) : null}

            <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
        </>
    );
}
