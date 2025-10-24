// app/page.tsx
'use client'

import React from 'react';
import { useAccount, useConnect, useDisconnect, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { PATENT_NFT_ADDRESS, PATENT_NFT_ABI, LICENSING_ADDRESS, LICENSING_ABI } from '../config/wagmi';
import { parseEther } from 'viem'; 

// --- Компонент для Подключения и Статуса ---
function WalletStatus() {
  const { isConnected, address } = useAccount()
  const { connectors, connect } = useConnect()
  const { disconnect } = useDisconnect()

  return (
    <div className="border p-4 rounded-lg bg-gray-100 mb-6">
      <h3 className="text-lg font-bold mb-2">1. Статус Кошелька</h3>
      {isConnected ? (
        <>
          <p className="text-green-600">✅ Подключен: **{address?.substring(0, 6)}...{address?.slice(-4)}**</p>
          <button onClick={() => disconnect()} className="mt-2 bg-red-500 text-white p-2 rounded">
            Отключиться
          </button>
        </>
      ) : (
        connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            className="bg-blue-500 text-white p-2 rounded mr-2"
          >
            Подключить {connector.name}
          </button>
        ))
      )}
    </div>
  )
}

// --- Компонент для Создания Патента (Минт) ---
function MintPatent() {
  const [ideaName, setIdeaName] = React.useState('');
  const { data: hash, writeContract } = useWriteContract();
  
  const { isLoading: isMinting, isSuccess: isMintSuccess } = useWaitForTransactionReceipt({ 
    hash,
    query: { enabled: !!hash },
  });

  const handleMint = () => {
    if (!ideaName) return alert('Введите название идеи!');
    writeContract({
      address: PATENT_NFT_ADDRESS,
      abi: PATENT_NFT_ABI,
      functionName: 'mintPatent',
      args: [ideaName],
    });
  };

  return (
    <div className="border p-4 rounded-lg mb-6">
      <h3 className="text-lg font-bold mb-2">2. Создать Патент (Mint NFT)</h3>
      <input 
        type="text" 
        value={ideaName} 
        onChange={(e) => setIdeaName(e.target.value)} 
        placeholder="Название вашей инновационной идеи" 
        className="border p-2 rounded w-full mb-3"
      />
      <button 
        onClick={handleMint} 
        disabled={isMinting || isMintSuccess}
        className="bg-green-600 text-white p-2 rounded disabled:bg-gray-400"
      >
        {isMinting ? 'Создание...' : isMintSuccess ? '✅ Создано!' : 'Зафиксировать IP на Блокчейне'}
      </button>
      {isMintSuccess && <p className="mt-2 text-sm text-green-700">Транзакция успешна! Хэш: {hash}</p>}
      {hash && !isMintSuccess && <p className="mt-2 text-sm text-blue-700">Ожидание подтверждения...</p>}
    </div>
  );
}

// --- Компонент для Лицензирования (Покупка) ---
function BuyLicense() {
  const PATENT_ID = 1; // Для MVP лицензируем Патент #1
  const LICENCE_PRICE = '0.001'; // Демо-цена в ETH

  const { data: hash, writeContract } = useWriteContract();
  const { isLoading: isBuying, isSuccess: isBuySuccess } = useWaitForTransactionReceipt({ 
    hash,
    query: { enabled: !!hash },
  });

  const handleBuy = () => {
    writeContract({
      address: LICENSING_ADDRESS,
      abi: LICENSING_ABI,
      functionName: 'buyLicense',
      args: [BigInt(PATENT_ID)],
      value: parseEther(LICENCE_PRICE), // Отправляем ETH как оплату
    });
  };

  return (
    <div className="border p-4 rounded-lg">
      <h3 className="text-lg font-bold mb-2">3. Купить Лицензию (Демо)</h3>
      <p className="mb-3">Патент: **"Децентрализованный Замок Ресурсов"**</p>
      <p className="mb-3">Цена лицензии (MVP): **{LICENCE_PRICE} ETH**</p>
      
      <button 
        onClick={handleBuy} 
        disabled={isBuying || isBuySuccess}
        className="bg-purple-600 text-white p-2 rounded disabled:bg-gray-400"
      >
        {isBuying ? 'Покупка...' : isBuySuccess ? '🎉 Лицензия куплена!' : 'Купить Лицензию на 30 дней'}
      </button>
      {isBuySuccess && <p className="mt-2 text-sm text-green-700">Транзакция успешна! Хэш: {hash}</p>}
    </div>
  );
}

// --- Главная Страница ---
export default function HomePage() {
  const { isConnected } = useAccount();

  return (
    <main className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-extrabold mb-8 text-center">ETHBishkek-xsainteer DApp (MVP)</h1>
      
      <WalletStatus />
      
      {isConnected && (
        <>
          <MintPatent />
          <BuyLicense />
        </>
      )}
    </main>
  );
}