#!/usr/bin/env python3
"""
Generate High-Impact 16:9 Widescreen Technological Infographics for
ALL 12 PAGES of the Mudran-Sewa Proposal PDF (NESFIC-D-39).
Matches the architectural blueprint style of the Data Centers project.

Generates:
1.  d39_prop_fig1_problem_map.png    (Page 1: Problem Bottlenecks & Gaps)
2.  d39_fig_paradigm_shift.png       (Page 2: Already generated - Paradigm Shift)
3.  d39_prop_fig3_user_journey.png   (Page 3: 4-Persona Integrated User Journey)
4.  d39_fig_architecture.png         (Page 4: Already generated - 4-Tier Cloud-Edge Architecture)
5.  d39_prop_fig5_devsecops.png      (Page 5: Agile-DevSecOps 4-Stage Pipeline)
6.  d39_prop_fig6_gantt_roadmap.png  (Page 6: 6-Month Visual Phased Gantt Roadmap)
7.  d39_prop_fig7_data_pipeline.png  (Page 7: Data Ingestion & Transformation Pipeline)
8.  d39_prop_fig8_team_structure.png (Page 8: Multidisciplinary Team & Governance)
9.  d39_prop_fig9_testing_pyramid.png(Page 9: 4-Tier Testing & Verification Pyramid)
10. d39_prop_fig10_security_pillars.png (Page 10: Four Pillars of Defense-in-Depth Security)
11. d39_prop_fig11_competitive_radar.png(Page 11: Competitive Capability Radar Matrix)
12. d39_prop_fig12_pilot_map.png     (Page 12: 60-Day Multi-District Field Pilot Blueprint)
"""

import os
import textwrap
os.environ["MPLCONFIGDIR"] = "/tmp/matplotlib"
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import matplotlib.patches as patches
from matplotlib.patches import FancyBboxPatch, Rectangle, Circle, Polygon
import numpy as np

ASSETS_DIR = os.path.abspath("docs/assets")
os.makedirs(ASSETS_DIR, exist_ok=True)

# Corporate Blueprint Palette
C_BG = "#ffffff"
C_GRID = "#f1f5f9"
C_GRID_MAJOR = "#e2e8f0"
C_NAVY_TITLE = "#0f172a"
C_SUBTITLE = "#334155"
C_MUTED = "#64748b"

C_BLUE = "#1d4ed8"      # Royal Blue
C_PILLAR_BLUE = C_BLUE
C_CYAN = "#0284c7"      # Cyan
C_PILLAR_CYAN = C_CYAN
C_EMERALD = "#059669"   # Emerald Green
C_PILLAR_EMERALD = C_EMERALD
C_AMBER = "#d97706"     # Gold / Amber
C_PILLAR_AMBER = C_AMBER
C_PURPLE = "#7c3aed"    # Purple
C_PILLAR_PURPLE = C_PURPLE
C_CRIMSON = "#dc2626"   # Alert Crimson
C_PILLAR_CRIMSON = C_CRIMSON

def draw_blueprint_grid(ax):
    for x in np.linspace(0, 1, 41):
        ax.axvline(x, color=C_GRID, linewidth=0.5, zorder=0)
    for y in np.linspace(0, 1, 23):
        ax.axhline(y, color=C_GRID, linewidth=0.5, zorder=0)
    for x in np.linspace(0, 1, 9):
        ax.axvline(x, color=C_GRID_MAJOR, linewidth=0.8, linestyle="--", alpha=0.6, zorder=0)
    for y in np.linspace(0, 1, 5):
        ax.axhline(y, color=C_GRID_MAJOR, linewidth=0.8, linestyle="--", alpha=0.6, zorder=0)

def draw_header(ax, title, subtitle, badge_text=None, badge_color=C_EMERALD):
    ax.text(0.035, 0.950, title, fontsize=14.2, weight="bold", color=C_NAVY_TITLE, ha="left", va="center")
    ax.text(0.035, 0.908, subtitle, fontsize=9.2, weight="bold", color=C_SUBTITLE, ha="left", va="center")
    if badge_text:
        badge = FancyBboxPatch((0.835, 0.915), 0.130, 0.045, transform=ax.transAxes,
                               boxstyle="round,pad=0.005,rounding_size=0.010",
                               facecolor="#ffffff", edgecolor=badge_color, linewidth=1.5, zorder=10)
        ax.add_patch(badge)
        ax.text(0.900, 0.937, badge_text, fontsize=8.0, weight="bold", color=badge_color, ha="center", va="center", zorder=11)


# =============================================================================
# 1. PAGE 1: PROBLEM BOTTLENECKS & STRUCTURAL GAPS
# =============================================================================
def gen_prop_fig1_problem_map():
    fig, ax = plt.subplots(figsize=(13.76, 7.74), dpi=200)
    ax.set_facecolor(C_BG)
    fig.patch.set_facecolor(C_BG)
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    ax.axis("off")
    draw_blueprint_grid(ax)

    draw_header(ax,
                "ASSAM STATIONERY SUPPLY CHAIN: CURRENT BOTTLENECKS & STRUCTURAL GAPS",
                "Directorate of Printing & Stationery, Assam (Bamunimaidam, Guwahati) • NESFIC-D-39",
                "Current System Gaps", C_CRIMSON)

    bottlenecks = [
        {
            "num": "GAP 1", "title": "Paper Inflow Blind Spots", "color": C_CRIMSON, "bg": "#fef2f2", "border": "#fca5a5",
            "subtitle": "Unserialized Mill Lot Inward",
            "items": ["Manual paper ledger registers at shed inward", "No reel-level GSM or mill lot barcode tracking", "Stock discrepancies surface only during annual audits", "Untracked moisture variances across paper shipments"]
        },
        {
            "num": "GAP 2", "title": "Press Trimming Wastage", "color": C_AMBER, "bg": "#fffbeb", "border": "#fde68a",
            "subtitle": "Unmonitored Press Scrap >5%",
            "items": ["Loose job slips with zero cutting telemetry", "Trimming loss exceeds statutory tolerances (<2% vs >5%)", "No real-time machine speed or scrap feedback", "Guillotine & rotary trimming loss unallocated"]
        },
        {
            "num": "GAP 3", "title": "Postal Indent Delays", "color": C_PURPLE, "bg": "#faf5ff", "border": "#e9d5ff",
            "subtitle": "21-Day Bureaucratic Turnaround",
            "items": ["Physical indent letters sent via postal mail", "3-4 weeks to verify departmental quotas", "Artificial stationery shortages in remote districts", "No priority triage for urgent legislative/election needs"]
        },
        {
            "num": "GAP 4", "title": "Highway Transit Leakage", "color": C_BLUE, "bg": "#eff6ff", "border": "#93c5fd",
            "subtitle": "Untracked Corridor Movement",
            "items": ["Physical paper gatepasses vulnerable to loss/forgery", "Zero transit visibility on NH-27/NH-37 corridors", "Consignment diversion risks along inter-district routes", "Months of delay for treasury receipt reconciliation"]
        }
    ]

    cw = 0.222
    gap = 0.02
    left = 0.035
    ch = 0.72

    for i, b in enumerate(bottlenecks):
        x = left + i * (cw + gap)
        y = 0.12
        card = FancyBboxPatch((x, y), cw, ch, transform=ax.transAxes,
                              boxstyle="round,pad=0.005,rounding_size=0.015",
                              facecolor=b["bg"], edgecolor=b["border"], linewidth=1.5, zorder=2)
        ax.add_patch(card)

        hdr = FancyBboxPatch((x, y + ch - 0.088), cw, 0.088, transform=ax.transAxes,
                             boxstyle="round,pad=0.005,rounding_size=0.015",
                             facecolor=b["color"], edgecolor=None, zorder=3)
        ax.add_patch(hdr)
        ax.text(x + 0.015, y + ch - 0.026, b["num"], fontsize=8.5, weight="bold", color="#ffffff", zorder=4)
        ax.text(x + 0.015, y + ch - 0.052, b["title"], fontsize=9.6, weight="bold", color="#ffffff", zorder=4)
        ax.text(x + 0.015, y + ch - 0.074, b["subtitle"], fontsize=7.2, color="#f1f5f9", zorder=4)

        iy = y + ch - 0.118
        for p in b["items"]:
            ax.add_patch(Circle((x + 0.014, iy - 0.006), 0.0035, transform=ax.transAxes, facecolor=b["color"], zorder=5))
            wrapped = textwrap.fill(p, width=28)
            ax.text(x + 0.024, iy, wrapped, fontsize=7.3, color="#1e293b", zorder=5, va="top")
            iy -= 0.122

        # Bottom Impact Pill
        impact_pill = FancyBboxPatch((x + 0.015, y + 0.025), cw - 0.03, 0.038, transform=ax.transAxes,
                                     boxstyle="round,pad=0.003,rounding_size=0.006",
                                     facecolor="#ffffff", edgecolor=b["color"], linewidth=1, zorder=6)
        ax.add_patch(impact_pill)
        impact_labels = ["Risk: Stockout Discrepancy", "Loss: > Rs. 45L Scrap/Yr", "Lag: 21-Day Delay", "Risk: Highway Diversion"]
        ax.text(x + cw/2, y + 0.044, impact_labels[i], fontsize=7.0, weight="bold", color=b["color"], ha="center", va="center", zorder=7)

    out_path = os.path.join(ASSETS_DIR, "d39_prop_fig1_problem_map.png")
    plt.savefig(out_path, dpi=200, bbox_inches="tight")
    plt.close()
    print(f"Generated: {out_path}")


# =============================================================================
# 2. PAGE 3: 4-PERSONA INTEGRATED USER JOURNEY
# =============================================================================
def gen_prop_fig3_user_journey():
    fig, ax = plt.subplots(figsize=(13.76, 7.74), dpi=200)
    ax.set_facecolor(C_BG)
    fig.patch.set_facecolor(C_BG)
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    ax.axis("off")
    draw_blueprint_grid(ax)

    draw_header(ax,
                "MUDRAN-SEWA: 4-PERSONA INTEGRATED USER JOURNEY",
                "Seamless Workflow from District Requisition to Destination Handshake • NESFIC-D-39",
                "Closed-Loop Flow", C_EMERALD)

    personas = [
        {
            "step": "PERSONA 1", "role": "Indenting DC Officer", "loc": "Jorhat District Commissionerate",
            "color": C_BLUE, "bg": "#eff6ff", "border": "#93c5fd",
            "actions": [
                ("Digital Login & Quota Check", "Checks annual stationery quota balance on mobile/web portal"),
                ("Priority Requisition Tagging", "Selects Azurelaid Ledger paper marked 'Urgent Revenue Administration'"),
                ("Instant e-Indent Submission", "Routes digital request to Directorate Director at Bamunimaidam"),
                ("Automated Sanction Tracking", "Receives digital Sanction Order within 24 hours")
            ]
        },
        {
            "step": "PERSONA 2", "role": "Central Storekeeper", "loc": "Bamunimaidam Store Shed #2",
            "color": C_CYAN, "bg": "#f0fdfa", "border": "#99f6e4",
            "actions": [
                ("Raw Mill Lot Verification", "Scans inward paper reel barcodes & enters mill inspection GRN"),
                ("Safety Buffer Monitoring", "System monitors stock vs <800 ream reserve threshold"),
                ("Job Material Allocation", "Issues 500 reams to Press Line against Sanction Order"),
                ("Stock Ledger Sync", "Inventory automatically debited with chained audit logging")
            ]
        },
        {
            "step": "PERSONA 3", "role": "Press Superintendent", "loc": "Bamunimaidam Printing Floor",
            "color": C_EMERALD, "bg": "#ecfdf5", "border": "#a7f3d0",
            "actions": [
                ("Digital Job Ticket Queue", "Assigns Job Ticket JOB-GAZ-2026-042 to Harris Web Offset"),
                ("Real-Time Telemetry", "Monitors paper speed (8,500 imp/hr) & paper intake weight"),
                ("Trimming Scrap Guard", "Automated telemetry verifies trimming loss at 2.41% (<3.0%)"),
                ("Gazette Vault Stamping", "Stamps finished publication with SHA-256 digital checksum")
            ]
        },
        {
            "step": "PERSONA 4", "role": "Receiving Treasury Officer", "loc": "Jorhat District Treasury",
            "color": C_AMBER, "bg": "#fffbeb", "border": "#fde68a",
            "actions": [
                ("Highway Fleet Arrival", "Transport truck AS-01-GC-4412 arrives at treasury compound"),
                ("QR Gatepass Verification", "Scans driver QR E-Gatepass on handheld to inspect manifest"),
                ("OTP Delivery Handshake", "Enters 6-digit delivery OTP to confirm physical carton seals"),
                ("Zero-Leakage Inward", "Stationery instantly credited to district stock with 100% audit")
            ]
        }
    ]

    cw = 0.222
    gap = 0.02
    left = 0.035
    ch = 0.72

    for i, p in enumerate(personas):
        x = left + i * (cw + gap)
        y = 0.12
        card = FancyBboxPatch((x, y), cw, ch, transform=ax.transAxes,
                              boxstyle="round,pad=0.005,rounding_size=0.015",
                              facecolor=p["bg"], edgecolor=p["border"], linewidth=1.5, zorder=2)
        ax.add_patch(card)

        hdr = FancyBboxPatch((x, y + ch - 0.088), cw, 0.088, transform=ax.transAxes,
                             boxstyle="round,pad=0.005,rounding_size=0.015",
                             facecolor=p["color"], edgecolor=None, zorder=3)
        ax.add_patch(hdr)
        ax.text(x + 0.015, y + ch - 0.026, p["step"], fontsize=8.5, weight="bold", color="#ffffff", zorder=4)
        ax.text(x + 0.015, y + ch - 0.052, p["role"], fontsize=9.6, weight="bold", color="#ffffff", zorder=4)
        ax.text(x + 0.015, y + ch - 0.074, p["loc"], fontsize=7.2, color="#f1f5f9", zorder=4)

        iy = y + ch - 0.118
        for h_text, d_text in p["actions"]:
            ax.add_patch(Circle((x + 0.014, iy - 0.006), 0.004, transform=ax.transAxes, facecolor=p["color"], zorder=5))
            ax.text(x + 0.024, iy, h_text, fontsize=8.2, weight="bold", color=C_NAVY_TITLE, zorder=5)
            wrapped = textwrap.fill(d_text, width=28)
            ax.text(x + 0.024, iy - 0.022, wrapped, fontsize=7.1, color="#475569", zorder=5, va="top")
            iy -= 0.122

        if i < len(personas) - 1:
            ax.annotate("", xy=(x + cw + gap + 0.003, 0.48), xytext=(x + cw - 0.003, 0.48),
                        arrowprops=dict(arrowstyle="->", color=C_MUTED, lw=2.2, mutation_scale=14), zorder=8)

    out_path = os.path.join(ASSETS_DIR, "d39_prop_fig3_user_journey.png")
    plt.savefig(out_path, dpi=200, bbox_inches="tight")
    plt.close()
    print(f"Generated: {out_path}")


# =============================================================================
# 3. PAGE 5: AGILE-DEVSECOPS 4-STAGE PIPELINE
# =============================================================================
def gen_prop_fig5_devsecops():
    fig, ax = plt.subplots(figsize=(13.76, 7.74), dpi=200)
    ax.set_facecolor(C_BG)
    fig.patch.set_facecolor(C_BG)
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    ax.axis("off")
    draw_blueprint_grid(ax)

    draw_header(ax,
                "AGILE-DEVSECOPS 4-STAGE DEVELOPMENT & VALIDATION PIPELINE",
                "Sprint Sequencing from Requirements Discovery to Production Handover • NESFIC-D-39",
                "Agile Framework", C_PILLAR_BLUE)

    stages = [
        {
            "stage": "STAGE 1", "title": "Discovery & Calibration", "time": "Months 1 - 2 (Weeks 1 to 8)",
            "color": C_BLUE, "bg": "#eff6ff", "border": "#93c5fd",
            "items": [
                ("Stakeholder Co-Design", "Field workshops at Bamunimaidam & Jorhat Branch Press"),
                ("Store & Paper Audit", "Audit paper GSM specifications (60–300 GSM) & mill lots"),
                ("CAG GFR-19 Calibration", "Translate statutory financial rules into software schemas"),
                ("Deliverable Gate", "Signed System Requirements Specification (SRS) & Scrap Matrix")
            ]
        },
        {
            "stage": "STAGE 2", "title": "Core Architecture Build", "time": "Months 2 - 3 (Weeks 9 to 14)",
            "color": C_CYAN, "bg": "#f0fdfa", "border": "#99f6e4",
            "items": [
                ("Database Schemas", "Deploy relational D1 / PostgreSQL ACID database schemas"),
                ("Scrap Telemetry Engine", "Implement real-time trimming scrap calculation algorithm"),
                ("Buffer Threshold Triggers", "Automated alert engine for critical paper reserves (<800 reams)"),
                ("Deliverable Gate", "Automated Test Suite Verified (10/10 unit tests in 18ms)")
            ]
        },
        {
            "stage": "STAGE 3", "title": "Portals & QR Gateway", "time": "Months 3 - 4 (Weeks 15 to 18)",
            "color": C_EMERALD, "bg": "#ecfdf5", "border": "#a7f3d0",
            "items": [
                ("Multi-Persona PWAs", "Storekeeper, Press Supervisor, and DC Indent portals"),
                ("Offline IndexedDB Cache", "Offline data synchronization for press basement sheds"),
                ("Transit Radar & Scanner", "Interactive SVG highway radar map & QR gatepass scanner"),
                ("Deliverable Gate", "Integrated Alpha & Beta Releases Ready for Staging")
            ]
        },
        {
            "stage": "STAGE 4", "title": "Pilot & Security Audit", "time": "Months 5 - 6 (Weeks 19 to 24)",
            "color": C_AMBER, "bg": "#fffbeb", "border": "#fde68a",
            "items": [
                ("60-Day Field Pilot", "Tri-district live trial at Bamunimaidam, Nagaon & Jorhat"),
                ("CERT-In VAPT Audit", "Third-party application security & vulnerability clearance"),
                ("User Training Manuals", "Bilingual Assamese/English manuals for 35 DC officers"),
                ("Deliverable Gate", "Production-Ready Platform Handover & Statewide Scaling")
            ]
        }
    ]

    cw = 0.222
    gap = 0.02
    left = 0.035
    ch = 0.72

    for i, s in enumerate(stages):
        x = left + i * (cw + gap)
        y = 0.12
        card = FancyBboxPatch((x, y), cw, ch, transform=ax.transAxes,
                              boxstyle="round,pad=0.005,rounding_size=0.015",
                              facecolor=s["bg"], edgecolor=s["border"], linewidth=1.5, zorder=2)
        ax.add_patch(card)

        hdr = FancyBboxPatch((x, y + ch - 0.088), cw, 0.088, transform=ax.transAxes,
                             boxstyle="round,pad=0.005,rounding_size=0.015",
                             facecolor=s["color"], edgecolor=None, zorder=3)
        ax.add_patch(hdr)
        ax.text(x + 0.015, y + ch - 0.026, s["stage"], fontsize=8.5, weight="bold", color="#ffffff", zorder=4)
        ax.text(x + 0.015, y + ch - 0.052, s["title"], fontsize=9.6, weight="bold", color="#ffffff", zorder=4)
        ax.text(x + 0.015, y + ch - 0.074, s["time"], fontsize=7.2, color="#f1f5f9", zorder=4)

        iy = y + ch - 0.118
        for h_text, d_text in s["items"]:
            ax.add_patch(Circle((x + 0.014, iy - 0.006), 0.004, transform=ax.transAxes, facecolor=s["color"], zorder=5))
            ax.text(x + 0.024, iy, h_text, fontsize=8.2, weight="bold", color=C_NAVY_TITLE, zorder=5)
            wrapped = textwrap.fill(d_text, width=28)
            ax.text(x + 0.024, iy - 0.022, wrapped, fontsize=7.1, color="#475569", zorder=5, va="top")
            iy -= 0.122

        if i < len(stages) - 1:
            ax.annotate("", xy=(x + cw + gap + 0.003, 0.48), xytext=(x + cw - 0.003, 0.48),
                        arrowprops=dict(arrowstyle="->", color=C_MUTED, lw=2.2, mutation_scale=14), zorder=8)

    out_path = os.path.join(ASSETS_DIR, "d39_prop_fig5_devsecops.png")
    plt.savefig(out_path, dpi=200, bbox_inches="tight")
    plt.close()
    print(f"Generated: {out_path}")


# =============================================================================
# 4. PAGE 6: 6-MONTH VISUAL PHASED GANTT ROADMAP
# =============================================================================
def gen_prop_fig6_gantt_roadmap():
    fig, ax = plt.subplots(figsize=(13.76, 7.74), dpi=200)
    ax.set_facecolor(C_BG)
    fig.patch.set_facecolor(C_BG)
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    ax.axis("off")
    draw_blueprint_grid(ax)

    draw_header(ax,
                "6-MONTH DEVELOPMENT TIMELINE & CRITICAL MILESTONE ROADMAP",
                "Phased 24-Week Implementation Phasing & Readiness Gates • NESFIC-D-39",
                "24-Week Schedule", C_AMBER)

    months = ["Month 1", "Month 2", "Month 3", "Month 4", "Month 5", "Month 6"]
    m_start = 0.28
    m_w = 0.11

    # Draw month column headers
    for idx, m in enumerate(months):
        mx = m_start + idx * m_w
        ax.add_patch(Rectangle((mx, 0.82), m_w - 0.01, 0.045, transform=ax.transAxes, facecolor="#004d40", edgecolor=None))
        ax.text(mx + (m_w - 0.01)/2, 0.842, m, fontsize=8.5, weight="bold", color="#ffffff", ha="center", va="center")

    tasks = [
        ("Phase 1: Discovery & Requirements", 0, 1.8, C_BLUE, "Milestone 1: SRS Sign-Off"),
        ("Phase 2: Core Schemas & Scrap Engine", 1.0, 2.5, C_CYAN, "Milestone 2: Automated Tests Pass"),
        ("Phase 3: Multi-Persona Portals & PWA", 2.0, 3.8, C_EMERALD, "Milestone 3: Alpha Release Ready"),
        ("Phase 4: Transit Radar & CERT-In Audit", 3.0, 4.5, C_PURPLE, "Milestone 4: Beta & VAPT Clearance"),
        ("Phase 5: 60-Day Tri-District Field Pilot", 4.0, 5.8, C_AMBER, "Milestone 5: Field Verification"),
        ("Phase 6: Final Evaluation & Handover", 5.0, 6.0, C_EMERALD, "Milestone 6: Statewide Deployment")
    ]

    ty = 0.74
    for tname, tstart, tend, tcol, mstone in tasks:
        # Task label on left
        ax.text(0.035, ty + 0.015, tname, fontsize=8.2, weight="bold", color=C_NAVY_TITLE)
        
        # Gantt Bar
        bx = m_start + (tstart / 6.0) * (m_w * 6)
        bw = ((tend - tstart) / 6.0) * (m_w * 6) - 0.01
        
        bar = FancyBboxPatch((bx, ty), bw, 0.042, transform=ax.transAxes,
                             boxstyle="round,pad=0.003,rounding_size=0.008",
                             facecolor=tcol, edgecolor=None, zorder=3)
        ax.add_patch(bar)
        
        # Milestone diamond at end
        dia_x = bx + bw
        dia = Polygon([[dia_x, ty + 0.021], [dia_x + 0.012, ty + 0.035], [dia_x + 0.024, ty + 0.021], [dia_x + 0.012, ty + 0.007]],
                      transform=ax.transAxes, facecolor="#f59e0b", edgecolor="#ffffff", linewidth=1, zorder=4)
        ax.add_patch(dia)
        ax.text(dia_x + 0.028, ty + 0.021, mstone, fontsize=6.8, weight="bold", color=tcol, va="center", zorder=5)

        ty -= 0.10

    # Bottom Callout Box
    cb = FancyBboxPatch((0.035, 0.05), 0.93, 0.09, transform=ax.transAxes,
                        boxstyle="round,pad=0.005,rounding_size=0.01",
                        facecolor="#ecfdf5", edgecolor="#a7f3d0", linewidth=1.2)
    ax.add_patch(cb)
    ax.text(0.05, 0.105, "CRITICAL PATH DEPENDENCY MILESTONES & READINESS CRITERIA:", fontsize=8.2, weight="bold", color="#065f46")
    ax.text(0.05, 0.075, "• Month 2 Gate: Zero-defect schema migration & in-process test passing (100% test coverage on inventory math)", fontsize=7.4, color="#334155")
    ax.text(0.05, 0.055, "• Month 4 Gate: CERT-In application security clearance & Cloudflare Edge staging deployment with SDC proxy", fontsize=7.4, color="#334155")

    out_path = os.path.join(ASSETS_DIR, "d39_prop_fig6_gantt_roadmap.png")
    plt.savefig(out_path, dpi=200, bbox_inches="tight")
    plt.close()
    print(f"Generated: {out_path}")


# =============================================================================
# 5. PAGE 7: DATA INGESTION & TRANSFORMATION PIPELINE
# =============================================================================
def gen_prop_fig7_data_pipeline():
    fig, ax = plt.subplots(figsize=(13.76, 7.74), dpi=200)
    ax.set_facecolor(C_BG)
    fig.patch.set_facecolor(C_BG)
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    ax.axis("off")
    draw_blueprint_grid(ax)

    draw_header(ax,
                "DATA INGESTION, ENTITY TRANSFORMATION & INTEGRITY ARCHITECTURE",
                "Structured Schema Ingestion & Basis Weight Math Normalization • NESFIC-D-39",
                "ACID Normalized", C_PILLAR_BLUE)

    streams = [
        ("Central Store Logs", "Paper Reel & Ream Inward", "Reel IDs, GSM (60-300), Mill lot no, Roll gross/net kg, Buffer limit", C_BLUE, "#eff6ff"),
        ("District e-Indents", "35 DC Requisition Slips", "Indent ID, Indenting dept, Quota limit, Priority tag, Sanction token", C_CYAN, "#f0fdfa"),
        ("Press Machine Feeds", "Harris Web & Heidelberg Slips", "Job tickets, Paper kg consumed, Impressions run, Trimming scrap kg", C_EMERALD, "#ecfdf5"),
        ("Transit Fleet Radar", "Highway Telemetry & Gatepasses", "Gatepass ID, Vehicle reg, Driver phone, GPS waypoint, Delivery OTP", C_AMBER, "#fffbeb")
    ]

    sw = 0.222
    gap = 0.02
    left = 0.035
    for i, (sname, ssub, sschema, scol, sbg) in enumerate(streams):
        sx = left + i * (sw + gap)
        sp = FancyBboxPatch((sx, 0.52), sw, 0.34, transform=ax.transAxes,
                            boxstyle="round,pad=0.005,rounding_size=0.012",
                            facecolor=sbg, edgecolor=scol, linewidth=1.2)
        ax.add_patch(sp)
        # Header strip
        ax.add_patch(Rectangle((sx, 0.80), sw, 0.06, transform=ax.transAxes, facecolor=scol, edgecolor=None))
        ax.text(sx + 0.012, 0.835, sname, fontsize=8.8, weight="bold", color="#ffffff")
        ax.text(sx + 0.012, 0.812, ssub, fontsize=7.2, color="#f1f5f9")
        
        ax.text(sx + 0.012, 0.77, "Schema Attributes:", fontsize=7.8, weight="bold", color=C_NAVY_TITLE)
        wrapped = textwrap.fill(sschema, width=28)
        ax.text(sx + 0.012, 0.74, wrapped, fontsize=7.2, color="#475569", va="top")

        # Down arrow to central hub
        ax.annotate("", xy=(sx + sw/2, 0.46), xytext=(sx + sw/2, 0.52),
                    arrowprops=dict(arrowstyle="->", color=scol, lw=2, mutation_scale=12))

    # Central Ingestion & Normalization Hub
    hub = FancyBboxPatch((0.035, 0.18), 0.93, 0.26, transform=ax.transAxes,
                         boxstyle="round,pad=0.008,rounding_size=0.015",
                         facecolor="#00332c", edgecolor="#004d40", linewidth=1.5)
    ax.add_patch(hub)
    ax.text(0.5, 0.40, "STANDARDIZED MATHEMATICAL BASIS WEIGHT & RECONCILIATION ENGINE", fontsize=9.8, weight="bold", color="#f59e0b", ha="center")
    
    # Formula Box
    fb = FancyBboxPatch((0.055, 0.22), 0.43, 0.15, transform=ax.transAxes,
                        boxstyle="round,pad=0.005,rounding_size=0.008",
                        facecolor="#00241e", edgecolor="#065f46", linewidth=1)
    ax.add_patch(fb)
    ax.text(0.07, 0.33, "Standard Basis Weight Ream Conversion Formulation:", fontsize=7.8, weight="bold", color="#a7f3d0")
    ax.text(0.07, 0.30, "Weight (kg) = [ Length(mm) × Width(mm) × GSM × Sheets ] / 10^9", fontsize=7.6, weight="bold", color="#ffffff", family="monospace")
    ax.text(0.07, 0.27, "Example: 1 Ream Maplitho 80 GSM (430×610mm, 500 sheets) = 10.496 kg", fontsize=7.0, color="#fde68a")
    ax.text(0.07, 0.24, "Automated Reconcile: Reel Net Weight (kg) == Ream Count × 10.496 kg", fontsize=7.0, color="#ffffff")

    # Output box
    ob = FancyBboxPatch((0.515, 0.22), 0.43, 0.15, transform=ax.transAxes,
                        boxstyle="round,pad=0.005,rounding_size=0.008",
                        facecolor="#00241e", edgecolor="#065f46", linewidth=1)
    ax.add_patch(ob)
    ax.text(0.53, 0.33, "Output Schemas & Governance Assurance:", fontsize=7.8, weight="bold", color="#fde68a")
    ax.text(0.53, 0.30, "• 100% Relational ACID Integrity: Zero orphan records between stores & press", fontsize=7.2, color="#ffffff")
    ax.text(0.53, 0.27, "• Form GFR-19 Audit Registry: Generated with 1-click for CAG annual audit", fontsize=7.2, color="#a7f3d0")
    ax.text(0.53, 0.24, "• Cryptographic Immutability: SHA-256 digital stamping on all output slips", fontsize=7.2, color="#ffffff")

    out_path = os.path.join(ASSETS_DIR, "d39_prop_fig7_data_pipeline.png")
    plt.savefig(out_path, dpi=200, bbox_inches="tight")
    plt.close()
    print(f"Generated: {out_path}")


# =============================================================================
# 6. PAGE 8: MULTIDISCIPLINARY TEAM & GOVERNANCE HIERARCHY
# =============================================================================
def gen_prop_fig8_team_structure():
    fig, ax = plt.subplots(figsize=(13.76, 7.74), dpi=200)
    ax.set_facecolor(C_BG)
    fig.patch.set_facecolor(C_BG)
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    ax.axis("off")
    draw_blueprint_grid(ax)

    draw_header(ax,
                "PROJECT LEADERSHIP, MULTIDISCIPLINARY TEAM & GOVERNANCE HIERARCHY",
                "Technical Expertise & State Institutional Liaison Structure • NESFIC-D-39",
                "Dedicated Team", C_PILLAR_BLUE)

    # Top: Lead Innovator / Project Lead Card
    top_w = 0.54
    top_box = FancyBboxPatch((0.23, 0.68), top_w, 0.18, transform=ax.transAxes,
                             boxstyle="round,pad=0.006,rounding_size=0.012",
                             facecolor="#eff6ff", edgecolor=C_BLUE, linewidth=1.5)
    ax.add_patch(top_box)
    ax.add_patch(Rectangle((0.23, 0.81), top_w, 0.05, transform=ax.transAxes, facecolor=C_BLUE, edgecolor=None))
    ax.text(0.50, 0.835, "PROJECT LEAD & SOLUTIONS ARCHITECT", fontsize=9.2, weight="bold", color="#ffffff", ha="center")
    ax.text(0.50, 0.775, "Ron Hatibaruah (ron.hatibaruah@gmail.com)", fontsize=10.5, weight="bold", color=C_NAVY_TITLE, ha="center")
    ax.text(0.50, 0.745, "Full-Stack Distributed Systems, Cloud Architecture & Enterprise Delivery • 100% Full-Time (24 Weeks)", fontsize=7.8, color="#475569", ha="center")
    ax.text(0.50, 0.715, "Manages agile sprint execution, architecture integrity, and Directorate/AISF stakeholder alignment", fontsize=7.2, color="#0369a1", ha="center", weight="semibold")

    # Connector line down
    ax.plot([0.50, 0.50], [0.68, 0.56], transform=ax.transAxes, color=C_MUTED, linewidth=2)
    ax.plot([0.14, 0.86], [0.56, 0.56], transform=ax.transAxes, color=C_MUTED, linewidth=2)

    # 4 Specialist Columns
    specialists = [
        ("Cloud & Backend Lead", "API & Database Specialist", "REST APIs, Cloudflare Edge, D1/PostgreSQL, transactional integrity", "Full-Time (Phases 2-3)", C_CYAN, 0.035),
        ("Frontend & PWA Lead", "Mobile & UI/UX Specialist", "PWAs, offline caching (IndexedDB), responsive multi-persona dashboards", "Full-Time (Phases 2-4)", C_EMERALD, 0.28),
        ("Press Domain Advisor", "Printing Operations Specialist", "Assam Govt Press workflows, paper GSM specs, binding lines, CAG GFR-19", "50% Allocation (10 wks)", C_AMBER, 0.525),
        ("DevSecOps & QA Lead", "Security & Compliance Specialist", "CERT-In compliance, VAPT audits, CI/CD automated testing, DPDP Act", "50% Dev / 100% Pilot", C_PURPLE, 0.77)
    ]

    for title, role, desc, commit, col, x in specialists:
        ax.plot([x + 0.098, x + 0.098], [0.56, 0.48], transform=ax.transAxes, color=C_MUTED, linewidth=2)
        card = FancyBboxPatch((x, 0.16), 0.195, 0.32, transform=ax.transAxes,
                              boxstyle="round,pad=0.005,rounding_size=0.01",
                              facecolor="#ffffff", edgecolor=col, linewidth=1.2)
        ax.add_patch(card)
        ax.add_patch(Rectangle((x, 0.42), 0.195, 0.06, transform=ax.transAxes, facecolor=col, edgecolor=None))
        ax.text(x + 0.097, 0.455, title, fontsize=7.8, weight="bold", color="#ffffff", ha="center")
        ax.text(x + 0.097, 0.432, role, fontsize=6.8, color="#f1f5f9", ha="center")
        
        wrapped = textwrap.fill(desc, width=24)
        ax.text(x + 0.01, 0.38, wrapped, fontsize=7.2, color="#334155", va="top")
        
        # Commitment pill
        cp = FancyBboxPatch((x + 0.01, 0.18), 0.175, 0.035, transform=ax.transAxes,
                            boxstyle="round,pad=0.002,rounding_size=0.005",
                            facecolor="#f8fafc", edgecolor=col, linewidth=0.8)
        ax.add_patch(cp)
        ax.text(x + 0.097, 0.197, commit, fontsize=6.5, weight="bold", color=col, ha="center", va="center")

    # Bottom Governance Ribbon
    gov_box = FancyBboxPatch((0.035, 0.04), 0.93, 0.08, transform=ax.transAxes,
                             boxstyle="round,pad=0.004,rounding_size=0.008",
                             facecolor="#00332c", edgecolor="#004d40", linewidth=1)
    ax.add_patch(gov_box)
    ax.text(0.5, 0.088, "STATE INSTITUTIONAL GOVERNANCE & OVERSIGHT LIAISON", fontsize=8.2, weight="bold", color="#f59e0b", ha="center")
    ax.text(0.5, 0.060, "Directorate of Printing & Stationery, Assam (Bamunimaidam HQ)  |  Assam Innovation & Startup Foundation (AISF)  |  NESFIC 2026 Steering Committee",
            fontsize=7.4, color="#ffffff", ha="center")

    out_path = os.path.join(ASSETS_DIR, "d39_prop_fig8_team_structure.png")
    plt.savefig(out_path, dpi=200, bbox_inches="tight")
    plt.close()
    print(f"Generated: {out_path}")


# =============================================================================
# 7. PAGE 9: 4-TIER TESTING & VERIFICATION PYRAMID
# =============================================================================
def gen_prop_fig9_testing_pyramid():
    fig, ax = plt.subplots(figsize=(13.76, 7.74), dpi=200)
    ax.set_facecolor(C_BG)
    fig.patch.set_facecolor(C_BG)
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    ax.axis("off")
    draw_blueprint_grid(ax)

    draw_header(ax,
                "4-TIER QUALITY ASSURANCE & BENCHMARK VERIFICATION PYRAMID",
                "Rigorous Algorithmic, Hardware & Multi-District Stress Testing • NESFIC-D-39",
                "10/10 Tests Passed", C_EMERALD)

    # Pyramid Tiers (Drawn as layered trapezoids/rectangles on left)
    tiers = [
        ("Tier 4: Hardware & Low-Light QR Scanner Field Verification", "Crumpled prints, low light, dirty lenses, <200ms scanner decode", C_CRIMSON, 0.32, 0.36, 0.70),
        ("Tier 3: 35-District Highway Transit Stress Simulation", "50 concurrent vehicle consignments across NH-27/NH-37 corridors", C_AMBER, 0.24, 0.52, 0.54),
        ("Tier 2: Trimming Scrap Formula & Anomaly Detection", "Algorithmic validation against press run logs; >3.0% alert accuracy", C_CYAN, 0.16, 0.68, 0.38),
        ("Tier 1: In-Process Automated Unit Testing (Base)", "10 unit tests executing in 18ms via native Node.js runner (100% pass)", C_EMERALD, 0.08, 0.84, 0.22),
    ]

    for tname, tdesc, tcol, y, w, h_tier in tiers:
        px = 0.5 - w/2
        trap = FancyBboxPatch((px, y), w, 0.09, transform=ax.transAxes,
                              boxstyle="round,pad=0.005,rounding_size=0.01",
                              facecolor="#ffffff", edgecolor=tcol, linewidth=1.5, zorder=2)
        ax.add_patch(trap)
        ax.add_patch(Rectangle((px, y + 0.055), w, 0.035, transform=ax.transAxes, facecolor=tcol, edgecolor=None, zorder=3))
        ax.text(0.5, y + 0.072, tname, fontsize=8.5, weight="bold", color="#ffffff", ha="center", zorder=4)
        ax.text(0.5, y + 0.025, tdesc, fontsize=7.4, color="#334155", ha="center", zorder=4)

    # Top Benchmark Indicator
    ax.text(0.5, 0.82, "BENCHMARK PERFORMANCE EVIDENCE: 10/10 UNIT TESTS PASSING IN 18.42ms",
            fontsize=9.2, weight="bold", color="#065f46", ha="center")

    out_path = os.path.join(ASSETS_DIR, "d39_prop_fig9_testing_pyramid.png")
    plt.savefig(out_path, dpi=200, bbox_inches="tight")
    plt.close()
    print(f"Generated: {out_path}")


# =============================================================================
# 8. PAGE 10: FOUR PILLARS OF DEFENSE-IN-DEPTH SECURITY
# =============================================================================
def gen_prop_fig10_security_pillars():
    fig, ax = plt.subplots(figsize=(13.76, 7.74), dpi=200)
    ax.set_facecolor(C_BG)
    fig.patch.set_facecolor(C_BG)
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    ax.axis("off")
    draw_blueprint_grid(ax)

    draw_header(ax,
                "DEFENSE-IN-DEPTH SECURITY, PRIVACY & COMPLIANCE ARCHITECTURE",
                "Four Pillars of Institutional Governance & State Sovereign Custody • NESFIC-D-39",
                "CERT-In Compliant", C_EMERALD)

    pillars = [
        {
            "p_num": "PILLAR 1", "title": "Assam SDC Data Sovereignty", "color": C_BLUE, "bg": "#eff6ff", "border": "#93c5fd",
            "items": [
                ("State Sovereign Hosting", "Hosted strictly inside Assam State Data Centre in Guwahati"),
                ("Zero External Data Egress", "All database records, credentials & logs remain in Assam"),
                ("Air-Gapped Core Database", "Isolated database subnets with strict internal firewall routing")
            ]
        },
        {
            "p_num": "PILLAR 2", "title": "Read-Only Legacy Safety", "color": C_CYAN, "bg": "#f0fdfa", "border": "#99f6e4",
            "items": [
                ("Non-Invasive Architecture", "Decision-support layer that never overwrites legacy systems"),
                ("One-Way API Ingestion", "Scheduled batch queues ingest paper receipts without DB locks"),
                ("Zero System Disruption", "Existing Directorate operational processes continue smoothly")
            ]
        },
        {
            "p_num": "PILLAR 3", "title": "Zero-Trust RBAC & Checksums", "color": C_EMERALD, "bg": "#ecfdf5", "border": "#a7f3d0",
            "items": [
                ("Strict Role Segregation", "Storekeeper, Press Supervisor, DC Nodal & Directorate Admin"),
                ("SHA-256 Gazette Stamping", "The Assam Gazette issues stamped with immutable hash"),
                ("Tamper-Proof Audit Trail", "Chained audit log tracking every stock adjustment bit-for-bit")
            ]
        },
        {
            "p_num": "PILLAR 4", "title": "India DPDP Act 2023", "color": C_AMBER, "bg": "#fffbeb", "border": "#fde68a",
            "items": [
                ("PII Data Masking", "Driver phone numbers and officer identity masked on public QR"),
                ("Encrypted at Rest & Transit", "AES-256 database encryption and mandatory TLS 1.3 in transit"),
                ("Statutory Compliance", "Complete conformance with MEITY & Digital Data Protection Act")
            ]
        }
    ]

    cw = 0.222
    gap = 0.02
    left = 0.035
    ch = 0.72

    for i, p in enumerate(pillars):
        x = left + i * (cw + gap)
        y = 0.12
        card = FancyBboxPatch((x, y), cw, ch, transform=ax.transAxes,
                              boxstyle="round,pad=0.005,rounding_size=0.015",
                              facecolor=p["bg"], edgecolor=p["border"], linewidth=1.5, zorder=2)
        ax.add_patch(card)

        hdr = FancyBboxPatch((x, y + ch - 0.088), cw, 0.088, transform=ax.transAxes,
                             boxstyle="round,pad=0.005,rounding_size=0.015",
                             facecolor=p["color"], edgecolor=None, zorder=3)
        ax.add_patch(hdr)
        ax.text(x + 0.015, y + ch - 0.026, p["p_num"], fontsize=8.5, weight="bold", color="#ffffff", zorder=4)
        ax.text(x + 0.015, y + ch - 0.052, p["title"], fontsize=9.2, weight="bold", color="#ffffff", zorder=4)

        iy = y + ch - 0.118
        for h_text, d_text in p["items"]:
            ax.add_patch(Circle((x + 0.014, iy - 0.006), 0.004, transform=ax.transAxes, facecolor=p["color"], zorder=5))
            ax.text(x + 0.024, iy, h_text, fontsize=8.2, weight="bold", color=C_NAVY_TITLE, zorder=5)
            wrapped = textwrap.fill(d_text, width=28)
            ax.text(x + 0.024, iy - 0.022, wrapped, fontsize=7.1, color="#475569", zorder=5, va="top")
            iy -= 0.145

    out_path = os.path.join(ASSETS_DIR, "d39_prop_fig10_security_pillars.png")
    plt.savefig(out_path, dpi=200, bbox_inches="tight")
    plt.close()
    print(f"Generated: {out_path}")


# =============================================================================
# 9. PAGE 11: COMPETITIVE CAPABILITY RADAR MATRIX
# =============================================================================
def gen_prop_fig11_competitive_radar():
    fig, ax = plt.subplots(figsize=(13.76, 7.74), dpi=200)
    ax.set_facecolor(C_BG)
    fig.patch.set_facecolor(C_BG)
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    ax.axis("off")
    draw_blueprint_grid(ax)

    draw_header(ax,
                "COMPETITIVE CAPABILITY RADAR & BASIS OF DIFFERENTIATION",
                "Mudran-Sewa vs. Generic Commercial ERP vs. Legacy Paper Registers • NESFIC-D-39",
                "Zero Lock-In", C_EMERALD)

    # 6 Comparison Dimension Cards
    dims = [
        ("1. Paper Reel Lot Traceability", "100% Serialized GRN vs 30% Commercial ERP vs 0% Paper Ledgers", C_BLUE),
        ("2. Press Trimming Scrap Guard", "Real-Time Telemetry (<3%) vs Manual Weekly Entry vs Zero Accounting", C_CYAN),
        ("3. Indent Quota Turnaround", "< 24 Hours Automated vs 7–10 Days in Generic ERP vs 21–30 Days Postal", C_EMERALD),
        ("4. Highway Transit Security", "Tamper-Evident QR + OTP vs Generic Waybill vs Vulnerable Paper Pass", C_AMBER),
        ("5. Statutory Gazette Integrity", "Cryptographic SHA-256 Vault vs Unprotected PDF vs Unverifiable Print", C_PURPLE),
        ("6. License Cost & TCO", "100% State Ownership (Zero Fees) vs Rs. 50L+ Annual ERP License vs Heavy Leakage", C_EMERALD)
    ]

    card_w = 0.45
    card_h = 0.20
    positions = [
        (0.035, 0.60), (0.515, 0.60),
        (0.035, 0.35), (0.515, 0.35),
        (0.035, 0.10), (0.515, 0.10)
    ]

    for (dname, ddesc, dcol), (cx, cy) in zip(dims, positions):
        card = FancyBboxPatch((cx, cy), card_w, card_h, transform=ax.transAxes,
                              boxstyle="round,pad=0.005,rounding_size=0.01",
                              facecolor="#f8fafc", edgecolor="#cbd5e1", linewidth=1)
        ax.add_patch(card)
        ax.add_patch(Rectangle((cx, cy), 0.008, card_h, transform=ax.transAxes, facecolor=dcol, edgecolor=None))
        ax.text(cx + 0.02, cy + card_h - 0.04, dname, fontsize=8.8, weight="bold", color=C_NAVY_TITLE)
        
        wrapped = textwrap.fill(ddesc, width=48)
        ax.text(cx + 0.02, cy + card_h - 0.075, wrapped, fontsize=7.5, color="#334155", va="top")
        
        # Pill
        ax.add_patch(FancyBboxPatch((cx + card_w - 0.13, cy + 0.02), 0.115, 0.032, transform=ax.transAxes,
                                    boxstyle="round,pad=0.002,rounding_size=0.005",
                                    facecolor="#ecfdf5", edgecolor=C_EMERALD, linewidth=0.8))
        ax.text(cx + card_w - 0.072, cy + 0.036, "MUDRAN-SEWA LEAD", fontsize=6.2, weight="bold", color=C_EMERALD, ha="center")

    out_path = os.path.join(ASSETS_DIR, "d39_prop_fig11_competitive_radar.png")
    plt.savefig(out_path, dpi=200, bbox_inches="tight")
    plt.close()
    print(f"Generated: {out_path}")


# =============================================================================
# 10. PAGE 12: 60-DAY MULTI-DISTRICT FIELD PILOT VALIDATION BLUEPRINT
# =============================================================================
def gen_prop_fig12_pilot_map():
    fig, ax = plt.subplots(figsize=(13.76, 7.74), dpi=200)
    ax.set_facecolor(C_BG)
    fig.patch.set_facecolor(C_BG)
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    ax.axis("off")
    draw_blueprint_grid(ax)

    draw_header(ax,
                "60-DAY MULTI-DISTRICT FIELD PILOT VALIDATION BLUEPRINT",
                "Controlled Trial at Bamunimaidam Central Press & Jorhat Branch Press • NESFIC-D-39",
                "Pilot Validation", C_EMERALD)

    # 3 Pilot Nodes
    nodes = [
        ("CENTRAL MANUFACTURING HUB", "Directorate Central Press (Bamunimaidam, Guwahati)", "Maplitho 80 GSM reel inward, Harris Web Offset lines, Central Store Shed #1 & #2", C_BLUE, 0.035),
        ("REGIONAL BRANCH PRESS", "Government Branch Press (Jorhat District)", "Heidelberg Sheet-Fed offset lines, regional indent processing, local buffer storage", C_CYAN, 0.36),
        ("RECEIVING DISTRICT TREASURIES", "Kamrup Metro, Nagaon & Jorhat DC Commissionerates", "QR E-Gatepass scanner validation, OTP delivery handshake, local stationery distribution", C_EMERALD, 0.685)
    ]

    for ntitle, nname, ndesc, ncol, x in nodes:
        card = FancyBboxPatch((x, 0.44), 0.28, 0.38, transform=ax.transAxes,
                              boxstyle="round,pad=0.005,rounding_size=0.012",
                              facecolor="#ffffff", edgecolor=ncol, linewidth=1.5)
        ax.add_patch(card)
        ax.add_patch(Rectangle((x, 0.74), 0.28, 0.08, transform=ax.transAxes, facecolor=ncol, edgecolor=None))
        ax.text(x + 0.14, 0.785, ntitle, fontsize=8.2, weight="bold", color="#ffffff", ha="center")
        ax.text(x + 0.015, 0.70, nname, fontsize=8.2, weight="bold", color=C_NAVY_TITLE)
        
        wrapped = textwrap.fill(ndesc, width=32)
        ax.text(x + 0.015, 0.66, wrapped, fontsize=7.2, color="#475569", va="top")

    # Connector arrows between nodes
    ax.annotate("", xy=(0.355, 0.63), xytext=(0.320, 0.63), arrowprops=dict(arrowstyle="->", color=C_MUTED, lw=2.5, mutation_scale=14))
    ax.annotate("", xy=(0.680, 0.63), xytext=(0.645, 0.63), arrowprops=dict(arrowstyle="->", color=C_MUTED, lw=2.5, mutation_scale=14))

    # Bottom 4 Target KPI Cards
    kpis = [
        ("100% RECONCILIATION", "Zero Transit Divergence", "Reel kg dispatched == Stationery received", C_EMERALD),
        ("< 2.5% PRESS SCRAP", "Trimming Loss Slashed", "Historic >5% loss cut by over 50%", C_BLUE),
        ("< 24-HOUR INDENTS", "Instant Quota Sanctions", "Requisition delay cut from 21 days", C_CYAN),
        ("ZERO STOCKOUTS", "Statutory Reserves Guarded", "Full availability for Assembly & Budget", C_AMBER),
    ]

    kw = 0.222
    gap = 0.02
    left = 0.035
    for i, (kval, klabel, kdesc, kcol) in enumerate(kpis):
        kx = left + i * (kw + gap)
        kp = FancyBboxPatch((kx, 0.06), kw, 0.32, transform=ax.transAxes,
                            boxstyle="round,pad=0.005,rounding_size=0.01",
                            facecolor="#f8fafc", edgecolor=kcol, linewidth=1.2)
        ax.add_patch(kp)
        ax.add_patch(Rectangle((kx, 0.31), kw, 0.07, transform=ax.transAxes, facecolor=kcol, edgecolor=None))
        ax.text(kx + kw/2, 0.345, kval, fontsize=8.5, weight="bold", color="#ffffff", ha="center")
        ax.text(kx + 0.015, 0.27, klabel, fontsize=8.2, weight="bold", color=C_NAVY_TITLE)
        wrapped = textwrap.fill(kdesc, width=28)
        ax.text(kx + 0.015, 0.24, wrapped, fontsize=7.2, color="#475569", va="top")

    out_path = os.path.join(ASSETS_DIR, "d39_prop_fig12_pilot_map.png")
    plt.savefig(out_path, dpi=200, bbox_inches="tight")
    plt.close()
    print(f"Generated: {out_path}")


if __name__ == "__main__":
    print("Generating High-Impact Proposal Infographics...")
    gen_prop_fig1_problem_map()
    gen_prop_fig3_user_journey()
    gen_prop_fig5_devsecops()
    gen_prop_fig6_gantt_roadmap()
    gen_prop_fig7_data_pipeline()
    gen_prop_fig8_team_structure()
    gen_prop_fig9_testing_pyramid()
    gen_prop_fig10_security_pillars()
    gen_prop_fig11_competitive_radar()
    gen_prop_fig12_pilot_map()
    print("All 10 Proposal Infographics Generated Successfully!")
