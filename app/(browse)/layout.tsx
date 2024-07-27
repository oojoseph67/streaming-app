import { Suspense } from "react";
import { Container } from "./_component/container";
import { Navbar } from "./_component/navbar";
import { Sidebar, SideBarSkeleton } from "./_component/sidebar";

export default function BrowseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">
        <Suspense fallback={<SideBarSkeleton />}>
          <Sidebar />
        </Suspense>
        <Container>{children}</Container>
      </div>
    </>
  );
}
