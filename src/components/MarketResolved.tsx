import { Button } from "./ui/button";
import { prepareContractCall } from "thirdweb";
import { useSendAndConfirmTransaction } from "thirdweb/react";
import { NotYourTypeContract } from "../utils/thridWebClient";

interface MarketResolvedProps {
  marketId: number;
  outcome: number;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
}

export function MarketResolved({
  marketId,
  outcome,
  optionA,
  optionB,
  optionC,
  optionD,
}: MarketResolvedProps) {
  const { mutateAsync: mutateTransaction } = useSendAndConfirmTransaction();

  const handleClaimRewards = async () => {
    try {
      const tx = await prepareContractCall({
        contract: NotYourTypeContract,
        method: "function claimWinning(uint256 _marketId)",
        params: [BigInt(marketId)],
      });

      await mutateTransaction(tx);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="mb-2  text-bold  p-2 rounded-md text-center bg-green-600 ">
        Resolved:{" "}
        {outcome === 1
          ? optionA
          : outcome === 2
          ? optionB
          : outcome === 3
          ? optionC
          : optionD}
      </div>
      <Button variant="outline" className="w-full" onClick={handleClaimRewards}>
        Claim Rewards
      </Button>
    </div>
  );
}
