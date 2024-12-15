import LiveBlockProvider from "@/components/LiveBlocksProvider";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return <LiveBlockProvider>{children}</LiveBlockProvider>;
};

export default PageLayout;
