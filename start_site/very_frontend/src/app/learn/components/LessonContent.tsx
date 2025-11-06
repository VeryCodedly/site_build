// "use client";

// import React from "react";
// import Link from "next/link";
// import CodeBlock from "./CodeBlock.jsx";


// interface LessonBlock {
//   type:
//     | "heading"
//     | "paragraph"
//     | "list"
//     | "link"
//     | "callout"
//     | "code";

//   level?: number;
//   content?: string;
//   style?: "bullet" | "number";
//   items?: string[];
//   text?: string;
//   url?: string;
//   language?: string;
// }

// interface LessonContentJSON {
//   title?: string;
//   duration?: string;
//   level?: string;
//   blocks: LessonBlock[];
// }


// export default function LessonContent({
//   content,
// }: {
//   content: Record<string, unknown>;
// }) {
//   if (!content || typeof content !== "object") {
//     console.warn("LessonContent: Invalid content format →", content);
//     return (
//       <div className="text-red-400 bg-zinc-900/60 p-4 rounded-xl border border-red-600/30">
//         ⚠️ Invalid or missing content object.
//       </div>
//     );
//   }

//   let json: LessonContentJSON | null = null;

//   try {
//     json =
//       typeof content === "string"
//         ? (JSON.parse(content) as LessonContentJSON)
//         : (content as unknown as LessonContentJSON);
//   } catch (error) {
//     console.error("LessonContent: JSON parse failed →", error);
//     return (
//       <div className="text-red-400 bg-zinc-900/60 p-4 rounded-xl border border-red-600/30">
//         ⚠️ Couldn’t parse content_JSON — invalid JSON structure.
//       </div>
//     );
//   }

//   if (!json?.blocks || !Array.isArray(json.blocks)) {
//     console.warn("LessonContent: No blocks found →", json);
//     return (
//       <div className="text-yellow-400 bg-zinc-900/60 p-4 rounded-xl border border-yellow-500/30">
//         ⚠️ No content blocks to display.
//       </div>
//     );
//   }

//   return (
//     <article className="max-w-3xl mx-auto space-y-8 px-6 text-gray-300 leading-relaxed">
//       {json.title && (
//         <header className="mb-10 text-center">
//           <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{json.title}</h1>
//           {json.duration && (
//             <div className="items-center space-between">
//               <span className="text-sm text-pink-400 italic">
//                 Level: {json.level}
//               </span>
//               <span className="text-sm text-pink-400 italic">
//                 Duration: {json.duration}
//               </span>
//             </div>
//           )}
//         </header>
//       )}

//       {json.blocks.map((block, index) => {
//         try {
//           switch (block.type) {
//             case "heading": {
//               // eslint-disable-next-line @typescript-eslint/no-explicit-any
//               const HeadingTag = `h${block.level ?? 2}` as any;
//               return (
//                 <HeadingTag
//                   key={index}
//                   className="text-xl sm:text-2xl text-white border-l-4 border-lime-400 pl-3"
//                 >
//                   {block.content}
//                 </HeadingTag>
//               );
//             }

//             case "paragraph":
//               return (
//                 <p key={index} className="text-gray-300/80 text-base sm:text-md">
//                   {block.content}
//                 </p>
//               );

//             case "list":
//               return (
//                 <ul
//                   key={index}
//                   className={`${
//                     block.style === "number" ? "list-decimal" : "list-disc"
//                   } list-inside ml-6 space-y-2 text-gray-300/80`}
//                 >
//                   {block.items?.map((item, i) => (
//                     <li
//                       key={i}
//                       className="hover:text-lime-400 transition-colors duration-200"
//                     >
//                       {item}
//                     </li>
//                   ))}
//                 </ul>
//               );

//             case "code":
//               return <CodeBlock key={index} block={block} />;

//             case "link":
//               return (
//                 <p key={index} className="text-center">
//                   <Link
//                     href={block.url || "#"}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="inline-block mt-2 text-lime-400 hover:text-white underline underline-offset-2 transition-colors"
//                   >
//                     {block.text || "Learn more"}
//                   </Link>
//                 </p>
//               );

//             case "callout":
//               return (
//                 <div
//                   key={index}
//                   className="p-4 border border-pink-500/30 bg-zinc-800/60 rounded-xl text-gray-200 italic backdrop-blur-sm shadow-lg"
//                 >
//                   💡 {block.content}
//                 </div>
//               );

//             default:
//               console.warn("LessonContent: Unrecognized block type →", block);
//               return null;
//           }
//         } catch (err) {
//           console.error("LessonContent: Error rendering block →", block, err);
//           return (
//             <div
//               key={index}
//               className="text-red-400 bg-zinc-900/60 p-2 rounded-md text-sm border border-red-600/20"
//             >
//               ⚠️ Error rendering block #{index + 1}
//             </div>
//           );
//         }
//       })}
//     </article>
    
//   );
// }
'use client';

import React from "react";
import Link from 'next/link';
import CodeBlock from "./CodeBlock.jsx";

interface LessonBlock {
  type:
    | "heading"
    | "paragraph"
    | "list"
    | "link"
    | "callout"
    | "code"
    | "table";

  level?: number;
  content?: string;
  style?: "bullet" | "number";
  items?: string[];
  text?: string;
  url?: string;
  language?: string;
  table?: string;
  headers?: string[];
  rows?: string[][];
}

interface LessonContentJSON {
  title?: string;
  duration?: string;
  level?: string;
  blocks: LessonBlock[];
}

export default function LessonContent({
  content,
}: {
  content: Record<string, unknown>;
}) {
  if (!content || typeof content !== "object") {
    console.warn("LessonContent: Invalid content format →", content);
    return (
      <div className="text-red-400 bg-zinc-900/60 p-3 rounded-xl border border-red-600/30 mx-4">
        ⚠️ Invalid or missing content object.
      </div>
    );
  }

  let json: LessonContentJSON | null = null;

  try {
    json =
      typeof content === "string"
        ? (JSON.parse(content) as LessonContentJSON)
        : (content as unknown as LessonContentJSON);
  } catch (error) {
    console.error("LessonContent: JSON parse failed →", error);
    return (
      <div className="text-red-400 bg-zinc-900/60 p-3 rounded-xl border border-red-600/30 mx-4">
        ⚠️ Could not parse content_JSON — invalid JSON structure.
      </div>
    );
  }

  if (!json?.blocks || !Array.isArray(json.blocks)) {
    console.warn("LessonContent: No blocks found →", json);
    return (
      <div className="text-yellow-400 bg-zinc-900/60 p-3 rounded-xl border border-yellow-500/30 mx-4">
        ⚠️ No content blocks to display.
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto space-y-6 sm:space-y-6 px-4 sm:px-6 text-gray-300 leading-relaxed">
      {json.title && (
        <header className="mb-10 sm:mb-10 text-center mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 leading-tight">
            {json.title}
          </h1>
          {json.duration && (
            <div className="flex flex-col items-center text-xs sm:text-sm text-pink-400 italic">
              <span>Level: {json.level}</span>
              <span>Duration: {json.duration}</span>
            </div>
          )}
        </header>
      )}

      {json.blocks.map((block, index) => {
        try {
          switch (block.type) {
            case "heading": {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const HeadingTag = `h${block.level ?? 2}` as any;
              return (
                <HeadingTag
                  key={index}
                  id={`heading-${index}`} // for sidebar scroll
                  className="scroll-mt-24 text-lg sm:text-2xl text-white border-l-4 border-lime-400 pl-3 leading-tight"
                >
                  {block.content}
                </HeadingTag>
              );
            }

            case "paragraph":
              return (
                <p key={index} className="text-sm sm:text-base text-gray-300/80 leading-relaxed">
                  {block.content}
                </p>
              );

            case "list":
              return (
                <ul
                  key={index}
                  className={`${
                    block.style === "number" ? "list-decimal" : "list-disc"
                  } list-inside ml-4 sm:ml-6 space-y-2 text-gray-300/80 text-sm sm:text-base`}
                >
                  {block.items?.map((item, i) => (
                    <li
                      key={i}
                      className="hover:text-lime-400 transition-colors duration-200 leading-relaxed"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              );

            case "code":
              return <CodeBlock key={index} block={block} />;

              case "table":
                return (
                  <div key={index} className="overflow-x-auto my-6 transition-transform duration-300 hover:scale-[1.01]">
                    <table className="w-full border-collapse backdrop-blur-md bg-white/10 dark:bg-[#181d1d]/90 border border-white/20 dark:border-zinc-700/50 rounded-xl shadow-lg overflow-hidden">
                      <thead className="bg-white/20 dark:bg-zinc-700/30">
                        <tr>
                          {block.headers?.map((header, i) => (
                            <th
                              key={i}
                              className="px-4 py-3 text-left text-sm sm:text-base font-semibold text-white/90 border-b border-white/10"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {block.rows?.map((row, ri) => (
                          <tr
                            key={ri}
                            className="hover:bg-white/10 active:bg-white/10 dark:hover:bg-zinc-700/20 transition-colors"
                          >
                            {row.map((cell, ci) => (
                              <td
                                key={ci}
                                className="px-4 py-3 text-white/80 text-xs sm:text-base border-b border-white/10"
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              
            case "link":
              return (
                <p key={index} className="text-center">
                  <Link
                    href={block.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-lime-400 hover:text-white active:text-white underline underline-offset-2 transition-colors text-sm"
                  >
                    {block.text || "Learn more"}
                  </Link>
                </p>
              );

            case "callout":
              return (
                <div
                  key={index}
                  className="p-3 sm:p-4 border border-pink-600/20 bg-zinc-800/60 rounded-xl text-gray-300 italic backdrop-blur-sm shadow-lg text-xs sm:text-base"
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
              className="text-red-400 bg-zinc-900/60 p-2 rounded-md text-xs sm:text-sm border border-red-600/20 mx-4"
            >
              ⚠️ Error rendering block #{index + 1}
            </div>
          );
        }
      })}
    </article>
  );
}