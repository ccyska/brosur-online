import BrochureDetailView from "@/views/public/BrochureDetailView";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function PublicBrochurePage({
  params,
}: Props) {
  const { slug } = await params;

  return (
    <BrochureDetailView
      slug={slug}
    />
  );
}