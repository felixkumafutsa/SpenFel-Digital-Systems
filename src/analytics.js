import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, firebaseConfigured } from './firebase';

function getVisitorId() {
  const key = 'sds-analytics-visitor';
  try {
    let visitorId = window.localStorage.getItem(key);
    if (!visitorId) {
      visitorId = window.crypto?.randomUUID?.()
        || `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
      window.localStorage.setItem(key, visitorId);
    }
    return visitorId;
  } catch {
    return window.crypto?.randomUUID?.() || `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
  }
}

export function recordPageView(path) {
  if (!firebaseConfigured || !path || path.startsWith('/admin')) return;
  addDoc(collection(db, 'analytics'), {
    eventType: 'page_view',
    visitorId: getVisitorId(),
    pagePath: path.slice(0, 180),
    createdAt: serverTimestamp(),
  }).catch(() => {
    // Analytics are best-effort and must not interrupt the public site.
  });
}
