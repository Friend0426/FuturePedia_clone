import { Head, Html, Main, NextScript } from 'next/document';

function MyDocument() {
  return (
    <Html>
      <Head />
      <body className="overflow-x-hidden bg-white text-black antialiased transition-colors dark:bg-[#314151] dark:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default MyDocument;
