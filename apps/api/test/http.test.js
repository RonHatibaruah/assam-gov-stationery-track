import test from "node:test";
import assert from "node:assert/strict";
import { db } from "../src/db.js";

test("API state and analytics calculation check", () => {
  const analytics = db.getAnalytics();
  assert.equal(analytics.portalCode, "NESFIC-D-39");
  assert.equal(analytics.directorate.name, "Directorate of Printing & Stationery");
  assert.equal(analytics.directorate.location, "Bamunimaidam, Guwahati, Kamrup Metropolitan, Assam - 781021");
  assert.ok(analytics.totalStockReams > 0);
  assert.ok(analytics.totalStockValueINR > 0);
  assert.equal(analytics.totalDistrictsSupported, 35);
});

test("Public QR Gatepass verification endpoint logic", () => {
  const verified = db.verifyGatepassQR("DPS-GP-KAM-98012-VERIFIED-AUTH");
  assert.equal(verified.valid, true);
  assert.equal(verified.gatepass.id, "GP-2026-DIS-088");
  assert.equal(verified.gatepass.destinationDistrict, "Kamrup Metropolitan");

  const invalid = db.verifyGatepassQR("INVALID-TAMPERED-TOKEN");
  assert.equal(invalid.valid, false);
});

test("Gazette registry holds official publications with SHA-256 integrity", () => {
  const gazettes = db.getAllGazettes();
  assert.ok(gazettes.length >= 2);
  const extraordinary = gazettes.find(g => g.gazetteType === "EXTRAORDINARY");
  assert.ok(extraordinary);
  assert.equal(extraordinary.digitalChecksumSHA256.length, 64);
});
