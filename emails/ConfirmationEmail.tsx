import { Body, Container, Head, Hr, Html, Link, Preview, Text } from "@react-email/components";
import { CONFIRMATION_EMAIL } from "@/lib/content";
import { CONTACT_EMAIL, SITE_URL } from "@/lib/config";

export function ConfirmationEmail() {
  return (
    <Html lang="en">
      <Head />
      <Preview>{CONFIRMATION_EMAIL.subject}</Preview>
      <Body style={{ backgroundColor: "#f7f1e5", fontFamily: "Georgia, 'Times New Roman', serif", color: "#1e1a1d", margin: 0 }}>
        <Container style={{ maxWidth: 560, margin: "0 auto", padding: "40px 24px" }}>
          <Text style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#7d5f10", margin: 0 }}>
            Kigali International Fashion Festival
          </Text>
          <Hr style={{ borderColor: "#c9a227", margin: "12px 0 24px" }} />
          <Text style={{ fontSize: 17, lineHeight: "1.6", margin: 0 }}>
            Thank you for applying to the Kigali International Fashion Festival, March 8-14, 2027. Our team will review
            your application and follow up. Questions? Contact{" "}
            <Link href={`mailto:${CONTACT_EMAIL}`} style={{ color: "#5a1e72" }}>
              {CONTACT_EMAIL}
            </Link>
            .
          </Text>
          <Hr style={{ borderColor: "#e6dcc6", margin: "32px 0 16px" }} />
          <Text style={{ fontSize: 13, color: "#5d5358", margin: 0 }}>
            <Link href={SITE_URL} style={{ color: "#5d5358" }}>
              kigalifashionfestival.com
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
