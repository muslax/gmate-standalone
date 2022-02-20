// import { Octokit } from "octokit";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
// const octokit = new Octokit();

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
    
    if (username == 'muslax') {
      const user = {
        isLoggedIn: true,
        username
      };
      
      req.session.user = user;
      await req.session.save();
      res.json(user);
    } else {
      console.log('Error')
      res.status(404).json({ message: 'Login error' });
    }
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message });
  }
}, sessionOptions);
