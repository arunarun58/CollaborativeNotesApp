import LiveBlocksProvider from "@/components/LoveBlocksProvider";

function PageLayout({ children }: { children: React.ReactNode }) {
  return <LiveBlocksProvider>{children}</LiveBlocksProvider>;
}

export default PageLayout;
