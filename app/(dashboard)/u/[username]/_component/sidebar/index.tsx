import { DashboardNavigation } from "./navigation";
import { DashboardToggle } from "./toggle";
import { DashboardWrapper } from "./wrapper";

export function DashboardSideBar() {
  return (
    <DashboardWrapper>
      <DashboardToggle />
      <DashboardNavigation />
    </DashboardWrapper>
  );
}
