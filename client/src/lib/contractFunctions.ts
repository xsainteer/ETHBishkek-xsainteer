import { getContract } from "./contract";  
import { PatentDTO } from "./patent";
  
  export async function createPatent(patentDTO: PatentDTO) {
  const contract = await getContract();

  const tx = await contract.createPatent(
    patentDTO.descriptionHash,
    patentDTO.docsHash,
    patentDTO.shareName,
    patentDTO.shareSymbol,
    patentDTO.totalShares,
    patentDTO.sharePriceWei,
    patentDTO.royaltyBps
  );

  console.log("Transaction sent:", tx.hash);

  const receipt = await tx.wait();
  console.log("Transaction mined:", receipt);
}
