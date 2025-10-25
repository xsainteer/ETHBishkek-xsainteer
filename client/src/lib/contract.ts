import { ethers } from "ethers";
import IdeaVaultPlatformABI from "./abi.json";

//TODO secret this
const contractAddress = "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db";

export async function getContract() {
  const signer = await getSigner();
  if (!signer) return null;

  const contract = new ethers.Contract(contractAddress, IdeaVaultPlatformABI, signer);
  return contract;
}

async function getSigner() {
  if (!window.ethereum) {
    alert("No Ethereum wallet found");
    return null;
  }

  let provider;

  if (window.ethereum.providers && window.ethereum.providers.length > 0) {
    const coinbaseProvider = window.ethereum.providers.find(p => p.isCoinbaseWallet);
    const metamaskProvider = window.ethereum.providers.find(p => p.isMetaMask);

    provider = coinbaseProvider || metamaskProvider || window.ethereum;
  } else {
    provider = window.ethereum;
  }

  // Запрашиваем доступ к аккаунту
  await provider.request({ method: "eth_requestAccounts" });

  const ethersProvider = new ethers.BrowserProvider(provider);
  const signer = await ethersProvider.getSigner();

  return signer;
}
