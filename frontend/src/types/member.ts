export interface MemberJoinRequest {
  email: string
  password: string
  name: string
  gender: 'MALE' | 'FEMALE'
  birthday: string
}

export interface MemberResponse {
  id: number
  email: string
  name: string
  gender: 'MALE' | 'FEMALE'
  birthday: string
  createdAt: string
}
