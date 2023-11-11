import { githubSignIn, signIn, signUp } from "@/actions/auth";

export default async function Login({ searchParams }) {
    return (
        <>
            <form action={signIn}>
                <label htmlFor="email">Email</label>
                <input name="email" placeholder="you@example.com" required />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" placeholder="••••••••" required />
                <button>Sign In</button>
                <button formAction={signUp}>Sign Up</button>
                {searchParams?.message && <p>{searchParams.message}</p>}
            </form>
            <form action={githubSignIn}>
                <button>Sign In With Github</button>
            </form>
        </>
    );
}
