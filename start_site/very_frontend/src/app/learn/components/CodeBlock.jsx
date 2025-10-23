// import { useState } from "react";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faClipboard, faCheck } from "@fortawesome/free-solid-svg-icons";


// /* ✅ Code Block Component with Syntax Highlighting + Copy Button + Language Badge */
// function CodeBlock({ block }) {
//   const [copied, setCopied] = useState(false);

//   const handleCopy = () => {
//     if (block.content) {
//       navigator.clipboard.writeText(block.content);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 1500);
//     }
//   };

//   return (
//     <div className="relative group my-6 rounded-xl overflow-hidden border border-zinc-700/50 bg-[#181d1d]/80 backdrop-blur-md shadow-lg transition-all">
//       <span className="absolute top-2 left-3 text-xs font-semibold text-gray-300 tracking-wide bg-zinc-800/70 px-2 py-1 rounded-md">
//         {block.language || "code"}
//       </span>

//       <button
//         onClick={handleCopy}
//         className="absolute top-2 right-3 text-xs px-2 py-1 rounded-md bg-zinc-800/70 text-gray-300 hover:text-lime-400 hover:bg-zinc-700/70 transition-all duration-200 flex items-center gap-1"
//       >
//         <FontAwesomeIcon icon={copied ? faCheck : faClipboard} />
//         {copied ? "Copied" : "Copy"}
//       </button>

//       <SyntaxHighlighter
//         language={block.language || "javascript"}
//         style={oneDark}
//         wrapLongLines
//         showLineNumbers={false}
//         customStyle={{
//           background: "rgba(26,29,29,0.9)", 
//           borderRadius: "0.75rem",
//           padding: "2rem 1rem 1rem 1rem",
//           fontSize: "0.9rem",
//           lineHeight: "1.6",
//         }}
//         codeTagProps={{
//           style: {
//             backgroundColor: "transparent", 
//           },
//         }}
//       >
//         {block.content || ""}
//       </SyntaxHighlighter>
//     </div>
//   );
// }

// export default CodeBlock;
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard, faCheck } from "@fortawesome/free-solid-svg-icons";

/* 💡 Custom VeryCodedly theme: brighter colors for keywords, strings, functions, etc. */
const veryCodedlyTheme = {
  'code[class*="language-"]': {
    color: "#E9E9E9",
    background: "none",
    fontFamily: "JetBrains Mono, monospace",
    fontSize: "0.85rem",
    lineHeight: "1.6",
  },
  'pre[class*="language-"]': {
    color: "#E9E9E9",
    background: "none",
    overflowX: "auto",
  },
  comment: { color: "#6B7280", fontStyle: "italic" }, // soft gray
  keyword: { color: "#fb64b6" }, // bright pink
  string: { color: "#9AE600" }, // lime
  number: { color: "#00FFFF" }, // cyan
  function: { color: "#FFD580" }, // pastel orange
  punctuation: { color: "#A0A0A0" },
  operator: { color: "#FF91A4" },
  boolean: { color: "#FF6EC7" },
  className: { color: "#FF9F40" },
  variable: { color: "#E9E9E9" },
  tag: { color: "#ff4d4d" },
  attrName: { color: "#F4BFFF" },
  attrValue: { color: "#9AE600" },
};

function CodeBlock({ block }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (block.content) {
      navigator.clipboard.writeText(block.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="relative group my-10 text-xs sm:text-sm md:text-base rounded-xl overflow-auto border-y-4 border-gray-800/50 bg-[#181d1d]/90 backdrop-blur-md shadow-lg transition-all">

      {/* <div className="relative"> */}
        <span className="absolute top-2 left-3 text-xs font-semibold text-gray-300 tracking-wide bg-zinc-800/70 px-2 py-0.5 rounded-md">
          {block.language || "code"}
        </span>

        <button
          onClick={handleCopy}
          className="absolute top-2 right-3 text-xs px-2 py-1 rounded-md bg-zinc-800/70 text-gray-300 hover:text-lime-400 
          hover:bg-zinc-700/70 transition-all duration-200 flex items-center gap-1 focus:outline-none focus:ring-2 
          focus:ring-lime-400 focus:ring-offset-2 focus:ring-offset-[#181d1d] aria-label"
        >
          <FontAwesomeIcon icon={copied ? faCheck : faClipboard} />
          {copied ? "Copied" : "Copy"}
        </button>
      {/* </div> */}

      <SyntaxHighlighter
        language={block.language || "javascript"}
        style={oneDark}
        wrapLongLines
        showLineNumbers={false}
        customStyle={{
          background: "transparent",
          borderRadius: "0.75rem",
          padding: "2.2rem 1rem 1rem 1rem",
        }}
        codeTagProps={{
          style: { backgroundColor: "transparent" },
        }}
      >
        {block.content || ""}
      </SyntaxHighlighter>
    </div>
  );
}

export default CodeBlock;
