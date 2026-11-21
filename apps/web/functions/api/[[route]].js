/**
 * Cloudflare Pages Function: Serverless Edge API for NESFIC-D-39
 * Directorate of Printing & Stationery, Government of Assam (Bamunimaidam, Guwahati)
 */

import {
  SAMPLE_PAPER_INVENTORY,
  SAMPLE_REQUISITIONS,
  SAMPLE_JOB_TICKETS,
  SAMPLE_DISPATCH_GATEPASSES,
  SAMPLE_GAZETTE_ISSUES,
  ASSAM_DISTRICTS,
  DIRECTORATE_DETAILS,
} from "../../../packages/shared/src/constants.js";

// In-memory store for Cloudflare worker instance
let inventory = [...SAMPLE_PAPER_INVENTORY];
let requisitions = [...SAMPLE_REQUISITIONS];
let jobs = [...SAMPLE_JOB_TICKETS];
let gatepasses = [...SAMPLE_DISPATCH_GATEPASSES];
let gazettes = [...SAMPLE_GAZETTE_ISSUES];
let auditLogs = [
  {
    id: "AUDIT-001",
    timestamp: new Date().toISOString(),
    action: "EDGE_INITIALIZATION",
    actor: "Directorate Edge Node",
    role: "SUPER_ADMIN",
    details: "Serverless edge node deployed with verified paper stock ledger.",
    tamperProofHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  },
];

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const pathname = url.pathname;
  const method = request.method;

  if (method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  // Health
  if (pathname === "/api/health") {
    return jsonResponse({
      status: "ok",
      challengeCode: "NESFIC-D-39",
      title: "Digital Inventory & Movement Tracking for Government Press and Stationery",
      department: "Directorate of Printing & Stationery, Government of Assam (Bamunimaidam, Guwahati)",
      edge: true,
      timestamp: new Date().toISOString(),
    });
  }

  // Districts
  if (pathname === "/api/districts") {
    return jsonResponse({ total: ASSAM_DISTRICTS.length, districts: ASSAM_DISTRICTS });
  }

  // Inventory
  if (pathname === "/api/inventory") {
    return jsonResponse({ total: inventory.length, inventory });
  }

  if (pathname === "/api/inventory/inward" && method === "POST") {
    const body = await request.json().catch(() => ({}));
    const newItem = {
      id: body.id || `PAP-INW-${Date.now()}`,
      name: body.name || "White Maplitho Paper 70 GSM",
      category: body.category || "RAW_PAPER_REAM",
      paperType: body.paperType || "MAPLITHO",
      gsm: Number(body.gsm) || 70,
      sheetSizeInches: body.sheetSizeInches || "23x36",
      currentStockReams: Number(body.currentStockReams) || 100,
      bufferThresholdReams: Number(body.bufferThresholdReams) || 50,
      unit: body.unit || "Reams",
      millSupplier: body.millSupplier || "Certified Paper Mill",
      millLotNo: body.millLotNo || `LOT-${Date.now()}`,
      warehouseLocation: body.warehouseLocation || "Central Store Shed A",
      qcPassed: true,
      unitCostINR: Number(body.unitCostINR) || 450.0,
      lastRestockedDate: new Date().toISOString(),
    };
    inventory.unshift(newItem);
    return jsonResponse({ success: true, item: newItem }, 201);
  }

  if (pathname.startsWith("/api/inventory/") && pathname.endsWith("/adjust") && method === "POST") {
    const id = pathname.split("/")[3];
    const body = await request.json().catch(() => ({}));
    const item = inventory.find(i => i.id === id);
    if (!item) return jsonResponse({ error: "Item not found" }, 404);
    item.currentStockReams = Math.max(0, item.currentStockReams + (Number(body.qtyDelta) || 0));
    return jsonResponse({ success: true, item });
  }

  // Requisitions
  if (pathname === "/api/requisitions" && method === "GET") {
    return jsonResponse({ total: requisitions.length, requisitions });
  }

  if (pathname === "/api/requisitions" && method === "POST") {
    const body = await request.json().catch(() => ({}));
    const newReq = {
      id: `IND-2026-${body.district ? body.district.substring(0, 3).toUpperCase() : "GEN"}-${Math.floor(100 + Math.random() * 900)}`,
      indentNo: `IND/${body.district || "ASSAM"}/STN/2026/${Math.floor(1000 + Math.random() * 9000)}`,
      departmentCode: body.departmentCode || "DEPT_GEN",
      departmentName: body.departmentName || "Government Office",
      district: body.district || "Kamrup Metropolitan",
      indenterOfficerName: body.indenterOfficerName || "Nodal Officer",
      indenterDesignation: body.indenterDesignation || "Assistant Director",
      priority: body.priority || "ROUTINE",
      status: "SUBMITTED",
      items: body.items || [],
      purpose: body.purpose || "Official printing requirements",
      submissionDate: new Date().toISOString(),
    };
    requisitions.unshift(newReq);
    return jsonResponse({ success: true, requisition: newReq }, 201);
  }

  if (pathname.startsWith("/api/requisitions/") && pathname.endsWith("/approve") && method === "POST") {
    const id = pathname.split("/")[3];
    const reqItem = requisitions.find(r => r.id === id);
    if (!reqItem) return jsonResponse({ error: "Requisition not found" }, 404);
    reqItem.status = "SANCTIONED";
    reqItem.sanctionOrderNo = `DPS/SANCT/2026/${reqItem.district.substring(0, 3).toUpperCase()}/${Math.floor(100 + Math.random() * 900)}`;
    reqItem.sanctionDate = new Date().toISOString();
    return jsonResponse({ success: true, requisition: reqItem });
  }

  // Press Jobs
  if (pathname === "/api/press/jobs" && method === "GET") {
    return jsonResponse({ total: jobs.length, jobs });
  }

  if (pathname === "/api/press/jobs" && method === "POST") {
    const body = await request.json().catch(() => ({}));
    const newJob = {
      id: `JOB-2026-PRS-${Math.floor(100 + Math.random() * 900)}`,
      jobTitle: body.jobTitle || "Official Printing Job",
      productType: body.productType || "GOVT_STANDARD_FORM",
      targetQuantity: Number(body.targetQuantity) || 1000,
      unit: body.unit || "Copies",
      paperLotUsedId: body.paperLotUsedId || "PAP-MAP-70-001",
      paperReamsAllocated: Number(body.paperReamsAllocated) || 20,
      paperWastagePercentage: 1.5,
      stage: "PRE_PRESS_PLATEMAKING",
      pressMachineAssigned: body.pressMachineAssigned || "Heidelberg Sheet-fed Offset Press",
      operatorInCharge: "Press Master",
      confidentialRun: false,
      targetCompletionDate: new Date(Date.now() + 86400000 * 2).toISOString(),
    };
    jobs.unshift(newJob);
    return jsonResponse({ success: true, job: newJob }, 201);
  }

  if (pathname.startsWith("/api/press/jobs/") && pathname.endsWith("/stage") && method === "POST") {
    const id = pathname.split("/")[4];
    const body = await request.json().catch(() => ({}));
    const job = jobs.find(j => j.id === id);
    if (!job) return jsonResponse({ error: "Job not found" }, 404);
    job.stage = body.stage;
    if (body.paperWastagePercentage) job.paperWastagePercentage = Number(body.paperWastagePercentage);
    return jsonResponse({ success: true, job });
  }

  // Gazette
  if (pathname === "/api/gazette/issues") {
    return jsonResponse({ total: gazettes.length, gazettes });
  }

  // Gatepasses
  if (pathname === "/api/dispatch/gatepasses") {
    return jsonResponse({ total: gatepasses.length, gatepasses });
  }

  if (pathname.startsWith("/api/dispatch/") && pathname.endsWith("/deliver") && method === "POST") {
    const id = pathname.split("/")[3];
    const body = await request.json().catch(() => ({}));
    const gp = gatepasses.find(g => g.id === id);
    if (!gp) return jsonResponse({ error: "Gatepass not found" }, 404);
    gp.status = "DELIVERED_ACKNOWLEDGED";
    gp.deliveryAcknowledgedBy = body.acknowledgedBy || "District Treasury Officer";
    gp.acknowledgmentTimestamp = new Date().toISOString();
    return jsonResponse({ success: true, gatepass: gp });
  }

  // Analytics
  if (pathname === "/api/analytics") {
    let totalStockReams = 0;
    let totalStockValueINR = 0;
    let itemsBelowBufferCount = 0;
    for (const item of inventory) {
      totalStockReams += item.currentStockReams;
      totalStockValueINR += item.currentStockReams * item.unitCostINR;
      if (item.currentStockReams <= item.bufferThresholdReams) itemsBelowBufferCount++;
    }
    return jsonResponse({
      portalCode: "NESFIC-D-39",
      directorate: DIRECTORATE_DETAILS,
      totalStockReams,
      totalStockValueINR: Math.round(totalStockValueINR),
      itemsBelowBufferCount,
      totalCatalogItems: inventory.length,
      pendingRequisitions: requisitions.filter(r => r.status === "SUBMITTED").length,
      sanctionedRequisitions: requisitions.filter(r => r.status === "SANCTIONED").length,
      activeJobs: jobs.length,
      averageWastagePercentage: 1.85,
      inTransitFleet: gatepasses.filter(g => g.status === "IN_TRANSIT_HIGHWAY").length,
      deliveredConsignmentsCount: gatepasses.filter(g => g.status === "DELIVERED_ACKNOWLEDGED").length,
      totalDistrictsSupported: ASSAM_DISTRICTS.length,
      alertsCount: itemsBelowBufferCount,
      activeAlerts: [],
    });
  }

  // Audit Logs
  if (pathname === "/api/admin/audit-logs") {
    return jsonResponse({ total: auditLogs.length, auditLogs });
  }

  return jsonResponse({ error: "Not Found", path: pathname }, 404);
}
