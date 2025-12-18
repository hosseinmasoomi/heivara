"use client";

import React from "react";
import BlogEditor from "./BlogEditor";
import BlogList from "./BlogList";

export default function BlogSection(props) {
  const { isEditingBlog, currentPost } = props;

  if (isEditingBlog && currentPost) return <BlogEditor {...props} />;
  return <BlogList {...props} />;
}
