import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import type { RESUME_DATA } from "@/data/resume-data";

type Certification = (typeof RESUME_DATA)["certifications"][number];

interface CertificationPeriodProps {
  date: Certification["date"];
  expiryDate?: Certification["expiryDate"];
}

/**
 * Displays the certification period in a consistent format
 */
function CertificationPeriod({ date, expiryDate }: CertificationPeriodProps) {
  return (
    <div
      className="text-sm tabular-nums text-gray-500"
      title={`Period: ${date}${expiryDate ? ` to ${expiryDate}` : ""}`}
    >
      {date}{expiryDate ? ` - ${expiryDate}` : ""}
    </div>
  );
}

interface CertificationItemProps {
  certification: Certification;
}

/**
 * Individual certification card component
 */
function CertificationItem({ certification }: CertificationItemProps) {
  const { name, issuer, date, expiryDate } = certification;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-x-2 text-base">
          <h3
            className="font-semibold leading-none"
            id={`certification-${name.toLowerCase().replace(/\s+/g, "-")}`}
          >
            {name}
          </h3>
          <CertificationPeriod date={date} expiryDate={expiryDate} />
        </div>
      </CardHeader>
      <CardContent
        className="mt-2 text-foreground/80 print:text-[12px]"
        aria-labelledby={`certification-${name
          .toLowerCase()
          .replace(/\s+/g, "-")}`}
      >
        {issuer}
      </CardContent>
    </Card>
  );
}

interface CertificationsListProps {
  certifications: readonly Certification[];
}

/**
 * Main certifications section component
 * Renders a list of certifications
 */
export function Certifications({ certifications }: CertificationsListProps) {
  if (!certifications.length) {
    return null;
  }

  return (
    <Section>
      <h2 className="text-xl font-bold" id="certifications-section">
        Certifications
      </h2>
      <div
        className="space-y-4"
        role="feed"
        aria-labelledby="certifications-section"
      >
        {certifications.map((item) => (
          <article key={item.name}>
            <CertificationItem certification={item} />
          </article>
        ))}
      </div>
    </Section>
  );
}
