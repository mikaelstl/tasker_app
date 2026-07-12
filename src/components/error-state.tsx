import { AlertCircle, RefreshCw } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";
import { Button } from "./ui/button";

export function ErrorState({
  error,
  refetch,
}: {
  error: string;
  refetch: () => void;
}) {
  return (
    <Card className="border-border/60 bg-card/80 shadow-sm">
      <CardHeader className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1.5">
            <AlertCircle className="size-3.5" />
            Falha ao carregar
          </Badge>
        </div>
        <CardDescription>
          Não foi possível carregar seu painel neste momento.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">{error}</p>
        <div>
          <Button type="button" variant="secondary" onClick={refetch}>
            <RefreshCw className="size-4" />
            Tentar novamente
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}