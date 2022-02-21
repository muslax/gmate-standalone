import { FormEvent } from "react";

export default function Register({
  errorMessage,
  onSubmit,
}: {
  errorMessage: string
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
}) {
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="" className="flex flex-col mb-3">
        <span className="text-gray-600">Fullname</span>
        <input type="text" name="fullname" autoFocus required 
        className="rounded border-gray-300 focus:border-sky-300 focus:ring focus:ring-offset-0 focus:ring-sky-50 my-1"
        />
      </label>
      
      <label htmlFor="" className="flex flex-col mb-3">
        <span className="text-gray-600">Username</span>
        <input type="text" name="username" required 
        className="rounded border-gray-300 focus:border-sky-300 focus:ring focus:ring-offset-0 focus:ring-sky-50 my-1"
        />
      </label>
      
      <label htmlFor="" className="flex flex-col mb-5">
        <span className="text-gray-600">Password</span>
        <input type="password" name="password" required 
        className="rounded border-gray-300 focus:border-sky-300 focus:ring focus:ring-offset-0 focus:ring-sky-50 my-1"
        />
      </label>
      
      <button type="submit"
      className="w-full rounded border border-gray-300 py-2"
      >Login</button>
      
      {errorMessage && (
        <p className="text-red-500 mt-4">{errorMessage}</p>
      )}
    </form>
  )
}