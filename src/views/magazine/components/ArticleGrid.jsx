"use client";

import React from "react";
import { ChevronLeft, Zap } from "lucide-react";
import Button from "../../../components/ui/Button";
import ArticleCard from "./ArticleCard";

export default function ArticleGrid({ title, onViewAll, articles, onOpen }) {
  return (
    <>
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Zap className="text-yellow-400" /> {title}
        </h2>

        <Button
          variant="link"
          onClick={onViewAll}
          className="text-indigo-400 text-sm flex items-center gap-1"
        >
          مشاهده همه <ChevronLeft size={16} />
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {articles.map((a) => (
          <ArticleCard
            key={a.slug}
            article={a}
            onClick={() => onOpen(a.slug)}
          />
        ))}
      </div>
    </>
  );
}
