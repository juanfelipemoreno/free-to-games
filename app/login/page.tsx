'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import styles from './login.module.css'

const DEMO_CREDENTIALS = [
  { email: 'admin@example.com', password: 'admin123', role: 'Admin' },
  { email: 'user@example.com', password: 'user123', role: 'Usuario' },
  { email: 'demo@test.com', password: 'demo123', role: 'Demo' }
]

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const { login, error, clearError, isAuthenticated } = useAuth()
  const router = useRouter()

  // Redireccionar si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/catalogo')
    }
  }, [isAuthenticated, router])

  const fillCredentials = (credEmail: string, credPassword: string) => {
    setEmail(credEmail)
    setPassword(credPassword)
    clearError()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()

    if (!email || !password) {
      return
    }

    setIsSubmitting(true)

    try {
      await login(email, password)
      setShowSuccess(true)
      setTimeout(() => {
        router.push('/catalogo')
      }, 1000)
    } catch {
      // El error ya está en el contexto
      setIsSubmitting(false)
    }
  }

  return (
    <div className={styles.loginRoot}>
      {/* Orbs de glow */}
      <div className={`${styles.glowOrb} ${styles.orbBlue}`}></div>
      <div className={`${styles.glowOrb} ${styles.orbIndigo}`}></div>

      <div className={styles.wrapper}>
        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.brandTitle}>
            GAME <span>FREE</span>
          </div>
          <div className={styles.brandSub}>Sistema de Autenticación</div>
        </div>

        {/* Card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitle}>Inicia sesión</div>
            <div className={styles.cardSub}>Accede a tu cuenta para continuar</div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Email</label>
              <input
                id="inp-email"
                type="email"
                className={styles.formInput}
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Input */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Contraseña</label>
              <input
                id="inp-pass"
                type="password"
                className={styles.formInput}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Error Box */}
            {error && (
              <div className={`${styles.errorBox} ${error ? styles.show : ''}`}>
                {error}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isSubmitting || showSuccess}
              className={`${styles.btnLogin} ${showSuccess ? styles.success : ''}`}
              id="btn-login"
            >
              {showSuccess ? '✓ Acceso concedido' : isSubmitting ? 'Autenticando...' : 'Iniciar Sesión'}
            </button>
          </form>

          {/* Divider */}
          <div className={styles.divider}>
            <div className={styles.dividerLine}></div>
            <div className={styles.dividerText}>O usa credenciales de prueba</div>
            <div className={styles.dividerLine}></div>
          </div>

          {/* Demo Credentials */}
          <div className={styles.creds}>
            {DEMO_CREDENTIALS.map((cred) => (
              <button
                key={cred.email}
                type="button"
                className={styles.credBtn}
                onClick={() => fillCredentials(cred.email, cred.password)}
              >
                <span className={styles.credRole}>{cred.role}</span>
                <span className={styles.credUser}>{cred.password}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer Link */}
        <Link href="/" className={styles.footerLink}>
          <span>←</span> Volver al inicio
        </Link>
      </div>
    </div>
  )
}
