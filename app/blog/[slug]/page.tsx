import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/blog/mdx";
import { formatDate, getBlogPosts } from "@/lib/blog-utils";
import { baseUrl } from "@/app/sitemap";
import Header from "@/components/landing/header";
import Footer from "@/components/landing/footer";
import CTA from "@/components/landing/cta";

export async function generateStaticParams() {
  const posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getBlogPosts().find((post) => post.slug === params.slug);
  if (!post) {
    return;
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  const ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function Blog({ params }: { params: { slug: string } }) {
  const post = getBlogPosts().find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div className="mb-8">
              <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
                {post.metadata.title}
              </h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <time dateTime={post.metadata.publishedAt}>
                  {formatDate(post.metadata.publishedAt)}
                </time>
              </div>
            </div>

            <article className="prose dark:prose-invert max-w-none mb-16">
              <CustomMDX source={post.content} />
            </article>
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-8">
              <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
                <h3 className="text-lg font-semibold mb-4">Advertise with Us</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Reach thousands of DeFi enthusiasts and showcase your project to our engaged audience.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>✓</span>
                    <span>Targeted DeFi audience</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>✓</span>
                    <span>Premium ad placement</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>✓</span>
                    <span>Flexible advertising options</span>
                  </div>
                </div>
                <div className="mt-6">
                  <a 
                    href="mailto:support@apylist.com"
                    className="block w-full bg-primary text-primary-foreground rounded-md px-4 py-2 text-center text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    Contact Us
                  </a>
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    support@apylist.com
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <CTA />
      </main>
      <Footer />
    </div>
  );
}
