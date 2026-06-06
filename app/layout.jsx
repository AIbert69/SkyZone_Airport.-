import "./globals.css";

export const metadata = {
  title: "SKZOO Airport Pop-Up Store",
  description: "Retail Activation Concept Presentation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
