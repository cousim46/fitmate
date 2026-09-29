# Member API 명세서

- **Base URL**: `/member-service`
- **Port**: `8000`

---

## 공통 에러 응답

```json
{
  "httpStatus": "HTTP 상태코드",
  "message": "에러 메시지",
  "timestamp": "2024-01-01T00:00:00"
}
```

---

## 1. 회원 가입

### `POST /member-service/sign-up`

#### Request Body

| 필드 | 타입 | 필수 | 제약 조건 |
|------|------|------|-----------|
| `nickname` | String | Y | 최대 100자 |
| `name` | String | Y | 최대 100자 |
| `phone` | String | Y | 최대 50자, 형식: `010-1234-5678` |
| `email` | String | Y | 최대 100자, 이메일 형식 |
| `password` | String | Y | 8자 이상, 영문+숫자+특수문자 포함 |
| `confirmPassword` | String | Y | - |
| `gender` | String | Y | `MALE` / `FEMALE` |
| `birth` | String | Y | 형식: `yyyy-MM-dd` |
| `recommendationCode` | String | N | - |

#### Request Example

```json
{
  "nickname": "fitmate",
  "name": "홍길동",
  "phone": "010-1234-5678",
  "email": "hong@fitmate.com",
  "password": "Password1!",
  "confirmPassword": "Password1!",
  "gender": "MALE",
  "birth": "1990-01-01",
  "recommendationCode": "ABC123"
}
```

#### Response

| 상황 | 상태코드 |
|------|----------|
| 성공 | `200 OK` |

#### Error Response

| 상황 | 상태코드 | 메시지 |
|------|----------|--------|
| 이메일 중복 | `409 Conflict` | 이미 존재하는 이메일입니다. |
| 닉네임 중복 | `409 Conflict` | 이미 존재하는 닉네임입니다. |
| 필수값 누락 또는 형식 오류 | `400 Bad Request` | 각 필드 validation 메시지 |

---

## 2. 이메일 중복 확인

### `GET /member-service/check/email`

#### Query Parameter

| 파라미터 | 타입 | 필수 | 설명 |
|----------|------|------|------|
| `email` | String | Y | 중복 확인할 이메일 |

#### Request Example

```
GET /member-service/check/email?email=hong@fitmate.com
```

#### Response

| 상황 | 상태코드 |
|------|----------|
| 사용 가능한 이메일 | `200 OK` |

#### Error Response

| 상황 | 상태코드 | 메시지 |
|------|----------|--------|
| 이메일 중복 | `409 Conflict` | 이미 존재하는 이메일입니다. |

---

## 3. 닉네임 중복 확인

### `GET /member-service/check/nickname`

#### Query Parameter

| 파라미터 | 타입 | 필수 | 설명 |
|----------|------|------|------|
| `nickname` | String | Y | 중복 확인할 닉네임 |

#### Request Example

```
GET /member-service/check/nickname?nickname=fitmate
```

#### Response

| 상황 | 상태코드 |
|------|----------|
| 사용 가능한 닉네임 | `200 OK` |

#### Error Response

| 상황 | 상태코드 | 메시지 |
|------|----------|--------|
| 닉네임 중복 | `409 Conflict` | 이미 존재하는 닉네임입니다. |
