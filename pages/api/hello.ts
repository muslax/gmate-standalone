// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import connect from 'lib/database'


// type Data = {
//   name: string
// }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// )
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { db } = await connect()
    const rs = await db.collection('users').find({}).toArray()
    return res.json(rs)
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
  // res.status(200).json({ name: 'John Doe' })
}
