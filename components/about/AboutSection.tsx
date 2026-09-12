import Image from "next/image";
import { profile, links, archive } from "@/data/portfolio";
import { RecordSection } from "@/components/ui/RecordSection";

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
    <RecordSection
      id="about"
      section="01"
      title="Personnel file"
      recordLabel={`RECORD ${archive.recordId}`}
      meta={`CLEARANCE: ${archive.clearance}`}
      footerPath="DC://ARCHIVE/PERSONNEL"
      footerIndex={`01 / ${archive.totalRecords}`}
      headingId="about-heading"
      rhythm="lead"
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,280px)_1fr] lg:gap-16">
        <figure className="flex w-full max-w-[280px] flex-col gap-2">
          <span className="dc-code font-mono text-meta uppercase text-accent-muted">FIG. 01</span>
          <div className="relative aspect-[4/5] w-full border border-hair bg-panel">
            <Image
              src={profile.portrait}
              alt={`Portrait of ${profile.name}`}
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 280px"
              className="object-cover object-top"
            />
          </div>
          <figcaption className="dc-code flex items-center justify-between gap-3 font-mono text-meta uppercase text-mute">
            <span>SUBJECT PHOTOGRAPH</span>
            <span className="text-accent-muted">{archive.recordId}-A</span>
          </figcaption>
        </figure>

        <div className="flex flex-col gap-10">
          {/* The biography is the record's primary reading, so it gets the
              larger measure-capped setting and the brightest prose colour. */}
          <div className="flex max-w-measure flex-col gap-4">
            <span className="font-mono text-meta uppercase text-accent-muted">BIOGRAPHY</span>
            <p className="font-body text-lede text-body">
              I am a computer science and data science student working where mathematical research meets practical
              engineering — machine learning, data pipelines, visual analytics, software development and quantum
              computing.
            </p>
            <p className="font-body text-lede text-body">
              I approach technology through experimentation: PySpark pipelines at Accenture, market-prediction models
              at Finideas, and quantum machine-learning experiments on IBM hardware as a Qiskit Advocate. Currently
              focused on {profile.currentFocus.toLowerCase()}.
            </p>
          </div>

          <dl className="grid gap-x-10 gap-y-4 border-t border-hair pt-6 sm:grid-cols-2">
            {FILE_FIELDS.map(([label, value]) => (
              <div key={label} className="flex flex-col gap-1.5">
                <dt className="font-mono text-meta uppercase text-accent-muted">{label}</dt>
                <dd className="font-body text-prose-sm text-ink">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-col gap-4 border-t border-hair pt-6">
            <span className="font-mono text-meta uppercase text-accent-muted">INDEXED CONTACTS</span>
            <ul className="grid gap-x-10 gap-y-2 sm:grid-cols-2">
              {CONTACT_FIELDS.map(([label, value, href]) => {
                const pending = href.startsWith("ADD_");
                return (
                  <li
                    key={label}
                    className="flex min-h-[44px] items-center gap-4 font-mono text-label sm:min-h-0 sm:items-baseline"
                  >
                    <span className="w-[4.5rem] shrink-0 uppercase text-mute">{label}</span>
                    {pending ? (
                      <span className="normal-case tracking-normal text-mute opacity-60">{value}</span>
                    ) : (
                      <a
                        href={href}
                        className="focus-ring inline-flex min-h-[44px] items-center break-all normal-case tracking-normal text-body underline decoration-hair underline-offset-4 transition-colors duration-micro hover:text-accent-bright hover:decoration-accent sm:min-h-0"
                      >
                        {value}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </RecordSection>
  );
}
