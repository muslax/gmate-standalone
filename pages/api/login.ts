import { withIronSessionApiRoute } from "iron-session/next";
import connect from "lib/database";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "./user";

export default withIronSessionApiRoute(loginRoute, sessionOptions)

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { username } = await req.body
  console.log(username);
  
  
  try {
    const { db } = await connect()
    const found = await db.collection('users').findOne({ username: username })
    console.log('found', found);
    
    if (!found) return res.status(404).json({ message: 'Not found' })
    
    const user = {
      isLoggedIn: true, 
      username: found?.username,
      fullname: found?.fullname,
      isAdmin: found?.isAdmin || false,
      _id: found?._id.toString(),
      // avatarUrl: 'https://avatars.githubusercontent.com/u/117561?v=4'
    } as User
    
    req.session.user = user
    await req.session.save()
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
}