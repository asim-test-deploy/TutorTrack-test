import { Link } from 'react-router-dom'

const audiences = [
  {
    id: 'teachers',
    title: 'For Teachers',
    description:
      'Spend less time coordinating and more time focused on each learner.',
    details: [
      'Keep class and session details in one place.',
      'Follow student progress between lessons.',
      'See learning activity alongside your teaching.',
    ],
  },
  {
    id: 'students',
    title: 'For Students',
    description:
      'Know what to work on next and keep your learning organized.',
    details: [
      'Keep subjects and homework easy to find.',
      'Follow progress over time.',
      'Stay connected to your teacher and shared learning plan.',
    ],
  },
]

const steps = [
  'Teachers create their accounts.',
  'Students create their accounts.',
  'Students connect with teachers using a unique connection code.',
  'Both access their dashboards and shared learning information.',
]

function ProductSections() {
  return (
    <>
      <section className="border-t border-slate-200 bg-[#faf9f6]">
        {/* page width */}
        <div className="mx-auto w-[calc(100%_-_2rem)] max-w-[1440px] py-20 sm:w-[93%]">
          <div className="grid gap-6 lg:grid-cols-2">
            {audiences.map((audience) => (
              <article
                key={audience.id}
                id={audience.id}
                className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-9"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-indigo-600">
                  TutorTrack
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                  {audience.title}
                </h2>
                <p className="mt-3 max-w-xl leading-7 text-slate-600">
                  {audience.description}
                </p>
                <ul className="mt-6 space-y-3">
                  {audience.details.map((detail) => (
                    <li key={detail} className="flex gap-3 text-sm leading-6 text-slate-700">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500"
                      />
                      {detail}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="border-t border-slate-200 bg-white">
        <div className="mx-auto w-[calc(100%_-_2rem)] max-w-[1440px] py-20 sm:w-[93%]">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
              How it works
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Two roles, one connected learning journey.
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              TutorTrack is designed to bring teachers and students together
              around shared learning information.
            </p>
          </div>

          <ol className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {steps.map((step, index) => (
              <li
                key={step}
                className="rounded-2xl border border-slate-200 bg-[#faf9f6] p-6"
              >
                <span className="text-sm font-semibold text-indigo-600">
                  STEP 0{index + 1}
                </span>
                <p className="mt-4 leading-7 text-slate-700">{step}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-slate-500">
            Connection codes and shared dashboards describe the planned product
            workflow; this page is informational only.
          </p>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-[#faf9f6]">
        <div className="mx-auto w-[calc(100%_-_2rem)] max-w-[1440px] py-20 text-center sm:w-[93%]">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
              Start together
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Bring teaching and learning into sync.
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Join TutorTrack as a teacher or student and make room for a
              clearer, more connected learning experience.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/signup"
                className="rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
              >
                Get started
              </Link>
              <Link
                to="/login"
                className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
              >
                Log in
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProductSections
