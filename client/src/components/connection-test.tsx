import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ConnectionTest() {
  const [status, setStatus] = useState<"idle" | "loading" | "connected" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { toast } = useToast();

  const testConnection = async () => {
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/test-connection");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to connect to Facebook API");
      }

      setStatus("connected");
      toast({
        title: "Success",
        description: "Successfully connected to Facebook API",
      });
    } catch (error) {
      setStatus("error");
      const message = error instanceof Error ? error.message : "An unexpected error occurred";
      setErrorMessage(message);
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        onClick={testConnection}
        disabled={status === "loading"}
        className="w-40"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Testing...
          </>
        ) : (
          "Test Connection"
        )}
      </Button>

      {status === "connected" && (
        <div className="flex items-center text-green-600">
          <CheckCircle2 className="mr-1 h-4 w-4" />
          Connected
        </div>
      )}

      {status === "error" && (
        <div className="flex items-center text-destructive">
          <AlertCircle className="mr-1 h-4 w-4" />
          {errorMessage}
        </div>
      )}
    </div>
  );
}
