import Header from "components/Header";
import Layout from "components/Layout";
import useUser from "lib/useUser";
import { getCondition, getItem } from "gmate-flat-module"
import { useEffect, useState } from "react";
import { Soal } from "lib/types";

function Pertanyaan({ soal }: { soal: Soal}) {
  const text = soal.soal
  return (
    <div className="soal" dangerouslySetInnerHTML={{ __html: soal.soal }} />
  )
}

function Kondisi({ kondisi }: { kondisi: string }) {
  return (
    <div className="mb-12 text-sm text-sky-500">
      <div className="kondisi" dangerouslySetInnerHTML={{ __html: kondisi }} />
    </div>
  )
}

export default function Gmate() {
  const { user } = useUser({ redirectTo: '/' })
  const itemsKeys = user?.sequence?.split(' ') || ['']

  const [seq, setSeq] = useState(0)
  const [soal, setSoal] = useState(getItem(itemsKeys[0]))
  const [kondisi, setKondisi] = useState(getCondition(getItem(itemsKeys[0]).kondisi))

  useEffect(() => {
    setSoal(getItem(itemsKeys[seq]))
    setKondisi(getCondition(getItem(itemsKeys[seq]).kondisi))
  }, [seq, setSoal, setKondisi])

  return (
    <Layout title="GMatic">
      <h1 className="text-4xl text-center text-sky-600 font-bold py-5">
        Gmate<span className="text-gray-400">Standalone</span>
      </h1>

      <Header />

      <div className="my-6">
        <Kondisi kondisi={kondisi} />
        {seq + 1} - {itemsKeys[seq]}
        <Pertanyaan soal={soal} />
      </div>

      <div className="mb-8">
        <button
          className="text-xl border border-gray-400 active:bg-gray-600 active:border-gray-600 active:text-white h-10 px-6"
          onClick={e => setSeq(seq + 1)}
        >Next</button>
      </div>


      <pre className="text-xs overflow-x-auto">{JSON.stringify(user, null, 2)}</pre>
    </Layout>
  )
}