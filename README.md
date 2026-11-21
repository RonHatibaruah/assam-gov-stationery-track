# Assam Government Press & Stationery Digital Tracking
### Problem Code: NESFIC-D-39 (NESFIC 2026)
**Official Challenge Track:** Government Track / Dashboards & Digital Platforms (Governance & Administration)  
**Organized by:** Department of Innovation, Incubation and Startups (DIIS) & Assam Innovation & Startup Foundation (AISF), Government of Assam  
**Problem Owner:** Directorate of Printing & Stationery, Information, Public Relations, Printing & Stationery Department, Government of Assam (Bamunimaidam, Guwahati - 781021)  
**Problem Statement Reference:** [https://startup.assam.gov.in/nesfic26/problem-statements/nesfic-d-39](https://startup.assam.gov.in/nesfic26/problem-statements/nesfic-d-39)  
**Objective:** End-to-end digital inventory, procurement inflow, press production floor management, inter-district e-indents, and GPS movement tracking of official government stationery, forms, and *The Assam Gazette (অসম ৰাজপত্ৰ)* across all 35 Assam districts.

---

## 🏛️ Suggested GitHub Repository Names

| Repository Name | Style & Positioning | Recommended Usage |
| :--- | :--- | :--- |
| **`assam-gov-stationery-track`** | **Official & Standard (Recommended)** | Ideal for government department presentations, public sector audits, and open-source governance. |
| **`nesfic-d-39-mudran-sewa`** | **Hackathon / Regional Identity** | Combines challenge code `NESFIC-D-39` with Assamese *"Mudran Sewa"* (মুদ্ৰণ সেৱা — Printing Service). |
| **`assam-press-inventory-tracker`** | **Direct & Technical** | Clear, descriptive, and highly searchable across engineering teams. |
| **`mudran-dristi-assam`** | **State Digital Mission Brand** | Styled like Assam state digital initiatives (e.g., *Dharitree*, *Mission Basundhara*). |
| **`gov-press-logistics-nesfic`** | **Supply Chain & Transit Focused** | Emphasizes the logistics and fleet transit across Assam's highway network. |

---

## 🖨️ Key Features Built for NESFIC-D-39

1. **Central Directorate Paper Warehouse & Consumables Ledger:**
   - Tracks flat paper reams and high-speed rotary web offset reels across standard GSM grades (Maplitho 60–80 GSM, Executive Sunlit Bond 80 GSM, Azurelaid Ledger 90 GSM, Gloss Art Board 300 GSM, Kraft paper 120 GSM).
   - Inward Goods Received Notes (GRN) capturing mill supplier, lot numbers, mill test certificate hashes, warehouse bays, and unit costs.
   - Automated minimum safety buffer thresholds with instant reorder alerts.

2. **Inter-Departmental e-Requisitions (e-Indents) Across 35 Districts:**
   - Digital requisition portal for District Commissioner (DC) offices, Assam Secretariat (Dispur), Gauhati High Court, Legislative Assembly, and Commissionerates.
   - Priority classification: `ROUTINE`, `URGENT_ASSEMBLY`, `CRITICAL_ELECTION`, and `JUDICIAL_EMERGENCY`.
   - Multi-tier sanction approval workflow with quota validation, sanction order numbers, and automated store issue slips.

3. **Press Production Floor & Trimming Loss Engine:**
   - Production job ticketing for Web Offset presses (Harris Reel-fed), Sheet-fed presses (Heidelberg Speedmaster), and automatic folding/stitching lines.
   - Real-time stage machine progression: `PRE_PRESS_PLATEMAKING` $\rightarrow$ `PROOF_APPROVED` $\rightarrow$ `PRESS_PRINTING` $\rightarrow$ `TRIMMING_CUTTING` $\rightarrow$ `BINDING_FINISHING` $\rightarrow$ `COMPLETED_WAREHOUSE`.
   - Paper wastage telemetry: Live monitoring of trimming loss % (alerts if wastage breaches the 3.0% threshold).

4. **The Assam Gazette (অসম ৰাজপত্ৰ) High-Security Vault:**
   - Serialized tracking of Ordinary and Extraordinary Gazette notifications.
   - Cryptographic SHA-256 digital checksum publication stamping to prevent unauthorized alterations or gazette forgeries.

5. **Tamper-Evident E-Gatepass & Fleet GPS Transit Tracking:**
   - Generates verifiable QR-coded E-Gatepasses linking requisition ID, transport carrier, driver details, and consignment manifest.
   - Interactive SVG radar transit map simulating movement across Assam's highway corridors (Guwahati Central Press $\rightarrow$ Nagaon $\rightarrow$ Kaziranga $\rightarrow$ Jorhat / Dibrugarh / Silchar).
   - Delivery acknowledgment with receiving Treasury Officer OTP / digital verification.

6. **Admin Command Center & Immutable Audit Ledger:**
   - Dedicated administration tab for store managers and press superintendents.
   - Immediate stock adjustment with required audit justification.
   - Form GFR-19 (CAG Stock Verification Register) JSON export.
   - Chained SHA-256 tamper-proof audit trail of all transactions.

---

## 🌐 Favicon, SEO & GEO Friendly Links & Metadata

### 1. Favicon & Web Manifest
- **Favicon (`apps/web/public/favicon.svg`)**:
  - Official vector emblem combining Government of Assam deep emerald green (`#004d40`), golden press cylinder rollers (`#f59e0b`), quill pen, and layered paper reams.
- **Web App Manifest (`apps/web/public/site.webmanifest`)**:
  - Name: `MudranSewa - Assam Government Press & Stationery Tracker`.

### 2. Search Engine & Social Graph Meta Tags
- **Title**: `NESFIC-D-39 | Digital Inventory & Movement Tracking | Directorate of Printing & Stationery, Assam`
- **Canonical URL**: `https://stationery.assam.gov.in/`
- **Open Graph**: `og:title`, `og:description`, `og:image`, `og:locale` (`en_IN`, `as_IN`), `og:site_name`.
- **Twitter Card**: `summary_large_image`.

### 3. GEO-Tagging (Hyper-Local Location Metadata)
- **`geo.region`**: `IN-AS` (India - Assam)
- **`geo.placename`**: `Bamunimaidam, Guwahati, Assam, India`
- **`geo.position`**: `26.1834;91.7766`
- **`ICBM`**: `26.1834, 91.7766`

### 4. Schema.org Structured Data (JSON-LD)
Includes embedded schemas for:
- `GovernmentOrganization`: Directorate of Printing & Stationery, Bamunimaidam, Guwahati.
- `GovernmentService`: Digital Inventory & Movement Tracking System (NESFIC-D-39).
- GeoCoordinates matching the central government printing facility in Bamunimaidam.

### 5. SEO & GEO Friendly Semantic URLs
Client-side pushState routes support direct semantic linking:
- `/inventory/stock-register` — Paper Reams & Consumables Warehouse
- `/requisition/e-indent` — Inter-Departmental Requisition Portal
- `/press/job-tickets` — Press Production Floor & Job Allocation
- `/dispatch/transit-tracker` — Consignment Dispatch & Highway Fleet Map
- `/admin/command-center` — Directorate Administration & Audit Vault

---

## 📡 REST API Catalog

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Service health status and NESFIC-D-39 identity |
| `GET` | `/api/districts` | List of 35 supported Assam districts |
| `GET` | `/api/inventory` | List all paper reels, reams, inks, and plates |
| `GET` | `/api/inventory/:id` | Detailed specifications of an inventory item |
| `POST` | `/api/inventory/inward` | Record Inward Delivery (GRN) |
| `POST` | `/api/inventory/:id/adjust` | Admin stock adjustment with audit reason |
| `GET` | `/api/requisitions` | List e-Indents with status/district filters |
| `POST` | `/api/requisitions` | Submit a new inter-departmental e-Indent |
| `POST` | `/api/requisitions/:id/approve` | Sanction an indent and issue sanction order |
| `GET` | `/api/press/jobs` | List active printing press job tickets |
| `POST` | `/api/press/jobs` | Create a new job ticket and allocate paper stock |
| `POST` | `/api/press/jobs/:id/stage` | Advance job stage and record trimming wastage % |
| `GET` | `/api/gazette/issues` | List verified The Assam Gazette notifications |
| `POST` | `/api/gazette/issues` | Publish and digitally stamp new Gazette issue |
| `GET` | `/api/dispatch/gatepasses` | List active dispatch gatepasses and transit statuses |
| `POST` | `/api/dispatch/create` | Generate a new QR E-Gatepass for vehicle dispatch |
| `POST` | `/api/dispatch/:id/deliver` | Acknowledge destination delivery via OTP verification |
| `GET` | `/api/verify/gatepass/:token` | Public / inspector verification of QR Gatepass |
| `GET` | `/api/analytics` | Executive dashboard metrics and buffer stock alerts |
| `GET` | `/api/admin/audit-logs` | Retrieve SHA-256 tamper-proof governance audit logs |

---

## 🚀 Quickstart & Verification

### 1. Run Automated Unit Tests
```bash
npm test
```
*Validates inventory seeding, GRN inwards, stock adjustment floors, e-indent lifecycles, press machine stages, QR gatepass resolution, and analytics.*

### 2. Start the Backend API (Port 4000)
```bash
npm run dev:api
# API runs at http://localhost:4000
```

### 3. Start the Web Portal (Port 3000)
```bash
npm run dev:web
# Web Portal runs at http://localhost:3000
```

---

## 🏛️ Project Directory Structure

```
Govt-Stationary-nesfic-d-39/
├── packages/
│   ├── contracts/          # Smart contract audit anchors & state roots
│   └── shared/             # Shared TypeScript & JavaScript types, constants, and Merkle engine
├── apps/
│   ├── api/                # HTTP REST API server & StationeryDB engine
│   │   ├── src/            # db.js and server.js
│   │   └── test/           # api.test.js and http.test.js
│   └── web/                # Government Web Portal
│       ├── public/         # index.html, styles.css, app.js, favicon.svg, site.webmanifest
│       ├── src/            # server.js (SPA fallback server)
│       └── functions/      # Cloudflare Pages edge functions ([[route]].js)
├── README.md               # Official project documentation
└── package.json            # Root workspaces configuration
```
