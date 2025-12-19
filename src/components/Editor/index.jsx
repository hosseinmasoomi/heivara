"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { Highlight } from "@tiptap/extension-highlight";
import { Underline } from "@tiptap/extension-underline";
import { TextAlign } from "@tiptap/extension-text-align";
// import FontFamily from "@tiptap/extension-font-family"; // اختیاری

// ✅ Font Size extension (ساده و تمیز)
import { Extension } from "@tiptap/core";
const FontSize = Extension.create({
  name: "fontSize",
  addGlobalAttributes() {
    return [
      {
        types: ["textStyle"],
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) =>
              element.style.fontSize?.replace(/['"]/g, "") || null,
            renderHTML: (attrs) => {
              if (!attrs.fontSize) return {};
              return { style: `font-size: ${attrs.fontSize}` };
            },
          },
        },
      },
    ];
  },
});

function Btn({ active, onClick, children, title }) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`px-3 py-2 rounded-lg border text-xs font-bold transition
        ${
          active
            ? "bg-indigo-600/20 border-indigo-500 text-indigo-200"
            : "bg-slate-900/40 border-slate-700 text-slate-300 hover:bg-slate-800/60"
        }`}
    >
      {children}
    </button>
  );
}

function Select({ value, onChange, options, title }) {
  return (
    <select
      title={title}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-3 py-2 rounded-lg border text-xs font-bold bg-slate-900/40 border-slate-700 text-slate-200 outline-none"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

export default function Editor({
  value = "",
  onChange,
  placeholder = "متن مقاله...",
}) {
  const [fontSize, setFontSize] = useState("16px");
  const [color, setColor] = useState("#e2e8f0");
  const [hl, setHl] = useState("#fbbf24");

  const editor = useEditor({
    immediatelyRender: false, // ✅ برای React 19
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: {
          rel: "noopener noreferrer nofollow",
          target: "_blank",
          class: "text-indigo-300 underline",
        },
      }),
      Placeholder.configure({ placeholder }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      FontSize,
      // FontFamily, // اختیاری
    ],
    content: value || "",
    editorProps: {
      attributes: {
        dir: "rtl",
        class:
          "focus:outline-none min-h-[360px] px-4 py-4 text-slate-100 leading-8",
      },
    },
    onUpdate({ editor }) {
      onChange?.(editor.getHTML());
    },
  });

  // sync external value (edit mode)
  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    const next = value || "";
    if (current !== next) editor.commands.setContent(next, false);
  }, [value, editor]);

  const setLink = () => {
    if (!editor) return;
    const prev = editor.getAttributes("link").href || "";
    const url = window.prompt("لینک را وارد کن:", prev);
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  useEffect(() => {
    if (!editor) return;
    editor.chain().focus().setColor(color).run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color]);

  useEffect(() => {
    if (!editor) return;
    editor.chain().focus().setMark("textStyle", { fontSize }).run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fontSize]);

  if (!editor) {
    return (
      <div className="p-4 text-slate-400 text-sm border border-slate-800 rounded-xl">
        در حال لود ادیتور...
      </div>
    );
  }

  return (
    <div className="border border-slate-800 rounded-2xl overflow-hidden bg-[#020617]">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 p-3 border-b border-slate-800 bg-slate-900/30">
        <Btn
          title="H1"
          active={editor.isActive("heading", { level: 1 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          H1
        </Btn>
        <Btn
          title="H2"
          active={editor.isActive("heading", { level: 2 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          H2
        </Btn>
        <Btn
          title="H3"
          active={editor.isActive("heading", { level: 3 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          H3
        </Btn>

        <span className="mx-1 w-px h-6 bg-slate-800" />

        <Btn
          title="Bold"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          B
        </Btn>
        <Btn
          title="Italic"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          I
        </Btn>
        <Btn
          title="Underline"
          active={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          U
        </Btn>

        <Btn title="Link" active={editor.isActive("link")} onClick={setLink}>
          Link
        </Btn>
        <Btn
          title="Unlink"
          active={false}
          onClick={() => editor.chain().focus().unsetLink().run()}
        >
          Unlink
        </Btn>

        <span className="mx-1 w-px h-6 bg-slate-800" />

        <Btn
          title="Bullet list"
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          • لیست
        </Btn>
        <Btn
          title="Numbered list"
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          1 لیست
        </Btn>
        <Btn
          title="Quote"
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          Quote
        </Btn>

        <span className="mx-1 w-px h-6 bg-slate-800" />

        <Btn
          title="Align right"
          active={editor.isActive({ textAlign: "right" })}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        >
          راست
        </Btn>
        <Btn
          title="Align center"
          active={editor.isActive({ textAlign: "center" })}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        >
          وسط
        </Btn>
        <Btn
          title="Align left"
          active={editor.isActive({ textAlign: "left" })}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        >
          چپ
        </Btn>
        <Btn
          title="Justify"
          active={editor.isActive({ textAlign: "justify" })}
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        >
          Justify
        </Btn>

        <span className="mx-1 w-px h-6 bg-slate-800" />

        {/* Font size */}
        <Select
          title="Font size"
          value={fontSize}
          onChange={setFontSize}
          options={[
            { value: "14px", label: "14" },
            { value: "16px", label: "16" },
            { value: "18px", label: "18" },
            { value: "20px", label: "20" },
            { value: "24px", label: "24" },
            { value: "28px", label: "28" },
          ]}
        />

        {/* Text color */}
        <label className="flex items-center gap-2 text-xs text-slate-300 font-bold">
          رنگ متن
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="h-8 w-10 bg-transparent border border-slate-700 rounded"
          />
        </label>

        {/* Highlight */}
        <label className="flex items-center gap-2 text-xs text-slate-300 font-bold">
          هایلایت
          <input
            type="color"
            value={hl}
            onChange={(e) => setHl(e.target.value)}
            className="h-8 w-10 bg-transparent border border-slate-700 rounded"
          />
        </label>

        <Btn
          title="Toggle highlight"
          active={editor.isActive("highlight")}
          onClick={() =>
            editor.chain().focus().toggleHighlight({ color: hl }).run()
          }
        >
          Highlight
        </Btn>

        <span className="mx-1 w-px h-6 bg-slate-800" />

        <Btn
          title="Undo"
          active={false}
          onClick={() => editor.chain().focus().undo().run()}
        >
          Undo
        </Btn>
        <Btn
          title="Redo"
          active={false}
          onClick={() => editor.chain().focus().redo().run()}
        >
          Redo
        </Btn>
      </div>

      {/* Editor */}
      <div className="bg-[#020617]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
