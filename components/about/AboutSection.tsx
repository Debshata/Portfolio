import Image from "next/image";
import { profile, links, archive } from "@/data/portfolio";
import { RecordFrame } from "@/components/ui/RecordFrame";
import { IdentityMap } from "./IdentityMap";

const FILE_FIELDS: [string, string][] = [
  ["NAME", "Debshata Choudhury"],
  ["ROLE", "Data science · Quantum ML research"],
  ["FOCUS", "Quantum machine learning, scalable data systems"],
  ["INTERESTS", "Quantum computing, AI/ML, data engineering"]
];

const CONTACT_FIELDS: [string, string, string][] = [
  ["EMAIL", links.email, `mailto:${links.email}`],
  ["GITHUB", "github.com/Debshata", links.github],
  ["LINKEDIN", "in/debshata-choudhury", links.linkedin],
  ["KAGGLE", "kaggle.com/debshatachoudhury", links.kaggle],
  ["LEETCODE", "leetcode.com/u/debshata18", links.leetcode],
  ["RESUME", "debshata-choudhury-resume.pdf", links.resume]
];

export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-heading" className="border-b border-hair py-14 md:py-20">
      <div className="mx-auto max-w-content px-5 md:px-10">
        <RecordFrame
          section="01"
          title="Personnel file"
          recordLabel={`RECORD ${archive.recordId}`}
          meta={`CLEARANCE: ${archive.clearance}`}
          footerPath="DC://ARCHIVE/PERSONNEL"
          footerIndex={`01 / ${archive.totalRecords}`}
        >
          <h3 id="about-heading" className="sr-only">
            Personnel file — about Debshata Choudhury
          </h3>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,300px)_1fr]">
            <figure className="flex w-full max-w-[300px] flex-col gap-2">
              <span className="font-mono text-[10px] uppercase tracking-label text-accent-muted">FIG. 01</span>
              <div className="relative aspect-[4/5] w-full border border-hair bg-panel">
                <Image
                  src={profile.portrait}
                  alt={`Portrait of ${profile.name}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 300px"
                  className="object-cover object-top"
                />
              </div>
              <figcaption className="flex items-center justify-between font-mono text-[10px] uppercase tracking-label text-mute">
                <span>SUBJECT PHOTOGRAPH</span>
                <span className="text-accent-muted">{archive.recordId}-A</span>
              </figcaption>
            </figure>

            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <span className="font-mono text-[10px] uppercase tracking-label text-accent">BIOGRAPHY</span>
                <p className="max-w-2xl font-body text-[15px] leading-[1.7] text-mute md:text-[17px]">
                  I am a computer science and data science student working where mathematical research meets practical
                  engineering — machine learning, data pipelines, visual analytics, software development and quantum
                  computing.
                </p>
                <p className="max-w-2xl font-body text-[15px] leading-[1.7] text-mute md:text-[17px]">
                  I approach technology through experimentation: PySpark pipelines at Accenture, market-prediction models
                  at Finideas, and quantum machine-learning experiments on IBM hardware as a Qiskit Advocate. Currently
                  focused on {profile.currentFocus.toLowerCase()}.
                </p>
              </div>

              <dl className="grid gap-x-8 gap-y-3 border-t border-hair pt-6 sm:grid-cols-2">
                {FILE_FIELDS.map(([label, value]) => (
                  <div key={label} className="flex flex-col gap-1">
                    <dt className="font-mono text-[10px] uppercase tracking-label text-accent-muted">{label}</dt>
                    <dd className="font-body text-sm text-ink">{value}</dd>
                  </div>
                ))}
              </dl>

              <ul className="grid gap-2 border-t border-hair pt-6 sm:grid-cols-2">
                {CONTACT_FIELDS.map(([label, value, href]) => {
                  const pending = href.startsWith("ADD_");
                  return (
                    <li key={label} className="flex items-baseline gap-3 font-mono text-[11px]">
                      <span className="w-20 shrink-0 uppercase tracking-label text-accent-muted">{label}</span>
                      {pending ? (
                        <span className="text-mute opacity-60">{value}</span>
                      ) : (
                        <a
                          href={href}
                          className="focus-ring text-ink underline decoration-hair underline-offset-4 hover:text-accent-bright"
                        >
                          {value}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>

              <div className="border-t border-hair pt-6">
                <IdentityMap />
              </div>
            </div>
          </div>
        </RecordFrame>
      </div>
    </section>
  );
}
