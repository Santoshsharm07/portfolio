import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* SEO Meta Tags */}
        <meta name="description" content="YOUR_NAME - Software Engineer specializing in modern web development, React, Next.js, and cloud technologies." />
        <meta name="keywords" content="software engineer, web developer, React, Next.js, TypeScript, Node.js, portfolio" />
        <meta name="author" content="YOUR_NAME" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="YOUR_NAME - Software Engineer" />
        <meta property="og:description" content="Building modern, scalable web applications with clean code and exceptional user experiences." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://your-portfolio-url.com" />
        <meta property="og:image" content="https://your-portfolio-url.com/og-image.jpg" />
        <meta property="og:site_name" content="YOUR_NAME Portfolio" />
        
        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="YOUR_NAME - Software Engineer" />
        <meta name="twitter:description" content="Building modern, scalable web applications with clean code and exceptional user experiences." />
        <meta name="twitter:image" content="https://your-portfolio-url.com/og-image.jpg" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
