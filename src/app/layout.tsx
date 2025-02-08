import localFont from "next/font/local";
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
    themeColor: "#15593A",
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
};
export const metadata: Metadata = {
    title: "Adgilioni",
    description: "Parking app for Tbilisians to find parking spots of their car's dream",
    manifest: "/manifest.json",
};

const firagoFont = localFont({
    src: "../fonts/FiraGO-Book.otf",
    variable: "--font-firago",
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${firagoFont.variable} font-firago`}>
            <head>
                <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                <link rel="shortcut icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <meta name="apple-mobile-web-app-title" content="Parkme" />
                <link rel="manifest" href="/manifest.json" />
            </head>
            <body className="antialiased scroll-hidden">{children}</body>
        </html>
    );
}
