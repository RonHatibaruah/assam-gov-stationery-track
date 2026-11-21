/**
 * Types & Domain Interfaces for NESFIC-D-39:
 * Digital Inventory & Movement Tracking for Government Press and Stationery
 * Directorate of Printing & Stationery, Government of Assam (Bamunimaidam, Guwahati)
 */

export enum UserRole {
  SuperAdmin = "SUPER_ADMIN",
  StoreManager = "STORE_MANAGER",
  PressSuperintendent = "PRESS_SUPERINTENDENT",
  IndentingOfficer = "INDENTING_OFFICER",
  DispatchOfficer = "DISPATCH_OFFICER",
  VigilanceAuditor = "VIGILANCE_AUDITOR",
}

export enum PaperType {
  Maplitho = "MAPLITHO",
  SunlitBond = "SUNLIT_BOND",
  LedgerPaper = "LEDGER_PAPER",
  ArtPaper = "ART_PAPER",
  ArtBoard = "ART_BOARD",
  KraftPaper = "KRAFT_PAPER",
  PulpBoard = "PULP_BOARD",
}

export enum ItemCategory {
  RawPaperReel = "RAW_PAPER_REEL",
  RawPaperReam = "RAW_PAPER_REAM",
  PrintingInk = "PRINTING_INK",
  OffsetPlates = "OFFSET_PLATES",
  AssamGazette = "ASSAM_GAZETTE",
  GovtStandardForm = "GOVT_STANDARD_FORM",
  AssemblyDocument = "ASSEMBLY_DOCUMENT",
  JudicialStationery = "JUDICIAL_STATIONERY",
  GeneralStationery = "GENERAL_STATIONERY",
}

export enum RequisitionPriority {
  Routine = "ROUTINE",
  UrgentAssembly = "URGENT_ASSEMBLY",
  CriticalElection = "CRITICAL_ELECTION",
  JudicialEmergency = "JUDICIAL_EMERGENCY",
}

export enum RequisitionStatus {
  Draft = "DRAFT",
  Submitted = "SUBMITTED",
  Sanctioned = "SANCTIONED",
  UnderProduction = "UNDER_PRODUCTION",
  IssuedFromStore = "ISSUED_FROM_STORE",
  InTransit = "IN_TRANSIT",
  Delivered = "DELIVERED",
  Rejected = "REJECTED",
}

export enum JobStage {
  PrePressPlatemaking = "PRE_PRESS_PLATEMAKING",
  ProofApproved = "PROOF_APPROVED",
  PressPrinting = "PRESS_PRINTING",
  TrimmingCutting = "TRIMMING_CUTTING",
  BindingFinishing = "BINDING_FINISHING",
  CompletedWarehouse = "COMPLETED_WAREHOUSE",
}

export enum TransitStatus {
  LoadingAtPress = "LOADING_AT_PRESS",
  InTransitHighway = "IN_TRANSIT_HIGHWAY",
  ReachedDistrictHub = "REACHED_DISTRICT_HUB",
  DeliveredAcknowledged = "DELIVERED_ACKNOWLEDGED",
  DelayedTraffic = "DELAYED_TRAFFIC",
}

export interface GPSCoordinate {
  lat: number;
  lng: number;
  locationName?: string;
  timestamp?: string;
}

export interface PaperInventoryItem {
  id: string; // e.g. "PAP-MAP-70-001"
  name: string;
  category: ItemCategory;
  paperType: PaperType;
  gsm: number;
  sheetSizeInches: string; // e.g. "23x36", "18x23", "Reel 84cm"
  currentStockReams: number;
  bufferThresholdReams: number;
  unit: "Reams" | "Metric Tonnes" | "Sheets" | "Rolls" | "Boxes";
  millSupplier: string;
  millLotNo: string;
  warehouseLocation: string; // e.g. "Shed B, Bay 04, Central Press Store"
  qcPassed: boolean;
  unitCostINR: number;
  lastRestockedDate: string;
}

export interface IndentItem {
  itemId: string;
  itemName: string;
  category: ItemCategory;
  requestedQty: number;
  sanctionedQty?: number;
  unit: string;
}

export interface RequisitionIndent {
  id: string; // e.g. "IND-2026-KAM-042"
  indentNo: string;
  departmentCode: string;
  departmentName: string;
  district: string;
  indenterOfficerName: string;
  indenterDesignation: string;
  priority: RequisitionPriority;
  status: RequisitionStatus;
  items: IndentItem[];
  purpose: string;
  submissionDate: string;
  sanctionOrderNo?: string;
  sanctionDate?: string;
  allocatedPressJobId?: string;
  gatepassId?: string;
}

export interface JobTicket {
  id: string; // e.g. "JOB-2026-GAZ-119"
  jobTitle: string;
  productType: "THE_ASSAM_GAZETTE" | "ASSEMBLY_BILLS" | "LAND_REVENUE_FORMS" | "TREASURY_CHALLANS" | "ELECTION_STATIONERY";
  targetQuantity: number;
  unit: string;
  paperLotUsedId: string;
  paperReamsAllocated: number;
  paperWastagePercentage: number;
  stage: JobStage;
  pressMachineAssigned: string; // e.g. "Harris Web Offset Press #1"
  operatorInCharge: string;
  confidentialRun: boolean;
  targetCompletionDate: string;
  completedAt?: string;
}

export interface DispatchGatepass {
  id: string; // e.g. "GP-2026-DIS-088"
  gatepassNumber: string;
  requisitionId: string;
  destinationDistrict: string;
  receivingFacility: string; // e.g. "District Treasury & Stationery Store, Jorhat"
  vehicleNumber: string;
  driverName: string;
  driverPhone: string;
  consignmentDetails: string;
  totalBundles: number;
  grossWeightKg: number;
  qrVerificationToken: string;
  status: TransitStatus;
  departureTime: string;
  estimatedArrivalTime: string;
  currentGPS: GPSCoordinate;
  routeWaypoints: GPSCoordinate[];
  deliveryAcknowledgedBy?: string;
  acknowledgmentTimestamp?: string;
}

export interface AssamGazetteNotification {
  issueNo: string; // e.g. "Vol. 152, Part II-A"
  gazetteType: "ORDINARY" | "EXTRAORDINARY";
  issuingDepartment: string;
  subjectTitle: string;
  publicationDate: string;
  printedCopiesCount: number;
  digitalChecksumSHA256: string;
  archivalStatus: "DIGITIZED_ARCHIVED" | "IN_PRINT";
}

export interface AdminAuditLog {
  id: string;
  timestamp: string;
  action: string;
  actor: string;
  role: UserRole;
  details: string;
  ipAddress: string;
  tamperProofHash: string;
}
