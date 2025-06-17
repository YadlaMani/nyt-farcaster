import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState, useRef, useEffect } from "react";
import { useActiveAccount, useSendAndConfirmTransaction } from "thirdweb/react";
import { prepareContractCall, readContract, toWei } from "thirdweb";
import {
  NotYourTypeContract,
  BaseBettingTokenContract,
} from "../utils/thridWebClient";
import { approve } from "thirdweb/extensions/erc20";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface MarketBuyInterfaceProps {
  marketId: number;
  market: {
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    question: string;
  };
}

type BuyingStep = "initial" | "allowance" | "confirm";
type Option = "A" | "B" | "C" | "D" | null;

export function MarketBuyInterface({
  marketId,
  market,
}: MarketBuyInterfaceProps) {
  const account = useActiveAccount();
  const { mutateAsync: mutateTransaction } = useSendAndConfirmTransaction();

  const [isBuying, setIsBuying] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [containerHeight, setContainerHeight] = useState("auto");
  const contentRef = useRef<HTMLDivElement>(null);

  const [selectedOption, setSelectedOption] = useState<Option>(null);
  const [amount, setAmount] = useState(0);
  const [buyingStep, setBuyingStep] = useState<BuyingStep>("initial");
  const [isApproving, setIsApproving] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (contentRef.current) {
      setTimeout(() => {
        setContainerHeight(`${contentRef.current?.offsetHeight || 0}px`);
      }, 0);
    }
  }, [isBuying, buyingStep, isVisible, error]);

  const handleBuy = (option: Option) => {
    setIsVisible(false);
    setTimeout(() => {
      setIsBuying(true);
      setSelectedOption(option);
      setIsVisible(true);
    }, 200);
  };

  const handleCancel = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsBuying(false);
      setBuyingStep("initial");
      setSelectedOption(null);
      setAmount(0);
      setError(null);
      setIsVisible(true);
    }, 200);
  };

  const checkApproval = async () => {
    if (amount <= 0) {
      setError("Amount must be greater than 0");
      return;
    }
    setError(null);

    try {
      const userAllowance = await readContract({
        contract: BaseBettingTokenContract,
        method:
          "function allowance(address owner, address spender) view returns (uint256)",
        params: [account?.address as string, NotYourTypeContract.address],
      });

      setBuyingStep(
        userAllowance < BigInt(toWei(amount.toString()))
          ? "allowance"
          : "confirm"
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleSetApproval = async () => {
    setIsApproving(true);
    try {
      const tx = await approve({
        contract: BaseBettingTokenContract,
        spender: NotYourTypeContract.address,
        amount: amount,
      });
      await mutateTransaction(tx);
      setBuyingStep("confirm");
    } catch (error) {
      console.error(error);
    } finally {
      setIsApproving(false);
    }
  };

  const handleConfirm = async () => {
    if (!selectedOption || amount <= 0) {
      setError("Must select an option and enter an amount greater than 0");
      return;
    }

    const isOptionA = selectedOption === "A";
    const isOptionB = selectedOption === "B";
    const isOptionC = selectedOption === "C";
    const isOptionD = selectedOption === "D";

    setIsConfirming(true);
    try {
      const tx = await prepareContractCall({
        contract: NotYourTypeContract,
        method:
          "function buyShares(uint256 _marketId, bool _isOptionA, bool _isOptionB, bool _isOptionC, bool _isOptionD, uint256 _amount)",
        params: [
          BigInt(marketId),
          isOptionA,
          isOptionB,
          isOptionC,
          isOptionD,
          BigInt(toWei(amount.toString())),
        ] as [bigint, boolean, boolean, boolean, boolean, bigint],
      });
      await mutateTransaction(tx);
      toast("Successfully purchased shares.");
      handleCancel();
    } catch (error) {
      console.error(error);
      toast("Purchase failed.");
    } finally {
      setIsConfirming(false);
    }
  };

  const getOptionLabel = () => {
    switch (selectedOption) {
      case "A":
        return market.optionA;
      case "B":
        return market.optionB;
      case "C":
        return market.optionC;
      case "D":
        return market.optionD;
      default:
        return "";
    }
  };

  return (
    <div
      className="relative transition-[height] duration-200 ease-in-out overflow-hidden"
      style={{ height: containerHeight }}
    >
      <div
        ref={contentRef}
        className={cn(
          "w-full transition-all duration-200 ease-in-out",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
      >
        {!isBuying ? (
          <div className="grid grid-cols-2 gap-4 mb-4">
            <Button onClick={() => handleBuy("A")} disabled={!account}>
              {market.optionA}
            </Button>
            <Button onClick={() => handleBuy("B")} disabled={!account}>
              {market.optionB}
            </Button>
            <Button onClick={() => handleBuy("C")} disabled={!account}>
              {market.optionC}
            </Button>
            <Button onClick={() => handleBuy("D")} disabled={!account}>
              {market.optionD}
            </Button>
          </div>
        ) : (
          <div className="flex flex-col mb-4">
            {buyingStep === "allowance" ? (
              <div className="flex flex-col border-2 border-gray-200 rounded-lg p-4">
                <h2 className="text-lg font-bold mb-4">Approval Needed</h2>
                <p className="mb-4">Approve token use before buying shares.</p>
                <div className="flex justify-end">
                  <Button onClick={handleSetApproval} disabled={isApproving}>
                    {isApproving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Approving...
                      </>
                    ) : (
                      "Set Approval"
                    )}
                  </Button>
                  <Button
                    onClick={handleCancel}
                    className="ml-2"
                    variant="outline"
                    disabled={isApproving}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : buyingStep === "confirm" ? (
              <div className="flex flex-col border-2 border-gray-200 rounded-lg p-4">
                <h2 className="text-lg font-bold mb-4">Confirm Transaction</h2>
                <p className="mb-4">
                  You're buying <strong>{amount}</strong> share(s) for option{" "}
                  <strong>{getOptionLabel()}</strong>
                </p>
                <div className="flex justify-end">
                  <Button onClick={handleConfirm} disabled={isConfirming}>
                    {isConfirming ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Confirming...
                      </>
                    ) : (
                      "Confirm"
                    )}
                  </Button>
                  <Button
                    onClick={handleCancel}
                    className="ml-2"
                    variant="outline"
                    disabled={isConfirming}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 mb-1">
                  1 {getOptionLabel()} = 1 PREDICT
                </span>
                <div className="flex flex-col gap-1 mb-4">
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min="0"
                      step="1"
                      value={amount}
                      onChange={(e) =>
                        setAmount(Math.max(0, Number(e.target.value)))
                      }
                      onKeyDown={(e) =>
                        ["-", "e"].includes(e.key) && e.preventDefault()
                      }
                      className={cn(
                        "w-full",
                        error && "border-red-500 focus-visible:ring-red-500"
                      )}
                    />
                    <span className="font-bold">{getOptionLabel()}</span>
                  </div>
                  {error && (
                    <span className="text-sm text-red-500">{error}</span>
                  )}
                </div>
                <div className="flex justify-between gap-4">
                  <Button onClick={checkApproval} className="flex-1">
                    Confirm
                  </Button>
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
