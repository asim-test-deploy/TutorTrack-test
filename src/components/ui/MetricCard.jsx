const colorVariants = {
  indigo: {
    background: 'bg-indigo-50',
    title: 'text-indigo-700',
  },
  emerald: {
    background: 'bg-emerald-50',
    title: 'text-emerald-700',
  },
}

export default function MetricCard({ title, value, color, sampleText }) {
  const styles = colorVariants[color] || colorVariants.indigo

  return (
    <div className={`rounded-2xl p-5 ${styles.background}`}>
      <p className={`text-sm ${styles.title}`}>{title}</p>
      <p className="mt-3 text-3xl font-semibold">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{sampleText}</p>
    </div>
  )
}
