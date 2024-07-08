import React from "react";
import ReactMarkdown from "react-markdown";
import TurndownService from "turndown";

interface RenderHTMLProps {
  htmlContent: string | undefined;
}

const RenderHTML: React.FC<RenderHTMLProps> = ({ htmlContent }) => {
  if (htmlContent) {
    // Convert HTML to Markdown
    const turndownService = new TurndownService();
    const markdownContent = turndownService.turndown(htmlContent);

    return <ReactMarkdown>{markdownContent}</ReactMarkdown>;
  } else return;
};

export default RenderHTML;
