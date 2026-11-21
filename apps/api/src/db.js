/**
 * In-Memory & File-Persisted Data Store for NESFIC-D-39:
 * Digital Inventory & Movement Tracking for Government Press and Stationery
 * Directorate of Printing & Stationery, Government of Assam (Bamunimaidam, Guwahati)
 */

import crypto from "node:crypto";
import {
  SAMPLE_PAPER_INVENTORY,
  SAMPLE_REQUISITIONS,
  SAMPLE_JOB_TICKETS,
  SAMPLE_DISPATCH_GATEPASSES,
  SAMPLE_GAZETTE_ISSUES,
  ASSAM_DISTRICTS,
  DIRECTORATE_DETAILS,
} from "../../../packages/shared/src/constants.js";

export function sha256(data) {
  return crypto.createHash("sha256").update(typeof data === "string" ? data : JSON.stringify(data)).digest("hex");
}

export class StationeryDB {
  constructor() {
    this.inventory = new Map();
    this.requisitions = new Map();
    this.jobTickets = new Map();
    this.gazetteIssues = new Map();
    this.gatepasses = new Map();
    this.auditLogs = [];
    this.alerts = [];
    this.districts = [...ASSAM_DISTRICTS];
    this.directorate = { ...DIRECTORATE_DETAILS };

    this.seedInitialData();
  }

  seedInitialData() {
    // 1. Seed Inventory
    for (const item of SAMPLE_PAPER_INVENTORY) {
      this.inventory.set(item.id, { ...item });
    }

    // Add extra consumables (Ink & Plates)
    const inkItem = {
      id: "INK-BLK-WEB-01",
      name: "High-Density Web Offset Coldset Black Ink",
      category: "PRINTING_INK",
      paperType: "N/A",
      gsm: 0,
      sheetSizeInches: "20 Kg Sealed Drum",
      currentStockReams: 85,
      bufferThresholdReams: 25,
      unit: "Drums",
      millSupplier: "DIC India Limited / Toyo Ink",
      millLotNo: "LOT-INK-2026-901",
      warehouseLocation: "Chemical & Ink Storage Vault, Shed B",
      qcPassed: true,
      unitCostINR: 6200.0,
      lastRestockedDate: "2026-11-12T11:00:00+05:30",
    };
    this.inventory.set(inkItem.id, inkItem);

    const plateItem = {
      id: "PLT-CTP-OFF-02",
      name: "Thermal CTP Aluminium Offset Printing Plates (0.30mm)",
      category: "OFFSET_PLATES",
      paperType: "N/A",
      gsm: 0,
      sheetSizeInches: "770 x 1030 mm",
      currentStockReams: 420,
      bufferThresholdReams: 150,
      unit: "Plates",
      millSupplier: "Technova Imaging Systems",
      millLotNo: "LOT-PLT-2026-441",
      warehouseLocation: "Pre-Press CTP Darkroom Depot",
      qcPassed: true,
      unitCostINR: 480.0,
      lastRestockedDate: "2026-11-15T15:20:00+05:30",
    };
    this.inventory.set(plateItem.id, plateItem);

    // 2. Seed Requisitions
    for (const req of SAMPLE_REQUISITIONS) {
      this.requisitions.set(req.id, { ...req });
    }

    // 3. Seed Job Tickets
    for (const job of SAMPLE_JOB_TICKETS) {
      this.jobTickets.set(job.id, { ...job });
    }

    // 4. Seed Dispatch Gatepasses
    for (const gp of SAMPLE_DISPATCH_GATEPASSES) {
      this.gatepasses.set(gp.id, { ...gp });
    }

    // 5. Seed Gazette Notifications
    for (const gaz of SAMPLE_GAZETTE_ISSUES) {
      this.gazetteIssues.set(gaz.issueNo, { ...gaz });
    }

    // 6. Initial Audit Logs
    this.logAdminAction(
      "SYSTEM_BOOTSTRAP",
      "Director of Printing & Stationery, Assam",
      "SUPER_ADMIN",
      "System initialized with verified paper lots, district hubs, and active press jobs.",
      "10.20.44.1"
    );

    this.checkBufferStockAlerts();
  }

  logAdminAction(action, actor, role, details, ipAddress = "127.0.0.1") {
    const timestamp = new Date().toISOString();
    const payload = { action, actor, role, details, timestamp };
    const tamperProofHash = sha256(payload);

    const entry = {
      id: `AUDIT-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp,
      action,
      actor,
      role,
      details,
      ipAddress,
      tamperProofHash,
    };
    this.auditLogs.unshift(entry);
    if (this.auditLogs.length > 200) this.auditLogs.pop();
    return entry;
  }

  // Inventory Management
  getAllInventory() {
    return Array.from(this.inventory.values());
  }

  getInventoryItem(id) {
    return this.inventory.get(id);
  }

  inwardStock(itemData) {
    const id = itemData.id || `PAP-INW-${Date.now()}`;
    const newItem = {
      id,
      name: itemData.name,
      category: itemData.category || "RAW_PAPER_REAM",
      paperType: itemData.paperType || "MAPLITHO",
      gsm: Number(itemData.gsm) || 70,
      sheetSizeInches: itemData.sheetSizeInches || "23x36",
      currentStockReams: Number(itemData.currentStockReams) || 100,
      bufferThresholdReams: Number(itemData.bufferThresholdReams) || 50,
      unit: itemData.unit || "Reams",
      millSupplier: itemData.millSupplier || "Certified Paper Mill",
      millLotNo: itemData.millLotNo || `LOT-${Date.now()}`,
      warehouseLocation: itemData.warehouseLocation || "Central Store Shed A",
      qcPassed: itemData.qcPassed !== undefined ? Boolean(itemData.qcPassed) : true,
      unitCostINR: Number(itemData.unitCostINR) || 450.0,
      lastRestockedDate: new Date().toISOString(),
    };

    this.inventory.set(id, newItem);
    this.logAdminAction(
      "INWARD_GOODS_RECEIVED",
      "Central Store Keeper",
      "STORE_MANAGER",
      `Received ${newItem.currentStockReams} ${newItem.unit} of ${newItem.name} (Lot: ${newItem.millLotNo})`
    );
    this.checkBufferStockAlerts();
    return newItem;
  }

  adjustStock(id, qtyDelta, reason = "Routine dispatch adjustment") {
    const item = this.inventory.get(id);
    if (!item) throw new Error(`Paper item with id ${id} not found`);

    item.currentStockReams = Math.max(0, item.currentStockReams + qtyDelta);
    this.logAdminAction(
      "STOCK_ADJUSTMENT",
      "Store Keeper",
      "STORE_MANAGER",
      `Adjusted stock for ${item.name} by ${qtyDelta} ${item.unit}. Reason: ${reason}`
    );
    this.checkBufferStockAlerts();
    return item;
  }

  // Requisitions (e-Indents)
  getAllRequisitions(filter = {}) {
    let list = Array.from(this.requisitions.values());
    if (filter.status) {
      list = list.filter(r => r.status === filter.status);
    }
    if (filter.district) {
      list = list.filter(r => r.district === filter.district);
    }
    return list;
  }

  getRequisition(id) {
    return this.requisitions.get(id);
  }

  createRequisition(data) {
    const id = `IND-2026-${data.district ? data.district.substring(0, 3).toUpperCase() : "GEN"}-${Math.floor(100 + Math.random() * 900)}`;
    const indentNo = `IND/${data.district || "ASSAM"}/STN/2026/${Math.floor(1000 + Math.random() * 9000)}`;

    const newReq = {
      id,
      indentNo,
      departmentCode: data.departmentCode || "DEPT_GEN",
      departmentName: data.departmentName || "Government Office",
      district: data.district || "Kamrup Metropolitan",
      indenterOfficerName: data.indenterOfficerName || "Nodal Indenting Officer",
      indenterDesignation: data.indenterDesignation || "Assistant Director / EAC",
      priority: data.priority || "ROUTINE",
      status: "SUBMITTED",
      items: data.items || [
        {
          itemId: "PAP-MAP-70-001",
          itemName: "White Maplitho Paper 70 GSM",
          category: "RAW_PAPER_REAM",
          requestedQty: 50,
          sanctionedQty: 50,
          unit: "Reams",
        },
      ],
      purpose: data.purpose || "Official administrative printing requirements",
      submissionDate: new Date().toISOString(),
    };

    this.requisitions.set(id, newReq);
    this.logAdminAction(
      "INDENT_SUBMITTED",
      newReq.indenterOfficerName,
      "INDENTING_OFFICER",
      `Submitted e-Indent ${newReq.indentNo} for ${newReq.departmentName} (${newReq.district})`
    );
    return newReq;
  }

  approveRequisition(id, sanctionDetails = {}) {
    const req = this.requisitions.get(id);
    if (!req) throw new Error(`Requisition ${id} not found`);

    req.status = "SANCTIONED";
    req.sanctionOrderNo = sanctionDetails.sanctionOrderNo || `DPS/SANCT/2026/${req.district.substring(0, 3).toUpperCase()}/${Math.floor(100 + Math.random() * 900)}`;
    req.sanctionDate = new Date().toISOString();

    // Sanction quantities
    req.items = req.items.map(it => ({
      ...it,
      sanctionedQty: it.requestedQty,
    }));

    this.logAdminAction(
      "INDENT_SANCTIONED",
      sanctionDetails.approverName || "Superintendent of Printing & Stationery",
      "SUPER_ADMIN",
      `Sanctioned indent ${req.indentNo} under order ${req.sanctionOrderNo}`
    );
    return req;
  }

  // Job Tickets (Press Production Floor)
  getAllJobTickets() {
    return Array.from(this.jobTickets.values());
  }

  getJobTicket(id) {
    return this.jobTickets.get(id);
  }

  createJobTicket(data) {
    const id = `JOB-2026-PRS-${Math.floor(100 + Math.random() * 900)}`;
    const newJob = {
      id,
      jobTitle: data.jobTitle || "Government Printing Job",
      productType: data.productType || "GOVT_STANDARD_FORM",
      targetQuantity: Number(data.targetQuantity) || 1000,
      unit: data.unit || "Copies",
      paperLotUsedId: data.paperLotUsedId || "PAP-MAP-70-001",
      paperReamsAllocated: Number(data.paperReamsAllocated) || 20,
      paperWastagePercentage: Number(data.paperWastagePercentage) || 1.5,
      stage: "PRE_PRESS_PLATEMAKING",
      pressMachineAssigned: data.pressMachineAssigned || "Heidelberg Sheet-fed Offset Press",
      operatorInCharge: data.operatorInCharge || "Press Machine Operator",
      confidentialRun: Boolean(data.confidentialRun),
      targetCompletionDate: data.targetCompletionDate || new Date(Date.now() + 86400000 * 3).toISOString(),
    };

    this.jobTickets.set(id, newJob);

    // Deduct raw paper stock
    if (this.inventory.has(newJob.paperLotUsedId)) {
      const stock = this.inventory.get(newJob.paperLotUsedId);
      stock.currentStockReams = Math.max(0, stock.currentStockReams - newJob.paperReamsAllocated);
    }

    this.logAdminAction(
      "JOB_TICKET_CREATED",
      "Press Superintendent",
      "PRESS_SUPERINTENDENT",
      `Created Press Job #${id} (${newJob.jobTitle}) allocated to ${newJob.pressMachineAssigned}`
    );
    return newJob;
  }

  updateJobStage(id, newStage, wastagePct) {
    const job = this.jobTickets.get(id);
    if (!job) throw new Error(`Job ticket ${id} not found`);

    const prevStage = job.stage;
    job.stage = newStage;
    if (wastagePct !== undefined) {
      job.paperWastagePercentage = Number(wastagePct);
    }
    if (newStage === "COMPLETED_WAREHOUSE") {
      job.completedAt = new Date().toISOString();
    }

    this.logAdminAction(
      "JOB_STAGE_TRANSITION",
      job.operatorInCharge || "Press Superintendent",
      "PRESS_SUPERINTENDENT",
      `Job #${id} transitioned from ${prevStage} -> ${newStage} (Wastage: ${job.paperWastagePercentage}%)`
    );

    // Alert if wastage exceeds threshold
    if (job.paperWastagePercentage > 3.0) {
      this.alerts.unshift({
        id: `ALT-WST-${Date.now()}`,
        level: "WARNING",
        title: "High Trimming Wastage Alert",
        message: `Job #${id} (${job.jobTitle}) exceeded standard tolerance with ${job.paperWastagePercentage}% paper waste.`,
        timestamp: new Date().toISOString(),
      });
    }

    return job;
  }

  // The Assam Gazette Registry
  getAllGazettes() {
    return Array.from(this.gazetteIssues.values());
  }

  createGazetteIssue(data) {
    const issueNo = data.issueNo || `Vol. 152, Extraordinary No. ${Math.floor(490 + Math.random() * 50)}`;
    const newGazette = {
      issueNo,
      gazetteType: data.gazetteType || "EXTRAORDINARY",
      issuingDepartment: data.issuingDepartment || "General Administration Department, Dispur",
      subjectTitle: data.subjectTitle || "State Government Official Notification",
      publicationDate: data.publicationDate || new Date().toISOString().split("T")[0],
      printedCopiesCount: Number(data.printedCopiesCount) || 5000,
      digitalChecksumSHA256: sha256(`${issueNo}-${data.subjectTitle}-${Date.now()}`),
      archivalStatus: "DIGITIZED_ARCHIVED",
    };

    this.gazetteIssues.set(issueNo, newGazette);
    this.logAdminAction(
      "GAZETTE_PUBLISHED",
      "Gazette Officer",
      "PRESS_SUPERINTENDENT",
      `Published & Archived Assam Gazette: ${issueNo} (${newGazette.subjectTitle})`
    );
    return newGazette;
  }

  // Dispatch & E-Gatepass
  getAllGatepasses() {
    return Array.from(this.gatepasses.values());
  }

  getGatepass(id) {
    return this.gatepasses.get(id);
  }

  verifyGatepassQR(qrToken) {
    for (const gp of this.gatepasses.values()) {
      if (gp.qrVerificationToken === qrToken || gp.id === qrToken || gp.gatepassNumber === qrToken) {
        return {
          valid: true,
          gatepass: gp,
          verifiedAt: new Date().toISOString(),
          issuer: "Directorate of Printing & Stationery, Assam (Bamunimaidam, Guwahati)",
        };
      }
    }
    return {
      valid: false,
      message: "QR Verification Token not recognized or gatepass revoked.",
    };
  }

  createGatepass(data) {
    const id = `GP-2026-DIS-${Math.floor(100 + Math.random() * 900)}`;
    const distCode = data.destinationDistrict ? data.destinationDistrict.substring(0, 3).toUpperCase() : "ASM";
    const gatepassNumber = `DPS/GP/2026/${distCode}/${Math.floor(100 + Math.random() * 900)}`;
    const qrVerificationToken = `DPS-GP-${distCode}-${Math.floor(10000 + Math.random() * 90000)}-VERIFIED-AUTH`;

    const newGp = {
      id,
      gatepassNumber,
      requisitionId: data.requisitionId || "IND-2026-GEN-001",
      destinationDistrict: data.destinationDistrict || "Kamrup Metropolitan",
      receivingFacility: data.receivingFacility || `District Stationery Store, ${data.destinationDistrict || "Kamrup"}`,
      vehicleNumber: data.vehicleNumber || "AS-01-GC-9901 (Dedicated Govt Carrier)",
      driverName: data.driverName || "Official Transport Driver",
      driverPhone: data.driverPhone || "+91-94350-00000",
      consignmentDetails: data.consignmentDetails || "Printed Stationery and Forms Consignment",
      totalBundles: Number(data.totalBundles) || 50,
      grossWeightKg: Number(data.grossWeightKg) || 650.0,
      qrVerificationToken,
      status: "IN_TRANSIT_HIGHWAY",
      departureTime: new Date().toISOString(),
      estimatedArrivalTime: new Date(Date.now() + 3600000 * 6).toISOString(),
      currentGPS: {
        lat: 26.1834,
        lng: 91.7766,
        locationName: "Bamunimaidam Central Press, Guwahati (Departed)",
        timestamp: new Date().toISOString(),
      },
      routeWaypoints: [
        { lat: 26.1834, lng: 91.7766, locationName: "Directorate Press, Bamunimaidam" },
      ],
    };

    this.gatepasses.set(id, newGp);

    // Update Requisition status if linked
    if (this.requisitions.has(newGp.requisitionId)) {
      const req = this.requisitions.get(newGp.requisitionId);
      req.status = "IN_TRANSIT";
      req.gatepassId = id;
    }

    this.logAdminAction(
      "GATEPASS_ISSUED",
      "Fleet Dispatch Officer",
      "DISPATCH_OFFICER",
      `Issued E-Gatepass #${gatepassNumber} for vehicle ${newGp.vehicleNumber} bound for ${newGp.destinationDistrict}`
    );
    return newGp;
  }

  acknowledgeDelivery(id, acknowledgedBy = "District Treasury Officer", otp = "123456") {
    const gp = this.gatepasses.get(id);
    if (!gp) throw new Error(`Gatepass ${id} not found`);

    gp.status = "DELIVERED_ACKNOWLEDGED";
    gp.deliveryAcknowledgedBy = acknowledgedBy;
    gp.acknowledgmentTimestamp = new Date().toISOString();

    if (this.requisitions.has(gp.requisitionId)) {
      const req = this.requisitions.get(gp.requisitionId);
      req.status = "DELIVERED";
    }

    this.logAdminAction(
      "CONSIGNMENT_DELIVERED",
      acknowledgedBy,
      "INDENTING_OFFICER",
      `Consignment for Gatepass #${gp.gatepassNumber} successfully received and verified via OTP.`
    );
    return gp;
  }

  checkBufferStockAlerts() {
    this.alerts = this.alerts.filter(a => a.level !== "CRITICAL_STOCK");
    for (const item of this.inventory.values()) {
      if (item.currentStockReams <= item.bufferThresholdReams) {
        this.alerts.push({
          id: `ALT-STK-${item.id}`,
          level: "CRITICAL_STOCK",
          title: `Buffer Stock Alert: ${item.name}`,
          message: `Stock level (${item.currentStockReams} ${item.unit}) has breached minimum safety threshold (${item.bufferThresholdReams} ${item.unit}). Immediate procurement reorder required.`,
          timestamp: new Date().toISOString(),
        });
      }
    }
  }

  getAnalytics() {
    let totalStockReams = 0;
    let totalStockValueINR = 0;
    let itemsBelowBufferCount = 0;

    for (const item of this.inventory.values()) {
      totalStockReams += item.currentStockReams;
      totalStockValueINR += item.currentStockReams * item.unitCostINR;
      if (item.currentStockReams <= item.bufferThresholdReams) {
        itemsBelowBufferCount++;
      }
    }

    const requisitions = Array.from(this.requisitions.values());
    const pendingRequisitions = requisitions.filter(r => r.status === "SUBMITTED" || r.status === "UNDER_PRODUCTION").length;
    const sanctionedRequisitions = requisitions.filter(r => r.status === "SANCTIONED" || r.status === "IN_TRANSIT" || r.status === "DELIVERED").length;

    const jobTickets = Array.from(this.jobTickets.values());
    const activeJobs = jobTickets.filter(j => j.stage !== "COMPLETED_WAREHOUSE").length;
    const avgWastage = jobTickets.length > 0
      ? (jobTickets.reduce((acc, j) => acc + (j.paperWastagePercentage || 0), 0) / jobTickets.length).toFixed(2)
      : "1.80";

    const gatepasses = Array.from(this.gatepasses.values());
    const inTransitFleet = gatepasses.filter(g => g.status === "IN_TRANSIT_HIGHWAY").length;
    const deliveredCount = gatepasses.filter(g => g.status === "DELIVERED_ACKNOWLEDGED").length;

    return {
      portalCode: "NESFIC-D-39",
      directorate: this.directorate,
      totalStockReams,
      totalStockValueINR: Math.round(totalStockValueINR),
      itemsBelowBufferCount,
      totalCatalogItems: this.inventory.size,
      pendingRequisitions,
      sanctionedRequisitions,
      activeJobs,
      averageWastagePercentage: parseFloat(avgWastage),
      inTransitFleet,
      deliveredConsignmentsCount: deliveredCount,
      totalDistrictsSupported: this.districts.length,
      alertsCount: this.alerts.length,
      activeAlerts: this.alerts,
    };
  }
}

export const db = new StationeryDB();
