import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export function ConnectionTest() {
  const { toast } = useToast();

  const { data, error } = useQuery({
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
      <div className="relative flex items-center">
        <div
          className={`h-3 w-3 rounded-full ${
            isConnected ? "bg-green-500" : "bg-red-500"
          }`}
        />
        <div
          className={`absolute -inset-0.5 rounded-full ${
            isConnected ? "bg-green-500" : "bg-red-500"
          } animate-pulse opacity-20`}
        />
      </div>
    </div>
  );
}