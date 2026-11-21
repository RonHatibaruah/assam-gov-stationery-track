#!/usr/bin/env python3
"""
NESFIC-D-39: Publication-Quality Proposal and Proof of Work PDF Generator
Generates:
1. docs/NESFIC_D39_Proposal_Ron_Hatibaruah.pdf
2. docs/NESFIC_D39_Proof_of_Work_Ron_Hatibaruah.pdf
"""

import os
import sys
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.pdfgen import canvas

DOCS_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "docs")
PROPOSAL_PDF_PATH = os.path.join(DOCS_DIR, "NESFIC_D39_Proposal_Ron_Hatibaruah.pdf")
POW_PDF_PATH = os.path.join(DOCS_DIR, "NESFIC_D39_Proof_of_Work_Ron_Hatibaruah.pdf")

C_TEAL_DARK = colors.HexColor("#004d40")    # Deep Assam Government Green
C_TEAL_MID = colors.HexColor("#065f46")     # Emerald Green
C_TEAL_LIGHT = colors.HexColor("#ecfdf5")   # Light Green Box BG
C_TEAL_BORDER = colors.HexColor("#a7f3d0")  # Green Box Border
C_DARK = colors.HexColor("#0f172a")         # Heading Slate
C_BODY = colors.HexColor("#1e293b")         # Body Slate
C_MUTED = colors.HexColor("#64748b")        # Muted Slate
C_GOLD = colors.HexColor("#d97706")         # Assam Gold Accent

class NumberedProposalCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        # Running header on pages 2+
        if self._pageNumber > 1:
            self.setFont("Helvetica-Bold", 8)
            self.setFillColor(C_TEAL_DARK)
            self.drawString(54, 804, "Government of Assam • Directorate of Printing & Stationery • NESFIC-D-39")
            self.setFont("Helvetica", 8)
            self.setFillColor(C_MUTED)
            self.drawRightString(541, 804, "Mudran-Sewa Technical Proposal")
            self.setStrokeColor(colors.HexColor("#e2e8f0"))
            self.setLineWidth(0.5)
            self.line(54, 796, 541, 796)

        # Running footer on all pages
        self.setFont("Helvetica", 8)
        self.setFillColor(C_MUTED)
        self.drawString(54, 34, "NESFIC 2026 | Lead Applicant: Ron Hatibaruah (ron.hatibaruah@gmail.com)")
        self.drawRightString(541, 34, f"Page {self._pageNumber} of {page_count}")
        self.setStrokeColor(colors.HexColor("#e2e8f0"))
        self.setLineWidth(0.5)
        self.line(54, 46, 541, 46)
        self.restoreState()

def build_proposal_pdf():
    doc = SimpleDocTemplate(
        PROPOSAL_PDF_PATH,
        pagesize=A4,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54,
    )

    styles = getSampleStyleSheet()
    title_style = ParagraphStyle(
        "CoverTitle",
        parent=styles["Heading1"],
        fontName="Helvetica-Bold",
        fontSize=20,
        leading=24,
        textColor=C_TEAL_DARK,
        alignment=0,
        spaceAfter=6,
    )
    subtitle_style = ParagraphStyle(
        "CoverSubtitle",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=11,
        leading=16,
        textColor=C_BODY,
        spaceAfter=12,
    )
    h1_style = ParagraphStyle(
        "SecH1",
        parent=styles["Heading1"],
        fontName="Helvetica-Bold",
        fontSize=13,
        leading=17,
        textColor=C_TEAL_DARK,
        spaceBefore=14,
        spaceAfter=6,
        keepWithNext=True,
    )
    body_style = ParagraphStyle(
        "SecBody",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=9.5,
        leading=14.5,
        textColor=C_BODY,
        spaceAfter=8,
    )
    bullet_style = ParagraphStyle(
        "SecBullet",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=9.5,
        leading=14,
        textColor=C_BODY,
        leftIndent=14,
        spaceAfter=4,
    )
    meta_label = ParagraphStyle(
        "MetaLabel",
        fontName="Helvetica-Bold",
        fontSize=8.5,
        leading=12,
        textColor=C_TEAL_DARK,
    )
    meta_val = ParagraphStyle(
        "MetaVal",
        fontName="Helvetica",
        fontSize=8.5,
        leading=12,
        textColor=C_BODY,
    )

    story = []

    # Title Banner Table
    banner_data = [
        [
            Paragraph("<b>NORTH EAST SEVA FIRST INNOVATION CHALLENGE (NESFIC 2026)</b><br/>"
                      "<font size=14 color='#004d40'><b>Mudran-Sewa (মুদ্ৰণ সেৱা): Digital Inventory & Movement Tracking</b></font><br/>"
                      "<font size=9 color='#64748b'>Directorate of Printing & Stationery, Government of Assam • Challenge Code: <b>NESFIC-D-39</b></font>",
                      title_style)
        ]
    ]
    banner_table = Table(banner_data, colWidths=[487])
    banner_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), C_TEAL_LIGHT),
        ('BOX', (0,0), (-1,-1), 1.5, C_TEAL_MID),
        ('TOPPADDING', (0,0), (-1,-1), 10),
        ('BOTTOMPADDING', (0,0), (-1,-1), 10),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
    ]))
    story.append(banner_table)
    story.append(Spacer(1, 12))

    # Metadata Grid
    meta_data = [
        [Paragraph("Lead Applicant:", meta_label), Paragraph("Ron Hatibaruah (ron.hatibaruah@gmail.com)", meta_val),
         Paragraph("Challenge Track:", meta_label), Paragraph("Dashboards & Digital Platforms (Govt)", meta_val)],
        [Paragraph("Problem Owner:", meta_label), Paragraph("Directorate of Printing & Stationery, Assam", meta_val),
         Paragraph("Headquarters:", meta_label), Paragraph("Bamunimaidam, Guwahati - 781021", meta_val)],
        [Paragraph("Live Platform:", meta_label), Paragraph("<u>https://mudran-sewa.pages.dev</u>", meta_val),
         Paragraph("GitHub Repo:", meta_label), Paragraph("<u>https://github.com/RonHatibaruah/assam-gov-stationery-track</u>", meta_val)],
    ]
    meta_table = Table(meta_data, colWidths=[85, 160, 95, 147])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f8fafc")),
        ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor("#cbd5e1")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#e2e8f0")),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(meta_table)
    story.append(Spacer(1, 14))

    # Read from CopyPaste file to populate all 12 fields exactly
    copypaste_path = os.path.join(DOCS_DIR, "NESFIC_D39_Proposal_Fields_CopyPaste.txt")
    with open(copypaste_path, "r", encoding="utf-8") as f:
        text = f.read()

    import re
    field_pattern = re.compile(r'--- FIELD (\d+):\s*([^\n]+)\n-{10,}\n([\s\S]*?)(?=\n-{10,}|\n={10,}|$)', re.MULTILINE)
    fields = field_pattern.findall(text)

    for field_num, field_title, field_body in fields:
        word_count = len(field_body.strip().split())
        story.append(Paragraph(f"Field {field_num}: {field_title} <font size=8 color='#64748b'>({word_count} / 500 words)</font>", h1_style))
        story.append(HRFlowable(width="100%", thickness=1, color=C_TEAL_MID, spaceBefore=2, spaceAfter=8))
        
        paras = field_body.strip().split("\n\n")
        for p in paras:
            p = p.strip()
            if not p:
                continue
            if p.startswith("•") or p.startswith("-") or (len(p) > 2 and p[0].isdigit() and p[1] in [".", ")"]):
                story.append(Paragraph(p.replace("\n", "<br/>"), bullet_style))
            else:
                story.append(Paragraph(p.replace("\n", " "), body_style))
        
        story.append(Spacer(1, 8))

    doc.build(story, canvasmaker=NumberedProposalCanvas)
    print(f"✅ Generated Proposal PDF: {PROPOSAL_PDF_PATH}")

def build_pow_pdf():
    doc = SimpleDocTemplate(
        POW_PDF_PATH,
        pagesize=A4,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54,
    )

    styles = getSampleStyleSheet()
    title_style = ParagraphStyle(
        "PoWTitle",
        parent=styles["Heading1"],
        fontName="Helvetica-Bold",
        fontSize=18,
        leading=22,
        textColor=C_TEAL_DARK,
        spaceAfter=6,
    )
    h1_style = ParagraphStyle(
        "PoWH1",
        parent=styles["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=12,
        leading=16,
        textColor=C_TEAL_DARK,
        spaceBefore=12,
        spaceAfter=6,
        keepWithNext=True,
    )
    body_style = ParagraphStyle(
        "PoWBody",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=9,
        leading=13.5,
        textColor=C_BODY,
        spaceAfter=6,
    )
    code_style = ParagraphStyle(
        "PoWCode",
        parent=styles["Normal"],
        fontName="Courier",
        fontSize=7.5,
        leading=10.5,
        textColor=colors.HexColor("#0f172a"),
    )

    story = []

    # Title Box
    banner_data = [
        [
            Paragraph("<b>PROOF OF WORK & SOLUTION EVIDENCE DOSSIER</b><br/>"
                      "<font size=13 color='#004d40'><b>Mudran-Sewa: Assam Government Press & Stationery Tracker</b></font><br/>"
                      "<font size=8.5 color='#64748b'>NESFIC 2026 Problem Code: <b>NESFIC-D-39</b> • Lead Applicant: Ron Hatibaruah</font>",
                      title_style)
        ]
    ]
    banner_table = Table(banner_data, colWidths=[487])
    banner_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), C_TEAL_LIGHT),
        ('BOX', (0,0), (-1,-1), 1.5, C_TEAL_DARK),
        ('TOPPADDING', (0,0), (-1,-1), 10),
        ('BOTTOMPADDING', (0,0), (-1,-1), 10),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
    ]))
    story.append(banner_table)
    story.append(Spacer(1, 10))

    pow_txt_path = os.path.join(DOCS_DIR, "NESFIC_D39_Proof_of_Work_Ron_Hatibaruah.txt")
    with open(pow_txt_path, "r", encoding="utf-8") as f:
        pow_text = f.read()

    sections = pow_text.split("--------------------------------------------------------------------------------")
    
    # Process sections
    for sec in sections[1:]:
        lines = sec.strip().split("\n")
        sec_header = lines[0].strip() if lines else "Section"
        sec_content = "\n".join(lines[1:]).strip()
        
        story.append(Paragraph(sec_header, h1_style))
        story.append(HRFlowable(width="100%", thickness=1, color=C_TEAL_MID, spaceBefore=2, spaceAfter=6))

        if "✔" in sec_content or "{" in sec_content or "npm test" in sec_content:
            code_table = Table([[Paragraph(sec_content.replace("\n", "<br/>").replace(" ", "&nbsp;"), code_style)]], colWidths=[487])
            code_table.setStyle(TableStyle([
                ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f1f5f9")),
                ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor("#cbd5e1")),
                ('TOPPADDING', (0,0), (-1,-1), 6),
                ('BOTTOMPADDING', (0,0), (-1,-1), 6),
                ('LEFTPADDING', (0,0), (-1,-1), 8),
                ('RIGHTPADDING', (0,0), (-1,-1), 8),
            ]))
            story.append(code_table)
        else:
            for p in sec_content.split("\n\n"):
                p = p.strip()
                if p:
                    story.append(Paragraph(p.replace("\n", "<br/>"), body_style))
        story.append(Spacer(1, 8))

    doc.build(story, canvasmaker=NumberedProposalCanvas)
    print(f"✅ Generated PoW PDF: {POW_PDF_PATH}")

if __name__ == "__main__":
    build_proposal_pdf()
    build_pow_pdf()
