# Render Deployment Guide

Deploy the Chest Scanalyze AI frontend and backend to Render. The model inference service is already on Azure Container Apps.

---

## Overview

You’ll create **two** Render services from this repo (monorepo):

| Service | Type | Root Directory |
|---------|------|----------------|
| Backend | Web Service | `backend` |
| Frontend | Static Site | `frontend` |

---

## Prerequisites

- Repo pushed to GitHub (or GitLab)
- **Model inference:** Set `MODEL_SERVICE_URL` on the backend to your running inference API. In production that is typically **Azure Container Apps** (e.g. `https://your-model-app.azurecontainerapps.io`). Locally you can run **`docker pull jrpaul08/chest-xray-inference:v2`** then **`docker run -p 8000:8000 jrpaul08/chest-xray-inference:v2`** and use `http://localhost:8000`.
- MongoDB URI (same one used locally)
- JWT secret (strong random string for production)

---

## 1. Backend (Web Service)

### Create the service

1. **Render Dashboard** → **New** → **Web Service**
2. Connect the repo and choose the Chest xray Disease Detection repo
3. Settings:
   - **Name:** `chest-scanalyze-backend` (or similar)
   - **Root Directory:** `backend`
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance type:** Free (or paid)

### Environment variables

In **Environment** → **Environment Variables**, add:

| Key | Value |
|-----|-------|
| `MONGO_URI` | `mongodb+srv://...` (your MongoDB connection string) |
| `MODEL_SERVICE_URL` | Your Azure Container Apps model URL (e.g. `https://xxx.azurecontainerapps.io`) |
| `JWT_SECRET` | Strong random string (e.g. from `openssl rand -base64 32`) |
| `CORS_ORIGIN` | Your frontend URL (e.g. `https://chest-scanalyze-frontend.onrender.com`) |

**Note:** Set `CORS_ORIGIN` after the frontend is deployed so you have the correct URL.

### Deploy

Click **Deploy**. Once it finishes, you’ll get a URL like `https://chest-scanalyze-backend.onrender.com`.

---

## 2. Frontend (Static Site)

### Create the service

1. **Render Dashboard** → **New** → **Static Site**
2. Connect the same repo
3. Settings:
   - **Name:** `chest-scanalyze-frontend` (or similar)
   - **Root Directory:** `frontend`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
   - **Environment variables** (see below)

### Environment variables

In **Environment** → **Environment Variables**, add:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | Your backend Render URL (e.g. `https://chest-scanalyze-backend.onrender.com`) |


**Important:** Vite bakes `VITE_API_URL` into the build. If you change it later, trigger a new deploy.

### Deploy

Click **Deploy**. Once it’s done, you’ll get a URL like `https://chest-scanalyze-frontend.onrender.com`.

---

## 3. Wire Backend CORS

After the frontend is deployed:

1. Open the backend service on Render
2. Go to **Environment** → **Environment Variables**
3. Set `CORS_ORIGIN` to your frontend URL (e.g. `https://chest-scanalyze-frontend.onrender.com`)
4. Save and redeploy

---

## 4. Deployment Order

1. Deploy **backend** first
2. Deploy **frontend** (with `VITE_API_URL` pointing to the backend)
3. Set `CORS_ORIGIN` on the backend to the frontend URL
4. Redeploy the backend if needed

---

## 5. Optional: render.yaml (Blueprint)

To define services in YAML:

- Create `render.yaml` in the repo root
- Use **New** → **Blueprint** and connect the repo
- Render will create both services from the blueprint

---

## 6. Free Tier Behavior

- **Web Services:** Sleep after 15 minutes of inactivity; first request may take 30–60 seconds to wake
- **Static Sites:** No sleep, instant load
- Plan for cold starts on the backend on the free tier.

---

## Checklist

- [ ] Backend deployed with `MONGO_URI`, `MODEL_SERVICE_URL`, `JWT_SECRET`, `CORS_ORIGIN`
- [ ] Frontend deployed with `VITE_API_URL` pointing to backend
- [ ] Azure model service reachable from Render (same region / networking as needed)
