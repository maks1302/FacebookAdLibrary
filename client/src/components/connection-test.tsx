import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";

type ConnectionResponse = {
  status: "connected" | "error";
  api_version?: string;
  response_data?: {
    data_count: number;
    has_paging: boolean;
    timestamp: string;
  };
  message?: string;
};

export function ConnectionTest() {
  const { toast } = useToast();

  const { data, error } = useQuery<ConnectionResponse>({
    queryKey: ['/api/test-connection'],
    retry: 2,
    gcTime: 0,
  });

  const isConnected = data?.status === "connected";
  const errorMessage = error instanceof Error ? error.message : "";

  useEffect(() => {
    if (error) {
      toast({
        title: "Connection Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  }, [error, errorMessage, toast]);

  return (
    <div className="fixed top-4 right-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="relative flex items-center cursor-help">
            <div
              className={`h-2.5 w-2.5 rounded-full ${
                isConnected ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <div
              className={`absolute -inset-0.5 rounded-full ${
                isConnected ? "bg-green-500" : "bg-red-500"
              } animate-pulse opacity-20`}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent className="text-xs">
            <div className="font-semibold">
              Status: {data.status}
            </div>
            {data.api_version && (
              <div>API Version: {data.api_version}</div>
            )}
            {data.response_data && (
              <>
                <div>Results: {data.response_data.data_count}</div>
                <div>Has Paging: {data.response_data.has_paging ? "Yes" : "No"}</div>
                <div>Last Updated: {new Date(data.response_data.timestamp).toLocaleTimeString()}</div>
              </>
            )}
            {data.message && (
              <div className="text-red-500">{data.message}</div>
            )}
          </TooltipContent>
      </Tooltip>
    </div>
  );
}