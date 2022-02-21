import fetchJson from "lib/fetchJson";
import useUser from "lib/useUser";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
  const { user, mutateUser } = useUser()
  const router = useRouter()
  
  return (
    <div className="border-t border-b border-sky-200 py-2 -mx-5 px-5">
      {user?.isLoggedIn === false && (
        <div className="text-center">🤖</div>
      )}
      {user?.isLoggedIn === true && (
        <div className="flex items-center">
          <p className="flex flex-grow text-sky-500 font-bold">{user.fullname}</p>
          {router.asPath == '/' && (
            <a
              href="/api/logout"
              className="text-red-500"
              onClick={async (e) => {
                e.preventDefault()
                mutateUser(
                  await fetchJson('/api/logout', { method: 'POST' }),
                  false
                )
                router.push('/')
              }}
            >
              Logout
            </a>
          )}
          
          {router.asPath == '/gmate' && (
            <Link href="/"><a className="text-sky-500">Home</a></Link>
          )}
          
        </div>
      )}
    </div>
  )
}