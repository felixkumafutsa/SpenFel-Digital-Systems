import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  AlertCircle,
  Briefcase,
  Check,
  ChevronDown,
  ClipboardList,
  LayoutDashboard,
  Loader2,
  LogOut,
  Mail,
  Menu,
  MessageSquare,
  Plus,
  RefreshCw,
  ShieldCheck,
  Trash2,
  Wrench,
  X,
} from 'lucide-react';
import { auth, db, firebaseConfigured } from '../firebase';
import { defaultProjects, defaultServices } from '../data/siteContent';
import './admin.css';

const navigation = [
  { id: 'overview', label: 'Overview', path: '/admin', icon: LayoutDashboard },
  { id: 'messages', label: 'Messages', path: '/admin/messages', icon: MessageSquare },
  { id: 'newsletter', label: 'Newsletter', path: '/admin/newsletter', icon: Mail },
  { id: 'projects', label: 'Projects', path: '/admin/projects', icon: Briefcase },
  { id: 'services', label: 'Services', path: '/admin/services', icon: Wrench },
];

const authErrorMessage = (error) => {
  if (error?.code === 'auth/invalid-credential' || error?.code === 'auth/wrong-password') {
    return 'The email or password is incorrect.';
  }
  if (error?.code === 'auth/too-many-requests') {
    return 'Too many attempts. Wait a little and try again.';
  }
  if (error?.code === 'auth/network-request-failed') {
    return 'Authentication could not reach Firebase. Check your connection.';
  }
  return 'Sign-in failed. Check your credentials and Firebase Authentication setup.';
};

const dataErrorMessage = (error, action = 'load this data') => {
  if (error?.code === 'permission-denied' || error?.code === 'firestore/permission-denied') {
    return `You do not have permission to ${action}. Verify that admins/${auth?.currentUser?.uid || 'your-uid'} has active: true and role: "admin", and that the deployed Firestore rules match the setup guide.`;
  }
  if (error?.code === 'unavailable' || error?.code === 'deadline-exceeded') {
    return `Firebase is currently unavailable. Check your connection and try to ${action} again.`;
  }
  return `Could not ${action}. Check the Firebase configuration, connection, and Firestore rules.`;
};

function SignIn({ status, user, onSignOut, onRetry, verificationMessage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    if (!auth) {
      setMessage('Firebase Authentication is not configured. Add the required VITE_FIREBASE_* settings and reload.');
      return;
    }

    setSubmitting(true);
    setMessage('');
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (error) {
      setMessage(authErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  const isPending = status === 'checking';
  const isDenied = status === 'denied';
  const isCheckError = status === 'error';

  return (
    <main className="admin-auth">
      <section className="admin-auth__panel" aria-labelledby="admin-signin-heading">
        <div className="admin-auth__brand"><span className="admin-brand__mark">S</span><span>SPENFEL <b>ADMIN</b></span></div>
        <div className="admin-auth__icon"><ShieldCheck size={24} aria-hidden="true" /></div>
        <p className="admin-kicker">PRIVATE WORKSPACE</p>
        <h1 id="admin-signin-heading">Sign in to your<br /><span>operations desk.</span></h1>
        <p className="admin-auth__intro">Use the email and password of an authorized administrator.</p>

        {!firebaseConfigured && (
          <div className="admin-alert admin-alert--warning" role="alert">
            <AlertCircle size={18} aria-hidden="true" />
            <span>Firebase is not configured. Add the required <code>VITE_FIREBASE_*</code> variables to enable admin sign-in.</span>
          </div>
        )}
        {isPending && (
          <div className="admin-alert" role="status"><Loader2 className="admin-spin" size={18} aria-hidden="true" />Checking administrator access…</div>
        )}
        {isDenied && (
          <div className="admin-alert admin-alert--error" role="alert">
            <AlertCircle size={18} aria-hidden="true" />
            <span>This account is authenticated but is not authorized for the admin workspace. Access requires an active <code>admins/{user?.uid}</code> document with <code>role: "admin"</code>.</span>
          </div>
        )}
        {isCheckError && (
          <div className="admin-alert admin-alert--error" role="alert">
            <AlertCircle size={18} aria-hidden="true" />
            <span>{verificationMessage || 'Could not verify admin access. Check your connection and Firestore rules.'}</span>
            <button type="button" className="admin-text-button" onClick={onRetry}>Retry</button>
          </div>
        )}
        {message && !isCheckError && <p className="admin-form-error" role="alert">{message}</p>}

        {user ? (
          <div className="admin-auth__signed-in">
            <span>Signed in as</span>
            <strong>{user.email}</strong>
            <div className="admin-auth__actions">
              {isCheckError && <button className="admin-button admin-button--primary" type="button" onClick={onRetry}>Retry access check</button>}
              <button className="admin-button admin-button--quiet" type="button" onClick={onSignOut}><LogOut size={16} />Sign out</button>
            </div>
          </div>
        ) : (
          <form className="admin-auth__form" onSubmit={submit}>
            <label className="admin-field">
              <span>Email address</span>
              <input type="email" name="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} />
            </label>
            <label className="admin-field">
              <span>Password</span>
              <input type="password" name="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} />
            </label>
            <button className="admin-button admin-button--primary admin-auth__submit" type="submit" disabled={!firebaseConfigured || submitting || isPending}>
              {submitting ? <Loader2 className="admin-spin" size={17} /> : <ArrowUpRight size={17} />}
              Sign in securely
            </button>
            <p className="admin-auth__footnote">Administrator accounts are provisioned in Firebase Authentication. Public sign-up is disabled.</p>
          </form>
        )}
      </section>
      <aside className="admin-auth__aside" aria-label="Workspace information">
        <div className="admin-auth__aside-top"><Activity size={17} /><span>SpenFel Digital Systems</span></div>
        <div className="admin-auth__aside-copy">
          <p>One clear view<br />of the work.</p>
          <span>Content, audience signals, and updates—kept in one quiet, focused workspace.</span>
        </div>
        <div className="admin-auth__aside-bottom"><span>ACCESS CONTROL</span><span>FIREBASE AUTH + FIRESTORE</span></div>
      </aside>
    </main>
  );
}

function AdminApp() {
  const [authState, setAuthState] = useState({ status: firebaseConfigured ? 'checking' : 'signedOut', user: null, message: '' });
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const verificationIdRef = useRef(0);

  const verifyAdmin = async (user) => {
    const verificationId = ++verificationIdRef.current;
    if (!db || !user) {
      setAuthState({ status: 'signedOut', user: null, message: '' });
      return;
    }

    setAuthState({ status: 'checking', user, message: '' });
    try {
      const adminSnapshot = await getDoc(doc(db, 'admins', user.uid));
      if (verificationId !== verificationIdRef.current) return;
      const access = adminSnapshot.exists()
        && adminSnapshot.data().active === true
        && adminSnapshot.data().role === 'admin';
      setAuthState({
        status: access ? 'authorized' : 'denied',
        user,
        message: '',
      });
    } catch (error) {
      if (verificationId !== verificationIdRef.current) return;
      setAuthState({ status: 'error', user, message: dataErrorMessage(error, 'verify administrator access') });
    }
  };

  useEffect(() => {
    if (!auth) return undefined;
    return onAuthStateChanged(auth, (user) => {
      if (user) verifyAdmin(user);
      else {
        verificationIdRef.current += 1;
        setAuthState({ status: 'signedOut', user: null, message: '' });
      }
    });
  }, []);

  const handleSignOut = async () => {
    if (!auth) return;
    verificationIdRef.current += 1;
    try {
      await signOut(auth);
      setAuthState({ status: 'signedOut', user: null, message: '' });
    } catch {
      setAuthState((current) => ({ ...current, message: 'Could not sign out. Check your connection and retry.' }));
    }
  };

  if (!firebaseConfigured) return <SignIn status="signedOut" />;
  if (authState.status !== 'authorized') {
    return (
      <SignIn
        status={authState.status}
        user={authState.user}
        verificationMessage={authState.message}
        onSignOut={handleSignOut}
        onRetry={() => authState.user && verifyAdmin(authState.user)}
      />
    );
  }

  return (
    <AdminWorkspace
      user={authState.user}
      onSignOut={handleSignOut}
      mobileNavOpen={mobileNavOpen}
      setMobileNavOpen={setMobileNavOpen}
    />
  );
}

function AdminWorkspace({ user, onSignOut, mobileNavOpen, setMobileNavOpen }) {
  const location = useLocation();
  const navigate = useNavigate();
  const activeSection = navigation.find((item) => item.path === location.pathname)?.id || 'overview';
  const section = navigation.find((item) => item.id === activeSection);

  useEffect(() => {
    if (!section) navigate('/admin', { replace: true });
  }, [navigate, section]);

  const selectSection = (path) => {
    navigate(path);
    setMobileNavOpen(false);
  };

  return (
    <div className="admin-shell">
      <aside className={`admin-sidebar${mobileNavOpen ? ' is-open' : ''}`}>
        <div className="admin-sidebar__brand">
          <span className="admin-brand__mark">S</span>
          <span className="admin-brand__text">SPENFEL <b>ADMIN</b></span>
          <button type="button" className="admin-sidebar__close" aria-label="Close navigation" onClick={() => setMobileNavOpen(false)}><X size={19} /></button>
        </div>
        <div className="admin-sidebar__section-label">WORKSPACE</div>
        <nav className="admin-nav" aria-label="Admin navigation">
          {navigation.map(({ id, label, path, icon: Icon }) => (
            <button
              type="button"
              key={id}
              className={`admin-nav__item${activeSection === id ? ' is-active' : ''}`}
              aria-current={activeSection === id ? 'page' : undefined}
              onClick={() => selectSection(path)}
            >
              <Icon size={18} aria-hidden="true" />
              <span>{label}</span>
              {activeSection === id && <span className="admin-nav__indicator" />}
            </button>
          ))}
        </nav>
        <div className="admin-sidebar__bottom">
          <div className="admin-secure-indicator"><span /><div><strong>Secure workspace</strong><small>Access verified</small></div></div>
          <div className="admin-profile">
            <span className="admin-profile__avatar">{(user.email || 'A').slice(0, 1).toUpperCase()}</span>
            <span className="admin-profile__identity"><strong>{user.email}</strong><small>Administrator</small></span>
            <button className="admin-profile__signout" type="button" onClick={onSignOut} aria-label="Sign out"><LogOut size={17} /></button>
          </div>
        </div>
      </aside>
      {mobileNavOpen && <button type="button" className="admin-sidebar-scrim" aria-label="Close navigation" onClick={() => setMobileNavOpen(false)} />}
      <main className="admin-main">
        <header className="admin-topbar">
          <button type="button" className="admin-mobile-menu" aria-label="Open navigation" onClick={() => setMobileNavOpen(true)}><Menu size={21} /></button>
          <div><p className="admin-topbar__crumb">SDS / <span>{section?.label || 'Overview'}</span></p></div>
          <div className="admin-topbar__right"><span className="admin-topbar__status"><i />FIREBASE CONNECTED</span><span className="admin-topbar__avatar">{(user.email || 'A').slice(0, 1).toUpperCase()}</span></div>
        </header>
        <div className="admin-content">
          {activeSection === 'overview' && <Overview />}
          {activeSection === 'messages' && <MessagesPage />}
          {activeSection === 'newsletter' && <NewsletterPage />}
          {activeSection === 'projects' && <CollectionManager collectionName="projects" title="Projects" description="Manage the work and products shown in the public portfolio." defaults={defaultProjects} />}
          {activeSection === 'services' && <CollectionManager collectionName="services" title="Services" description="Manage the services and capabilities shown on the public site." defaults={defaultServices} />}
        </div>
        <footer className="admin-footer"><span>SPENFEL DIGITAL SYSTEMS</span><span>ADMIN WORKSPACE · FIREBASE</span></footer>
      </main>
    </div>
  );
}

function PageHeading({ eyebrow, title, description, action }) {
  return (
    <div className="admin-page-heading">
      <div><p className="admin-kicker">{eyebrow}</p><h1>{title}</h1><p>{description}</p></div>
      {action}
    </div>
  );
}

function Overview() {
  const [days, setDays] = useState(30);
  const [metrics, setMetrics] = useState({ status: 'loading', pageViews: 0, visitors: 0, daily: [], paths: [], error: '' });

  useEffect(() => {
    if (!db) {
      setMetrics((current) => ({ ...current, status: 'error', error: 'Firebase is not configured.' }));
      return undefined;
    }

    let active = true;
    const start = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    setMetrics((current) => ({ ...current, status: 'loading', error: '' }));
    const unsubscribe = onSnapshot(
      query(collection(db, 'analytics'), where('createdAt', '>=', Timestamp.fromDate(start))),
      (snapshot) => {
        if (!active) return;
        const visitorIds = new Set();
        const dayCounts = new Map();
        const pathCounts = new Map();
        let pageViews = 0;
        snapshot.forEach((record) => {
          const item = record.data();
          if (item.eventType !== 'page_view') return;
          pageViews += 1;
          if (typeof item.visitorId === 'string') visitorIds.add(item.visitorId);
          const date = item.createdAt?.toDate?.();
          if (date) {
            const dayKey = date.toISOString().slice(0, 10);
            dayCounts.set(dayKey, (dayCounts.get(dayKey) || 0) + 1);
          }
          if (typeof item.pagePath === 'string') pathCounts.set(item.pagePath, (pathCounts.get(item.pagePath) || 0) + 1);
        });
        const daysForChart = Array.from({ length: days }, (_, index) => {
          const date = new Date(Date.now() - (days - index - 1) * 24 * 60 * 60 * 1000);
          const key = date.toISOString().slice(0, 10);
          return { key, label: date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }), count: dayCounts.get(key) || 0 };
        });
        const paths = [...pathCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);
        setMetrics({ status: 'ready', pageViews, visitors: visitorIds.size, daily: daysForChart, paths, error: '' });
      },
      (error) => {
        if (active) setMetrics((current) => ({ ...current, status: 'error', error: dataErrorMessage(error, 'load analytics') }));
      },
    );

    return () => {
      active = false;
      unsubscribe();
    };
  }, [days]);

  const maxDailyViews = Math.max(1, ...metrics.daily.map((day) => day.count));
  const chartDays = metrics.daily;

  return (
    <>
      <PageHeading
        eyebrow="SITE PULSE"
        title="Overview"
        description="A measured view of public activity. Analytics are anonymous and client-side."
        action={<label className="admin-select-wrap"><span className="sr-only">Analytics date range</span><select value={days} onChange={(event) => setDays(Number(event.target.value))}><option value={7}>Last 7 days</option><option value={30}>Last 30 days</option><option value={90}>Last 90 days</option></select><ChevronDown size={16} aria-hidden="true" /></label>}
      />
      {metrics.status === 'error' && <div className="admin-alert admin-alert--error" role="alert"><AlertCircle size={18} />{metrics.error}</div>}
      {metrics.status === 'loading' && <div className="admin-alert" role="status"><Loader2 className="admin-spin" size={18} />Loading analytics for the last {days} days…</div>}
      <div className="admin-metric-grid">
        <article className="admin-metric-card admin-metric-card--views">
          <div className="admin-metric-card__top"><span>PAGE VIEWS</span><Activity size={18} aria-hidden="true" /></div>
          <strong>{metrics.status === 'ready' ? metrics.pageViews.toLocaleString() : '—'}</strong>
          <span className="admin-metric-card__note">Recorded public page loads · {days} days</span>
        </article>
        <article className="admin-metric-card admin-metric-card--visitors">
          <div className="admin-metric-card__top"><span>UNIQUE VISITORS</span><ShieldCheck size={18} aria-hidden="true" /></div>
          <strong>{metrics.status === 'ready' ? metrics.visitors.toLocaleString() : '—'}</strong>
          <span className="admin-metric-card__note">Distinct browser IDs · {days} days</span>
        </article>
        <article className="admin-metric-note">
          <div className="admin-metric-note__icon"><AlertCircle size={19} /></div>
          <div><strong>Anonymous by design</strong><p>Counts use a browser-stored random ID, not visitor names or email. Client-side blockers and offline visits can reduce recorded totals.</p></div>
        </article>
      </div>

      <div className="admin-overview-grid">
        <section className="admin-panel admin-chart-panel" aria-labelledby="traffic-heading">
          <div className="admin-panel__heading"><div><p className="admin-kicker">RECENT ACTIVITY</p><h2 id="traffic-heading">Page views</h2></div><span className="admin-panel__legend"><i />Views per day</span></div>
          {metrics.status === 'ready' && metrics.pageViews === 0 ? (
            <div className="admin-empty admin-empty--compact"><Activity size={21} /><strong>No page views recorded yet</strong><span>Public visits appear here after Firebase analytics is configured and a visit can be recorded.</span></div>
          ) : metrics.status === 'error' ? (
            <div className="admin-empty admin-empty--compact"><AlertCircle size={21} /><strong>Chart unavailable</strong><span>Resolve the analytics read error above to display page views.</span></div>
          ) : (
            <div className="admin-chart" role="img" aria-label={`Daily page views over the last ${days} days`}>
              {metrics.status === 'ready' && chartDays.map((day) => (
                <div className="admin-chart__column" key={day.key} title={`${day.label}: ${day.count} page views`}>
                  <span className="admin-chart__bar" style={{ height: `${Math.max(3, (day.count / maxDailyViews) * 100)}%` }} />
                  <span className="admin-chart__label">{day.label}</span>
                </div>
              ))}
              {metrics.status !== 'ready' && <div className="admin-chart__loading"><Loader2 className="admin-spin" size={21} /></div>}
            </div>
          )}
        </section>
        <section className="admin-panel admin-path-panel" aria-labelledby="pages-heading">
          <div className="admin-panel__heading"><div><p className="admin-kicker">MOST VISITED</p><h2 id="pages-heading">Top pages</h2></div><ArrowDownRight size={19} aria-hidden="true" /></div>
          {metrics.status === 'ready' && metrics.paths.length ? (
            <ol className="admin-path-list">{metrics.paths.map(([path, count], index) => <li key={path}><span className="admin-path-list__index">0{index + 1}</span><span className="admin-path-list__path">{path}</span><strong>{count}</strong></li>)}</ol>
          ) : metrics.status === 'ready' ? (
            <div className="admin-empty admin-empty--compact"><ClipboardList size={21} /><strong>No pages to show</strong><span>Path summaries will appear once page views are recorded.</span></div>
            ) : metrics.status === 'loading' ? <div className="admin-path-list__loading"><Loader2 className="admin-spin" size={20} /></div> : (
              <div className="admin-empty admin-empty--compact"><AlertCircle size={21} /><strong>Page summary unavailable</strong><span>Resolve the analytics read error above.</span></div>
            )}
        </section>
      </div>
      <p className="admin-data-footnote"><span><i />Live from Firestore</span> These are observed client-side events, not a complete or independently verified audience count.</p>
    </>
  );
}

function NewsletterPage() {
  const [state, setState] = useState({ status: 'loading', records: [], error: '' });

  useEffect(() => {
    if (!db) {
      setState({ status: 'error', records: [], error: 'Firebase is not configured.' });
      return undefined;
    }

    return onSnapshot(collection(db, 'subscriptions'), (snapshot) => {
      const records = snapshot.docs
        .map((item) => ({ ...item.data(), id: item.id }))
        .sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0));
      setState({ status: records.length ? 'ready' : 'empty', records, error: '' });
    }, (error) => setState({ status: 'error', records: [], error: dataErrorMessage(error, 'load subscriptions') }));
  }, []);

  return (
    <>
      <PageHeading eyebrow="AUDIENCE" title="Newsletter" description="Subscription details are visible only to approved administrators." />
      <section className="admin-panel admin-subscribers" aria-labelledby="subscribers-heading">
        <div className="admin-panel__heading"><div><p className="admin-kicker">SUBSCRIBER LIST</p><h2 id="subscribers-heading">Recent signups</h2></div><span className="admin-count">{state.records.length} {state.records.length === 1 ? 'signup' : 'signups'}</span></div>
        {state.status === 'loading' && <div className="admin-alert" role="status"><Loader2 className="admin-spin" size={18} />Loading subscriptions…</div>}
        {state.status === 'error' && <div className="admin-alert admin-alert--error" role="alert"><AlertCircle size={18} />{state.error}</div>}
        {state.status === 'empty' && <div className="admin-empty"><Mail size={24} /><strong>No subscribers yet</strong><span>New public signups will appear here after their details are saved to Firestore.</span></div>}
        {state.status === 'ready' && (
          <div className="admin-table-scroll">
            <table className="admin-table">
              <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Signed up</th></tr></thead>
              <tbody>{state.records.map((record) => (
                <tr key={record.id}>
                  <td><strong>{record.name || '—'}</strong></td>
                  <td><a href={`mailto:${record.email}`}>{record.email || '—'}</a></td>
                  <td>{record.phone || '—'}</td>
                  <td>{record.createdAt?.toDate ? record.createdAt.toDate().toLocaleString() : 'Pending timestamp'}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
        <p className="admin-table__privacy"><ShieldCheck size={15} /> Subscriber records are not publicly readable or editable.</p>
      </section>
    </>
  );
}

function MessagesPage() {
  const [state, setState] = useState({ status: 'loading', records: [], error: '' });

  useEffect(() => {
    if (!db) {
      setState({ status: 'error', records: [], error: 'Firebase is not configured.' });
      return undefined;
    }

    return onSnapshot(collection(db, 'messages'), (snapshot) => {
      const records = snapshot.docs
        .map((item) => ({ ...item.data(), id: item.id }))
        .sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0));
      setState({ status: records.length ? 'ready' : 'empty', records, error: '' });
    }, (error) => setState({ status: 'error', records: [], error: dataErrorMessage(error, 'load contact messages') }));
  }, []);

  return (
    <>
      <PageHeading eyebrow="INBOX" title="Contact messages" description="Messages sent through the public contact form are visible only to approved administrators." />
      <section className="admin-panel admin-subscribers" aria-labelledby="messages-heading">
        <div className="admin-panel__heading"><div><p className="admin-kicker">CONTACT INBOX</p><h2 id="messages-heading">Recent messages</h2></div><span className="admin-count">{state.records.length} {state.records.length === 1 ? 'message' : 'messages'}</span></div>
        {state.status === 'loading' && <div className="admin-alert" role="status"><Loader2 className="admin-spin" size={18} />Loading messages…</div>}
        {state.status === 'error' && <div className="admin-alert admin-alert--error" role="alert"><AlertCircle size={18} />{state.error}</div>}
        {state.status === 'empty' && <div className="admin-empty"><MessageSquare size={24} /><strong>No messages yet</strong><span>Messages sent through the public contact form will appear here.</span></div>}
        {state.status === 'ready' && (
          <div className="admin-table-scroll">
            <table className="admin-table admin-messages-table">
              <thead><tr><th>From</th><th>Email</th><th>Message</th><th>Received</th></tr></thead>
              <tbody>{state.records.map((record) => (
                <tr key={record.id}>
                  <td><strong>{record.name || '—'}</strong></td>
                  <td><a href={`mailto:${record.email}`}>{record.email || '—'}</a></td>
                  <td className="admin-messages-table__message">{record.message || '—'}</td>
                  <td>{record.createdAt?.toDate ? record.createdAt.toDate().toLocaleString() : 'Pending timestamp'}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
        <p className="admin-table__privacy"><ShieldCheck size={15} /> Contact messages are private and read-only in this workspace.</p>
      </section>
    </>
  );
}

const slugify = (text) => String(text || '')
  .normalize('NFKD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '')
  .slice(0, 80);

const isSafeLink = (value, allowPath = false) => {
  if (!value) return true;
  if (allowPath && value.startsWith('/')) return true;
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
};

function toEditorValues(collectionName, record) {
  if (collectionName === 'services') {
    return {
      title: record?.title || '',
      description: record?.description || '',
      detail: record?.detail || '',
      icon: record?.icon || 'Code2',
      capabilities: Array.isArray(record?.capabilities) ? record.capabilities.join(', ') : '',
      order: record?.order ?? 0,
    };
  }
  return {
    title: record?.title || '',
    description: record?.description || '',
    category: record?.category || '',
    type: record?.type || '',
    demo: record?.demo || '',
    image: record?.image || '',
    isFeaturedProduct: record?.isFeaturedProduct === true,
    order: record?.order ?? 0,
  };
}

function CollectionManager({ collectionName, title, description, defaults }) {
  const [state, setState] = useState({ status: 'loading', records: [], error: '' });
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState({ type: '', message: '' });
  const [seeding, setSeeding] = useState(false);
  const [search, setSearch] = useState('');
  const titleRef = useRef(null);
  const returnFocusRef = useRef(null);
  const isEditing = Boolean(editing);
  const savingRef = useRef(saving);
  savingRef.current = saving;
  const isService = collectionName === 'services';

  useEffect(() => {
    if (!db) {
      setState({ status: 'error', records: [], error: 'Firebase is not configured.' });
      return undefined;
    }

    return onSnapshot(collection(db, collectionName), (snapshot) => {
      const records = snapshot.docs
        .map((item) => ({ ...item.data(), id: item.id }))
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      setState({ status: records.length ? 'ready' : 'empty', records, error: '' });
    }, (error) => setState({ status: 'error', records: [], error: dataErrorMessage(error, `load ${title.toLowerCase()}`) }));
  }, [collectionName, title]);

  useEffect(() => {
    if (!isEditing) {
      returnFocusRef.current?.focus?.();
      returnFocusRef.current = null;
      return undefined;
    }

    const timer = window.setTimeout(() => titleRef.current?.focus(), 0);
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (!savingRef.current) setEditing(null);
        return;
      }
      if (event.key !== 'Tab') return;
      const dialog = document.getElementById('admin-record-editor');
      const focusable = dialog?.querySelectorAll('button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled])');
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isEditing]);

  const filteredRecords = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();
    if (!searchTerm) return state.records;
    return state.records.filter((record) => [record.title, record.description, record.category, record.type]
      .some((value) => String(value || '').toLowerCase().includes(searchTerm)));
  }, [search, state.records]);

  const openEditor = (record = null) => {
    returnFocusRef.current = document.activeElement;
    setNotice({ type: '', message: '' });
    setEditing({ id: record?.id || null, values: toEditorValues(collectionName, record) });
  };

  const updateValue = (field, value) => setEditing((current) => ({
    ...current,
    values: { ...current.values, [field]: value },
  }));

  const saveRecord = async (event) => {
    event.preventDefault();
    const values = editing.values;
    const order = Number(values.order);
    if (!values.title.trim() || values.title.trim().length > 140) {
      setNotice({ type: 'error', message: 'Enter a title of 1–140 characters.' });
      return;
    }
    if (!values.description.trim() || values.description.trim().length > 1200) {
      setNotice({ type: 'error', message: 'Enter a description of 1–1,200 characters.' });
      return;
    }
    if (!Number.isInteger(order) || order < 0 || order > 9999) {
      setNotice({ type: 'error', message: 'Display order must be a whole number between 0 and 9999.' });
      return;
    }

    let payload;
    if (isService) {
      const capabilities = values.capabilities.split(',').map((item) => item.trim()).filter(Boolean);
      if (!values.detail.trim() || values.detail.trim().length > 2000) {
        setNotice({ type: 'error', message: 'Enter service details of 1–2,000 characters.' });
        return;
      }
      if (capabilities.length > 20 || capabilities.some((item) => item.length > 100)) {
        setNotice({ type: 'error', message: 'Add no more than 20 capabilities, each up to 100 characters.' });
        return;
      }
      payload = {
        title: values.title.trim(),
        description: values.description.trim(),
        detail: values.detail.trim(),
        icon: values.icon,
        capabilities,
        order,
      };
    } else {
      if (!values.category.trim() || !values.type.trim()) {
        setNotice({ type: 'error', message: 'Enter both a category and project type.' });
        return;
      }
      if (!isSafeLink(values.demo) || !isSafeLink(values.image, true)) {
        setNotice({ type: 'error', message: 'Project links must use http(s), and images may also use a site-local path.' });
        return;
      }
      payload = {
        title: values.title.trim(),
        description: values.description.trim(),
        category: values.category.trim(),
        type: values.type.trim(),
        demo: values.demo.trim(),
        image: values.image.trim(),
        isFeaturedProduct: values.isFeaturedProduct === true,
        order,
      };
    }

    setSaving(true);
    setNotice({ type: '', message: '' });
    try {
      if (editing.id) {
        await updateDoc(doc(db, collectionName, editing.id), { ...payload, updatedAt: serverTimestamp() });
      } else {
        await addDoc(collection(db, collectionName), { ...payload, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
      }
      setEditing(null);
      setNotice({ type: 'success', message: `${title.slice(0, -1)} ${editing.id ? 'updated' : 'added'} successfully.` });
    } catch (error) {
      setNotice({ type: 'error', message: dataErrorMessage(error, `${editing.id ? 'update' : 'create'} this ${title.slice(0, -1).toLowerCase()}`) });
    } finally {
      setSaving(false);
    }
  };

  const removeRecord = async (record) => {
    if (!window.confirm(`Delete “${record.title}”? This cannot be undone.`)) return;
    setNotice({ type: '', message: '' });
    try {
      await deleteDoc(doc(db, collectionName, record.id));
      setNotice({ type: 'success', message: `${title.slice(0, -1)} deleted.` });
    } catch (error) {
      setNotice({ type: 'error', message: dataErrorMessage(error, `delete this ${title.slice(0, -1).toLowerCase()}`) });
    }
  };

  const seedDefaults = async () => {
    if (!window.confirm(`Import all ${defaults.length} built-in ${title.toLowerCase()}? This adds the defaults only to an empty managed collection.`)) return;
    setSeeding(true);
    setNotice({ type: '', message: '' });
    try {
      const latest = await getDocs(collection(db, collectionName));
      if (!latest.empty) {
        setNotice({ type: 'error', message: 'The managed collection is no longer empty. No defaults were imported.' });
        return;
      }
      const batch = writeBatch(db);
      const usedIds = new Set();
      defaults.forEach((record, index) => {
        const { id: fallbackId, ...fields } = record;
        let recordId = slugify(fallbackId) || slugify(record.title) || `${collectionName}-${index + 1}`;
        while (usedIds.has(recordId)) recordId = `${recordId}-${index + 1}`;
        usedIds.add(recordId);
        batch.set(doc(db, collectionName, recordId), { ...fields, order: record.order ?? index });
      });
      await batch.commit();
      setNotice({ type: 'success', message: `${defaults.length} built-in ${title.toLowerCase()} imported. Existing records were not replaced.` });
    } catch (error) {
      setNotice({ type: 'error', message: dataErrorMessage(error, `import default ${title.toLowerCase()}`) });
    } finally {
      setSeeding(false);
    }
  };

  const createdLabel = (record) => record.updatedAt?.toDate
    ? `Updated ${record.updatedAt.toDate().toLocaleDateString()}`
    : isService ? `${record.capabilities?.length || 0} capabilities` : record.type || 'Project';

  return (
    <>
      <PageHeading
        eyebrow="PUBLIC CONTENT"
        title={title}
        description={description}
        action={<button className="admin-button admin-button--primary" type="button" onClick={() => openEditor()}><Plus size={17} />Add {title.slice(0, -1)}</button>}
      />
      {notice.message && <div className={`admin-alert ${notice.type === 'error' ? 'admin-alert--error' : 'admin-alert--success'}`} role={notice.type === 'error' ? 'alert' : 'status'}>{notice.type === 'error' ? <AlertCircle size={18} /> : <Check size={18} />}{notice.message}</div>}

      <section className="admin-panel admin-manager" aria-label={`${title} records`}>
        <div className="admin-manager__toolbar">
          <div><p className="admin-kicker">MANAGED CONTENT</p><h2>{state.records.length} {state.records.length === 1 ? title.slice(0, -1).toLowerCase() : title.toLowerCase()}</h2></div>
          <label className="admin-search"><span className="sr-only">Search {title.toLowerCase()}</span><input type="search" placeholder={`Search ${title.toLowerCase()}…`} value={search} onChange={(event) => setSearch(event.target.value)} /><span>⌕</span></label>
        </div>
        {state.status === 'loading' && <div className="admin-alert" role="status"><Loader2 className="admin-spin" size={18} />Loading managed content…</div>}
        {state.status === 'error' && <div className="admin-alert admin-alert--error" role="alert"><AlertCircle size={18} />{state.error}<button className="admin-text-button" type="button" onClick={() => window.location.reload()}><RefreshCw size={14} />Reload</button></div>}
        {state.status === 'empty' && (
          <div className="admin-empty admin-empty--seed">
            <div className="admin-empty__icon">{isService ? <Wrench size={24} /> : <Briefcase size={24} />}</div>
            <strong>No managed {title.toLowerCase()} yet</strong>
            <span>The public site is currently showing the built-in content. Import it once to begin managing it here, or add your own first record.</span>
            <div className="admin-empty__actions">
              <button className="admin-button admin-button--primary" type="button" onClick={seedDefaults} disabled={seeding}>{seeding ? <Loader2 className="admin-spin" size={16} /> : <Plus size={16} />}Import {defaults.length} built-in {title.toLowerCase()}</button>
              <button className="admin-button admin-button--quiet" type="button" onClick={() => openEditor()}><Plus size={16} />Start from scratch</button>
            </div>
          </div>
        )}
        {state.status === 'ready' && (
          filteredRecords.length ? (
            <div className="admin-record-list">
              {filteredRecords.map((record, index) => (
                <article className="admin-record" key={record.id}>
                  <span className="admin-record__order">{String(index + 1).padStart(2, '0')}</span>
                  {!isService && record.image && <img className="admin-record__image" src={record.image} alt="" loading="lazy" />}
                  {isService && <span className="admin-record__icon"><Wrench size={18} /></span>}
                  <div className="admin-record__copy">
                    <h3>{record.title}</h3>
                    <p>{record.description}</p>
                    <span>{isService ? (record.capabilities || []).slice(0, 4).join(' · ') || 'No capabilities listed' : `${record.category || 'Project'} · ${record.type || 'Digital work'}`}</span>
                  </div>
                  <div className="admin-record__meta">{createdLabel(record)}</div>
                  <div className="admin-record__actions">
                    <button className="admin-button admin-button--small" type="button" onClick={() => openEditor(record)}>Edit</button>
                    <button className="admin-icon-button admin-icon-button--danger" type="button" onClick={() => removeRecord(record)} aria-label={`Delete ${record.title}`}><Trash2 size={16} /></button>
                  </div>
                </article>
              ))}
            </div>
          ) : <div className="admin-empty admin-empty--compact"><ClipboardList size={21} /><strong>No matches</strong><span>Try a different search term.</span></div>
        )}
      </section>
      <p className="admin-data-footnote"><span><i />Connected to public content</span> Changes are reflected on the public site when Firestore is reachable.</p>

      {editing && (
        <div className="admin-dialog-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget && !saving) setEditing(null); }}>
          <section id="admin-record-editor" className="admin-dialog" role="dialog" aria-modal="true" aria-labelledby="editor-heading">
            <div className="admin-dialog__heading"><div><p className="admin-kicker">{editing.id ? 'EDIT RECORD' : 'NEW RECORD'}</p><h2 id="editor-heading">{editing.id ? 'Update' : 'Add'} {title.slice(0, -1).toLowerCase()}</h2></div><button className="admin-icon-button" type="button" aria-label="Close editor" onClick={() => setEditing(null)} disabled={saving}><X size={19} /></button></div>
            {notice.type === 'error' && <div className="admin-alert admin-alert--error" role="alert"><AlertCircle size={17} />{notice.message}</div>}
            <form className="admin-editor-form" onSubmit={saveRecord}>
              <label className="admin-field"><span>Title <i>*</i></span><input ref={titleRef} value={editing.values.title} maxLength={140} onChange={(event) => updateValue('title', event.target.value)} required /></label>
              <label className="admin-field"><span>Description <i>*</i></span><textarea rows={3} maxLength={1200} value={editing.values.description} onChange={(event) => updateValue('description', event.target.value)} required /></label>
              {isService ? (
                <>
                  <label className="admin-field"><span>Detailed description <i>*</i></span><textarea rows={4} maxLength={2000} value={editing.values.detail} onChange={(event) => updateValue('detail', event.target.value)} required /></label>
                  <div className="admin-field-row">
                    <label className="admin-field"><span>Icon</span><select value={editing.values.icon} onChange={(event) => updateValue('icon', event.target.value)}>{['Bot', 'CloudCog', 'Code2', 'Cpu', 'GraduationCap', 'Workflow'].map((icon) => <option key={icon}>{icon}</option>)}</select></label>
                    <label className="admin-field"><span>Display order</span><input type="number" min="0" max="9999" step="1" value={editing.values.order} onChange={(event) => updateValue('order', event.target.value)} /></label>
                  </div>
                  <label className="admin-field"><span>Capabilities <small>Separate with commas</small></span><textarea rows={3} value={editing.values.capabilities} onChange={(event) => updateValue('capabilities', event.target.value)} placeholder="Web applications, APIs & integrations" /></label>
                </>
              ) : (
                <>
                  <div className="admin-field-row">
                    <label className="admin-field"><span>Category <i>*</i></span><input maxLength={100} value={editing.values.category} onChange={(event) => updateValue('category', event.target.value)} required /></label>
                    <label className="admin-field"><span>Project type <i>*</i></span><input maxLength={100} value={editing.values.type} onChange={(event) => updateValue('type', event.target.value)} required /></label>
                  </div>
                  <label className="admin-field"><span>Demo link</span><input type="url" maxLength={2000} value={editing.values.demo} onChange={(event) => updateValue('demo', event.target.value)} placeholder="https://" /></label>
                  <label className="admin-field"><span>Image URL or site path</span><input maxLength={2000} value={editing.values.image} onChange={(event) => updateValue('image', event.target.value)} placeholder="/portfolio/images/projects/cover.png" /></label>
                  <label className="admin-checkbox-field">
                    <input type="checkbox" checked={editing.values.isFeaturedProduct} onChange={(event) => updateValue('isFeaturedProduct', event.target.checked)} />
                    <span><strong>Featured product</strong><small>Use the “Explore product” label for this project card.</small></span>
                  </label>
                  <label className="admin-field admin-field--short"><span>Display order</span><input type="number" min="0" max="9999" step="1" value={editing.values.order} onChange={(event) => updateValue('order', event.target.value)} /></label>
                </>
              )}
              <div className="admin-dialog__actions">
                <button className="admin-button admin-button--quiet" type="button" disabled={saving} onClick={() => setEditing(null)}>Cancel</button>
                <button className="admin-button admin-button--primary" type="submit" disabled={saving}>{saving ? <Loader2 className="admin-spin" size={16} /> : <Check size={16} />}{saving ? 'Saving…' : 'Save changes'}</button>
              </div>
            </form>
          </section>
        </div>
      )}
    </>
  );
}

export default AdminApp;
