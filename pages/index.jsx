import ForHome from 'components/Home'
import Layout from 'components/Layout'

export default function Home() {
  return (
    <Layout>
      <h1 className='text-5xl text-center text-sky-700 tracking-tight font-bold my-12'>
        Gmate<span className='text-gray-400'>Standalone</span>
      </h1>
      
      <ForHome />
      
    </Layout>
  )
}

/*
export default function Home() {
  const { user, mutateUser } = useUser({ redirectTo: '/', redirectIfFound: false })
  const btnActive = 'block border-b-4 border-sky-500 pb-1'
  const btn = 'block border-b-4 border-white hover:border-gray-300 pb-1'
  
  const [active, setActive] = useState('login')
  const [errorMsg, setErrorMsg] = useState("");
  
  return (
    <Layout>
      <h1 className='text-5xl text-center text-sky-700 tracking-tight font-bold my-12'>
        Gmate<span className='text-gray-400'>Standalone</span>
      </h1>
      
      <pre>USER {JSON.stringify(user)}</pre>
      
      {user && user.isLoggedIn && (
        <div className='flex space-x-4 text-lg'>
          <div className='flex-grow text-xl font-bold'>{user.fullname}</div>
          <div className='flex space-x-4'>
            <p className=''>
              <Link href="/gmate">
                <a className="rounded-lg border-2 border-sky-600 hover:bg-sky-600 text-sky-500 hover:text-white font-semibold px-6 py-2">
                  GMATE
                </a>
              </Link>
            </p>
            <p>
              <a
                className="rounded-lg border-2 border-sky-600 hover:bg-sky-600 text-sky-500 hover:text-white font-semibold px-6 py-2"
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
          </div>
        </div>
      )}
      
      {(!user || !user.isLoggedIn) && (
        <div className="rounded border border-gray-300 max-w-sm mx-auto p-4">
          <div className="flex space-x-5 mb-6">
            <button 
              className={active == 'login' ? btnActive : btn}
              onClick={e => setActive('login')}
            >Login</button>
            <button 
              className={active == 'register' ? btnActive : btn}
              onClick={e => setActive('register')}
            >Register</button>
          </div>
          
          {active == 'register' && <Register />}
          
          {active == 'login' && <LoginForm 
            errorMessage={errorMsg}
            onSubmit={async function handleSubmit(event) {
              event.preventDefault();
  
              const body = {
                username: event.currentTarget.username.value,
                password: event.currentTarget.password.value,
              };
  
              try {
                mutateUser(
                  await fetchJson("/api/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                  }),
                );
              } catch (error) {
                if (error instanceof FetchError) {
                  setErrorMsg(error.data.message);
                } else {
                  console.error("An unexpected error happened:", error);
                }
              }
            }}
          />}
        </div>
      )}
      
        
      
      
    </Layout>
  )
} */