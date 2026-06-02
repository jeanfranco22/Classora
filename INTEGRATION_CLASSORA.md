# Classora Frontend/Backend Integration

## Phase 3 summary

Phase 3 connects the frontend to the real Classora-server API where the contracts already match closely. It avoids a full booking redesign and keeps temporary fallbacks where the backend/frontend contract still needs Phase 4 work.

## API configuration

Create a frontend `.env.local` using:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3030
```

An `.env.example` file is included with the same value.

## Central API client

Added `app/services/apiClient.ts`:

- Uses `NEXT_PUBLIC_API_URL`.
- Sends `Content-Type: application/json`.
- Sends `Authorization: Bearer <token>` when a token is provided.
- Throws `ApiError` with status and API payload for clean error handling.

## Mocks removed or replaced

- Removed the auth mock file `mock/AuthMock.ts`.
- `app/services/AuthServices.ts` now calls real backend endpoints:
  - `POST /auth/login`
  - `POST /auth/register`
  - `GET /auth/me`
- Lessons no longer use `utils/LessonData.ts` as the primary source.
- `app/services/LessonServices.ts` now calls `GET /classes` and maps backend classes to the frontend `Lesson` shape.

## What still uses fallback data

- `utils/LessonData.ts` remains as a temporary fallback if `GET /classes` fails or returns no classes.
- Lesson `price` is still local fallback data because Classora-server classes do not expose price yet.
- `mock/BookingMock.ts` remains because the current booking UI still selects a free-form slot and does not yet submit a real `classScheduleId`.
- `createBooking` still returns a temporary response. Real reservation submission is available through `createReservation(classScheduleId, token)` but the UI is not wired to it yet.

## Connected endpoints

### Auth

- `POST /auth/login`
- `POST /auth/register`
- `GET /auth/me`

Response mapping:

- `accessToken` -> `token`
- `user.name` -> `user.fullName`
- `user.profileImg` -> `user.avatar`
- `STUDENT | TEACHER | ADMIN` -> `student | teacher | admin`

### Lessons

- `GET /classes`

Class mapping:

- `id` -> `id`
- `name` -> `title`
- `description` -> `description`
- `benefits` -> `focus`
- `imgUrl` -> `image`
- `duration` -> `duration`
- `intensity` -> frontend level approximation
- missing backend `price` -> temporary `$18 USD`

### Booking preparation

Real services were added for:

- `GET /class-schedules`
- `POST /reservations?classScheduleId=...`
- `GET /reservations/me`

The existing booking UI is intentionally not redesigned in Phase 3.

## Phase 4 booking work

To complete booking against the real backend:

- Require login before reservation or pass the auth token into booking services.
- Replace free-form slot mocks with real `classScheduleId` selection from `GET /class-schedules`.
- Show class name, teacher, capacity/spaces, date, and time from backend schedules.
- Submit `POST /reservations?classScheduleId=...` using the selected schedule id.
- Replace the temporary `createBooking` response with the backend reservation response.
- Decide whether backend should expose a public available-slots endpoint or keep schedules protected.
- Add backend/frontend support for notes, timezone, and lesson type if those remain product requirements.

## Backend gaps observed during Phase 3

- `GET /class-schedules` is protected, so anonymous slot loading falls back locally until booking is authenticated or backend exposes public availability.
- Classes do not expose price.
- Reservations require `classScheduleId`; the current UI does not model that yet.
