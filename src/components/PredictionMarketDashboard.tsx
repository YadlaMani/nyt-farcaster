"use client";
import { useReadContract } from "thirdweb/react";
import { NotYourTypeContract } from "../utils/thridWebClient";
import { Tabs, TabsTrigger, TabsList } from "./ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { MarketCardSkeleton } from "./SkeletonCard";
import { MarketCard } from "./MarketCard";

export default function PredictionMarketDashboard() {
  const { data: marketCount, isLoading: isLoadingMarketCount } =
    useReadContract({
      contract: NotYourTypeContract,
      method: "function marketCount() view returns (uint256)",
      params: [],
    });

  const skeletonCards = Array.from({ length: 6 }, (_, index) => (
    <MarketCardSkeleton key={index} />
  ));

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow container mx-auto p-4 ">
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="mx-auto w-full md:w-[50%] flex">
            <TabsTrigger value="active" className="flex-1">
              Active
            </TabsTrigger>
            <TabsTrigger value="pending" className="flex-1">
              Pending Resolution
            </TabsTrigger>
            <TabsTrigger value="resolved" className="flex-1">
              Resolved
            </TabsTrigger>
          </TabsList>

          {isLoadingMarketCount ? (
            <TabsContent value="active" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {skeletonCards}
              </div>
            </TabsContent>
          ) : (
            <>
              <TabsContent value="active">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {Array.from({ length: Number(marketCount) }, (_, index) => (
                    <MarketCard key={index} index={index} filter="active" />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="pending">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {Array.from({ length: Number(marketCount) }, (_, index) => (
                    <MarketCard key={index} index={index} filter="pending" />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="resolved">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {Array.from({ length: Number(marketCount) }, (_, index) => (
                    <MarketCard key={index} index={index} filter="resolved" />
                  ))}
                </div>
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </div>
  );
}
