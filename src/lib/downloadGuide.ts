import { pdf } from '@react-pdf/renderer'
import { createElement } from 'react'
import InvestorGuidePDF from './InvestorGuidePDF'

export async function downloadInvestorGuide(recipientName: string): Promise<void> {
  const doc = createElement(InvestorGuidePDF)
  const blob = await pdf(doc).toBlob()
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `Parva-Realty-Indian-Investors-Guide-Dubai-2025.pdf`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
