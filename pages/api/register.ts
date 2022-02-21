import { withIronSessionApiRoute } from "iron-session/next";
import connect from "lib/database";
import { sessionOptions } from "lib/session";
import { createPasswordHash } from "lib/utils";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "./user";
// import bcrypt from "bcryptjs";

export default withIronSessionApiRoute(register, sessionOptions)

async function register(req: NextApiRequest, res: NextApiResponse) {
  const { username, fullname, password } = await req.body
  console.log(fullname, username, password);
  
  
  try {
    const { db } = await connect()
    const hash = createPasswordHash(password)
    
    const created = await db.collection('users').insertOne({
      fullname: fullname,
      username: username,
      isAdmin: false,
      hash: hash,
    })
    // console.log('created', created);
    
    if (created.acknowledged === true) {
      const user = {
        isLoggedIn: true, 
        username: username,
        fullname: fullname,
        isAdmin: false,
        // avatarUrl: 'https://avatars.githubusercontent.com/u/117561?v=4'
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