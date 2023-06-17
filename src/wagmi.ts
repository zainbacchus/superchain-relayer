import { configureChains, createClient } from "wagmi";
import { mainnet, goerli, optimism, optimismGoerli, baseGoerli } from "wagmi/chains";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
// import { alchemyProvider } from "wagmi/providers/alchemy";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";

/**
 * Tell wagmi which chains you want to support
 * To add a new chain simply import it and add it here
 * @see https://wagmi.sh/react/providers/configuring-chains
 */
const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, goerli, optimism, optimismGoerli, baseGoerli],
  [
    /**
     * Uncomment this line to use Alchemy as your provider
     * @see https://wagmi.sh/react/providers/alchemy
     */
    // alchemyProvider({ apiKey: import.meta.env.VITE_ALCHEMY_API_KEY! }),
    /**
     * Tells wagmi to use the default RPC URL for each chain
     * for some dapps the higher rate limits of Alchemy may be required
     */
    jsonRpcProvider({
      rpc: (chain) => {
        return { http: chain.rpcUrls.default.http[0] };
      },
    }),
  ],
);

/**
 * Export chains to be used by rainbowkit
 * @see https://wagmi.sh/react/providers/configuring-chains
 */
export { chains };

/**
 * Configures wagmi connectors for rainbowkit
 * @see https://www.rainbowkit.com/docs/custom-wallet-list
 * @see https://wagmi.sh/react/connectors
 */
const { connectors } = getDefaultWallets({
  appName:
    "Optimism attestation station + Forge + Wagmi + RainbowKit + Vite App",
  chains,
});

/**
 * Creates a singleton wagmi client for the app
 * @see https://wagmi.sh/react/client
 */
export const client = createClient({
  autoConnect: true,
  connectors: connectors,
  provider,
  webSocketProvider,
});
