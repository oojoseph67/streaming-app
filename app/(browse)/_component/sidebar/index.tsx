import { Sidebar as SidebarIcon } from "lucide-react";
import { Wrapper } from "./wrapper";
import { Toggle } from "./toggle";
import { Recommended } from "./recommended";
import { getRecommended } from "@/lib/recommended-service";

export async function Sidebar() {
  // fetch followed users
  // fetch recommended users

  // const recommended = await getRecommended();

  return (
    <div>
      <Wrapper>
        <Toggle />
        <div className="space-y-4 pt-4 lg:pt-0">
          {/* <Recommended data={recommended} /> */}
        </div>
      </Wrapper>
    </div>
  );
}
