import api from './api'
import type { MemberType } from '@/components/SignupModal'

export type { MemberType }

export interface SignUpRequest {
  memberType: MemberType
  nickname: string
  name: string
  phone: string
  email: string
  password: string
  confirmPassword: string
  gender: 'MALE' | 'FEMALE'
  birth: string
  recommendationCode?: string
}

/**
 * 회원 유형별 엔드포인트 맵.
 * 추후 STYLIST / SELLER 엔드포인트가 분리되면 여기서만 수정한다.
 */
const SIGNUP_ENDPOINT: Record<MemberType, string> = {
  MEMBER:   '/member-service/sign-up',
  STYLIST:  '/member-service/sign-up', // TODO: '/stylist-service/sign-up'
  SELLER:   '/member-service/sign-up', // TODO: '/seller-service/sign-up'
}

export const memberApi = {
  signUp: (data: SignUpRequest) => {
    const endpoint = SIGNUP_ENDPOINT[data.memberType]
    return api.post(endpoint, data)
  },

  checkEmail: (email: string) =>
    api.get('/member-service/check/email', { params: { email } }),

  checkNickname: (nickname: string) =>
    api.get('/member-service/check/nickname', { params: { nickname } }),
}
