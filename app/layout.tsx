import type { Metadata } from "next";
import { Archivo_Black, Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/ui/SmoothScrollProvider";
import { CRTOverlay } from "@/components/ui/CRTOverlay";
import { TerminalProvider } from "@/lib/terminal/TerminalContext";
import { TerminalShell } from "@/components/terminal/TerminalShell";

const display = Archivo_Black({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400"],
  display: "swap"
});

const body = Archivo({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap"
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  display: "swap"
});

const siteUrl = "https://debshata.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Debshata Choudhury | Quantum Computing, Data Science and AI",
  description:
    "Portfolio of Debshata Choudhury, a dual-degree computer science and data science student, IBM Qiskit Advocate, quantum-machine-learning researcher and hackathon champion.",
  alternates: { canonical: siteUrl },
  openGraph: {
    title: "Debshata Choudhury | Quantum Computing, Data Science and AI",
    description:
      "Portfolio of Debshata Choudhury, a dual-degree computer science and data science student, IBM Qiskit Advocate, quantum-machine-learning researcher and hackathon champion.",
    url: siteUrl,
    siteName: "Debshata Choudhury",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Debshata Choudhury | Quantum Computing, Data Science and AI",
    description:
      "Portfolio of Debshata Choudhury, a dual-degree computer science and data science student, IBM Qiskit Advocate, quantum-machine-learning researcher and hackathon champion."
  },
  robots: { index: true, follow: true }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Debshata Choudhury",
  jobTitle: "Data Science and Computer Science Student, Quantum Machine Learning Researcher",
  description:
    "Dual-degree student in Computer Science and Data Science, IBM Qiskit Advocate, quantum-machine-learning researcher and hackathon champion.",
  email: "mailto:debshatachoudhury@gmail.com",
  url: siteUrl
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body antialiased">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <div className="archive-ground" aria-hidden />
        <div className="archive-frame" aria-hidden />
        <CRTOverlay />
        <TerminalProvider>
          <SmoothScrollProvider>
            <TerminalShell>{children}</TerminalShell>
          </SmoothScrollProvider>
        </TerminalProvider>
      </body>
    </html>
  );
}
