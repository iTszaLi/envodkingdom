import React from "react";
import { useParams, Link } from "wouter";
import { useLanguage } from "@/lib/language-context";
import { useGetArticle, useListArticles, getGetArticleQueryKey } from "@workspace/api-client-react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function BlogPost() {
  const { slug } = useParams();
  const { t, isRtl } = useLanguage();
  
  // Find article by slug (mocking a getBySlug since generated API expects ID, we fetch list and filter)
  const { data: articlesData } = useListArticles({ published: true });
  const article = articlesData?.articles?.find(a => a.slug === slug);

  if (!article && articlesData) {
    return (
      <div className="pt-32 pb-20 min-h-screen text-center text-white">
        <h1 className="text-3xl font-bold mb-4">{t("Article Not Found", "المقال غير موجود")}</h1>
        <Link href="/blog" className="text-secondary hover:underline">
          {t("Return to Blog", "العودة للمدونة")}
        </Link>
      </div>
    );
  }

  if (!article) return <div className="pt-32 min-h-screen text-center text-white">Loading...</div>;

  return (
    <article className="pt-24 pb-20 min-h-screen bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-white mb-8 transition-colors">
          {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          {t("Back to all articles", "العودة لجميع المقالات")}
        </Link>

        {article.featuredImageUrl && (
          <div className="w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden mb-12 relative border border-white/10">
            <img src={article.featuredImageUrl} alt={article.title} className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4 bg-secondary text-white text-sm font-bold px-3 py-1 rounded uppercase">
              {article.category}
            </div>
          </div>
        )}

        <div className="mb-12">
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <time>{new Date(article.publishedAt || article.createdAt).toLocaleDateString()}</time>
            <span>•</span>
            <span>{t("By", "بواسطة")} {article.authorName}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
            {isRtl && article.titleAr ? article.titleAr : article.title}
          </h1>
          <p className="text-xl text-muted-foreground border-l-4 border-secondary pl-4 py-1 italic">
            {isRtl && article.excerptAr ? article.excerptAr : article.excerpt}
          </p>
        </div>

        <div className="prose prose-invert prose-lg max-w-none prose-p:text-white/80 prose-headings:text-white prose-a:text-secondary">
          <div dangerouslySetInnerHTML={{ __html: (isRtl && article.contentAr ? article.contentAr : article.content) || "" }} />
        </div>
      </div>
    </article>
  );
}
