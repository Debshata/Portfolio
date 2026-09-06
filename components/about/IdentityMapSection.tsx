import { archive } from "@/data/portfolio";
import { RecordFrame } from "@/components/ui/RecordFrame";
import { IdentityMap } from "./IdentityMap";

/**
 * 01-A — the technical identity map. It was squeezed into a 260px column
 * inside the personnel file, where the node labels were unreadable; the "-A"
 * suffix follows the same continuation convention as the DC-001-A photograph.
 */
export function IdentityMapSection() {
  return (
    <section
      id="identity-map"
      aria-labelledby="identity-map-heading"
      className="border-b border-hair py-14 md:py-20"
    >
      <div className="mx-auto max-w-content px-5 md:px-10">
        <RecordFrame
          section="01-A"
          title="Identity map"
          recordLabel="TECHNICAL DOMAINS"
          meta="6 NODES / FULLY CONNECTED"
          footerPath="DC://ARCHIVE/IDENTITY-MAP"
          footerIndex={`01-A / ${archive.totalRecords}`}
        >
          <h3 id="identity-map-heading" className="sr-only">
            Technical identity map
          </h3>
          <IdentityMap />
        </RecordFrame>
      </div>
    </section>
  );
}
