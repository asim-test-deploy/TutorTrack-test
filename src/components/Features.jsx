const features = [
  {
    number: '01',
    title: 'Class and session management',
    description: 'Keep class details, session notes and schedules organized together.',
  },
  {
    number: '02',
    title: 'Learning progress tracking',
    description: 'Follow progress across subjects and topics with a shared view of learning.',
  },
  {
    number: '03',
    title: 'Attendance and reporting',
    description: 'Keep attendance records and useful summaries in one connected workspace.',
  },
  {
    number: '04',
    title: 'Homework and learning activities',
    description: 'Keep assignments and learning activities visible between sessions.',
  },
  {
    number: '05',
    title: 'Teacher-student connection',
    description: 'Connect both sides around the same learning relationship and goals.',
  },
  {
    number: '06',
    title: 'Performance insights',
    description: 'Turn class and learning activity into clear next steps for both roles.',
  },
]

function Features() {
  return (
    <section id="features" className="border-t border-slate-200 bg-white">
      {/* page width */}
      <div className="mx-auto w-[calc(100%_-_2rem)] max-w-[1440px] py-20 sm:w-[93%]">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
          Shared platform capabilities
        </p>
        <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Everything connected for teaching and learning.
        </h2>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.number}
              className="rounded-2xl border border-slate-200 p-7 transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg hover:shadow-slate-900/5"
            >
              <span className="text-sm font-semibold text-indigo-600">
                {feature.number}
              </span>
              <h3 className="mt-5 text-xl font-semibold">{feature.title}</h3>
              <p className="mt-3 max-w-md leading-7 text-slate-600">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
