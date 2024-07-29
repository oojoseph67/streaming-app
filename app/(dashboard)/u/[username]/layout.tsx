import { getSelfByUsername } from "@/lib/auth-service";
import { redirect } from "next/navigation";
import { DashboardNavbar } from "./_component/navbar";
import { DashboardSideBar } from "./_component/sidebar";
import { DashboardContainer } from "./_component/container";

type CreatorLayoutProps = {
  children: React.ReactNode;
  params: { username: string };
};

export default async function CreatorLayout({
  children,
  params,
}: CreatorLayoutProps) {
  const self = await getSelfByUsername(params.username);

  if (!self) {
    redirect("/");
  }

  return (
    <>
      <DashboardNavbar />
      <div className="flex h-full pt-20">
        <DashboardSideBar />
        <DashboardContainer>{children}</DashboardContainer>
      </div>
    </>
  );
}
