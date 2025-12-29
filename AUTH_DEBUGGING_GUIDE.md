# Firebase Authentication - Debugging Guide

## Error: "Decoding Firebase ID token failed" 🔴

### What This Means

The backend received a token that is:

- Empty or undefined
- Malformed (not a valid JWT)
- Incomplete (truncated string)
- Expired (>1 hour old)
- From a different Firebase project

---

## Quick Diagnosis 🔍

### Step 1: Check Browser Console

```javascript
// Open DevTools → Console → Run:
firebase.auth.getAuth().currentUser; // Should NOT be null
firebase.auth.getAuth().currentUser?.getIdToken(); // Should return a promise
```

**If null:** User is not logged in!  
**If error:** Firebase config is wrong!

### Step 2: Check Network Tab

```
1. Open DevTools → Network
2. Make an API call (e.g., navigate to Complaints page)
3. Click on the API request
4. Go to Request Headers
5. Look for: Authorization: Bearer ...

Expected: Authorization: Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjR...
```

**If missing:** Axios interceptor not running!  
**If malformed:** Token fetch failed!

### Step 3: Check Backend Console

```
Should see:
✅ Firebase Admin initialized successfully
🚀 Server running → http://localhost:5000

Should NOT see:
❌ auth/argument-error
❌ Decoding Firebase ID token failed
```

---

## Detailed Debugging Checklist ✅

### Authentication Flow Debug

```javascript
// 1. Check if user is logged in
const user = firebase.auth.getAuth().currentUser;
console.log("Current User:", user); // Should NOT be null

// 2. Check if token can be fetched
const token = await user.getIdToken(true);
console.log("ID Token:", token.substring(0, 50) + "...");
console.log("Token Length:", token.length); // Usually 800-1000 chars

// 3. Check if token is being sent in API calls
// Open Network tab and look for Authorization header

// 4. Check backend validation
// Backend console should show successful validation
```

### Common Issues & Solutions

#### Issue 1: User is null

```
❌ firebase.auth.getAuth().currentUser === null

Solutions:
1. Is user logged in? Check login page
2. Did login complete? Wait for redirect
3. Is firebase config correct? Check firebaseconfig.js
4. Is Firebase project the same? Check project ID
```

#### Issue 2: Token is empty string

```
❌ token === ""

Solutions:
1. User session expired - log out and log in again
2. Firebase config missing - check firebaseconfig.js
3. Browser cache - clear and refresh
4. Check getIdToken() error:

   try {
     const token = await user.getIdToken(true);
   } catch (error) {
     console.error("Token fetch error:", error);
   }
```

#### Issue 3: Authorization header missing

```
❌ Network tab shows request without Authorization header

Solutions:
1. Is api.js being imported? Check component imports
2. Is axios interceptor loaded? Check Network tab for Authorization
3. Is the request using the 'api' object? Not fetch() or other axios?

   import api from "../services/api";  // ✅ Correct
   api.post("/complaints", data);      // ✅ Correct

   fetch("/api/complaints")             // ❌ Wrong (no token!)
   axios.post(...)                      // ❌ Wrong (no token!)
```

#### Issue 4: 401 Unauthorized

```
❌ Backend returns 401

Check backend error message:
- "No authorization header provided" → Token not sent
- "Authorization header must start with 'Bearer '" → Header format wrong
- "No token provided in authorization header" → Empty token
- "Invalid Firebase token" → Token is invalid

Solutions:
1. Ensure token is sent (check Network tab)
2. Ensure format is "Bearer {token}" not just "{token}"
3. Ensure user is logged in with correct Firebase project
4. Ensure firebase-service.json is loaded on backend
```

---

## Token Debug Script 🛠️

Add this to your component to debug token issues:

```javascript
import { getAuth } from "firebase/auth";
import api from "../services/api";

async function debugAuth() {
  const auth = getAuth();
  const user = auth.currentUser;

  console.group("🔍 Authentication Debug");

  // 1. User status
  console.log("User Logged In:", !!user);
  if (user) {
    console.log("User UID:", user.uid);
    console.log("User Email:", user.email);
  }

  // 2. Token status
  if (user) {
    try {
      const token = await user.getIdToken(true);
      console.log("Token Generated:", !!token);
      console.log("Token Length:", token.length);
      console.log("Token Start:", token.substring(0, 50) + "...");

      // Decode JWT (just the header)
      const header = JSON.parse(atob(token.split(".")[0]));
      console.log("Token Header:", header);
    } catch (error) {
      console.error("Token Generation Error:", error);
    }
  }

  // 3. API status
  console.log("API Base URL:", api.defaults.baseURL);
  console.log("API Interceptors:", !!api.interceptors.request);

  // 4. Try a test API call
  try {
    const response = await api.get("/auth/me");
    console.log("Test API Call Success:", response.status);
    console.log("Response Data:", response.data);
  } catch (error) {
    console.error("Test API Call Failed:", error.response?.status);
    console.error("Error Message:", error.response?.data?.message);
  }

  console.groupEnd();
}

// Call from browser console:
// debugAuth()
```

---

## Backend Debug Steps 🖥️

### Add Detailed Logging

In `authMiddleware.js`, you can temporarily add detailed logging:

```javascript
// Add this after line: const authHeader = req.headers.authorization;

console.log({
  headerExists: !!authHeader,
  headerValue: authHeader ? authHeader.substring(0, 50) : "NONE",
  headerLength: authHeader?.length,
  startsWithBearer: authHeader?.startsWith("Bearer "),
});

// Add this after: const idToken = authHeader.split(" ")[1];

console.log({
  tokenExists: !!idToken,
  tokenLength: idToken?.length,
  tokenStart: idToken ? idToken.substring(0, 50) : "NONE",
  tokenEnd: idToken ? idToken.substring(idToken.length - 50) : "NONE",
});
```

### Check Firebase Admin Initialization

```javascript
// In server.js or firebaseAdmin.js, verify:
// 1. firebase-service.json is loaded correctly
// 2. File path is correct
// 3. JSON has no syntax errors

console.log("Service Account Path:", serviceAccountPath);
console.log("File Exists:", fs.existsSync(serviceAccountPath));

const content = fs.readFileSync(serviceAccountPath, "utf8");
console.log("JSON Valid:", !!JSON.parse(content));
```

---

## Network Tab Analysis 📊

### Good Request (✅ Works)

```
GET /api/complaints/ HTTP/1.1
Host: localhost:5000
Authorization: Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjR0TFdXTlc2dmhOVF...
Content-Type: application/json

Response: 200 OK
```

### Bad Request (❌ Fails)

```
GET /api/complaints/ HTTP/1.1
Host: localhost:5000
[No Authorization header!]
Content-Type: application/json

Response: 401 Unauthorized
{
  "message": "No authorization header provided."
}
```

---

## JWT Token Structure 🔐

Firebase ID tokens are JWTs with 3 parts separated by dots:

```
eyJhbGciOiJSUzI1NiIsImtpZCI6IjR...  <- HEADER
.
eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2V...  <- PAYLOAD
.
TXdGq9lQpVXd0TZ4q7...  <- SIGNATURE
```

**To decode (for debugging only):**

```javascript
const token = "eyJ...";
const parts = token.split(".");

const header = JSON.parse(atob(parts[0]));
const payload = JSON.parse(atob(parts[1]));

console.log("Header:", header);
console.log("Payload:", payload);
// Signature: Verified by Firebase Admin SDK
```

---

## Common Configuration Issues 🔧

### Issue: Wrong Firebase Project

```
Frontend uses: municipality-ad620
Backend firebase-service.json: different project

Solution: Ensure both use the SAME project ID
```

### Issue: Firebase Config Missing Variables

```
firebaseconfig.js missing:
- apiKey
- projectId
- authDomain

Solution: Check all required fields from Firebase Console
```

### Issue: firebase-service.json Invalid

```
❌ File missing
❌ File has syntax errors
❌ File has wrong permissions

Solution:
1. Download from Firebase Console → Settings → Service Accounts
2. Verify JSON syntax: JSONLint.com
3. Check file exists: backend/firebase-service.json
```

---

## Performance Considerations ⚡

### Token Caching

```javascript
// Good: Firebase caches tokens internally
const token = await user.getIdToken(); // Cached if <1 hour old

// Forced refresh (use only when needed)
const token = await user.getIdToken(true); // Forces new token
```

### API Interceptor Performance

```javascript
// Current implementation is efficient:
// - Only fetches token when needed
// - Firebase caches tokens
// - Adds <10ms overhead per request

// If you need faster performance:
// - Cache token in memory (expires in 1 hour)
// - Use token refresh listener
```

---

## Testing with CURL 🧪

```bash
# 1. Export your Firebase project ID
FIREBASE_PROJECT="municipality-ad620"

# 2. Get a token (requires Firebase CLI or custom script)
TOKEN=$(firebase-cli get-token)  # Won't work - just for reference

# 3. Test API endpoint
curl -X GET http://localhost:5000/api/complaints/ \
  -H "Authorization: Bearer $TOKEN"

# Expected: 200 OK with data
# If 401: Token is invalid or expired
```

---

## Still Having Issues? 🆘

### Collect Debug Information

```javascript
// Run this in browser console and note the output:

async function collectDebugInfo() {
  const auth = getAuth();
  const user = auth.currentUser;

  return {
    userLoggedIn: !!user,
    userId: user?.uid,
    userEmail: user?.email,
    token: user ? (await user.getIdToken()).substring(0, 50) : null,
    apiBaseUrl: import.meta.env.VITE_API_URL,
    firebaseProject: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  };
}

const info = await collectDebugInfo();
console.log(JSON.stringify(info, null, 2));
```

### Check Logs

1. **Browser Console** - Frontend errors
2. **Network Tab** - Request/response details
3. **Backend Console** - Server-side errors
4. **Firebase Console** - Project authentication logs

### Key Files to Check

- ✅ `frontend/src/firebase/firebaseconfig.js` - Firebase config
- ✅ `frontend/src/services/api.js` - Axios interceptor
- ✅ `backend/firebase-service.json` - Service account
- ✅ `backend/config/firebaseAdmin.js` - Admin initialization

---

## Success Indicators ✅

When everything is working:

- ✅ No errors in browser console
- ✅ Authorization header in Network tab
- ✅ 200/201 status codes for API calls
- ✅ No errors in backend console
- ✅ User data displays correctly
- ✅ API responses have expected data

**If you see all of these, authentication is working!** 🎉
