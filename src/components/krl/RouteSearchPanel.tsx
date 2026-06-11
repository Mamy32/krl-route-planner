import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Navigation } from "lucide-react";
import { STATION_LIST } from "@/lib/krl-data";

type Props = {
  origin: string;
  destination: string;
  pickupStation: string;

  optimization: string;

  onOriginChange: (v: string) => void;
  onDestinationChange: (v: string) => void;
  onPickupStationChange: (v: string) => void;

  onOptimizationChange: (v: string) => void;

  onFindRoute: () => void;
};
export function RouteSearchPanel(p: Props) {
  return (
    <Card className="shadow-md border-border/60">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Search className="w-5 h-5 text-primary" />
          Route Planner
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <Label className="flex items-center gap-1.5 text-sm font-medium">
            <MapPin className="w-3.5 h-3.5 text-primary" /> Starting Station
          </Label>
          <Select value={p.origin} onValueChange={p.onOriginChange}>
            <SelectTrigger><SelectValue placeholder="Select origin" /></SelectTrigger>
            <SelectContent>
              {STATION_LIST.map((s) => <SelectItem key={s.id} value={s.name}>{s.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-1.5 text-sm font-medium">
            <Navigation className="w-3.5 h-3.5 text-primary" /> Destination Station
          </Label>
          <Select value={p.destination} onValueChange={p.onDestinationChange}>
            <SelectTrigger><SelectValue placeholder="Select destination" /></SelectTrigger>
            <SelectContent>
              {STATION_LIST.map((s) => <SelectItem key={s.id} value={s.name}>{s.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
  <Label className="text-sm font-medium">
    Friend Pickup Station (Optional)
  </Label>

  <Select
    value={p.pickupStation}
    onValueChange={p.onPickupStationChange}
  >
    <SelectTrigger>
      <SelectValue placeholder="Select pickup station" />
    </SelectTrigger>

    <SelectContent>
      {STATION_LIST.map((s) => (
        <SelectItem
          key={s.id}
          value={s.name}
        >
          {s.name}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
</div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Optimization Preference</Label>
          <Select value={p.optimization} onValueChange={p.onOptimizationChange}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="fastest">Fastest Route</SelectItem>
              <SelectItem value="shortest">Shortest Distance</SelectItem>
              <SelectItem value="transfers">Minimum Transfers</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={p.onFindRoute} className="w-full h-11 text-base font-semibold shadow-sm" size="lg">
          <Search className="w-4 h-4 mr-2" />
          Find Route
        </Button>
      </CardContent>
    </Card>
  );
}
