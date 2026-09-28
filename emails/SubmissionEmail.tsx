import { Body, Container, Head, Heading, Hr, Html, Link, Preview, Section, Text } from "@react-email/components";
import type { Section as AppSection } from "@/lib/format";

const gold = "#7d5f10";
const ink = "#1e1a1d";

export function SubmissionEmail({
  heading,
  sections,
  submittedAt,
}: {
  heading: string;
  sections: AppSection[];
  submittedAt: string;
}) {
  return (
    <Html lang="en">
      <Head />
      <Preview>{heading}</Preview>
      <Body style={{ backgroundColor: "#f7f1e5", fontFamily: "Georgia, 'Times New Roman', serif", color: ink, margin: 0 }}>
        <Container style={{ maxWidth: 640, margin: "0 auto", padding: "32px 24px" }}>
          <Text style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: gold, margin: 0 }}>
            KIFF 2027 application
          </Text>
          <Heading as="h1" style={{ fontSize: 26, fontWeight: 400, margin: "8px 0 4px" }}>
            {heading}
          </Heading>
          <Text style={{ fontSize: 14, color: "#5d5358", margin: 0 }}>Submitted {submittedAt} (Kigali time). Reply to this email to reach the applicant.</Text>

          {sections.map((section) => (
            <Section key={section.title} style={{ marginTop: 28 }}>
              <Text style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: gold, margin: "0 0 8px" }}>
                {section.title}
              </Text>
              <Hr style={{ borderColor: "#c9a227", margin: "0 0 4px" }} />
              {section.rows.map((row) => (
                <Section key={row.question} style={{ padding: "10px 0", borderBottom: "1px solid #e6dcc6" }}>
                  <Text style={{ fontSize: 13, color: "#5d5358", margin: "0 0 2px" }}>{row.question}</Text>
                  {typeof row.answer === "string" ? (
                    <Text style={{ fontSize: 16, margin: 0, whiteSpace: "pre-wrap" }}>{row.answer || "—"}</Text>
                  ) : (
                    row.answer.map((file) => (
                      <Text key={file.url} style={{ fontSize: 16, margin: 0 }}>
                        <Link href={file.url} style={{ color: "#5a1e72" }}>
                          {file.name}
                        </Link>
                      </Text>
                    ))
                  )}
                </Section>
              ))}
            </Section>
          ))}
        </Container>
      </Body>
    </Html>
  );
}
