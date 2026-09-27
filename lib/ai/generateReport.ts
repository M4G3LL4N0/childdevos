type ReportLog = {
  type?: string
  note?: string
}

export async function generateReport(logs: ReportLog[]) {
  const content = logs.map((log) => `${log.type ?? "note"}: ${log.note ?? ""}`).join("\n")

  return `Child Development Daily Report:

${content}

Summary:
The child participated in activities, meals, and general engagement. Monitor consistency, mood trends, and learning curiosity over time.`
}
