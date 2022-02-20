// import { Octokit } from "octokit";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { connect } from "lib/database";
import bcrypt from "bcryptjs";

export default withIronSessionApiRoute(async (req, res) => {
  const { username, password } = await req.body;
  console.log(username, password);

  try {
    // const {
    //   data: { login, avatar_url },
    // } = await octokit.rest.users.getByUsername({ username });

    // const user = { isLoggedIn: true, login, avatarUrl: avatar_url };
    // const user = {
    //   isLoggedIn: true,
    //   username
    // };
    
    // req.session.user = user;
    // await req.session.save();
    // res.json(user);
    
    const { db } = await connect()
    const found = await db.collection('users').findOne({ username: username})
    
    if (!found) {
      return res.status(404).json({ message: "[NOTFOUND] Username/password salah." });
    }
    
    const verified = bcrypt.compareSync(password, found.hash)
    if (!verified) {
      return res.status(404).json({ message: "[NOTMATCH] Username/password salah." });
    }
    
    const user = {
      isLoggedIn: true,
      ...found
    }
    
    req.session.user = user;
    await req.session.save();
    res.json(user);
    
    // if (username == 'muslax') {
    //   const user = {
    //     isLoggedIn: true,
    //     username
    //   };
      
    //   req.session.user = user;
    //   await req.session.save();
    //   res.json(user);
    // } else {
    //   console.log('Error')
    //   res.status(404).json({ message: 'Login error' });
    // }
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message });
  }
}, sessionOptions);
