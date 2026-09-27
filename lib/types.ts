export type ChildRow = {
  id: string
  first_name: string
  last_name: string
  birth_date: string | null
  happiness_baseline: number | null
  classroom_id: string | null
  center_id: string
}

export type ObservationRow = {
  id: string
  child_id: string
  category: string
  title: string
  note: string
  happiness_level: number | null
  learned_tags: string[]
  occurred_at: string
}

export type DailyReportRow = {
  id: string
  child_id: string
  report_date: string
  summary: string
  happiness_avg: number | null
  learning_focus: string[]
}
