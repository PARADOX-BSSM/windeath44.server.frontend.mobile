import BowPageClient from './BowPageClient';

export const runtime = 'edge';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function BowPage(props: PageProps) {
  const params = await props.params;
  return <BowPageClient memorialId={parseInt(params.id)} />;
}
