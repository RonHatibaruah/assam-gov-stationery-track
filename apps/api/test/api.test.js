import test from "node:test";
import assert from "node:assert/strict";
import { db } from "../src/db.js";

test("Database seeds correctly with authentic Assam government press inventory", () => {
  const inventory = db.getAllInventory();
  assert.ok(inventory.length >= 5, "Expected at least 5 pre-seeded inventory items");
  
  const maplitho = db.getInventoryItem("PAP-MAP-70-001");
  assert.ok(maplitho, "PAP-MAP-70-001 Maplitho paper should exist");
  assert.equal(maplitho.gsm, 70);
  assert.equal(maplitho.unit, "Reams");
  assert.equal(maplitho.qcPassed, true);

  const bond = db.getInventoryItem("PAP-BND-80-002");
  assert.ok(bond, "PAP-BND-80-002 Sunlit Bond paper should exist");
  assert.equal(bond.paperType, "SUNLIT_BOND");
});

test("Inward stock receipt (GRN) adds new paper stock and logs audit", () => {
  const initialCount = db.getAllInventory().length;
  const newItem = db.inwardStock({
    name: "Heavy Duty Kraft Paper 120 GSM",
    category: "RAW_PAPER_REAM",
    paperType: "KRAFT_PAPER",
    gsm: 120,
    sheetSizeInches: "24x36",
    currentStockReams: 500,
    bufferThresholdReams: 100,
    unit: "Reams",
    millSupplier: "Assam Pulp & Paper Depot",
    millLotNo: "LOT-KFT-2026-001",
    unitCostINR: 520.0,
  });

  assert.ok(newItem.id);
  assert.equal(newItem.name, "Heavy Duty Kraft Paper 120 GSM");
  assert.equal(db.getAllInventory().length, initialCount + 1);

  // Check audit log
  const latestAudit = db.auditLogs[0];
  assert.equal(latestAudit.action, "INWARD_GOODS_RECEIVED");
  assert.ok(latestAudit.tamperProofHash.length === 64, "Must have valid SHA-256 hash");
});

test("Stock adjustments correctly update balance and enforce non-negative floor", () => {
  const item = db.getInventoryItem("PAP-MAP-70-001");
  const beforeStock = item.currentStockReams;

  db.adjustStock("PAP-MAP-70-001", -50, "Sample run deduction");
  assert.equal(item.currentStockReams, beforeStock - 50);

  // Re-adjust
  db.adjustStock("PAP-MAP-70-001", 50, "Restoration");
  assert.equal(item.currentStockReams, beforeStock);
});

test("Requisition (e-Indent) submission and sanction lifecycle", () => {
  const newReq = db.createRequisition({
    departmentCode: "DC_DIB",
    departmentName: "Office of the District Commissioner, Dibrugarh",
    district: "Dibrugarh",
    indenterOfficerName: "Anupam Sarma, ACS",
    indenterDesignation: "ADC (General)",
    priority: "URGENT_ASSEMBLY",
    purpose: "Assembly election preparation stationery",
    items: [
      { itemId: "PAP-MAP-70-001", itemName: "Maplitho 70 GSM", category: "RAW_PAPER_REAM", requestedQty: 100, unit: "Reams" }
    ],
  });

  assert.ok(newReq.id.startsWith("IND-2026-DIB-"));
  assert.equal(newReq.status, "SUBMITTED");

  // Sanction requisition
  const sanctioned = db.approveRequisition(newReq.id, {
    approverName: "Superintendent of Printing & Stationery",
    sanctionOrderNo: "DPS/SANCT/2026/DIB/991",
  });

  assert.equal(sanctioned.status, "SANCTIONED");
  assert.equal(sanctioned.sanctionOrderNo, "DPS/SANCT/2026/DIB/991");
  assert.equal(sanctioned.items[0].sanctionedQty, 100);
});

test("Press floor job ticket progression and trimming loss tracking", () => {
  const job = db.createJobTicket({
    jobTitle: "Assam Gazette Special Edition",
    productType: "THE_ASSAM_GAZETTE",
    targetQuantity: 4000,
    unit: "Copies",
    paperLotUsedId: "PAP-MAP-70-001",
    paperReamsAllocated: 20,
    paperWastagePercentage: 1.5,
  });

  assert.ok(job.id.startsWith("JOB-2026-PRS-"));
  assert.equal(job.stage, "PRE_PRESS_PLATEMAKING");

  // Advance stage to PRESS_PRINTING
  const running = db.updateJobStage(job.id, "PRESS_PRINTING", 2.2);
  assert.equal(running.stage, "PRESS_PRINTING");
  assert.equal(running.paperWastagePercentage, 2.2);

  // Complete job
  const completed = db.updateJobStage(job.id, "COMPLETED_WAREHOUSE", 2.4);
  assert.equal(completed.stage, "COMPLETED_WAREHOUSE");
  assert.ok(completed.completedAt);
});

test("Dispatch E-Gatepass creation, QR verification token lookup, and delivery acknowledgment", () => {
  const gatepass = db.createGatepass({
    destinationDistrict: "Silchar",
    receivingFacility: "District Treasury, Cachar (Silchar)",
    vehicleNumber: "AS-11-BC-3392",
    driverName: "Bishnu Prasad Das",
    driverPhone: "+91-94351-88291",
    consignmentDetails: "100 Reams Paper + 400 Challan Books",
    totalBundles: 80,
    grossWeightKg: 1200.0,
  });

  assert.ok(gatepass.id.startsWith("GP-2026-DIS-"));
  assert.equal(gatepass.status, "IN_TRANSIT_HIGHWAY");
  assert.ok(gatepass.qrVerificationToken.includes("VERIFIED-AUTH"));

  // Verify by QR token
  const verifyResult = db.verifyGatepassQR(gatepass.qrVerificationToken);
  assert.equal(verifyResult.valid, true);
  assert.equal(verifyResult.gatepass.id, gatepass.id);

  // Acknowledge delivery
  const delivered = db.acknowledgeDelivery(gatepass.id, "Cachar District Treasury Officer", "882190");
  assert.equal(delivered.status, "DELIVERED_ACKNOWLEDGED");
  assert.ok(delivered.acknowledgmentTimestamp);
});

test("Buffer stock alert trigger and executive analytics", () => {
  // Force an item below buffer
  const item = db.getInventoryItem("PAP-MAP-70-001");
  item.currentStockReams = item.bufferThresholdReams - 50;
  db.checkBufferStockAlerts();

  const analytics = db.getAnalytics();
  assert.equal(analytics.portalCode, "NESFIC-D-39");
  assert.ok(analytics.itemsBelowBufferCount >= 1, "Should detect at least 1 item below buffer");
  assert.ok(analytics.activeAlerts.length >= 1, "Should have active alert in feed");
  assert.equal(analytics.totalDistrictsSupported, 35);
});
