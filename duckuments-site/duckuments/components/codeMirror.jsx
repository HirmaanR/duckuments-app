"use client";

import { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { markdown } from "@codemirror/lang-markdown";
import { marked } from "marked";

import "highlight.js/styles/github-dark.css";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { remark } from "remark";
import html from "remark-html";
import { useGetFileContent } from "@/server/server";

function MarkdownEditor({markdown}) {
  // const [markdownText, setMarkdownText] = useState(
  //   "# Hello \n ```js\n console.log(filename)\n```\n\n`filename`\n\n\n [filename](https:\\filename.com)\n\n\n```python\nprint(filename)\n```"
  // );

  const { getFileContentFunc, loading, error, userData } = useGetFileContent();

  useEffect(() => {
    if (userData) {
      console.log(userData);
    }
  }, [userData]);

  function MarkdownRenderer({ markdown }) {

    return (
      <div className="prose prose-code:text-red-400 prose-pre:bg-[#0d1117] prose-pre:p-0 prose-pre:rounded-lg dark:prose-invert prose-a:text-blue-700">
        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
          {markdown}
        </ReactMarkdown>
      </div>
    );
  }

  return (
    // <div>
    //   <div className="border rounded p-2">
    //     <h2 className="text-lg font-bold mb-2">Editor</h2>
    //     <CodeMirror
    //       value={markdownText}
    //       height="300px"
    //       extensions={[markdown()]}
    //       onChange={(value) => setMarkdownText(value)}
    //     />
    // </div>
    // <Card>
    //   <CardContent>
    //     <MarkdownRenderer markdown={markdownText} />
    //   </CardContent>
    // </Card>
    // </div>
    <div className="p-3">
    <MarkdownRenderer markdown={markdown} />
    </div>
  );
}

export default MarkdownEditor;
