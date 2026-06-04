import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Train, Clock, MapPin, ArrowDownUp, Wallet, ChevronDown } from "lucide-react";
import { MOCK_ROUTE } from "@/lib/krl-data";

export function RouteResultPanel({ showResult }: { showResult: boolean }) {
  return (
    <Card className="shadow-md border-border/60">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Train className="w-5 h-5 text-primary" />
          Route Result
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!showResult ? (
          <div className="flex flex-col items-center justify-center text-center py-10 text-muted-foreground">
            <div className="text-4xl mb-3">🚆</div>
            <p className="text-sm">Select origin and destination stations to find the best route.</p>
          </div>
        ) : (
          <div className="space-y-5 animate-fade-in">
            <div className="space-y-1">
              {MOCK_ROUTE.path.map((s, i) => (
                <div key={s}>
                  <div className="flex items-center gap-2 rounded-md bg-primary/5 border border-primary/10 px-3 py-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-sm font-medium">{s}</span>
                  </div>
                  {i < MOCK_ROUTE.path.length - 1 && (
                    <div className="flex justify-center py-0.5"><ChevronDown className="w-4 h-4 text-primary/60" /></div>
                  )}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Stat icon={<Clock className="w-4 h-4" />} label="Travel Time" value={`${MOCK_ROUTE.totalTime} min`} />
              <Stat icon={<MapPin className="w-4 h-4" />} label="Stations" value={String(MOCK_ROUTE.stations)} />
              <Stat icon={<ArrowDownUp className="w-4 h-4" />} label="Transfers" value={String(MOCK_ROUTE.transfers)} />
              <Stat icon={<Wallet className="w-4 h-4" />} label="Fare" value={`Rp ${MOCK_ROUTE.fare.toLocaleString()}`} />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-md border border-border/60 bg-card p-3">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">{icon}{label}</div>
      <div className="text-base font-semibold text-foreground">{value}</div>
    </div>
  );
}
