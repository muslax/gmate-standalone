import Layout from 'components/Layout'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <Layout>
      <div className='text-center'>
        <h1 className='text-6xl text-center text-sky-700 font-bold my-16'>
          Gmate<span className='text-gray-400'>Standalone</span>
        </h1>

        <p className='text-xl mb-10'>
          <Link href="/login">
          <a className="rounded-lg border-2 border-sky-600 hover:bg-sky-600 text-sky-500 hover:text-white font-semibold px-6 py-2">
            Login
          </a>
          </Link>
        </p>
      </div>
    </Layout>
  )
}