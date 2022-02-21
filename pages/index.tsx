import Form from 'components/Welcome'
import Header from 'components/Header'
import LoginForm from 'components/LoginForm'
import Register from 'components/Register'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Layout from 'components/Layout'
import Welcome from 'components/Welcome'

const Home: NextPage = () => {
  return (
    <Layout title="Holabasa">
      <h1 className="text-4xl text-center text-sky-600 font-bold py-5">
        Gmate<span className="text-gray-400">Standalone</span>
      </h1>
      <Header />
      <Welcome />
    </Layout>
  )
}

export default Home
