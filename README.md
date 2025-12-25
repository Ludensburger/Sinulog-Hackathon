# 🏠 MAIya: The AI Real Estate Agent (Hackathon Demo)

> **Team Role:** Hipster (Design/UX) 🎨  
> **To:** Hacker (Dev) 💻 & Hustler (Biz) 💼

## 🚀 Project Overview
**MAIya** is an intelligent, AI-first real estate platform designed to bridge the gap between leads and agents. Unlike traditional listings, MAIya actively qualifies users, analyzes their intent, and serves "Escalation-Ready" leads to agents.

**Core Value Prop:**
*   **For Buyers:** Personalized, chat-based discovery & instant answers.
*   **For Agents:** No more tire-kickers. Only qualified leads with calculated "Readiness Scores."

---

## 📚 User Manual (The Demo Flow)

Use this flow for the pitch/demo to show the full user journey.

### 1. The Hook: Landing Page (`/`)
*   **Visual:** Clean, modern hero section.
*   **Action:** Click **"Find Your Dream Home"** to start the journey.
*   **Pitch:** "We don't just search; we match."

### 2. The Funnel: Onboarding (`/onboarding`)
*   **What it is:** A gamified, step-by-step wizard to capture user intent.
*   **Steps:**
    1.  **Intent:** Buy vs. Sell.
    2.  **Budget:** Slider & Financing status.
    3.  **Location:** Preferred areas (e.g., Lahug, IT Park).
    4.  **Timeline:** Urgency (ASAP vs. Just Looking).
    5.  **Preferences:** Bedrooms/Property Type.
*   **UX Detail:** Smooth animations (Framer Motion) between steps to keep engagement high.

### 3. The Discovery: Listings (`/listings`)
*   **Features:**
    *   **Smart Filters:** Filter by Property Type (House/Condo) & Price Range.
    *   **Visuals:** High-quality cards with "Verified" badges.
    *   **Interaction:** Click the ❤️ heart to save (simulated state).
*   **Demo Tip:** Show how the filters instantly update the grid (mock data included for various scenarios).

### 4. The Deep Dive: Property Details (`/property/:id`)
*   **Key Feature:** **AI Market Analysis (CMA)** card on the right.
*   **What to show:**
    *   "Fair Market Value" calculation.
    *   "Comparable Properties" logic.
    *   "Area Insights" (e.g., flood risk, crime safety).
*   **Call to Action:** "Talk to MAIya" button to simulate interest.

### 5. The AI Assistant: Chat (`/chat`)
*   **Meet MAIya:** A context-aware chatbot.
*   **Try these prompts:**
    *   *"I want to buy a condo in IT Park for 5M"* -> MAIya detects intent, location, and budget.
    *   *"I need to move asap"* -> MAIya updates timeline readiness.
*   **Magic Moment:** Watch the **"Qualification Progress"** bar on the right update in real-time as you chat.
*   **Escalation:** When the score hits 80%, a **"Ready to Connect with Agent"** button appears.

### 6. The "Hustler's" View: Agent Dashboard (`/agent`)
*   **What it is:** The CRM view for the real estate agent.
*   **Key Data:**
    *   **Lead Quality:** Shows leads sorted by "Readiness Score."
    *   **Insights:** "High Budget," "Urgent," "Pre-approved."
*   **Why it matters:** This proves we save agents time by filtering out unqualified leads.

---

## 🛠️ Technical Setup (For the Hacker)

This project is built with **React + Vite + TypeScript**.

### Prerequisites
*   Node.js & npm

### Installation
```bash
npm install
```

### Running the App
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### Key Libraries
*   **Styling:** Tailwind CSS + `shadcn/ui` components.
*   **Animations:** `framer-motion` (used for page transitions and card effects).
*   **Routing:** `react-router-dom`.
*   **Icons:** `lucide-react`.

---

## 💼 Pitch Points (For the Hustler)

*   **Problem:** Agents spend 80% of their time on leads that never convert.
*   **Solution:** MAIya automates the "first meeting" – qualifying budget, timeline, and intent *before* a human ever gets involved.
*   **Monetization:** SaaS subscription for agents/brokerages or Lead Gen model.
*   **Unfair Advantage:** Our UI isn't just a form; it's a conversation. The "Readiness Score" is our proprietary metric for lead quality.

---

**✨ Let's win this!**