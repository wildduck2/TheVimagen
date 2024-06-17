import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Preview,
    Section,
    Text,
} from "@react-email/components";
import * as React from "react";
import ReactDOMServer from "react-dom/server";

export type EmailProps = { subject?: string }
export type Component = KoalaWelcomeEmailProps

export const renderEmail = (Component: React.FC<Component>, props: Component) => {
    return ReactDOMServer.renderToStaticMarkup(<Component {...props} />);
};

export interface KoalaWelcomeEmailProps {
    userFirstname?: string;
    paragraphText?: string
    code?: string
    type?: 'welcome' | 'comfirmEmail'
}


export const KoalaWelcomeEmail: React.FC<KoalaWelcomeEmailProps> = ({
    userFirstname,
    paragraphText,
    code,
    type
}) => (
    <Html>
        <Head />
        <Preview>
            The sales intelligence platform that helps you uncover qualified leads.
        </Preview>
        <Body style={main}>
            <Container style={container}>
                <Img
                    src={'https://zpgqhogoevbgpxustvmo.supabase.co/storage/v1/object/public/produc_imgs/emailLodgo.png'}
                    width="170"
                    height="50"
                    alt="Koala"
                    style={{ objectFit: "cover", ...logo }}
                />

                {
                    type === 'welcome' && (<>
                        <Text style={paragraph}>Hi {userFirstname},</Text>
                        <Text style={paragraph}>
                            {paragraphText}
                        </Text>
                        <Section style={btnContainer}>
                            <Button style={button} href="http://localhost:3000/dashboard/">
                                Get started
                            </Button>
                        </Section>
                    </>
                    )
                }

                {
                    type === 'comfirmEmail' && (<>
                        <Section style={btnContainer}>
                            <Heading style={h1}>Verify your email address</Heading>
                            <Text style={paragraph}>
                                Thanks for starting the new TheVimagen account creation process. We
                                want to make sure it's really you. Please enter the following
                                verification code when prompted. If you don&apos;t want to
                                create an account, you can ignore this message.
                            </Text>
                            <Section style={{ placeContent: "center", ...verificationSection }}>
                                <Text style={verifyText}>Verification code</Text>

                                <Text style={codeText}>{code}</Text>
                                <Text style={validityText}>
                                    (This code is valid for 10 minutes)
                                </Text>
                            </Section>
                        </Section>
                        <Hr />
                    </>
                    )
                }


                <Text style={paragraph}>
                    Best,
                    <br />
                    The TheVimagen team
                </Text>
                <Hr style={hr} />
                <Text style={footer}>
                    470 Noor Ave STE B #1148, South San Francisco, CA 94080
                </Text>
            </Container>
        </Body>
    </Html>
);


export default KoalaWelcomeEmail;

const h1 = {
    color: "#333",
    fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "15px",
};

const main = {
    backgroundColor: "#ffffff",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const verificationSection = {
    alignItems: "center",
    justifyContent: "center",
};


const text = {
    color: "#333",
    fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: "14px",
    margin: "24px 0",
};

const verifyText = {
    ...text,
    margin: 0,
    fontWeight: "bold",
    textAlign: "center" as const,
};

const validityText = {
    ...text,
    margin: "0px",
    textAlign: "center" as const,
};

const codeText = {
    ...text,
    fontWeight: "bold",
    fontSize: "36px",
    margin: "10px 0",
    textAlign: "center" as const,
};
const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
};

const logo = {
    margin: "0 auto",
};

const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
};

const btnContainer = {
    textAlign: "center" as const,
};

const button = {
    backgroundColor: "#09090b",
    borderRadius: "3px",
    color: "#fafafa",
    fontSize: "16px",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    padding: "12px",
};

const hr = {
    borderColor: "#cccccc",
    margin: "20px 0",
};

const footer = {
    color: "#8898aa",
    fontSize: "12px",
};
