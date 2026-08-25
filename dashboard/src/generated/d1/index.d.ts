
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model WorkReport
 * 
 */
export type WorkReport = $Result.DefaultSelection<Prisma.$WorkReportPayload>
/**
 * Model ActivityLog
 * 
 */
export type ActivityLog = $Result.DefaultSelection<Prisma.$ActivityLogPayload>
/**
 * Model Screenshot
 * 
 */
export type Screenshot = $Result.DefaultSelection<Prisma.$ScreenshotPayload>
/**
 * Model TrackingSession
 * 
 */
export type TrackingSession = $Result.DefaultSelection<Prisma.$TrackingSessionPayload>
/**
 * Model Project
 * 
 */
export type Project = $Result.DefaultSelection<Prisma.$ProjectPayload>
/**
 * Model Task
 * 
 */
export type Task = $Result.DefaultSelection<Prisma.$TaskPayload>
/**
 * Model ProductivityRule
 * 
 */
export type ProductivityRule = $Result.DefaultSelection<Prisma.$ProductivityRulePayload>
/**
 * Model ManualTimeRequest
 * 
 */
export type ManualTimeRequest = $Result.DefaultSelection<Prisma.$ManualTimeRequestPayload>
/**
 * Model Alert
 * 
 */
export type Alert = $Result.DefaultSelection<Prisma.$AlertPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.workReport`: Exposes CRUD operations for the **WorkReport** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WorkReports
    * const workReports = await prisma.workReport.findMany()
    * ```
    */
  get workReport(): Prisma.WorkReportDelegate<ExtArgs>;

  /**
   * `prisma.activityLog`: Exposes CRUD operations for the **ActivityLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ActivityLogs
    * const activityLogs = await prisma.activityLog.findMany()
    * ```
    */
  get activityLog(): Prisma.ActivityLogDelegate<ExtArgs>;

  /**
   * `prisma.screenshot`: Exposes CRUD operations for the **Screenshot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Screenshots
    * const screenshots = await prisma.screenshot.findMany()
    * ```
    */
  get screenshot(): Prisma.ScreenshotDelegate<ExtArgs>;

  /**
   * `prisma.trackingSession`: Exposes CRUD operations for the **TrackingSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TrackingSessions
    * const trackingSessions = await prisma.trackingSession.findMany()
    * ```
    */
  get trackingSession(): Prisma.TrackingSessionDelegate<ExtArgs>;

  /**
   * `prisma.project`: Exposes CRUD operations for the **Project** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projects
    * const projects = await prisma.project.findMany()
    * ```
    */
  get project(): Prisma.ProjectDelegate<ExtArgs>;

  /**
   * `prisma.task`: Exposes CRUD operations for the **Task** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tasks
    * const tasks = await prisma.task.findMany()
    * ```
    */
  get task(): Prisma.TaskDelegate<ExtArgs>;

  /**
   * `prisma.productivityRule`: Exposes CRUD operations for the **ProductivityRule** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProductivityRules
    * const productivityRules = await prisma.productivityRule.findMany()
    * ```
    */
  get productivityRule(): Prisma.ProductivityRuleDelegate<ExtArgs>;

  /**
   * `prisma.manualTimeRequest`: Exposes CRUD operations for the **ManualTimeRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ManualTimeRequests
    * const manualTimeRequests = await prisma.manualTimeRequest.findMany()
    * ```
    */
  get manualTimeRequest(): Prisma.ManualTimeRequestDelegate<ExtArgs>;

  /**
   * `prisma.alert`: Exposes CRUD operations for the **Alert** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Alerts
    * const alerts = await prisma.alert.findMany()
    * ```
    */
  get alert(): Prisma.AlertDelegate<ExtArgs>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
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

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "workReport" | "activityLog" | "screenshot" | "trackingSession" | "project" | "task" | "productivityRule" | "manualTimeRequest" | "alert" | "auditLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      WorkReport: {
        payload: Prisma.$WorkReportPayload<ExtArgs>
        fields: Prisma.WorkReportFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WorkReportFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkReportPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorkReportFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkReportPayload>
          }
          findFirst: {
            args: Prisma.WorkReportFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkReportPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorkReportFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkReportPayload>
          }
          findMany: {
            args: Prisma.WorkReportFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkReportPayload>[]
          }
          create: {
            args: Prisma.WorkReportCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkReportPayload>
          }
          createMany: {
            args: Prisma.WorkReportCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WorkReportCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkReportPayload>[]
          }
          delete: {
            args: Prisma.WorkReportDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkReportPayload>
          }
          update: {
            args: Prisma.WorkReportUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkReportPayload>
          }
          deleteMany: {
            args: Prisma.WorkReportDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WorkReportUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.WorkReportUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkReportPayload>
          }
          aggregate: {
            args: Prisma.WorkReportAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWorkReport>
          }
          groupBy: {
            args: Prisma.WorkReportGroupByArgs<ExtArgs>
            result: $Utils.Optional<WorkReportGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorkReportCountArgs<ExtArgs>
            result: $Utils.Optional<WorkReportCountAggregateOutputType> | number
          }
        }
      }
      ActivityLog: {
        payload: Prisma.$ActivityLogPayload<ExtArgs>
        fields: Prisma.ActivityLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActivityLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActivityLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          findFirst: {
            args: Prisma.ActivityLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActivityLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          findMany: {
            args: Prisma.ActivityLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>[]
          }
          create: {
            args: Prisma.ActivityLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          createMany: {
            args: Prisma.ActivityLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ActivityLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>[]
          }
          delete: {
            args: Prisma.ActivityLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          update: {
            args: Prisma.ActivityLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          deleteMany: {
            args: Prisma.ActivityLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ActivityLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ActivityLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          aggregate: {
            args: Prisma.ActivityLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActivityLog>
          }
          groupBy: {
            args: Prisma.ActivityLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActivityLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.ActivityLogCountArgs<ExtArgs>
            result: $Utils.Optional<ActivityLogCountAggregateOutputType> | number
          }
        }
      }
      Screenshot: {
        payload: Prisma.$ScreenshotPayload<ExtArgs>
        fields: Prisma.ScreenshotFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ScreenshotFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScreenshotPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ScreenshotFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScreenshotPayload>
          }
          findFirst: {
            args: Prisma.ScreenshotFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScreenshotPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ScreenshotFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScreenshotPayload>
          }
          findMany: {
            args: Prisma.ScreenshotFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScreenshotPayload>[]
          }
          create: {
            args: Prisma.ScreenshotCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScreenshotPayload>
          }
          createMany: {
            args: Prisma.ScreenshotCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ScreenshotCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScreenshotPayload>[]
          }
          delete: {
            args: Prisma.ScreenshotDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScreenshotPayload>
          }
          update: {
            args: Prisma.ScreenshotUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScreenshotPayload>
          }
          deleteMany: {
            args: Prisma.ScreenshotDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ScreenshotUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ScreenshotUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScreenshotPayload>
          }
          aggregate: {
            args: Prisma.ScreenshotAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateScreenshot>
          }
          groupBy: {
            args: Prisma.ScreenshotGroupByArgs<ExtArgs>
            result: $Utils.Optional<ScreenshotGroupByOutputType>[]
          }
          count: {
            args: Prisma.ScreenshotCountArgs<ExtArgs>
            result: $Utils.Optional<ScreenshotCountAggregateOutputType> | number
          }
        }
      }
      TrackingSession: {
        payload: Prisma.$TrackingSessionPayload<ExtArgs>
        fields: Prisma.TrackingSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TrackingSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TrackingSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingSessionPayload>
          }
          findFirst: {
            args: Prisma.TrackingSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TrackingSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingSessionPayload>
          }
          findMany: {
            args: Prisma.TrackingSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingSessionPayload>[]
          }
          create: {
            args: Prisma.TrackingSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingSessionPayload>
          }
          createMany: {
            args: Prisma.TrackingSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TrackingSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingSessionPayload>[]
          }
          delete: {
            args: Prisma.TrackingSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingSessionPayload>
          }
          update: {
            args: Prisma.TrackingSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingSessionPayload>
          }
          deleteMany: {
            args: Prisma.TrackingSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TrackingSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TrackingSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingSessionPayload>
          }
          aggregate: {
            args: Prisma.TrackingSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTrackingSession>
          }
          groupBy: {
            args: Prisma.TrackingSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<TrackingSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.TrackingSessionCountArgs<ExtArgs>
            result: $Utils.Optional<TrackingSessionCountAggregateOutputType> | number
          }
        }
      }
      Project: {
        payload: Prisma.$ProjectPayload<ExtArgs>
        fields: Prisma.ProjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findFirst: {
            args: Prisma.ProjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findMany: {
            args: Prisma.ProjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          create: {
            args: Prisma.ProjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          createMany: {
            args: Prisma.ProjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          delete: {
            args: Prisma.ProjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          update: {
            args: Prisma.ProjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          deleteMany: {
            args: Prisma.ProjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          aggregate: {
            args: Prisma.ProjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProject>
          }
          groupBy: {
            args: Prisma.ProjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectCountAggregateOutputType> | number
          }
        }
      }
      Task: {
        payload: Prisma.$TaskPayload<ExtArgs>
        fields: Prisma.TaskFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaskFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaskFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findFirst: {
            args: Prisma.TaskFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaskFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findMany: {
            args: Prisma.TaskFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          create: {
            args: Prisma.TaskCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          createMany: {
            args: Prisma.TaskCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TaskCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          delete: {
            args: Prisma.TaskDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          update: {
            args: Prisma.TaskUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          deleteMany: {
            args: Prisma.TaskDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaskUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TaskUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          aggregate: {
            args: Prisma.TaskAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTask>
          }
          groupBy: {
            args: Prisma.TaskGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaskGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaskCountArgs<ExtArgs>
            result: $Utils.Optional<TaskCountAggregateOutputType> | number
          }
        }
      }
      ProductivityRule: {
        payload: Prisma.$ProductivityRulePayload<ExtArgs>
        fields: Prisma.ProductivityRuleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductivityRuleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductivityRulePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductivityRuleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductivityRulePayload>
          }
          findFirst: {
            args: Prisma.ProductivityRuleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductivityRulePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductivityRuleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductivityRulePayload>
          }
          findMany: {
            args: Prisma.ProductivityRuleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductivityRulePayload>[]
          }
          create: {
            args: Prisma.ProductivityRuleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductivityRulePayload>
          }
          createMany: {
            args: Prisma.ProductivityRuleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductivityRuleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductivityRulePayload>[]
          }
          delete: {
            args: Prisma.ProductivityRuleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductivityRulePayload>
          }
          update: {
            args: Prisma.ProductivityRuleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductivityRulePayload>
          }
          deleteMany: {
            args: Prisma.ProductivityRuleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductivityRuleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProductivityRuleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductivityRulePayload>
          }
          aggregate: {
            args: Prisma.ProductivityRuleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProductivityRule>
          }
          groupBy: {
            args: Prisma.ProductivityRuleGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductivityRuleGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductivityRuleCountArgs<ExtArgs>
            result: $Utils.Optional<ProductivityRuleCountAggregateOutputType> | number
          }
        }
      }
      ManualTimeRequest: {
        payload: Prisma.$ManualTimeRequestPayload<ExtArgs>
        fields: Prisma.ManualTimeRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ManualTimeRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ManualTimeRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ManualTimeRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ManualTimeRequestPayload>
          }
          findFirst: {
            args: Prisma.ManualTimeRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ManualTimeRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ManualTimeRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ManualTimeRequestPayload>
          }
          findMany: {
            args: Prisma.ManualTimeRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ManualTimeRequestPayload>[]
          }
          create: {
            args: Prisma.ManualTimeRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ManualTimeRequestPayload>
          }
          createMany: {
            args: Prisma.ManualTimeRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ManualTimeRequestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ManualTimeRequestPayload>[]
          }
          delete: {
            args: Prisma.ManualTimeRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ManualTimeRequestPayload>
          }
          update: {
            args: Prisma.ManualTimeRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ManualTimeRequestPayload>
          }
          deleteMany: {
            args: Prisma.ManualTimeRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ManualTimeRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ManualTimeRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ManualTimeRequestPayload>
          }
          aggregate: {
            args: Prisma.ManualTimeRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateManualTimeRequest>
          }
          groupBy: {
            args: Prisma.ManualTimeRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<ManualTimeRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.ManualTimeRequestCountArgs<ExtArgs>
            result: $Utils.Optional<ManualTimeRequestCountAggregateOutputType> | number
          }
        }
      }
      Alert: {
        payload: Prisma.$AlertPayload<ExtArgs>
        fields: Prisma.AlertFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AlertFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AlertFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload>
          }
          findFirst: {
            args: Prisma.AlertFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AlertFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload>
          }
          findMany: {
            args: Prisma.AlertFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload>[]
          }
          create: {
            args: Prisma.AlertCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload>
          }
          createMany: {
            args: Prisma.AlertCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AlertCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload>[]
          }
          delete: {
            args: Prisma.AlertDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload>
          }
          update: {
            args: Prisma.AlertUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload>
          }
          deleteMany: {
            args: Prisma.AlertDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AlertUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AlertUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload>
          }
          aggregate: {
            args: Prisma.AlertAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAlert>
          }
          groupBy: {
            args: Prisma.AlertGroupByArgs<ExtArgs>
            result: $Utils.Optional<AlertGroupByOutputType>[]
          }
          count: {
            args: Prisma.AlertCountArgs<ExtArgs>
            result: $Utils.Optional<AlertCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    activities: number
    screenshots: number
    workReports: number
    trackingSessions: number
    manualTimeRequests: number
    assignedTasks: number
    alerts: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    activities?: boolean | UserCountOutputTypeCountActivitiesArgs
    screenshots?: boolean | UserCountOutputTypeCountScreenshotsArgs
    workReports?: boolean | UserCountOutputTypeCountWorkReportsArgs
    trackingSessions?: boolean | UserCountOutputTypeCountTrackingSessionsArgs
    manualTimeRequests?: boolean | UserCountOutputTypeCountManualTimeRequestsArgs
    assignedTasks?: boolean | UserCountOutputTypeCountAssignedTasksArgs
    alerts?: boolean | UserCountOutputTypeCountAlertsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountActivitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityLogWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountScreenshotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScreenshotWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountWorkReportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkReportWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTrackingSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrackingSessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountManualTimeRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ManualTimeRequestWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAssignedTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAlertsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AlertWhereInput
  }


  /**
   * Count Type ProjectCountOutputType
   */

  export type ProjectCountOutputType = {
    tasks: number
    manualTimeRequests: number
  }

  export type ProjectCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tasks?: boolean | ProjectCountOutputTypeCountTasksArgs
    manualTimeRequests?: boolean | ProjectCountOutputTypeCountManualTimeRequestsArgs
  }

  // Custom InputTypes
  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectCountOutputType
     */
    select?: ProjectCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountManualTimeRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ManualTimeRequestWhereInput
  }


  /**
   * Count Type TaskCountOutputType
   */

  export type TaskCountOutputType = {
    manualTimeRequests: number
  }

  export type TaskCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    manualTimeRequests?: boolean | TaskCountOutputTypeCountManualTimeRequestsArgs
  }

  // Custom InputTypes
  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCountOutputType
     */
    select?: TaskCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeCountManualTimeRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ManualTimeRequestWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    screenshotInterval: number | null
    idleLimitMinutes: number | null
    shiftStartMinutes: number | null
    shiftEndMinutes: number | null
    targetMinutes: number | null
    maxShiftMinutes: number | null
    maxBreakMinutes: number | null
    screenshotRetentionDays: number | null
  }

  export type UserSumAggregateOutputType = {
    screenshotInterval: number | null
    idleLimitMinutes: number | null
    shiftStartMinutes: number | null
    shiftEndMinutes: number | null
    targetMinutes: number | null
    maxShiftMinutes: number | null
    maxBreakMinutes: number | null
    screenshotRetentionDays: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    password: string | null
    role: string | null
    companyId: string | null
    screenshotInterval: number | null
    idleLimitMinutes: number | null
    timezone: string | null
    workDays: string | null
    shiftStartMinutes: number | null
    shiftEndMinutes: number | null
    targetMinutes: number | null
    maxShiftMinutes: number | null
    maxBreakMinutes: number | null
    screenshotRetentionDays: number | null
    manualTimeRequiresApproval: boolean | null
    resetCode: string | null
    resetExpires: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    password: string | null
    role: string | null
    companyId: string | null
    screenshotInterval: number | null
    idleLimitMinutes: number | null
    timezone: string | null
    workDays: string | null
    shiftStartMinutes: number | null
    shiftEndMinutes: number | null
    targetMinutes: number | null
    maxShiftMinutes: number | null
    maxBreakMinutes: number | null
    screenshotRetentionDays: number | null
    manualTimeRequiresApproval: boolean | null
    resetCode: string | null
    resetExpires: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    password: number
    role: number
    companyId: number
    screenshotInterval: number
    idleLimitMinutes: number
    timezone: number
    workDays: number
    shiftStartMinutes: number
    shiftEndMinutes: number
    targetMinutes: number
    maxShiftMinutes: number
    maxBreakMinutes: number
    screenshotRetentionDays: number
    manualTimeRequiresApproval: number
    resetCode: number
    resetExpires: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    screenshotInterval?: true
    idleLimitMinutes?: true
    shiftStartMinutes?: true
    shiftEndMinutes?: true
    targetMinutes?: true
    maxShiftMinutes?: true
    maxBreakMinutes?: true
    screenshotRetentionDays?: true
  }

  export type UserSumAggregateInputType = {
    screenshotInterval?: true
    idleLimitMinutes?: true
    shiftStartMinutes?: true
    shiftEndMinutes?: true
    targetMinutes?: true
    maxShiftMinutes?: true
    maxBreakMinutes?: true
    screenshotRetentionDays?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    role?: true
    companyId?: true
    screenshotInterval?: true
    idleLimitMinutes?: true
    timezone?: true
    workDays?: true
    shiftStartMinutes?: true
    shiftEndMinutes?: true
    targetMinutes?: true
    maxShiftMinutes?: true
    maxBreakMinutes?: true
    screenshotRetentionDays?: true
    manualTimeRequiresApproval?: true
    resetCode?: true
    resetExpires?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    role?: true
    companyId?: true
    screenshotInterval?: true
    idleLimitMinutes?: true
    timezone?: true
    workDays?: true
    shiftStartMinutes?: true
    shiftEndMinutes?: true
    targetMinutes?: true
    maxShiftMinutes?: true
    maxBreakMinutes?: true
    screenshotRetentionDays?: true
    manualTimeRequiresApproval?: true
    resetCode?: true
    resetExpires?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    role?: true
    companyId?: true
    screenshotInterval?: true
    idleLimitMinutes?: true
    timezone?: true
    workDays?: true
    shiftStartMinutes?: true
    shiftEndMinutes?: true
    targetMinutes?: true
    maxShiftMinutes?: true
    maxBreakMinutes?: true
    screenshotRetentionDays?: true
    manualTimeRequiresApproval?: true
    resetCode?: true
    resetExpires?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string
    password: string
    role: string
    companyId: string | null
    screenshotInterval: number
    idleLimitMinutes: number
    timezone: string
    workDays: string
    shiftStartMinutes: number
    shiftEndMinutes: number
    targetMinutes: number
    maxShiftMinutes: number
    maxBreakMinutes: number
    screenshotRetentionDays: number
    manualTimeRequiresApproval: boolean
    resetCode: string | null
    resetExpires: Date | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    role?: boolean
    companyId?: boolean
    screenshotInterval?: boolean
    idleLimitMinutes?: boolean
    timezone?: boolean
    workDays?: boolean
    shiftStartMinutes?: boolean
    shiftEndMinutes?: boolean
    targetMinutes?: boolean
    maxShiftMinutes?: boolean
    maxBreakMinutes?: boolean
    screenshotRetentionDays?: boolean
    manualTimeRequiresApproval?: boolean
    resetCode?: boolean
    resetExpires?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    activities?: boolean | User$activitiesArgs<ExtArgs>
    screenshots?: boolean | User$screenshotsArgs<ExtArgs>
    workReports?: boolean | User$workReportsArgs<ExtArgs>
    trackingSessions?: boolean | User$trackingSessionsArgs<ExtArgs>
    manualTimeRequests?: boolean | User$manualTimeRequestsArgs<ExtArgs>
    assignedTasks?: boolean | User$assignedTasksArgs<ExtArgs>
    alerts?: boolean | User$alertsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    role?: boolean
    companyId?: boolean
    screenshotInterval?: boolean
    idleLimitMinutes?: boolean
    timezone?: boolean
    workDays?: boolean
    shiftStartMinutes?: boolean
    shiftEndMinutes?: boolean
    targetMinutes?: boolean
    maxShiftMinutes?: boolean
    maxBreakMinutes?: boolean
    screenshotRetentionDays?: boolean
    manualTimeRequiresApproval?: boolean
    resetCode?: boolean
    resetExpires?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    role?: boolean
    companyId?: boolean
    screenshotInterval?: boolean
    idleLimitMinutes?: boolean
    timezone?: boolean
    workDays?: boolean
    shiftStartMinutes?: boolean
    shiftEndMinutes?: boolean
    targetMinutes?: boolean
    maxShiftMinutes?: boolean
    maxBreakMinutes?: boolean
    screenshotRetentionDays?: boolean
    manualTimeRequiresApproval?: boolean
    resetCode?: boolean
    resetExpires?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    activities?: boolean | User$activitiesArgs<ExtArgs>
    screenshots?: boolean | User$screenshotsArgs<ExtArgs>
    workReports?: boolean | User$workReportsArgs<ExtArgs>
    trackingSessions?: boolean | User$trackingSessionsArgs<ExtArgs>
    manualTimeRequests?: boolean | User$manualTimeRequestsArgs<ExtArgs>
    assignedTasks?: boolean | User$assignedTasksArgs<ExtArgs>
    alerts?: boolean | User$alertsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      activities: Prisma.$ActivityLogPayload<ExtArgs>[]
      screenshots: Prisma.$ScreenshotPayload<ExtArgs>[]
      workReports: Prisma.$WorkReportPayload<ExtArgs>[]
      trackingSessions: Prisma.$TrackingSessionPayload<ExtArgs>[]
      manualTimeRequests: Prisma.$ManualTimeRequestPayload<ExtArgs>[]
      assignedTasks: Prisma.$TaskPayload<ExtArgs>[]
      alerts: Prisma.$AlertPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string
      password: string
      role: string
      companyId: string | null
      screenshotInterval: number
      idleLimitMinutes: number
      timezone: string
      workDays: string
      shiftStartMinutes: number
      shiftEndMinutes: number
      targetMinutes: number
      maxShiftMinutes: number
      maxBreakMinutes: number
      screenshotRetentionDays: number
      manualTimeRequiresApproval: boolean
      resetCode: string | null
      resetExpires: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    activities<T extends User$activitiesArgs<ExtArgs> = {}>(args?: Subset<T, User$activitiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findMany"> | Null>
    screenshots<T extends User$screenshotsArgs<ExtArgs> = {}>(args?: Subset<T, User$screenshotsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScreenshotPayload<ExtArgs>, T, "findMany"> | Null>
    workReports<T extends User$workReportsArgs<ExtArgs> = {}>(args?: Subset<T, User$workReportsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkReportPayload<ExtArgs>, T, "findMany"> | Null>
    trackingSessions<T extends User$trackingSessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$trackingSessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrackingSessionPayload<ExtArgs>, T, "findMany"> | Null>
    manualTimeRequests<T extends User$manualTimeRequestsArgs<ExtArgs> = {}>(args?: Subset<T, User$manualTimeRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ManualTimeRequestPayload<ExtArgs>, T, "findMany"> | Null>
    assignedTasks<T extends User$assignedTasksArgs<ExtArgs> = {}>(args?: Subset<T, User$assignedTasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany"> | Null>
    alerts<T extends User$alertsArgs<ExtArgs> = {}>(args?: Subset<T, User$alertsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly companyId: FieldRef<"User", 'String'>
    readonly screenshotInterval: FieldRef<"User", 'Int'>
    readonly idleLimitMinutes: FieldRef<"User", 'Int'>
    readonly timezone: FieldRef<"User", 'String'>
    readonly workDays: FieldRef<"User", 'String'>
    readonly shiftStartMinutes: FieldRef<"User", 'Int'>
    readonly shiftEndMinutes: FieldRef<"User", 'Int'>
    readonly targetMinutes: FieldRef<"User", 'Int'>
    readonly maxShiftMinutes: FieldRef<"User", 'Int'>
    readonly maxBreakMinutes: FieldRef<"User", 'Int'>
    readonly screenshotRetentionDays: FieldRef<"User", 'Int'>
    readonly manualTimeRequiresApproval: FieldRef<"User", 'Boolean'>
    readonly resetCode: FieldRef<"User", 'String'>
    readonly resetExpires: FieldRef<"User", 'DateTime'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.activities
   */
  export type User$activitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    where?: ActivityLogWhereInput
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    cursor?: ActivityLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActivityLogScalarFieldEnum | ActivityLogScalarFieldEnum[]
  }

  /**
   * User.screenshots
   */
  export type User$screenshotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screenshot
     */
    select?: ScreenshotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreenshotInclude<ExtArgs> | null
    where?: ScreenshotWhereInput
    orderBy?: ScreenshotOrderByWithRelationInput | ScreenshotOrderByWithRelationInput[]
    cursor?: ScreenshotWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ScreenshotScalarFieldEnum | ScreenshotScalarFieldEnum[]
  }

  /**
   * User.workReports
   */
  export type User$workReportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkReport
     */
    select?: WorkReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkReportInclude<ExtArgs> | null
    where?: WorkReportWhereInput
    orderBy?: WorkReportOrderByWithRelationInput | WorkReportOrderByWithRelationInput[]
    cursor?: WorkReportWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkReportScalarFieldEnum | WorkReportScalarFieldEnum[]
  }

  /**
   * User.trackingSessions
   */
  export type User$trackingSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackingSession
     */
    select?: TrackingSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingSessionInclude<ExtArgs> | null
    where?: TrackingSessionWhereInput
    orderBy?: TrackingSessionOrderByWithRelationInput | TrackingSessionOrderByWithRelationInput[]
    cursor?: TrackingSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TrackingSessionScalarFieldEnum | TrackingSessionScalarFieldEnum[]
  }

  /**
   * User.manualTimeRequests
   */
  export type User$manualTimeRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ManualTimeRequest
     */
    select?: ManualTimeRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManualTimeRequestInclude<ExtArgs> | null
    where?: ManualTimeRequestWhereInput
    orderBy?: ManualTimeRequestOrderByWithRelationInput | ManualTimeRequestOrderByWithRelationInput[]
    cursor?: ManualTimeRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ManualTimeRequestScalarFieldEnum | ManualTimeRequestScalarFieldEnum[]
  }

  /**
   * User.assignedTasks
   */
  export type User$assignedTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    cursor?: TaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * User.alerts
   */
  export type User$alertsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertInclude<ExtArgs> | null
    where?: AlertWhereInput
    orderBy?: AlertOrderByWithRelationInput | AlertOrderByWithRelationInput[]
    cursor?: AlertWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AlertScalarFieldEnum | AlertScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model WorkReport
   */

  export type AggregateWorkReport = {
    _count: WorkReportCountAggregateOutputType | null
    _avg: WorkReportAvgAggregateOutputType | null
    _sum: WorkReportSumAggregateOutputType | null
    _min: WorkReportMinAggregateOutputType | null
    _max: WorkReportMaxAggregateOutputType | null
  }

  export type WorkReportAvgAggregateOutputType = {
    durationSeconds: number | null
  }

  export type WorkReportSumAggregateOutputType = {
    durationSeconds: number | null
  }

  export type WorkReportMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    note: string | null
    emailSent: boolean | null
    createdAt: Date | null
    endedAt: Date | null
    durationSeconds: number | null
    clientEventId: string | null
    taskId: string | null
  }

  export type WorkReportMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    note: string | null
    emailSent: boolean | null
    createdAt: Date | null
    endedAt: Date | null
    durationSeconds: number | null
    clientEventId: string | null
    taskId: string | null
  }

  export type WorkReportCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    note: number
    emailSent: number
    createdAt: number
    endedAt: number
    durationSeconds: number
    clientEventId: number
    taskId: number
    _all: number
  }


  export type WorkReportAvgAggregateInputType = {
    durationSeconds?: true
  }

  export type WorkReportSumAggregateInputType = {
    durationSeconds?: true
  }

  export type WorkReportMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    note?: true
    emailSent?: true
    createdAt?: true
    endedAt?: true
    durationSeconds?: true
    clientEventId?: true
    taskId?: true
  }

  export type WorkReportMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    note?: true
    emailSent?: true
    createdAt?: true
    endedAt?: true
    durationSeconds?: true
    clientEventId?: true
    taskId?: true
  }

  export type WorkReportCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    note?: true
    emailSent?: true
    createdAt?: true
    endedAt?: true
    durationSeconds?: true
    clientEventId?: true
    taskId?: true
    _all?: true
  }

  export type WorkReportAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkReport to aggregate.
     */
    where?: WorkReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkReports to fetch.
     */
    orderBy?: WorkReportOrderByWithRelationInput | WorkReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorkReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WorkReports
    **/
    _count?: true | WorkReportCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WorkReportAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WorkReportSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkReportMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkReportMaxAggregateInputType
  }

  export type GetWorkReportAggregateType<T extends WorkReportAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkReport]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkReport[P]>
      : GetScalarType<T[P], AggregateWorkReport[P]>
  }




  export type WorkReportGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkReportWhereInput
    orderBy?: WorkReportOrderByWithAggregationInput | WorkReportOrderByWithAggregationInput[]
    by: WorkReportScalarFieldEnum[] | WorkReportScalarFieldEnum
    having?: WorkReportScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkReportCountAggregateInputType | true
    _avg?: WorkReportAvgAggregateInputType
    _sum?: WorkReportSumAggregateInputType
    _min?: WorkReportMinAggregateInputType
    _max?: WorkReportMaxAggregateInputType
  }

  export type WorkReportGroupByOutputType = {
    id: string
    userId: string
    type: string
    note: string
    emailSent: boolean
    createdAt: Date
    endedAt: Date | null
    durationSeconds: number | null
    clientEventId: string | null
    taskId: string | null
    _count: WorkReportCountAggregateOutputType | null
    _avg: WorkReportAvgAggregateOutputType | null
    _sum: WorkReportSumAggregateOutputType | null
    _min: WorkReportMinAggregateOutputType | null
    _max: WorkReportMaxAggregateOutputType | null
  }

  type GetWorkReportGroupByPayload<T extends WorkReportGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkReportGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkReportGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkReportGroupByOutputType[P]>
            : GetScalarType<T[P], WorkReportGroupByOutputType[P]>
        }
      >
    >


  export type WorkReportSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    note?: boolean
    emailSent?: boolean
    createdAt?: boolean
    endedAt?: boolean
    durationSeconds?: boolean
    clientEventId?: boolean
    taskId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workReport"]>

  export type WorkReportSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    note?: boolean
    emailSent?: boolean
    createdAt?: boolean
    endedAt?: boolean
    durationSeconds?: boolean
    clientEventId?: boolean
    taskId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workReport"]>

  export type WorkReportSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    note?: boolean
    emailSent?: boolean
    createdAt?: boolean
    endedAt?: boolean
    durationSeconds?: boolean
    clientEventId?: boolean
    taskId?: boolean
  }

  export type WorkReportInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type WorkReportIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $WorkReportPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WorkReport"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      type: string
      note: string
      emailSent: boolean
      createdAt: Date
      endedAt: Date | null
      durationSeconds: number | null
      clientEventId: string | null
      taskId: string | null
    }, ExtArgs["result"]["workReport"]>
    composites: {}
  }

  type WorkReportGetPayload<S extends boolean | null | undefined | WorkReportDefaultArgs> = $Result.GetResult<Prisma.$WorkReportPayload, S>

  type WorkReportCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<WorkReportFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: WorkReportCountAggregateInputType | true
    }

  export interface WorkReportDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WorkReport'], meta: { name: 'WorkReport' } }
    /**
     * Find zero or one WorkReport that matches the filter.
     * @param {WorkReportFindUniqueArgs} args - Arguments to find a WorkReport
     * @example
     * // Get one WorkReport
     * const workReport = await prisma.workReport.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkReportFindUniqueArgs>(args: SelectSubset<T, WorkReportFindUniqueArgs<ExtArgs>>): Prisma__WorkReportClient<$Result.GetResult<Prisma.$WorkReportPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one WorkReport that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {WorkReportFindUniqueOrThrowArgs} args - Arguments to find a WorkReport
     * @example
     * // Get one WorkReport
     * const workReport = await prisma.workReport.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkReportFindUniqueOrThrowArgs>(args: SelectSubset<T, WorkReportFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WorkReportClient<$Result.GetResult<Prisma.$WorkReportPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first WorkReport that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkReportFindFirstArgs} args - Arguments to find a WorkReport
     * @example
     * // Get one WorkReport
     * const workReport = await prisma.workReport.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkReportFindFirstArgs>(args?: SelectSubset<T, WorkReportFindFirstArgs<ExtArgs>>): Prisma__WorkReportClient<$Result.GetResult<Prisma.$WorkReportPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first WorkReport that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkReportFindFirstOrThrowArgs} args - Arguments to find a WorkReport
     * @example
     * // Get one WorkReport
     * const workReport = await prisma.workReport.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkReportFindFirstOrThrowArgs>(args?: SelectSubset<T, WorkReportFindFirstOrThrowArgs<ExtArgs>>): Prisma__WorkReportClient<$Result.GetResult<Prisma.$WorkReportPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more WorkReports that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkReportFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WorkReports
     * const workReports = await prisma.workReport.findMany()
     * 
     * // Get first 10 WorkReports
     * const workReports = await prisma.workReport.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workReportWithIdOnly = await prisma.workReport.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WorkReportFindManyArgs>(args?: SelectSubset<T, WorkReportFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkReportPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a WorkReport.
     * @param {WorkReportCreateArgs} args - Arguments to create a WorkReport.
     * @example
     * // Create one WorkReport
     * const WorkReport = await prisma.workReport.create({
     *   data: {
     *     // ... data to create a WorkReport
     *   }
     * })
     * 
     */
    create<T extends WorkReportCreateArgs>(args: SelectSubset<T, WorkReportCreateArgs<ExtArgs>>): Prisma__WorkReportClient<$Result.GetResult<Prisma.$WorkReportPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many WorkReports.
     * @param {WorkReportCreateManyArgs} args - Arguments to create many WorkReports.
     * @example
     * // Create many WorkReports
     * const workReport = await prisma.workReport.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WorkReportCreateManyArgs>(args?: SelectSubset<T, WorkReportCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WorkReports and returns the data saved in the database.
     * @param {WorkReportCreateManyAndReturnArgs} args - Arguments to create many WorkReports.
     * @example
     * // Create many WorkReports
     * const workReport = await prisma.workReport.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WorkReports and only return the `id`
     * const workReportWithIdOnly = await prisma.workReport.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WorkReportCreateManyAndReturnArgs>(args?: SelectSubset<T, WorkReportCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkReportPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a WorkReport.
     * @param {WorkReportDeleteArgs} args - Arguments to delete one WorkReport.
     * @example
     * // Delete one WorkReport
     * const WorkReport = await prisma.workReport.delete({
     *   where: {
     *     // ... filter to delete one WorkReport
     *   }
     * })
     * 
     */
    delete<T extends WorkReportDeleteArgs>(args: SelectSubset<T, WorkReportDeleteArgs<ExtArgs>>): Prisma__WorkReportClient<$Result.GetResult<Prisma.$WorkReportPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one WorkReport.
     * @param {WorkReportUpdateArgs} args - Arguments to update one WorkReport.
     * @example
     * // Update one WorkReport
     * const workReport = await prisma.workReport.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WorkReportUpdateArgs>(args: SelectSubset<T, WorkReportUpdateArgs<ExtArgs>>): Prisma__WorkReportClient<$Result.GetResult<Prisma.$WorkReportPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more WorkReports.
     * @param {WorkReportDeleteManyArgs} args - Arguments to filter WorkReports to delete.
     * @example
     * // Delete a few WorkReports
     * const { count } = await prisma.workReport.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WorkReportDeleteManyArgs>(args?: SelectSubset<T, WorkReportDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkReports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkReportUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WorkReports
     * const workReport = await prisma.workReport.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WorkReportUpdateManyArgs>(args: SelectSubset<T, WorkReportUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one WorkReport.
     * @param {WorkReportUpsertArgs} args - Arguments to update or create a WorkReport.
     * @example
     * // Update or create a WorkReport
     * const workReport = await prisma.workReport.upsert({
     *   create: {
     *     // ... data to create a WorkReport
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WorkReport we want to update
     *   }
     * })
     */
    upsert<T extends WorkReportUpsertArgs>(args: SelectSubset<T, WorkReportUpsertArgs<ExtArgs>>): Prisma__WorkReportClient<$Result.GetResult<Prisma.$WorkReportPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of WorkReports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkReportCountArgs} args - Arguments to filter WorkReports to count.
     * @example
     * // Count the number of WorkReports
     * const count = await prisma.workReport.count({
     *   where: {
     *     // ... the filter for the WorkReports we want to count
     *   }
     * })
    **/
    count<T extends WorkReportCountArgs>(
      args?: Subset<T, WorkReportCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkReportCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WorkReport.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkReportAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WorkReportAggregateArgs>(args: Subset<T, WorkReportAggregateArgs>): Prisma.PrismaPromise<GetWorkReportAggregateType<T>>

    /**
     * Group by WorkReport.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkReportGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WorkReportGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkReportGroupByArgs['orderBy'] }
        : { orderBy?: WorkReportGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WorkReportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkReportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WorkReport model
   */
  readonly fields: WorkReportFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WorkReport.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkReportClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WorkReport model
   */ 
  interface WorkReportFieldRefs {
    readonly id: FieldRef<"WorkReport", 'String'>
    readonly userId: FieldRef<"WorkReport", 'String'>
    readonly type: FieldRef<"WorkReport", 'String'>
    readonly note: FieldRef<"WorkReport", 'String'>
    readonly emailSent: FieldRef<"WorkReport", 'Boolean'>
    readonly createdAt: FieldRef<"WorkReport", 'DateTime'>
    readonly endedAt: FieldRef<"WorkReport", 'DateTime'>
    readonly durationSeconds: FieldRef<"WorkReport", 'Int'>
    readonly clientEventId: FieldRef<"WorkReport", 'String'>
    readonly taskId: FieldRef<"WorkReport", 'String'>
  }
    

  // Custom InputTypes
  /**
   * WorkReport findUnique
   */
  export type WorkReportFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkReport
     */
    select?: WorkReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkReportInclude<ExtArgs> | null
    /**
     * Filter, which WorkReport to fetch.
     */
    where: WorkReportWhereUniqueInput
  }

  /**
   * WorkReport findUniqueOrThrow
   */
  export type WorkReportFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkReport
     */
    select?: WorkReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkReportInclude<ExtArgs> | null
    /**
     * Filter, which WorkReport to fetch.
     */
    where: WorkReportWhereUniqueInput
  }

  /**
   * WorkReport findFirst
   */
  export type WorkReportFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkReport
     */
    select?: WorkReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkReportInclude<ExtArgs> | null
    /**
     * Filter, which WorkReport to fetch.
     */
    where?: WorkReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkReports to fetch.
     */
    orderBy?: WorkReportOrderByWithRelationInput | WorkReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkReports.
     */
    cursor?: WorkReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkReports.
     */
    distinct?: WorkReportScalarFieldEnum | WorkReportScalarFieldEnum[]
  }

  /**
   * WorkReport findFirstOrThrow
   */
  export type WorkReportFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkReport
     */
    select?: WorkReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkReportInclude<ExtArgs> | null
    /**
     * Filter, which WorkReport to fetch.
     */
    where?: WorkReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkReports to fetch.
     */
    orderBy?: WorkReportOrderByWithRelationInput | WorkReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkReports.
     */
    cursor?: WorkReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkReports.
     */
    distinct?: WorkReportScalarFieldEnum | WorkReportScalarFieldEnum[]
  }

  /**
   * WorkReport findMany
   */
  export type WorkReportFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkReport
     */
    select?: WorkReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkReportInclude<ExtArgs> | null
    /**
     * Filter, which WorkReports to fetch.
     */
    where?: WorkReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkReports to fetch.
     */
    orderBy?: WorkReportOrderByWithRelationInput | WorkReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WorkReports.
     */
    cursor?: WorkReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkReports.
     */
    skip?: number
    distinct?: WorkReportScalarFieldEnum | WorkReportScalarFieldEnum[]
  }

  /**
   * WorkReport create
   */
  export type WorkReportCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkReport
     */
    select?: WorkReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkReportInclude<ExtArgs> | null
    /**
     * The data needed to create a WorkReport.
     */
    data: XOR<WorkReportCreateInput, WorkReportUncheckedCreateInput>
  }

  /**
   * WorkReport createMany
   */
  export type WorkReportCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WorkReports.
     */
    data: WorkReportCreateManyInput | WorkReportCreateManyInput[]
  }

  /**
   * WorkReport createManyAndReturn
   */
  export type WorkReportCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkReport
     */
    select?: WorkReportSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many WorkReports.
     */
    data: WorkReportCreateManyInput | WorkReportCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkReportIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WorkReport update
   */
  export type WorkReportUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkReport
     */
    select?: WorkReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkReportInclude<ExtArgs> | null
    /**
     * The data needed to update a WorkReport.
     */
    data: XOR<WorkReportUpdateInput, WorkReportUncheckedUpdateInput>
    /**
     * Choose, which WorkReport to update.
     */
    where: WorkReportWhereUniqueInput
  }

  /**
   * WorkReport updateMany
   */
  export type WorkReportUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WorkReports.
     */
    data: XOR<WorkReportUpdateManyMutationInput, WorkReportUncheckedUpdateManyInput>
    /**
     * Filter which WorkReports to update
     */
    where?: WorkReportWhereInput
  }

  /**
   * WorkReport upsert
   */
  export type WorkReportUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkReport
     */
    select?: WorkReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkReportInclude<ExtArgs> | null
    /**
     * The filter to search for the WorkReport to update in case it exists.
     */
    where: WorkReportWhereUniqueInput
    /**
     * In case the WorkReport found by the `where` argument doesn't exist, create a new WorkReport with this data.
     */
    create: XOR<WorkReportCreateInput, WorkReportUncheckedCreateInput>
    /**
     * In case the WorkReport was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkReportUpdateInput, WorkReportUncheckedUpdateInput>
  }

  /**
   * WorkReport delete
   */
  export type WorkReportDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkReport
     */
    select?: WorkReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkReportInclude<ExtArgs> | null
    /**
     * Filter which WorkReport to delete.
     */
    where: WorkReportWhereUniqueInput
  }

  /**
   * WorkReport deleteMany
   */
  export type WorkReportDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkReports to delete
     */
    where?: WorkReportWhereInput
  }

  /**
   * WorkReport without action
   */
  export type WorkReportDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkReport
     */
    select?: WorkReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkReportInclude<ExtArgs> | null
  }


  /**
   * Model ActivityLog
   */

  export type AggregateActivityLog = {
    _count: ActivityLogCountAggregateOutputType | null
    _avg: ActivityLogAvgAggregateOutputType | null
    _sum: ActivityLogSumAggregateOutputType | null
    _min: ActivityLogMinAggregateOutputType | null
    _max: ActivityLogMaxAggregateOutputType | null
  }

  export type ActivityLogAvgAggregateOutputType = {
    keystrokes: number | null
    mouseClicks: number | null
    durationSeconds: number | null
    idleSeconds: number | null
    continuousIdleSeconds: number | null
  }

  export type ActivityLogSumAggregateOutputType = {
    keystrokes: number | null
    mouseClicks: number | null
    durationSeconds: number | null
    idleSeconds: number | null
    continuousIdleSeconds: number | null
  }

  export type ActivityLogMinAggregateOutputType = {
    id: string | null
    userId: string | null
    timestamp: Date | null
    status: string | null
    currentTask: string | null
    appProcess: string | null
    appTitle: string | null
    keystrokes: number | null
    mouseClicks: number | null
    durationSeconds: number | null
    idleSeconds: number | null
    continuousIdleSeconds: number | null
    clientEventId: string | null
    taskId: string | null
    productivityCategory: string | null
  }

  export type ActivityLogMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    timestamp: Date | null
    status: string | null
    currentTask: string | null
    appProcess: string | null
    appTitle: string | null
    keystrokes: number | null
    mouseClicks: number | null
    durationSeconds: number | null
    idleSeconds: number | null
    continuousIdleSeconds: number | null
    clientEventId: string | null
    taskId: string | null
    productivityCategory: string | null
  }

  export type ActivityLogCountAggregateOutputType = {
    id: number
    userId: number
    timestamp: number
    status: number
    currentTask: number
    appProcess: number
    appTitle: number
    keystrokes: number
    mouseClicks: number
    durationSeconds: number
    idleSeconds: number
    continuousIdleSeconds: number
    clientEventId: number
    taskId: number
    productivityCategory: number
    _all: number
  }


  export type ActivityLogAvgAggregateInputType = {
    keystrokes?: true
    mouseClicks?: true
    durationSeconds?: true
    idleSeconds?: true
    continuousIdleSeconds?: true
  }

  export type ActivityLogSumAggregateInputType = {
    keystrokes?: true
    mouseClicks?: true
    durationSeconds?: true
    idleSeconds?: true
    continuousIdleSeconds?: true
  }

  export type ActivityLogMinAggregateInputType = {
    id?: true
    userId?: true
    timestamp?: true
    status?: true
    currentTask?: true
    appProcess?: true
    appTitle?: true
    keystrokes?: true
    mouseClicks?: true
    durationSeconds?: true
    idleSeconds?: true
    continuousIdleSeconds?: true
    clientEventId?: true
    taskId?: true
    productivityCategory?: true
  }

  export type ActivityLogMaxAggregateInputType = {
    id?: true
    userId?: true
    timestamp?: true
    status?: true
    currentTask?: true
    appProcess?: true
    appTitle?: true
    keystrokes?: true
    mouseClicks?: true
    durationSeconds?: true
    idleSeconds?: true
    continuousIdleSeconds?: true
    clientEventId?: true
    taskId?: true
    productivityCategory?: true
  }

  export type ActivityLogCountAggregateInputType = {
    id?: true
    userId?: true
    timestamp?: true
    status?: true
    currentTask?: true
    appProcess?: true
    appTitle?: true
    keystrokes?: true
    mouseClicks?: true
    durationSeconds?: true
    idleSeconds?: true
    continuousIdleSeconds?: true
    clientEventId?: true
    taskId?: true
    productivityCategory?: true
    _all?: true
  }

  export type ActivityLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActivityLog to aggregate.
     */
    where?: ActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityLogs to fetch.
     */
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ActivityLogs
    **/
    _count?: true | ActivityLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ActivityLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ActivityLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActivityLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActivityLogMaxAggregateInputType
  }

  export type GetActivityLogAggregateType<T extends ActivityLogAggregateArgs> = {
        [P in keyof T & keyof AggregateActivityLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActivityLog[P]>
      : GetScalarType<T[P], AggregateActivityLog[P]>
  }




  export type ActivityLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityLogWhereInput
    orderBy?: ActivityLogOrderByWithAggregationInput | ActivityLogOrderByWithAggregationInput[]
    by: ActivityLogScalarFieldEnum[] | ActivityLogScalarFieldEnum
    having?: ActivityLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActivityLogCountAggregateInputType | true
    _avg?: ActivityLogAvgAggregateInputType
    _sum?: ActivityLogSumAggregateInputType
    _min?: ActivityLogMinAggregateInputType
    _max?: ActivityLogMaxAggregateInputType
  }

  export type ActivityLogGroupByOutputType = {
    id: string
    userId: string
    timestamp: Date
    status: string
    currentTask: string
    appProcess: string | null
    appTitle: string | null
    keystrokes: number
    mouseClicks: number
    durationSeconds: number
    idleSeconds: number
    continuousIdleSeconds: number
    clientEventId: string | null
    taskId: string | null
    productivityCategory: string
    _count: ActivityLogCountAggregateOutputType | null
    _avg: ActivityLogAvgAggregateOutputType | null
    _sum: ActivityLogSumAggregateOutputType | null
    _min: ActivityLogMinAggregateOutputType | null
    _max: ActivityLogMaxAggregateOutputType | null
  }

  type GetActivityLogGroupByPayload<T extends ActivityLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActivityLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActivityLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActivityLogGroupByOutputType[P]>
            : GetScalarType<T[P], ActivityLogGroupByOutputType[P]>
        }
      >
    >


  export type ActivityLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    timestamp?: boolean
    status?: boolean
    currentTask?: boolean
    appProcess?: boolean
    appTitle?: boolean
    keystrokes?: boolean
    mouseClicks?: boolean
    durationSeconds?: boolean
    idleSeconds?: boolean
    continuousIdleSeconds?: boolean
    clientEventId?: boolean
    taskId?: boolean
    productivityCategory?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activityLog"]>

  export type ActivityLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    timestamp?: boolean
    status?: boolean
    currentTask?: boolean
    appProcess?: boolean
    appTitle?: boolean
    keystrokes?: boolean
    mouseClicks?: boolean
    durationSeconds?: boolean
    idleSeconds?: boolean
    continuousIdleSeconds?: boolean
    clientEventId?: boolean
    taskId?: boolean
    productivityCategory?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activityLog"]>

  export type ActivityLogSelectScalar = {
    id?: boolean
    userId?: boolean
    timestamp?: boolean
    status?: boolean
    currentTask?: boolean
    appProcess?: boolean
    appTitle?: boolean
    keystrokes?: boolean
    mouseClicks?: boolean
    durationSeconds?: boolean
    idleSeconds?: boolean
    continuousIdleSeconds?: boolean
    clientEventId?: boolean
    taskId?: boolean
    productivityCategory?: boolean
  }

  export type ActivityLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ActivityLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ActivityLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ActivityLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      timestamp: Date
      status: string
      currentTask: string
      appProcess: string | null
      appTitle: string | null
      keystrokes: number
      mouseClicks: number
      durationSeconds: number
      idleSeconds: number
      continuousIdleSeconds: number
      clientEventId: string | null
      taskId: string | null
      productivityCategory: string
    }, ExtArgs["result"]["activityLog"]>
    composites: {}
  }

  type ActivityLogGetPayload<S extends boolean | null | undefined | ActivityLogDefaultArgs> = $Result.GetResult<Prisma.$ActivityLogPayload, S>

  type ActivityLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ActivityLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ActivityLogCountAggregateInputType | true
    }

  export interface ActivityLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ActivityLog'], meta: { name: 'ActivityLog' } }
    /**
     * Find zero or one ActivityLog that matches the filter.
     * @param {ActivityLogFindUniqueArgs} args - Arguments to find a ActivityLog
     * @example
     * // Get one ActivityLog
     * const activityLog = await prisma.activityLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ActivityLogFindUniqueArgs>(args: SelectSubset<T, ActivityLogFindUniqueArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ActivityLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ActivityLogFindUniqueOrThrowArgs} args - Arguments to find a ActivityLog
     * @example
     * // Get one ActivityLog
     * const activityLog = await prisma.activityLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ActivityLogFindUniqueOrThrowArgs>(args: SelectSubset<T, ActivityLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ActivityLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogFindFirstArgs} args - Arguments to find a ActivityLog
     * @example
     * // Get one ActivityLog
     * const activityLog = await prisma.activityLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ActivityLogFindFirstArgs>(args?: SelectSubset<T, ActivityLogFindFirstArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ActivityLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogFindFirstOrThrowArgs} args - Arguments to find a ActivityLog
     * @example
     * // Get one ActivityLog
     * const activityLog = await prisma.activityLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ActivityLogFindFirstOrThrowArgs>(args?: SelectSubset<T, ActivityLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ActivityLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ActivityLogs
     * const activityLogs = await prisma.activityLog.findMany()
     * 
     * // Get first 10 ActivityLogs
     * const activityLogs = await prisma.activityLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const activityLogWithIdOnly = await prisma.activityLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ActivityLogFindManyArgs>(args?: SelectSubset<T, ActivityLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ActivityLog.
     * @param {ActivityLogCreateArgs} args - Arguments to create a ActivityLog.
     * @example
     * // Create one ActivityLog
     * const ActivityLog = await prisma.activityLog.create({
     *   data: {
     *     // ... data to create a ActivityLog
     *   }
     * })
     * 
     */
    create<T extends ActivityLogCreateArgs>(args: SelectSubset<T, ActivityLogCreateArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ActivityLogs.
     * @param {ActivityLogCreateManyArgs} args - Arguments to create many ActivityLogs.
     * @example
     * // Create many ActivityLogs
     * const activityLog = await prisma.activityLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ActivityLogCreateManyArgs>(args?: SelectSubset<T, ActivityLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ActivityLogs and returns the data saved in the database.
     * @param {ActivityLogCreateManyAndReturnArgs} args - Arguments to create many ActivityLogs.
     * @example
     * // Create many ActivityLogs
     * const activityLog = await prisma.activityLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ActivityLogs and only return the `id`
     * const activityLogWithIdOnly = await prisma.activityLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ActivityLogCreateManyAndReturnArgs>(args?: SelectSubset<T, ActivityLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ActivityLog.
     * @param {ActivityLogDeleteArgs} args - Arguments to delete one ActivityLog.
     * @example
     * // Delete one ActivityLog
     * const ActivityLog = await prisma.activityLog.delete({
     *   where: {
     *     // ... filter to delete one ActivityLog
     *   }
     * })
     * 
     */
    delete<T extends ActivityLogDeleteArgs>(args: SelectSubset<T, ActivityLogDeleteArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ActivityLog.
     * @param {ActivityLogUpdateArgs} args - Arguments to update one ActivityLog.
     * @example
     * // Update one ActivityLog
     * const activityLog = await prisma.activityLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ActivityLogUpdateArgs>(args: SelectSubset<T, ActivityLogUpdateArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ActivityLogs.
     * @param {ActivityLogDeleteManyArgs} args - Arguments to filter ActivityLogs to delete.
     * @example
     * // Delete a few ActivityLogs
     * const { count } = await prisma.activityLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ActivityLogDeleteManyArgs>(args?: SelectSubset<T, ActivityLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActivityLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ActivityLogs
     * const activityLog = await prisma.activityLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ActivityLogUpdateManyArgs>(args: SelectSubset<T, ActivityLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ActivityLog.
     * @param {ActivityLogUpsertArgs} args - Arguments to update or create a ActivityLog.
     * @example
     * // Update or create a ActivityLog
     * const activityLog = await prisma.activityLog.upsert({
     *   create: {
     *     // ... data to create a ActivityLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ActivityLog we want to update
     *   }
     * })
     */
    upsert<T extends ActivityLogUpsertArgs>(args: SelectSubset<T, ActivityLogUpsertArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ActivityLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogCountArgs} args - Arguments to filter ActivityLogs to count.
     * @example
     * // Count the number of ActivityLogs
     * const count = await prisma.activityLog.count({
     *   where: {
     *     // ... the filter for the ActivityLogs we want to count
     *   }
     * })
    **/
    count<T extends ActivityLogCountArgs>(
      args?: Subset<T, ActivityLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActivityLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ActivityLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ActivityLogAggregateArgs>(args: Subset<T, ActivityLogAggregateArgs>): Prisma.PrismaPromise<GetActivityLogAggregateType<T>>

    /**
     * Group by ActivityLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ActivityLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActivityLogGroupByArgs['orderBy'] }
        : { orderBy?: ActivityLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ActivityLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActivityLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ActivityLog model
   */
  readonly fields: ActivityLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ActivityLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ActivityLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ActivityLog model
   */ 
  interface ActivityLogFieldRefs {
    readonly id: FieldRef<"ActivityLog", 'String'>
    readonly userId: FieldRef<"ActivityLog", 'String'>
    readonly timestamp: FieldRef<"ActivityLog", 'DateTime'>
    readonly status: FieldRef<"ActivityLog", 'String'>
    readonly currentTask: FieldRef<"ActivityLog", 'String'>
    readonly appProcess: FieldRef<"ActivityLog", 'String'>
    readonly appTitle: FieldRef<"ActivityLog", 'String'>
    readonly keystrokes: FieldRef<"ActivityLog", 'Int'>
    readonly mouseClicks: FieldRef<"ActivityLog", 'Int'>
    readonly durationSeconds: FieldRef<"ActivityLog", 'Int'>
    readonly idleSeconds: FieldRef<"ActivityLog", 'Int'>
    readonly continuousIdleSeconds: FieldRef<"ActivityLog", 'Int'>
    readonly clientEventId: FieldRef<"ActivityLog", 'String'>
    readonly taskId: FieldRef<"ActivityLog", 'String'>
    readonly productivityCategory: FieldRef<"ActivityLog", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ActivityLog findUnique
   */
  export type ActivityLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which ActivityLog to fetch.
     */
    where: ActivityLogWhereUniqueInput
  }

  /**
   * ActivityLog findUniqueOrThrow
   */
  export type ActivityLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which ActivityLog to fetch.
     */
    where: ActivityLogWhereUniqueInput
  }

  /**
   * ActivityLog findFirst
   */
  export type ActivityLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which ActivityLog to fetch.
     */
    where?: ActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityLogs to fetch.
     */
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActivityLogs.
     */
    cursor?: ActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActivityLogs.
     */
    distinct?: ActivityLogScalarFieldEnum | ActivityLogScalarFieldEnum[]
  }

  /**
   * ActivityLog findFirstOrThrow
   */
  export type ActivityLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which ActivityLog to fetch.
     */
    where?: ActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityLogs to fetch.
     */
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActivityLogs.
     */
    cursor?: ActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActivityLogs.
     */
    distinct?: ActivityLogScalarFieldEnum | ActivityLogScalarFieldEnum[]
  }

  /**
   * ActivityLog findMany
   */
  export type ActivityLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which ActivityLogs to fetch.
     */
    where?: ActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityLogs to fetch.
     */
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ActivityLogs.
     */
    cursor?: ActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityLogs.
     */
    skip?: number
    distinct?: ActivityLogScalarFieldEnum | ActivityLogScalarFieldEnum[]
  }

  /**
   * ActivityLog create
   */
  export type ActivityLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * The data needed to create a ActivityLog.
     */
    data: XOR<ActivityLogCreateInput, ActivityLogUncheckedCreateInput>
  }

  /**
   * ActivityLog createMany
   */
  export type ActivityLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ActivityLogs.
     */
    data: ActivityLogCreateManyInput | ActivityLogCreateManyInput[]
  }

  /**
   * ActivityLog createManyAndReturn
   */
  export type ActivityLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ActivityLogs.
     */
    data: ActivityLogCreateManyInput | ActivityLogCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ActivityLog update
   */
  export type ActivityLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * The data needed to update a ActivityLog.
     */
    data: XOR<ActivityLogUpdateInput, ActivityLogUncheckedUpdateInput>
    /**
     * Choose, which ActivityLog to update.
     */
    where: ActivityLogWhereUniqueInput
  }

  /**
   * ActivityLog updateMany
   */
  export type ActivityLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ActivityLogs.
     */
    data: XOR<ActivityLogUpdateManyMutationInput, ActivityLogUncheckedUpdateManyInput>
    /**
     * Filter which ActivityLogs to update
     */
    where?: ActivityLogWhereInput
  }

  /**
   * ActivityLog upsert
   */
  export type ActivityLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * The filter to search for the ActivityLog to update in case it exists.
     */
    where: ActivityLogWhereUniqueInput
    /**
     * In case the ActivityLog found by the `where` argument doesn't exist, create a new ActivityLog with this data.
     */
    create: XOR<ActivityLogCreateInput, ActivityLogUncheckedCreateInput>
    /**
     * In case the ActivityLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActivityLogUpdateInput, ActivityLogUncheckedUpdateInput>
  }

  /**
   * ActivityLog delete
   */
  export type ActivityLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter which ActivityLog to delete.
     */
    where: ActivityLogWhereUniqueInput
  }

  /**
   * ActivityLog deleteMany
   */
  export type ActivityLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActivityLogs to delete
     */
    where?: ActivityLogWhereInput
  }

  /**
   * ActivityLog without action
   */
  export type ActivityLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
  }


  /**
   * Model Screenshot
   */

  export type AggregateScreenshot = {
    _count: ScreenshotCountAggregateOutputType | null
    _avg: ScreenshotAvgAggregateOutputType | null
    _sum: ScreenshotSumAggregateOutputType | null
    _min: ScreenshotMinAggregateOutputType | null
    _max: ScreenshotMaxAggregateOutputType | null
  }

  export type ScreenshotAvgAggregateOutputType = {
    activityRate: number | null
    keystrokes: number | null
    mouseClicks: number | null
  }

  export type ScreenshotSumAggregateOutputType = {
    activityRate: number | null
    keystrokes: number | null
    mouseClicks: number | null
  }

  export type ScreenshotMinAggregateOutputType = {
    id: string | null
    userId: string | null
    timestamp: Date | null
    filePath: string | null
    activityRate: number | null
    currentTask: string | null
    keystrokes: number | null
    mouseClicks: number | null
    clientEventId: string | null
  }

  export type ScreenshotMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    timestamp: Date | null
    filePath: string | null
    activityRate: number | null
    currentTask: string | null
    keystrokes: number | null
    mouseClicks: number | null
    clientEventId: string | null
  }

  export type ScreenshotCountAggregateOutputType = {
    id: number
    userId: number
    timestamp: number
    filePath: number
    activityRate: number
    currentTask: number
    keystrokes: number
    mouseClicks: number
    clientEventId: number
    _all: number
  }


  export type ScreenshotAvgAggregateInputType = {
    activityRate?: true
    keystrokes?: true
    mouseClicks?: true
  }

  export type ScreenshotSumAggregateInputType = {
    activityRate?: true
    keystrokes?: true
    mouseClicks?: true
  }

  export type ScreenshotMinAggregateInputType = {
    id?: true
    userId?: true
    timestamp?: true
    filePath?: true
    activityRate?: true
    currentTask?: true
    keystrokes?: true
    mouseClicks?: true
    clientEventId?: true
  }

  export type ScreenshotMaxAggregateInputType = {
    id?: true
    userId?: true
    timestamp?: true
    filePath?: true
    activityRate?: true
    currentTask?: true
    keystrokes?: true
    mouseClicks?: true
    clientEventId?: true
  }

  export type ScreenshotCountAggregateInputType = {
    id?: true
    userId?: true
    timestamp?: true
    filePath?: true
    activityRate?: true
    currentTask?: true
    keystrokes?: true
    mouseClicks?: true
    clientEventId?: true
    _all?: true
  }

  export type ScreenshotAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Screenshot to aggregate.
     */
    where?: ScreenshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Screenshots to fetch.
     */
    orderBy?: ScreenshotOrderByWithRelationInput | ScreenshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ScreenshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Screenshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Screenshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Screenshots
    **/
    _count?: true | ScreenshotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ScreenshotAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ScreenshotSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ScreenshotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ScreenshotMaxAggregateInputType
  }

  export type GetScreenshotAggregateType<T extends ScreenshotAggregateArgs> = {
        [P in keyof T & keyof AggregateScreenshot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateScreenshot[P]>
      : GetScalarType<T[P], AggregateScreenshot[P]>
  }




  export type ScreenshotGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScreenshotWhereInput
    orderBy?: ScreenshotOrderByWithAggregationInput | ScreenshotOrderByWithAggregationInput[]
    by: ScreenshotScalarFieldEnum[] | ScreenshotScalarFieldEnum
    having?: ScreenshotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ScreenshotCountAggregateInputType | true
    _avg?: ScreenshotAvgAggregateInputType
    _sum?: ScreenshotSumAggregateInputType
    _min?: ScreenshotMinAggregateInputType
    _max?: ScreenshotMaxAggregateInputType
  }

  export type ScreenshotGroupByOutputType = {
    id: string
    userId: string
    timestamp: Date
    filePath: string
    activityRate: number
    currentTask: string
    keystrokes: number
    mouseClicks: number
    clientEventId: string | null
    _count: ScreenshotCountAggregateOutputType | null
    _avg: ScreenshotAvgAggregateOutputType | null
    _sum: ScreenshotSumAggregateOutputType | null
    _min: ScreenshotMinAggregateOutputType | null
    _max: ScreenshotMaxAggregateOutputType | null
  }

  type GetScreenshotGroupByPayload<T extends ScreenshotGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ScreenshotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ScreenshotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ScreenshotGroupByOutputType[P]>
            : GetScalarType<T[P], ScreenshotGroupByOutputType[P]>
        }
      >
    >


  export type ScreenshotSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    timestamp?: boolean
    filePath?: boolean
    activityRate?: boolean
    currentTask?: boolean
    keystrokes?: boolean
    mouseClicks?: boolean
    clientEventId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["screenshot"]>

  export type ScreenshotSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    timestamp?: boolean
    filePath?: boolean
    activityRate?: boolean
    currentTask?: boolean
    keystrokes?: boolean
    mouseClicks?: boolean
    clientEventId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["screenshot"]>

  export type ScreenshotSelectScalar = {
    id?: boolean
    userId?: boolean
    timestamp?: boolean
    filePath?: boolean
    activityRate?: boolean
    currentTask?: boolean
    keystrokes?: boolean
    mouseClicks?: boolean
    clientEventId?: boolean
  }

  export type ScreenshotInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ScreenshotIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ScreenshotPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Screenshot"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      timestamp: Date
      filePath: string
      activityRate: number
      currentTask: string
      keystrokes: number
      mouseClicks: number
      clientEventId: string | null
    }, ExtArgs["result"]["screenshot"]>
    composites: {}
  }

  type ScreenshotGetPayload<S extends boolean | null | undefined | ScreenshotDefaultArgs> = $Result.GetResult<Prisma.$ScreenshotPayload, S>

  type ScreenshotCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ScreenshotFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ScreenshotCountAggregateInputType | true
    }

  export interface ScreenshotDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Screenshot'], meta: { name: 'Screenshot' } }
    /**
     * Find zero or one Screenshot that matches the filter.
     * @param {ScreenshotFindUniqueArgs} args - Arguments to find a Screenshot
     * @example
     * // Get one Screenshot
     * const screenshot = await prisma.screenshot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ScreenshotFindUniqueArgs>(args: SelectSubset<T, ScreenshotFindUniqueArgs<ExtArgs>>): Prisma__ScreenshotClient<$Result.GetResult<Prisma.$ScreenshotPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Screenshot that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ScreenshotFindUniqueOrThrowArgs} args - Arguments to find a Screenshot
     * @example
     * // Get one Screenshot
     * const screenshot = await prisma.screenshot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ScreenshotFindUniqueOrThrowArgs>(args: SelectSubset<T, ScreenshotFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ScreenshotClient<$Result.GetResult<Prisma.$ScreenshotPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Screenshot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScreenshotFindFirstArgs} args - Arguments to find a Screenshot
     * @example
     * // Get one Screenshot
     * const screenshot = await prisma.screenshot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ScreenshotFindFirstArgs>(args?: SelectSubset<T, ScreenshotFindFirstArgs<ExtArgs>>): Prisma__ScreenshotClient<$Result.GetResult<Prisma.$ScreenshotPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Screenshot that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScreenshotFindFirstOrThrowArgs} args - Arguments to find a Screenshot
     * @example
     * // Get one Screenshot
     * const screenshot = await prisma.screenshot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ScreenshotFindFirstOrThrowArgs>(args?: SelectSubset<T, ScreenshotFindFirstOrThrowArgs<ExtArgs>>): Prisma__ScreenshotClient<$Result.GetResult<Prisma.$ScreenshotPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Screenshots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScreenshotFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Screenshots
     * const screenshots = await prisma.screenshot.findMany()
     * 
     * // Get first 10 Screenshots
     * const screenshots = await prisma.screenshot.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const screenshotWithIdOnly = await prisma.screenshot.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ScreenshotFindManyArgs>(args?: SelectSubset<T, ScreenshotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScreenshotPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Screenshot.
     * @param {ScreenshotCreateArgs} args - Arguments to create a Screenshot.
     * @example
     * // Create one Screenshot
     * const Screenshot = await prisma.screenshot.create({
     *   data: {
     *     // ... data to create a Screenshot
     *   }
     * })
     * 
     */
    create<T extends ScreenshotCreateArgs>(args: SelectSubset<T, ScreenshotCreateArgs<ExtArgs>>): Prisma__ScreenshotClient<$Result.GetResult<Prisma.$ScreenshotPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Screenshots.
     * @param {ScreenshotCreateManyArgs} args - Arguments to create many Screenshots.
     * @example
     * // Create many Screenshots
     * const screenshot = await prisma.screenshot.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ScreenshotCreateManyArgs>(args?: SelectSubset<T, ScreenshotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Screenshots and returns the data saved in the database.
     * @param {ScreenshotCreateManyAndReturnArgs} args - Arguments to create many Screenshots.
     * @example
     * // Create many Screenshots
     * const screenshot = await prisma.screenshot.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Screenshots and only return the `id`
     * const screenshotWithIdOnly = await prisma.screenshot.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ScreenshotCreateManyAndReturnArgs>(args?: SelectSubset<T, ScreenshotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScreenshotPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Screenshot.
     * @param {ScreenshotDeleteArgs} args - Arguments to delete one Screenshot.
     * @example
     * // Delete one Screenshot
     * const Screenshot = await prisma.screenshot.delete({
     *   where: {
     *     // ... filter to delete one Screenshot
     *   }
     * })
     * 
     */
    delete<T extends ScreenshotDeleteArgs>(args: SelectSubset<T, ScreenshotDeleteArgs<ExtArgs>>): Prisma__ScreenshotClient<$Result.GetResult<Prisma.$ScreenshotPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Screenshot.
     * @param {ScreenshotUpdateArgs} args - Arguments to update one Screenshot.
     * @example
     * // Update one Screenshot
     * const screenshot = await prisma.screenshot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ScreenshotUpdateArgs>(args: SelectSubset<T, ScreenshotUpdateArgs<ExtArgs>>): Prisma__ScreenshotClient<$Result.GetResult<Prisma.$ScreenshotPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Screenshots.
     * @param {ScreenshotDeleteManyArgs} args - Arguments to filter Screenshots to delete.
     * @example
     * // Delete a few Screenshots
     * const { count } = await prisma.screenshot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ScreenshotDeleteManyArgs>(args?: SelectSubset<T, ScreenshotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Screenshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScreenshotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Screenshots
     * const screenshot = await prisma.screenshot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ScreenshotUpdateManyArgs>(args: SelectSubset<T, ScreenshotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Screenshot.
     * @param {ScreenshotUpsertArgs} args - Arguments to update or create a Screenshot.
     * @example
     * // Update or create a Screenshot
     * const screenshot = await prisma.screenshot.upsert({
     *   create: {
     *     // ... data to create a Screenshot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Screenshot we want to update
     *   }
     * })
     */
    upsert<T extends ScreenshotUpsertArgs>(args: SelectSubset<T, ScreenshotUpsertArgs<ExtArgs>>): Prisma__ScreenshotClient<$Result.GetResult<Prisma.$ScreenshotPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Screenshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScreenshotCountArgs} args - Arguments to filter Screenshots to count.
     * @example
     * // Count the number of Screenshots
     * const count = await prisma.screenshot.count({
     *   where: {
     *     // ... the filter for the Screenshots we want to count
     *   }
     * })
    **/
    count<T extends ScreenshotCountArgs>(
      args?: Subset<T, ScreenshotCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ScreenshotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Screenshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScreenshotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ScreenshotAggregateArgs>(args: Subset<T, ScreenshotAggregateArgs>): Prisma.PrismaPromise<GetScreenshotAggregateType<T>>

    /**
     * Group by Screenshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScreenshotGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ScreenshotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ScreenshotGroupByArgs['orderBy'] }
        : { orderBy?: ScreenshotGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ScreenshotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetScreenshotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Screenshot model
   */
  readonly fields: ScreenshotFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Screenshot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ScreenshotClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Screenshot model
   */ 
  interface ScreenshotFieldRefs {
    readonly id: FieldRef<"Screenshot", 'String'>
    readonly userId: FieldRef<"Screenshot", 'String'>
    readonly timestamp: FieldRef<"Screenshot", 'DateTime'>
    readonly filePath: FieldRef<"Screenshot", 'String'>
    readonly activityRate: FieldRef<"Screenshot", 'Int'>
    readonly currentTask: FieldRef<"Screenshot", 'String'>
    readonly keystrokes: FieldRef<"Screenshot", 'Int'>
    readonly mouseClicks: FieldRef<"Screenshot", 'Int'>
    readonly clientEventId: FieldRef<"Screenshot", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Screenshot findUnique
   */
  export type ScreenshotFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screenshot
     */
    select?: ScreenshotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreenshotInclude<ExtArgs> | null
    /**
     * Filter, which Screenshot to fetch.
     */
    where: ScreenshotWhereUniqueInput
  }

  /**
   * Screenshot findUniqueOrThrow
   */
  export type ScreenshotFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screenshot
     */
    select?: ScreenshotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreenshotInclude<ExtArgs> | null
    /**
     * Filter, which Screenshot to fetch.
     */
    where: ScreenshotWhereUniqueInput
  }

  /**
   * Screenshot findFirst
   */
  export type ScreenshotFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screenshot
     */
    select?: ScreenshotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreenshotInclude<ExtArgs> | null
    /**
     * Filter, which Screenshot to fetch.
     */
    where?: ScreenshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Screenshots to fetch.
     */
    orderBy?: ScreenshotOrderByWithRelationInput | ScreenshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Screenshots.
     */
    cursor?: ScreenshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Screenshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Screenshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Screenshots.
     */
    distinct?: ScreenshotScalarFieldEnum | ScreenshotScalarFieldEnum[]
  }

  /**
   * Screenshot findFirstOrThrow
   */
  export type ScreenshotFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screenshot
     */
    select?: ScreenshotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreenshotInclude<ExtArgs> | null
    /**
     * Filter, which Screenshot to fetch.
     */
    where?: ScreenshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Screenshots to fetch.
     */
    orderBy?: ScreenshotOrderByWithRelationInput | ScreenshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Screenshots.
     */
    cursor?: ScreenshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Screenshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Screenshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Screenshots.
     */
    distinct?: ScreenshotScalarFieldEnum | ScreenshotScalarFieldEnum[]
  }

  /**
   * Screenshot findMany
   */
  export type ScreenshotFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screenshot
     */
    select?: ScreenshotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreenshotInclude<ExtArgs> | null
    /**
     * Filter, which Screenshots to fetch.
     */
    where?: ScreenshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Screenshots to fetch.
     */
    orderBy?: ScreenshotOrderByWithRelationInput | ScreenshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Screenshots.
     */
    cursor?: ScreenshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Screenshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Screenshots.
     */
    skip?: number
    distinct?: ScreenshotScalarFieldEnum | ScreenshotScalarFieldEnum[]
  }

  /**
   * Screenshot create
   */
  export type ScreenshotCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screenshot
     */
    select?: ScreenshotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreenshotInclude<ExtArgs> | null
    /**
     * The data needed to create a Screenshot.
     */
    data: XOR<ScreenshotCreateInput, ScreenshotUncheckedCreateInput>
  }

  /**
   * Screenshot createMany
   */
  export type ScreenshotCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Screenshots.
     */
    data: ScreenshotCreateManyInput | ScreenshotCreateManyInput[]
  }

  /**
   * Screenshot createManyAndReturn
   */
  export type ScreenshotCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screenshot
     */
    select?: ScreenshotSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Screenshots.
     */
    data: ScreenshotCreateManyInput | ScreenshotCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreenshotIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Screenshot update
   */
  export type ScreenshotUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screenshot
     */
    select?: ScreenshotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreenshotInclude<ExtArgs> | null
    /**
     * The data needed to update a Screenshot.
     */
    data: XOR<ScreenshotUpdateInput, ScreenshotUncheckedUpdateInput>
    /**
     * Choose, which Screenshot to update.
     */
    where: ScreenshotWhereUniqueInput
  }

  /**
   * Screenshot updateMany
   */
  export type ScreenshotUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Screenshots.
     */
    data: XOR<ScreenshotUpdateManyMutationInput, ScreenshotUncheckedUpdateManyInput>
    /**
     * Filter which Screenshots to update
     */
    where?: ScreenshotWhereInput
  }

  /**
   * Screenshot upsert
   */
  export type ScreenshotUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screenshot
     */
    select?: ScreenshotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreenshotInclude<ExtArgs> | null
    /**
     * The filter to search for the Screenshot to update in case it exists.
     */
    where: ScreenshotWhereUniqueInput
    /**
     * In case the Screenshot found by the `where` argument doesn't exist, create a new Screenshot with this data.
     */
    create: XOR<ScreenshotCreateInput, ScreenshotUncheckedCreateInput>
    /**
     * In case the Screenshot was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ScreenshotUpdateInput, ScreenshotUncheckedUpdateInput>
  }

  /**
   * Screenshot delete
   */
  export type ScreenshotDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screenshot
     */
    select?: ScreenshotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreenshotInclude<ExtArgs> | null
    /**
     * Filter which Screenshot to delete.
     */
    where: ScreenshotWhereUniqueInput
  }

  /**
   * Screenshot deleteMany
   */
  export type ScreenshotDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Screenshots to delete
     */
    where?: ScreenshotWhereInput
  }

  /**
   * Screenshot without action
   */
  export type ScreenshotDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screenshot
     */
    select?: ScreenshotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreenshotInclude<ExtArgs> | null
  }


  /**
   * Model TrackingSession
   */

  export type AggregateTrackingSession = {
    _count: TrackingSessionCountAggregateOutputType | null
    _avg: TrackingSessionAvgAggregateOutputType | null
    _sum: TrackingSessionSumAggregateOutputType | null
    _min: TrackingSessionMinAggregateOutputType | null
    _max: TrackingSessionMaxAggregateOutputType | null
  }

  export type TrackingSessionAvgAggregateOutputType = {
    activeSeconds: number | null
    idleSeconds: number | null
    breakSeconds: number | null
  }

  export type TrackingSessionSumAggregateOutputType = {
    activeSeconds: number | null
    idleSeconds: number | null
    breakSeconds: number | null
  }

  export type TrackingSessionMinAggregateOutputType = {
    id: string | null
    clientSessionId: string | null
    userId: string | null
    companyId: string | null
    dateKey: string | null
    startedAt: Date | null
    endedAt: Date | null
    lastHeartbeatAt: Date | null
    status: string | null
    breakStartedAt: Date | null
    activeSeconds: number | null
    idleSeconds: number | null
    breakSeconds: number | null
    reviewRequired: boolean | null
    reviewReason: string | null
    currentTask: string | null
    taskId: string | null
  }

  export type TrackingSessionMaxAggregateOutputType = {
    id: string | null
    clientSessionId: string | null
    userId: string | null
    companyId: string | null
    dateKey: string | null
    startedAt: Date | null
    endedAt: Date | null
    lastHeartbeatAt: Date | null
    status: string | null
    breakStartedAt: Date | null
    activeSeconds: number | null
    idleSeconds: number | null
    breakSeconds: number | null
    reviewRequired: boolean | null
    reviewReason: string | null
    currentTask: string | null
    taskId: string | null
  }

  export type TrackingSessionCountAggregateOutputType = {
    id: number
    clientSessionId: number
    userId: number
    companyId: number
    dateKey: number
    startedAt: number
    endedAt: number
    lastHeartbeatAt: number
    status: number
    breakStartedAt: number
    activeSeconds: number
    idleSeconds: number
    breakSeconds: number
    reviewRequired: number
    reviewReason: number
    currentTask: number
    taskId: number
    _all: number
  }


  export type TrackingSessionAvgAggregateInputType = {
    activeSeconds?: true
    idleSeconds?: true
    breakSeconds?: true
  }

  export type TrackingSessionSumAggregateInputType = {
    activeSeconds?: true
    idleSeconds?: true
    breakSeconds?: true
  }

  export type TrackingSessionMinAggregateInputType = {
    id?: true
    clientSessionId?: true
    userId?: true
    companyId?: true
    dateKey?: true
    startedAt?: true
    endedAt?: true
    lastHeartbeatAt?: true
    status?: true
    breakStartedAt?: true
    activeSeconds?: true
    idleSeconds?: true
    breakSeconds?: true
    reviewRequired?: true
    reviewReason?: true
    currentTask?: true
    taskId?: true
  }

  export type TrackingSessionMaxAggregateInputType = {
    id?: true
    clientSessionId?: true
    userId?: true
    companyId?: true
    dateKey?: true
    startedAt?: true
    endedAt?: true
    lastHeartbeatAt?: true
    status?: true
    breakStartedAt?: true
    activeSeconds?: true
    idleSeconds?: true
    breakSeconds?: true
    reviewRequired?: true
    reviewReason?: true
    currentTask?: true
    taskId?: true
  }

  export type TrackingSessionCountAggregateInputType = {
    id?: true
    clientSessionId?: true
    userId?: true
    companyId?: true
    dateKey?: true
    startedAt?: true
    endedAt?: true
    lastHeartbeatAt?: true
    status?: true
    breakStartedAt?: true
    activeSeconds?: true
    idleSeconds?: true
    breakSeconds?: true
    reviewRequired?: true
    reviewReason?: true
    currentTask?: true
    taskId?: true
    _all?: true
  }

  export type TrackingSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TrackingSession to aggregate.
     */
    where?: TrackingSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrackingSessions to fetch.
     */
    orderBy?: TrackingSessionOrderByWithRelationInput | TrackingSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TrackingSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrackingSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrackingSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TrackingSessions
    **/
    _count?: true | TrackingSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TrackingSessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TrackingSessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TrackingSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TrackingSessionMaxAggregateInputType
  }

  export type GetTrackingSessionAggregateType<T extends TrackingSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateTrackingSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTrackingSession[P]>
      : GetScalarType<T[P], AggregateTrackingSession[P]>
  }




  export type TrackingSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrackingSessionWhereInput
    orderBy?: TrackingSessionOrderByWithAggregationInput | TrackingSessionOrderByWithAggregationInput[]
    by: TrackingSessionScalarFieldEnum[] | TrackingSessionScalarFieldEnum
    having?: TrackingSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TrackingSessionCountAggregateInputType | true
    _avg?: TrackingSessionAvgAggregateInputType
    _sum?: TrackingSessionSumAggregateInputType
    _min?: TrackingSessionMinAggregateInputType
    _max?: TrackingSessionMaxAggregateInputType
  }

  export type TrackingSessionGroupByOutputType = {
    id: string
    clientSessionId: string | null
    userId: string
    companyId: string
    dateKey: string
    startedAt: Date
    endedAt: Date | null
    lastHeartbeatAt: Date
    status: string
    breakStartedAt: Date | null
    activeSeconds: number
    idleSeconds: number
    breakSeconds: number
    reviewRequired: boolean
    reviewReason: string | null
    currentTask: string
    taskId: string | null
    _count: TrackingSessionCountAggregateOutputType | null
    _avg: TrackingSessionAvgAggregateOutputType | null
    _sum: TrackingSessionSumAggregateOutputType | null
    _min: TrackingSessionMinAggregateOutputType | null
    _max: TrackingSessionMaxAggregateOutputType | null
  }

  type GetTrackingSessionGroupByPayload<T extends TrackingSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TrackingSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TrackingSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TrackingSessionGroupByOutputType[P]>
            : GetScalarType<T[P], TrackingSessionGroupByOutputType[P]>
        }
      >
    >


  export type TrackingSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clientSessionId?: boolean
    userId?: boolean
    companyId?: boolean
    dateKey?: boolean
    startedAt?: boolean
    endedAt?: boolean
    lastHeartbeatAt?: boolean
    status?: boolean
    breakStartedAt?: boolean
    activeSeconds?: boolean
    idleSeconds?: boolean
    breakSeconds?: boolean
    reviewRequired?: boolean
    reviewReason?: boolean
    currentTask?: boolean
    taskId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trackingSession"]>

  export type TrackingSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clientSessionId?: boolean
    userId?: boolean
    companyId?: boolean
    dateKey?: boolean
    startedAt?: boolean
    endedAt?: boolean
    lastHeartbeatAt?: boolean
    status?: boolean
    breakStartedAt?: boolean
    activeSeconds?: boolean
    idleSeconds?: boolean
    breakSeconds?: boolean
    reviewRequired?: boolean
    reviewReason?: boolean
    currentTask?: boolean
    taskId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trackingSession"]>

  export type TrackingSessionSelectScalar = {
    id?: boolean
    clientSessionId?: boolean
    userId?: boolean
    companyId?: boolean
    dateKey?: boolean
    startedAt?: boolean
    endedAt?: boolean
    lastHeartbeatAt?: boolean
    status?: boolean
    breakStartedAt?: boolean
    activeSeconds?: boolean
    idleSeconds?: boolean
    breakSeconds?: boolean
    reviewRequired?: boolean
    reviewReason?: boolean
    currentTask?: boolean
    taskId?: boolean
  }

  export type TrackingSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TrackingSessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TrackingSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TrackingSession"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      clientSessionId: string | null
      userId: string
      companyId: string
      dateKey: string
      startedAt: Date
      endedAt: Date | null
      lastHeartbeatAt: Date
      status: string
      breakStartedAt: Date | null
      activeSeconds: number
      idleSeconds: number
      breakSeconds: number
      reviewRequired: boolean
      reviewReason: string | null
      currentTask: string
      taskId: string | null
    }, ExtArgs["result"]["trackingSession"]>
    composites: {}
  }

  type TrackingSessionGetPayload<S extends boolean | null | undefined | TrackingSessionDefaultArgs> = $Result.GetResult<Prisma.$TrackingSessionPayload, S>

  type TrackingSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TrackingSessionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TrackingSessionCountAggregateInputType | true
    }

  export interface TrackingSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TrackingSession'], meta: { name: 'TrackingSession' } }
    /**
     * Find zero or one TrackingSession that matches the filter.
     * @param {TrackingSessionFindUniqueArgs} args - Arguments to find a TrackingSession
     * @example
     * // Get one TrackingSession
     * const trackingSession = await prisma.trackingSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TrackingSessionFindUniqueArgs>(args: SelectSubset<T, TrackingSessionFindUniqueArgs<ExtArgs>>): Prisma__TrackingSessionClient<$Result.GetResult<Prisma.$TrackingSessionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one TrackingSession that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TrackingSessionFindUniqueOrThrowArgs} args - Arguments to find a TrackingSession
     * @example
     * // Get one TrackingSession
     * const trackingSession = await prisma.trackingSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TrackingSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, TrackingSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TrackingSessionClient<$Result.GetResult<Prisma.$TrackingSessionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first TrackingSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackingSessionFindFirstArgs} args - Arguments to find a TrackingSession
     * @example
     * // Get one TrackingSession
     * const trackingSession = await prisma.trackingSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TrackingSessionFindFirstArgs>(args?: SelectSubset<T, TrackingSessionFindFirstArgs<ExtArgs>>): Prisma__TrackingSessionClient<$Result.GetResult<Prisma.$TrackingSessionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first TrackingSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackingSessionFindFirstOrThrowArgs} args - Arguments to find a TrackingSession
     * @example
     * // Get one TrackingSession
     * const trackingSession = await prisma.trackingSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TrackingSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, TrackingSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__TrackingSessionClient<$Result.GetResult<Prisma.$TrackingSessionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more TrackingSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackingSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TrackingSessions
     * const trackingSessions = await prisma.trackingSession.findMany()
     * 
     * // Get first 10 TrackingSessions
     * const trackingSessions = await prisma.trackingSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const trackingSessionWithIdOnly = await prisma.trackingSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TrackingSessionFindManyArgs>(args?: SelectSubset<T, TrackingSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrackingSessionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a TrackingSession.
     * @param {TrackingSessionCreateArgs} args - Arguments to create a TrackingSession.
     * @example
     * // Create one TrackingSession
     * const TrackingSession = await prisma.trackingSession.create({
     *   data: {
     *     // ... data to create a TrackingSession
     *   }
     * })
     * 
     */
    create<T extends TrackingSessionCreateArgs>(args: SelectSubset<T, TrackingSessionCreateArgs<ExtArgs>>): Prisma__TrackingSessionClient<$Result.GetResult<Prisma.$TrackingSessionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many TrackingSessions.
     * @param {TrackingSessionCreateManyArgs} args - Arguments to create many TrackingSessions.
     * @example
     * // Create many TrackingSessions
     * const trackingSession = await prisma.trackingSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TrackingSessionCreateManyArgs>(args?: SelectSubset<T, TrackingSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TrackingSessions and returns the data saved in the database.
     * @param {TrackingSessionCreateManyAndReturnArgs} args - Arguments to create many TrackingSessions.
     * @example
     * // Create many TrackingSessions
     * const trackingSession = await prisma.trackingSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TrackingSessions and only return the `id`
     * const trackingSessionWithIdOnly = await prisma.trackingSession.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TrackingSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, TrackingSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrackingSessionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a TrackingSession.
     * @param {TrackingSessionDeleteArgs} args - Arguments to delete one TrackingSession.
     * @example
     * // Delete one TrackingSession
     * const TrackingSession = await prisma.trackingSession.delete({
     *   where: {
     *     // ... filter to delete one TrackingSession
     *   }
     * })
     * 
     */
    delete<T extends TrackingSessionDeleteArgs>(args: SelectSubset<T, TrackingSessionDeleteArgs<ExtArgs>>): Prisma__TrackingSessionClient<$Result.GetResult<Prisma.$TrackingSessionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one TrackingSession.
     * @param {TrackingSessionUpdateArgs} args - Arguments to update one TrackingSession.
     * @example
     * // Update one TrackingSession
     * const trackingSession = await prisma.trackingSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TrackingSessionUpdateArgs>(args: SelectSubset<T, TrackingSessionUpdateArgs<ExtArgs>>): Prisma__TrackingSessionClient<$Result.GetResult<Prisma.$TrackingSessionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more TrackingSessions.
     * @param {TrackingSessionDeleteManyArgs} args - Arguments to filter TrackingSessions to delete.
     * @example
     * // Delete a few TrackingSessions
     * const { count } = await prisma.trackingSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TrackingSessionDeleteManyArgs>(args?: SelectSubset<T, TrackingSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TrackingSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackingSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TrackingSessions
     * const trackingSession = await prisma.trackingSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TrackingSessionUpdateManyArgs>(args: SelectSubset<T, TrackingSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TrackingSession.
     * @param {TrackingSessionUpsertArgs} args - Arguments to update or create a TrackingSession.
     * @example
     * // Update or create a TrackingSession
     * const trackingSession = await prisma.trackingSession.upsert({
     *   create: {
     *     // ... data to create a TrackingSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TrackingSession we want to update
     *   }
     * })
     */
    upsert<T extends TrackingSessionUpsertArgs>(args: SelectSubset<T, TrackingSessionUpsertArgs<ExtArgs>>): Prisma__TrackingSessionClient<$Result.GetResult<Prisma.$TrackingSessionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of TrackingSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackingSessionCountArgs} args - Arguments to filter TrackingSessions to count.
     * @example
     * // Count the number of TrackingSessions
     * const count = await prisma.trackingSession.count({
     *   where: {
     *     // ... the filter for the TrackingSessions we want to count
     *   }
     * })
    **/
    count<T extends TrackingSessionCountArgs>(
      args?: Subset<T, TrackingSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TrackingSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TrackingSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackingSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TrackingSessionAggregateArgs>(args: Subset<T, TrackingSessionAggregateArgs>): Prisma.PrismaPromise<GetTrackingSessionAggregateType<T>>

    /**
     * Group by TrackingSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackingSessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TrackingSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TrackingSessionGroupByArgs['orderBy'] }
        : { orderBy?: TrackingSessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TrackingSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTrackingSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TrackingSession model
   */
  readonly fields: TrackingSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TrackingSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TrackingSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TrackingSession model
   */ 
  interface TrackingSessionFieldRefs {
    readonly id: FieldRef<"TrackingSession", 'String'>
    readonly clientSessionId: FieldRef<"TrackingSession", 'String'>
    readonly userId: FieldRef<"TrackingSession", 'String'>
    readonly companyId: FieldRef<"TrackingSession", 'String'>
    readonly dateKey: FieldRef<"TrackingSession", 'String'>
    readonly startedAt: FieldRef<"TrackingSession", 'DateTime'>
    readonly endedAt: FieldRef<"TrackingSession", 'DateTime'>
    readonly lastHeartbeatAt: FieldRef<"TrackingSession", 'DateTime'>
    readonly status: FieldRef<"TrackingSession", 'String'>
    readonly breakStartedAt: FieldRef<"TrackingSession", 'DateTime'>
    readonly activeSeconds: FieldRef<"TrackingSession", 'Int'>
    readonly idleSeconds: FieldRef<"TrackingSession", 'Int'>
    readonly breakSeconds: FieldRef<"TrackingSession", 'Int'>
    readonly reviewRequired: FieldRef<"TrackingSession", 'Boolean'>
    readonly reviewReason: FieldRef<"TrackingSession", 'String'>
    readonly currentTask: FieldRef<"TrackingSession", 'String'>
    readonly taskId: FieldRef<"TrackingSession", 'String'>
  }
    

  // Custom InputTypes
  /**
   * TrackingSession findUnique
   */
  export type TrackingSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackingSession
     */
    select?: TrackingSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingSessionInclude<ExtArgs> | null
    /**
     * Filter, which TrackingSession to fetch.
     */
    where: TrackingSessionWhereUniqueInput
  }

  /**
   * TrackingSession findUniqueOrThrow
   */
  export type TrackingSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackingSession
     */
    select?: TrackingSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingSessionInclude<ExtArgs> | null
    /**
     * Filter, which TrackingSession to fetch.
     */
    where: TrackingSessionWhereUniqueInput
  }

  /**
   * TrackingSession findFirst
   */
  export type TrackingSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackingSession
     */
    select?: TrackingSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingSessionInclude<ExtArgs> | null
    /**
     * Filter, which TrackingSession to fetch.
     */
    where?: TrackingSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrackingSessions to fetch.
     */
    orderBy?: TrackingSessionOrderByWithRelationInput | TrackingSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TrackingSessions.
     */
    cursor?: TrackingSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrackingSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrackingSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TrackingSessions.
     */
    distinct?: TrackingSessionScalarFieldEnum | TrackingSessionScalarFieldEnum[]
  }

  /**
   * TrackingSession findFirstOrThrow
   */
  export type TrackingSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackingSession
     */
    select?: TrackingSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingSessionInclude<ExtArgs> | null
    /**
     * Filter, which TrackingSession to fetch.
     */
    where?: TrackingSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrackingSessions to fetch.
     */
    orderBy?: TrackingSessionOrderByWithRelationInput | TrackingSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TrackingSessions.
     */
    cursor?: TrackingSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrackingSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrackingSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TrackingSessions.
     */
    distinct?: TrackingSessionScalarFieldEnum | TrackingSessionScalarFieldEnum[]
  }

  /**
   * TrackingSession findMany
   */
  export type TrackingSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackingSession
     */
    select?: TrackingSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingSessionInclude<ExtArgs> | null
    /**
     * Filter, which TrackingSessions to fetch.
     */
    where?: TrackingSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrackingSessions to fetch.
     */
    orderBy?: TrackingSessionOrderByWithRelationInput | TrackingSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TrackingSessions.
     */
    cursor?: TrackingSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrackingSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrackingSessions.
     */
    skip?: number
    distinct?: TrackingSessionScalarFieldEnum | TrackingSessionScalarFieldEnum[]
  }

  /**
   * TrackingSession create
   */
  export type TrackingSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackingSession
     */
    select?: TrackingSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a TrackingSession.
     */
    data: XOR<TrackingSessionCreateInput, TrackingSessionUncheckedCreateInput>
  }

  /**
   * TrackingSession createMany
   */
  export type TrackingSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TrackingSessions.
     */
    data: TrackingSessionCreateManyInput | TrackingSessionCreateManyInput[]
  }

  /**
   * TrackingSession createManyAndReturn
   */
  export type TrackingSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackingSession
     */
    select?: TrackingSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many TrackingSessions.
     */
    data: TrackingSessionCreateManyInput | TrackingSessionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingSessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TrackingSession update
   */
  export type TrackingSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackingSession
     */
    select?: TrackingSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a TrackingSession.
     */
    data: XOR<TrackingSessionUpdateInput, TrackingSessionUncheckedUpdateInput>
    /**
     * Choose, which TrackingSession to update.
     */
    where: TrackingSessionWhereUniqueInput
  }

  /**
   * TrackingSession updateMany
   */
  export type TrackingSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TrackingSessions.
     */
    data: XOR<TrackingSessionUpdateManyMutationInput, TrackingSessionUncheckedUpdateManyInput>
    /**
     * Filter which TrackingSessions to update
     */
    where?: TrackingSessionWhereInput
  }

  /**
   * TrackingSession upsert
   */
  export type TrackingSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackingSession
     */
    select?: TrackingSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the TrackingSession to update in case it exists.
     */
    where: TrackingSessionWhereUniqueInput
    /**
     * In case the TrackingSession found by the `where` argument doesn't exist, create a new TrackingSession with this data.
     */
    create: XOR<TrackingSessionCreateInput, TrackingSessionUncheckedCreateInput>
    /**
     * In case the TrackingSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TrackingSessionUpdateInput, TrackingSessionUncheckedUpdateInput>
  }

  /**
   * TrackingSession delete
   */
  export type TrackingSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackingSession
     */
    select?: TrackingSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingSessionInclude<ExtArgs> | null
    /**
     * Filter which TrackingSession to delete.
     */
    where: TrackingSessionWhereUniqueInput
  }

  /**
   * TrackingSession deleteMany
   */
  export type TrackingSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TrackingSessions to delete
     */
    where?: TrackingSessionWhereInput
  }

  /**
   * TrackingSession without action
   */
  export type TrackingSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackingSession
     */
    select?: TrackingSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingSessionInclude<ExtArgs> | null
  }


  /**
   * Model Project
   */

  export type AggregateProject = {
    _count: ProjectCountAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  export type ProjectMinAggregateOutputType = {
    id: string | null
    companyId: string | null
    name: string | null
    code: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectMaxAggregateOutputType = {
    id: string | null
    companyId: string | null
    name: string | null
    code: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectCountAggregateOutputType = {
    id: number
    companyId: number
    name: number
    code: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProjectMinAggregateInputType = {
    id?: true
    companyId?: true
    name?: true
    code?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectMaxAggregateInputType = {
    id?: true
    companyId?: true
    name?: true
    code?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectCountAggregateInputType = {
    id?: true
    companyId?: true
    name?: true
    code?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Project to aggregate.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Projects
    **/
    _count?: true | ProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectMaxAggregateInputType
  }

  export type GetProjectAggregateType<T extends ProjectAggregateArgs> = {
        [P in keyof T & keyof AggregateProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProject[P]>
      : GetScalarType<T[P], AggregateProject[P]>
  }




  export type ProjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithAggregationInput | ProjectOrderByWithAggregationInput[]
    by: ProjectScalarFieldEnum[] | ProjectScalarFieldEnum
    having?: ProjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectCountAggregateInputType | true
    _min?: ProjectMinAggregateInputType
    _max?: ProjectMaxAggregateInputType
  }

  export type ProjectGroupByOutputType = {
    id: string
    companyId: string
    name: string
    code: string | null
    status: string
    createdAt: Date
    updatedAt: Date
    _count: ProjectCountAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  type GetProjectGroupByPayload<T extends ProjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectGroupByOutputType[P]>
        }
      >
    >


  export type ProjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    name?: boolean
    code?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tasks?: boolean | Project$tasksArgs<ExtArgs>
    manualTimeRequests?: boolean | Project$manualTimeRequestsArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    name?: boolean
    code?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectScalar = {
    id?: boolean
    companyId?: boolean
    name?: boolean
    code?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tasks?: boolean | Project$tasksArgs<ExtArgs>
    manualTimeRequests?: boolean | Project$manualTimeRequestsArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProjectIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ProjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Project"
    objects: {
      tasks: Prisma.$TaskPayload<ExtArgs>[]
      manualTimeRequests: Prisma.$ManualTimeRequestPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      companyId: string
      name: string
      code: string | null
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["project"]>
    composites: {}
  }

  type ProjectGetPayload<S extends boolean | null | undefined | ProjectDefaultArgs> = $Result.GetResult<Prisma.$ProjectPayload, S>

  type ProjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ProjectFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ProjectCountAggregateInputType | true
    }

  export interface ProjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Project'], meta: { name: 'Project' } }
    /**
     * Find zero or one Project that matches the filter.
     * @param {ProjectFindUniqueArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectFindUniqueArgs>(args: SelectSubset<T, ProjectFindUniqueArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Project that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ProjectFindUniqueOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Project that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectFindFirstArgs>(args?: SelectSubset<T, ProjectFindFirstArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Project that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projects
     * const projects = await prisma.project.findMany()
     * 
     * // Get first 10 Projects
     * const projects = await prisma.project.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectWithIdOnly = await prisma.project.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectFindManyArgs>(args?: SelectSubset<T, ProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Project.
     * @param {ProjectCreateArgs} args - Arguments to create a Project.
     * @example
     * // Create one Project
     * const Project = await prisma.project.create({
     *   data: {
     *     // ... data to create a Project
     *   }
     * })
     * 
     */
    create<T extends ProjectCreateArgs>(args: SelectSubset<T, ProjectCreateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Projects.
     * @param {ProjectCreateManyArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectCreateManyArgs>(args?: SelectSubset<T, ProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Projects and returns the data saved in the database.
     * @param {ProjectCreateManyAndReturnArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Project.
     * @param {ProjectDeleteArgs} args - Arguments to delete one Project.
     * @example
     * // Delete one Project
     * const Project = await prisma.project.delete({
     *   where: {
     *     // ... filter to delete one Project
     *   }
     * })
     * 
     */
    delete<T extends ProjectDeleteArgs>(args: SelectSubset<T, ProjectDeleteArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Project.
     * @param {ProjectUpdateArgs} args - Arguments to update one Project.
     * @example
     * // Update one Project
     * const project = await prisma.project.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectUpdateArgs>(args: SelectSubset<T, ProjectUpdateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Projects.
     * @param {ProjectDeleteManyArgs} args - Arguments to filter Projects to delete.
     * @example
     * // Delete a few Projects
     * const { count } = await prisma.project.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectDeleteManyArgs>(args?: SelectSubset<T, ProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectUpdateManyArgs>(args: SelectSubset<T, ProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Project.
     * @param {ProjectUpsertArgs} args - Arguments to update or create a Project.
     * @example
     * // Update or create a Project
     * const project = await prisma.project.upsert({
     *   create: {
     *     // ... data to create a Project
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Project we want to update
     *   }
     * })
     */
    upsert<T extends ProjectUpsertArgs>(args: SelectSubset<T, ProjectUpsertArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectCountArgs} args - Arguments to filter Projects to count.
     * @example
     * // Count the number of Projects
     * const count = await prisma.project.count({
     *   where: {
     *     // ... the filter for the Projects we want to count
     *   }
     * })
    **/
    count<T extends ProjectCountArgs>(
      args?: Subset<T, ProjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectAggregateArgs>(args: Subset<T, ProjectAggregateArgs>): Prisma.PrismaPromise<GetProjectAggregateType<T>>

    /**
     * Group by Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectGroupByArgs['orderBy'] }
        : { orderBy?: ProjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Project model
   */
  readonly fields: ProjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Project.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tasks<T extends Project$tasksArgs<ExtArgs> = {}>(args?: Subset<T, Project$tasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany"> | Null>
    manualTimeRequests<T extends Project$manualTimeRequestsArgs<ExtArgs> = {}>(args?: Subset<T, Project$manualTimeRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ManualTimeRequestPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Project model
   */ 
  interface ProjectFieldRefs {
    readonly id: FieldRef<"Project", 'String'>
    readonly companyId: FieldRef<"Project", 'String'>
    readonly name: FieldRef<"Project", 'String'>
    readonly code: FieldRef<"Project", 'String'>
    readonly status: FieldRef<"Project", 'String'>
    readonly createdAt: FieldRef<"Project", 'DateTime'>
    readonly updatedAt: FieldRef<"Project", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Project findUnique
   */
  export type ProjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findUniqueOrThrow
   */
  export type ProjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findFirst
   */
  export type ProjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findFirstOrThrow
   */
  export type ProjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findMany
   */
  export type ProjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Projects to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project create
   */
  export type ProjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to create a Project.
     */
    data: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
  }

  /**
   * Project createMany
   */
  export type ProjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
  }

  /**
   * Project createManyAndReturn
   */
  export type ProjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
  }

  /**
   * Project update
   */
  export type ProjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to update a Project.
     */
    data: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
    /**
     * Choose, which Project to update.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project updateMany
   */
  export type ProjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
  }

  /**
   * Project upsert
   */
  export type ProjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The filter to search for the Project to update in case it exists.
     */
    where: ProjectWhereUniqueInput
    /**
     * In case the Project found by the `where` argument doesn't exist, create a new Project with this data.
     */
    create: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
    /**
     * In case the Project was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
  }

  /**
   * Project delete
   */
  export type ProjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter which Project to delete.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project deleteMany
   */
  export type ProjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Projects to delete
     */
    where?: ProjectWhereInput
  }

  /**
   * Project.tasks
   */
  export type Project$tasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    cursor?: TaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Project.manualTimeRequests
   */
  export type Project$manualTimeRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ManualTimeRequest
     */
    select?: ManualTimeRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManualTimeRequestInclude<ExtArgs> | null
    where?: ManualTimeRequestWhereInput
    orderBy?: ManualTimeRequestOrderByWithRelationInput | ManualTimeRequestOrderByWithRelationInput[]
    cursor?: ManualTimeRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ManualTimeRequestScalarFieldEnum | ManualTimeRequestScalarFieldEnum[]
  }

  /**
   * Project without action
   */
  export type ProjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
  }


  /**
   * Model Task
   */

  export type AggregateTask = {
    _count: TaskCountAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  export type TaskMinAggregateOutputType = {
    id: string | null
    companyId: string | null
    projectId: string | null
    assignedUserId: string | null
    title: string | null
    description: string | null
    status: string | null
    priority: string | null
    dueDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TaskMaxAggregateOutputType = {
    id: string | null
    companyId: string | null
    projectId: string | null
    assignedUserId: string | null
    title: string | null
    description: string | null
    status: string | null
    priority: string | null
    dueDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TaskCountAggregateOutputType = {
    id: number
    companyId: number
    projectId: number
    assignedUserId: number
    title: number
    description: number
    status: number
    priority: number
    dueDate: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TaskMinAggregateInputType = {
    id?: true
    companyId?: true
    projectId?: true
    assignedUserId?: true
    title?: true
    description?: true
    status?: true
    priority?: true
    dueDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TaskMaxAggregateInputType = {
    id?: true
    companyId?: true
    projectId?: true
    assignedUserId?: true
    title?: true
    description?: true
    status?: true
    priority?: true
    dueDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TaskCountAggregateInputType = {
    id?: true
    companyId?: true
    projectId?: true
    assignedUserId?: true
    title?: true
    description?: true
    status?: true
    priority?: true
    dueDate?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TaskAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Task to aggregate.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tasks
    **/
    _count?: true | TaskCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskMaxAggregateInputType
  }

  export type GetTaskAggregateType<T extends TaskAggregateArgs> = {
        [P in keyof T & keyof AggregateTask]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTask[P]>
      : GetScalarType<T[P], AggregateTask[P]>
  }




  export type TaskGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithAggregationInput | TaskOrderByWithAggregationInput[]
    by: TaskScalarFieldEnum[] | TaskScalarFieldEnum
    having?: TaskScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskCountAggregateInputType | true
    _min?: TaskMinAggregateInputType
    _max?: TaskMaxAggregateInputType
  }

  export type TaskGroupByOutputType = {
    id: string
    companyId: string
    projectId: string | null
    assignedUserId: string | null
    title: string
    description: string | null
    status: string
    priority: string
    dueDate: Date | null
    createdAt: Date
    updatedAt: Date
    _count: TaskCountAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  type GetTaskGroupByPayload<T extends TaskGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskGroupByOutputType[P]>
            : GetScalarType<T[P], TaskGroupByOutputType[P]>
        }
      >
    >


  export type TaskSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    projectId?: boolean
    assignedUserId?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    priority?: boolean
    dueDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | Task$projectArgs<ExtArgs>
    assignedUser?: boolean | Task$assignedUserArgs<ExtArgs>
    manualTimeRequests?: boolean | Task$manualTimeRequestsArgs<ExtArgs>
    _count?: boolean | TaskCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    projectId?: boolean
    assignedUserId?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    priority?: boolean
    dueDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | Task$projectArgs<ExtArgs>
    assignedUser?: boolean | Task$assignedUserArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectScalar = {
    id?: boolean
    companyId?: boolean
    projectId?: boolean
    assignedUserId?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    priority?: boolean
    dueDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TaskInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | Task$projectArgs<ExtArgs>
    assignedUser?: boolean | Task$assignedUserArgs<ExtArgs>
    manualTimeRequests?: boolean | Task$manualTimeRequestsArgs<ExtArgs>
    _count?: boolean | TaskCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TaskIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | Task$projectArgs<ExtArgs>
    assignedUser?: boolean | Task$assignedUserArgs<ExtArgs>
  }

  export type $TaskPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Task"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs> | null
      assignedUser: Prisma.$UserPayload<ExtArgs> | null
      manualTimeRequests: Prisma.$ManualTimeRequestPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      companyId: string
      projectId: string | null
      assignedUserId: string | null
      title: string
      description: string | null
      status: string
      priority: string
      dueDate: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["task"]>
    composites: {}
  }

  type TaskGetPayload<S extends boolean | null | undefined | TaskDefaultArgs> = $Result.GetResult<Prisma.$TaskPayload, S>

  type TaskCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TaskFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TaskCountAggregateInputType | true
    }

  export interface TaskDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Task'], meta: { name: 'Task' } }
    /**
     * Find zero or one Task that matches the filter.
     * @param {TaskFindUniqueArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskFindUniqueArgs>(args: SelectSubset<T, TaskFindUniqueArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Task that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TaskFindUniqueOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskFindUniqueOrThrowArgs>(args: SelectSubset<T, TaskFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Task that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskFindFirstArgs>(args?: SelectSubset<T, TaskFindFirstArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Task that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskFindFirstOrThrowArgs>(args?: SelectSubset<T, TaskFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Tasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tasks
     * const tasks = await prisma.task.findMany()
     * 
     * // Get first 10 Tasks
     * const tasks = await prisma.task.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const taskWithIdOnly = await prisma.task.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TaskFindManyArgs>(args?: SelectSubset<T, TaskFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Task.
     * @param {TaskCreateArgs} args - Arguments to create a Task.
     * @example
     * // Create one Task
     * const Task = await prisma.task.create({
     *   data: {
     *     // ... data to create a Task
     *   }
     * })
     * 
     */
    create<T extends TaskCreateArgs>(args: SelectSubset<T, TaskCreateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Tasks.
     * @param {TaskCreateManyArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaskCreateManyArgs>(args?: SelectSubset<T, TaskCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tasks and returns the data saved in the database.
     * @param {TaskCreateManyAndReturnArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tasks and only return the `id`
     * const taskWithIdOnly = await prisma.task.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TaskCreateManyAndReturnArgs>(args?: SelectSubset<T, TaskCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Task.
     * @param {TaskDeleteArgs} args - Arguments to delete one Task.
     * @example
     * // Delete one Task
     * const Task = await prisma.task.delete({
     *   where: {
     *     // ... filter to delete one Task
     *   }
     * })
     * 
     */
    delete<T extends TaskDeleteArgs>(args: SelectSubset<T, TaskDeleteArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Task.
     * @param {TaskUpdateArgs} args - Arguments to update one Task.
     * @example
     * // Update one Task
     * const task = await prisma.task.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaskUpdateArgs>(args: SelectSubset<T, TaskUpdateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Tasks.
     * @param {TaskDeleteManyArgs} args - Arguments to filter Tasks to delete.
     * @example
     * // Delete a few Tasks
     * const { count } = await prisma.task.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaskDeleteManyArgs>(args?: SelectSubset<T, TaskDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaskUpdateManyArgs>(args: SelectSubset<T, TaskUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Task.
     * @param {TaskUpsertArgs} args - Arguments to update or create a Task.
     * @example
     * // Update or create a Task
     * const task = await prisma.task.upsert({
     *   create: {
     *     // ... data to create a Task
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Task we want to update
     *   }
     * })
     */
    upsert<T extends TaskUpsertArgs>(args: SelectSubset<T, TaskUpsertArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCountArgs} args - Arguments to filter Tasks to count.
     * @example
     * // Count the number of Tasks
     * const count = await prisma.task.count({
     *   where: {
     *     // ... the filter for the Tasks we want to count
     *   }
     * })
    **/
    count<T extends TaskCountArgs>(
      args?: Subset<T, TaskCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TaskAggregateArgs>(args: Subset<T, TaskAggregateArgs>): Prisma.PrismaPromise<GetTaskAggregateType<T>>

    /**
     * Group by Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TaskGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskGroupByArgs['orderBy'] }
        : { orderBy?: TaskGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TaskGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Task model
   */
  readonly fields: TaskFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Task.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends Task$projectArgs<ExtArgs> = {}>(args?: Subset<T, Task$projectArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    assignedUser<T extends Task$assignedUserArgs<ExtArgs> = {}>(args?: Subset<T, Task$assignedUserArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    manualTimeRequests<T extends Task$manualTimeRequestsArgs<ExtArgs> = {}>(args?: Subset<T, Task$manualTimeRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ManualTimeRequestPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Task model
   */ 
  interface TaskFieldRefs {
    readonly id: FieldRef<"Task", 'String'>
    readonly companyId: FieldRef<"Task", 'String'>
    readonly projectId: FieldRef<"Task", 'String'>
    readonly assignedUserId: FieldRef<"Task", 'String'>
    readonly title: FieldRef<"Task", 'String'>
    readonly description: FieldRef<"Task", 'String'>
    readonly status: FieldRef<"Task", 'String'>
    readonly priority: FieldRef<"Task", 'String'>
    readonly dueDate: FieldRef<"Task", 'DateTime'>
    readonly createdAt: FieldRef<"Task", 'DateTime'>
    readonly updatedAt: FieldRef<"Task", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Task findUnique
   */
  export type TaskFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findUniqueOrThrow
   */
  export type TaskFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findFirst
   */
  export type TaskFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findFirstOrThrow
   */
  export type TaskFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findMany
   */
  export type TaskFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Tasks to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task create
   */
  export type TaskCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to create a Task.
     */
    data: XOR<TaskCreateInput, TaskUncheckedCreateInput>
  }

  /**
   * Task createMany
   */
  export type TaskCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
  }

  /**
   * Task createManyAndReturn
   */
  export type TaskCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Task update
   */
  export type TaskUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to update a Task.
     */
    data: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
    /**
     * Choose, which Task to update.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task updateMany
   */
  export type TaskUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
  }

  /**
   * Task upsert
   */
  export type TaskUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The filter to search for the Task to update in case it exists.
     */
    where: TaskWhereUniqueInput
    /**
     * In case the Task found by the `where` argument doesn't exist, create a new Task with this data.
     */
    create: XOR<TaskCreateInput, TaskUncheckedCreateInput>
    /**
     * In case the Task was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
  }

  /**
   * Task delete
   */
  export type TaskDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter which Task to delete.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task deleteMany
   */
  export type TaskDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tasks to delete
     */
    where?: TaskWhereInput
  }

  /**
   * Task.project
   */
  export type Task$projectArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    where?: ProjectWhereInput
  }

  /**
   * Task.assignedUser
   */
  export type Task$assignedUserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Task.manualTimeRequests
   */
  export type Task$manualTimeRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ManualTimeRequest
     */
    select?: ManualTimeRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManualTimeRequestInclude<ExtArgs> | null
    where?: ManualTimeRequestWhereInput
    orderBy?: ManualTimeRequestOrderByWithRelationInput | ManualTimeRequestOrderByWithRelationInput[]
    cursor?: ManualTimeRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ManualTimeRequestScalarFieldEnum | ManualTimeRequestScalarFieldEnum[]
  }

  /**
   * Task without action
   */
  export type TaskDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
  }


  /**
   * Model ProductivityRule
   */

  export type AggregateProductivityRule = {
    _count: ProductivityRuleCountAggregateOutputType | null
    _min: ProductivityRuleMinAggregateOutputType | null
    _max: ProductivityRuleMaxAggregateOutputType | null
  }

  export type ProductivityRuleMinAggregateOutputType = {
    id: string | null
    companyId: string | null
    pattern: string | null
    matchType: string | null
    category: string | null
    createdAt: Date | null
  }

  export type ProductivityRuleMaxAggregateOutputType = {
    id: string | null
    companyId: string | null
    pattern: string | null
    matchType: string | null
    category: string | null
    createdAt: Date | null
  }

  export type ProductivityRuleCountAggregateOutputType = {
    id: number
    companyId: number
    pattern: number
    matchType: number
    category: number
    createdAt: number
    _all: number
  }


  export type ProductivityRuleMinAggregateInputType = {
    id?: true
    companyId?: true
    pattern?: true
    matchType?: true
    category?: true
    createdAt?: true
  }

  export type ProductivityRuleMaxAggregateInputType = {
    id?: true
    companyId?: true
    pattern?: true
    matchType?: true
    category?: true
    createdAt?: true
  }

  export type ProductivityRuleCountAggregateInputType = {
    id?: true
    companyId?: true
    pattern?: true
    matchType?: true
    category?: true
    createdAt?: true
    _all?: true
  }

  export type ProductivityRuleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductivityRule to aggregate.
     */
    where?: ProductivityRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductivityRules to fetch.
     */
    orderBy?: ProductivityRuleOrderByWithRelationInput | ProductivityRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductivityRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductivityRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductivityRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProductivityRules
    **/
    _count?: true | ProductivityRuleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductivityRuleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductivityRuleMaxAggregateInputType
  }

  export type GetProductivityRuleAggregateType<T extends ProductivityRuleAggregateArgs> = {
        [P in keyof T & keyof AggregateProductivityRule]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductivityRule[P]>
      : GetScalarType<T[P], AggregateProductivityRule[P]>
  }




  export type ProductivityRuleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductivityRuleWhereInput
    orderBy?: ProductivityRuleOrderByWithAggregationInput | ProductivityRuleOrderByWithAggregationInput[]
    by: ProductivityRuleScalarFieldEnum[] | ProductivityRuleScalarFieldEnum
    having?: ProductivityRuleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductivityRuleCountAggregateInputType | true
    _min?: ProductivityRuleMinAggregateInputType
    _max?: ProductivityRuleMaxAggregateInputType
  }

  export type ProductivityRuleGroupByOutputType = {
    id: string
    companyId: string
    pattern: string
    matchType: string
    category: string
    createdAt: Date
    _count: ProductivityRuleCountAggregateOutputType | null
    _min: ProductivityRuleMinAggregateOutputType | null
    _max: ProductivityRuleMaxAggregateOutputType | null
  }

  type GetProductivityRuleGroupByPayload<T extends ProductivityRuleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductivityRuleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductivityRuleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductivityRuleGroupByOutputType[P]>
            : GetScalarType<T[P], ProductivityRuleGroupByOutputType[P]>
        }
      >
    >


  export type ProductivityRuleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    pattern?: boolean
    matchType?: boolean
    category?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["productivityRule"]>

  export type ProductivityRuleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    pattern?: boolean
    matchType?: boolean
    category?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["productivityRule"]>

  export type ProductivityRuleSelectScalar = {
    id?: boolean
    companyId?: boolean
    pattern?: boolean
    matchType?: boolean
    category?: boolean
    createdAt?: boolean
  }


  export type $ProductivityRulePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProductivityRule"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      companyId: string
      pattern: string
      matchType: string
      category: string
      createdAt: Date
    }, ExtArgs["result"]["productivityRule"]>
    composites: {}
  }

  type ProductivityRuleGetPayload<S extends boolean | null | undefined | ProductivityRuleDefaultArgs> = $Result.GetResult<Prisma.$ProductivityRulePayload, S>

  type ProductivityRuleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ProductivityRuleFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ProductivityRuleCountAggregateInputType | true
    }

  export interface ProductivityRuleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProductivityRule'], meta: { name: 'ProductivityRule' } }
    /**
     * Find zero or one ProductivityRule that matches the filter.
     * @param {ProductivityRuleFindUniqueArgs} args - Arguments to find a ProductivityRule
     * @example
     * // Get one ProductivityRule
     * const productivityRule = await prisma.productivityRule.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductivityRuleFindUniqueArgs>(args: SelectSubset<T, ProductivityRuleFindUniqueArgs<ExtArgs>>): Prisma__ProductivityRuleClient<$Result.GetResult<Prisma.$ProductivityRulePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ProductivityRule that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ProductivityRuleFindUniqueOrThrowArgs} args - Arguments to find a ProductivityRule
     * @example
     * // Get one ProductivityRule
     * const productivityRule = await prisma.productivityRule.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductivityRuleFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductivityRuleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductivityRuleClient<$Result.GetResult<Prisma.$ProductivityRulePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ProductivityRule that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductivityRuleFindFirstArgs} args - Arguments to find a ProductivityRule
     * @example
     * // Get one ProductivityRule
     * const productivityRule = await prisma.productivityRule.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductivityRuleFindFirstArgs>(args?: SelectSubset<T, ProductivityRuleFindFirstArgs<ExtArgs>>): Prisma__ProductivityRuleClient<$Result.GetResult<Prisma.$ProductivityRulePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ProductivityRule that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductivityRuleFindFirstOrThrowArgs} args - Arguments to find a ProductivityRule
     * @example
     * // Get one ProductivityRule
     * const productivityRule = await prisma.productivityRule.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductivityRuleFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductivityRuleFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductivityRuleClient<$Result.GetResult<Prisma.$ProductivityRulePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ProductivityRules that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductivityRuleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductivityRules
     * const productivityRules = await prisma.productivityRule.findMany()
     * 
     * // Get first 10 ProductivityRules
     * const productivityRules = await prisma.productivityRule.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productivityRuleWithIdOnly = await prisma.productivityRule.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductivityRuleFindManyArgs>(args?: SelectSubset<T, ProductivityRuleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductivityRulePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ProductivityRule.
     * @param {ProductivityRuleCreateArgs} args - Arguments to create a ProductivityRule.
     * @example
     * // Create one ProductivityRule
     * const ProductivityRule = await prisma.productivityRule.create({
     *   data: {
     *     // ... data to create a ProductivityRule
     *   }
     * })
     * 
     */
    create<T extends ProductivityRuleCreateArgs>(args: SelectSubset<T, ProductivityRuleCreateArgs<ExtArgs>>): Prisma__ProductivityRuleClient<$Result.GetResult<Prisma.$ProductivityRulePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ProductivityRules.
     * @param {ProductivityRuleCreateManyArgs} args - Arguments to create many ProductivityRules.
     * @example
     * // Create many ProductivityRules
     * const productivityRule = await prisma.productivityRule.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductivityRuleCreateManyArgs>(args?: SelectSubset<T, ProductivityRuleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProductivityRules and returns the data saved in the database.
     * @param {ProductivityRuleCreateManyAndReturnArgs} args - Arguments to create many ProductivityRules.
     * @example
     * // Create many ProductivityRules
     * const productivityRule = await prisma.productivityRule.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProductivityRules and only return the `id`
     * const productivityRuleWithIdOnly = await prisma.productivityRule.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductivityRuleCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductivityRuleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductivityRulePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ProductivityRule.
     * @param {ProductivityRuleDeleteArgs} args - Arguments to delete one ProductivityRule.
     * @example
     * // Delete one ProductivityRule
     * const ProductivityRule = await prisma.productivityRule.delete({
     *   where: {
     *     // ... filter to delete one ProductivityRule
     *   }
     * })
     * 
     */
    delete<T extends ProductivityRuleDeleteArgs>(args: SelectSubset<T, ProductivityRuleDeleteArgs<ExtArgs>>): Prisma__ProductivityRuleClient<$Result.GetResult<Prisma.$ProductivityRulePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ProductivityRule.
     * @param {ProductivityRuleUpdateArgs} args - Arguments to update one ProductivityRule.
     * @example
     * // Update one ProductivityRule
     * const productivityRule = await prisma.productivityRule.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductivityRuleUpdateArgs>(args: SelectSubset<T, ProductivityRuleUpdateArgs<ExtArgs>>): Prisma__ProductivityRuleClient<$Result.GetResult<Prisma.$ProductivityRulePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ProductivityRules.
     * @param {ProductivityRuleDeleteManyArgs} args - Arguments to filter ProductivityRules to delete.
     * @example
     * // Delete a few ProductivityRules
     * const { count } = await prisma.productivityRule.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductivityRuleDeleteManyArgs>(args?: SelectSubset<T, ProductivityRuleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductivityRules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductivityRuleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductivityRules
     * const productivityRule = await prisma.productivityRule.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductivityRuleUpdateManyArgs>(args: SelectSubset<T, ProductivityRuleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ProductivityRule.
     * @param {ProductivityRuleUpsertArgs} args - Arguments to update or create a ProductivityRule.
     * @example
     * // Update or create a ProductivityRule
     * const productivityRule = await prisma.productivityRule.upsert({
     *   create: {
     *     // ... data to create a ProductivityRule
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductivityRule we want to update
     *   }
     * })
     */
    upsert<T extends ProductivityRuleUpsertArgs>(args: SelectSubset<T, ProductivityRuleUpsertArgs<ExtArgs>>): Prisma__ProductivityRuleClient<$Result.GetResult<Prisma.$ProductivityRulePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ProductivityRules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductivityRuleCountArgs} args - Arguments to filter ProductivityRules to count.
     * @example
     * // Count the number of ProductivityRules
     * const count = await prisma.productivityRule.count({
     *   where: {
     *     // ... the filter for the ProductivityRules we want to count
     *   }
     * })
    **/
    count<T extends ProductivityRuleCountArgs>(
      args?: Subset<T, ProductivityRuleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductivityRuleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProductivityRule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductivityRuleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductivityRuleAggregateArgs>(args: Subset<T, ProductivityRuleAggregateArgs>): Prisma.PrismaPromise<GetProductivityRuleAggregateType<T>>

    /**
     * Group by ProductivityRule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductivityRuleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductivityRuleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductivityRuleGroupByArgs['orderBy'] }
        : { orderBy?: ProductivityRuleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductivityRuleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductivityRuleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProductivityRule model
   */
  readonly fields: ProductivityRuleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductivityRule.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductivityRuleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProductivityRule model
   */ 
  interface ProductivityRuleFieldRefs {
    readonly id: FieldRef<"ProductivityRule", 'String'>
    readonly companyId: FieldRef<"ProductivityRule", 'String'>
    readonly pattern: FieldRef<"ProductivityRule", 'String'>
    readonly matchType: FieldRef<"ProductivityRule", 'String'>
    readonly category: FieldRef<"ProductivityRule", 'String'>
    readonly createdAt: FieldRef<"ProductivityRule", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProductivityRule findUnique
   */
  export type ProductivityRuleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductivityRule
     */
    select?: ProductivityRuleSelect<ExtArgs> | null
    /**
     * Filter, which ProductivityRule to fetch.
     */
    where: ProductivityRuleWhereUniqueInput
  }

  /**
   * ProductivityRule findUniqueOrThrow
   */
  export type ProductivityRuleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductivityRule
     */
    select?: ProductivityRuleSelect<ExtArgs> | null
    /**
     * Filter, which ProductivityRule to fetch.
     */
    where: ProductivityRuleWhereUniqueInput
  }

  /**
   * ProductivityRule findFirst
   */
  export type ProductivityRuleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductivityRule
     */
    select?: ProductivityRuleSelect<ExtArgs> | null
    /**
     * Filter, which ProductivityRule to fetch.
     */
    where?: ProductivityRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductivityRules to fetch.
     */
    orderBy?: ProductivityRuleOrderByWithRelationInput | ProductivityRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductivityRules.
     */
    cursor?: ProductivityRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductivityRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductivityRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductivityRules.
     */
    distinct?: ProductivityRuleScalarFieldEnum | ProductivityRuleScalarFieldEnum[]
  }

  /**
   * ProductivityRule findFirstOrThrow
   */
  export type ProductivityRuleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductivityRule
     */
    select?: ProductivityRuleSelect<ExtArgs> | null
    /**
     * Filter, which ProductivityRule to fetch.
     */
    where?: ProductivityRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductivityRules to fetch.
     */
    orderBy?: ProductivityRuleOrderByWithRelationInput | ProductivityRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductivityRules.
     */
    cursor?: ProductivityRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductivityRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductivityRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductivityRules.
     */
    distinct?: ProductivityRuleScalarFieldEnum | ProductivityRuleScalarFieldEnum[]
  }

  /**
   * ProductivityRule findMany
   */
  export type ProductivityRuleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductivityRule
     */
    select?: ProductivityRuleSelect<ExtArgs> | null
    /**
     * Filter, which ProductivityRules to fetch.
     */
    where?: ProductivityRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductivityRules to fetch.
     */
    orderBy?: ProductivityRuleOrderByWithRelationInput | ProductivityRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProductivityRules.
     */
    cursor?: ProductivityRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductivityRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductivityRules.
     */
    skip?: number
    distinct?: ProductivityRuleScalarFieldEnum | ProductivityRuleScalarFieldEnum[]
  }

  /**
   * ProductivityRule create
   */
  export type ProductivityRuleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductivityRule
     */
    select?: ProductivityRuleSelect<ExtArgs> | null
    /**
     * The data needed to create a ProductivityRule.
     */
    data: XOR<ProductivityRuleCreateInput, ProductivityRuleUncheckedCreateInput>
  }

  /**
   * ProductivityRule createMany
   */
  export type ProductivityRuleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductivityRules.
     */
    data: ProductivityRuleCreateManyInput | ProductivityRuleCreateManyInput[]
  }

  /**
   * ProductivityRule createManyAndReturn
   */
  export type ProductivityRuleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductivityRule
     */
    select?: ProductivityRuleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ProductivityRules.
     */
    data: ProductivityRuleCreateManyInput | ProductivityRuleCreateManyInput[]
  }

  /**
   * ProductivityRule update
   */
  export type ProductivityRuleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductivityRule
     */
    select?: ProductivityRuleSelect<ExtArgs> | null
    /**
     * The data needed to update a ProductivityRule.
     */
    data: XOR<ProductivityRuleUpdateInput, ProductivityRuleUncheckedUpdateInput>
    /**
     * Choose, which ProductivityRule to update.
     */
    where: ProductivityRuleWhereUniqueInput
  }

  /**
   * ProductivityRule updateMany
   */
  export type ProductivityRuleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductivityRules.
     */
    data: XOR<ProductivityRuleUpdateManyMutationInput, ProductivityRuleUncheckedUpdateManyInput>
    /**
     * Filter which ProductivityRules to update
     */
    where?: ProductivityRuleWhereInput
  }

  /**
   * ProductivityRule upsert
   */
  export type ProductivityRuleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductivityRule
     */
    select?: ProductivityRuleSelect<ExtArgs> | null
    /**
     * The filter to search for the ProductivityRule to update in case it exists.
     */
    where: ProductivityRuleWhereUniqueInput
    /**
     * In case the ProductivityRule found by the `where` argument doesn't exist, create a new ProductivityRule with this data.
     */
    create: XOR<ProductivityRuleCreateInput, ProductivityRuleUncheckedCreateInput>
    /**
     * In case the ProductivityRule was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductivityRuleUpdateInput, ProductivityRuleUncheckedUpdateInput>
  }

  /**
   * ProductivityRule delete
   */
  export type ProductivityRuleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductivityRule
     */
    select?: ProductivityRuleSelect<ExtArgs> | null
    /**
     * Filter which ProductivityRule to delete.
     */
    where: ProductivityRuleWhereUniqueInput
  }

  /**
   * ProductivityRule deleteMany
   */
  export type ProductivityRuleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductivityRules to delete
     */
    where?: ProductivityRuleWhereInput
  }

  /**
   * ProductivityRule without action
   */
  export type ProductivityRuleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductivityRule
     */
    select?: ProductivityRuleSelect<ExtArgs> | null
  }


  /**
   * Model ManualTimeRequest
   */

  export type AggregateManualTimeRequest = {
    _count: ManualTimeRequestCountAggregateOutputType | null
    _min: ManualTimeRequestMinAggregateOutputType | null
    _max: ManualTimeRequestMaxAggregateOutputType | null
  }

  export type ManualTimeRequestMinAggregateOutputType = {
    id: string | null
    userId: string | null
    companyId: string | null
    startAt: Date | null
    endAt: Date | null
    note: string | null
    projectId: string | null
    taskId: string | null
    status: string | null
    reviewedBy: string | null
    reviewedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ManualTimeRequestMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    companyId: string | null
    startAt: Date | null
    endAt: Date | null
    note: string | null
    projectId: string | null
    taskId: string | null
    status: string | null
    reviewedBy: string | null
    reviewedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ManualTimeRequestCountAggregateOutputType = {
    id: number
    userId: number
    companyId: number
    startAt: number
    endAt: number
    note: number
    projectId: number
    taskId: number
    status: number
    reviewedBy: number
    reviewedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ManualTimeRequestMinAggregateInputType = {
    id?: true
    userId?: true
    companyId?: true
    startAt?: true
    endAt?: true
    note?: true
    projectId?: true
    taskId?: true
    status?: true
    reviewedBy?: true
    reviewedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ManualTimeRequestMaxAggregateInputType = {
    id?: true
    userId?: true
    companyId?: true
    startAt?: true
    endAt?: true
    note?: true
    projectId?: true
    taskId?: true
    status?: true
    reviewedBy?: true
    reviewedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ManualTimeRequestCountAggregateInputType = {
    id?: true
    userId?: true
    companyId?: true
    startAt?: true
    endAt?: true
    note?: true
    projectId?: true
    taskId?: true
    status?: true
    reviewedBy?: true
    reviewedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ManualTimeRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ManualTimeRequest to aggregate.
     */
    where?: ManualTimeRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ManualTimeRequests to fetch.
     */
    orderBy?: ManualTimeRequestOrderByWithRelationInput | ManualTimeRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ManualTimeRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ManualTimeRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ManualTimeRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ManualTimeRequests
    **/
    _count?: true | ManualTimeRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ManualTimeRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ManualTimeRequestMaxAggregateInputType
  }

  export type GetManualTimeRequestAggregateType<T extends ManualTimeRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateManualTimeRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateManualTimeRequest[P]>
      : GetScalarType<T[P], AggregateManualTimeRequest[P]>
  }




  export type ManualTimeRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ManualTimeRequestWhereInput
    orderBy?: ManualTimeRequestOrderByWithAggregationInput | ManualTimeRequestOrderByWithAggregationInput[]
    by: ManualTimeRequestScalarFieldEnum[] | ManualTimeRequestScalarFieldEnum
    having?: ManualTimeRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ManualTimeRequestCountAggregateInputType | true
    _min?: ManualTimeRequestMinAggregateInputType
    _max?: ManualTimeRequestMaxAggregateInputType
  }

  export type ManualTimeRequestGroupByOutputType = {
    id: string
    userId: string
    companyId: string
    startAt: Date
    endAt: Date
    note: string
    projectId: string | null
    taskId: string | null
    status: string
    reviewedBy: string | null
    reviewedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: ManualTimeRequestCountAggregateOutputType | null
    _min: ManualTimeRequestMinAggregateOutputType | null
    _max: ManualTimeRequestMaxAggregateOutputType | null
  }

  type GetManualTimeRequestGroupByPayload<T extends ManualTimeRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ManualTimeRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ManualTimeRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ManualTimeRequestGroupByOutputType[P]>
            : GetScalarType<T[P], ManualTimeRequestGroupByOutputType[P]>
        }
      >
    >


  export type ManualTimeRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    companyId?: boolean
    startAt?: boolean
    endAt?: boolean
    note?: boolean
    projectId?: boolean
    taskId?: boolean
    status?: boolean
    reviewedBy?: boolean
    reviewedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | ManualTimeRequest$projectArgs<ExtArgs>
    task?: boolean | ManualTimeRequest$taskArgs<ExtArgs>
  }, ExtArgs["result"]["manualTimeRequest"]>

  export type ManualTimeRequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    companyId?: boolean
    startAt?: boolean
    endAt?: boolean
    note?: boolean
    projectId?: boolean
    taskId?: boolean
    status?: boolean
    reviewedBy?: boolean
    reviewedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | ManualTimeRequest$projectArgs<ExtArgs>
    task?: boolean | ManualTimeRequest$taskArgs<ExtArgs>
  }, ExtArgs["result"]["manualTimeRequest"]>

  export type ManualTimeRequestSelectScalar = {
    id?: boolean
    userId?: boolean
    companyId?: boolean
    startAt?: boolean
    endAt?: boolean
    note?: boolean
    projectId?: boolean
    taskId?: boolean
    status?: boolean
    reviewedBy?: boolean
    reviewedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ManualTimeRequestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | ManualTimeRequest$projectArgs<ExtArgs>
    task?: boolean | ManualTimeRequest$taskArgs<ExtArgs>
  }
  export type ManualTimeRequestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | ManualTimeRequest$projectArgs<ExtArgs>
    task?: boolean | ManualTimeRequest$taskArgs<ExtArgs>
  }

  export type $ManualTimeRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ManualTimeRequest"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      project: Prisma.$ProjectPayload<ExtArgs> | null
      task: Prisma.$TaskPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      companyId: string
      startAt: Date
      endAt: Date
      note: string
      projectId: string | null
      taskId: string | null
      status: string
      reviewedBy: string | null
      reviewedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["manualTimeRequest"]>
    composites: {}
  }

  type ManualTimeRequestGetPayload<S extends boolean | null | undefined | ManualTimeRequestDefaultArgs> = $Result.GetResult<Prisma.$ManualTimeRequestPayload, S>

  type ManualTimeRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ManualTimeRequestFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ManualTimeRequestCountAggregateInputType | true
    }

  export interface ManualTimeRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ManualTimeRequest'], meta: { name: 'ManualTimeRequest' } }
    /**
     * Find zero or one ManualTimeRequest that matches the filter.
     * @param {ManualTimeRequestFindUniqueArgs} args - Arguments to find a ManualTimeRequest
     * @example
     * // Get one ManualTimeRequest
     * const manualTimeRequest = await prisma.manualTimeRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ManualTimeRequestFindUniqueArgs>(args: SelectSubset<T, ManualTimeRequestFindUniqueArgs<ExtArgs>>): Prisma__ManualTimeRequestClient<$Result.GetResult<Prisma.$ManualTimeRequestPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ManualTimeRequest that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ManualTimeRequestFindUniqueOrThrowArgs} args - Arguments to find a ManualTimeRequest
     * @example
     * // Get one ManualTimeRequest
     * const manualTimeRequest = await prisma.manualTimeRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ManualTimeRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, ManualTimeRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ManualTimeRequestClient<$Result.GetResult<Prisma.$ManualTimeRequestPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ManualTimeRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManualTimeRequestFindFirstArgs} args - Arguments to find a ManualTimeRequest
     * @example
     * // Get one ManualTimeRequest
     * const manualTimeRequest = await prisma.manualTimeRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ManualTimeRequestFindFirstArgs>(args?: SelectSubset<T, ManualTimeRequestFindFirstArgs<ExtArgs>>): Prisma__ManualTimeRequestClient<$Result.GetResult<Prisma.$ManualTimeRequestPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ManualTimeRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManualTimeRequestFindFirstOrThrowArgs} args - Arguments to find a ManualTimeRequest
     * @example
     * // Get one ManualTimeRequest
     * const manualTimeRequest = await prisma.manualTimeRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ManualTimeRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, ManualTimeRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__ManualTimeRequestClient<$Result.GetResult<Prisma.$ManualTimeRequestPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ManualTimeRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManualTimeRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ManualTimeRequests
     * const manualTimeRequests = await prisma.manualTimeRequest.findMany()
     * 
     * // Get first 10 ManualTimeRequests
     * const manualTimeRequests = await prisma.manualTimeRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const manualTimeRequestWithIdOnly = await prisma.manualTimeRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ManualTimeRequestFindManyArgs>(args?: SelectSubset<T, ManualTimeRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ManualTimeRequestPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ManualTimeRequest.
     * @param {ManualTimeRequestCreateArgs} args - Arguments to create a ManualTimeRequest.
     * @example
     * // Create one ManualTimeRequest
     * const ManualTimeRequest = await prisma.manualTimeRequest.create({
     *   data: {
     *     // ... data to create a ManualTimeRequest
     *   }
     * })
     * 
     */
    create<T extends ManualTimeRequestCreateArgs>(args: SelectSubset<T, ManualTimeRequestCreateArgs<ExtArgs>>): Prisma__ManualTimeRequestClient<$Result.GetResult<Prisma.$ManualTimeRequestPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ManualTimeRequests.
     * @param {ManualTimeRequestCreateManyArgs} args - Arguments to create many ManualTimeRequests.
     * @example
     * // Create many ManualTimeRequests
     * const manualTimeRequest = await prisma.manualTimeRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ManualTimeRequestCreateManyArgs>(args?: SelectSubset<T, ManualTimeRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ManualTimeRequests and returns the data saved in the database.
     * @param {ManualTimeRequestCreateManyAndReturnArgs} args - Arguments to create many ManualTimeRequests.
     * @example
     * // Create many ManualTimeRequests
     * const manualTimeRequest = await prisma.manualTimeRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ManualTimeRequests and only return the `id`
     * const manualTimeRequestWithIdOnly = await prisma.manualTimeRequest.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ManualTimeRequestCreateManyAndReturnArgs>(args?: SelectSubset<T, ManualTimeRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ManualTimeRequestPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ManualTimeRequest.
     * @param {ManualTimeRequestDeleteArgs} args - Arguments to delete one ManualTimeRequest.
     * @example
     * // Delete one ManualTimeRequest
     * const ManualTimeRequest = await prisma.manualTimeRequest.delete({
     *   where: {
     *     // ... filter to delete one ManualTimeRequest
     *   }
     * })
     * 
     */
    delete<T extends ManualTimeRequestDeleteArgs>(args: SelectSubset<T, ManualTimeRequestDeleteArgs<ExtArgs>>): Prisma__ManualTimeRequestClient<$Result.GetResult<Prisma.$ManualTimeRequestPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ManualTimeRequest.
     * @param {ManualTimeRequestUpdateArgs} args - Arguments to update one ManualTimeRequest.
     * @example
     * // Update one ManualTimeRequest
     * const manualTimeRequest = await prisma.manualTimeRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ManualTimeRequestUpdateArgs>(args: SelectSubset<T, ManualTimeRequestUpdateArgs<ExtArgs>>): Prisma__ManualTimeRequestClient<$Result.GetResult<Prisma.$ManualTimeRequestPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ManualTimeRequests.
     * @param {ManualTimeRequestDeleteManyArgs} args - Arguments to filter ManualTimeRequests to delete.
     * @example
     * // Delete a few ManualTimeRequests
     * const { count } = await prisma.manualTimeRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ManualTimeRequestDeleteManyArgs>(args?: SelectSubset<T, ManualTimeRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ManualTimeRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManualTimeRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ManualTimeRequests
     * const manualTimeRequest = await prisma.manualTimeRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ManualTimeRequestUpdateManyArgs>(args: SelectSubset<T, ManualTimeRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ManualTimeRequest.
     * @param {ManualTimeRequestUpsertArgs} args - Arguments to update or create a ManualTimeRequest.
     * @example
     * // Update or create a ManualTimeRequest
     * const manualTimeRequest = await prisma.manualTimeRequest.upsert({
     *   create: {
     *     // ... data to create a ManualTimeRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ManualTimeRequest we want to update
     *   }
     * })
     */
    upsert<T extends ManualTimeRequestUpsertArgs>(args: SelectSubset<T, ManualTimeRequestUpsertArgs<ExtArgs>>): Prisma__ManualTimeRequestClient<$Result.GetResult<Prisma.$ManualTimeRequestPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ManualTimeRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManualTimeRequestCountArgs} args - Arguments to filter ManualTimeRequests to count.
     * @example
     * // Count the number of ManualTimeRequests
     * const count = await prisma.manualTimeRequest.count({
     *   where: {
     *     // ... the filter for the ManualTimeRequests we want to count
     *   }
     * })
    **/
    count<T extends ManualTimeRequestCountArgs>(
      args?: Subset<T, ManualTimeRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ManualTimeRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ManualTimeRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManualTimeRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ManualTimeRequestAggregateArgs>(args: Subset<T, ManualTimeRequestAggregateArgs>): Prisma.PrismaPromise<GetManualTimeRequestAggregateType<T>>

    /**
     * Group by ManualTimeRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManualTimeRequestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ManualTimeRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ManualTimeRequestGroupByArgs['orderBy'] }
        : { orderBy?: ManualTimeRequestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ManualTimeRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetManualTimeRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ManualTimeRequest model
   */
  readonly fields: ManualTimeRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ManualTimeRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ManualTimeRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    project<T extends ManualTimeRequest$projectArgs<ExtArgs> = {}>(args?: Subset<T, ManualTimeRequest$projectArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    task<T extends ManualTimeRequest$taskArgs<ExtArgs> = {}>(args?: Subset<T, ManualTimeRequest$taskArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ManualTimeRequest model
   */ 
  interface ManualTimeRequestFieldRefs {
    readonly id: FieldRef<"ManualTimeRequest", 'String'>
    readonly userId: FieldRef<"ManualTimeRequest", 'String'>
    readonly companyId: FieldRef<"ManualTimeRequest", 'String'>
    readonly startAt: FieldRef<"ManualTimeRequest", 'DateTime'>
    readonly endAt: FieldRef<"ManualTimeRequest", 'DateTime'>
    readonly note: FieldRef<"ManualTimeRequest", 'String'>
    readonly projectId: FieldRef<"ManualTimeRequest", 'String'>
    readonly taskId: FieldRef<"ManualTimeRequest", 'String'>
    readonly status: FieldRef<"ManualTimeRequest", 'String'>
    readonly reviewedBy: FieldRef<"ManualTimeRequest", 'String'>
    readonly reviewedAt: FieldRef<"ManualTimeRequest", 'DateTime'>
    readonly createdAt: FieldRef<"ManualTimeRequest", 'DateTime'>
    readonly updatedAt: FieldRef<"ManualTimeRequest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ManualTimeRequest findUnique
   */
  export type ManualTimeRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ManualTimeRequest
     */
    select?: ManualTimeRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManualTimeRequestInclude<ExtArgs> | null
    /**
     * Filter, which ManualTimeRequest to fetch.
     */
    where: ManualTimeRequestWhereUniqueInput
  }

  /**
   * ManualTimeRequest findUniqueOrThrow
   */
  export type ManualTimeRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ManualTimeRequest
     */
    select?: ManualTimeRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManualTimeRequestInclude<ExtArgs> | null
    /**
     * Filter, which ManualTimeRequest to fetch.
     */
    where: ManualTimeRequestWhereUniqueInput
  }

  /**
   * ManualTimeRequest findFirst
   */
  export type ManualTimeRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ManualTimeRequest
     */
    select?: ManualTimeRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManualTimeRequestInclude<ExtArgs> | null
    /**
     * Filter, which ManualTimeRequest to fetch.
     */
    where?: ManualTimeRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ManualTimeRequests to fetch.
     */
    orderBy?: ManualTimeRequestOrderByWithRelationInput | ManualTimeRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ManualTimeRequests.
     */
    cursor?: ManualTimeRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ManualTimeRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ManualTimeRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ManualTimeRequests.
     */
    distinct?: ManualTimeRequestScalarFieldEnum | ManualTimeRequestScalarFieldEnum[]
  }

  /**
   * ManualTimeRequest findFirstOrThrow
   */
  export type ManualTimeRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ManualTimeRequest
     */
    select?: ManualTimeRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManualTimeRequestInclude<ExtArgs> | null
    /**
     * Filter, which ManualTimeRequest to fetch.
     */
    where?: ManualTimeRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ManualTimeRequests to fetch.
     */
    orderBy?: ManualTimeRequestOrderByWithRelationInput | ManualTimeRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ManualTimeRequests.
     */
    cursor?: ManualTimeRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ManualTimeRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ManualTimeRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ManualTimeRequests.
     */
    distinct?: ManualTimeRequestScalarFieldEnum | ManualTimeRequestScalarFieldEnum[]
  }

  /**
   * ManualTimeRequest findMany
   */
  export type ManualTimeRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ManualTimeRequest
     */
    select?: ManualTimeRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManualTimeRequestInclude<ExtArgs> | null
    /**
     * Filter, which ManualTimeRequests to fetch.
     */
    where?: ManualTimeRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ManualTimeRequests to fetch.
     */
    orderBy?: ManualTimeRequestOrderByWithRelationInput | ManualTimeRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ManualTimeRequests.
     */
    cursor?: ManualTimeRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ManualTimeRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ManualTimeRequests.
     */
    skip?: number
    distinct?: ManualTimeRequestScalarFieldEnum | ManualTimeRequestScalarFieldEnum[]
  }

  /**
   * ManualTimeRequest create
   */
  export type ManualTimeRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ManualTimeRequest
     */
    select?: ManualTimeRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManualTimeRequestInclude<ExtArgs> | null
    /**
     * The data needed to create a ManualTimeRequest.
     */
    data: XOR<ManualTimeRequestCreateInput, ManualTimeRequestUncheckedCreateInput>
  }

  /**
   * ManualTimeRequest createMany
   */
  export type ManualTimeRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ManualTimeRequests.
     */
    data: ManualTimeRequestCreateManyInput | ManualTimeRequestCreateManyInput[]
  }

  /**
   * ManualTimeRequest createManyAndReturn
   */
  export type ManualTimeRequestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ManualTimeRequest
     */
    select?: ManualTimeRequestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ManualTimeRequests.
     */
    data: ManualTimeRequestCreateManyInput | ManualTimeRequestCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManualTimeRequestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ManualTimeRequest update
   */
  export type ManualTimeRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ManualTimeRequest
     */
    select?: ManualTimeRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManualTimeRequestInclude<ExtArgs> | null
    /**
     * The data needed to update a ManualTimeRequest.
     */
    data: XOR<ManualTimeRequestUpdateInput, ManualTimeRequestUncheckedUpdateInput>
    /**
     * Choose, which ManualTimeRequest to update.
     */
    where: ManualTimeRequestWhereUniqueInput
  }

  /**
   * ManualTimeRequest updateMany
   */
  export type ManualTimeRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ManualTimeRequests.
     */
    data: XOR<ManualTimeRequestUpdateManyMutationInput, ManualTimeRequestUncheckedUpdateManyInput>
    /**
     * Filter which ManualTimeRequests to update
     */
    where?: ManualTimeRequestWhereInput
  }

  /**
   * ManualTimeRequest upsert
   */
  export type ManualTimeRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ManualTimeRequest
     */
    select?: ManualTimeRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManualTimeRequestInclude<ExtArgs> | null
    /**
     * The filter to search for the ManualTimeRequest to update in case it exists.
     */
    where: ManualTimeRequestWhereUniqueInput
    /**
     * In case the ManualTimeRequest found by the `where` argument doesn't exist, create a new ManualTimeRequest with this data.
     */
    create: XOR<ManualTimeRequestCreateInput, ManualTimeRequestUncheckedCreateInput>
    /**
     * In case the ManualTimeRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ManualTimeRequestUpdateInput, ManualTimeRequestUncheckedUpdateInput>
  }

  /**
   * ManualTimeRequest delete
   */
  export type ManualTimeRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ManualTimeRequest
     */
    select?: ManualTimeRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManualTimeRequestInclude<ExtArgs> | null
    /**
     * Filter which ManualTimeRequest to delete.
     */
    where: ManualTimeRequestWhereUniqueInput
  }

  /**
   * ManualTimeRequest deleteMany
   */
  export type ManualTimeRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ManualTimeRequests to delete
     */
    where?: ManualTimeRequestWhereInput
  }

  /**
   * ManualTimeRequest.project
   */
  export type ManualTimeRequest$projectArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    where?: ProjectWhereInput
  }

  /**
   * ManualTimeRequest.task
   */
  export type ManualTimeRequest$taskArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
  }

  /**
   * ManualTimeRequest without action
   */
  export type ManualTimeRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ManualTimeRequest
     */
    select?: ManualTimeRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManualTimeRequestInclude<ExtArgs> | null
  }


  /**
   * Model Alert
   */

  export type AggregateAlert = {
    _count: AlertCountAggregateOutputType | null
    _min: AlertMinAggregateOutputType | null
    _max: AlertMaxAggregateOutputType | null
  }

  export type AlertMinAggregateOutputType = {
    id: string | null
    companyId: string | null
    userId: string | null
    type: string | null
    severity: string | null
    message: string | null
    metadata: string | null
    createdAt: Date | null
    readAt: Date | null
  }

  export type AlertMaxAggregateOutputType = {
    id: string | null
    companyId: string | null
    userId: string | null
    type: string | null
    severity: string | null
    message: string | null
    metadata: string | null
    createdAt: Date | null
    readAt: Date | null
  }

  export type AlertCountAggregateOutputType = {
    id: number
    companyId: number
    userId: number
    type: number
    severity: number
    message: number
    metadata: number
    createdAt: number
    readAt: number
    _all: number
  }


  export type AlertMinAggregateInputType = {
    id?: true
    companyId?: true
    userId?: true
    type?: true
    severity?: true
    message?: true
    metadata?: true
    createdAt?: true
    readAt?: true
  }

  export type AlertMaxAggregateInputType = {
    id?: true
    companyId?: true
    userId?: true
    type?: true
    severity?: true
    message?: true
    metadata?: true
    createdAt?: true
    readAt?: true
  }

  export type AlertCountAggregateInputType = {
    id?: true
    companyId?: true
    userId?: true
    type?: true
    severity?: true
    message?: true
    metadata?: true
    createdAt?: true
    readAt?: true
    _all?: true
  }

  export type AlertAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Alert to aggregate.
     */
    where?: AlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Alerts to fetch.
     */
    orderBy?: AlertOrderByWithRelationInput | AlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Alerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Alerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Alerts
    **/
    _count?: true | AlertCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AlertMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AlertMaxAggregateInputType
  }

  export type GetAlertAggregateType<T extends AlertAggregateArgs> = {
        [P in keyof T & keyof AggregateAlert]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAlert[P]>
      : GetScalarType<T[P], AggregateAlert[P]>
  }




  export type AlertGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AlertWhereInput
    orderBy?: AlertOrderByWithAggregationInput | AlertOrderByWithAggregationInput[]
    by: AlertScalarFieldEnum[] | AlertScalarFieldEnum
    having?: AlertScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AlertCountAggregateInputType | true
    _min?: AlertMinAggregateInputType
    _max?: AlertMaxAggregateInputType
  }

  export type AlertGroupByOutputType = {
    id: string
    companyId: string
    userId: string | null
    type: string
    severity: string
    message: string
    metadata: string | null
    createdAt: Date
    readAt: Date | null
    _count: AlertCountAggregateOutputType | null
    _min: AlertMinAggregateOutputType | null
    _max: AlertMaxAggregateOutputType | null
  }

  type GetAlertGroupByPayload<T extends AlertGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AlertGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AlertGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AlertGroupByOutputType[P]>
            : GetScalarType<T[P], AlertGroupByOutputType[P]>
        }
      >
    >


  export type AlertSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    userId?: boolean
    type?: boolean
    severity?: boolean
    message?: boolean
    metadata?: boolean
    createdAt?: boolean
    readAt?: boolean
    user?: boolean | Alert$userArgs<ExtArgs>
  }, ExtArgs["result"]["alert"]>

  export type AlertSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    userId?: boolean
    type?: boolean
    severity?: boolean
    message?: boolean
    metadata?: boolean
    createdAt?: boolean
    readAt?: boolean
    user?: boolean | Alert$userArgs<ExtArgs>
  }, ExtArgs["result"]["alert"]>

  export type AlertSelectScalar = {
    id?: boolean
    companyId?: boolean
    userId?: boolean
    type?: boolean
    severity?: boolean
    message?: boolean
    metadata?: boolean
    createdAt?: boolean
    readAt?: boolean
  }

  export type AlertInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Alert$userArgs<ExtArgs>
  }
  export type AlertIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Alert$userArgs<ExtArgs>
  }

  export type $AlertPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Alert"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      companyId: string
      userId: string | null
      type: string
      severity: string
      message: string
      metadata: string | null
      createdAt: Date
      readAt: Date | null
    }, ExtArgs["result"]["alert"]>
    composites: {}
  }

  type AlertGetPayload<S extends boolean | null | undefined | AlertDefaultArgs> = $Result.GetResult<Prisma.$AlertPayload, S>

  type AlertCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AlertFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AlertCountAggregateInputType | true
    }

  export interface AlertDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Alert'], meta: { name: 'Alert' } }
    /**
     * Find zero or one Alert that matches the filter.
     * @param {AlertFindUniqueArgs} args - Arguments to find a Alert
     * @example
     * // Get one Alert
     * const alert = await prisma.alert.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AlertFindUniqueArgs>(args: SelectSubset<T, AlertFindUniqueArgs<ExtArgs>>): Prisma__AlertClient<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Alert that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AlertFindUniqueOrThrowArgs} args - Arguments to find a Alert
     * @example
     * // Get one Alert
     * const alert = await prisma.alert.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AlertFindUniqueOrThrowArgs>(args: SelectSubset<T, AlertFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AlertClient<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Alert that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertFindFirstArgs} args - Arguments to find a Alert
     * @example
     * // Get one Alert
     * const alert = await prisma.alert.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AlertFindFirstArgs>(args?: SelectSubset<T, AlertFindFirstArgs<ExtArgs>>): Prisma__AlertClient<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Alert that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertFindFirstOrThrowArgs} args - Arguments to find a Alert
     * @example
     * // Get one Alert
     * const alert = await prisma.alert.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AlertFindFirstOrThrowArgs>(args?: SelectSubset<T, AlertFindFirstOrThrowArgs<ExtArgs>>): Prisma__AlertClient<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Alerts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Alerts
     * const alerts = await prisma.alert.findMany()
     * 
     * // Get first 10 Alerts
     * const alerts = await prisma.alert.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const alertWithIdOnly = await prisma.alert.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AlertFindManyArgs>(args?: SelectSubset<T, AlertFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Alert.
     * @param {AlertCreateArgs} args - Arguments to create a Alert.
     * @example
     * // Create one Alert
     * const Alert = await prisma.alert.create({
     *   data: {
     *     // ... data to create a Alert
     *   }
     * })
     * 
     */
    create<T extends AlertCreateArgs>(args: SelectSubset<T, AlertCreateArgs<ExtArgs>>): Prisma__AlertClient<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Alerts.
     * @param {AlertCreateManyArgs} args - Arguments to create many Alerts.
     * @example
     * // Create many Alerts
     * const alert = await prisma.alert.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AlertCreateManyArgs>(args?: SelectSubset<T, AlertCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Alerts and returns the data saved in the database.
     * @param {AlertCreateManyAndReturnArgs} args - Arguments to create many Alerts.
     * @example
     * // Create many Alerts
     * const alert = await prisma.alert.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Alerts and only return the `id`
     * const alertWithIdOnly = await prisma.alert.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AlertCreateManyAndReturnArgs>(args?: SelectSubset<T, AlertCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Alert.
     * @param {AlertDeleteArgs} args - Arguments to delete one Alert.
     * @example
     * // Delete one Alert
     * const Alert = await prisma.alert.delete({
     *   where: {
     *     // ... filter to delete one Alert
     *   }
     * })
     * 
     */
    delete<T extends AlertDeleteArgs>(args: SelectSubset<T, AlertDeleteArgs<ExtArgs>>): Prisma__AlertClient<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Alert.
     * @param {AlertUpdateArgs} args - Arguments to update one Alert.
     * @example
     * // Update one Alert
     * const alert = await prisma.alert.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AlertUpdateArgs>(args: SelectSubset<T, AlertUpdateArgs<ExtArgs>>): Prisma__AlertClient<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Alerts.
     * @param {AlertDeleteManyArgs} args - Arguments to filter Alerts to delete.
     * @example
     * // Delete a few Alerts
     * const { count } = await prisma.alert.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AlertDeleteManyArgs>(args?: SelectSubset<T, AlertDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Alerts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Alerts
     * const alert = await prisma.alert.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AlertUpdateManyArgs>(args: SelectSubset<T, AlertUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Alert.
     * @param {AlertUpsertArgs} args - Arguments to update or create a Alert.
     * @example
     * // Update or create a Alert
     * const alert = await prisma.alert.upsert({
     *   create: {
     *     // ... data to create a Alert
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Alert we want to update
     *   }
     * })
     */
    upsert<T extends AlertUpsertArgs>(args: SelectSubset<T, AlertUpsertArgs<ExtArgs>>): Prisma__AlertClient<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Alerts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertCountArgs} args - Arguments to filter Alerts to count.
     * @example
     * // Count the number of Alerts
     * const count = await prisma.alert.count({
     *   where: {
     *     // ... the filter for the Alerts we want to count
     *   }
     * })
    **/
    count<T extends AlertCountArgs>(
      args?: Subset<T, AlertCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AlertCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Alert.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AlertAggregateArgs>(args: Subset<T, AlertAggregateArgs>): Prisma.PrismaPromise<GetAlertAggregateType<T>>

    /**
     * Group by Alert.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AlertGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AlertGroupByArgs['orderBy'] }
        : { orderBy?: AlertGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AlertGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAlertGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Alert model
   */
  readonly fields: AlertFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Alert.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AlertClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends Alert$userArgs<ExtArgs> = {}>(args?: Subset<T, Alert$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Alert model
   */ 
  interface AlertFieldRefs {
    readonly id: FieldRef<"Alert", 'String'>
    readonly companyId: FieldRef<"Alert", 'String'>
    readonly userId: FieldRef<"Alert", 'String'>
    readonly type: FieldRef<"Alert", 'String'>
    readonly severity: FieldRef<"Alert", 'String'>
    readonly message: FieldRef<"Alert", 'String'>
    readonly metadata: FieldRef<"Alert", 'String'>
    readonly createdAt: FieldRef<"Alert", 'DateTime'>
    readonly readAt: FieldRef<"Alert", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Alert findUnique
   */
  export type AlertFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertInclude<ExtArgs> | null
    /**
     * Filter, which Alert to fetch.
     */
    where: AlertWhereUniqueInput
  }

  /**
   * Alert findUniqueOrThrow
   */
  export type AlertFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertInclude<ExtArgs> | null
    /**
     * Filter, which Alert to fetch.
     */
    where: AlertWhereUniqueInput
  }

  /**
   * Alert findFirst
   */
  export type AlertFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertInclude<ExtArgs> | null
    /**
     * Filter, which Alert to fetch.
     */
    where?: AlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Alerts to fetch.
     */
    orderBy?: AlertOrderByWithRelationInput | AlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Alerts.
     */
    cursor?: AlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Alerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Alerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Alerts.
     */
    distinct?: AlertScalarFieldEnum | AlertScalarFieldEnum[]
  }

  /**
   * Alert findFirstOrThrow
   */
  export type AlertFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertInclude<ExtArgs> | null
    /**
     * Filter, which Alert to fetch.
     */
    where?: AlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Alerts to fetch.
     */
    orderBy?: AlertOrderByWithRelationInput | AlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Alerts.
     */
    cursor?: AlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Alerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Alerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Alerts.
     */
    distinct?: AlertScalarFieldEnum | AlertScalarFieldEnum[]
  }

  /**
   * Alert findMany
   */
  export type AlertFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertInclude<ExtArgs> | null
    /**
     * Filter, which Alerts to fetch.
     */
    where?: AlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Alerts to fetch.
     */
    orderBy?: AlertOrderByWithRelationInput | AlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Alerts.
     */
    cursor?: AlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Alerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Alerts.
     */
    skip?: number
    distinct?: AlertScalarFieldEnum | AlertScalarFieldEnum[]
  }

  /**
   * Alert create
   */
  export type AlertCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertInclude<ExtArgs> | null
    /**
     * The data needed to create a Alert.
     */
    data: XOR<AlertCreateInput, AlertUncheckedCreateInput>
  }

  /**
   * Alert createMany
   */
  export type AlertCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Alerts.
     */
    data: AlertCreateManyInput | AlertCreateManyInput[]
  }

  /**
   * Alert createManyAndReturn
   */
  export type AlertCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Alerts.
     */
    data: AlertCreateManyInput | AlertCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Alert update
   */
  export type AlertUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertInclude<ExtArgs> | null
    /**
     * The data needed to update a Alert.
     */
    data: XOR<AlertUpdateInput, AlertUncheckedUpdateInput>
    /**
     * Choose, which Alert to update.
     */
    where: AlertWhereUniqueInput
  }

  /**
   * Alert updateMany
   */
  export type AlertUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Alerts.
     */
    data: XOR<AlertUpdateManyMutationInput, AlertUncheckedUpdateManyInput>
    /**
     * Filter which Alerts to update
     */
    where?: AlertWhereInput
  }

  /**
   * Alert upsert
   */
  export type AlertUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertInclude<ExtArgs> | null
    /**
     * The filter to search for the Alert to update in case it exists.
     */
    where: AlertWhereUniqueInput
    /**
     * In case the Alert found by the `where` argument doesn't exist, create a new Alert with this data.
     */
    create: XOR<AlertCreateInput, AlertUncheckedCreateInput>
    /**
     * In case the Alert was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AlertUpdateInput, AlertUncheckedUpdateInput>
  }

  /**
   * Alert delete
   */
  export type AlertDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertInclude<ExtArgs> | null
    /**
     * Filter which Alert to delete.
     */
    where: AlertWhereUniqueInput
  }

  /**
   * Alert deleteMany
   */
  export type AlertDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Alerts to delete
     */
    where?: AlertWhereInput
  }

  /**
   * Alert.user
   */
  export type Alert$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Alert without action
   */
  export type AlertDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertInclude<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: string | null
    companyId: string | null
    actorUserId: string | null
    action: string | null
    entityType: string | null
    entityId: string | null
    details: string | null
    createdAt: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    companyId: string | null
    actorUserId: string | null
    action: string | null
    entityType: string | null
    entityId: string | null
    details: string | null
    createdAt: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    companyId: number
    actorUserId: number
    action: number
    entityType: number
    entityId: number
    details: number
    createdAt: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    id?: true
    companyId?: true
    actorUserId?: true
    action?: true
    entityType?: true
    entityId?: true
    details?: true
    createdAt?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    companyId?: true
    actorUserId?: true
    action?: true
    entityType?: true
    entityId?: true
    details?: true
    createdAt?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    companyId?: true
    actorUserId?: true
    action?: true
    entityType?: true
    entityId?: true
    details?: true
    createdAt?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: string
    companyId: string
    actorUserId: string | null
    action: string
    entityType: string
    entityId: string | null
    details: string | null
    createdAt: Date
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    actorUserId?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    details?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    actorUserId?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    details?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    companyId?: boolean
    actorUserId?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    details?: boolean
    createdAt?: boolean
  }


  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      companyId: string
      actorUserId: string | null
      action: string
      entityType: string
      entityId: string | null
      details: string | null
      createdAt: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditLog model
   */ 
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'String'>
    readonly companyId: FieldRef<"AuditLog", 'String'>
    readonly actorUserId: FieldRef<"AuditLog", 'String'>
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly entityType: FieldRef<"AuditLog", 'String'>
    readonly entityId: FieldRef<"AuditLog", 'String'>
    readonly details: FieldRef<"AuditLog", 'String'>
    readonly createdAt: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
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

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const WorkReportScalarFieldEnum: {
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

  export type WorkReportScalarFieldEnum = (typeof WorkReportScalarFieldEnum)[keyof typeof WorkReportScalarFieldEnum]


  export const ActivityLogScalarFieldEnum: {
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

  export type ActivityLogScalarFieldEnum = (typeof ActivityLogScalarFieldEnum)[keyof typeof ActivityLogScalarFieldEnum]


  export const ScreenshotScalarFieldEnum: {
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

  export type ScreenshotScalarFieldEnum = (typeof ScreenshotScalarFieldEnum)[keyof typeof ScreenshotScalarFieldEnum]


  export const TrackingSessionScalarFieldEnum: {
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

  export type TrackingSessionScalarFieldEnum = (typeof TrackingSessionScalarFieldEnum)[keyof typeof TrackingSessionScalarFieldEnum]


  export const ProjectScalarFieldEnum: {
    id: 'id',
    companyId: 'companyId',
    name: 'name',
    code: 'code',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProjectScalarFieldEnum = (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum]


  export const TaskScalarFieldEnum: {
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

  export type TaskScalarFieldEnum = (typeof TaskScalarFieldEnum)[keyof typeof TaskScalarFieldEnum]


  export const ProductivityRuleScalarFieldEnum: {
    id: 'id',
    companyId: 'companyId',
    pattern: 'pattern',
    matchType: 'matchType',
    category: 'category',
    createdAt: 'createdAt'
  };

  export type ProductivityRuleScalarFieldEnum = (typeof ProductivityRuleScalarFieldEnum)[keyof typeof ProductivityRuleScalarFieldEnum]


  export const ManualTimeRequestScalarFieldEnum: {
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

  export type ManualTimeRequestScalarFieldEnum = (typeof ManualTimeRequestScalarFieldEnum)[keyof typeof ManualTimeRequestScalarFieldEnum]


  export const AlertScalarFieldEnum: {
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

  export type AlertScalarFieldEnum = (typeof AlertScalarFieldEnum)[keyof typeof AlertScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    companyId: 'companyId',
    actorUserId: 'actorUserId',
    action: 'action',
    entityType: 'entityType',
    entityId: 'entityId',
    details: 'details',
    createdAt: 'createdAt'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    companyId?: StringNullableFilter<"User"> | string | null
    screenshotInterval?: IntFilter<"User"> | number
    idleLimitMinutes?: IntFilter<"User"> | number
    timezone?: StringFilter<"User"> | string
    workDays?: StringFilter<"User"> | string
    shiftStartMinutes?: IntFilter<"User"> | number
    shiftEndMinutes?: IntFilter<"User"> | number
    targetMinutes?: IntFilter<"User"> | number
    maxShiftMinutes?: IntFilter<"User"> | number
    maxBreakMinutes?: IntFilter<"User"> | number
    screenshotRetentionDays?: IntFilter<"User"> | number
    manualTimeRequiresApproval?: BoolFilter<"User"> | boolean
    resetCode?: StringNullableFilter<"User"> | string | null
    resetExpires?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    activities?: ActivityLogListRelationFilter
    screenshots?: ScreenshotListRelationFilter
    workReports?: WorkReportListRelationFilter
    trackingSessions?: TrackingSessionListRelationFilter
    manualTimeRequests?: ManualTimeRequestListRelationFilter
    assignedTasks?: TaskListRelationFilter
    alerts?: AlertListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    role?: SortOrder
    companyId?: SortOrderInput | SortOrder
    screenshotInterval?: SortOrder
    idleLimitMinutes?: SortOrder
    timezone?: SortOrder
    workDays?: SortOrder
    shiftStartMinutes?: SortOrder
    shiftEndMinutes?: SortOrder
    targetMinutes?: SortOrder
    maxShiftMinutes?: SortOrder
    maxBreakMinutes?: SortOrder
    screenshotRetentionDays?: SortOrder
    manualTimeRequiresApproval?: SortOrder
    resetCode?: SortOrderInput | SortOrder
    resetExpires?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    activities?: ActivityLogOrderByRelationAggregateInput
    screenshots?: ScreenshotOrderByRelationAggregateInput
    workReports?: WorkReportOrderByRelationAggregateInput
    trackingSessions?: TrackingSessionOrderByRelationAggregateInput
    manualTimeRequests?: ManualTimeRequestOrderByRelationAggregateInput
    assignedTasks?: TaskOrderByRelationAggregateInput
    alerts?: AlertOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    companyId?: StringNullableFilter<"User"> | string | null
    screenshotInterval?: IntFilter<"User"> | number
    idleLimitMinutes?: IntFilter<"User"> | number
    timezone?: StringFilter<"User"> | string
    workDays?: StringFilter<"User"> | string
    shiftStartMinutes?: IntFilter<"User"> | number
    shiftEndMinutes?: IntFilter<"User"> | number
    targetMinutes?: IntFilter<"User"> | number
    maxShiftMinutes?: IntFilter<"User"> | number
    maxBreakMinutes?: IntFilter<"User"> | number
    screenshotRetentionDays?: IntFilter<"User"> | number
    manualTimeRequiresApproval?: BoolFilter<"User"> | boolean
    resetCode?: StringNullableFilter<"User"> | string | null
    resetExpires?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    activities?: ActivityLogListRelationFilter
    screenshots?: ScreenshotListRelationFilter
    workReports?: WorkReportListRelationFilter
    trackingSessions?: TrackingSessionListRelationFilter
    manualTimeRequests?: ManualTimeRequestListRelationFilter
    assignedTasks?: TaskListRelationFilter
    alerts?: AlertListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    role?: SortOrder
    companyId?: SortOrderInput | SortOrder
    screenshotInterval?: SortOrder
    idleLimitMinutes?: SortOrder
    timezone?: SortOrder
    workDays?: SortOrder
    shiftStartMinutes?: SortOrder
    shiftEndMinutes?: SortOrder
    targetMinutes?: SortOrder
    maxShiftMinutes?: SortOrder
    maxBreakMinutes?: SortOrder
    screenshotRetentionDays?: SortOrder
    manualTimeRequiresApproval?: SortOrder
    resetCode?: SortOrderInput | SortOrder
    resetExpires?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: StringWithAggregatesFilter<"User"> | string
    companyId?: StringNullableWithAggregatesFilter<"User"> | string | null
    screenshotInterval?: IntWithAggregatesFilter<"User"> | number
    idleLimitMinutes?: IntWithAggregatesFilter<"User"> | number
    timezone?: StringWithAggregatesFilter<"User"> | string
    workDays?: StringWithAggregatesFilter<"User"> | string
    shiftStartMinutes?: IntWithAggregatesFilter<"User"> | number
    shiftEndMinutes?: IntWithAggregatesFilter<"User"> | number
    targetMinutes?: IntWithAggregatesFilter<"User"> | number
    maxShiftMinutes?: IntWithAggregatesFilter<"User"> | number
    maxBreakMinutes?: IntWithAggregatesFilter<"User"> | number
    screenshotRetentionDays?: IntWithAggregatesFilter<"User"> | number
    manualTimeRequiresApproval?: BoolWithAggregatesFilter<"User"> | boolean
    resetCode?: StringNullableWithAggregatesFilter<"User"> | string | null
    resetExpires?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type WorkReportWhereInput = {
    AND?: WorkReportWhereInput | WorkReportWhereInput[]
    OR?: WorkReportWhereInput[]
    NOT?: WorkReportWhereInput | WorkReportWhereInput[]
    id?: StringFilter<"WorkReport"> | string
    userId?: StringFilter<"WorkReport"> | string
    type?: StringFilter<"WorkReport"> | string
    note?: StringFilter<"WorkReport"> | string
    emailSent?: BoolFilter<"WorkReport"> | boolean
    createdAt?: DateTimeFilter<"WorkReport"> | Date | string
    endedAt?: DateTimeNullableFilter<"WorkReport"> | Date | string | null
    durationSeconds?: IntNullableFilter<"WorkReport"> | number | null
    clientEventId?: StringNullableFilter<"WorkReport"> | string | null
    taskId?: StringNullableFilter<"WorkReport"> | string | null
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type WorkReportOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    note?: SortOrder
    emailSent?: SortOrder
    createdAt?: SortOrder
    endedAt?: SortOrderInput | SortOrder
    durationSeconds?: SortOrderInput | SortOrder
    clientEventId?: SortOrderInput | SortOrder
    taskId?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type WorkReportWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    clientEventId?: string
    AND?: WorkReportWhereInput | WorkReportWhereInput[]
    OR?: WorkReportWhereInput[]
    NOT?: WorkReportWhereInput | WorkReportWhereInput[]
    userId?: StringFilter<"WorkReport"> | string
    type?: StringFilter<"WorkReport"> | string
    note?: StringFilter<"WorkReport"> | string
    emailSent?: BoolFilter<"WorkReport"> | boolean
    createdAt?: DateTimeFilter<"WorkReport"> | Date | string
    endedAt?: DateTimeNullableFilter<"WorkReport"> | Date | string | null
    durationSeconds?: IntNullableFilter<"WorkReport"> | number | null
    taskId?: StringNullableFilter<"WorkReport"> | string | null
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "clientEventId">

  export type WorkReportOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    note?: SortOrder
    emailSent?: SortOrder
    createdAt?: SortOrder
    endedAt?: SortOrderInput | SortOrder
    durationSeconds?: SortOrderInput | SortOrder
    clientEventId?: SortOrderInput | SortOrder
    taskId?: SortOrderInput | SortOrder
    _count?: WorkReportCountOrderByAggregateInput
    _avg?: WorkReportAvgOrderByAggregateInput
    _max?: WorkReportMaxOrderByAggregateInput
    _min?: WorkReportMinOrderByAggregateInput
    _sum?: WorkReportSumOrderByAggregateInput
  }

  export type WorkReportScalarWhereWithAggregatesInput = {
    AND?: WorkReportScalarWhereWithAggregatesInput | WorkReportScalarWhereWithAggregatesInput[]
    OR?: WorkReportScalarWhereWithAggregatesInput[]
    NOT?: WorkReportScalarWhereWithAggregatesInput | WorkReportScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WorkReport"> | string
    userId?: StringWithAggregatesFilter<"WorkReport"> | string
    type?: StringWithAggregatesFilter<"WorkReport"> | string
    note?: StringWithAggregatesFilter<"WorkReport"> | string
    emailSent?: BoolWithAggregatesFilter<"WorkReport"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"WorkReport"> | Date | string
    endedAt?: DateTimeNullableWithAggregatesFilter<"WorkReport"> | Date | string | null
    durationSeconds?: IntNullableWithAggregatesFilter<"WorkReport"> | number | null
    clientEventId?: StringNullableWithAggregatesFilter<"WorkReport"> | string | null
    taskId?: StringNullableWithAggregatesFilter<"WorkReport"> | string | null
  }

  export type ActivityLogWhereInput = {
    AND?: ActivityLogWhereInput | ActivityLogWhereInput[]
    OR?: ActivityLogWhereInput[]
    NOT?: ActivityLogWhereInput | ActivityLogWhereInput[]
    id?: StringFilter<"ActivityLog"> | string
    userId?: StringFilter<"ActivityLog"> | string
    timestamp?: DateTimeFilter<"ActivityLog"> | Date | string
    status?: StringFilter<"ActivityLog"> | string
    currentTask?: StringFilter<"ActivityLog"> | string
    appProcess?: StringNullableFilter<"ActivityLog"> | string | null
    appTitle?: StringNullableFilter<"ActivityLog"> | string | null
    keystrokes?: IntFilter<"ActivityLog"> | number
    mouseClicks?: IntFilter<"ActivityLog"> | number
    durationSeconds?: IntFilter<"ActivityLog"> | number
    idleSeconds?: IntFilter<"ActivityLog"> | number
    continuousIdleSeconds?: IntFilter<"ActivityLog"> | number
    clientEventId?: StringNullableFilter<"ActivityLog"> | string | null
    taskId?: StringNullableFilter<"ActivityLog"> | string | null
    productivityCategory?: StringFilter<"ActivityLog"> | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type ActivityLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    timestamp?: SortOrder
    status?: SortOrder
    currentTask?: SortOrder
    appProcess?: SortOrderInput | SortOrder
    appTitle?: SortOrderInput | SortOrder
    keystrokes?: SortOrder
    mouseClicks?: SortOrder
    durationSeconds?: SortOrder
    idleSeconds?: SortOrder
    continuousIdleSeconds?: SortOrder
    clientEventId?: SortOrderInput | SortOrder
    taskId?: SortOrderInput | SortOrder
    productivityCategory?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ActivityLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    clientEventId?: string
    AND?: ActivityLogWhereInput | ActivityLogWhereInput[]
    OR?: ActivityLogWhereInput[]
    NOT?: ActivityLogWhereInput | ActivityLogWhereInput[]
    userId?: StringFilter<"ActivityLog"> | string
    timestamp?: DateTimeFilter<"ActivityLog"> | Date | string
    status?: StringFilter<"ActivityLog"> | string
    currentTask?: StringFilter<"ActivityLog"> | string
    appProcess?: StringNullableFilter<"ActivityLog"> | string | null
    appTitle?: StringNullableFilter<"ActivityLog"> | string | null
    keystrokes?: IntFilter<"ActivityLog"> | number
    mouseClicks?: IntFilter<"ActivityLog"> | number
    durationSeconds?: IntFilter<"ActivityLog"> | number
    idleSeconds?: IntFilter<"ActivityLog"> | number
    continuousIdleSeconds?: IntFilter<"ActivityLog"> | number
    taskId?: StringNullableFilter<"ActivityLog"> | string | null
    productivityCategory?: StringFilter<"ActivityLog"> | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "clientEventId">

  export type ActivityLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    timestamp?: SortOrder
    status?: SortOrder
    currentTask?: SortOrder
    appProcess?: SortOrderInput | SortOrder
    appTitle?: SortOrderInput | SortOrder
    keystrokes?: SortOrder
    mouseClicks?: SortOrder
    durationSeconds?: SortOrder
    idleSeconds?: SortOrder
    continuousIdleSeconds?: SortOrder
    clientEventId?: SortOrderInput | SortOrder
    taskId?: SortOrderInput | SortOrder
    productivityCategory?: SortOrder
    _count?: ActivityLogCountOrderByAggregateInput
    _avg?: ActivityLogAvgOrderByAggregateInput
    _max?: ActivityLogMaxOrderByAggregateInput
    _min?: ActivityLogMinOrderByAggregateInput
    _sum?: ActivityLogSumOrderByAggregateInput
  }

  export type ActivityLogScalarWhereWithAggregatesInput = {
    AND?: ActivityLogScalarWhereWithAggregatesInput | ActivityLogScalarWhereWithAggregatesInput[]
    OR?: ActivityLogScalarWhereWithAggregatesInput[]
    NOT?: ActivityLogScalarWhereWithAggregatesInput | ActivityLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ActivityLog"> | string
    userId?: StringWithAggregatesFilter<"ActivityLog"> | string
    timestamp?: DateTimeWithAggregatesFilter<"ActivityLog"> | Date | string
    status?: StringWithAggregatesFilter<"ActivityLog"> | string
    currentTask?: StringWithAggregatesFilter<"ActivityLog"> | string
    appProcess?: StringNullableWithAggregatesFilter<"ActivityLog"> | string | null
    appTitle?: StringNullableWithAggregatesFilter<"ActivityLog"> | string | null
    keystrokes?: IntWithAggregatesFilter<"ActivityLog"> | number
    mouseClicks?: IntWithAggregatesFilter<"ActivityLog"> | number
    durationSeconds?: IntWithAggregatesFilter<"ActivityLog"> | number
    idleSeconds?: IntWithAggregatesFilter<"ActivityLog"> | number
    continuousIdleSeconds?: IntWithAggregatesFilter<"ActivityLog"> | number
    clientEventId?: StringNullableWithAggregatesFilter<"ActivityLog"> | string | null
    taskId?: StringNullableWithAggregatesFilter<"ActivityLog"> | string | null
    productivityCategory?: StringWithAggregatesFilter<"ActivityLog"> | string
  }

  export type ScreenshotWhereInput = {
    AND?: ScreenshotWhereInput | ScreenshotWhereInput[]
    OR?: ScreenshotWhereInput[]
    NOT?: ScreenshotWhereInput | ScreenshotWhereInput[]
    id?: StringFilter<"Screenshot"> | string
    userId?: StringFilter<"Screenshot"> | string
    timestamp?: DateTimeFilter<"Screenshot"> | Date | string
    filePath?: StringFilter<"Screenshot"> | string
    activityRate?: IntFilter<"Screenshot"> | number
    currentTask?: StringFilter<"Screenshot"> | string
    keystrokes?: IntFilter<"Screenshot"> | number
    mouseClicks?: IntFilter<"Screenshot"> | number
    clientEventId?: StringNullableFilter<"Screenshot"> | string | null
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type ScreenshotOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    timestamp?: SortOrder
    filePath?: SortOrder
    activityRate?: SortOrder
    currentTask?: SortOrder
    keystrokes?: SortOrder
    mouseClicks?: SortOrder
    clientEventId?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ScreenshotWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    clientEventId?: string
    AND?: ScreenshotWhereInput | ScreenshotWhereInput[]
    OR?: ScreenshotWhereInput[]
    NOT?: ScreenshotWhereInput | ScreenshotWhereInput[]
    userId?: StringFilter<"Screenshot"> | string
    timestamp?: DateTimeFilter<"Screenshot"> | Date | string
    filePath?: StringFilter<"Screenshot"> | string
    activityRate?: IntFilter<"Screenshot"> | number
    currentTask?: StringFilter<"Screenshot"> | string
    keystrokes?: IntFilter<"Screenshot"> | number
    mouseClicks?: IntFilter<"Screenshot"> | number
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "clientEventId">

  export type ScreenshotOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    timestamp?: SortOrder
    filePath?: SortOrder
    activityRate?: SortOrder
    currentTask?: SortOrder
    keystrokes?: SortOrder
    mouseClicks?: SortOrder
    clientEventId?: SortOrderInput | SortOrder
    _count?: ScreenshotCountOrderByAggregateInput
    _avg?: ScreenshotAvgOrderByAggregateInput
    _max?: ScreenshotMaxOrderByAggregateInput
    _min?: ScreenshotMinOrderByAggregateInput
    _sum?: ScreenshotSumOrderByAggregateInput
  }

  export type ScreenshotScalarWhereWithAggregatesInput = {
    AND?: ScreenshotScalarWhereWithAggregatesInput | ScreenshotScalarWhereWithAggregatesInput[]
    OR?: ScreenshotScalarWhereWithAggregatesInput[]
    NOT?: ScreenshotScalarWhereWithAggregatesInput | ScreenshotScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Screenshot"> | string
    userId?: StringWithAggregatesFilter<"Screenshot"> | string
    timestamp?: DateTimeWithAggregatesFilter<"Screenshot"> | Date | string
    filePath?: StringWithAggregatesFilter<"Screenshot"> | string
    activityRate?: IntWithAggregatesFilter<"Screenshot"> | number
    currentTask?: StringWithAggregatesFilter<"Screenshot"> | string
    keystrokes?: IntWithAggregatesFilter<"Screenshot"> | number
    mouseClicks?: IntWithAggregatesFilter<"Screenshot"> | number
    clientEventId?: StringNullableWithAggregatesFilter<"Screenshot"> | string | null
  }

  export type TrackingSessionWhereInput = {
    AND?: TrackingSessionWhereInput | TrackingSessionWhereInput[]
    OR?: TrackingSessionWhereInput[]
    NOT?: TrackingSessionWhereInput | TrackingSessionWhereInput[]
    id?: StringFilter<"TrackingSession"> | string
    clientSessionId?: StringNullableFilter<"TrackingSession"> | string | null
    userId?: StringFilter<"TrackingSession"> | string
    companyId?: StringFilter<"TrackingSession"> | string
    dateKey?: StringFilter<"TrackingSession"> | string
    startedAt?: DateTimeFilter<"TrackingSession"> | Date | string
    endedAt?: DateTimeNullableFilter<"TrackingSession"> | Date | string | null
    lastHeartbeatAt?: DateTimeFilter<"TrackingSession"> | Date | string
    status?: StringFilter<"TrackingSession"> | string
    breakStartedAt?: DateTimeNullableFilter<"TrackingSession"> | Date | string | null
    activeSeconds?: IntFilter<"TrackingSession"> | number
    idleSeconds?: IntFilter<"TrackingSession"> | number
    breakSeconds?: IntFilter<"TrackingSession"> | number
    reviewRequired?: BoolFilter<"TrackingSession"> | boolean
    reviewReason?: StringNullableFilter<"TrackingSession"> | string | null
    currentTask?: StringFilter<"TrackingSession"> | string
    taskId?: StringNullableFilter<"TrackingSession"> | string | null
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type TrackingSessionOrderByWithRelationInput = {
    id?: SortOrder
    clientSessionId?: SortOrderInput | SortOrder
    userId?: SortOrder
    companyId?: SortOrder
    dateKey?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrderInput | SortOrder
    lastHeartbeatAt?: SortOrder
    status?: SortOrder
    breakStartedAt?: SortOrderInput | SortOrder
    activeSeconds?: SortOrder
    idleSeconds?: SortOrder
    breakSeconds?: SortOrder
    reviewRequired?: SortOrder
    reviewReason?: SortOrderInput | SortOrder
    currentTask?: SortOrder
    taskId?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type TrackingSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    clientSessionId?: string
    AND?: TrackingSessionWhereInput | TrackingSessionWhereInput[]
    OR?: TrackingSessionWhereInput[]
    NOT?: TrackingSessionWhereInput | TrackingSessionWhereInput[]
    userId?: StringFilter<"TrackingSession"> | string
    companyId?: StringFilter<"TrackingSession"> | string
    dateKey?: StringFilter<"TrackingSession"> | string
    startedAt?: DateTimeFilter<"TrackingSession"> | Date | string
    endedAt?: DateTimeNullableFilter<"TrackingSession"> | Date | string | null
    lastHeartbeatAt?: DateTimeFilter<"TrackingSession"> | Date | string
    status?: StringFilter<"TrackingSession"> | string
    breakStartedAt?: DateTimeNullableFilter<"TrackingSession"> | Date | string | null
    activeSeconds?: IntFilter<"TrackingSession"> | number
    idleSeconds?: IntFilter<"TrackingSession"> | number
    breakSeconds?: IntFilter<"TrackingSession"> | number
    reviewRequired?: BoolFilter<"TrackingSession"> | boolean
    reviewReason?: StringNullableFilter<"TrackingSession"> | string | null
    currentTask?: StringFilter<"TrackingSession"> | string
    taskId?: StringNullableFilter<"TrackingSession"> | string | null
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "clientSessionId">

  export type TrackingSessionOrderByWithAggregationInput = {
    id?: SortOrder
    clientSessionId?: SortOrderInput | SortOrder
    userId?: SortOrder
    companyId?: SortOrder
    dateKey?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrderInput | SortOrder
    lastHeartbeatAt?: SortOrder
    status?: SortOrder
    breakStartedAt?: SortOrderInput | SortOrder
    activeSeconds?: SortOrder
    idleSeconds?: SortOrder
    breakSeconds?: SortOrder
    reviewRequired?: SortOrder
    reviewReason?: SortOrderInput | SortOrder
    currentTask?: SortOrder
    taskId?: SortOrderInput | SortOrder
    _count?: TrackingSessionCountOrderByAggregateInput
    _avg?: TrackingSessionAvgOrderByAggregateInput
    _max?: TrackingSessionMaxOrderByAggregateInput
    _min?: TrackingSessionMinOrderByAggregateInput
    _sum?: TrackingSessionSumOrderByAggregateInput
  }

  export type TrackingSessionScalarWhereWithAggregatesInput = {
    AND?: TrackingSessionScalarWhereWithAggregatesInput | TrackingSessionScalarWhereWithAggregatesInput[]
    OR?: TrackingSessionScalarWhereWithAggregatesInput[]
    NOT?: TrackingSessionScalarWhereWithAggregatesInput | TrackingSessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TrackingSession"> | string
    clientSessionId?: StringNullableWithAggregatesFilter<"TrackingSession"> | string | null
    userId?: StringWithAggregatesFilter<"TrackingSession"> | string
    companyId?: StringWithAggregatesFilter<"TrackingSession"> | string
    dateKey?: StringWithAggregatesFilter<"TrackingSession"> | string
    startedAt?: DateTimeWithAggregatesFilter<"TrackingSession"> | Date | string
    endedAt?: DateTimeNullableWithAggregatesFilter<"TrackingSession"> | Date | string | null
    lastHeartbeatAt?: DateTimeWithAggregatesFilter<"TrackingSession"> | Date | string
    status?: StringWithAggregatesFilter<"TrackingSession"> | string
    breakStartedAt?: DateTimeNullableWithAggregatesFilter<"TrackingSession"> | Date | string | null
    activeSeconds?: IntWithAggregatesFilter<"TrackingSession"> | number
    idleSeconds?: IntWithAggregatesFilter<"TrackingSession"> | number
    breakSeconds?: IntWithAggregatesFilter<"TrackingSession"> | number
    reviewRequired?: BoolWithAggregatesFilter<"TrackingSession"> | boolean
    reviewReason?: StringNullableWithAggregatesFilter<"TrackingSession"> | string | null
    currentTask?: StringWithAggregatesFilter<"TrackingSession"> | string
    taskId?: StringNullableWithAggregatesFilter<"TrackingSession"> | string | null
  }

  export type ProjectWhereInput = {
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    id?: StringFilter<"Project"> | string
    companyId?: StringFilter<"Project"> | string
    name?: StringFilter<"Project"> | string
    code?: StringNullableFilter<"Project"> | string | null
    status?: StringFilter<"Project"> | string
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    tasks?: TaskListRelationFilter
    manualTimeRequests?: ManualTimeRequestListRelationFilter
  }

  export type ProjectOrderByWithRelationInput = {
    id?: SortOrder
    companyId?: SortOrder
    name?: SortOrder
    code?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tasks?: TaskOrderByRelationAggregateInput
    manualTimeRequests?: ManualTimeRequestOrderByRelationAggregateInput
  }

  export type ProjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    companyId?: StringFilter<"Project"> | string
    name?: StringFilter<"Project"> | string
    code?: StringNullableFilter<"Project"> | string | null
    status?: StringFilter<"Project"> | string
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    tasks?: TaskListRelationFilter
    manualTimeRequests?: ManualTimeRequestListRelationFilter
  }, "id">

  export type ProjectOrderByWithAggregationInput = {
    id?: SortOrder
    companyId?: SortOrder
    name?: SortOrder
    code?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProjectCountOrderByAggregateInput
    _max?: ProjectMaxOrderByAggregateInput
    _min?: ProjectMinOrderByAggregateInput
  }

  export type ProjectScalarWhereWithAggregatesInput = {
    AND?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    OR?: ProjectScalarWhereWithAggregatesInput[]
    NOT?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Project"> | string
    companyId?: StringWithAggregatesFilter<"Project"> | string
    name?: StringWithAggregatesFilter<"Project"> | string
    code?: StringNullableWithAggregatesFilter<"Project"> | string | null
    status?: StringWithAggregatesFilter<"Project"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
  }

  export type TaskWhereInput = {
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    id?: StringFilter<"Task"> | string
    companyId?: StringFilter<"Task"> | string
    projectId?: StringNullableFilter<"Task"> | string | null
    assignedUserId?: StringNullableFilter<"Task"> | string | null
    title?: StringFilter<"Task"> | string
    description?: StringNullableFilter<"Task"> | string | null
    status?: StringFilter<"Task"> | string
    priority?: StringFilter<"Task"> | string
    dueDate?: DateTimeNullableFilter<"Task"> | Date | string | null
    createdAt?: DateTimeFilter<"Task"> | Date | string
    updatedAt?: DateTimeFilter<"Task"> | Date | string
    project?: XOR<ProjectNullableRelationFilter, ProjectWhereInput> | null
    assignedUser?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    manualTimeRequests?: ManualTimeRequestListRelationFilter
  }

  export type TaskOrderByWithRelationInput = {
    id?: SortOrder
    companyId?: SortOrder
    projectId?: SortOrderInput | SortOrder
    assignedUserId?: SortOrderInput | SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    priority?: SortOrder
    dueDate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    project?: ProjectOrderByWithRelationInput
    assignedUser?: UserOrderByWithRelationInput
    manualTimeRequests?: ManualTimeRequestOrderByRelationAggregateInput
  }

  export type TaskWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    companyId?: StringFilter<"Task"> | string
    projectId?: StringNullableFilter<"Task"> | string | null
    assignedUserId?: StringNullableFilter<"Task"> | string | null
    title?: StringFilter<"Task"> | string
    description?: StringNullableFilter<"Task"> | string | null
    status?: StringFilter<"Task"> | string
    priority?: StringFilter<"Task"> | string
    dueDate?: DateTimeNullableFilter<"Task"> | Date | string | null
    createdAt?: DateTimeFilter<"Task"> | Date | string
    updatedAt?: DateTimeFilter<"Task"> | Date | string
    project?: XOR<ProjectNullableRelationFilter, ProjectWhereInput> | null
    assignedUser?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    manualTimeRequests?: ManualTimeRequestListRelationFilter
  }, "id">

  export type TaskOrderByWithAggregationInput = {
    id?: SortOrder
    companyId?: SortOrder
    projectId?: SortOrderInput | SortOrder
    assignedUserId?: SortOrderInput | SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    priority?: SortOrder
    dueDate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TaskCountOrderByAggregateInput
    _max?: TaskMaxOrderByAggregateInput
    _min?: TaskMinOrderByAggregateInput
  }

  export type TaskScalarWhereWithAggregatesInput = {
    AND?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    OR?: TaskScalarWhereWithAggregatesInput[]
    NOT?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Task"> | string
    companyId?: StringWithAggregatesFilter<"Task"> | string
    projectId?: StringNullableWithAggregatesFilter<"Task"> | string | null
    assignedUserId?: StringNullableWithAggregatesFilter<"Task"> | string | null
    title?: StringWithAggregatesFilter<"Task"> | string
    description?: StringNullableWithAggregatesFilter<"Task"> | string | null
    status?: StringWithAggregatesFilter<"Task"> | string
    priority?: StringWithAggregatesFilter<"Task"> | string
    dueDate?: DateTimeNullableWithAggregatesFilter<"Task"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Task"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Task"> | Date | string
  }

  export type ProductivityRuleWhereInput = {
    AND?: ProductivityRuleWhereInput | ProductivityRuleWhereInput[]
    OR?: ProductivityRuleWhereInput[]
    NOT?: ProductivityRuleWhereInput | ProductivityRuleWhereInput[]
    id?: StringFilter<"ProductivityRule"> | string
    companyId?: StringFilter<"ProductivityRule"> | string
    pattern?: StringFilter<"ProductivityRule"> | string
    matchType?: StringFilter<"ProductivityRule"> | string
    category?: StringFilter<"ProductivityRule"> | string
    createdAt?: DateTimeFilter<"ProductivityRule"> | Date | string
  }

  export type ProductivityRuleOrderByWithRelationInput = {
    id?: SortOrder
    companyId?: SortOrder
    pattern?: SortOrder
    matchType?: SortOrder
    category?: SortOrder
    createdAt?: SortOrder
  }

  export type ProductivityRuleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    companyId_pattern_matchType?: ProductivityRuleCompanyIdPatternMatchTypeCompoundUniqueInput
    AND?: ProductivityRuleWhereInput | ProductivityRuleWhereInput[]
    OR?: ProductivityRuleWhereInput[]
    NOT?: ProductivityRuleWhereInput | ProductivityRuleWhereInput[]
    companyId?: StringFilter<"ProductivityRule"> | string
    pattern?: StringFilter<"ProductivityRule"> | string
    matchType?: StringFilter<"ProductivityRule"> | string
    category?: StringFilter<"ProductivityRule"> | string
    createdAt?: DateTimeFilter<"ProductivityRule"> | Date | string
  }, "id" | "companyId_pattern_matchType">

  export type ProductivityRuleOrderByWithAggregationInput = {
    id?: SortOrder
    companyId?: SortOrder
    pattern?: SortOrder
    matchType?: SortOrder
    category?: SortOrder
    createdAt?: SortOrder
    _count?: ProductivityRuleCountOrderByAggregateInput
    _max?: ProductivityRuleMaxOrderByAggregateInput
    _min?: ProductivityRuleMinOrderByAggregateInput
  }

  export type ProductivityRuleScalarWhereWithAggregatesInput = {
    AND?: ProductivityRuleScalarWhereWithAggregatesInput | ProductivityRuleScalarWhereWithAggregatesInput[]
    OR?: ProductivityRuleScalarWhereWithAggregatesInput[]
    NOT?: ProductivityRuleScalarWhereWithAggregatesInput | ProductivityRuleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProductivityRule"> | string
    companyId?: StringWithAggregatesFilter<"ProductivityRule"> | string
    pattern?: StringWithAggregatesFilter<"ProductivityRule"> | string
    matchType?: StringWithAggregatesFilter<"ProductivityRule"> | string
    category?: StringWithAggregatesFilter<"ProductivityRule"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ProductivityRule"> | Date | string
  }

  export type ManualTimeRequestWhereInput = {
    AND?: ManualTimeRequestWhereInput | ManualTimeRequestWhereInput[]
    OR?: ManualTimeRequestWhereInput[]
    NOT?: ManualTimeRequestWhereInput | ManualTimeRequestWhereInput[]
    id?: StringFilter<"ManualTimeRequest"> | string
    userId?: StringFilter<"ManualTimeRequest"> | string
    companyId?: StringFilter<"ManualTimeRequest"> | string
    startAt?: DateTimeFilter<"ManualTimeRequest"> | Date | string
    endAt?: DateTimeFilter<"ManualTimeRequest"> | Date | string
    note?: StringFilter<"ManualTimeRequest"> | string
    projectId?: StringNullableFilter<"ManualTimeRequest"> | string | null
    taskId?: StringNullableFilter<"ManualTimeRequest"> | string | null
    status?: StringFilter<"ManualTimeRequest"> | string
    reviewedBy?: StringNullableFilter<"ManualTimeRequest"> | string | null
    reviewedAt?: DateTimeNullableFilter<"ManualTimeRequest"> | Date | string | null
    createdAt?: DateTimeFilter<"ManualTimeRequest"> | Date | string
    updatedAt?: DateTimeFilter<"ManualTimeRequest"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    project?: XOR<ProjectNullableRelationFilter, ProjectWhereInput> | null
    task?: XOR<TaskNullableRelationFilter, TaskWhereInput> | null
  }

  export type ManualTimeRequestOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    companyId?: SortOrder
    startAt?: SortOrder
    endAt?: SortOrder
    note?: SortOrder
    projectId?: SortOrderInput | SortOrder
    taskId?: SortOrderInput | SortOrder
    status?: SortOrder
    reviewedBy?: SortOrderInput | SortOrder
    reviewedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    project?: ProjectOrderByWithRelationInput
    task?: TaskOrderByWithRelationInput
  }

  export type ManualTimeRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ManualTimeRequestWhereInput | ManualTimeRequestWhereInput[]
    OR?: ManualTimeRequestWhereInput[]
    NOT?: ManualTimeRequestWhereInput | ManualTimeRequestWhereInput[]
    userId?: StringFilter<"ManualTimeRequest"> | string
    companyId?: StringFilter<"ManualTimeRequest"> | string
    startAt?: DateTimeFilter<"ManualTimeRequest"> | Date | string
    endAt?: DateTimeFilter<"ManualTimeRequest"> | Date | string
    note?: StringFilter<"ManualTimeRequest"> | string
    projectId?: StringNullableFilter<"ManualTimeRequest"> | string | null
    taskId?: StringNullableFilter<"ManualTimeRequest"> | string | null
    status?: StringFilter<"ManualTimeRequest"> | string
    reviewedBy?: StringNullableFilter<"ManualTimeRequest"> | string | null
    reviewedAt?: DateTimeNullableFilter<"ManualTimeRequest"> | Date | string | null
    createdAt?: DateTimeFilter<"ManualTimeRequest"> | Date | string
    updatedAt?: DateTimeFilter<"ManualTimeRequest"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    project?: XOR<ProjectNullableRelationFilter, ProjectWhereInput> | null
    task?: XOR<TaskNullableRelationFilter, TaskWhereInput> | null
  }, "id">

  export type ManualTimeRequestOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    companyId?: SortOrder
    startAt?: SortOrder
    endAt?: SortOrder
    note?: SortOrder
    projectId?: SortOrderInput | SortOrder
    taskId?: SortOrderInput | SortOrder
    status?: SortOrder
    reviewedBy?: SortOrderInput | SortOrder
    reviewedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ManualTimeRequestCountOrderByAggregateInput
    _max?: ManualTimeRequestMaxOrderByAggregateInput
    _min?: ManualTimeRequestMinOrderByAggregateInput
  }

  export type ManualTimeRequestScalarWhereWithAggregatesInput = {
    AND?: ManualTimeRequestScalarWhereWithAggregatesInput | ManualTimeRequestScalarWhereWithAggregatesInput[]
    OR?: ManualTimeRequestScalarWhereWithAggregatesInput[]
    NOT?: ManualTimeRequestScalarWhereWithAggregatesInput | ManualTimeRequestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ManualTimeRequest"> | string
    userId?: StringWithAggregatesFilter<"ManualTimeRequest"> | string
    companyId?: StringWithAggregatesFilter<"ManualTimeRequest"> | string
    startAt?: DateTimeWithAggregatesFilter<"ManualTimeRequest"> | Date | string
    endAt?: DateTimeWithAggregatesFilter<"ManualTimeRequest"> | Date | string
    note?: StringWithAggregatesFilter<"ManualTimeRequest"> | string
    projectId?: StringNullableWithAggregatesFilter<"ManualTimeRequest"> | string | null
    taskId?: StringNullableWithAggregatesFilter<"ManualTimeRequest"> | string | null
    status?: StringWithAggregatesFilter<"ManualTimeRequest"> | string
    reviewedBy?: StringNullableWithAggregatesFilter<"ManualTimeRequest"> | string | null
    reviewedAt?: DateTimeNullableWithAggregatesFilter<"ManualTimeRequest"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ManualTimeRequest"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ManualTimeRequest"> | Date | string
  }

  export type AlertWhereInput = {
    AND?: AlertWhereInput | AlertWhereInput[]
    OR?: AlertWhereInput[]
    NOT?: AlertWhereInput | AlertWhereInput[]
    id?: StringFilter<"Alert"> | string
    companyId?: StringFilter<"Alert"> | string
    userId?: StringNullableFilter<"Alert"> | string | null
    type?: StringFilter<"Alert"> | string
    severity?: StringFilter<"Alert"> | string
    message?: StringFilter<"Alert"> | string
    metadata?: StringNullableFilter<"Alert"> | string | null
    createdAt?: DateTimeFilter<"Alert"> | Date | string
    readAt?: DateTimeNullableFilter<"Alert"> | Date | string | null
    user?: XOR<UserNullableRelationFilter, UserWhereInput> | null
  }

  export type AlertOrderByWithRelationInput = {
    id?: SortOrder
    companyId?: SortOrder
    userId?: SortOrderInput | SortOrder
    type?: SortOrder
    severity?: SortOrder
    message?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    readAt?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AlertWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AlertWhereInput | AlertWhereInput[]
    OR?: AlertWhereInput[]
    NOT?: AlertWhereInput | AlertWhereInput[]
    companyId?: StringFilter<"Alert"> | string
    userId?: StringNullableFilter<"Alert"> | string | null
    type?: StringFilter<"Alert"> | string
    severity?: StringFilter<"Alert"> | string
    message?: StringFilter<"Alert"> | string
    metadata?: StringNullableFilter<"Alert"> | string | null
    createdAt?: DateTimeFilter<"Alert"> | Date | string
    readAt?: DateTimeNullableFilter<"Alert"> | Date | string | null
    user?: XOR<UserNullableRelationFilter, UserWhereInput> | null
  }, "id">

  export type AlertOrderByWithAggregationInput = {
    id?: SortOrder
    companyId?: SortOrder
    userId?: SortOrderInput | SortOrder
    type?: SortOrder
    severity?: SortOrder
    message?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    readAt?: SortOrderInput | SortOrder
    _count?: AlertCountOrderByAggregateInput
    _max?: AlertMaxOrderByAggregateInput
    _min?: AlertMinOrderByAggregateInput
  }

  export type AlertScalarWhereWithAggregatesInput = {
    AND?: AlertScalarWhereWithAggregatesInput | AlertScalarWhereWithAggregatesInput[]
    OR?: AlertScalarWhereWithAggregatesInput[]
    NOT?: AlertScalarWhereWithAggregatesInput | AlertScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Alert"> | string
    companyId?: StringWithAggregatesFilter<"Alert"> | string
    userId?: StringNullableWithAggregatesFilter<"Alert"> | string | null
    type?: StringWithAggregatesFilter<"Alert"> | string
    severity?: StringWithAggregatesFilter<"Alert"> | string
    message?: StringWithAggregatesFilter<"Alert"> | string
    metadata?: StringNullableWithAggregatesFilter<"Alert"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Alert"> | Date | string
    readAt?: DateTimeNullableWithAggregatesFilter<"Alert"> | Date | string | null
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    companyId?: StringFilter<"AuditLog"> | string
    actorUserId?: StringNullableFilter<"AuditLog"> | string | null
    action?: StringFilter<"AuditLog"> | string
    entityType?: StringFilter<"AuditLog"> | string
    entityId?: StringNullableFilter<"AuditLog"> | string | null
    details?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    companyId?: SortOrder
    actorUserId?: SortOrderInput | SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrderInput | SortOrder
    details?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    companyId?: StringFilter<"AuditLog"> | string
    actorUserId?: StringNullableFilter<"AuditLog"> | string | null
    action?: StringFilter<"AuditLog"> | string
    entityType?: StringFilter<"AuditLog"> | string
    entityId?: StringNullableFilter<"AuditLog"> | string | null
    details?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    companyId?: SortOrder
    actorUserId?: SortOrderInput | SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrderInput | SortOrder
    details?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuditLog"> | string
    companyId?: StringWithAggregatesFilter<"AuditLog"> | string
    actorUserId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    action?: StringWithAggregatesFilter<"AuditLog"> | string
    entityType?: StringWithAggregatesFilter<"AuditLog"> | string
    entityId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    details?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name: string
    password: string
    role: string
    companyId?: string | null
    screenshotInterval?: number
    idleLimitMinutes?: number
    timezone?: string
    workDays?: string
    shiftStartMinutes?: number
    shiftEndMinutes?: number
    targetMinutes?: number
    maxShiftMinutes?: number
    maxBreakMinutes?: number
    screenshotRetentionDays?: number
    manualTimeRequiresApproval?: boolean
    resetCode?: string | null
    resetExpires?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    activities?: ActivityLogCreateNestedManyWithoutUserInput
    screenshots?: ScreenshotCreateNestedManyWithoutUserInput
    workReports?: WorkReportCreateNestedManyWithoutUserInput
    trackingSessions?: TrackingSessionCreateNestedManyWithoutUserInput
    manualTimeRequests?: ManualTimeRequestCreateNestedManyWithoutUserInput
    assignedTasks?: TaskCreateNestedManyWithoutAssignedUserInput
    alerts?: AlertCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name: string
    password: string
    role: string
    companyId?: string | null
    screenshotInterval?: number
    idleLimitMinutes?: number
    timezone?: string
    workDays?: string
    shiftStartMinutes?: number
    shiftEndMinutes?: number
    targetMinutes?: number
    maxShiftMinutes?: number
    maxBreakMinutes?: number
    screenshotRetentionDays?: number
    manualTimeRequiresApproval?: boolean
    resetCode?: string | null
    resetExpires?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    activities?: ActivityLogUncheckedCreateNestedManyWithoutUserInput
    screenshots?: ScreenshotUncheckedCreateNestedManyWithoutUserInput
    workReports?: WorkReportUncheckedCreateNestedManyWithoutUserInput
    trackingSessions?: TrackingSessionUncheckedCreateNestedManyWithoutUserInput
    manualTimeRequests?: ManualTimeRequestUncheckedCreateNestedManyWithoutUserInput
    assignedTasks?: TaskUncheckedCreateNestedManyWithoutAssignedUserInput
    alerts?: AlertUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    screenshotInterval?: IntFieldUpdateOperationsInput | number
    idleLimitMinutes?: IntFieldUpdateOperationsInput | number
    timezone?: StringFieldUpdateOperationsInput | string
    workDays?: StringFieldUpdateOperationsInput | string
    shiftStartMinutes?: IntFieldUpdateOperationsInput | number
    shiftEndMinutes?: IntFieldUpdateOperationsInput | number
    targetMinutes?: IntFieldUpdateOperationsInput | number
    maxShiftMinutes?: IntFieldUpdateOperationsInput | number
    maxBreakMinutes?: IntFieldUpdateOperationsInput | number
    screenshotRetentionDays?: IntFieldUpdateOperationsInput | number
    manualTimeRequiresApproval?: BoolFieldUpdateOperationsInput | boolean
    resetCode?: NullableStringFieldUpdateOperationsInput | string | null
    resetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activities?: ActivityLogUpdateManyWithoutUserNestedInput
    screenshots?: ScreenshotUpdateManyWithoutUserNestedInput
    workReports?: WorkReportUpdateManyWithoutUserNestedInput
    trackingSessions?: TrackingSessionUpdateManyWithoutUserNestedInput
    manualTimeRequests?: ManualTimeRequestUpdateManyWithoutUserNestedInput
    assignedTasks?: TaskUpdateManyWithoutAssignedUserNestedInput
    alerts?: AlertUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    screenshotInterval?: IntFieldUpdateOperationsInput | number
    idleLimitMinutes?: IntFieldUpdateOperationsInput | number
    timezone?: StringFieldUpdateOperationsInput | string
    workDays?: StringFieldUpdateOperationsInput | string
    shiftStartMinutes?: IntFieldUpdateOperationsInput | number
    shiftEndMinutes?: IntFieldUpdateOperationsInput | number
    targetMinutes?: IntFieldUpdateOperationsInput | number
    maxShiftMinutes?: IntFieldUpdateOperationsInput | number
    maxBreakMinutes?: IntFieldUpdateOperationsInput | number
    screenshotRetentionDays?: IntFieldUpdateOperationsInput | number
    manualTimeRequiresApproval?: BoolFieldUpdateOperationsInput | boolean
    resetCode?: NullableStringFieldUpdateOperationsInput | string | null
    resetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activities?: ActivityLogUncheckedUpdateManyWithoutUserNestedInput
    screenshots?: ScreenshotUncheckedUpdateManyWithoutUserNestedInput
    workReports?: WorkReportUncheckedUpdateManyWithoutUserNestedInput
    trackingSessions?: TrackingSessionUncheckedUpdateManyWithoutUserNestedInput
    manualTimeRequests?: ManualTimeRequestUncheckedUpdateManyWithoutUserNestedInput
    assignedTasks?: TaskUncheckedUpdateManyWithoutAssignedUserNestedInput
    alerts?: AlertUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name: string
    password: string
    role: string
    companyId?: string | null
    screenshotInterval?: number
    idleLimitMinutes?: number
    timezone?: string
    workDays?: string
    shiftStartMinutes?: number
    shiftEndMinutes?: number
    targetMinutes?: number
    maxShiftMinutes?: number
    maxBreakMinutes?: number
    screenshotRetentionDays?: number
    manualTimeRequiresApproval?: boolean
    resetCode?: string | null
    resetExpires?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    screenshotInterval?: IntFieldUpdateOperationsInput | number
    idleLimitMinutes?: IntFieldUpdateOperationsInput | number
    timezone?: StringFieldUpdateOperationsInput | string
    workDays?: StringFieldUpdateOperationsInput | string
    shiftStartMinutes?: IntFieldUpdateOperationsInput | number
    shiftEndMinutes?: IntFieldUpdateOperationsInput | number
    targetMinutes?: IntFieldUpdateOperationsInput | number
    maxShiftMinutes?: IntFieldUpdateOperationsInput | number
    maxBreakMinutes?: IntFieldUpdateOperationsInput | number
    screenshotRetentionDays?: IntFieldUpdateOperationsInput | number
    manualTimeRequiresApproval?: BoolFieldUpdateOperationsInput | boolean
    resetCode?: NullableStringFieldUpdateOperationsInput | string | null
    resetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    screenshotInterval?: IntFieldUpdateOperationsInput | number
    idleLimitMinutes?: IntFieldUpdateOperationsInput | number
    timezone?: StringFieldUpdateOperationsInput | string
    workDays?: StringFieldUpdateOperationsInput | string
    shiftStartMinutes?: IntFieldUpdateOperationsInput | number
    shiftEndMinutes?: IntFieldUpdateOperationsInput | number
    targetMinutes?: IntFieldUpdateOperationsInput | number
    maxShiftMinutes?: IntFieldUpdateOperationsInput | number
    maxBreakMinutes?: IntFieldUpdateOperationsInput | number
    screenshotRetentionDays?: IntFieldUpdateOperationsInput | number
    manualTimeRequiresApproval?: BoolFieldUpdateOperationsInput | boolean
    resetCode?: NullableStringFieldUpdateOperationsInput | string | null
    resetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkReportCreateInput = {
    id?: string
    type: string
    note: string
    emailSent?: boolean
    createdAt?: Date | string
    endedAt?: Date | string | null
    durationSeconds?: number | null
    clientEventId?: string | null
    taskId?: string | null
    user: UserCreateNestedOneWithoutWorkReportsInput
  }

  export type WorkReportUncheckedCreateInput = {
    id?: string
    userId: string
    type: string
    note: string
    emailSent?: boolean
    createdAt?: Date | string
    endedAt?: Date | string | null
    durationSeconds?: number | null
    clientEventId?: string | null
    taskId?: string | null
  }

  export type WorkReportUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    note?: StringFieldUpdateOperationsInput | string
    emailSent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    clientEventId?: NullableStringFieldUpdateOperationsInput | string | null
    taskId?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutWorkReportsNestedInput
  }

  export type WorkReportUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    note?: StringFieldUpdateOperationsInput | string
    emailSent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    clientEventId?: NullableStringFieldUpdateOperationsInput | string | null
    taskId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WorkReportCreateManyInput = {
    id?: string
    userId: string
    type: string
    note: string
    emailSent?: boolean
    createdAt?: Date | string
    endedAt?: Date | string | null
    durationSeconds?: number | null
    clientEventId?: string | null
    taskId?: string | null
  }

  export type WorkReportUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    note?: StringFieldUpdateOperationsInput | string
    emailSent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    clientEventId?: NullableStringFieldUpdateOperationsInput | string | null
    taskId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WorkReportUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    note?: StringFieldUpdateOperationsInput | string
    emailSent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    clientEventId?: NullableStringFieldUpdateOperationsInput | string | null
    taskId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ActivityLogCreateInput = {
    id?: string
    timestamp?: Date | string
    status: string
    currentTask?: string
    appProcess?: string | null
    appTitle?: string | null
    keystrokes?: number
    mouseClicks?: number
    durationSeconds?: number
    idleSeconds?: number
    continuousIdleSeconds?: number
    clientEventId?: string | null
    taskId?: string | null
    productivityCategory?: string
    user: UserCreateNestedOneWithoutActivitiesInput
  }

  export type ActivityLogUncheckedCreateInput = {
    id?: string
    userId: string
    timestamp?: Date | string
    status: string
    currentTask?: string
    appProcess?: string | null
    appTitle?: string | null
    keystrokes?: number
    mouseClicks?: number
    durationSeconds?: number
    idleSeconds?: number
    continuousIdleSeconds?: number
    clientEventId?: string | null
    taskId?: string | null
    productivityCategory?: string
  }

  export type ActivityLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    currentTask?: StringFieldUpdateOperationsInput | string
    appProcess?: NullableStringFieldUpdateOperationsInput | string | null
    appTitle?: NullableStringFieldUpdateOperationsInput | string | null
    keystrokes?: IntFieldUpdateOperationsInput | number
    mouseClicks?: IntFieldUpdateOperationsInput | number
    durationSeconds?: IntFieldUpdateOperationsInput | number
    idleSeconds?: IntFieldUpdateOperationsInput | number
    continuousIdleSeconds?: IntFieldUpdateOperationsInput | number
    clientEventId?: NullableStringFieldUpdateOperationsInput | string | null
    taskId?: NullableStringFieldUpdateOperationsInput | string | null
    productivityCategory?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutActivitiesNestedInput
  }

  export type ActivityLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    currentTask?: StringFieldUpdateOperationsInput | string
    appProcess?: NullableStringFieldUpdateOperationsInput | string | null
    appTitle?: NullableStringFieldUpdateOperationsInput | string | null
    keystrokes?: IntFieldUpdateOperationsInput | number
    mouseClicks?: IntFieldUpdateOperationsInput | number
    durationSeconds?: IntFieldUpdateOperationsInput | number
    idleSeconds?: IntFieldUpdateOperationsInput | number
    continuousIdleSeconds?: IntFieldUpdateOperationsInput | number
    clientEventId?: NullableStringFieldUpdateOperationsInput | string | null
    taskId?: NullableStringFieldUpdateOperationsInput | string | null
    productivityCategory?: StringFieldUpdateOperationsInput | string
  }

  export type ActivityLogCreateManyInput = {
    id?: string
    userId: string
    timestamp?: Date | string
    status: string
    currentTask?: string
    appProcess?: string | null
    appTitle?: string | null
    keystrokes?: number
    mouseClicks?: number
    durationSeconds?: number
    idleSeconds?: number
    continuousIdleSeconds?: number
    clientEventId?: string | null
    taskId?: string | null
    productivityCategory?: string
  }

  export type ActivityLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    currentTask?: StringFieldUpdateOperationsInput | string
    appProcess?: NullableStringFieldUpdateOperationsInput | string | null
    appTitle?: NullableStringFieldUpdateOperationsInput | string | null
    keystrokes?: IntFieldUpdateOperationsInput | number
    mouseClicks?: IntFieldUpdateOperationsInput | number
    durationSeconds?: IntFieldUpdateOperationsInput | number
    idleSeconds?: IntFieldUpdateOperationsInput | number
    continuousIdleSeconds?: IntFieldUpdateOperationsInput | number
    clientEventId?: NullableStringFieldUpdateOperationsInput | string | null
    taskId?: NullableStringFieldUpdateOperationsInput | string | null
    productivityCategory?: StringFieldUpdateOperationsInput | string
  }

  export type ActivityLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    currentTask?: StringFieldUpdateOperationsInput | string
    appProcess?: NullableStringFieldUpdateOperationsInput | string | null
    appTitle?: NullableStringFieldUpdateOperationsInput | string | null
    keystrokes?: IntFieldUpdateOperationsInput | number
    mouseClicks?: IntFieldUpdateOperationsInput | number
    durationSeconds?: IntFieldUpdateOperationsInput | number
    idleSeconds?: IntFieldUpdateOperationsInput | number
    continuousIdleSeconds?: IntFieldUpdateOperationsInput | number
    clientEventId?: NullableStringFieldUpdateOperationsInput | string | null
    taskId?: NullableStringFieldUpdateOperationsInput | string | null
    productivityCategory?: StringFieldUpdateOperationsInput | string
  }

  export type ScreenshotCreateInput = {
    id?: string
    timestamp?: Date | string
    filePath: string
    activityRate: number
    currentTask?: string
    keystrokes?: number
    mouseClicks?: number
    clientEventId?: string | null
    user: UserCreateNestedOneWithoutScreenshotsInput
  }

  export type ScreenshotUncheckedCreateInput = {
    id?: string
    userId: string
    timestamp?: Date | string
    filePath: string
    activityRate: number
    currentTask?: string
    keystrokes?: number
    mouseClicks?: number
    clientEventId?: string | null
  }

  export type ScreenshotUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    filePath?: StringFieldUpdateOperationsInput | string
    activityRate?: IntFieldUpdateOperationsInput | number
    currentTask?: StringFieldUpdateOperationsInput | string
    keystrokes?: IntFieldUpdateOperationsInput | number
    mouseClicks?: IntFieldUpdateOperationsInput | number
    clientEventId?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutScreenshotsNestedInput
  }

  export type ScreenshotUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    filePath?: StringFieldUpdateOperationsInput | string
    activityRate?: IntFieldUpdateOperationsInput | number
    currentTask?: StringFieldUpdateOperationsInput | string
    keystrokes?: IntFieldUpdateOperationsInput | number
    mouseClicks?: IntFieldUpdateOperationsInput | number
    clientEventId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ScreenshotCreateManyInput = {
    id?: string
    userId: string
    timestamp?: Date | string
    filePath: string
    activityRate: number
    currentTask?: string
    keystrokes?: number
    mouseClicks?: number
    clientEventId?: string | null
  }

  export type ScreenshotUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    filePath?: StringFieldUpdateOperationsInput | string
    activityRate?: IntFieldUpdateOperationsInput | number
    currentTask?: StringFieldUpdateOperationsInput | string
    keystrokes?: IntFieldUpdateOperationsInput | number
    mouseClicks?: IntFieldUpdateOperationsInput | number
    clientEventId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ScreenshotUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    filePath?: StringFieldUpdateOperationsInput | string
    activityRate?: IntFieldUpdateOperationsInput | number
    currentTask?: StringFieldUpdateOperationsInput | string
    keystrokes?: IntFieldUpdateOperationsInput | number
    mouseClicks?: IntFieldUpdateOperationsInput | number
    clientEventId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TrackingSessionCreateInput = {
    id?: string
    clientSessionId?: string | null
    companyId: string
    dateKey: string
    startedAt?: Date | string
    endedAt?: Date | string | null
    lastHeartbeatAt?: Date | string
    status?: string
    breakStartedAt?: Date | string | null
    activeSeconds?: number
    idleSeconds?: number
    breakSeconds?: number
    reviewRequired?: boolean
    reviewReason?: string | null
    currentTask?: string
    taskId?: string | null
    user: UserCreateNestedOneWithoutTrackingSessionsInput
  }

  export type TrackingSessionUncheckedCreateInput = {
    id?: string
    clientSessionId?: string | null
    userId: string
    companyId: string
    dateKey: string
    startedAt?: Date | string
    endedAt?: Date | string | null
    lastHeartbeatAt?: Date | string
    status?: string
    breakStartedAt?: Date | string | null
    activeSeconds?: number
    idleSeconds?: number
    breakSeconds?: number
    reviewRequired?: boolean
    reviewReason?: string | null
    currentTask?: string
    taskId?: string | null
  }

  export type TrackingSessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: StringFieldUpdateOperationsInput | string
    dateKey?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastHeartbeatAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    breakStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activeSeconds?: IntFieldUpdateOperationsInput | number
    idleSeconds?: IntFieldUpdateOperationsInput | number
    breakSeconds?: IntFieldUpdateOperationsInput | number
    reviewRequired?: BoolFieldUpdateOperationsInput | boolean
    reviewReason?: NullableStringFieldUpdateOperationsInput | string | null
    currentTask?: StringFieldUpdateOperationsInput | string
    taskId?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutTrackingSessionsNestedInput
  }

  export type TrackingSessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    dateKey?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastHeartbeatAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    breakStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activeSeconds?: IntFieldUpdateOperationsInput | number
    idleSeconds?: IntFieldUpdateOperationsInput | number
    breakSeconds?: IntFieldUpdateOperationsInput | number
    reviewRequired?: BoolFieldUpdateOperationsInput | boolean
    reviewReason?: NullableStringFieldUpdateOperationsInput | string | null
    currentTask?: StringFieldUpdateOperationsInput | string
    taskId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TrackingSessionCreateManyInput = {
    id?: string
    clientSessionId?: string | null
    userId: string
    companyId: string
    dateKey: string
    startedAt?: Date | string
    endedAt?: Date | string | null
    lastHeartbeatAt?: Date | string
    status?: string
    breakStartedAt?: Date | string | null
    activeSeconds?: number
    idleSeconds?: number
    breakSeconds?: number
    reviewRequired?: boolean
    reviewReason?: string | null
    currentTask?: string
    taskId?: string | null
  }

  export type TrackingSessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: StringFieldUpdateOperationsInput | string
    dateKey?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastHeartbeatAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    breakStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activeSeconds?: IntFieldUpdateOperationsInput | number
    idleSeconds?: IntFieldUpdateOperationsInput | number
    breakSeconds?: IntFieldUpdateOperationsInput | number
    reviewRequired?: BoolFieldUpdateOperationsInput | boolean
    reviewReason?: NullableStringFieldUpdateOperationsInput | string | null
    currentTask?: StringFieldUpdateOperationsInput | string
    taskId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TrackingSessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    dateKey?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastHeartbeatAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    breakStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activeSeconds?: IntFieldUpdateOperationsInput | number
    idleSeconds?: IntFieldUpdateOperationsInput | number
    breakSeconds?: IntFieldUpdateOperationsInput | number
    reviewRequired?: BoolFieldUpdateOperationsInput | boolean
    reviewReason?: NullableStringFieldUpdateOperationsInput | string | null
    currentTask?: StringFieldUpdateOperationsInput | string
    taskId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProjectCreateInput = {
    id?: string
    companyId: string
    name: string
    code?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tasks?: TaskCreateNestedManyWithoutProjectInput
    manualTimeRequests?: ManualTimeRequestCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateInput = {
    id?: string
    companyId: string
    name: string
    code?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tasks?: TaskUncheckedCreateNestedManyWithoutProjectInput
    manualTimeRequests?: ManualTimeRequestUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUpdateManyWithoutProjectNestedInput
    manualTimeRequests?: ManualTimeRequestUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUncheckedUpdateManyWithoutProjectNestedInput
    manualTimeRequests?: ManualTimeRequestUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectCreateManyInput = {
    id?: string
    companyId: string
    name: string
    code?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskCreateInput = {
    id?: string
    companyId: string
    title: string
    description?: string | null
    status?: string
    priority?: string
    dueDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    project?: ProjectCreateNestedOneWithoutTasksInput
    assignedUser?: UserCreateNestedOneWithoutAssignedTasksInput
    manualTimeRequests?: ManualTimeRequestCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateInput = {
    id?: string
    companyId: string
    projectId?: string | null
    assignedUserId?: string | null
    title: string
    description?: string | null
    status?: string
    priority?: string
    dueDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    manualTimeRequests?: ManualTimeRequestUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneWithoutTasksNestedInput
    assignedUser?: UserUpdateOneWithoutAssignedTasksNestedInput
    manualTimeRequests?: ManualTimeRequestUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    assignedUserId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    manualTimeRequests?: ManualTimeRequestUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TaskCreateManyInput = {
    id?: string
    companyId: string
    projectId?: string | null
    assignedUserId?: string | null
    title: string
    description?: string | null
    status?: string
    priority?: string
    dueDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    assignedUserId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductivityRuleCreateInput = {
    id?: string
    companyId: string
    pattern: string
    matchType?: string
    category?: string
    createdAt?: Date | string
  }

  export type ProductivityRuleUncheckedCreateInput = {
    id?: string
    companyId: string
    pattern: string
    matchType?: string
    category?: string
    createdAt?: Date | string
  }

  export type ProductivityRuleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    pattern?: StringFieldUpdateOperationsInput | string
    matchType?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductivityRuleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    pattern?: StringFieldUpdateOperationsInput | string
    matchType?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductivityRuleCreateManyInput = {
    id?: string
    companyId: string
    pattern: string
    matchType?: string
    category?: string
    createdAt?: Date | string
  }

  export type ProductivityRuleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    pattern?: StringFieldUpdateOperationsInput | string
    matchType?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductivityRuleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    pattern?: StringFieldUpdateOperationsInput | string
    matchType?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ManualTimeRequestCreateInput = {
    id?: string
    companyId: string
    startAt: Date | string
    endAt: Date | string
    note: string
    status?: string
    reviewedBy?: string | null
    reviewedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutManualTimeRequestsInput
    project?: ProjectCreateNestedOneWithoutManualTimeRequestsInput
    task?: TaskCreateNestedOneWithoutManualTimeRequestsInput
  }

  export type ManualTimeRequestUncheckedCreateInput = {
    id?: string
    userId: string
    companyId: string
    startAt: Date | string
    endAt: Date | string
    note: string
    projectId?: string | null
    taskId?: string | null
    status?: string
    reviewedBy?: string | null
    reviewedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ManualTimeRequestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutManualTimeRequestsNestedInput
    project?: ProjectUpdateOneWithoutManualTimeRequestsNestedInput
    task?: TaskUpdateOneWithoutManualTimeRequestsNestedInput
  }

  export type ManualTimeRequestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: StringFieldUpdateOperationsInput | string
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    taskId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ManualTimeRequestCreateManyInput = {
    id?: string
    userId: string
    companyId: string
    startAt: Date | string
    endAt: Date | string
    note: string
    projectId?: string | null
    taskId?: string | null
    status?: string
    reviewedBy?: string | null
    reviewedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ManualTimeRequestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ManualTimeRequestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: StringFieldUpdateOperationsInput | string
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    taskId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlertCreateInput = {
    id?: string
    companyId: string
    type: string
    severity?: string
    message: string
    metadata?: string | null
    createdAt?: Date | string
    readAt?: Date | string | null
    user?: UserCreateNestedOneWithoutAlertsInput
  }

  export type AlertUncheckedCreateInput = {
    id?: string
    companyId: string
    userId?: string | null
    type: string
    severity?: string
    message: string
    metadata?: string | null
    createdAt?: Date | string
    readAt?: Date | string | null
  }

  export type AlertUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneWithoutAlertsNestedInput
  }

  export type AlertUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AlertCreateManyInput = {
    id?: string
    companyId: string
    userId?: string | null
    type: string
    severity?: string
    message: string
    metadata?: string | null
    createdAt?: Date | string
    readAt?: Date | string | null
  }

  export type AlertUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AlertUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AuditLogCreateInput = {
    id?: string
    companyId: string
    actorUserId?: string | null
    action: string
    entityType: string
    entityId?: string | null
    details?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    companyId: string
    actorUserId?: string | null
    action: string
    entityType: string
    entityId?: string | null
    details?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    actorUserId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    actorUserId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: string
    companyId: string
    actorUserId?: string | null
    action: string
    entityType: string
    entityId?: string | null
    details?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    actorUserId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    actorUserId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ActivityLogListRelationFilter = {
    every?: ActivityLogWhereInput
    some?: ActivityLogWhereInput
    none?: ActivityLogWhereInput
  }

  export type ScreenshotListRelationFilter = {
    every?: ScreenshotWhereInput
    some?: ScreenshotWhereInput
    none?: ScreenshotWhereInput
  }

  export type WorkReportListRelationFilter = {
    every?: WorkReportWhereInput
    some?: WorkReportWhereInput
    none?: WorkReportWhereInput
  }

  export type TrackingSessionListRelationFilter = {
    every?: TrackingSessionWhereInput
    some?: TrackingSessionWhereInput
    none?: TrackingSessionWhereInput
  }

  export type ManualTimeRequestListRelationFilter = {
    every?: ManualTimeRequestWhereInput
    some?: ManualTimeRequestWhereInput
    none?: ManualTimeRequestWhereInput
  }

  export type TaskListRelationFilter = {
    every?: TaskWhereInput
    some?: TaskWhereInput
    none?: TaskWhereInput
  }

  export type AlertListRelationFilter = {
    every?: AlertWhereInput
    some?: AlertWhereInput
    none?: AlertWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ActivityLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ScreenshotOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WorkReportOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TrackingSessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ManualTimeRequestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TaskOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AlertOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    role?: SortOrder
    companyId?: SortOrder
    screenshotInterval?: SortOrder
    idleLimitMinutes?: SortOrder
    timezone?: SortOrder
    workDays?: SortOrder
    shiftStartMinutes?: SortOrder
    shiftEndMinutes?: SortOrder
    targetMinutes?: SortOrder
    maxShiftMinutes?: SortOrder
    maxBreakMinutes?: SortOrder
    screenshotRetentionDays?: SortOrder
    manualTimeRequiresApproval?: SortOrder
    resetCode?: SortOrder
    resetExpires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    screenshotInterval?: SortOrder
    idleLimitMinutes?: SortOrder
    shiftStartMinutes?: SortOrder
    shiftEndMinutes?: SortOrder
    targetMinutes?: SortOrder
    maxShiftMinutes?: SortOrder
    maxBreakMinutes?: SortOrder
    screenshotRetentionDays?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    role?: SortOrder
    companyId?: SortOrder
    screenshotInterval?: SortOrder
    idleLimitMinutes?: SortOrder
    timezone?: SortOrder
    workDays?: SortOrder
    shiftStartMinutes?: SortOrder
    shiftEndMinutes?: SortOrder
    targetMinutes?: SortOrder
    maxShiftMinutes?: SortOrder
    maxBreakMinutes?: SortOrder
    screenshotRetentionDays?: SortOrder
    manualTimeRequiresApproval?: SortOrder
    resetCode?: SortOrder
    resetExpires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    role?: SortOrder
    companyId?: SortOrder
    screenshotInterval?: SortOrder
    idleLimitMinutes?: SortOrder
    timezone?: SortOrder
    workDays?: SortOrder
    shiftStartMinutes?: SortOrder
    shiftEndMinutes?: SortOrder
    targetMinutes?: SortOrder
    maxShiftMinutes?: SortOrder
    maxBreakMinutes?: SortOrder
    screenshotRetentionDays?: SortOrder
    manualTimeRequiresApproval?: SortOrder
    resetCode?: SortOrder
    resetExpires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    screenshotInterval?: SortOrder
    idleLimitMinutes?: SortOrder
    shiftStartMinutes?: SortOrder
    shiftEndMinutes?: SortOrder
    targetMinutes?: SortOrder
    maxShiftMinutes?: SortOrder
    maxBreakMinutes?: SortOrder
    screenshotRetentionDays?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type WorkReportCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    note?: SortOrder
    emailSent?: SortOrder
    createdAt?: SortOrder
    endedAt?: SortOrder
    durationSeconds?: SortOrder
    clientEventId?: SortOrder
    taskId?: SortOrder
  }

  export type WorkReportAvgOrderByAggregateInput = {
    durationSeconds?: SortOrder
  }

  export type WorkReportMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    note?: SortOrder
    emailSent?: SortOrder
    createdAt?: SortOrder
    endedAt?: SortOrder
    durationSeconds?: SortOrder
    clientEventId?: SortOrder
    taskId?: SortOrder
  }

  export type WorkReportMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    note?: SortOrder
    emailSent?: SortOrder
    createdAt?: SortOrder
    endedAt?: SortOrder
    durationSeconds?: SortOrder
    clientEventId?: SortOrder
    taskId?: SortOrder
  }

  export type WorkReportSumOrderByAggregateInput = {
    durationSeconds?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type ActivityLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    timestamp?: SortOrder
    status?: SortOrder
    currentTask?: SortOrder
    appProcess?: SortOrder
    appTitle?: SortOrder
    keystrokes?: SortOrder
    mouseClicks?: SortOrder
    durationSeconds?: SortOrder
    idleSeconds?: SortOrder
    continuousIdleSeconds?: SortOrder
    clientEventId?: SortOrder
    taskId?: SortOrder
    productivityCategory?: SortOrder
  }

  export type ActivityLogAvgOrderByAggregateInput = {
    keystrokes?: SortOrder
    mouseClicks?: SortOrder
    durationSeconds?: SortOrder
    idleSeconds?: SortOrder
    continuousIdleSeconds?: SortOrder
  }

  export type ActivityLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    timestamp?: SortOrder
    status?: SortOrder
    currentTask?: SortOrder
    appProcess?: SortOrder
    appTitle?: SortOrder
    keystrokes?: SortOrder
    mouseClicks?: SortOrder
    durationSeconds?: SortOrder
    idleSeconds?: SortOrder
    continuousIdleSeconds?: SortOrder
    clientEventId?: SortOrder
    taskId?: SortOrder
    productivityCategory?: SortOrder
  }

  export type ActivityLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    timestamp?: SortOrder
    status?: SortOrder
    currentTask?: SortOrder
    appProcess?: SortOrder
    appTitle?: SortOrder
    keystrokes?: SortOrder
    mouseClicks?: SortOrder
    durationSeconds?: SortOrder
    idleSeconds?: SortOrder
    continuousIdleSeconds?: SortOrder
    clientEventId?: SortOrder
    taskId?: SortOrder
    productivityCategory?: SortOrder
  }

  export type ActivityLogSumOrderByAggregateInput = {
    keystrokes?: SortOrder
    mouseClicks?: SortOrder
    durationSeconds?: SortOrder
    idleSeconds?: SortOrder
    continuousIdleSeconds?: SortOrder
  }

  export type ScreenshotCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    timestamp?: SortOrder
    filePath?: SortOrder
    activityRate?: SortOrder
    currentTask?: SortOrder
    keystrokes?: SortOrder
    mouseClicks?: SortOrder
    clientEventId?: SortOrder
  }

  export type ScreenshotAvgOrderByAggregateInput = {
    activityRate?: SortOrder
    keystrokes?: SortOrder
    mouseClicks?: SortOrder
  }

  export type ScreenshotMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    timestamp?: SortOrder
    filePath?: SortOrder
    activityRate?: SortOrder
    currentTask?: SortOrder
    keystrokes?: SortOrder
    mouseClicks?: SortOrder
    clientEventId?: SortOrder
  }

  export type ScreenshotMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    timestamp?: SortOrder
    filePath?: SortOrder
    activityRate?: SortOrder
    currentTask?: SortOrder
    keystrokes?: SortOrder
    mouseClicks?: SortOrder
    clientEventId?: SortOrder
  }

  export type ScreenshotSumOrderByAggregateInput = {
    activityRate?: SortOrder
    keystrokes?: SortOrder
    mouseClicks?: SortOrder
  }

  export type TrackingSessionCountOrderByAggregateInput = {
    id?: SortOrder
    clientSessionId?: SortOrder
    userId?: SortOrder
    companyId?: SortOrder
    dateKey?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    lastHeartbeatAt?: SortOrder
    status?: SortOrder
    breakStartedAt?: SortOrder
    activeSeconds?: SortOrder
    idleSeconds?: SortOrder
    breakSeconds?: SortOrder
    reviewRequired?: SortOrder
    reviewReason?: SortOrder
    currentTask?: SortOrder
    taskId?: SortOrder
  }

  export type TrackingSessionAvgOrderByAggregateInput = {
    activeSeconds?: SortOrder
    idleSeconds?: SortOrder
    breakSeconds?: SortOrder
  }

  export type TrackingSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    clientSessionId?: SortOrder
    userId?: SortOrder
    companyId?: SortOrder
    dateKey?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    lastHeartbeatAt?: SortOrder
    status?: SortOrder
    breakStartedAt?: SortOrder
    activeSeconds?: SortOrder
    idleSeconds?: SortOrder
    breakSeconds?: SortOrder
    reviewRequired?: SortOrder
    reviewReason?: SortOrder
    currentTask?: SortOrder
    taskId?: SortOrder
  }

  export type TrackingSessionMinOrderByAggregateInput = {
    id?: SortOrder
    clientSessionId?: SortOrder
    userId?: SortOrder
    companyId?: SortOrder
    dateKey?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    lastHeartbeatAt?: SortOrder
    status?: SortOrder
    breakStartedAt?: SortOrder
    activeSeconds?: SortOrder
    idleSeconds?: SortOrder
    breakSeconds?: SortOrder
    reviewRequired?: SortOrder
    reviewReason?: SortOrder
    currentTask?: SortOrder
    taskId?: SortOrder
  }

  export type TrackingSessionSumOrderByAggregateInput = {
    activeSeconds?: SortOrder
    idleSeconds?: SortOrder
    breakSeconds?: SortOrder
  }

  export type ProjectCountOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    name?: SortOrder
    code?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectMaxOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    name?: SortOrder
    code?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectMinOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    name?: SortOrder
    code?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectNullableRelationFilter = {
    is?: ProjectWhereInput | null
    isNot?: ProjectWhereInput | null
  }

  export type UserNullableRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type TaskCountOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    projectId?: SortOrder
    assignedUserId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    dueDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TaskMaxOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    projectId?: SortOrder
    assignedUserId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    dueDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TaskMinOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    projectId?: SortOrder
    assignedUserId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    dueDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductivityRuleCompanyIdPatternMatchTypeCompoundUniqueInput = {
    companyId: string
    pattern: string
    matchType: string
  }

  export type ProductivityRuleCountOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    pattern?: SortOrder
    matchType?: SortOrder
    category?: SortOrder
    createdAt?: SortOrder
  }

  export type ProductivityRuleMaxOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    pattern?: SortOrder
    matchType?: SortOrder
    category?: SortOrder
    createdAt?: SortOrder
  }

  export type ProductivityRuleMinOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    pattern?: SortOrder
    matchType?: SortOrder
    category?: SortOrder
    createdAt?: SortOrder
  }

  export type TaskNullableRelationFilter = {
    is?: TaskWhereInput | null
    isNot?: TaskWhereInput | null
  }

  export type ManualTimeRequestCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    companyId?: SortOrder
    startAt?: SortOrder
    endAt?: SortOrder
    note?: SortOrder
    projectId?: SortOrder
    taskId?: SortOrder
    status?: SortOrder
    reviewedBy?: SortOrder
    reviewedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ManualTimeRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    companyId?: SortOrder
    startAt?: SortOrder
    endAt?: SortOrder
    note?: SortOrder
    projectId?: SortOrder
    taskId?: SortOrder
    status?: SortOrder
    reviewedBy?: SortOrder
    reviewedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ManualTimeRequestMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    companyId?: SortOrder
    startAt?: SortOrder
    endAt?: SortOrder
    note?: SortOrder
    projectId?: SortOrder
    taskId?: SortOrder
    status?: SortOrder
    reviewedBy?: SortOrder
    reviewedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AlertCountOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    severity?: SortOrder
    message?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    readAt?: SortOrder
  }

  export type AlertMaxOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    severity?: SortOrder
    message?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    readAt?: SortOrder
  }

  export type AlertMinOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    severity?: SortOrder
    message?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    readAt?: SortOrder
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    actorUserId?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    details?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    actorUserId?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    details?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    actorUserId?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    details?: SortOrder
    createdAt?: SortOrder
  }

  export type ActivityLogCreateNestedManyWithoutUserInput = {
    create?: XOR<ActivityLogCreateWithoutUserInput, ActivityLogUncheckedCreateWithoutUserInput> | ActivityLogCreateWithoutUserInput[] | ActivityLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActivityLogCreateOrConnectWithoutUserInput | ActivityLogCreateOrConnectWithoutUserInput[]
    createMany?: ActivityLogCreateManyUserInputEnvelope
    connect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
  }

  export type ScreenshotCreateNestedManyWithoutUserInput = {
    create?: XOR<ScreenshotCreateWithoutUserInput, ScreenshotUncheckedCreateWithoutUserInput> | ScreenshotCreateWithoutUserInput[] | ScreenshotUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ScreenshotCreateOrConnectWithoutUserInput | ScreenshotCreateOrConnectWithoutUserInput[]
    createMany?: ScreenshotCreateManyUserInputEnvelope
    connect?: ScreenshotWhereUniqueInput | ScreenshotWhereUniqueInput[]
  }

  export type WorkReportCreateNestedManyWithoutUserInput = {
    create?: XOR<WorkReportCreateWithoutUserInput, WorkReportUncheckedCreateWithoutUserInput> | WorkReportCreateWithoutUserInput[] | WorkReportUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WorkReportCreateOrConnectWithoutUserInput | WorkReportCreateOrConnectWithoutUserInput[]
    createMany?: WorkReportCreateManyUserInputEnvelope
    connect?: WorkReportWhereUniqueInput | WorkReportWhereUniqueInput[]
  }

  export type TrackingSessionCreateNestedManyWithoutUserInput = {
    create?: XOR<TrackingSessionCreateWithoutUserInput, TrackingSessionUncheckedCreateWithoutUserInput> | TrackingSessionCreateWithoutUserInput[] | TrackingSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TrackingSessionCreateOrConnectWithoutUserInput | TrackingSessionCreateOrConnectWithoutUserInput[]
    createMany?: TrackingSessionCreateManyUserInputEnvelope
    connect?: TrackingSessionWhereUniqueInput | TrackingSessionWhereUniqueInput[]
  }

  export type ManualTimeRequestCreateNestedManyWithoutUserInput = {
    create?: XOR<ManualTimeRequestCreateWithoutUserInput, ManualTimeRequestUncheckedCreateWithoutUserInput> | ManualTimeRequestCreateWithoutUserInput[] | ManualTimeRequestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ManualTimeRequestCreateOrConnectWithoutUserInput | ManualTimeRequestCreateOrConnectWithoutUserInput[]
    createMany?: ManualTimeRequestCreateManyUserInputEnvelope
    connect?: ManualTimeRequestWhereUniqueInput | ManualTimeRequestWhereUniqueInput[]
  }

  export type TaskCreateNestedManyWithoutAssignedUserInput = {
    create?: XOR<TaskCreateWithoutAssignedUserInput, TaskUncheckedCreateWithoutAssignedUserInput> | TaskCreateWithoutAssignedUserInput[] | TaskUncheckedCreateWithoutAssignedUserInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutAssignedUserInput | TaskCreateOrConnectWithoutAssignedUserInput[]
    createMany?: TaskCreateManyAssignedUserInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type AlertCreateNestedManyWithoutUserInput = {
    create?: XOR<AlertCreateWithoutUserInput, AlertUncheckedCreateWithoutUserInput> | AlertCreateWithoutUserInput[] | AlertUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AlertCreateOrConnectWithoutUserInput | AlertCreateOrConnectWithoutUserInput[]
    createMany?: AlertCreateManyUserInputEnvelope
    connect?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
  }

  export type ActivityLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ActivityLogCreateWithoutUserInput, ActivityLogUncheckedCreateWithoutUserInput> | ActivityLogCreateWithoutUserInput[] | ActivityLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActivityLogCreateOrConnectWithoutUserInput | ActivityLogCreateOrConnectWithoutUserInput[]
    createMany?: ActivityLogCreateManyUserInputEnvelope
    connect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
  }

  export type ScreenshotUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ScreenshotCreateWithoutUserInput, ScreenshotUncheckedCreateWithoutUserInput> | ScreenshotCreateWithoutUserInput[] | ScreenshotUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ScreenshotCreateOrConnectWithoutUserInput | ScreenshotCreateOrConnectWithoutUserInput[]
    createMany?: ScreenshotCreateManyUserInputEnvelope
    connect?: ScreenshotWhereUniqueInput | ScreenshotWhereUniqueInput[]
  }

  export type WorkReportUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<WorkReportCreateWithoutUserInput, WorkReportUncheckedCreateWithoutUserInput> | WorkReportCreateWithoutUserInput[] | WorkReportUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WorkReportCreateOrConnectWithoutUserInput | WorkReportCreateOrConnectWithoutUserInput[]
    createMany?: WorkReportCreateManyUserInputEnvelope
    connect?: WorkReportWhereUniqueInput | WorkReportWhereUniqueInput[]
  }

  export type TrackingSessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TrackingSessionCreateWithoutUserInput, TrackingSessionUncheckedCreateWithoutUserInput> | TrackingSessionCreateWithoutUserInput[] | TrackingSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TrackingSessionCreateOrConnectWithoutUserInput | TrackingSessionCreateOrConnectWithoutUserInput[]
    createMany?: TrackingSessionCreateManyUserInputEnvelope
    connect?: TrackingSessionWhereUniqueInput | TrackingSessionWhereUniqueInput[]
  }

  export type ManualTimeRequestUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ManualTimeRequestCreateWithoutUserInput, ManualTimeRequestUncheckedCreateWithoutUserInput> | ManualTimeRequestCreateWithoutUserInput[] | ManualTimeRequestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ManualTimeRequestCreateOrConnectWithoutUserInput | ManualTimeRequestCreateOrConnectWithoutUserInput[]
    createMany?: ManualTimeRequestCreateManyUserInputEnvelope
    connect?: ManualTimeRequestWhereUniqueInput | ManualTimeRequestWhereUniqueInput[]
  }

  export type TaskUncheckedCreateNestedManyWithoutAssignedUserInput = {
    create?: XOR<TaskCreateWithoutAssignedUserInput, TaskUncheckedCreateWithoutAssignedUserInput> | TaskCreateWithoutAssignedUserInput[] | TaskUncheckedCreateWithoutAssignedUserInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutAssignedUserInput | TaskCreateOrConnectWithoutAssignedUserInput[]
    createMany?: TaskCreateManyAssignedUserInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type AlertUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AlertCreateWithoutUserInput, AlertUncheckedCreateWithoutUserInput> | AlertCreateWithoutUserInput[] | AlertUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AlertCreateOrConnectWithoutUserInput | AlertCreateOrConnectWithoutUserInput[]
    createMany?: AlertCreateManyUserInputEnvelope
    connect?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ActivityLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<ActivityLogCreateWithoutUserInput, ActivityLogUncheckedCreateWithoutUserInput> | ActivityLogCreateWithoutUserInput[] | ActivityLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActivityLogCreateOrConnectWithoutUserInput | ActivityLogCreateOrConnectWithoutUserInput[]
    upsert?: ActivityLogUpsertWithWhereUniqueWithoutUserInput | ActivityLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ActivityLogCreateManyUserInputEnvelope
    set?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    disconnect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    delete?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    connect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    update?: ActivityLogUpdateWithWhereUniqueWithoutUserInput | ActivityLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ActivityLogUpdateManyWithWhereWithoutUserInput | ActivityLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ActivityLogScalarWhereInput | ActivityLogScalarWhereInput[]
  }

  export type ScreenshotUpdateManyWithoutUserNestedInput = {
    create?: XOR<ScreenshotCreateWithoutUserInput, ScreenshotUncheckedCreateWithoutUserInput> | ScreenshotCreateWithoutUserInput[] | ScreenshotUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ScreenshotCreateOrConnectWithoutUserInput | ScreenshotCreateOrConnectWithoutUserInput[]
    upsert?: ScreenshotUpsertWithWhereUniqueWithoutUserInput | ScreenshotUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ScreenshotCreateManyUserInputEnvelope
    set?: ScreenshotWhereUniqueInput | ScreenshotWhereUniqueInput[]
    disconnect?: ScreenshotWhereUniqueInput | ScreenshotWhereUniqueInput[]
    delete?: ScreenshotWhereUniqueInput | ScreenshotWhereUniqueInput[]
    connect?: ScreenshotWhereUniqueInput | ScreenshotWhereUniqueInput[]
    update?: ScreenshotUpdateWithWhereUniqueWithoutUserInput | ScreenshotUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ScreenshotUpdateManyWithWhereWithoutUserInput | ScreenshotUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ScreenshotScalarWhereInput | ScreenshotScalarWhereInput[]
  }

  export type WorkReportUpdateManyWithoutUserNestedInput = {
    create?: XOR<WorkReportCreateWithoutUserInput, WorkReportUncheckedCreateWithoutUserInput> | WorkReportCreateWithoutUserInput[] | WorkReportUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WorkReportCreateOrConnectWithoutUserInput | WorkReportCreateOrConnectWithoutUserInput[]
    upsert?: WorkReportUpsertWithWhereUniqueWithoutUserInput | WorkReportUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WorkReportCreateManyUserInputEnvelope
    set?: WorkReportWhereUniqueInput | WorkReportWhereUniqueInput[]
    disconnect?: WorkReportWhereUniqueInput | WorkReportWhereUniqueInput[]
    delete?: WorkReportWhereUniqueInput | WorkReportWhereUniqueInput[]
    connect?: WorkReportWhereUniqueInput | WorkReportWhereUniqueInput[]
    update?: WorkReportUpdateWithWhereUniqueWithoutUserInput | WorkReportUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WorkReportUpdateManyWithWhereWithoutUserInput | WorkReportUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WorkReportScalarWhereInput | WorkReportScalarWhereInput[]
  }

  export type TrackingSessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<TrackingSessionCreateWithoutUserInput, TrackingSessionUncheckedCreateWithoutUserInput> | TrackingSessionCreateWithoutUserInput[] | TrackingSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TrackingSessionCreateOrConnectWithoutUserInput | TrackingSessionCreateOrConnectWithoutUserInput[]
    upsert?: TrackingSessionUpsertWithWhereUniqueWithoutUserInput | TrackingSessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TrackingSessionCreateManyUserInputEnvelope
    set?: TrackingSessionWhereUniqueInput | TrackingSessionWhereUniqueInput[]
    disconnect?: TrackingSessionWhereUniqueInput | TrackingSessionWhereUniqueInput[]
    delete?: TrackingSessionWhereUniqueInput | TrackingSessionWhereUniqueInput[]
    connect?: TrackingSessionWhereUniqueInput | TrackingSessionWhereUniqueInput[]
    update?: TrackingSessionUpdateWithWhereUniqueWithoutUserInput | TrackingSessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TrackingSessionUpdateManyWithWhereWithoutUserInput | TrackingSessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TrackingSessionScalarWhereInput | TrackingSessionScalarWhereInput[]
  }

  export type ManualTimeRequestUpdateManyWithoutUserNestedInput = {
    create?: XOR<ManualTimeRequestCreateWithoutUserInput, ManualTimeRequestUncheckedCreateWithoutUserInput> | ManualTimeRequestCreateWithoutUserInput[] | ManualTimeRequestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ManualTimeRequestCreateOrConnectWithoutUserInput | ManualTimeRequestCreateOrConnectWithoutUserInput[]
    upsert?: ManualTimeRequestUpsertWithWhereUniqueWithoutUserInput | ManualTimeRequestUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ManualTimeRequestCreateManyUserInputEnvelope
    set?: ManualTimeRequestWhereUniqueInput | ManualTimeRequestWhereUniqueInput[]
    disconnect?: ManualTimeRequestWhereUniqueInput | ManualTimeRequestWhereUniqueInput[]
    delete?: ManualTimeRequestWhereUniqueInput | ManualTimeRequestWhereUniqueInput[]
    connect?: ManualTimeRequestWhereUniqueInput | ManualTimeRequestWhereUniqueInput[]
    update?: ManualTimeRequestUpdateWithWhereUniqueWithoutUserInput | ManualTimeRequestUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ManualTimeRequestUpdateManyWithWhereWithoutUserInput | ManualTimeRequestUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ManualTimeRequestScalarWhereInput | ManualTimeRequestScalarWhereInput[]
  }

  export type TaskUpdateManyWithoutAssignedUserNestedInput = {
    create?: XOR<TaskCreateWithoutAssignedUserInput, TaskUncheckedCreateWithoutAssignedUserInput> | TaskCreateWithoutAssignedUserInput[] | TaskUncheckedCreateWithoutAssignedUserInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutAssignedUserInput | TaskCreateOrConnectWithoutAssignedUserInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutAssignedUserInput | TaskUpsertWithWhereUniqueWithoutAssignedUserInput[]
    createMany?: TaskCreateManyAssignedUserInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutAssignedUserInput | TaskUpdateWithWhereUniqueWithoutAssignedUserInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutAssignedUserInput | TaskUpdateManyWithWhereWithoutAssignedUserInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type AlertUpdateManyWithoutUserNestedInput = {
    create?: XOR<AlertCreateWithoutUserInput, AlertUncheckedCreateWithoutUserInput> | AlertCreateWithoutUserInput[] | AlertUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AlertCreateOrConnectWithoutUserInput | AlertCreateOrConnectWithoutUserInput[]
    upsert?: AlertUpsertWithWhereUniqueWithoutUserInput | AlertUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AlertCreateManyUserInputEnvelope
    set?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    disconnect?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    delete?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    connect?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    update?: AlertUpdateWithWhereUniqueWithoutUserInput | AlertUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AlertUpdateManyWithWhereWithoutUserInput | AlertUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AlertScalarWhereInput | AlertScalarWhereInput[]
  }

  export type ActivityLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ActivityLogCreateWithoutUserInput, ActivityLogUncheckedCreateWithoutUserInput> | ActivityLogCreateWithoutUserInput[] | ActivityLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActivityLogCreateOrConnectWithoutUserInput | ActivityLogCreateOrConnectWithoutUserInput[]
    upsert?: ActivityLogUpsertWithWhereUniqueWithoutUserInput | ActivityLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ActivityLogCreateManyUserInputEnvelope
    set?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    disconnect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    delete?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    connect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    update?: ActivityLogUpdateWithWhereUniqueWithoutUserInput | ActivityLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ActivityLogUpdateManyWithWhereWithoutUserInput | ActivityLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ActivityLogScalarWhereInput | ActivityLogScalarWhereInput[]
  }

  export type ScreenshotUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ScreenshotCreateWithoutUserInput, ScreenshotUncheckedCreateWithoutUserInput> | ScreenshotCreateWithoutUserInput[] | ScreenshotUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ScreenshotCreateOrConnectWithoutUserInput | ScreenshotCreateOrConnectWithoutUserInput[]
    upsert?: ScreenshotUpsertWithWhereUniqueWithoutUserInput | ScreenshotUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ScreenshotCreateManyUserInputEnvelope
    set?: ScreenshotWhereUniqueInput | ScreenshotWhereUniqueInput[]
    disconnect?: ScreenshotWhereUniqueInput | ScreenshotWhereUniqueInput[]
    delete?: ScreenshotWhereUniqueInput | ScreenshotWhereUniqueInput[]
    connect?: ScreenshotWhereUniqueInput | ScreenshotWhereUniqueInput[]
    update?: ScreenshotUpdateWithWhereUniqueWithoutUserInput | ScreenshotUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ScreenshotUpdateManyWithWhereWithoutUserInput | ScreenshotUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ScreenshotScalarWhereInput | ScreenshotScalarWhereInput[]
  }

  export type WorkReportUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<WorkReportCreateWithoutUserInput, WorkReportUncheckedCreateWithoutUserInput> | WorkReportCreateWithoutUserInput[] | WorkReportUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WorkReportCreateOrConnectWithoutUserInput | WorkReportCreateOrConnectWithoutUserInput[]
    upsert?: WorkReportUpsertWithWhereUniqueWithoutUserInput | WorkReportUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WorkReportCreateManyUserInputEnvelope
    set?: WorkReportWhereUniqueInput | WorkReportWhereUniqueInput[]
    disconnect?: WorkReportWhereUniqueInput | WorkReportWhereUniqueInput[]
    delete?: WorkReportWhereUniqueInput | WorkReportWhereUniqueInput[]
    connect?: WorkReportWhereUniqueInput | WorkReportWhereUniqueInput[]
    update?: WorkReportUpdateWithWhereUniqueWithoutUserInput | WorkReportUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WorkReportUpdateManyWithWhereWithoutUserInput | WorkReportUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WorkReportScalarWhereInput | WorkReportScalarWhereInput[]
  }

  export type TrackingSessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TrackingSessionCreateWithoutUserInput, TrackingSessionUncheckedCreateWithoutUserInput> | TrackingSessionCreateWithoutUserInput[] | TrackingSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TrackingSessionCreateOrConnectWithoutUserInput | TrackingSessionCreateOrConnectWithoutUserInput[]
    upsert?: TrackingSessionUpsertWithWhereUniqueWithoutUserInput | TrackingSessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TrackingSessionCreateManyUserInputEnvelope
    set?: TrackingSessionWhereUniqueInput | TrackingSessionWhereUniqueInput[]
    disconnect?: TrackingSessionWhereUniqueInput | TrackingSessionWhereUniqueInput[]
    delete?: TrackingSessionWhereUniqueInput | TrackingSessionWhereUniqueInput[]
    connect?: TrackingSessionWhereUniqueInput | TrackingSessionWhereUniqueInput[]
    update?: TrackingSessionUpdateWithWhereUniqueWithoutUserInput | TrackingSessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TrackingSessionUpdateManyWithWhereWithoutUserInput | TrackingSessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TrackingSessionScalarWhereInput | TrackingSessionScalarWhereInput[]
  }

  export type ManualTimeRequestUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ManualTimeRequestCreateWithoutUserInput, ManualTimeRequestUncheckedCreateWithoutUserInput> | ManualTimeRequestCreateWithoutUserInput[] | ManualTimeRequestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ManualTimeRequestCreateOrConnectWithoutUserInput | ManualTimeRequestCreateOrConnectWithoutUserInput[]
    upsert?: ManualTimeRequestUpsertWithWhereUniqueWithoutUserInput | ManualTimeRequestUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ManualTimeRequestCreateManyUserInputEnvelope
    set?: ManualTimeRequestWhereUniqueInput | ManualTimeRequestWhereUniqueInput[]
    disconnect?: ManualTimeRequestWhereUniqueInput | ManualTimeRequestWhereUniqueInput[]
    delete?: ManualTimeRequestWhereUniqueInput | ManualTimeRequestWhereUniqueInput[]
    connect?: ManualTimeRequestWhereUniqueInput | ManualTimeRequestWhereUniqueInput[]
    update?: ManualTimeRequestUpdateWithWhereUniqueWithoutUserInput | ManualTimeRequestUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ManualTimeRequestUpdateManyWithWhereWithoutUserInput | ManualTimeRequestUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ManualTimeRequestScalarWhereInput | ManualTimeRequestScalarWhereInput[]
  }

  export type TaskUncheckedUpdateManyWithoutAssignedUserNestedInput = {
    create?: XOR<TaskCreateWithoutAssignedUserInput, TaskUncheckedCreateWithoutAssignedUserInput> | TaskCreateWithoutAssignedUserInput[] | TaskUncheckedCreateWithoutAssignedUserInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutAssignedUserInput | TaskCreateOrConnectWithoutAssignedUserInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutAssignedUserInput | TaskUpsertWithWhereUniqueWithoutAssignedUserInput[]
    createMany?: TaskCreateManyAssignedUserInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutAssignedUserInput | TaskUpdateWithWhereUniqueWithoutAssignedUserInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutAssignedUserInput | TaskUpdateManyWithWhereWithoutAssignedUserInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type AlertUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AlertCreateWithoutUserInput, AlertUncheckedCreateWithoutUserInput> | AlertCreateWithoutUserInput[] | AlertUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AlertCreateOrConnectWithoutUserInput | AlertCreateOrConnectWithoutUserInput[]
    upsert?: AlertUpsertWithWhereUniqueWithoutUserInput | AlertUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AlertCreateManyUserInputEnvelope
    set?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    disconnect?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    delete?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    connect?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    update?: AlertUpdateWithWhereUniqueWithoutUserInput | AlertUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AlertUpdateManyWithWhereWithoutUserInput | AlertUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AlertScalarWhereInput | AlertScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutWorkReportsInput = {
    create?: XOR<UserCreateWithoutWorkReportsInput, UserUncheckedCreateWithoutWorkReportsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWorkReportsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutWorkReportsNestedInput = {
    create?: XOR<UserCreateWithoutWorkReportsInput, UserUncheckedCreateWithoutWorkReportsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWorkReportsInput
    upsert?: UserUpsertWithoutWorkReportsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWorkReportsInput, UserUpdateWithoutWorkReportsInput>, UserUncheckedUpdateWithoutWorkReportsInput>
  }

  export type UserCreateNestedOneWithoutActivitiesInput = {
    create?: XOR<UserCreateWithoutActivitiesInput, UserUncheckedCreateWithoutActivitiesInput>
    connectOrCreate?: UserCreateOrConnectWithoutActivitiesInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutActivitiesNestedInput = {
    create?: XOR<UserCreateWithoutActivitiesInput, UserUncheckedCreateWithoutActivitiesInput>
    connectOrCreate?: UserCreateOrConnectWithoutActivitiesInput
    upsert?: UserUpsertWithoutActivitiesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutActivitiesInput, UserUpdateWithoutActivitiesInput>, UserUncheckedUpdateWithoutActivitiesInput>
  }

  export type UserCreateNestedOneWithoutScreenshotsInput = {
    create?: XOR<UserCreateWithoutScreenshotsInput, UserUncheckedCreateWithoutScreenshotsInput>
    connectOrCreate?: UserCreateOrConnectWithoutScreenshotsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutScreenshotsNestedInput = {
    create?: XOR<UserCreateWithoutScreenshotsInput, UserUncheckedCreateWithoutScreenshotsInput>
    connectOrCreate?: UserCreateOrConnectWithoutScreenshotsInput
    upsert?: UserUpsertWithoutScreenshotsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutScreenshotsInput, UserUpdateWithoutScreenshotsInput>, UserUncheckedUpdateWithoutScreenshotsInput>
  }

  export type UserCreateNestedOneWithoutTrackingSessionsInput = {
    create?: XOR<UserCreateWithoutTrackingSessionsInput, UserUncheckedCreateWithoutTrackingSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTrackingSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutTrackingSessionsNestedInput = {
    create?: XOR<UserCreateWithoutTrackingSessionsInput, UserUncheckedCreateWithoutTrackingSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTrackingSessionsInput
    upsert?: UserUpsertWithoutTrackingSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTrackingSessionsInput, UserUpdateWithoutTrackingSessionsInput>, UserUncheckedUpdateWithoutTrackingSessionsInput>
  }

  export type TaskCreateNestedManyWithoutProjectInput = {
    create?: XOR<TaskCreateWithoutProjectInput, TaskUncheckedCreateWithoutProjectInput> | TaskCreateWithoutProjectInput[] | TaskUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutProjectInput | TaskCreateOrConnectWithoutProjectInput[]
    createMany?: TaskCreateManyProjectInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type ManualTimeRequestCreateNestedManyWithoutProjectInput = {
    create?: XOR<ManualTimeRequestCreateWithoutProjectInput, ManualTimeRequestUncheckedCreateWithoutProjectInput> | ManualTimeRequestCreateWithoutProjectInput[] | ManualTimeRequestUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ManualTimeRequestCreateOrConnectWithoutProjectInput | ManualTimeRequestCreateOrConnectWithoutProjectInput[]
    createMany?: ManualTimeRequestCreateManyProjectInputEnvelope
    connect?: ManualTimeRequestWhereUniqueInput | ManualTimeRequestWhereUniqueInput[]
  }

  export type TaskUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<TaskCreateWithoutProjectInput, TaskUncheckedCreateWithoutProjectInput> | TaskCreateWithoutProjectInput[] | TaskUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutProjectInput | TaskCreateOrConnectWithoutProjectInput[]
    createMany?: TaskCreateManyProjectInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type ManualTimeRequestUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<ManualTimeRequestCreateWithoutProjectInput, ManualTimeRequestUncheckedCreateWithoutProjectInput> | ManualTimeRequestCreateWithoutProjectInput[] | ManualTimeRequestUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ManualTimeRequestCreateOrConnectWithoutProjectInput | ManualTimeRequestCreateOrConnectWithoutProjectInput[]
    createMany?: ManualTimeRequestCreateManyProjectInputEnvelope
    connect?: ManualTimeRequestWhereUniqueInput | ManualTimeRequestWhereUniqueInput[]
  }

  export type TaskUpdateManyWithoutProjectNestedInput = {
    create?: XOR<TaskCreateWithoutProjectInput, TaskUncheckedCreateWithoutProjectInput> | TaskCreateWithoutProjectInput[] | TaskUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutProjectInput | TaskCreateOrConnectWithoutProjectInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutProjectInput | TaskUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: TaskCreateManyProjectInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutProjectInput | TaskUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutProjectInput | TaskUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type ManualTimeRequestUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ManualTimeRequestCreateWithoutProjectInput, ManualTimeRequestUncheckedCreateWithoutProjectInput> | ManualTimeRequestCreateWithoutProjectInput[] | ManualTimeRequestUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ManualTimeRequestCreateOrConnectWithoutProjectInput | ManualTimeRequestCreateOrConnectWithoutProjectInput[]
    upsert?: ManualTimeRequestUpsertWithWhereUniqueWithoutProjectInput | ManualTimeRequestUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ManualTimeRequestCreateManyProjectInputEnvelope
    set?: ManualTimeRequestWhereUniqueInput | ManualTimeRequestWhereUniqueInput[]
    disconnect?: ManualTimeRequestWhereUniqueInput | ManualTimeRequestWhereUniqueInput[]
    delete?: ManualTimeRequestWhereUniqueInput | ManualTimeRequestWhereUniqueInput[]
    connect?: ManualTimeRequestWhereUniqueInput | ManualTimeRequestWhereUniqueInput[]
    update?: ManualTimeRequestUpdateWithWhereUniqueWithoutProjectInput | ManualTimeRequestUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ManualTimeRequestUpdateManyWithWhereWithoutProjectInput | ManualTimeRequestUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ManualTimeRequestScalarWhereInput | ManualTimeRequestScalarWhereInput[]
  }

  export type TaskUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<TaskCreateWithoutProjectInput, TaskUncheckedCreateWithoutProjectInput> | TaskCreateWithoutProjectInput[] | TaskUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutProjectInput | TaskCreateOrConnectWithoutProjectInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutProjectInput | TaskUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: TaskCreateManyProjectInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutProjectInput | TaskUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutProjectInput | TaskUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type ManualTimeRequestUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ManualTimeRequestCreateWithoutProjectInput, ManualTimeRequestUncheckedCreateWithoutProjectInput> | ManualTimeRequestCreateWithoutProjectInput[] | ManualTimeRequestUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ManualTimeRequestCreateOrConnectWithoutProjectInput | ManualTimeRequestCreateOrConnectWithoutProjectInput[]
    upsert?: ManualTimeRequestUpsertWithWhereUniqueWithoutProjectInput | ManualTimeRequestUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ManualTimeRequestCreateManyProjectInputEnvelope
    set?: ManualTimeRequestWhereUniqueInput | ManualTimeRequestWhereUniqueInput[]
    disconnect?: ManualTimeRequestWhereUniqueInput | ManualTimeRequestWhereUniqueInput[]
    delete?: ManualTimeRequestWhereUniqueInput | ManualTimeRequestWhereUniqueInput[]
    connect?: ManualTimeRequestWhereUniqueInput | ManualTimeRequestWhereUniqueInput[]
    update?: ManualTimeRequestUpdateWithWhereUniqueWithoutProjectInput | ManualTimeRequestUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ManualTimeRequestUpdateManyWithWhereWithoutProjectInput | ManualTimeRequestUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ManualTimeRequestScalarWhereInput | ManualTimeRequestScalarWhereInput[]
  }

  export type ProjectCreateNestedOneWithoutTasksInput = {
    create?: XOR<ProjectCreateWithoutTasksInput, ProjectUncheckedCreateWithoutTasksInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutTasksInput
    connect?: ProjectWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutAssignedTasksInput = {
    create?: XOR<UserCreateWithoutAssignedTasksInput, UserUncheckedCreateWithoutAssignedTasksInput>
    connectOrCreate?: UserCreateOrConnectWithoutAssignedTasksInput
    connect?: UserWhereUniqueInput
  }

  export type ManualTimeRequestCreateNestedManyWithoutTaskInput = {
    create?: XOR<ManualTimeRequestCreateWithoutTaskInput, ManualTimeRequestUncheckedCreateWithoutTaskInput> | ManualTimeRequestCreateWithoutTaskInput[] | ManualTimeRequestUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: ManualTimeRequestCreateOrConnectWithoutTaskInput | ManualTimeRequestCreateOrConnectWithoutTaskInput[]
    createMany?: ManualTimeRequestCreateManyTaskInputEnvelope
    connect?: ManualTimeRequestWhereUniqueInput | ManualTimeRequestWhereUniqueInput[]
  }

  export type ManualTimeRequestUncheckedCreateNestedManyWithoutTaskInput = {
    create?: XOR<ManualTimeRequestCreateWithoutTaskInput, ManualTimeRequestUncheckedCreateWithoutTaskInput> | ManualTimeRequestCreateWithoutTaskInput[] | ManualTimeRequestUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: ManualTimeRequestCreateOrConnectWithoutTaskInput | ManualTimeRequestCreateOrConnectWithoutTaskInput[]
    createMany?: ManualTimeRequestCreateManyTaskInputEnvelope
    connect?: ManualTimeRequestWhereUniqueInput | ManualTimeRequestWhereUniqueInput[]
  }

  export type ProjectUpdateOneWithoutTasksNestedInput = {
    create?: XOR<ProjectCreateWithoutTasksInput, ProjectUncheckedCreateWithoutTasksInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutTasksInput
    upsert?: ProjectUpsertWithoutTasksInput
    disconnect?: ProjectWhereInput | boolean
    delete?: ProjectWhereInput | boolean
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutTasksInput, ProjectUpdateWithoutTasksInput>, ProjectUncheckedUpdateWithoutTasksInput>
  }

  export type UserUpdateOneWithoutAssignedTasksNestedInput = {
    create?: XOR<UserCreateWithoutAssignedTasksInput, UserUncheckedCreateWithoutAssignedTasksInput>
    connectOrCreate?: UserCreateOrConnectWithoutAssignedTasksInput
    upsert?: UserUpsertWithoutAssignedTasksInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAssignedTasksInput, UserUpdateWithoutAssignedTasksInput>, UserUncheckedUpdateWithoutAssignedTasksInput>
  }

  export type ManualTimeRequestUpdateManyWithoutTaskNestedInput = {
    create?: XOR<ManualTimeRequestCreateWithoutTaskInput, ManualTimeRequestUncheckedCreateWithoutTaskInput> | ManualTimeRequestCreateWithoutTaskInput[] | ManualTimeRequestUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: ManualTimeRequestCreateOrConnectWithoutTaskInput | ManualTimeRequestCreateOrConnectWithoutTaskInput[]
    upsert?: ManualTimeRequestUpsertWithWhereUniqueWithoutTaskInput | ManualTimeRequestUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: ManualTimeRequestCreateManyTaskInputEnvelope
    set?: ManualTimeRequestWhereUniqueInput | ManualTimeRequestWhereUniqueInput[]
    disconnect?: ManualTimeRequestWhereUniqueInput | ManualTimeRequestWhereUniqueInput[]
    delete?: ManualTimeRequestWhereUniqueInput | ManualTimeRequestWhereUniqueInput[]
    connect?: ManualTimeRequestWhereUniqueInput | ManualTimeRequestWhereUniqueInput[]
    update?: ManualTimeRequestUpdateWithWhereUniqueWithoutTaskInput | ManualTimeRequestUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: ManualTimeRequestUpdateManyWithWhereWithoutTaskInput | ManualTimeRequestUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: ManualTimeRequestScalarWhereInput | ManualTimeRequestScalarWhereInput[]
  }

  export type ManualTimeRequestUncheckedUpdateManyWithoutTaskNestedInput = {
    create?: XOR<ManualTimeRequestCreateWithoutTaskInput, ManualTimeRequestUncheckedCreateWithoutTaskInput> | ManualTimeRequestCreateWithoutTaskInput[] | ManualTimeRequestUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: ManualTimeRequestCreateOrConnectWithoutTaskInput | ManualTimeRequestCreateOrConnectWithoutTaskInput[]
    upsert?: ManualTimeRequestUpsertWithWhereUniqueWithoutTaskInput | ManualTimeRequestUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: ManualTimeRequestCreateManyTaskInputEnvelope
    set?: ManualTimeRequestWhereUniqueInput | ManualTimeRequestWhereUniqueInput[]
    disconnect?: ManualTimeRequestWhereUniqueInput | ManualTimeRequestWhereUniqueInput[]
    delete?: ManualTimeRequestWhereUniqueInput | ManualTimeRequestWhereUniqueInput[]
    connect?: ManualTimeRequestWhereUniqueInput | ManualTimeRequestWhereUniqueInput[]
    update?: ManualTimeRequestUpdateWithWhereUniqueWithoutTaskInput | ManualTimeRequestUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: ManualTimeRequestUpdateManyWithWhereWithoutTaskInput | ManualTimeRequestUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: ManualTimeRequestScalarWhereInput | ManualTimeRequestScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutManualTimeRequestsInput = {
    create?: XOR<UserCreateWithoutManualTimeRequestsInput, UserUncheckedCreateWithoutManualTimeRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutManualTimeRequestsInput
    connect?: UserWhereUniqueInput
  }

  export type ProjectCreateNestedOneWithoutManualTimeRequestsInput = {
    create?: XOR<ProjectCreateWithoutManualTimeRequestsInput, ProjectUncheckedCreateWithoutManualTimeRequestsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutManualTimeRequestsInput
    connect?: ProjectWhereUniqueInput
  }

  export type TaskCreateNestedOneWithoutManualTimeRequestsInput = {
    create?: XOR<TaskCreateWithoutManualTimeRequestsInput, TaskUncheckedCreateWithoutManualTimeRequestsInput>
    connectOrCreate?: TaskCreateOrConnectWithoutManualTimeRequestsInput
    connect?: TaskWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutManualTimeRequestsNestedInput = {
    create?: XOR<UserCreateWithoutManualTimeRequestsInput, UserUncheckedCreateWithoutManualTimeRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutManualTimeRequestsInput
    upsert?: UserUpsertWithoutManualTimeRequestsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutManualTimeRequestsInput, UserUpdateWithoutManualTimeRequestsInput>, UserUncheckedUpdateWithoutManualTimeRequestsInput>
  }

  export type ProjectUpdateOneWithoutManualTimeRequestsNestedInput = {
    create?: XOR<ProjectCreateWithoutManualTimeRequestsInput, ProjectUncheckedCreateWithoutManualTimeRequestsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutManualTimeRequestsInput
    upsert?: ProjectUpsertWithoutManualTimeRequestsInput
    disconnect?: ProjectWhereInput | boolean
    delete?: ProjectWhereInput | boolean
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutManualTimeRequestsInput, ProjectUpdateWithoutManualTimeRequestsInput>, ProjectUncheckedUpdateWithoutManualTimeRequestsInput>
  }

  export type TaskUpdateOneWithoutManualTimeRequestsNestedInput = {
    create?: XOR<TaskCreateWithoutManualTimeRequestsInput, TaskUncheckedCreateWithoutManualTimeRequestsInput>
    connectOrCreate?: TaskCreateOrConnectWithoutManualTimeRequestsInput
    upsert?: TaskUpsertWithoutManualTimeRequestsInput
    disconnect?: TaskWhereInput | boolean
    delete?: TaskWhereInput | boolean
    connect?: TaskWhereUniqueInput
    update?: XOR<XOR<TaskUpdateToOneWithWhereWithoutManualTimeRequestsInput, TaskUpdateWithoutManualTimeRequestsInput>, TaskUncheckedUpdateWithoutManualTimeRequestsInput>
  }

  export type UserCreateNestedOneWithoutAlertsInput = {
    create?: XOR<UserCreateWithoutAlertsInput, UserUncheckedCreateWithoutAlertsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAlertsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneWithoutAlertsNestedInput = {
    create?: XOR<UserCreateWithoutAlertsInput, UserUncheckedCreateWithoutAlertsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAlertsInput
    upsert?: UserUpsertWithoutAlertsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAlertsInput, UserUpdateWithoutAlertsInput>, UserUncheckedUpdateWithoutAlertsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type ActivityLogCreateWithoutUserInput = {
    id?: string
    timestamp?: Date | string
    status: string
    currentTask?: string
    appProcess?: string | null
    appTitle?: string | null
    keystrokes?: number
    mouseClicks?: number
    durationSeconds?: number
    idleSeconds?: number
    continuousIdleSeconds?: number
    clientEventId?: string | null
    taskId?: string | null
    productivityCategory?: string
  }

  export type ActivityLogUncheckedCreateWithoutUserInput = {
    id?: string
    timestamp?: Date | string
    status: string
    currentTask?: string
    appProcess?: string | null
    appTitle?: string | null
    keystrokes?: number
    mouseClicks?: number
    durationSeconds?: number
    idleSeconds?: number
    continuousIdleSeconds?: number
    clientEventId?: string | null
    taskId?: string | null
    productivityCategory?: string
  }

  export type ActivityLogCreateOrConnectWithoutUserInput = {
    where: ActivityLogWhereUniqueInput
    create: XOR<ActivityLogCreateWithoutUserInput, ActivityLogUncheckedCreateWithoutUserInput>
  }

  export type ActivityLogCreateManyUserInputEnvelope = {
    data: ActivityLogCreateManyUserInput | ActivityLogCreateManyUserInput[]
  }

  export type ScreenshotCreateWithoutUserInput = {
    id?: string
    timestamp?: Date | string
    filePath: string
    activityRate: number
    currentTask?: string
    keystrokes?: number
    mouseClicks?: number
    clientEventId?: string | null
  }

  export type ScreenshotUncheckedCreateWithoutUserInput = {
    id?: string
    timestamp?: Date | string
    filePath: string
    activityRate: number
    currentTask?: string
    keystrokes?: number
    mouseClicks?: number
    clientEventId?: string | null
  }

  export type ScreenshotCreateOrConnectWithoutUserInput = {
    where: ScreenshotWhereUniqueInput
    create: XOR<ScreenshotCreateWithoutUserInput, ScreenshotUncheckedCreateWithoutUserInput>
  }

  export type ScreenshotCreateManyUserInputEnvelope = {
    data: ScreenshotCreateManyUserInput | ScreenshotCreateManyUserInput[]
  }

  export type WorkReportCreateWithoutUserInput = {
    id?: string
    type: string
    note: string
    emailSent?: boolean
    createdAt?: Date | string
    endedAt?: Date | string | null
    durationSeconds?: number | null
    clientEventId?: string | null
    taskId?: string | null
  }

  export type WorkReportUncheckedCreateWithoutUserInput = {
    id?: string
    type: string
    note: string
    emailSent?: boolean
    createdAt?: Date | string
    endedAt?: Date | string | null
    durationSeconds?: number | null
    clientEventId?: string | null
    taskId?: string | null
  }

  export type WorkReportCreateOrConnectWithoutUserInput = {
    where: WorkReportWhereUniqueInput
    create: XOR<WorkReportCreateWithoutUserInput, WorkReportUncheckedCreateWithoutUserInput>
  }

  export type WorkReportCreateManyUserInputEnvelope = {
    data: WorkReportCreateManyUserInput | WorkReportCreateManyUserInput[]
  }

  export type TrackingSessionCreateWithoutUserInput = {
    id?: string
    clientSessionId?: string | null
    companyId: string
    dateKey: string
    startedAt?: Date | string
    endedAt?: Date | string | null
    lastHeartbeatAt?: Date | string
    status?: string
    breakStartedAt?: Date | string | null
    activeSeconds?: number
    idleSeconds?: number
    breakSeconds?: number
    reviewRequired?: boolean
    reviewReason?: string | null
    currentTask?: string
    taskId?: string | null
  }

  export type TrackingSessionUncheckedCreateWithoutUserInput = {
    id?: string
    clientSessionId?: string | null
    companyId: string
    dateKey: string
    startedAt?: Date | string
    endedAt?: Date | string | null
    lastHeartbeatAt?: Date | string
    status?: string
    breakStartedAt?: Date | string | null
    activeSeconds?: number
    idleSeconds?: number
    breakSeconds?: number
    reviewRequired?: boolean
    reviewReason?: string | null
    currentTask?: string
    taskId?: string | null
  }

  export type TrackingSessionCreateOrConnectWithoutUserInput = {
    where: TrackingSessionWhereUniqueInput
    create: XOR<TrackingSessionCreateWithoutUserInput, TrackingSessionUncheckedCreateWithoutUserInput>
  }

  export type TrackingSessionCreateManyUserInputEnvelope = {
    data: TrackingSessionCreateManyUserInput | TrackingSessionCreateManyUserInput[]
  }

  export type ManualTimeRequestCreateWithoutUserInput = {
    id?: string
    companyId: string
    startAt: Date | string
    endAt: Date | string
    note: string
    status?: string
    reviewedBy?: string | null
    reviewedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    project?: ProjectCreateNestedOneWithoutManualTimeRequestsInput
    task?: TaskCreateNestedOneWithoutManualTimeRequestsInput
  }

  export type ManualTimeRequestUncheckedCreateWithoutUserInput = {
    id?: string
    companyId: string
    startAt: Date | string
    endAt: Date | string
    note: string
    projectId?: string | null
    taskId?: string | null
    status?: string
    reviewedBy?: string | null
    reviewedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ManualTimeRequestCreateOrConnectWithoutUserInput = {
    where: ManualTimeRequestWhereUniqueInput
    create: XOR<ManualTimeRequestCreateWithoutUserInput, ManualTimeRequestUncheckedCreateWithoutUserInput>
  }

  export type ManualTimeRequestCreateManyUserInputEnvelope = {
    data: ManualTimeRequestCreateManyUserInput | ManualTimeRequestCreateManyUserInput[]
  }

  export type TaskCreateWithoutAssignedUserInput = {
    id?: string
    companyId: string
    title: string
    description?: string | null
    status?: string
    priority?: string
    dueDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    project?: ProjectCreateNestedOneWithoutTasksInput
    manualTimeRequests?: ManualTimeRequestCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutAssignedUserInput = {
    id?: string
    companyId: string
    projectId?: string | null
    title: string
    description?: string | null
    status?: string
    priority?: string
    dueDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    manualTimeRequests?: ManualTimeRequestUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutAssignedUserInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutAssignedUserInput, TaskUncheckedCreateWithoutAssignedUserInput>
  }

  export type TaskCreateManyAssignedUserInputEnvelope = {
    data: TaskCreateManyAssignedUserInput | TaskCreateManyAssignedUserInput[]
  }

  export type AlertCreateWithoutUserInput = {
    id?: string
    companyId: string
    type: string
    severity?: string
    message: string
    metadata?: string | null
    createdAt?: Date | string
    readAt?: Date | string | null
  }

  export type AlertUncheckedCreateWithoutUserInput = {
    id?: string
    companyId: string
    type: string
    severity?: string
    message: string
    metadata?: string | null
    createdAt?: Date | string
    readAt?: Date | string | null
  }

  export type AlertCreateOrConnectWithoutUserInput = {
    where: AlertWhereUniqueInput
    create: XOR<AlertCreateWithoutUserInput, AlertUncheckedCreateWithoutUserInput>
  }

  export type AlertCreateManyUserInputEnvelope = {
    data: AlertCreateManyUserInput | AlertCreateManyUserInput[]
  }

  export type ActivityLogUpsertWithWhereUniqueWithoutUserInput = {
    where: ActivityLogWhereUniqueInput
    update: XOR<ActivityLogUpdateWithoutUserInput, ActivityLogUncheckedUpdateWithoutUserInput>
    create: XOR<ActivityLogCreateWithoutUserInput, ActivityLogUncheckedCreateWithoutUserInput>
  }

  export type ActivityLogUpdateWithWhereUniqueWithoutUserInput = {
    where: ActivityLogWhereUniqueInput
    data: XOR<ActivityLogUpdateWithoutUserInput, ActivityLogUncheckedUpdateWithoutUserInput>
  }

  export type ActivityLogUpdateManyWithWhereWithoutUserInput = {
    where: ActivityLogScalarWhereInput
    data: XOR<ActivityLogUpdateManyMutationInput, ActivityLogUncheckedUpdateManyWithoutUserInput>
  }

  export type ActivityLogScalarWhereInput = {
    AND?: ActivityLogScalarWhereInput | ActivityLogScalarWhereInput[]
    OR?: ActivityLogScalarWhereInput[]
    NOT?: ActivityLogScalarWhereInput | ActivityLogScalarWhereInput[]
    id?: StringFilter<"ActivityLog"> | string
    userId?: StringFilter<"ActivityLog"> | string
    timestamp?: DateTimeFilter<"ActivityLog"> | Date | string
    status?: StringFilter<"ActivityLog"> | string
    currentTask?: StringFilter<"ActivityLog"> | string
    appProcess?: StringNullableFilter<"ActivityLog"> | string | null
    appTitle?: StringNullableFilter<"ActivityLog"> | string | null
    keystrokes?: IntFilter<"ActivityLog"> | number
    mouseClicks?: IntFilter<"ActivityLog"> | number
    durationSeconds?: IntFilter<"ActivityLog"> | number
    idleSeconds?: IntFilter<"ActivityLog"> | number
    continuousIdleSeconds?: IntFilter<"ActivityLog"> | number
    clientEventId?: StringNullableFilter<"ActivityLog"> | string | null
    taskId?: StringNullableFilter<"ActivityLog"> | string | null
    productivityCategory?: StringFilter<"ActivityLog"> | string
  }

  export type ScreenshotUpsertWithWhereUniqueWithoutUserInput = {
    where: ScreenshotWhereUniqueInput
    update: XOR<ScreenshotUpdateWithoutUserInput, ScreenshotUncheckedUpdateWithoutUserInput>
    create: XOR<ScreenshotCreateWithoutUserInput, ScreenshotUncheckedCreateWithoutUserInput>
  }

  export type ScreenshotUpdateWithWhereUniqueWithoutUserInput = {
    where: ScreenshotWhereUniqueInput
    data: XOR<ScreenshotUpdateWithoutUserInput, ScreenshotUncheckedUpdateWithoutUserInput>
  }

  export type ScreenshotUpdateManyWithWhereWithoutUserInput = {
    where: ScreenshotScalarWhereInput
    data: XOR<ScreenshotUpdateManyMutationInput, ScreenshotUncheckedUpdateManyWithoutUserInput>
  }

  export type ScreenshotScalarWhereInput = {
    AND?: ScreenshotScalarWhereInput | ScreenshotScalarWhereInput[]
    OR?: ScreenshotScalarWhereInput[]
    NOT?: ScreenshotScalarWhereInput | ScreenshotScalarWhereInput[]
    id?: StringFilter<"Screenshot"> | string
    userId?: StringFilter<"Screenshot"> | string
    timestamp?: DateTimeFilter<"Screenshot"> | Date | string
    filePath?: StringFilter<"Screenshot"> | string
    activityRate?: IntFilter<"Screenshot"> | number
    currentTask?: StringFilter<"Screenshot"> | string
    keystrokes?: IntFilter<"Screenshot"> | number
    mouseClicks?: IntFilter<"Screenshot"> | number
    clientEventId?: StringNullableFilter<"Screenshot"> | string | null
  }

  export type WorkReportUpsertWithWhereUniqueWithoutUserInput = {
    where: WorkReportWhereUniqueInput
    update: XOR<WorkReportUpdateWithoutUserInput, WorkReportUncheckedUpdateWithoutUserInput>
    create: XOR<WorkReportCreateWithoutUserInput, WorkReportUncheckedCreateWithoutUserInput>
  }

  export type WorkReportUpdateWithWhereUniqueWithoutUserInput = {
    where: WorkReportWhereUniqueInput
    data: XOR<WorkReportUpdateWithoutUserInput, WorkReportUncheckedUpdateWithoutUserInput>
  }

  export type WorkReportUpdateManyWithWhereWithoutUserInput = {
    where: WorkReportScalarWhereInput
    data: XOR<WorkReportUpdateManyMutationInput, WorkReportUncheckedUpdateManyWithoutUserInput>
  }

  export type WorkReportScalarWhereInput = {
    AND?: WorkReportScalarWhereInput | WorkReportScalarWhereInput[]
    OR?: WorkReportScalarWhereInput[]
    NOT?: WorkReportScalarWhereInput | WorkReportScalarWhereInput[]
    id?: StringFilter<"WorkReport"> | string
    userId?: StringFilter<"WorkReport"> | string
    type?: StringFilter<"WorkReport"> | string
    note?: StringFilter<"WorkReport"> | string
    emailSent?: BoolFilter<"WorkReport"> | boolean
    createdAt?: DateTimeFilter<"WorkReport"> | Date | string
    endedAt?: DateTimeNullableFilter<"WorkReport"> | Date | string | null
    durationSeconds?: IntNullableFilter<"WorkReport"> | number | null
    clientEventId?: StringNullableFilter<"WorkReport"> | string | null
    taskId?: StringNullableFilter<"WorkReport"> | string | null
  }

  export type TrackingSessionUpsertWithWhereUniqueWithoutUserInput = {
    where: TrackingSessionWhereUniqueInput
    update: XOR<TrackingSessionUpdateWithoutUserInput, TrackingSessionUncheckedUpdateWithoutUserInput>
    create: XOR<TrackingSessionCreateWithoutUserInput, TrackingSessionUncheckedCreateWithoutUserInput>
  }

  export type TrackingSessionUpdateWithWhereUniqueWithoutUserInput = {
    where: TrackingSessionWhereUniqueInput
    data: XOR<TrackingSessionUpdateWithoutUserInput, TrackingSessionUncheckedUpdateWithoutUserInput>
  }

  export type TrackingSessionUpdateManyWithWhereWithoutUserInput = {
    where: TrackingSessionScalarWhereInput
    data: XOR<TrackingSessionUpdateManyMutationInput, TrackingSessionUncheckedUpdateManyWithoutUserInput>
  }

  export type TrackingSessionScalarWhereInput = {
    AND?: TrackingSessionScalarWhereInput | TrackingSessionScalarWhereInput[]
    OR?: TrackingSessionScalarWhereInput[]
    NOT?: TrackingSessionScalarWhereInput | TrackingSessionScalarWhereInput[]
    id?: StringFilter<"TrackingSession"> | string
    clientSessionId?: StringNullableFilter<"TrackingSession"> | string | null
    userId?: StringFilter<"TrackingSession"> | string
    companyId?: StringFilter<"TrackingSession"> | string
    dateKey?: StringFilter<"TrackingSession"> | string
    startedAt?: DateTimeFilter<"TrackingSession"> | Date | string
    endedAt?: DateTimeNullableFilter<"TrackingSession"> | Date | string | null
    lastHeartbeatAt?: DateTimeFilter<"TrackingSession"> | Date | string
    status?: StringFilter<"TrackingSession"> | string
    breakStartedAt?: DateTimeNullableFilter<"TrackingSession"> | Date | string | null
    activeSeconds?: IntFilter<"TrackingSession"> | number
    idleSeconds?: IntFilter<"TrackingSession"> | number
    breakSeconds?: IntFilter<"TrackingSession"> | number
    reviewRequired?: BoolFilter<"TrackingSession"> | boolean
    reviewReason?: StringNullableFilter<"TrackingSession"> | string | null
    currentTask?: StringFilter<"TrackingSession"> | string
    taskId?: StringNullableFilter<"TrackingSession"> | string | null
  }

  export type ManualTimeRequestUpsertWithWhereUniqueWithoutUserInput = {
    where: ManualTimeRequestWhereUniqueInput
    update: XOR<ManualTimeRequestUpdateWithoutUserInput, ManualTimeRequestUncheckedUpdateWithoutUserInput>
    create: XOR<ManualTimeRequestCreateWithoutUserInput, ManualTimeRequestUncheckedCreateWithoutUserInput>
  }

  export type ManualTimeRequestUpdateWithWhereUniqueWithoutUserInput = {
    where: ManualTimeRequestWhereUniqueInput
    data: XOR<ManualTimeRequestUpdateWithoutUserInput, ManualTimeRequestUncheckedUpdateWithoutUserInput>
  }

  export type ManualTimeRequestUpdateManyWithWhereWithoutUserInput = {
    where: ManualTimeRequestScalarWhereInput
    data: XOR<ManualTimeRequestUpdateManyMutationInput, ManualTimeRequestUncheckedUpdateManyWithoutUserInput>
  }

  export type ManualTimeRequestScalarWhereInput = {
    AND?: ManualTimeRequestScalarWhereInput | ManualTimeRequestScalarWhereInput[]
    OR?: ManualTimeRequestScalarWhereInput[]
    NOT?: ManualTimeRequestScalarWhereInput | ManualTimeRequestScalarWhereInput[]
    id?: StringFilter<"ManualTimeRequest"> | string
    userId?: StringFilter<"ManualTimeRequest"> | string
    companyId?: StringFilter<"ManualTimeRequest"> | string
    startAt?: DateTimeFilter<"ManualTimeRequest"> | Date | string
    endAt?: DateTimeFilter<"ManualTimeRequest"> | Date | string
    note?: StringFilter<"ManualTimeRequest"> | string
    projectId?: StringNullableFilter<"ManualTimeRequest"> | string | null
    taskId?: StringNullableFilter<"ManualTimeRequest"> | string | null
    status?: StringFilter<"ManualTimeRequest"> | string
    reviewedBy?: StringNullableFilter<"ManualTimeRequest"> | string | null
    reviewedAt?: DateTimeNullableFilter<"ManualTimeRequest"> | Date | string | null
    createdAt?: DateTimeFilter<"ManualTimeRequest"> | Date | string
    updatedAt?: DateTimeFilter<"ManualTimeRequest"> | Date | string
  }

  export type TaskUpsertWithWhereUniqueWithoutAssignedUserInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutAssignedUserInput, TaskUncheckedUpdateWithoutAssignedUserInput>
    create: XOR<TaskCreateWithoutAssignedUserInput, TaskUncheckedCreateWithoutAssignedUserInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutAssignedUserInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutAssignedUserInput, TaskUncheckedUpdateWithoutAssignedUserInput>
  }

  export type TaskUpdateManyWithWhereWithoutAssignedUserInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutAssignedUserInput>
  }

  export type TaskScalarWhereInput = {
    AND?: TaskScalarWhereInput | TaskScalarWhereInput[]
    OR?: TaskScalarWhereInput[]
    NOT?: TaskScalarWhereInput | TaskScalarWhereInput[]
    id?: StringFilter<"Task"> | string
    companyId?: StringFilter<"Task"> | string
    projectId?: StringNullableFilter<"Task"> | string | null
    assignedUserId?: StringNullableFilter<"Task"> | string | null
    title?: StringFilter<"Task"> | string
    description?: StringNullableFilter<"Task"> | string | null
    status?: StringFilter<"Task"> | string
    priority?: StringFilter<"Task"> | string
    dueDate?: DateTimeNullableFilter<"Task"> | Date | string | null
    createdAt?: DateTimeFilter<"Task"> | Date | string
    updatedAt?: DateTimeFilter<"Task"> | Date | string
  }

  export type AlertUpsertWithWhereUniqueWithoutUserInput = {
    where: AlertWhereUniqueInput
    update: XOR<AlertUpdateWithoutUserInput, AlertUncheckedUpdateWithoutUserInput>
    create: XOR<AlertCreateWithoutUserInput, AlertUncheckedCreateWithoutUserInput>
  }

  export type AlertUpdateWithWhereUniqueWithoutUserInput = {
    where: AlertWhereUniqueInput
    data: XOR<AlertUpdateWithoutUserInput, AlertUncheckedUpdateWithoutUserInput>
  }

  export type AlertUpdateManyWithWhereWithoutUserInput = {
    where: AlertScalarWhereInput
    data: XOR<AlertUpdateManyMutationInput, AlertUncheckedUpdateManyWithoutUserInput>
  }

  export type AlertScalarWhereInput = {
    AND?: AlertScalarWhereInput | AlertScalarWhereInput[]
    OR?: AlertScalarWhereInput[]
    NOT?: AlertScalarWhereInput | AlertScalarWhereInput[]
    id?: StringFilter<"Alert"> | string
    companyId?: StringFilter<"Alert"> | string
    userId?: StringNullableFilter<"Alert"> | string | null
    type?: StringFilter<"Alert"> | string
    severity?: StringFilter<"Alert"> | string
    message?: StringFilter<"Alert"> | string
    metadata?: StringNullableFilter<"Alert"> | string | null
    createdAt?: DateTimeFilter<"Alert"> | Date | string
    readAt?: DateTimeNullableFilter<"Alert"> | Date | string | null
  }

  export type UserCreateWithoutWorkReportsInput = {
    id?: string
    email: string
    name: string
    password: string
    role: string
    companyId?: string | null
    screenshotInterval?: number
    idleLimitMinutes?: number
    timezone?: string
    workDays?: string
    shiftStartMinutes?: number
    shiftEndMinutes?: number
    targetMinutes?: number
    maxShiftMinutes?: number
    maxBreakMinutes?: number
    screenshotRetentionDays?: number
    manualTimeRequiresApproval?: boolean
    resetCode?: string | null
    resetExpires?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    activities?: ActivityLogCreateNestedManyWithoutUserInput
    screenshots?: ScreenshotCreateNestedManyWithoutUserInput
    trackingSessions?: TrackingSessionCreateNestedManyWithoutUserInput
    manualTimeRequests?: ManualTimeRequestCreateNestedManyWithoutUserInput
    assignedTasks?: TaskCreateNestedManyWithoutAssignedUserInput
    alerts?: AlertCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutWorkReportsInput = {
    id?: string
    email: string
    name: string
    password: string
    role: string
    companyId?: string | null
    screenshotInterval?: number
    idleLimitMinutes?: number
    timezone?: string
    workDays?: string
    shiftStartMinutes?: number
    shiftEndMinutes?: number
    targetMinutes?: number
    maxShiftMinutes?: number
    maxBreakMinutes?: number
    screenshotRetentionDays?: number
    manualTimeRequiresApproval?: boolean
    resetCode?: string | null
    resetExpires?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    activities?: ActivityLogUncheckedCreateNestedManyWithoutUserInput
    screenshots?: ScreenshotUncheckedCreateNestedManyWithoutUserInput
    trackingSessions?: TrackingSessionUncheckedCreateNestedManyWithoutUserInput
    manualTimeRequests?: ManualTimeRequestUncheckedCreateNestedManyWithoutUserInput
    assignedTasks?: TaskUncheckedCreateNestedManyWithoutAssignedUserInput
    alerts?: AlertUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutWorkReportsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWorkReportsInput, UserUncheckedCreateWithoutWorkReportsInput>
  }

  export type UserUpsertWithoutWorkReportsInput = {
    update: XOR<UserUpdateWithoutWorkReportsInput, UserUncheckedUpdateWithoutWorkReportsInput>
    create: XOR<UserCreateWithoutWorkReportsInput, UserUncheckedCreateWithoutWorkReportsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWorkReportsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWorkReportsInput, UserUncheckedUpdateWithoutWorkReportsInput>
  }

  export type UserUpdateWithoutWorkReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    screenshotInterval?: IntFieldUpdateOperationsInput | number
    idleLimitMinutes?: IntFieldUpdateOperationsInput | number
    timezone?: StringFieldUpdateOperationsInput | string
    workDays?: StringFieldUpdateOperationsInput | string
    shiftStartMinutes?: IntFieldUpdateOperationsInput | number
    shiftEndMinutes?: IntFieldUpdateOperationsInput | number
    targetMinutes?: IntFieldUpdateOperationsInput | number
    maxShiftMinutes?: IntFieldUpdateOperationsInput | number
    maxBreakMinutes?: IntFieldUpdateOperationsInput | number
    screenshotRetentionDays?: IntFieldUpdateOperationsInput | number
    manualTimeRequiresApproval?: BoolFieldUpdateOperationsInput | boolean
    resetCode?: NullableStringFieldUpdateOperationsInput | string | null
    resetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activities?: ActivityLogUpdateManyWithoutUserNestedInput
    screenshots?: ScreenshotUpdateManyWithoutUserNestedInput
    trackingSessions?: TrackingSessionUpdateManyWithoutUserNestedInput
    manualTimeRequests?: ManualTimeRequestUpdateManyWithoutUserNestedInput
    assignedTasks?: TaskUpdateManyWithoutAssignedUserNestedInput
    alerts?: AlertUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutWorkReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    screenshotInterval?: IntFieldUpdateOperationsInput | number
    idleLimitMinutes?: IntFieldUpdateOperationsInput | number
    timezone?: StringFieldUpdateOperationsInput | string
    workDays?: StringFieldUpdateOperationsInput | string
    shiftStartMinutes?: IntFieldUpdateOperationsInput | number
    shiftEndMinutes?: IntFieldUpdateOperationsInput | number
    targetMinutes?: IntFieldUpdateOperationsInput | number
    maxShiftMinutes?: IntFieldUpdateOperationsInput | number
    maxBreakMinutes?: IntFieldUpdateOperationsInput | number
    screenshotRetentionDays?: IntFieldUpdateOperationsInput | number
    manualTimeRequiresApproval?: BoolFieldUpdateOperationsInput | boolean
    resetCode?: NullableStringFieldUpdateOperationsInput | string | null
    resetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activities?: ActivityLogUncheckedUpdateManyWithoutUserNestedInput
    screenshots?: ScreenshotUncheckedUpdateManyWithoutUserNestedInput
    trackingSessions?: TrackingSessionUncheckedUpdateManyWithoutUserNestedInput
    manualTimeRequests?: ManualTimeRequestUncheckedUpdateManyWithoutUserNestedInput
    assignedTasks?: TaskUncheckedUpdateManyWithoutAssignedUserNestedInput
    alerts?: AlertUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutActivitiesInput = {
    id?: string
    email: string
    name: string
    password: string
    role: string
    companyId?: string | null
    screenshotInterval?: number
    idleLimitMinutes?: number
    timezone?: string
    workDays?: string
    shiftStartMinutes?: number
    shiftEndMinutes?: number
    targetMinutes?: number
    maxShiftMinutes?: number
    maxBreakMinutes?: number
    screenshotRetentionDays?: number
    manualTimeRequiresApproval?: boolean
    resetCode?: string | null
    resetExpires?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    screenshots?: ScreenshotCreateNestedManyWithoutUserInput
    workReports?: WorkReportCreateNestedManyWithoutUserInput
    trackingSessions?: TrackingSessionCreateNestedManyWithoutUserInput
    manualTimeRequests?: ManualTimeRequestCreateNestedManyWithoutUserInput
    assignedTasks?: TaskCreateNestedManyWithoutAssignedUserInput
    alerts?: AlertCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutActivitiesInput = {
    id?: string
    email: string
    name: string
    password: string
    role: string
    companyId?: string | null
    screenshotInterval?: number
    idleLimitMinutes?: number
    timezone?: string
    workDays?: string
    shiftStartMinutes?: number
    shiftEndMinutes?: number
    targetMinutes?: number
    maxShiftMinutes?: number
    maxBreakMinutes?: number
    screenshotRetentionDays?: number
    manualTimeRequiresApproval?: boolean
    resetCode?: string | null
    resetExpires?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    screenshots?: ScreenshotUncheckedCreateNestedManyWithoutUserInput
    workReports?: WorkReportUncheckedCreateNestedManyWithoutUserInput
    trackingSessions?: TrackingSessionUncheckedCreateNestedManyWithoutUserInput
    manualTimeRequests?: ManualTimeRequestUncheckedCreateNestedManyWithoutUserInput
    assignedTasks?: TaskUncheckedCreateNestedManyWithoutAssignedUserInput
    alerts?: AlertUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutActivitiesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutActivitiesInput, UserUncheckedCreateWithoutActivitiesInput>
  }

  export type UserUpsertWithoutActivitiesInput = {
    update: XOR<UserUpdateWithoutActivitiesInput, UserUncheckedUpdateWithoutActivitiesInput>
    create: XOR<UserCreateWithoutActivitiesInput, UserUncheckedCreateWithoutActivitiesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutActivitiesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutActivitiesInput, UserUncheckedUpdateWithoutActivitiesInput>
  }

  export type UserUpdateWithoutActivitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    screenshotInterval?: IntFieldUpdateOperationsInput | number
    idleLimitMinutes?: IntFieldUpdateOperationsInput | number
    timezone?: StringFieldUpdateOperationsInput | string
    workDays?: StringFieldUpdateOperationsInput | string
    shiftStartMinutes?: IntFieldUpdateOperationsInput | number
    shiftEndMinutes?: IntFieldUpdateOperationsInput | number
    targetMinutes?: IntFieldUpdateOperationsInput | number
    maxShiftMinutes?: IntFieldUpdateOperationsInput | number
    maxBreakMinutes?: IntFieldUpdateOperationsInput | number
    screenshotRetentionDays?: IntFieldUpdateOperationsInput | number
    manualTimeRequiresApproval?: BoolFieldUpdateOperationsInput | boolean
    resetCode?: NullableStringFieldUpdateOperationsInput | string | null
    resetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    screenshots?: ScreenshotUpdateManyWithoutUserNestedInput
    workReports?: WorkReportUpdateManyWithoutUserNestedInput
    trackingSessions?: TrackingSessionUpdateManyWithoutUserNestedInput
    manualTimeRequests?: ManualTimeRequestUpdateManyWithoutUserNestedInput
    assignedTasks?: TaskUpdateManyWithoutAssignedUserNestedInput
    alerts?: AlertUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutActivitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    screenshotInterval?: IntFieldUpdateOperationsInput | number
    idleLimitMinutes?: IntFieldUpdateOperationsInput | number
    timezone?: StringFieldUpdateOperationsInput | string
    workDays?: StringFieldUpdateOperationsInput | string
    shiftStartMinutes?: IntFieldUpdateOperationsInput | number
    shiftEndMinutes?: IntFieldUpdateOperationsInput | number
    targetMinutes?: IntFieldUpdateOperationsInput | number
    maxShiftMinutes?: IntFieldUpdateOperationsInput | number
    maxBreakMinutes?: IntFieldUpdateOperationsInput | number
    screenshotRetentionDays?: IntFieldUpdateOperationsInput | number
    manualTimeRequiresApproval?: BoolFieldUpdateOperationsInput | boolean
    resetCode?: NullableStringFieldUpdateOperationsInput | string | null
    resetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    screenshots?: ScreenshotUncheckedUpdateManyWithoutUserNestedInput
    workReports?: WorkReportUncheckedUpdateManyWithoutUserNestedInput
    trackingSessions?: TrackingSessionUncheckedUpdateManyWithoutUserNestedInput
    manualTimeRequests?: ManualTimeRequestUncheckedUpdateManyWithoutUserNestedInput
    assignedTasks?: TaskUncheckedUpdateManyWithoutAssignedUserNestedInput
    alerts?: AlertUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutScreenshotsInput = {
    id?: string
    email: string
    name: string
    password: string
    role: string
    companyId?: string | null
    screenshotInterval?: number
    idleLimitMinutes?: number
    timezone?: string
    workDays?: string
    shiftStartMinutes?: number
    shiftEndMinutes?: number
    targetMinutes?: number
    maxShiftMinutes?: number
    maxBreakMinutes?: number
    screenshotRetentionDays?: number
    manualTimeRequiresApproval?: boolean
    resetCode?: string | null
    resetExpires?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    activities?: ActivityLogCreateNestedManyWithoutUserInput
    workReports?: WorkReportCreateNestedManyWithoutUserInput
    trackingSessions?: TrackingSessionCreateNestedManyWithoutUserInput
    manualTimeRequests?: ManualTimeRequestCreateNestedManyWithoutUserInput
    assignedTasks?: TaskCreateNestedManyWithoutAssignedUserInput
    alerts?: AlertCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutScreenshotsInput = {
    id?: string
    email: string
    name: string
    password: string
    role: string
    companyId?: string | null
    screenshotInterval?: number
    idleLimitMinutes?: number
    timezone?: string
    workDays?: string
    shiftStartMinutes?: number
    shiftEndMinutes?: number
    targetMinutes?: number
    maxShiftMinutes?: number
    maxBreakMinutes?: number
    screenshotRetentionDays?: number
    manualTimeRequiresApproval?: boolean
    resetCode?: string | null
    resetExpires?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    activities?: ActivityLogUncheckedCreateNestedManyWithoutUserInput
    workReports?: WorkReportUncheckedCreateNestedManyWithoutUserInput
    trackingSessions?: TrackingSessionUncheckedCreateNestedManyWithoutUserInput
    manualTimeRequests?: ManualTimeRequestUncheckedCreateNestedManyWithoutUserInput
    assignedTasks?: TaskUncheckedCreateNestedManyWithoutAssignedUserInput
    alerts?: AlertUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutScreenshotsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutScreenshotsInput, UserUncheckedCreateWithoutScreenshotsInput>
  }

  export type UserUpsertWithoutScreenshotsInput = {
    update: XOR<UserUpdateWithoutScreenshotsInput, UserUncheckedUpdateWithoutScreenshotsInput>
    create: XOR<UserCreateWithoutScreenshotsInput, UserUncheckedCreateWithoutScreenshotsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutScreenshotsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutScreenshotsInput, UserUncheckedUpdateWithoutScreenshotsInput>
  }

  export type UserUpdateWithoutScreenshotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    screenshotInterval?: IntFieldUpdateOperationsInput | number
    idleLimitMinutes?: IntFieldUpdateOperationsInput | number
    timezone?: StringFieldUpdateOperationsInput | string
    workDays?: StringFieldUpdateOperationsInput | string
    shiftStartMinutes?: IntFieldUpdateOperationsInput | number
    shiftEndMinutes?: IntFieldUpdateOperationsInput | number
    targetMinutes?: IntFieldUpdateOperationsInput | number
    maxShiftMinutes?: IntFieldUpdateOperationsInput | number
    maxBreakMinutes?: IntFieldUpdateOperationsInput | number
    screenshotRetentionDays?: IntFieldUpdateOperationsInput | number
    manualTimeRequiresApproval?: BoolFieldUpdateOperationsInput | boolean
    resetCode?: NullableStringFieldUpdateOperationsInput | string | null
    resetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activities?: ActivityLogUpdateManyWithoutUserNestedInput
    workReports?: WorkReportUpdateManyWithoutUserNestedInput
    trackingSessions?: TrackingSessionUpdateManyWithoutUserNestedInput
    manualTimeRequests?: ManualTimeRequestUpdateManyWithoutUserNestedInput
    assignedTasks?: TaskUpdateManyWithoutAssignedUserNestedInput
    alerts?: AlertUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutScreenshotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    screenshotInterval?: IntFieldUpdateOperationsInput | number
    idleLimitMinutes?: IntFieldUpdateOperationsInput | number
    timezone?: StringFieldUpdateOperationsInput | string
    workDays?: StringFieldUpdateOperationsInput | string
    shiftStartMinutes?: IntFieldUpdateOperationsInput | number
    shiftEndMinutes?: IntFieldUpdateOperationsInput | number
    targetMinutes?: IntFieldUpdateOperationsInput | number
    maxShiftMinutes?: IntFieldUpdateOperationsInput | number
    maxBreakMinutes?: IntFieldUpdateOperationsInput | number
    screenshotRetentionDays?: IntFieldUpdateOperationsInput | number
    manualTimeRequiresApproval?: BoolFieldUpdateOperationsInput | boolean
    resetCode?: NullableStringFieldUpdateOperationsInput | string | null
    resetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activities?: ActivityLogUncheckedUpdateManyWithoutUserNestedInput
    workReports?: WorkReportUncheckedUpdateManyWithoutUserNestedInput
    trackingSessions?: TrackingSessionUncheckedUpdateManyWithoutUserNestedInput
    manualTimeRequests?: ManualTimeRequestUncheckedUpdateManyWithoutUserNestedInput
    assignedTasks?: TaskUncheckedUpdateManyWithoutAssignedUserNestedInput
    alerts?: AlertUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutTrackingSessionsInput = {
    id?: string
    email: string
    name: string
    password: string
    role: string
    companyId?: string | null
    screenshotInterval?: number
    idleLimitMinutes?: number
    timezone?: string
    workDays?: string
    shiftStartMinutes?: number
    shiftEndMinutes?: number
    targetMinutes?: number
    maxShiftMinutes?: number
    maxBreakMinutes?: number
    screenshotRetentionDays?: number
    manualTimeRequiresApproval?: boolean
    resetCode?: string | null
    resetExpires?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    activities?: ActivityLogCreateNestedManyWithoutUserInput
    screenshots?: ScreenshotCreateNestedManyWithoutUserInput
    workReports?: WorkReportCreateNestedManyWithoutUserInput
    manualTimeRequests?: ManualTimeRequestCreateNestedManyWithoutUserInput
    assignedTasks?: TaskCreateNestedManyWithoutAssignedUserInput
    alerts?: AlertCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTrackingSessionsInput = {
    id?: string
    email: string
    name: string
    password: string
    role: string
    companyId?: string | null
    screenshotInterval?: number
    idleLimitMinutes?: number
    timezone?: string
    workDays?: string
    shiftStartMinutes?: number
    shiftEndMinutes?: number
    targetMinutes?: number
    maxShiftMinutes?: number
    maxBreakMinutes?: number
    screenshotRetentionDays?: number
    manualTimeRequiresApproval?: boolean
    resetCode?: string | null
    resetExpires?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    activities?: ActivityLogUncheckedCreateNestedManyWithoutUserInput
    screenshots?: ScreenshotUncheckedCreateNestedManyWithoutUserInput
    workReports?: WorkReportUncheckedCreateNestedManyWithoutUserInput
    manualTimeRequests?: ManualTimeRequestUncheckedCreateNestedManyWithoutUserInput
    assignedTasks?: TaskUncheckedCreateNestedManyWithoutAssignedUserInput
    alerts?: AlertUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTrackingSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTrackingSessionsInput, UserUncheckedCreateWithoutTrackingSessionsInput>
  }

  export type UserUpsertWithoutTrackingSessionsInput = {
    update: XOR<UserUpdateWithoutTrackingSessionsInput, UserUncheckedUpdateWithoutTrackingSessionsInput>
    create: XOR<UserCreateWithoutTrackingSessionsInput, UserUncheckedCreateWithoutTrackingSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTrackingSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTrackingSessionsInput, UserUncheckedUpdateWithoutTrackingSessionsInput>
  }

  export type UserUpdateWithoutTrackingSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    screenshotInterval?: IntFieldUpdateOperationsInput | number
    idleLimitMinutes?: IntFieldUpdateOperationsInput | number
    timezone?: StringFieldUpdateOperationsInput | string
    workDays?: StringFieldUpdateOperationsInput | string
    shiftStartMinutes?: IntFieldUpdateOperationsInput | number
    shiftEndMinutes?: IntFieldUpdateOperationsInput | number
    targetMinutes?: IntFieldUpdateOperationsInput | number
    maxShiftMinutes?: IntFieldUpdateOperationsInput | number
    maxBreakMinutes?: IntFieldUpdateOperationsInput | number
    screenshotRetentionDays?: IntFieldUpdateOperationsInput | number
    manualTimeRequiresApproval?: BoolFieldUpdateOperationsInput | boolean
    resetCode?: NullableStringFieldUpdateOperationsInput | string | null
    resetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activities?: ActivityLogUpdateManyWithoutUserNestedInput
    screenshots?: ScreenshotUpdateManyWithoutUserNestedInput
    workReports?: WorkReportUpdateManyWithoutUserNestedInput
    manualTimeRequests?: ManualTimeRequestUpdateManyWithoutUserNestedInput
    assignedTasks?: TaskUpdateManyWithoutAssignedUserNestedInput
    alerts?: AlertUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTrackingSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    screenshotInterval?: IntFieldUpdateOperationsInput | number
    idleLimitMinutes?: IntFieldUpdateOperationsInput | number
    timezone?: StringFieldUpdateOperationsInput | string
    workDays?: StringFieldUpdateOperationsInput | string
    shiftStartMinutes?: IntFieldUpdateOperationsInput | number
    shiftEndMinutes?: IntFieldUpdateOperationsInput | number
    targetMinutes?: IntFieldUpdateOperationsInput | number
    maxShiftMinutes?: IntFieldUpdateOperationsInput | number
    maxBreakMinutes?: IntFieldUpdateOperationsInput | number
    screenshotRetentionDays?: IntFieldUpdateOperationsInput | number
    manualTimeRequiresApproval?: BoolFieldUpdateOperationsInput | boolean
    resetCode?: NullableStringFieldUpdateOperationsInput | string | null
    resetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activities?: ActivityLogUncheckedUpdateManyWithoutUserNestedInput
    screenshots?: ScreenshotUncheckedUpdateManyWithoutUserNestedInput
    workReports?: WorkReportUncheckedUpdateManyWithoutUserNestedInput
    manualTimeRequests?: ManualTimeRequestUncheckedUpdateManyWithoutUserNestedInput
    assignedTasks?: TaskUncheckedUpdateManyWithoutAssignedUserNestedInput
    alerts?: AlertUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TaskCreateWithoutProjectInput = {
    id?: string
    companyId: string
    title: string
    description?: string | null
    status?: string
    priority?: string
    dueDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    assignedUser?: UserCreateNestedOneWithoutAssignedTasksInput
    manualTimeRequests?: ManualTimeRequestCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutProjectInput = {
    id?: string
    companyId: string
    assignedUserId?: string | null
    title: string
    description?: string | null
    status?: string
    priority?: string
    dueDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    manualTimeRequests?: ManualTimeRequestUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutProjectInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutProjectInput, TaskUncheckedCreateWithoutProjectInput>
  }

  export type TaskCreateManyProjectInputEnvelope = {
    data: TaskCreateManyProjectInput | TaskCreateManyProjectInput[]
  }

  export type ManualTimeRequestCreateWithoutProjectInput = {
    id?: string
    companyId: string
    startAt: Date | string
    endAt: Date | string
    note: string
    status?: string
    reviewedBy?: string | null
    reviewedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutManualTimeRequestsInput
    task?: TaskCreateNestedOneWithoutManualTimeRequestsInput
  }

  export type ManualTimeRequestUncheckedCreateWithoutProjectInput = {
    id?: string
    userId: string
    companyId: string
    startAt: Date | string
    endAt: Date | string
    note: string
    taskId?: string | null
    status?: string
    reviewedBy?: string | null
    reviewedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ManualTimeRequestCreateOrConnectWithoutProjectInput = {
    where: ManualTimeRequestWhereUniqueInput
    create: XOR<ManualTimeRequestCreateWithoutProjectInput, ManualTimeRequestUncheckedCreateWithoutProjectInput>
  }

  export type ManualTimeRequestCreateManyProjectInputEnvelope = {
    data: ManualTimeRequestCreateManyProjectInput | ManualTimeRequestCreateManyProjectInput[]
  }

  export type TaskUpsertWithWhereUniqueWithoutProjectInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutProjectInput, TaskUncheckedUpdateWithoutProjectInput>
    create: XOR<TaskCreateWithoutProjectInput, TaskUncheckedCreateWithoutProjectInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutProjectInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutProjectInput, TaskUncheckedUpdateWithoutProjectInput>
  }

  export type TaskUpdateManyWithWhereWithoutProjectInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutProjectInput>
  }

  export type ManualTimeRequestUpsertWithWhereUniqueWithoutProjectInput = {
    where: ManualTimeRequestWhereUniqueInput
    update: XOR<ManualTimeRequestUpdateWithoutProjectInput, ManualTimeRequestUncheckedUpdateWithoutProjectInput>
    create: XOR<ManualTimeRequestCreateWithoutProjectInput, ManualTimeRequestUncheckedCreateWithoutProjectInput>
  }

  export type ManualTimeRequestUpdateWithWhereUniqueWithoutProjectInput = {
    where: ManualTimeRequestWhereUniqueInput
    data: XOR<ManualTimeRequestUpdateWithoutProjectInput, ManualTimeRequestUncheckedUpdateWithoutProjectInput>
  }

  export type ManualTimeRequestUpdateManyWithWhereWithoutProjectInput = {
    where: ManualTimeRequestScalarWhereInput
    data: XOR<ManualTimeRequestUpdateManyMutationInput, ManualTimeRequestUncheckedUpdateManyWithoutProjectInput>
  }

  export type ProjectCreateWithoutTasksInput = {
    id?: string
    companyId: string
    name: string
    code?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    manualTimeRequests?: ManualTimeRequestCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutTasksInput = {
    id?: string
    companyId: string
    name: string
    code?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    manualTimeRequests?: ManualTimeRequestUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutTasksInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutTasksInput, ProjectUncheckedCreateWithoutTasksInput>
  }

  export type UserCreateWithoutAssignedTasksInput = {
    id?: string
    email: string
    name: string
    password: string
    role: string
    companyId?: string | null
    screenshotInterval?: number
    idleLimitMinutes?: number
    timezone?: string
    workDays?: string
    shiftStartMinutes?: number
    shiftEndMinutes?: number
    targetMinutes?: number
    maxShiftMinutes?: number
    maxBreakMinutes?: number
    screenshotRetentionDays?: number
    manualTimeRequiresApproval?: boolean
    resetCode?: string | null
    resetExpires?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    activities?: ActivityLogCreateNestedManyWithoutUserInput
    screenshots?: ScreenshotCreateNestedManyWithoutUserInput
    workReports?: WorkReportCreateNestedManyWithoutUserInput
    trackingSessions?: TrackingSessionCreateNestedManyWithoutUserInput
    manualTimeRequests?: ManualTimeRequestCreateNestedManyWithoutUserInput
    alerts?: AlertCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAssignedTasksInput = {
    id?: string
    email: string
    name: string
    password: string
    role: string
    companyId?: string | null
    screenshotInterval?: number
    idleLimitMinutes?: number
    timezone?: string
    workDays?: string
    shiftStartMinutes?: number
    shiftEndMinutes?: number
    targetMinutes?: number
    maxShiftMinutes?: number
    maxBreakMinutes?: number
    screenshotRetentionDays?: number
    manualTimeRequiresApproval?: boolean
    resetCode?: string | null
    resetExpires?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    activities?: ActivityLogUncheckedCreateNestedManyWithoutUserInput
    screenshots?: ScreenshotUncheckedCreateNestedManyWithoutUserInput
    workReports?: WorkReportUncheckedCreateNestedManyWithoutUserInput
    trackingSessions?: TrackingSessionUncheckedCreateNestedManyWithoutUserInput
    manualTimeRequests?: ManualTimeRequestUncheckedCreateNestedManyWithoutUserInput
    alerts?: AlertUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAssignedTasksInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAssignedTasksInput, UserUncheckedCreateWithoutAssignedTasksInput>
  }

  export type ManualTimeRequestCreateWithoutTaskInput = {
    id?: string
    companyId: string
    startAt: Date | string
    endAt: Date | string
    note: string
    status?: string
    reviewedBy?: string | null
    reviewedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutManualTimeRequestsInput
    project?: ProjectCreateNestedOneWithoutManualTimeRequestsInput
  }

  export type ManualTimeRequestUncheckedCreateWithoutTaskInput = {
    id?: string
    userId: string
    companyId: string
    startAt: Date | string
    endAt: Date | string
    note: string
    projectId?: string | null
    status?: string
    reviewedBy?: string | null
    reviewedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ManualTimeRequestCreateOrConnectWithoutTaskInput = {
    where: ManualTimeRequestWhereUniqueInput
    create: XOR<ManualTimeRequestCreateWithoutTaskInput, ManualTimeRequestUncheckedCreateWithoutTaskInput>
  }

  export type ManualTimeRequestCreateManyTaskInputEnvelope = {
    data: ManualTimeRequestCreateManyTaskInput | ManualTimeRequestCreateManyTaskInput[]
  }

  export type ProjectUpsertWithoutTasksInput = {
    update: XOR<ProjectUpdateWithoutTasksInput, ProjectUncheckedUpdateWithoutTasksInput>
    create: XOR<ProjectCreateWithoutTasksInput, ProjectUncheckedCreateWithoutTasksInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutTasksInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutTasksInput, ProjectUncheckedUpdateWithoutTasksInput>
  }

  export type ProjectUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    manualTimeRequests?: ManualTimeRequestUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    manualTimeRequests?: ManualTimeRequestUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type UserUpsertWithoutAssignedTasksInput = {
    update: XOR<UserUpdateWithoutAssignedTasksInput, UserUncheckedUpdateWithoutAssignedTasksInput>
    create: XOR<UserCreateWithoutAssignedTasksInput, UserUncheckedCreateWithoutAssignedTasksInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAssignedTasksInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAssignedTasksInput, UserUncheckedUpdateWithoutAssignedTasksInput>
  }

  export type UserUpdateWithoutAssignedTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    screenshotInterval?: IntFieldUpdateOperationsInput | number
    idleLimitMinutes?: IntFieldUpdateOperationsInput | number
    timezone?: StringFieldUpdateOperationsInput | string
    workDays?: StringFieldUpdateOperationsInput | string
    shiftStartMinutes?: IntFieldUpdateOperationsInput | number
    shiftEndMinutes?: IntFieldUpdateOperationsInput | number
    targetMinutes?: IntFieldUpdateOperationsInput | number
    maxShiftMinutes?: IntFieldUpdateOperationsInput | number
    maxBreakMinutes?: IntFieldUpdateOperationsInput | number
    screenshotRetentionDays?: IntFieldUpdateOperationsInput | number
    manualTimeRequiresApproval?: BoolFieldUpdateOperationsInput | boolean
    resetCode?: NullableStringFieldUpdateOperationsInput | string | null
    resetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activities?: ActivityLogUpdateManyWithoutUserNestedInput
    screenshots?: ScreenshotUpdateManyWithoutUserNestedInput
    workReports?: WorkReportUpdateManyWithoutUserNestedInput
    trackingSessions?: TrackingSessionUpdateManyWithoutUserNestedInput
    manualTimeRequests?: ManualTimeRequestUpdateManyWithoutUserNestedInput
    alerts?: AlertUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAssignedTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    screenshotInterval?: IntFieldUpdateOperationsInput | number
    idleLimitMinutes?: IntFieldUpdateOperationsInput | number
    timezone?: StringFieldUpdateOperationsInput | string
    workDays?: StringFieldUpdateOperationsInput | string
    shiftStartMinutes?: IntFieldUpdateOperationsInput | number
    shiftEndMinutes?: IntFieldUpdateOperationsInput | number
    targetMinutes?: IntFieldUpdateOperationsInput | number
    maxShiftMinutes?: IntFieldUpdateOperationsInput | number
    maxBreakMinutes?: IntFieldUpdateOperationsInput | number
    screenshotRetentionDays?: IntFieldUpdateOperationsInput | number
    manualTimeRequiresApproval?: BoolFieldUpdateOperationsInput | boolean
    resetCode?: NullableStringFieldUpdateOperationsInput | string | null
    resetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activities?: ActivityLogUncheckedUpdateManyWithoutUserNestedInput
    screenshots?: ScreenshotUncheckedUpdateManyWithoutUserNestedInput
    workReports?: WorkReportUncheckedUpdateManyWithoutUserNestedInput
    trackingSessions?: TrackingSessionUncheckedUpdateManyWithoutUserNestedInput
    manualTimeRequests?: ManualTimeRequestUncheckedUpdateManyWithoutUserNestedInput
    alerts?: AlertUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ManualTimeRequestUpsertWithWhereUniqueWithoutTaskInput = {
    where: ManualTimeRequestWhereUniqueInput
    update: XOR<ManualTimeRequestUpdateWithoutTaskInput, ManualTimeRequestUncheckedUpdateWithoutTaskInput>
    create: XOR<ManualTimeRequestCreateWithoutTaskInput, ManualTimeRequestUncheckedCreateWithoutTaskInput>
  }

  export type ManualTimeRequestUpdateWithWhereUniqueWithoutTaskInput = {
    where: ManualTimeRequestWhereUniqueInput
    data: XOR<ManualTimeRequestUpdateWithoutTaskInput, ManualTimeRequestUncheckedUpdateWithoutTaskInput>
  }

  export type ManualTimeRequestUpdateManyWithWhereWithoutTaskInput = {
    where: ManualTimeRequestScalarWhereInput
    data: XOR<ManualTimeRequestUpdateManyMutationInput, ManualTimeRequestUncheckedUpdateManyWithoutTaskInput>
  }

  export type UserCreateWithoutManualTimeRequestsInput = {
    id?: string
    email: string
    name: string
    password: string
    role: string
    companyId?: string | null
    screenshotInterval?: number
    idleLimitMinutes?: number
    timezone?: string
    workDays?: string
    shiftStartMinutes?: number
    shiftEndMinutes?: number
    targetMinutes?: number
    maxShiftMinutes?: number
    maxBreakMinutes?: number
    screenshotRetentionDays?: number
    manualTimeRequiresApproval?: boolean
    resetCode?: string | null
    resetExpires?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    activities?: ActivityLogCreateNestedManyWithoutUserInput
    screenshots?: ScreenshotCreateNestedManyWithoutUserInput
    workReports?: WorkReportCreateNestedManyWithoutUserInput
    trackingSessions?: TrackingSessionCreateNestedManyWithoutUserInput
    assignedTasks?: TaskCreateNestedManyWithoutAssignedUserInput
    alerts?: AlertCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutManualTimeRequestsInput = {
    id?: string
    email: string
    name: string
    password: string
    role: string
    companyId?: string | null
    screenshotInterval?: number
    idleLimitMinutes?: number
    timezone?: string
    workDays?: string
    shiftStartMinutes?: number
    shiftEndMinutes?: number
    targetMinutes?: number
    maxShiftMinutes?: number
    maxBreakMinutes?: number
    screenshotRetentionDays?: number
    manualTimeRequiresApproval?: boolean
    resetCode?: string | null
    resetExpires?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    activities?: ActivityLogUncheckedCreateNestedManyWithoutUserInput
    screenshots?: ScreenshotUncheckedCreateNestedManyWithoutUserInput
    workReports?: WorkReportUncheckedCreateNestedManyWithoutUserInput
    trackingSessions?: TrackingSessionUncheckedCreateNestedManyWithoutUserInput
    assignedTasks?: TaskUncheckedCreateNestedManyWithoutAssignedUserInput
    alerts?: AlertUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutManualTimeRequestsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutManualTimeRequestsInput, UserUncheckedCreateWithoutManualTimeRequestsInput>
  }

  export type ProjectCreateWithoutManualTimeRequestsInput = {
    id?: string
    companyId: string
    name: string
    code?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tasks?: TaskCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutManualTimeRequestsInput = {
    id?: string
    companyId: string
    name: string
    code?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tasks?: TaskUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutManualTimeRequestsInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutManualTimeRequestsInput, ProjectUncheckedCreateWithoutManualTimeRequestsInput>
  }

  export type TaskCreateWithoutManualTimeRequestsInput = {
    id?: string
    companyId: string
    title: string
    description?: string | null
    status?: string
    priority?: string
    dueDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    project?: ProjectCreateNestedOneWithoutTasksInput
    assignedUser?: UserCreateNestedOneWithoutAssignedTasksInput
  }

  export type TaskUncheckedCreateWithoutManualTimeRequestsInput = {
    id?: string
    companyId: string
    projectId?: string | null
    assignedUserId?: string | null
    title: string
    description?: string | null
    status?: string
    priority?: string
    dueDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskCreateOrConnectWithoutManualTimeRequestsInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutManualTimeRequestsInput, TaskUncheckedCreateWithoutManualTimeRequestsInput>
  }

  export type UserUpsertWithoutManualTimeRequestsInput = {
    update: XOR<UserUpdateWithoutManualTimeRequestsInput, UserUncheckedUpdateWithoutManualTimeRequestsInput>
    create: XOR<UserCreateWithoutManualTimeRequestsInput, UserUncheckedCreateWithoutManualTimeRequestsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutManualTimeRequestsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutManualTimeRequestsInput, UserUncheckedUpdateWithoutManualTimeRequestsInput>
  }

  export type UserUpdateWithoutManualTimeRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    screenshotInterval?: IntFieldUpdateOperationsInput | number
    idleLimitMinutes?: IntFieldUpdateOperationsInput | number
    timezone?: StringFieldUpdateOperationsInput | string
    workDays?: StringFieldUpdateOperationsInput | string
    shiftStartMinutes?: IntFieldUpdateOperationsInput | number
    shiftEndMinutes?: IntFieldUpdateOperationsInput | number
    targetMinutes?: IntFieldUpdateOperationsInput | number
    maxShiftMinutes?: IntFieldUpdateOperationsInput | number
    maxBreakMinutes?: IntFieldUpdateOperationsInput | number
    screenshotRetentionDays?: IntFieldUpdateOperationsInput | number
    manualTimeRequiresApproval?: BoolFieldUpdateOperationsInput | boolean
    resetCode?: NullableStringFieldUpdateOperationsInput | string | null
    resetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activities?: ActivityLogUpdateManyWithoutUserNestedInput
    screenshots?: ScreenshotUpdateManyWithoutUserNestedInput
    workReports?: WorkReportUpdateManyWithoutUserNestedInput
    trackingSessions?: TrackingSessionUpdateManyWithoutUserNestedInput
    assignedTasks?: TaskUpdateManyWithoutAssignedUserNestedInput
    alerts?: AlertUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutManualTimeRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    screenshotInterval?: IntFieldUpdateOperationsInput | number
    idleLimitMinutes?: IntFieldUpdateOperationsInput | number
    timezone?: StringFieldUpdateOperationsInput | string
    workDays?: StringFieldUpdateOperationsInput | string
    shiftStartMinutes?: IntFieldUpdateOperationsInput | number
    shiftEndMinutes?: IntFieldUpdateOperationsInput | number
    targetMinutes?: IntFieldUpdateOperationsInput | number
    maxShiftMinutes?: IntFieldUpdateOperationsInput | number
    maxBreakMinutes?: IntFieldUpdateOperationsInput | number
    screenshotRetentionDays?: IntFieldUpdateOperationsInput | number
    manualTimeRequiresApproval?: BoolFieldUpdateOperationsInput | boolean
    resetCode?: NullableStringFieldUpdateOperationsInput | string | null
    resetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activities?: ActivityLogUncheckedUpdateManyWithoutUserNestedInput
    screenshots?: ScreenshotUncheckedUpdateManyWithoutUserNestedInput
    workReports?: WorkReportUncheckedUpdateManyWithoutUserNestedInput
    trackingSessions?: TrackingSessionUncheckedUpdateManyWithoutUserNestedInput
    assignedTasks?: TaskUncheckedUpdateManyWithoutAssignedUserNestedInput
    alerts?: AlertUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ProjectUpsertWithoutManualTimeRequestsInput = {
    update: XOR<ProjectUpdateWithoutManualTimeRequestsInput, ProjectUncheckedUpdateWithoutManualTimeRequestsInput>
    create: XOR<ProjectCreateWithoutManualTimeRequestsInput, ProjectUncheckedCreateWithoutManualTimeRequestsInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutManualTimeRequestsInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutManualTimeRequestsInput, ProjectUncheckedUpdateWithoutManualTimeRequestsInput>
  }

  export type ProjectUpdateWithoutManualTimeRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutManualTimeRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type TaskUpsertWithoutManualTimeRequestsInput = {
    update: XOR<TaskUpdateWithoutManualTimeRequestsInput, TaskUncheckedUpdateWithoutManualTimeRequestsInput>
    create: XOR<TaskCreateWithoutManualTimeRequestsInput, TaskUncheckedCreateWithoutManualTimeRequestsInput>
    where?: TaskWhereInput
  }

  export type TaskUpdateToOneWithWhereWithoutManualTimeRequestsInput = {
    where?: TaskWhereInput
    data: XOR<TaskUpdateWithoutManualTimeRequestsInput, TaskUncheckedUpdateWithoutManualTimeRequestsInput>
  }

  export type TaskUpdateWithoutManualTimeRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneWithoutTasksNestedInput
    assignedUser?: UserUpdateOneWithoutAssignedTasksNestedInput
  }

  export type TaskUncheckedUpdateWithoutManualTimeRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    assignedUserId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutAlertsInput = {
    id?: string
    email: string
    name: string
    password: string
    role: string
    companyId?: string | null
    screenshotInterval?: number
    idleLimitMinutes?: number
    timezone?: string
    workDays?: string
    shiftStartMinutes?: number
    shiftEndMinutes?: number
    targetMinutes?: number
    maxShiftMinutes?: number
    maxBreakMinutes?: number
    screenshotRetentionDays?: number
    manualTimeRequiresApproval?: boolean
    resetCode?: string | null
    resetExpires?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    activities?: ActivityLogCreateNestedManyWithoutUserInput
    screenshots?: ScreenshotCreateNestedManyWithoutUserInput
    workReports?: WorkReportCreateNestedManyWithoutUserInput
    trackingSessions?: TrackingSessionCreateNestedManyWithoutUserInput
    manualTimeRequests?: ManualTimeRequestCreateNestedManyWithoutUserInput
    assignedTasks?: TaskCreateNestedManyWithoutAssignedUserInput
  }

  export type UserUncheckedCreateWithoutAlertsInput = {
    id?: string
    email: string
    name: string
    password: string
    role: string
    companyId?: string | null
    screenshotInterval?: number
    idleLimitMinutes?: number
    timezone?: string
    workDays?: string
    shiftStartMinutes?: number
    shiftEndMinutes?: number
    targetMinutes?: number
    maxShiftMinutes?: number
    maxBreakMinutes?: number
    screenshotRetentionDays?: number
    manualTimeRequiresApproval?: boolean
    resetCode?: string | null
    resetExpires?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    activities?: ActivityLogUncheckedCreateNestedManyWithoutUserInput
    screenshots?: ScreenshotUncheckedCreateNestedManyWithoutUserInput
    workReports?: WorkReportUncheckedCreateNestedManyWithoutUserInput
    trackingSessions?: TrackingSessionUncheckedCreateNestedManyWithoutUserInput
    manualTimeRequests?: ManualTimeRequestUncheckedCreateNestedManyWithoutUserInput
    assignedTasks?: TaskUncheckedCreateNestedManyWithoutAssignedUserInput
  }

  export type UserCreateOrConnectWithoutAlertsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAlertsInput, UserUncheckedCreateWithoutAlertsInput>
  }

  export type UserUpsertWithoutAlertsInput = {
    update: XOR<UserUpdateWithoutAlertsInput, UserUncheckedUpdateWithoutAlertsInput>
    create: XOR<UserCreateWithoutAlertsInput, UserUncheckedCreateWithoutAlertsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAlertsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAlertsInput, UserUncheckedUpdateWithoutAlertsInput>
  }

  export type UserUpdateWithoutAlertsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    screenshotInterval?: IntFieldUpdateOperationsInput | number
    idleLimitMinutes?: IntFieldUpdateOperationsInput | number
    timezone?: StringFieldUpdateOperationsInput | string
    workDays?: StringFieldUpdateOperationsInput | string
    shiftStartMinutes?: IntFieldUpdateOperationsInput | number
    shiftEndMinutes?: IntFieldUpdateOperationsInput | number
    targetMinutes?: IntFieldUpdateOperationsInput | number
    maxShiftMinutes?: IntFieldUpdateOperationsInput | number
    maxBreakMinutes?: IntFieldUpdateOperationsInput | number
    screenshotRetentionDays?: IntFieldUpdateOperationsInput | number
    manualTimeRequiresApproval?: BoolFieldUpdateOperationsInput | boolean
    resetCode?: NullableStringFieldUpdateOperationsInput | string | null
    resetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activities?: ActivityLogUpdateManyWithoutUserNestedInput
    screenshots?: ScreenshotUpdateManyWithoutUserNestedInput
    workReports?: WorkReportUpdateManyWithoutUserNestedInput
    trackingSessions?: TrackingSessionUpdateManyWithoutUserNestedInput
    manualTimeRequests?: ManualTimeRequestUpdateManyWithoutUserNestedInput
    assignedTasks?: TaskUpdateManyWithoutAssignedUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAlertsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    screenshotInterval?: IntFieldUpdateOperationsInput | number
    idleLimitMinutes?: IntFieldUpdateOperationsInput | number
    timezone?: StringFieldUpdateOperationsInput | string
    workDays?: StringFieldUpdateOperationsInput | string
    shiftStartMinutes?: IntFieldUpdateOperationsInput | number
    shiftEndMinutes?: IntFieldUpdateOperationsInput | number
    targetMinutes?: IntFieldUpdateOperationsInput | number
    maxShiftMinutes?: IntFieldUpdateOperationsInput | number
    maxBreakMinutes?: IntFieldUpdateOperationsInput | number
    screenshotRetentionDays?: IntFieldUpdateOperationsInput | number
    manualTimeRequiresApproval?: BoolFieldUpdateOperationsInput | boolean
    resetCode?: NullableStringFieldUpdateOperationsInput | string | null
    resetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activities?: ActivityLogUncheckedUpdateManyWithoutUserNestedInput
    screenshots?: ScreenshotUncheckedUpdateManyWithoutUserNestedInput
    workReports?: WorkReportUncheckedUpdateManyWithoutUserNestedInput
    trackingSessions?: TrackingSessionUncheckedUpdateManyWithoutUserNestedInput
    manualTimeRequests?: ManualTimeRequestUncheckedUpdateManyWithoutUserNestedInput
    assignedTasks?: TaskUncheckedUpdateManyWithoutAssignedUserNestedInput
  }

  export type ActivityLogCreateManyUserInput = {
    id?: string
    timestamp?: Date | string
    status: string
    currentTask?: string
    appProcess?: string | null
    appTitle?: string | null
    keystrokes?: number
    mouseClicks?: number
    durationSeconds?: number
    idleSeconds?: number
    continuousIdleSeconds?: number
    clientEventId?: string | null
    taskId?: string | null
    productivityCategory?: string
  }

  export type ScreenshotCreateManyUserInput = {
    id?: string
    timestamp?: Date | string
    filePath: string
    activityRate: number
    currentTask?: string
    keystrokes?: number
    mouseClicks?: number
    clientEventId?: string | null
  }

  export type WorkReportCreateManyUserInput = {
    id?: string
    type: string
    note: string
    emailSent?: boolean
    createdAt?: Date | string
    endedAt?: Date | string | null
    durationSeconds?: number | null
    clientEventId?: string | null
    taskId?: string | null
  }

  export type TrackingSessionCreateManyUserInput = {
    id?: string
    clientSessionId?: string | null
    companyId: string
    dateKey: string
    startedAt?: Date | string
    endedAt?: Date | string | null
    lastHeartbeatAt?: Date | string
    status?: string
    breakStartedAt?: Date | string | null
    activeSeconds?: number
    idleSeconds?: number
    breakSeconds?: number
    reviewRequired?: boolean
    reviewReason?: string | null
    currentTask?: string
    taskId?: string | null
  }

  export type ManualTimeRequestCreateManyUserInput = {
    id?: string
    companyId: string
    startAt: Date | string
    endAt: Date | string
    note: string
    projectId?: string | null
    taskId?: string | null
    status?: string
    reviewedBy?: string | null
    reviewedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskCreateManyAssignedUserInput = {
    id?: string
    companyId: string
    projectId?: string | null
    title: string
    description?: string | null
    status?: string
    priority?: string
    dueDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AlertCreateManyUserInput = {
    id?: string
    companyId: string
    type: string
    severity?: string
    message: string
    metadata?: string | null
    createdAt?: Date | string
    readAt?: Date | string | null
  }

  export type ActivityLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    currentTask?: StringFieldUpdateOperationsInput | string
    appProcess?: NullableStringFieldUpdateOperationsInput | string | null
    appTitle?: NullableStringFieldUpdateOperationsInput | string | null
    keystrokes?: IntFieldUpdateOperationsInput | number
    mouseClicks?: IntFieldUpdateOperationsInput | number
    durationSeconds?: IntFieldUpdateOperationsInput | number
    idleSeconds?: IntFieldUpdateOperationsInput | number
    continuousIdleSeconds?: IntFieldUpdateOperationsInput | number
    clientEventId?: NullableStringFieldUpdateOperationsInput | string | null
    taskId?: NullableStringFieldUpdateOperationsInput | string | null
    productivityCategory?: StringFieldUpdateOperationsInput | string
  }

  export type ActivityLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    currentTask?: StringFieldUpdateOperationsInput | string
    appProcess?: NullableStringFieldUpdateOperationsInput | string | null
    appTitle?: NullableStringFieldUpdateOperationsInput | string | null
    keystrokes?: IntFieldUpdateOperationsInput | number
    mouseClicks?: IntFieldUpdateOperationsInput | number
    durationSeconds?: IntFieldUpdateOperationsInput | number
    idleSeconds?: IntFieldUpdateOperationsInput | number
    continuousIdleSeconds?: IntFieldUpdateOperationsInput | number
    clientEventId?: NullableStringFieldUpdateOperationsInput | string | null
    taskId?: NullableStringFieldUpdateOperationsInput | string | null
    productivityCategory?: StringFieldUpdateOperationsInput | string
  }

  export type ActivityLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    currentTask?: StringFieldUpdateOperationsInput | string
    appProcess?: NullableStringFieldUpdateOperationsInput | string | null
    appTitle?: NullableStringFieldUpdateOperationsInput | string | null
    keystrokes?: IntFieldUpdateOperationsInput | number
    mouseClicks?: IntFieldUpdateOperationsInput | number
    durationSeconds?: IntFieldUpdateOperationsInput | number
    idleSeconds?: IntFieldUpdateOperationsInput | number
    continuousIdleSeconds?: IntFieldUpdateOperationsInput | number
    clientEventId?: NullableStringFieldUpdateOperationsInput | string | null
    taskId?: NullableStringFieldUpdateOperationsInput | string | null
    productivityCategory?: StringFieldUpdateOperationsInput | string
  }

  export type ScreenshotUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    filePath?: StringFieldUpdateOperationsInput | string
    activityRate?: IntFieldUpdateOperationsInput | number
    currentTask?: StringFieldUpdateOperationsInput | string
    keystrokes?: IntFieldUpdateOperationsInput | number
    mouseClicks?: IntFieldUpdateOperationsInput | number
    clientEventId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ScreenshotUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    filePath?: StringFieldUpdateOperationsInput | string
    activityRate?: IntFieldUpdateOperationsInput | number
    currentTask?: StringFieldUpdateOperationsInput | string
    keystrokes?: IntFieldUpdateOperationsInput | number
    mouseClicks?: IntFieldUpdateOperationsInput | number
    clientEventId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ScreenshotUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    filePath?: StringFieldUpdateOperationsInput | string
    activityRate?: IntFieldUpdateOperationsInput | number
    currentTask?: StringFieldUpdateOperationsInput | string
    keystrokes?: IntFieldUpdateOperationsInput | number
    mouseClicks?: IntFieldUpdateOperationsInput | number
    clientEventId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WorkReportUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    note?: StringFieldUpdateOperationsInput | string
    emailSent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    clientEventId?: NullableStringFieldUpdateOperationsInput | string | null
    taskId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WorkReportUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    note?: StringFieldUpdateOperationsInput | string
    emailSent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    clientEventId?: NullableStringFieldUpdateOperationsInput | string | null
    taskId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WorkReportUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    note?: StringFieldUpdateOperationsInput | string
    emailSent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    clientEventId?: NullableStringFieldUpdateOperationsInput | string | null
    taskId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TrackingSessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: StringFieldUpdateOperationsInput | string
    dateKey?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastHeartbeatAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    breakStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activeSeconds?: IntFieldUpdateOperationsInput | number
    idleSeconds?: IntFieldUpdateOperationsInput | number
    breakSeconds?: IntFieldUpdateOperationsInput | number
    reviewRequired?: BoolFieldUpdateOperationsInput | boolean
    reviewReason?: NullableStringFieldUpdateOperationsInput | string | null
    currentTask?: StringFieldUpdateOperationsInput | string
    taskId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TrackingSessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: StringFieldUpdateOperationsInput | string
    dateKey?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastHeartbeatAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    breakStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activeSeconds?: IntFieldUpdateOperationsInput | number
    idleSeconds?: IntFieldUpdateOperationsInput | number
    breakSeconds?: IntFieldUpdateOperationsInput | number
    reviewRequired?: BoolFieldUpdateOperationsInput | boolean
    reviewReason?: NullableStringFieldUpdateOperationsInput | string | null
    currentTask?: StringFieldUpdateOperationsInput | string
    taskId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TrackingSessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: StringFieldUpdateOperationsInput | string
    dateKey?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastHeartbeatAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    breakStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activeSeconds?: IntFieldUpdateOperationsInput | number
    idleSeconds?: IntFieldUpdateOperationsInput | number
    breakSeconds?: IntFieldUpdateOperationsInput | number
    reviewRequired?: BoolFieldUpdateOperationsInput | boolean
    reviewReason?: NullableStringFieldUpdateOperationsInput | string | null
    currentTask?: StringFieldUpdateOperationsInput | string
    taskId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ManualTimeRequestUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneWithoutManualTimeRequestsNestedInput
    task?: TaskUpdateOneWithoutManualTimeRequestsNestedInput
  }

  export type ManualTimeRequestUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: StringFieldUpdateOperationsInput | string
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    taskId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ManualTimeRequestUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: StringFieldUpdateOperationsInput | string
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    taskId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskUpdateWithoutAssignedUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneWithoutTasksNestedInput
    manualTimeRequests?: ManualTimeRequestUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutAssignedUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    manualTimeRequests?: ManualTimeRequestUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateManyWithoutAssignedUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlertUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AlertUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AlertUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TaskCreateManyProjectInput = {
    id?: string
    companyId: string
    assignedUserId?: string | null
    title: string
    description?: string | null
    status?: string
    priority?: string
    dueDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ManualTimeRequestCreateManyProjectInput = {
    id?: string
    userId: string
    companyId: string
    startAt: Date | string
    endAt: Date | string
    note: string
    taskId?: string | null
    status?: string
    reviewedBy?: string | null
    reviewedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedUser?: UserUpdateOneWithoutAssignedTasksNestedInput
    manualTimeRequests?: ManualTimeRequestUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    assignedUserId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    manualTimeRequests?: ManualTimeRequestUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    assignedUserId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ManualTimeRequestUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutManualTimeRequestsNestedInput
    task?: TaskUpdateOneWithoutManualTimeRequestsNestedInput
  }

  export type ManualTimeRequestUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: StringFieldUpdateOperationsInput | string
    taskId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ManualTimeRequestUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: StringFieldUpdateOperationsInput | string
    taskId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ManualTimeRequestCreateManyTaskInput = {
    id?: string
    userId: string
    companyId: string
    startAt: Date | string
    endAt: Date | string
    note: string
    projectId?: string | null
    status?: string
    reviewedBy?: string | null
    reviewedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ManualTimeRequestUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutManualTimeRequestsNestedInput
    project?: ProjectUpdateOneWithoutManualTimeRequestsNestedInput
  }

  export type ManualTimeRequestUncheckedUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: StringFieldUpdateOperationsInput | string
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ManualTimeRequestUncheckedUpdateManyWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: StringFieldUpdateOperationsInput | string
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProjectCountOutputTypeDefaultArgs instead
     */
    export type ProjectCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProjectCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TaskCountOutputTypeDefaultArgs instead
     */
    export type TaskCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TaskCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use WorkReportDefaultArgs instead
     */
    export type WorkReportArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = WorkReportDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ActivityLogDefaultArgs instead
     */
    export type ActivityLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ActivityLogDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ScreenshotDefaultArgs instead
     */
    export type ScreenshotArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ScreenshotDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TrackingSessionDefaultArgs instead
     */
    export type TrackingSessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TrackingSessionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProjectDefaultArgs instead
     */
    export type ProjectArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProjectDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TaskDefaultArgs instead
     */
    export type TaskArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TaskDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProductivityRuleDefaultArgs instead
     */
    export type ProductivityRuleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProductivityRuleDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ManualTimeRequestDefaultArgs instead
     */
    export type ManualTimeRequestArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ManualTimeRequestDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AlertDefaultArgs instead
     */
    export type AlertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AlertDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AuditLogDefaultArgs instead
     */
    export type AuditLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AuditLogDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}