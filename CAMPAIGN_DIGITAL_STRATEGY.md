# National Vision Party - Digital Campaign Strategy
## Implementation Roadmap

**Last Updated:** March 2026  
**Status:** Phase 1 In Progress  
**WhatsApp Hotline:** 0713 064 026

---

## 🎯 TWO CORE OBJECTIVES

### 1. AWARENESS ENGINE (Maximum Shareability)
Turn every visitor into a broadcaster. Make content spread organically across all platforms.

### 2. FUNDRAISING PIPELINE (Financial Support)
Convert support into donations through seamless, multi-channel payment options.

---

## 📋 IMPLEMENTATION PHASES

---

## PHASE 1: FOUNDATION (COMPLETED ✅)

### UI/UX Improvements
- [x] Fix gallery admin page (API mismatch)
- [x] Add album creation functionality
- [x] Add pagination to public gallery
- [x] Fix news article page padding
- [x] Standardize footer colors
- [x] Add Kenyan coat of arms watermark
- [x] Reduce section spacing on homepage
- [x] Update navbar with news ticker
- [x] Remove "Trusted by Thousands" stats
- [x] Create Diaspora page (`/diaspora`)
- [x] Create Youth/GenZ page (`/youth`)

### Content Pages Live
- [x] `/diaspora` - Kenyans abroad engagement
- [x] `/youth` - GenZ pledge & justice for fallen heroes
- [x] Both pages have WhatsApp integration (0713064026)
- [x] Both pages have pre-written share messages

---

## PHASE 2: SHAREABILITY ENGINE (NEXT PRIORITY)

### 2.1 Social Meta Optimization
**Files to Modify:**
- `app/layout.tsx` - Base metadata
- `app/news-hub/[slug]/page.tsx` - Article-specific
- `app/diaspora/page.tsx` - Diaspora sharing
- `app/youth/page.tsx` - Youth sharing
- Create `app/api/og/route.tsx` - Dynamic image generation

**Implementation:**
```typescript
// Dynamic OG image generation
// Every share gets a branded card with:
// - Dr. Kinity photo
// - Article title/quote
// - Campaign branding
// - "NationalVisionParty.com" watermark
```

**Impact:** Professional-looking shares that drive clicks back to site.

---

### 2.2 WhatsApp-First Integration
**Files to Create/Modify:**
- `components/WhatsAppFloat.tsx` - Floating chat button (all pages)
- Update existing pages with more WhatsApp CTAs
- Create WhatsApp broadcast list signup

**Implementation:**
- Floating WhatsApp button (bottom-right)
- Pre-written message templates for:
  - General inquiry
  - Join movement
  - Report issue
  - Volunteer
  - Donate
- QR code for quick WhatsApp add

**WhatsApp Number:** 0713064026

---

### 2.3 "Ambassador/Referral" Program
**Files to Create:**
- `app/ambassador/page.tsx` - Signup page
- `app/api/ambassador/route.ts` - Backend
- `components/ReferralTracker.tsx` - Dashboard

**Features:**
- Unique referral links (`?ref=username`)
- Downloadable social media kits (images, captions)
- Leaderboard of top advocates
- Progress tracking (shares, clicks, signups)
- Badge system: "Social Warrior", "County Champion", etc.

---

### 2.4 SMS/USSD Integration (Basic Phone Support)
**For Feature Phone Users:**
- Add "Share via SMS" buttons
- Short USSD code for updates: `*384*2027#` (conceptual)
- Text-only version of site for low-data mode

---

### 2.5 Progressive Web App (PWA)
**Files to Create:**
- `public/manifest.json`
- `public/sw.js` - Service worker
- `components/PWAInstall.tsx` - Install prompt

**Features:**
- "Add to Home Screen" functionality
- Offline reading of manifesto
- Push notifications for:
  - Breaking news
  - Rally alerts (geolocation-based)
  - Voting reminders

---

## PHASE 3: FUNDRAISING PIPELINE (BEFORE LAUNCH)

### 3.1 Multi-Channel Donation Page (`/support`)
**Files to Create:**
- `app/support/page.tsx` - Main donation page
- `components/DonationTiers.tsx` - Amount selection
- `components/PaymentMethods.tsx` - Provider tabs

**Payment Methods (Priority Order):**
1. **M-Pesa** (CRITICAL - 95% of Kenya uses this)
   - Paybill Number
   - Till Number
   - STK Push integration
2. **Bank Transfer** (for large donors)
3. **PayPal** (diaspora)
4. **Card Payments** (Stripe/Paystack)
5. **Crypto** (optional - for tech-savvy diaspora)

**Donation Tiers:**
| Amount | Label | Impact Statement |
|--------|-------|------------------|
| KES 100 | Grassroots Supporter | Feeds 5 volunteers at a rally |
| KES 500 | County Champion | Prints 200 campaign posters |
| KES 1,000 | Vision Partner | Sponsors one county coordinator |
| KES 5,000 | Freedom Fighter | Funds community empowerment event |
| Custom | Any Amount | Every shilling counts |

---

### 3.2 Recurring Donations
**Features:**
- "Monthly Freedom Fighter" subscription
- Progress bar: "Become one of 1,000 monthly donors"
- Easy cancellation
- Monthly impact reports

---

### 3.3 Transparency Dashboard (`/transparency`)
**Files to Create:**
- `app/transparency/page.tsx`
- `components/DonationCounter.tsx` - Real-time total

**Features:**
- Live donation counter
- "Your money went to:" impact stories
- Financial reports (PDF downloads)
- Wall of donors (opt-in names)
- Fundraising thermometer

**Goal Display:**
```
Target: KES 50,000,000
Current: KES 23,450,000 (47%)
Deadline: August 9, 2027
"Help us reach 50M for the final push!"
```

---

### 3.4 "Rally Mode" Feature
**Files to Create:**
- `components/RallyMode.tsx`

**Features (when user is at rally location):**
- Auto check-in
- Livestream link (if far back)
- Photo booth with campaign frames
- Donation prompt: "Fuel this moment"

---

## PHASE 4: ADVANCED FEATURES (POST-LAUNCH)

### 4.1 Content Engine
- Daily news articles
- Weekly podcast episodes
- Bi-weekly policy deep-dives
- Monthly town hall livestreams

### 4.2 User-Generated Content
- `/my-story` - Voters share support stories
- Auto-moderation
- Curated for homepage

### 4.3 Gamification
- Badges: "First Donor", "County Captain", "Social Warrior"
- Progress bars
- Leaderboards

### 4.4 Advanced Analytics
```typescript
const kpiDashboard = {
  // Awareness
  dailyVisitors: 0,
  socialShares: 0,
  referralTraffic: 0,
  newsletterSignups: 0,
  
  // Financial
  totalDonations: 0,
  averageDonation: 0,
  recurringDonors: 0,
  donorRetentionRate: 0,
}
```

---

## 🔧 TECHNICAL IMPLEMENTATION NOTES

### Free Tier Optimization
- ✅ Images: Use `unoptimized` flag to skip Vercel processing
- ✅ API calls: Limited to 12 images per carousel
- ✅ No server-side rendering for heavy components
- ✅ Client-side data fetching only

### Security Considerations
- All WhatsApp links use `https://wa.me/` (official)
- Payment forms need CSRF protection
- Donor data must be encrypted
- No sensitive data in client-side code

### Performance Targets
- Page load: < 3 seconds
- Time to interactive: < 5 seconds
- Lighthouse score: > 90

---

## 📱 CRITICAL SUCCESS METRICS

### Awareness KPIs
- [ ] 10,000+ daily visitors by July 2027
- [ ] 5,000+ WhatsApp channel members
- [ ] 50,000+ social shares
- [ ] 1,000+ ambassador signups

### Fundraising KPIs
- [ ] KES 50M total raised
- [ ] 10,000+ individual donors
- [ ] 1,000+ monthly recurring donors
- [ ] KES 5,000 average donation

---

## 🚀 IMMEDIATE NEXT STEPS (DO TODAY)

1. **Create dynamic OG image generator** (`/api/og`)
2. **Add floating WhatsApp button** (all pages)
3. **Set up M-Pesa integration** (test credentials)
4. **Build `/support` donation page** (UI only, no payment yet)
5. **Create transparency dashboard** (static version)

---

## 📞 CONTACT & RESOURCES

**WhatsApp Hotline:** 0713064026  
**Email:** info@nationalvisionparty.com  
**Diaspora:** diaspora@nationalvisionparty.com

**Key URLs:**
- `/diaspora` - Kenyans abroad
- `/youth` - GenZ & Youth
- `/support` - Donations (WIP)
- `/transparency` - Financial transparency (WIP)

---

## 💡 THE VIRAL LOOP FORMULA

Every piece of content must answer:
1. **"Will someone share this?"** (emotion trigger)
2. **"Does it bring people back to the site?"** (link included)
3. **"Is there a clear next step?"** (CTA: Donate/Join/Share)

**Example Flow:**
```
User reads article → Clicks WhatsApp Share 
→ Friend sees branded preview → Clicks link 
→ Lands on article → "Join Movement" popup 
→ Signs up → Gets referral link 
→ Shares THEIR link → Loop repeats
```

---

**Document Status:** Active Development  
**Next Review:** After Phase 2 completion  
**Maintainer:** Campaign Digital Team
