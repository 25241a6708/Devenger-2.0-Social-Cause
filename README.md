# SocialCause — Real-Time Community Impact Coordination Platform

> **"SocialCause doesn't just show where help is needed. It turns available help into coordinated action."**

[![Live Deployment](https://img.shields.io/badge/Vercel-Live%20Demo-000000?style=for-the-badge&logo=vercel)](https://devenger-2-0-social-cause.vercel.app)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/25241a6708/nexus-cause)
[![Hackathon](https://img.shields.io/badge/Hackathon-Hack%20Devengers%202.0-indigo?style=for-the-badge)](https://devenger-2-0-social-cause.vercel.app)

---

## 📌 Executive Summary & Product Vision

Communities often have organizations with urgent, unmet needs (meals, supplies, volunteers) and local businesses or citizens with available surplus help. However, these resources remain disconnected due to a lack of real-time coordination.

**SocialCause** is an open-innovation social-impact coordination platform that bridges this gap. Powered by a deterministic, transparent **Impact Matching Engine**, it matches real-time community needs with available local contributions, explains the rationale behind every match, adapts when supply conditions change unexpectedly via **Dynamic Re-Matching**, and tracks measurable impact.

---

## 🎯 Key Features & Capabilities

- **Command Center Dashboard:** Real-time visibility into urgent community missions, fulfilled metrics, and local activity timelines.
- **Interactive Impact Map:** Location-based map centered in Hyderabad featuring color-coded markers for urgent resource gaps, orphanages, elder care trusts, cleanup points, and verified contributors.
- **Explainable Impact Matching Engine:** Transparent 5-factor scoring model that ranks optimal help recommendations and answers *"Why This Match?"* without relying on opaque black-box AI.
- **Custom Quantity Contribution Selector:** Interactive contribution workflows allowing donors to fulfill exact custom quantities (e.g., 10, 20, or 30 meals).
- **Dynamic Re-Matching (Hero Feature):** Live simulation engine that detects sudden supply shortages (e.g., supply drops), re-runs the matching algorithm instantly, and identifies alternative contributors to keep missions at 100% completion.
- **SOS Priority Emergency Response:** High-visibility priority dispatch system for critical medical assistance, blood donation, and emergency relief distribution.
- **Dedicated Multi-Page Hub:** Modular navigation across Dashboard, Impact Map, Community Missions Directory, Contributor Leaderboard, SOS Emergency Desk, and User Impact Profile.

---

## 🧮 The Impact Matching Algorithm

The Impact Matching Engine evaluates available contributions against urgent needs using a deterministic, multi-factor weighted scoring formula:

$$\text{Match Score} = (0.30 \times S_{\text{qty}}) + (0.25 \times S_{\text{dist}}) + (0.20 \times S_{\text{urgency}}) + (0.15 \times S_{\text{deadline}}) + (0.10 \times S_{\text{compat}})$$

### Factor Breakdown:
1. **Quantity Compatibility ($S_{\text{qty}}$ — 30% Weight):** Evaluates if the available supply meets or covers the required gap.
2. **Distance Proximity ($S_{\text{dist}}$ — 25% Weight):** Haversine distance formula scoring to minimize dispatch time.
3. **Urgency Weight ($S_{\text{urgency}}$ — 20% Weight):** Prioritizes time-sensitive and critical needs (`URGENT` vs `MODERATE`).
4. **Deadline Compatibility ($S_{\text{deadline}}$ — 15% Weight):** Ensures resources arrive before expiration.
5. **Resource Compatibility ($S_{\text{compat}}$ — 10% Weight):** Verifies exact category alignment (e.g., Prepared Meals to Prepared Meals).

---

## 💻 Tech Stack

- **Frontend Framework:** React (TypeScript) + Vite
- **Styling & UI:** Tailwind CSS, Lucide Icons, Glassmorphic UI Design
- **Interactive Mapping:** Leaflet Map API (`react-leaflet` / OpenStreetMap)
- **Deployment:** Vercel Continuous Deployment
- **Source Control:** GitHub ([nexus-cause](https://github.com/25241a6708/nexus-cause))

---

## 🎬 30-Second Hero Demo Scenario

1. **View Need:** Hope Community Center requires 100 meals (70 fulfilled, 30 remaining gap, `URGENT` priority).
2. **Match Engine:** Click **"FIND HOW I CAN HELP"** to launch the Impact Matching Engine. Restaurant A (FreshBite) is calculated at a **96% Match Fit**.
3. **Explainability:** Click **"WHY THIS MATCH?"** to inspect the transparent 5-factor breakdown.
4. **Fulfill Gap:** Select custom quantity (30 meals) and coordinate contribution $\rightarrow$ Progress updates to **100/100 (MISSION FULFILLED)**.
5. **Dynamic Rematch:** Trigger **"Simulate Supply Drop"** in Demo Controls (Simulating Restaurant A supply drop 60 → 30). The platform detects the gap, alerts the user, and automatically matches **Restaurant C (Local Grocery)** to restore the mission to 100%.

---

## 🚀 Quickstart & Local Development

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/25241a6708/nexus-cause.git](https://github.com/25241a6708/nexus-cause.git)
   cd nexus-cause
