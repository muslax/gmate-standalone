import fetchJson, { FetchError } from "lib/fetchJson";
import useUser from "lib/useUser";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import LoginForm from "./LoginForm";
import Register from "./Register";

export default function Welcome() {
  const { user, mutateUser } = useUser()
  const router = useRouter()
  
  const [errorMsg, setErrorMsg] = useState('')
  const [active, setActive] = useState('login')
  
  const btn = 'border-b-4 border-white  hover:border-sky-200 pb-1'
  const btnActive = 'border-b-4 border-sky-400  hover:border-sky-400 pb-1'
  
  return (
    <div className="py-6">
      {user?.isLoggedIn && (
        <div>
          <button
          className="rounded-sm border border-sky-300 text-xl px-6 text-sky-500 py-2"
          onClick={async function mulai(event) {
            try {
              mutateUser(
                await fetchJson('api/new-test', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ user_id: user._id }),
                })
              )
              router.push('/gmate')
            } catch (error) {
              
            }
          }}
          >MULAI</button>
          <br/>
          <br/>
          <Link href="/gmate">
            <a>Gmate</a>
          </Link>
          <pre className="text-xs">{JSON.stringify(user, null, 2)}</pre>
        </div>
      )}
      {(!user || !user.isLoggedIn) && (
        <div className="rounded border border-gray-300 max-w-sm mx-auto p-5">
          <div className="flex space-x-3 mb-6">
            <button className={active == 'login' ? btnActive : btn}
              onClick={e => setActive('login')}
            >Login</button>
            <button className={active != 'login' ? btnActive : btn}
              onClick={e => setActive('register')}
            >Register</button>
          </div>
          
          {active == 'login' && (
            <LoginForm 
              errorMessage={errorMsg}
              onSubmit={async function handleSubmit(event) {
                event.preventDefault()

                const body = {
                  username: event.currentTarget.username.value,
                }

                try {
                  mutateUser(
                    await fetchJson('/api/login', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(body),
                    })
                  )
                } catch (error) {
                  if (error instanceof FetchError) {
                    setErrorMsg(error.data.message)
                    console.log("ERR", error.data.message);
                    
                  } else {
                    console.error('An unexpected error happened:', error)
                  }
                }
              }}
            />
          )}
          
          {active != 'login' && (
            <Register 
              errorMessage={errorMsg}
              onSubmit={async function handleRegister(event) {
                event.preventDefault()
                const body = {
                  fullname: event.currentTarget.fullname.value,
                  username: event.currentTarget.username.value,
                  password: event.currentTarget.password.value,
                }
                
                try {
                  mutateUser(
                    await fetchJson('/api/register', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(body),
                    })
                  )
                } catch (error) {
                  if (error instanceof FetchError) {
                    setErrorMsg(error.data.message)
                    console.log("ERR", error.data.message);
                    
                  } else {
                    console.error('An unexpected error happened:', error)
                  }
                }
              }}
            />
          )}
        </div>
      )}
    </div>
  )
}