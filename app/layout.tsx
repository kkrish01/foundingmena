import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Founding MENA",
  description: "The paper of record for the people building the new Middle East.",
  icons: {
    icon: "https://qcmmrdyvzrooardtmwmx.supabase.co/storage/v1/object/public/media/brand/logos/logo_row.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
        style={{
          // @ts-ignore
          "--chintex": "url(https://qcmmrdyvzrooardtmwmx.supabase.co/storage/v1/object/public/media/brand/grounds/grey.jpg)",
          backgroundColor: "#100c08",
          color: "#f8f0e4",
          margin: 0,
          padding: 0
        }}
      >
        {children}
      </body>
    </html>
  );
}
