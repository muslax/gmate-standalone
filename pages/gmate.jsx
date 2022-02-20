import fetchJson from "lib/fetchJson";
import { useRouter } from "next/router";
import Layout from "components/Layout";
import useUser from "lib/useUser";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "lib/session";

export default function Gmate({ user }) {
  const { mutateUser } = useUser({
    redirectTo: '/login',
  })
  const router = useRouter()
  
  return (
    <Layout>
      <h1>GMATE Page</h1>
      
      <p>
        <a
          href="/api/logout"
          onClick={async (e) => {
            e.preventDefault()
            mutateUser(
              await fetchJson('/api/logout', { method: 'POST' }),
              false
            )
            router.push('/login')
          }}
        >
          Logout
        </a>
      </p>
      
      <pre>
        {JSON.stringify(user, null, 2)}
      </pre>
    </Layout>
  )
}

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
}) {
  const user = req.session.user;

  if (user === undefined) {
    res.setHeader("location", "/login");
    res.statusCode = 302;
    res.end();
    return {
      props: {
        user: { isLoggedIn: false, login: "", avatarUrl: "" },
      },
    };
  }

  return {
    props: { user: req.session.user },
  };
},
sessionOptions);