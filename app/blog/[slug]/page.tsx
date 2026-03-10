// Redirect old blog articles to news hub
import { redirect } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BlogArticleRedirect({ params }: Props) {
  const { slug } = await params;
  redirect(`/news-hub/${slug}`);
}
