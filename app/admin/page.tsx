'use client'

import React, { useState, useEffect, useCallback } from 'react'
import type { Aposta } from '@/lib/supabase'
import { formatCurrency } from '@/lib/pix'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CheckCircle, RefreshCw, Lock, Trophy, Loader2 } from 'lucide-react'

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [pwError, setPwError] = useState('')
  const [apostas, setApostas] = useState<Aposta[]>([])
  const [loading, setLoading] = useState(false)
  const [confirmingId, setConfirmingId] = useState<string | null>(null)
  const [revealing, setRevealing] = useState(false)
  const [currentResult, setCurrentResult] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)

  const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || ''

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('bebebet_admin')
      if (stored === 'true') setAuthenticated(true)
    }
  }, [])

  const fetchApostas = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/apostas', {
        headers: { 'x-admin-password': adminPassword },
      })
      const json = await res.json()
      if (json.apostas) setApostas(json.apostas)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [adminPassword])

  const fetchConfig = useCallback(async () => {
    const res = await fetch('/api/config')
    const json = await res.json()
    if (json.config?.resultado) setCurrentResult(json.config.resultado)
  }, [])

  useEffect(() => {
    if (authenticated) {
      fetchApostas()
      fetchConfig()
    }
  }, [authenticated, fetchApostas, fetchConfig])

  const handleLogin = () => {
    if (!adminPassword) {
      setPwError('Variável NEXT_PUBLIC_ADMIN_PASSWORD não configurada')
      return
    }
    if (password === adminPassword) {
      sessionStorage.setItem('bebebet_admin', 'true')
      setAuthenticated(true)
    } else {
      setPwError('Senha incorreta!')
      setPassword('')
    }
  }

  const handleConfirm = async (id: string) => {
    setConfirmingId(id)
    try {
      const res = await fetch('/api/admin/confirmar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': adminPassword,
        },
        body: JSON.stringify({ id }),
      })
      if (res.ok) {
        setApostas((prev) =>
          prev.map((a) => (a.id === id ? { ...a, status: 'confirmado' } : a))
        )
      }
    } finally {
      setConfirmingId(null)
    }
  }

  const handleReveal = async (resultado: 'menino' | 'menina') => {
    if (
      !confirm(
        `Confirma revelar o resultado como ${resultado === 'menino' ? 'MENINO 💙' : 'MENINA 💗'}?\n\nEsta ação irá ativar a página de revelação para todos!`
      )
    )
      return

    setRevealing(true)
    try {
      const res = await fetch('/api/admin/revelar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': adminPassword,
        },
        body: JSON.stringify({ resultado }),
      })
      if (res.ok) {
        setCurrentResult(resultado)
        alert(`Revelado! É ${resultado === 'menino' ? 'MENINO 💙' : 'MENINA 💗'}!`)
      }
    } finally {
      setRevealing(false)
    }
  }

  const handleRefresh = () => {
    setRefreshing(true)
    fetchApostas()
  }

  // ─── LOGIN ────────────────────────────────────────────────────────────────
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm border border-cream-dark">
          <div className="text-center mb-6">
            <Lock className="w-10 h-10 text-pink-baby mx-auto mb-2" />
            <h1 className="font-playfair text-2xl font-bold text-gray-800">
              BebêBet Admin
            </h1>
            <p className="text-gray-500 text-sm mt-1">Área restrita</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="pw">Senha</Label>
              <Input
                id="pw"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setPwError('')
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                autoFocus
              />
              {pwError && <p className="text-xs text-red-500">{pwError}</p>}
            </div>
            <Button onClick={handleLogin} className="w-full" size="lg">
              Entrar
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // ─── Summary ──────────────────────────────────────────────────────────────
  const confirmed = apostas.filter((a) => a.status === 'confirmado')
  const pending = apostas.filter((a) => a.status === 'pendente')
  const menino = confirmed.filter((a) => a.escolha === 'menino')
  const menina = confirmed.filter((a) => a.escolha === 'menina')
  const totalGeral = confirmed.reduce((s, a) => s + a.valor, 0)
  const totalMenino = menino.reduce((s, a) => s + a.valor, 0)
  const totalMenina = menina.reduce((s, a) => s + a.valor, 0)

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-playfair text-3xl font-bold text-gray-800">
              BebêBet <span className="text-pink-baby">Admin</span>
            </h1>
            <p className="text-gray-500 text-sm mt-1">Painel de gerenciamento</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 border border-cream-dark shadow-sm text-center">
            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Total Geral</p>
            <p className="font-playfair text-xl font-bold text-gray-800">
              {formatCurrency(totalGeral)}
            </p>
            <p className="text-xs text-gray-400">{confirmed.length} apostas</p>
          </div>
          <div className="bg-blue-light rounded-xl p-4 border border-blue-baby shadow-sm text-center">
            <p className="text-xs text-blue-dark uppercase font-semibold mb-1">💙 Menino</p>
            <p className="font-playfair text-xl font-bold text-blue-dark">
              {formatCurrency(totalMenino)}
            </p>
            <p className="text-xs text-blue-dark/60">{menino.length} apostas</p>
          </div>
          <div className="bg-pink-light rounded-xl p-4 border border-pink-baby shadow-sm text-center">
            <p className="text-xs text-pink-dark uppercase font-semibold mb-1">💗 Menina</p>
            <p className="font-playfair text-xl font-bold text-pink-dark">
              {formatCurrency(totalMenina)}
            </p>
            <p className="text-xs text-pink-dark/60">{menina.length} apostas</p>
          </div>
          <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200 shadow-sm text-center">
            <p className="text-xs text-yellow-700 uppercase font-semibold mb-1">Pendentes</p>
            <p className="font-playfair text-xl font-bold text-yellow-700">{pending.length}</p>
            <p className="text-xs text-yellow-500">aguardando PIX</p>
          </div>
        </div>

        {/* Reveal section */}
        <div className="bg-white rounded-2xl border border-cream-dark shadow-sm p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <h2 className="font-playfair text-xl font-bold text-gray-800">Revelar Resultado</h2>
          </div>

          {currentResult ? (
            <div
              className={`rounded-xl p-4 text-center border-2 ${
                currentResult === 'menino'
                  ? 'bg-blue-light border-blue-baby'
                  : 'bg-pink-light border-pink-baby'
              }`}
            >
              <p className="font-playfair text-2xl font-bold">
                {currentResult === 'menino' ? '💙 É MENINO!' : '💗 É MENINA!'}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Resultado já revelado. Visite{' '}
                <a href="/revelacao" className="underline font-semibold">
                  /revelacao
                </a>
              </p>
            </div>
          ) : (
            <div>
              <p className="text-gray-600 text-sm mb-4">
                Clique para revelar o resultado. Esta ação ativa a página de revelação para todos
                os convidados.
              </p>
              <div className="flex gap-3">
                <Button
                  variant="blue"
                  onClick={() => handleReveal('menino')}
                  disabled={revealing}
                  className="flex-1"
                  size="lg"
                >
                  {revealing ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : '💙'}
                  É Menino!
                </Button>
                <Button
                  onClick={() => handleReveal('menina')}
                  disabled={revealing}
                  className="flex-1"
                  size="lg"
                >
                  {revealing ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : '💗'}
                  É Menina!
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Bets table */}
        <div className="bg-white rounded-2xl border border-cream-dark shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-cream-dark">
            <h2 className="font-playfair text-xl font-bold text-gray-800">
              Todas as apostas ({apostas.length})
            </h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-4 border-pink-baby border-t-transparent rounded-full animate-spin" />
            </div>
          ) : apostas.length === 0 ? (
            <p className="text-center text-gray-400 py-12">Nenhuma aposta ainda.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Escolha</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Ação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {apostas.map((aposta) => (
                  <TableRow key={aposta.id}>
                    <TableCell className="font-semibold text-gray-800">
                      {aposta.nome}
                    </TableCell>
                    <TableCell>
                      <Badge variant={aposta.escolha === 'menino' ? 'blue' : 'default'}>
                        {aposta.escolha === 'menino' ? '💙 Menino' : '💗 Menina'}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-bold text-gray-800">
                      {formatCurrency(aposta.valor)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          aposta.status === 'confirmado' ? 'success' : 'warning'
                        }
                      >
                        {aposta.status === 'confirmado' ? '✓ Confirmado' : '⏳ Pendente'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-500 text-sm">
                      {format(parseISO(aposta.created_at), "dd/MM/yy HH:mm", {
                        locale: ptBR,
                      })}
                    </TableCell>
                    <TableCell>
                      {aposta.status === 'pendente' && (
                        <Button
                          size="sm"
                          variant="success"
                          onClick={() => handleConfirm(aposta.id)}
                          disabled={confirmingId === aposta.id}
                        >
                          {confirmingId === aposta.id ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : (
                            <>
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Confirmar PIX
                            </>
                          )}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        {/* Footer link */}
        <div className="text-center mt-6">
          <a href="/" className="text-sm text-gray-400 hover:text-gray-600 underline">
            ← Voltar ao site
          </a>
        </div>
      </div>
    </div>
  )
}
