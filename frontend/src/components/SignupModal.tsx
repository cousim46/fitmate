import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './SignupModal.css'

export type MemberType = 'MEMBER' | 'STYLIST' | 'SELLER'

interface Props {
  onClose: () => void
}

type Step = 'type' | 'method'

interface MemberTypeOption {
  type: MemberType
  label: string
  desc: string
  icon: string
  badge: string
}

const MEMBER_TYPES: MemberTypeOption[] = [
  {
    type: 'MEMBER',
    label: '일반회원',
    desc: '스타일리스트에게 코디 추천을 받아요',
    icon: '👕',
    badge: '추천 받기',
  },
  {
    type: 'STYLIST',
    label: '스타일리스트',
    desc: '직접 코디를 제안하고 활동해요',
    icon: '✂️',
    badge: '코디 제안',
  },
  {
    type: 'SELLER',
    label: '셀러',
    desc: '상품을 등록하고 판매해요',
    icon: '🛍️',
    badge: '상품 판매',
  },
]

export default function SignupModal({ onClose }: Props) {
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>('type')
  const [selectedType, setSelectedType] = useState<MemberType | null>(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const handleTypeSelect = (type: MemberType) => {
    setSelectedType(type)
    setStep('method')
  }

  const handleBack = () => {
    setStep('type')
    setSelectedType(null)
  }

  const goEmailSignup = () => {
    if (!selectedType) return
    onClose()
    navigate(`/signup?type=${selectedType}`)
  }

  const goKakao = () => {
    // TODO: 카카오 OAuth 연동 — memberType 파라미터 포함 예정
    onClose()
    alert('카카오 로그인은 준비 중이에요.')
  }

  const selectedInfo = MEMBER_TYPES.find(m => m.type === selectedType)

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />

      <div className="signup-modal" role="dialog" aria-modal="true">
        <div className="signup-modal__handle" />

        {/* Step 1: 회원 유형 선택 */}
        {step === 'type' && (
          <>
            <div className="signup-modal__head">
              <h2 className="signup-modal__title">어떤 역할로 시작할까요?</h2>
              <p className="signup-modal__sub">
                가입 유형을 선택하면 맞춤 기능을 사용할 수 있어요.
              </p>
            </div>

            <div className="signup-modal__type-grid">
              {MEMBER_TYPES.map(opt => (
                <button
                  key={opt.type}
                  className="type-card"
                  onClick={() => handleTypeSelect(opt.type)}
                >
                  <span className="type-card__icon">{opt.icon}</span>
                  <span className="type-card__badge">{opt.badge}</span>
                  <span className="type-card__label">{opt.label}</span>
                  <span className="type-card__desc">{opt.desc}</span>
                </button>
              ))}
            </div>

            <button className="signup-modal__cancel" onClick={onClose}>
              취소
            </button>
          </>
        )}

        {/* Step 2: 가입 방법 선택 */}
        {step === 'method' && selectedInfo && (
          <>
            <div className="signup-modal__head">
              <button className="signup-modal__back" onClick={handleBack}>
                <BackIcon />
              </button>
              <div className="signup-modal__selected-type">
                <span className="signup-modal__selected-icon">{selectedInfo.icon}</span>
                <span className="signup-modal__selected-label">{selectedInfo.label}</span>
                <span className="signup-modal__selected-check">선택됨</span>
              </div>
              <h2 className="signup-modal__title">어떻게 가입할까요?</h2>
              <p className="signup-modal__sub">가입 방법을 선택해주세요.</p>
            </div>

            <div className="signup-modal__options">
              <button className="signup-option signup-option--kakao" onClick={goKakao}>
                <span className="signup-option__icon">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11 2C6.03 2 2 5.26 2 9.3c0 2.56 1.64 4.8 4.12 6.1l-.83 3.1a.3.3 0 0 0 .44.33L9.9 16.5A10.2 10.2 0 0 0 11 16.6c4.97 0 9-3.26 9-7.3S15.97 2 11 2Z"
                      fill="#191600"
                    />
                  </svg>
                </span>
                <span className="signup-option__text">
                  <span className="signup-option__label">카카오로 시작하기</span>
                  <span className="signup-option__desc">카카오 계정으로 빠르게 가입해요</span>
                </span>
              </button>

              <button className="signup-option signup-option--default" onClick={goEmailSignup}>
                <span className="signup-option__icon">✉️</span>
                <span className="signup-option__text">
                  <span className="signup-option__label">이메일로 가입하기</span>
                  <span className="signup-option__desc">이름, 이메일, 비밀번호로 직접 가입해요</span>
                </span>
              </button>
            </div>

            <button className="signup-modal__cancel" onClick={onClose}>
              취소
            </button>
          </>
        )}
      </div>
    </>
  )
}

function BackIcon() {
  return (
    <svg
      width="20"
      height="20"
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
