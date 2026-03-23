import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

const PAGE_HEIGHT = 297 // A4
const MARGIN = 15
const CONTENT_TOP = 15
const CONTENT_BOTTOM = 282
const SECTION_HEADER_SIZE = 11

/**
 * Get image dimensions from a data URL. Returns { width, height } or null.
 */
function getImageDimensions(imageData) {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight })
    img.onerror = () => resolve(null)
    img.src = imageData
  })
}

/**
 * Render report content with a given scale factor.
 * Returns the final Y position.
 */
function renderContent(doc, report, imageData, imageDims, format, scale) {
  const s = (v) => v * scale
  let y = CONTENT_TOP
  const pageWidth = doc.internal.pageSize.getWidth()
  const contentWidth = pageWidth - MARGIN * 2
  const maxImgWidth = contentWidth
  const maxImgHeight = s(70)

  // Title
  doc.setFontSize(s(16))
  doc.setTextColor(30, 64, 175)
  doc.text(report.title || 'Chest X-Ray Diagnostic Report', MARGIN, y)
  y += s(9)

  // Date, time, Report ID
  doc.setFontSize(s(10))
  doc.setTextColor(100, 116, 139)
  doc.text(`${report.date || ''} — ${report.time || ''}`, MARGIN, y)
  y += s(6)
  if (report.reportId) {
    doc.text(`Report ID: ${report.reportId}`, MARGIN, y)
    y += s(8)
  }
  doc.setTextColor(0, 0, 0)

  // X-ray image
  if (imageData && imageDims) {
    let imgWidth = maxImgWidth
    let imgHeight = maxImgHeight
    const aspectRatio = imageDims.height / imageDims.width
    imgHeight = maxImgWidth * aspectRatio
    if (imgHeight > maxImgHeight) {
      imgHeight = maxImgHeight
      imgWidth = maxImgHeight / aspectRatio
    }
    doc.addImage(imageData, format, MARGIN, y, imgWidth, imgHeight)
    y += imgHeight + s(8)
  }

  // Assessment Summary
  doc.setFontSize(s(SECTION_HEADER_SIZE))
  doc.setFont(undefined, 'bold')
  doc.text('Assessment Summary', MARGIN, y)
  y += s(6)
  doc.setFont(undefined, 'normal')
  doc.setFontSize(s(10))
  const summaryLines = doc.splitTextToSize(
    report.assessmentSummary || 'No summary available.',
    contentWidth
  )
  doc.text(summaryLines, MARGIN, y)
  y += summaryLines.length * s(5) + s(8)

  // Findings table
  if (report.findings?.length > 0) {
    doc.setFontSize(s(SECTION_HEADER_SIZE))
    doc.setFont(undefined, 'bold')
    doc.text('Findings', MARGIN, y)
    y += s(6)

    autoTable(doc, {
      startY: y,
      head: [['Condition', 'Likelihood', 'Confidence', 'Description']],
      body: report.findings.map((f) => [
        f.displayName,
        f.likelihood,
        `${f.confidencePct}%`,
        f.description,
      ]),
      theme: 'grid',
      headStyles: {
        fillColor: [30, 64, 175],
        textColor: 255,
        fontSize: Math.max(8, s(10)),
      },
      bodyStyles: { fontSize: Math.max(7, s(9)) },
      margin: { left: MARGIN },
      tableWidth: contentWidth,
      styles: { cellPadding: s(3) },
    })
    y = doc.lastAutoTable.finalY + s(8)
  }

  // Potential Symptoms
  if (report.potentialSymptoms && Object.keys(report.potentialSymptoms).length > 0) {
    doc.setFontSize(s(SECTION_HEADER_SIZE))
    doc.setFont(undefined, 'bold')
    doc.text('Potential Symptoms', MARGIN, y)
    y += s(6)
    doc.setFont(undefined, 'normal')
    doc.setFontSize(s(9))
    for (const [condition, symptoms] of Object.entries(report.potentialSymptoms)) {
      doc.text(condition + ':', MARGIN, y)
      y += s(5)
      symptoms.forEach((symptom) => {
        const lines = doc.splitTextToSize('• ' + symptom, contentWidth - 5)
        doc.text(lines, MARGIN + 5, y)
        y += lines.length * s(5)
      })
      y += s(3)
    }
    y += s(6)
  }

  // Recommendations
  if (report.recommendations?.length > 0) {
    doc.setFontSize(s(SECTION_HEADER_SIZE))
    doc.setFont(undefined, 'bold')
    doc.text('Recommendations', MARGIN, y)
    y += s(6)
    doc.setFont(undefined, 'normal')
    doc.setFontSize(s(9))
    report.recommendations.forEach((rec) => {
      const lines = doc.splitTextToSize('• ' + rec, contentWidth)
      doc.text(lines, MARGIN, y)
      y += lines.length * s(5) + s(2)
    })
    y += s(6)
  }

  // Disclaimer
  if (report.disclaimer) {
    doc.setFontSize(s(SECTION_HEADER_SIZE))
    doc.setFont(undefined, 'bold')
    doc.text('Disclaimer', MARGIN, y)
    y += s(5)
    doc.setFont(undefined, 'normal')
    doc.setFontSize(s(9))
    const disclaimerLines = doc.splitTextToSize(report.disclaimer, contentWidth)
    doc.text(disclaimerLines, MARGIN, y)
    y += disclaimerLines.length * s(5)
  }

  return y
}

/**
 * Generate a PDF from a diagnostic report and optional X-ray image.
 * Dynamically scales content to fit on one page.
 */
export async function generateReportPdf(report, imageData = null) {
  const doc = new jsPDF()
  const availableHeight = CONTENT_BOTTOM - CONTENT_TOP

  let imageDims = null
  const format = imageData?.startsWith('data:image/png') ? 'PNG' : 'JPEG'
  if (imageData) {
    imageDims = await getImageDimensions(imageData)
  }

  // Pass 1: measure with scale=1 (include image in measurement)
  const measuredY = renderContent(doc, report, imageData, imageDims, format, 1)

  // Pass 2: render with scaling to fit one page
  const scale = Math.min(1, availableHeight / measuredY)
  const doc2 = new jsPDF()
  renderContent(doc2, report, imageData, imageDims, format, scale)

  return doc2.output('blob')
}
