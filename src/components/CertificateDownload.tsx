type Props = {
  percentage: number
  verdictLabel: string
}

export default function CertificateDownload({ percentage, verdictLabel }: Props) {

  async function handleDownload() {
    const { jsPDF } = await import("jspdf")

    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    })

    const w = doc.internal.pageSize.getWidth()
    const h = doc.internal.pageSize.getHeight()
    const cx = w / 2

    // ── Background ──
    doc.setFillColor(10, 10, 10)
    doc.rect(0, 0, w, h, "F")

    // ── Border ──
    doc.setDrawColor(147, 112, 219)
    doc.setLineWidth(1.5)
    doc.roundedRect(10, 10, w - 20, h - 20, 4, 4, "S")

    doc.setDrawColor(80, 60, 120)
    doc.setLineWidth(0.3)
    doc.roundedRect(14, 14, w - 28, h - 28, 3, 3, "S")

    // ── Header ──
    doc.setFont("helvetica", "normal")
    doc.setFontSize(10)
    doc.setTextColor(147, 112, 219)
    doc.text("CERTIFICATE OF COMPLETION", cx, 32, { align: "center" })

    // ── Decorative line ──
    doc.setDrawColor(147, 112, 219)
    doc.setLineWidth(0.5)
    doc.line(cx - 35, 36, cx + 35, 36)

    // ── Title ──
    doc.setFont("helvetica", "bold")
    doc.setFontSize(20)
    doc.setTextColor(255, 255, 255)
    doc.text("Am I a Tech Bro?", cx, 48, { align: "center" })

    // ── "This certifies that" ──
    doc.setFont("helvetica", "normal")
    doc.setFontSize(9)
    doc.setTextColor(120, 120, 120)
    doc.text("This is to certify that this participant", cx, 62, { align: "center" })

    // ── Body text ──
    doc.setFontSize(9)
    doc.setTextColor(160, 160, 160)
    doc.text(
      "has completed the Tech Bro Assessment (18 statements) and has been classified as:",
      cx, 70, { align: "center" }
    )

    // ── VERDICT — the hero ──
    doc.setFont("helvetica", "bold")
    doc.setFontSize(52)
    if (percentage <= 30) doc.setTextColor(52, 211, 153)
    else if (percentage <= 65) doc.setTextColor(167, 139, 250)
    else doc.setTextColor(236, 72, 153)
    doc.text(verdictLabel.toUpperCase(), cx, 100, { align: "center" })

    // ── Decorative lines around verdict ──
    doc.setDrawColor(60, 50, 80)
    doc.setLineWidth(0.3)
    doc.line(cx - 60, 80, cx + 60, 80)
    doc.line(cx - 60, 106, cx + 60, 106)

    // ── Score below ──
    doc.setFont("helvetica", "normal")
    doc.setFontSize(12)
    doc.setTextColor(140, 140, 140)
    doc.text(`with a score of ${percentage}% agreement with tech bro ideas`, cx, 118, { align: "center" })

    // ── Scale visualization ──
    const barY = 128
    const barW = 120
    const barH = 4
    const barX = cx - barW / 2

    // Bar background
    doc.setFillColor(30, 30, 40)
    doc.roundedRect(barX, barY, barW, barH, 2, 2, "F")

    // Bar fill
    const fillW = (percentage / 100) * barW
    if (percentage <= 30) doc.setFillColor(52, 211, 153)
    else if (percentage <= 65) doc.setFillColor(167, 139, 250)
    else doc.setFillColor(236, 72, 153)
    if (fillW > 0) {
      doc.roundedRect(barX, barY, fillW, barH, 2, 2, "F")
    }

    // Scale labels
    doc.setFontSize(6)
    doc.setTextColor(80, 80, 80)
    doc.text("not a tech bro", barX, barY + 8)
    doc.text("tendencies", cx, barY + 8, { align: "center" })
    doc.text("tech bro", barX + barW, barY + 8, { align: "right" })

    // ── Date ──
    const today = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    doc.setFontSize(8)
    doc.setTextColor(100, 100, 100)
    doc.text(`Issued on ${today}`, cx, 155, { align: "center" })

        // ── Footer ──
    doc.setFontSize(7)
    doc.setTextColor(60, 60, 60)
    doc.text(
      "This certificate is 100% legitimate and should definitely be added to your LinkedIn profile.",
      cx, 175, { align: "center" }
    )
    doc.setFontSize(12)
    doc.setTextColor(236, 72, 153)
    doc.setFont("helvetica", "bold")
    doc.text("amIaTechBro.com", cx, 182, { align: "center" })

    doc.save("tech-bro-certificate.pdf")

  }

  return (
    <button
      onClick={handleDownload}
      className="px-8 py-3 border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-black transition-all text-sm tracking-widest uppercase whitespace-nowrap font-mono"
    >
      [ download certificate ]
    </button>
  )
}
