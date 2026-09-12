import { RecordSection } from "@/components/ui/RecordSection";
import { IdentityMap } from "./IdentityMap";

/**
 * 01-A — the technical identity map. It was squeezed into a 260px column
 * inside the personnel file, where the node labels were unreadable; the "-A"
 * suffix follows the same continuation convention as the DC-001-A photograph.
 * It reads as a continuation rather than a peer record, so it sits tight
 * against 01 instead of taking a full record's air.
 */
export function IdentityMapSection() {
  return (
    <RecordSection
      id="identity-map"
      section="01-A"
      title="Identity map"
      recordLabel="TECHNICAL DOMAINS"
      meta="6 NODES / CONTINUATION OF 01"
      footerPath="DC://ARCHIVE/IDENTITY-MAP"
      footerIndex="CONT. OF 01"
      headingId="identity-map-heading"
      rhythm="close"
    >
      <IdentityMap />
    </RecordSection>
  );
}
