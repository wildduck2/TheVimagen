import React from 'react';
import { Html, Button } from "@react-email/components";
import ReactDOMServer from 'react-dom/server';
import { KoalaWelcomeEmailProps } from './WelcomeEmail';

export const Email = (props: { subject: string }) => {
    const { subject } = props;

    return (
        <Html lang="en">
            <Button href={subject}>{subject}Click me</Button>
        </Html>
    );
}

export type EmailProps = { subject?: string }
export type Component = KoalaWelcomeEmailProps

export const renderEmail = (Component: React.FC<Component>, props: Component) => {
    return ReactDOMServer.renderToStaticMarkup(<Component {...props} />);
};


