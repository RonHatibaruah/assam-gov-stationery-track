import http from "node:http";
import { URL } from "node:url";
import { db } from "./db.js";

const PORT = process.env.PORT || 4000;

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  });
  res.end(JSON.stringify(data, null, 2));
}

async function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", chunk => {
      body += chunk.toString();
    });
    req.on("end", () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(err);
      }
    });
    req.on("error", reject);
  });
}

const server = http.createServer(async (req, res) => {
  // Handle CORS Preflight
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    });
    return res.end();
  }

  const reqUrl = new URL(req.url, `http://${req.headers.host || "localhost:4000"}`);
  const pathname = reqUrl.pathname;
  const method = req.method;

  try {
    // 1. Health check
    if (pathname === "/api/health" && method === "GET") {
      return sendJson(res, 200, {
        status: "ok",
        challengeCode: "NESFIC-D-39",
        title: "Digital Inventory & Movement Tracking for Government Press and Stationery",
        department: "Directorate of Printing & Stationery, Government of Assam (Bamunimaidam, Guwahati)",
        timestamp: new Date().toISOString(),
      });
    }

    // 2. Districts List
    if (pathname === "/api/districts" && method === "GET") {
      return sendJson(res, 200, {
        total: db.districts.length,
        districts: db.districts,
      });
    }

    // 3. Inventory Endpoints
    if (pathname === "/api/inventory" && method === "GET") {
      return sendJson(res, 200, {
        total: db.inventory.size,
        inventory: db.getAllInventory(),
      });
    }

    if (pathname === "/api/inventory/inward" && method === "POST") {
      const body = await parseBody(req);
      const item = db.inwardStock(body);
      return sendJson(res, 201, { success: true, item });
    }

    if (pathname.startsWith("/api/inventory/") && pathname.endsWith("/adjust") && method === "POST") {
      const parts = pathname.split("/");
      const id = parts[3];
      const body = await parseBody(req);
      const item = db.adjustStock(id, Number(body.qtyDelta) || 0, body.reason);
      return sendJson(res, 200, { success: true, item });
    }

    if (pathname.startsWith("/api/inventory/") && method === "GET") {
      const id = pathname.split("/")[3];
      const item = db.getInventoryItem(id);
      if (!item) return sendJson(res, 404, { error: `Inventory item ${id} not found` });
      return sendJson(res, 200, item);
    }

    // 4. Requisitions (e-Indents)
    if (pathname === "/api/requisitions" && method === "GET") {
      const status = reqUrl.searchParams.get("status") || undefined;
      const district = reqUrl.searchParams.get("district") || undefined;
      const requisitions = db.getAllRequisitions({ status, district });
      return sendJson(res, 200, { total: requisitions.length, requisitions });
    }

    if (pathname === "/api/requisitions" && method === "POST") {
      const body = await parseBody(req);
      const requisition = db.createRequisition(body);
      return sendJson(res, 201, { success: true, requisition });
    }

    if (pathname.startsWith("/api/requisitions/") && pathname.endsWith("/approve") && method === "POST") {
      const parts = pathname.split("/");
      const id = parts[3];
      const body = await parseBody(req);
      const requisition = db.approveRequisition(id, body);
      return sendJson(res, 200, { success: true, requisition });
    }

    if (pathname.startsWith("/api/requisitions/") && method === "GET") {
      const id = pathname.split("/")[3];
      const reqItem = db.getRequisition(id);
      if (!reqItem) return sendJson(res, 404, { error: `Requisition ${id} not found` });
      return sendJson(res, 200, reqItem);
    }

    // 5. Press Production Floor (Job Tickets)
    if (pathname === "/api/press/jobs" && method === "GET") {
      const jobs = db.getAllJobTickets();
      return sendJson(res, 200, { total: jobs.length, jobs });
    }

    if (pathname === "/api/press/jobs" && method === "POST") {
      const body = await parseBody(req);
      const job = db.createJobTicket(body);
      return sendJson(res, 201, { success: true, job });
    }

    if (pathname.startsWith("/api/press/jobs/") && pathname.endsWith("/stage") && method === "POST") {
      const parts = pathname.split("/");
      const id = parts[4];
      const body = await parseBody(req);
      const job = db.updateJobStage(id, body.stage, body.paperWastagePercentage);
      return sendJson(res, 200, { success: true, job });
    }

    if (pathname.startsWith("/api/press/jobs/") && method === "GET") {
      const id = pathname.split("/")[4];
      const job = db.getJobTicket(id);
      if (!job) return sendJson(res, 404, { error: `Job ticket ${id} not found` });
      return sendJson(res, 200, job);
    }

    // 6. The Assam Gazette Issues
    if (pathname === "/api/gazette/issues" && method === "GET") {
      const gazettes = db.getAllGazettes();
      return sendJson(res, 200, { total: gazettes.length, gazettes });
    }

    if (pathname === "/api/gazette/issues" && method === "POST") {
      const body = await parseBody(req);
      const gazette = db.createGazetteIssue(body);
      return sendJson(res, 201, { success: true, gazette });
    }

    // 7. Dispatch & E-Gatepasses
    if (pathname === "/api/dispatch/gatepasses" && method === "GET") {
      const gatepasses = db.getAllGatepasses();
      return sendJson(res, 200, { total: gatepasses.length, gatepasses });
    }

    if (pathname === "/api/dispatch/create" && method === "POST") {
      const body = await parseBody(req);
      const gatepass = db.createGatepass(body);
      return sendJson(res, 201, { success: true, gatepass });
    }

    if (pathname.startsWith("/api/dispatch/") && pathname.endsWith("/deliver") && method === "POST") {
      const parts = pathname.split("/");
      const id = parts[3];
      const body = await parseBody(req);
      const gatepass = db.acknowledgeDelivery(id, body.acknowledgedBy, body.otp);
      return sendJson(res, 200, { success: true, gatepass });
    }

    if (pathname.startsWith("/api/dispatch/gatepasses/") && method === "GET") {
      const id = pathname.split("/")[4];
      const gatepass = db.getGatepass(id);
      if (!gatepass) return sendJson(res, 404, { error: `Gatepass ${id} not found` });
      return sendJson(res, 200, gatepass);
    }

    // 8. Public / Inspector QR Verification
    if (pathname.startsWith("/api/verify/gatepass/") && method === "GET") {
      const token = pathname.split("/")[4];
      const verification = db.verifyGatepassQR(decodeURIComponent(token));
      return sendJson(res, verification.valid ? 200 : 404, verification);
    }

    // 9. Executive Analytics
    if (pathname === "/api/analytics" && method === "GET") {
      return sendJson(res, 200, db.getAnalytics());
    }

    // 10. Admin Tamper-Proof Audit Logs
    if (pathname === "/api/admin/audit-logs" && method === "GET") {
      return sendJson(res, 200, {
        total: db.auditLogs.length,
        auditLogs: db.auditLogs,
      });
    }

    // Route Not Found
    return sendJson(res, 404, {
      error: "Not Found",
      message: `Endpoint ${method} ${pathname} does not exist.`,
      challenge: "NESFIC-D-39",
    });
  } catch (error) {
    console.error("API Error:", error);
    return sendJson(res, 500, {
      error: "Internal Server Error",
      message: error.message,
    });
  }
});

server.listen(PORT, () => {
  console.log(`🖨️ Directorate of Printing & Stationery API (NESFIC-D-39) running at http://localhost:${PORT}`);
});
