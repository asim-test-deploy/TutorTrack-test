import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-[#faf9f6]/90 backdrop-blur-sm">
      <div className="mx-auto flex w-[calc(100%_-_2rem)] max-w-[1800px] items-center justify-between py-4 sm:w-[98%]">
        <Link to="/" className="text-lg font-semibold tracking-tight text-slate-900">
          TutorTrack
        </Link>

        <nav className="flex items-center gap-5 text-sm font-medium text-slate-600">
          <a href="/#features" className="transition hover:text-slate-900">
            Features
          </a>
          <Link to="/login" className="transition hover:text-slate-900">
            Log in
          </Link>
          <Link
            to="/signup"
            className="rounded-full bg-indigo-600 px-4 py-2 font-semibold text-white transition hover:bg-indigo-700"
          >
            Sign up
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
