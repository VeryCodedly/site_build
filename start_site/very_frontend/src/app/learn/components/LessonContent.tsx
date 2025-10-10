// "use client";

// import React from "react";
// import Link from "next/link";

// interface LessonBlock {
//   type: "heading" | "paragraph" | "list" | "link" | "callout";
//   level?: number;
//   content?: string;
//   style?: "bullet" | "number";
//   items?: string[];
//   text?: string;
//   url?: string;
// }

// interface LessonContentJSON {
//   title?: string;
//   duration?: string;
//   blocks: LessonBlock[];
// }

// export default function LessonContent({
//   content,
// }: {
//   content: Record<string, unknown>;
// }) {
//   if (!content || typeof content !== "object") return null;

//   // safe cast via unknown
//   const json = content as unknown as LessonContentJSON;
//   if (!json.blocks || !Array.isArray(json.blocks)) return null;

//   return (
//     <article className="max-w-3xl mx-auto mt-10 space-y-8 px-6 text-gray-300 leading-relaxed">
//       {/* Optional title and duration */}
//       {json.title && (
//         <header className="mb-6 text-center">
//           <h1 className="text-3xl font-bold text-white mb-2">{json.title}</h1>
//           {json.duration && (
//             <span className="text-sm text-pink-400 italic">
//               Duration: {json.duration}
//             </span>
//           )}
//         </header>
//       )}

//       {/* Render blocks */}
//       {json.blocks.map((block, index) => {
//         switch (block.type) {
//           case "heading": {
//             // use global JSX namespace for the tag type — don't import JSX
//             const HeadingTag = `h${block.level ?? 2}` as any;
//             return (
//               <HeadingTag
//                 key={index}
//                 className="text-2xl sm:text-3xl font-semibold text-white border-l-4 border-lime-400 pl-3"
//               >
//                 {block.content}
//               </HeadingTag>
//             );
//           }

//           case "paragraph":
//             return (
//               <p key={index} className="text-gray-400 text-base sm:text-lg">
//                 {block.content}
//               </p>
//             );

//           case "list":
//             return (
//               <ul
//                 key={index}
//                 className={`${
//                   block.style === "number" ? "list-decimal" : "list-disc"
//                 } list-inside ml-6 space-y-2 text-gray-400`}
//               >
//                 {block.items?.map((item, i) => (
//                   <li
//                     key={i}
//                     className="hover:text-lime-400 transition-colors duration-200"
//                   >
//                     {item}
//                   </li>
//                 ))}
//               </ul>
//             );

//           case "link":
//             return (
//               <p key={index} className="text-center">
//                 <Link
//                   href={block.url || "#"}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-block mt-2 text-pink-400 hover:text-lime-400 underline underline-offset-2 transition-colors"
//                 >
//                   {block.text || "Learn more"}
//                 </Link>
//               </p>
//             );

//           case "callout":
//             return (
//               <div
//                 key={index}
//                 className="p-4 border border-pink-500/30 bg-zinc-800/60 rounded-xl text-gray-200 italic backdrop-blur-sm shadow-lg"
//               >
//                 💡 {block.content}
//               </div>
//             );

//           default:
//             return null;
//         }
//       })}
//     </article>
//   );
// }
"use client";

import React from "react";
import Link from "next/link";

interface LessonBlock {
  type: "heading" | "paragraph" | "list" | "link" | "callout";
  level?: number;
  content?: string;
  style?: "bullet" | "number";
  items?: string[];
  text?: string;
  url?: string;
}

interface LessonContentJSON {
  title?: string;
  duration?: string;
  blocks: LessonBlock[];
}

export default function LessonContent({
  content,
}: {
  content: Record<string, unknown>;
}) {
  // === DEBUG SAFEGUARDS ===
  if (!content || typeof content !== "object") {
    console.warn("LessonContent: Invalid content format →", content);
    return (
      <div className="text-red-400 bg-zinc-900/60 p-4 rounded-xl border border-red-600/30">
        ⚠️ Invalid or missing content object.
      </div>
    );
  }

  let json: LessonContentJSON | null = null;

  try {
    // Try to cast (handles if JSON comes as a string)
    json =
      typeof content === "string"
        ? (JSON.parse(content) as LessonContentJSON)
        : (content as unknown as LessonContentJSON);
  } catch (error) {
    console.error("LessonContent: JSON parse failed →", error);
    return (
      <div className="text-red-400 bg-zinc-900/60 p-4 rounded-xl border border-red-600/30">
        ⚠️ Couldn’t parse content_JSON — invalid JSON structure.
      </div>
    );
  }

  if (!json?.blocks || !Array.isArray(json.blocks)) {
    console.warn("LessonContent: No blocks found →", json);
    return (
      <div className="text-yellow-400 bg-zinc-900/60 p-4 rounded-xl border border-yellow-500/30">
        ⚠️ No content blocks to display.
      </div>
    );
  }

  // === SUCCESSFUL RENDER ===
  return (
    <article className="max-w-3xl mx-auto mt-10 space-y-8 px-6 text-gray-300 leading-relaxed">
      {/* Optional title and duration */}
      {json.title && (
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">{json.title}</h1>
          {json.duration && (
            <span className="text-sm text-pink-400 italic">
              Duration: {json.duration}
            </span>
          )}
        </header>
      )}

      {/* Render each block safely */}
      {json.blocks.map((block, index) => {
        try {
          switch (block.type) {
            case "heading": {
              const HeadingTag = `h${block.level ?? 2}` as any;
              return (
                <HeadingTag
                  key={index}
                  className="text-2xl sm:text-3xl font-semibold text-white border-l-4 border-lime-400 pl-3"
                >
                  {block.content}
                </HeadingTag>
              );
            }

            case "paragraph":
              return (
                <p key={index} className="text-gray-400 text-base sm:text-lg">
                  {block.content}
                </p>
              );

            case "list":
              return (
                <ul
                  key={index}
                  className={`${
                    block.style === "number" ? "list-decimal" : "list-disc"
                  } list-inside ml-6 space-y-2 text-gray-400`}
                >
                  {block.items?.map((item, i) => (
                    <li
                      key={i}
                      className="hover:text-lime-400 transition-colors duration-200"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              );

            case "link":
              return (
                <p key={index} className="text-center">
                  <Link
                    href={block.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-pink-400 hover:text-lime-400 underline underline-offset-2 transition-colors"
                  >
                    {block.text || "Learn more"}
                  </Link>
                </p>
              );

            case "callout":
              return (
                <div
                  key={index}
                  className="p-4 border border-pink-500/30 bg-zinc-800/60 rounded-xl text-gray-200 italic backdrop-blur-sm shadow-lg"
                >
                  💡 {block.content}
                </div>
              );

            default:
              console.warn("LessonContent: Unrecognized block type →", block);
              return null;
          }
        } catch (err) {
          console.error("LessonContent: Error rendering block →", block, err);
          return (
            <div
              key={index}
              className="text-red-400 bg-zinc-900/60 p-2 rounded-md text-sm border border-red-600/20"
            >
              ⚠️ Error rendering block #{index + 1}
            </div>
          );
        }
      })}
    </article>
  );
}
