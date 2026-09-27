import { format } from "date-fns"
import { ObservationRow } from "@/lib/types"

export function classNames(...items: Array<string | false | null | undefined>) {
  return items.filter(Boolean).join(" ")
}

export function fullChildName(firstName: string, lastName: string) {
  return `${firstName} ${lastName}`.trim()
}

export function buildDailyReport(observations: ObservationRow[], childName: string, reportDate: string) {
  if (!observations.length) {
    return {
      summary: `Daily report for ${childName} on ${reportDate}: No observations were logged today.`,
      happinessAvg: null as number | null,
      learningFocus: [] as string[],
    }
  }

  const grouped = observations.reduce<Record<string, ObservationRow[]>>((acc, item) => {
    acc[item.category] ||= []
    acc[item.category].push(item)
    return acc
  }, {})

  const happinessValues = observations
    .map((item) => item.happiness_level)
    .filter((value): value is number => typeof value === "number")

  const happinessAvg = happinessValues.length
    ? Number((happinessValues.reduce((sum, value) => sum + value, 0) / happinessValues.length).toFixed(2))
    : null

  const learningFocus = Array.from(
    new Set(observations.flatMap((item) => item.learned_tags || []).filter(Boolean))
  ).slice(0, 8)

  const headline = `Daily report for ${childName} on ${format(new Date(reportDate), "MMMM d, yyyy")}.`

  const sections = Object.entries(grouped).map(([category, entries]) => {
    const lines = entries
      .slice(0, 6)
      .map((entry) => {
        const time = format(new Date(entry.occurred_at), "h:mm a")
        const mood = entry.happiness_level ? ` Happiness ${entry.happiness_level}/5.` : ""
        return `${time} — ${entry.title}: ${entry.note}.${mood}`
      })
      .join(" ")

    return `${capitalize(category)}: ${lines}`
  })

  const insights = [
    happinessAvg ? `Average observed happiness was ${happinessAvg}/5.` : null,
    learningFocus.length ? `Learning focus included ${learningFocus.join(", ")}.` : null,
  ].filter(Boolean)

  return {
    summary: [headline, ...sections, ...insights].join("\n\n"),
    happinessAvg,
    learningFocus,
  }
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}
