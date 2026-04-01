/**
 * Brazilian PIX QR Code payload generator
 * Implements the BR Code (EMV/BACEN) standard
 */

function crc16(str: string): string {
  let crc = 0xffff
  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i) << 8
    for (let j = 0; j < 8; j++) {
      crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) : crc << 1
      crc &= 0xffff
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0')
}

function tlv(id: string, value: string): string {
  const len = value.length.toString().padStart(2, '0')
  return `${id}${len}${value}`
}

function sanitize(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .trim()
}

export interface PixParams {
  pixKey: string
  merchantName: string
  merchantCity?: string
  amount: number
  txid?: string
  description?: string
}

export function generatePixPayload({
  pixKey,
  merchantName,
  merchantCity = 'SAO PAULO',
  amount,
  txid,
  description,
}: PixParams): string {
  const safeName = sanitize(merchantName).substring(0, 25) || 'BEBEBET'
  const safeCity = sanitize(merchantCity).substring(0, 15).toUpperCase() || 'SAO PAULO'
  const safeTxid = (txid || generateTxId()).substring(0, 25).padEnd(1, '0')

  const merchantInfo =
    tlv('00', 'br.gov.bcb.pix') +
    tlv('01', pixKey) +
    (description ? tlv('02', description.substring(0, 72)) : '')

  const additionalData = tlv('62', tlv('05', safeTxid))

  const body = [
    tlv('00', '01'),
    tlv('26', merchantInfo),
    tlv('52', '0000'),
    tlv('53', '986'),
    tlv('54', amount.toFixed(2)),
    tlv('58', 'BR'),
    tlv('59', safeName),
    tlv('60', safeCity),
    additionalData,
    '6304',
  ].join('')

  return body + crc16(body)
}

export function generateTxId(): string {
  return Math.random().toString(36).substring(2, 15).toUpperCase() +
    Math.random().toString(36).substring(2, 12).toUpperCase()
}

export function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
