
# Olex for Cows – Agent Specification (Mobile-First, Fully Responsive)

## 0. Platform & UX Principles
Technology Nextjs Neon postgres drizzle orm fireabsae email then the cloudinary for video and photo storege 
netlify for hosting 
### Primary Platform

* **Mobile-first design**
* Bottom navigation (5 tabs)
* Thumb-friendly interactions
* Large tap targets (min 44px)
* Video-first marketplace browsing

### Desktop Adaptation

* Sidebar navigation replaces bottom bar
* Multi-column grid for listings
* Persistent filter panel on left
* Content width max 1280px centered
* Hover states enabled
* Modal-based interactions instead of full-page transitions when appropriate

---

# 1. Global Navigation Structure

## Mobile Bottom Navigation (5 Tabs)

1. **Home**
2. **Sell Cow**
3. **Breed Scan**
4. **Become Seller**
5. **Encyclopedia**

### Top Right (Header)

* Settings icon (⚙)
* Notification icon (optional future scope)

---

# 2. Home – Marketplace (Buy Section)

## Purpose

Livestock browsing and filtering marketplace.

## Layout (Mobile)

### Header

* Logo (left)
* Location selector (center, tappable)
* Settings icon (right)

### Filter Access

* Horizontal scrollable filter chips
* “All Filters” button opens bottom sheet modal

### Animal Cards (Primary UI)

Each listing is a **video-first card**:

**Card Structure**

* Auto-muted video thumbnail (top)
* Animal Name / ID
* Breed
* Lactation Stage
* Current Milk (L/day)
* Pregnancy Status
* Location
* Price
* Like ❤️ button
* Call 📞 button

### Quick Filter Chips

* Type (Cow / Buffalo / Bull / Male Buffalo / Other)
* Lactation (Not Delivered / First / Second)
* Breed
* Milk Range
* Pregnancy
* With Calf
* Rate Range
* Home-raised / Market cattle

### Advanced Filter Modal

* Multi-select dropdowns
* Milk range slider
* Location radius
* Sort by:

  * Latest
  * Price Low → High
  * Milk Output High → Low

---

## Desktop Layout

* Left sidebar: Filters (persistent)
* Right side: 3-column grid cards
* Hover:

  * Play video preview
  * Show quick actions (Call, Like, View Details)

---

# 3. Sell Cow (Bottom Tab 2)

## Purpose

Allow farmers to list livestock.

## Form Type

Multi-step progressive form (better UX than long single form)

### Step 1: Basic Info

* Type of Animal (Dropdown)
* Breed
* Lactation Stage
* Current Milk (L/day)
* Max Milk (L/day)

### Step 2: Health & Status

* Pregnancy Status
* Delivery Status
* Calf Details (Male / Female / None)
* Kind of Cattle (Home-raised / Market)

### Step 3: Media

* Upload Cow Video (required)
* Upload Udder Photo (required)
* Additional Photos (optional)

### Step 4: Pricing & Location

* Rate
* Negotiable (Yes/No toggle)
* Auto-Locate button
* Manual Location override

### Step 5: Preview & Publish

* Preview card as buyer sees it
* Publish

---

# 4. Breed Scan (Bottom Tab 3)

## Purpose

AI-powered breed and disease identification.

## Core Functionality

* Camera access
* Upload image
* AI scans and returns:

  * Detected Breed
  * Confidence %
  * Common diseases associated
  * Lactation potential (if available)
  * Maintenance tips

## Additional Features

* Save scan history
* Share report
* Option to list scanned cow directly to Sell page

## Gemini Integration



    * Advanced disease detection
    * PDF health report
    * Scan history storage

---

# 5. Become Seller (Bottom Tab 4)

## Purpose

External vendors promote services/products.

## Seller Types

### Veterinary Services

* On-call vet
* Artificial insemination
* Vaccination service
* Emergency care

### Feed & Nutrition

* Dairy feed suppliers
* Mineral mixture suppliers
* Organic feed

### Equipment

* Milking machines
* Cooling tanks
* Storage units

### Financial Services

* Livestock loans
* Insurance
* Government scheme assistance

---

## Vendor Registration Flow

Step 1:

* Business Name
* Contact Number
* WhatsApp
* Location

Step 2:

* Type of Service
* Coverage Area
* Pricing Model

Step 3:

* Upload License/Proof
* Add Images
* Payment via Gemini

---

# 6. Encyclopedia (Bottom Tab 5)

## Purpose

Educational knowledge base.

## Categories

### 1. Increase Milk Production

* Feed planning
* Lactation cycle optimization
* Breed-specific nutrition
* Heat detection

### 2. Common Diseases

* Mastitis
* FMD
* Lumpy skin disease
* Parasites

Each disease page:

* Symptoms
* Prevention
* Treatment
* When to call vet

### 3. Feeds

* Types of cattle feed
* Homemade feed formulas
* Seasonal feeding adjustments

### 4. Government Schemes

* Subsidies
* Loan programs
* Insurance programs
* State-specific schemes (location-based)

---

# 7. Settings (Top Right)

Settings opens full-page panel (mobile) or right drawer (desktop).

---

## 7.1 Profile

* Name
* Address
* WhatsApp Number
* Phone Number
* Birthday
* Number of Animals
* Years of Husbandry
* Education Level
* Purpose of Using App
* Profile Photo

---

## 7.2 My Cows

Tabs:

* Listed
* Not Listed
* Sold

Above tabs:

* Total Views
* Calls Received
* Calls Made
* Total Likes

Inside each cow:

* Who liked this cow (count + limited visible users)
* Who contacted
* Sold history

Purpose:
Creates social proof and trust.

---

## 7.3 Language & Location

* Language selector
* Pincode
* Auto-location toggle

---

## 7.4 Notifications

* New buyer interest
* Message alerts
* Government scheme updates
* Disease alerts (location-based)

---

## 7.5 Messages

Internal chat system:

* Buyer ↔ Seller
* Farmer ↔ Vendor
* Admin support

---

# 8. Gemini Integration

we use ai to get free photo to get breed identifciation and deiease idetnifcitaon 

---

# 9. Responsive Behavior Summary

| Feature    | Mobile        | Desktop            |
| ---------- | ------------- | ------------------ |
| Navigation | Bottom tabs   | Sidebar            |
| Filters    | Bottom sheet  | Left panel         |
| Listings   | Single column | 3-column grid      |
| Forms      | Step-based    | Wider multi-column |
| Settings   | Full page     | Side drawer        |
| Messages   | Full screen   | Split view         |

---

# 10. UX Optimization Standards

* Video loads lazy
* Skeleton loaders
* Offline fallback
* Large tap targets
* Clear call buttons
* Simple language
* Multilingual support
* Fast load (optimize for rural networks)
* Minimal data usage mode (optional toggle)


5. UX Standards

Senior projects define UX quality.

Mobile-first responsive design

Accessible semantic HTML

Loading states required

Error states required

Empty states required

Optimistic UI where appropriate

Keyboard navigation support

Form validation with real-time feedback




