import { Progress } from "@/components/ui/progress";
import { toEther } from "thirdweb";

interface MarketProgressProps {
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    totalOptionAShares: bigint;
    totalOptionBShares: bigint;
    totalOptionCShares: bigint;
    totalOptionDShares: bigint;
}

export function MarketProgress({ 
    optionA, 
    optionB,
    optionC, 
    optionD,  
    totalOptionAShares, 
    totalOptionBShares,
    totalOptionCShares, 
    totalOptionDShares 
}: MarketProgressProps) {
    const totalShares = Number(totalOptionAShares) + Number(totalOptionBShares);
    const yesPercentage = totalShares > 0 
        ? (Number(totalOptionAShares) / totalShares) * 100 
        : 50;

    return (
        <>
        </>
        // <div className="mb-4">
        //     <div className="flex justify-between mb-2">
        //         <span>
        //             <span className="font-bold text-sm">
        //                 {optionA}: {Math.floor(parseInt(toEther(totalOptionAShares)))}
        //             </span>
        //             {/* {totalShares > 0 && (
        //                 <span className="text-xs text-gray-500"> {Math.floor(yesPercentage)}%</span>
        //             )} */}
        //         </span>
        //         <span>
        //             <span className="font-bold text-sm">
        //                 {optionB}: {Math.floor(parseInt(toEther(totalOptionBShares)))}
        //             </span>
        //             {/* {totalShares > 0 && (
        //                 <span className="text-xs text-gray-500"> {Math.floor(100 - yesPercentage)}%</span>
        //             )} */}
        //         </span>
        //         <span>
        //             <span className="font-bold text-sm">
        //                 {optionC}: {Math.floor(parseInt(toEther(totalOptionCShares)))}
        //             </span>
        //             {/* {totalShares > 0 && (
        //                 <span className="text-xs text-gray-500"> {Math.floor(yesPercentage)}%</span>
        //             )} */}
        //         </span>
        //         <span>
        //             <span className="font-bold text-sm">
        //                 {optionD}: {Math.floor(parseInt(toEther(totalOptionDShares)))}
        //             </span>
        //             {/* {totalShares > 0 && (
        //                 <span className="text-xs text-gray-500"> {Math.floor(yesPercentage)}%</span>
        //             )} */}
        //         </span>
        //     </div>
        //     <Progress value={yesPercentage} className="h-2" />
        // </div>
    );
}