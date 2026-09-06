import type { Metadata } from "next";
// VT323 sets the headings; Iosevka carries body copy and terminal labels.
// VT323 ships a single weight and nothing else needs a heavier Iosevka cut,
// so one 400 face each — latin subset only.
import "@fontsource/vt323/latin-400.css";
import "@fontsource/iosevka/latin-400.css";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/ui/SmoothScrollProvider";
import { CRTOverlay } from "@/components/ui/CRTOverlay";
import { TerminalProvider } from "@/lib/terminal/TerminalContext";
import { TerminalShell } from "@/components/terminal/TerminalShell";

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
    <html lang="en">
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
