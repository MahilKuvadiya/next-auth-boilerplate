"use client"; // Indicates that this module is client-side code.

import { signIn } from "next-auth/react"; // Import the signIn function from NextAuth for authentication.
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation"; // Import Next.js navigation utilities.
import { ChangeEvent, useState } from "react"; // Import React hooks for managing component state.

const LoginForm = () => {
  const router = useRouter(); // Initialize the Next.js router.
  const [loading, setLoading] = useState(false); // State for managing loading state.
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  }); // State for form input values.
  const [error, setError] = useState(""); // State for handling errors during authentication.

  const searchParams = useSearchParams(); // Get query parameters from the URL.
  const callbackUrl = searchParams.get("callbackUrl") || "/profile"; // Define a callback URL or use a default one.

  // Handle form submission
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior.
    try {
      setLoading(true); // Set loading state to true.
      setFormValues({ email: "", password: "" }); // Clear form input values.

      // Attempt to sign in using the credentials (email and password).
      const res = await signIn("credentials", {
        redirect: false,
        email: formValues.email,
        password: formValues.password,
        callbackUrl,
      });

      setLoading(false); // Set loading state back to false.

      if (!res?.error) {
        router.push(callbackUrl); // Redirect to the callback URL on successful authentication.
      } else {
        setError("Invalid email or password"); // Set an error message for invalid credentials.
      }
    } catch (error: any) {
      setLoading(false); // Set loading state back to false on error.
      setError("An unexpected error occurred. Please try again."); // Set the error message for any other errors.
    }
  };

  // Handle input field changes
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value }); // Update the form input values.
  };

  // Define a CSS class for form inputs.
  const inputStyle =
    "form-control block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800">Sign In</h1>
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          {error && (
            <p className="text-center text-red-600 py-2 mb-4">{error}</p>
          )}

          {/* Email input field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              required
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              placeholder="Email address"
              className={inputStyle}
            />
          </div>

          {/* Password input field */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              required
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              placeholder="Password"
              className={inputStyle}
            />
          </div>

          {/* Sign In button */}
          <button
            type="submit"
            className={`w-full py-2 text-white font-medium text-sm leading-snug uppercase rounded shadow-md transition duration-150 ease-in-out ${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
           <Link href="/signup" className="flex items-center justify-center">
            <div className="text-black font-semibold text-sm">
            sign-up
            </div>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
