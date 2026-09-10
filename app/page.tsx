import { getContent } from "@/lib/content";
import PortfolioSite from "@/components/site/PortfolioSite";

export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getContent();
  return <PortfolioSite content={content} />;
}
