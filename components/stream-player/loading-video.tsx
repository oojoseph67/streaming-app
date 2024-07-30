import { Loader } from "lucide-react";

export function LoadingVideo({ label }: { label: string }) {
  return (
    <div className="h-full flex flex-co space-y-4 justify-center items-center">
      <Loader className="h-10 w-10 text-muted-foreground animate-spin" />
      <p className="text-muted-foreground">{label} is offline</p>
    </div>
  );
}
