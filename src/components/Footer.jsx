// Footer is the small closing section at the bottom of the page.
function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-[#faf9f6]">
      {/* page width */}
      <div className="mx-auto flex w-[calc(100%_-_2rem)] max-w-[1800px] flex-col gap-2 py-7 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:w-[96%]">
        <span className="font-semibold text-slate-800">TutorTrack.</span>
        <span>One connected workspace for teaching and learning.</span>
      </div>
    </footer>
  )
}

export default Footer
