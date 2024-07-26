import { Navbar } from "./_component/navbar";

export default function BrowseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">{children}</div>
    </>
  );
}
