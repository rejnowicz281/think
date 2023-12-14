import Link from "next/link";

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";

export const metadata = {
    metadataBase: new URL(defaultUrl),
    title: "Think",
    description: "Big Think Is Here",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <div>
                    <Link href="/entries">Go to Entries</Link>
                </div>
                <div>
                    <Link href="/timeline">Go to Timeline</Link>
                </div>
                {children}
            </body>
        </html>
    );
}
