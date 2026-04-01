'use client'

import React, { useState, useEffect, useCallback } from 'react'
import dynamic from 'next/dynamic'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { generatePixPayload, generateTxId, formatCurrency } from '@/lib/pix'
import { Copy, CheckCircle, Loader2 } from 'lucide-react'

const QRCodeSVG = dynamic(() => import('qrcode.react').then((m) => m.QRCodeSVG), {
  ssr: false,
  loading: () => (
    <div className="w-48 h-48 bg-gray-100 rounded-xl flex items-center justify-center">
      <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
    </div>
  ),
})

type Escolha = 'menino' | 'menina'
type Step = 'form' | 'pix' | 'done'

interface BettingModalProps {
  open: boolean
  onClose: () => void
  initialChoice: Escolha
}

export default function BettingModal({ open, onClose, initialChoice }: BettingModalProps) {
  const [step, setStep] = useState<Step>('form')
  const [nome, setNome] = useState('')
  const [escolha, setEscolha] = useState<Escolha>(initialChoice)
  const [valor, setValor] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [pixPayload, setPixPayload] = useState('')
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const pixKey = process.env.NEXT_PUBLIC_PIX_KEY || ''
  const pixName = process.env.NEXT_PUBLIC_PIX_NAME || 'BebêBet'

  useEffect(() => {
    if (open) {
      setEscolha(initialChoice)
      setStep('form')
      setNome('')
      setValor('')
      setErrors({})
      setCopied(false)
      setPixPayload('')
    }
  }, [open, initialChoice])

  const validate = () => {
    const e: Record<string, string> = {}
    if (!nome.trim() || nome.trim().length < 2) e.nome = 'Informe seu nome completo'
    const v = parseFloat(valor.replace(',', '.'))
    if (isNaN(v) || v < 5) e.valor = 'Valor mínimo: R$ 5,00'
    return e
  }

  const handleConfirm = () => {
    const e = validate()
    if (Object.keys(e).length > 0) {
      setErrors(e)
      return
    }

    const v = parseFloat(valor.replace(',', '.'))
    const txid = generateTxId()
    const payload = generatePixPayload({
      pixKey,
      merchantName: pixName,
      amount: v,
      txid,
      description: `BebêBet ${escolha}`,
    })
    setPixPayload(payload)
    setStep('pix')
  }

  const handleCopyKey = () => {
    navigator.clipboard.writeText(pixKey).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  const handlePixDone = async () => {
    setSubmitting(true)
    try {
      const v = parseFloat(valor.replace(',', '.'))
      const res = await fetch('/api/apostas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: nome.trim(), escolha, valor: v }),
      })
      if (!res.ok) throw new Error('Erro ao salvar aposta')
      setStep('done')
    } catch {
      alert('Ocorreu um erro. Tente novamente.')
    } finally {
      setSubmitting(false)
    }
  }

  const valorNum = parseFloat(valor.replace(',', '.')) || 0

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md">
        {/* ─── STEP: FORM ─── */}
        {step === 'form' && (
          <>
            <DialogHeader>
              <DialogTitle>
                {escolha === 'menino' ? '💙 Apostar em Menino' : '💗 Apostar em Menina'}
              </DialogTitle>
              <DialogDescription>
                Preencha os dados abaixo. Mínimo R$ 5,00.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
              {/* Nome */}
              <div className="space-y-1.5">
                <Label htmlFor="nome">Seu nome</Label>
                <Input
                  id="nome"
                  placeholder="Ex: Ana Silva"
                  value={nome}
                  onChange={(e) => {
                    setNome(e.target.value)
                    setErrors((prev) => ({ ...prev, nome: '' }))
                  }}
                  autoComplete="name"
                />
                {errors.nome && <p className="text-xs text-red-500">{errors.nome}</p>}
              </div>

              {/* Escolha */}
              <div className="space-y-1.5">
                <Label>Aposto em</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setEscolha('menino')}
                    className={`py-3 rounded-xl border-2 font-bold text-base transition-all duration-150
                      ${
                        escolha === 'menino'
                          ? 'border-blue-baby bg-blue-light text-blue-dark shadow-md scale-[1.02]'
                          : 'border-gray-200 bg-white text-gray-500 hover:border-blue-baby'
                      }`}
                  >
                    💙 Menino
                  </button>
                  <button
                    type="button"
                    onClick={() => setEscolha('menina')}
                    className={`py-3 rounded-xl border-2 font-bold text-base transition-all duration-150
                      ${
                        escolha === 'menina'
                          ? 'border-pink-baby bg-pink-light text-pink-dark shadow-md scale-[1.02]'
                          : 'border-gray-200 bg-white text-gray-500 hover:border-pink-baby'
                      }`}
                  >
                    💗 Menina
                  </button>
                </div>
              </div>

              {/* Valor */}
              <div className="space-y-1.5">
                <Label htmlFor="valor">Valor da aposta (R$)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                    R$
                  </span>
                  <Input
                    id="valor"
                    type="number"
                    min="5"
                    step="1"
                    placeholder="20"
                    value={valor}
                    onChange={(e) => {
                      setValor(e.target.value)
                      setErrors((prev) => ({ ...prev, valor: '' }))
                    }}
                    className="pl-9"
                    inputMode="decimal"
                  />
                </div>
                {errors.valor && <p className="text-xs text-red-500">{errors.valor}</p>}
                {/* Quick values */}
                <div className="flex gap-2 flex-wrap">
                  {[5, 10, 20, 50].map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setValor(String(v))}
                      className="text-xs px-3 py-1 rounded-lg bg-cream-dark text-gray-600 hover:bg-gray-200 font-semibold transition-colors"
                    >
                      R$ {v}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <Button
              onClick={handleConfirm}
              className="w-full"
              variant={escolha === 'menino' ? 'blue' : 'default'}
              size="lg"
            >
              Confirmar aposta →
            </Button>
          </>
        )}

        {/* ─── STEP: PIX ─── */}
        {step === 'pix' && (
          <>
            <DialogHeader>
              <DialogTitle>Pague via PIX 📱</DialogTitle>
              <DialogDescription>
                Escaneie o QR Code ou copie a chave PIX abaixo
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col items-center gap-4 py-2">
              {/* Summary */}
              <div
                className={`w-full rounded-xl p-3 text-center border-2 ${
                  escolha === 'menino'
                    ? 'bg-blue-light border-blue-baby'
                    : 'bg-pink-light border-pink-baby'
                }`}
              >
                <p className="text-sm text-gray-600">
                  <span className="font-bold">{nome}</span> apostando em{' '}
                  <span className="font-bold">
                    {escolha === 'menino' ? 'Menino 💙' : 'Menina 💗'}
                  </span>
                </p>
                <p className="text-2xl font-extrabold font-playfair text-gray-800 mt-1">
                  {formatCurrency(valorNum)}
                </p>
              </div>

              {/* QR Code */}
              {pixPayload && (
                <div className="bg-white p-3 rounded-2xl shadow-md border border-gray-100">
                  <QRCodeSVG
                    value={pixPayload}
                    size={192}
                    level="M"
                    bgColor="#ffffff"
                    fgColor="#1a1a1a"
                  />
                </div>
              )}

              {/* PIX Key */}
              <div className="w-full space-y-1.5">
                <Label>Chave PIX</Label>
                <div className="flex gap-2">
                  <Input value={pixKey} readOnly className="text-sm bg-gray-50 flex-1" />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={handleCopyKey}
                    title="Copiar chave PIX"
                  >
                    {copied ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                {copied && (
                  <p className="text-xs text-green-600 font-semibold">Chave copiada! ✓</p>
                )}
              </div>

              <p className="text-xs text-gray-400 text-center">
                Beneficiário: <strong>{pixName}</strong>
              </p>
            </div>

            <Button
              onClick={handlePixDone}
              className="w-full"
              variant="success"
              size="lg"
              disabled={submitting}
            >
              {submitting ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                '✓ Já fiz o PIX!'
              )}
            </Button>
          </>
        )}

        {/* ─── STEP: DONE ─── */}
        {step === 'done' && (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <div className="text-6xl animate-bounce-in">🎊</div>
            <h3 className="font-playfair text-2xl font-bold text-gray-800">
              Aposta registrada!
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
              Sua aposta será confirmada em breve após a verificação do pagamento.{' '}
              <span className="text-pink-dark font-bold">💕</span>
            </p>
            <div
              className={`rounded-xl p-3 border-2 w-full ${
                escolha === 'menino'
                  ? 'bg-blue-light border-blue-baby'
                  : 'bg-pink-light border-pink-baby'
              }`}
            >
              <p className="font-semibold text-gray-700">
                {nome} • {escolha === 'menino' ? 'Menino 💙' : 'Menina 💗'} •{' '}
                {formatCurrency(valorNum)}
              </p>
            </div>
            <Button onClick={onClose} variant="outline" className="mt-2">
              Fechar
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
