import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db, firebaseConfigured } from '../firebase';

export default function usePublicCollection(collectionName, fallback) {
  const [state, setState] = useState(() => ({
    records: fallback,
    status: firebaseConfigured ? 'loading' : 'unconfigured',
    error: null,
  }));

  useEffect(() => {
    if (!firebaseConfigured) {
      setState({ records: fallback, status: 'unconfigured', error: null });
      return undefined;
    }

    setState({ records: fallback, status: 'loading', error: null });
    return onSnapshot(collection(db, collectionName), (snapshot) => {
      if (snapshot.empty) {
        setState({ records: fallback, status: 'empty', error: null });
        return;
      }
      const managed = snapshot.docs
        .map((document) => ({ ...document.data(), id: document.id }))
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      setState({ records: managed, status: 'ready', error: null });
    }, (error) => {
      setState({ records: fallback, status: 'error', error });
    });
  }, [collectionName, fallback]);

  return state;
}
