import Head from 'next/head'
// import Header from 'components/Header'

// export default function Layout({ children }: { children: React.ReactNode }) {
export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>With Iron Session</title>
      </Head>
      <main className='antialiased max-w-5xl mx-auto px-5'>
        <div className="">{children}</div>
      </main>
    </>
  )
}