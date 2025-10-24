// config/wagmi.ts
import { createConfig, http } from 'wagmi' // Убран неиспользуемый импорт 'Abi'
import { sepolia } from 'wagmi/chains' // ЗАГЛУШКА: Замените на L2, которую выберет Ar!
import { metaMask } from 'wagmi/connectors'

// ------------------- ЗАГЛУШКИ ДАННЫХ КОНТРАКТОВ (Ожидаем Ar) --------------------
// Ar должен будет предоставить реальные адреса, как только развернет контракты
// Тип `as const` очень важен для правильной работы wagmi/viem
export const PATENT_NFT_ADDRESS = '0x0000000000000000000000000000000000000000' as `0x${string}`;
export const LICENSING_ADDRESS = '0x0000000000000000000000000000000000000000' as `0x${string}`;

// Минимальный ABI для минта и покупки лицензии
export const PATENT_NFT_ABI = [
    { name: 'mintPatent', type: 'function', stateMutability: 'nonpayable', inputs: [{ type: 'string', name: 'ideaName' }], outputs: [] }
] as const;

export const LICENSING_ABI = [
    { name: 'buyLicense', type: 'function', stateMutability: 'payable', inputs: [{ type: 'uint256', name: 'patentId' }], outputs: [] }
] as const;
// -----------------------------------------------------------------------------------

const supportedChains = [sepolia];

export const config = createConfig({
  chains: supportedChains,
  connectors: [
    metaMask({ dappUrl: 'https://ethbishkek-xsainteer.app' }),
  ],
  transports: supportedChains.reduce((acc, chain) => {
    acc[chain.id] = http()
    return acc
  }, {} as Record<number, ReturnType<typeof http>>),
});