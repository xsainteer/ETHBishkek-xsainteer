import { ethers } from "ethers";
import { getContract } from "./contract"; 

export async function buyShares(patentId : number, tokenAmount : number, pricePerTokenWei : bigint) {
  const contract = await getContract();
  if (!contract) return;

  try {
    // Общая сумма ETH, которую нужно отправить
    const totalCost = ethers.parseUnits((tokenAmount * 1).toString(), 18) // если tokenAmount без decimals
                      * BigInt(pricePerTokenWei);

    const tx = await contract.buyShares(
      patentId,
      ethers.parseUnits(tokenAmount.toString(), 18), // 18 decimals токенов
      { value: totalCost }
    );

    console.log("Transaction sent:", tx.hash);

    const receipt = await tx.wait();
    console.log("Transaction mined:", receipt);
  } catch (err) {
    console.error("Error buying shares:", err);
  }
}