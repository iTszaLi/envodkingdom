import React from "react";
import { Link } from "wouter";
import { useLanguage } from "@/lib/language-context";
import { useListArticles } from "@workspace/api-client-react";
import { motion } from "framer-motion";

export default function Blog() {
  const { t, isRtl } = useLanguage();
  const { data: articlesData } = useListArticles({ published: true });

  return (
    <div className="pt-24 pb-20 min-h-screen bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 uppercase">
            {t("Knowledge Center", "مركز المعرفة")}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t("Insights, updates, and expert perspectives on global logistics and supply chain management.", "رؤى وتحديثات ووجهات نظر الخبراء حول الخدمات اللوجستية العالمية وإدارة سلسلة التوريد.")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articlesData?.articles?.map((article, i) => (
            <motion.div 
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-white/5 rounded-xl overflow-hidden hover:border-secondary/50 transition-colors group flex flex-col"
            >
              <Link href={`/blog/${article.slug}`} className="block h-48 bg-primary/20 overflow-hidden relative">
                {article.featuredImageUrl ? (
                  <img src={article.featuredImageUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary">
                    <span className="text-white/20 font-bold text-2xl uppercase">ENVOD</span>
                  </div>
                )}
                <div className="absolute top-4 left-4 bg-secondary text-white text-xs font-bold px-3 py-1 rounded uppercase">
                  {article.category}
                </div>
              </Link>
              <div className="p-6 flex flex-col flex-1">
                <div className="text-sm text-muted-foreground mb-3 flex justify-between">
                  <span>{new Date(article.publishedAt || article.createdAt).toLocaleDateString()}</span>
                  <span>{article.authorName}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 hover:text-secondary transition-colors">
                  <Link href={`/blog/${article.slug}`}>
                    {isRtl && article.titleAr ? article.titleAr : article.title}
                  </Link>
                </h3>
                <p className="text-muted-foreground mb-6 line-clamp-3 flex-1">
                  {isRtl && article.excerptAr ? article.excerptAr : article.excerpt}
                </p>
                <Link href={`/blog/${article.slug}`} className="text-secondary font-medium hover:underline inline-flex items-center gap-1 mt-auto">
                  {t("Read Article", "اقرأ المقال")} {isRtl ? "←" : "→"}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
