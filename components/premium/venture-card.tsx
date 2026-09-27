export default function VentureCard({
  title,
  desc,
  color
}: {
  title: string
  desc: string
  color: string
}) {
  return (
    <div className={`relative rounded-3xl overflow-hidden p-[1px] bg-gradient-to-br ${color}`}>
      <div className="bg-black/50 backdrop-blur-xl border border-white/10 p-6 h-full">
        <div className="text-xl font-semibold text-white">{title}</div>
        <div className="text-sm text-white/60 mt-2">{desc}</div>
      </div>
    </div>
  )
}
