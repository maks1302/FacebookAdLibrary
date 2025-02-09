import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CollapsibleListProps {
  items: {
    text: string;
    variant?: "default" | "secondary" | "destructive";
    className?: string;
  }[];
  maxItems?: number;
  label?: string;
}

export function CollapsibleList({ items, maxItems = 2, label }: CollapsibleListProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasMore = items.length > maxItems;
  const displayedItems = isExpanded ? items : items.slice(0, maxItems);
  const remainingCount = items.length - maxItems;

  const allItemsList = items.map(item => item.text).join(", ");
  
  return (
    <div className="space-y-1">
      <div className={`flex flex-wrap gap-1 items-center ${isExpanded ? "max-h-[80px] overflow-y-auto pr-1" : ""}`}>
        {displayedItems.map((item, index) => (
          <Badge
            key={index}
            variant={item.variant || "secondary"}
            className={`px-1.5 py-0 text-[10px] ${item.className}`}
          >
            {item.text}
          </Badge>
        ))}
        
        {!isExpanded && hasMore && (
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 px-1 text-[10px] text-purple-600 hover:text-purple-700 hover:bg-transparent"
                  onClick={() => setIsExpanded(true)}
                >
                  +{remainingCount} more
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-[300px]">
                <p className="text-xs">
                  {label && <span className="font-medium">{label}: </span>}
                  {allItemsList}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      
      {isExpanded && (
        <Button
          variant="ghost"
          size="sm"
          className="h-5 text-[10px] text-purple-600 hover:text-purple-700 p-0"
          onClick={() => setIsExpanded(false)}
        >
          Show Less <ChevronUp className="h-2 w-2 ml-1" />
        </Button>
      )}
    </div>
  );
}
