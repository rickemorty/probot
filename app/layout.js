import Head from "next/head"
import Script from "next/script"
export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <Head>
        <Script src="probot.js" type="text/javascript"></Script>
        <script>probot("655f5b7224009e22a413bbfa-8d5b3e8e6f88eb985134867f7325e1f573f696b4")</script>
      </Head>
      <body>{children}</body>
    </html>
  )
}
