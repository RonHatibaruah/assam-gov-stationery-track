/**
 * Cloudflare Pages Function: Serverless Edge API for NESFIC-D-39
 * Directorate of Printing & Stationery, Government of Assam (Bamunimaidam, Guwahati)
 * Self-contained for seamless Cloudflare Edge compilation
 */

const ASSAM_DISTRICTS = [
  "Kamrup Metropolitan",
  "Kamrup Rural",
  "Jorhat",
  "Dibrugarh",
  "Tinsukia",
  "Golaghat",
  "Sivasagar",
  "Charaideo",
  "Majuli",
  "Sonitpur",
  "Biswanath",
  "Nagaon",
  "Hojai",
  "Morigaon",
  "Darrang",
  "Udalguri",
  "Cachar",
  "Karimganj",
  "Hailakandi",
  "Bongaigaon",
  "Dhubri",
  "Goalpara",
  "Barpeta",
  "Bajali",
  "Nalbari",
  "Baksa",
  "Chirang",
  "Kokrajhar",
  "Dhemaji",
  "Lakhimpur",
  "Karbi Anglong",
  "West Karbi Anglong",
  "Dima Hasao",
  "South Salmara-Mankachar",
  "Tamulpur",
];

const DIRECTORATE_DETAILS = {
  name: "Directorate of Printing & Stationery",
  department: "Information, Public Relations, Printing & Stationery Department",
  government: "Government of Assam",
  location: "Bamunimaidam, Guwahati, Kamrup Metropolitan, Assam - 781021",
  coordinates: {
    lat: 26.1834,
    lng: 91.7766,
  },
  phone: "+91-361-2550183",
  portalCode: "NESFIC-D-39",
};

const SAMPLE_PAPER_INVENTORY = [
  {
    id: "PAP-MAP-70-001",
    name: "White Maplitho Paper 70 GSM (Reams)",
    category: "RAW_PAPER_REAM",
    paperType: "MAPLITHO",
    gsm: 70,
    sheetSizeInches: "23 x 36",
    currentStockReams: 2850,
    bufferThresholdReams: 800,
    unit: "Reams",
    millSupplier: "Hindustan Paper Corp / Nagaon Paper Mill Stock",
    millLotNo: "LOT-MAP-2026-092",
    warehouseLocation: "Central Store Shed A, Bay 03",
    qcPassed: true,
    unitCostINR: 420.0,
    lastRestockedDate: "2026-11-10T10:00:00+05:30",
  },
  {
    id: "PAP-BND-80-002",
    name: "Executive Sunlit Bond Paper 80 GSM (Watermarked)",
    category: "RAW_PAPER_REAM",
    paperType: "SUNLIT_BOND",
    gsm: 80,
    sheetSizeInches: "A4 (8.27 x 11.69)",
    currentStockReams: 1420,
    bufferThresholdReams: 500,
    unit: "Reams",
    millSupplier: "Ballarpur Paper Mills",
    millLotNo: "LOT-BND-2026-141",
    warehouseLocation: "Secretariat & Gazette Vault, Shed A",
    qcPassed: true,
    unitCostINR: 580.0,
    lastRestockedDate: "2026-11-14T11:30:00+05:30",
  },
  {
    id: "PAP-LDG-90-003",
    name: "Azurelaid Ledger Paper 90 GSM (Land Revenue Registers)",
    category: "RAW_PAPER_REAM",
    paperType: "LEDGER_PAPER",
    gsm: 90,
    sheetSizeInches: "17 x 27",
    currentStockReams: 680,
    bufferThresholdReams: 400,
    unit: "Reams",
    millSupplier: "Star Paper Mills",
    millLotNo: "LOT-LDG-2026-044",
    warehouseLocation: "Revenue & Land Form Bay 02",
    qcPassed: true,
    unitCostINR: 650.0,
    lastRestockedDate: "2026-11-05T14:15:00+05:30",
  },
  {
    id: "PAP-ART-300-004",
    name: "Gloss Art Board 300 GSM (Gazette & Budget Covers)",
    category: "RAW_PAPER_REAM",
    paperType: "ART_BOARD",
    gsm: 300,
    sheetSizeInches: "22 x 28",
    currentStockReams: 390,
    bufferThresholdReams: 250,
    unit: "Reams",
    millSupplier: "ITC PSPD Paper Division",
    millLotNo: "LOT-ART-2026-809",
    warehouseLocation: "Special Finished Goods Depot, Shed C",
    qcPassed: true,
    unitCostINR: 1150.0,
    lastRestockedDate: "2026-11-12T09:45:00+05:30",
  },
  {
    id: "PAP-REL-60-005",
    name: "High-Speed Web Offset Reel 60 GSM (Gazette Newsprint)",
    category: "RAW_PAPER_REEL",
    paperType: "MAPLITHO",
    gsm: 60,
    sheetSizeInches: "Reel Width 84 cm (12,000 meters)",
    currentStockReams: 48,
    bufferThresholdReams: 20,
    unit: "Rolls",
    millSupplier: "Emami Paper Mills Ltd",
    millLotNo: "LOT-REL-2026-302",
    warehouseLocation: "Rotary Press Hall Heavy Reel Stand",
    qcPassed: true,
    unitCostINR: 28500.0,
    lastRestockedDate: "2026-11-08T16:00:00+05:30",
  },
];

const SAMPLE_REQUISITIONS = [
  {
    id: "IND-2026-KAM-042",
    indentNo: "IND/KAM-METRO/STN/2026/892",
    departmentCode: "DC_OFFICE",
    departmentName: "Office of the District Commissioner, Kamrup Metropolitan",
    district: "Kamrup Metropolitan",
    indenterOfficerName: "Hemanta Das, ACS",
    indenterDesignation: "Additional Deputy Commissioner (General)",
    priority: "ROUTINE",
    status: "SANCTIONED",
    items: [
      { itemId: "PAP-BND-80-002", itemName: "Executive Sunlit Bond Paper 80 GSM", requestedQty: 150, sanctionedQty: 150, unit: "Reams" },
      { itemId: "STN-FRM-01", itemName: "Treasury Challan Form (Schedule LIII-107)", requestedQty: 500, sanctionedQty: 500, unit: "Books" },
    ],
    purpose: "Routine administrative and treasury operations for Q4 2026-27",
    submissionDate: "2026-11-18T09:30:00+05:30",
    sanctionOrderNo: "DPS/SANCT/2026/KAM/419",
    sanctionDate: "2026-11-19T14:00:00+05:30",
    gatepassId: "GP-2026-DIS-088",
  },
  {
    id: "IND-2026-JHT-051",
    indentNo: "IND/JORHAT/REV/2026/114",
    departmentCode: "REV_DEPT",
    departmentName: "District Revenue Circle Office, Jorhat",
    district: "Jorhat",
    indenterOfficerName: "Priyanka Bordoloi, ALRS",
    indenterDesignation: "Circle Officer, Jorhat East",
    priority: "URGENT_ASSEMBLY",
    status: "IN_TRANSIT",
    items: [
      { itemId: "PAP-LDG-90-003", itemName: "Azurelaid Ledger Paper 90 GSM (Land Jamabandi)", requestedQty: 80, sanctionedQty: 80, unit: "Reams" },
      { itemId: "STN-REG-REV", itemName: "Periodic Patta Registers (Dharitree Standard Form 14)", requestedQty: 120, sanctionedQty: 120, unit: "Registers" },
    ],
    purpose: "Mission Basundhara cadastral title and periodic patta issuance drive",
    submissionDate: "2026-11-16T11:00:00+05:30",
    sanctionOrderNo: "DPS/SANCT/2026/JHT/102",
    sanctionDate: "2026-11-17T16:30:00+05:30",
    gatepassId: "GP-2026-DIS-092",
  },
];

const SAMPLE_JOB_TICKETS = [
  {
    id: "JOB-2026-GAZ-119",
    jobTitle: "The Assam Gazette (অসম ৰাজপত্ৰ) - Extraordinary Edition No. 488",
    productType: "THE_ASSAM_GAZETTE",
    targetQuantity: 5000,
    unit: "Copies",
    paperLotUsedId: "PAP-REL-60-005",
    paperReamsAllocated: 25,
    paperWastagePercentage: 1.8,
    stage: "PRESS_PRINTING",
    pressMachineAssigned: "Harris Heavy Web Offset Press #1 (Reel-fed)",
    operatorInCharge: "Dhiren Kalita (Master Pressman)",
    confidentialRun: false,
    targetCompletionDate: "2026-11-22T18:00:00+05:30",
  },
  {
    id: "JOB-2026-BDG-003",
    jobTitle: "Assam Legislative Assembly: State Budget Memoranda 2027",
    productType: "ASSEMBLY_BILLS",
    targetQuantity: 1200,
    unit: "Bound Volumes",
    paperLotUsedId: "PAP-MAP-70-001",
    paperReamsAllocated: 120,
    paperWastagePercentage: 2.1,
    stage: "PRE_PRESS_PLATEMAKING",
    pressMachineAssigned: "Heidelberg Speedmaster Sheet-fed 4-Color Press #2",
    operatorInCharge: "Ranjit Saikia (Superintendent, Security Section)",
    confidentialRun: true,
    targetCompletionDate: "2026-11-25T12:00:00+05:30",
  },
];

const SAMPLE_DISPATCH_GATEPASSES = [
  {
    id: "GP-2026-DIS-088",
    gatepassNumber: "DPS/GP/2026/KAM/088",
    requisitionId: "IND-2026-KAM-042",
    destinationDistrict: "Kamrup Metropolitan",
    receivingFacility: "District Treasury & Stationery Store, Panbazar, Guwahati",
    vehicleNumber: "AS-01-GC-4182 (Govt Dedicated E-Truck)",
    driverName: "Prabin Chandra Bora",
    driverPhone: "+91-98640-12891",
    consignmentDetails: "150 Reams Sunlit Bond 80 GSM + 500 Treasury Challan Books",
    totalBundles: 65,
    grossWeightKg: 890.0,
    qrVerificationToken: "DPS-GP-KAM-98012-VERIFIED-AUTH",
    status: "DELIVERED_ACKNOWLEDGED",
    departureTime: "2026-11-20T10:00:00+05:30",
    estimatedArrivalTime: "2026-11-20T11:30:00+05:30",
    currentGPS: {
      lat: 26.1852,
      lng: 91.7458,
      locationName: "Panbazar District Treasury, Kamrup Metro",
      timestamp: "2026-11-20T11:25:00+05:30",
    },
    routeWaypoints: [
      { lat: 26.1834, lng: 91.7766, locationName: "Directorate Press, Bamunimaidam" },
      { lat: 26.1852, lng: 91.7458, locationName: "Panbazar District Treasury, Guwahati" },
    ],
    deliveryAcknowledgedBy: "S. N. Goswami (Treasury Store Officer, Kamrup)",
    acknowledgmentTimestamp: "2026-11-20T11:40:00+05:30",
  },
  {
    id: "GP-2026-DIS-092",
    gatepassNumber: "DPS/GP/2026/JHT/092",
    requisitionId: "IND-2026-JHT-051",
    destinationDistrict: "Jorhat",
    receivingFacility: "District Commissionerate Central Stationery Depot, Jorhat",
    vehicleNumber: "AS-03-BC-7819 (Assam State Transport Carrier)",
    driverName: "Moheshwar Deka",
    driverPhone: "+91-94350-67123",
    consignmentDetails: "80 Reams Azurelaid 90 GSM + 120 Periodic Patta Registers",
    totalBundles: 140,
    grossWeightKg: 1840.0,
    qrVerificationToken: "DPS-GP-JHT-44810-VERIFIED-AUTH",
    status: "IN_TRANSIT_HIGHWAY",
    departureTime: "2026-11-21T06:00:00+05:30",
    estimatedArrivalTime: "2026-11-21T18:00:00+05:30",
    currentGPS: {
      lat: 26.6521,
      lng: 93.3512,
      locationName: "NH-715 Near Kaziranga Kohora Corridor",
      timestamp: "2026-11-21T13:45:00+05:30",
    },
    routeWaypoints: [
      { lat: 26.1834, lng: 91.7766, locationName: "Bamunimaidam Central Press, Guwahati" },
      { lat: 26.7509, lng: 94.2037, locationName: "Jorhat DC Depot" },
    ],
  },
];

const SAMPLE_GAZETTE_ISSUES = [
  {
    issueNo: "Vol. 152, Extraordinary No. 488",
    gazetteType: "EXTRAORDINARY",
    issuingDepartment: "Department of Personnel (Personnel-A), Dispur",
    subjectTitle: "Notification regarding Assam Public Service Commission Rules Amendment 2026",
    publicationDate: "2026-11-20",
    printedCopiesCount: 5000,
    digitalChecksumSHA256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    archivalStatus: "DIGITIZED_ARCHIVED",
  },
  {
    issueNo: "Vol. 152, Ordinary Part IX No. 46",
    gazetteType: "ORDINARY",
    issuingDepartment: "Revenue and Disaster Management Department",
    subjectTitle: "Declaration of Cadastral Resurvey completion in Majuli District",
    publicationDate: "2026-11-18",
    printedCopiesCount: 2500,
    digitalChecksumSHA256: "c5d804828f7d95a892b192809a473489e248b64e03021e06fa53ec8652309199",
    archivalStatus: "DIGITIZED_ARCHIVED",
  },
];

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

  if (pathname.startsWith("/api/verify/gatepass/") && method === "GET") {
    const token = decodeURIComponent(pathname.split("/")[4] || "");
    const gp = gatepasses.find(g => g.qrVerificationToken === token || g.id === token || g.gatepassNumber === token);
    if (gp) {
      return jsonResponse({
        valid: true,
        gatepass: gp,
        verifiedAt: new Date().toISOString(),
        issuer: "Directorate of Printing & Stationery, Assam (Bamunimaidam, Guwahati)",
      });
    }
    return jsonResponse({ valid: false, message: "QR Token not recognized" }, 404);
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
