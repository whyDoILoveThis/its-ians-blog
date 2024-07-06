import React from "react";
import ReactMarkdown from "react-markdown";
import TurndownService from "turndown";

interface RenderHTMLProps {
  htmlContent: string;
}

const RenderHTML: React.FC<RenderHTMLProps> = ({ htmlContent }) => {
  // Convert HTML to Markdown
  const turndownService = new TurndownService();
  const markdownContent = turndownService.turndown(htmlContent);

  return <ReactMarkdown>{markdownContent}</ReactMarkdown>;
};

export default RenderHTML;
