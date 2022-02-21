import { withIronSessionApiRoute } from "iron-session/next";
import connect from "lib/database";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { createSequence } from "gmate-flat-module"
import { ObjectId } from "mongodb";
import { User } from "./user";

export default withIronSessionApiRoute(testRoute, sessionOptions)

async function testRoute(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { db } = await connect()
    const { user_id } = await req.body
    const seq = createSequence() //.join(' ')
    console.log(seq);


    const doc = {
      _id: new ObjectId(),
      user_id,
      created: new Date().toISOString(),
      length: seq.length,
      done: 0,
      sequence: seq.join(' '),
      items: []
    }

    // TRICK: INSERT AND RETURN DOCUMENT
    // https://stackoverflow.com/questions/40766654/node-js-mongodb-insert-one-and-return-the-newly-inserted-document

    // const rs = await db.collection('gmate').insertOne(doc, )
    const rs = await db.collection('gmate').findOneAndUpdate(
      doc,
      {$set: {}},
      { upsert: true, returnDocument: 'after' }
    )

    if (rs.ok) {
      const id = rs.value?._id.toString()
      const user = {
        ...req.session.user,
        test_id: id,
        sequence: rs.value?.sequence,
      } as User

      req.session.user = user
      await req.session.save()
      res.json(user)
    } else {
      throw new Error('Gagal...')
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
}