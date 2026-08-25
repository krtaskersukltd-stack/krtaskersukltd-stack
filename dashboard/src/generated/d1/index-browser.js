
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  name: 'name',
  password: 'password',
  role: 'role',
  companyId: 'companyId',
  screenshotInterval: 'screenshotInterval',
  idleLimitMinutes: 'idleLimitMinutes',
  timezone: 'timezone',
  workDays: 'workDays',
  shiftStartMinutes: 'shiftStartMinutes',
  shiftEndMinutes: 'shiftEndMinutes',
  targetMinutes: 'targetMinutes',
  maxShiftMinutes: 'maxShiftMinutes',
  maxBreakMinutes: 'maxBreakMinutes',
  screenshotRetentionDays: 'screenshotRetentionDays',
  manualTimeRequiresApproval: 'manualTimeRequiresApproval',
  resetCode: 'resetCode',
  resetExpires: 'resetExpires',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.WorkReportScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  type: 'type',
  note: 'note',
  emailSent: 'emailSent',
  createdAt: 'createdAt',
  endedAt: 'endedAt',
  durationSeconds: 'durationSeconds',
  clientEventId: 'clientEventId',
  taskId: 'taskId'
};

exports.Prisma.ActivityLogScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  timestamp: 'timestamp',
  status: 'status',
  currentTask: 'currentTask',
  appProcess: 'appProcess',
  appTitle: 'appTitle',
  keystrokes: 'keystrokes',
  mouseClicks: 'mouseClicks',
  durationSeconds: 'durationSeconds',
  idleSeconds: 'idleSeconds',
  continuousIdleSeconds: 'continuousIdleSeconds',
  clientEventId: 'clientEventId',
  taskId: 'taskId',
  productivityCategory: 'productivityCategory'
};

exports.Prisma.ScreenshotScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  timestamp: 'timestamp',
  filePath: 'filePath',
  activityRate: 'activityRate',
  currentTask: 'currentTask',
  keystrokes: 'keystrokes',
  mouseClicks: 'mouseClicks',
  clientEventId: 'clientEventId'
};

exports.Prisma.TrackingSessionScalarFieldEnum = {
  id: 'id',
  clientSessionId: 'clientSessionId',
  userId: 'userId',
  companyId: 'companyId',
  dateKey: 'dateKey',
  startedAt: 'startedAt',
  endedAt: 'endedAt',
  lastHeartbeatAt: 'lastHeartbeatAt',
  status: 'status',
  breakStartedAt: 'breakStartedAt',
  activeSeconds: 'activeSeconds',
  idleSeconds: 'idleSeconds',
  breakSeconds: 'breakSeconds',
  reviewRequired: 'reviewRequired',
  reviewReason: 'reviewReason',
  currentTask: 'currentTask',
  taskId: 'taskId'
};

exports.Prisma.ProjectScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  name: 'name',
  code: 'code',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TaskScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  projectId: 'projectId',
  assignedUserId: 'assignedUserId',
  title: 'title',
  description: 'description',
  status: 'status',
  priority: 'priority',
  dueDate: 'dueDate',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ProductivityRuleScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  pattern: 'pattern',
  matchType: 'matchType',
  category: 'category',
  createdAt: 'createdAt'
};

exports.Prisma.ManualTimeRequestScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  companyId: 'companyId',
  startAt: 'startAt',
  endAt: 'endAt',
  note: 'note',
  projectId: 'projectId',
  taskId: 'taskId',
  status: 'status',
  reviewedBy: 'reviewedBy',
  reviewedAt: 'reviewedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AlertScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  userId: 'userId',
  type: 'type',
  severity: 'severity',
  message: 'message',
  metadata: 'metadata',
  createdAt: 'createdAt',
  readAt: 'readAt'
};

exports.Prisma.AuditLogScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  actorUserId: 'actorUserId',
  action: 'action',
  entityType: 'entityType',
  entityId: 'entityId',
  details: 'details',
  createdAt: 'createdAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  User: 'User',
  WorkReport: 'WorkReport',
  ActivityLog: 'ActivityLog',
  Screenshot: 'Screenshot',
  TrackingSession: 'TrackingSession',
  Project: 'Project',
  Task: 'Task',
  ProductivityRule: 'ProductivityRule',
  ManualTimeRequest: 'ManualTimeRequest',
  Alert: 'Alert',
  AuditLog: 'AuditLog'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
