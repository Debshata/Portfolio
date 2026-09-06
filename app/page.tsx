import { Hero } from "@/components/hero/Hero";
import { AboutSection } from "@/components/about/AboutSection";
import { EducationSection } from "@/components/education/EducationSection";
import { InternshipsSection } from "@/components/internships/InternshipsSection";
import { SkillsSection } from "@/components/skills/SkillsSection";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { PublicationsSection } from "@/components/publications/PublicationsSection";
import { RecommendationsSection } from "@/components/recommendations/RecommendationsSection";
import { ContactSection } from "@/components/contact/ContactSection";

export default function HomePage() {
  return (
    <>
      <main id="main-content">
        <Hero />
        <AboutSection />
        <EducationSection />
        <InternshipsSection />
        <SkillsSection />
        <ProjectsSection />
        <PublicationsSection />
        <RecommendationsSection />
      </main>
      <ContactSection />
    </>
  );
}
