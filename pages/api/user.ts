import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from 'lib/session'
import { NextApiRequest, NextApiResponse } from 'next'

// export type User = {
export interface User {
  isLoggedIn: boolean
  username: string
  fullname: string
  _id: string
  isAdmin?: boolean
  test_id?: string
  sequence?: string
}

export default withIronSessionApiRoute(userRoute, sessionOptions)

async function userRoute(req: NextApiRequest, res: NextApiResponse<User>) {
  if (req.session.user) {
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    res.json({
      ...req.session.user,
      isLoggedIn: true,
    })
  } else {
    res.json({
      isLoggedIn: false,
      username: '',
      fullname: '',
      isAdmin: false,
      _id: '',
    })
  }
}
