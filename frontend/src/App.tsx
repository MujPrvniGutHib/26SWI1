function App() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-16 text-slate-900">
      <section className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-sky-600">
          React + TypeScript + Tailwind
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">
          Your Vite project is ready
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Edit <code className="rounded bg-slate-100 px-2 py-1">src/App.tsx</code>{' '}
          and use Tailwind utility classes to build your UI.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            className="rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
            href="https://react.dev/"
            target="_blank"
            rel="noreferrer"
          >
            React Docs
          </a>
          <a
            className="rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            href="https://tailwindcss.com/docs/installation/framework-guides/vite"
            target="_blank"
            rel="noreferrer"
          >
            Tailwind Docs
          </a>
        </div>
      </section>
    </main>
  )
}

export default App
