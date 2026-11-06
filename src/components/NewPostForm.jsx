import { useEffect, useState } from 'react';
import { actions, isInputError } from 'astro:actions';

export default function NewPostForm() {
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);

  // Im Dev-Modus lädt Astro die Seite neu, sobald die neue Datei da ist. Der Slug in der URL überlebt das.
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get('neu');
    if (slug && /^[a-z0-9-]+$/.test(slug)) setStatus({ ok: true, slug });
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setSending(true);
    const { data, error } = await actions.createPost(new FormData(form));
    setSending(false);
    if (error) {
      const text = isInputError(error) ? Object.values(error.fields).flat().join(' · ') : error.message;
      setStatus({ ok: false, text });
      return;
    }
    form.reset();
    window.history.replaceState(null, '', `?neu=${encodeURIComponent(data.slug)}`);
    setStatus({ ok: true, slug: data.slug });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Titel</label>
      <input id="title" name="title" required minLength={3} maxLength={100} />
      <label htmlFor="description">Kurzbeschreibung</label>
      <input id="description" name="description" required minLength={10} maxLength={200} />
      <label htmlFor="body">Text (Markdown)</label>
      <textarea id="body" name="body" rows={8} required minLength={10} />
      <button type="submit" disabled={sending}>{sending ? 'Speichere …' : 'Beitrag speichern'}</button>
      <p role="status" aria-live="polite" className={status ? (status.ok ? 'success' : 'error') : undefined}>
        {status?.ok && <>Gespeichert! <a href={`/blog/${status.slug}/`}>Zum neuen Beitrag</a></>}
        {status && !status.ok && <>Fehler: {status.text}</>}
      </p>
    </form>
  );
}
