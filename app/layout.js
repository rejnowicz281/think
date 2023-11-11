export const metadata = {
    title: "Think",
    description: "Big Think Is Here",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
