import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { memberApi } from '@/services/member'
import type { MemberType } from '@/services/member'
import './SignupPage.css'

/* ── 유형 메타 ───────────────────────────────── */
const MEMBER_TYPE_META: Record<MemberType, { label: string; icon: string; desc: string }> = {
  MEMBER:  { label: '일반회원',    icon: '👕', desc: '코디 추천을 받는 계정' },
  STYLIST: { label: '스타일리스트', icon: '✂️', desc: '코디를 제안하는 계정' },
  SELLER:  { label: '셀러',        icon: '🛍️', desc: '상품을 판매하는 계정' },
}

function parseMemberType(raw: string | null): MemberType {
  if (raw === 'STYLIST' || raw === 'SELLER') return raw
  return 'MEMBER'
}

/* ── 유틸 ────────────────────────────────────── */
function formatPhone(value: string) {
  const d = value.replace(/\D/g, '')
  if (d.length <= 3) return d
  if (d.length <= 7) return `${d.slice(0, 3)}-${d.slice(3)}`
  return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7, 11)}`
}

const PW_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^_\-])[A-Za-z\d@$!%*#?&^_\-]{8,}$/

/* ── 타입 ────────────────────────────────────── */
interface SignupForm {
  nickname: string
  name: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  gender: 'MALE' | 'FEMALE' | ''
  birth: string
  recommendationCode: string
}

type FormErrors = Partial<Record<keyof SignupForm, string>>
type CheckStatus = 'idle' | 'checking' | 'ok' | 'error'

const INITIAL: SignupForm = {
  nickname: '', name: '', email: '', phone: '',
  password: '', confirmPassword: '', gender: '', birth: '',
  recommendationCode: '',
}

/* ── 컴포넌트 ─────────────────────────────────── */
export default function SignupPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const memberType = parseMemberType(searchParams.get('type'))
  const typeMeta = MEMBER_TYPE_META[memberType]

  const [form, setForm] = useState<SignupForm>(INITIAL)
  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)

  const [emailStatus, setEmailStatus] = useState<CheckStatus>('idle')
  const [nicknameStatus, setNicknameStatus] = useState<CheckStatus>('idle')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showTypeSheet, setShowTypeSheet] = useState(false)

  const set = (key: keyof SignupForm, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: undefined }))
    if (key === 'email') setEmailStatus('idle')
    if (key === 'nickname') setNicknameStatus('idle')
  }

  const checkNickname = async () => {
    if (!form.nickname.trim()) {
      setErrors(prev => ({ ...prev, nickname: '닉네임을 입력해주세요.' }))
      return
    }
    setNicknameStatus('checking')
    try {
      await memberApi.checkNickname(form.nickname)
      setNicknameStatus('ok')
      setErrors(prev => ({ ...prev, nickname: undefined }))
    } catch {
      setNicknameStatus('error')
      setErrors(prev => ({ ...prev, nickname: '이미 사용 중인 닉네임이에요.' }))
    }
  }

  const checkEmail = async () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setErrors(prev => ({ ...prev, email: '올바른 이메일 형식이 아니에요.' }))
      return
    }
    setEmailStatus('checking')
    try {
      await memberApi.checkEmail(form.email)
      setEmailStatus('ok')
      setErrors(prev => ({ ...prev, email: undefined }))
    } catch {
      setEmailStatus('error')
      setErrors(prev => ({ ...prev, email: '이미 사용 중인 이메일이에요.' }))
    }
  }

  const validate = (): boolean => {
    const e: FormErrors = {}
    if (!form.nickname.trim()) e.nickname = '닉네임을 입력해주세요.'
    else if (nicknameStatus === 'idle') e.nickname = '닉네임 중복 확인을 해주세요.'
    else if (nicknameStatus === 'error') e.nickname = '이미 사용 중인 닉네임이에요.'

    if (!form.name.trim()) e.name = '이름을 입력해주세요.'

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = '올바른 이메일 형식이 아니에요.'
    else if (emailStatus === 'idle') e.email = '이메일 중복 확인을 해주세요.'
    else if (emailStatus === 'error') e.email = '이미 사용 중인 이메일이에요.'

    if (form.phone.replace(/-/g, '').length < 11) e.phone = '전화번호 11자리를 입력해주세요.'
    if (!PW_REGEX.test(form.password)) e.password = '영문, 숫자, 특수문자를 포함해 8자 이상 입력해주세요.'
    if (form.password !== form.confirmPassword) e.confirmPassword = '비밀번호가 일치하지 않아요.'
    if (!form.gender) e.gender = '성별을 선택해주세요.'
    if (!form.birth) e.birth = '생년월일을 선택해주세요.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      await memberApi.signUp({
        memberType,
        nickname: form.nickname,
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        confirmPassword: form.confirmPassword,
        gender: form.gender as 'MALE' | 'FEMALE',
        birth: form.birth,
        ...(form.recommendationCode ? { recommendationCode: form.recommendationCode } : {}),
      })
      navigate('/', { replace: true })
    } catch (err: unknown) {
      const res = (err as { response?: { status?: number; data?: { message?: string } } })?.response
      if (res?.status === 409) {
        const msg = res.data?.message ?? ''
        if (msg.includes('이메일')) setErrors(prev => ({ ...prev, email: msg }))
        else if (msg.includes('닉네임')) setErrors(prev => ({ ...prev, nickname: msg }))
      }
    } finally {
      setLoading(false)
    }
  }

  const pwMatch = form.confirmPassword.length > 0 && form.password === form.confirmPassword

  return (
    <div className="signup">

      <header className="signup__header">
        <button className="signup__back" type="button" onClick={() => navigate(-1)}>
          <BackIcon />
        </button>
        <h1 className="signup__header-title">회원가입</h1>
        <span className="signup__header-spacer" />
      </header>

      {/* 회원 유형 배너 */}
      <div className="signup__type-banner">
        <span className="signup__type-icon">{typeMeta.icon}</span>
        <div className="signup__type-text">
          <span className="signup__type-label">{typeMeta.label}</span>
          <span className="signup__type-desc">{typeMeta.desc}</span>
        </div>
        <button
          type="button"
          className="signup__type-change"
          onClick={() => setShowTypeSheet(true)}
        >
          변경
        </button>
      </div>

      <form id="signup-form" className="signup__form" onSubmit={handleSubmit} noValidate>

        {/* 기본 정보 */}
        <section className="form-section">
          <p className="form-section__label">기본 정보</p>

          <div className="field">
            <label className="field__label">닉네임</label>
            <div className="field__input-row">
              <input
                className={`field__input${errors.nickname ? ' field__input--error' : nicknameStatus === 'ok' ? ' field__input--ok' : ''}`}
                type="text"
                placeholder="fitmate"
                value={form.nickname}
                onChange={e => set('nickname', e.target.value)}
                autoCapitalize="none"
                autoCorrect="off"
              />
              <button
                type="button"
                className={`check-btn${nicknameStatus === 'ok' ? ' check-btn--ok' : ''}`}
                onClick={checkNickname}
                disabled={nicknameStatus === 'checking'}
              >
                {nicknameStatus === 'checking' ? '확인 중' : nicknameStatus === 'ok' ? '확인됨 ✓' : '중복확인'}
              </button>
            </div>
            {errors.nickname
              ? <p className="field__error">{errors.nickname}</p>
              : nicknameStatus === 'ok' && <p className="field__ok">사용 가능한 닉네임이에요.</p>}
          </div>

          <div className="field">
            <label className="field__label">이름</label>
            <input
              className={`field__input${errors.name ? ' field__input--error' : ''}`}
              type="text"
              placeholder="홍길동"
              value={form.name}
              onChange={e => set('name', e.target.value)}
            />
            {errors.name && <p className="field__error">{errors.name}</p>}
          </div>
        </section>

        {/* 연락처 */}
        <section className="form-section">
          <p className="form-section__label">연락처</p>

          <div className="field">
            <label className="field__label">이메일</label>
            <div className="field__input-row">
              <input
                className={`field__input${errors.email ? ' field__input--error' : emailStatus === 'ok' ? ' field__input--ok' : ''}`}
                type="email"
                placeholder="example@email.com"
                value={form.email}
                onChange={e => set('email', e.target.value)}
                autoCapitalize="none"
                inputMode="email"
              />
              <button
                type="button"
                className={`check-btn${emailStatus === 'ok' ? ' check-btn--ok' : ''}`}
                onClick={checkEmail}
                disabled={emailStatus === 'checking'}
              >
                {emailStatus === 'checking' ? '확인 중' : emailStatus === 'ok' ? '확인됨 ✓' : '중복확인'}
              </button>
            </div>
            {errors.email
              ? <p className="field__error">{errors.email}</p>
              : emailStatus === 'ok'
                ? <p className="field__ok">사용 가능한 이메일이에요.</p>
                : <p className="field__hint">로그인 시 사용할 이메일이에요.</p>}
          </div>

          <div className="field">
            <label className="field__label">전화번호</label>
            <input
              className={`field__input${errors.phone ? ' field__input--error' : ''}`}
              type="tel"
              placeholder="010-0000-0000"
              value={form.phone}
              onChange={e => set('phone', formatPhone(e.target.value))}
              maxLength={13}
              inputMode="numeric"
            />
            {errors.phone && <p className="field__error">{errors.phone}</p>}
          </div>
        </section>

        {/* 비밀번호 */}
        <section className="form-section">
          <p className="form-section__label">비밀번호</p>

          <div className="field">
            <label className="field__label">비밀번호</label>
            <div className="field__pw-wrap">
              <input
                className={`field__input${errors.password ? ' field__input--error' : ''}`}
                type={showPassword ? 'text' : 'password'}
                placeholder="영문, 숫자, 특수문자 포함 8자 이상"
                value={form.password}
                onChange={e => set('password', e.target.value)}
              />
              <button type="button" className="pw-toggle" onClick={() => setShowPassword(p => !p)}>
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            {errors.password
              ? <p className="field__error">{errors.password}</p>
              : <p className="field__hint">영문, 숫자, 특수문자(@$!%*#?&^_-)를 모두 포함해주세요.</p>}
          </div>

          <div className="field">
            <label className="field__label">비밀번호 확인</label>
            <div className="field__pw-wrap">
              <input
                className={`field__input${errors.confirmPassword ? ' field__input--error' : pwMatch ? ' field__input--ok' : ''}`}
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="비밀번호를 한 번 더 입력해주세요"
                value={form.confirmPassword}
                onChange={e => set('confirmPassword', e.target.value)}
              />
              <button type="button" className="pw-toggle" onClick={() => setShowConfirmPassword(p => !p)}>
                {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            {errors.confirmPassword
              ? <p className="field__error">{errors.confirmPassword}</p>
              : pwMatch && <p className="field__ok">비밀번호가 일치해요. ✓</p>}
          </div>
        </section>

        {/* 추가 정보 */}
        <section className="form-section">
          <p className="form-section__label">추가 정보</p>

          <div className="field">
            <label className="field__label">성별</label>
            <div className="gender-group">
              <button type="button"
                className={`gender-btn${form.gender === 'MALE' ? ' gender-btn--active' : ''}`}
                onClick={() => set('gender', 'MALE')}>
                남성
              </button>
              <button type="button"
                className={`gender-btn${form.gender === 'FEMALE' ? ' gender-btn--active' : ''}`}
                onClick={() => set('gender', 'FEMALE')}>
                여성
              </button>
            </div>
            {errors.gender && <p className="field__error">{errors.gender}</p>}
          </div>

          <div className="field">
            <label className="field__label">생년월일</label>
            <input
              className={`field__input${errors.birth ? ' field__input--error' : ''}`}
              type="date"
              value={form.birth}
              onChange={e => set('birth', e.target.value)}
              max={new Date().toISOString().split('T')[0]}
            />
            {errors.birth && <p className="field__error">{errors.birth}</p>}
          </div>

          <div className="field">
            <label className="field__label">
              추천인 코드
              <span className="field__label-optional"> (선택)</span>
            </label>
            <input
              className="field__input"
              type="text"
              placeholder="추천인 코드를 입력해주세요"
              value={form.recommendationCode}
              onChange={e => set('recommendationCode', e.target.value)}
              autoCapitalize="characters"
            />
          </div>
        </section>

      </form>

      <div className="signup__footer">
        <button
          type="submit"
          form="signup-form"
          className="btn btn--primary signup__submit"
          disabled={loading}
        >
          {loading ? '가입 중...' : '가입하기 →'}
        </button>
        <p className="signup__login-hint">
          이미 계정이 있으신가요? <Link to="/login">로그인</Link>
        </p>
      </div>

      {/* 유형 변경 바텀시트 */}
      {showTypeSheet && (
        <MemberTypeSheet
          currentType={memberType}
          onSelect={(type) => {
            setShowTypeSheet(false)
            navigate(`/signup?type=${type}`, { replace: true })
          }}
          onClose={() => setShowTypeSheet(false)}
        />
      )}

    </div>
  )
}

/* ── 유형 변경 바텀시트 ──────────────────────── */
interface TypeSheetProps {
  currentType: MemberType
  onSelect: (type: MemberType) => void
  onClose: () => void
}

function MemberTypeSheet({ currentType, onSelect, onClose }: TypeSheetProps) {
  const others = (Object.keys(MEMBER_TYPE_META) as MemberType[]).filter(t => t !== currentType)

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="type-sheet" role="dialog" aria-modal="true">
        <div className="type-sheet__header">
          <p className="type-sheet__title">회원 유형 변경</p>
          <button className="type-sheet__close" type="button" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <p className="type-sheet__sub">변경할 유형을 선택해주세요.</p>
        <div className="type-sheet__list">
          {others.map(type => {
            const meta = MEMBER_TYPE_META[type]
            return (
              <button
                key={type}
                className="type-sheet__item"
                type="button"
                onClick={() => onSelect(type)}
              >
                <span className="type-sheet__item-icon">{meta.icon}</span>
                <span className="type-sheet__item-text">
                  <span className="type-sheet__item-label">{meta.label}</span>
                  <span className="type-sheet__item-desc">{meta.desc}</span>
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}

/* ── 아이콘 ───────────────────────────────────── */
function BackIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 12H5M12 5l-7 7 7 7" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  )
}

function EyeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  )
}

function EyeOffIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  )
}
