import { auth0 } from "@/lib/auth0";
import styles from "./page.module.css";

import { linkUserIdentity } from "@/lib/identity-linker";

export default async function Home() {
  const session = await auth0.getSession();

  if (session) {
    try {
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
              <p>Welcome, <strong>{session.user.name}</strong> ({session.user.email})</p>
              <br />
              <a className={styles.primary} href="/app/api/auth/logout">
                Logout
              </a>
              <pre style={{ textAlign: 'left', marginTop: '20px', background: '#f0f0f0', padding: '10px', borderRadius: '5px' }}>
                {JSON.stringify(session.user, null, 2)}
              </pre>
            </div>
          ) : (
            <a className={styles.primary} href="/app/api/auth/login">
              Login with Auth0
            </a>
          )}
        </div>
      </main>
    </div>
  );
}
