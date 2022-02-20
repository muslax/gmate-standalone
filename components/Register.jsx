export default function Register({ errorMessage, onSubmit }) {
  return (
    <form 
      onSubmit={onSubmit} 
      className="font-medium"
    >
      <label className="flex flex-col">
        <span>Fullname</span>
        <input type="text" name="fullname" required />
      </label>
      
      <label className="flex flex-col">
        <span>Username</span>
        <input type="text" name="username" required />
      </label>
      
      <label className="flex flex-col">
        <span>Password</span>
        <input type="password" name="password" required />
      </label>

      <button type="submit"
        className="w-full rounded border border-gray-400 h-11"
      >
        Register
      </button>

      {errorMessage && <p className="text-red-600 mt-4">{errorMessage}</p>}

      <style jsx>{`
        input {
          padding: 8px;
          margin: 0.3rem 0 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
      `}</style>
    </form>
  );
}
