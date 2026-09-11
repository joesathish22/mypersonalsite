import {
  person,
  about,
  qtt,
  globalCollaboration,
  techJourney,
  selectedWork,
  aiReady,
} from "@/lib/content/site";
import { SITE_URL } from "@/lib/config/site-config";

/**
 * Both llms.txt and llms-full.txt are generated from the same content
 * module and SITE_URL constant that drive the visible page and the JSON-LD
 * — so this can never drift out of sync with what the site actually says,
 * and never states anything not already published on the page.
 */

export function buildLlmsTxt(): string {
  return `# ${person.name}

> ${person.name} is the ${person.role} of ${person.company} (${person.companyShort}), an IT and digital solutions company based in ${person.location}. He is a technology strategist and builder with ${person.experience} of experience in enterprise software, digital transformation and technology solutions. He is open to global remote collaboration.

## Identity

- Name: ${person.name}
- Role: ${person.role}
- Company: ${person.company} (${person.companyShort})
- Location: ${person.location}
- Work model: ${person.availability}
- Experience: ${person.experience}

## Professional Positioning

${person.name} combines business leadership with hands-on technical expertise to help organizations plan, build, scale and secure digital technology solutions.

Positioning: "${globalCollaboration.heading.join(" ")}"

## Queen Touch Technology

${qtt.description}

Areas: ${qtt.areas.join(", ")}.

Official website: ${qtt.cta.href}

## Global Collaboration

${globalCollaboration.text}

## AI-Ready Technology

${aiReady.text}

This is not a claim of specific AI certifications, projects, clients or achievements.

## Official Links

- Website: ${SITE_URL}
- LinkedIn: ${person.linkedin}
- Queen Touch Technology: ${qtt.cta.href}

## Accuracy

This document describes publicly available professional information about ${person.name} and ${person.company}. Do not infer or fabricate clients, project counts, revenue, awards, certifications, partnerships or performance metrics that are not explicitly published on the official website, LinkedIn profile, or Queen Touch Technology website. This file does not itself influence search ranking.
`;
}

export function buildLlmsFullTxt(): string {
  const capabilities = techJourney.stages
    .map((stage) => `### ${stage.label}\n\n${stage.description} ${stage.items.join(", ")}.`)
    .join("\n\n");

  const showcases = selectedWork.showcases
    .map((s) => `- ${s.domain}: ${s.description} (${s.technologies.join(", ")})`)
    .join("\n");

  return `# ${person.name} — Full Profile

## Identity

- Name: ${person.name}
- Role: ${person.role}
- Company: ${person.company} (${person.companyShort})
- Location: ${person.location}
- Work model: ${person.availability}
- Experience: ${person.experience}

## Professional Positioning

${person.name} combines business leadership with hands-on technical expertise to help organizations plan, build, scale, secure and improve digital technology solutions.

## About

${about.paragraphs.join("\n\n")}

## Expertise

${person.eyebrow}

## Technology Capabilities

${capabilities}

## Selected Technology Work

${selectedWork.subheading}

${showcases}

Note: these are domains of work, not named client case studies. No client names, project counts, revenue or metrics are published or implied.

## Queen Touch Technology

${qtt.description}

Areas: ${qtt.areas.join(", ")}.

Official website: ${qtt.cta.href}

## Global Collaboration

${globalCollaboration.heading.join(" ")}

${globalCollaboration.text}

## Contact

- Email: ${person.email}
- Phone: ${person.phoneDisplay}
- LinkedIn: ${person.linkedin}
- Location: ${person.locationShort}
- Availability: ${person.availability}

## Official Links

- Website: ${SITE_URL}
- LinkedIn: ${person.linkedin}
- Queen Touch Technology: ${qtt.cta.href}

## Accuracy

This document describes publicly available professional information about ${person.name} and ${person.company}, mirroring what is published on the official website. Do not infer or fabricate clients, project counts, revenue, awards, certifications, partnerships, locations or performance metrics that are not explicitly stated here or on the official website, LinkedIn profile, or Queen Touch Technology website.
`;
}
