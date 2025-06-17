import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { NotYourTypeContract } from "../utils/thridWebClient"
import { MarketTime } from "./MarketTime";
import { MarketCardSkeleton } from "./SkeletonCard";
import { MarketResolved } from "./MarketResolved";
import { MarketPending } from "./MarketPending";
import { MarketBuyInterface } from "./MarketBuyInterface";
import { MarketSharesDisplay } from "./MarketSharesDisplay";
import { MarketProgress } from "./MarketProgress";

// Props for the MarketCard component
// index is the market id
// filter is the filter to apply to the market
interface MarketCardProps {
  index: number;
  filter: 'active' | 'pending' | 'resolved';
}

// Interface for the market data
interface Market {
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  endTime: bigint;
  outcome: number;
  totalOptionAShares: bigint;
  totalOptionBShares: bigint;
  totalOptionCShares: bigint;
  totalOptionDShares: bigint;
  resolved: boolean;
}

// Interface for the shares balance
interface SharesBalance {
  optionAShares: bigint;
  optionBShares: bigint;
  optionCShares: bigint;
  optionDShares: bigint;
}

export function MarketCard({ index, filter }: MarketCardProps) {
    // Get the active account
    const account = useActiveAccount();

    // Get the market data
    const { data: marketData, isLoading: isLoadingMarketData } = useReadContract({
        contract:NotYourTypeContract,
        method: "function getMarketInfo(uint256 _marketId) view returns (string question, string optionA, string optionB, string optionC, string optionD, uint256 endTime, uint8 outcome, uint256 totalOptionAShares, uint256 totalOptionBShares, uint256 totalOptionCShares, uint256 totalOptionDShares, bool resolved)",
        params: [BigInt(index)]
    });

    // Parse the market data
    const market: Market | undefined = marketData ? {
        question: marketData[0],
        optionA: marketData[1],
        optionB: marketData[2],
        optionC: marketData[3],
        optionD: marketData[4],
        endTime: marketData[5],
        outcome: marketData[6],
        totalOptionAShares: marketData[7],
        totalOptionBShares: marketData[8],
        totalOptionCShares: marketData[9],
        totalOptionDShares: marketData[10],
        resolved: marketData[11]
    } : undefined;

    // Get the shares balance of user
    const { data: sharesBalanceData } = useReadContract({
        contract:NotYourTypeContract,
        method: "function getSharesBalance(uint256 _marketId, address _user) view returns (uint256 optionAShares, uint256 optionBShares, uint256 optionCShares, uint256 optionDShares)",
        params: [BigInt(index), account?.address as string]
    });

    // Parse the shares balance
    const sharesBalance: SharesBalance | undefined = sharesBalanceData ? {
        optionAShares: sharesBalanceData[0],
        optionBShares: sharesBalanceData[1],
        optionCShares: sharesBalanceData[2],
        optionDShares: sharesBalanceData[3]
    } : undefined;

    // Check if the market is expired
    const isExpired = new Date(Number(market?.endTime) * 1000) < new Date();
    // Check if the market is resolved
    const isResolved = market?.resolved;

    // Check if the market should be shown
    const shouldShow = () => {
        if (!market) return false;
        
        switch (filter) {
            case 'active':
                return !isExpired;
            case 'pending':
                return isExpired && !isResolved;
            case 'resolved':
                return isExpired && isResolved;
            default:
                return true;
        }
    };

    // If the market should not be shown, return null
    if (!shouldShow()) {
        return null;
    }

    return (
        <Card key={index} className="flex flex-col">
            {isLoadingMarketData ? (
                <MarketCardSkeleton />
            ) : (
                <>
                    <CardHeader>
                        {market && <MarketTime endTime={market.endTime} />}
                        <CardTitle>{market?.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {market && (
                            <MarketProgress 
                                optionA={market.optionA}
                                optionB={market.optionB}
                                optionC={market.optionC}
                                optionD={market.optionD}
                                totalOptionAShares={market.totalOptionAShares}
                                totalOptionBShares={market.totalOptionBShares}
                                totalOptionCShares={market.totalOptionCShares}
                                totalOptionDShares={market.totalOptionDShares}
                            />
                        )}
                        {new Date(Number(market?.endTime) * 1000) < new Date() ? (
                            market?.resolved ? (
                                <MarketResolved 
                                    marketId={index}
                                    outcome={market.outcome}
                                    optionA={market.optionA}
                                    optionB={market.optionB}
                                    optionC={market.optionC}
                                    optionD={market.optionD}
                                />
                            ) : (
                                <MarketPending />
                            )
                        ) : (
                            <MarketBuyInterface 
                                marketId={index}
                                market={market!}
                            />
                        )}
                    </CardContent>
                    <CardFooter>
                        {market && sharesBalance && (
                            <MarketSharesDisplay 
                                market={market}
                                sharesBalance={sharesBalance}
                            />
                        )}
                    </CardFooter>
                </>
            )}
        </Card>
    )
}