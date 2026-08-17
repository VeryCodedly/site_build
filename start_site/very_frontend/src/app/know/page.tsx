import KnowClient from "@/app/know/KnowClient";
import { KnowHomeResponse } from "@/types/know";
import Script from "next/script";


const apiURL = process.env.NEXT_PUBLIC_API_URL;

async function getHome(): Promise<KnowHomeResponse> {
    const res = await fetch(`${apiURL}/know/know-home/`, {
        next: {
            revalidate: 300,
        },
    });

    if (!res.ok) {
        throw new Error("Failed to fetch know home data");
    }

    return res.json();
}

export default async function KnowPage() {
    const data = await getHome();

    return (
        <>
            <Script id="know-structured-data" type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    "name": "Know",
                    "description":
                        "Unfiltered takes on Tech, Code, Culture and everything in between, for people who want to understand what's happening, not just keep up.",
                    "provider": {
                        "@type": "Organization",
                        "name": "VeryCodedly",
                        "sameAs": "https://verycodedly.com",
                    },
                    "url": "https://verycodedly.com/know",
                    "inLanguage": "en",
                })}
            </Script>
            <Script id="know-structured-data" type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    itemListElement: [
                        {
                            "@type": "ListItem",
                            position: 1,
                            name: "VeryCodedly | Tech. Code. Culture.",
                            item: "https://verycodedly.com",
                        },
                        {
                            "@type": "ListItem",
                            position: 2,
                            name: "Know",
                            item: "https://verycodedly.com/know",
                        },
                    ],
                })}
            </Script>
            <KnowClient initialData={data} />
        </>
    );
}

// import Link from "next/link";

// export default function KnowPage() {
//   return (
//     <main className="relative min-h-screen bg-black text-white overflow-hidden">
//       {/* subtle background accent */}
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(239,68,68,0.08),_transparent_55%)]" />

//       <section className="relative z-10 max-w-3xl mx-auto px-6 py-40 text-center">
//         <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">
//           ALL FORM
//         </p>

//         <h1 className="text-4xl sm:text-4xl lg:text-5xl font-semibold leading-tight mb-6">
//           VeryCodedly {" "}
//           <span className="text-red-500">Video</span>
//         </h1>

//         <p className="text-base text-gray-300 max-w-2xl mx-auto px- leading-relaxed">
//           Unfiltered takes on Tech, Code, Culture and everything in between, for people
//           who want to understand what’s happening, not just keep up.
//         </p>

//         <div className="mt-24 flex flex-col sm:flex-row items-center justify-center gap-6">
//           <Link
//             href="https://www.youtube.com/@verycodedly"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="hover:font-semibold order-2 cursor-pointer border-3 border-gray-500/100 px-7.5 py-1 rounded-full text-white hover:bg-white active:bg-white hover:text-black
//             active:text-black shadow-[0_4px_0_0_#DC2626] hover:shadow-[0_2px_0_0_#DC2626] active:shadow-[0_2px_0_0_#DC2626] active:translate-y-1.5 hover:translate-y-0.5 transition-all duration-200">
//             Subscribe
//           </Link>

//           <span className="text-sm text-gray-500 order-1">
//             {/* New videos we're sure you'd like. */}
//           </span>
//         </div>

//         {/* <div className="mt-18">
//           <Link
//             href="/"
//             className="text-sm text-gray-400 hover:text-red-500 transition"
//           >
//             ← Back to VeryCodedly
//           </Link>
//         </div> */}
//       </section>
//     </main>
//   );
// }
