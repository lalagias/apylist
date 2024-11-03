import { BlogPosts } from "@/components/blog/posts";
import Footer from "@/components/landing/footer";
import Header from "@/components/landing/header";
import CTA from "@/components/landing/cta";
export const metadata = {
  title: "Blog",
  description: "Read my blog.",
};

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen max-w-6xl mx-auto">
      <Header />
      <main>
        <BlogPosts />
      </main>
      <CTA />
      <Footer />
    </div>
  );
}
