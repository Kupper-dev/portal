import { cookies } from 'next/headers';
import { verifyToken } from "@/lib/auth-edge";
import styles from "./page.module.css";
import { linkUserIdentity } from "@/lib/identity-linker";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get('app_session')?.value;
  let user = null;

  if (token) {
    user = await verifyToken(token);
  }

  const session = user ? { user } : null;

  if (session) {
    try {
      // Identity linking expects a session object
      await linkUserIdentity(session);
    } catch (error) {
      console.error("Failed to link identity:", error);
    }
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Kupper Portal</h1>
        <p>Base Path: /app</p>
        <div className={styles.ctas}>
          {session ? (
            <div>
              <p>Welcome, <strong>{session.user.name as string}</strong> ({session.user.email as string})</p>
              <br />
              <a className={styles.primary} href="/app/auth/logout">
                Logout
              </a>
              <pre style={{ textAlign: 'left', marginTop: '20px', background: '#f0f0f0', padding: '10px', borderRadius: '5px' }}>
                {JSON.stringify(session.user, null, 2)}
              </pre>
            </div>
          ) : (
            <a className={styles.primary} href="/app/auth/login">
              Login with Auth0
            </a>
          )}
        </div>
      </main>
    </div>
  );
}
