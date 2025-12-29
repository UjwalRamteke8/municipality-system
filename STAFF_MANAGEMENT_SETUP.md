# Staff Management Pages - Quick Verification

How to verify the new Staff pages and flows:

1. Start backend and frontend:

```bash
# In backend folder
cd backend
npm install
npm run dev

# In frontend folder
cd frontend
npm install
npm run dev
```

2. Login as admin (use the admin account the app expects, e.g., `admin@jalgaon.gov.in`).
3. Open Dashboard and click the 'Total Complaints' card (or go to `/staff/complaints`).
4. Confirm complaints load and status dropdowns work. Change a status and verify it updates in UI.
5. Go to `/staff/services` and repeat for service requests.
6. Check Network tab for requests to `/api/complaints` and `/api/services` and verify `Authorization: Bearer` header is present.

Notes:

- Routes use existing backend endpoints: `GET /api/complaints` and `PATCH /api/complaints/:id/status` for complaints; `GET /api/services` and `PATCH /api/services/:id/status` for services.
- Access to staff pages is protected by `ProtectedRoute` with `requiredRole="admin"` in this version. Adjust `ProtectedRoute` logic if you add a separate `staff` role.
