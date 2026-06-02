# Classora Frontend/Backend Integration

## Phase 4 summary

Phase 4 closes the main user flow with real backend data:

Login -> view classes -> view real schedules -> select schedule -> create reservation -> view my reservations.

No database changes were made and the booking screen kept the same visual structure where possible.

## API configuration

Frontend local configuration:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3030
```

Files:

- `.env.example` documents the required value.
- `.env.local` is configured locally with `NEXT_PUBLIC_API_URL=http://localhost:3030` and remains ignored by git.

## Central API client

`app/services/apiClient.ts` is the shared API layer:

- Uses `NEXT_PUBLIC_API_URL`.
- Sends `Content-Type: application/json`.
- Sends `Authorization: Bearer <token>` when provided.
- Throws `ApiError` with status and backend payload for cleaner UI error handling.

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

### Classes / Lessons

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

### Booking / Reservations

- `GET /class-schedules`
- `POST /reservations?classScheduleId=...`
- `GET /reservations/me`

Booking now uses the authenticated user's JWT to load schedules, create reservations, and show the user's reservation history.

## Mocks removed

- `mock/AuthMock.ts` was removed in Phase 3.
- `mock/BookingMock.ts` was removed in Phase 4.
- `BookingServices.createBooking` temporary mock flow was removed.
- Available slots now come from `GET /class-schedules`.

## What still uses fallback data

- `utils/LessonData.ts` remains as a temporary fallback if `GET /classes` fails or returns no classes.
- Lesson `price` remains a local fallback because Classora-server classes do not expose price yet.

## Booking behavior after Phase 4

- Anonymous users see a login-required state for real schedules and reservations.
- Authenticated users can select date/duration/timezone and load real class schedules.
- Selecting a schedule stores its backend `classScheduleId`.
- Submitting creates a reservation with `POST /reservations?classScheduleId=...`.
- The left-side panel shows `GET /reservations/me` results with class, date, time, and status.
- Empty, loading, and error states are shown for schedules and reservations.

## Remaining product/backend gaps

- Booking form fields `lessonType`, `level`, `timezone`, and `notes` are still frontend-only; the backend reservation endpoint currently only accepts `classScheduleId` through the query string.
- The backend requires token balance for reservation. A new test student without tokens may receive a backend error until token seeding/payment flow is handled.
- `GET /class-schedules` is protected, so users must log in before seeing availability.
- Class schedule capacity/spaces still depend on the backend's current `spaces_available`/reservation calculations.
- Classes do not expose price.

## Needed for a private beta

- Seed real teachers, classes, schedules, and at least one test student with enough token balance.
- Confirm teacher/admin workflow for creating schedules.
- Add a simple operational checklist for cancelling schedules and handling failed reservations.
- Decide how students receive credits/tokens during beta.
- Add basic smoke tests for login, class listing, schedule listing, reservation creation, and reservation history.
- Verify production environment variables and CORS for the deployed frontend URL.
