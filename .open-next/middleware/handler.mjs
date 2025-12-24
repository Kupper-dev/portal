
import {Buffer} from "node:buffer";
globalThis.Buffer = Buffer;

import {AsyncLocalStorage} from "node:async_hooks";
globalThis.AsyncLocalStorage = AsyncLocalStorage;


const defaultDefineProperty = Object.defineProperty;
Object.defineProperty = function(o, p, a) {
  if(p=== '__import_unsupported' && Boolean(globalThis.__import_unsupported)) {
    return;
  }
  return defaultDefineProperty(o, p, a);
};

  
  
  globalThis.openNextDebug = false;globalThis.openNextVersion = "3.9.7";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/@opennextjs/cloudflare/node_modules/@opennextjs/aws/dist/utils/error.js
function isOpenNextError(e) {
  try {
    return "__openNextInternal" in e;
  } catch {
    return false;
  }
}
var init_error = __esm({
  "node_modules/@opennextjs/cloudflare/node_modules/@opennextjs/aws/dist/utils/error.js"() {
  }
});

// node_modules/@opennextjs/cloudflare/node_modules/@opennextjs/aws/dist/adapters/logger.js
function debug(...args) {
  if (globalThis.openNextDebug) {
    console.log(...args);
  }
}
function warn(...args) {
  console.warn(...args);
}
function error(...args) {
  if (args.some((arg) => isDownplayedErrorLog(arg))) {
    return debug(...args);
  }
  if (args.some((arg) => isOpenNextError(arg))) {
    const error2 = args.find((arg) => isOpenNextError(arg));
    if (error2.logLevel < getOpenNextErrorLogLevel()) {
      return;
    }
    if (error2.logLevel === 0) {
      return console.log(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    if (error2.logLevel === 1) {
      return warn(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    return console.error(...args);
  }
  console.error(...args);
}
function getOpenNextErrorLogLevel() {
  const strLevel = process.env.OPEN_NEXT_ERROR_LOG_LEVEL ?? "1";
  switch (strLevel.toLowerCase()) {
    case "debug":
    case "0":
      return 0;
    case "error":
    case "2":
      return 2;
    default:
      return 1;
  }
}
var DOWNPLAYED_ERROR_LOGS, isDownplayedErrorLog;
var init_logger = __esm({
  "node_modules/@opennextjs/cloudflare/node_modules/@opennextjs/aws/dist/adapters/logger.js"() {
    init_error();
    DOWNPLAYED_ERROR_LOGS = [
      {
        clientName: "S3Client",
        commandName: "GetObjectCommand",
        errorName: "NoSuchKey"
      }
    ];
    isDownplayedErrorLog = (errorLog) => DOWNPLAYED_ERROR_LOGS.some((downplayedInput) => downplayedInput.clientName === errorLog?.clientName && downplayedInput.commandName === errorLog?.commandName && (downplayedInput.errorName === errorLog?.error?.name || downplayedInput.errorName === errorLog?.error?.Code));
  }
});

// node_modules/cookie/dist/index.js
var require_dist = __commonJS({
  "node_modules/cookie/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseCookie = parseCookie;
    exports.parse = parseCookie;
    exports.stringifyCookie = stringifyCookie;
    exports.stringifySetCookie = stringifySetCookie;
    exports.serialize = stringifySetCookie;
    exports.parseSetCookie = parseSetCookie;
    exports.stringifySetCookie = stringifySetCookie;
    exports.serialize = stringifySetCookie;
    var cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
    var cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
    var domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
    var pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
    var maxAgeRegExp = /^-?\d+$/;
    var __toString = Object.prototype.toString;
    var NullObject = /* @__PURE__ */ (() => {
      const C = function() {
      };
      C.prototype = /* @__PURE__ */ Object.create(null);
      return C;
    })();
    function parseCookie(str, options) {
      const obj = new NullObject();
      const len = str.length;
      if (len < 2)
        return obj;
      const dec = options?.decode || decode;
      let index = 0;
      do {
        const eqIdx = eqIndex(str, index, len);
        if (eqIdx === -1)
          break;
        const endIdx = endIndex(str, index, len);
        if (eqIdx > endIdx) {
          index = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        const key = valueSlice(str, index, eqIdx);
        if (obj[key] === void 0) {
          obj[key] = dec(valueSlice(str, eqIdx + 1, endIdx));
        }
        index = endIdx + 1;
      } while (index < len);
      return obj;
    }
    function stringifyCookie(cookie, options) {
      const enc = options?.encode || encodeURIComponent;
      const cookieStrings = [];
      for (const name of Object.keys(cookie)) {
        const val = cookie[name];
        if (val === void 0)
          continue;
        if (!cookieNameRegExp.test(name)) {
          throw new TypeError(`cookie name is invalid: ${name}`);
        }
        const value = enc(val);
        if (!cookieValueRegExp.test(value)) {
          throw new TypeError(`cookie val is invalid: ${val}`);
        }
        cookieStrings.push(`${name}=${value}`);
      }
      return cookieStrings.join("; ");
    }
    function stringifySetCookie(_name, _val, _opts) {
      const cookie = typeof _name === "object" ? _name : { ..._opts, name: _name, value: String(_val) };
      const options = typeof _val === "object" ? _val : _opts;
      const enc = options?.encode || encodeURIComponent;
      if (!cookieNameRegExp.test(cookie.name)) {
        throw new TypeError(`argument name is invalid: ${cookie.name}`);
      }
      const value = cookie.value ? enc(cookie.value) : "";
      if (!cookieValueRegExp.test(value)) {
        throw new TypeError(`argument val is invalid: ${cookie.value}`);
      }
      let str = cookie.name + "=" + value;
      if (cookie.maxAge !== void 0) {
        if (!Number.isInteger(cookie.maxAge)) {
          throw new TypeError(`option maxAge is invalid: ${cookie.maxAge}`);
        }
        str += "; Max-Age=" + cookie.maxAge;
      }
      if (cookie.domain) {
        if (!domainValueRegExp.test(cookie.domain)) {
          throw new TypeError(`option domain is invalid: ${cookie.domain}`);
        }
        str += "; Domain=" + cookie.domain;
      }
      if (cookie.path) {
        if (!pathValueRegExp.test(cookie.path)) {
          throw new TypeError(`option path is invalid: ${cookie.path}`);
        }
        str += "; Path=" + cookie.path;
      }
      if (cookie.expires) {
        if (!isDate(cookie.expires) || !Number.isFinite(cookie.expires.valueOf())) {
          throw new TypeError(`option expires is invalid: ${cookie.expires}`);
        }
        str += "; Expires=" + cookie.expires.toUTCString();
      }
      if (cookie.httpOnly) {
        str += "; HttpOnly";
      }
      if (cookie.secure) {
        str += "; Secure";
      }
      if (cookie.partitioned) {
        str += "; Partitioned";
      }
      if (cookie.priority) {
        const priority = typeof cookie.priority === "string" ? cookie.priority.toLowerCase() : void 0;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError(`option priority is invalid: ${cookie.priority}`);
        }
      }
      if (cookie.sameSite) {
        const sameSite = typeof cookie.sameSite === "string" ? cookie.sameSite.toLowerCase() : cookie.sameSite;
        switch (sameSite) {
          case true:
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError(`option sameSite is invalid: ${cookie.sameSite}`);
        }
      }
      return str;
    }
    function parseSetCookie(str, options) {
      const dec = options?.decode || decode;
      const len = str.length;
      const endIdx = endIndex(str, 0, len);
      const eqIdx = eqIndex(str, 0, endIdx);
      const setCookie = eqIdx === -1 ? { name: "", value: dec(valueSlice(str, 0, endIdx)) } : {
        name: valueSlice(str, 0, eqIdx),
        value: dec(valueSlice(str, eqIdx + 1, endIdx))
      };
      let index = endIdx + 1;
      while (index < len) {
        const endIdx2 = endIndex(str, index, len);
        const eqIdx2 = eqIndex(str, index, endIdx2);
        const attr = eqIdx2 === -1 ? valueSlice(str, index, endIdx2) : valueSlice(str, index, eqIdx2);
        const val = eqIdx2 === -1 ? void 0 : valueSlice(str, eqIdx2 + 1, endIdx2);
        switch (attr.toLowerCase()) {
          case "httponly":
            setCookie.httpOnly = true;
            break;
          case "secure":
            setCookie.secure = true;
            break;
          case "partitioned":
            setCookie.partitioned = true;
            break;
          case "domain":
            setCookie.domain = val;
            break;
          case "path":
            setCookie.path = val;
            break;
          case "max-age":
            if (val && maxAgeRegExp.test(val))
              setCookie.maxAge = Number(val);
            break;
          case "expires":
            if (!val)
              break;
            const date = new Date(val);
            if (Number.isFinite(date.valueOf()))
              setCookie.expires = date;
            break;
          case "priority":
            if (!val)
              break;
            const priority = val.toLowerCase();
            if (priority === "low" || priority === "medium" || priority === "high") {
              setCookie.priority = priority;
            }
            break;
          case "samesite":
            if (!val)
              break;
            const sameSite = val.toLowerCase();
            if (sameSite === "lax" || sameSite === "strict" || sameSite === "none") {
              setCookie.sameSite = sameSite;
            }
            break;
        }
        index = endIdx2 + 1;
      }
      return setCookie;
    }
    function endIndex(str, min, len) {
      const index = str.indexOf(";", min);
      return index === -1 ? len : index;
    }
    function eqIndex(str, min, max) {
      const index = str.indexOf("=", min);
      return index < max ? index : -1;
    }
    function valueSlice(str, min, max) {
      let start = min;
      let end = max;
      do {
        const code = str.charCodeAt(start);
        if (code !== 32 && code !== 9)
          break;
      } while (++start < end);
      while (end > start) {
        const code = str.charCodeAt(end - 1);
        if (code !== 32 && code !== 9)
          break;
        end--;
      }
      return str.slice(start, end);
    }
    function decode(str) {
      if (str.indexOf("%") === -1)
        return str;
      try {
        return decodeURIComponent(str);
      } catch (e) {
        return str;
      }
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]";
    }
  }
});

// node_modules/@opennextjs/cloudflare/node_modules/@opennextjs/aws/dist/http/util.js
function parseSetCookieHeader(cookies) {
  if (!cookies) {
    return [];
  }
  if (typeof cookies === "string") {
    return cookies.split(/(?<!Expires=\w+),/i).map((c) => c.trim());
  }
  return cookies;
}
function getQueryFromIterator(it) {
  const query = {};
  for (const [key, value] of it) {
    if (key in query) {
      if (Array.isArray(query[key])) {
        query[key].push(value);
      } else {
        query[key] = [query[key], value];
      }
    } else {
      query[key] = value;
    }
  }
  return query;
}
var init_util = __esm({
  "node_modules/@opennextjs/cloudflare/node_modules/@opennextjs/aws/dist/http/util.js"() {
    init_logger();
  }
});

// node_modules/@opennextjs/cloudflare/node_modules/@opennextjs/aws/dist/overrides/converters/utils.js
function getQueryFromSearchParams(searchParams) {
  return getQueryFromIterator(searchParams.entries());
}
var init_utils = __esm({
  "node_modules/@opennextjs/cloudflare/node_modules/@opennextjs/aws/dist/overrides/converters/utils.js"() {
    init_util();
  }
});

// node_modules/@opennextjs/cloudflare/node_modules/@opennextjs/aws/dist/overrides/converters/edge.js
var edge_exports = {};
__export(edge_exports, {
  default: () => edge_default
});
import { Buffer as Buffer2 } from "node:buffer";
var import_cookie, NULL_BODY_STATUSES, converter, edge_default;
var init_edge = __esm({
  "node_modules/@opennextjs/cloudflare/node_modules/@opennextjs/aws/dist/overrides/converters/edge.js"() {
    import_cookie = __toESM(require_dist(), 1);
    init_util();
    init_utils();
    NULL_BODY_STATUSES = /* @__PURE__ */ new Set([101, 103, 204, 205, 304]);
    converter = {
      convertFrom: async (event) => {
        const url = new URL(event.url);
        const searchParams = url.searchParams;
        const query = getQueryFromSearchParams(searchParams);
        const headers = {};
        event.headers.forEach((value, key) => {
          headers[key] = value;
        });
        const rawPath = url.pathname;
        const method = event.method;
        const shouldHaveBody = method !== "GET" && method !== "HEAD";
        const body = shouldHaveBody ? Buffer2.from(await event.arrayBuffer()) : void 0;
        const cookieHeader = event.headers.get("cookie");
        const cookies = cookieHeader ? import_cookie.default.parse(cookieHeader) : {};
        return {
          type: "core",
          method,
          rawPath,
          url: event.url,
          body,
          headers,
          remoteAddress: event.headers.get("x-forwarded-for") ?? "::1",
          query,
          cookies
        };
      },
      convertTo: async (result) => {
        if ("internalEvent" in result) {
          const request = new Request(result.internalEvent.url, {
            body: result.internalEvent.body,
            method: result.internalEvent.method,
            headers: {
              ...result.internalEvent.headers,
              "x-forwarded-host": result.internalEvent.headers.host
            }
          });
          if (globalThis.__dangerous_ON_edge_converter_returns_request === true) {
            return request;
          }
          const cfCache = (result.isISR || result.internalEvent.rawPath.startsWith("/_next/image")) && process.env.DISABLE_CACHE !== "true" ? { cacheEverything: true } : {};
          return fetch(request, {
            // This is a hack to make sure that the response is cached by Cloudflare
            // See https://developers.cloudflare.com/workers/examples/cache-using-fetch/#caching-html-resources
            // @ts-expect-error - This is a Cloudflare specific option
            cf: cfCache
          });
        }
        const headers = new Headers();
        for (const [key, value] of Object.entries(result.headers)) {
          if (key === "set-cookie" && typeof value === "string") {
            const cookies = parseSetCookieHeader(value);
            for (const cookie of cookies) {
              headers.append(key, cookie);
            }
            continue;
          }
          if (Array.isArray(value)) {
            for (const v of value) {
              headers.append(key, v);
            }
          } else {
            headers.set(key, value);
          }
        }
        const body = NULL_BODY_STATUSES.has(result.statusCode) ? null : result.body;
        return new Response(body, {
          status: result.statusCode,
          headers
        });
      },
      name: "edge"
    };
    edge_default = converter;
  }
});

// node_modules/@opennextjs/cloudflare/node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js
var cloudflare_edge_exports = {};
__export(cloudflare_edge_exports, {
  default: () => cloudflare_edge_default
});
var cfPropNameMapping, handler, cloudflare_edge_default;
var init_cloudflare_edge = __esm({
  "node_modules/@opennextjs/cloudflare/node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js"() {
    cfPropNameMapping = {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: [encodeURIComponent, "x-open-next-city"],
      country: "x-open-next-country",
      regionCode: "x-open-next-region",
      latitude: "x-open-next-latitude",
      longitude: "x-open-next-longitude"
    };
    handler = async (handler3, converter2) => async (request, env, ctx) => {
      globalThis.process = process;
      for (const [key, value] of Object.entries(env)) {
        if (typeof value === "string") {
          process.env[key] = value;
        }
      }
      const internalEvent = await converter2.convertFrom(request);
      const cfProperties = request.cf;
      for (const [propName, mapping] of Object.entries(cfPropNameMapping)) {
        const propValue = cfProperties?.[propName];
        if (propValue != null) {
          const [encode, headerName] = Array.isArray(mapping) ? mapping : [null, mapping];
          internalEvent.headers[headerName] = encode ? encode(propValue) : propValue;
        }
      }
      const response = await handler3(internalEvent, {
        waitUntil: ctx.waitUntil.bind(ctx)
      });
      const result = await converter2.convertTo(response);
      return result;
    };
    cloudflare_edge_default = {
      wrapper: handler,
      name: "cloudflare-edge",
      supportStreaming: true,
      edgeRuntime: true
    };
  }
});

// node_modules/@opennextjs/cloudflare/node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js
var pattern_env_exports = {};
__export(pattern_env_exports, {
  default: () => pattern_env_default
});
function initializeOnce() {
  if (initialized)
    return;
  cachedOrigins = JSON.parse(process.env.OPEN_NEXT_ORIGIN ?? "{}");
  const functions = globalThis.openNextConfig.functions ?? {};
  for (const key in functions) {
    if (key !== "default") {
      const value = functions[key];
      const regexes = [];
      for (const pattern of value.patterns) {
        const regexPattern = `/${pattern.replace(/\*\*/g, "(.*)").replace(/\*/g, "([^/]*)").replace(/\//g, "\\/").replace(/\?/g, ".")}`;
        regexes.push(new RegExp(regexPattern));
      }
      cachedPatterns.push({
        key,
        patterns: value.patterns,
        regexes
      });
    }
  }
  initialized = true;
}
var cachedOrigins, cachedPatterns, initialized, envLoader, pattern_env_default;
var init_pattern_env = __esm({
  "node_modules/@opennextjs/cloudflare/node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js"() {
    init_logger();
    cachedPatterns = [];
    initialized = false;
    envLoader = {
      name: "env",
      resolve: async (_path) => {
        try {
          initializeOnce();
          for (const { key, patterns, regexes } of cachedPatterns) {
            for (const regex of regexes) {
              if (regex.test(_path)) {
                debug("Using origin", key, patterns);
                return cachedOrigins[key];
              }
            }
          }
          if (_path.startsWith("/_next/image") && cachedOrigins.imageOptimizer) {
            debug("Using origin", "imageOptimizer", _path);
            return cachedOrigins.imageOptimizer;
          }
          if (cachedOrigins.default) {
            debug("Using default origin", cachedOrigins.default, _path);
            return cachedOrigins.default;
          }
          return false;
        } catch (e) {
          error("Error while resolving origin", e);
          return false;
        }
      }
    };
    pattern_env_default = envLoader;
  }
});

// node_modules/@opennextjs/cloudflare/node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js
var dummy_exports = {};
__export(dummy_exports, {
  default: () => dummy_default
});
var resolver, dummy_default;
var init_dummy = __esm({
  "node_modules/@opennextjs/cloudflare/node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js"() {
    resolver = {
      name: "dummy"
    };
    dummy_default = resolver;
  }
});

// node_modules/@opennextjs/cloudflare/node_modules/@opennextjs/aws/dist/utils/stream.js
import { ReadableStream as ReadableStream2 } from "node:stream/web";
function toReadableStream(value, isBase64) {
  return new ReadableStream2({
    pull(controller) {
      controller.enqueue(Buffer.from(value, isBase64 ? "base64" : "utf8"));
      controller.close();
    }
  }, { highWaterMark: 0 });
}
function emptyReadableStream() {
  if (process.env.OPEN_NEXT_FORCE_NON_EMPTY_RESPONSE === "true") {
    return new ReadableStream2({
      pull(controller) {
        maybeSomethingBuffer ??= Buffer.from("SOMETHING");
        controller.enqueue(maybeSomethingBuffer);
        controller.close();
      }
    }, { highWaterMark: 0 });
  }
  return new ReadableStream2({
    start(controller) {
      controller.close();
    }
  });
}
var maybeSomethingBuffer;
var init_stream = __esm({
  "node_modules/@opennextjs/cloudflare/node_modules/@opennextjs/aws/dist/utils/stream.js"() {
  }
});

// node_modules/@opennextjs/cloudflare/node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js
var fetch_exports = {};
__export(fetch_exports, {
  default: () => fetch_default
});
var fetchProxy, fetch_default;
var init_fetch = __esm({
  "node_modules/@opennextjs/cloudflare/node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js"() {
    init_stream();
    fetchProxy = {
      name: "fetch-proxy",
      // @ts-ignore
      proxy: async (internalEvent) => {
        const { url, headers: eventHeaders, method, body } = internalEvent;
        const headers = Object.fromEntries(Object.entries(eventHeaders).filter(([key]) => key.toLowerCase() !== "cf-connecting-ip"));
        const response = await fetch(url, {
          method,
          headers,
          body
        });
        const responseHeaders = {};
        response.headers.forEach((value, key) => {
          responseHeaders[key] = value;
        });
        return {
          type: "core",
          headers: responseHeaders,
          statusCode: response.status,
          isBase64Encoded: true,
          body: response.body ?? emptyReadableStream()
        };
      }
    };
    fetch_default = fetchProxy;
  }
});

// .next/server/edge-runtime-webpack.js
var require_edge_runtime_webpack = __commonJS({
  ".next/server/edge-runtime-webpack.js"() {
    "use strict";
    (() => {
      "use strict";
      var e = {}, r = {};
      function t(o) {
        var n = r[o];
        if (void 0 !== n) return n.exports;
        var i = r[o] = { exports: {} }, a = true;
        try {
          e[o](i, i.exports, t), a = false;
        } finally {
          a && delete r[o];
        }
        return i.exports;
      }
      t.m = e, t.amdO = {}, (() => {
        var e2 = [];
        t.O = (r2, o, n, i) => {
          if (o) {
            i = i || 0;
            for (var a = e2.length; a > 0 && e2[a - 1][2] > i; a--) e2[a] = e2[a - 1];
            e2[a] = [o, n, i];
            return;
          }
          for (var l = 1 / 0, a = 0; a < e2.length; a++) {
            for (var [o, n, i] = e2[a], u = true, f = 0; f < o.length; f++) (false & i || l >= i) && Object.keys(t.O).every((e3) => t.O[e3](o[f])) ? o.splice(f--, 1) : (u = false, i < l && (l = i));
            if (u) {
              e2.splice(a--, 1);
              var s = n();
              void 0 !== s && (r2 = s);
            }
          }
          return r2;
        };
      })(), t.n = (e2) => {
        var r2 = e2 && e2.__esModule ? () => e2.default : () => e2;
        return t.d(r2, { a: r2 }), r2;
      }, t.d = (e2, r2) => {
        for (var o in r2) t.o(r2, o) && !t.o(e2, o) && Object.defineProperty(e2, o, { enumerable: true, get: r2[o] });
      }, t.g = function() {
        if ("object" == typeof globalThis) return globalThis;
        try {
          return this || Function("return this")();
        } catch (e2) {
          if ("object" == typeof window) return window;
        }
      }(), t.o = (e2, r2) => Object.prototype.hasOwnProperty.call(e2, r2), t.r = (e2) => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e2, "__esModule", { value: true });
      }, (() => {
        var e2 = { 149: 0 };
        t.O.j = (r3) => 0 === e2[r3];
        var r2 = (r3, o2) => {
          var n, i, [a, l, u] = o2, f = 0;
          if (a.some((r4) => 0 !== e2[r4])) {
            for (n in l) t.o(l, n) && (t.m[n] = l[n]);
            if (u) var s = u(t);
          }
          for (r3 && r3(o2); f < a.length; f++) i = a[f], t.o(e2, i) && e2[i] && e2[i][0](), e2[i] = 0;
          return t.O(s);
        }, o = self.webpackChunk_N_E = self.webpackChunk_N_E || [];
        o.forEach(r2.bind(null, 0)), o.push = r2.bind(null, o.push.bind(o));
      })();
    })();
  }
});

// node-built-in-modules:node:async_hooks
var node_async_hooks_exports = {};
import * as node_async_hooks_star from "node:async_hooks";
var init_node_async_hooks = __esm({
  "node-built-in-modules:node:async_hooks"() {
    __reExport(node_async_hooks_exports, node_async_hooks_star);
  }
});

// node-built-in-modules:node:buffer
var node_buffer_exports = {};
import * as node_buffer_star from "node:buffer";
var init_node_buffer = __esm({
  "node-built-in-modules:node:buffer"() {
    __reExport(node_buffer_exports, node_buffer_star);
  }
});

// .next/server/src/middleware.js
var require_middleware = __commonJS({
  ".next/server/src/middleware.js"() {
    "use strict";
    (self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([[550], { 521: (e) => {
      "use strict";
      e.exports = (init_node_async_hooks(), __toCommonJS(node_async_hooks_exports));
    }, 356: (e) => {
      "use strict";
      e.exports = (init_node_buffer(), __toCommonJS(node_buffer_exports));
    }, 555: (e) => {
      "use strict";
      var t = Object.defineProperty, r = Object.getOwnPropertyDescriptor, n = Object.getOwnPropertyNames, s = Object.prototype.hasOwnProperty, i = {};
      function a(e2) {
        var t2;
        let r2 = ["path" in e2 && e2.path && `Path=${e2.path}`, "expires" in e2 && (e2.expires || 0 === e2.expires) && `Expires=${("number" == typeof e2.expires ? new Date(e2.expires) : e2.expires).toUTCString()}`, "maxAge" in e2 && "number" == typeof e2.maxAge && `Max-Age=${e2.maxAge}`, "domain" in e2 && e2.domain && `Domain=${e2.domain}`, "secure" in e2 && e2.secure && "Secure", "httpOnly" in e2 && e2.httpOnly && "HttpOnly", "sameSite" in e2 && e2.sameSite && `SameSite=${e2.sameSite}`, "partitioned" in e2 && e2.partitioned && "Partitioned", "priority" in e2 && e2.priority && `Priority=${e2.priority}`].filter(Boolean), n2 = `${e2.name}=${encodeURIComponent(null != (t2 = e2.value) ? t2 : "")}`;
        return 0 === r2.length ? n2 : `${n2}; ${r2.join("; ")}`;
      }
      function o(e2) {
        let t2 = /* @__PURE__ */ new Map();
        for (let r2 of e2.split(/; */)) {
          if (!r2) continue;
          let e3 = r2.indexOf("=");
          if (-1 === e3) {
            t2.set(r2, "true");
            continue;
          }
          let [n2, s2] = [r2.slice(0, e3), r2.slice(e3 + 1)];
          try {
            t2.set(n2, decodeURIComponent(null != s2 ? s2 : "true"));
          } catch {
          }
        }
        return t2;
      }
      function c(e2) {
        var t2, r2;
        if (!e2) return;
        let [[n2, s2], ...i2] = o(e2), { domain: a2, expires: c2, httponly: h2, maxage: d2, path: p, samesite: f, secure: g, partitioned: y, priority: m } = Object.fromEntries(i2.map(([e3, t3]) => [e3.toLowerCase().replace(/-/g, ""), t3]));
        return function(e3) {
          let t3 = {};
          for (let r3 in e3) e3[r3] && (t3[r3] = e3[r3]);
          return t3;
        }({ name: n2, value: decodeURIComponent(s2), domain: a2, ...c2 && { expires: new Date(c2) }, ...h2 && { httpOnly: true }, ..."string" == typeof d2 && { maxAge: Number(d2) }, path: p, ...f && { sameSite: l.includes(t2 = (t2 = f).toLowerCase()) ? t2 : void 0 }, ...g && { secure: true }, ...m && { priority: u.includes(r2 = (r2 = m).toLowerCase()) ? r2 : void 0 }, ...y && { partitioned: true } });
      }
      ((e2, r2) => {
        for (var n2 in r2) t(e2, n2, { get: r2[n2], enumerable: true });
      })(i, { RequestCookies: () => h, ResponseCookies: () => d, parseCookie: () => o, parseSetCookie: () => c, stringifyCookie: () => a }), e.exports = ((e2, i2, a2, o2) => {
        if (i2 && "object" == typeof i2 || "function" == typeof i2) for (let c2 of n(i2)) s.call(e2, c2) || c2 === a2 || t(e2, c2, { get: () => i2[c2], enumerable: !(o2 = r(i2, c2)) || o2.enumerable });
        return e2;
      })(t({}, "__esModule", { value: true }), i);
      var l = ["strict", "lax", "none"], u = ["low", "medium", "high"], h = class {
        constructor(e2) {
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          let t2 = e2.get("cookie");
          if (t2) for (let [e3, r2] of o(t2)) this._parsed.set(e3, { name: e3, value: r2 });
        }
        [Symbol.iterator]() {
          return this._parsed[Symbol.iterator]();
        }
        get size() {
          return this._parsed.size;
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed);
          if (!e2.length) return r2.map(([e3, t3]) => t3);
          let n2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter(([e3]) => e3 === n2).map(([e3, t3]) => t3);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2] = 1 === e2.length ? [e2[0].name, e2[0].value] : e2, n2 = this._parsed;
          return n2.set(t2, { name: t2, value: r2 }), this._headers.set("cookie", Array.from(n2).map(([e3, t3]) => a(t3)).join("; ")), this;
        }
        delete(e2) {
          let t2 = this._parsed, r2 = Array.isArray(e2) ? e2.map((e3) => t2.delete(e3)) : t2.delete(e2);
          return this._headers.set("cookie", Array.from(t2).map(([e3, t3]) => a(t3)).join("; ")), r2;
        }
        clear() {
          return this.delete(Array.from(this._parsed.keys())), this;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map((e2) => `${e2.name}=${encodeURIComponent(e2.value)}`).join("; ");
        }
      }, d = class {
        constructor(e2) {
          var t2, r2, n2;
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          let s2 = null != (n2 = null != (r2 = null == (t2 = e2.getSetCookie) ? void 0 : t2.call(e2)) ? r2 : e2.get("set-cookie")) ? n2 : [];
          for (let e3 of Array.isArray(s2) ? s2 : function(e4) {
            if (!e4) return [];
            var t3, r3, n3, s3, i2, a2 = [], o2 = 0;
            function c2() {
              for (; o2 < e4.length && /\s/.test(e4.charAt(o2)); ) o2 += 1;
              return o2 < e4.length;
            }
            for (; o2 < e4.length; ) {
              for (t3 = o2, i2 = false; c2(); ) if ("," === (r3 = e4.charAt(o2))) {
                for (n3 = o2, o2 += 1, c2(), s3 = o2; o2 < e4.length && "=" !== (r3 = e4.charAt(o2)) && ";" !== r3 && "," !== r3; ) o2 += 1;
                o2 < e4.length && "=" === e4.charAt(o2) ? (i2 = true, o2 = s3, a2.push(e4.substring(t3, n3)), t3 = o2) : o2 = n3 + 1;
              } else o2 += 1;
              (!i2 || o2 >= e4.length) && a2.push(e4.substring(t3, e4.length));
            }
            return a2;
          }(s2)) {
            let t3 = c(e3);
            t3 && this._parsed.set(t3.name, t3);
          }
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed.values());
          if (!e2.length) return r2;
          let n2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter((e3) => e3.name === n2);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2, n2] = 1 === e2.length ? [e2[0].name, e2[0].value, e2[0]] : e2, s2 = this._parsed;
          return s2.set(t2, function(e3 = { name: "", value: "" }) {
            return "number" == typeof e3.expires && (e3.expires = new Date(e3.expires)), e3.maxAge && (e3.expires = new Date(Date.now() + 1e3 * e3.maxAge)), (null === e3.path || void 0 === e3.path) && (e3.path = "/"), e3;
          }({ name: t2, value: r2, ...n2 })), function(e3, t3) {
            for (let [, r3] of (t3.delete("set-cookie"), e3)) {
              let e4 = a(r3);
              t3.append("set-cookie", e4);
            }
          }(s2, this._headers), this;
        }
        delete(...e2) {
          let [t2, r2] = "string" == typeof e2[0] ? [e2[0]] : [e2[0].name, e2[0]];
          return this.set({ ...r2, name: t2, value: "", expires: /* @__PURE__ */ new Date(0) });
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map(a).join("; ");
        }
      };
    }, 777: (e, t, r) => {
      (() => {
        "use strict";
        var t2 = { 491: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ContextAPI = void 0;
          let n2 = r2(223), s2 = r2(172), i2 = r2(930), a = "context", o = new n2.NoopContextManager();
          class c {
            constructor() {
            }
            static getInstance() {
              return this._instance || (this._instance = new c()), this._instance;
            }
            setGlobalContextManager(e3) {
              return (0, s2.registerGlobal)(a, e3, i2.DiagAPI.instance());
            }
            active() {
              return this._getContextManager().active();
            }
            with(e3, t4, r3, ...n3) {
              return this._getContextManager().with(e3, t4, r3, ...n3);
            }
            bind(e3, t4) {
              return this._getContextManager().bind(e3, t4);
            }
            _getContextManager() {
              return (0, s2.getGlobal)(a) || o;
            }
            disable() {
              this._getContextManager().disable(), (0, s2.unregisterGlobal)(a, i2.DiagAPI.instance());
            }
          }
          t3.ContextAPI = c;
        }, 930: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.DiagAPI = void 0;
          let n2 = r2(56), s2 = r2(912), i2 = r2(957), a = r2(172);
          class o {
            constructor() {
              function e3(e4) {
                return function(...t5) {
                  let r3 = (0, a.getGlobal)("diag");
                  if (r3) return r3[e4](...t5);
                };
              }
              let t4 = this;
              t4.setLogger = (e4, r3 = { logLevel: i2.DiagLogLevel.INFO }) => {
                var n3, o2, c;
                if (e4 === t4) {
                  let e5 = Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
                  return t4.error(null !== (n3 = e5.stack) && void 0 !== n3 ? n3 : e5.message), false;
                }
                "number" == typeof r3 && (r3 = { logLevel: r3 });
                let l = (0, a.getGlobal)("diag"), u = (0, s2.createLogLevelDiagLogger)(null !== (o2 = r3.logLevel) && void 0 !== o2 ? o2 : i2.DiagLogLevel.INFO, e4);
                if (l && !r3.suppressOverrideMessage) {
                  let e5 = null !== (c = Error().stack) && void 0 !== c ? c : "<failed to generate stacktrace>";
                  l.warn(`Current logger will be overwritten from ${e5}`), u.warn(`Current logger will overwrite one already registered from ${e5}`);
                }
                return (0, a.registerGlobal)("diag", u, t4, true);
              }, t4.disable = () => {
                (0, a.unregisterGlobal)("diag", t4);
              }, t4.createComponentLogger = (e4) => new n2.DiagComponentLogger(e4), t4.verbose = e3("verbose"), t4.debug = e3("debug"), t4.info = e3("info"), t4.warn = e3("warn"), t4.error = e3("error");
            }
            static instance() {
              return this._instance || (this._instance = new o()), this._instance;
            }
          }
          t3.DiagAPI = o;
        }, 653: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.MetricsAPI = void 0;
          let n2 = r2(660), s2 = r2(172), i2 = r2(930), a = "metrics";
          class o {
            constructor() {
            }
            static getInstance() {
              return this._instance || (this._instance = new o()), this._instance;
            }
            setGlobalMeterProvider(e3) {
              return (0, s2.registerGlobal)(a, e3, i2.DiagAPI.instance());
            }
            getMeterProvider() {
              return (0, s2.getGlobal)(a) || n2.NOOP_METER_PROVIDER;
            }
            getMeter(e3, t4, r3) {
              return this.getMeterProvider().getMeter(e3, t4, r3);
            }
            disable() {
              (0, s2.unregisterGlobal)(a, i2.DiagAPI.instance());
            }
          }
          t3.MetricsAPI = o;
        }, 181: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.PropagationAPI = void 0;
          let n2 = r2(172), s2 = r2(874), i2 = r2(194), a = r2(277), o = r2(369), c = r2(930), l = "propagation", u = new s2.NoopTextMapPropagator();
          class h {
            constructor() {
              this.createBaggage = o.createBaggage, this.getBaggage = a.getBaggage, this.getActiveBaggage = a.getActiveBaggage, this.setBaggage = a.setBaggage, this.deleteBaggage = a.deleteBaggage;
            }
            static getInstance() {
              return this._instance || (this._instance = new h()), this._instance;
            }
            setGlobalPropagator(e3) {
              return (0, n2.registerGlobal)(l, e3, c.DiagAPI.instance());
            }
            inject(e3, t4, r3 = i2.defaultTextMapSetter) {
              return this._getGlobalPropagator().inject(e3, t4, r3);
            }
            extract(e3, t4, r3 = i2.defaultTextMapGetter) {
              return this._getGlobalPropagator().extract(e3, t4, r3);
            }
            fields() {
              return this._getGlobalPropagator().fields();
            }
            disable() {
              (0, n2.unregisterGlobal)(l, c.DiagAPI.instance());
            }
            _getGlobalPropagator() {
              return (0, n2.getGlobal)(l) || u;
            }
          }
          t3.PropagationAPI = h;
        }, 997: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.TraceAPI = void 0;
          let n2 = r2(172), s2 = r2(846), i2 = r2(139), a = r2(607), o = r2(930), c = "trace";
          class l {
            constructor() {
              this._proxyTracerProvider = new s2.ProxyTracerProvider(), this.wrapSpanContext = i2.wrapSpanContext, this.isSpanContextValid = i2.isSpanContextValid, this.deleteSpan = a.deleteSpan, this.getSpan = a.getSpan, this.getActiveSpan = a.getActiveSpan, this.getSpanContext = a.getSpanContext, this.setSpan = a.setSpan, this.setSpanContext = a.setSpanContext;
            }
            static getInstance() {
              return this._instance || (this._instance = new l()), this._instance;
            }
            setGlobalTracerProvider(e3) {
              let t4 = (0, n2.registerGlobal)(c, this._proxyTracerProvider, o.DiagAPI.instance());
              return t4 && this._proxyTracerProvider.setDelegate(e3), t4;
            }
            getTracerProvider() {
              return (0, n2.getGlobal)(c) || this._proxyTracerProvider;
            }
            getTracer(e3, t4) {
              return this.getTracerProvider().getTracer(e3, t4);
            }
            disable() {
              (0, n2.unregisterGlobal)(c, o.DiagAPI.instance()), this._proxyTracerProvider = new s2.ProxyTracerProvider();
            }
          }
          t3.TraceAPI = l;
        }, 277: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.deleteBaggage = t3.setBaggage = t3.getActiveBaggage = t3.getBaggage = void 0;
          let n2 = r2(491), s2 = (0, r2(780).createContextKey)("OpenTelemetry Baggage Key");
          function i2(e3) {
            return e3.getValue(s2) || void 0;
          }
          t3.getBaggage = i2, t3.getActiveBaggage = function() {
            return i2(n2.ContextAPI.getInstance().active());
          }, t3.setBaggage = function(e3, t4) {
            return e3.setValue(s2, t4);
          }, t3.deleteBaggage = function(e3) {
            return e3.deleteValue(s2);
          };
        }, 993: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.BaggageImpl = void 0;
          class r2 {
            constructor(e3) {
              this._entries = e3 ? new Map(e3) : /* @__PURE__ */ new Map();
            }
            getEntry(e3) {
              let t4 = this._entries.get(e3);
              if (t4) return Object.assign({}, t4);
            }
            getAllEntries() {
              return Array.from(this._entries.entries()).map(([e3, t4]) => [e3, t4]);
            }
            setEntry(e3, t4) {
              let n2 = new r2(this._entries);
              return n2._entries.set(e3, t4), n2;
            }
            removeEntry(e3) {
              let t4 = new r2(this._entries);
              return t4._entries.delete(e3), t4;
            }
            removeEntries(...e3) {
              let t4 = new r2(this._entries);
              for (let r3 of e3) t4._entries.delete(r3);
              return t4;
            }
            clear() {
              return new r2();
            }
          }
          t3.BaggageImpl = r2;
        }, 830: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.baggageEntryMetadataSymbol = void 0, t3.baggageEntryMetadataSymbol = Symbol("BaggageEntryMetadata");
        }, 369: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.baggageEntryMetadataFromString = t3.createBaggage = void 0;
          let n2 = r2(930), s2 = r2(993), i2 = r2(830), a = n2.DiagAPI.instance();
          t3.createBaggage = function(e3 = {}) {
            return new s2.BaggageImpl(new Map(Object.entries(e3)));
          }, t3.baggageEntryMetadataFromString = function(e3) {
            return "string" != typeof e3 && (a.error(`Cannot create baggage metadata from unknown type: ${typeof e3}`), e3 = ""), { __TYPE__: i2.baggageEntryMetadataSymbol, toString: () => e3 };
          };
        }, 67: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.context = void 0;
          let n2 = r2(491);
          t3.context = n2.ContextAPI.getInstance();
        }, 223: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NoopContextManager = void 0;
          let n2 = r2(780);
          class s2 {
            active() {
              return n2.ROOT_CONTEXT;
            }
            with(e3, t4, r3, ...n3) {
              return t4.call(r3, ...n3);
            }
            bind(e3, t4) {
              return t4;
            }
            enable() {
              return this;
            }
            disable() {
              return this;
            }
          }
          t3.NoopContextManager = s2;
        }, 780: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ROOT_CONTEXT = t3.createContextKey = void 0, t3.createContextKey = function(e3) {
            return Symbol.for(e3);
          };
          class r2 {
            constructor(e3) {
              let t4 = this;
              t4._currentContext = e3 ? new Map(e3) : /* @__PURE__ */ new Map(), t4.getValue = (e4) => t4._currentContext.get(e4), t4.setValue = (e4, n2) => {
                let s2 = new r2(t4._currentContext);
                return s2._currentContext.set(e4, n2), s2;
              }, t4.deleteValue = (e4) => {
                let n2 = new r2(t4._currentContext);
                return n2._currentContext.delete(e4), n2;
              };
            }
          }
          t3.ROOT_CONTEXT = new r2();
        }, 506: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.diag = void 0;
          let n2 = r2(930);
          t3.diag = n2.DiagAPI.instance();
        }, 56: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.DiagComponentLogger = void 0;
          let n2 = r2(172);
          class s2 {
            constructor(e3) {
              this._namespace = e3.namespace || "DiagComponentLogger";
            }
            debug(...e3) {
              return i2("debug", this._namespace, e3);
            }
            error(...e3) {
              return i2("error", this._namespace, e3);
            }
            info(...e3) {
              return i2("info", this._namespace, e3);
            }
            warn(...e3) {
              return i2("warn", this._namespace, e3);
            }
            verbose(...e3) {
              return i2("verbose", this._namespace, e3);
            }
          }
          function i2(e3, t4, r3) {
            let s3 = (0, n2.getGlobal)("diag");
            if (s3) return r3.unshift(t4), s3[e3](...r3);
          }
          t3.DiagComponentLogger = s2;
        }, 972: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.DiagConsoleLogger = void 0;
          let r2 = [{ n: "error", c: "error" }, { n: "warn", c: "warn" }, { n: "info", c: "info" }, { n: "debug", c: "debug" }, { n: "verbose", c: "trace" }];
          class n2 {
            constructor() {
              for (let e3 = 0; e3 < r2.length; e3++) this[r2[e3].n] = /* @__PURE__ */ function(e4) {
                return function(...t4) {
                  if (console) {
                    let r3 = console[e4];
                    if ("function" != typeof r3 && (r3 = console.log), "function" == typeof r3) return r3.apply(console, t4);
                  }
                };
              }(r2[e3].c);
            }
          }
          t3.DiagConsoleLogger = n2;
        }, 912: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.createLogLevelDiagLogger = void 0;
          let n2 = r2(957);
          t3.createLogLevelDiagLogger = function(e3, t4) {
            function r3(r4, n3) {
              let s2 = t4[r4];
              return "function" == typeof s2 && e3 >= n3 ? s2.bind(t4) : function() {
              };
            }
            return e3 < n2.DiagLogLevel.NONE ? e3 = n2.DiagLogLevel.NONE : e3 > n2.DiagLogLevel.ALL && (e3 = n2.DiagLogLevel.ALL), t4 = t4 || {}, { error: r3("error", n2.DiagLogLevel.ERROR), warn: r3("warn", n2.DiagLogLevel.WARN), info: r3("info", n2.DiagLogLevel.INFO), debug: r3("debug", n2.DiagLogLevel.DEBUG), verbose: r3("verbose", n2.DiagLogLevel.VERBOSE) };
          };
        }, 957: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.DiagLogLevel = void 0, function(e3) {
            e3[e3.NONE = 0] = "NONE", e3[e3.ERROR = 30] = "ERROR", e3[e3.WARN = 50] = "WARN", e3[e3.INFO = 60] = "INFO", e3[e3.DEBUG = 70] = "DEBUG", e3[e3.VERBOSE = 80] = "VERBOSE", e3[e3.ALL = 9999] = "ALL";
          }(t3.DiagLogLevel || (t3.DiagLogLevel = {}));
        }, 172: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.unregisterGlobal = t3.getGlobal = t3.registerGlobal = void 0;
          let n2 = r2(200), s2 = r2(521), i2 = r2(130), a = s2.VERSION.split(".")[0], o = Symbol.for(`opentelemetry.js.api.${a}`), c = n2._globalThis;
          t3.registerGlobal = function(e3, t4, r3, n3 = false) {
            var i3;
            let a2 = c[o] = null !== (i3 = c[o]) && void 0 !== i3 ? i3 : { version: s2.VERSION };
            if (!n3 && a2[e3]) {
              let t5 = Error(`@opentelemetry/api: Attempted duplicate registration of API: ${e3}`);
              return r3.error(t5.stack || t5.message), false;
            }
            if (a2.version !== s2.VERSION) {
              let t5 = Error(`@opentelemetry/api: Registration of version v${a2.version} for ${e3} does not match previously registered API v${s2.VERSION}`);
              return r3.error(t5.stack || t5.message), false;
            }
            return a2[e3] = t4, r3.debug(`@opentelemetry/api: Registered a global for ${e3} v${s2.VERSION}.`), true;
          }, t3.getGlobal = function(e3) {
            var t4, r3;
            let n3 = null === (t4 = c[o]) || void 0 === t4 ? void 0 : t4.version;
            if (n3 && (0, i2.isCompatible)(n3)) return null === (r3 = c[o]) || void 0 === r3 ? void 0 : r3[e3];
          }, t3.unregisterGlobal = function(e3, t4) {
            t4.debug(`@opentelemetry/api: Unregistering a global for ${e3} v${s2.VERSION}.`);
            let r3 = c[o];
            r3 && delete r3[e3];
          };
        }, 130: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.isCompatible = t3._makeCompatibilityCheck = void 0;
          let n2 = r2(521), s2 = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
          function i2(e3) {
            let t4 = /* @__PURE__ */ new Set([e3]), r3 = /* @__PURE__ */ new Set(), n3 = e3.match(s2);
            if (!n3) return () => false;
            let i3 = { major: +n3[1], minor: +n3[2], patch: +n3[3], prerelease: n3[4] };
            if (null != i3.prerelease) return function(t5) {
              return t5 === e3;
            };
            function a(e4) {
              return r3.add(e4), false;
            }
            return function(e4) {
              if (t4.has(e4)) return true;
              if (r3.has(e4)) return false;
              let n4 = e4.match(s2);
              if (!n4) return a(e4);
              let o = { major: +n4[1], minor: +n4[2], patch: +n4[3], prerelease: n4[4] };
              return null != o.prerelease || i3.major !== o.major ? a(e4) : 0 === i3.major ? i3.minor === o.minor && i3.patch <= o.patch ? (t4.add(e4), true) : a(e4) : i3.minor <= o.minor ? (t4.add(e4), true) : a(e4);
            };
          }
          t3._makeCompatibilityCheck = i2, t3.isCompatible = i2(n2.VERSION);
        }, 886: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.metrics = void 0;
          let n2 = r2(653);
          t3.metrics = n2.MetricsAPI.getInstance();
        }, 901: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ValueType = void 0, function(e3) {
            e3[e3.INT = 0] = "INT", e3[e3.DOUBLE = 1] = "DOUBLE";
          }(t3.ValueType || (t3.ValueType = {}));
        }, 102: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.createNoopMeter = t3.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = t3.NOOP_OBSERVABLE_GAUGE_METRIC = t3.NOOP_OBSERVABLE_COUNTER_METRIC = t3.NOOP_UP_DOWN_COUNTER_METRIC = t3.NOOP_HISTOGRAM_METRIC = t3.NOOP_COUNTER_METRIC = t3.NOOP_METER = t3.NoopObservableUpDownCounterMetric = t3.NoopObservableGaugeMetric = t3.NoopObservableCounterMetric = t3.NoopObservableMetric = t3.NoopHistogramMetric = t3.NoopUpDownCounterMetric = t3.NoopCounterMetric = t3.NoopMetric = t3.NoopMeter = void 0;
          class r2 {
            constructor() {
            }
            createHistogram(e3, r3) {
              return t3.NOOP_HISTOGRAM_METRIC;
            }
            createCounter(e3, r3) {
              return t3.NOOP_COUNTER_METRIC;
            }
            createUpDownCounter(e3, r3) {
              return t3.NOOP_UP_DOWN_COUNTER_METRIC;
            }
            createObservableGauge(e3, r3) {
              return t3.NOOP_OBSERVABLE_GAUGE_METRIC;
            }
            createObservableCounter(e3, r3) {
              return t3.NOOP_OBSERVABLE_COUNTER_METRIC;
            }
            createObservableUpDownCounter(e3, r3) {
              return t3.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
            }
            addBatchObservableCallback(e3, t4) {
            }
            removeBatchObservableCallback(e3) {
            }
          }
          t3.NoopMeter = r2;
          class n2 {
          }
          t3.NoopMetric = n2;
          class s2 extends n2 {
            add(e3, t4) {
            }
          }
          t3.NoopCounterMetric = s2;
          class i2 extends n2 {
            add(e3, t4) {
            }
          }
          t3.NoopUpDownCounterMetric = i2;
          class a extends n2 {
            record(e3, t4) {
            }
          }
          t3.NoopHistogramMetric = a;
          class o {
            addCallback(e3) {
            }
            removeCallback(e3) {
            }
          }
          t3.NoopObservableMetric = o;
          class c extends o {
          }
          t3.NoopObservableCounterMetric = c;
          class l extends o {
          }
          t3.NoopObservableGaugeMetric = l;
          class u extends o {
          }
          t3.NoopObservableUpDownCounterMetric = u, t3.NOOP_METER = new r2(), t3.NOOP_COUNTER_METRIC = new s2(), t3.NOOP_HISTOGRAM_METRIC = new a(), t3.NOOP_UP_DOWN_COUNTER_METRIC = new i2(), t3.NOOP_OBSERVABLE_COUNTER_METRIC = new c(), t3.NOOP_OBSERVABLE_GAUGE_METRIC = new l(), t3.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new u(), t3.createNoopMeter = function() {
            return t3.NOOP_METER;
          };
        }, 660: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NOOP_METER_PROVIDER = t3.NoopMeterProvider = void 0;
          let n2 = r2(102);
          class s2 {
            getMeter(e3, t4, r3) {
              return n2.NOOP_METER;
            }
          }
          t3.NoopMeterProvider = s2, t3.NOOP_METER_PROVIDER = new s2();
        }, 200: function(e2, t3, r2) {
          var n2 = this && this.__createBinding || (Object.create ? function(e3, t4, r3, n3) {
            void 0 === n3 && (n3 = r3), Object.defineProperty(e3, n3, { enumerable: true, get: function() {
              return t4[r3];
            } });
          } : function(e3, t4, r3, n3) {
            void 0 === n3 && (n3 = r3), e3[n3] = t4[r3];
          }), s2 = this && this.__exportStar || function(e3, t4) {
            for (var r3 in e3) "default" === r3 || Object.prototype.hasOwnProperty.call(t4, r3) || n2(t4, e3, r3);
          };
          Object.defineProperty(t3, "__esModule", { value: true }), s2(r2(46), t3);
        }, 651: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3._globalThis = void 0, t3._globalThis = "object" == typeof globalThis ? globalThis : r.g;
        }, 46: function(e2, t3, r2) {
          var n2 = this && this.__createBinding || (Object.create ? function(e3, t4, r3, n3) {
            void 0 === n3 && (n3 = r3), Object.defineProperty(e3, n3, { enumerable: true, get: function() {
              return t4[r3];
            } });
          } : function(e3, t4, r3, n3) {
            void 0 === n3 && (n3 = r3), e3[n3] = t4[r3];
          }), s2 = this && this.__exportStar || function(e3, t4) {
            for (var r3 in e3) "default" === r3 || Object.prototype.hasOwnProperty.call(t4, r3) || n2(t4, e3, r3);
          };
          Object.defineProperty(t3, "__esModule", { value: true }), s2(r2(651), t3);
        }, 939: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.propagation = void 0;
          let n2 = r2(181);
          t3.propagation = n2.PropagationAPI.getInstance();
        }, 874: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NoopTextMapPropagator = void 0;
          class r2 {
            inject(e3, t4) {
            }
            extract(e3, t4) {
              return e3;
            }
            fields() {
              return [];
            }
          }
          t3.NoopTextMapPropagator = r2;
        }, 194: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.defaultTextMapSetter = t3.defaultTextMapGetter = void 0, t3.defaultTextMapGetter = { get(e3, t4) {
            if (null != e3) return e3[t4];
          }, keys: (e3) => null == e3 ? [] : Object.keys(e3) }, t3.defaultTextMapSetter = { set(e3, t4, r2) {
            null != e3 && (e3[t4] = r2);
          } };
        }, 845: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.trace = void 0;
          let n2 = r2(997);
          t3.trace = n2.TraceAPI.getInstance();
        }, 403: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NonRecordingSpan = void 0;
          let n2 = r2(476);
          class s2 {
            constructor(e3 = n2.INVALID_SPAN_CONTEXT) {
              this._spanContext = e3;
            }
            spanContext() {
              return this._spanContext;
            }
            setAttribute(e3, t4) {
              return this;
            }
            setAttributes(e3) {
              return this;
            }
            addEvent(e3, t4) {
              return this;
            }
            setStatus(e3) {
              return this;
            }
            updateName(e3) {
              return this;
            }
            end(e3) {
            }
            isRecording() {
              return false;
            }
            recordException(e3, t4) {
            }
          }
          t3.NonRecordingSpan = s2;
        }, 614: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NoopTracer = void 0;
          let n2 = r2(491), s2 = r2(607), i2 = r2(403), a = r2(139), o = n2.ContextAPI.getInstance();
          class c {
            startSpan(e3, t4, r3 = o.active()) {
              if (null == t4 ? void 0 : t4.root) return new i2.NonRecordingSpan();
              let n3 = r3 && (0, s2.getSpanContext)(r3);
              return "object" == typeof n3 && "string" == typeof n3.spanId && "string" == typeof n3.traceId && "number" == typeof n3.traceFlags && (0, a.isSpanContextValid)(n3) ? new i2.NonRecordingSpan(n3) : new i2.NonRecordingSpan();
            }
            startActiveSpan(e3, t4, r3, n3) {
              let i3, a2, c2;
              if (arguments.length < 2) return;
              2 == arguments.length ? c2 = t4 : 3 == arguments.length ? (i3 = t4, c2 = r3) : (i3 = t4, a2 = r3, c2 = n3);
              let l = null != a2 ? a2 : o.active(), u = this.startSpan(e3, i3, l), h = (0, s2.setSpan)(l, u);
              return o.with(h, c2, void 0, u);
            }
          }
          t3.NoopTracer = c;
        }, 124: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NoopTracerProvider = void 0;
          let n2 = r2(614);
          class s2 {
            getTracer(e3, t4, r3) {
              return new n2.NoopTracer();
            }
          }
          t3.NoopTracerProvider = s2;
        }, 125: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ProxyTracer = void 0;
          let n2 = new (r2(614)).NoopTracer();
          class s2 {
            constructor(e3, t4, r3, n3) {
              this._provider = e3, this.name = t4, this.version = r3, this.options = n3;
            }
            startSpan(e3, t4, r3) {
              return this._getTracer().startSpan(e3, t4, r3);
            }
            startActiveSpan(e3, t4, r3, n3) {
              let s3 = this._getTracer();
              return Reflect.apply(s3.startActiveSpan, s3, arguments);
            }
            _getTracer() {
              if (this._delegate) return this._delegate;
              let e3 = this._provider.getDelegateTracer(this.name, this.version, this.options);
              return e3 ? (this._delegate = e3, this._delegate) : n2;
            }
          }
          t3.ProxyTracer = s2;
        }, 846: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ProxyTracerProvider = void 0;
          let n2 = r2(125), s2 = new (r2(124)).NoopTracerProvider();
          class i2 {
            getTracer(e3, t4, r3) {
              var s3;
              return null !== (s3 = this.getDelegateTracer(e3, t4, r3)) && void 0 !== s3 ? s3 : new n2.ProxyTracer(this, e3, t4, r3);
            }
            getDelegate() {
              var e3;
              return null !== (e3 = this._delegate) && void 0 !== e3 ? e3 : s2;
            }
            setDelegate(e3) {
              this._delegate = e3;
            }
            getDelegateTracer(e3, t4, r3) {
              var n3;
              return null === (n3 = this._delegate) || void 0 === n3 ? void 0 : n3.getTracer(e3, t4, r3);
            }
          }
          t3.ProxyTracerProvider = i2;
        }, 996: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.SamplingDecision = void 0, function(e3) {
            e3[e3.NOT_RECORD = 0] = "NOT_RECORD", e3[e3.RECORD = 1] = "RECORD", e3[e3.RECORD_AND_SAMPLED = 2] = "RECORD_AND_SAMPLED";
          }(t3.SamplingDecision || (t3.SamplingDecision = {}));
        }, 607: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.getSpanContext = t3.setSpanContext = t3.deleteSpan = t3.setSpan = t3.getActiveSpan = t3.getSpan = void 0;
          let n2 = r2(780), s2 = r2(403), i2 = r2(491), a = (0, n2.createContextKey)("OpenTelemetry Context Key SPAN");
          function o(e3) {
            return e3.getValue(a) || void 0;
          }
          function c(e3, t4) {
            return e3.setValue(a, t4);
          }
          t3.getSpan = o, t3.getActiveSpan = function() {
            return o(i2.ContextAPI.getInstance().active());
          }, t3.setSpan = c, t3.deleteSpan = function(e3) {
            return e3.deleteValue(a);
          }, t3.setSpanContext = function(e3, t4) {
            return c(e3, new s2.NonRecordingSpan(t4));
          }, t3.getSpanContext = function(e3) {
            var t4;
            return null === (t4 = o(e3)) || void 0 === t4 ? void 0 : t4.spanContext();
          };
        }, 325: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.TraceStateImpl = void 0;
          let n2 = r2(564);
          class s2 {
            constructor(e3) {
              this._internalState = /* @__PURE__ */ new Map(), e3 && this._parse(e3);
            }
            set(e3, t4) {
              let r3 = this._clone();
              return r3._internalState.has(e3) && r3._internalState.delete(e3), r3._internalState.set(e3, t4), r3;
            }
            unset(e3) {
              let t4 = this._clone();
              return t4._internalState.delete(e3), t4;
            }
            get(e3) {
              return this._internalState.get(e3);
            }
            serialize() {
              return this._keys().reduce((e3, t4) => (e3.push(t4 + "=" + this.get(t4)), e3), []).join(",");
            }
            _parse(e3) {
              !(e3.length > 512) && (this._internalState = e3.split(",").reverse().reduce((e4, t4) => {
                let r3 = t4.trim(), s3 = r3.indexOf("=");
                if (-1 !== s3) {
                  let i2 = r3.slice(0, s3), a = r3.slice(s3 + 1, t4.length);
                  (0, n2.validateKey)(i2) && (0, n2.validateValue)(a) && e4.set(i2, a);
                }
                return e4;
              }, /* @__PURE__ */ new Map()), this._internalState.size > 32 && (this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, 32))));
            }
            _keys() {
              return Array.from(this._internalState.keys()).reverse();
            }
            _clone() {
              let e3 = new s2();
              return e3._internalState = new Map(this._internalState), e3;
            }
          }
          t3.TraceStateImpl = s2;
        }, 564: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.validateValue = t3.validateKey = void 0;
          let r2 = "[_0-9a-z-*/]", n2 = `[a-z]${r2}{0,255}`, s2 = `[a-z0-9]${r2}{0,240}@[a-z]${r2}{0,13}`, i2 = RegExp(`^(?:${n2}|${s2})$`), a = /^[ -~]{0,255}[!-~]$/, o = /,|=/;
          t3.validateKey = function(e3) {
            return i2.test(e3);
          }, t3.validateValue = function(e3) {
            return a.test(e3) && !o.test(e3);
          };
        }, 98: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.createTraceState = void 0;
          let n2 = r2(325);
          t3.createTraceState = function(e3) {
            return new n2.TraceStateImpl(e3);
          };
        }, 476: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.INVALID_SPAN_CONTEXT = t3.INVALID_TRACEID = t3.INVALID_SPANID = void 0;
          let n2 = r2(475);
          t3.INVALID_SPANID = "0000000000000000", t3.INVALID_TRACEID = "00000000000000000000000000000000", t3.INVALID_SPAN_CONTEXT = { traceId: t3.INVALID_TRACEID, spanId: t3.INVALID_SPANID, traceFlags: n2.TraceFlags.NONE };
        }, 357: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.SpanKind = void 0, function(e3) {
            e3[e3.INTERNAL = 0] = "INTERNAL", e3[e3.SERVER = 1] = "SERVER", e3[e3.CLIENT = 2] = "CLIENT", e3[e3.PRODUCER = 3] = "PRODUCER", e3[e3.CONSUMER = 4] = "CONSUMER";
          }(t3.SpanKind || (t3.SpanKind = {}));
        }, 139: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.wrapSpanContext = t3.isSpanContextValid = t3.isValidSpanId = t3.isValidTraceId = void 0;
          let n2 = r2(476), s2 = r2(403), i2 = /^([0-9a-f]{32})$/i, a = /^[0-9a-f]{16}$/i;
          function o(e3) {
            return i2.test(e3) && e3 !== n2.INVALID_TRACEID;
          }
          function c(e3) {
            return a.test(e3) && e3 !== n2.INVALID_SPANID;
          }
          t3.isValidTraceId = o, t3.isValidSpanId = c, t3.isSpanContextValid = function(e3) {
            return o(e3.traceId) && c(e3.spanId);
          }, t3.wrapSpanContext = function(e3) {
            return new s2.NonRecordingSpan(e3);
          };
        }, 847: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.SpanStatusCode = void 0, function(e3) {
            e3[e3.UNSET = 0] = "UNSET", e3[e3.OK = 1] = "OK", e3[e3.ERROR = 2] = "ERROR";
          }(t3.SpanStatusCode || (t3.SpanStatusCode = {}));
        }, 475: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.TraceFlags = void 0, function(e3) {
            e3[e3.NONE = 0] = "NONE", e3[e3.SAMPLED = 1] = "SAMPLED";
          }(t3.TraceFlags || (t3.TraceFlags = {}));
        }, 521: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.VERSION = void 0, t3.VERSION = "1.6.0";
        } }, n = {};
        function s(e2) {
          var r2 = n[e2];
          if (void 0 !== r2) return r2.exports;
          var i2 = n[e2] = { exports: {} }, a = true;
          try {
            t2[e2].call(i2.exports, i2, i2.exports, s), a = false;
          } finally {
            a && delete n[e2];
          }
          return i2.exports;
        }
        s.ab = "//";
        var i = {};
        (() => {
          Object.defineProperty(i, "__esModule", { value: true }), i.trace = i.propagation = i.metrics = i.diag = i.context = i.INVALID_SPAN_CONTEXT = i.INVALID_TRACEID = i.INVALID_SPANID = i.isValidSpanId = i.isValidTraceId = i.isSpanContextValid = i.createTraceState = i.TraceFlags = i.SpanStatusCode = i.SpanKind = i.SamplingDecision = i.ProxyTracerProvider = i.ProxyTracer = i.defaultTextMapSetter = i.defaultTextMapGetter = i.ValueType = i.createNoopMeter = i.DiagLogLevel = i.DiagConsoleLogger = i.ROOT_CONTEXT = i.createContextKey = i.baggageEntryMetadataFromString = void 0;
          var e2 = s(369);
          Object.defineProperty(i, "baggageEntryMetadataFromString", { enumerable: true, get: function() {
            return e2.baggageEntryMetadataFromString;
          } });
          var t3 = s(780);
          Object.defineProperty(i, "createContextKey", { enumerable: true, get: function() {
            return t3.createContextKey;
          } }), Object.defineProperty(i, "ROOT_CONTEXT", { enumerable: true, get: function() {
            return t3.ROOT_CONTEXT;
          } });
          var r2 = s(972);
          Object.defineProperty(i, "DiagConsoleLogger", { enumerable: true, get: function() {
            return r2.DiagConsoleLogger;
          } });
          var n2 = s(957);
          Object.defineProperty(i, "DiagLogLevel", { enumerable: true, get: function() {
            return n2.DiagLogLevel;
          } });
          var a = s(102);
          Object.defineProperty(i, "createNoopMeter", { enumerable: true, get: function() {
            return a.createNoopMeter;
          } });
          var o = s(901);
          Object.defineProperty(i, "ValueType", { enumerable: true, get: function() {
            return o.ValueType;
          } });
          var c = s(194);
          Object.defineProperty(i, "defaultTextMapGetter", { enumerable: true, get: function() {
            return c.defaultTextMapGetter;
          } }), Object.defineProperty(i, "defaultTextMapSetter", { enumerable: true, get: function() {
            return c.defaultTextMapSetter;
          } });
          var l = s(125);
          Object.defineProperty(i, "ProxyTracer", { enumerable: true, get: function() {
            return l.ProxyTracer;
          } });
          var u = s(846);
          Object.defineProperty(i, "ProxyTracerProvider", { enumerable: true, get: function() {
            return u.ProxyTracerProvider;
          } });
          var h = s(996);
          Object.defineProperty(i, "SamplingDecision", { enumerable: true, get: function() {
            return h.SamplingDecision;
          } });
          var d = s(357);
          Object.defineProperty(i, "SpanKind", { enumerable: true, get: function() {
            return d.SpanKind;
          } });
          var p = s(847);
          Object.defineProperty(i, "SpanStatusCode", { enumerable: true, get: function() {
            return p.SpanStatusCode;
          } });
          var f = s(475);
          Object.defineProperty(i, "TraceFlags", { enumerable: true, get: function() {
            return f.TraceFlags;
          } });
          var g = s(98);
          Object.defineProperty(i, "createTraceState", { enumerable: true, get: function() {
            return g.createTraceState;
          } });
          var y = s(139);
          Object.defineProperty(i, "isSpanContextValid", { enumerable: true, get: function() {
            return y.isSpanContextValid;
          } }), Object.defineProperty(i, "isValidTraceId", { enumerable: true, get: function() {
            return y.isValidTraceId;
          } }), Object.defineProperty(i, "isValidSpanId", { enumerable: true, get: function() {
            return y.isValidSpanId;
          } });
          var m = s(476);
          Object.defineProperty(i, "INVALID_SPANID", { enumerable: true, get: function() {
            return m.INVALID_SPANID;
          } }), Object.defineProperty(i, "INVALID_TRACEID", { enumerable: true, get: function() {
            return m.INVALID_TRACEID;
          } }), Object.defineProperty(i, "INVALID_SPAN_CONTEXT", { enumerable: true, get: function() {
            return m.INVALID_SPAN_CONTEXT;
          } });
          let w = s(67);
          Object.defineProperty(i, "context", { enumerable: true, get: function() {
            return w.context;
          } });
          let b = s(506);
          Object.defineProperty(i, "diag", { enumerable: true, get: function() {
            return b.diag;
          } });
          let v = s(886);
          Object.defineProperty(i, "metrics", { enumerable: true, get: function() {
            return v.metrics;
          } });
          let _ = s(939);
          Object.defineProperty(i, "propagation", { enumerable: true, get: function() {
            return _.propagation;
          } });
          let S = s(845);
          Object.defineProperty(i, "trace", { enumerable: true, get: function() {
            return S.trace;
          } }), i.default = { context: w.context, diag: b.diag, metrics: v.metrics, propagation: _.propagation, trace: S.trace };
        })(), e.exports = i;
      })();
    }, 503: (e) => {
      (() => {
        "use strict";
        "undefined" != typeof __nccwpck_require__ && (__nccwpck_require__.ab = "//");
        var t = {};
        (() => {
          t.parse = function(t2, r2) {
            if ("string" != typeof t2) throw TypeError("argument str must be a string");
            for (var s2 = {}, i = t2.split(n), a = (r2 || {}).decode || e2, o = 0; o < i.length; o++) {
              var c = i[o], l = c.indexOf("=");
              if (!(l < 0)) {
                var u = c.substr(0, l).trim(), h = c.substr(++l, c.length).trim();
                '"' == h[0] && (h = h.slice(1, -1)), void 0 == s2[u] && (s2[u] = function(e3, t3) {
                  try {
                    return t3(e3);
                  } catch (t4) {
                    return e3;
                  }
                }(h, a));
              }
            }
            return s2;
          }, t.serialize = function(e3, t2, n2) {
            var i = n2 || {}, a = i.encode || r;
            if ("function" != typeof a) throw TypeError("option encode is invalid");
            if (!s.test(e3)) throw TypeError("argument name is invalid");
            var o = a(t2);
            if (o && !s.test(o)) throw TypeError("argument val is invalid");
            var c = e3 + "=" + o;
            if (null != i.maxAge) {
              var l = i.maxAge - 0;
              if (isNaN(l) || !isFinite(l)) throw TypeError("option maxAge is invalid");
              c += "; Max-Age=" + Math.floor(l);
            }
            if (i.domain) {
              if (!s.test(i.domain)) throw TypeError("option domain is invalid");
              c += "; Domain=" + i.domain;
            }
            if (i.path) {
              if (!s.test(i.path)) throw TypeError("option path is invalid");
              c += "; Path=" + i.path;
            }
            if (i.expires) {
              if ("function" != typeof i.expires.toUTCString) throw TypeError("option expires is invalid");
              c += "; Expires=" + i.expires.toUTCString();
            }
            if (i.httpOnly && (c += "; HttpOnly"), i.secure && (c += "; Secure"), i.sameSite) switch ("string" == typeof i.sameSite ? i.sameSite.toLowerCase() : i.sameSite) {
              case true:
              case "strict":
                c += "; SameSite=Strict";
                break;
              case "lax":
                c += "; SameSite=Lax";
                break;
              case "none":
                c += "; SameSite=None";
                break;
              default:
                throw TypeError("option sameSite is invalid");
            }
            return c;
          };
          var e2 = decodeURIComponent, r = encodeURIComponent, n = /; */, s = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
        })(), e.exports = t;
      })();
    }, 541: (e) => {
      (() => {
        "use strict";
        var t = { 993: (e2) => {
          var t2 = Object.prototype.hasOwnProperty, r2 = "~";
          function n2() {
          }
          function s2(e3, t3, r3) {
            this.fn = e3, this.context = t3, this.once = r3 || false;
          }
          function i(e3, t3, n3, i2, a2) {
            if ("function" != typeof n3) throw TypeError("The listener must be a function");
            var o2 = new s2(n3, i2 || e3, a2), c = r2 ? r2 + t3 : t3;
            return e3._events[c] ? e3._events[c].fn ? e3._events[c] = [e3._events[c], o2] : e3._events[c].push(o2) : (e3._events[c] = o2, e3._eventsCount++), e3;
          }
          function a(e3, t3) {
            0 == --e3._eventsCount ? e3._events = new n2() : delete e3._events[t3];
          }
          function o() {
            this._events = new n2(), this._eventsCount = 0;
          }
          Object.create && (n2.prototype = /* @__PURE__ */ Object.create(null), new n2().__proto__ || (r2 = false)), o.prototype.eventNames = function() {
            var e3, n3, s3 = [];
            if (0 === this._eventsCount) return s3;
            for (n3 in e3 = this._events) t2.call(e3, n3) && s3.push(r2 ? n3.slice(1) : n3);
            return Object.getOwnPropertySymbols ? s3.concat(Object.getOwnPropertySymbols(e3)) : s3;
          }, o.prototype.listeners = function(e3) {
            var t3 = r2 ? r2 + e3 : e3, n3 = this._events[t3];
            if (!n3) return [];
            if (n3.fn) return [n3.fn];
            for (var s3 = 0, i2 = n3.length, a2 = Array(i2); s3 < i2; s3++) a2[s3] = n3[s3].fn;
            return a2;
          }, o.prototype.listenerCount = function(e3) {
            var t3 = r2 ? r2 + e3 : e3, n3 = this._events[t3];
            return n3 ? n3.fn ? 1 : n3.length : 0;
          }, o.prototype.emit = function(e3, t3, n3, s3, i2, a2) {
            var o2 = r2 ? r2 + e3 : e3;
            if (!this._events[o2]) return false;
            var c, l, u = this._events[o2], h = arguments.length;
            if (u.fn) {
              switch (u.once && this.removeListener(e3, u.fn, void 0, true), h) {
                case 1:
                  return u.fn.call(u.context), true;
                case 2:
                  return u.fn.call(u.context, t3), true;
                case 3:
                  return u.fn.call(u.context, t3, n3), true;
                case 4:
                  return u.fn.call(u.context, t3, n3, s3), true;
                case 5:
                  return u.fn.call(u.context, t3, n3, s3, i2), true;
                case 6:
                  return u.fn.call(u.context, t3, n3, s3, i2, a2), true;
              }
              for (l = 1, c = Array(h - 1); l < h; l++) c[l - 1] = arguments[l];
              u.fn.apply(u.context, c);
            } else {
              var d, p = u.length;
              for (l = 0; l < p; l++) switch (u[l].once && this.removeListener(e3, u[l].fn, void 0, true), h) {
                case 1:
                  u[l].fn.call(u[l].context);
                  break;
                case 2:
                  u[l].fn.call(u[l].context, t3);
                  break;
                case 3:
                  u[l].fn.call(u[l].context, t3, n3);
                  break;
                case 4:
                  u[l].fn.call(u[l].context, t3, n3, s3);
                  break;
                default:
                  if (!c) for (d = 1, c = Array(h - 1); d < h; d++) c[d - 1] = arguments[d];
                  u[l].fn.apply(u[l].context, c);
              }
            }
            return true;
          }, o.prototype.on = function(e3, t3, r3) {
            return i(this, e3, t3, r3, false);
          }, o.prototype.once = function(e3, t3, r3) {
            return i(this, e3, t3, r3, true);
          }, o.prototype.removeListener = function(e3, t3, n3, s3) {
            var i2 = r2 ? r2 + e3 : e3;
            if (!this._events[i2]) return this;
            if (!t3) return a(this, i2), this;
            var o2 = this._events[i2];
            if (o2.fn) o2.fn !== t3 || s3 && !o2.once || n3 && o2.context !== n3 || a(this, i2);
            else {
              for (var c = 0, l = [], u = o2.length; c < u; c++) (o2[c].fn !== t3 || s3 && !o2[c].once || n3 && o2[c].context !== n3) && l.push(o2[c]);
              l.length ? this._events[i2] = 1 === l.length ? l[0] : l : a(this, i2);
            }
            return this;
          }, o.prototype.removeAllListeners = function(e3) {
            var t3;
            return e3 ? (t3 = r2 ? r2 + e3 : e3, this._events[t3] && a(this, t3)) : (this._events = new n2(), this._eventsCount = 0), this;
          }, o.prototype.off = o.prototype.removeListener, o.prototype.addListener = o.prototype.on, o.prefixed = r2, o.EventEmitter = o, e2.exports = o;
        }, 213: (e2) => {
          e2.exports = (e3, t2) => (t2 = t2 || (() => {
          }), e3.then((e4) => new Promise((e5) => {
            e5(t2());
          }).then(() => e4), (e4) => new Promise((e5) => {
            e5(t2());
          }).then(() => {
            throw e4;
          })));
        }, 574: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.default = function(e3, t3, r2) {
            let n2 = 0, s2 = e3.length;
            for (; s2 > 0; ) {
              let i = s2 / 2 | 0, a = n2 + i;
              0 >= r2(e3[a], t3) ? (n2 = ++a, s2 -= i + 1) : s2 = i;
            }
            return n2;
          };
        }, 821: (e2, t2, r2) => {
          Object.defineProperty(t2, "__esModule", { value: true });
          let n2 = r2(574);
          class s2 {
            constructor() {
              this._queue = [];
            }
            enqueue(e3, t3) {
              let r3 = { priority: (t3 = Object.assign({ priority: 0 }, t3)).priority, run: e3 };
              if (this.size && this._queue[this.size - 1].priority >= t3.priority) {
                this._queue.push(r3);
                return;
              }
              let s3 = n2.default(this._queue, r3, (e4, t4) => t4.priority - e4.priority);
              this._queue.splice(s3, 0, r3);
            }
            dequeue() {
              let e3 = this._queue.shift();
              return null == e3 ? void 0 : e3.run;
            }
            filter(e3) {
              return this._queue.filter((t3) => t3.priority === e3.priority).map((e4) => e4.run);
            }
            get size() {
              return this._queue.length;
            }
          }
          t2.default = s2;
        }, 816: (e2, t2, r2) => {
          let n2 = r2(213);
          class s2 extends Error {
            constructor(e3) {
              super(e3), this.name = "TimeoutError";
            }
          }
          let i = (e3, t3, r3) => new Promise((i2, a) => {
            if ("number" != typeof t3 || t3 < 0) throw TypeError("Expected `milliseconds` to be a positive number");
            if (t3 === 1 / 0) {
              i2(e3);
              return;
            }
            let o = setTimeout(() => {
              if ("function" == typeof r3) {
                try {
                  i2(r3());
                } catch (e4) {
                  a(e4);
                }
                return;
              }
              let n3 = "string" == typeof r3 ? r3 : `Promise timed out after ${t3} milliseconds`, o2 = r3 instanceof Error ? r3 : new s2(n3);
              "function" == typeof e3.cancel && e3.cancel(), a(o2);
            }, t3);
            n2(e3.then(i2, a), () => {
              clearTimeout(o);
            });
          });
          e2.exports = i, e2.exports.default = i, e2.exports.TimeoutError = s2;
        } }, r = {};
        function n(e2) {
          var s2 = r[e2];
          if (void 0 !== s2) return s2.exports;
          var i = r[e2] = { exports: {} }, a = true;
          try {
            t[e2](i, i.exports, n), a = false;
          } finally {
            a && delete r[e2];
          }
          return i.exports;
        }
        n.ab = "//";
        var s = {};
        (() => {
          Object.defineProperty(s, "__esModule", { value: true });
          let e2 = n(993), t2 = n(816), r2 = n(821), i = () => {
          }, a = new t2.TimeoutError();
          class o extends e2 {
            constructor(e3) {
              var t3, n2, s2, a2;
              if (super(), this._intervalCount = 0, this._intervalEnd = 0, this._pendingCount = 0, this._resolveEmpty = i, this._resolveIdle = i, !("number" == typeof (e3 = Object.assign({ carryoverConcurrencyCount: false, intervalCap: 1 / 0, interval: 0, concurrency: 1 / 0, autoStart: true, queueClass: r2.default }, e3)).intervalCap && e3.intervalCap >= 1)) throw TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${null !== (n2 = null === (t3 = e3.intervalCap) || void 0 === t3 ? void 0 : t3.toString()) && void 0 !== n2 ? n2 : ""}\` (${typeof e3.intervalCap})`);
              if (void 0 === e3.interval || !(Number.isFinite(e3.interval) && e3.interval >= 0)) throw TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${null !== (a2 = null === (s2 = e3.interval) || void 0 === s2 ? void 0 : s2.toString()) && void 0 !== a2 ? a2 : ""}\` (${typeof e3.interval})`);
              this._carryoverConcurrencyCount = e3.carryoverConcurrencyCount, this._isIntervalIgnored = e3.intervalCap === 1 / 0 || 0 === e3.interval, this._intervalCap = e3.intervalCap, this._interval = e3.interval, this._queue = new e3.queueClass(), this._queueClass = e3.queueClass, this.concurrency = e3.concurrency, this._timeout = e3.timeout, this._throwOnTimeout = true === e3.throwOnTimeout, this._isPaused = false === e3.autoStart;
            }
            get _doesIntervalAllowAnother() {
              return this._isIntervalIgnored || this._intervalCount < this._intervalCap;
            }
            get _doesConcurrentAllowAnother() {
              return this._pendingCount < this._concurrency;
            }
            _next() {
              this._pendingCount--, this._tryToStartAnother(), this.emit("next");
            }
            _resolvePromises() {
              this._resolveEmpty(), this._resolveEmpty = i, 0 === this._pendingCount && (this._resolveIdle(), this._resolveIdle = i, this.emit("idle"));
            }
            _onResumeInterval() {
              this._onInterval(), this._initializeIntervalIfNeeded(), this._timeoutId = void 0;
            }
            _isIntervalPaused() {
              let e3 = Date.now();
              if (void 0 === this._intervalId) {
                let t3 = this._intervalEnd - e3;
                if (!(t3 < 0)) return void 0 === this._timeoutId && (this._timeoutId = setTimeout(() => {
                  this._onResumeInterval();
                }, t3)), true;
                this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0;
              }
              return false;
            }
            _tryToStartAnother() {
              if (0 === this._queue.size) return this._intervalId && clearInterval(this._intervalId), this._intervalId = void 0, this._resolvePromises(), false;
              if (!this._isPaused) {
                let e3 = !this._isIntervalPaused();
                if (this._doesIntervalAllowAnother && this._doesConcurrentAllowAnother) {
                  let t3 = this._queue.dequeue();
                  return !!t3 && (this.emit("active"), t3(), e3 && this._initializeIntervalIfNeeded(), true);
                }
              }
              return false;
            }
            _initializeIntervalIfNeeded() {
              this._isIntervalIgnored || void 0 !== this._intervalId || (this._intervalId = setInterval(() => {
                this._onInterval();
              }, this._interval), this._intervalEnd = Date.now() + this._interval);
            }
            _onInterval() {
              0 === this._intervalCount && 0 === this._pendingCount && this._intervalId && (clearInterval(this._intervalId), this._intervalId = void 0), this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0, this._processQueue();
            }
            _processQueue() {
              for (; this._tryToStartAnother(); ) ;
            }
            get concurrency() {
              return this._concurrency;
            }
            set concurrency(e3) {
              if (!("number" == typeof e3 && e3 >= 1)) throw TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${e3}\` (${typeof e3})`);
              this._concurrency = e3, this._processQueue();
            }
            async add(e3, r3 = {}) {
              return new Promise((n2, s2) => {
                let i2 = async () => {
                  this._pendingCount++, this._intervalCount++;
                  try {
                    let i3 = void 0 === this._timeout && void 0 === r3.timeout ? e3() : t2.default(Promise.resolve(e3()), void 0 === r3.timeout ? this._timeout : r3.timeout, () => {
                      (void 0 === r3.throwOnTimeout ? this._throwOnTimeout : r3.throwOnTimeout) && s2(a);
                    });
                    n2(await i3);
                  } catch (e4) {
                    s2(e4);
                  }
                  this._next();
                };
                this._queue.enqueue(i2, r3), this._tryToStartAnother(), this.emit("add");
              });
            }
            async addAll(e3, t3) {
              return Promise.all(e3.map(async (e4) => this.add(e4, t3)));
            }
            start() {
              return this._isPaused && (this._isPaused = false, this._processQueue()), this;
            }
            pause() {
              this._isPaused = true;
            }
            clear() {
              this._queue = new this._queueClass();
            }
            async onEmpty() {
              if (0 !== this._queue.size) return new Promise((e3) => {
                let t3 = this._resolveEmpty;
                this._resolveEmpty = () => {
                  t3(), e3();
                };
              });
            }
            async onIdle() {
              if (0 !== this._pendingCount || 0 !== this._queue.size) return new Promise((e3) => {
                let t3 = this._resolveIdle;
                this._resolveIdle = () => {
                  t3(), e3();
                };
              });
            }
            get size() {
              return this._queue.size;
            }
            sizeBy(e3) {
              return this._queue.filter(e3).length;
            }
            get pending() {
              return this._pendingCount;
            }
            get isPaused() {
              return this._isPaused;
            }
            get timeout() {
              return this._timeout;
            }
            set timeout(e3) {
              this._timeout = e3;
            }
          }
          s.default = o;
        })(), e.exports = s;
      })();
    }, 544: (e, t) => {
      "use strict";
      var r = { H: null, A: null };
      function n(e2) {
        var t2 = "https://react.dev/errors/" + e2;
        if (1 < arguments.length) {
          t2 += "?args[]=" + encodeURIComponent(arguments[1]);
          for (var r2 = 2; r2 < arguments.length; r2++) t2 += "&args[]=" + encodeURIComponent(arguments[r2]);
        }
        return "Minified React error #" + e2 + "; visit " + t2 + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
      }
      var s = Array.isArray, i = Symbol.for("react.transitional.element"), a = Symbol.for("react.portal"), o = Symbol.for("react.fragment"), c = Symbol.for("react.strict_mode"), l = Symbol.for("react.profiler"), u = Symbol.for("react.forward_ref"), h = Symbol.for("react.suspense"), d = Symbol.for("react.memo"), p = Symbol.for("react.lazy"), f = Symbol.iterator, g = Object.prototype.hasOwnProperty, y = Object.assign;
      function m(e2, t2, r2, n2, s2, a2) {
        return { $$typeof: i, type: e2, key: t2, ref: void 0 !== (r2 = a2.ref) ? r2 : null, props: a2 };
      }
      function w(e2) {
        return "object" == typeof e2 && null !== e2 && e2.$$typeof === i;
      }
      var b = /\/+/g;
      function v(e2, t2) {
        var r2, n2;
        return "object" == typeof e2 && null !== e2 && null != e2.key ? (r2 = "" + e2.key, n2 = { "=": "=0", ":": "=2" }, "$" + r2.replace(/[=:]/g, function(e3) {
          return n2[e3];
        })) : t2.toString(36);
      }
      function _() {
      }
      function S(e2, t2, r2) {
        if (null == e2) return e2;
        var o2 = [], c2 = 0;
        return !function e3(t3, r3, o3, c3, l2) {
          var u2, h2, d2, g2 = typeof t3;
          ("undefined" === g2 || "boolean" === g2) && (t3 = null);
          var y2 = false;
          if (null === t3) y2 = true;
          else switch (g2) {
            case "bigint":
            case "string":
            case "number":
              y2 = true;
              break;
            case "object":
              switch (t3.$$typeof) {
                case i:
                case a:
                  y2 = true;
                  break;
                case p:
                  return e3((y2 = t3._init)(t3._payload), r3, o3, c3, l2);
              }
          }
          if (y2) return l2 = l2(t3), y2 = "" === c3 ? "." + v(t3, 0) : c3, s(l2) ? (o3 = "", null != y2 && (o3 = y2.replace(b, "$&/") + "/"), e3(l2, r3, o3, "", function(e4) {
            return e4;
          })) : null != l2 && (w(l2) && (u2 = l2, h2 = o3 + (null == l2.key || t3 && t3.key === l2.key ? "" : ("" + l2.key).replace(b, "$&/") + "/") + y2, l2 = m(u2.type, h2, void 0, void 0, void 0, u2.props)), r3.push(l2)), 1;
          y2 = 0;
          var S2 = "" === c3 ? "." : c3 + ":";
          if (s(t3)) for (var E2 = 0; E2 < t3.length; E2++) g2 = S2 + v(c3 = t3[E2], E2), y2 += e3(c3, r3, o3, g2, l2);
          else if ("function" == typeof (E2 = null === (d2 = t3) || "object" != typeof d2 ? null : "function" == typeof (d2 = f && d2[f] || d2["@@iterator"]) ? d2 : null)) for (t3 = E2.call(t3), E2 = 0; !(c3 = t3.next()).done; ) g2 = S2 + v(c3 = c3.value, E2++), y2 += e3(c3, r3, o3, g2, l2);
          else if ("object" === g2) {
            if ("function" == typeof t3.then) return e3(function(e4) {
              switch (e4.status) {
                case "fulfilled":
                  return e4.value;
                case "rejected":
                  throw e4.reason;
                default:
                  switch ("string" == typeof e4.status ? e4.then(_, _) : (e4.status = "pending", e4.then(function(t4) {
                    "pending" === e4.status && (e4.status = "fulfilled", e4.value = t4);
                  }, function(t4) {
                    "pending" === e4.status && (e4.status = "rejected", e4.reason = t4);
                  })), e4.status) {
                    case "fulfilled":
                      return e4.value;
                    case "rejected":
                      throw e4.reason;
                  }
              }
              throw e4;
            }(t3), r3, o3, c3, l2);
            throw Error(n(31, "[object Object]" === (r3 = String(t3)) ? "object with keys {" + Object.keys(t3).join(", ") + "}" : r3));
          }
          return y2;
        }(e2, o2, "", "", function(e3) {
          return t2.call(r2, e3, c2++);
        }), o2;
      }
      function E(e2) {
        if (-1 === e2._status) {
          var t2 = e2._result;
          (t2 = t2()).then(function(t3) {
            (0 === e2._status || -1 === e2._status) && (e2._status = 1, e2._result = t3);
          }, function(t3) {
            (0 === e2._status || -1 === e2._status) && (e2._status = 2, e2._result = t3);
          }), -1 === e2._status && (e2._status = 0, e2._result = t2);
        }
        if (1 === e2._status) return e2._result.default;
        throw e2._result;
      }
      function k() {
        return /* @__PURE__ */ new WeakMap();
      }
      function T() {
        return { s: 0, v: void 0, o: null, p: null };
      }
      t.Children = { map: S, forEach: function(e2, t2, r2) {
        S(e2, function() {
          t2.apply(this, arguments);
        }, r2);
      }, count: function(e2) {
        var t2 = 0;
        return S(e2, function() {
          t2++;
        }), t2;
      }, toArray: function(e2) {
        return S(e2, function(e3) {
          return e3;
        }) || [];
      }, only: function(e2) {
        if (!w(e2)) throw Error(n(143));
        return e2;
      } }, t.Fragment = o, t.Profiler = l, t.StrictMode = c, t.Suspense = h, t.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r, t.cache = function(e2) {
        return function() {
          var t2 = r.A;
          if (!t2) return e2.apply(null, arguments);
          var n2 = t2.getCacheForType(k);
          void 0 === (t2 = n2.get(e2)) && (t2 = T(), n2.set(e2, t2)), n2 = 0;
          for (var s2 = arguments.length; n2 < s2; n2++) {
            var i2 = arguments[n2];
            if ("function" == typeof i2 || "object" == typeof i2 && null !== i2) {
              var a2 = t2.o;
              null === a2 && (t2.o = a2 = /* @__PURE__ */ new WeakMap()), void 0 === (t2 = a2.get(i2)) && (t2 = T(), a2.set(i2, t2));
            } else null === (a2 = t2.p) && (t2.p = a2 = /* @__PURE__ */ new Map()), void 0 === (t2 = a2.get(i2)) && (t2 = T(), a2.set(i2, t2));
          }
          if (1 === t2.s) return t2.v;
          if (2 === t2.s) throw t2.v;
          try {
            var o2 = e2.apply(null, arguments);
            return (n2 = t2).s = 1, n2.v = o2;
          } catch (e3) {
            throw (o2 = t2).s = 2, o2.v = e3, e3;
          }
        };
      }, t.cloneElement = function(e2, t2, r2) {
        if (null == e2) throw Error(n(267, e2));
        var s2 = y({}, e2.props), i2 = e2.key, a2 = void 0;
        if (null != t2) for (o2 in void 0 !== t2.ref && (a2 = void 0), void 0 !== t2.key && (i2 = "" + t2.key), t2) g.call(t2, o2) && "key" !== o2 && "__self" !== o2 && "__source" !== o2 && ("ref" !== o2 || void 0 !== t2.ref) && (s2[o2] = t2[o2]);
        var o2 = arguments.length - 2;
        if (1 === o2) s2.children = r2;
        else if (1 < o2) {
          for (var c2 = Array(o2), l2 = 0; l2 < o2; l2++) c2[l2] = arguments[l2 + 2];
          s2.children = c2;
        }
        return m(e2.type, i2, void 0, void 0, a2, s2);
      }, t.createElement = function(e2, t2, r2) {
        var n2, s2 = {}, i2 = null;
        if (null != t2) for (n2 in void 0 !== t2.key && (i2 = "" + t2.key), t2) g.call(t2, n2) && "key" !== n2 && "__self" !== n2 && "__source" !== n2 && (s2[n2] = t2[n2]);
        var a2 = arguments.length - 2;
        if (1 === a2) s2.children = r2;
        else if (1 < a2) {
          for (var o2 = Array(a2), c2 = 0; c2 < a2; c2++) o2[c2] = arguments[c2 + 2];
          s2.children = o2;
        }
        if (e2 && e2.defaultProps) for (n2 in a2 = e2.defaultProps) void 0 === s2[n2] && (s2[n2] = a2[n2]);
        return m(e2, i2, void 0, void 0, null, s2);
      }, t.createRef = function() {
        return { current: null };
      }, t.forwardRef = function(e2) {
        return { $$typeof: u, render: e2 };
      }, t.isValidElement = w, t.lazy = function(e2) {
        return { $$typeof: p, _payload: { _status: -1, _result: e2 }, _init: E };
      }, t.memo = function(e2, t2) {
        return { $$typeof: d, type: e2, compare: void 0 === t2 ? null : t2 };
      }, t.use = function(e2) {
        return r.H.use(e2);
      }, t.useCallback = function(e2, t2) {
        return r.H.useCallback(e2, t2);
      }, t.useDebugValue = function() {
      }, t.useId = function() {
        return r.H.useId();
      }, t.useMemo = function(e2, t2) {
        return r.H.useMemo(e2, t2);
      }, t.version = "19.0.0-rc-65e06cb7-20241218";
    }, 886: (e, t, r) => {
      "use strict";
      e.exports = r(544);
    }, 113: (e, t, r) => {
      var n;
      (() => {
        var s = { 226: function(s2, i2) {
          !function(a2, o2) {
            "use strict";
            var c = "function", l = "undefined", u = "object", h = "string", d = "major", p = "model", f = "name", g = "type", y = "vendor", m = "version", w = "architecture", b = "console", v = "mobile", _ = "tablet", S = "smarttv", E = "wearable", k = "embedded", T = "Amazon", A = "Apple", P = "ASUS", C = "BlackBerry", O = "Browser", R = "Chrome", x = "Firefox", I = "Google", N = "Huawei", j = "Microsoft", D = "Motorola", U = "Opera", $ = "Samsung", L = "Sharp", M = "Sony", H = "Xiaomi", K = "Zebra", W = "Facebook", B = "Chromium OS", q = "Mac OS", J = function(e2, t2) {
              var r2 = {};
              for (var n2 in e2) t2[n2] && t2[n2].length % 2 == 0 ? r2[n2] = t2[n2].concat(e2[n2]) : r2[n2] = e2[n2];
              return r2;
            }, z = function(e2) {
              for (var t2 = {}, r2 = 0; r2 < e2.length; r2++) t2[e2[r2].toUpperCase()] = e2[r2];
              return t2;
            }, V = function(e2, t2) {
              return typeof e2 === h && -1 !== F(t2).indexOf(F(e2));
            }, F = function(e2) {
              return e2.toLowerCase();
            }, G = function(e2, t2) {
              if (typeof e2 === h) return e2 = e2.replace(/^\s\s*/, ""), typeof t2 === l ? e2 : e2.substring(0, 350);
            }, Y = function(e2, t2) {
              for (var r2, n2, s3, i3, a3, l2, h2 = 0; h2 < t2.length && !a3; ) {
                var d2 = t2[h2], p2 = t2[h2 + 1];
                for (r2 = n2 = 0; r2 < d2.length && !a3 && d2[r2]; ) if (a3 = d2[r2++].exec(e2)) for (s3 = 0; s3 < p2.length; s3++) l2 = a3[++n2], typeof (i3 = p2[s3]) === u && i3.length > 0 ? 2 === i3.length ? typeof i3[1] == c ? this[i3[0]] = i3[1].call(this, l2) : this[i3[0]] = i3[1] : 3 === i3.length ? typeof i3[1] !== c || i3[1].exec && i3[1].test ? this[i3[0]] = l2 ? l2.replace(i3[1], i3[2]) : void 0 : this[i3[0]] = l2 ? i3[1].call(this, l2, i3[2]) : void 0 : 4 === i3.length && (this[i3[0]] = l2 ? i3[3].call(this, l2.replace(i3[1], i3[2])) : void 0) : this[i3] = l2 || o2;
                h2 += 2;
              }
            }, X = function(e2, t2) {
              for (var r2 in t2) if (typeof t2[r2] === u && t2[r2].length > 0) {
                for (var n2 = 0; n2 < t2[r2].length; n2++) if (V(t2[r2][n2], e2)) return "?" === r2 ? o2 : r2;
              } else if (V(t2[r2], e2)) return "?" === r2 ? o2 : r2;
              return e2;
            }, Q = { ME: "4.90", "NT 3.11": "NT3.51", "NT 4.0": "NT4.0", 2e3: "NT 5.0", XP: ["NT 5.1", "NT 5.2"], Vista: "NT 6.0", 7: "NT 6.1", 8: "NT 6.2", 8.1: "NT 6.3", 10: ["NT 6.4", "NT 10.0"], RT: "ARM" }, Z = { browser: [[/\b(?:crmo|crios)\/([\w\.]+)/i], [m, [f, "Chrome"]], [/edg(?:e|ios|a)?\/([\w\.]+)/i], [m, [f, "Edge"]], [/(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i], [f, m], [/opios[\/ ]+([\w\.]+)/i], [m, [f, U + " Mini"]], [/\bopr\/([\w\.]+)/i], [m, [f, U]], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i, /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i, /(ba?idubrowser)[\/ ]?([\w\.]+)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i, /(heytap|ovi)browser\/([\d\.]+)/i, /(weibo)__([\d\.]+)/i], [f, m], [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i], [m, [f, "UC" + O]], [/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i], [m, [f, "WeChat(Win) Desktop"]], [/micromessenger\/([\w\.]+)/i], [m, [f, "WeChat"]], [/konqueror\/([\w\.]+)/i], [m, [f, "Konqueror"]], [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i], [m, [f, "IE"]], [/ya(?:search)?browser\/([\w\.]+)/i], [m, [f, "Yandex"]], [/(avast|avg)\/([\w\.]+)/i], [[f, /(.+)/, "$1 Secure " + O], m], [/\bfocus\/([\w\.]+)/i], [m, [f, x + " Focus"]], [/\bopt\/([\w\.]+)/i], [m, [f, U + " Touch"]], [/coc_coc\w+\/([\w\.]+)/i], [m, [f, "Coc Coc"]], [/dolfin\/([\w\.]+)/i], [m, [f, "Dolphin"]], [/coast\/([\w\.]+)/i], [m, [f, U + " Coast"]], [/miuibrowser\/([\w\.]+)/i], [m, [f, "MIUI " + O]], [/fxios\/([-\w\.]+)/i], [m, [f, x]], [/\bqihu|(qi?ho?o?|360)browser/i], [[f, "360 " + O]], [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i], [[f, /(.+)/, "$1 " + O], m], [/(comodo_dragon)\/([\w\.]+)/i], [[f, /_/g, " "], m], [/(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i], [f, m], [/(metasr)[\/ ]?([\w\.]+)/i, /(lbbrowser)/i, /\[(linkedin)app\]/i], [f], [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i], [[f, W], m], [/(kakao(?:talk|story))[\/ ]([\w\.]+)/i, /(naver)\(.*?(\d+\.[\w\.]+).*\)/i, /safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(chromium|instagram)[\/ ]([-\w\.]+)/i], [f, m], [/\bgsa\/([\w\.]+) .*safari\//i], [m, [f, "GSA"]], [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i], [m, [f, "TikTok"]], [/headlesschrome(?:\/([\w\.]+)| )/i], [m, [f, R + " Headless"]], [/ wv\).+(chrome)\/([\w\.]+)/i], [[f, R + " WebView"], m], [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i], [m, [f, "Android " + O]], [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i], [f, m], [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i], [m, [f, "Mobile Safari"]], [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i], [m, f], [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i], [f, [m, X, { "1.0": "/8", 1.2: "/1", 1.3: "/3", "2.0": "/412", "2.0.2": "/416", "2.0.3": "/417", "2.0.4": "/419", "?": "/" }]], [/(webkit|khtml)\/([\w\.]+)/i], [f, m], [/(navigator|netscape\d?)\/([-\w\.]+)/i], [[f, "Netscape"], m], [/mobile vr; rv:([\w\.]+)\).+firefox/i], [m, [f, x + " Reality"]], [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /(links) \(([\w\.]+)/i, /panasonic;(viera)/i], [f, m], [/(cobalt)\/([\w\.]+)/i], [f, [m, /master.|lts./, ""]]], cpu: [[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i], [[w, "amd64"]], [/(ia32(?=;))/i], [[w, F]], [/((?:i[346]|x)86)[;\)]/i], [[w, "ia32"]], [/\b(aarch64|arm(v?8e?l?|_?64))\b/i], [[w, "arm64"]], [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i], [[w, "armhf"]], [/windows (ce|mobile); ppc;/i], [[w, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i], [[w, /ower/, "", F]], [/(sun4\w)[;\)]/i], [[w, "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i], [[w, F]]], device: [[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i], [p, [y, $], [g, _]], [/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i], [p, [y, $], [g, v]], [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i], [p, [y, A], [g, v]], [/\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i], [p, [y, A], [g, _]], [/(macintosh);/i], [p, [y, A]], [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i], [p, [y, L], [g, v]], [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i], [p, [y, N], [g, _]], [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i], [p, [y, N], [g, v]], [/\b(poco[\w ]+)(?: bui|\))/i, /\b; (\w+) build\/hm\1/i, /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i], [[p, /_/g, " "], [y, H], [g, v]], [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i], [[p, /_/g, " "], [y, H], [g, _]], [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i], [p, [y, "OPPO"], [g, v]], [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i], [p, [y, "Vivo"], [g, v]], [/\b(rmx[12]\d{3})(?: bui|;|\))/i], [p, [y, "Realme"], [g, v]], [/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i], [p, [y, D], [g, v]], [/\b(mz60\d|xoom[2 ]{0,2}) build\//i], [p, [y, D], [g, _]], [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i], [p, [y, "LG"], [g, _]], [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i], [p, [y, "LG"], [g, v]], [/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i], [p, [y, "Lenovo"], [g, _]], [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i], [[p, /_/g, " "], [y, "Nokia"], [g, v]], [/(pixel c)\b/i], [p, [y, I], [g, _]], [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i], [p, [y, I], [g, v]], [/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [p, [y, M], [g, v]], [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i], [[p, "Xperia Tablet"], [y, M], [g, _]], [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i], [p, [y, "OnePlus"], [g, v]], [/(alexa)webm/i, /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i], [p, [y, T], [g, _]], [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i], [[p, /(.+)/g, "Fire Phone $1"], [y, T], [g, v]], [/(playbook);[-\w\),; ]+(rim)/i], [p, y, [g, _]], [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i], [p, [y, C], [g, v]], [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i], [p, [y, P], [g, _]], [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i], [p, [y, P], [g, v]], [/(nexus 9)/i], [p, [y, "HTC"], [g, _]], [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i], [y, [p, /_/g, " "], [g, v]], [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i], [p, [y, "Acer"], [g, _]], [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i], [p, [y, "Meizu"], [g, v]], [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i, /(hp) ([\w ]+\w)/i, /(asus)-?(\w+)/i, /(microsoft); (lumia[\w ]+)/i, /(lenovo)[-_ ]?([-\w]+)/i, /(jolla)/i, /(oppo) ?([\w ]+) bui/i], [y, p, [g, v]], [/(kobo)\s(ereader|touch)/i, /(archos) (gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /(nook)[\w ]+build\/(\w+)/i, /(dell) (strea[kpr\d ]*[\dko])/i, /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, /(trinity)[- ]*(t\d{3}) bui/i, /(gigaset)[- ]+(q\w{1,9}) bui/i, /(vodafone) ([\w ]+)(?:\)| bui)/i], [y, p, [g, _]], [/(surface duo)/i], [p, [y, j], [g, _]], [/droid [\d\.]+; (fp\du?)(?: b|\))/i], [p, [y, "Fairphone"], [g, v]], [/(u304aa)/i], [p, [y, "AT&T"], [g, v]], [/\bsie-(\w*)/i], [p, [y, "Siemens"], [g, v]], [/\b(rct\w+) b/i], [p, [y, "RCA"], [g, _]], [/\b(venue[\d ]{2,7}) b/i], [p, [y, "Dell"], [g, _]], [/\b(q(?:mv|ta)\w+) b/i], [p, [y, "Verizon"], [g, _]], [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i], [p, [y, "Barnes & Noble"], [g, _]], [/\b(tm\d{3}\w+) b/i], [p, [y, "NuVision"], [g, _]], [/\b(k88) b/i], [p, [y, "ZTE"], [g, _]], [/\b(nx\d{3}j) b/i], [p, [y, "ZTE"], [g, v]], [/\b(gen\d{3}) b.+49h/i], [p, [y, "Swiss"], [g, v]], [/\b(zur\d{3}) b/i], [p, [y, "Swiss"], [g, _]], [/\b((zeki)?tb.*\b) b/i], [p, [y, "Zeki"], [g, _]], [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i], [[y, "Dragon Touch"], p, [g, _]], [/\b(ns-?\w{0,9}) b/i], [p, [y, "Insignia"], [g, _]], [/\b((nxa|next)-?\w{0,9}) b/i], [p, [y, "NextBook"], [g, _]], [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i], [[y, "Voice"], p, [g, v]], [/\b(lvtel\-)?(v1[12]) b/i], [[y, "LvTel"], p, [g, v]], [/\b(ph-1) /i], [p, [y, "Essential"], [g, v]], [/\b(v(100md|700na|7011|917g).*\b) b/i], [p, [y, "Envizen"], [g, _]], [/\b(trio[-\w\. ]+) b/i], [p, [y, "MachSpeed"], [g, _]], [/\btu_(1491) b/i], [p, [y, "Rotor"], [g, _]], [/(shield[\w ]+) b/i], [p, [y, "Nvidia"], [g, _]], [/(sprint) (\w+)/i], [y, p, [g, v]], [/(kin\.[onetw]{3})/i], [[p, /\./g, " "], [y, j], [g, v]], [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i], [p, [y, K], [g, _]], [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i], [p, [y, K], [g, v]], [/smart-tv.+(samsung)/i], [y, [g, S]], [/hbbtv.+maple;(\d+)/i], [[p, /^/, "SmartTV"], [y, $], [g, S]], [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i], [[y, "LG"], [g, S]], [/(apple) ?tv/i], [y, [p, A + " TV"], [g, S]], [/crkey/i], [[p, R + "cast"], [y, I], [g, S]], [/droid.+aft(\w)( bui|\))/i], [p, [y, T], [g, S]], [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i], [p, [y, L], [g, S]], [/(bravia[\w ]+)( bui|\))/i], [p, [y, M], [g, S]], [/(mitv-\w{5}) bui/i], [p, [y, H], [g, S]], [/Hbbtv.*(technisat) (.*);/i], [y, p, [g, S]], [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i], [[y, G], [p, G], [g, S]], [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i], [[g, S]], [/(ouya)/i, /(nintendo) ([wids3utch]+)/i], [y, p, [g, b]], [/droid.+; (shield) bui/i], [p, [y, "Nvidia"], [g, b]], [/(playstation [345portablevi]+)/i], [p, [y, M], [g, b]], [/\b(xbox(?: one)?(?!; xbox))[\); ]/i], [p, [y, j], [g, b]], [/((pebble))app/i], [y, p, [g, E]], [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i], [p, [y, A], [g, E]], [/droid.+; (glass) \d/i], [p, [y, I], [g, E]], [/droid.+; (wt63?0{2,3})\)/i], [p, [y, K], [g, E]], [/(quest( 2| pro)?)/i], [p, [y, W], [g, E]], [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i], [y, [g, k]], [/(aeobc)\b/i], [p, [y, T], [g, k]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i], [p, [g, v]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i], [p, [g, _]], [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i], [[g, _]], [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i], [[g, v]], [/(android[-\w\. ]{0,9});.+buil/i], [p, [y, "Generic"]]], engine: [[/windows.+ edge\/([\w\.]+)/i], [m, [f, "EdgeHTML"]], [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i], [m, [f, "Blink"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, /(icab)[\/ ]([23]\.[\d\.]+)/i, /\b(libweb)/i], [f, m], [/rv\:([\w\.]{1,9})\b.+(gecko)/i], [m, f]], os: [[/microsoft (windows) (vista|xp)/i], [f, m], [/(windows) nt 6\.2; (arm)/i, /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i, /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i], [f, [m, X, Q]], [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i], [[f, "Windows"], [m, X, Q]], [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /ios;fbsv\/([\d\.]+)/i, /cfnetwork\/.+darwin/i], [[m, /_/g, "."], [f, "iOS"]], [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i], [[f, q], [m, /_/g, "."]], [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i], [m, f], [/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/ ]([\w\.]+)/i, /\((series40);/i], [f, m], [/\(bb(10);/i], [m, [f, C]], [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i], [m, [f, "Symbian"]], [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i], [m, [f, x + " OS"]], [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i], [m, [f, "webOS"]], [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i], [m, [f, "watchOS"]], [/crkey\/([\d\.]+)/i], [m, [f, R + "cast"]], [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i], [[f, B], m], [/panasonic;(viera)/i, /(netrange)mmh/i, /(nettv)\/(\d+\.[\w\.]+)/i, /(nintendo|playstation) ([wids345portablevuch]+)/i, /(xbox); +xbox ([^\);]+)/i, /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, /(mint)[\/\(\) ]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, /(hurd|linux) ?([\w\.]*)/i, /(gnu) ?([\w\.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku) (\w+)/i], [f, m], [/(sunos) ?([\w\.\d]*)/i], [[f, "Solaris"], m], [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i, /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i, /(unix) ?([\w\.]*)/i], [f, m]] }, ee = function(e2, t2) {
              if (typeof e2 === u && (t2 = e2, e2 = o2), !(this instanceof ee)) return new ee(e2, t2).getResult();
              var r2 = typeof a2 !== l && a2.navigator ? a2.navigator : o2, n2 = e2 || (r2 && r2.userAgent ? r2.userAgent : ""), s3 = r2 && r2.userAgentData ? r2.userAgentData : o2, i3 = t2 ? J(Z, t2) : Z, b2 = r2 && r2.userAgent == n2;
              return this.getBrowser = function() {
                var e3, t3 = {};
                return t3[f] = o2, t3[m] = o2, Y.call(t3, n2, i3.browser), t3[d] = typeof (e3 = t3[m]) === h ? e3.replace(/[^\d\.]/g, "").split(".")[0] : o2, b2 && r2 && r2.brave && typeof r2.brave.isBrave == c && (t3[f] = "Brave"), t3;
              }, this.getCPU = function() {
                var e3 = {};
                return e3[w] = o2, Y.call(e3, n2, i3.cpu), e3;
              }, this.getDevice = function() {
                var e3 = {};
                return e3[y] = o2, e3[p] = o2, e3[g] = o2, Y.call(e3, n2, i3.device), b2 && !e3[g] && s3 && s3.mobile && (e3[g] = v), b2 && "Macintosh" == e3[p] && r2 && typeof r2.standalone !== l && r2.maxTouchPoints && r2.maxTouchPoints > 2 && (e3[p] = "iPad", e3[g] = _), e3;
              }, this.getEngine = function() {
                var e3 = {};
                return e3[f] = o2, e3[m] = o2, Y.call(e3, n2, i3.engine), e3;
              }, this.getOS = function() {
                var e3 = {};
                return e3[f] = o2, e3[m] = o2, Y.call(e3, n2, i3.os), b2 && !e3[f] && s3 && "Unknown" != s3.platform && (e3[f] = s3.platform.replace(/chrome os/i, B).replace(/macos/i, q)), e3;
              }, this.getResult = function() {
                return { ua: this.getUA(), browser: this.getBrowser(), engine: this.getEngine(), os: this.getOS(), device: this.getDevice(), cpu: this.getCPU() };
              }, this.getUA = function() {
                return n2;
              }, this.setUA = function(e3) {
                return n2 = typeof e3 === h && e3.length > 350 ? G(e3, 350) : e3, this;
              }, this.setUA(n2), this;
            };
            ee.VERSION = "1.0.35", ee.BROWSER = z([f, m, d]), ee.CPU = z([w]), ee.DEVICE = z([p, y, g, b, v, S, _, E, k]), ee.ENGINE = ee.OS = z([f, m]), typeof i2 !== l ? (s2.exports && (i2 = s2.exports = ee), i2.UAParser = ee) : r.amdO ? void 0 !== (n = function() {
              return ee;
            }.call(t, r, t, e)) && (e.exports = n) : typeof a2 !== l && (a2.UAParser = ee);
            var et = typeof a2 !== l && (a2.jQuery || a2.Zepto);
            if (et && !et.ua) {
              var er = new ee();
              et.ua = er.getResult(), et.ua.get = function() {
                return er.getUA();
              }, et.ua.set = function(e2) {
                er.setUA(e2);
                var t2 = er.getResult();
                for (var r2 in t2) et.ua[r2] = t2[r2];
              };
            }
          }("object" == typeof window ? window : this);
        } }, i = {};
        function a(e2) {
          var t2 = i[e2];
          if (void 0 !== t2) return t2.exports;
          var r2 = i[e2] = { exports: {} }, n2 = true;
          try {
            s[e2].call(r2.exports, r2, r2.exports, a), n2 = false;
          } finally {
            n2 && delete i[e2];
          }
          return r2.exports;
        }
        a.ab = "//";
        var o = a(226);
        e.exports = o;
      })();
    }, 61: (e, t, r) => {
      "use strict";
      r.d(t, { redirect: () => a });
      let n = (0, r(58).xl)();
      var s = r(722), i = r(64);
      function a(e2, t2) {
        let r2 = n.getStore();
        throw function(e3, t3, r3) {
          void 0 === r3 && (r3 = s.Q.TemporaryRedirect);
          let n2 = Error(i.oJ);
          return n2.digest = i.oJ + ";" + t3 + ";" + e3 + ";" + r3 + ";", n2;
        }(e2, t2 || ((null == r2 ? void 0 : r2.isAction) ? i.zB.push : i.zB.replace), s.Q.TemporaryRedirect);
      }
      var o = r(418);
      o.s8, o.s8, o.s8, r(23), r(264), r(108), Symbol.for("react.postpone");
    }, 23: (e, t, r) => {
      "use strict";
      r.d(t, { F: () => n });
      class n extends Error {
        constructor(e2) {
          super("Dynamic server usage: " + e2), this.description = e2, this.digest = "DYNAMIC_SERVER_USAGE";
        }
      }
    }, 418: (e, t, r) => {
      "use strict";
      r.d(t, { s8: () => n }), Object.values({ NOT_FOUND: 404, FORBIDDEN: 403, UNAUTHORIZED: 401 });
      let n = "NEXT_HTTP_ERROR_FALLBACK";
    }, 264: (e, t, r) => {
      "use strict";
      r(418), r(64);
    }, 64: (e, t, r) => {
      "use strict";
      r.d(t, { oJ: () => n, zB: () => s }), r(722);
      let n = "NEXT_REDIRECT";
      var s = function(e2) {
        return e2.push = "push", e2.replace = "replace", e2;
      }({});
    }, 722: (e, t, r) => {
      "use strict";
      r.d(t, { Q: () => n });
      var n = function(e2) {
        return e2[e2.SeeOther = 303] = "SeeOther", e2[e2.TemporaryRedirect = 307] = "TemporaryRedirect", e2[e2.PermanentRedirect = 308] = "PermanentRedirect", e2;
      }({});
    }, 923: (e, t, r) => {
      "use strict";
      r.d(t, { f: () => n });
      class n extends Error {
        constructor(...e2) {
          super(...e2), this.code = "NEXT_STATIC_GEN_BAILOUT";
        }
      }
    }, 108: (e, t, r) => {
      "use strict";
      r.d(t, { t3: () => c, Ui: () => l, xI: () => a, Pk: () => o });
      var n = r(886), s = r(23);
      r(923), r(553), r(590);
      let i = "function" == typeof n.unstable_postpone;
      function a(e2, t2, r2) {
        let n2 = new s.F(`Route ${t2.route} couldn't be rendered statically because it used \`${e2}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`);
        throw r2.revalidate = 0, t2.dynamicUsageDescription = e2, t2.dynamicUsageStack = n2.stack, n2;
      }
      function o(e2, t2) {
        t2 && "cache" !== t2.type && "unstable-cache" !== t2.type && ("prerender" === t2.type || "prerender-legacy" === t2.type) && (t2.revalidate = 0);
      }
      function c(e2, t2, r2, n2) {
        let s2 = n2.dynamicTracking;
        throw s2 && null === s2.syncDynamicErrorWithStack && (s2.syncDynamicExpression = t2, s2.syncDynamicErrorWithStack = r2, true === n2.validating && (s2.syncDynamicLogged = true)), function(e3, t3, r3) {
          let n3 = h(`Route ${e3} needs to bail out of prerendering at this point because it used ${t3}.`);
          r3.controller.abort(n3);
          let s3 = r3.dynamicTracking;
          s3 && s3.dynamicAccesses.push({ stack: s3.isDebugDynamicAccesses ? Error().stack : void 0, expression: t3 });
        }(e2, t2, n2), h(`Route ${e2} needs to bail out of prerendering at this point because it used ${t2}.`);
      }
      function l(e2, t2, r2) {
        (function() {
          if (!i) throw Error("Invariant: React.unstable_postpone is not defined. This suggests the wrong version of React was loaded. This is a bug in Next.js");
        })(), r2 && r2.dynamicAccesses.push({ stack: r2.isDebugDynamicAccesses ? Error().stack : void 0, expression: t2 }), n.unstable_postpone(u(e2, t2));
      }
      function u(e2, t2) {
        return `Route ${e2} needs to bail out of prerendering at this point because it used ${t2}. React throws this special object to indicate where. It should not be caught by your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error`;
      }
      if (false === function(e2) {
        return e2.includes("needs to bail out of prerendering at this point because it used") && e2.includes("Learn more: https://nextjs.org/docs/messages/ppr-caught-error");
      }(u("%%%", "^^^"))) throw Error("Invariant: isDynamicPostpone misidentified a postpone reason. This is a bug in Next.js");
      function h(e2) {
        let t2 = Error(e2);
        return t2.digest = "NEXT_PRERENDER_INTERRUPTED", t2;
      }
      RegExp(`\\n\\s+at __next_metadata_boundary__[\\n\\s]`), RegExp(`\\n\\s+at __next_viewport_boundary__[\\n\\s]`), RegExp(`\\n\\s+at __next_outlet_boundary__[\\n\\s]`);
    }, 152: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), function(e2, t2) {
        for (var r2 in t2) Object.defineProperty(e2, r2, { enumerable: true, get: t2[r2] });
      }(t, { getTestReqInfo: function() {
        return a;
      }, withRequest: function() {
        return i;
      } });
      let n = new (r(521)).AsyncLocalStorage();
      function s(e2, t2) {
        let r2 = t2.header(e2, "next-test-proxy-port");
        if (r2) return { url: t2.url(e2), proxyPort: Number(r2), testData: t2.header(e2, "next-test-data") || "" };
      }
      function i(e2, t2, r2) {
        let i2 = s(e2, t2);
        return i2 ? n.run(i2, r2) : r2();
      }
      function a(e2, t2) {
        return n.getStore() || (e2 && t2 ? s(e2, t2) : void 0);
      }
    }, 53: (e, t, r) => {
      "use strict";
      var n = r(356).Buffer;
      Object.defineProperty(t, "__esModule", { value: true }), function(e2, t2) {
        for (var r2 in t2) Object.defineProperty(e2, r2, { enumerable: true, get: t2[r2] });
      }(t, { handleFetch: function() {
        return o;
      }, interceptFetch: function() {
        return c;
      }, reader: function() {
        return i;
      } });
      let s = r(152), i = { url: (e2) => e2.url, header: (e2, t2) => e2.headers.get(t2) };
      async function a(e2, t2) {
        let { url: r2, method: s2, headers: i2, body: a2, cache: o2, credentials: c2, integrity: l, mode: u, redirect: h, referrer: d, referrerPolicy: p } = t2;
        return { testData: e2, api: "fetch", request: { url: r2, method: s2, headers: [...Array.from(i2), ["next-test-stack", function() {
          let e3 = (Error().stack ?? "").split("\n");
          for (let t3 = 1; t3 < e3.length; t3++) if (e3[t3].length > 0) {
            e3 = e3.slice(t3);
            break;
          }
          return (e3 = (e3 = (e3 = e3.filter((e4) => !e4.includes("/next/dist/"))).slice(0, 5)).map((e4) => e4.replace("webpack-internal:///(rsc)/", "").trim())).join("    ");
        }()]], body: a2 ? n.from(await t2.arrayBuffer()).toString("base64") : null, cache: o2, credentials: c2, integrity: l, mode: u, redirect: h, referrer: d, referrerPolicy: p } };
      }
      async function o(e2, t2) {
        let r2 = (0, s.getTestReqInfo)(t2, i);
        if (!r2) return e2(t2);
        let { testData: o2, proxyPort: c2 } = r2, l = await a(o2, t2), u = await e2(`http://localhost:${c2}`, { method: "POST", body: JSON.stringify(l), next: { internal: true } });
        if (!u.ok) throw Error(`Proxy request failed: ${u.status}`);
        let h = await u.json(), { api: d } = h;
        switch (d) {
          case "continue":
            return e2(t2);
          case "abort":
          case "unhandled":
            throw Error(`Proxy request aborted [${t2.method} ${t2.url}]`);
        }
        return function(e3) {
          let { status: t3, headers: r3, body: s2 } = e3.response;
          return new Response(s2 ? n.from(s2, "base64") : null, { status: t3, headers: new Headers(r3) });
        }(h);
      }
      function c(e2) {
        return r.g.fetch = function(t2, r2) {
          var n2;
          return (null == r2 ? void 0 : null == (n2 = r2.next) ? void 0 : n2.internal) ? e2(t2, r2) : o(e2, new Request(t2, r2));
        }, () => {
          r.g.fetch = e2;
        };
      }
    }, 384: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), function(e2, t2) {
        for (var r2 in t2) Object.defineProperty(e2, r2, { enumerable: true, get: t2[r2] });
      }(t, { interceptTestApis: function() {
        return i;
      }, wrapRequestHandler: function() {
        return a;
      } });
      let n = r(152), s = r(53);
      function i() {
        return (0, s.interceptFetch)(r.g.fetch);
      }
      function a(e2) {
        return (t2, r2) => (0, n.withRequest)(t2, s.reader, () => e2(t2, r2));
      }
    }, 590: (e, t, r) => {
      "use strict";
      r.d(t, { J: () => n });
      let n = (0, r(58).xl)();
    }, 553: (e, t, r) => {
      "use strict";
      r.d(t, { XN: () => s, FP: () => n });
      let n = (0, r(58).xl)();
      function s(e2) {
        let t2 = n.getStore();
        if (t2) {
          if ("request" === t2.type) return t2;
          if ("prerender" === t2.type || "prerender-ppr" === t2.type || "prerender-legacy" === t2.type) throw Error(`\`${e2}\` cannot be called inside a prerender. This is a bug in Next.js.`);
          if ("cache" === t2.type) throw Error(`\`${e2}\` cannot be called inside "use cache". Call it outside and pass an argument instead. Read more: https://nextjs.org/docs/messages/next-request-in-use-cache`);
          if ("unstable-cache" === t2.type) throw Error(`\`${e2}\` cannot be called inside unstable_cache. Call it outside and pass an argument instead. Read more: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`);
        }
        throw Error(`\`${e2}\` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context`);
      }
    }, 815: (e, t, r) => {
      "use strict";
      let n, s, i, a, o, c, l, u, h, d, p, f;
      r.r(t), r.d(t, { default: () => uL });
      var g, y, m, w, b, v, _, S, E, k, T, A, P, C, O, R, x, I, N, j, D, U, $, L, M, H = {};
      async function K() {
        return "_ENTRIES" in globalThis && _ENTRIES.middleware_instrumentation && await _ENTRIES.middleware_instrumentation;
      }
      r.r(H), r.d(H, { config: () => uj, middleware: () => uN });
      let W = null;
      async function B() {
        if ("phase-production-build" === process.env.NEXT_PHASE) return;
        W || (W = K());
        let e10 = await W;
        if (null == e10 ? void 0 : e10.register) try {
          await e10.register();
        } catch (e11) {
          throw e11.message = `An error occurred while loading instrumentation hook: ${e11.message}`, e11;
        }
      }
      async function q(...e10) {
        let t10 = await K();
        try {
          var r10;
          await (null == t10 ? void 0 : null == (r10 = t10.onRequestError) ? void 0 : r10.call(t10, ...e10));
        } catch (e11) {
          console.error("Error in instrumentation.onRequestError:", e11);
        }
      }
      let J = null;
      function z() {
        return J || (J = B()), J;
      }
      function V(e10) {
        return `The edge runtime does not support Node.js '${e10}' module.
Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime`;
      }
      process !== r.g.process && (process.env = r.g.process.env, r.g.process = process), Object.defineProperty(globalThis, "__import_unsupported", { value: function(e10) {
        let t10 = new Proxy(function() {
        }, { get(t11, r10) {
          if ("then" === r10) return {};
          throw Error(V(e10));
        }, construct() {
          throw Error(V(e10));
        }, apply(r10, n10, s10) {
          if ("function" == typeof s10[0]) return s10[0](t10);
          throw Error(V(e10));
        } });
        return new Proxy({}, { get: () => t10 });
      }, enumerable: false, configurable: false }), z();
      class F extends Error {
        constructor({ page: e10 }) {
          super(`The middleware "${e10}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `);
        }
      }
      class G extends Error {
        constructor() {
          super(`The request.page has been deprecated in favour of \`URLPattern\`.
  Read more: https://nextjs.org/docs/messages/middleware-request-page
  `);
        }
      }
      class Y extends Error {
        constructor() {
          super(`The request.ua has been removed in favour of \`userAgent\` function.
  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
  `);
        }
      }
      let X = { shared: "shared", reactServerComponents: "rsc", serverSideRendering: "ssr", actionBrowser: "action-browser", api: "api", middleware: "middleware", instrument: "instrument", edgeAsset: "edge-asset", appPagesBrowser: "app-pages-browser" };
      function Q(e10) {
        var t10, r10, n10, s10, i10, a10 = [], o10 = 0;
        function c10() {
          for (; o10 < e10.length && /\s/.test(e10.charAt(o10)); ) o10 += 1;
          return o10 < e10.length;
        }
        for (; o10 < e10.length; ) {
          for (t10 = o10, i10 = false; c10(); ) if ("," === (r10 = e10.charAt(o10))) {
            for (n10 = o10, o10 += 1, c10(), s10 = o10; o10 < e10.length && "=" !== (r10 = e10.charAt(o10)) && ";" !== r10 && "," !== r10; ) o10 += 1;
            o10 < e10.length && "=" === e10.charAt(o10) ? (i10 = true, o10 = s10, a10.push(e10.substring(t10, n10)), t10 = o10) : o10 = n10 + 1;
          } else o10 += 1;
          (!i10 || o10 >= e10.length) && a10.push(e10.substring(t10, e10.length));
        }
        return a10;
      }
      function Z(e10) {
        let t10 = {}, r10 = [];
        if (e10) for (let [n10, s10] of e10.entries()) "set-cookie" === n10.toLowerCase() ? (r10.push(...Q(s10)), t10[n10] = 1 === r10.length ? r10[0] : r10) : t10[n10] = s10;
        return t10;
      }
      function ee(e10) {
        try {
          return String(new URL(String(e10)));
        } catch (t10) {
          throw Error(`URL is malformed "${String(e10)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`, { cause: t10 });
        }
      }
      ({ ...X, GROUP: { builtinReact: [X.reactServerComponents, X.actionBrowser], serverOnly: [X.reactServerComponents, X.actionBrowser, X.instrument, X.middleware], neutralTarget: [X.api], clientOnly: [X.serverSideRendering, X.appPagesBrowser], bundled: [X.reactServerComponents, X.actionBrowser, X.serverSideRendering, X.appPagesBrowser, X.shared, X.instrument], appPages: [X.reactServerComponents, X.serverSideRendering, X.appPagesBrowser, X.actionBrowser] } });
      let et = Symbol("response"), er = Symbol("passThrough"), en = Symbol("waitUntil");
      class es {
        constructor(e10, t10) {
          this[er] = false, this[en] = t10 ? { kind: "external", function: t10 } : { kind: "internal", promises: [] };
        }
        respondWith(e10) {
          this[et] || (this[et] = Promise.resolve(e10));
        }
        passThroughOnException() {
          this[er] = true;
        }
        waitUntil(e10) {
          if ("external" === this[en].kind) return (0, this[en].function)(e10);
          this[en].promises.push(e10);
        }
      }
      class ei extends es {
        constructor(e10) {
          var t10;
          super(e10.request, null == (t10 = e10.context) ? void 0 : t10.waitUntil), this.sourcePage = e10.page;
        }
        get request() {
          throw new F({ page: this.sourcePage });
        }
        respondWith() {
          throw new F({ page: this.sourcePage });
        }
      }
      function ea(e10) {
        return e10.replace(/\/$/, "") || "/";
      }
      function eo(e10) {
        let t10 = e10.indexOf("#"), r10 = e10.indexOf("?"), n10 = r10 > -1 && (t10 < 0 || r10 < t10);
        return n10 || t10 > -1 ? { pathname: e10.substring(0, n10 ? r10 : t10), query: n10 ? e10.substring(r10, t10 > -1 ? t10 : void 0) : "", hash: t10 > -1 ? e10.slice(t10) : "" } : { pathname: e10, query: "", hash: "" };
      }
      function ec(e10, t10) {
        if (!e10.startsWith("/") || !t10) return e10;
        let { pathname: r10, query: n10, hash: s10 } = eo(e10);
        return "" + t10 + r10 + n10 + s10;
      }
      function el(e10, t10) {
        if (!e10.startsWith("/") || !t10) return e10;
        let { pathname: r10, query: n10, hash: s10 } = eo(e10);
        return "" + r10 + t10 + n10 + s10;
      }
      function eu(e10, t10) {
        if ("string" != typeof e10) return false;
        let { pathname: r10 } = eo(e10);
        return r10 === t10 || r10.startsWith(t10 + "/");
      }
      function eh(e10, t10) {
        let r10;
        let n10 = e10.split("/");
        return (t10 || []).some((t11) => !!n10[1] && n10[1].toLowerCase() === t11.toLowerCase() && (r10 = t11, n10.splice(1, 1), e10 = n10.join("/") || "/", true)), { pathname: e10, detectedLocale: r10 };
      }
      let ed = /(?!^https?:\/\/)(127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)/;
      function ep(e10, t10) {
        return new URL(String(e10).replace(ed, "localhost"), t10 && String(t10).replace(ed, "localhost"));
      }
      let ef = Symbol("NextURLInternal");
      class eg {
        constructor(e10, t10, r10) {
          let n10, s10;
          "object" == typeof t10 && "pathname" in t10 || "string" == typeof t10 ? (n10 = t10, s10 = r10 || {}) : s10 = r10 || t10 || {}, this[ef] = { url: ep(e10, n10 ?? s10.base), options: s10, basePath: "" }, this.analyze();
        }
        analyze() {
          var e10, t10, r10, n10, s10;
          let i10 = function(e11, t11) {
            var r11, n11;
            let { basePath: s11, i18n: i11, trailingSlash: a11 } = null != (r11 = t11.nextConfig) ? r11 : {}, o11 = { pathname: e11, trailingSlash: "/" !== e11 ? e11.endsWith("/") : a11 };
            s11 && eu(o11.pathname, s11) && (o11.pathname = function(e12, t12) {
              if (!eu(e12, t12)) return e12;
              let r12 = e12.slice(t12.length);
              return r12.startsWith("/") ? r12 : "/" + r12;
            }(o11.pathname, s11), o11.basePath = s11);
            let c10 = o11.pathname;
            if (o11.pathname.startsWith("/_next/data/") && o11.pathname.endsWith(".json")) {
              let e12 = o11.pathname.replace(/^\/_next\/data\//, "").replace(/\.json$/, "").split("/"), r12 = e12[0];
              o11.buildId = r12, c10 = "index" !== e12[1] ? "/" + e12.slice(1).join("/") : "/", true === t11.parseData && (o11.pathname = c10);
            }
            if (i11) {
              let e12 = t11.i18nProvider ? t11.i18nProvider.analyze(o11.pathname) : eh(o11.pathname, i11.locales);
              o11.locale = e12.detectedLocale, o11.pathname = null != (n11 = e12.pathname) ? n11 : o11.pathname, !e12.detectedLocale && o11.buildId && (e12 = t11.i18nProvider ? t11.i18nProvider.analyze(c10) : eh(c10, i11.locales)).detectedLocale && (o11.locale = e12.detectedLocale);
            }
            return o11;
          }(this[ef].url.pathname, { nextConfig: this[ef].options.nextConfig, parseData: true, i18nProvider: this[ef].options.i18nProvider }), a10 = function(e11, t11) {
            let r11;
            if ((null == t11 ? void 0 : t11.host) && !Array.isArray(t11.host)) r11 = t11.host.toString().split(":", 1)[0];
            else {
              if (!e11.hostname) return;
              r11 = e11.hostname;
            }
            return r11.toLowerCase();
          }(this[ef].url, this[ef].options.headers);
          this[ef].domainLocale = this[ef].options.i18nProvider ? this[ef].options.i18nProvider.detectDomainLocale(a10) : function(e11, t11, r11) {
            if (e11) for (let i11 of (r11 && (r11 = r11.toLowerCase()), e11)) {
              var n11, s11;
              if (t11 === (null == (n11 = i11.domain) ? void 0 : n11.split(":", 1)[0].toLowerCase()) || r11 === i11.defaultLocale.toLowerCase() || (null == (s11 = i11.locales) ? void 0 : s11.some((e12) => e12.toLowerCase() === r11))) return i11;
            }
          }(null == (t10 = this[ef].options.nextConfig) ? void 0 : null == (e10 = t10.i18n) ? void 0 : e10.domains, a10);
          let o10 = (null == (r10 = this[ef].domainLocale) ? void 0 : r10.defaultLocale) || (null == (s10 = this[ef].options.nextConfig) ? void 0 : null == (n10 = s10.i18n) ? void 0 : n10.defaultLocale);
          this[ef].url.pathname = i10.pathname, this[ef].defaultLocale = o10, this[ef].basePath = i10.basePath ?? "", this[ef].buildId = i10.buildId, this[ef].locale = i10.locale ?? o10, this[ef].trailingSlash = i10.trailingSlash;
        }
        formatPathname() {
          var e10;
          let t10;
          return t10 = function(e11, t11, r10, n10) {
            if (!t11 || t11 === r10) return e11;
            let s10 = e11.toLowerCase();
            return !n10 && (eu(s10, "/api") || eu(s10, "/" + t11.toLowerCase())) ? e11 : ec(e11, "/" + t11);
          }((e10 = { basePath: this[ef].basePath, buildId: this[ef].buildId, defaultLocale: this[ef].options.forceLocale ? void 0 : this[ef].defaultLocale, locale: this[ef].locale, pathname: this[ef].url.pathname, trailingSlash: this[ef].trailingSlash }).pathname, e10.locale, e10.buildId ? void 0 : e10.defaultLocale, e10.ignorePrefix), (e10.buildId || !e10.trailingSlash) && (t10 = ea(t10)), e10.buildId && (t10 = el(ec(t10, "/_next/data/" + e10.buildId), "/" === e10.pathname ? "index.json" : ".json")), t10 = ec(t10, e10.basePath), !e10.buildId && e10.trailingSlash ? t10.endsWith("/") ? t10 : el(t10, "/") : ea(t10);
        }
        formatSearch() {
          return this[ef].url.search;
        }
        get buildId() {
          return this[ef].buildId;
        }
        set buildId(e10) {
          this[ef].buildId = e10;
        }
        get locale() {
          return this[ef].locale ?? "";
        }
        set locale(e10) {
          var t10, r10;
          if (!this[ef].locale || !(null == (r10 = this[ef].options.nextConfig) ? void 0 : null == (t10 = r10.i18n) ? void 0 : t10.locales.includes(e10))) throw TypeError(`The NextURL configuration includes no locale "${e10}"`);
          this[ef].locale = e10;
        }
        get defaultLocale() {
          return this[ef].defaultLocale;
        }
        get domainLocale() {
          return this[ef].domainLocale;
        }
        get searchParams() {
          return this[ef].url.searchParams;
        }
        get host() {
          return this[ef].url.host;
        }
        set host(e10) {
          this[ef].url.host = e10;
        }
        get hostname() {
          return this[ef].url.hostname;
        }
        set hostname(e10) {
          this[ef].url.hostname = e10;
        }
        get port() {
          return this[ef].url.port;
        }
        set port(e10) {
          this[ef].url.port = e10;
        }
        get protocol() {
          return this[ef].url.protocol;
        }
        set protocol(e10) {
          this[ef].url.protocol = e10;
        }
        get href() {
          let e10 = this.formatPathname(), t10 = this.formatSearch();
          return `${this.protocol}//${this.host}${e10}${t10}${this.hash}`;
        }
        set href(e10) {
          this[ef].url = ep(e10), this.analyze();
        }
        get origin() {
          return this[ef].url.origin;
        }
        get pathname() {
          return this[ef].url.pathname;
        }
        set pathname(e10) {
          this[ef].url.pathname = e10;
        }
        get hash() {
          return this[ef].url.hash;
        }
        set hash(e10) {
          this[ef].url.hash = e10;
        }
        get search() {
          return this[ef].url.search;
        }
        set search(e10) {
          this[ef].url.search = e10;
        }
        get password() {
          return this[ef].url.password;
        }
        set password(e10) {
          this[ef].url.password = e10;
        }
        get username() {
          return this[ef].url.username;
        }
        set username(e10) {
          this[ef].url.username = e10;
        }
        get basePath() {
          return this[ef].basePath;
        }
        set basePath(e10) {
          this[ef].basePath = e10.startsWith("/") ? e10 : `/${e10}`;
        }
        toString() {
          return this.href;
        }
        toJSON() {
          return this.href;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { href: this.href, origin: this.origin, protocol: this.protocol, username: this.username, password: this.password, host: this.host, hostname: this.hostname, port: this.port, pathname: this.pathname, search: this.search, searchParams: this.searchParams, hash: this.hash };
        }
        clone() {
          return new eg(String(this), this[ef].options);
        }
      }
      var ey = r(555);
      let em = Symbol("internal request");
      class ew extends Request {
        constructor(e10, t10 = {}) {
          let r10 = "string" != typeof e10 && "url" in e10 ? e10.url : String(e10);
          ee(r10), e10 instanceof Request ? super(e10, t10) : super(r10, t10);
          let n10 = new eg(r10, { headers: Z(this.headers), nextConfig: t10.nextConfig });
          this[em] = { cookies: new ey.RequestCookies(this.headers), nextUrl: n10, url: n10.toString() };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, nextUrl: this.nextUrl, url: this.url, bodyUsed: this.bodyUsed, cache: this.cache, credentials: this.credentials, destination: this.destination, headers: Object.fromEntries(this.headers), integrity: this.integrity, keepalive: this.keepalive, method: this.method, mode: this.mode, redirect: this.redirect, referrer: this.referrer, referrerPolicy: this.referrerPolicy, signal: this.signal };
        }
        get cookies() {
          return this[em].cookies;
        }
        get nextUrl() {
          return this[em].nextUrl;
        }
        get page() {
          throw new G();
        }
        get ua() {
          throw new Y();
        }
        get url() {
          return this[em].url;
        }
      }
      class eb {
        static get(e10, t10, r10) {
          let n10 = Reflect.get(e10, t10, r10);
          return "function" == typeof n10 ? n10.bind(e10) : n10;
        }
        static set(e10, t10, r10, n10) {
          return Reflect.set(e10, t10, r10, n10);
        }
        static has(e10, t10) {
          return Reflect.has(e10, t10);
        }
        static deleteProperty(e10, t10) {
          return Reflect.deleteProperty(e10, t10);
        }
      }
      let ev = Symbol("internal response"), e_ = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
      function eS(e10, t10) {
        var r10;
        if (null == e10 ? void 0 : null == (r10 = e10.request) ? void 0 : r10.headers) {
          if (!(e10.request.headers instanceof Headers)) throw Error("request.headers must be an instance of Headers");
          let r11 = [];
          for (let [n10, s10] of e10.request.headers) t10.set("x-middleware-request-" + n10, s10), r11.push(n10);
          t10.set("x-middleware-override-headers", r11.join(","));
        }
      }
      class eE extends Response {
        constructor(e10, t10 = {}) {
          super(e10, t10);
          let r10 = this.headers, n10 = new Proxy(new ey.ResponseCookies(r10), { get(e11, n11, s10) {
            switch (n11) {
              case "delete":
              case "set":
                return (...s11) => {
                  let i10 = Reflect.apply(e11[n11], e11, s11), a10 = new Headers(r10);
                  return i10 instanceof ey.ResponseCookies && r10.set("x-middleware-set-cookie", i10.getAll().map((e12) => (0, ey.stringifyCookie)(e12)).join(",")), eS(t10, a10), i10;
                };
              default:
                return eb.get(e11, n11, s10);
            }
          } });
          this[ev] = { cookies: n10, url: t10.url ? new eg(t10.url, { headers: Z(r10), nextConfig: t10.nextConfig }) : void 0 };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, url: this.url, body: this.body, bodyUsed: this.bodyUsed, headers: Object.fromEntries(this.headers), ok: this.ok, redirected: this.redirected, status: this.status, statusText: this.statusText, type: this.type };
        }
        get cookies() {
          return this[ev].cookies;
        }
        static json(e10, t10) {
          let r10 = Response.json(e10, t10);
          return new eE(r10.body, r10);
        }
        static redirect(e10, t10) {
          let r10 = "number" == typeof t10 ? t10 : (null == t10 ? void 0 : t10.status) ?? 307;
          if (!e_.has(r10)) throw RangeError('Failed to execute "redirect" on "response": Invalid status code');
          let n10 = "object" == typeof t10 ? t10 : {}, s10 = new Headers(null == n10 ? void 0 : n10.headers);
          return s10.set("Location", ee(e10)), new eE(null, { ...n10, headers: s10, status: r10 });
        }
        static rewrite(e10, t10) {
          let r10 = new Headers(null == t10 ? void 0 : t10.headers);
          return r10.set("x-middleware-rewrite", ee(e10)), eS(t10, r10), new eE(null, { ...t10, headers: r10 });
        }
        static next(e10) {
          let t10 = new Headers(null == e10 ? void 0 : e10.headers);
          return t10.set("x-middleware-next", "1"), eS(e10, t10), new eE(null, { ...e10, headers: t10 });
        }
      }
      function ek(e10, t10) {
        let r10 = "string" == typeof t10 ? new URL(t10) : t10, n10 = new URL(e10, t10), s10 = r10.protocol + "//" + r10.host;
        return n10.protocol + "//" + n10.host === s10 ? n10.toString().replace(s10, "") : n10.toString();
      }
      let eT = "Next-Router-Prefetch", eA = ["RSC", "Next-Router-State-Tree", eT, "Next-HMR-Refresh", "Next-Router-Segment-Prefetch"], eP = ["__nextFallback", "__nextLocale", "__nextInferredLocaleFromDefault", "__nextDefaultLocale", "__nextIsNotFound", "_rsc"], eC = ["__nextDataReq"];
      class eO extends Error {
        constructor() {
          super("Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers");
        }
        static callable() {
          throw new eO();
        }
      }
      class eR extends Headers {
        constructor(e10) {
          super(), this.headers = new Proxy(e10, { get(t10, r10, n10) {
            if ("symbol" == typeof r10) return eb.get(t10, r10, n10);
            let s10 = r10.toLowerCase(), i10 = Object.keys(e10).find((e11) => e11.toLowerCase() === s10);
            if (void 0 !== i10) return eb.get(t10, i10, n10);
          }, set(t10, r10, n10, s10) {
            if ("symbol" == typeof r10) return eb.set(t10, r10, n10, s10);
            let i10 = r10.toLowerCase(), a10 = Object.keys(e10).find((e11) => e11.toLowerCase() === i10);
            return eb.set(t10, a10 ?? r10, n10, s10);
          }, has(t10, r10) {
            if ("symbol" == typeof r10) return eb.has(t10, r10);
            let n10 = r10.toLowerCase(), s10 = Object.keys(e10).find((e11) => e11.toLowerCase() === n10);
            return void 0 !== s10 && eb.has(t10, s10);
          }, deleteProperty(t10, r10) {
            if ("symbol" == typeof r10) return eb.deleteProperty(t10, r10);
            let n10 = r10.toLowerCase(), s10 = Object.keys(e10).find((e11) => e11.toLowerCase() === n10);
            return void 0 === s10 || eb.deleteProperty(t10, s10);
          } });
        }
        static seal(e10) {
          return new Proxy(e10, { get(e11, t10, r10) {
            switch (t10) {
              case "append":
              case "delete":
              case "set":
                return eO.callable;
              default:
                return eb.get(e11, t10, r10);
            }
          } });
        }
        merge(e10) {
          return Array.isArray(e10) ? e10.join(", ") : e10;
        }
        static from(e10) {
          return e10 instanceof Headers ? e10 : new eR(e10);
        }
        append(e10, t10) {
          let r10 = this.headers[e10];
          "string" == typeof r10 ? this.headers[e10] = [r10, t10] : Array.isArray(r10) ? r10.push(t10) : this.headers[e10] = t10;
        }
        delete(e10) {
          delete this.headers[e10];
        }
        get(e10) {
          let t10 = this.headers[e10];
          return void 0 !== t10 ? this.merge(t10) : null;
        }
        has(e10) {
          return void 0 !== this.headers[e10];
        }
        set(e10, t10) {
          this.headers[e10] = t10;
        }
        forEach(e10, t10) {
          for (let [r10, n10] of this.entries()) e10.call(t10, n10, r10, this);
        }
        *entries() {
          for (let e10 of Object.keys(this.headers)) {
            let t10 = e10.toLowerCase(), r10 = this.get(t10);
            yield [t10, r10];
          }
        }
        *keys() {
          for (let e10 of Object.keys(this.headers)) {
            let t10 = e10.toLowerCase();
            yield t10;
          }
        }
        *values() {
          for (let e10 of Object.keys(this.headers)) {
            let t10 = this.get(e10);
            yield t10;
          }
        }
        [Symbol.iterator]() {
          return this.entries();
        }
      }
      var ex = r(590), eI = r(553);
      class eN extends Error {
        constructor() {
          super("Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#options");
        }
        static callable() {
          throw new eN();
        }
      }
      class ej {
        static seal(e10) {
          return new Proxy(e10, { get(e11, t10, r10) {
            switch (t10) {
              case "clear":
              case "delete":
              case "set":
                return eN.callable;
              default:
                return eb.get(e11, t10, r10);
            }
          } });
        }
      }
      let eD = Symbol.for("next.mutated.cookies");
      class eU {
        static wrap(e10, t10) {
          let r10 = new ey.ResponseCookies(new Headers());
          for (let t11 of e10.getAll()) r10.set(t11);
          let n10 = [], s10 = /* @__PURE__ */ new Set(), i10 = () => {
            let e11 = ex.J.getStore();
            if (e11 && (e11.pathWasRevalidated = true), n10 = r10.getAll().filter((e12) => s10.has(e12.name)), t10) {
              let e12 = [];
              for (let t11 of n10) {
                let r11 = new ey.ResponseCookies(new Headers());
                r11.set(t11), e12.push(r11.toString());
              }
              t10(e12);
            }
          }, a10 = new Proxy(r10, { get(e11, t11, r11) {
            switch (t11) {
              case eD:
                return n10;
              case "delete":
                return function(...t12) {
                  s10.add("string" == typeof t12[0] ? t12[0] : t12[0].name);
                  try {
                    return e11.delete(...t12), a10;
                  } finally {
                    i10();
                  }
                };
              case "set":
                return function(...t12) {
                  s10.add("string" == typeof t12[0] ? t12[0] : t12[0].name);
                  try {
                    return e11.set(...t12), a10;
                  } finally {
                    i10();
                  }
                };
              default:
                return eb.get(e11, t11, r11);
            }
          } });
          return a10;
        }
      }
      function e$(e10) {
        return "action" === e10.phase;
      }
      function eL(e10) {
        if (!e$((0, eI.XN)(e10))) throw new eN();
      }
      var eM = function(e10) {
        return e10.handleRequest = "BaseServer.handleRequest", e10.run = "BaseServer.run", e10.pipe = "BaseServer.pipe", e10.getStaticHTML = "BaseServer.getStaticHTML", e10.render = "BaseServer.render", e10.renderToResponseWithComponents = "BaseServer.renderToResponseWithComponents", e10.renderToResponse = "BaseServer.renderToResponse", e10.renderToHTML = "BaseServer.renderToHTML", e10.renderError = "BaseServer.renderError", e10.renderErrorToResponse = "BaseServer.renderErrorToResponse", e10.renderErrorToHTML = "BaseServer.renderErrorToHTML", e10.render404 = "BaseServer.render404", e10;
      }(eM || {}), eH = function(e10) {
        return e10.loadDefaultErrorComponents = "LoadComponents.loadDefaultErrorComponents", e10.loadComponents = "LoadComponents.loadComponents", e10;
      }(eH || {}), eK = function(e10) {
        return e10.getRequestHandler = "NextServer.getRequestHandler", e10.getServer = "NextServer.getServer", e10.getServerRequestHandler = "NextServer.getServerRequestHandler", e10.createServer = "createServer.createServer", e10;
      }(eK || {}), eW = function(e10) {
        return e10.compression = "NextNodeServer.compression", e10.getBuildId = "NextNodeServer.getBuildId", e10.createComponentTree = "NextNodeServer.createComponentTree", e10.clientComponentLoading = "NextNodeServer.clientComponentLoading", e10.getLayoutOrPageModule = "NextNodeServer.getLayoutOrPageModule", e10.generateStaticRoutes = "NextNodeServer.generateStaticRoutes", e10.generateFsStaticRoutes = "NextNodeServer.generateFsStaticRoutes", e10.generatePublicRoutes = "NextNodeServer.generatePublicRoutes", e10.generateImageRoutes = "NextNodeServer.generateImageRoutes.route", e10.sendRenderResult = "NextNodeServer.sendRenderResult", e10.proxyRequest = "NextNodeServer.proxyRequest", e10.runApi = "NextNodeServer.runApi", e10.render = "NextNodeServer.render", e10.renderHTML = "NextNodeServer.renderHTML", e10.imageOptimizer = "NextNodeServer.imageOptimizer", e10.getPagePath = "NextNodeServer.getPagePath", e10.getRoutesManifest = "NextNodeServer.getRoutesManifest", e10.findPageComponents = "NextNodeServer.findPageComponents", e10.getFontManifest = "NextNodeServer.getFontManifest", e10.getServerComponentManifest = "NextNodeServer.getServerComponentManifest", e10.getRequestHandler = "NextNodeServer.getRequestHandler", e10.renderToHTML = "NextNodeServer.renderToHTML", e10.renderError = "NextNodeServer.renderError", e10.renderErrorToHTML = "NextNodeServer.renderErrorToHTML", e10.render404 = "NextNodeServer.render404", e10.startResponse = "NextNodeServer.startResponse", e10.route = "route", e10.onProxyReq = "onProxyReq", e10.apiResolver = "apiResolver", e10.internalFetch = "internalFetch", e10;
      }(eW || {}), eB = function(e10) {
        return e10.startServer = "startServer.startServer", e10;
      }(eB || {}), eq = function(e10) {
        return e10.getServerSideProps = "Render.getServerSideProps", e10.getStaticProps = "Render.getStaticProps", e10.renderToString = "Render.renderToString", e10.renderDocument = "Render.renderDocument", e10.createBodyResult = "Render.createBodyResult", e10;
      }(eq || {}), eJ = function(e10) {
        return e10.renderToString = "AppRender.renderToString", e10.renderToReadableStream = "AppRender.renderToReadableStream", e10.getBodyResult = "AppRender.getBodyResult", e10.fetch = "AppRender.fetch", e10;
      }(eJ || {}), ez = function(e10) {
        return e10.executeRoute = "Router.executeRoute", e10;
      }(ez || {}), eV = function(e10) {
        return e10.runHandler = "Node.runHandler", e10;
      }(eV || {}), eF = function(e10) {
        return e10.runHandler = "AppRouteRouteHandlers.runHandler", e10;
      }(eF || {}), eG = function(e10) {
        return e10.generateMetadata = "ResolveMetadata.generateMetadata", e10.generateViewport = "ResolveMetadata.generateViewport", e10;
      }(eG || {}), eY = function(e10) {
        return e10.execute = "Middleware.execute", e10;
      }(eY || {});
      let eX = ["Middleware.execute", "BaseServer.handleRequest", "Render.getServerSideProps", "Render.getStaticProps", "AppRender.fetch", "AppRender.getBodyResult", "Render.renderDocument", "Node.runHandler", "AppRouteRouteHandlers.runHandler", "ResolveMetadata.generateMetadata", "ResolveMetadata.generateViewport", "NextNodeServer.createComponentTree", "NextNodeServer.findPageComponents", "NextNodeServer.getLayoutOrPageModule", "NextNodeServer.startResponse", "NextNodeServer.clientComponentLoading"], eQ = ["NextNodeServer.findPageComponents", "NextNodeServer.createComponentTree", "NextNodeServer.clientComponentLoading"];
      function eZ(e10) {
        return null !== e10 && "object" == typeof e10 && "then" in e10 && "function" == typeof e10.then;
      }
      let { context: e0, propagation: e1, trace: e2, SpanStatusCode: e5, SpanKind: e8, ROOT_CONTEXT: e6 } = n = r(777);
      class e4 extends Error {
        constructor(e10, t10) {
          super(), this.bubble = e10, this.result = t10;
        }
      }
      let e3 = (e10, t10) => {
        (function(e11) {
          return "object" == typeof e11 && null !== e11 && e11 instanceof e4;
        })(t10) && t10.bubble ? e10.setAttribute("next.bubble", true) : (t10 && e10.recordException(t10), e10.setStatus({ code: e5.ERROR, message: null == t10 ? void 0 : t10.message })), e10.end();
      }, e9 = /* @__PURE__ */ new Map(), e7 = n.createContextKey("next.rootSpanId"), te = 0, tt = () => te++, tr = { set(e10, t10, r10) {
        e10.push({ key: t10, value: r10 });
      } };
      class tn {
        getTracerInstance() {
          return e2.getTracer("next.js", "0.0.1");
        }
        getContext() {
          return e0;
        }
        getTracePropagationData() {
          let e10 = e0.active(), t10 = [];
          return e1.inject(e10, t10, tr), t10;
        }
        getActiveScopeSpan() {
          return e2.getSpan(null == e0 ? void 0 : e0.active());
        }
        withPropagatedContext(e10, t10, r10) {
          let n10 = e0.active();
          if (e2.getSpanContext(n10)) return t10();
          let s10 = e1.extract(n10, e10, r10);
          return e0.with(s10, t10);
        }
        trace(...e10) {
          var t10;
          let [r10, n10, s10] = e10, { fn: i10, options: a10 } = "function" == typeof n10 ? { fn: n10, options: {} } : { fn: s10, options: { ...n10 } }, o10 = a10.spanName ?? r10;
          if (!eX.includes(r10) && "1" !== process.env.NEXT_OTEL_VERBOSE || a10.hideSpan) return i10();
          let c10 = this.getSpanContext((null == a10 ? void 0 : a10.parentSpan) ?? this.getActiveScopeSpan()), l10 = false;
          c10 ? (null == (t10 = e2.getSpanContext(c10)) ? void 0 : t10.isRemote) && (l10 = true) : (c10 = (null == e0 ? void 0 : e0.active()) ?? e6, l10 = true);
          let u2 = tt();
          return a10.attributes = { "next.span_name": o10, "next.span_type": r10, ...a10.attributes }, e0.with(c10.setValue(e7, u2), () => this.getTracerInstance().startActiveSpan(o10, a10, (e11) => {
            let t11 = "performance" in globalThis && "measure" in performance ? globalThis.performance.now() : void 0, n11 = () => {
              e9.delete(u2), t11 && process.env.NEXT_OTEL_PERFORMANCE_PREFIX && eQ.includes(r10 || "") && performance.measure(`${process.env.NEXT_OTEL_PERFORMANCE_PREFIX}:next-${(r10.split(".").pop() || "").replace(/[A-Z]/g, (e12) => "-" + e12.toLowerCase())}`, { start: t11, end: performance.now() });
            };
            l10 && e9.set(u2, new Map(Object.entries(a10.attributes ?? {})));
            try {
              if (i10.length > 1) return i10(e11, (t13) => e3(e11, t13));
              let t12 = i10(e11);
              if (eZ(t12)) return t12.then((t13) => (e11.end(), t13)).catch((t13) => {
                throw e3(e11, t13), t13;
              }).finally(n11);
              return e11.end(), n11(), t12;
            } catch (t12) {
              throw e3(e11, t12), n11(), t12;
            }
          }));
        }
        wrap(...e10) {
          let t10 = this, [r10, n10, s10] = 3 === e10.length ? e10 : [e10[0], {}, e10[1]];
          return eX.includes(r10) || "1" === process.env.NEXT_OTEL_VERBOSE ? function() {
            let e11 = n10;
            "function" == typeof e11 && "function" == typeof s10 && (e11 = e11.apply(this, arguments));
            let i10 = arguments.length - 1, a10 = arguments[i10];
            if ("function" != typeof a10) return t10.trace(r10, e11, () => s10.apply(this, arguments));
            {
              let n11 = t10.getContext().bind(e0.active(), a10);
              return t10.trace(r10, e11, (e12, t11) => (arguments[i10] = function(e13) {
                return null == t11 || t11(e13), n11.apply(this, arguments);
              }, s10.apply(this, arguments)));
            }
          } : s10;
        }
        startSpan(...e10) {
          let [t10, r10] = e10, n10 = this.getSpanContext((null == r10 ? void 0 : r10.parentSpan) ?? this.getActiveScopeSpan());
          return this.getTracerInstance().startSpan(t10, r10, n10);
        }
        getSpanContext(e10) {
          return e10 ? e2.setSpan(e0.active(), e10) : void 0;
        }
        getRootSpanAttributes() {
          let e10 = e0.active().getValue(e7);
          return e9.get(e10);
        }
        setRootSpanAttribute(e10, t10) {
          let r10 = e0.active().getValue(e7), n10 = e9.get(r10);
          n10 && n10.set(e10, t10);
        }
      }
      let ts = (() => {
        let e10 = new tn();
        return () => e10;
      })(), ti = "__prerender_bypass";
      Symbol("__next_preview_data"), Symbol(ti);
      class ta {
        constructor(e10, t10, r10, n10) {
          var s10;
          let i10 = e10 && function(e11, t11) {
            let r11 = eR.from(e11.headers);
            return { isOnDemandRevalidate: r11.get("x-prerender-revalidate") === t11.previewModeId, revalidateOnlyGenerated: r11.has("x-prerender-revalidate-if-generated") };
          }(t10, e10).isOnDemandRevalidate, a10 = null == (s10 = r10.get(ti)) ? void 0 : s10.value;
          this.isEnabled = !!(!i10 && a10 && e10 && a10 === e10.previewModeId), this._previewModeId = null == e10 ? void 0 : e10.previewModeId, this._mutableCookies = n10;
        }
        enable() {
          if (!this._previewModeId) throw Error("Invariant: previewProps missing previewModeId this should never happen");
          this._mutableCookies.set({ name: ti, value: this._previewModeId, httpOnly: true, sameSite: "none", secure: true, path: "/" });
        }
        disable() {
          this._mutableCookies.set({ name: ti, value: "", httpOnly: true, sameSite: "none", secure: true, path: "/", expires: /* @__PURE__ */ new Date(0) });
        }
      }
      function to(e10, t10) {
        if ("x-middleware-set-cookie" in e10.headers && "string" == typeof e10.headers["x-middleware-set-cookie"]) {
          let r10 = e10.headers["x-middleware-set-cookie"], n10 = new Headers();
          for (let e11 of Q(r10)) n10.append("set-cookie", e11);
          for (let e11 of new ey.ResponseCookies(n10).getAll()) t10.set(e11);
        }
      }
      var tc = r(541), tl = r.n(tc);
      class tu extends Error {
        constructor(e10, t10) {
          super("Invariant: " + (e10.endsWith(".") ? e10 : e10 + ".") + " This is a bug in Next.js.", t10), this.name = "InvariantError";
        }
      }
      async function th(e10, t10) {
        if (!e10) return t10();
        let r10 = td(e10);
        try {
          return await t10();
        } finally {
          let t11 = function(e11, t12) {
            let r11 = new Set(e11.revalidatedTags), n10 = new Set(e11.pendingRevalidateWrites);
            return { revalidatedTags: t12.revalidatedTags.filter((e12) => !r11.has(e12)), pendingRevalidates: Object.fromEntries(Object.entries(t12.pendingRevalidates).filter(([t13]) => !(t13 in e11.pendingRevalidates))), pendingRevalidateWrites: t12.pendingRevalidateWrites.filter((e12) => !n10.has(e12)) };
          }(r10, td(e10));
          await tp(e10, t11);
        }
      }
      function td(e10) {
        return { revalidatedTags: e10.revalidatedTags ? [...e10.revalidatedTags] : [], pendingRevalidates: { ...e10.pendingRevalidates }, pendingRevalidateWrites: e10.pendingRevalidateWrites ? [...e10.pendingRevalidateWrites] : [] };
      }
      async function tp(e10, { revalidatedTags: t10, pendingRevalidates: r10, pendingRevalidateWrites: n10 }) {
        var s10;
        return Promise.all([null == (s10 = e10.incrementalCache) ? void 0 : s10.revalidateTag(t10), ...Object.values(r10), ...n10]);
      }
      let tf = Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available");
      class tg {
        disable() {
          throw tf;
        }
        getStore() {
        }
        run() {
          throw tf;
        }
        exit() {
          throw tf;
        }
        enterWith() {
          throw tf;
        }
        static bind(e10) {
          return e10;
        }
      }
      let ty = "undefined" != typeof globalThis && globalThis.AsyncLocalStorage, tm = ty ? new ty() : new tg();
      class tw {
        constructor({ waitUntil: e10, onClose: t10, onTaskError: r10 }) {
          this.workUnitStores = /* @__PURE__ */ new Set(), this.waitUntil = e10, this.onClose = t10, this.onTaskError = r10, this.callbackQueue = new (tl())(), this.callbackQueue.pause();
        }
        after(e10) {
          if (eZ(e10)) this.waitUntil || tb(), this.waitUntil(e10.catch((e11) => this.reportTaskError("promise", e11)));
          else if ("function" == typeof e10) this.addCallback(e10);
          else throw Error("`after()`: Argument must be a promise or a function");
        }
        addCallback(e10) {
          var t10;
          this.waitUntil || tb();
          let r10 = eI.FP.getStore();
          r10 && this.workUnitStores.add(r10);
          let n10 = tm.getStore(), s10 = n10 ? n10.rootTaskSpawnPhase : null == r10 ? void 0 : r10.phase;
          this.runCallbacksOnClosePromise || (this.runCallbacksOnClosePromise = this.runCallbacksOnClose(), this.waitUntil(this.runCallbacksOnClosePromise));
          let i10 = (t10 = async () => {
            try {
              await tm.run({ rootTaskSpawnPhase: s10 }, () => e10());
            } catch (e11) {
              this.reportTaskError("function", e11);
            }
          }, ty ? ty.bind(t10) : tg.bind(t10));
          this.callbackQueue.add(i10);
        }
        async runCallbacksOnClose() {
          return await new Promise((e10) => this.onClose(e10)), this.runCallbacks();
        }
        async runCallbacks() {
          if (0 === this.callbackQueue.size) return;
          for (let e11 of this.workUnitStores) e11.phase = "after";
          let e10 = ex.J.getStore();
          if (!e10) throw new tu("Missing workStore in AfterContext.runCallbacks");
          return th(e10, () => (this.callbackQueue.start(), this.callbackQueue.onIdle()));
        }
        reportTaskError(e10, t10) {
          if (console.error("promise" === e10 ? "A promise passed to `after()` rejected:" : "An error occurred in a function passed to `after()`:", t10), this.onTaskError) try {
            null == this.onTaskError || this.onTaskError.call(this, t10);
          } catch (e11) {
            console.error(new tu("`onTaskError` threw while handling an error thrown from an `after` task", { cause: e11 }));
          }
        }
      }
      function tb() {
        throw Error("`after()` will not work correctly, because `waitUntil` is not available in the current environment.");
      }
      class tv {
        onClose(e10) {
          if (this.isClosed) throw Error("Cannot subscribe to a closed CloseController");
          this.target.addEventListener("close", e10), this.listeners++;
        }
        dispatchClose() {
          if (this.isClosed) throw Error("Cannot close a CloseController multiple times");
          this.listeners > 0 && this.target.dispatchEvent(new Event("close")), this.isClosed = true;
        }
        constructor() {
          this.target = new EventTarget(), this.listeners = 0, this.isClosed = false;
        }
      }
      function t_() {
        return { previewModeId: process.env.__NEXT_PREVIEW_MODE_ID, previewModeSigningKey: process.env.__NEXT_PREVIEW_MODE_SIGNING_KEY || "", previewModeEncryptionKey: process.env.__NEXT_PREVIEW_MODE_ENCRYPTION_KEY || "" };
      }
      let tS = Symbol.for("@next/request-context");
      class tE extends ew {
        constructor(e10) {
          super(e10.input, e10.init), this.sourcePage = e10.page;
        }
        get request() {
          throw new F({ page: this.sourcePage });
        }
        respondWith() {
          throw new F({ page: this.sourcePage });
        }
        waitUntil() {
          throw new F({ page: this.sourcePage });
        }
      }
      let tk = { keys: (e10) => Array.from(e10.keys()), get: (e10, t10) => e10.get(t10) ?? void 0 }, tT = (e10, t10) => ts().withPropagatedContext(e10.headers, t10, tk), tA = false;
      async function tP(e10) {
        var t10;
        let n10, s10;
        !function() {
          if (!tA && (tA = true, "true" === process.env.NEXT_PRIVATE_TEST_PROXY)) {
            let { interceptTestApis: e11, wrapRequestHandler: t11 } = r(384);
            e11(), tT = t11(tT);
          }
        }(), await z();
        let i10 = void 0 !== self.__BUILD_MANIFEST;
        e10.request.url = e10.request.url.replace(/\.rsc($|\?)/, "$1");
        let a10 = new eg(e10.request.url, { headers: e10.request.headers, nextConfig: e10.request.nextConfig });
        for (let e11 of [...a10.searchParams.keys()]) {
          let t11 = a10.searchParams.getAll(e11);
          !function(e12, t12) {
            for (let r10 of ["nxtP", "nxtI"]) e12 !== r10 && e12.startsWith(r10) && t12(e12.substring(r10.length));
          }(e11, (r10) => {
            for (let e12 of (a10.searchParams.delete(r10), t11)) a10.searchParams.append(r10, e12);
            a10.searchParams.delete(e11);
          });
        }
        let o10 = a10.buildId;
        a10.buildId = "";
        let c10 = e10.request.headers["x-nextjs-data"];
        c10 && "/index" === a10.pathname && (a10.pathname = "/");
        let l10 = function(e11) {
          let t11 = new Headers();
          for (let [r10, n11] of Object.entries(e11)) for (let e12 of Array.isArray(n11) ? n11 : [n11]) void 0 !== e12 && ("number" == typeof e12 && (e12 = e12.toString()), t11.append(r10, e12));
          return t11;
        }(e10.request.headers), u2 = /* @__PURE__ */ new Map();
        if (!i10) for (let e11 of eA) {
          let t11 = e11.toLowerCase(), r10 = l10.get(t11);
          r10 && (u2.set(t11, r10), l10.delete(t11));
        }
        let h2 = new tE({ page: e10.page, input: function(e11, t11) {
          let r10 = "string" == typeof e11, n11 = r10 ? new URL(e11) : e11;
          for (let e12 of eP) n11.searchParams.delete(e12);
          if (t11) for (let e12 of eC) n11.searchParams.delete(e12);
          return r10 ? n11.toString() : n11;
        }(a10, true).toString(), init: { body: e10.request.body, headers: l10, method: e10.request.method, nextConfig: e10.request.nextConfig, signal: e10.request.signal } });
        c10 && Object.defineProperty(h2, "__isData", { enumerable: false, value: true }), !globalThis.__incrementalCache && e10.IncrementalCache && (globalThis.__incrementalCache = new e10.IncrementalCache({ appDir: true, fetchCache: true, minimalMode: true, fetchCacheKeyPrefix: "", dev: false, requestHeaders: e10.request.headers, requestProtocol: "https", getPrerenderManifest: () => ({ version: -1, routes: {}, dynamicRoutes: {}, notFoundRoutes: [], preview: t_() }) }));
        let d2 = e10.request.waitUntil ?? (null == (t10 = function() {
          let e11 = globalThis[tS];
          return null == e11 ? void 0 : e11.get();
        }()) ? void 0 : t10.waitUntil), p2 = new ei({ request: h2, page: e10.page, context: d2 ? { waitUntil: d2 } : void 0 });
        if ((n10 = await tT(h2, () => {
          if ("/middleware" === e10.page || "/src/middleware" === e10.page) {
            let t11 = p2.waitUntil.bind(p2), r10 = new tv();
            return ts().trace(eY.execute, { spanName: `middleware ${h2.method} ${h2.nextUrl.pathname}`, attributes: { "http.target": h2.nextUrl.pathname, "http.method": h2.method } }, async () => {
              try {
                var n11, i11, a11, c11, l11, u3, d3;
                let f3 = t_(), g3 = (l11 = h2.nextUrl, u3 = void 0, d3 = (e11) => {
                  s10 = e11;
                }, function(e11, t12, r11, n12, s11, i12, a12, o11, c12, l12) {
                  function u4(e12) {
                    r11 && r11.setHeader("Set-Cookie", e12);
                  }
                  let h3 = {};
                  return { type: "request", phase: e11, implicitTags: s11 ?? [], url: { pathname: n12.pathname, search: n12.search ?? "" }, get headers() {
                    return h3.headers || (h3.headers = function(e12) {
                      let t13 = eR.from(e12);
                      for (let e13 of eA) t13.delete(e13.toLowerCase());
                      return eR.seal(t13);
                    }(t12.headers)), h3.headers;
                  }, get cookies() {
                    if (!h3.cookies) {
                      let e12 = new ey.RequestCookies(eR.from(t12.headers));
                      to(t12, e12), h3.cookies = ej.seal(e12);
                    }
                    return h3.cookies;
                  }, set cookies(value) {
                    h3.cookies = value;
                  }, get mutableCookies() {
                    if (!h3.mutableCookies) {
                      let e12 = function(e13, t13) {
                        let r12 = new ey.RequestCookies(eR.from(e13));
                        return eU.wrap(r12, t13);
                      }(t12.headers, i12 || (r11 ? u4 : void 0));
                      to(t12, e12), h3.mutableCookies = e12;
                    }
                    return h3.mutableCookies;
                  }, get userspaceMutableCookies() {
                    if (!h3.userspaceMutableCookies) {
                      let e12 = function(e13) {
                        let t13 = new Proxy(e13, { get(e14, r12, n13) {
                          switch (r12) {
                            case "delete":
                              return function(...r13) {
                                return eL("cookies().delete"), e14.delete(...r13), t13;
                              };
                            case "set":
                              return function(...r13) {
                                return eL("cookies().set"), e14.set(...r13), t13;
                              };
                            default:
                              return eb.get(e14, r12, n13);
                          }
                        } });
                        return t13;
                      }(this.mutableCookies);
                      h3.userspaceMutableCookies = e12;
                    }
                    return h3.userspaceMutableCookies;
                  }, get draftMode() {
                    return h3.draftMode || (h3.draftMode = new ta(o11, t12, this.cookies, this.mutableCookies)), h3.draftMode;
                  }, renderResumeDataCache: a12 ?? null, isHmrRefresh: c12, serverComponentsHmrCache: l12 || globalThis.__serverComponentsHmrCache };
                }("action", h2, void 0, l11, u3, d3, void 0, f3, false, void 0)), y3 = function({ page: e11, fallbackRouteParams: t12, renderOpts: r11, requestEndedState: n12, isPrefetchRequest: s11 }) {
                  var i12;
                  let a12 = { isStaticGeneration: !r11.supportsDynamicResponse && !r11.isDraftMode && !r11.isServerAction, page: e11, fallbackRouteParams: t12, route: (i12 = e11.split("/").reduce((e12, t13, r12, n13) => t13 ? "(" === t13[0] && t13.endsWith(")") || "@" === t13[0] || ("page" === t13 || "route" === t13) && r12 === n13.length - 1 ? e12 : e12 + "/" + t13 : e12, "")).startsWith("/") ? i12 : "/" + i12, incrementalCache: r11.incrementalCache || globalThis.__incrementalCache, cacheLifeProfiles: r11.cacheLifeProfiles, isRevalidate: r11.isRevalidate, isPrerendering: r11.nextExport, fetchCache: r11.fetchCache, isOnDemandRevalidate: r11.isOnDemandRevalidate, isDraftMode: r11.isDraftMode, requestEndedState: n12, isPrefetchRequest: s11, buildId: r11.buildId, reactLoadableManifest: (null == r11 ? void 0 : r11.reactLoadableManifest) || {}, assetPrefix: (null == r11 ? void 0 : r11.assetPrefix) || "", afterContext: function(e12) {
                    let { waitUntil: t13, onClose: r12, onAfterTaskError: n13 } = e12;
                    return new tw({ waitUntil: t13, onClose: r12, onTaskError: n13 });
                  }(r11) };
                  return r11.store = a12, a12;
                }({ page: "/", fallbackRouteParams: null, renderOpts: { cacheLifeProfiles: null == (i11 = e10.request.nextConfig) ? void 0 : null == (n11 = i11.experimental) ? void 0 : n11.cacheLife, experimental: { isRoutePPREnabled: false, dynamicIO: false, authInterrupts: !!(null == (c11 = e10.request.nextConfig) ? void 0 : null == (a11 = c11.experimental) ? void 0 : a11.authInterrupts) }, buildId: o10 ?? "", supportsDynamicResponse: true, waitUntil: t11, onClose: r10.onClose.bind(r10), onAfterTaskError: void 0 }, requestEndedState: { ended: false }, isPrefetchRequest: h2.headers.has(eT) });
                return await ex.J.run(y3, () => eI.FP.run(g3, e10.handler, h2, p2));
              } finally {
                setTimeout(() => {
                  r10.dispatchClose();
                }, 0);
              }
            });
          }
          return e10.handler(h2, p2);
        })) && !(n10 instanceof Response)) throw TypeError("Expected an instance of Response to be returned");
        n10 && s10 && n10.headers.set("set-cookie", s10);
        let f2 = null == n10 ? void 0 : n10.headers.get("x-middleware-rewrite");
        if (n10 && f2 && !i10) {
          let t11 = new eg(f2, { forceLocale: true, headers: e10.request.headers, nextConfig: e10.request.nextConfig });
          t11.host === h2.nextUrl.host && (t11.buildId = o10 || t11.buildId, n10.headers.set("x-middleware-rewrite", String(t11)));
          let r10 = ek(String(t11), String(a10));
          c10 && n10.headers.set("x-nextjs-rewrite", r10);
        }
        let g2 = null == n10 ? void 0 : n10.headers.get("Location");
        if (n10 && g2 && !i10) {
          let t11 = new eg(g2, { forceLocale: false, headers: e10.request.headers, nextConfig: e10.request.nextConfig });
          n10 = new Response(n10.body, n10), t11.host === h2.nextUrl.host && (t11.buildId = o10 || t11.buildId, n10.headers.set("Location", String(t11))), c10 && (n10.headers.delete("Location"), n10.headers.set("x-nextjs-redirect", ek(String(t11), String(a10))));
        }
        let y2 = n10 || eE.next(), m2 = y2.headers.get("x-middleware-override-headers"), w2 = [];
        if (m2) {
          for (let [e11, t11] of u2) y2.headers.set(`x-middleware-request-${e11}`, t11), w2.push(e11);
          w2.length > 0 && y2.headers.set("x-middleware-override-headers", m2 + "," + w2.join(","));
        }
        return { response: y2, waitUntil: ("internal" === p2[en].kind ? Promise.all(p2[en].promises).then(() => {
        }) : void 0) ?? Promise.resolve(), fetchMetrics: h2.fetchMetrics };
      }
      var tC = r(108), tO = r(923);
      function tR() {
      }
      var tx = r(886);
      let tI = { current: null }, tN = "function" == typeof tx.cache ? tx.cache : (e10) => e10, tj = console.warn;
      function tD(e10) {
        return function(...t10) {
          tj(e10(...t10));
        };
      }
      function tU() {
        let e10 = "cookies", t10 = ex.J.getStore(), r10 = eI.FP.getStore();
        if (t10) {
          if (r10 && "after" === r10.phase && !function() {
            let e11 = tm.getStore();
            return (null == e11 ? void 0 : e11.rootTaskSpawnPhase) === "action";
          }()) throw Error(`Route ${t10.route} used "cookies" inside "after(...)". This is not supported. If you need this data inside an "after" callback, use "cookies" outside of the callback. See more info here: https://nextjs.org/docs/canary/app/api-reference/functions/after`);
          if (t10.forceStatic) return tL(ej.seal(new ey.RequestCookies(new Headers({}))));
          if (r10) {
            if ("cache" === r10.type) throw Error(`Route ${t10.route} used "cookies" inside "use cache". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "cookies" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`);
            if ("unstable-cache" === r10.type) throw Error(`Route ${t10.route} used "cookies" inside a function cached with "unstable_cache(...)". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "cookies" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`);
          }
          if (t10.dynamicShouldError) throw new tO.f(`Route ${t10.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`cookies\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`);
          if (r10) {
            if ("prerender" === r10.type) return function(e11, t11) {
              let r11 = t$.get(t11);
              if (r11) return r11;
              let n11 = function(e12, t12) {
                let r12 = new Promise((r13, n12) => {
                  e12.addEventListener("abort", () => {
                    n12(Error(`During prerendering, ${t12} rejects when the prerender is complete. Typically these errors are handled by React but if you move ${t12} to a different context by using \`setTimeout\`, \`after\`, or similar functions you may observe this error and you should handle it in that context.`));
                  }, { once: true });
                });
                return r12.catch(tR), r12;
              }(t11.renderSignal, "`cookies()`");
              return t$.set(t11, n11), Object.defineProperties(n11, { [Symbol.iterator]: { value: function() {
                let r12 = "`cookies()[Symbol.iterator]()`", n12 = tH(e11, r12);
                (0, tC.t3)(e11, r12, n12, t11);
              } }, size: { get() {
                let r12 = "`cookies().size`", n12 = tH(e11, r12);
                (0, tC.t3)(e11, r12, n12, t11);
              } }, get: { value: function() {
                let r12;
                r12 = 0 == arguments.length ? "`cookies().get()`" : `\`cookies().get(${tM(arguments[0])})\``;
                let n12 = tH(e11, r12);
                (0, tC.t3)(e11, r12, n12, t11);
              } }, getAll: { value: function() {
                let r12;
                r12 = 0 == arguments.length ? "`cookies().getAll()`" : `\`cookies().getAll(${tM(arguments[0])})\``;
                let n12 = tH(e11, r12);
                (0, tC.t3)(e11, r12, n12, t11);
              } }, has: { value: function() {
                let r12;
                r12 = 0 == arguments.length ? "`cookies().has()`" : `\`cookies().has(${tM(arguments[0])})\``;
                let n12 = tH(e11, r12);
                (0, tC.t3)(e11, r12, n12, t11);
              } }, set: { value: function() {
                let r12;
                if (0 == arguments.length) r12 = "`cookies().set()`";
                else {
                  let e12 = arguments[0];
                  r12 = e12 ? `\`cookies().set(${tM(e12)}, ...)\`` : "`cookies().set(...)`";
                }
                let n12 = tH(e11, r12);
                (0, tC.t3)(e11, r12, n12, t11);
              } }, delete: { value: function() {
                let r12;
                r12 = 0 == arguments.length ? "`cookies().delete()`" : 1 == arguments.length ? `\`cookies().delete(${tM(arguments[0])})\`` : `\`cookies().delete(${tM(arguments[0])}, ...)\``;
                let n12 = tH(e11, r12);
                (0, tC.t3)(e11, r12, n12, t11);
              } }, clear: { value: function() {
                let r12 = "`cookies().clear()`", n12 = tH(e11, r12);
                (0, tC.t3)(e11, r12, n12, t11);
              } }, toString: { value: function() {
                let r12 = "`cookies().toString()`", n12 = tH(e11, r12);
                (0, tC.t3)(e11, r12, n12, t11);
              } } }), n11;
            }(t10.route, r10);
            "prerender-ppr" === r10.type ? (0, tC.Ui)(t10.route, e10, r10.dynamicTracking) : "prerender-legacy" === r10.type && (0, tC.xI)(e10, t10, r10);
          }
          (0, tC.Pk)(t10, r10);
        }
        let n10 = (0, eI.XN)(e10);
        return tL(e$(n10) ? n10.userspaceMutableCookies : n10.cookies);
      }
      tN((e10) => {
        try {
          tj(tI.current);
        } finally {
          tI.current = null;
        }
      });
      let t$ = /* @__PURE__ */ new WeakMap();
      function tL(e10) {
        let t10 = t$.get(e10);
        if (t10) return t10;
        let r10 = Promise.resolve(e10);
        return t$.set(e10, r10), Object.defineProperties(r10, { [Symbol.iterator]: { value: e10[Symbol.iterator] ? e10[Symbol.iterator].bind(e10) : tK.bind(e10) }, size: { get: () => e10.size }, get: { value: e10.get.bind(e10) }, getAll: { value: e10.getAll.bind(e10) }, has: { value: e10.has.bind(e10) }, set: { value: e10.set.bind(e10) }, delete: { value: e10.delete.bind(e10) }, clear: { value: "function" == typeof e10.clear ? e10.clear.bind(e10) : tW.bind(e10, r10) }, toString: { value: e10.toString.bind(e10) } }), r10;
      }
      function tM(e10) {
        return "object" == typeof e10 && null !== e10 && "string" == typeof e10.name ? `'${e10.name}'` : "string" == typeof e10 ? `'${e10}'` : "...";
      }
      function tH(e10, t10) {
        let r10 = e10 ? `Route "${e10}" ` : "This route ";
        return Error(`${r10}used ${t10}. \`cookies()\` should be awaited before using its value. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`);
      }
      function tK() {
        return this.getAll().map((e10) => [e10.name, e10]).values();
      }
      function tW(e10) {
        for (let e11 of this.getAll()) this.delete(e11.name);
        return e10;
      }
      tD(tH), /* @__PURE__ */ new WeakMap(), tD(function(e10, t10) {
        let r10 = e10 ? `Route "${e10}" ` : "This route ";
        return Error(`${r10}used ${t10}. \`headers()\` should be awaited before using its value. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`);
      }), r(23), /* @__PURE__ */ new WeakMap();
      function tB(e10) {
        let t10 = workAsyncStorage.getStore(), r10 = workUnitAsyncStorage.getStore();
        if (t10) {
          if (r10) {
            if ("cache" === r10.type) throw Error(`Route ${t10.route} used "${e10}" inside "use cache". The enabled status of draftMode can be read in caches but you must not enable or disable draftMode inside a cache. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`);
            if ("unstable-cache" === r10.type) throw Error(`Route ${t10.route} used "${e10}" inside a function cached with "unstable_cache(...)". The enabled status of draftMode can be read in caches but you must not enable or disable draftMode inside a cache. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`);
            if ("after" === r10.phase) throw Error(`Route ${t10.route} used "${e10}" inside \`after\`. The enabled status of draftMode can be read inside \`after\` but you cannot enable or disable draftMode. See more info here: https://nextjs.org/docs/app/api-reference/functions/after`);
          }
          if (t10.dynamicShouldError) throw new StaticGenBailoutError(`Route ${t10.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`${e10}\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`);
          if (r10) {
            if ("prerender" === r10.type) {
              let n10 = Error(`Route ${t10.route} used ${e10} without first calling \`await connection()\`. See more info here: https://nextjs.org/docs/messages/next-prerender-sync-headers`);
              abortAndThrowOnSynchronousRequestDataAccess(t10.route, e10, n10, r10);
            } else if ("prerender-ppr" === r10.type) postponeWithTracking(t10.route, e10, r10.dynamicTracking);
            else if ("prerender-legacy" === r10.type) {
              r10.revalidate = 0;
              let n10 = new DynamicServerError(`Route ${t10.route} couldn't be rendered statically because it used \`${e10}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`);
              throw t10.dynamicUsageDescription = e10, t10.dynamicUsageStack = n10.stack, n10;
            }
          }
        }
      }
      tD(function(e10, t10) {
        let r10 = e10 ? `Route "${e10}" ` : "This route ";
        return Error(`${r10}used ${t10}. \`draftMode()\` should be awaited before using its value. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`);
      }), r(113), "undefined" == typeof URLPattern || URLPattern;
      class tq extends Error {
      }
      class tJ extends tq {
        constructor({ code: e10, message: t10 }) {
          super(t10 ?? "An error occurred while interacting with the authorization server."), this.name = "OAuth2Error", this.code = e10;
        }
      }
      class tz extends tq {
        constructor(e10) {
          super(e10 ?? "Discovery failed for the OpenID Connect configuration."), this.code = "discovery_error", this.name = "DiscoveryError";
        }
      }
      class tV extends tq {
        constructor(e10) {
          super(e10 ?? "The state parameter is missing."), this.code = "missing_state", this.name = "MissingStateError";
        }
      }
      class tF extends tq {
        constructor(e10) {
          super(e10 ?? "The state parameter is invalid."), this.code = "invalid_state", this.name = "InvalidStateError";
        }
      }
      class tG extends tq {
        constructor(e10) {
          super(e10 ?? "The configuration is invalid."), this.code = "invalid_configuration", this.name = "InvalidConfigurationError";
        }
      }
      class tY extends tq {
        constructor({ cause: e10, message: t10 }) {
          super(t10 ?? "An error occurred during the authorization flow."), this.code = "authorization_error", this.cause = e10, this.name = "AuthorizationError";
        }
      }
      class tX extends tq {
        constructor(e10) {
          super(e10 ?? "An error occurred while preparing or performing the authorization code grant request."), this.code = "authorization_code_grant_request_error", this.name = "AuthorizationCodeGrantRequestError";
        }
      }
      class tQ extends tq {
        constructor({ cause: e10, message: t10 }) {
          super(t10 ?? "An error occurred while trying to exchange the authorization code."), this.code = "authorization_code_grant_error", this.cause = e10, this.name = "AuthorizationCodeGrantError";
        }
      }
      class tZ extends tq {
        constructor(e10) {
          super(e10 ?? "An error occurred while completing the backchannel logout request."), this.code = "backchannel_logout_error", this.name = "BackchannelLogoutError";
        }
      }
      class t0 extends tq {
        constructor() {
          super("The authorization server does not support backchannel authentication. Learn how to enable it here: https://auth0.com/docs/get-started/applications/configure-client-initiated-backchannel-authentication"), this.code = "backchannel_authentication_not_supported_error", this.name = "BackchannelAuthenticationNotSupportedError";
        }
      }
      class t1 extends tq {
        constructor({ cause: e10 }) {
          super("There was an error when trying to use Client-Initiated Backchannel Authentication."), this.code = "backchannel_authentication_error", this.cause = e10, this.name = "BackchannelAuthenticationError";
        }
      }
      !function(e10) {
        e10.MISSING_SESSION = "missing_session", e10.MISSING_REFRESH_TOKEN = "missing_refresh_token", e10.FAILED_TO_REFRESH_TOKEN = "failed_to_refresh_token";
      }(g || (g = {}));
      class t2 extends tq {
        constructor(e10, t10, r10) {
          super(t10), this.name = "AccessTokenError", this.code = e10, this.cause = r10;
        }
      }
      !function(e10) {
        e10.MISSING_SESSION = "missing_session", e10.MISSING_REFRESH_TOKEN = "missing_refresh_token", e10.FAILED_TO_EXCHANGE = "failed_to_exchange_refresh_token";
      }(y || (y = {}));
      class t5 extends tq {
        constructor(e10, t10, r10) {
          super(t10), this.name = "AccessTokenForConnectionError", this.code = e10, this.cause = r10;
        }
      }
      !function(e10) {
        e10.MISSING_SUBJECT_TOKEN = "missing_subject_token", e10.INVALID_SUBJECT_TOKEN_TYPE = "invalid_subject_token_type", e10.MISSING_ACTOR_TOKEN_TYPE = "missing_actor_token_type", e10.EXCHANGE_FAILED = "exchange_failed";
      }(m || (m = {}));
      class t8 extends tq {
        constructor(e10, t10, r10) {
          super(t10), this.name = "CustomTokenExchangeError", this.code = e10, this.cause = r10;
        }
      }
      !function(e10) {
        e10.DPOP_JKT_CALCULATION_FAILED = "dpop_jkt_calculation_failed", e10.DPOP_KEY_EXPORT_FAILED = "dpop_key_export_failed", e10.DPOP_CONFIGURATION_ERROR = "dpop_configuration_error";
      }(w || (w = {}));
      class t6 extends tq {
        constructor(e10, t10, r10) {
          super(t10), this.name = "DPoPError", this.code = e10, this.cause = r10;
        }
      }
      class t4 extends tq {
        constructor({ type: e10, title: t10, detail: r10, status: n10, validationErrors: s10 }) {
          super(`${t10}: ${r10}`), this.name = "MyAccountApiError", this.code = "my_account_api_error", this.type = e10, this.title = t10, this.detail = r10, this.status = n10, this.validationErrors = s10;
        }
      }
      !function(e10) {
        e10.MISSING_SESSION = "missing_session", e10.FAILED_TO_INITIATE = "failed_to_initiate", e10.FAILED_TO_COMPLETE = "failed_to_complete";
      }(b || (b = {}));
      class t3 extends tq {
        constructor({ code: e10, message: t10, cause: r10 }) {
          super(t10), this.name = "ConnectAccountError", this.code = e10, this.cause = r10;
        }
      }
      let t9 = "openid profile email offline_access", t7 = globalThis.__import_unsupported("crypto");
      function re(e10, t10) {
        if (null == e10) return false;
        try {
          return e10 instanceof t10 || Object.getPrototypeOf(e10)[Symbol.toStringTag] === t10.prototype[Symbol.toStringTag];
        } catch {
          return false;
        }
      }
      "undefined" != typeof navigator && navigator.userAgent?.startsWith?.("Mozilla/5.0 ") || (s = "oauth4webapi/v3.8.3");
      let rt = "ERR_INVALID_ARG_VALUE", rr = "ERR_INVALID_ARG_TYPE";
      function rn(e10, t10, r10) {
        let n10 = TypeError(e10, { cause: r10 });
        return Object.assign(n10, { code: t10 }), n10;
      }
      let rs = Symbol(), ri = Symbol(), ra = Symbol(), ro = Symbol(), rc = Symbol(), rl = Symbol(), ru = Symbol(), rh = new TextEncoder(), rd = new TextDecoder();
      function rp(e10) {
        return "string" == typeof e10 ? rh.encode(e10) : rd.decode(e10);
      }
      function rf(e10) {
        return "string" == typeof e10 ? a(e10) : i(e10);
      }
      Uint8Array.prototype.toBase64 ? i = (e10) => (e10 instanceof ArrayBuffer && (e10 = new Uint8Array(e10)), e10.toBase64({ alphabet: "base64url", omitPadding: true })) : i = (e10) => {
        e10 instanceof ArrayBuffer && (e10 = new Uint8Array(e10));
        let t10 = [];
        for (let r10 = 0; r10 < e10.byteLength; r10 += 32768) t10.push(String.fromCharCode.apply(null, e10.subarray(r10, r10 + 32768)));
        return btoa(t10.join("")).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
      }, Uint8Array.fromBase64 ? a = (e10) => {
        try {
          return Uint8Array.fromBase64(e10, { alphabet: "base64url" });
        } catch (e11) {
          throw rn("The input to be decoded is not correctly encoded.", rt, e11);
        }
      } : a = (e10) => {
        try {
          let t10 = atob(e10.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "")), r10 = new Uint8Array(t10.length);
          for (let e11 = 0; e11 < t10.length; e11++) r10[e11] = t10.charCodeAt(e11);
          return r10;
        } catch (e11) {
          throw rn("The input to be decoded is not correctly encoded.", rt, e11);
        }
      };
      class rg extends Error {
        code;
        constructor(e10, t10) {
          super(e10, t10), this.name = this.constructor.name, this.code = nC, Error.captureStackTrace?.(this, this.constructor);
        }
      }
      class ry extends Error {
        code;
        constructor(e10, t10) {
          super(e10, t10), this.name = this.constructor.name, t10?.code && (this.code = t10?.code), Error.captureStackTrace?.(this, this.constructor);
        }
      }
      function rm(e10, t10, r10) {
        return new ry(e10, { code: t10, cause: r10 });
      }
      async function rw(e10) {
        let t10;
        switch (e10.kty) {
          case "EC":
            t10 = { crv: e10.crv, kty: e10.kty, x: e10.x, y: e10.y };
            break;
          case "OKP":
            t10 = { crv: e10.crv, kty: e10.kty, x: e10.x };
            break;
          case "AKP":
            t10 = { alg: e10.alg, kty: e10.kty, pub: e10.pub };
            break;
          case "RSA":
            t10 = { e: e10.e, kty: e10.kty, n: e10.n };
            break;
          default:
            throw new rg("unsupported JWK key type", { cause: e10 });
        }
        return rf(await crypto.subtle.digest("SHA-256", rp(JSON.stringify(t10))));
      }
      function rb(e10, t10) {
        if (!(e10 instanceof CryptoKey)) throw rn(`${t10} must be a CryptoKey`, rr);
      }
      function rv(e10, t10) {
        if (rb(e10, t10), "private" !== e10.type) throw rn(`${t10} must be a private CryptoKey`, rt);
      }
      function r_(e10) {
        return !(null === e10 || "object" != typeof e10 || Array.isArray(e10));
      }
      function rS(e10) {
        re(e10, Headers) && (e10 = Object.fromEntries(e10.entries()));
        let t10 = new Headers(e10 ?? {});
        if (s && !t10.has("user-agent") && t10.set("user-agent", s), t10.has("authorization")) throw rn('"options.headers" must not include the "authorization" header name', rt);
        return t10;
      }
      function rE(e10, t10) {
        if (void 0 !== t10) {
          if ("function" == typeof t10 && (t10 = t10(e10.href)), !(t10 instanceof AbortSignal)) throw rn('"options.signal" must return or be an instance of AbortSignal', rr);
          return t10;
        }
      }
      function rk(e10) {
        return e10.includes("//") ? e10.replace("//", "/") : e10;
      }
      async function rT(e10, t10, r10, n10) {
        if (!(e10 instanceof URL)) throw rn(`"${t10}" must be an instance of URL`, rr);
        rJ(e10, n10?.[rs] !== true);
        let s10 = r10(new URL(e10.href)), i10 = rS(n10?.headers);
        return i10.set("accept", "application/json"), (n10?.[ro] || fetch)(s10.href, { body: void 0, headers: Object.fromEntries(i10.entries()), method: "GET", redirect: "manual", signal: rE(s10, n10?.signal) });
      }
      async function rA(e10, t10) {
        return rT(e10, "issuerIdentifier", (e11) => {
          switch (t10?.algorithm) {
            case void 0:
            case "oidc":
              e11.pathname = rk(`${e11.pathname}/.well-known/openid-configuration`);
              break;
            case "oauth2":
              !function(e12, t11, r10 = false) {
                "/" === e12.pathname ? e12.pathname = t11 : e12.pathname = rk(`${t11}/${r10 ? e12.pathname : e12.pathname.replace(/(\/)$/, "")}`);
              }(e11, ".well-known/oauth-authorization-server");
              break;
            default:
              throw rn('"options.algorithm" must be "oidc" (default), or "oauth2"', rt);
          }
          return e11;
        }, t10);
      }
      function rP(e10, t10, r10, n10, s10) {
        try {
          if ("number" != typeof e10 || !Number.isFinite(e10)) throw rn(`${r10} must be a number`, rr, s10);
          if (e10 > 0) return;
          if (t10) {
            if (0 !== e10) throw rn(`${r10} must be a non-negative number`, rt, s10);
            return;
          }
          throw rn(`${r10} must be a positive number`, rt, s10);
        } catch (e11) {
          if (n10) throw rm(e11.message, n10, s10);
          throw e11;
        }
      }
      function rC(e10, t10, r10, n10) {
        try {
          if ("string" != typeof e10) throw rn(`${t10} must be a string`, rr, n10);
          if (0 === e10.length) throw rn(`${t10} must not be empty`, rt, n10);
        } catch (e11) {
          if (r10) throw rm(e11.message, r10, n10);
          throw e11;
        }
      }
      async function rO(e10, t10) {
        if (!(e10 instanceof URL) && e10 !== n9) throw rn('"expectedIssuerIdentifier" must be an instance of URL', rr);
        if (!re(t10, Response)) throw rn('"response" must be an instance of Response', rr);
        if (200 !== t10.status) throw rm('"response" is not a conform Authorization Server Metadata response (unexpected HTTP status code)', nN, t10);
        nq(t10);
        let r10 = await n3(t10);
        if (rC(r10.issuer, '"response" body "issuer" property', nx, { body: r10 }), e10 !== n9 && new URL(r10.issuer).href !== e10.href) throw rm('"response" body "issuer" property does not match the expected value', nL, { expected: e10.href, body: r10, attribute: "issuer" });
        return r10;
      }
      function rR(e10) {
        !function(e11, t10) {
          if (ns(e11) !== t10) throw rx(e11, t10);
        }(e10, "application/json");
      }
      function rx(e10, ...t10) {
        let r10 = '"response" content-type must be ';
        if (t10.length > 2) {
          let e11 = t10.pop();
          r10 += `${t10.join(", ")}, or ${e11}`;
        } else 2 === t10.length ? r10 += `${t10[0]} or ${t10[1]}` : r10 += t10[0];
        return rm(r10, nI, e10);
      }
      function rI() {
        return rf(crypto.getRandomValues(new Uint8Array(32)));
      }
      async function rN(e10) {
        return rC(e10, "codeVerifier"), rf(await crypto.subtle.digest("SHA-256", rp(e10)));
      }
      function rj(e10) {
        switch (e10.algorithm.name) {
          case "RSA-PSS":
            return function(e11) {
              switch (e11.algorithm.hash.name) {
                case "SHA-256":
                  return "PS256";
                case "SHA-384":
                  return "PS384";
                case "SHA-512":
                  return "PS512";
                default:
                  throw new rg("unsupported RsaHashedKeyAlgorithm hash name", { cause: e11 });
              }
            }(e10);
          case "RSASSA-PKCS1-v1_5":
            return function(e11) {
              switch (e11.algorithm.hash.name) {
                case "SHA-256":
                  return "RS256";
                case "SHA-384":
                  return "RS384";
                case "SHA-512":
                  return "RS512";
                default:
                  throw new rg("unsupported RsaHashedKeyAlgorithm hash name", { cause: e11 });
              }
            }(e10);
          case "ECDSA":
            return function(e11) {
              switch (e11.algorithm.namedCurve) {
                case "P-256":
                  return "ES256";
                case "P-384":
                  return "ES384";
                case "P-521":
                  return "ES512";
                default:
                  throw new rg("unsupported EcKeyAlgorithm namedCurve", { cause: e11 });
              }
            }(e10);
          case "Ed25519":
          case "ML-DSA-44":
          case "ML-DSA-65":
          case "ML-DSA-87":
            return e10.algorithm.name;
          case "EdDSA":
            return "Ed25519";
          default:
            throw new rg("unsupported CryptoKey algorithm name", { cause: e10 });
        }
      }
      function rD(e10) {
        let t10 = e10?.[ri];
        return "number" == typeof t10 && Number.isFinite(t10) ? t10 : 0;
      }
      function rU(e10) {
        let t10 = e10?.[ra];
        return "number" == typeof t10 && Number.isFinite(t10) && -1 !== Math.sign(t10) ? t10 : 30;
      }
      function r$() {
        return Math.floor(Date.now() / 1e3);
      }
      function rL(e10) {
        if ("object" != typeof e10 || null === e10) throw rn('"as" must be an object', rr);
        rC(e10.issuer, '"as.issuer"');
      }
      function rM(e10) {
        if ("object" != typeof e10 || null === e10) throw rn('"client" must be an object', rr);
        rC(e10.client_id, '"client.client_id"');
      }
      function rH(e10) {
        return rC(e10, '"clientSecret"'), (t10, r10, n10, s10) => {
          n10.set("client_id", r10.client_id), n10.set("client_secret", e10);
        };
      }
      async function rK(e10, t10, r10) {
        if (!r10.usages.includes("sign")) throw rn('CryptoKey instances used for signing assertions must include "sign" in their "usages"', rt);
        let n10 = `${rf(rp(JSON.stringify(e10)))}.${rf(rp(JSON.stringify(t10)))}`, s10 = rf(await crypto.subtle.sign(nF(r10), r10, rp(n10)));
        return `${n10}.${s10}`;
      }
      async function rW(e10, t10) {
        let { kty: r10, e: n10, n: s10, x: i10, y: a10, crv: c10, pub: l10 } = await crypto.subtle.exportKey("jwk", e10), u2 = { kty: r10, e: n10, n: s10, x: i10, y: a10, crv: c10, pub: l10 };
        return "AKP" === r10 && (u2.alg = t10), o.set(e10, u2), u2;
      }
      async function rB(e10, t10) {
        return (o ||= /* @__PURE__ */ new WeakMap()).get(e10) || rW(e10, t10);
      }
      let rq = URL.parse ? (e10, t10) => URL.parse(e10, t10) : (e10, t10) => {
        try {
          return new URL(e10, t10);
        } catch {
          return null;
        }
      };
      function rJ(e10, t10) {
        if (t10 && "https:" !== e10.protocol) throw rm("only requests to HTTPS are allowed", nj, e10);
        if ("https:" !== e10.protocol && "http:" !== e10.protocol) throw rm("only HTTP and HTTPS requests are allowed", nD, e10);
      }
      function rz(e10, t10, r10, n10) {
        let s10;
        if ("string" != typeof e10 || !(s10 = rq(e10))) throw rm(`authorization server metadata does not contain a valid ${r10 ? `"as.mtls_endpoint_aliases.${t10}"` : `"as.${t10}"`}`, void 0 === e10 ? nH : nK, { attribute: r10 ? `mtls_endpoint_aliases.${t10}` : t10 });
        return rJ(s10, n10), s10;
      }
      function rV(e10, t10, r10, n10) {
        return r10 && e10.mtls_endpoint_aliases && t10 in e10.mtls_endpoint_aliases ? rz(e10.mtls_endpoint_aliases[t10], t10, r10, n10) : rz(e10[t10], t10, r10, n10);
      }
      async function rF(e10, t10, r10, n10, s10) {
        rL(e10), rM(t10);
        let i10 = rV(e10, "pushed_authorization_request_endpoint", t10.use_mtls_endpoint_aliases, s10?.[rs] !== true), a10 = new URLSearchParams(n10);
        a10.set("client_id", t10.client_id);
        let o10 = rS(s10?.headers);
        o10.set("accept", "application/json"), s10?.DPoP !== void 0 && (r7(s10.DPoP), await s10.DPoP.addProof(i10, o10, "POST"));
        let c10 = await ni(e10, t10, r10, i10, a10, o10, s10);
        return s10?.DPoP?.cacheNonce(c10, i10), c10;
      }
      class rG {
        #e;
        #t;
        #r;
        #n;
        #s;
        #i;
        #a;
        constructor(e10, t10, r10) {
          if (rv(t10?.privateKey, '"DPoP.privateKey"'), !function(e11, t11) {
            if (rb(e11, t11), "public" !== e11.type) throw rn(`${t11} must be a public CryptoKey`, rt);
          }(t10?.publicKey, '"DPoP.publicKey"'), !t10.publicKey.extractable) throw rn('"DPoP.publicKey.extractable" must be true', rt);
          this.#s = r10?.[rc], this.#n = rD(e10), this.#t = t10.privateKey, this.#r = t10.publicKey, ny.add(this);
        }
        #o(e10) {
          this.#i ||= /* @__PURE__ */ new Map();
          let t10 = this.#i.get(e10);
          return t10 && (this.#i.delete(e10), this.#i.set(e10, t10)), t10;
        }
        #c(e10, t10) {
          this.#i ||= /* @__PURE__ */ new Map(), this.#i.delete(e10), 100 === this.#i.size && this.#i.delete(this.#i.keys().next().value), this.#i.set(e10, t10);
        }
        async calculateThumbprint() {
          if (!this.#a) {
            let e10 = await crypto.subtle.exportKey("jwk", this.#r);
            this.#a ||= await rw(e10);
          }
          return this.#a;
        }
        async addProof(e10, t10, r10, n10) {
          let s10 = rj(this.#t);
          this.#e ||= { alg: s10, typ: "dpop+jwt", jwk: await rB(this.#r, s10) };
          let i10 = this.#o(e10.origin), a10 = { iat: r$() + this.#n, jti: rI(), htm: r10, nonce: i10, htu: `${e10.origin}${e10.pathname}`, ath: n10 ? rf(await crypto.subtle.digest("SHA-256", rp(n10))) : void 0 };
          this.#s?.(this.#e, a10), t10.set("dpop", await rK(this.#e, a10, this.#t));
        }
        cacheNonce(e10, t10) {
          try {
            let r10 = e10.headers.get("dpop-nonce");
            r10 && this.#c(t10.origin, r10);
          } catch {
          }
        }
      }
      function rY(e10) {
        if (e10 instanceof r0) {
          let { 0: t10, length: r10 } = e10.cause;
          return 1 === r10 && "dpop" === t10.scheme && "use_dpop_nonce" === t10.parameters.error;
        }
        return e10 instanceof rQ && "use_dpop_nonce" === e10.error;
      }
      function rX(e10, t10, r10) {
        return new rG(e10, t10, r10);
      }
      class rQ extends Error {
        cause;
        code;
        error;
        status;
        error_description;
        response;
        constructor(e10, t10) {
          super(e10, t10), this.name = this.constructor.name, this.code = nP, this.cause = t10.cause, this.error = t10.cause.error, this.status = t10.response.status, this.error_description = t10.cause.error_description, Object.defineProperty(this, "response", { enumerable: false, value: t10.response }), Error.captureStackTrace?.(this, this.constructor);
        }
      }
      class rZ extends Error {
        cause;
        code;
        error;
        error_description;
        constructor(e10, t10) {
          super(e10, t10), this.name = this.constructor.name, this.code = nO, this.cause = t10.cause, this.error = t10.cause.get("error"), this.error_description = t10.cause.get("error_description") ?? void 0, Error.captureStackTrace?.(this, this.constructor);
        }
      }
      class r0 extends Error {
        cause;
        code;
        response;
        status;
        constructor(e10, t10) {
          super(e10, t10), this.name = this.constructor.name, this.code = nA, this.cause = t10.cause, this.status = t10.response.status, this.response = t10.response, Object.defineProperty(this, "response", { enumerable: false }), Error.captureStackTrace?.(this, this.constructor);
        }
      }
      let r1 = "[a-zA-Z0-9!#$%&\\'\\*\\+\\-\\.\\^_`\\|~]+", r2 = RegExp("^[,\\s]*(" + r1 + ")"), r5 = RegExp("^[,\\s]*(" + r1 + ')\\s*=\\s*"((?:[^"\\\\]|\\\\[\\s\\S])*)"[,\\s]*(.*)'), r8 = RegExp("^[,\\s]*(" + r1 + ")\\s*=\\s*(" + r1 + ")[,\\s]*(.*)"), r6 = RegExp("^([a-zA-Z0-9\\-\\._\\~\\+\\/]+={0,2})(?:$|[,\\s])(.*)");
      async function r4(e10, t10, r10) {
        if (rL(e10), rM(t10), !re(r10, Response)) throw rn('"response" must be an instance of Response', rr);
        await r9(r10, 201, "Pushed Authorization Request Endpoint"), nq(r10);
        let n10 = await n3(r10);
        rC(n10.request_uri, '"response" body "request_uri" property', nx, { body: n10 });
        let s10 = "number" != typeof n10.expires_in ? parseFloat(n10.expires_in) : n10.expires_in;
        return rP(s10, true, '"response" body "expires_in" property', nx, { body: n10 }), n10.expires_in = s10, n10;
      }
      async function r3(e10) {
        if (e10.status > 399 && e10.status < 500) {
          nq(e10), rR(e10);
          try {
            let t10 = await e10.clone().json();
            if (r_(t10) && "string" == typeof t10.error && t10.error.length) return t10;
          } catch {
          }
        }
      }
      async function r9(e10, t10, r10) {
        if (e10.status !== t10) {
          let t11;
          if (nd(e10), t11 = await r3(e10)) throw await e10.body?.cancel(), new rQ("server responded with an error in the response body", { cause: t11, response: e10 });
          throw rm(`"response" is not a conform ${r10} response (unexpected HTTP status code)`, nN, e10);
        }
      }
      function r7(e10) {
        if (!ny.has(e10)) throw rn('"options.DPoP" is not a valid DPoPHandle', rt);
      }
      async function ne(e10, t10, r10, n10, s10, i10) {
        if (rC(e10, '"accessToken"'), !(r10 instanceof URL)) throw rn('"url" must be an instance of URL', rr);
        rJ(r10, i10?.[rs] !== true), n10 = rS(n10), i10?.DPoP && (r7(i10.DPoP), await i10.DPoP.addProof(r10, n10, t10.toUpperCase(), e10)), n10.set("authorization", `${n10.has("dpop") ? "DPoP" : "Bearer"} ${e10}`);
        let a10 = await (i10?.[ro] || fetch)(r10.href, { body: s10, headers: Object.fromEntries(n10.entries()), method: t10, redirect: "manual", signal: rE(r10, i10?.signal) });
        return i10?.DPoP?.cacheNonce(a10, r10), a10;
      }
      async function nt(e10, t10, r10, n10, s10, i10) {
        let a10 = await ne(e10, t10, r10, n10, s10, i10);
        return nd(a10), a10;
      }
      function nr(e10, t10, r10, n10) {
        (c ||= /* @__PURE__ */ new WeakMap()).set(e10, { jwks: t10, uat: r10, get age() {
          return r$() - this.uat;
        } }), n10 && Object.assign(n10, { jwks: structuredClone(t10), uat: r10 });
      }
      function nn(e10, t10) {
        c?.delete(e10), delete t10?.jwks, delete t10?.uat;
      }
      function ns(e10) {
        return e10.headers.get("content-type")?.split(";")[0];
      }
      async function ni(e10, t10, r10, n10, s10, i10, a10) {
        return await r10(e10, t10, s10, i10), i10.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"), (a10?.[ro] || fetch)(n10.href, { body: s10, headers: Object.fromEntries(i10.entries()), method: "POST", redirect: "manual", signal: rE(n10, a10?.signal) });
      }
      async function na(e10, t10, r10, n10, s10, i10) {
        let a10 = rV(e10, "token_endpoint", t10.use_mtls_endpoint_aliases, i10?.[rs] !== true);
        s10.set("grant_type", n10);
        let o10 = rS(i10?.headers);
        o10.set("accept", "application/json"), i10?.DPoP !== void 0 && (r7(i10.DPoP), await i10.DPoP.addProof(a10, o10, "POST"));
        let c10 = await ni(e10, t10, r10, a10, s10, o10, i10);
        return i10?.DPoP?.cacheNonce(c10, a10), c10;
      }
      async function no(e10, t10, r10, n10, s10) {
        rL(e10), rM(t10), rC(n10, '"refreshToken"');
        let i10 = new URLSearchParams(s10?.additionalParameters);
        return i10.set("refresh_token", n10), na(e10, t10, r10, "refresh_token", i10, s10);
      }
      Symbol();
      let nc = /* @__PURE__ */ new WeakMap(), nl = /* @__PURE__ */ new WeakMap();
      function nu(e10) {
        if (!e10.id_token) return;
        let t10 = nc.get(e10);
        if (!t10) throw rn('"ref" was already garbage collected or did not resolve from the proper sources', rt);
        return t10;
      }
      async function nh(e10, t10, r10, n10, s10, i10) {
        if (rL(e10), rM(t10), !re(r10, Response)) throw rn('"response" must be an instance of Response', rr);
        await r9(r10, 200, "Token Endpoint"), nq(r10);
        let a10 = await n3(r10);
        if (rC(a10.access_token, '"response" body "access_token" property', nx, { body: a10 }), rC(a10.token_type, '"response" body "token_type" property', nx, { body: a10 }), a10.token_type = a10.token_type.toLowerCase(), void 0 !== a10.expires_in) {
          let e11 = "number" != typeof a10.expires_in ? parseFloat(a10.expires_in) : a10.expires_in;
          rP(e11, true, '"response" body "expires_in" property', nx, { body: a10 }), a10.expires_in = e11;
        }
        if (void 0 !== a10.refresh_token && rC(a10.refresh_token, '"response" body "refresh_token" property', nx, { body: a10 }), void 0 !== a10.scope && "string" != typeof a10.scope) throw rm('"response" body "scope" property must be a string', nx, { body: a10 });
        if (void 0 !== a10.id_token) {
          rC(a10.id_token, '"response" body "id_token" property', nx, { body: a10 });
          let i11 = ["aud", "exp", "iat", "iss", "sub"];
          true === t10.require_auth_time && i11.push("auth_time"), void 0 !== t10.default_max_age && (rP(t10.default_max_age, true, '"client.default_max_age"'), i11.push("auth_time")), n10?.length && i11.push(...n10);
          let { claims: o10, jwt: c10 } = await nG(a10.id_token, nQ.bind(void 0, t10.id_token_signed_response_alg, e10.id_token_signing_alg_values_supported, "RS256"), rD(t10), rU(t10), s10).then(nv.bind(void 0, i11)).then(ng.bind(void 0, e10)).then(nf.bind(void 0, t10.client_id));
          if (Array.isArray(o10.aud) && 1 !== o10.aud.length) {
            if (void 0 === o10.azp) throw rm('ID Token "aud" (audience) claim includes additional untrusted audiences', n$, { claims: o10, claim: "aud" });
            if (o10.azp !== t10.client_id) throw rm('unexpected ID Token "azp" (authorized party) claim value', n$, { expected: t10.client_id, claims: o10, claim: "azp" });
          }
          void 0 !== o10.auth_time && rP(o10.auth_time, true, 'ID Token "auth_time" (authentication time)', nx, { claims: o10 }), nl.set(r10, c10), nc.set(a10, o10);
        }
        if (i10?.[a10.token_type] !== void 0) i10[a10.token_type](r10, a10);
        else if ("dpop" !== a10.token_type && "bearer" !== a10.token_type) throw new rg("unsupported `token_type` value", { cause: { body: a10 } });
        return a10;
      }
      function nd(e10) {
        let t10;
        if (t10 = function(e11) {
          if (!re(e11, Response)) throw rn('"response" must be an instance of Response', rr);
          let t11 = e11.headers.get("www-authenticate");
          if (null === t11) return;
          let r10 = [], n10 = t11;
          for (; n10; ) {
            let e12, t12 = n10.match(r2), s10 = t12?.["1"].toLowerCase();
            if (!s10) return;
            let i10 = n10.substring(t12[0].length);
            if (i10 && !i10.match(/^[\s,]/)) return;
            let a10 = i10.match(/^\s+(.*)$/), o10 = !!a10;
            n10 = a10 ? a10[1] : void 0;
            let c10 = {};
            if (o10) for (; n10; ) {
              let r11, s11;
              if (t12 = n10.match(r5)) {
                if ([, r11, s11, n10] = t12, s11.includes("\\")) try {
                  s11 = JSON.parse(`"${s11}"`);
                } catch {
                }
                c10[r11.toLowerCase()] = s11;
                continue;
              }
              if (t12 = n10.match(r8)) {
                [, r11, s11, n10] = t12, c10[r11.toLowerCase()] = s11;
                continue;
              }
              if (t12 = n10.match(r6)) {
                if (Object.keys(c10).length) break;
                [, e12, n10] = t12;
                break;
              }
              return;
            }
            else n10 = i10 || void 0;
            let l10 = { scheme: s10, parameters: c10 };
            e12 && (l10.token68 = e12), r10.push(l10);
          }
          if (r10.length) return r10;
        }(e10)) throw new r0("server responded with a challenge in the WWW-Authenticate HTTP Header", { cause: t10, response: e10 });
      }
      async function np(e10, t10, r10, n10) {
        return nh(e10, t10, r10, void 0, n10?.[rl], n10?.recognizedTokenTypes);
      }
      function nf(e10, t10) {
        if (Array.isArray(t10.claims.aud)) {
          if (!t10.claims.aud.includes(e10)) throw rm('unexpected JWT "aud" (audience) claim value', n$, { expected: e10, claims: t10.claims, claim: "aud" });
        } else if (t10.claims.aud !== e10) throw rm('unexpected JWT "aud" (audience) claim value', n$, { expected: e10, claims: t10.claims, claim: "aud" });
        return t10;
      }
      function ng(e10, t10) {
        let r10 = e10[n7]?.(t10) ?? e10.issuer;
        if (t10.claims.iss !== r10) throw rm('unexpected JWT "iss" (issuer) claim value', n$, { expected: r10, claims: t10.claims, claim: "iss" });
        return t10;
      }
      let ny = /* @__PURE__ */ new WeakSet(), nm = Symbol();
      async function nw(e10, t10, r10, n10, s10, i10, a10) {
        if (rL(e10), rM(t10), !ny.has(n10)) throw rn('"callbackParameters" must be an instance of URLSearchParams obtained from "validateAuthResponse()", or "validateJwtAuthResponse()', rt);
        rC(s10, '"redirectUri"');
        let o10 = nZ(n10, "code");
        if (!o10) throw rm('no authorization code in "callbackParameters"', nx);
        let c10 = new URLSearchParams(a10?.additionalParameters);
        return c10.set("redirect_uri", s10), c10.set("code", o10), i10 !== nm && (rC(i10, '"codeVerifier"'), c10.set("code_verifier", i10)), na(e10, t10, r10, "authorization_code", c10, a10);
      }
      let nb = { aud: "audience", c_hash: "code hash", client_id: "client id", exp: "expiration time", iat: "issued at", iss: "issuer", jti: "jwt id", nonce: "nonce", s_hash: "state hash", sub: "subject", ath: "access token hash", htm: "http method", htu: "http uri", cnf: "confirmation", auth_time: "authentication time" };
      function nv(e10, t10) {
        for (let r10 of e10) if (void 0 === t10.claims[r10]) throw rm(`JWT "${r10}" (${nb[r10]}) claim missing`, nx, { claims: t10.claims });
        return t10;
      }
      let n_ = Symbol(), nS = Symbol();
      async function nE(e10, t10, r10, n10) {
        return "string" == typeof n10?.expectedNonce || "number" == typeof n10?.maxAge || n10?.requireIdToken ? nk(e10, t10, r10, n10.expectedNonce, n10.maxAge, n10[rl], n10.recognizedTokenTypes) : nT(e10, t10, r10, n10?.[rl], n10?.recognizedTokenTypes);
      }
      async function nk(e10, t10, r10, n10, s10, i10, a10) {
        let o10 = [];
        switch (n10) {
          case void 0:
            n10 = n_;
            break;
          case n_:
            break;
          default:
            rC(n10, '"expectedNonce" argument'), o10.push("nonce");
        }
        switch (s10 ??= t10.default_max_age) {
          case void 0:
            s10 = nS;
            break;
          case nS:
            break;
          default:
            rP(s10, true, '"maxAge" argument'), o10.push("auth_time");
        }
        let c10 = await nh(e10, t10, r10, o10, i10, a10);
        rC(c10.id_token, '"response" body "id_token" property', nx, { body: c10 });
        let l10 = nu(c10);
        if (s10 !== nS) {
          let e11 = r$() + rD(t10), r11 = rU(t10);
          if (l10.auth_time + s10 < e11 - r11) throw rm("too much time has elapsed since the last End-User authentication", nU, { claims: l10, now: e11, tolerance: r11, claim: "auth_time" });
        }
        if (n10 === n_) {
          if (void 0 !== l10.nonce) throw rm('unexpected ID Token "nonce" claim value', n$, { expected: void 0, claims: l10, claim: "nonce" });
        } else if (l10.nonce !== n10) throw rm('unexpected ID Token "nonce" claim value', n$, { expected: n10, claims: l10, claim: "nonce" });
        return c10;
      }
      async function nT(e10, t10, r10, n10, s10) {
        let i10 = await nh(e10, t10, r10, void 0, n10, s10), a10 = nu(i10);
        if (a10) {
          if (void 0 !== t10.default_max_age) {
            rP(t10.default_max_age, true, '"client.default_max_age"');
            let e11 = r$() + rD(t10), r11 = rU(t10);
            if (a10.auth_time + t10.default_max_age < e11 - r11) throw rm("too much time has elapsed since the last End-User authentication", nU, { claims: a10, now: e11, tolerance: r11, claim: "auth_time" });
          }
          if (void 0 !== a10.nonce) throw rm('unexpected ID Token "nonce" claim value', n$, { expected: void 0, claims: a10, claim: "nonce" });
        }
        return i10;
      }
      let nA = "OAUTH_WWW_AUTHENTICATE_CHALLENGE", nP = "OAUTH_RESPONSE_BODY_ERROR", nC = "OAUTH_UNSUPPORTED_OPERATION", nO = "OAUTH_AUTHORIZATION_RESPONSE_ERROR", nR = "OAUTH_PARSE_ERROR", nx = "OAUTH_INVALID_RESPONSE", nI = "OAUTH_RESPONSE_IS_NOT_JSON", nN = "OAUTH_RESPONSE_IS_NOT_CONFORM", nj = "OAUTH_HTTP_REQUEST_FORBIDDEN", nD = "OAUTH_REQUEST_PROTOCOL_FORBIDDEN", nU = "OAUTH_JWT_TIMESTAMP_CHECK_FAILED", n$ = "OAUTH_JWT_CLAIM_COMPARISON_FAILED", nL = "OAUTH_JSON_ATTRIBUTE_COMPARISON_FAILED", nM = "OAUTH_KEY_SELECTION_FAILED", nH = "OAUTH_MISSING_SERVER_METADATA", nK = "OAUTH_INVALID_SERVER_METADATA";
      async function nW(e10, t10, r10, n10, s10, i10) {
        return rL(e10), rM(t10), rC(n10, '"grantType"'), na(e10, t10, r10, n10, new URLSearchParams(s10), i10);
      }
      async function nB(e10, t10, r10, n10) {
        return nh(e10, t10, r10, void 0, n10?.[rl], n10?.recognizedTokenTypes);
      }
      function nq(e10) {
        if (e10.bodyUsed) throw rn('"response" body has been used already', rt);
      }
      async function nJ(e10, t10) {
        rL(e10);
        let r10 = rV(e10, "jwks_uri", false, t10?.[rs] !== true), n10 = rS(t10?.headers);
        return n10.set("accept", "application/json"), n10.append("accept", "application/jwk-set+json"), (t10?.[ro] || fetch)(r10.href, { body: void 0, headers: Object.fromEntries(n10.entries()), method: "GET", redirect: "manual", signal: rE(r10, t10?.signal) });
      }
      async function nz(e10) {
        if (!re(e10, Response)) throw rn('"response" must be an instance of Response', rr);
        if (200 !== e10.status) throw rm('"response" is not a conform JSON Web Key Set response (unexpected HTTP status code)', nN, e10);
        nq(e10);
        let t10 = await n3(e10, (e11) => function(e12, ...t11) {
          if (!t11.includes(ns(e12))) throw rx(e12, ...t11);
        }(e11, "application/json", "application/jwk-set+json"));
        if (!Array.isArray(t10.keys)) throw rm('"response" body "keys" property must be an array', nx, { body: t10 });
        if (!Array.prototype.every.call(t10.keys, r_)) throw rm('"response" body "keys" property members must be JWK formatted objects', nx, { body: t10 });
        return t10;
      }
      function nV(e10) {
        let { algorithm: t10 } = e10;
        if ("number" != typeof t10.modulusLength || t10.modulusLength < 2048) throw new rg(`unsupported ${t10.name} modulusLength`, { cause: e10 });
      }
      function nF(e10) {
        switch (e10.algorithm.name) {
          case "ECDSA":
            return { name: e10.algorithm.name, hash: function(e11) {
              let { algorithm: t10 } = e11;
              switch (t10.namedCurve) {
                case "P-256":
                  return "SHA-256";
                case "P-384":
                  return "SHA-384";
                case "P-521":
                  return "SHA-512";
                default:
                  throw new rg("unsupported ECDSA namedCurve", { cause: e11 });
              }
            }(e10) };
          case "RSA-PSS":
            switch (nV(e10), e10.algorithm.hash.name) {
              case "SHA-256":
              case "SHA-384":
              case "SHA-512":
                return { name: e10.algorithm.name, saltLength: parseInt(e10.algorithm.hash.name.slice(-3), 10) >> 3 };
              default:
                throw new rg("unsupported RSA-PSS hash name", { cause: e10 });
            }
          case "RSASSA-PKCS1-v1_5":
            return nV(e10), e10.algorithm.name;
          case "ML-DSA-44":
          case "ML-DSA-65":
          case "ML-DSA-87":
          case "Ed25519":
            return e10.algorithm.name;
        }
        throw new rg("unsupported CryptoKey algorithm name", { cause: e10 });
      }
      async function nG(e10, t10, r10, n10, s10) {
        let i10, a10, { 0: o10, 1: c10, length: l10 } = e10.split(".");
        if (5 === l10) {
          if (void 0 !== s10) e10 = await s10(e10), { 0: o10, 1: c10, length: l10 } = e10.split(".");
          else throw new rg("JWE decryption is not configured", { cause: e10 });
        }
        if (3 !== l10) throw rm("Invalid JWT", nx, e10);
        try {
          i10 = JSON.parse(rp(rf(o10)));
        } catch (e11) {
          throw rm("failed to parse JWT Header body as base64url encoded JSON", nR, e11);
        }
        if (!r_(i10)) throw rm("JWT Header must be a top level object", nx, e10);
        if (t10(i10), void 0 !== i10.crit) throw new rg('no JWT "crit" header parameter extensions are supported', { cause: { header: i10 } });
        try {
          a10 = JSON.parse(rp(rf(c10)));
        } catch (e11) {
          throw rm("failed to parse JWT Payload body as base64url encoded JSON", nR, e11);
        }
        if (!r_(a10)) throw rm("JWT Payload must be a top level object", nx, e10);
        let u2 = r$() + r10;
        if (void 0 !== a10.exp) {
          if ("number" != typeof a10.exp) throw rm('unexpected JWT "exp" (expiration time) claim type', nx, { claims: a10 });
          if (a10.exp <= u2 - n10) throw rm('unexpected JWT "exp" (expiration time) claim value, expiration is past current timestamp', nU, { claims: a10, now: u2, tolerance: n10, claim: "exp" });
        }
        if (void 0 !== a10.iat && "number" != typeof a10.iat) throw rm('unexpected JWT "iat" (issued at) claim type', nx, { claims: a10 });
        if (void 0 !== a10.iss && "string" != typeof a10.iss) throw rm('unexpected JWT "iss" (issuer) claim type', nx, { claims: a10 });
        if (void 0 !== a10.nbf) {
          if ("number" != typeof a10.nbf) throw rm('unexpected JWT "nbf" (not before) claim type', nx, { claims: a10 });
          if (a10.nbf > u2 + n10) throw rm('unexpected JWT "nbf" (not before) claim value', nU, { claims: a10, now: u2, tolerance: n10, claim: "nbf" });
        }
        if (void 0 !== a10.aud && "string" != typeof a10.aud && !Array.isArray(a10.aud)) throw rm('unexpected JWT "aud" (audience) claim type', nx, { claims: a10 });
        return { header: i10, claims: a10, jwt: e10 };
      }
      async function nY(e10, t10, r10) {
        let n10;
        switch (t10.alg) {
          case "RS256":
          case "PS256":
          case "ES256":
            n10 = "SHA-256";
            break;
          case "RS384":
          case "PS384":
          case "ES384":
            n10 = "SHA-384";
            break;
          case "RS512":
          case "PS512":
          case "ES512":
          case "Ed25519":
          case "EdDSA":
            n10 = "SHA-512";
            break;
          case "ML-DSA-44":
          case "ML-DSA-65":
          case "ML-DSA-87":
            n10 = { name: "cSHAKE256", length: 512 };
            break;
          default:
            throw new rg(`unsupported JWS algorithm for ${r10} calculation`, { cause: { alg: t10.alg } });
        }
        let s10 = await crypto.subtle.digest(n10, rp(e10));
        return rf(s10.slice(0, s10.byteLength / 2));
      }
      async function nX(e10) {
        if (e10.bodyUsed) throw rn("form_post Request instances must contain a readable body", rt, { cause: e10 });
        return e10.text();
      }
      function nQ(e10, t10, r10, n10) {
        if (void 0 !== e10) {
          if ("string" == typeof e10 ? n10.alg !== e10 : !e10.includes(n10.alg)) throw rm('unexpected JWT "alg" header parameter', nx, { header: n10, expected: e10, reason: "client configuration" });
          return;
        }
        if (Array.isArray(t10)) {
          if (!t10.includes(n10.alg)) throw rm('unexpected JWT "alg" header parameter', nx, { header: n10, expected: t10, reason: "authorization server metadata" });
          return;
        }
        if (void 0 !== r10) {
          if ("string" == typeof r10 ? n10.alg !== r10 : "function" == typeof r10 ? !r10(n10.alg) : !r10.includes(n10.alg)) throw rm('unexpected JWT "alg" header parameter', nx, { header: n10, expected: r10, reason: "default value" });
          return;
        }
        throw rm('missing client or server configuration to verify used JWT "alg" header parameter', void 0, { client: e10, issuer: t10, fallback: r10 });
      }
      function nZ(e10, t10) {
        let { 0: r10, length: n10 } = e10.getAll(t10);
        if (n10 > 1) throw rm(`"${t10}" parameter must be provided only once`, nx);
        return r10;
      }
      let n0 = Symbol(), n1 = Symbol();
      async function n2(e10, t10) {
        let { ext: r10, key_ops: n10, use: s10, ...i10 } = t10;
        return crypto.subtle.importKey("jwk", i10, function(e11) {
          switch (e11) {
            case "PS256":
            case "PS384":
            case "PS512":
              return { name: "RSA-PSS", hash: `SHA-${e11.slice(-3)}` };
            case "RS256":
            case "RS384":
            case "RS512":
              return { name: "RSASSA-PKCS1-v1_5", hash: `SHA-${e11.slice(-3)}` };
            case "ES256":
            case "ES384":
              return { name: "ECDSA", namedCurve: `P-${e11.slice(-3)}` };
            case "ES512":
              return { name: "ECDSA", namedCurve: "P-521" };
            case "EdDSA":
              return "Ed25519";
            case "Ed25519":
            case "ML-DSA-44":
            case "ML-DSA-65":
            case "ML-DSA-87":
              return e11;
            default:
              throw new rg("unsupported JWS algorithm", { cause: { alg: e11 } });
          }
        }(e10), true, ["verify"]);
      }
      async function n5(e10, t10, r10, n10, s10) {
        rL(e10), rM(t10);
        let i10 = rV(e10, "backchannel_authentication_endpoint", t10.use_mtls_endpoint_aliases, s10?.[rs] !== true), a10 = new URLSearchParams(n10);
        a10.set("client_id", t10.client_id);
        let o10 = rS(s10?.headers);
        return o10.set("accept", "application/json"), ni(e10, t10, r10, i10, a10, o10, s10);
      }
      async function n8(e10, t10, r10) {
        if (rL(e10), rM(t10), !re(r10, Response)) throw rn('"response" must be an instance of Response', rr);
        await r9(r10, 200, "Backchannel Authentication Endpoint"), nq(r10);
        let n10 = await n3(r10);
        rC(n10.auth_req_id, '"response" body "auth_req_id" property', nx, { body: n10 });
        let s10 = "number" != typeof n10.expires_in ? parseFloat(n10.expires_in) : n10.expires_in;
        return rP(s10, true, '"response" body "expires_in" property', nx, { body: n10 }), n10.expires_in = s10, void 0 !== n10.interval && rP(n10.interval, false, '"response" body "interval" property', nx, { body: n10 }), n10;
      }
      async function n6(e10, t10, r10, n10, s10) {
        rL(e10), rM(t10), rC(n10, '"authReqId"');
        let i10 = new URLSearchParams(s10?.additionalParameters);
        return i10.set("auth_req_id", n10), na(e10, t10, r10, "urn:openid:params:grant-type:ciba", i10, s10);
      }
      async function n4(e10, t10, r10, n10) {
        return nh(e10, t10, r10, void 0, n10?.[rl], n10?.recognizedTokenTypes);
      }
      async function n3(e10, t10 = rR) {
        let r10;
        try {
          r10 = await e10.json();
        } catch (r11) {
          throw t10(e10), rm('failed to parse "response" body as JSON', nR, r11);
        }
        if (!r_(r10)) throw rm('"response" body must be a top level object', nx, { body: r10 });
        return r10;
      }
      let n9 = Symbol(), n7 = Symbol();
      function se() {
        return "string" == typeof globalThis.EdgeRuntime;
      }
      let st = async (e10) => {
        let t10 = e10?.delay ?? 100, r10 = e10?.jitter ?? true, n10 = t10;
        r10 && (n10 = t10 * (0.5 + 0.5 * Math.random())), await new Promise((e11) => setTimeout(e11, n10));
      };
      async function sr(e10, t10) {
        if (!t10?.isDPoPEnabled) return await e10();
        try {
          let r10 = await e10();
          if (r10 instanceof Response && 400 === r10.status) try {
            let n10 = await r10.clone().json();
            if ("use_dpop_nonce" === n10.error) return await st(t10), await e10();
          } catch {
          }
          return r10;
        } catch (r10) {
          if (rY(r10)) return await st(t10), await e10();
          throw r10;
        }
      }
      let sn = (e10) => e10 instanceof Request || e10.headers instanceof Headers || "boolean" == typeof e10.bodyUsed;
      function ss(e10, t10) {
        if (e10) {
          if ("string" == typeof e10) return e10;
          if (!t10) throw new tG("When defining scope as a Map, an audience is required to look up the correct scope.");
          return e10[t10];
        }
      }
      function si(e10, t10) {
        return { accessToken: e10.accessToken, expiresAt: e10.expiresAt, audience: t10.audience, scope: e10.scope, requestedScope: e10.requestedScope, ...e10.token_type && { token_type: e10.token_type } };
      }
      function sa(e10) {
        return e10 ? e10.trim().split(" ").filter(Boolean) : [];
      }
      let so = (e10, t10, r10 = {}) => {
        if (e10 === t10) return true;
        if (!e10 || !t10) return false;
        let n10 = new Set(sa(e10)), s10 = new Set(sa(t10)), i10 = Array.from(s10).every((e11) => n10.has(e11));
        return r10.strict ? i10 && n10.size === s10.size : i10;
      };
      function sc(e10, t10) {
        return Array.from(/* @__PURE__ */ new Set([...e10 ? sa(e10) : [], ...t10 ? sa(t10) : []])).join(" ");
      }
      function sl(e10, t10) {
        let r10 = t10.matchMode ?? "requestedScope", n10 = e10?.accessTokens;
        if (!n10 || 0 === n10.length) return;
        let s10 = n10.filter((e11) => e11.audience === t10.audience && so("scope" === r10 ? e11.scope : e11.requestedScope ?? e11.scope, t10.scope, { strict: "scope" === r10 }));
        if (0 !== s10.length) return s10.sort((e11, t11) => {
          let r11 = new Set(sa(e11.scope)), n11 = new Set(sa(t11.scope));
          return r11.size - n11.size;
        }), s10[0];
      }
      function su(e10, t10, r10) {
        if (r10) return { accessTokens: r10.accessTokens, tokenSet: { ...e10.tokenSet, idToken: t10.idToken, refreshToken: t10.refreshToken } };
      }
      function sh(e10, t10, r10) {
        let n10 = ss(r10.scope, t10.audience ?? r10.audience);
        if (function(e11, t11, r11, n11) {
          let s11 = !e11.audience || e11.audience === (t11.tokenSet.audience ?? n11.audience), i11 = !e11.requestedScope || so(t11.tokenSet.requestedScope ?? r11, e11.requestedScope);
          return s11 && i11;
        }(t10, e10, n10, r10)) return function(e11, t11) {
          if (e11.accessToken !== t11.tokenSet.accessToken || e11.expiresAt !== t11.tokenSet.expiresAt || e11.refreshToken !== t11.tokenSet.refreshToken) return { tokenSet: e11 };
        }(t10, e10);
        let s10 = t10.audience ?? r10.audience, i10 = t10.requestedScope ?? n10 ?? void 0;
        if (s10) return function(e11, t11, r11, n11) {
          var s11;
          let i11 = sl(e11, { scope: n11, audience: r11, matchMode: "requestedScope" });
          if (i11) {
            let n12 = function(e12, t12, r12, n13) {
              if (t12.accessToken !== r12.accessToken) return { accessTokens: e12.accessTokens?.map((e13) => e13 === r12 ? si(t12, { audience: n13 }) : e13) };
            }(e11, t11, i11, r11);
            return su(e11, t11, n12);
          }
          if (i11 = sl(e11, { scope: t11.scope, audience: r11, matchMode: "scope" })) {
            let n12 = (s11 = i11, { accessTokens: e11.accessTokens?.map((e12) => e12 === s11 ? si({ ...t11, requestedScope: sc(e12.requestedScope, t11.requestedScope), scope: t11.scope }, { audience: r11 }) : e12) });
            return su(e11, t11, n12);
          }
          {
            let n12 = { accessTokens: [...e11.accessTokens || [], si(t11, { audience: r11 })] };
            return su(e11, t11, n12);
          }
        }(e10, t10, s10, i10);
      }
      function sd(e10, t10, ...r10) {
        if ((r10 = r10.filter(Boolean)).length > 2) {
          let t11 = r10.pop();
          e10 += `one of type ${r10.join(", ")}, or ${t11}.`;
        } else 2 === r10.length ? e10 += `one of type ${r10[0]} or ${r10[1]}.` : e10 += `of type ${r10[0]}.`;
        return null == t10 ? e10 += ` Received ${t10}` : "function" == typeof t10 && t10.name ? e10 += ` Received function ${t10.name}` : "object" == typeof t10 && null != t10 && t10.constructor?.name && (e10 += ` Received an instance of ${t10.constructor.name}`), e10;
      }
      let sp = (e10, ...t10) => sd("Key must be ", e10, ...t10), sf = (e10, t10, ...r10) => sd(`Key for the ${e10} algorithm must be `, t10, ...r10), sg = new TextEncoder(), sy = new TextDecoder();
      function sm(...e10) {
        let t10 = new Uint8Array(e10.reduce((e11, { length: t11 }) => e11 + t11, 0)), r10 = 0;
        for (let n10 of e10) t10.set(n10, r10), r10 += n10.length;
        return t10;
      }
      function sw(e10, t10, r10) {
        if (t10 < 0 || t10 >= 4294967296) throw RangeError(`value must be >= 0 and <= ${4294967296 - 1}. Received ${t10}`);
        e10.set([t10 >>> 24, t10 >>> 16, t10 >>> 8, 255 & t10], r10);
      }
      function sb(e10) {
        let t10 = Math.floor(e10 / 4294967296), r10 = new Uint8Array(8);
        return sw(r10, t10, 0), sw(r10, e10 % 4294967296, 4), r10;
      }
      function sv(e10) {
        let t10 = new Uint8Array(4);
        return sw(t10, e10), t10;
      }
      function s_(e10) {
        let t10 = new Uint8Array(e10.length);
        for (let r10 = 0; r10 < e10.length; r10++) {
          let n10 = e10.charCodeAt(r10);
          if (n10 > 127) throw TypeError("non-ASCII string encountered in encode()");
          t10[r10] = n10;
        }
        return t10;
      }
      function sS(e10) {
        if (Uint8Array.fromBase64) return Uint8Array.fromBase64(e10);
        let t10 = atob(e10), r10 = new Uint8Array(t10.length);
        for (let e11 = 0; e11 < t10.length; e11++) r10[e11] = t10.charCodeAt(e11);
        return r10;
      }
      function sE(e10) {
        if (Uint8Array.fromBase64) return Uint8Array.fromBase64("string" == typeof e10 ? e10 : sy.decode(e10), { alphabet: "base64url" });
        let t10 = e10;
        t10 instanceof Uint8Array && (t10 = sy.decode(t10)), t10 = t10.replace(/-/g, "+").replace(/_/g, "/");
        try {
          return sS(t10);
        } catch {
          throw TypeError("The input to be decoded is not correctly encoded.");
        }
      }
      function sk(e10) {
        let t10 = e10;
        return ("string" == typeof t10 && (t10 = sg.encode(t10)), Uint8Array.prototype.toBase64) ? t10.toBase64({ alphabet: "base64url", omitPadding: true }) : function(e11) {
          if (Uint8Array.prototype.toBase64) return e11.toBase64();
          let t11 = [];
          for (let r10 = 0; r10 < e11.length; r10 += 32768) t11.push(String.fromCharCode.apply(null, e11.subarray(r10, r10 + 32768)));
          return btoa(t11.join(""));
        }(t10).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
      }
      function sT(e10) {
        if (!sA(e10)) throw Error("CryptoKey instance expected");
      }
      let sA = (e10) => {
        if (e10?.[Symbol.toStringTag] === "CryptoKey") return true;
        try {
          return e10 instanceof CryptoKey;
        } catch {
          return false;
        }
      }, sP = (e10) => e10?.[Symbol.toStringTag] === "KeyObject", sC = (e10) => sA(e10) || sP(e10);
      async function sO(e10) {
        if (sP(e10)) {
          if ("secret" !== e10.type) return e10.export({ format: "jwk" });
          e10 = e10.export();
        }
        if (e10 instanceof Uint8Array) return { kty: "oct", k: sk(e10) };
        if (!sA(e10)) throw TypeError(sp(e10, "CryptoKey", "KeyObject", "Uint8Array"));
        if (!e10.extractable) throw TypeError("non-extractable CryptoKey cannot be exported as a JWK");
        let { ext: t10, key_ops: r10, alg: n10, use: s10, ...i10 } = await crypto.subtle.exportKey("jwk", e10);
        return "AKP" === i10.kty && (i10.alg = n10), i10;
      }
      async function sR(e10) {
        return sO(e10);
      }
      async function sx(e10, t10) {
        let r10 = `SHA-${e10.slice(-3)}`;
        return new Uint8Array(await crypto.subtle.digest(r10, t10));
      }
      class sI extends Error {
        static code = "ERR_JOSE_GENERIC";
        code = "ERR_JOSE_GENERIC";
        constructor(e10, t10) {
          super(e10, t10), this.name = this.constructor.name, Error.captureStackTrace?.(this, this.constructor);
        }
      }
      class sN extends sI {
        static code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
        code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
        claim;
        reason;
        payload;
        constructor(e10, t10, r10 = "unspecified", n10 = "unspecified") {
          super(e10, { cause: { claim: r10, reason: n10, payload: t10 } }), this.claim = r10, this.reason = n10, this.payload = t10;
        }
      }
      class sj extends sI {
        static code = "ERR_JWT_EXPIRED";
        code = "ERR_JWT_EXPIRED";
        claim;
        reason;
        payload;
        constructor(e10, t10, r10 = "unspecified", n10 = "unspecified") {
          super(e10, { cause: { claim: r10, reason: n10, payload: t10 } }), this.claim = r10, this.reason = n10, this.payload = t10;
        }
      }
      class sD extends sI {
        static code = "ERR_JOSE_ALG_NOT_ALLOWED";
        code = "ERR_JOSE_ALG_NOT_ALLOWED";
      }
      class sU extends sI {
        static code = "ERR_JOSE_NOT_SUPPORTED";
        code = "ERR_JOSE_NOT_SUPPORTED";
      }
      class s$ extends sI {
        static code = "ERR_JWE_DECRYPTION_FAILED";
        code = "ERR_JWE_DECRYPTION_FAILED";
        constructor(e10 = "decryption operation failed", t10) {
          super(e10, t10);
        }
      }
      class sL extends sI {
        static code = "ERR_JWE_INVALID";
        code = "ERR_JWE_INVALID";
      }
      class sM extends sI {
        static code = "ERR_JWS_INVALID";
        code = "ERR_JWS_INVALID";
      }
      class sH extends sI {
        static code = "ERR_JWT_INVALID";
        code = "ERR_JWT_INVALID";
      }
      class sK extends sI {
        static code = "ERR_JWK_INVALID";
        code = "ERR_JWK_INVALID";
      }
      class sW extends sI {
        static code = "ERR_JWKS_INVALID";
        code = "ERR_JWKS_INVALID";
      }
      class sB extends sI {
        static code = "ERR_JWKS_NO_MATCHING_KEY";
        code = "ERR_JWKS_NO_MATCHING_KEY";
        constructor(e10 = "no applicable key found in the JSON Web Key Set", t10) {
          super(e10, t10);
        }
      }
      class sq extends sI {
        [Symbol.asyncIterator];
        static code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
        code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
        constructor(e10 = "multiple matching keys found in the JSON Web Key Set", t10) {
          super(e10, t10);
        }
      }
      class sJ extends sI {
        static code = "ERR_JWKS_TIMEOUT";
        code = "ERR_JWKS_TIMEOUT";
        constructor(e10 = "request timed out", t10) {
          super(e10, t10);
        }
      }
      class sz extends sI {
        static code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
        code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
        constructor(e10 = "signature verification failed", t10) {
          super(e10, t10);
        }
      }
      let sV = (e10) => "object" == typeof e10 && null !== e10;
      function sF(e10) {
        if (!sV(e10) || "[object Object]" !== Object.prototype.toString.call(e10)) return false;
        if (null === Object.getPrototypeOf(e10)) return true;
        let t10 = e10;
        for (; null !== Object.getPrototypeOf(t10); ) t10 = Object.getPrototypeOf(t10);
        return Object.getPrototypeOf(e10) === t10;
      }
      let sG = (e10) => sF(e10) && "string" == typeof e10.kty, sY = (e10) => "oct" !== e10.kty && ("AKP" === e10.kty && "string" == typeof e10.priv || "string" == typeof e10.d), sX = (e10) => "oct" !== e10.kty && void 0 === e10.d && void 0 === e10.priv, sQ = (e10) => "oct" === e10.kty && "string" == typeof e10.k, sZ = (e10, t10) => {
        if ("string" != typeof e10 || !e10) throw new sK(`${t10} missing or invalid`);
      };
      async function s0(e10, t10) {
        let r10, n10;
        if (sG(e10)) r10 = e10;
        else if (sC(e10)) r10 = await sR(e10);
        else throw TypeError(sp(e10, "CryptoKey", "KeyObject", "JSON Web Key"));
        if ("sha256" !== (t10 ??= "sha256") && "sha384" !== t10 && "sha512" !== t10) throw TypeError('digestAlgorithm must one of "sha256", "sha384", or "sha512"');
        switch (r10.kty) {
          case "AKP":
            sZ(r10.alg, '"alg" (Algorithm) Parameter'), sZ(r10.pub, '"pub" (Public key) Parameter'), n10 = { alg: r10.alg, kty: r10.kty, pub: r10.pub };
            break;
          case "EC":
            sZ(r10.crv, '"crv" (Curve) Parameter'), sZ(r10.x, '"x" (X Coordinate) Parameter'), sZ(r10.y, '"y" (Y Coordinate) Parameter'), n10 = { crv: r10.crv, kty: r10.kty, x: r10.x, y: r10.y };
            break;
          case "OKP":
            sZ(r10.crv, '"crv" (Subtype of Key Pair) Parameter'), sZ(r10.x, '"x" (Public Key) Parameter'), n10 = { crv: r10.crv, kty: r10.kty, x: r10.x };
            break;
          case "RSA":
            sZ(r10.e, '"e" (Exponent) Parameter'), sZ(r10.n, '"n" (Modulus) Parameter'), n10 = { e: r10.e, kty: r10.kty, n: r10.n };
            break;
          case "oct":
            sZ(r10.k, '"k" (Key Value) Parameter'), n10 = { k: r10.k, kty: r10.kty };
            break;
          default:
            throw new sU('"kty" (Key Type) Parameter missing or unsupported');
        }
        let s10 = s_(JSON.stringify(n10));
        return sk(await sx(t10, s10));
      }
      let s1 = (e10, t10) => {
        if (e10.byteLength !== t10.length) return false;
        for (let r10 = 0; r10 < e10.byteLength; r10++) if (e10[r10] !== t10[r10]) return false;
        return true;
      }, s2 = (e10) => ({ data: e10, pos: 0 }), s5 = (e10) => {
        let t10 = e10.data[e10.pos++];
        if (128 & t10) {
          let r10 = 127 & t10, n10 = 0;
          for (let t11 = 0; t11 < r10; t11++) n10 = n10 << 8 | e10.data[e10.pos++];
          return n10;
        }
        return t10;
      }, s8 = (e10, t10, r10) => {
        if (e10.data[e10.pos++] !== t10) throw Error(r10);
      }, s6 = (e10, t10) => {
        let r10 = e10.data.subarray(e10.pos, e10.pos + t10);
        return e10.pos += t10, r10;
      }, s4 = (e10) => {
        s8(e10, 6, "Expected algorithm OID");
        let t10 = s5(e10);
        return s6(e10, t10);
      }, s3 = (e10) => {
        let t10 = s4(e10);
        if (s1(t10, [43, 101, 110])) return "X25519";
        if (!s1(t10, [42, 134, 72, 206, 61, 2, 1])) throw Error("Unsupported key algorithm");
        s8(e10, 6, "Expected curve OID");
        let r10 = s5(e10), n10 = s6(e10, r10);
        for (let { name: e11, oid: t11 } of [{ name: "P-256", oid: [42, 134, 72, 206, 61, 3, 1, 7] }, { name: "P-384", oid: [43, 129, 4, 0, 34] }, { name: "P-521", oid: [43, 129, 4, 0, 35] }]) if (s1(n10, t11)) return e11;
        throw Error("Unsupported named curve");
      }, s9 = async (e10, t10, r10, n10) => {
        let s10, i10;
        let a10 = "spki" === e10, o10 = () => a10 ? ["verify"] : ["sign"];
        switch (r10) {
          case "PS256":
          case "PS384":
          case "PS512":
            s10 = { name: "RSA-PSS", hash: `SHA-${r10.slice(-3)}` }, i10 = o10();
            break;
          case "RS256":
          case "RS384":
          case "RS512":
            s10 = { name: "RSASSA-PKCS1-v1_5", hash: `SHA-${r10.slice(-3)}` }, i10 = o10();
            break;
          case "RSA-OAEP":
          case "RSA-OAEP-256":
          case "RSA-OAEP-384":
          case "RSA-OAEP-512":
            s10 = { name: "RSA-OAEP", hash: `SHA-${parseInt(r10.slice(-3), 10) || 1}` }, i10 = a10 ? ["encrypt", "wrapKey"] : ["decrypt", "unwrapKey"];
            break;
          case "ES256":
          case "ES384":
          case "ES512":
            s10 = { name: "ECDSA", namedCurve: { ES256: "P-256", ES384: "P-384", ES512: "P-521" }[r10] }, i10 = o10();
            break;
          case "ECDH-ES":
          case "ECDH-ES+A128KW":
          case "ECDH-ES+A192KW":
          case "ECDH-ES+A256KW":
            try {
              let e11 = n10.getNamedCurve(t10);
              s10 = "X25519" === e11 ? { name: "X25519" } : { name: "ECDH", namedCurve: e11 };
            } catch (e11) {
              throw new sU("Invalid or unsupported key format");
            }
            i10 = a10 ? [] : ["deriveBits"];
            break;
          case "Ed25519":
          case "EdDSA":
            s10 = { name: "Ed25519" }, i10 = o10();
            break;
          case "ML-DSA-44":
          case "ML-DSA-65":
          case "ML-DSA-87":
            s10 = { name: r10 }, i10 = o10();
            break;
          default:
            throw new sU('Invalid or unsupported "alg" (Algorithm) value');
        }
        return crypto.subtle.importKey(e10, t10, s10, n10?.extractable ?? !!a10, i10);
      }, s7 = (e10, t10) => sS(e10.replace(t10, "")), ie = (e10, t10, r10) => {
        let n10 = s7(e10, /(?:-----(?:BEGIN|END) PRIVATE KEY-----|\s)/g), s10 = r10;
        return t10?.startsWith?.("ECDH-ES") && ((s10 ||= {}).getNamedCurve = (e11) => {
          let t11 = s2(e11);
          return function(e12) {
            s8(e12, 48, "Invalid PKCS#8 structure"), s5(e12), s8(e12, 2, "Expected version field");
            let t12 = s5(e12);
            e12.pos += t12, s8(e12, 48, "Expected algorithm identifier"), s5(e12), e12.pos;
          }(t11), s3(t11);
        }), s9("pkcs8", n10, t10, s10);
      };
      async function it(e10) {
        if (!e10.alg) throw TypeError('"alg" argument is required when "jwk.alg" is not present');
        let { algorithm: t10, keyUsages: r10 } = function(e11) {
          let t11, r11;
          switch (e11.kty) {
            case "AKP":
              switch (e11.alg) {
                case "ML-DSA-44":
                case "ML-DSA-65":
                case "ML-DSA-87":
                  t11 = { name: e11.alg }, r11 = e11.priv ? ["sign"] : ["verify"];
                  break;
                default:
                  throw new sU('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
              }
              break;
            case "RSA":
              switch (e11.alg) {
                case "PS256":
                case "PS384":
                case "PS512":
                  t11 = { name: "RSA-PSS", hash: `SHA-${e11.alg.slice(-3)}` }, r11 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "RS256":
                case "RS384":
                case "RS512":
                  t11 = { name: "RSASSA-PKCS1-v1_5", hash: `SHA-${e11.alg.slice(-3)}` }, r11 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "RSA-OAEP":
                case "RSA-OAEP-256":
                case "RSA-OAEP-384":
                case "RSA-OAEP-512":
                  t11 = { name: "RSA-OAEP", hash: `SHA-${parseInt(e11.alg.slice(-3), 10) || 1}` }, r11 = e11.d ? ["decrypt", "unwrapKey"] : ["encrypt", "wrapKey"];
                  break;
                default:
                  throw new sU('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
              }
              break;
            case "EC":
              switch (e11.alg) {
                case "ES256":
                  t11 = { name: "ECDSA", namedCurve: "P-256" }, r11 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "ES384":
                  t11 = { name: "ECDSA", namedCurve: "P-384" }, r11 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "ES512":
                  t11 = { name: "ECDSA", namedCurve: "P-521" }, r11 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "ECDH-ES":
                case "ECDH-ES+A128KW":
                case "ECDH-ES+A192KW":
                case "ECDH-ES+A256KW":
                  t11 = { name: "ECDH", namedCurve: e11.crv }, r11 = e11.d ? ["deriveBits"] : [];
                  break;
                default:
                  throw new sU('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
              }
              break;
            case "OKP":
              switch (e11.alg) {
                case "Ed25519":
                case "EdDSA":
                  t11 = { name: "Ed25519" }, r11 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "ECDH-ES":
                case "ECDH-ES+A128KW":
                case "ECDH-ES+A192KW":
                case "ECDH-ES+A256KW":
                  t11 = { name: e11.crv }, r11 = e11.d ? ["deriveBits"] : [];
                  break;
                default:
                  throw new sU('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
              }
              break;
            default:
              throw new sU('Invalid or unsupported JWK "kty" (Key Type) Parameter value');
          }
          return { algorithm: t11, keyUsages: r11 };
        }(e10), n10 = { ...e10 };
        return "AKP" !== n10.kty && delete n10.alg, delete n10.use, crypto.subtle.importKey("jwk", n10, t10, e10.ext ?? (!e10.d && !e10.priv), e10.key_ops ?? r10);
      }
      async function ir(e10, t10, r10) {
        if ("string" != typeof e10 || 0 !== e10.indexOf("-----BEGIN PRIVATE KEY-----")) throw TypeError('"pkcs8" must be PKCS#8 formatted string');
        return ie(e10, t10, r10);
      }
      async function is(e10, t10, r10) {
        let n10;
        if (!sF(e10)) throw TypeError("JWK must be an object");
        switch (t10 ??= e10.alg, n10 ??= r10?.extractable ?? e10.ext, e10.kty) {
          case "oct":
            if ("string" != typeof e10.k || !e10.k) throw TypeError('missing "k" (Key Value) Parameter value');
            return sE(e10.k);
          case "RSA":
            if ("oth" in e10 && void 0 !== e10.oth) throw new sU('RSA JWK "oth" (Other Primes Info) Parameter value is not supported');
            return it({ ...e10, alg: t10, ext: n10 });
          case "AKP":
            if ("string" != typeof e10.alg || !e10.alg) throw TypeError('missing "alg" (Algorithm) Parameter value');
            if (void 0 !== t10 && t10 !== e10.alg) throw TypeError("JWK alg and alg option value mismatch");
            return it({ ...e10, ext: n10 });
          case "EC":
          case "OKP":
            return it({ ...e10, alg: t10, ext: n10 });
          default:
            throw new sU('Unsupported "kty" (Key Type) Parameter value');
        }
      }
      function ii(e10) {
        return sF(e10);
      }
      class ia {
        #l;
        #u = /* @__PURE__ */ new WeakMap();
        constructor(e10) {
          if (!function(e11) {
            return e11 && "object" == typeof e11 && Array.isArray(e11.keys) && e11.keys.every(ii);
          }(e10)) throw new sW("JSON Web Key Set malformed");
          this.#l = structuredClone(e10);
        }
        jwks() {
          return this.#l;
        }
        async getKey(e10, t10) {
          let { alg: r10, kid: n10 } = { ...e10, ...t10?.header }, s10 = function(e11) {
            switch ("string" == typeof e11 && e11.slice(0, 2)) {
              case "RS":
              case "PS":
                return "RSA";
              case "ES":
                return "EC";
              case "Ed":
                return "OKP";
              case "ML":
                return "AKP";
              default:
                throw new sU('Unsupported "alg" value for a JSON Web Key Set');
            }
          }(r10), i10 = this.#l.keys.filter((e11) => {
            let t11 = s10 === e11.kty;
            if (t11 && "string" == typeof n10 && (t11 = n10 === e11.kid), t11 && ("string" == typeof e11.alg || "AKP" === s10) && (t11 = r10 === e11.alg), t11 && "string" == typeof e11.use && (t11 = "sig" === e11.use), t11 && Array.isArray(e11.key_ops) && (t11 = e11.key_ops.includes("verify")), t11) switch (r10) {
              case "ES256":
                t11 = "P-256" === e11.crv;
                break;
              case "ES384":
                t11 = "P-384" === e11.crv;
                break;
              case "ES512":
                t11 = "P-521" === e11.crv;
                break;
              case "Ed25519":
              case "EdDSA":
                t11 = "Ed25519" === e11.crv;
            }
            return t11;
          }), { 0: a10, length: o10 } = i10;
          if (0 === o10) throw new sB();
          if (1 !== o10) {
            let e11 = new sq(), t11 = this.#u;
            throw e11[Symbol.asyncIterator] = async function* () {
              for (let e12 of i10) try {
                yield await io(t11, e12, r10);
              } catch {
              }
            }, e11;
          }
          return io(this.#u, a10, r10);
        }
      }
      async function io(e10, t10, r10) {
        let n10 = e10.get(t10) || e10.set(t10, {}).get(t10);
        if (void 0 === n10[r10]) {
          let e11 = await is({ ...t10, ext: true }, r10);
          if (e11 instanceof Uint8Array || "public" !== e11.type) throw new sW("JSON Web Key Set members must be public keys");
          n10[r10] = e11;
        }
        return n10[r10];
      }
      function ic(e10) {
        let t10 = new ia(e10), r10 = async (e11, r11) => t10.getKey(e11, r11);
        return Object.defineProperties(r10, { jwks: { value: () => structuredClone(t10.jwks()), enumerable: false, configurable: false, writable: false } }), r10;
      }
      "undefined" != typeof navigator && navigator.userAgent?.startsWith?.("Mozilla/5.0 ") || (l = "jose/v6.1.3");
      let il = Symbol();
      async function iu(e10, t10, r10, n10 = fetch) {
        let s10 = await n10(e10, { method: "GET", signal: r10, redirect: "manual", headers: t10 }).catch((e11) => {
          if ("TimeoutError" === e11.name) throw new sJ();
          throw e11;
        });
        if (200 !== s10.status) throw new sI("Expected 200 OK from the JSON Web Key Set HTTP response");
        try {
          return await s10.json();
        } catch {
          throw new sI("Failed to parse the JSON Web Key Set HTTP response as JSON");
        }
      }
      let ih = Symbol();
      class id {
        #h;
        #d;
        #p;
        #f;
        #g;
        #y;
        #m;
        #w;
        #b;
        #v;
        constructor(e10, t10) {
          if (!(e10 instanceof URL)) throw TypeError("url must be an instance of URL");
          this.#h = new URL(e10.href), this.#d = "number" == typeof t10?.timeoutDuration ? t10?.timeoutDuration : 5e3, this.#p = "number" == typeof t10?.cooldownDuration ? t10?.cooldownDuration : 3e4, this.#f = "number" == typeof t10?.cacheMaxAge ? t10?.cacheMaxAge : 6e5, this.#m = new Headers(t10?.headers), l && !this.#m.has("User-Agent") && this.#m.set("User-Agent", l), this.#m.has("accept") || (this.#m.set("accept", "application/json"), this.#m.append("accept", "application/jwk-set+json")), this.#w = t10?.[il], t10?.[ih] !== void 0 && (this.#v = t10?.[ih], function(e11, t11) {
            return !!(!("object" != typeof e11 || null === e11 || !("uat" in e11) || "number" != typeof e11.uat || Date.now() - e11.uat >= t11) && "jwks" in e11 && sF(e11.jwks) && Array.isArray(e11.jwks.keys) && Array.prototype.every.call(e11.jwks.keys, sF));
          }(t10?.[ih], this.#f) && (this.#g = this.#v.uat, this.#b = ic(this.#v.jwks)));
        }
        pendingFetch() {
          return !!this.#y;
        }
        coolingDown() {
          return "number" == typeof this.#g && Date.now() < this.#g + this.#p;
        }
        fresh() {
          return "number" == typeof this.#g && Date.now() < this.#g + this.#f;
        }
        jwks() {
          return this.#b?.jwks();
        }
        async getKey(e10, t10) {
          this.#b && this.fresh() || await this.reload();
          try {
            return await this.#b(e10, t10);
          } catch (r10) {
            if (r10 instanceof sB && false === this.coolingDown()) return await this.reload(), this.#b(e10, t10);
            throw r10;
          }
        }
        async reload() {
          this.#y && ("undefined" != typeof WebSocketPair || "undefined" != typeof navigator && "Cloudflare-Workers" === navigator.userAgent) && (this.#y = void 0), this.#y ||= iu(this.#h.href, this.#m, AbortSignal.timeout(this.#d), this.#w).then((e10) => {
            this.#b = ic(e10), this.#v && (this.#v.uat = Date.now(), this.#v.jwks = e10), this.#g = Date.now(), this.#y = void 0;
          }).catch((e10) => {
            throw this.#y = void 0, e10;
          }), await this.#y;
        }
      }
      function ip(e10, t10) {
        if (e10.startsWith("RS") || e10.startsWith("PS")) {
          let { modulusLength: r10 } = t10.algorithm;
          if ("number" != typeof r10 || r10 < 2048) throw TypeError(`${e10} requires key modulusLength to be 2048 bits or larger`);
        }
      }
      let ig = (e10, t10 = "algorithm.name") => TypeError(`CryptoKey does not support this operation, its ${t10} must be ${e10}`), iy = (e10, t10) => e10.name === t10;
      function im(e10) {
        return parseInt(e10.name.slice(4), 10);
      }
      function iw(e10, t10) {
        if (t10 && !e10.usages.includes(t10)) throw TypeError(`CryptoKey does not support this operation, its usages must include ${t10}.`);
      }
      function ib(e10, t10, r10) {
        switch (t10) {
          case "A128GCM":
          case "A192GCM":
          case "A256GCM": {
            if (!iy(e10.algorithm, "AES-GCM")) throw ig("AES-GCM");
            let r11 = parseInt(t10.slice(1, 4), 10);
            if (e10.algorithm.length !== r11) throw ig(r11, "algorithm.length");
            break;
          }
          case "A128KW":
          case "A192KW":
          case "A256KW": {
            if (!iy(e10.algorithm, "AES-KW")) throw ig("AES-KW");
            let r11 = parseInt(t10.slice(1, 4), 10);
            if (e10.algorithm.length !== r11) throw ig(r11, "algorithm.length");
            break;
          }
          case "ECDH":
            switch (e10.algorithm.name) {
              case "ECDH":
              case "X25519":
                break;
              default:
                throw ig("ECDH or X25519");
            }
            break;
          case "PBES2-HS256+A128KW":
          case "PBES2-HS384+A192KW":
          case "PBES2-HS512+A256KW":
            if (!iy(e10.algorithm, "PBKDF2")) throw ig("PBKDF2");
            break;
          case "RSA-OAEP":
          case "RSA-OAEP-256":
          case "RSA-OAEP-384":
          case "RSA-OAEP-512": {
            if (!iy(e10.algorithm, "RSA-OAEP")) throw ig("RSA-OAEP");
            let r11 = parseInt(t10.slice(9), 10) || 1;
            if (im(e10.algorithm.hash) !== r11) throw ig(`SHA-${r11}`, "algorithm.hash");
            break;
          }
          default:
            throw TypeError("CryptoKey does not support this operation");
        }
        iw(e10, r10);
      }
      async function iv(e10, t10, r10) {
        if (t10 instanceof Uint8Array) {
          if (!e10.startsWith("HS")) throw TypeError(sp(t10, "CryptoKey", "KeyObject", "JSON Web Key"));
          return crypto.subtle.importKey("raw", t10, { hash: `SHA-${e10.slice(-3)}`, name: "HMAC" }, false, [r10]);
        }
        return !function(e11, t11, r11) {
          switch (t11) {
            case "HS256":
            case "HS384":
            case "HS512": {
              if (!iy(e11.algorithm, "HMAC")) throw ig("HMAC");
              let r12 = parseInt(t11.slice(2), 10);
              if (im(e11.algorithm.hash) !== r12) throw ig(`SHA-${r12}`, "algorithm.hash");
              break;
            }
            case "RS256":
            case "RS384":
            case "RS512": {
              if (!iy(e11.algorithm, "RSASSA-PKCS1-v1_5")) throw ig("RSASSA-PKCS1-v1_5");
              let r12 = parseInt(t11.slice(2), 10);
              if (im(e11.algorithm.hash) !== r12) throw ig(`SHA-${r12}`, "algorithm.hash");
              break;
            }
            case "PS256":
            case "PS384":
            case "PS512": {
              if (!iy(e11.algorithm, "RSA-PSS")) throw ig("RSA-PSS");
              let r12 = parseInt(t11.slice(2), 10);
              if (im(e11.algorithm.hash) !== r12) throw ig(`SHA-${r12}`, "algorithm.hash");
              break;
            }
            case "Ed25519":
            case "EdDSA":
              if (!iy(e11.algorithm, "Ed25519")) throw ig("Ed25519");
              break;
            case "ML-DSA-44":
            case "ML-DSA-65":
            case "ML-DSA-87":
              if (!iy(e11.algorithm, t11)) throw ig(t11);
              break;
            case "ES256":
            case "ES384":
            case "ES512": {
              if (!iy(e11.algorithm, "ECDSA")) throw ig("ECDSA");
              let r12 = function(e12) {
                switch (e12) {
                  case "ES256":
                    return "P-256";
                  case "ES384":
                    return "P-384";
                  case "ES512":
                    return "P-521";
                  default:
                    throw Error("unreachable");
                }
              }(t11);
              if (e11.algorithm.namedCurve !== r12) throw ig(r12, "algorithm.namedCurve");
              break;
            }
            default:
              throw TypeError("CryptoKey does not support this operation");
          }
          iw(e11, r11);
        }(t10, e10, r10), t10;
      }
      async function i_(e10, t10, r10, n10) {
        let s10 = await iv(e10, t10, "verify");
        ip(e10, s10);
        let i10 = function(e11, t11) {
          let r11 = `SHA-${e11.slice(-3)}`;
          switch (e11) {
            case "HS256":
            case "HS384":
            case "HS512":
              return { hash: r11, name: "HMAC" };
            case "PS256":
            case "PS384":
            case "PS512":
              return { hash: r11, name: "RSA-PSS", saltLength: parseInt(e11.slice(-3), 10) >> 3 };
            case "RS256":
            case "RS384":
            case "RS512":
              return { hash: r11, name: "RSASSA-PKCS1-v1_5" };
            case "ES256":
            case "ES384":
            case "ES512":
              return { hash: r11, name: "ECDSA", namedCurve: t11.namedCurve };
            case "Ed25519":
            case "EdDSA":
              return { name: "Ed25519" };
            case "ML-DSA-44":
            case "ML-DSA-65":
            case "ML-DSA-87":
              return { name: e11 };
            default:
              throw new sU(`alg ${e11} is not supported either by JOSE or your javascript runtime`);
          }
        }(e10, s10.algorithm);
        try {
          return await crypto.subtle.verify(i10, s10, r10, n10);
        } catch {
          return false;
        }
      }
      function iS(...e10) {
        let t10;
        let r10 = e10.filter(Boolean);
        if (0 === r10.length || 1 === r10.length) return true;
        for (let e11 of r10) {
          let r11 = Object.keys(e11);
          if (!t10 || 0 === t10.size) {
            t10 = new Set(r11);
            continue;
          }
          for (let e12 of r11) {
            if (t10.has(e12)) return false;
            t10.add(e12);
          }
        }
        return true;
      }
      let iE = (e10) => e10?.[Symbol.toStringTag], ik = (e10, t10, r10) => {
        if (void 0 !== t10.use) {
          let e11;
          switch (r10) {
            case "sign":
            case "verify":
              e11 = "sig";
              break;
            case "encrypt":
            case "decrypt":
              e11 = "enc";
          }
          if (t10.use !== e11) throw TypeError(`Invalid key for this operation, its "use" must be "${e11}" when present`);
        }
        if (void 0 !== t10.alg && t10.alg !== e10) throw TypeError(`Invalid key for this operation, its "alg" must be "${e10}" when present`);
        if (Array.isArray(t10.key_ops)) {
          let n10;
          switch (true) {
            case ("sign" === r10 || "verify" === r10):
            case "dir" === e10:
            case e10.includes("CBC-HS"):
              n10 = r10;
              break;
            case e10.startsWith("PBES2"):
              n10 = "deriveBits";
              break;
            case /^A\d{3}(?:GCM)?(?:KW)?$/.test(e10):
              n10 = !e10.includes("GCM") && e10.endsWith("KW") ? "encrypt" === r10 ? "wrapKey" : "unwrapKey" : r10;
              break;
            case ("encrypt" === r10 && e10.startsWith("RSA")):
              n10 = "wrapKey";
              break;
            case "decrypt" === r10:
              n10 = e10.startsWith("RSA") ? "unwrapKey" : "deriveBits";
          }
          if (n10 && t10.key_ops?.includes?.(n10) === false) throw TypeError(`Invalid key for this operation, its "key_ops" must include "${n10}" when present`);
        }
        return true;
      }, iT = (e10, t10, r10) => {
        if (!(t10 instanceof Uint8Array)) {
          if (sG(t10)) {
            if (sQ(t10) && ik(e10, t10, r10)) return;
            throw TypeError('JSON Web Key for symmetric algorithms must have JWK "kty" (Key Type) equal to "oct" and the JWK "k" (Key Value) present');
          }
          if (!sC(t10)) throw TypeError(sf(e10, t10, "CryptoKey", "KeyObject", "JSON Web Key", "Uint8Array"));
          if ("secret" !== t10.type) throw TypeError(`${iE(t10)} instances for symmetric algorithms must be of type "secret"`);
        }
      }, iA = (e10, t10, r10) => {
        if (sG(t10)) switch (r10) {
          case "decrypt":
          case "sign":
            if (sY(t10) && ik(e10, t10, r10)) return;
            throw TypeError("JSON Web Key for this operation must be a private JWK");
          case "encrypt":
          case "verify":
            if (sX(t10) && ik(e10, t10, r10)) return;
            throw TypeError("JSON Web Key for this operation must be a public JWK");
        }
        if (!sC(t10)) throw TypeError(sf(e10, t10, "CryptoKey", "KeyObject", "JSON Web Key"));
        if ("secret" === t10.type) throw TypeError(`${iE(t10)} instances for asymmetric algorithms must not be of type "secret"`);
        if ("public" === t10.type) switch (r10) {
          case "sign":
            throw TypeError(`${iE(t10)} instances for asymmetric algorithm signing must be of type "private"`);
          case "decrypt":
            throw TypeError(`${iE(t10)} instances for asymmetric algorithm decryption must be of type "private"`);
        }
        if ("private" === t10.type) switch (r10) {
          case "verify":
            throw TypeError(`${iE(t10)} instances for asymmetric algorithm verifying must be of type "public"`);
          case "encrypt":
            throw TypeError(`${iE(t10)} instances for asymmetric algorithm encryption must be of type "public"`);
        }
      };
      function iP(e10, t10, r10) {
        switch (e10.substring(0, 2)) {
          case "A1":
          case "A2":
          case "di":
          case "HS":
          case "PB":
            iT(e10, t10, r10);
            break;
          default:
            iA(e10, t10, r10);
        }
      }
      function iC(e10, t10, r10, n10, s10) {
        let i10;
        if (void 0 !== s10.crit && n10?.crit === void 0) throw new e10('"crit" (Critical) Header Parameter MUST be integrity protected');
        if (!n10 || void 0 === n10.crit) return /* @__PURE__ */ new Set();
        if (!Array.isArray(n10.crit) || 0 === n10.crit.length || n10.crit.some((e11) => "string" != typeof e11 || 0 === e11.length)) throw new e10('"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present');
        for (let a10 of (i10 = void 0 !== r10 ? new Map([...Object.entries(r10), ...t10.entries()]) : t10, n10.crit)) {
          if (!i10.has(a10)) throw new sU(`Extension Header Parameter "${a10}" is not recognized`);
          if (void 0 === s10[a10]) throw new e10(`Extension Header Parameter "${a10}" is missing`);
          if (i10.get(a10) && void 0 === n10[a10]) throw new e10(`Extension Header Parameter "${a10}" MUST be integrity protected`);
        }
        return new Set(n10.crit);
      }
      function iO(e10, t10) {
        if (void 0 !== t10 && (!Array.isArray(t10) || t10.some((e11) => "string" != typeof e11))) throw TypeError(`"${e10}" option must be an array of strings`);
        if (t10) return new Set(t10);
      }
      let iR = async (e10, t10, r10, n10 = false) => {
        let s10 = (u ||= /* @__PURE__ */ new WeakMap()).get(e10);
        if (s10?.[r10]) return s10[r10];
        let i10 = await it({ ...t10, alg: r10 });
        return n10 && Object.freeze(e10), s10 ? s10[r10] = i10 : u.set(e10, { [r10]: i10 }), i10;
      }, ix = (e10, t10) => {
        let r10;
        let n10 = (u ||= /* @__PURE__ */ new WeakMap()).get(e10);
        if (n10?.[t10]) return n10[t10];
        let s10 = "public" === e10.type, i10 = !!s10;
        if ("x25519" === e10.asymmetricKeyType) {
          switch (t10) {
            case "ECDH-ES":
            case "ECDH-ES+A128KW":
            case "ECDH-ES+A192KW":
            case "ECDH-ES+A256KW":
              break;
            default:
              throw TypeError("given KeyObject instance cannot be used for this algorithm");
          }
          r10 = e10.toCryptoKey(e10.asymmetricKeyType, i10, s10 ? [] : ["deriveBits"]);
        }
        if ("ed25519" === e10.asymmetricKeyType) {
          if ("EdDSA" !== t10 && "Ed25519" !== t10) throw TypeError("given KeyObject instance cannot be used for this algorithm");
          r10 = e10.toCryptoKey(e10.asymmetricKeyType, i10, [s10 ? "verify" : "sign"]);
        }
        switch (e10.asymmetricKeyType) {
          case "ml-dsa-44":
          case "ml-dsa-65":
          case "ml-dsa-87":
            if (t10 !== e10.asymmetricKeyType.toUpperCase()) throw TypeError("given KeyObject instance cannot be used for this algorithm");
            r10 = e10.toCryptoKey(e10.asymmetricKeyType, i10, [s10 ? "verify" : "sign"]);
        }
        if ("rsa" === e10.asymmetricKeyType) {
          let n11;
          switch (t10) {
            case "RSA-OAEP":
              n11 = "SHA-1";
              break;
            case "RS256":
            case "PS256":
            case "RSA-OAEP-256":
              n11 = "SHA-256";
              break;
            case "RS384":
            case "PS384":
            case "RSA-OAEP-384":
              n11 = "SHA-384";
              break;
            case "RS512":
            case "PS512":
            case "RSA-OAEP-512":
              n11 = "SHA-512";
              break;
            default:
              throw TypeError("given KeyObject instance cannot be used for this algorithm");
          }
          if (t10.startsWith("RSA-OAEP")) return e10.toCryptoKey({ name: "RSA-OAEP", hash: n11 }, i10, s10 ? ["encrypt"] : ["decrypt"]);
          r10 = e10.toCryptoKey({ name: t10.startsWith("PS") ? "RSA-PSS" : "RSASSA-PKCS1-v1_5", hash: n11 }, i10, [s10 ? "verify" : "sign"]);
        }
        if ("ec" === e10.asymmetricKeyType) {
          let n11 = (/* @__PURE__ */ new Map([["prime256v1", "P-256"], ["secp384r1", "P-384"], ["secp521r1", "P-521"]])).get(e10.asymmetricKeyDetails?.namedCurve);
          if (!n11) throw TypeError("given KeyObject instance cannot be used for this algorithm");
          "ES256" === t10 && "P-256" === n11 && (r10 = e10.toCryptoKey({ name: "ECDSA", namedCurve: n11 }, i10, [s10 ? "verify" : "sign"])), "ES384" === t10 && "P-384" === n11 && (r10 = e10.toCryptoKey({ name: "ECDSA", namedCurve: n11 }, i10, [s10 ? "verify" : "sign"])), "ES512" === t10 && "P-521" === n11 && (r10 = e10.toCryptoKey({ name: "ECDSA", namedCurve: n11 }, i10, [s10 ? "verify" : "sign"])), t10.startsWith("ECDH-ES") && (r10 = e10.toCryptoKey({ name: "ECDH", namedCurve: n11 }, i10, s10 ? [] : ["deriveBits"]));
        }
        if (!r10) throw TypeError("given KeyObject instance cannot be used for this algorithm");
        return n10 ? n10[t10] = r10 : u.set(e10, { [t10]: r10 }), r10;
      };
      async function iI(e10, t10) {
        if (e10 instanceof Uint8Array || sA(e10)) return e10;
        if (sP(e10)) {
          if ("secret" === e10.type) return e10.export();
          if ("toCryptoKey" in e10 && "function" == typeof e10.toCryptoKey) try {
            return ix(e10, t10);
          } catch (e11) {
            if (e11 instanceof TypeError) throw e11;
          }
          let r10 = e10.export({ format: "jwk" });
          return iR(e10, r10, t10);
        }
        if (sG(e10)) return e10.k ? sE(e10.k) : iR(e10, e10, t10, true);
        throw Error("unreachable");
      }
      async function iN(e10, t10, r10) {
        let n10, s10;
        if (!sF(e10)) throw new sM("Flattened JWS must be an object");
        if (void 0 === e10.protected && void 0 === e10.header) throw new sM('Flattened JWS must have either of the "protected" or "header" members');
        if (void 0 !== e10.protected && "string" != typeof e10.protected) throw new sM("JWS Protected Header incorrect type");
        if (void 0 === e10.payload) throw new sM("JWS Payload missing");
        if ("string" != typeof e10.signature) throw new sM("JWS Signature missing or incorrect type");
        if (void 0 !== e10.header && !sF(e10.header)) throw new sM("JWS Unprotected Header incorrect type");
        let i10 = {};
        if (e10.protected) try {
          let t11 = sE(e10.protected);
          i10 = JSON.parse(sy.decode(t11));
        } catch {
          throw new sM("JWS Protected Header is invalid");
        }
        if (!iS(i10, e10.header)) throw new sM("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
        let a10 = { ...i10, ...e10.header }, o10 = iC(sM, /* @__PURE__ */ new Map([["b64", true]]), r10?.crit, i10, a10), c10 = true;
        if (o10.has("b64") && "boolean" != typeof (c10 = i10.b64)) throw new sM('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
        let { alg: l10 } = a10;
        if ("string" != typeof l10 || !l10) throw new sM('JWS "alg" (Algorithm) Header Parameter missing or invalid');
        let u2 = r10 && iO("algorithms", r10.algorithms);
        if (u2 && !u2.has(l10)) throw new sD('"alg" (Algorithm) Header Parameter value not allowed');
        if (c10) {
          if ("string" != typeof e10.payload) throw new sM("JWS Payload must be a string");
        } else if ("string" != typeof e10.payload && !(e10.payload instanceof Uint8Array)) throw new sM("JWS Payload must be a string or an Uint8Array instance");
        let h2 = false;
        "function" == typeof t10 && (t10 = await t10(i10, e10), h2 = true), iP(l10, t10, "verify");
        let d2 = sm(void 0 !== e10.protected ? s_(e10.protected) : new Uint8Array(), s_("."), "string" == typeof e10.payload ? c10 ? s_(e10.payload) : sg.encode(e10.payload) : e10.payload);
        try {
          n10 = sE(e10.signature);
        } catch {
          throw new sM("Failed to base64url decode the signature");
        }
        let p2 = await iI(t10, l10);
        if (!await i_(l10, p2, n10, d2)) throw new sz();
        if (c10) try {
          s10 = sE(e10.payload);
        } catch {
          throw new sM("Failed to base64url decode the payload");
        }
        else s10 = "string" == typeof e10.payload ? sg.encode(e10.payload) : e10.payload;
        let f2 = { payload: s10 };
        return (void 0 !== e10.protected && (f2.protectedHeader = i10), void 0 !== e10.header && (f2.unprotectedHeader = e10.header), h2) ? { ...f2, key: p2 } : f2;
      }
      async function ij(e10, t10, r10) {
        if (e10 instanceof Uint8Array && (e10 = sy.decode(e10)), "string" != typeof e10) throw new sM("Compact JWS must be a string or Uint8Array");
        let { 0: n10, 1: s10, 2: i10, length: a10 } = e10.split(".");
        if (3 !== a10) throw new sM("Invalid Compact JWS");
        let o10 = await iN({ payload: s10, protected: n10, signature: i10 }, t10, r10), c10 = { payload: o10.payload, protectedHeader: o10.protectedHeader };
        return "function" == typeof t10 ? { ...c10, key: o10.key } : c10;
      }
      let iD = (e10) => Math.floor(e10.getTime() / 1e3), iU = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i;
      function i$(e10) {
        let t10;
        let r10 = iU.exec(e10);
        if (!r10 || r10[4] && r10[1]) throw TypeError("Invalid time period format");
        let n10 = parseFloat(r10[2]);
        switch (r10[3].toLowerCase()) {
          case "sec":
          case "secs":
          case "second":
          case "seconds":
          case "s":
            t10 = Math.round(n10);
            break;
          case "minute":
          case "minutes":
          case "min":
          case "mins":
          case "m":
            t10 = Math.round(60 * n10);
            break;
          case "hour":
          case "hours":
          case "hr":
          case "hrs":
          case "h":
            t10 = Math.round(3600 * n10);
            break;
          case "day":
          case "days":
          case "d":
            t10 = Math.round(86400 * n10);
            break;
          case "week":
          case "weeks":
          case "w":
            t10 = Math.round(604800 * n10);
            break;
          default:
            t10 = Math.round(31557600 * n10);
        }
        return "-" === r10[1] || "ago" === r10[4] ? -t10 : t10;
      }
      function iL(e10, t10) {
        if (!Number.isFinite(t10)) throw TypeError(`Invalid ${e10} input`);
        return t10;
      }
      let iM = (e10) => e10.includes("/") ? e10.toLowerCase() : `application/${e10.toLowerCase()}`, iH = (e10, t10) => "string" == typeof e10 ? t10.includes(e10) : !!Array.isArray(e10) && t10.some(Set.prototype.has.bind(new Set(e10)));
      function iK(e10, t10, r10 = {}) {
        let n10, s10;
        try {
          n10 = JSON.parse(sy.decode(t10));
        } catch {
        }
        if (!sF(n10)) throw new sH("JWT Claims Set must be a top-level JSON object");
        let { typ: i10 } = r10;
        if (i10 && ("string" != typeof e10.typ || iM(e10.typ) !== iM(i10))) throw new sN('unexpected "typ" JWT header value', n10, "typ", "check_failed");
        let { requiredClaims: a10 = [], issuer: o10, subject: c10, audience: l10, maxTokenAge: u2 } = r10, h2 = [...a10];
        for (let e11 of (void 0 !== u2 && h2.push("iat"), void 0 !== l10 && h2.push("aud"), void 0 !== c10 && h2.push("sub"), void 0 !== o10 && h2.push("iss"), new Set(h2.reverse()))) if (!(e11 in n10)) throw new sN(`missing required "${e11}" claim`, n10, e11, "missing");
        if (o10 && !(Array.isArray(o10) ? o10 : [o10]).includes(n10.iss)) throw new sN('unexpected "iss" claim value', n10, "iss", "check_failed");
        if (c10 && n10.sub !== c10) throw new sN('unexpected "sub" claim value', n10, "sub", "check_failed");
        if (l10 && !iH(n10.aud, "string" == typeof l10 ? [l10] : l10)) throw new sN('unexpected "aud" claim value', n10, "aud", "check_failed");
        switch (typeof r10.clockTolerance) {
          case "string":
            s10 = i$(r10.clockTolerance);
            break;
          case "number":
            s10 = r10.clockTolerance;
            break;
          case "undefined":
            s10 = 0;
            break;
          default:
            throw TypeError("Invalid clockTolerance option type");
        }
        let { currentDate: d2 } = r10, p2 = iD(d2 || /* @__PURE__ */ new Date());
        if ((void 0 !== n10.iat || u2) && "number" != typeof n10.iat) throw new sN('"iat" claim must be a number', n10, "iat", "invalid");
        if (void 0 !== n10.nbf) {
          if ("number" != typeof n10.nbf) throw new sN('"nbf" claim must be a number', n10, "nbf", "invalid");
          if (n10.nbf > p2 + s10) throw new sN('"nbf" claim timestamp check failed', n10, "nbf", "check_failed");
        }
        if (void 0 !== n10.exp) {
          if ("number" != typeof n10.exp) throw new sN('"exp" claim must be a number', n10, "exp", "invalid");
          if (n10.exp <= p2 - s10) throw new sj('"exp" claim timestamp check failed', n10, "exp", "check_failed");
        }
        if (u2) {
          let e11 = p2 - n10.iat;
          if (e11 - s10 > ("number" == typeof u2 ? u2 : i$(u2))) throw new sj('"iat" claim timestamp check failed (too far in the past)', n10, "iat", "check_failed");
          if (e11 < 0 - s10) throw new sN('"iat" claim timestamp check failed (it should be in the past)', n10, "iat", "check_failed");
        }
        return n10;
      }
      class iW {
        #_;
        constructor(e10) {
          if (!sF(e10)) throw TypeError("JWT Claims Set MUST be an object");
          this.#_ = structuredClone(e10);
        }
        data() {
          return sg.encode(JSON.stringify(this.#_));
        }
        get iss() {
          return this.#_.iss;
        }
        set iss(e10) {
          this.#_.iss = e10;
        }
        get sub() {
          return this.#_.sub;
        }
        set sub(e10) {
          this.#_.sub = e10;
        }
        get aud() {
          return this.#_.aud;
        }
        set aud(e10) {
          this.#_.aud = e10;
        }
        set jti(e10) {
          this.#_.jti = e10;
        }
        set nbf(e10) {
          "number" == typeof e10 ? this.#_.nbf = iL("setNotBefore", e10) : e10 instanceof Date ? this.#_.nbf = iL("setNotBefore", iD(e10)) : this.#_.nbf = iD(/* @__PURE__ */ new Date()) + i$(e10);
        }
        set exp(e10) {
          "number" == typeof e10 ? this.#_.exp = iL("setExpirationTime", e10) : e10 instanceof Date ? this.#_.exp = iL("setExpirationTime", iD(e10)) : this.#_.exp = iD(/* @__PURE__ */ new Date()) + i$(e10);
        }
        set iat(e10) {
          void 0 === e10 ? this.#_.iat = iD(/* @__PURE__ */ new Date()) : e10 instanceof Date ? this.#_.iat = iL("setIssuedAt", iD(e10)) : "string" == typeof e10 ? this.#_.iat = iL("setIssuedAt", iD(/* @__PURE__ */ new Date()) + i$(e10)) : this.#_.iat = iL("setIssuedAt", e10);
        }
      }
      async function iB(e10, t10, r10) {
        let n10 = await ij(e10, t10, r10);
        if (n10.protectedHeader.crit?.includes("b64") && false === n10.protectedHeader.b64) throw new sH("JWTs MUST NOT use unencoded payload");
        let s10 = { payload: iK(n10.protectedHeader, n10.payload, r10), protectedHeader: n10.protectedHeader };
        return "function" == typeof t10 ? { ...s10, key: n10.key } : s10;
      }
      "undefined" != typeof navigator && navigator.userAgent?.startsWith?.("Mozilla/5.0 ") || (h = { "user-agent": "openid-client/v6.8.1" });
      let iq = (e10) => d.get(e10), iJ = "ERR_INVALID_ARG_VALUE", iz = "ERR_INVALID_ARG_TYPE";
      function iV(e10, t10, r10) {
        let n10 = TypeError(e10, { cause: r10 });
        return Object.assign(n10, { code: t10 }), n10;
      }
      class iF extends Error {
        code;
        constructor(e10, t10) {
          super(e10, t10), this.name = this.constructor.name, this.code = t10?.code, Error.captureStackTrace?.(this, this.constructor);
        }
      }
      function iG(e10, t10, r10) {
        return new iF(e10, { cause: t10, code: r10 });
      }
      function iY(e10) {
        if (e10 instanceof TypeError || e10 instanceof iF || e10 instanceof rQ || e10 instanceof rZ || e10 instanceof r0) throw e10;
        if (e10 instanceof ry) switch (e10.code) {
          case nj:
            throw iG("only requests to HTTPS are allowed", e10, e10.code);
          case nD:
            throw iG("only requests to HTTP or HTTPS are allowed", e10, e10.code);
          case nN:
            throw iG("unexpected HTTP response status code", e10.cause, e10.code);
          case nI:
            throw iG("unexpected response content-type", e10.cause, e10.code);
          case nR:
            throw iG("parsing error occured", e10, e10.code);
          case nx:
            throw iG("invalid response encountered", e10, e10.code);
          case n$:
            throw iG("unexpected JWT claim value encountered", e10, e10.code);
          case nL:
            throw iG("unexpected JSON attribute value encountered", e10, e10.code);
          case nU:
            throw iG("JWT timestamp claim value failed validation", e10, e10.code);
          default:
            throw iG(e10.message, e10, e10.code);
        }
        if (e10 instanceof rg) throw iG("unsupported operation", e10, e10.code);
        if (e10 instanceof DOMException) switch (e10.name) {
          case "OperationError":
            throw iG("runtime operation error", e10, nC);
          case "NotSupportedError":
            throw iG("runtime unsupported operation", e10, nC);
          case "TimeoutError":
            throw iG("operation timed out", e10, "OAUTH_TIMEOUT");
          case "AbortError":
            throw iG("operation aborted", e10, "OAUTH_ABORT");
        }
        throw new iF("something went wrong", { cause: e10 });
      }
      new TextDecoder();
      let iX = Symbol();
      class iQ {
        constructor(e10, t10, r10, n10) {
          let s10;
          if ("string" != typeof t10 || !t10.length) throw iV('"clientId" must be a non-empty string', iz);
          if ("string" == typeof r10 && (r10 = { client_secret: r10 }), r10?.client_id !== void 0 && t10 !== r10.client_id) throw iV('"clientId" and "metadata.client_id" must be the same', iJ);
          let i10 = { ...structuredClone(r10), client_id: t10 };
          i10[ri] = r10?.[ri] ?? 0, i10[ra] = r10?.[ra] ?? 30, s10 = n10 || ("string" == typeof i10.client_secret && i10.client_secret.length ? function(e11) {
            return void 0 !== e11 ? rH(e11) : (p ||= /* @__PURE__ */ new WeakMap(), (e12, t11, r11, n11) => {
              let s11;
              return (s11 = p.get(t11)) || (function(e13, t12) {
                if ("string" != typeof e13) throw iV(`${t12} must be a string`, iz);
                if (0 === e13.length) throw iV(`${t12} must not be empty`, iJ);
              }(t11.client_secret, '"metadata.client_secret"'), s11 = rH(t11.client_secret), p.set(t11, s11)), s11(e12, t11, r11, n11);
            });
          }(i10.client_secret) : (e11, t11, r11, n11) => {
            r11.set("client_id", t11.client_id);
          });
          let a10 = Object.freeze(i10), o10 = structuredClone(e10);
          iX in e10 && (o10[n7] = ({ claims: { tid: t11 } }) => e10.issuer.replace("{tenantid}", t11));
          let c10 = Object.freeze(o10);
          (d ||= /* @__PURE__ */ new WeakMap()).set(this, { __proto__: null, as: c10, c: a10, auth: s10, tlsOnly: true, jwksCache: {} });
        }
        serverMetadata() {
          let e10 = structuredClone(iq(this).as);
          return Object.defineProperties(e10, { supportsPKCE: { __proto__: null, value: (t10 = "S256") => e10.code_challenge_methods_supported?.includes(t10) === true } }), e10;
        }
        clientMetadata() {
          return structuredClone(iq(this).c);
        }
        get timeout() {
          return iq(this).timeout;
        }
        set timeout(e10) {
          iq(this).timeout = e10;
        }
        get [ro]() {
          return iq(this).fetch;
        }
        set [ro](e10) {
          iq(this).fetch = e10;
        }
      }
      async function iZ(e10, t10, r10, n10 = false) {
        let s10;
        let i10 = e10.headers.get("retry-after")?.trim();
        if (void 0 !== i10) {
          if (/^\d+$/.test(i10)) s10 = parseInt(i10, 10);
          else {
            let e11 = new Date(i10);
            if (Number.isFinite(e11.getTime())) {
              let t11 = /* @__PURE__ */ new Date(), r11 = e11.getTime() - t11.getTime();
              r11 > 0 && (s10 = Math.ceil(r11 / 1e3));
            }
          }
          if (n10 && !Number.isFinite(s10)) throw new ry("invalid Retry-After header value", { cause: e10 });
          s10 > t10 && await i0(s10 - t10, r10);
        }
      }
      function i0(e10, t10) {
        return new Promise((r10, n10) => {
          let s10 = (e11) => {
            try {
              t10.throwIfAborted();
            } catch (e12) {
              n10(e12);
              return;
            }
            if (e11 <= 0) {
              r10();
              return;
            }
            let i10 = Math.min(e11, 5);
            setTimeout(() => s10(e11 - i10), 1e3 * i10);
          };
          s10(e10);
        });
      }
      async function i1(e10, t10) {
        i5(e10);
        let { as: r10, c: n10, auth: s10, fetch: i10, tlsOnly: a10, timeout: o10 } = iq(e10);
        return n5(r10, n10, s10, t10, { [ro]: i10, [rs]: !a10, headers: new Headers(h), signal: i8(o10) }).then((e11) => n8(r10, n10, e11)).catch(iY);
      }
      async function i2(e10, t10, r10, n10) {
        var s10, i10, a10;
        let o10;
        i5(e10), r10 = new URLSearchParams(r10);
        let c10 = t10.interval ?? 5, l10 = n10?.signal ?? AbortSignal.timeout(1e3 * t10.expires_in);
        try {
          await i0(c10, l10);
        } catch (e11) {
          iY(e11);
        }
        let { as: u2, c: d2, auth: p2, fetch: f2, tlsOnly: g2, nonRepudiation: y2, timeout: m2, decrypt: w2 } = iq(e10), b2 = (s11, i11) => i2(e10, { ...t10, interval: s11 }, r10, { ...n10, signal: l10, flag: i11 }), v2 = await n6(u2, d2, p2, t10.auth_req_id, { [ro]: f2, [rs]: !g2, additionalParameters: r10, DPoP: n10?.DPoP, headers: new Headers(h), signal: l10.aborted ? l10 : i8(m2) }).catch(iY);
        if (503 === v2.status && v2.headers.has("retry-after")) return await iZ(v2, c10, l10, true), await v2.body?.cancel(), b2(c10);
        let _2 = n4(u2, d2, v2, { [rl]: w2 });
        try {
          o10 = await _2;
        } catch (e11) {
          if (i10 = e11, a10 = n10, a10?.DPoP && a10.flag !== i6 && rY(i10)) return b2(c10, i6);
          if (e11 instanceof rQ) switch (e11.error) {
            case "slow_down":
              c10 += 5;
            case "authorization_pending":
              return await iZ(e11.response, c10, l10), b2(c10);
          }
          iY(e11);
        }
        return o10.id_token && await y2?.(v2), Object.defineProperties(s10 = o10, function(e11) {
          let t11;
          if (void 0 !== e11.expires_in) {
            let r11 = /* @__PURE__ */ new Date();
            r11.setSeconds(r11.getSeconds() + e11.expires_in), t11 = r11.getTime();
          }
          return { expiresIn: { __proto__: null, value() {
            if (t11) {
              let e12 = Date.now();
              return t11 > e12 ? Math.floor((t11 - e12) / 1e3) : 0;
            }
          } }, claims: { __proto__: null, value() {
            try {
              return nu(this);
            } catch {
              return;
            }
          } } };
        }(s10)), o10;
      }
      Object.freeze(iQ.prototype);
      function i5(e10) {
        if (!(e10 instanceof iQ)) throw iV('"config" must be an instance of Configuration', iz);
        if (Object.getPrototypeOf(e10) !== iQ.prototype) throw iV("subclassing Configuration is not allowed", iJ);
      }
      function i8(e10) {
        return e10 ? AbortSignal.timeout(1e3 * e10) : void 0;
      }
      let i6 = Symbol(), i4 = { rE: "4.14.0" };
      function i3(e10, t10, r10 = []) {
        let n10 = new URLSearchParams(), s10 = { ...e10, ...t10 };
        return Object.entries(s10).forEach(([e11, t11]) => {
          r10 && (r10.includes(e11) || null == t11) || ("scope" === e11 && "object" == typeof t11 && (t11 = ss(t11, s10.audience)), t11 && n10.set(e11, String(t11)));
        }), n10;
      }
      function i9(e10) {
        return e10 && !e10.endsWith("/") ? `${e10}/` : e10;
      }
      function i7(e10) {
        return e10 && e10.startsWith("/") ? e10.substring(1, e10.length) : e10;
      }
      !function(e10) {
        e10.SUBJECT_TYPE_REFRESH_TOKEN = "urn:ietf:params:oauth:token-type:refresh_token", e10.SUBJECT_TYPE_ACCESS_TOKEN = "urn:ietf:params:oauth:token-type:access_token";
      }(v || (v = {})), function(e10) {
        e10.CODE = "code", e10.CONNECT_CODE = "connect_code";
      }(_ || (_ = {}));
      let ae = (e10) => e10.endsWith("/") ? e10.slice(0, -1) : e10, at = (e10) => {
        let t10 = process.env.NEXT_PUBLIC_BASE_PATH;
        return t10 ? i9(function(e11) {
          return e11 && !e11.startsWith("/") ? `/${e11}` : e11;
        }(t10)) + i7(e10) : e10;
      }, ar = /* @__PURE__ */ new Set(["accept", "accept-language", "content-language", "content-type", "user-agent", "cache-control", "if-match", "if-none-match", "if-modified-since", "if-unmodified-since", "etag", "x-request-id", "x-correlation-id", "traceparent", "tracestate", "x-forwarded-for", "x-forwarded-host", "x-forwarded-proto", "x-real-ip", "origin", "access-control-request-method", "access-control-request-headers"]), an = /* @__PURE__ */ new Set(["connection", "keep-alive", "proxy-authenticate", "proxy-authorization", "te", "trailer", "transfer-encoding", "upgrade"]);
      function as(e10) {
        let t10 = new Headers();
        return e10.headers.forEach((e11, r10) => {
          let n10 = r10.toLowerCase();
          ar.has(n10) && !an.has(n10) && t10.set(r10, e11);
        }), t10;
      }
      function ai(e10) {
        let t10 = new Headers();
        return e10.headers.forEach((e11, r10) => {
          let n10 = r10.toLowerCase();
          an.has(n10) || t10.set(r10, e11);
        }), t10;
      }
      function aa(e10, t10) {
        let r10 = t10.targetBaseUrl, n10 = e10.nextUrl.pathname.startsWith(t10.proxyPath) ? e10.nextUrl.pathname.slice(t10.proxyPath.length) : e10.nextUrl.pathname;
        n10 && !n10.startsWith("/") && (n10 = "/" + n10);
        let s10 = new URL(r10.replace(/\/$/, "")), i10 = s10.pathname, a10 = i10;
        if (n10 && "/" !== n10) {
          let e11 = i10.split("/").filter(Boolean), t11 = n10.split("/").filter(Boolean), r11 = 0, s11 = Math.min(e11.length, t11.length);
          for (let n11 = s11; n11 >= 1; n11--) {
            let s12 = e11.slice(-n11), i11 = t11.slice(0, n11);
            if (s12.every((e12, t12) => e12 === i11[t12])) {
              r11 = n11;
              break;
            }
          }
          let o11 = t11.slice(r11);
          if (o11.length > 0) {
            let e12 = "/" === i10 || i10.endsWith("/") ? "" : "/";
            a10 = i10 + e12 + o11.join("/");
          }
        }
        let o10 = new URL(s10.origin + a10);
        return e10.nextUrl.searchParams.forEach((e11, t11) => {
          o10.searchParams.set(t11, e11);
        }), o10;
      }
      function ao(e10, t10) {
        let r10;
        try {
          r10 = new URL(e10, t10);
        } catch (e11) {
          return;
        }
        if (r10.origin === t10.origin) return r10;
      }
      function ac(e10) {
        var t10;
        let r10 = ["path" in e10 && e10.path && `Path=${e10.path}`, "expires" in e10 && (e10.expires || 0 === e10.expires) && `Expires=${("number" == typeof e10.expires ? new Date(e10.expires) : e10.expires).toUTCString()}`, "maxAge" in e10 && "number" == typeof e10.maxAge && `Max-Age=${e10.maxAge}`, "domain" in e10 && e10.domain && `Domain=${e10.domain}`, "secure" in e10 && e10.secure && "Secure", "httpOnly" in e10 && e10.httpOnly && "HttpOnly", "sameSite" in e10 && e10.sameSite && `SameSite=${e10.sameSite}`, "partitioned" in e10 && e10.partitioned && "Partitioned", "priority" in e10 && e10.priority && `Priority=${e10.priority}`].filter(Boolean), n10 = `${e10.name}=${encodeURIComponent(null != (t10 = e10.value) ? t10 : "")}`;
        return 0 === r10.length ? n10 : `${n10}; ${r10.join("; ")}`;
      }
      function al(e10) {
        let t10 = /* @__PURE__ */ new Map();
        for (let r10 of e10.split(/; */)) {
          if (!r10) continue;
          let e11 = r10.indexOf("=");
          if (-1 === e11) {
            t10.set(r10, "true");
            continue;
          }
          let [n10, s10] = [r10.slice(0, e11), r10.slice(e11 + 1)];
          try {
            t10.set(n10, decodeURIComponent(null != s10 ? s10 : "true"));
          } catch {
          }
        }
        return t10;
      }
      var au = ["strict", "lax", "none"], ah = ["low", "medium", "high"], ad = class {
        constructor(e10) {
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e10;
          let t10 = e10.get("cookie");
          if (t10) for (let [e11, r10] of al(t10)) this._parsed.set(e11, { name: e11, value: r10 });
        }
        [Symbol.iterator]() {
          return this._parsed[Symbol.iterator]();
        }
        get size() {
          return this._parsed.size;
        }
        get(...e10) {
          let t10 = "string" == typeof e10[0] ? e10[0] : e10[0].name;
          return this._parsed.get(t10);
        }
        getAll(...e10) {
          var t10;
          let r10 = Array.from(this._parsed);
          if (!e10.length) return r10.map(([e11, t11]) => t11);
          let n10 = "string" == typeof e10[0] ? e10[0] : null == (t10 = e10[0]) ? void 0 : t10.name;
          return r10.filter(([e11]) => e11 === n10).map(([e11, t11]) => t11);
        }
        has(e10) {
          return this._parsed.has(e10);
        }
        set(...e10) {
          let [t10, r10] = 1 === e10.length ? [e10[0].name, e10[0].value] : e10, n10 = this._parsed;
          return n10.set(t10, { name: t10, value: r10 }), this._headers.set("cookie", Array.from(n10).map(([e11, t11]) => ac(t11)).join("; ")), this;
        }
        delete(e10) {
          let t10 = this._parsed, r10 = Array.isArray(e10) ? e10.map((e11) => t10.delete(e11)) : t10.delete(e10);
          return this._headers.set("cookie", Array.from(t10).map(([e11, t11]) => ac(t11)).join("; ")), r10;
        }
        clear() {
          return this.delete(Array.from(this._parsed.keys())), this;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map((e10) => `${e10.name}=${encodeURIComponent(e10.value)}`).join("; ");
        }
      }, ap = class {
        constructor(e10) {
          var t10, r10, n10;
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e10;
          let s10 = null != (n10 = null != (r10 = null == (t10 = e10.getSetCookie) ? void 0 : t10.call(e10)) ? r10 : e10.get("set-cookie")) ? n10 : [];
          for (let e11 of Array.isArray(s10) ? s10 : function(e12) {
            if (!e12) return [];
            var t11, r11, n11, s11, i10, a10 = [], o10 = 0;
            function c10() {
              for (; o10 < e12.length && /\s/.test(e12.charAt(o10)); ) o10 += 1;
              return o10 < e12.length;
            }
            for (; o10 < e12.length; ) {
              for (t11 = o10, i10 = false; c10(); ) if ("," === (r11 = e12.charAt(o10))) {
                for (n11 = o10, o10 += 1, c10(), s11 = o10; o10 < e12.length && "=" !== (r11 = e12.charAt(o10)) && ";" !== r11 && "," !== r11; ) o10 += 1;
                o10 < e12.length && "=" === e12.charAt(o10) ? (i10 = true, o10 = s11, a10.push(e12.substring(t11, n11)), t11 = o10) : o10 = n11 + 1;
              } else o10 += 1;
              (!i10 || o10 >= e12.length) && a10.push(e12.substring(t11, e12.length));
            }
            return a10;
          }(s10)) {
            let t11 = function(e12) {
              var t12, r11;
              if (!e12) return;
              let [[n11, s11], ...i10] = al(e12), { domain: a10, expires: o10, httponly: c10, maxage: l10, path: u2, samesite: h2, secure: d2, partitioned: p2, priority: f2 } = Object.fromEntries(i10.map(([e13, t13]) => [e13.toLowerCase().replace(/-/g, ""), t13]));
              return function(e13) {
                let t13 = {};
                for (let r12 in e13) e13[r12] && (t13[r12] = e13[r12]);
                return t13;
              }({ name: n11, value: decodeURIComponent(s11), domain: a10, ...o10 && { expires: new Date(o10) }, ...c10 && { httpOnly: true }, ..."string" == typeof l10 && { maxAge: Number(l10) }, path: u2, ...h2 && { sameSite: (t12 = (t12 = h2).toLowerCase(), au.includes(t12) ? t12 : void 0) }, ...d2 && { secure: true }, ...f2 && { priority: (r11 = (r11 = f2).toLowerCase(), ah.includes(r11) ? r11 : void 0) }, ...p2 && { partitioned: true } });
            }(e11);
            t11 && this._parsed.set(t11.name, t11);
          }
        }
        get(...e10) {
          let t10 = "string" == typeof e10[0] ? e10[0] : e10[0].name;
          return this._parsed.get(t10);
        }
        getAll(...e10) {
          var t10;
          let r10 = Array.from(this._parsed.values());
          if (!e10.length) return r10;
          let n10 = "string" == typeof e10[0] ? e10[0] : null == (t10 = e10[0]) ? void 0 : t10.name;
          return r10.filter((e11) => e11.name === n10);
        }
        has(e10) {
          return this._parsed.has(e10);
        }
        set(...e10) {
          let [t10, r10, n10] = 1 === e10.length ? [e10[0].name, e10[0].value, e10[0]] : e10, s10 = this._parsed;
          return s10.set(t10, function(e11 = { name: "", value: "" }) {
            return "number" == typeof e11.expires && (e11.expires = new Date(e11.expires)), e11.maxAge && (e11.expires = new Date(Date.now() + 1e3 * e11.maxAge)), (null === e11.path || void 0 === e11.path) && (e11.path = "/"), e11;
          }({ name: t10, value: r10, ...n10 })), function(e11, t11) {
            for (let [, r11] of (t11.delete("set-cookie"), e11)) {
              let e12 = ac(r11);
              t11.append("set-cookie", e12);
            }
          }(s10, this._headers), this;
        }
        delete(...e10) {
          let [t10, r10] = "string" == typeof e10[0] ? [e10[0]] : [e10[0].name, e10[0]];
          return this.set({ ...r10, name: t10, value: "", expires: /* @__PURE__ */ new Date(0) });
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map(ac).join("; ");
        }
      };
      let af = () => {
        if ("undefined" != typeof globalThis) return globalThis;
        if ("undefined" != typeof self) return self;
        if ("undefined" != typeof window) return window;
        throw Error("unable to locate global object");
      }, ag = async (e10, t10, r10, n10, s10) => {
        let { crypto: { subtle: i10 } } = af();
        return new Uint8Array(await i10.deriveBits({ name: "HKDF", hash: `SHA-${e10.substr(3)}`, salt: r10, info: n10 }, await i10.importKey("raw", t10, "HKDF", false, ["deriveBits"]), s10 << 3));
      };
      function ay(e10, t10) {
        if ("string" == typeof e10) return new TextEncoder().encode(e10);
        if (!(e10 instanceof Uint8Array)) throw TypeError(`"${t10}"" must be an instance of Uint8Array or a string`);
        return e10;
      }
      async function am(e10, t10, r10, n10, s10) {
        return ag(function(e11) {
          switch (e11) {
            case "sha256":
            case "sha384":
            case "sha512":
            case "sha1":
              return e11;
            default:
              throw TypeError('unsupported "digest" value');
          }
        }(e10), function(e11) {
          let t11 = ay(e11, "ikm");
          if (!t11.byteLength) throw TypeError('"ikm" must be at least one byte in length');
          return t11;
        }(t10), ay(r10, "salt"), function(e11) {
          let t11 = ay(e11, "info");
          if (t11.byteLength > 1024) throw TypeError('"info" must not contain more than 1024 bytes');
          return t11;
        }(n10), function(e11, t11) {
          if ("number" != typeof e11 || !Number.isInteger(e11) || e11 < 1) throw TypeError('"keylen" must be a positive integer');
          if (e11 > 255 * (parseInt(t11.substr(3), 10) >> 3 || 20)) throw TypeError('"keylen" too large');
          return e11;
        }(s10, e10));
      }
      let aw = Symbol();
      function ab(e10) {
        switch (e10) {
          case "A128GCM":
          case "A128GCMKW":
          case "A192GCM":
          case "A192GCMKW":
          case "A256GCM":
          case "A256GCMKW":
            return 96;
          case "A128CBC-HS256":
          case "A192CBC-HS384":
          case "A256CBC-HS512":
            return 128;
          default:
            throw new sU(`Unsupported JWE Algorithm: ${e10}`);
        }
      }
      let av = (e10) => crypto.getRandomValues(new Uint8Array(ab(e10) >> 3));
      function a_(e10, t10) {
        if (t10.length << 3 !== ab(e10)) throw new sL("Invalid Initialization Vector length");
      }
      function aS(e10, t10) {
        let r10 = e10.byteLength << 3;
        if (r10 !== t10) throw new sL(`Invalid Content Encryption Key length. Expected ${t10} bits, got ${r10} bits`);
      }
      async function aE(e10, t10, r10, n10, s10) {
        if (!(r10 instanceof Uint8Array)) throw TypeError(sp(r10, "Uint8Array"));
        let i10 = parseInt(e10.slice(1, 4), 10), a10 = await crypto.subtle.importKey("raw", r10.subarray(i10 >> 3), "AES-CBC", false, ["encrypt"]), o10 = await crypto.subtle.importKey("raw", r10.subarray(0, i10 >> 3), { hash: `SHA-${i10 << 1}`, name: "HMAC" }, false, ["sign"]), c10 = new Uint8Array(await crypto.subtle.encrypt({ iv: n10, name: "AES-CBC" }, a10, t10)), l10 = sm(s10, n10, c10, sb(s10.length << 3));
        return { ciphertext: c10, tag: new Uint8Array((await crypto.subtle.sign("HMAC", o10, l10)).slice(0, i10 >> 3)), iv: n10 };
      }
      async function ak(e10, t10, r10, n10, s10) {
        let i10;
        r10 instanceof Uint8Array ? i10 = await crypto.subtle.importKey("raw", r10, "AES-GCM", false, ["encrypt"]) : (ib(r10, e10, "encrypt"), i10 = r10);
        let a10 = new Uint8Array(await crypto.subtle.encrypt({ additionalData: s10, iv: n10, name: "AES-GCM", tagLength: 128 }, i10, t10)), o10 = a10.slice(-16);
        return { ciphertext: a10.slice(0, -16), tag: o10, iv: n10 };
      }
      async function aT(e10, t10, r10, n10, s10) {
        if (!sA(r10) && !(r10 instanceof Uint8Array)) throw TypeError(sp(r10, "CryptoKey", "KeyObject", "Uint8Array", "JSON Web Key"));
        switch (n10 ? a_(e10, n10) : n10 = av(e10), e10) {
          case "A128CBC-HS256":
          case "A192CBC-HS384":
          case "A256CBC-HS512":
            return r10 instanceof Uint8Array && aS(r10, parseInt(e10.slice(-3), 10)), aE(e10, t10, r10, n10, s10);
          case "A128GCM":
          case "A192GCM":
          case "A256GCM":
            return r10 instanceof Uint8Array && aS(r10, parseInt(e10.slice(1, 4), 10)), ak(e10, t10, r10, n10, s10);
          default:
            throw new sU("Unsupported JWE Content Encryption Algorithm");
        }
      }
      function aA(e10, t10) {
        if (e10.algorithm.length !== parseInt(t10.slice(1, 4), 10)) throw TypeError(`Invalid key size for alg: ${t10}`);
      }
      function aP(e10, t10, r10) {
        return e10 instanceof Uint8Array ? crypto.subtle.importKey("raw", e10, "AES-KW", true, [r10]) : (ib(e10, t10, r10), e10);
      }
      async function aC(e10, t10, r10) {
        let n10 = await aP(t10, e10, "wrapKey");
        aA(n10, e10);
        let s10 = await crypto.subtle.importKey("raw", r10, { hash: "SHA-256", name: "HMAC" }, true, ["sign"]);
        return new Uint8Array(await crypto.subtle.wrapKey("raw", s10, n10, "AES-KW"));
      }
      async function aO(e10, t10, r10) {
        let n10 = await aP(t10, e10, "unwrapKey");
        aA(n10, e10);
        let s10 = await crypto.subtle.unwrapKey("raw", r10, n10, "AES-KW", { hash: "SHA-256", name: "HMAC" }, true, ["sign"]);
        return new Uint8Array(await crypto.subtle.exportKey("raw", s10));
      }
      function aR(e10) {
        return sm(sv(e10.length), e10);
      }
      async function ax(e10, t10, r10) {
        let n10 = t10 >> 3, s10 = Math.ceil(n10 / 32), i10 = new Uint8Array(32 * s10);
        for (let t11 = 1; t11 <= s10; t11++) {
          let n11 = new Uint8Array(4 + e10.length + r10.length);
          n11.set(sv(t11), 0), n11.set(e10, 4), n11.set(r10, 4 + e10.length);
          let s11 = await sx("sha256", n11);
          i10.set(s11, (t11 - 1) * 32);
        }
        return i10.slice(0, n10);
      }
      async function aI(e10, t10, r10, n10, s10 = new Uint8Array(), i10 = new Uint8Array()) {
        ib(e10, "ECDH"), ib(t10, "ECDH", "deriveBits");
        let a10 = aR(s_(r10)), o10 = aR(s10), c10 = sm(a10, o10, aR(i10), sv(n10), new Uint8Array());
        return ax(new Uint8Array(await crypto.subtle.deriveBits({ name: e10.algorithm.name, public: e10 }, t10, "X25519" === e10.algorithm.name ? 256 : Math.ceil(parseInt(e10.algorithm.namedCurve.slice(-3), 10) / 8) << 3)), n10, c10);
      }
      function aN(e10) {
        switch (e10.algorithm.namedCurve) {
          case "P-256":
          case "P-384":
          case "P-521":
            return true;
          default:
            return "X25519" === e10.algorithm.name;
        }
      }
      let aj = (e10, t10) => sm(s_(e10), Uint8Array.of(0), t10);
      async function aD(e10, t10, r10, n10) {
        if (!(e10 instanceof Uint8Array) || e10.length < 8) throw new sL("PBES2 Salt Input must be 8 or more octets");
        let s10 = aj(t10, e10), i10 = parseInt(t10.slice(13, 16), 10), a10 = { hash: `SHA-${t10.slice(8, 11)}`, iterations: r10, name: "PBKDF2", salt: s10 }, o10 = await (n10 instanceof Uint8Array ? crypto.subtle.importKey("raw", n10, "PBKDF2", false, ["deriveBits"]) : (ib(n10, t10, "deriveBits"), n10));
        return new Uint8Array(await crypto.subtle.deriveBits(a10, o10, i10));
      }
      async function aU(e10, t10, r10, n10 = 2048, s10 = crypto.getRandomValues(new Uint8Array(16))) {
        let i10 = await aD(s10, e10, n10, t10);
        return { encryptedKey: await aC(e10.slice(-6), i10, r10), p2c: n10, p2s: sk(s10) };
      }
      async function a$(e10, t10, r10, n10, s10) {
        let i10 = await aD(s10, e10, n10, t10);
        return aO(e10.slice(-6), i10, r10);
      }
      let aL = (e10) => {
        switch (e10) {
          case "RSA-OAEP":
          case "RSA-OAEP-256":
          case "RSA-OAEP-384":
          case "RSA-OAEP-512":
            return "RSA-OAEP";
          default:
            throw new sU(`alg ${e10} is not supported either by JOSE or your javascript runtime`);
        }
      };
      async function aM(e10, t10, r10) {
        return ib(t10, e10, "encrypt"), ip(e10, t10), new Uint8Array(await crypto.subtle.encrypt(aL(e10), t10, r10));
      }
      async function aH(e10, t10, r10) {
        return ib(t10, e10, "decrypt"), ip(e10, t10), new Uint8Array(await crypto.subtle.decrypt(aL(e10), t10, r10));
      }
      function aK(e10) {
        switch (e10) {
          case "A128GCM":
            return 128;
          case "A192GCM":
            return 192;
          case "A256GCM":
          case "A128CBC-HS256":
            return 256;
          case "A192CBC-HS384":
            return 384;
          case "A256CBC-HS512":
            return 512;
          default:
            throw new sU(`Unsupported JWE Algorithm: ${e10}`);
        }
      }
      let aW = (e10) => crypto.getRandomValues(new Uint8Array(aK(e10) >> 3));
      async function aB(e10, t10) {
        if (!(e10 instanceof Uint8Array)) throw TypeError("First argument must be a buffer");
        if (!(t10 instanceof Uint8Array)) throw TypeError("Second argument must be a buffer");
        let r10 = { name: "HMAC", hash: "SHA-256" }, n10 = await crypto.subtle.generateKey(r10, false, ["sign"]), s10 = new Uint8Array(await crypto.subtle.sign(r10, n10, e10)), i10 = new Uint8Array(await crypto.subtle.sign(r10, n10, t10)), a10 = 0, o10 = -1;
        for (; ++o10 < 32; ) a10 |= s10[o10] ^ i10[o10];
        return 0 === a10;
      }
      async function aq(e10, t10, r10, n10, s10, i10) {
        let a10, o10;
        if (!(t10 instanceof Uint8Array)) throw TypeError(sp(t10, "Uint8Array"));
        let c10 = parseInt(e10.slice(1, 4), 10), l10 = await crypto.subtle.importKey("raw", t10.subarray(c10 >> 3), "AES-CBC", false, ["decrypt"]), u2 = await crypto.subtle.importKey("raw", t10.subarray(0, c10 >> 3), { hash: `SHA-${c10 << 1}`, name: "HMAC" }, false, ["sign"]), h2 = sm(i10, n10, r10, sb(i10.length << 3)), d2 = new Uint8Array((await crypto.subtle.sign("HMAC", u2, h2)).slice(0, c10 >> 3));
        try {
          a10 = await aB(s10, d2);
        } catch {
        }
        if (!a10) throw new s$();
        try {
          o10 = new Uint8Array(await crypto.subtle.decrypt({ iv: n10, name: "AES-CBC" }, l10, r10));
        } catch {
        }
        if (!o10) throw new s$();
        return o10;
      }
      async function aJ(e10, t10, r10, n10, s10, i10) {
        let a10;
        t10 instanceof Uint8Array ? a10 = await crypto.subtle.importKey("raw", t10, "AES-GCM", false, ["decrypt"]) : (ib(t10, e10, "decrypt"), a10 = t10);
        try {
          return new Uint8Array(await crypto.subtle.decrypt({ additionalData: i10, iv: n10, name: "AES-GCM", tagLength: 128 }, a10, sm(r10, s10)));
        } catch {
          throw new s$();
        }
      }
      async function az(e10, t10, r10, n10, s10, i10) {
        if (!sA(t10) && !(t10 instanceof Uint8Array)) throw TypeError(sp(t10, "CryptoKey", "KeyObject", "Uint8Array", "JSON Web Key"));
        if (!n10) throw new sL("JWE Initialization Vector missing");
        if (!s10) throw new sL("JWE Authentication Tag missing");
        switch (a_(e10, n10), e10) {
          case "A128CBC-HS256":
          case "A192CBC-HS384":
          case "A256CBC-HS512":
            return t10 instanceof Uint8Array && aS(t10, parseInt(e10.slice(-3), 10)), aq(e10, t10, r10, n10, s10, i10);
          case "A128GCM":
          case "A192GCM":
          case "A256GCM":
            return t10 instanceof Uint8Array && aS(t10, parseInt(e10.slice(1, 4), 10)), aJ(e10, t10, r10, n10, s10, i10);
          default:
            throw new sU("Unsupported JWE Content Encryption Algorithm");
        }
      }
      async function aV(e10, t10, r10, n10) {
        let s10 = e10.slice(0, 7), i10 = await aT(s10, r10, t10, n10, new Uint8Array());
        return { encryptedKey: i10.ciphertext, iv: sk(i10.iv), tag: sk(i10.tag) };
      }
      async function aF(e10, t10, r10, n10, s10) {
        return az(e10.slice(0, 7), t10, r10, n10, s10, new Uint8Array());
      }
      async function aG(e10, t10, r10, n10, s10 = {}) {
        let i10, a10, o10;
        switch (e10) {
          case "dir":
            o10 = r10;
            break;
          case "ECDH-ES":
          case "ECDH-ES+A128KW":
          case "ECDH-ES+A192KW":
          case "ECDH-ES+A256KW": {
            let c10;
            if (sT(r10), !aN(r10)) throw new sU("ECDH with the provided key is not allowed or not supported by your javascript runtime");
            let { apu: l10, apv: u2 } = s10;
            c10 = s10.epk ? await iI(s10.epk, e10) : (await crypto.subtle.generateKey(r10.algorithm, true, ["deriveBits"])).privateKey;
            let { x: h2, y: d2, crv: p2, kty: f2 } = await sR(c10), g2 = await aI(r10, c10, "ECDH-ES" === e10 ? t10 : e10, "ECDH-ES" === e10 ? aK(t10) : parseInt(e10.slice(-5, -2), 10), l10, u2);
            if (a10 = { epk: { x: h2, crv: p2, kty: f2 } }, "EC" === f2 && (a10.epk.y = d2), l10 && (a10.apu = sk(l10)), u2 && (a10.apv = sk(u2)), "ECDH-ES" === e10) {
              o10 = g2;
              break;
            }
            o10 = n10 || aW(t10);
            let y2 = e10.slice(-6);
            i10 = await aC(y2, g2, o10);
            break;
          }
          case "RSA-OAEP":
          case "RSA-OAEP-256":
          case "RSA-OAEP-384":
          case "RSA-OAEP-512":
            o10 = n10 || aW(t10), sT(r10), i10 = await aM(e10, r10, o10);
            break;
          case "PBES2-HS256+A128KW":
          case "PBES2-HS384+A192KW":
          case "PBES2-HS512+A256KW": {
            o10 = n10 || aW(t10);
            let { p2c: c10, p2s: l10 } = s10;
            ({ encryptedKey: i10, ...a10 } = await aU(e10, r10, o10, c10, l10));
            break;
          }
          case "A128KW":
          case "A192KW":
          case "A256KW":
            o10 = n10 || aW(t10), i10 = await aC(e10, r10, o10);
            break;
          case "A128GCMKW":
          case "A192GCMKW":
          case "A256GCMKW": {
            o10 = n10 || aW(t10);
            let { iv: c10 } = s10;
            ({ encryptedKey: i10, ...a10 } = await aV(e10, r10, o10, c10));
            break;
          }
          default:
            throw new sU('Invalid or unsupported "alg" (JWE Algorithm) header value');
        }
        return { cek: o10, encryptedKey: i10, parameters: a10 };
      }
      class aY {
        #S;
        #E;
        #k;
        #T;
        #A;
        #P;
        #C;
        #O;
        constructor(e10) {
          if (!(e10 instanceof Uint8Array)) throw TypeError("plaintext must be an instance of Uint8Array");
          this.#S = e10;
        }
        setKeyManagementParameters(e10) {
          if (this.#O) throw TypeError("setKeyManagementParameters can only be called once");
          return this.#O = e10, this;
        }
        setProtectedHeader(e10) {
          if (this.#E) throw TypeError("setProtectedHeader can only be called once");
          return this.#E = e10, this;
        }
        setSharedUnprotectedHeader(e10) {
          if (this.#k) throw TypeError("setSharedUnprotectedHeader can only be called once");
          return this.#k = e10, this;
        }
        setUnprotectedHeader(e10) {
          if (this.#T) throw TypeError("setUnprotectedHeader can only be called once");
          return this.#T = e10, this;
        }
        setAdditionalAuthenticatedData(e10) {
          return this.#A = e10, this;
        }
        setContentEncryptionKey(e10) {
          if (this.#P) throw TypeError("setContentEncryptionKey can only be called once");
          return this.#P = e10, this;
        }
        setInitializationVector(e10) {
          if (this.#C) throw TypeError("setInitializationVector can only be called once");
          return this.#C = e10, this;
        }
        async encrypt(e10, t10) {
          let r10, n10, s10, i10, a10, o10;
          if (!this.#E && !this.#T && !this.#k) throw new sL("either setProtectedHeader, setUnprotectedHeader, or sharedUnprotectedHeader must be called before #encrypt()");
          if (!iS(this.#E, this.#T, this.#k)) throw new sL("JWE Protected, JWE Shared Unprotected and JWE Per-Recipient Header Parameter names must be disjoint");
          let c10 = { ...this.#E, ...this.#T, ...this.#k };
          if (iC(sL, /* @__PURE__ */ new Map(), t10?.crit, this.#E, c10), void 0 !== c10.zip) throw new sU('JWE "zip" (Compression Algorithm) Header Parameter is not supported.');
          let { alg: l10, enc: u2 } = c10;
          if ("string" != typeof l10 || !l10) throw new sL('JWE "alg" (Algorithm) Header Parameter missing or invalid');
          if ("string" != typeof u2 || !u2) throw new sL('JWE "enc" (Encryption Algorithm) Header Parameter missing or invalid');
          if (this.#P && ("dir" === l10 || "ECDH-ES" === l10)) throw TypeError(`setContentEncryptionKey cannot be called with JWE "alg" (Algorithm) Header ${l10}`);
          iP("dir" === l10 ? u2 : l10, e10, "encrypt");
          {
            let s11;
            let i11 = await iI(e10, l10);
            ({ cek: n10, encryptedKey: r10, parameters: s11 } = await aG(l10, u2, i11, this.#P, this.#O)), s11 && (t10 && aw in t10 ? this.#T ? this.#T = { ...this.#T, ...s11 } : this.setUnprotectedHeader(s11) : this.#E ? this.#E = { ...this.#E, ...s11 } : this.setProtectedHeader(s11));
          }
          if (this.#E ? a10 = s_(i10 = sk(JSON.stringify(this.#E))) : (i10 = "", a10 = new Uint8Array()), this.#A) {
            let e11 = s_(o10 = sk(this.#A));
            s10 = sm(a10, s_("."), e11);
          } else s10 = a10;
          let { ciphertext: h2, tag: d2, iv: p2 } = await aT(u2, this.#S, n10, this.#C, s10), f2 = { ciphertext: sk(h2) };
          return p2 && (f2.iv = sk(p2)), d2 && (f2.tag = sk(d2)), r10 && (f2.encrypted_key = sk(r10)), o10 && (f2.aad = o10), this.#E && (f2.protected = i10), this.#k && (f2.unprotected = this.#k), this.#T && (f2.header = this.#T), f2;
        }
      }
      class aX {
        #R;
        constructor(e10) {
          this.#R = new aY(e10);
        }
        setContentEncryptionKey(e10) {
          return this.#R.setContentEncryptionKey(e10), this;
        }
        setInitializationVector(e10) {
          return this.#R.setInitializationVector(e10), this;
        }
        setProtectedHeader(e10) {
          return this.#R.setProtectedHeader(e10), this;
        }
        setKeyManagementParameters(e10) {
          return this.#R.setKeyManagementParameters(e10), this;
        }
        async encrypt(e10, t10) {
          let r10 = await this.#R.encrypt(e10, t10);
          return [r10.protected, r10.encrypted_key, r10.iv, r10.ciphertext, r10.tag].join(".");
        }
      }
      class aQ {
        #P;
        #C;
        #O;
        #E;
        #x;
        #I;
        #N;
        #j;
        constructor(e10 = {}) {
          this.#j = new iW(e10);
        }
        setIssuer(e10) {
          return this.#j.iss = e10, this;
        }
        setSubject(e10) {
          return this.#j.sub = e10, this;
        }
        setAudience(e10) {
          return this.#j.aud = e10, this;
        }
        setJti(e10) {
          return this.#j.jti = e10, this;
        }
        setNotBefore(e10) {
          return this.#j.nbf = e10, this;
        }
        setExpirationTime(e10) {
          return this.#j.exp = e10, this;
        }
        setIssuedAt(e10) {
          return this.#j.iat = e10, this;
        }
        setProtectedHeader(e10) {
          if (this.#E) throw TypeError("setProtectedHeader can only be called once");
          return this.#E = e10, this;
        }
        setKeyManagementParameters(e10) {
          if (this.#O) throw TypeError("setKeyManagementParameters can only be called once");
          return this.#O = e10, this;
        }
        setContentEncryptionKey(e10) {
          if (this.#P) throw TypeError("setContentEncryptionKey can only be called once");
          return this.#P = e10, this;
        }
        setInitializationVector(e10) {
          if (this.#C) throw TypeError("setInitializationVector can only be called once");
          return this.#C = e10, this;
        }
        replicateIssuerAsHeader() {
          return this.#x = true, this;
        }
        replicateSubjectAsHeader() {
          return this.#I = true, this;
        }
        replicateAudienceAsHeader() {
          return this.#N = true, this;
        }
        async encrypt(e10, t10) {
          let r10 = new aX(this.#j.data());
          return this.#E && (this.#x || this.#I || this.#N) && (this.#E = { ...this.#E, iss: this.#x ? this.#j.iss : void 0, sub: this.#I ? this.#j.sub : void 0, aud: this.#N ? this.#j.aud : void 0 }), r10.setProtectedHeader(this.#E), this.#C && r10.setInitializationVector(this.#C), this.#P && r10.setContentEncryptionKey(this.#P), this.#O && r10.setKeyManagementParameters(this.#O), r10.encrypt(e10, t10);
        }
      }
      async function aZ(e10, t10, r10, n10, s10) {
        switch (e10) {
          case "dir":
            if (void 0 !== r10) throw new sL("Encountered unexpected JWE Encrypted Key");
            return t10;
          case "ECDH-ES":
            if (void 0 !== r10) throw new sL("Encountered unexpected JWE Encrypted Key");
          case "ECDH-ES+A128KW":
          case "ECDH-ES+A192KW":
          case "ECDH-ES+A256KW": {
            let s11, i10;
            if (!sF(n10.epk)) throw new sL('JOSE Header "epk" (Ephemeral Public Key) missing or invalid');
            if (sT(t10), !aN(t10)) throw new sU("ECDH with the provided key is not allowed or not supported by your javascript runtime");
            let a10 = await is(n10.epk, e10);
            if (sT(a10), void 0 !== n10.apu) {
              if ("string" != typeof n10.apu) throw new sL('JOSE Header "apu" (Agreement PartyUInfo) invalid');
              try {
                s11 = sE(n10.apu);
              } catch {
                throw new sL("Failed to base64url decode the apu");
              }
            }
            if (void 0 !== n10.apv) {
              if ("string" != typeof n10.apv) throw new sL('JOSE Header "apv" (Agreement PartyVInfo) invalid');
              try {
                i10 = sE(n10.apv);
              } catch {
                throw new sL("Failed to base64url decode the apv");
              }
            }
            let o10 = await aI(a10, t10, "ECDH-ES" === e10 ? n10.enc : e10, "ECDH-ES" === e10 ? aK(n10.enc) : parseInt(e10.slice(-5, -2), 10), s11, i10);
            if ("ECDH-ES" === e10) return o10;
            if (void 0 === r10) throw new sL("JWE Encrypted Key missing");
            return aO(e10.slice(-6), o10, r10);
          }
          case "RSA-OAEP":
          case "RSA-OAEP-256":
          case "RSA-OAEP-384":
          case "RSA-OAEP-512":
            if (void 0 === r10) throw new sL("JWE Encrypted Key missing");
            return sT(t10), aH(e10, t10, r10);
          case "PBES2-HS256+A128KW":
          case "PBES2-HS384+A192KW":
          case "PBES2-HS512+A256KW": {
            let i10;
            if (void 0 === r10) throw new sL("JWE Encrypted Key missing");
            if ("number" != typeof n10.p2c) throw new sL('JOSE Header "p2c" (PBES2 Count) missing or invalid');
            let a10 = s10?.maxPBES2Count || 1e4;
            if (n10.p2c > a10) throw new sL('JOSE Header "p2c" (PBES2 Count) out is of acceptable bounds');
            if ("string" != typeof n10.p2s) throw new sL('JOSE Header "p2s" (PBES2 Salt) missing or invalid');
            try {
              i10 = sE(n10.p2s);
            } catch {
              throw new sL("Failed to base64url decode the p2s");
            }
            return a$(e10, t10, r10, n10.p2c, i10);
          }
          case "A128KW":
          case "A192KW":
          case "A256KW":
            if (void 0 === r10) throw new sL("JWE Encrypted Key missing");
            return aO(e10, t10, r10);
          case "A128GCMKW":
          case "A192GCMKW":
          case "A256GCMKW": {
            let s11, i10;
            if (void 0 === r10) throw new sL("JWE Encrypted Key missing");
            if ("string" != typeof n10.iv) throw new sL('JOSE Header "iv" (Initialization Vector) missing or invalid');
            if ("string" != typeof n10.tag) throw new sL('JOSE Header "tag" (Authentication Tag) missing or invalid');
            try {
              s11 = sE(n10.iv);
            } catch {
              throw new sL("Failed to base64url decode the iv");
            }
            try {
              i10 = sE(n10.tag);
            } catch {
              throw new sL("Failed to base64url decode the tag");
            }
            return aF(e10, t10, r10, s11, i10);
          }
          default:
            throw new sU('Invalid or unsupported "alg" (JWE Algorithm) header value');
        }
      }
      async function a0(e10, t10, r10) {
        let n10, s10, i10, a10, o10, c10, l10;
        if (!sF(e10)) throw new sL("Flattened JWE must be an object");
        if (void 0 === e10.protected && void 0 === e10.header && void 0 === e10.unprotected) throw new sL("JOSE Header missing");
        if (void 0 !== e10.iv && "string" != typeof e10.iv) throw new sL("JWE Initialization Vector incorrect type");
        if ("string" != typeof e10.ciphertext) throw new sL("JWE Ciphertext missing or incorrect type");
        if (void 0 !== e10.tag && "string" != typeof e10.tag) throw new sL("JWE Authentication Tag incorrect type");
        if (void 0 !== e10.protected && "string" != typeof e10.protected) throw new sL("JWE Protected Header incorrect type");
        if (void 0 !== e10.encrypted_key && "string" != typeof e10.encrypted_key) throw new sL("JWE Encrypted Key incorrect type");
        if (void 0 !== e10.aad && "string" != typeof e10.aad) throw new sL("JWE AAD incorrect type");
        if (void 0 !== e10.header && !sF(e10.header)) throw new sL("JWE Shared Unprotected Header incorrect type");
        if (void 0 !== e10.unprotected && !sF(e10.unprotected)) throw new sL("JWE Per-Recipient Unprotected Header incorrect type");
        if (e10.protected) try {
          let t11 = sE(e10.protected);
          n10 = JSON.parse(sy.decode(t11));
        } catch {
          throw new sL("JWE Protected Header is invalid");
        }
        if (!iS(n10, e10.header, e10.unprotected)) throw new sL("JWE Protected, JWE Unprotected Header, and JWE Per-Recipient Unprotected Header Parameter names must be disjoint");
        let u2 = { ...n10, ...e10.header, ...e10.unprotected };
        if (iC(sL, /* @__PURE__ */ new Map(), r10?.crit, n10, u2), void 0 !== u2.zip) throw new sU('JWE "zip" (Compression Algorithm) Header Parameter is not supported.');
        let { alg: h2, enc: d2 } = u2;
        if ("string" != typeof h2 || !h2) throw new sL("missing JWE Algorithm (alg) in JWE Header");
        if ("string" != typeof d2 || !d2) throw new sL("missing JWE Encryption Algorithm (enc) in JWE Header");
        let p2 = r10 && iO("keyManagementAlgorithms", r10.keyManagementAlgorithms), f2 = r10 && iO("contentEncryptionAlgorithms", r10.contentEncryptionAlgorithms);
        if (p2 && !p2.has(h2) || !p2 && h2.startsWith("PBES2")) throw new sD('"alg" (Algorithm) Header Parameter value not allowed');
        if (f2 && !f2.has(d2)) throw new sD('"enc" (Encryption Algorithm) Header Parameter value not allowed');
        if (void 0 !== e10.encrypted_key) try {
          s10 = sE(e10.encrypted_key);
        } catch {
          throw new sL("Failed to base64url decode the encrypted_key");
        }
        let g2 = false;
        "function" == typeof t10 && (t10 = await t10(n10, e10), g2 = true), iP("dir" === h2 ? d2 : h2, t10, "decrypt");
        let y2 = await iI(t10, h2);
        try {
          i10 = await aZ(h2, y2, s10, u2, r10);
        } catch (e11) {
          if (e11 instanceof TypeError || e11 instanceof sL || e11 instanceof sU) throw e11;
          i10 = aW(d2);
        }
        if (void 0 !== e10.iv) try {
          a10 = sE(e10.iv);
        } catch {
          throw new sL("Failed to base64url decode the iv");
        }
        if (void 0 !== e10.tag) try {
          o10 = sE(e10.tag);
        } catch {
          throw new sL("Failed to base64url decode the tag");
        }
        let m2 = void 0 !== e10.protected ? s_(e10.protected) : new Uint8Array();
        c10 = void 0 !== e10.aad ? sm(m2, s_("."), s_(e10.aad)) : m2;
        try {
          l10 = sE(e10.ciphertext);
        } catch {
          throw new sL("Failed to base64url decode the ciphertext");
        }
        let w2 = { plaintext: await az(d2, i10, l10, a10, o10, c10) };
        if (void 0 !== e10.protected && (w2.protectedHeader = n10), void 0 !== e10.aad) try {
          w2.additionalAuthenticatedData = sE(e10.aad);
        } catch {
          throw new sL("Failed to base64url decode the aad");
        }
        return (void 0 !== e10.unprotected && (w2.sharedUnprotectedHeader = e10.unprotected), void 0 !== e10.header && (w2.unprotectedHeader = e10.header), g2) ? { ...w2, key: y2 } : w2;
      }
      async function a1(e10, t10, r10) {
        if (e10 instanceof Uint8Array && (e10 = sy.decode(e10)), "string" != typeof e10) throw new sL("Compact JWE must be a string or Uint8Array");
        let { 0: n10, 1: s10, 2: i10, 3: a10, 4: o10, length: c10 } = e10.split(".");
        if (5 !== c10) throw new sL("Invalid Compact JWE");
        let l10 = await a0({ ciphertext: a10, iv: i10 || void 0, protected: n10, tag: o10 || void 0, encrypted_key: s10 || void 0 }, t10, r10), u2 = { plaintext: l10.plaintext, protectedHeader: l10.protectedHeader };
        return "function" == typeof t10 ? { ...u2, key: l10.key } : u2;
      }
      async function a2(e10, t10, r10) {
        let n10 = await a1(e10, t10, r10), s10 = iK(n10.protectedHeader, n10.plaintext, r10), { protectedHeader: i10 } = n10;
        if (void 0 !== i10.iss && i10.iss !== s10.iss) throw new sN('replicated "iss" claim header parameter mismatch', s10, "iss", "mismatch");
        if (void 0 !== i10.sub && i10.sub !== s10.sub) throw new sN('replicated "sub" claim header parameter mismatch', s10, "sub", "mismatch");
        if (void 0 !== i10.aud && JSON.stringify(i10.aud) !== JSON.stringify(s10.aud)) throw new sN('replicated "aud" claim header parameter mismatch', s10, "aud", "mismatch");
        let a10 = { payload: s10, protectedHeader: i10 };
        return "function" == typeof t10 ? { ...a10, key: n10.key } : a10;
      }
      let a5 = "sha256", a8 = "JWE CEK";
      async function a6(e10, t10, r10, n10) {
        let s10 = await am(a5, t10, "", a8, 32);
        return (await new aQ(e10).setProtectedHeader({ enc: "A256GCM", alg: "dir", ...n10 }).setExpirationTime(r10).encrypt(s10)).toString();
      }
      async function a4(e10, t10, r10) {
        try {
          let n10 = await am(a5, t10, "", a8, 32);
          return await a2(e10, n10, { ...r10, clockTolerance: 15 });
        } catch (e11) {
          if ("ERR_JWT_EXPIRED" === e11.code) return null;
          throw e11;
        }
      }
      let a3 = (e10) => am("sha256", e10, "", "JWS Cookie Signing", 32);
      async function a9(e10, t10, r10) {
        if (!t10) return;
        let [n10, s10] = t10.split("."), i10 = { protected: sk(JSON.stringify({ alg: "HS256", b64: false, crit: ["b64"] })), payload: `${e10}=${n10}`, signature: s10 }, a10 = await a3(r10);
        try {
          return await iN(i10, a10, { algorithms: ["HS256"] }), n10;
        } catch (e11) {
          return;
        }
      }
      let a7 = RegExp("__(\\d+)$"), oe = /\.(\d+)$/, ot = (e10, t10) => {
        let r10 = t10 ? oe.exec(e10) : a7.exec(e10);
        if (r10) return parseInt(r10[1], 10);
      }, or = (e10, t10, r10) => {
        let n10 = new RegExp(r10 ? `^${t10}${oe.source}$` : `^${t10}__\\d+$`);
        return e10.getAll().filter((e11) => n10.test(e11.name));
      };
      function on(e10, t10, r10) {
        let n10 = t10.get(e10);
        if (n10?.value) return n10.value;
        let s10 = or(t10, e10, r10).sort((e11, t11) => ot(e11.name, r10) - ot(t11.name, r10));
        if (0 === s10.length) return;
        let i10 = ot(s10[s10.length - 1].name, r10);
        if (s10.length !== i10 + 1) {
          console.warn(`Incomplete chunked cookie '${e10}': Found ${s10.length} chunks, expected ${i10 + 1}`);
          return;
        }
        return s10.map((e11) => e11.value).join("");
      }
      function os(e10, t10, r10, n10, s10) {
        oa(r10, e10, s10), or(t10, e10, n10).forEach((e11) => {
          oa(r10, e11.name, s10);
        });
      }
      function oi(e10) {
        e10.headers.set("Cache-Control", "private, no-cache, no-store, must-revalidate, max-age=0"), e10.headers.set("Pragma", "no-cache"), e10.headers.set("Expires", "0");
      }
      function oa(e10, t10, r10) {
        let n10 = { maxAge: 0 };
        r10?.domain && (n10.domain = r10.domain), r10?.path && (n10.path = r10.path), e10.set(t10, "", n10);
      }
      class oo {
        constructor(e10, t10) {
          this.hooks = t10, this.config = { ...e10, fetch: e10.fetch || ("undefined" == typeof window ? fetch : window.fetch.bind(window)) };
        }
        isAbsoluteUrl(e10) {
          try {
            return new URL(e10), true;
          } catch {
            return false;
          }
        }
        buildUrl(e10, t10) {
          if (t10) {
            if (this.isAbsoluteUrl(t10)) return t10;
            if (e10) return `${e10.replace(/\/?\/$/, "")}/${t10.replace(/^\/+/, "")}`;
          }
          throw TypeError("`url` must be absolute or `baseUrl` non-empty.");
        }
        getAccessToken(e10) {
          return this.config.getAccessToken ? this.config.getAccessToken(e10 ?? {}) : this.hooks.getAccessToken(e10 ?? {});
        }
        buildBaseRequest(e10, t10) {
          let r10;
          return e10 instanceof Request ? r10 = e10.url : e10 instanceof URL ? r10 = e10.toString() : r10 = this.config.baseUrl && !this.isAbsoluteUrl(e10) ? this.buildUrl(this.config.baseUrl, e10) : e10, new Request(r10, t10);
        }
        getHeader(e10, t10) {
          return Array.isArray(e10) ? new Headers(e10).get(t10) || "" : "function" == typeof e10.get ? e10.get(t10) || "" : e10[t10] || "";
        }
        async internalFetchWithAuth(e10, t10, r10, n10) {
          let s10, i10;
          let a10 = this.buildBaseRequest(e10, t10), o10 = await this.getAccessToken(n10);
          "string" == typeof o10 ? (s10 = !!this.config.dpopHandle, i10 = o10) : (s10 = !!this.config.dpopHandle && o10.token_type?.toLowerCase() === "dpop", i10 = o10.accessToken);
          try {
            return await nt(i10, a10.method, new URL(a10.url), a10.headers, a10.body, { ...this.config.httpOptions(), [ro]: (e11, t11) => this.config.fetch(e11, t11), [rs]: this.config.allowInsecureRequests || false, ...s10 && { DPoP: this.config.dpopHandle } });
          } catch (e11) {
            if (rY(e11) && r10.onUseDpopNonceError) return r10.onUseDpopNonceError();
            throw e11;
          }
        }
        isRequestInit(e10) {
          return !!e10 && "object" == typeof e10 && !["refresh", "scope", "audience"].some((t10) => Object.prototype.hasOwnProperty.call(e10, t10));
        }
        fetchWithAuth(e10, t10, r10) {
          let n10, s10;
          2 == arguments.length && void 0 !== t10 ? this.isRequestInit(t10) ? (n10 = t10, s10 = void 0) : (n10 = void 0, s10 = t10) : (n10 = t10, s10 = r10);
          let i10 = { onUseDpopNonceError: async () => {
            let t11 = this.config.retryConfig ?? { delay: 100, jitter: true }, r11 = t11.delay ?? 100;
            t11.jitter && (r11 *= 0.5 + 0.5 * Math.random()), await new Promise((e11) => setTimeout(e11, r11));
            try {
              return await this.internalFetchWithAuth(e10, n10, { ...i10, onUseDpopNonceError: void 0 }, s10);
            } catch (e11) {
              if (rY(e11)) {
                let t12 = Error(`DPoP nonce error persisted after retry: ${e11.message}`);
                throw t12.code = e11.code || "dpop_nonce_retry_failed", t12;
              }
              throw e11;
            }
          } };
          return this.internalFetchWithAuth(e10, n10, i10, s10);
        }
      }
      let oc = ["sub", "name", "nickname", "given_name", "family_name", "picture", "email", "email_verified", "org_id"];
      var ol = function(e10, t10, r10, n10) {
        if ("a" === r10 && !n10) throw TypeError("Private accessor was defined without a getter");
        if ("function" == typeof t10 ? e10 !== t10 || !n10 : !t10.has(e10)) throw TypeError("Cannot read private member from an object whose class did not declare it");
        return "m" === r10 ? n10 : "a" === r10 ? n10.call(e10) : n10 ? n10.value : t10.get(e10);
      };
      let ou = ["client_id", "redirect_uri", "response_type", "code_challenge", "code_challenge_method", "state", "nonce"];
      function oh(e10, t10) {
        return new URL(i7(at(e10)), i9(t10));
      }
      class od {
        constructor(e10) {
          S.add(this), this.proxyFetchers = {}, this.fetch = e10.fetch || fetch, this.jwksCache = e10.jwksCache || {}, this.allowInsecureRequests = e10.allowInsecureRequests ?? false, this.httpTimeout = e10.httpTimeout ?? 5e3, this.httpOptions = () => {
            let t11 = new Headers();
            if (e10.enableTelemetry ?? true) {
              let e11 = "nextjs-auth0", r11 = i4.rE;
              t11.set("User-Agent", `${e11}/${r11}`), t11.set("Auth0-Client", op(JSON.stringify({ name: e11, version: r11 })));
            }
            return { signal: AbortSignal.timeout(this.httpTimeout), headers: t11 };
          }, this.allowInsecureRequests && console.warn("allowInsecureRequests is enabled in a production environment. This is not recommended."), this.transactionStore = e10.transactionStore, this.sessionStore = e10.sessionStore, this.domain = e10.domain, this.clientMetadata = { client_id: e10.clientId }, e10.dpopOptions && ("number" == typeof e10.dpopOptions.clockSkew && (this.clientMetadata[ri] = e10.dpopOptions.clockSkew), "number" == typeof e10.dpopOptions.clockTolerance && (this.clientMetadata[ra] = e10.dpopOptions.clockTolerance)), this.dpopOptions = e10.dpopOptions, this.clientSecret = e10.clientSecret, this.authorizationParameters = e10.authorizationParameters || { scope: t9 }, this.pushedAuthorizationRequests = e10.pushedAuthorizationRequests ?? false, this.clientAssertionSigningKey = e10.clientAssertionSigningKey, this.clientAssertionSigningAlg = e10.clientAssertionSigningAlg || "RS256", this.authorizationParameters.scope = function(e11) {
            if (!e11.scope) return t9;
            if ("object" == typeof e11.scope && !ss(e11.scope, e11.audience)) {
              let t11 = e11.audience;
              return { ...e11.scope, [t11]: t9 };
            }
            return e11.scope;
          }(this.authorizationParameters);
          let t10 = ss(this.authorizationParameters.scope, this.authorizationParameters.audience)?.split(" ").map((e11) => e11.trim());
          if (!t10 || !t10.includes("openid")) throw Error("The 'openid' scope must be included in the set of scopes. See https://auth0.com/docs");
          this.appBaseUrl = e10.appBaseUrl, this.signInReturnToPath = e10.signInReturnToPath || "/";
          let r10 = ["auto", "oidc", "v2"], n10 = e10.logoutStrategy || "auto";
          r10.includes(n10) || (console.error(`Invalid logoutStrategy: ${n10}. Must be one of: ${r10.join(", ")}. Defaulting to "auto"`), n10 = "auto"), this.logoutStrategy = n10, this.includeIdTokenHintInOIDCLogoutUrl = e10.includeIdTokenHintInOIDCLogoutUrl ?? true, this.beforeSessionSaved = e10.beforeSessionSaved, this.onCallback = e10.onCallback || this.defaultOnCallback, this.routes = e10.routes, this.enableAccessTokenEndpoint = e10.enableAccessTokenEndpoint ?? true, this.noContentProfileResponseWhenUnauthenticated = e10.noContentProfileResponseWhenUnauthenticated ?? false, this.enableConnectAccountEndpoint = e10.enableConnectAccountEndpoint ?? false, this.useDPoP = e10.useDPoP ?? false, e10.useDPoP && e10.dpopKeyPair && (this.dpopKeyPair = e10.dpopKeyPair);
        }
        async handler(e10) {
          let { pathname: t10 } = e10.nextUrl, r10 = e10.nextUrl.basePath;
          r10 && t10.startsWith(r10) && (t10 = t10.slice(r10.length) || "/");
          let n10 = ae(t10), s10 = e10.method;
          if ("GET" === s10 && n10 === this.routes.login) return this.handleLogin(e10);
          if ("GET" === s10 && n10 === this.routes.logout) return this.handleLogout(e10);
          if ("GET" === s10 && n10 === this.routes.callback) return this.handleCallback(e10);
          {
            if ("GET" === s10 && n10 === this.routes.profile) return this.handleProfile(e10);
            if ("GET" === s10 && n10 === this.routes.accessToken && this.enableAccessTokenEndpoint) return this.handleAccessToken(e10);
            if ("POST" === s10 && n10 === this.routes.backChannelLogout) return this.handleBackChannelLogout(e10);
            if ("GET" === s10 && n10 === this.routes.connectAccount && this.enableConnectAccountEndpoint) return this.handleConnectAccount(e10);
            if (n10.startsWith("/me/")) return this.handleMyAccount(e10);
            if (n10.startsWith("/my-org/")) return this.handleMyOrg(e10);
            let t11 = eE.next(), r11 = await this.sessionStore.get(e10.cookies);
            return r11 && (await this.sessionStore.set(e10.cookies, t11.cookies, { ...r11 }), oi(t11)), t11;
          }
        }
        async startInteractiveLogin(e10 = {}) {
          let t10 = oh(this.routes.callback, this.appBaseUrl), r10 = this.signInReturnToPath;
          if (e10.returnTo) {
            let t11 = new URL(this.authorizationParameters.redirect_uri || this.appBaseUrl), n11 = ao(e10.returnTo, t11);
            n11 && (r10 = n11.pathname + n11.search + n11.hash);
          }
          let n10 = rI(), s10 = await rN(n10), i10 = rI(), a10 = rI(), o10 = i3(this.authorizationParameters, e10.authorizationParameters, ou);
          if (o10.set("client_id", this.clientMetadata.client_id), o10.set("redirect_uri", t10.toString()), o10.set("response_type", _.CODE), o10.set("code_challenge", s10), o10.set("code_challenge_method", "S256"), o10.set("state", i10), o10.set("nonce", a10), this.dpopKeyPair) try {
            let e11 = await sR(this.dpopKeyPair.publicKey), t11 = await s0(e11);
            o10.set("dpop_jkt", t11);
          } catch (e11) {
            throw new t6(w.DPOP_JKT_CALCULATION_FAILED, "DPoP is enabled but failed to calculate key thumbprint (dpop_jkt). This is required for secure DPoP binding. Please check your key configuration.", e11 instanceof Error ? e11 : void 0);
          }
          let c10 = { nonce: a10, maxAge: this.authorizationParameters.max_age, codeVerifier: n10, responseType: _.CODE, state: i10, returnTo: r10, scope: o10.get("scope") || void 0, audience: o10.get("audience") || void 0 }, [l10, u2] = await this.authorizationUrl(o10);
          if (l10) return new eE("An error occurred while trying to initiate the login request.", { status: 500 });
          let h2 = eE.redirect(u2.toString());
          return await this.transactionStore.save(h2.cookies, c10), h2;
        }
        async handleLogin(e10) {
          let { returnTo: t10, ...r10 } = Object.fromEntries(e10.nextUrl.searchParams.entries());
          return this.startInteractiveLogin({ authorizationParameters: r10, returnTo: t10 });
        }
        async handleLogout(e10) {
          let t10;
          let r10 = await this.sessionStore.get(e10.cookies), [n10, s10] = await this.discoverAuthorizationServerMetadata();
          if (n10) {
            let t11 = new eE("An error occurred while trying to initiate the logout request.", { status: 500 });
            return await this.sessionStore.delete(e10.cookies, t11.cookies), await this.transactionStore.deleteAll(e10.cookies, t11.cookies), t11;
          }
          let i10 = e10.nextUrl.searchParams.get("returnTo") || this.appBaseUrl, a10 = e10.nextUrl.searchParams.has("federated"), o10 = () => {
            let e11 = new URL("/v2/logout", this.issuer);
            return e11.searchParams.set("returnTo", i10), e11.searchParams.set("client_id", this.clientMetadata.client_id), a10 && e11.searchParams.set("federated", ""), eE.redirect(e11);
          }, c10 = () => {
            let e11 = new URL(s10.end_session_endpoint);
            return e11.searchParams.set("client_id", this.clientMetadata.client_id), e11.searchParams.set("post_logout_redirect_uri", i10), r10?.internal.sid && e11.searchParams.set("logout_hint", r10.internal.sid), this.includeIdTokenHintInOIDCLogoutUrl && r10?.tokenSet.idToken && e11.searchParams.set("id_token_hint", r10.tokenSet.idToken), a10 && e11.searchParams.set("federated", ""), eE.redirect(e11);
          };
          if ("v2" === this.logoutStrategy) t10 = o10();
          else if ("oidc" === this.logoutStrategy) {
            if (!s10.end_session_endpoint) {
              let t11 = new eE("OIDC RP-Initiated Logout is not supported by the authorization server. Enable it or use a different logout strategy.", { status: 500 });
              return await this.sessionStore.delete(e10.cookies, t11.cookies), await this.transactionStore.deleteAll(e10.cookies, t11.cookies), t11;
            }
            t10 = c10();
          } else s10.end_session_endpoint ? t10 = c10() : (console.warn("The Auth0 client does not have RP-initiated logout enabled, the user will be redirected to the `/v2/logout` endpoint instead. Learn how to enable it here: https://auth0.com/docs/authenticate/login/logout/log-users-out-of-auth0#enable-endpoint-discovery"), t10 = o10());
          return await this.sessionStore.delete(e10.cookies, t10.cookies), oi(t10), await this.transactionStore.deleteAll(e10.cookies, t10.cookies), t10;
        }
        async handleCallback(e10) {
          let t10, r10, n10, s10, i10;
          let a10 = e10.nextUrl.searchParams.get("state");
          if (!a10) return this.handleCallbackError(new tV(), {}, e10);
          let o10 = await this.transactionStore.get(e10.cookies, a10);
          if (!o10) return this.onCallback(new tF(), {}, null);
          let c10 = o10.payload, l10 = { responseType: c10.responseType, returnTo: c10.returnTo };
          if (c10.responseType === _.CONNECT_CODE) {
            let t11 = await this.sessionStore.get(e10.cookies);
            if (!t11) return this.handleCallbackError(new t3({ code: b.MISSING_SESSION, message: "The user does not have an active session." }), l10, e10, a10);
            let [r11, n11] = await this.getTokenSet(t11, { audience: `${this.issuer}/me/`, scope: "create:me:connected_accounts" });
            if (r11) return this.handleCallbackError(r11, l10, e10, a10);
            let [s11, i11] = await this.completeConnectAccount({ tokenSet: n11.tokenSet, authSession: c10.authSession, connectCode: e10.nextUrl.searchParams.get("connect_code"), redirectUri: oh(this.routes.callback, this.appBaseUrl).toString(), codeVerifier: c10.codeVerifier });
            if (s11) return this.handleCallbackError(s11, l10, e10, a10);
            let o11 = await this.onCallback(null, { ...l10, connectedAccount: i11 }, t11);
            return await this.transactionStore.delete(o11.cookies, a10), o11;
          }
          let [u2, h2] = await this.discoverAuthorizationServerMetadata();
          if (u2) return this.handleCallbackError(u2, l10, e10, a10);
          try {
            t10 = function(e11, t11, r11, n11) {
              var s11;
              if (rL(e11), rM(t11), r11 instanceof URL && (r11 = r11.searchParams), !(r11 instanceof URLSearchParams)) throw rn('"parameters" must be an instance of URLSearchParams, or URL', rr);
              if (nZ(r11, "response")) throw rm('"parameters" contains a JARM response, use validateJwtAuthResponse() instead of validateAuthResponse()', nx, { parameters: r11 });
              let i11 = nZ(r11, "iss"), a11 = nZ(r11, "state");
              if (!i11 && e11.authorization_response_iss_parameter_supported) throw rm('response parameter "iss" (issuer) missing', nx, { parameters: r11 });
              if (i11 && i11 !== e11.issuer) throw rm('unexpected "iss" (issuer) response parameter value', nx, { expected: e11.issuer, parameters: r11 });
              switch (n11) {
                case void 0:
                case n1:
                  if (void 0 !== a11) throw rm('unexpected "state" response parameter encountered', nx, { expected: void 0, parameters: r11 });
                  break;
                case n0:
                  break;
                default:
                  if (rC(n11, '"expectedState" argument'), a11 !== n11) throw rm(void 0 === a11 ? 'response parameter "state" missing' : 'unexpected "state" response parameter value', nx, { expected: n11, parameters: r11 });
              }
              if (nZ(r11, "error")) throw new rZ("authorization response from the server is an error", { cause: r11 });
              let o11 = nZ(r11, "id_token"), c11 = nZ(r11, "token");
              if (void 0 !== o11 || void 0 !== c11) throw new rg("implicit and hybrid flows are not supported");
              return s11 = new URLSearchParams(r11), ny.add(s11), s11;
            }(h2, this.clientMetadata, e10.nextUrl.searchParams, c10.state);
          } catch (t11) {
            return this.handleCallbackError(new tY({ cause: new tJ({ code: t11.error, message: t11.error_description }) }), l10, e10, a10);
          }
          try {
            n10 = oh(this.routes.callback, this.appBaseUrl);
            let e11 = this.useDPoP && this.dpopKeyPair ? rX(this.clientMetadata, this.dpopKeyPair) : void 0;
            s10 = async () => nw(h2, this.clientMetadata, await this.getClientAuth(), t10, n10.toString(), c10.codeVerifier, { ...this.httpOptions(), [ro]: this.fetch, [rs]: this.allowInsecureRequests, ...e11 && { DPoP: e11 } }), r10 = await sr(s10, { isDPoPEnabled: !!e11, ...this.dpopOptions?.retry });
          } catch (t11) {
            return this.handleCallbackError(new tX(t11.message), l10, e10, a10);
          }
          try {
            i10 = await nE(h2, this.clientMetadata, r10, { expectedNonce: c10.nonce, maxAge: c10.maxAge, requireIdToken: true });
          } catch (t11) {
            return this.handleCallbackError(new tQ({ cause: new tJ({ code: t11.error, message: t11.error_description }) }), l10, e10, a10);
          }
          let d2 = nu(i10), p2 = { user: d2, tokenSet: { accessToken: i10.access_token, idToken: i10.id_token, scope: i10.scope, requestedScope: c10.scope, audience: c10.audience, refreshToken: i10.refresh_token, expiresAt: Math.floor(Date.now() / 1e3) + Number(i10.expires_in) }, internal: { sid: d2.sid, createdAt: Math.floor(Date.now() / 1e3) } }, f2 = await this.onCallback(null, l10, p2);
          return p2 = await this.finalizeSession(p2, i10.id_token), await this.sessionStore.set(e10.cookies, f2.cookies, p2, true), oi(f2), await this.transactionStore.delete(f2.cookies, a10), f2;
        }
        async handleProfile(e10) {
          let t10 = await this.sessionStore.get(e10.cookies);
          if (!t10) return this.noContentProfileResponseWhenUnauthenticated ? new eE(null, { status: 204 }) : new eE(null, { status: 401 });
          let r10 = eE.json(t10?.user);
          return oi(r10), r10;
        }
        async handleAccessToken(e10) {
          let t10 = await this.sessionStore.get(e10.cookies), r10 = e10.nextUrl.searchParams.get("audience"), n10 = e10.nextUrl.searchParams.get("scope");
          if (!t10) return eE.json({ error: { message: "The user does not have an active session.", code: g.MISSING_SESSION } }, { status: 401 });
          let [s10, i10] = await this.getTokenSet(t10, { scope: n10, audience: r10 });
          if (s10) return eE.json({ error: { message: s10.message, code: s10.code } }, { status: 401 });
          let { tokenSet: a10 } = i10, o10 = eE.json({ token: a10.accessToken, scope: a10.scope, expires_at: a10.expiresAt, ...a10.token_type && { token_type: a10.token_type } });
          return await ol(this, S, "m", A).call(this, e10, o10, t10, i10), o10;
        }
        async handleBackChannelLogout(e10) {
          if (!this.sessionStore.store) return new eE("A session data store is not configured.", { status: 500 });
          if (!this.sessionStore.store.deleteByLogoutToken) return new eE("Back-channel logout is not supported by the session data store.", { status: 500 });
          let t10 = new URLSearchParams(await e10.text()).get("logout_token");
          if (!t10) return new eE("Missing `logout_token` in the request body.", { status: 400 });
          let [r10, n10] = await this.verifyLogoutToken(t10);
          return r10 ? new eE(r10.message, { status: 400 }) : (await this.sessionStore.store.deleteByLogoutToken(n10), new eE(null, { status: 204 }));
        }
        async handleConnectAccount(e10) {
          let t10 = await this.sessionStore.get(e10.cookies), r10 = e10.nextUrl.searchParams.get("connection"), n10 = e10.nextUrl.searchParams.get("returnTo") ?? void 0, s10 = e10.nextUrl.searchParams.getAll("scopes"), i10 = Object.fromEntries([...e10.nextUrl.searchParams.entries()].filter(([e11]) => "connection" !== e11 && "returnTo" !== e11 && "scopes" !== e11));
          if (!r10) return new eE("A connection is required.", { status: 400 });
          if (!t10) return new eE("The user does not have an active session.", { status: 401 });
          let [a10, o10] = await this.getTokenSet(t10, { scope: "create:me:connected_accounts", audience: `${this.issuer}/me/` });
          if (a10) return new eE("Failed to retrieve a connected account access token.", { status: 401 });
          let { tokenSet: c10 } = o10, l10 = { connection: r10, authorizationParams: i10, returnTo: n10 };
          s10.length > 0 && (l10.scopes = s10);
          let [u2, h2] = await this.connectAccount({ tokenSet: c10, ...l10 });
          return u2 ? new eE(u2.message, { status: u2.cause?.status ?? 500 }) : (await ol(this, S, "m", A).call(this, e10, h2, t10, o10), h2);
        }
        async handleMyAccount(e10) {
          return ol(this, S, "m", T).call(this, e10, { proxyPath: "/me", targetBaseUrl: `${this.issuer}/me/v1`, audience: `${this.issuer}/me/`, scope: e10.headers.get("scope") });
        }
        async handleMyOrg(e10) {
          return ol(this, S, "m", T).call(this, e10, { proxyPath: "/my-org", targetBaseUrl: `${this.issuer}/my-org`, audience: `${this.issuer}/my-org/`, scope: e10.headers.get("scope") });
        }
        async getTokenSet(e10, t10 = {}) {
          let r10 = sc(ss(this.authorizationParameters.scope, t10.audience ?? this.authorizationParameters.audience), t10.scope), n10 = ol(this, S, "m", E).call(this, e10, { scope: r10, audience: t10.audience ?? this.authorizationParameters.audience });
          if (!n10.refreshToken && !n10.accessToken) return [new t2(g.MISSING_REFRESH_TOKEN, "No access token found and a refresh token was not provided. The user needs to re-authenticate."), null];
          if (!n10.refreshToken && n10.accessToken && n10.expiresAt && n10.expiresAt <= Date.now() / 1e3) return [new t2(g.MISSING_REFRESH_TOKEN, "The access token has expired and a refresh token was not provided. The user needs to re-authenticate."), null];
          if (n10.refreshToken && (t10.refresh || !n10.expiresAt || n10.expiresAt <= Date.now() / 1e3)) {
            let [e11, s10] = await ol(this, S, "m", P).call(this, n10, { audience: t10.audience, scope: t10.scope ? r10 : void 0, requestedScope: r10 });
            return e11 ? [e11, null] : [null, { tokenSet: s10.updatedTokenSet, idTokenClaims: s10.idTokenClaims }];
          }
          return [null, { tokenSet: n10, idTokenClaims: void 0 }];
        }
        async backchannelAuthentication(e10) {
          let [t10, r10] = await this.discoverAuthorizationServerMetadata();
          if (t10) return [t10, null];
          if (!r10.backchannel_authentication_endpoint) return [new t0(), null];
          let n10 = i3(this.authorizationParameters, e10.authorizationParams, ou);
          n10.get("scope") || n10.set("scope", t9), n10.set("client_id", this.clientMetadata.client_id), n10.set("binding_message", e10.bindingMessage), n10.set("login_hint", JSON.stringify({ format: "iss_sub", iss: r10.issuer, sub: e10.loginHint.sub })), e10.requestedExpiry && n10.append("requested_expiry", e10.requestedExpiry.toString()), e10.authorizationDetails && n10.append("authorization_details", JSON.stringify(e10.authorizationDetails));
          let [s10, i10] = await this.getOpenIdClientConfig();
          if (s10) return [s10, null];
          try {
            let e11 = await i1(i10, n10), t11 = await i2(i10, e11), r11 = Math.floor(Date.now() / 1e3) + Number(t11.expires_in);
            return [null, { tokenSet: { accessToken: t11.access_token, idToken: t11.id_token, scope: t11.scope, refreshToken: t11.refresh_token, expiresAt: r11 }, idTokenClaims: t11.claims(), authorizationDetails: t11.authorization_details }];
          } catch (e11) {
            return [new t1({ cause: new tJ({ code: e11.error, message: e11.error_description }) }), null];
          }
        }
        async discoverAuthorizationServerMetadata() {
          if (this.authorizationServerMetadata) return [null, this.authorizationServerMetadata];
          let e10 = new URL(this.issuer);
          try {
            let t10 = await rA(e10, { ...this.httpOptions(), [ro]: this.fetch, [rs]: this.allowInsecureRequests }).then((t11) => rO(e10, t11));
            return this.authorizationServerMetadata = t10, [null, t10];
          } catch (t10) {
            return console.error(`An error occurred while performing the discovery request. issuer=${e10.toString()}, error:`, t10), [new tz("Discovery failed for the OpenID Connect configuration."), null];
          }
        }
        async defaultOnCallback(e10, t10) {
          return e10 ? new eE(e10.message, { status: 500 }) : eE.redirect(oh(t10.returnTo || "/", this.appBaseUrl));
        }
        async handleCallbackError(e10, t10, r10, n10) {
          let s10 = await this.onCallback(e10, t10, null);
          return n10 && await this.transactionStore.delete(s10.cookies, n10), s10;
        }
        async verifyLogoutToken(e10) {
          let [t10, r10] = await this.discoverAuthorizationServerMetadata();
          if (t10) return [t10, null];
          let n10 = function(e11, t11) {
            let r11 = new id(e11, t11), n11 = async (e12, t12) => r11.getKey(e12, t12);
            return Object.defineProperties(n11, { coolingDown: { get: () => r11.coolingDown(), enumerable: true, configurable: false }, fresh: { get: () => r11.fresh(), enumerable: true, configurable: false }, reload: { value: () => r11.reload(), enumerable: true, configurable: false, writable: false }, reloading: { get: () => r11.pendingFetch(), enumerable: true, configurable: false }, jwks: { value: () => r11.jwks(), enumerable: true, configurable: false, writable: false } }), n11;
          }(new URL(r10.jwks_uri), { [ih]: this.jwksCache }), { payload: s10 } = await iB(e10, n10, { issuer: r10.issuer, audience: this.clientMetadata.client_id, algorithms: ["RS256"], requiredClaims: ["iat"] });
          return "sid" in s10 || "sub" in s10 ? "sid" in s10 && "string" != typeof s10.sid ? [new tZ('"sid" claim must be a string'), null] : "sub" in s10 && "string" != typeof s10.sub ? [new tZ('"sub" claim must be a string'), null] : "nonce" in s10 ? [new tZ('"nonce" claim is prohibited'), null] : "events" in s10 ? "object" != typeof s10.events || null === s10.events ? [new tZ('"events" claim must be an object'), null] : "http://schemas.openid.net/event/backchannel-logout" in s10.events ? "object" != typeof s10.events["http://schemas.openid.net/event/backchannel-logout"] ? [new tZ('"http://schemas.openid.net/event/backchannel-logout" member in the "events" claim must be an object'), null] : [null, { sid: s10.sid, sub: s10.sub }] : [new tZ('"http://schemas.openid.net/event/backchannel-logout" member is missing in the "events" claim'), null] : [new tZ('"events" claim is missing'), null] : [new tZ('either "sid" or "sub" (or both) claims must be present'), null];
        }
        async authorizationUrl(e10) {
          let [t10, r10] = await this.discoverAuthorizationServerMetadata();
          if (t10) return [t10, null];
          if (this.pushedAuthorizationRequests && !r10.pushed_authorization_request_endpoint) return console.error("The Auth0 tenant does not have pushed authorization requests enabled. Learn how to enable it here: https://auth0.com/docs/get-started/applications/configure-par"), [Error("The authorization server does not support pushed authorization requests."), null];
          let n10 = new URL(r10.authorization_endpoint);
          if (this.pushedAuthorizationRequests) {
            let t11;
            let s10 = await rF(r10, this.clientMetadata, await this.getClientAuth(), e10, { ...this.httpOptions(), [ro]: this.fetch, [rs]: this.allowInsecureRequests });
            try {
              t11 = await r4(r10, this.clientMetadata, s10);
            } catch (e11) {
              return [new tY({ cause: new tJ({ code: e11.error, message: e11.error_description }), message: "An error occurred while pushing the authorization request." }), null];
            }
            return n10.searchParams.set("request_uri", t11.request_uri), n10.searchParams.set("client_id", this.clientMetadata.client_id), [null, n10];
          }
          return n10.search = e10.toString(), [null, n10];
        }
        async getClientAuth() {
          if (!this.clientSecret && !this.clientAssertionSigningKey) throw Error("The client secret or client assertion signing key must be provided.");
          let e10 = this.clientAssertionSigningKey;
          return e10 && "string" == typeof e10 && (e10 = await ir(e10, this.clientAssertionSigningAlg)), e10 ? function(e11, t10) {
            let { key: r10, kid: n10 } = e11 instanceof CryptoKey ? { key: e11 } : e11?.key instanceof CryptoKey ? (void 0 !== e11.kid && rC(e11.kid, '"kid"'), { key: e11.key, kid: e11.kid }) : {};
            return rv(r10, '"clientPrivateKey.key"'), async (e12, t11, s10, i10) => {
              let a10 = { alg: rj(r10), kid: n10 }, o10 = function(e13, t12) {
                let r11 = r$() + rD(t12);
                return { jti: rI(), aud: e13.issuer, exp: r11 + 60, iat: r11, nbf: r11, iss: t12.client_id, sub: t12.client_id };
              }(e12, t11);
              s10.set("client_id", t11.client_id), s10.set("client_assertion_type", "urn:ietf:params:oauth:client-assertion-type:jwt-bearer"), s10.set("client_assertion", await rK(a10, o10, r10));
            };
          }(e10) : rH(this.clientSecret);
        }
        get issuer() {
          return this.domain.startsWith("http://") || this.domain.startsWith("https://") ? this.domain : `https://${this.domain}`;
        }
        async getConnectionTokenSet(e10, t10, r10) {
          if (!e10.refreshToken && (!t10 || t10.expiresAt <= Date.now() / 1e3)) return [new t5(y.MISSING_REFRESH_TOKEN, "A refresh token was not present, Connection Access Token requires a refresh token. The user needs to re-authenticate."), null];
          if (e10.refreshToken && (!t10 || t10.expiresAt <= Date.now() / 1e3)) {
            let t11;
            let n10 = new URLSearchParams();
            n10.append("connection", r10.connection);
            let s10 = r10.subject_token_type ?? v.SUBJECT_TYPE_REFRESH_TOKEN, i10 = s10 === v.SUBJECT_TYPE_ACCESS_TOKEN ? e10.accessToken : e10.refreshToken;
            n10.append("subject_token_type", s10), n10.append("subject_token", i10), n10.append("requested_token_type", "http://auth0.com/oauth/token-type/federated-connection-access-token"), r10.login_hint && n10.append("login_hint", r10.login_hint);
            let [a10, o10] = await this.discoverAuthorizationServerMetadata();
            if (a10) return [a10, null];
            let c10 = this.useDPoP && this.dpopKeyPair ? rX(this.clientMetadata, this.dpopKeyPair) : void 0, l10 = async () => nW(o10, this.clientMetadata, await this.getClientAuth(), "urn:auth0:params:oauth:grant-type:token-exchange:federated-connection-access-token", n10, { [ro]: this.fetch, [rs]: this.allowInsecureRequests, ...c10 && { DPoP: c10 } }), u2 = async () => {
              let e11 = await l10();
              return nB(o10, this.clientMetadata, e11);
            };
            try {
              t11 = await sr(u2, { isDPoPEnabled: !!(this.useDPoP && this.dpopKeyPair), ...this.dpopOptions?.retry });
            } catch (e11) {
              return [new t5(y.FAILED_TO_EXCHANGE, "There was an error trying to exchange the refresh token for a connection access token.", new tJ({ code: e11.error, message: e11.error_description })), null];
            }
            return [null, { accessToken: t11.access_token, expiresAt: Math.floor(Date.now() / 1e3) + Number(t11.expires_in), scope: t11.scope, connection: r10.connection }];
          }
          return [null, t10];
        }
        validateSubjectTokenType(e10) {
          if (e10.length < 10) return new t8(m.INVALID_SUBJECT_TOKEN_TYPE, `Invalid subject_token_type: must be at least 10 characters. Received ${e10.length} characters.`);
          if (e10.length > 100) return new t8(m.INVALID_SUBJECT_TOKEN_TYPE, `Invalid subject_token_type: must be at most 100 characters. Received ${e10.length} characters.`);
          let t10 = false;
          try {
            new URL(e10), t10 = true;
          } catch {
          }
          let r10 = /^urn:[a-z0-9][a-z0-9-]{0,31}:[a-z0-9()+,\-.:=@;$_!*'%/?#]+$/i.test(e10);
          return t10 || r10 ? null : new t8(m.INVALID_SUBJECT_TOKEN_TYPE, `Invalid subject_token_type: must be a valid URI (URL or URN format). Received: "${e10}"`);
        }
        async customTokenExchange(e10) {
          let t10;
          if (!e10.subjectToken || "" === e10.subjectToken.trim()) return [new t8(m.MISSING_SUBJECT_TOKEN, "The subject_token is required and cannot be empty."), null];
          let r10 = this.validateSubjectTokenType(e10.subjectTokenType);
          if (r10) return [r10, null];
          if (e10.actorToken && !e10.actorTokenType) return [new t8(m.MISSING_ACTOR_TOKEN_TYPE, "The actor_token_type is required when actor_token is provided."), null];
          let [n10, s10] = await this.discoverAuthorizationServerMetadata();
          if (n10) return [new t8(m.EXCHANGE_FAILED, "Failed to discover authorization server metadata.", new tJ({ code: "discovery_error", message: n10.message })), null];
          let i10 = sc(t9, e10.scope), a10 = new URLSearchParams();
          if (a10.append("subject_token", e10.subjectToken), a10.append("subject_token_type", e10.subjectTokenType), a10.append("scope", i10), e10.audience && a10.append("audience", e10.audience), e10.organization && a10.append("organization", e10.organization), e10.actorToken && e10.actorTokenType && (a10.append("actor_token", e10.actorToken), a10.append("actor_token_type", e10.actorTokenType)), e10.additionalParameters) for (let [t11, r11] of Object.entries(e10.additionalParameters)) null != r11 && a10.append(t11, String(r11));
          let o10 = this.useDPoP && this.dpopKeyPair ? rX(this.clientMetadata, this.dpopKeyPair) : void 0, c10 = async () => {
            let e11 = await nW(s10, this.clientMetadata, await this.getClientAuth(), "urn:ietf:params:oauth:grant-type:token-exchange", a10, { [ro]: this.fetch, [rs]: this.allowInsecureRequests, ...o10 && { DPoP: o10 } });
            return nB(s10, this.clientMetadata, e11);
          };
          try {
            t10 = await sr(c10, { isDPoPEnabled: !!(this.useDPoP && this.dpopKeyPair), ...this.dpopOptions?.retry });
          } catch (e11) {
            return [new t8(m.EXCHANGE_FAILED, "There was an error trying to exchange the token.", new tJ({ code: e11.error ?? "unknown_error", message: e11.error_description ?? e11.message })), null];
          }
          return [null, { accessToken: t10.access_token, idToken: t10.id_token, refreshToken: t10.refresh_token, tokenType: t10.token_type ?? "Bearer", expiresIn: Number(t10.expires_in), scope: t10.scope }];
        }
        async finalizeSession(e10, t10) {
          if (this.beforeSessionSaved) e10 = { ...await this.beforeSessionSaved(e10, t10 ?? null), internal: e10.internal };
          else {
            var r10;
            e10.user = Object.keys(r10 = e10.user).reduce((e11, t11) => (oc.includes(t11) && (e11[t11] = r10[t11]), e11), {});
          }
          return e10;
        }
        async connectAccount(e10) {
          let t10 = oh(this.routes.callback, this.appBaseUrl), r10 = this.signInReturnToPath;
          if (e10.returnTo) {
            let t11 = new URL(this.authorizationParameters.redirect_uri || this.appBaseUrl), n11 = ao(e10.returnTo, t11);
            n11 && (r10 = n11.pathname + n11.search + n11.hash);
          }
          let n10 = rI(), s10 = await rN(n10), i10 = rI(), [a10, o10] = await this.createConnectAccountTicket({ tokenSet: e10.tokenSet, connection: e10.connection, redirectUri: t10.toString(), state: i10, codeChallenge: s10, codeChallengeMethod: "S256", scopes: e10.scopes, authorizationParams: e10.authorizationParams });
          if (a10) return [a10, null];
          let c10 = { codeVerifier: n10, responseType: _.CONNECT_CODE, state: i10, returnTo: r10, authSession: o10.authSession }, l10 = eE.redirect(`${o10.connectUri}?ticket=${encodeURIComponent(o10.connectParams.ticket)}`);
          return await this.transactionStore.save(l10.cookies, c10), [null, l10];
        }
        async createConnectAccountTicket(e10) {
          try {
            let t10 = new URL("/me/v1/connected-accounts/connect", this.issuer), r10 = await this.fetcherFactory({ useDPoP: this.useDPoP, getAccessToken: async () => ({ accessToken: e10.tokenSet.accessToken, expiresAt: e10.tokenSet.expiresAt || 0, scope: e10.tokenSet.scope, token_type: e10.tokenSet.token_type }), fetch: this.fetch }), n10 = this.httpOptions();
            new Headers(n10.headers).set("Content-Type", "application/json");
            let s10 = { connection: e10.connection, redirect_uri: e10.redirectUri, state: e10.state, code_challenge: e10.codeChallenge, code_challenge_method: e10.codeChallengeMethod, scopes: e10.scopes, authorization_params: e10.authorizationParams }, i10 = await r10.fetchWithAuth(t10.toString(), { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(s10) });
            if (!i10.ok) return of(i10, b.FAILED_TO_INITIATE);
            let { connect_uri: a10, connect_params: o10, auth_session: c10, expires_in: l10 } = await i10.json();
            return [null, { connectUri: a10, connectParams: o10, authSession: c10, expiresIn: l10 }];
          } catch (t10) {
            let e11 = "An unexpected error occurred while trying to initiate the connect account flow.";
            return t10 instanceof t6 && (e11 = t10.message), [new t3({ code: b.FAILED_TO_INITIATE, message: e11 }), null];
          }
        }
        async completeConnectAccount(e10) {
          let t10 = new URL("/me/v1/connected-accounts/complete", this.issuer);
          try {
            let r10 = this.httpOptions();
            new Headers(r10.headers).set("Content-Type", "application/json");
            let n10 = await this.fetcherFactory({ useDPoP: this.useDPoP, getAccessToken: async () => ({ accessToken: e10.tokenSet.accessToken, expiresAt: e10.tokenSet.expiresAt || 0, scope: e10.tokenSet.scope, token_type: e10.tokenSet.token_type }), fetch: this.fetch }), s10 = { auth_session: e10.authSession, connect_code: e10.connectCode, redirect_uri: e10.redirectUri, code_verifier: e10.codeVerifier }, i10 = await n10.fetchWithAuth(t10, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(s10) });
            if (!i10.ok) return of(i10, b.FAILED_TO_COMPLETE);
            let { id: a10, connection: o10, access_type: c10, scopes: l10, created_at: u2, expires_at: h2 } = await i10.json();
            return [null, { id: a10, connection: o10, accessType: c10, scopes: l10, createdAt: u2, expiresAt: h2 }];
          } catch (e11) {
            return [new t3({ code: b.FAILED_TO_COMPLETE, message: "An unexpected error occurred while trying to complete the connect account flow." }), null];
          }
        }
        async getOpenIdClientConfig() {
          let [e10, t10] = await this.discoverAuthorizationServerMetadata();
          if (e10) return [e10, null];
          let r10 = new iQ(t10, this.clientMetadata.client_id, {}, await this.getClientAuth()), n10 = new Headers(this.httpOptions().headers);
          return r10[ro] = (...e11) => {
            let t11 = new Headers(e11[1].headers);
            return this.fetch(e11[0], { ...e11[1], body: e11[1].body, headers: new Headers([...n10, ...t11]) });
          }, r10.timeout = this.httpTimeout, this.allowInsecureRequests && (iq(r10).tlsOnly = false), [null, r10];
        }
        async fetcherFactory(e10) {
          if (this.useDPoP && !this.dpopKeyPair) throw new t6(w.DPOP_CONFIGURATION_ERROR, "DPoP is enabled but no keypair is configured.");
          let [t10, r10] = await this.discoverAuthorizationServerMetadata();
          if (t10) throw t10;
          return new oo({ dpopHandle: this.useDPoP && (e10.useDPoP ?? true) ? rX(this.clientMetadata, this.dpopKeyPair) : void 0, httpOptions: this.httpOptions, allowInsecureRequests: this.allowInsecureRequests, retryConfig: this.dpopOptions?.retry, fetch: e10.fetch, getAccessToken: e10.getAccessToken, baseUrl: e10.baseUrl }, { getAccessToken: e10.getAccessToken, isDpopEnabled: () => e10.useDPoP ?? this.useDPoP ?? false });
        }
      }
      S = /* @__PURE__ */ new WeakSet(), E = function(e10, t10) {
        var r10;
        let n10;
        let s10 = e10.tokenSet, i10 = t10.audience, a10 = t10.scope, o10 = !i10 || i10 === (s10.audience || this.authorizationParameters.audience), c10 = !a10 || so(s10.requestedScope || ss(this.authorizationParameters.scope, i10), a10);
        return o10 && c10 ? s10 : (i10 && (n10 = sl(e10, { scope: a10, audience: i10 })), r10 = n10, { ...s10, accessToken: r10?.accessToken, expiresAt: r10?.expiresAt, scope: r10?.scope, requestedScope: r10?.requestedScope, audience: r10?.audience, ...r10?.token_type && { token_type: r10.token_type } });
      }, k = async function(e10, t10) {
        let r10 = as(e10), n10 = aa(e10, t10);
        r10.set("host", n10.host);
        try {
          let e11 = await this.fetch(n10.toString(), { method: "OPTIONS", headers: r10 });
          return new eE(null, { status: e11.status, headers: ai(e11) });
        } catch (e11) {
          return new eE(e11.cause || e11.message || "Preflight request failed", { status: 500 });
        }
      }, T = async function(e10, t10) {
        let r10;
        let n10 = await this.sessionStore.get(e10.cookies);
        if (!n10) return new eE("The user does not have an active session.", { status: 401 });
        if ("OPTIONS" === e10.method && e10.headers.has("access-control-request-method")) return ol(this, S, "m", k).call(this, e10, t10);
        let s10 = as(e10), i10 = this.useDPoP ? e10.clone() : e10, a10 = aa(e10, t10);
        s10.set("host", a10.host);
        let o10 = i10.body ? await i10.arrayBuffer() : void 0, c10 = async (e11) => {
          let [t11, s11] = await this.getTokenSet(n10, { audience: e11.audience, scope: e11.scope });
          if (t11) throw t11;
          return r10 = s11, s11.tokenSet;
        }, l10 = this.proxyFetchers[t10.audience];
        l10 ? l10.getAccessToken = c10 : (l10 = await this.fetcherFactory({ useDPoP: this.useDPoP, fetch: this.fetch, getAccessToken: c10 }), this.proxyFetchers[t10.audience] = l10);
        try {
          let c11 = await l10.fetchWithAuth(a10.toString(), { method: i10.method, headers: s10, body: o10 }, { scope: t10.scope, audience: t10.audience }), u2 = new eE(c11.body, { status: c11.status, statusText: c11.statusText, headers: ai(c11) });
          return r10 && await ol(this, S, "m", A).call(this, e10, u2, n10, r10), u2;
        } catch (e11) {
          if (e11 instanceof t2 && e11.code === g.MISSING_REFRESH_TOKEN) return new eE(e11.message, { status: 401 });
          return new eE(e11.cause || e11.message || "An error occurred while proxying the request.", { status: 500 });
        }
      }, A = async function(e10, t10, r10, n10) {
        let s10 = sh(r10, n10.tokenSet, { scope: this.authorizationParameters?.scope ?? t9, audience: this.authorizationParameters?.audience });
        if (s10) {
          n10.idTokenClaims && (r10.user = n10.idTokenClaims);
          let i10 = await this.finalizeSession({ ...r10, ...s10 }, n10.tokenSet.idToken);
          await this.sessionStore.set(e10.cookies, t10.cookies, i10), oi(t10);
        }
      }, P = async function(e10, t10) {
        let r10;
        let [n10, s10] = await this.discoverAuthorizationServerMetadata();
        if (n10) return [n10, null];
        let i10 = new URLSearchParams();
        t10.scope && i10.append("scope", t10.scope), t10.audience && i10.append("audience", t10.audience);
        let a10 = this.useDPoP && this.dpopKeyPair ? rX(this.clientMetadata, this.dpopKeyPair) : void 0, o10 = async () => no(s10, this.clientMetadata, await this.getClientAuth(), e10.refreshToken, { ...this.httpOptions(), [ro]: this.fetch, [rs]: this.allowInsecureRequests, additionalParameters: i10, ...a10 && { DPoP: a10 } }), c10 = (e11) => np(s10, this.clientMetadata, e11);
        try {
          r10 = await sr(async () => {
            let e11 = await o10();
            return await c10(e11);
          }, { isDPoPEnabled: !!(this.useDPoP && this.dpopKeyPair), ...this.dpopOptions?.retry });
        } catch (e11) {
          return [new t2(g.FAILED_TO_REFRESH_TOKEN, "The access token has expired and there was an error while trying to refresh it.", new tJ({ code: e11.error, message: e11.error_description })), null];
        }
        let l10 = nu(r10), u2 = Math.floor(Date.now() / 1e3) + Number(r10.expires_in), h2 = { ...e10, accessToken: r10.access_token, idToken: r10.id_token, scope: r10.scope, requestedScope: t10.requestedScope, expiresAt: u2, audience: e10.audience || t10.audience || void 0, ...r10.token_type && { token_type: r10.token_type } };
        return r10.refresh_token ? h2.refreshToken = r10.refresh_token : h2.refreshToken = e10.refreshToken, [null, { updatedTokenSet: h2, idTokenClaims: l10 }];
      };
      let op = (e10) => {
        let t10 = new TextEncoder().encode(e10), r10 = [];
        for (let e11 = 0; e11 < t10.length; e11 += 32768) r10.push(String.fromCharCode.apply(null, t10.subarray(e11, e11 + 32768)));
        return btoa(r10.join(""));
      };
      async function of(e10, t10) {
        let r10 = t10 === b.FAILED_TO_INITIATE ? "initiate" : "complete";
        try {
          let n10 = await e10.json();
          return [new t3({ code: t10, message: `The request to ${r10} the connect account flow failed with status ${e10.status}.`, cause: new t4({ type: n10.type, title: n10.title, detail: n10.detail, status: e10.status, validationErrors: n10.validation_errors }) }), null];
        } catch (n10) {
          return [new t3({ code: t10, message: `The request to ${r10} the connect account flow failed with status ${e10.status}.` }), null];
        }
      }
      function og(e10) {
        if (e10 instanceof ew) return e10;
        let t10 = function(e11) {
          let t11;
          try {
            let r11 = e11.nextUrl;
            if (!r11) return;
            "string" == typeof r11.basePath && r11.basePath && (t11 = { basePath: r11.basePath }), ("string" == typeof r11.locale || "string" == typeof r11.defaultLocale) && (t11 = { ...t11 || {}, i18n: { locales: r11.locale ? [r11.locale] : [], defaultLocale: r11.defaultLocale } }), "boolean" == typeof r11.trailingSlash && (t11 = { ...t11 || {}, trailingSlash: r11.trailingSlash });
          } catch {
          }
          return t11 && Object.keys(t11).length ? t11 : void 0;
        }(e10), r10 = { method: e10.method, headers: e10.headers, body: e10.body, duplex: e10.duplex ?? "half" };
        return t10 && (r10.nextConfig = t10), new ew(e10.url, r10);
      }
      let oy = (e10) => (t10) => async (r10, n10) => {
        let s10 = r10 instanceof Request ? og(r10) : r10, i10 = await e10.getSession();
        if (!i10 || !i10.user) return eE.json({ error: "not_authenticated", description: "The user does not have an active session or is not authenticated" }, { status: 401 });
        let a10 = await t10(s10, n10);
        return a10 instanceof eE ? a10 : new eE(a10.body, a10);
      }, om = (e10) => (t10) => async (r10, n10) => {
        let s10 = await e10.getSession(r10);
        if (!s10 || !s10.user) {
          n10.status(401).json({ error: "not_authenticated", description: "The user does not have an active session or is not authenticated" });
          return;
        }
        await t10(r10, n10);
      }, ow = (e10, t10) => (n10, s10 = {}) => async (i10) => {
        let a10 = await e10.getSession();
        if (!a10?.user) {
          let e11 = "function" == typeof s10.returnTo ? await s10.returnTo(i10) : s10.returnTo, { redirect: n11 } = await Promise.resolve().then(r.bind(r, 61));
          n11(`${t10.loginUrl}${e11 ? `?returnTo=${encodeURIComponent(e11)}` : ""}`);
        }
        return n10(i10);
      }, ob = (e10, t10) => ({ getServerSideProps: r10, returnTo: n10 } = {}) => async (s10) => {
        let i10 = await e10.getSession(s10.req);
        if (!i10?.user) return { redirect: { destination: `${t10.loginUrl}?returnTo=${encodeURIComponent(n10 || s10.resolvedUrl)}`, permanent: false } };
        let a10 = { props: {} };
        if (r10 && (a10 = await r10(s10)), a10.props instanceof Promise) {
          let e11 = await a10.props;
          return { ...a10, props: { user: i10.user, ...e11 } };
        }
        return { ...a10, props: { user: i10.user, ...a10.props } };
      };
      class ov {
        constructor({ secret: e10, rolling: t10 = true, absoluteDuration: r10 = 259200, inactivityDuration: n10 = 86400, store: s10, cookieOptions: i10 }) {
          this.secret = e10, this.rolling = t10, this.absoluteDuration = r10, this.inactivityDuration = n10, this.store = s10, this.sessionCookieName = i10?.name ?? "__session", this.cookieConfig = { httpOnly: true, sameSite: i10?.sameSite ?? "lax", secure: i10?.secure ?? false, path: i10?.path ?? "/", domain: i10?.domain, transient: i10?.transient };
        }
        epoch() {
          return Date.now() / 1e3 | 0;
        }
        calculateMaxAge(e10) {
          if (!this.rolling) return this.absoluteDuration;
          let t10 = this.epoch(), r10 = Math.min(t10 + this.inactivityDuration, e10 + this.absoluteDuration) - t10;
          return r10 > 0 ? r10 : 0;
        }
      }
      let o_ = "appSession";
      function oS(e10, t10) {
        let r10 = t10.user;
        return { user: r10, tokenSet: { idToken: t10.idToken ?? void 0, accessToken: t10.accessToken ?? void 0, scope: t10.accessTokenScope, refreshToken: t10.refreshToken, expiresAt: t10.accessTokenExpiresAt }, internal: { sid: r10.sid, createdAt: e10.iat } };
      }
      let oE = () => {
        let e10 = new Uint8Array(16);
        return crypto.getRandomValues(e10), Array.from(e10).map((e11) => e11.toString(16).padStart(2, "0")).join("");
      };
      class ok extends ov {
        constructor({ secret: e10, store: t10, rolling: r10, absoluteDuration: n10, inactivityDuration: s10, cookieOptions: i10 }) {
          super({ secret: e10, rolling: r10, absoluteDuration: n10, inactivityDuration: s10, cookieOptions: i10 }), this.store = t10;
        }
        async get(e10) {
          let t10 = e10.get(this.sessionCookieName) || e10.get(o_);
          if (!t10 || !t10.value) return null;
          let r10 = null;
          try {
            let e11 = await a4(t10.value, this.secret);
            if (null === e11) return null;
            r10 = e11.payload.id;
          } catch (e11) {
            if ("ERR_JWE_INVALID" === e11.code) {
              let e12 = await a9(t10.name, t10.value, this.secret);
              if (!e12) return null;
              r10 = e12;
            }
          }
          if (!r10) return null;
          let n10 = await this.store.get(r10);
          return n10 ? n10.header?.iat ? oS(n10.header, n10.data) : n10 : null;
        }
        async set(e10, t10, r10, n10 = false) {
          let s10 = null, i10 = e10.get(this.sessionCookieName)?.value;
          if (i10) {
            let e11 = await a4(i10, this.secret);
            e11 && (s10 = e11.payload.id);
          }
          s10 && n10 && (await this.store.delete(s10), s10 = oE()), s10 || (s10 = oE());
          let a10 = this.calculateMaxAge(r10.internal.createdAt), o10 = this.epoch(), c10 = await a6({ id: s10 }, this.secret, o10 + a10);
          t10.set(this.sessionCookieName, c10.toString(), { ...this.cookieConfig, maxAge: a10 }), await this.store.set(s10, r10), e10.set(this.sessionCookieName, c10.toString()), this.sessionCookieName !== o_ && e10.has(o_) && oa(t10, o_, { domain: this.cookieConfig.domain, path: this.cookieConfig.path });
        }
        async delete(e10, t10) {
          let r10 = e10.get(this.sessionCookieName)?.value;
          if (oa(t10, this.sessionCookieName, { domain: this.cookieConfig.domain, path: this.cookieConfig.path }), !r10) return;
          let n10 = await a4(r10, this.secret);
          n10 && await this.store.delete(n10.payload.id);
        }
      }
      class oT extends ov {
        constructor({ secret: e10, rolling: t10, absoluteDuration: r10, inactivityDuration: n10, cookieOptions: s10 }) {
          super({ secret: e10, rolling: t10, absoluteDuration: r10, inactivityDuration: n10, cookieOptions: s10 }), this.connectionTokenSetsCookieName = "__FC";
        }
        async get(e10) {
          let t10 = on(this.sessionCookieName, e10) ?? on(o_, e10, true);
          if (!t10) return null;
          let r10 = await a4(t10, this.secret);
          if (!r10) return null;
          let n10 = r10.protectedHeader.iat ? oS(r10.protectedHeader, r10.payload) : r10.payload, s10 = this.getConnectionTokenSetsCookies(e10), i10 = [];
          for (let e11 of s10) {
            let t11 = await a4(e11.value, this.secret);
            t11 && i10.push(t11.payload);
          }
          return { ...n10, ...i10.length ? { connectionTokenSets: i10 } : {} };
        }
        async set(e10, t10, r10) {
          let { connectionTokenSets: n10, ...s10 } = r10, i10 = this.calculateMaxAge(r10.internal.createdAt), a10 = this.epoch(), o10 = (await a6(s10, this.secret, a10 + i10)).toString(), c10 = { ...this.cookieConfig, maxAge: i10 };
          !function(e11, t11, r11, n11, s11) {
            let { transient: i11, ...a11 } = r11, o11 = { ...a11 };
            if (i11 && delete o11.maxAge, new TextEncoder().encode(t11).length <= 3500) {
              s11.set(e11, t11, o11), n11.set(e11, t11), or(n11, e11).forEach((e12) => {
                oa(s11, e12.name, { path: o11.path, domain: o11.domain }), n11.delete(e12.name);
              });
              return;
            }
            let c11 = 0, l10 = 0;
            for (; c11 < t11.length; ) {
              let r12 = t11.slice(c11, c11 + 3500), i12 = `${e11}__${l10}`;
              s11.set(i12, r12, o11), n11.set(i12, r12), c11 += 3500, l10++;
            }
            let u2 = or(n11, e11).length - l10;
            if (u2 > 0) for (let t12 = 0; t12 < u2; t12++) {
              let r12 = l10 + t12, i12 = `${e11}__${r12}`;
              oa(s11, i12, { path: o11.path, domain: o11.domain }), n11.delete(i12);
            }
            oa(s11, e11, { path: o11.path, domain: o11.domain }), n11.delete(e11);
          }(this.sessionCookieName, o10, c10, e10, t10), n10?.length && await Promise.all(n10.map((r11, n11) => this.storeInCookie(e10, t10, r11, `${this.connectionTokenSetsCookieName}_${n11}`, i10))), on(o_, e10, true) && os(o_, e10, t10, true, { domain: this.cookieConfig.domain, path: this.cookieConfig.path });
        }
        async delete(e10, t10) {
          let r10 = { domain: this.cookieConfig.domain, path: this.cookieConfig.path };
          os(this.sessionCookieName, e10, t10, false, r10), this.getConnectionTokenSetsCookies(e10).forEach((e11) => oa(t10, e11.name, r10));
        }
        async storeInCookie(e10, t10, r10, n10, s10) {
          let i10 = Math.floor(Date.now() / 1e3 + s10), a10 = await a6(r10, this.secret, i10), o10 = a10.toString();
          t10.set(n10, a10.toString(), { ...this.cookieConfig, maxAge: s10 }), e10.set(n10, o10);
          let c10 = new ap(new Headers());
          c10.set(n10, o10, { ...this.cookieConfig, maxAge: s10 }), new TextEncoder().encode(c10.toString()).length >= 4096 && (n10 === this.sessionCookieName ? console.warn(`The ${n10} cookie size exceeds 4096 bytes, which may cause issues in some browsers. Consider removing any unnecessary custom claims from the access token or the user profile. Alternatively, you can use a stateful session implementation to store the session data in a data store.`) : console.warn(`The ${n10} cookie size exceeds 4096 bytes, which may cause issues in some browsers. You can use a stateful session implementation to store the session data in a data store.`));
        }
        getConnectionTokenSetsCookies(e10) {
          return e10.getAll().filter((e11) => e11.name.startsWith(this.connectionTokenSetsCookieName));
        }
      }
      class oA {
        constructor({ secret: e10, cookieOptions: t10, enableParallelTransactions: r10 }) {
          this.secret = e10, this.transactionCookiePrefix = t10?.prefix ?? "__txn_", this.cookieOptions = { httpOnly: true, sameSite: t10?.sameSite ?? "lax", secure: t10?.secure ?? false, path: t10?.path ?? "/", domain: t10?.domain, maxAge: t10?.maxAge || 3600 }, this.enableParallelTransactions = r10 ?? true;
        }
        getTransactionCookieName(e10) {
          return this.enableParallelTransactions ? `${this.transactionCookiePrefix}${e10}` : `${this.transactionCookiePrefix}`;
        }
        getCookiePrefix() {
          return this.transactionCookiePrefix;
        }
        async save(e10, t10, r10) {
          if (!t10.state) throw Error("Transaction state is required");
          if (r10 && !this.enableParallelTransactions) {
            let e11 = this.getTransactionCookieName(t10.state);
            if (r10.get(e11)) {
              console.warn("A transaction is already in progress. Only one transaction is allowed when parallel transactions are disabled.");
              return;
            }
          }
          let n10 = this.cookieOptions.maxAge, s10 = Math.floor(Date.now() / 1e3 + n10), i10 = await a6(t10, this.secret, s10);
          e10.set(this.getTransactionCookieName(t10.state), i10.toString(), this.cookieOptions);
        }
        async get(e10, t10) {
          let r10 = this.getTransactionCookieName(t10), n10 = e10.get(r10)?.value;
          return n10 ? a4(n10, this.secret) : null;
        }
        async delete(e10, t10) {
          oa(e10, this.getTransactionCookieName(t10), { domain: this.cookieOptions.domain, path: this.cookieOptions.path });
        }
        async deleteAll(e10, t10) {
          let r10 = this.getCookiePrefix(), n10 = { domain: this.cookieOptions.domain, path: this.cookieOptions.path };
          e10.getAll().forEach((e11) => {
            e11.name.startsWith(r10) && oa(t10, e11.name, n10);
          });
        }
      }
      var oP = function(e10, t10, r10, n10, s10) {
        if ("m" === n10) throw TypeError("Private method is not writable");
        if ("a" === n10 && !s10) throw TypeError("Private accessor was defined without a setter");
        if ("function" == typeof t10 ? e10 !== t10 || !s10 : !t10.has(e10)) throw TypeError("Cannot write private member to an object whose class did not declare it");
        return "a" === n10 ? s10.call(e10, r10) : s10 ? s10.value = r10 : t10.set(e10, r10), r10;
      }, oC = function(e10, t10, r10, n10) {
        if ("a" === r10 && !n10) throw TypeError("Private accessor was defined without a getter");
        if ("function" == typeof t10 ? e10 !== t10 || !n10 : !t10.has(e10)) throw TypeError("Cannot read private member from an object whose class did not declare it");
        return "m" === r10 ? n10 : "a" === r10 ? n10.call(e10) : n10 ? n10.value : t10.get(e10);
      };
      class oO {
        constructor(e10 = {}) {
          C.set(this, void 0), oP(this, C, e10, "f");
          let { domain: t10, clientId: r10, clientSecret: n10, appBaseUrl: s10, secret: i10, clientAssertionSigningKey: a10 } = this.validateAndExtractRequiredOptions(e10);
          this.domain = t10;
          let o10 = e10.clientAssertionSigningAlg || process.env.AUTH0_CLIENT_ASSERTION_SIGNING_ALG, { dpopKeyPair: c10, dpopOptions: l10 } = function(e11) {
            let t11 = e11.useDPoP || false;
            if (!t11) return { dpopKeyPair: void 0, dpopOptions: void 0 };
            let r11 = e11.dpopOptions?.clockTolerance ?? (process.env.AUTH0_DPOP_CLOCK_TOLERANCE ? parseInt(process.env.AUTH0_DPOP_CLOCK_TOLERANCE, 10) : 30);
            if (r11 > 300) {
              let e12 = process.env.AUTH0_DPOP_CLOCK_TOLERANCE_MAX_PROD ? parseInt(process.env.AUTH0_DPOP_CLOCK_TOLERANCE_MAX_PROD, 10) : 300;
              if (r11 > e12) throw Error(`clockTolerance of ${r11}s exceeds maximum allowed ${e12}s in production. This could significantly weaken DPoP replay attack protection. Set AUTH0_DPOP_CLOCK_TOLERANCE_MAX_PROD environment variable to override this limit in production.`);
              console.warn(`WARNING: clockTolerance of ${r11}s exceeds recommended maximum of 300s. This may weaken DPoP security by allowing replay attacks within a wider time window. Consider synchronizing server clocks using NTP instead of increasing tolerance.`);
            }
            let n11 = { clockSkew: e11.dpopOptions?.clockSkew ?? (process.env.AUTH0_DPOP_CLOCK_SKEW ? parseInt(process.env.AUTH0_DPOP_CLOCK_SKEW, 10) : 0), clockTolerance: r11, retry: { delay: e11.dpopOptions?.retry?.delay ?? (process.env.AUTH0_RETRY_DELAY ? parseInt(process.env.AUTH0_RETRY_DELAY, 10) : 100), jitter: e11.dpopOptions?.retry?.jitter ?? (!process.env.AUTH0_RETRY_JITTER || "true" === process.env.AUTH0_RETRY_JITTER) } };
            if (n11.retry && "number" == typeof n11.retry.delay && n11.retry.delay < 0) throw Error("Retry delay must be non-negative");
            if (e11.dpopKeyPair) return { dpopKeyPair: e11.dpopKeyPair, dpopOptions: n11 };
            if (t11) {
              let e12 = process.env.AUTH0_DPOP_PRIVATE_KEY, t12 = process.env.AUTH0_DPOP_PUBLIC_KEY;
              if (se() && (e12 || t12)) return console.warn("WARNING: Running in Edge Runtime environment. DPoP keypair loading from environment variables is not supported due to limited Node.js crypto API access. DPoP has been disabled. To use DPoP in Edge Runtime, provide a pre-generated keypair via the dpopKeyPair option."), { dpopKeyPair: void 0, dpopOptions: void 0 };
              if (e12 && t12) try {
                let r12 = (0, t7.createPrivateKey)(e12), s11 = (0, t7.createPublicKey)(t12);
                if ("ec" !== r12.asymmetricKeyType) throw Error(`DPoP private key must be an Elliptic Curve key for ES256 algorithm, got: ${r12.asymmetricKeyType}`);
                if ("ec" !== s11.asymmetricKeyType) throw Error(`DPoP public key must be an Elliptic Curve key for ES256 algorithm, got: ${s11.asymmetricKeyType}`);
                let i11 = r12.asymmetricKeyDetails, a11 = s11.asymmetricKeyDetails;
                if (i11?.namedCurve !== "prime256v1") throw Error(`DPoP private key must use P-256 curve (prime256v1) for ES256 algorithm, got: ${i11?.namedCurve}`);
                if (a11?.namedCurve !== "prime256v1") throw Error(`DPoP public key must use P-256 curve (prime256v1) for ES256 algorithm, got: ${a11?.namedCurve}`);
                if (!function(e13, t13) {
                  if (se()) return true;
                  try {
                    let r13 = "test-data-for-key-pair-validation", n12 = (0, t7.createSign)("sha256");
                    n12.update(r13);
                    let s12 = n12.sign(e13), i12 = (0, t7.createVerify)("sha256");
                    if (i12.update(r13), !i12.verify(t13, s12)) return console.warn("WARNING: Private and public keys do not form a valid key pair - signature verification failed. Please ensure the keys are properly paired and in the correct format. DPoP will be disabled and bearer authentication will be used instead."), false;
                    return true;
                  } catch (e14) {
                    return console.warn(`WARNING: Failed to validate key pair compatibility. This may indicate invalid key format, mismatched algorithms, or corrupted key data. DPoP will be disabled and bearer authentication will be used instead. Error: ${e14 instanceof Error ? e14.message : String(e14)}`), false;
                  }
                }(r12, s11)) return console.warn("WARNING: DPoP key pair validation failed. DPoP has been completely disabled. Falling back to bearer authentication. Please verify your key pair configuration."), { dpopKeyPair: void 0, dpopOptions: void 0 };
                let o11 = r12.toCryptoKey("ES256", false, ["sign"]), c11 = s11.toCryptoKey("ES256", false, ["verify"]);
                return { dpopKeyPair: { privateKey: o11, publicKey: c11 }, dpopOptions: n11 };
              } catch (e13) {
                console.warn(`WARNING: Failed to load DPoP keypair from environment variables. Please ensure AUTH0_DPOP_PUBLIC_KEY and AUTH0_DPOP_PRIVATE_KEY contain valid ES256 keys in PEM format. Error: ${e13 instanceof Error ? e13.message : String(e13)}`);
              }
              e12 && t12 || console.warn("WARNING: useDPoP is set to true but dpopKeyPair is not provided. DPoP will not be used and protected requests will use bearer authentication instead. To enable DPoP, provide a dpopKeyPair in the Auth0Client options or set AUTH0_DPOP_PUBLIC_KEY and AUTH0_DPOP_PRIVATE_KEY environment variables.");
            }
            return { dpopKeyPair: void 0, dpopOptions: n11 };
          }(e10), u2 = process.env.NEXT_PUBLIC_BASE_PATH, h2 = { name: e10.session?.cookie?.name ?? "__session", secure: e10.session?.cookie?.secure ?? "true" === process.env.AUTH0_COOKIE_SECURE, sameSite: e10.session?.cookie?.sameSite ?? process.env.AUTH0_COOKIE_SAME_SITE ?? "lax", path: e10.session?.cookie?.path ?? process.env.AUTH0_COOKIE_PATH ?? u2 ?? "/", transient: e10.session?.cookie?.transient ?? "true" === process.env.AUTH0_COOKIE_TRANSIENT, domain: e10.session?.cookie?.domain ?? process.env.AUTH0_COOKIE_DOMAIN }, d2 = { prefix: e10.transactionCookie?.prefix ?? "__txn_", secure: e10.transactionCookie?.secure ?? false, sameSite: e10.transactionCookie?.sameSite ?? "lax", path: e10.transactionCookie?.path ?? u2 ?? "/", maxAge: e10.transactionCookie?.maxAge ?? 3600 };
          if (s10) {
            let { protocol: e11 } = new URL(s10);
            "https:" === e11 && (h2.secure = true, d2.secure = true);
          }
          this.routes = { login: process.env.NEXT_PUBLIC_LOGIN_ROUTE || "/auth/login", logout: "/auth/logout", callback: "/auth/callback", backChannelLogout: "/auth/backchannel-logout", profile: process.env.NEXT_PUBLIC_PROFILE_ROUTE || "/auth/profile", accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN_ROUTE || "/auth/access-token", connectAccount: "/auth/connect", ...e10.routes }, this.transactionStore = new oA({ secret: i10, cookieOptions: d2, enableParallelTransactions: e10.enableParallelTransactions ?? true }), this.sessionStore = e10.sessionStore ? new ok({ ...e10.session, secret: i10, store: e10.sessionStore, cookieOptions: h2 }) : new oT({ ...e10.session, secret: i10, cookieOptions: h2 }), this.authClient = new od({ transactionStore: this.transactionStore, sessionStore: this.sessionStore, domain: t10, clientId: r10, clientSecret: n10, clientAssertionSigningKey: a10, clientAssertionSigningAlg: o10, authorizationParameters: e10.authorizationParameters, pushedAuthorizationRequests: e10.pushedAuthorizationRequests, appBaseUrl: s10, secret: i10, signInReturnToPath: e10.signInReturnToPath, logoutStrategy: e10.logoutStrategy, includeIdTokenHintInOIDCLogoutUrl: e10.includeIdTokenHintInOIDCLogoutUrl, beforeSessionSaved: e10.beforeSessionSaved, onCallback: e10.onCallback, routes: this.routes, allowInsecureRequests: e10.allowInsecureRequests, httpTimeout: e10.httpTimeout, enableTelemetry: e10.enableTelemetry, enableAccessTokenEndpoint: e10.enableAccessTokenEndpoint, noContentProfileResponseWhenUnauthenticated: e10.noContentProfileResponseWhenUnauthenticated, enableConnectAccountEndpoint: e10.enableConnectAccountEndpoint, useDPoP: e10.useDPoP || false, dpopKeyPair: e10.dpopKeyPair || c10, dpopOptions: e10.dpopOptions || l10 });
        }
        middleware(e10) {
          return this.authClient.handler.bind(this.authClient)(og(e10));
        }
        async getSession(e10) {
          if (e10) {
            if (e10 instanceof Request) {
              let t10 = og(e10);
              return this.sessionStore.get(t10.cookies);
            }
            return this.sessionStore.get(this.createRequestCookies(e10));
          }
          return this.sessionStore.get(await tU());
        }
        async getAccessToken(e10, t10, r10) {
          let n10, s10;
          let i10 = { refresh: false }, a10 = {};
          if (e10 && (e10 instanceof Request || "object" == typeof e10.headers)) {
            if (n10 = e10, s10 = t10, a10 = { ...i10, ...r10 ?? {} }, !s10) throw TypeError("getAccessToken(req, res): The 'res' argument is missing. Both 'req' and 'res' must be provided together for Pages Router or middleware usage.");
          } else {
            if (void 0 !== t10 || void 0 !== r10) throw TypeError("getAccessToken: Invalid arguments. Valid signatures are getAccessToken(), getAccessToken(options), or getAccessToken(req, res, options).");
            a10 = { ...i10, ...e10 ?? {} };
          }
          return this.executeGetAccessToken(n10, s10, a10);
        }
        async executeGetAccessToken(e10, t10, r10) {
          let n10 = e10 ? await this.getSession(e10) : await this.getSession();
          if (!n10) throw new t2(g.MISSING_SESSION, "The user does not have an active session.");
          let [s10, i10] = await this.authClient.getTokenSet(n10, r10);
          if (s10) throw s10;
          let { tokenSet: a10, idTokenClaims: o10 } = i10, c10 = sh(n10, a10, { scope: oC(this, C, "f").authorizationParameters?.scope ?? t9, audience: oC(this, C, "f").authorizationParameters?.audience });
          if (c10) {
            o10 && (n10.user = o10);
            let r11 = await this.authClient.finalizeSession({ ...n10, ...c10 }, a10.idToken);
            await this.saveToSession(r11, e10, t10);
          }
          return { token: a10.accessToken, scope: a10.scope, expiresAt: a10.expiresAt, token_type: a10.token_type, audience: a10.audience };
        }
        async getAccessTokenForConnection(e10, t10, r10) {
          let n10 = t10 instanceof Request ? og(t10) : t10, s10 = n10 ? await this.getSession(n10) : await this.getSession();
          if (!s10) throw new t5(y.MISSING_SESSION, "The user does not have an active session.");
          let i10 = s10.connectionTokenSets?.find((t11) => t11.connection === e10.connection), [a10, o10] = await this.authClient.getConnectionTokenSet(s10.tokenSet, i10, e10);
          if (null !== a10) throw a10;
          if (o10 && (!i10 || o10.accessToken !== i10.accessToken || o10.expiresAt !== i10.expiresAt || o10.scope !== i10.scope)) {
            let t11;
            t11 = i10 ? s10.connectionTokenSets?.map((t12) => t12.connection === e10.connection ? o10 : t12) : [...s10.connectionTokenSets || [], o10], await this.saveToSession({ ...s10, connectionTokenSets: t11 }, n10, r10);
          }
          return { token: o10.accessToken, scope: o10.scope, expiresAt: o10.expiresAt };
        }
        async customTokenExchange(e10) {
          let [t10, r10] = await this.authClient.customTokenExchange(e10);
          if (null !== t10) throw t10;
          return r10;
        }
        async updateSession(e10, t10, r10) {
          if (e10 instanceof Request && !(e10 instanceof ew) && (e10 = og(e10)), t10 && t10 instanceof Response && !(t10 instanceof eE) && (t10 = function(e11) {
            if (e11 instanceof eE) return e11;
            let t11 = new Headers(e11.headers), r11 = new eE(e11.body, { status: e11.status, statusText: e11.statusText, headers: t11 });
            try {
              "url" in e11 && e11.url && (r11.url = e11.url);
            } catch {
            }
            return r11;
          }(t10)), t10) {
            let n10 = e10;
            if (!r10) throw Error("The session data is missing.");
            if (n10 instanceof ew && t10 instanceof eE) {
              let e11 = await this.getSession(n10);
              if (!e11) throw Error("The user is not authenticated.");
              await this.sessionStore.set(n10.cookies, t10.cookies, { ...r10, internal: { ...e11.internal } });
            } else {
              let e11 = await this.getSession(n10);
              if (!e11) throw Error("The user is not authenticated.");
              let s10 = new Headers(), i10 = new ap(s10), a10 = this.createRequestCookies(n10), o10 = t10;
              await this.sessionStore.set(a10, i10, { ...r10, internal: { ...e11.internal } });
              let c10 = [], l10 = {};
              for (let [e12, t11] of s10.entries()) "set-cookie" === e12.toLowerCase() ? c10.push(t11) : l10[e12] = t11;
              for (let [e12, t11] of (c10.length > 0 && o10.setHeader("set-cookie", c10), Object.entries(l10))) o10.setHeader(e12, t11);
            }
          } else {
            let t11 = await this.getSession();
            if (!t11) throw Error("The user is not authenticated.");
            let r11 = e10;
            if (!r11) throw Error("The session data is missing.");
            await this.sessionStore.set(await tU(), await tU(), { ...r11, internal: { ...t11.internal } });
          }
        }
        createRequestCookies(e10) {
          let t10 = new Headers();
          for (let r10 in e10.headers) if (Array.isArray(e10.headers[r10])) for (let n10 of e10.headers[r10]) t10.append(r10, n10);
          else t10.append(r10, e10.headers[r10] ?? "");
          return new ad(t10);
        }
        async startInteractiveLogin(e10 = {}) {
          return this.authClient.startInteractiveLogin(e10);
        }
        async getTokenByBackchannelAuth(e10) {
          let [t10, r10] = await this.authClient.backchannelAuthentication(e10);
          if (t10) throw t10;
          return r10;
        }
        async connectAccount(e10) {
          if (!await this.getSession()) throw new t3({ code: b.MISSING_SESSION, message: "The user does not have an active session." });
          let t10 = { audience: `${this.issuer}/me/`, scope: "create:me:connected_accounts" }, r10 = await this.getAccessToken(t10), [n10, s10] = await this.authClient.connectAccount({ ...e10, tokenSet: { accessToken: r10.token, expiresAt: r10.expiresAt, scope: t10.scope, audience: r10.audience } });
          if (n10) throw n10;
          return s10;
        }
        withPageAuthRequired(e10, t10) {
          let r10 = { loginUrl: this.routes.login }, n10 = ow(this, r10), s10 = ob(this, r10);
          return "function" == typeof e10 ? n10(e10, t10) : s10(e10);
        }
        withApiAuthRequired(e10) {
          let t10 = om(this), r10 = oy(this);
          return (n10, s10) => sn(n10) ? r10(e10)(n10, s10) : t10(e10)(n10, s10);
        }
        async saveToSession(e10, t10, r10) {
          if (t10 && r10) {
            if (t10 instanceof ew && r10 instanceof eE) await this.sessionStore.set(t10.cookies, r10.cookies, e10);
            else {
              let n10 = new Headers(), s10 = new ap(n10);
              for (let i10 of (await this.sessionStore.set(this.createRequestCookies(t10), s10, e10), n10.getSetCookie())) r10.appendHeader("set-cookie", i10);
              for (let [e11, t11] of n10.entries()) "set-cookie" !== e11.toLowerCase() && r10.setHeader(e11, t11);
            }
          } else try {
            await this.sessionStore.set(await tU(), await tU(), e10);
          } catch (e11) {
          }
        }
        validateAndExtractRequiredOptions(e10) {
          let t10 = { domain: e10.domain ?? process.env.AUTH0_DOMAIN, clientId: e10.clientId ?? process.env.AUTH0_CLIENT_ID, appBaseUrl: e10.appBaseUrl ?? process.env.APP_BASE_URL, secret: e10.secret ?? process.env.AUTH0_SECRET }, r10 = e10.clientSecret ?? process.env.AUTH0_CLIENT_SECRET, n10 = e10.clientAssertionSigningKey ?? process.env.AUTH0_CLIENT_ASSERTION_SIGNING_KEY, s10 = Object.entries(t10).filter(([, e11]) => !e11).map(([e11]) => e11);
          if (r10 || n10 || s10.push("clientAuthentication"), s10.length) {
            let e11 = { domain: "AUTH0_DOMAIN", clientId: "AUTH0_CLIENT_ID", appBaseUrl: "APP_BASE_URL", secret: "AUTH0_SECRET" }, t11 = "WARNING: Not all required options were provided when creating an instance of Auth0Client. Ensure to provide all missing options, either by passing it to the Auth0Client constructor, or by setting the corresponding environment variable.\n";
            s10.forEach((r11) => {
              "clientAuthentication" === r11 ? t11 += `Missing: clientAuthentication: Set either AUTH0_CLIENT_SECRET env var or AUTH0_CLIENT_ASSERTION_SIGNING_KEY env var, or pass clientSecret or clientAssertionSigningKey in options
` : e11[r11] ? t11 += `Missing: ${r11}: Set ${e11[r11]} env var or pass ${r11} in options
` : t11 += `Missing: ${r11}
`;
            }), console.error(t11.trim());
          }
          return { ...t10, clientSecret: r10, clientAssertionSigningKey: n10 };
        }
        async createFetcher(e10, t10) {
          let r10 = e10 instanceof Request ? og(e10) : e10, n10 = r10 ? await this.getSession(r10) : await this.getSession();
          if (!n10) throw new t2(g.MISSING_SESSION, "The user does not have an active session.");
          let s10 = async (e11) => {
            let [t11, r11] = await this.authClient.getTokenSet(n10, e11 || {});
            if (t11) throw t11;
            return r11.tokenSet;
          };
          return await this.authClient.fetcherFactory({ ...t10, getAccessToken: s10 });
        }
        get issuer() {
          return this.domain.startsWith("http://") || this.domain.startsWith("https://") ? this.domain : `https://${this.domain}`;
        }
      }
      function oR(e10, t10) {
        var r10 = {};
        for (var n10 in e10) Object.prototype.hasOwnProperty.call(e10, n10) && 0 > t10.indexOf(n10) && (r10[n10] = e10[n10]);
        if (null != e10 && "function" == typeof Object.getOwnPropertySymbols) for (var s10 = 0, n10 = Object.getOwnPropertySymbols(e10); s10 < n10.length; s10++) 0 > t10.indexOf(n10[s10]) && Object.prototype.propertyIsEnumerable.call(e10, n10[s10]) && (r10[n10[s10]] = e10[n10[s10]]);
        return r10;
      }
      C = /* @__PURE__ */ new WeakMap(), Object.create, Object.create, "function" == typeof SuppressedError && SuppressedError;
      let ox = (e10) => e10 ? (...t10) => e10(...t10) : (...e11) => fetch(...e11);
      class oI extends Error {
        constructor(e10, t10 = "FunctionsError", r10) {
          super(e10), this.name = t10, this.context = r10;
        }
      }
      class oN extends oI {
        constructor(e10) {
          super("Failed to send a request to the Edge Function", "FunctionsFetchError", e10);
        }
      }
      class oj extends oI {
        constructor(e10) {
          super("Relay Error invoking the Edge Function", "FunctionsRelayError", e10);
        }
      }
      class oD extends oI {
        constructor(e10) {
          super("Edge Function returned a non-2xx status code", "FunctionsHttpError", e10);
        }
      }
      !function(e10) {
        e10.Any = "any", e10.ApNortheast1 = "ap-northeast-1", e10.ApNortheast2 = "ap-northeast-2", e10.ApSouth1 = "ap-south-1", e10.ApSoutheast1 = "ap-southeast-1", e10.ApSoutheast2 = "ap-southeast-2", e10.CaCentral1 = "ca-central-1", e10.EuCentral1 = "eu-central-1", e10.EuWest1 = "eu-west-1", e10.EuWest2 = "eu-west-2", e10.EuWest3 = "eu-west-3", e10.SaEast1 = "sa-east-1", e10.UsEast1 = "us-east-1", e10.UsWest1 = "us-west-1", e10.UsWest2 = "us-west-2";
      }(O || (O = {}));
      class oU {
        constructor(e10, { headers: t10 = {}, customFetch: r10, region: n10 = O.Any } = {}) {
          this.url = e10, this.headers = t10, this.region = n10, this.fetch = ox(r10);
        }
        setAuth(e10) {
          this.headers.Authorization = `Bearer ${e10}`;
        }
        invoke(e10) {
          var t10, r10, n10, s10;
          return t10 = this, r10 = arguments, n10 = void 0, s10 = function* (e11, t11 = {}) {
            var r11;
            let n11, s11;
            try {
              let i10;
              let { headers: a10, method: o10, body: c10, signal: l10, timeout: u2 } = t11, h2 = {}, { region: d2 } = t11;
              d2 || (d2 = this.region);
              let p2 = new URL(`${this.url}/${e11}`);
              d2 && "any" !== d2 && (h2["x-region"] = d2, p2.searchParams.set("forceFunctionRegion", d2)), c10 && (a10 && !Object.prototype.hasOwnProperty.call(a10, "Content-Type") || !a10) ? "undefined" != typeof Blob && c10 instanceof Blob || c10 instanceof ArrayBuffer ? (h2["Content-Type"] = "application/octet-stream", i10 = c10) : "string" == typeof c10 ? (h2["Content-Type"] = "text/plain", i10 = c10) : "undefined" != typeof FormData && c10 instanceof FormData ? i10 = c10 : (h2["Content-Type"] = "application/json", i10 = JSON.stringify(c10)) : i10 = c10;
              let f2 = l10;
              u2 && (s11 = new AbortController(), n11 = setTimeout(() => s11.abort(), u2), l10 ? (f2 = s11.signal, l10.addEventListener("abort", () => s11.abort())) : f2 = s11.signal);
              let g2 = yield this.fetch(p2.toString(), { method: o10 || "POST", headers: Object.assign(Object.assign(Object.assign({}, h2), this.headers), a10), body: i10, signal: f2 }).catch((e12) => {
                throw new oN(e12);
              }), y2 = g2.headers.get("x-relay-error");
              if (y2 && "true" === y2) throw new oj(g2);
              if (!g2.ok) throw new oD(g2);
              let m2 = (null !== (r11 = g2.headers.get("Content-Type")) && void 0 !== r11 ? r11 : "text/plain").split(";")[0].trim();
              return { data: "application/json" === m2 ? yield g2.json() : "application/octet-stream" === m2 || "application/pdf" === m2 ? yield g2.blob() : "text/event-stream" === m2 ? g2 : "multipart/form-data" === m2 ? yield g2.formData() : yield g2.text(), error: null, response: g2 };
            } catch (e12) {
              return { data: null, error: e12, response: e12 instanceof oD || e12 instanceof oj ? e12.context : void 0 };
            } finally {
              n11 && clearTimeout(n11);
            }
          }, new (n10 || (n10 = Promise))(function(e11, i10) {
            function a10(e12) {
              try {
                c10(s10.next(e12));
              } catch (e13) {
                i10(e13);
              }
            }
            function o10(e12) {
              try {
                c10(s10.throw(e12));
              } catch (e13) {
                i10(e13);
              }
            }
            function c10(t11) {
              var r11;
              t11.done ? e11(t11.value) : ((r11 = t11.value) instanceof n10 ? r11 : new n10(function(e12) {
                e12(r11);
              })).then(a10, o10);
            }
            c10((s10 = s10.apply(t10, r10 || [])).next());
          });
        }
      }
      var o$ = class extends Error {
        constructor(e10) {
          super(e10.message), this.name = "PostgrestError", this.details = e10.details, this.hint = e10.hint, this.code = e10.code;
        }
      }, oL = class {
        constructor(e10) {
          var t10, r10;
          this.shouldThrowOnError = false, this.method = e10.method, this.url = e10.url, this.headers = new Headers(e10.headers), this.schema = e10.schema, this.body = e10.body, this.shouldThrowOnError = null !== (t10 = e10.shouldThrowOnError) && void 0 !== t10 && t10, this.signal = e10.signal, this.isMaybeSingle = null !== (r10 = e10.isMaybeSingle) && void 0 !== r10 && r10, e10.fetch ? this.fetch = e10.fetch : this.fetch = fetch;
        }
        throwOnError() {
          return this.shouldThrowOnError = true, this;
        }
        setHeader(e10, t10) {
          return this.headers = new Headers(this.headers), this.headers.set(e10, t10), this;
        }
        then(e10, t10) {
          var r10 = this;
          void 0 === this.schema || (["GET", "HEAD"].includes(this.method) ? this.headers.set("Accept-Profile", this.schema) : this.headers.set("Content-Profile", this.schema)), "GET" !== this.method && "HEAD" !== this.method && this.headers.set("Content-Type", "application/json");
          let n10 = (0, this.fetch)(this.url.toString(), { method: this.method, headers: this.headers, body: JSON.stringify(this.body), signal: this.signal }).then(async (e11) => {
            var t11, n11, s10, i10;
            let a10 = null, o10 = null, c10 = null, l10 = e11.status, u2 = e11.statusText;
            if (e11.ok) {
              if ("HEAD" !== r10.method) {
                let t12 = await e11.text();
                "" === t12 || (o10 = "text/csv" === r10.headers.get("Accept") ? t12 : r10.headers.get("Accept") && (null === (s10 = r10.headers.get("Accept")) || void 0 === s10 ? void 0 : s10.includes("application/vnd.pgrst.plan+text")) ? t12 : JSON.parse(t12));
              }
              let i11 = null === (t11 = r10.headers.get("Prefer")) || void 0 === t11 ? void 0 : t11.match(/count=(exact|planned|estimated)/), h2 = null === (n11 = e11.headers.get("content-range")) || void 0 === n11 ? void 0 : n11.split("/");
              i11 && h2 && h2.length > 1 && (c10 = parseInt(h2[1])), r10.isMaybeSingle && "GET" === r10.method && Array.isArray(o10) && (o10.length > 1 ? (a10 = { code: "PGRST116", details: `Results contain ${o10.length} rows, application/vnd.pgrst.object+json requires 1 row`, hint: null, message: "JSON object requested, multiple (or no) rows returned" }, o10 = null, c10 = null, l10 = 406, u2 = "Not Acceptable") : o10 = 1 === o10.length ? o10[0] : null);
            } else {
              let t12 = await e11.text();
              try {
                a10 = JSON.parse(t12), Array.isArray(a10) && 404 === e11.status && (o10 = [], a10 = null, l10 = 200, u2 = "OK");
              } catch (r11) {
                404 === e11.status && "" === t12 ? (l10 = 204, u2 = "No Content") : a10 = { message: t12 };
              }
              if (a10 && r10.isMaybeSingle && (null == a10 || null === (i10 = a10.details) || void 0 === i10 ? void 0 : i10.includes("0 rows")) && (a10 = null, l10 = 200, u2 = "OK"), a10 && r10.shouldThrowOnError) throw new o$(a10);
            }
            return { error: a10, data: o10, count: c10, status: l10, statusText: u2 };
          });
          return this.shouldThrowOnError || (n10 = n10.catch((e11) => {
            var t11, r11, n11, s10, i10, a10;
            let o10 = "", c10 = null == e11 ? void 0 : e11.cause;
            if (c10) {
              let t12 = null !== (r11 = null == c10 ? void 0 : c10.message) && void 0 !== r11 ? r11 : "", a11 = null !== (n11 = null == c10 ? void 0 : c10.code) && void 0 !== n11 ? n11 : "";
              o10 = `${null !== (s10 = null == e11 ? void 0 : e11.name) && void 0 !== s10 ? s10 : "FetchError"}: ${null == e11 ? void 0 : e11.message}

Caused by: ${null !== (i10 = null == c10 ? void 0 : c10.name) && void 0 !== i10 ? i10 : "Error"}: ${t12}`, a11 && (o10 += ` (${a11})`), (null == c10 ? void 0 : c10.stack) && (o10 += `
${c10.stack}`);
            } else o10 = null !== (a10 = null == e11 ? void 0 : e11.stack) && void 0 !== a10 ? a10 : "";
            return { error: { message: `${null !== (t11 = null == e11 ? void 0 : e11.name) && void 0 !== t11 ? t11 : "FetchError"}: ${null == e11 ? void 0 : e11.message}`, details: o10, hint: "", code: "" }, data: null, count: null, status: 0, statusText: "" };
          })), n10.then(e10, t10);
        }
        returns() {
          return this;
        }
        overrideTypes() {
          return this;
        }
      }, oM = class extends oL {
        select(e10) {
          let t10 = false, r10 = (null != e10 ? e10 : "*").split("").map((e11) => /\s/.test(e11) && !t10 ? "" : ('"' === e11 && (t10 = !t10), e11)).join("");
          return this.url.searchParams.set("select", r10), this.headers.append("Prefer", "return=representation"), this;
        }
        order(e10, { ascending: t10 = true, nullsFirst: r10, foreignTable: n10, referencedTable: s10 = n10 } = {}) {
          let i10 = s10 ? `${s10}.order` : "order", a10 = this.url.searchParams.get(i10);
          return this.url.searchParams.set(i10, `${a10 ? `${a10},` : ""}${e10}.${t10 ? "asc" : "desc"}${void 0 === r10 ? "" : r10 ? ".nullsfirst" : ".nullslast"}`), this;
        }
        limit(e10, { foreignTable: t10, referencedTable: r10 = t10 } = {}) {
          let n10 = void 0 === r10 ? "limit" : `${r10}.limit`;
          return this.url.searchParams.set(n10, `${e10}`), this;
        }
        range(e10, t10, { foreignTable: r10, referencedTable: n10 = r10 } = {}) {
          let s10 = void 0 === n10 ? "offset" : `${n10}.offset`, i10 = void 0 === n10 ? "limit" : `${n10}.limit`;
          return this.url.searchParams.set(s10, `${e10}`), this.url.searchParams.set(i10, `${t10 - e10 + 1}`), this;
        }
        abortSignal(e10) {
          return this.signal = e10, this;
        }
        single() {
          return this.headers.set("Accept", "application/vnd.pgrst.object+json"), this;
        }
        maybeSingle() {
          return "GET" === this.method ? this.headers.set("Accept", "application/json") : this.headers.set("Accept", "application/vnd.pgrst.object+json"), this.isMaybeSingle = true, this;
        }
        csv() {
          return this.headers.set("Accept", "text/csv"), this;
        }
        geojson() {
          return this.headers.set("Accept", "application/geo+json"), this;
        }
        explain({ analyze: e10 = false, verbose: t10 = false, settings: r10 = false, buffers: n10 = false, wal: s10 = false, format: i10 = "text" } = {}) {
          var a10;
          let o10 = [e10 ? "analyze" : null, t10 ? "verbose" : null, r10 ? "settings" : null, n10 ? "buffers" : null, s10 ? "wal" : null].filter(Boolean).join("|"), c10 = null !== (a10 = this.headers.get("Accept")) && void 0 !== a10 ? a10 : "application/json";
          return this.headers.set("Accept", `application/vnd.pgrst.plan+${i10}; for="${c10}"; options=${o10};`), this;
        }
        rollback() {
          return this.headers.append("Prefer", "tx=rollback"), this;
        }
        returns() {
          return this;
        }
        maxAffected(e10) {
          return this.headers.append("Prefer", "handling=strict"), this.headers.append("Prefer", `max-affected=${e10}`), this;
        }
      };
      let oH = RegExp("[,()]");
      var oK = class extends oM {
        eq(e10, t10) {
          return this.url.searchParams.append(e10, `eq.${t10}`), this;
        }
        neq(e10, t10) {
          return this.url.searchParams.append(e10, `neq.${t10}`), this;
        }
        gt(e10, t10) {
          return this.url.searchParams.append(e10, `gt.${t10}`), this;
        }
        gte(e10, t10) {
          return this.url.searchParams.append(e10, `gte.${t10}`), this;
        }
        lt(e10, t10) {
          return this.url.searchParams.append(e10, `lt.${t10}`), this;
        }
        lte(e10, t10) {
          return this.url.searchParams.append(e10, `lte.${t10}`), this;
        }
        like(e10, t10) {
          return this.url.searchParams.append(e10, `like.${t10}`), this;
        }
        likeAllOf(e10, t10) {
          return this.url.searchParams.append(e10, `like(all).{${t10.join(",")}}`), this;
        }
        likeAnyOf(e10, t10) {
          return this.url.searchParams.append(e10, `like(any).{${t10.join(",")}}`), this;
        }
        ilike(e10, t10) {
          return this.url.searchParams.append(e10, `ilike.${t10}`), this;
        }
        ilikeAllOf(e10, t10) {
          return this.url.searchParams.append(e10, `ilike(all).{${t10.join(",")}}`), this;
        }
        ilikeAnyOf(e10, t10) {
          return this.url.searchParams.append(e10, `ilike(any).{${t10.join(",")}}`), this;
        }
        regexMatch(e10, t10) {
          return this.url.searchParams.append(e10, `match.${t10}`), this;
        }
        regexIMatch(e10, t10) {
          return this.url.searchParams.append(e10, `imatch.${t10}`), this;
        }
        is(e10, t10) {
          return this.url.searchParams.append(e10, `is.${t10}`), this;
        }
        isDistinct(e10, t10) {
          return this.url.searchParams.append(e10, `isdistinct.${t10}`), this;
        }
        in(e10, t10) {
          let r10 = Array.from(new Set(t10)).map((e11) => "string" == typeof e11 && oH.test(e11) ? `"${e11}"` : `${e11}`).join(",");
          return this.url.searchParams.append(e10, `in.(${r10})`), this;
        }
        notIn(e10, t10) {
          let r10 = Array.from(new Set(t10)).map((e11) => "string" == typeof e11 && oH.test(e11) ? `"${e11}"` : `${e11}`).join(",");
          return this.url.searchParams.append(e10, `not.in.(${r10})`), this;
        }
        contains(e10, t10) {
          return "string" == typeof t10 ? this.url.searchParams.append(e10, `cs.${t10}`) : Array.isArray(t10) ? this.url.searchParams.append(e10, `cs.{${t10.join(",")}}`) : this.url.searchParams.append(e10, `cs.${JSON.stringify(t10)}`), this;
        }
        containedBy(e10, t10) {
          return "string" == typeof t10 ? this.url.searchParams.append(e10, `cd.${t10}`) : Array.isArray(t10) ? this.url.searchParams.append(e10, `cd.{${t10.join(",")}}`) : this.url.searchParams.append(e10, `cd.${JSON.stringify(t10)}`), this;
        }
        rangeGt(e10, t10) {
          return this.url.searchParams.append(e10, `sr.${t10}`), this;
        }
        rangeGte(e10, t10) {
          return this.url.searchParams.append(e10, `nxl.${t10}`), this;
        }
        rangeLt(e10, t10) {
          return this.url.searchParams.append(e10, `sl.${t10}`), this;
        }
        rangeLte(e10, t10) {
          return this.url.searchParams.append(e10, `nxr.${t10}`), this;
        }
        rangeAdjacent(e10, t10) {
          return this.url.searchParams.append(e10, `adj.${t10}`), this;
        }
        overlaps(e10, t10) {
          return "string" == typeof t10 ? this.url.searchParams.append(e10, `ov.${t10}`) : this.url.searchParams.append(e10, `ov.{${t10.join(",")}}`), this;
        }
        textSearch(e10, t10, { config: r10, type: n10 } = {}) {
          let s10 = "";
          "plain" === n10 ? s10 = "pl" : "phrase" === n10 ? s10 = "ph" : "websearch" === n10 && (s10 = "w");
          let i10 = void 0 === r10 ? "" : `(${r10})`;
          return this.url.searchParams.append(e10, `${s10}fts${i10}.${t10}`), this;
        }
        match(e10) {
          return Object.entries(e10).forEach(([e11, t10]) => {
            this.url.searchParams.append(e11, `eq.${t10}`);
          }), this;
        }
        not(e10, t10, r10) {
          return this.url.searchParams.append(e10, `not.${t10}.${r10}`), this;
        }
        or(e10, { foreignTable: t10, referencedTable: r10 = t10 } = {}) {
          let n10 = r10 ? `${r10}.or` : "or";
          return this.url.searchParams.append(n10, `(${e10})`), this;
        }
        filter(e10, t10, r10) {
          return this.url.searchParams.append(e10, `${t10}.${r10}`), this;
        }
      }, oW = class {
        constructor(e10, { headers: t10 = {}, schema: r10, fetch: n10 }) {
          this.url = e10, this.headers = new Headers(t10), this.schema = r10, this.fetch = n10;
        }
        select(e10, t10) {
          let { head: r10 = false, count: n10 } = null != t10 ? t10 : {}, s10 = false, i10 = (null != e10 ? e10 : "*").split("").map((e11) => /\s/.test(e11) && !s10 ? "" : ('"' === e11 && (s10 = !s10), e11)).join("");
          return this.url.searchParams.set("select", i10), n10 && this.headers.append("Prefer", `count=${n10}`), new oK({ method: r10 ? "HEAD" : "GET", url: this.url, headers: this.headers, schema: this.schema, fetch: this.fetch });
        }
        insert(e10, { count: t10, defaultToNull: r10 = true } = {}) {
          var n10;
          if (t10 && this.headers.append("Prefer", `count=${t10}`), r10 || this.headers.append("Prefer", "missing=default"), Array.isArray(e10)) {
            let t11 = e10.reduce((e11, t12) => e11.concat(Object.keys(t12)), []);
            if (t11.length > 0) {
              let e11 = [...new Set(t11)].map((e12) => `"${e12}"`);
              this.url.searchParams.set("columns", e11.join(","));
            }
          }
          return new oK({ method: "POST", url: this.url, headers: this.headers, schema: this.schema, body: e10, fetch: null !== (n10 = this.fetch) && void 0 !== n10 ? n10 : fetch });
        }
        upsert(e10, { onConflict: t10, ignoreDuplicates: r10 = false, count: n10, defaultToNull: s10 = true } = {}) {
          var i10;
          if (this.headers.append("Prefer", `resolution=${r10 ? "ignore" : "merge"}-duplicates`), void 0 !== t10 && this.url.searchParams.set("on_conflict", t10), n10 && this.headers.append("Prefer", `count=${n10}`), s10 || this.headers.append("Prefer", "missing=default"), Array.isArray(e10)) {
            let t11 = e10.reduce((e11, t12) => e11.concat(Object.keys(t12)), []);
            if (t11.length > 0) {
              let e11 = [...new Set(t11)].map((e12) => `"${e12}"`);
              this.url.searchParams.set("columns", e11.join(","));
            }
          }
          return new oK({ method: "POST", url: this.url, headers: this.headers, schema: this.schema, body: e10, fetch: null !== (i10 = this.fetch) && void 0 !== i10 ? i10 : fetch });
        }
        update(e10, { count: t10 } = {}) {
          var r10;
          return t10 && this.headers.append("Prefer", `count=${t10}`), new oK({ method: "PATCH", url: this.url, headers: this.headers, schema: this.schema, body: e10, fetch: null !== (r10 = this.fetch) && void 0 !== r10 ? r10 : fetch });
        }
        delete({ count: e10 } = {}) {
          var t10;
          return e10 && this.headers.append("Prefer", `count=${e10}`), new oK({ method: "DELETE", url: this.url, headers: this.headers, schema: this.schema, fetch: null !== (t10 = this.fetch) && void 0 !== t10 ? t10 : fetch });
        }
      }, oB = class e10 {
        constructor(e11, { headers: t10 = {}, schema: r10, fetch: n10 } = {}) {
          this.url = e11, this.headers = new Headers(t10), this.schemaName = r10, this.fetch = n10;
        }
        from(e11) {
          if (!e11 || "string" != typeof e11 || "" === e11.trim()) throw Error("Invalid relation name: relation must be a non-empty string.");
          return new oW(new URL(`${this.url}/${e11}`), { headers: new Headers(this.headers), schema: this.schemaName, fetch: this.fetch });
        }
        schema(t10) {
          return new e10(this.url, { headers: this.headers, schema: t10, fetch: this.fetch });
        }
        rpc(e11, t10 = {}, { head: r10 = false, get: n10 = false, count: s10 } = {}) {
          var i10;
          let a10, o10;
          let c10 = new URL(`${this.url}/rpc/${e11}`);
          r10 || n10 ? (a10 = r10 ? "HEAD" : "GET", Object.entries(t10).filter(([e12, t11]) => void 0 !== t11).map(([e12, t11]) => [e12, Array.isArray(t11) ? `{${t11.join(",")}}` : `${t11}`]).forEach(([e12, t11]) => {
            c10.searchParams.append(e12, t11);
          })) : (a10 = "POST", o10 = t10);
          let l10 = new Headers(this.headers);
          return s10 && l10.set("Prefer", `count=${s10}`), new oK({ method: a10, url: c10, headers: l10, schema: this.schemaName, body: o10, fetch: null !== (i10 = this.fetch) && void 0 !== i10 ? i10 : fetch });
        }
      };
      class oq {
        constructor() {
        }
        static detectEnvironment() {
          var e10;
          if ("undefined" != typeof WebSocket) return { type: "native", constructor: WebSocket };
          if ("undefined" != typeof globalThis && void 0 !== globalThis.WebSocket) return { type: "native", constructor: globalThis.WebSocket };
          if (void 0 !== r.g && void 0 !== r.g.WebSocket) return { type: "native", constructor: r.g.WebSocket };
          if ("undefined" != typeof globalThis && void 0 !== globalThis.WebSocketPair && void 0 === globalThis.WebSocket) return { type: "cloudflare", error: "Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.", workaround: "Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime." };
          if ("undefined" != typeof globalThis && globalThis.EdgeRuntime || "undefined" != typeof navigator && (null === (e10 = navigator.userAgent) || void 0 === e10 ? void 0 : e10.includes("Vercel-Edge"))) return { type: "unsupported", error: "Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.", workaround: "Use serverless functions or a different deployment target for WebSocket functionality." };
          if ("undefined" != typeof process) {
            let e11 = process.versions;
            if (e11 && e11.node) {
              let t10 = parseInt(e11.node.replace(/^v/, "").split(".")[0]);
              return t10 >= 22 ? void 0 !== globalThis.WebSocket ? { type: "native", constructor: globalThis.WebSocket } : { type: "unsupported", error: `Node.js ${t10} detected but native WebSocket not found.`, workaround: "Provide a WebSocket implementation via the transport option." } : { type: "unsupported", error: `Node.js ${t10} detected without native WebSocket support.`, workaround: 'For Node.js < 22, install "ws" package and provide it via the transport option:\nimport ws from "ws"\nnew RealtimeClient(url, { transport: ws })' };
            }
          }
          return { type: "unsupported", error: "Unknown JavaScript runtime without WebSocket support.", workaround: "Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation." };
        }
        static getWebSocketConstructor() {
          let e10 = this.detectEnvironment();
          if (e10.constructor) return e10.constructor;
          let t10 = e10.error || "WebSocket not supported in this environment.";
          throw e10.workaround && (t10 += `

Suggested solution: ${e10.workaround}`), Error(t10);
        }
        static createWebSocket(e10, t10) {
          return new (this.getWebSocketConstructor())(e10, t10);
        }
        static isWebSocketSupported() {
          try {
            let e10 = this.detectEnvironment();
            return "native" === e10.type || "ws" === e10.type;
          } catch (e10) {
            return false;
          }
        }
      }
      let oJ = "1.0.0";
      !function(e10) {
        e10[e10.connecting = 0] = "connecting", e10[e10.open = 1] = "open", e10[e10.closing = 2] = "closing", e10[e10.closed = 3] = "closed";
      }(R || (R = {})), function(e10) {
        e10.closed = "closed", e10.errored = "errored", e10.joined = "joined", e10.joining = "joining", e10.leaving = "leaving";
      }(x || (x = {})), function(e10) {
        e10.close = "phx_close", e10.error = "phx_error", e10.join = "phx_join", e10.reply = "phx_reply", e10.leave = "phx_leave", e10.access_token = "access_token";
      }(I || (I = {})), (N || (N = {})).websocket = "websocket", function(e10) {
        e10.Connecting = "connecting", e10.Open = "open", e10.Closing = "closing", e10.Closed = "closed";
      }(j || (j = {}));
      class oz {
        constructor(e10) {
          this.HEADER_LENGTH = 1, this.USER_BROADCAST_PUSH_META_LENGTH = 6, this.KINDS = { userBroadcastPush: 3, userBroadcast: 4 }, this.BINARY_ENCODING = 0, this.JSON_ENCODING = 1, this.BROADCAST_EVENT = "broadcast", this.allowedMetadataKeys = [], this.allowedMetadataKeys = null != e10 ? e10 : [];
        }
        encode(e10, t10) {
          return e10.event !== this.BROADCAST_EVENT || e10.payload instanceof ArrayBuffer || "string" != typeof e10.payload.event ? t10(JSON.stringify([e10.join_ref, e10.ref, e10.topic, e10.event, e10.payload])) : t10(this._binaryEncodeUserBroadcastPush(e10));
        }
        _binaryEncodeUserBroadcastPush(e10) {
          var t10;
          return this._isArrayBuffer(null === (t10 = e10.payload) || void 0 === t10 ? void 0 : t10.payload) ? this._encodeBinaryUserBroadcastPush(e10) : this._encodeJsonUserBroadcastPush(e10);
        }
        _encodeBinaryUserBroadcastPush(e10) {
          var t10, r10;
          let n10 = null !== (r10 = null === (t10 = e10.payload) || void 0 === t10 ? void 0 : t10.payload) && void 0 !== r10 ? r10 : new ArrayBuffer(0);
          return this._encodeUserBroadcastPush(e10, this.BINARY_ENCODING, n10);
        }
        _encodeJsonUserBroadcastPush(e10) {
          var t10, r10;
          let n10 = null !== (r10 = null === (t10 = e10.payload) || void 0 === t10 ? void 0 : t10.payload) && void 0 !== r10 ? r10 : {}, s10 = new TextEncoder().encode(JSON.stringify(n10)).buffer;
          return this._encodeUserBroadcastPush(e10, this.JSON_ENCODING, s10);
        }
        _encodeUserBroadcastPush(e10, t10, r10) {
          let n10 = e10.topic, s10 = null !== (p2 = e10.ref) && void 0 !== p2 ? p2 : "", i10 = null !== (f2 = e10.join_ref) && void 0 !== f2 ? f2 : "", a10 = e10.payload.event, o10 = this.allowedMetadataKeys ? this._pick(e10.payload, this.allowedMetadataKeys) : {}, c10 = 0 === Object.keys(o10).length ? "" : JSON.stringify(o10);
          if (i10.length > 255) throw Error(`joinRef length ${i10.length} exceeds maximum of 255`);
          if (s10.length > 255) throw Error(`ref length ${s10.length} exceeds maximum of 255`);
          if (n10.length > 255) throw Error(`topic length ${n10.length} exceeds maximum of 255`);
          if (a10.length > 255) throw Error(`userEvent length ${a10.length} exceeds maximum of 255`);
          if (c10.length > 255) throw Error(`metadata length ${c10.length} exceeds maximum of 255`);
          let l10 = this.USER_BROADCAST_PUSH_META_LENGTH + i10.length + s10.length + n10.length + a10.length + c10.length, u2 = new ArrayBuffer(this.HEADER_LENGTH + l10), h2 = new DataView(u2), d2 = 0;
          h2.setUint8(d2++, this.KINDS.userBroadcastPush), h2.setUint8(d2++, i10.length), h2.setUint8(d2++, s10.length), h2.setUint8(d2++, n10.length), h2.setUint8(d2++, a10.length), h2.setUint8(d2++, c10.length), h2.setUint8(d2++, t10), Array.from(i10, (e11) => h2.setUint8(d2++, e11.charCodeAt(0))), Array.from(s10, (e11) => h2.setUint8(d2++, e11.charCodeAt(0))), Array.from(n10, (e11) => h2.setUint8(d2++, e11.charCodeAt(0))), Array.from(a10, (e11) => h2.setUint8(d2++, e11.charCodeAt(0))), Array.from(c10, (e11) => h2.setUint8(d2++, e11.charCodeAt(0)));
          var p2, f2, g2 = new Uint8Array(u2.byteLength + r10.byteLength);
          return g2.set(new Uint8Array(u2), 0), g2.set(new Uint8Array(r10), u2.byteLength), g2.buffer;
        }
        decode(e10, t10) {
          if (this._isArrayBuffer(e10)) return t10(this._binaryDecode(e10));
          if ("string" == typeof e10) {
            let [r10, n10, s10, i10, a10] = JSON.parse(e10);
            return t10({ join_ref: r10, ref: n10, topic: s10, event: i10, payload: a10 });
          }
          return t10({});
        }
        _binaryDecode(e10) {
          let t10 = new DataView(e10), r10 = t10.getUint8(0), n10 = new TextDecoder();
          if (r10 === this.KINDS.userBroadcast) return this._decodeUserBroadcast(e10, t10, n10);
        }
        _decodeUserBroadcast(e10, t10, r10) {
          let n10 = t10.getUint8(1), s10 = t10.getUint8(2), i10 = t10.getUint8(3), a10 = t10.getUint8(4), o10 = this.HEADER_LENGTH + 4, c10 = r10.decode(e10.slice(o10, o10 + n10));
          o10 += n10;
          let l10 = r10.decode(e10.slice(o10, o10 + s10));
          o10 += s10;
          let u2 = r10.decode(e10.slice(o10, o10 + i10));
          o10 += i10;
          let h2 = e10.slice(o10, e10.byteLength), d2 = a10 === this.JSON_ENCODING ? JSON.parse(r10.decode(h2)) : h2, p2 = { type: this.BROADCAST_EVENT, event: l10, payload: d2 };
          return i10 > 0 && (p2.meta = JSON.parse(u2)), { join_ref: null, ref: null, topic: c10, event: this.BROADCAST_EVENT, payload: p2 };
        }
        _isArrayBuffer(e10) {
          var t10;
          return e10 instanceof ArrayBuffer || (null === (t10 = null == e10 ? void 0 : e10.constructor) || void 0 === t10 ? void 0 : t10.name) === "ArrayBuffer";
        }
        _pick(e10, t10) {
          return e10 && "object" == typeof e10 ? Object.fromEntries(Object.entries(e10).filter(([e11]) => t10.includes(e11))) : {};
        }
      }
      class oV {
        constructor(e10, t10) {
          this.callback = e10, this.timerCalc = t10, this.timer = void 0, this.tries = 0, this.callback = e10, this.timerCalc = t10;
        }
        reset() {
          this.tries = 0, clearTimeout(this.timer), this.timer = void 0;
        }
        scheduleTimeout() {
          clearTimeout(this.timer), this.timer = setTimeout(() => {
            this.tries = this.tries + 1, this.callback();
          }, this.timerCalc(this.tries + 1));
        }
      }
      !function(e10) {
        e10.abstime = "abstime", e10.bool = "bool", e10.date = "date", e10.daterange = "daterange", e10.float4 = "float4", e10.float8 = "float8", e10.int2 = "int2", e10.int4 = "int4", e10.int4range = "int4range", e10.int8 = "int8", e10.int8range = "int8range", e10.json = "json", e10.jsonb = "jsonb", e10.money = "money", e10.numeric = "numeric", e10.oid = "oid", e10.reltime = "reltime", e10.text = "text", e10.time = "time", e10.timestamp = "timestamp", e10.timestamptz = "timestamptz", e10.timetz = "timetz", e10.tsrange = "tsrange", e10.tstzrange = "tstzrange";
      }(D || (D = {}));
      let oF = (e10, t10, r10 = {}) => {
        var n10;
        let s10 = null !== (n10 = r10.skipTypes) && void 0 !== n10 ? n10 : [];
        return t10 ? Object.keys(t10).reduce((r11, n11) => (r11[n11] = oG(n11, e10, t10, s10), r11), {}) : {};
      }, oG = (e10, t10, r10, n10) => {
        let s10 = t10.find((t11) => t11.name === e10), i10 = null == s10 ? void 0 : s10.type, a10 = r10[e10];
        return i10 && !n10.includes(i10) ? oY(i10, a10) : oX(a10);
      }, oY = (e10, t10) => {
        if ("_" === e10.charAt(0)) return o1(t10, e10.slice(1, e10.length));
        switch (e10) {
          case D.bool:
            return oQ(t10);
          case D.float4:
          case D.float8:
          case D.int2:
          case D.int4:
          case D.int8:
          case D.numeric:
          case D.oid:
            return oZ(t10);
          case D.json:
          case D.jsonb:
            return o0(t10);
          case D.timestamp:
            return o2(t10);
          case D.abstime:
          case D.date:
          case D.daterange:
          case D.int4range:
          case D.int8range:
          case D.money:
          case D.reltime:
          case D.text:
          case D.time:
          case D.timestamptz:
          case D.timetz:
          case D.tsrange:
          case D.tstzrange:
          default:
            return oX(t10);
        }
      }, oX = (e10) => e10, oQ = (e10) => {
        switch (e10) {
          case "t":
            return true;
          case "f":
            return false;
          default:
            return e10;
        }
      }, oZ = (e10) => {
        if ("string" == typeof e10) {
          let t10 = parseFloat(e10);
          if (!Number.isNaN(t10)) return t10;
        }
        return e10;
      }, o0 = (e10) => {
        if ("string" == typeof e10) try {
          return JSON.parse(e10);
        } catch (e11) {
        }
        return e10;
      }, o1 = (e10, t10) => {
        if ("string" != typeof e10) return e10;
        let r10 = e10.length - 1, n10 = e10[r10];
        if ("{" === e10[0] && "}" === n10) {
          let n11;
          let s10 = e10.slice(1, r10);
          try {
            n11 = JSON.parse("[" + s10 + "]");
          } catch (e11) {
            n11 = s10 ? s10.split(",") : [];
          }
          return n11.map((e11) => oY(t10, e11));
        }
        return e10;
      }, o2 = (e10) => "string" == typeof e10 ? e10.replace(" ", "T") : e10, o5 = (e10) => {
        let t10 = new URL(e10);
        return t10.protocol = t10.protocol.replace(/^ws/i, "http"), t10.pathname = t10.pathname.replace(/\/+$/, "").replace(/\/socket\/websocket$/i, "").replace(/\/socket$/i, "").replace(/\/websocket$/i, ""), "" === t10.pathname || "/" === t10.pathname ? t10.pathname = "/api/broadcast" : t10.pathname = t10.pathname + "/api/broadcast", t10.href;
      };
      class o8 {
        constructor(e10, t10, r10 = {}, n10 = 1e4) {
          this.channel = e10, this.event = t10, this.payload = r10, this.timeout = n10, this.sent = false, this.timeoutTimer = void 0, this.ref = "", this.receivedResp = null, this.recHooks = [], this.refEvent = null;
        }
        resend(e10) {
          this.timeout = e10, this._cancelRefEvent(), this.ref = "", this.refEvent = null, this.receivedResp = null, this.sent = false, this.send();
        }
        send() {
          this._hasReceived("timeout") || (this.startTimeout(), this.sent = true, this.channel.socket.push({ topic: this.channel.topic, event: this.event, payload: this.payload, ref: this.ref, join_ref: this.channel._joinRef() }));
        }
        updatePayload(e10) {
          this.payload = Object.assign(Object.assign({}, this.payload), e10);
        }
        receive(e10, t10) {
          var r10;
          return this._hasReceived(e10) && t10(null === (r10 = this.receivedResp) || void 0 === r10 ? void 0 : r10.response), this.recHooks.push({ status: e10, callback: t10 }), this;
        }
        startTimeout() {
          this.timeoutTimer || (this.ref = this.channel.socket._makeRef(), this.refEvent = this.channel._replyEventName(this.ref), this.channel._on(this.refEvent, {}, (e10) => {
            this._cancelRefEvent(), this._cancelTimeout(), this.receivedResp = e10, this._matchReceive(e10);
          }), this.timeoutTimer = setTimeout(() => {
            this.trigger("timeout", {});
          }, this.timeout));
        }
        trigger(e10, t10) {
          this.refEvent && this.channel._trigger(this.refEvent, { status: e10, response: t10 });
        }
        destroy() {
          this._cancelRefEvent(), this._cancelTimeout();
        }
        _cancelRefEvent() {
          this.refEvent && this.channel._off(this.refEvent, {});
        }
        _cancelTimeout() {
          clearTimeout(this.timeoutTimer), this.timeoutTimer = void 0;
        }
        _matchReceive({ status: e10, response: t10 }) {
          this.recHooks.filter((t11) => t11.status === e10).forEach((e11) => e11.callback(t10));
        }
        _hasReceived(e10) {
          return this.receivedResp && this.receivedResp.status === e10;
        }
      }
      !function(e10) {
        e10.SYNC = "sync", e10.JOIN = "join", e10.LEAVE = "leave";
      }(U || (U = {}));
      class o6 {
        constructor(e10, t10) {
          this.channel = e10, this.state = {}, this.pendingDiffs = [], this.joinRef = null, this.enabled = false, this.caller = { onJoin: () => {
          }, onLeave: () => {
          }, onSync: () => {
          } };
          let r10 = (null == t10 ? void 0 : t10.events) || { state: "presence_state", diff: "presence_diff" };
          this.channel._on(r10.state, {}, (e11) => {
            let { onJoin: t11, onLeave: r11, onSync: n10 } = this.caller;
            this.joinRef = this.channel._joinRef(), this.state = o6.syncState(this.state, e11, t11, r11), this.pendingDiffs.forEach((e12) => {
              this.state = o6.syncDiff(this.state, e12, t11, r11);
            }), this.pendingDiffs = [], n10();
          }), this.channel._on(r10.diff, {}, (e11) => {
            let { onJoin: t11, onLeave: r11, onSync: n10 } = this.caller;
            this.inPendingSyncState() ? this.pendingDiffs.push(e11) : (this.state = o6.syncDiff(this.state, e11, t11, r11), n10());
          }), this.onJoin((e11, t11, r11) => {
            this.channel._trigger("presence", { event: "join", key: e11, currentPresences: t11, newPresences: r11 });
          }), this.onLeave((e11, t11, r11) => {
            this.channel._trigger("presence", { event: "leave", key: e11, currentPresences: t11, leftPresences: r11 });
          }), this.onSync(() => {
            this.channel._trigger("presence", { event: "sync" });
          });
        }
        static syncState(e10, t10, r10, n10) {
          let s10 = this.cloneDeep(e10), i10 = this.transformState(t10), a10 = {}, o10 = {};
          return this.map(s10, (e11, t11) => {
            i10[e11] || (o10[e11] = t11);
          }), this.map(i10, (e11, t11) => {
            let r11 = s10[e11];
            if (r11) {
              let n11 = t11.map((e12) => e12.presence_ref), s11 = r11.map((e12) => e12.presence_ref), i11 = t11.filter((e12) => 0 > s11.indexOf(e12.presence_ref)), c10 = r11.filter((e12) => 0 > n11.indexOf(e12.presence_ref));
              i11.length > 0 && (a10[e11] = i11), c10.length > 0 && (o10[e11] = c10);
            } else a10[e11] = t11;
          }), this.syncDiff(s10, { joins: a10, leaves: o10 }, r10, n10);
        }
        static syncDiff(e10, t10, r10, n10) {
          let { joins: s10, leaves: i10 } = { joins: this.transformState(t10.joins), leaves: this.transformState(t10.leaves) };
          return r10 || (r10 = () => {
          }), n10 || (n10 = () => {
          }), this.map(s10, (t11, n11) => {
            var s11;
            let i11 = null !== (s11 = e10[t11]) && void 0 !== s11 ? s11 : [];
            if (e10[t11] = this.cloneDeep(n11), i11.length > 0) {
              let r11 = e10[t11].map((e11) => e11.presence_ref), n12 = i11.filter((e11) => 0 > r11.indexOf(e11.presence_ref));
              e10[t11].unshift(...n12);
            }
            r10(t11, i11, n11);
          }), this.map(i10, (t11, r11) => {
            let s11 = e10[t11];
            if (!s11) return;
            let i11 = r11.map((e11) => e11.presence_ref);
            s11 = s11.filter((e11) => 0 > i11.indexOf(e11.presence_ref)), e10[t11] = s11, n10(t11, s11, r11), 0 === s11.length && delete e10[t11];
          }), e10;
        }
        static map(e10, t10) {
          return Object.getOwnPropertyNames(e10).map((r10) => t10(r10, e10[r10]));
        }
        static transformState(e10) {
          return Object.getOwnPropertyNames(e10 = this.cloneDeep(e10)).reduce((t10, r10) => {
            let n10 = e10[r10];
            return "metas" in n10 ? t10[r10] = n10.metas.map((e11) => (e11.presence_ref = e11.phx_ref, delete e11.phx_ref, delete e11.phx_ref_prev, e11)) : t10[r10] = n10, t10;
          }, {});
        }
        static cloneDeep(e10) {
          return JSON.parse(JSON.stringify(e10));
        }
        onJoin(e10) {
          this.caller.onJoin = e10;
        }
        onLeave(e10) {
          this.caller.onLeave = e10;
        }
        onSync(e10) {
          this.caller.onSync = e10;
        }
        inPendingSyncState() {
          return !this.joinRef || this.joinRef !== this.channel._joinRef();
        }
      }
      !function(e10) {
        e10.ALL = "*", e10.INSERT = "INSERT", e10.UPDATE = "UPDATE", e10.DELETE = "DELETE";
      }($ || ($ = {})), function(e10) {
        e10.BROADCAST = "broadcast", e10.PRESENCE = "presence", e10.POSTGRES_CHANGES = "postgres_changes", e10.SYSTEM = "system";
      }(L || (L = {})), function(e10) {
        e10.SUBSCRIBED = "SUBSCRIBED", e10.TIMED_OUT = "TIMED_OUT", e10.CLOSED = "CLOSED", e10.CHANNEL_ERROR = "CHANNEL_ERROR";
      }(M || (M = {}));
      class o4 {
        constructor(e10, t10 = { config: {} }, r10) {
          var n10, s10;
          if (this.topic = e10, this.params = t10, this.socket = r10, this.bindings = {}, this.state = x.closed, this.joinedOnce = false, this.pushBuffer = [], this.subTopic = e10.replace(/^realtime:/i, ""), this.params.config = Object.assign({ broadcast: { ack: false, self: false }, presence: { key: "", enabled: false }, private: false }, t10.config), this.timeout = this.socket.timeout, this.joinPush = new o8(this, I.join, this.params, this.timeout), this.rejoinTimer = new oV(() => this._rejoinUntilConnected(), this.socket.reconnectAfterMs), this.joinPush.receive("ok", () => {
            this.state = x.joined, this.rejoinTimer.reset(), this.pushBuffer.forEach((e11) => e11.send()), this.pushBuffer = [];
          }), this._onClose(() => {
            this.rejoinTimer.reset(), this.socket.log("channel", `close ${this.topic} ${this._joinRef()}`), this.state = x.closed, this.socket._remove(this);
          }), this._onError((e11) => {
            this._isLeaving() || this._isClosed() || (this.socket.log("channel", `error ${this.topic}`, e11), this.state = x.errored, this.rejoinTimer.scheduleTimeout());
          }), this.joinPush.receive("timeout", () => {
            this._isJoining() && (this.socket.log("channel", `timeout ${this.topic}`, this.joinPush.timeout), this.state = x.errored, this.rejoinTimer.scheduleTimeout());
          }), this.joinPush.receive("error", (e11) => {
            this._isLeaving() || this._isClosed() || (this.socket.log("channel", `error ${this.topic}`, e11), this.state = x.errored, this.rejoinTimer.scheduleTimeout());
          }), this._on(I.reply, {}, (e11, t11) => {
            this._trigger(this._replyEventName(t11), e11);
          }), this.presence = new o6(this), this.broadcastEndpointURL = o5(this.socket.endPoint), this.private = this.params.config.private || false, !this.private && (null === (s10 = null === (n10 = this.params.config) || void 0 === n10 ? void 0 : n10.broadcast) || void 0 === s10 ? void 0 : s10.replay)) throw `tried to use replay on public channel '${this.topic}'. It must be a private channel.`;
        }
        subscribe(e10, t10 = this.timeout) {
          var r10, n10, s10;
          if (this.socket.isConnected() || this.socket.connect(), this.state == x.closed) {
            let { config: { broadcast: i10, presence: a10, private: o10 } } = this.params, c10 = null !== (n10 = null === (r10 = this.bindings.postgres_changes) || void 0 === r10 ? void 0 : r10.map((e11) => e11.filter)) && void 0 !== n10 ? n10 : [], l10 = !!this.bindings[L.PRESENCE] && this.bindings[L.PRESENCE].length > 0 || (null === (s10 = this.params.config.presence) || void 0 === s10 ? void 0 : s10.enabled) === true, u2 = {}, h2 = { broadcast: i10, presence: Object.assign(Object.assign({}, a10), { enabled: l10 }), postgres_changes: c10, private: o10 };
            this.socket.accessTokenValue && (u2.access_token = this.socket.accessTokenValue), this._onError((t11) => null == e10 ? void 0 : e10(M.CHANNEL_ERROR, t11)), this._onClose(() => null == e10 ? void 0 : e10(M.CLOSED)), this.updateJoinPayload(Object.assign({ config: h2 }, u2)), this.joinedOnce = true, this._rejoin(t10), this.joinPush.receive("ok", async ({ postgres_changes: t11 }) => {
              var r11;
              if (this.socket._isManualToken() || this.socket.setAuth(), void 0 === t11) {
                null == e10 || e10(M.SUBSCRIBED);
                return;
              }
              {
                let n11 = this.bindings.postgres_changes, s11 = null !== (r11 = null == n11 ? void 0 : n11.length) && void 0 !== r11 ? r11 : 0, i11 = [];
                for (let r12 = 0; r12 < s11; r12++) {
                  let s12 = n11[r12], { filter: { event: a11, schema: o11, table: c11, filter: l11 } } = s12, u3 = t11 && t11[r12];
                  if (u3 && u3.event === a11 && o4.isFilterValueEqual(u3.schema, o11) && o4.isFilterValueEqual(u3.table, c11) && o4.isFilterValueEqual(u3.filter, l11)) i11.push(Object.assign(Object.assign({}, s12), { id: u3.id }));
                  else {
                    this.unsubscribe(), this.state = x.errored, null == e10 || e10(M.CHANNEL_ERROR, Error("mismatch between server and client bindings for postgres changes"));
                    return;
                  }
                }
                this.bindings.postgres_changes = i11, e10 && e10(M.SUBSCRIBED);
                return;
              }
            }).receive("error", (t11) => {
              this.state = x.errored, null == e10 || e10(M.CHANNEL_ERROR, Error(JSON.stringify(Object.values(t11).join(", ") || "error")));
            }).receive("timeout", () => {
              null == e10 || e10(M.TIMED_OUT);
            });
          }
          return this;
        }
        presenceState() {
          return this.presence.state;
        }
        async track(e10, t10 = {}) {
          return await this.send({ type: "presence", event: "track", payload: e10 }, t10.timeout || this.timeout);
        }
        async untrack(e10 = {}) {
          return await this.send({ type: "presence", event: "untrack" }, e10);
        }
        on(e10, t10, r10) {
          return this.state === x.joined && e10 === L.PRESENCE && (this.socket.log("channel", `resubscribe to ${this.topic} due to change in presence callbacks on joined channel`), this.unsubscribe().then(async () => await this.subscribe())), this._on(e10, t10, r10);
        }
        async httpSend(e10, t10, r10 = {}) {
          var n10;
          if (null == t10) return Promise.reject("Payload is required for httpSend()");
          let s10 = { apikey: this.socket.apiKey ? this.socket.apiKey : "", "Content-Type": "application/json" };
          this.socket.accessTokenValue && (s10.Authorization = `Bearer ${this.socket.accessTokenValue}`);
          let i10 = { method: "POST", headers: s10, body: JSON.stringify({ messages: [{ topic: this.subTopic, event: e10, payload: t10, private: this.private }] }) }, a10 = await this._fetchWithTimeout(this.broadcastEndpointURL, i10, null !== (n10 = r10.timeout) && void 0 !== n10 ? n10 : this.timeout);
          if (202 === a10.status) return { success: true };
          let o10 = a10.statusText;
          try {
            let e11 = await a10.json();
            o10 = e11.error || e11.message || o10;
          } catch (e11) {
          }
          return Promise.reject(Error(o10));
        }
        async send(e10, t10 = {}) {
          var r10, n10;
          if (this._canPush() || "broadcast" !== e10.type) return new Promise((r11) => {
            var n11, s10, i10;
            let a10 = this._push(e10.type, e10, t10.timeout || this.timeout);
            "broadcast" !== e10.type || (null === (i10 = null === (s10 = null === (n11 = this.params) || void 0 === n11 ? void 0 : n11.config) || void 0 === s10 ? void 0 : s10.broadcast) || void 0 === i10 ? void 0 : i10.ack) || r11("ok"), a10.receive("ok", () => r11("ok")), a10.receive("error", () => r11("error")), a10.receive("timeout", () => r11("timed out"));
          });
          {
            console.warn("Realtime send() is automatically falling back to REST API. This behavior will be deprecated in the future. Please use httpSend() explicitly for REST delivery.");
            let { event: s10, payload: i10 } = e10, a10 = { apikey: this.socket.apiKey ? this.socket.apiKey : "", "Content-Type": "application/json" };
            this.socket.accessTokenValue && (a10.Authorization = `Bearer ${this.socket.accessTokenValue}`);
            let o10 = { method: "POST", headers: a10, body: JSON.stringify({ messages: [{ topic: this.subTopic, event: s10, payload: i10, private: this.private }] }) };
            try {
              let e11 = await this._fetchWithTimeout(this.broadcastEndpointURL, o10, null !== (r10 = t10.timeout) && void 0 !== r10 ? r10 : this.timeout);
              return await (null === (n10 = e11.body) || void 0 === n10 ? void 0 : n10.cancel()), e11.ok ? "ok" : "error";
            } catch (e11) {
              if ("AbortError" === e11.name) return "timed out";
              return "error";
            }
          }
        }
        updateJoinPayload(e10) {
          this.joinPush.updatePayload(e10);
        }
        unsubscribe(e10 = this.timeout) {
          this.state = x.leaving;
          let t10 = () => {
            this.socket.log("channel", `leave ${this.topic}`), this._trigger(I.close, "leave", this._joinRef());
          };
          this.joinPush.destroy();
          let r10 = null;
          return new Promise((n10) => {
            (r10 = new o8(this, I.leave, {}, e10)).receive("ok", () => {
              t10(), n10("ok");
            }).receive("timeout", () => {
              t10(), n10("timed out");
            }).receive("error", () => {
              n10("error");
            }), r10.send(), this._canPush() || r10.trigger("ok", {});
          }).finally(() => {
            null == r10 || r10.destroy();
          });
        }
        teardown() {
          this.pushBuffer.forEach((e10) => e10.destroy()), this.pushBuffer = [], this.rejoinTimer.reset(), this.joinPush.destroy(), this.state = x.closed, this.bindings = {};
        }
        async _fetchWithTimeout(e10, t10, r10) {
          let n10 = new AbortController(), s10 = setTimeout(() => n10.abort(), r10), i10 = await this.socket.fetch(e10, Object.assign(Object.assign({}, t10), { signal: n10.signal }));
          return clearTimeout(s10), i10;
        }
        _push(e10, t10, r10 = this.timeout) {
          if (!this.joinedOnce) throw `tried to push '${e10}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;
          let n10 = new o8(this, e10, t10, r10);
          return this._canPush() ? n10.send() : this._addToPushBuffer(n10), n10;
        }
        _addToPushBuffer(e10) {
          if (e10.startTimeout(), this.pushBuffer.push(e10), this.pushBuffer.length > 100) {
            let e11 = this.pushBuffer.shift();
            e11 && (e11.destroy(), this.socket.log("channel", `discarded push due to buffer overflow: ${e11.event}`, e11.payload));
          }
        }
        _onMessage(e10, t10, r10) {
          return t10;
        }
        _isMember(e10) {
          return this.topic === e10;
        }
        _joinRef() {
          return this.joinPush.ref;
        }
        _trigger(e10, t10, r10) {
          var n10, s10;
          let i10 = e10.toLocaleLowerCase(), { close: a10, error: o10, leave: c10, join: l10 } = I;
          if (r10 && [a10, o10, c10, l10].indexOf(i10) >= 0 && r10 !== this._joinRef()) return;
          let u2 = this._onMessage(i10, t10, r10);
          if (t10 && !u2) throw "channel onMessage callbacks must return the payload, modified or unmodified";
          ["insert", "update", "delete"].includes(i10) ? null === (n10 = this.bindings.postgres_changes) || void 0 === n10 || n10.filter((e11) => {
            var t11, r11, n11;
            return (null === (t11 = e11.filter) || void 0 === t11 ? void 0 : t11.event) === "*" || (null === (n11 = null === (r11 = e11.filter) || void 0 === r11 ? void 0 : r11.event) || void 0 === n11 ? void 0 : n11.toLocaleLowerCase()) === i10;
          }).map((e11) => e11.callback(u2, r10)) : null === (s10 = this.bindings[i10]) || void 0 === s10 || s10.filter((e11) => {
            var r11, n11, s11, a11, o11, c11;
            if (!["broadcast", "presence", "postgres_changes"].includes(i10)) return e11.type.toLocaleLowerCase() === i10;
            if ("id" in e11) {
              let i11 = e11.id, a12 = null === (r11 = e11.filter) || void 0 === r11 ? void 0 : r11.event;
              return i11 && (null === (n11 = t10.ids) || void 0 === n11 ? void 0 : n11.includes(i11)) && ("*" === a12 || (null == a12 ? void 0 : a12.toLocaleLowerCase()) === (null === (s11 = t10.data) || void 0 === s11 ? void 0 : s11.type.toLocaleLowerCase()));
            }
            {
              let r12 = null === (o11 = null === (a11 = null == e11 ? void 0 : e11.filter) || void 0 === a11 ? void 0 : a11.event) || void 0 === o11 ? void 0 : o11.toLocaleLowerCase();
              return "*" === r12 || r12 === (null === (c11 = null == t10 ? void 0 : t10.event) || void 0 === c11 ? void 0 : c11.toLocaleLowerCase());
            }
          }).map((e11) => {
            if ("object" == typeof u2 && "ids" in u2) {
              let e12 = u2.data, { schema: t11, table: r11, commit_timestamp: n11, type: s11, errors: i11 } = e12;
              u2 = Object.assign(Object.assign({}, { schema: t11, table: r11, commit_timestamp: n11, eventType: s11, new: {}, old: {}, errors: i11 }), this._getPayloadRecords(e12));
            }
            e11.callback(u2, r10);
          });
        }
        _isClosed() {
          return this.state === x.closed;
        }
        _isJoined() {
          return this.state === x.joined;
        }
        _isJoining() {
          return this.state === x.joining;
        }
        _isLeaving() {
          return this.state === x.leaving;
        }
        _replyEventName(e10) {
          return `chan_reply_${e10}`;
        }
        _on(e10, t10, r10) {
          let n10 = e10.toLocaleLowerCase(), s10 = { type: n10, filter: t10, callback: r10 };
          return this.bindings[n10] ? this.bindings[n10].push(s10) : this.bindings[n10] = [s10], this;
        }
        _off(e10, t10) {
          let r10 = e10.toLocaleLowerCase();
          return this.bindings[r10] && (this.bindings[r10] = this.bindings[r10].filter((e11) => {
            var n10;
            return !((null === (n10 = e11.type) || void 0 === n10 ? void 0 : n10.toLocaleLowerCase()) === r10 && o4.isEqual(e11.filter, t10));
          })), this;
        }
        static isEqual(e10, t10) {
          if (Object.keys(e10).length !== Object.keys(t10).length) return false;
          for (let r10 in e10) if (e10[r10] !== t10[r10]) return false;
          return true;
        }
        static isFilterValueEqual(e10, t10) {
          return (null != e10 ? e10 : void 0) === (null != t10 ? t10 : void 0);
        }
        _rejoinUntilConnected() {
          this.rejoinTimer.scheduleTimeout(), this.socket.isConnected() && this._rejoin();
        }
        _onClose(e10) {
          this._on(I.close, {}, e10);
        }
        _onError(e10) {
          this._on(I.error, {}, (t10) => e10(t10));
        }
        _canPush() {
          return this.socket.isConnected() && this._isJoined();
        }
        _rejoin(e10 = this.timeout) {
          this._isLeaving() || (this.socket._leaveOpenTopic(this.topic), this.state = x.joining, this.joinPush.resend(e10));
        }
        _getPayloadRecords(e10) {
          let t10 = { new: {}, old: {} };
          return ("INSERT" === e10.type || "UPDATE" === e10.type) && (t10.new = oF(e10.columns, e10.record)), ("UPDATE" === e10.type || "DELETE" === e10.type) && (t10.old = oF(e10.columns, e10.old_record)), t10;
        }
      }
      let o3 = () => {
      }, o9 = { HEARTBEAT_INTERVAL: 25e3, RECONNECT_DELAY: 10, HEARTBEAT_TIMEOUT_FALLBACK: 100 }, o7 = [1e3, 2e3, 5e3, 1e4], ce = `
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;
      class ct {
        constructor(e10, t10) {
          var r10;
          if (this.accessTokenValue = null, this.apiKey = null, this._manuallySetToken = false, this.channels = [], this.endPoint = "", this.httpEndpoint = "", this.headers = {}, this.params = {}, this.timeout = 1e4, this.transport = null, this.heartbeatIntervalMs = o9.HEARTBEAT_INTERVAL, this.heartbeatTimer = void 0, this.pendingHeartbeatRef = null, this.heartbeatCallback = o3, this.ref = 0, this.reconnectTimer = null, this.vsn = oJ, this.logger = o3, this.conn = null, this.sendBuffer = [], this.serializer = new oz(), this.stateChangeCallbacks = { open: [], close: [], error: [], message: [] }, this.accessToken = null, this._connectionState = "disconnected", this._wasManualDisconnect = false, this._authPromise = null, this._resolveFetch = (e11) => e11 ? (...t11) => e11(...t11) : (...e12) => fetch(...e12), !(null === (r10 = null == t10 ? void 0 : t10.params) || void 0 === r10 ? void 0 : r10.apikey)) throw Error("API key is required to connect to Realtime");
          this.apiKey = t10.params.apikey, this.endPoint = `${e10}/${N.websocket}`, this.httpEndpoint = o5(e10), this._initializeOptions(t10), this._setupReconnectionTimer(), this.fetch = this._resolveFetch(null == t10 ? void 0 : t10.fetch);
        }
        connect() {
          if (!(this.isConnecting() || this.isDisconnecting() || null !== this.conn && this.isConnected())) {
            if (this._setConnectionState("connecting"), this.accessToken && !this._authPromise && this._setAuthSafely("connect"), this.transport) this.conn = new this.transport(this.endpointURL());
            else try {
              this.conn = oq.createWebSocket(this.endpointURL());
            } catch (t10) {
              this._setConnectionState("disconnected");
              let e10 = t10.message;
              if (e10.includes("Node.js")) throw Error(`${e10}

To use Realtime in Node.js, you need to provide a WebSocket implementation:

Option 1: Use Node.js 22+ which has native WebSocket support
Option 2: Install and provide the "ws" package:

  npm install ws

  import ws from "ws"
  const client = new RealtimeClient(url, {
    ...options,
    transport: ws
  })`);
              throw Error(`WebSocket not available: ${e10}`);
            }
            this._setupConnectionHandlers();
          }
        }
        endpointURL() {
          return this._appendParams(this.endPoint, Object.assign({}, this.params, { vsn: this.vsn }));
        }
        disconnect(e10, t10) {
          if (!this.isDisconnecting()) {
            if (this._setConnectionState("disconnecting", true), this.conn) {
              let r10 = setTimeout(() => {
                this._setConnectionState("disconnected");
              }, 100);
              this.conn.onclose = () => {
                clearTimeout(r10), this._setConnectionState("disconnected");
              }, "function" == typeof this.conn.close && (e10 ? this.conn.close(e10, null != t10 ? t10 : "") : this.conn.close()), this._teardownConnection();
            } else this._setConnectionState("disconnected");
          }
        }
        getChannels() {
          return this.channels;
        }
        async removeChannel(e10) {
          let t10 = await e10.unsubscribe();
          return 0 === this.channels.length && this.disconnect(), t10;
        }
        async removeAllChannels() {
          let e10 = await Promise.all(this.channels.map((e11) => e11.unsubscribe()));
          return this.channels = [], this.disconnect(), e10;
        }
        log(e10, t10, r10) {
          this.logger(e10, t10, r10);
        }
        connectionState() {
          switch (this.conn && this.conn.readyState) {
            case R.connecting:
              return j.Connecting;
            case R.open:
              return j.Open;
            case R.closing:
              return j.Closing;
            default:
              return j.Closed;
          }
        }
        isConnected() {
          return this.connectionState() === j.Open;
        }
        isConnecting() {
          return "connecting" === this._connectionState;
        }
        isDisconnecting() {
          return "disconnecting" === this._connectionState;
        }
        channel(e10, t10 = { config: {} }) {
          let r10 = `realtime:${e10}`, n10 = this.getChannels().find((e11) => e11.topic === r10);
          if (n10) return n10;
          {
            let r11 = new o4(`realtime:${e10}`, t10, this);
            return this.channels.push(r11), r11;
          }
        }
        push(e10) {
          let { topic: t10, event: r10, payload: n10, ref: s10 } = e10, i10 = () => {
            this.encode(e10, (e11) => {
              var t11;
              null === (t11 = this.conn) || void 0 === t11 || t11.send(e11);
            });
          };
          this.log("push", `${t10} ${r10} (${s10})`, n10), this.isConnected() ? i10() : this.sendBuffer.push(i10);
        }
        async setAuth(e10 = null) {
          this._authPromise = this._performAuth(e10);
          try {
            await this._authPromise;
          } finally {
            this._authPromise = null;
          }
        }
        _isManualToken() {
          return this._manuallySetToken;
        }
        async sendHeartbeat() {
          var e10;
          if (!this.isConnected()) {
            try {
              this.heartbeatCallback("disconnected");
            } catch (e11) {
              this.log("error", "error in heartbeat callback", e11);
            }
            return;
          }
          if (this.pendingHeartbeatRef) {
            this.pendingHeartbeatRef = null, this.log("transport", "heartbeat timeout. Attempting to re-establish connection");
            try {
              this.heartbeatCallback("timeout");
            } catch (e11) {
              this.log("error", "error in heartbeat callback", e11);
            }
            this._wasManualDisconnect = false, null === (e10 = this.conn) || void 0 === e10 || e10.close(1e3, "heartbeat timeout"), setTimeout(() => {
              var e11;
              this.isConnected() || null === (e11 = this.reconnectTimer) || void 0 === e11 || e11.scheduleTimeout();
            }, o9.HEARTBEAT_TIMEOUT_FALLBACK);
            return;
          }
          this.pendingHeartbeatRef = this._makeRef(), this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref: this.pendingHeartbeatRef });
          try {
            this.heartbeatCallback("sent");
          } catch (e11) {
            this.log("error", "error in heartbeat callback", e11);
          }
          this._setAuthSafely("heartbeat");
        }
        onHeartbeat(e10) {
          this.heartbeatCallback = e10;
        }
        flushSendBuffer() {
          this.isConnected() && this.sendBuffer.length > 0 && (this.sendBuffer.forEach((e10) => e10()), this.sendBuffer = []);
        }
        _makeRef() {
          let e10 = this.ref + 1;
          return e10 === this.ref ? this.ref = 0 : this.ref = e10, this.ref.toString();
        }
        _leaveOpenTopic(e10) {
          let t10 = this.channels.find((t11) => t11.topic === e10 && (t11._isJoined() || t11._isJoining()));
          t10 && (this.log("transport", `leaving duplicate topic "${e10}"`), t10.unsubscribe());
        }
        _remove(e10) {
          this.channels = this.channels.filter((t10) => t10.topic !== e10.topic);
        }
        _onConnMessage(e10) {
          this.decode(e10.data, (e11) => {
            if ("phoenix" === e11.topic && "phx_reply" === e11.event) try {
              this.heartbeatCallback("ok" === e11.payload.status ? "ok" : "error");
            } catch (e12) {
              this.log("error", "error in heartbeat callback", e12);
            }
            e11.ref && e11.ref === this.pendingHeartbeatRef && (this.pendingHeartbeatRef = null);
            let { topic: t10, event: r10, payload: n10, ref: s10 } = e11, i10 = s10 ? `(${s10})` : "", a10 = n10.status || "";
            this.log("receive", `${a10} ${t10} ${r10} ${i10}`.trim(), n10), this.channels.filter((e12) => e12._isMember(t10)).forEach((e12) => e12._trigger(r10, n10, s10)), this._triggerStateCallbacks("message", e11);
          });
        }
        _clearTimer(e10) {
          var t10;
          "heartbeat" === e10 && this.heartbeatTimer ? (clearInterval(this.heartbeatTimer), this.heartbeatTimer = void 0) : "reconnect" === e10 && (null === (t10 = this.reconnectTimer) || void 0 === t10 || t10.reset());
        }
        _clearAllTimers() {
          this._clearTimer("heartbeat"), this._clearTimer("reconnect");
        }
        _setupConnectionHandlers() {
          this.conn && ("binaryType" in this.conn && (this.conn.binaryType = "arraybuffer"), this.conn.onopen = () => this._onConnOpen(), this.conn.onerror = (e10) => this._onConnError(e10), this.conn.onmessage = (e10) => this._onConnMessage(e10), this.conn.onclose = (e10) => this._onConnClose(e10), this.conn.readyState === R.open && this._onConnOpen());
        }
        _teardownConnection() {
          if (this.conn) {
            if (this.conn.readyState === R.open || this.conn.readyState === R.connecting) try {
              this.conn.close();
            } catch (e10) {
              this.log("error", "Error closing connection", e10);
            }
            this.conn.onopen = null, this.conn.onerror = null, this.conn.onmessage = null, this.conn.onclose = null, this.conn = null;
          }
          this._clearAllTimers(), this._terminateWorker(), this.channels.forEach((e10) => e10.teardown());
        }
        _onConnOpen() {
          this._setConnectionState("connected"), this.log("transport", `connected to ${this.endpointURL()}`), (this._authPromise || (this.accessToken && !this.accessTokenValue ? this.setAuth() : Promise.resolve())).then(() => {
            this.flushSendBuffer();
          }).catch((e10) => {
            this.log("error", "error waiting for auth on connect", e10), this.flushSendBuffer();
          }), this._clearTimer("reconnect"), this.worker ? this.workerRef || this._startWorkerHeartbeat() : this._startHeartbeat(), this._triggerStateCallbacks("open");
        }
        _startHeartbeat() {
          this.heartbeatTimer && clearInterval(this.heartbeatTimer), this.heartbeatTimer = setInterval(() => this.sendHeartbeat(), this.heartbeatIntervalMs);
        }
        _startWorkerHeartbeat() {
          this.workerUrl ? this.log("worker", `starting worker for from ${this.workerUrl}`) : this.log("worker", "starting default worker");
          let e10 = this._workerObjectUrl(this.workerUrl);
          this.workerRef = new Worker(e10), this.workerRef.onerror = (e11) => {
            this.log("worker", "worker error", e11.message), this._terminateWorker();
          }, this.workerRef.onmessage = (e11) => {
            "keepAlive" === e11.data.event && this.sendHeartbeat();
          }, this.workerRef.postMessage({ event: "start", interval: this.heartbeatIntervalMs });
        }
        _terminateWorker() {
          this.workerRef && (this.log("worker", "terminating worker"), this.workerRef.terminate(), this.workerRef = void 0);
        }
        _onConnClose(e10) {
          var t10;
          this._setConnectionState("disconnected"), this.log("transport", "close", e10), this._triggerChanError(), this._clearTimer("heartbeat"), this._wasManualDisconnect || null === (t10 = this.reconnectTimer) || void 0 === t10 || t10.scheduleTimeout(), this._triggerStateCallbacks("close", e10);
        }
        _onConnError(e10) {
          this._setConnectionState("disconnected"), this.log("transport", `${e10}`), this._triggerChanError(), this._triggerStateCallbacks("error", e10);
        }
        _triggerChanError() {
          this.channels.forEach((e10) => e10._trigger(I.error));
        }
        _appendParams(e10, t10) {
          if (0 === Object.keys(t10).length) return e10;
          let r10 = e10.match(/\?/) ? "&" : "?", n10 = new URLSearchParams(t10);
          return `${e10}${r10}${n10}`;
        }
        _workerObjectUrl(e10) {
          let t10;
          if (e10) t10 = e10;
          else {
            let e11 = new Blob([ce], { type: "application/javascript" });
            t10 = URL.createObjectURL(e11);
          }
          return t10;
        }
        _setConnectionState(e10, t10 = false) {
          this._connectionState = e10, "connecting" === e10 ? this._wasManualDisconnect = false : "disconnecting" === e10 && (this._wasManualDisconnect = t10);
        }
        async _performAuth(e10 = null) {
          let t10;
          let r10 = false;
          if (e10) t10 = e10, r10 = true;
          else if (this.accessToken) try {
            t10 = await this.accessToken();
          } catch (e11) {
            this.log("error", "Error fetching access token from callback", e11), t10 = this.accessTokenValue;
          }
          else t10 = this.accessTokenValue;
          r10 ? this._manuallySetToken = true : this.accessToken && (this._manuallySetToken = false), this.accessTokenValue != t10 && (this.accessTokenValue = t10, this.channels.forEach((e11) => {
            let r11 = { access_token: t10, version: "realtime-js/2.89.0" };
            t10 && e11.updateJoinPayload(r11), e11.joinedOnce && e11._isJoined() && e11._push(I.access_token, { access_token: t10 });
          }));
        }
        async _waitForAuthIfNeeded() {
          this._authPromise && await this._authPromise;
        }
        _setAuthSafely(e10 = "general") {
          this._isManualToken() || this.setAuth().catch((t10) => {
            this.log("error", `Error setting auth in ${e10}`, t10);
          });
        }
        _triggerStateCallbacks(e10, t10) {
          try {
            this.stateChangeCallbacks[e10].forEach((r10) => {
              try {
                r10(t10);
              } catch (t11) {
                this.log("error", `error in ${e10} callback`, t11);
              }
            });
          } catch (t11) {
            this.log("error", `error triggering ${e10} callbacks`, t11);
          }
        }
        _setupReconnectionTimer() {
          this.reconnectTimer = new oV(async () => {
            setTimeout(async () => {
              await this._waitForAuthIfNeeded(), this.isConnected() || this.connect();
            }, o9.RECONNECT_DELAY);
          }, this.reconnectAfterMs);
        }
        _initializeOptions(e10) {
          var t10, r10, n10, s10, i10, a10, o10, c10, l10, u2, h2, d2;
          switch (this.transport = null !== (t10 = null == e10 ? void 0 : e10.transport) && void 0 !== t10 ? t10 : null, this.timeout = null !== (r10 = null == e10 ? void 0 : e10.timeout) && void 0 !== r10 ? r10 : 1e4, this.heartbeatIntervalMs = null !== (n10 = null == e10 ? void 0 : e10.heartbeatIntervalMs) && void 0 !== n10 ? n10 : o9.HEARTBEAT_INTERVAL, this.worker = null !== (s10 = null == e10 ? void 0 : e10.worker) && void 0 !== s10 && s10, this.accessToken = null !== (i10 = null == e10 ? void 0 : e10.accessToken) && void 0 !== i10 ? i10 : null, this.heartbeatCallback = null !== (a10 = null == e10 ? void 0 : e10.heartbeatCallback) && void 0 !== a10 ? a10 : o3, this.vsn = null !== (o10 = null == e10 ? void 0 : e10.vsn) && void 0 !== o10 ? o10 : oJ, (null == e10 ? void 0 : e10.params) && (this.params = e10.params), (null == e10 ? void 0 : e10.logger) && (this.logger = e10.logger), ((null == e10 ? void 0 : e10.logLevel) || (null == e10 ? void 0 : e10.log_level)) && (this.logLevel = e10.logLevel || e10.log_level, this.params = Object.assign(Object.assign({}, this.params), { log_level: this.logLevel })), this.reconnectAfterMs = null !== (c10 = null == e10 ? void 0 : e10.reconnectAfterMs) && void 0 !== c10 ? c10 : (e11) => o7[e11 - 1] || 1e4, this.vsn) {
            case oJ:
              this.encode = null !== (l10 = null == e10 ? void 0 : e10.encode) && void 0 !== l10 ? l10 : (e11, t11) => t11(JSON.stringify(e11)), this.decode = null !== (u2 = null == e10 ? void 0 : e10.decode) && void 0 !== u2 ? u2 : (e11, t11) => t11(JSON.parse(e11));
              break;
            case "2.0.0":
              this.encode = null !== (h2 = null == e10 ? void 0 : e10.encode) && void 0 !== h2 ? h2 : this.serializer.encode.bind(this.serializer), this.decode = null !== (d2 = null == e10 ? void 0 : e10.decode) && void 0 !== d2 ? d2 : this.serializer.decode.bind(this.serializer);
              break;
            default:
              throw Error(`Unsupported serializer version: ${this.vsn}`);
          }
          if (this.worker) {
            if ("undefined" != typeof window && !window.Worker) throw Error("Web Worker is not supported");
            this.workerUrl = null == e10 ? void 0 : e10.workerUrl;
          }
        }
      }
      var cr = class extends Error {
        constructor(e10, t10) {
          super(e10), this.name = "IcebergError", this.status = t10.status, this.icebergType = t10.icebergType, this.icebergCode = t10.icebergCode, this.details = t10.details, this.isCommitStateUnknown = "CommitStateUnknownException" === t10.icebergType || [500, 502, 504].includes(t10.status) && t10.icebergType?.includes("CommitState") === true;
        }
        isNotFound() {
          return 404 === this.status;
        }
        isConflict() {
          return 409 === this.status;
        }
        isAuthenticationTimeout() {
          return 419 === this.status;
        }
      };
      async function cn(e10) {
        return e10 && "none" !== e10.type ? "bearer" === e10.type ? { Authorization: `Bearer ${e10.token}` } : "header" === e10.type ? { [e10.name]: e10.value } : "custom" === e10.type ? await e10.getHeaders() : {} : {};
      }
      function cs(e10) {
        return e10.join("");
      }
      var ci = class {
        constructor(e10, t10 = "") {
          this.client = e10, this.prefix = t10;
        }
        async listNamespaces(e10) {
          let t10 = e10 ? { parent: cs(e10.namespace) } : void 0;
          return (await this.client.request({ method: "GET", path: `${this.prefix}/namespaces`, query: t10 })).data.namespaces.map((e11) => ({ namespace: e11 }));
        }
        async createNamespace(e10, t10) {
          let r10 = { namespace: e10.namespace, properties: t10?.properties };
          return (await this.client.request({ method: "POST", path: `${this.prefix}/namespaces`, body: r10 })).data;
        }
        async dropNamespace(e10) {
          await this.client.request({ method: "DELETE", path: `${this.prefix}/namespaces/${cs(e10.namespace)}` });
        }
        async loadNamespaceMetadata(e10) {
          return { properties: (await this.client.request({ method: "GET", path: `${this.prefix}/namespaces/${cs(e10.namespace)}` })).data.properties };
        }
        async namespaceExists(e10) {
          try {
            return await this.client.request({ method: "HEAD", path: `${this.prefix}/namespaces/${cs(e10.namespace)}` }), true;
          } catch (e11) {
            if (e11 instanceof cr && 404 === e11.status) return false;
            throw e11;
          }
        }
        async createNamespaceIfNotExists(e10, t10) {
          try {
            return await this.createNamespace(e10, t10);
          } catch (e11) {
            if (e11 instanceof cr && 409 === e11.status) return;
            throw e11;
          }
        }
      };
      function ca(e10) {
        return e10.join("");
      }
      var co = class {
        constructor(e10, t10 = "", r10) {
          this.client = e10, this.prefix = t10, this.accessDelegation = r10;
        }
        async listTables(e10) {
          return (await this.client.request({ method: "GET", path: `${this.prefix}/namespaces/${ca(e10.namespace)}/tables` })).data.identifiers;
        }
        async createTable(e10, t10) {
          let r10 = {};
          return this.accessDelegation && (r10["X-Iceberg-Access-Delegation"] = this.accessDelegation), (await this.client.request({ method: "POST", path: `${this.prefix}/namespaces/${ca(e10.namespace)}/tables`, body: t10, headers: r10 })).data.metadata;
        }
        async updateTable(e10, t10) {
          let r10 = await this.client.request({ method: "POST", path: `${this.prefix}/namespaces/${ca(e10.namespace)}/tables/${e10.name}`, body: t10 });
          return { "metadata-location": r10.data["metadata-location"], metadata: r10.data.metadata };
        }
        async dropTable(e10, t10) {
          await this.client.request({ method: "DELETE", path: `${this.prefix}/namespaces/${ca(e10.namespace)}/tables/${e10.name}`, query: { purgeRequested: String(t10?.purge ?? false) } });
        }
        async loadTable(e10) {
          let t10 = {};
          return this.accessDelegation && (t10["X-Iceberg-Access-Delegation"] = this.accessDelegation), (await this.client.request({ method: "GET", path: `${this.prefix}/namespaces/${ca(e10.namespace)}/tables/${e10.name}`, headers: t10 })).data.metadata;
        }
        async tableExists(e10) {
          let t10 = {};
          this.accessDelegation && (t10["X-Iceberg-Access-Delegation"] = this.accessDelegation);
          try {
            return await this.client.request({ method: "HEAD", path: `${this.prefix}/namespaces/${ca(e10.namespace)}/tables/${e10.name}`, headers: t10 }), true;
          } catch (e11) {
            if (e11 instanceof cr && 404 === e11.status) return false;
            throw e11;
          }
        }
        async createTableIfNotExists(e10, t10) {
          try {
            return await this.createTable(e10, t10);
          } catch (r10) {
            if (r10 instanceof cr && 409 === r10.status) return await this.loadTable({ namespace: e10.namespace, name: t10.name });
            throw r10;
          }
        }
      }, cc = class {
        constructor(e10) {
          let t10 = "v1";
          e10.catalogName && (t10 += `/${e10.catalogName}`);
          let r10 = e10.baseUrl.endsWith("/") ? e10.baseUrl : `${e10.baseUrl}/`;
          this.client = function(e11) {
            let t11 = e11.fetchImpl ?? globalThis.fetch;
            return { async request({ method: r11, path: n10, query: s10, body: i10, headers: a10 }) {
              let o10 = function(e12, t12, r12) {
                let n11 = new URL(t12, e12);
                if (r12) for (let [e13, t13] of Object.entries(r12)) void 0 !== t13 && n11.searchParams.set(e13, t13);
                return n11.toString();
              }(e11.baseUrl, n10, s10), c10 = await cn(e11.auth), l10 = await t11(o10, { method: r11, headers: { ...i10 ? { "Content-Type": "application/json" } : {}, ...c10, ...a10 }, body: i10 ? JSON.stringify(i10) : void 0 }), u2 = await l10.text(), h2 = (l10.headers.get("content-type") || "").includes("application/json"), d2 = h2 && u2 ? JSON.parse(u2) : u2;
              if (!l10.ok) {
                let e12 = h2 ? d2 : void 0, t12 = e12?.error;
                throw new cr(t12?.message ?? `Request failed with status ${l10.status}`, { status: l10.status, icebergType: t12?.type, icebergCode: t12?.code, details: e12 });
              }
              return { status: l10.status, headers: l10.headers, data: d2 };
            } };
          }({ baseUrl: r10, auth: e10.auth, fetchImpl: e10.fetch }), this.accessDelegation = e10.accessDelegation?.join(","), this.namespaceOps = new ci(this.client, t10), this.tableOps = new co(this.client, t10, this.accessDelegation);
        }
        async listNamespaces(e10) {
          return this.namespaceOps.listNamespaces(e10);
        }
        async createNamespace(e10, t10) {
          return this.namespaceOps.createNamespace(e10, t10);
        }
        async dropNamespace(e10) {
          await this.namespaceOps.dropNamespace(e10);
        }
        async loadNamespaceMetadata(e10) {
          return this.namespaceOps.loadNamespaceMetadata(e10);
        }
        async listTables(e10) {
          return this.tableOps.listTables(e10);
        }
        async createTable(e10, t10) {
          return this.tableOps.createTable(e10, t10);
        }
        async updateTable(e10, t10) {
          return this.tableOps.updateTable(e10, t10);
        }
        async dropTable(e10, t10) {
          await this.tableOps.dropTable(e10, t10);
        }
        async loadTable(e10) {
          return this.tableOps.loadTable(e10);
        }
        async namespaceExists(e10) {
          return this.namespaceOps.namespaceExists(e10);
        }
        async tableExists(e10) {
          return this.tableOps.tableExists(e10);
        }
        async createNamespaceIfNotExists(e10, t10) {
          return this.namespaceOps.createNamespaceIfNotExists(e10, t10);
        }
        async createTableIfNotExists(e10, t10) {
          return this.tableOps.createTableIfNotExists(e10, t10);
        }
      }, cl = r(356).Buffer, cu = class extends Error {
        constructor(e10) {
          super(e10), this.__isStorageError = true, this.name = "StorageError";
        }
      };
      function ch(e10) {
        return "object" == typeof e10 && null !== e10 && "__isStorageError" in e10;
      }
      var cd = class extends cu {
        constructor(e10, t10, r10) {
          super(e10), this.name = "StorageApiError", this.status = t10, this.statusCode = r10;
        }
        toJSON() {
          return { name: this.name, message: this.message, status: this.status, statusCode: this.statusCode };
        }
      }, cp = class extends cu {
        constructor(e10, t10) {
          super(e10), this.name = "StorageUnknownError", this.originalError = t10;
        }
      };
      let cf = (e10) => e10 ? (...t10) => e10(...t10) : (...e11) => fetch(...e11), cg = () => Response, cy = (e10) => {
        if (Array.isArray(e10)) return e10.map((e11) => cy(e11));
        if ("function" == typeof e10 || e10 !== Object(e10)) return e10;
        let t10 = {};
        return Object.entries(e10).forEach(([e11, r10]) => {
          t10[e11.replace(/([-_][a-z])/gi, (e12) => e12.toUpperCase().replace(/[-_]/g, ""))] = cy(r10);
        }), t10;
      }, cm = (e10) => {
        if ("object" != typeof e10 || null === e10) return false;
        let t10 = Object.getPrototypeOf(e10);
        return (null === t10 || t10 === Object.prototype || null === Object.getPrototypeOf(t10)) && !(Symbol.toStringTag in e10) && !(Symbol.iterator in e10);
      }, cw = (e10) => !(!e10 || "string" != typeof e10 || 0 === e10.length || e10.length > 100 || e10.trim() !== e10 || e10.includes("/") || e10.includes("\\")) && /^[\w!.\*'() &$@=;:+,?-]+$/.test(e10);
      function cb(e10) {
        return (cb = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e11) {
          return typeof e11;
        } : function(e11) {
          return e11 && "function" == typeof Symbol && e11.constructor === Symbol && e11 !== Symbol.prototype ? "symbol" : typeof e11;
        })(e10);
      }
      function cv(e10, t10) {
        var r10 = Object.keys(e10);
        if (Object.getOwnPropertySymbols) {
          var n10 = Object.getOwnPropertySymbols(e10);
          t10 && (n10 = n10.filter(function(t11) {
            return Object.getOwnPropertyDescriptor(e10, t11).enumerable;
          })), r10.push.apply(r10, n10);
        }
        return r10;
      }
      function c_(e10) {
        for (var t10 = 1; t10 < arguments.length; t10++) {
          var r10 = null != arguments[t10] ? arguments[t10] : {};
          t10 % 2 ? cv(Object(r10), true).forEach(function(t11) {
            !function(e11, t12, r11) {
              var n10;
              (n10 = function(e12, t13) {
                if ("object" != cb(e12) || !e12) return e12;
                var r12 = e12[Symbol.toPrimitive];
                if (void 0 !== r12) {
                  var n11 = r12.call(e12, t13 || "default");
                  if ("object" != cb(n11)) return n11;
                  throw TypeError("@@toPrimitive must return a primitive value.");
                }
                return ("string" === t13 ? String : Number)(e12);
              }(t12, "string"), (t12 = "symbol" == cb(n10) ? n10 : n10 + "") in e11) ? Object.defineProperty(e11, t12, { value: r11, enumerable: true, configurable: true, writable: true }) : e11[t12] = r11;
            }(e10, t11, r10[t11]);
          }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e10, Object.getOwnPropertyDescriptors(r10)) : cv(Object(r10)).forEach(function(t11) {
            Object.defineProperty(e10, t11, Object.getOwnPropertyDescriptor(r10, t11));
          });
        }
        return e10;
      }
      let cS = (e10) => {
        var t10;
        return e10.msg || e10.message || e10.error_description || ("string" == typeof e10.error ? e10.error : null === (t10 = e10.error) || void 0 === t10 ? void 0 : t10.message) || JSON.stringify(e10);
      }, cE = async (e10, t10, r10) => {
        e10 instanceof await cg() && !(null == r10 ? void 0 : r10.noResolveJson) ? e10.json().then((r11) => {
          let n10 = e10.status || 500, s10 = (null == r11 ? void 0 : r11.statusCode) || n10 + "";
          t10(new cd(cS(r11), n10, s10));
        }).catch((e11) => {
          t10(new cp(cS(e11), e11));
        }) : t10(new cp(cS(e10), e10));
      }, ck = (e10, t10, r10, n10) => {
        let s10 = { method: e10, headers: (null == t10 ? void 0 : t10.headers) || {} };
        return "GET" !== e10 && n10 ? (cm(n10) ? (s10.headers = c_({ "Content-Type": "application/json" }, null == t10 ? void 0 : t10.headers), s10.body = JSON.stringify(n10)) : s10.body = n10, (null == t10 ? void 0 : t10.duplex) && (s10.duplex = t10.duplex), c_(c_({}, s10), r10)) : s10;
      };
      async function cT(e10, t10, r10, n10, s10, i10) {
        return new Promise((a10, o10) => {
          e10(r10, ck(t10, n10, s10, i10)).then((e11) => {
            if (!e11.ok) throw e11;
            return (null == n10 ? void 0 : n10.noResolveJson) ? e11 : e11.json();
          }).then((e11) => a10(e11)).catch((e11) => cE(e11, o10, n10));
        });
      }
      async function cA(e10, t10, r10, n10) {
        return cT(e10, "GET", t10, r10, n10);
      }
      async function cP(e10, t10, r10, n10, s10) {
        return cT(e10, "POST", t10, n10, s10, r10);
      }
      async function cC(e10, t10, r10, n10, s10) {
        return cT(e10, "PUT", t10, n10, s10, r10);
      }
      async function cO(e10, t10, r10, n10) {
        return cT(e10, "HEAD", t10, c_(c_({}, r10), {}, { noResolveJson: true }), n10);
      }
      async function cR(e10, t10, r10, n10, s10) {
        return cT(e10, "DELETE", t10, n10, s10, r10);
      }
      var cx = class {
        constructor(e10, t10) {
          this.downloadFn = e10, this.shouldThrowOnError = t10;
        }
        then(e10, t10) {
          return this.execute().then(e10, t10);
        }
        async execute() {
          try {
            return { data: (await this.downloadFn()).body, error: null };
          } catch (e10) {
            if (this.shouldThrowOnError) throw e10;
            if (ch(e10)) return { data: null, error: e10 };
            throw e10;
          }
        }
      };
      f = Symbol.toStringTag;
      var cI = class {
        constructor(e10, t10) {
          this.downloadFn = e10, this.shouldThrowOnError = t10, this[f] = "BlobDownloadBuilder", this.promise = null;
        }
        asStream() {
          return new cx(this.downloadFn, this.shouldThrowOnError);
        }
        then(e10, t10) {
          return this.getPromise().then(e10, t10);
        }
        catch(e10) {
          return this.getPromise().catch(e10);
        }
        finally(e10) {
          return this.getPromise().finally(e10);
        }
        getPromise() {
          return this.promise || (this.promise = this.execute()), this.promise;
        }
        async execute() {
          try {
            return { data: await (await this.downloadFn()).blob(), error: null };
          } catch (e10) {
            if (this.shouldThrowOnError) throw e10;
            if (ch(e10)) return { data: null, error: e10 };
            throw e10;
          }
        }
      };
      let cN = { limit: 100, offset: 0, sortBy: { column: "name", order: "asc" } }, cj = { cacheControl: "3600", contentType: "text/plain;charset=UTF-8", upsert: false };
      var cD = class {
        constructor(e10, t10 = {}, r10, n10) {
          this.shouldThrowOnError = false, this.url = e10, this.headers = t10, this.bucketId = r10, this.fetch = cf(n10);
        }
        throwOnError() {
          return this.shouldThrowOnError = true, this;
        }
        async uploadOrUpdate(e10, t10, r10, n10) {
          try {
            let s10;
            let i10 = c_(c_({}, cj), n10), a10 = c_(c_({}, this.headers), "POST" === e10 && { "x-upsert": String(i10.upsert) }), o10 = i10.metadata;
            "undefined" != typeof Blob && r10 instanceof Blob ? ((s10 = new FormData()).append("cacheControl", i10.cacheControl), o10 && s10.append("metadata", this.encodeMetadata(o10)), s10.append("", r10)) : "undefined" != typeof FormData && r10 instanceof FormData ? ((s10 = r10).has("cacheControl") || s10.append("cacheControl", i10.cacheControl), o10 && !s10.has("metadata") && s10.append("metadata", this.encodeMetadata(o10))) : (s10 = r10, a10["cache-control"] = `max-age=${i10.cacheControl}`, a10["content-type"] = i10.contentType, o10 && (a10["x-metadata"] = this.toBase64(this.encodeMetadata(o10))), ("undefined" != typeof ReadableStream && s10 instanceof ReadableStream || s10 && "object" == typeof s10 && "pipe" in s10 && "function" == typeof s10.pipe) && !i10.duplex && (i10.duplex = "half")), (null == n10 ? void 0 : n10.headers) && (a10 = c_(c_({}, a10), n10.headers));
            let c10 = this._removeEmptyFolders(t10), l10 = this._getFinalPath(c10), u2 = await ("PUT" == e10 ? cC : cP)(this.fetch, `${this.url}/object/${l10}`, s10, c_({ headers: a10 }, (null == i10 ? void 0 : i10.duplex) ? { duplex: i10.duplex } : {}));
            return { data: { path: c10, id: u2.Id, fullPath: u2.Key }, error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (ch(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async upload(e10, t10, r10) {
          return this.uploadOrUpdate("POST", e10, t10, r10);
        }
        async uploadToSignedUrl(e10, t10, r10, n10) {
          let s10 = this._removeEmptyFolders(e10), i10 = this._getFinalPath(s10), a10 = new URL(this.url + `/object/upload/sign/${i10}`);
          a10.searchParams.set("token", t10);
          try {
            let e11;
            let t11 = c_({ upsert: cj.upsert }, n10), i11 = c_(c_({}, this.headers), { "x-upsert": String(t11.upsert) });
            return "undefined" != typeof Blob && r10 instanceof Blob ? ((e11 = new FormData()).append("cacheControl", t11.cacheControl), e11.append("", r10)) : "undefined" != typeof FormData && r10 instanceof FormData ? (e11 = r10).append("cacheControl", t11.cacheControl) : (e11 = r10, i11["cache-control"] = `max-age=${t11.cacheControl}`, i11["content-type"] = t11.contentType), { data: { path: s10, fullPath: (await cC(this.fetch, a10.toString(), e11, { headers: i11 })).Key }, error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (ch(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async createSignedUploadUrl(e10, t10) {
          try {
            let r10 = this._getFinalPath(e10), n10 = c_({}, this.headers);
            (null == t10 ? void 0 : t10.upsert) && (n10["x-upsert"] = "true");
            let s10 = await cP(this.fetch, `${this.url}/object/upload/sign/${r10}`, {}, { headers: n10 }), i10 = new URL(this.url + s10.url), a10 = i10.searchParams.get("token");
            if (!a10) throw new cu("No token returned by API");
            return { data: { signedUrl: i10.toString(), path: e10, token: a10 }, error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (ch(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async update(e10, t10, r10) {
          return this.uploadOrUpdate("PUT", e10, t10, r10);
        }
        async move(e10, t10, r10) {
          try {
            return { data: await cP(this.fetch, `${this.url}/object/move`, { bucketId: this.bucketId, sourceKey: e10, destinationKey: t10, destinationBucket: null == r10 ? void 0 : r10.destinationBucket }, { headers: this.headers }), error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (ch(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async copy(e10, t10, r10) {
          try {
            return { data: { path: (await cP(this.fetch, `${this.url}/object/copy`, { bucketId: this.bucketId, sourceKey: e10, destinationKey: t10, destinationBucket: null == r10 ? void 0 : r10.destinationBucket }, { headers: this.headers })).Key }, error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (ch(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async createSignedUrl(e10, t10, r10) {
          try {
            let n10 = this._getFinalPath(e10), s10 = await cP(this.fetch, `${this.url}/object/sign/${n10}`, c_({ expiresIn: t10 }, (null == r10 ? void 0 : r10.transform) ? { transform: r10.transform } : {}), { headers: this.headers }), i10 = (null == r10 ? void 0 : r10.download) ? `&download=${true === r10.download ? "" : r10.download}` : "";
            return { data: s10 = { signedUrl: encodeURI(`${this.url}${s10.signedURL}${i10}`) }, error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (ch(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async createSignedUrls(e10, t10, r10) {
          var n10 = this;
          try {
            let s10 = await cP(n10.fetch, `${n10.url}/object/sign/${n10.bucketId}`, { expiresIn: t10, paths: e10 }, { headers: n10.headers }), i10 = (null == r10 ? void 0 : r10.download) ? `&download=${true === r10.download ? "" : r10.download}` : "";
            return { data: s10.map((e11) => c_(c_({}, e11), {}, { signedUrl: e11.signedURL ? encodeURI(`${n10.url}${e11.signedURL}${i10}`) : null })), error: null };
          } catch (e11) {
            if (n10.shouldThrowOnError) throw e11;
            if (ch(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        download(e10, t10) {
          let r10 = void 0 !== (null == t10 ? void 0 : t10.transform) ? "render/image/authenticated" : "object", n10 = this.transformOptsToQueryString((null == t10 ? void 0 : t10.transform) || {}), s10 = n10 ? `?${n10}` : "", i10 = this._getFinalPath(e10);
          return new cI(() => cA(this.fetch, `${this.url}/${r10}/${i10}${s10}`, { headers: this.headers, noResolveJson: true }), this.shouldThrowOnError);
        }
        async info(e10) {
          let t10 = this._getFinalPath(e10);
          try {
            return { data: cy(await cA(this.fetch, `${this.url}/object/info/${t10}`, { headers: this.headers })), error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (ch(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async exists(e10) {
          let t10 = this._getFinalPath(e10);
          try {
            return await cO(this.fetch, `${this.url}/object/${t10}`, { headers: this.headers }), { data: true, error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (ch(e11) && e11 instanceof cp) {
              let t11 = e11.originalError;
              if ([400, 404].includes(null == t11 ? void 0 : t11.status)) return { data: false, error: e11 };
            }
            throw e11;
          }
        }
        getPublicUrl(e10, t10) {
          let r10 = this._getFinalPath(e10), n10 = [], s10 = (null == t10 ? void 0 : t10.download) ? `download=${true === t10.download ? "" : t10.download}` : "";
          "" !== s10 && n10.push(s10);
          let i10 = void 0 !== (null == t10 ? void 0 : t10.transform) ? "render/image" : "object", a10 = this.transformOptsToQueryString((null == t10 ? void 0 : t10.transform) || {});
          "" !== a10 && n10.push(a10);
          let o10 = n10.join("&");
          return "" !== o10 && (o10 = `?${o10}`), { data: { publicUrl: encodeURI(`${this.url}/${i10}/public/${r10}${o10}`) } };
        }
        async remove(e10) {
          try {
            return { data: await cR(this.fetch, `${this.url}/object/${this.bucketId}`, { prefixes: e10 }, { headers: this.headers }), error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (ch(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async list(e10, t10, r10) {
          try {
            let n10 = c_(c_(c_({}, cN), t10), {}, { prefix: e10 || "" });
            return { data: await cP(this.fetch, `${this.url}/object/list/${this.bucketId}`, n10, { headers: this.headers }, r10), error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (ch(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async listV2(e10, t10) {
          try {
            let r10 = c_({}, e10);
            return { data: await cP(this.fetch, `${this.url}/object/list-v2/${this.bucketId}`, r10, { headers: this.headers }, t10), error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (ch(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        encodeMetadata(e10) {
          return JSON.stringify(e10);
        }
        toBase64(e10) {
          return void 0 !== cl ? cl.from(e10).toString("base64") : btoa(e10);
        }
        _getFinalPath(e10) {
          return `${this.bucketId}/${e10.replace(/^\/+/, "")}`;
        }
        _removeEmptyFolders(e10) {
          return e10.replace(/^\/|\/$/g, "").replace(/\/+/g, "/");
        }
        transformOptsToQueryString(e10) {
          let t10 = [];
          return e10.width && t10.push(`width=${e10.width}`), e10.height && t10.push(`height=${e10.height}`), e10.resize && t10.push(`resize=${e10.resize}`), e10.format && t10.push(`format=${e10.format}`), e10.quality && t10.push(`quality=${e10.quality}`), t10.join("&");
        }
      };
      let cU = "2.89.0", c$ = { "X-Client-Info": `storage-js/${cU}` };
      var cL = class {
        constructor(e10, t10 = {}, r10, n10) {
          this.shouldThrowOnError = false;
          let s10 = new URL(e10);
          (null == n10 ? void 0 : n10.useNewHostname) && /supabase\.(co|in|red)$/.test(s10.hostname) && !s10.hostname.includes("storage.supabase.") && (s10.hostname = s10.hostname.replace("supabase.", "storage.supabase.")), this.url = s10.href.replace(/\/$/, ""), this.headers = c_(c_({}, c$), t10), this.fetch = cf(r10);
        }
        throwOnError() {
          return this.shouldThrowOnError = true, this;
        }
        async listBuckets(e10) {
          try {
            let t10 = this.listBucketOptionsToQueryString(e10);
            return { data: await cA(this.fetch, `${this.url}/bucket${t10}`, { headers: this.headers }), error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (ch(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async getBucket(e10) {
          try {
            return { data: await cA(this.fetch, `${this.url}/bucket/${e10}`, { headers: this.headers }), error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (ch(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async createBucket(e10, t10 = { public: false }) {
          try {
            return { data: await cP(this.fetch, `${this.url}/bucket`, { id: e10, name: e10, type: t10.type, public: t10.public, file_size_limit: t10.fileSizeLimit, allowed_mime_types: t10.allowedMimeTypes }, { headers: this.headers }), error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (ch(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async updateBucket(e10, t10) {
          try {
            return { data: await cC(this.fetch, `${this.url}/bucket/${e10}`, { id: e10, name: e10, public: t10.public, file_size_limit: t10.fileSizeLimit, allowed_mime_types: t10.allowedMimeTypes }, { headers: this.headers }), error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (ch(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async emptyBucket(e10) {
          try {
            return { data: await cP(this.fetch, `${this.url}/bucket/${e10}/empty`, {}, { headers: this.headers }), error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (ch(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async deleteBucket(e10) {
          try {
            return { data: await cR(this.fetch, `${this.url}/bucket/${e10}`, {}, { headers: this.headers }), error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (ch(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        listBucketOptionsToQueryString(e10) {
          let t10 = {};
          return e10 && ("limit" in e10 && (t10.limit = String(e10.limit)), "offset" in e10 && (t10.offset = String(e10.offset)), e10.search && (t10.search = e10.search), e10.sortColumn && (t10.sortColumn = e10.sortColumn), e10.sortOrder && (t10.sortOrder = e10.sortOrder)), Object.keys(t10).length > 0 ? "?" + new URLSearchParams(t10).toString() : "";
        }
      }, cM = class {
        constructor(e10, t10 = {}, r10) {
          this.shouldThrowOnError = false, this.url = e10.replace(/\/$/, ""), this.headers = c_(c_({}, c$), t10), this.fetch = cf(r10);
        }
        throwOnError() {
          return this.shouldThrowOnError = true, this;
        }
        async createBucket(e10) {
          try {
            return { data: await cP(this.fetch, `${this.url}/bucket`, { name: e10 }, { headers: this.headers }), error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (ch(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async listBuckets(e10) {
          try {
            let t10 = new URLSearchParams();
            (null == e10 ? void 0 : e10.limit) !== void 0 && t10.set("limit", e10.limit.toString()), (null == e10 ? void 0 : e10.offset) !== void 0 && t10.set("offset", e10.offset.toString()), (null == e10 ? void 0 : e10.sortColumn) && t10.set("sortColumn", e10.sortColumn), (null == e10 ? void 0 : e10.sortOrder) && t10.set("sortOrder", e10.sortOrder), (null == e10 ? void 0 : e10.search) && t10.set("search", e10.search);
            let r10 = t10.toString(), n10 = r10 ? `${this.url}/bucket?${r10}` : `${this.url}/bucket`;
            return { data: await cA(this.fetch, n10, { headers: this.headers }), error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (ch(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async deleteBucket(e10) {
          try {
            return { data: await cR(this.fetch, `${this.url}/bucket/${e10}`, {}, { headers: this.headers }), error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (ch(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        from(e10) {
          var t10 = this;
          if (!cw(e10)) throw new cu("Invalid bucket name: File, folder, and bucket names must follow AWS object key naming guidelines and should avoid the use of any other characters.");
          let r10 = new cc({ baseUrl: this.url, catalogName: e10, auth: { type: "custom", getHeaders: async () => t10.headers }, fetch: this.fetch }), n10 = this.shouldThrowOnError;
          return new Proxy(r10, { get(e11, t11) {
            let r11 = e11[t11];
            return "function" != typeof r11 ? r11 : async (...t12) => {
              try {
                return { data: await r11.apply(e11, t12), error: null };
              } catch (e12) {
                if (n10) throw e12;
                return { data: null, error: e12 };
              }
            };
          } });
        }
      };
      let cH = { "X-Client-Info": `storage-js/${cU}`, "Content-Type": "application/json" };
      var cK = class extends Error {
        constructor(e10) {
          super(e10), this.__isStorageVectorsError = true, this.name = "StorageVectorsError";
        }
      };
      function cW(e10) {
        return "object" == typeof e10 && null !== e10 && "__isStorageVectorsError" in e10;
      }
      var cB = class extends cK {
        constructor(e10, t10, r10) {
          super(e10), this.name = "StorageVectorsApiError", this.status = t10, this.statusCode = r10;
        }
        toJSON() {
          return { name: this.name, message: this.message, status: this.status, statusCode: this.statusCode };
        }
      }, cq = class extends cK {
        constructor(e10, t10) {
          super(e10), this.name = "StorageVectorsUnknownError", this.originalError = t10;
        }
      };
      let cJ = (e10) => e10 ? (...t10) => e10(...t10) : (...e11) => fetch(...e11), cz = (e10) => {
        if ("object" != typeof e10 || null === e10) return false;
        let t10 = Object.getPrototypeOf(e10);
        return (null === t10 || t10 === Object.prototype || null === Object.getPrototypeOf(t10)) && !(Symbol.toStringTag in e10) && !(Symbol.iterator in e10);
      }, cV = (e10) => e10.msg || e10.message || e10.error_description || e10.error || JSON.stringify(e10), cF = async (e10, t10, r10) => {
        if (e10 && "object" == typeof e10 && "status" in e10 && "ok" in e10 && "number" == typeof e10.status && !(null == r10 ? void 0 : r10.noResolveJson)) {
          let r11 = e10.status || 500;
          "function" == typeof e10.json ? e10.json().then((e11) => {
            let n10 = (null == e11 ? void 0 : e11.statusCode) || (null == e11 ? void 0 : e11.code) || r11 + "";
            t10(new cB(cV(e11), r11, n10));
          }).catch(() => {
            t10(new cB(e10.statusText || `HTTP ${r11} error`, r11, r11 + ""));
          }) : t10(new cB(e10.statusText || `HTTP ${r11} error`, r11, r11 + ""));
        } else t10(new cq(cV(e10), e10));
      }, cG = (e10, t10, r10, n10) => {
        let s10 = { method: e10, headers: (null == t10 ? void 0 : t10.headers) || {} };
        return "GET" !== e10 && n10 ? (cz(n10) ? (s10.headers = c_({ "Content-Type": "application/json" }, null == t10 ? void 0 : t10.headers), s10.body = JSON.stringify(n10)) : s10.body = n10, c_(c_({}, s10), r10)) : s10;
      };
      async function cY(e10, t10, r10, n10, s10, i10) {
        return new Promise((a10, o10) => {
          e10(r10, cG(t10, n10, s10, i10)).then((e11) => {
            if (!e11.ok) throw e11;
            if (null == n10 ? void 0 : n10.noResolveJson) return e11;
            let t11 = e11.headers.get("content-type");
            return t11 && t11.includes("application/json") ? e11.json() : {};
          }).then((e11) => a10(e11)).catch((e11) => cF(e11, o10, n10));
        });
      }
      async function cX(e10, t10, r10, n10, s10) {
        return cY(e10, "POST", t10, n10, s10, r10);
      }
      var cQ = class {
        constructor(e10, t10 = {}, r10) {
          this.shouldThrowOnError = false, this.url = e10.replace(/\/$/, ""), this.headers = c_(c_({}, cH), t10), this.fetch = cJ(r10);
        }
        throwOnError() {
          return this.shouldThrowOnError = true, this;
        }
        async createIndex(e10) {
          try {
            return { data: await cX(this.fetch, `${this.url}/CreateIndex`, e10, { headers: this.headers }) || {}, error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (cW(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async getIndex(e10, t10) {
          try {
            return { data: await cX(this.fetch, `${this.url}/GetIndex`, { vectorBucketName: e10, indexName: t10 }, { headers: this.headers }), error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (cW(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async listIndexes(e10) {
          try {
            return { data: await cX(this.fetch, `${this.url}/ListIndexes`, e10, { headers: this.headers }), error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (cW(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async deleteIndex(e10, t10) {
          try {
            return { data: await cX(this.fetch, `${this.url}/DeleteIndex`, { vectorBucketName: e10, indexName: t10 }, { headers: this.headers }) || {}, error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (cW(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
      }, cZ = class {
        constructor(e10, t10 = {}, r10) {
          this.shouldThrowOnError = false, this.url = e10.replace(/\/$/, ""), this.headers = c_(c_({}, cH), t10), this.fetch = cJ(r10);
        }
        throwOnError() {
          return this.shouldThrowOnError = true, this;
        }
        async putVectors(e10) {
          try {
            if (e10.vectors.length < 1 || e10.vectors.length > 500) throw Error("Vector batch size must be between 1 and 500 items");
            return { data: await cX(this.fetch, `${this.url}/PutVectors`, e10, { headers: this.headers }) || {}, error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (cW(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async getVectors(e10) {
          try {
            return { data: await cX(this.fetch, `${this.url}/GetVectors`, e10, { headers: this.headers }), error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (cW(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async listVectors(e10) {
          try {
            if (void 0 !== e10.segmentCount) {
              if (e10.segmentCount < 1 || e10.segmentCount > 16) throw Error("segmentCount must be between 1 and 16");
              if (void 0 !== e10.segmentIndex && (e10.segmentIndex < 0 || e10.segmentIndex >= e10.segmentCount)) throw Error(`segmentIndex must be between 0 and ${e10.segmentCount - 1}`);
            }
            return { data: await cX(this.fetch, `${this.url}/ListVectors`, e10, { headers: this.headers }), error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (cW(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async queryVectors(e10) {
          try {
            return { data: await cX(this.fetch, `${this.url}/QueryVectors`, e10, { headers: this.headers }), error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (cW(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async deleteVectors(e10) {
          try {
            if (e10.keys.length < 1 || e10.keys.length > 500) throw Error("Keys batch size must be between 1 and 500 items");
            return { data: await cX(this.fetch, `${this.url}/DeleteVectors`, e10, { headers: this.headers }) || {}, error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (cW(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
      }, c0 = class {
        constructor(e10, t10 = {}, r10) {
          this.shouldThrowOnError = false, this.url = e10.replace(/\/$/, ""), this.headers = c_(c_({}, cH), t10), this.fetch = cJ(r10);
        }
        throwOnError() {
          return this.shouldThrowOnError = true, this;
        }
        async createBucket(e10) {
          try {
            return { data: await cX(this.fetch, `${this.url}/CreateVectorBucket`, { vectorBucketName: e10 }, { headers: this.headers }) || {}, error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (cW(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async getBucket(e10) {
          try {
            return { data: await cX(this.fetch, `${this.url}/GetVectorBucket`, { vectorBucketName: e10 }, { headers: this.headers }), error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (cW(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async listBuckets(e10 = {}) {
          try {
            return { data: await cX(this.fetch, `${this.url}/ListVectorBuckets`, e10, { headers: this.headers }), error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (cW(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async deleteBucket(e10) {
          try {
            return { data: await cX(this.fetch, `${this.url}/DeleteVectorBucket`, { vectorBucketName: e10 }, { headers: this.headers }) || {}, error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (cW(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
      }, c1 = class extends c0 {
        constructor(e10, t10 = {}) {
          super(e10, t10.headers || {}, t10.fetch);
        }
        from(e10) {
          return new c2(this.url, this.headers, e10, this.fetch);
        }
        async createBucket(e10) {
          return super.createBucket.call(this, e10);
        }
        async getBucket(e10) {
          return super.getBucket.call(this, e10);
        }
        async listBuckets(e10 = {}) {
          return super.listBuckets.call(this, e10);
        }
        async deleteBucket(e10) {
          return super.deleteBucket.call(this, e10);
        }
      }, c2 = class extends cQ {
        constructor(e10, t10, r10, n10) {
          super(e10, t10, n10), this.vectorBucketName = r10;
        }
        async createIndex(e10) {
          return super.createIndex.call(this, c_(c_({}, e10), {}, { vectorBucketName: this.vectorBucketName }));
        }
        async listIndexes(e10 = {}) {
          return super.listIndexes.call(this, c_(c_({}, e10), {}, { vectorBucketName: this.vectorBucketName }));
        }
        async getIndex(e10) {
          return super.getIndex.call(this, this.vectorBucketName, e10);
        }
        async deleteIndex(e10) {
          return super.deleteIndex.call(this, this.vectorBucketName, e10);
        }
        index(e10) {
          return new c5(this.url, this.headers, this.vectorBucketName, e10, this.fetch);
        }
      }, c5 = class extends cZ {
        constructor(e10, t10, r10, n10, s10) {
          super(e10, t10, s10), this.vectorBucketName = r10, this.indexName = n10;
        }
        async putVectors(e10) {
          return super.putVectors.call(this, c_(c_({}, e10), {}, { vectorBucketName: this.vectorBucketName, indexName: this.indexName }));
        }
        async getVectors(e10) {
          return super.getVectors.call(this, c_(c_({}, e10), {}, { vectorBucketName: this.vectorBucketName, indexName: this.indexName }));
        }
        async listVectors(e10 = {}) {
          return super.listVectors.call(this, c_(c_({}, e10), {}, { vectorBucketName: this.vectorBucketName, indexName: this.indexName }));
        }
        async queryVectors(e10) {
          return super.queryVectors.call(this, c_(c_({}, e10), {}, { vectorBucketName: this.vectorBucketName, indexName: this.indexName }));
        }
        async deleteVectors(e10) {
          return super.deleteVectors.call(this, c_(c_({}, e10), {}, { vectorBucketName: this.vectorBucketName, indexName: this.indexName }));
        }
      }, c8 = class extends cL {
        constructor(e10, t10 = {}, r10, n10) {
          super(e10, t10, r10, n10);
        }
        from(e10) {
          return new cD(this.url, this.headers, e10, this.fetch);
        }
        get vectors() {
          return new c1(this.url + "/vector", { headers: this.headers, fetch: this.fetch });
        }
        get analytics() {
          return new cM(this.url + "/iceberg", this.headers, this.fetch);
        }
      };
      let c6 = "2.89.0", c4 = { "X-Client-Info": `gotrue-js/${c6}` }, c3 = "X-Supabase-Api-Version", c9 = { "2024-01-01": { timestamp: Date.parse("2024-01-01T00:00:00.0Z"), name: "2024-01-01" } }, c7 = /^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i;
      class le extends Error {
        constructor(e10, t10, r10) {
          super(e10), this.__isAuthError = true, this.name = "AuthError", this.status = t10, this.code = r10;
        }
      }
      function lt(e10) {
        return "object" == typeof e10 && null !== e10 && "__isAuthError" in e10;
      }
      class lr extends le {
        constructor(e10, t10, r10) {
          super(e10, t10, r10), this.name = "AuthApiError", this.status = t10, this.code = r10;
        }
      }
      class ln extends le {
        constructor(e10, t10) {
          super(e10), this.name = "AuthUnknownError", this.originalError = t10;
        }
      }
      class ls extends le {
        constructor(e10, t10, r10, n10) {
          super(e10, r10, n10), this.name = t10, this.status = r10;
        }
      }
      class li extends ls {
        constructor() {
          super("Auth session missing!", "AuthSessionMissingError", 400, void 0);
        }
      }
      class la extends ls {
        constructor() {
          super("Auth session or user missing", "AuthInvalidTokenResponseError", 500, void 0);
        }
      }
      class lo extends ls {
        constructor(e10) {
          super(e10, "AuthInvalidCredentialsError", 400, void 0);
        }
      }
      class lc extends ls {
        constructor(e10, t10 = null) {
          super(e10, "AuthImplicitGrantRedirectError", 500, void 0), this.details = null, this.details = t10;
        }
        toJSON() {
          return { name: this.name, message: this.message, status: this.status, details: this.details };
        }
      }
      class ll extends ls {
        constructor(e10, t10 = null) {
          super(e10, "AuthPKCEGrantCodeExchangeError", 500, void 0), this.details = null, this.details = t10;
        }
        toJSON() {
          return { name: this.name, message: this.message, status: this.status, details: this.details };
        }
      }
      class lu extends ls {
        constructor() {
          super("PKCE code verifier not found in storage. This can happen if the auth flow was initiated in a different browser or device, or if the storage was cleared. For SSR frameworks (Next.js, SvelteKit, etc.), use @supabase/ssr on both the server and client to store the code verifier in cookies.", "AuthPKCECodeVerifierMissingError", 400, "pkce_code_verifier_not_found");
        }
      }
      class lh extends ls {
        constructor(e10, t10) {
          super(e10, "AuthRetryableFetchError", t10, void 0);
        }
      }
      function ld(e10) {
        return lt(e10) && "AuthRetryableFetchError" === e10.name;
      }
      class lp extends ls {
        constructor(e10, t10, r10) {
          super(e10, "AuthWeakPasswordError", t10, "weak_password"), this.reasons = r10;
        }
      }
      class lf extends ls {
        constructor(e10) {
          super(e10, "AuthInvalidJwtError", 400, "invalid_jwt");
        }
      }
      let lg = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""), ly = " 	\n\r=".split(""), lm = (() => {
        let e10 = Array(128);
        for (let t10 = 0; t10 < e10.length; t10 += 1) e10[t10] = -1;
        for (let t10 = 0; t10 < ly.length; t10 += 1) e10[ly[t10].charCodeAt(0)] = -2;
        for (let t10 = 0; t10 < lg.length; t10 += 1) e10[lg[t10].charCodeAt(0)] = t10;
        return e10;
      })();
      function lw(e10, t10, r10) {
        if (null !== e10) for (t10.queue = t10.queue << 8 | e10, t10.queuedBits += 8; t10.queuedBits >= 6; ) r10(lg[t10.queue >> t10.queuedBits - 6 & 63]), t10.queuedBits -= 6;
        else if (t10.queuedBits > 0) for (t10.queue = t10.queue << 6 - t10.queuedBits, t10.queuedBits = 6; t10.queuedBits >= 6; ) r10(lg[t10.queue >> t10.queuedBits - 6 & 63]), t10.queuedBits -= 6;
      }
      function lb(e10, t10, r10) {
        let n10 = lm[e10];
        if (n10 > -1) for (t10.queue = t10.queue << 6 | n10, t10.queuedBits += 6; t10.queuedBits >= 8; ) r10(t10.queue >> t10.queuedBits - 8 & 255), t10.queuedBits -= 8;
        else if (-2 === n10) return;
        else throw Error(`Invalid Base64-URL character "${String.fromCharCode(e10)}"`);
      }
      function lv(e10) {
        let t10 = [], r10 = (e11) => {
          t10.push(String.fromCodePoint(e11));
        }, n10 = { utf8seq: 0, codepoint: 0 }, s10 = { queue: 0, queuedBits: 0 }, i10 = (e11) => {
          !function(e12, t11, r11) {
            if (0 === t11.utf8seq) {
              if (e12 <= 127) {
                r11(e12);
                return;
              }
              for (let r12 = 1; r12 < 6; r12 += 1) if ((e12 >> 7 - r12 & 1) == 0) {
                t11.utf8seq = r12;
                break;
              }
              if (2 === t11.utf8seq) t11.codepoint = 31 & e12;
              else if (3 === t11.utf8seq) t11.codepoint = 15 & e12;
              else if (4 === t11.utf8seq) t11.codepoint = 7 & e12;
              else throw Error("Invalid UTF-8 sequence");
              t11.utf8seq -= 1;
            } else if (t11.utf8seq > 0) {
              if (e12 <= 127) throw Error("Invalid UTF-8 sequence");
              t11.codepoint = t11.codepoint << 6 | 63 & e12, t11.utf8seq -= 1, 0 === t11.utf8seq && r11(t11.codepoint);
            }
          }(e11, n10, r10);
        };
        for (let t11 = 0; t11 < e10.length; t11 += 1) lb(e10.charCodeAt(t11), s10, i10);
        return t10.join("");
      }
      function l_(e10) {
        let t10 = [], r10 = { queue: 0, queuedBits: 0 }, n10 = (e11) => {
          t10.push(e11);
        };
        for (let t11 = 0; t11 < e10.length; t11 += 1) lb(e10.charCodeAt(t11), r10, n10);
        return new Uint8Array(t10);
      }
      function lS(e10) {
        let t10 = [], r10 = { queue: 0, queuedBits: 0 }, n10 = (e11) => {
          t10.push(e11);
        };
        return e10.forEach((e11) => lw(e11, r10, n10)), lw(null, r10, n10), t10.join("");
      }
      let lE = () => "undefined" != typeof window && "undefined" != typeof document, lk = { tested: false, writable: false }, lT = () => {
        if (!lE()) return false;
        try {
          if ("object" != typeof globalThis.localStorage) return false;
        } catch (e11) {
          return false;
        }
        if (lk.tested) return lk.writable;
        let e10 = `lswt-${Math.random()}${Math.random()}`;
        try {
          globalThis.localStorage.setItem(e10, e10), globalThis.localStorage.removeItem(e10), lk.tested = true, lk.writable = true;
        } catch (e11) {
          lk.tested = true, lk.writable = false;
        }
        return lk.writable;
      }, lA = (e10) => e10 ? (...t10) => e10(...t10) : (...e11) => fetch(...e11), lP = (e10) => "object" == typeof e10 && null !== e10 && "status" in e10 && "ok" in e10 && "json" in e10 && "function" == typeof e10.json, lC = async (e10, t10, r10) => {
        await e10.setItem(t10, JSON.stringify(r10));
      }, lO = async (e10, t10) => {
        let r10 = await e10.getItem(t10);
        if (!r10) return null;
        try {
          return JSON.parse(r10);
        } catch (e11) {
          return r10;
        }
      }, lR = async (e10, t10) => {
        await e10.removeItem(t10);
      };
      class lx {
        constructor() {
          this.promise = new lx.promiseConstructor((e10, t10) => {
            this.resolve = e10, this.reject = t10;
          });
        }
      }
      function lI(e10) {
        let t10 = e10.split(".");
        if (3 !== t10.length) throw new lf("Invalid JWT structure");
        for (let e11 = 0; e11 < t10.length; e11++) if (!c7.test(t10[e11])) throw new lf("JWT not in base64url format");
        return { header: JSON.parse(lv(t10[0])), payload: JSON.parse(lv(t10[1])), signature: l_(t10[2]), raw: { header: t10[0], payload: t10[1] } };
      }
      async function lN(e10) {
        return await new Promise((t10) => {
          setTimeout(() => t10(null), e10);
        });
      }
      function lj(e10) {
        return ("0" + e10.toString(16)).substr(-2);
      }
      async function lD(e10) {
        let t10 = new TextEncoder().encode(e10);
        return Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", t10))).map((e11) => String.fromCharCode(e11)).join("");
      }
      async function lU(e10) {
        return "undefined" != typeof crypto && void 0 !== crypto.subtle && "undefined" != typeof TextEncoder ? btoa(await lD(e10)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "") : (console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256."), e10);
      }
      async function l$(e10, t10, r10 = false) {
        let n10 = function() {
          let e11 = new Uint32Array(56);
          if ("undefined" == typeof crypto) {
            let e12 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~", t11 = e12.length, r11 = "";
            for (let n11 = 0; n11 < 56; n11++) r11 += e12.charAt(Math.floor(Math.random() * t11));
            return r11;
          }
          return crypto.getRandomValues(e11), Array.from(e11, lj).join("");
        }(), s10 = n10;
        r10 && (s10 += "/PASSWORD_RECOVERY"), await lC(e10, `${t10}-code-verifier`, s10);
        let i10 = await lU(n10), a10 = n10 === i10 ? "plain" : "s256";
        return [i10, a10];
      }
      lx.promiseConstructor = Promise;
      let lL = /^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i, lM = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
      function lH(e10) {
        if (!lM.test(e10)) throw Error("@supabase/auth-js: Expected parameter to be UUID but is not");
      }
      function lK() {
        return new Proxy({}, { get: (e10, t10) => {
          if ("__isUserNotAvailableProxy" === t10) return true;
          if ("symbol" == typeof t10) {
            let e11 = t10.toString();
            if ("Symbol(Symbol.toPrimitive)" === e11 || "Symbol(Symbol.toStringTag)" === e11 || "Symbol(util.inspect.custom)" === e11) return;
          }
          throw Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${t10}" property of the session object is not supported. Please use getUser() instead.`);
        }, set: (e10, t10) => {
          throw Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${t10}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`);
        }, deleteProperty: (e10, t10) => {
          throw Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${t10}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`);
        } });
      }
      function lW(e10) {
        return JSON.parse(JSON.stringify(e10));
      }
      let lB = (e10) => e10.msg || e10.message || e10.error_description || e10.error || JSON.stringify(e10), lq = [502, 503, 504];
      async function lJ(e10) {
        var t10;
        let r10, n10;
        if (!lP(e10)) throw new lh(lB(e10), 0);
        if (lq.includes(e10.status)) throw new lh(lB(e10), e10.status);
        try {
          r10 = await e10.json();
        } catch (e11) {
          throw new ln(lB(e11), e11);
        }
        let s10 = function(e11) {
          let t11 = e11.headers.get(c3);
          if (!t11 || !t11.match(lL)) return null;
          try {
            return /* @__PURE__ */ new Date(`${t11}T00:00:00.0Z`);
          } catch (e12) {
            return null;
          }
        }(e10);
        if (s10 && s10.getTime() >= c9["2024-01-01"].timestamp && "object" == typeof r10 && r10 && "string" == typeof r10.code ? n10 = r10.code : "object" == typeof r10 && r10 && "string" == typeof r10.error_code && (n10 = r10.error_code), n10) {
          if ("weak_password" === n10) throw new lp(lB(r10), e10.status, (null === (t10 = r10.weak_password) || void 0 === t10 ? void 0 : t10.reasons) || []);
          if ("session_not_found" === n10) throw new li();
        } else if ("object" == typeof r10 && r10 && "object" == typeof r10.weak_password && r10.weak_password && Array.isArray(r10.weak_password.reasons) && r10.weak_password.reasons.length && r10.weak_password.reasons.reduce((e11, t11) => e11 && "string" == typeof t11, true)) throw new lp(lB(r10), e10.status, r10.weak_password.reasons);
        throw new lr(lB(r10), e10.status || 500, n10);
      }
      let lz = (e10, t10, r10, n10) => {
        let s10 = { method: e10, headers: (null == t10 ? void 0 : t10.headers) || {} };
        return "GET" === e10 ? s10 : (s10.headers = Object.assign({ "Content-Type": "application/json;charset=UTF-8" }, null == t10 ? void 0 : t10.headers), s10.body = JSON.stringify(n10), Object.assign(Object.assign({}, s10), r10));
      };
      async function lV(e10, t10, r10, n10) {
        var s10;
        let i10 = Object.assign({}, null == n10 ? void 0 : n10.headers);
        i10[c3] || (i10[c3] = c9["2024-01-01"].name), (null == n10 ? void 0 : n10.jwt) && (i10.Authorization = `Bearer ${n10.jwt}`);
        let a10 = null !== (s10 = null == n10 ? void 0 : n10.query) && void 0 !== s10 ? s10 : {};
        (null == n10 ? void 0 : n10.redirectTo) && (a10.redirect_to = n10.redirectTo);
        let o10 = Object.keys(a10).length ? "?" + new URLSearchParams(a10).toString() : "", c10 = await lF(e10, t10, r10 + o10, { headers: i10, noResolveJson: null == n10 ? void 0 : n10.noResolveJson }, {}, null == n10 ? void 0 : n10.body);
        return (null == n10 ? void 0 : n10.xform) ? null == n10 ? void 0 : n10.xform(c10) : { data: Object.assign({}, c10), error: null };
      }
      async function lF(e10, t10, r10, n10, s10, i10) {
        let a10;
        let o10 = lz(t10, n10, s10, i10);
        try {
          a10 = await e10(r10, Object.assign({}, o10));
        } catch (e11) {
          throw console.error(e11), new lh(lB(e11), 0);
        }
        if (a10.ok || await lJ(a10), null == n10 ? void 0 : n10.noResolveJson) return a10;
        try {
          return await a10.json();
        } catch (e11) {
          await lJ(e11);
        }
      }
      function lG(e10) {
        var t10, r10;
        let n10 = null;
        return e10.access_token && e10.refresh_token && e10.expires_in && (n10 = Object.assign({}, e10), !e10.expires_at) && (n10.expires_at = (r10 = e10.expires_in, Math.round(Date.now() / 1e3) + r10)), { data: { session: n10, user: null !== (t10 = e10.user) && void 0 !== t10 ? t10 : e10 }, error: null };
      }
      function lY(e10) {
        let t10 = lG(e10);
        return !t10.error && e10.weak_password && "object" == typeof e10.weak_password && Array.isArray(e10.weak_password.reasons) && e10.weak_password.reasons.length && e10.weak_password.message && "string" == typeof e10.weak_password.message && e10.weak_password.reasons.reduce((e11, t11) => e11 && "string" == typeof t11, true) && (t10.data.weak_password = e10.weak_password), t10;
      }
      function lX(e10) {
        var t10;
        return { data: { user: null !== (t10 = e10.user) && void 0 !== t10 ? t10 : e10 }, error: null };
      }
      function lQ(e10) {
        return { data: e10, error: null };
      }
      function lZ(e10) {
        let { action_link: t10, email_otp: r10, hashed_token: n10, redirect_to: s10, verification_type: i10 } = e10;
        return { data: { properties: { action_link: t10, email_otp: r10, hashed_token: n10, redirect_to: s10, verification_type: i10 }, user: Object.assign({}, oR(e10, ["action_link", "email_otp", "hashed_token", "redirect_to", "verification_type"])) }, error: null };
      }
      function l0(e10) {
        return e10;
      }
      let l1 = ["global", "local", "others"];
      class l2 {
        constructor({ url: e10 = "", headers: t10 = {}, fetch: r10 }) {
          this.url = e10, this.headers = t10, this.fetch = lA(r10), this.mfa = { listFactors: this._listFactors.bind(this), deleteFactor: this._deleteFactor.bind(this) }, this.oauth = { listClients: this._listOAuthClients.bind(this), createClient: this._createOAuthClient.bind(this), getClient: this._getOAuthClient.bind(this), updateClient: this._updateOAuthClient.bind(this), deleteClient: this._deleteOAuthClient.bind(this), regenerateClientSecret: this._regenerateOAuthClientSecret.bind(this) };
        }
        async signOut(e10, t10 = l1[0]) {
          if (0 > l1.indexOf(t10)) throw Error(`@supabase/auth-js: Parameter scope must be one of ${l1.join(", ")}`);
          try {
            return await lV(this.fetch, "POST", `${this.url}/logout?scope=${t10}`, { headers: this.headers, jwt: e10, noResolveJson: true }), { data: null, error: null };
          } catch (e11) {
            if (lt(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async inviteUserByEmail(e10, t10 = {}) {
          try {
            return await lV(this.fetch, "POST", `${this.url}/invite`, { body: { email: e10, data: t10.data }, headers: this.headers, redirectTo: t10.redirectTo, xform: lX });
          } catch (e11) {
            if (lt(e11)) return { data: { user: null }, error: e11 };
            throw e11;
          }
        }
        async generateLink(e10) {
          try {
            let { options: t10 } = e10, r10 = oR(e10, ["options"]), n10 = Object.assign(Object.assign({}, r10), t10);
            return "newEmail" in r10 && (n10.new_email = null == r10 ? void 0 : r10.newEmail, delete n10.newEmail), await lV(this.fetch, "POST", `${this.url}/admin/generate_link`, { body: n10, headers: this.headers, xform: lZ, redirectTo: null == t10 ? void 0 : t10.redirectTo });
          } catch (e11) {
            if (lt(e11)) return { data: { properties: null, user: null }, error: e11 };
            throw e11;
          }
        }
        async createUser(e10) {
          try {
            return await lV(this.fetch, "POST", `${this.url}/admin/users`, { body: e10, headers: this.headers, xform: lX });
          } catch (e11) {
            if (lt(e11)) return { data: { user: null }, error: e11 };
            throw e11;
          }
        }
        async listUsers(e10) {
          var t10, r10, n10, s10, i10, a10, o10;
          try {
            let c10 = { nextPage: null, lastPage: 0, total: 0 }, l10 = await lV(this.fetch, "GET", `${this.url}/admin/users`, { headers: this.headers, noResolveJson: true, query: { page: null !== (r10 = null === (t10 = null == e10 ? void 0 : e10.page) || void 0 === t10 ? void 0 : t10.toString()) && void 0 !== r10 ? r10 : "", per_page: null !== (s10 = null === (n10 = null == e10 ? void 0 : e10.perPage) || void 0 === n10 ? void 0 : n10.toString()) && void 0 !== s10 ? s10 : "" }, xform: l0 });
            if (l10.error) throw l10.error;
            let u2 = await l10.json(), h2 = null !== (i10 = l10.headers.get("x-total-count")) && void 0 !== i10 ? i10 : 0, d2 = null !== (o10 = null === (a10 = l10.headers.get("link")) || void 0 === a10 ? void 0 : a10.split(",")) && void 0 !== o10 ? o10 : [];
            return d2.length > 0 && (d2.forEach((e11) => {
              let t11 = parseInt(e11.split(";")[0].split("=")[1].substring(0, 1)), r11 = JSON.parse(e11.split(";")[1].split("=")[1]);
              c10[`${r11}Page`] = t11;
            }), c10.total = parseInt(h2)), { data: Object.assign(Object.assign({}, u2), c10), error: null };
          } catch (e11) {
            if (lt(e11)) return { data: { users: [] }, error: e11 };
            throw e11;
          }
        }
        async getUserById(e10) {
          lH(e10);
          try {
            return await lV(this.fetch, "GET", `${this.url}/admin/users/${e10}`, { headers: this.headers, xform: lX });
          } catch (e11) {
            if (lt(e11)) return { data: { user: null }, error: e11 };
            throw e11;
          }
        }
        async updateUserById(e10, t10) {
          lH(e10);
          try {
            return await lV(this.fetch, "PUT", `${this.url}/admin/users/${e10}`, { body: t10, headers: this.headers, xform: lX });
          } catch (e11) {
            if (lt(e11)) return { data: { user: null }, error: e11 };
            throw e11;
          }
        }
        async deleteUser(e10, t10 = false) {
          lH(e10);
          try {
            return await lV(this.fetch, "DELETE", `${this.url}/admin/users/${e10}`, { headers: this.headers, body: { should_soft_delete: t10 }, xform: lX });
          } catch (e11) {
            if (lt(e11)) return { data: { user: null }, error: e11 };
            throw e11;
          }
        }
        async _listFactors(e10) {
          lH(e10.userId);
          try {
            let { data: t10, error: r10 } = await lV(this.fetch, "GET", `${this.url}/admin/users/${e10.userId}/factors`, { headers: this.headers, xform: (e11) => ({ data: { factors: e11 }, error: null }) });
            return { data: t10, error: r10 };
          } catch (e11) {
            if (lt(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async _deleteFactor(e10) {
          lH(e10.userId), lH(e10.id);
          try {
            return { data: await lV(this.fetch, "DELETE", `${this.url}/admin/users/${e10.userId}/factors/${e10.id}`, { headers: this.headers }), error: null };
          } catch (e11) {
            if (lt(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async _listOAuthClients(e10) {
          var t10, r10, n10, s10, i10, a10, o10;
          try {
            let c10 = { nextPage: null, lastPage: 0, total: 0 }, l10 = await lV(this.fetch, "GET", `${this.url}/admin/oauth/clients`, { headers: this.headers, noResolveJson: true, query: { page: null !== (r10 = null === (t10 = null == e10 ? void 0 : e10.page) || void 0 === t10 ? void 0 : t10.toString()) && void 0 !== r10 ? r10 : "", per_page: null !== (s10 = null === (n10 = null == e10 ? void 0 : e10.perPage) || void 0 === n10 ? void 0 : n10.toString()) && void 0 !== s10 ? s10 : "" }, xform: l0 });
            if (l10.error) throw l10.error;
            let u2 = await l10.json(), h2 = null !== (i10 = l10.headers.get("x-total-count")) && void 0 !== i10 ? i10 : 0, d2 = null !== (o10 = null === (a10 = l10.headers.get("link")) || void 0 === a10 ? void 0 : a10.split(",")) && void 0 !== o10 ? o10 : [];
            return d2.length > 0 && (d2.forEach((e11) => {
              let t11 = parseInt(e11.split(";")[0].split("=")[1].substring(0, 1)), r11 = JSON.parse(e11.split(";")[1].split("=")[1]);
              c10[`${r11}Page`] = t11;
            }), c10.total = parseInt(h2)), { data: Object.assign(Object.assign({}, u2), c10), error: null };
          } catch (e11) {
            if (lt(e11)) return { data: { clients: [] }, error: e11 };
            throw e11;
          }
        }
        async _createOAuthClient(e10) {
          try {
            return await lV(this.fetch, "POST", `${this.url}/admin/oauth/clients`, { body: e10, headers: this.headers, xform: (e11) => ({ data: e11, error: null }) });
          } catch (e11) {
            if (lt(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async _getOAuthClient(e10) {
          try {
            return await lV(this.fetch, "GET", `${this.url}/admin/oauth/clients/${e10}`, { headers: this.headers, xform: (e11) => ({ data: e11, error: null }) });
          } catch (e11) {
            if (lt(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async _updateOAuthClient(e10, t10) {
          try {
            return await lV(this.fetch, "PUT", `${this.url}/admin/oauth/clients/${e10}`, { body: t10, headers: this.headers, xform: (e11) => ({ data: e11, error: null }) });
          } catch (e11) {
            if (lt(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async _deleteOAuthClient(e10) {
          try {
            return await lV(this.fetch, "DELETE", `${this.url}/admin/oauth/clients/${e10}`, { headers: this.headers, noResolveJson: true }), { data: null, error: null };
          } catch (e11) {
            if (lt(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async _regenerateOAuthClientSecret(e10) {
          try {
            return await lV(this.fetch, "POST", `${this.url}/admin/oauth/clients/${e10}/regenerate_secret`, { headers: this.headers, xform: (e11) => ({ data: e11, error: null }) });
          } catch (e11) {
            if (lt(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
      }
      function l5(e10 = {}) {
        return { getItem: (t10) => e10[t10] || null, setItem: (t10, r10) => {
          e10[t10] = r10;
        }, removeItem: (t10) => {
          delete e10[t10];
        } };
      }
      let l8 = { debug: !!(globalThis && lT() && globalThis.localStorage && "true" === globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug")) };
      class l6 extends Error {
        constructor(e10) {
          super(e10), this.isAcquireTimeout = true;
        }
      }
      class l4 extends l6 {
      }
      async function l3(e10, t10, r10) {
        l8.debug && console.log("@supabase/gotrue-js: navigatorLock: acquire lock", e10, t10);
        let n10 = new globalThis.AbortController();
        return t10 > 0 && setTimeout(() => {
          n10.abort(), l8.debug && console.log("@supabase/gotrue-js: navigatorLock acquire timed out", e10);
        }, t10), await Promise.resolve().then(() => globalThis.navigator.locks.request(e10, 0 === t10 ? { mode: "exclusive", ifAvailable: true } : { mode: "exclusive", signal: n10.signal }, async (n11) => {
          if (n11) {
            l8.debug && console.log("@supabase/gotrue-js: navigatorLock: acquired", e10, n11.name);
            try {
              return await r10();
            } finally {
              l8.debug && console.log("@supabase/gotrue-js: navigatorLock: released", e10, n11.name);
            }
          } else {
            if (0 === t10) throw l8.debug && console.log("@supabase/gotrue-js: navigatorLock: not immediately available", e10), new l4(`Acquiring an exclusive Navigator LockManager lock "${e10}" immediately failed`);
            if (l8.debug) try {
              let e11 = await globalThis.navigator.locks.query();
              console.log("@supabase/gotrue-js: Navigator LockManager state", JSON.stringify(e11, null, "  "));
            } catch (e11) {
              console.warn("@supabase/gotrue-js: Error when querying Navigator LockManager state", e11);
            }
            return console.warn("@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request"), await r10();
          }
        }));
      }
      function l9(e10) {
        if (!/^0x[a-fA-F0-9]{40}$/.test(e10)) throw Error(`@supabase/auth-js: Address "${e10}" is invalid.`);
        return e10.toLowerCase();
      }
      class l7 extends Error {
        constructor({ message: e10, code: t10, cause: r10, name: n10 }) {
          var s10;
          super(e10, { cause: r10 }), this.__isWebAuthnError = true, this.name = null !== (s10 = null != n10 ? n10 : r10 instanceof Error ? r10.name : void 0) && void 0 !== s10 ? s10 : "Unknown Error", this.code = t10;
        }
      }
      class ue extends l7 {
        constructor(e10, t10) {
          super({ code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY", cause: t10, message: e10 }), this.name = "WebAuthnUnknownError", this.originalError = t10;
        }
      }
      class ut {
        createNewAbortSignal() {
          if (this.controller) {
            let e11 = Error("Cancelling existing WebAuthn API call for new one");
            e11.name = "AbortError", this.controller.abort(e11);
          }
          let e10 = new AbortController();
          return this.controller = e10, e10.signal;
        }
        cancelCeremony() {
          if (this.controller) {
            let e10 = Error("Manually cancelling existing WebAuthn API call");
            e10.name = "AbortError", this.controller.abort(e10), this.controller = void 0;
          }
        }
      }
      let ur = new ut();
      function un(e10) {
        return "localhost" === e10 || /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(e10);
      }
      function us() {
        var e10, t10;
        return !!(lE() && "PublicKeyCredential" in window && window.PublicKeyCredential && "credentials" in navigator && "function" == typeof (null === (e10 = null == navigator ? void 0 : navigator.credentials) || void 0 === e10 ? void 0 : e10.create) && "function" == typeof (null === (t10 = null == navigator ? void 0 : navigator.credentials) || void 0 === t10 ? void 0 : t10.get));
      }
      async function ui(e10) {
        try {
          let t10 = await navigator.credentials.create(e10);
          if (!t10) return { data: null, error: new ue("Empty credential response", t10) };
          if (!(t10 instanceof PublicKeyCredential)) return { data: null, error: new ue("Browser returned unexpected credential type", t10) };
          return { data: t10, error: null };
        } catch (t10) {
          return { data: null, error: function({ error: e11, options: t11 }) {
            var r10, n10, s10;
            let { publicKey: i10 } = t11;
            if (!i10) throw Error("options was missing required publicKey property");
            if ("AbortError" === e11.name) {
              if (t11.signal instanceof AbortSignal) return new l7({ message: "Registration ceremony was sent an abort signal", code: "ERROR_CEREMONY_ABORTED", cause: e11 });
            } else if ("ConstraintError" === e11.name) {
              if ((null === (r10 = i10.authenticatorSelection) || void 0 === r10 ? void 0 : r10.requireResidentKey) === true) return new l7({ message: "Discoverable credentials were required but no available authenticator supported it", code: "ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT", cause: e11 });
              if ("conditional" === t11.mediation && (null === (n10 = i10.authenticatorSelection) || void 0 === n10 ? void 0 : n10.userVerification) === "required") return new l7({ message: "User verification was required during automatic registration but it could not be performed", code: "ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE", cause: e11 });
              if ((null === (s10 = i10.authenticatorSelection) || void 0 === s10 ? void 0 : s10.userVerification) === "required") return new l7({ message: "User verification was required but no available authenticator supported it", code: "ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT", cause: e11 });
            } else if ("InvalidStateError" === e11.name) return new l7({ message: "The authenticator was previously registered", code: "ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED", cause: e11 });
            else if ("NotAllowedError" === e11.name) return new l7({ message: e11.message, code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY", cause: e11 });
            else if ("NotSupportedError" === e11.name) return new l7(0 === i10.pubKeyCredParams.filter((e12) => "public-key" === e12.type).length ? { message: 'No entry in pubKeyCredParams was of type "public-key"', code: "ERROR_MALFORMED_PUBKEYCREDPARAMS", cause: e11 } : { message: "No available authenticator supported any of the specified pubKeyCredParams algorithms", code: "ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG", cause: e11 });
            else if ("SecurityError" === e11.name) {
              let t12 = window.location.hostname;
              if (!un(t12)) return new l7({ message: `${window.location.hostname} is an invalid domain`, code: "ERROR_INVALID_DOMAIN", cause: e11 });
              if (i10.rp.id !== t12) return new l7({ message: `The RP ID "${i10.rp.id}" is invalid for this domain`, code: "ERROR_INVALID_RP_ID", cause: e11 });
            } else if ("TypeError" === e11.name) {
              if (i10.user.id.byteLength < 1 || i10.user.id.byteLength > 64) return new l7({ message: "User ID was not between 1 and 64 characters", code: "ERROR_INVALID_USER_ID_LENGTH", cause: e11 });
            } else if ("UnknownError" === e11.name) return new l7({ message: "The authenticator was unable to process the specified options, or could not create a new credential", code: "ERROR_AUTHENTICATOR_GENERAL_ERROR", cause: e11 });
            return new l7({ message: "a Non-Webauthn related error has occurred", code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY", cause: e11 });
          }({ error: t10, options: e10 }) };
        }
      }
      async function ua(e10) {
        try {
          let t10 = await navigator.credentials.get(e10);
          if (!t10) return { data: null, error: new ue("Empty credential response", t10) };
          if (!(t10 instanceof PublicKeyCredential)) return { data: null, error: new ue("Browser returned unexpected credential type", t10) };
          return { data: t10, error: null };
        } catch (t10) {
          return { data: null, error: function({ error: e11, options: t11 }) {
            let { publicKey: r10 } = t11;
            if (!r10) throw Error("options was missing required publicKey property");
            if ("AbortError" === e11.name) {
              if (t11.signal instanceof AbortSignal) return new l7({ message: "Authentication ceremony was sent an abort signal", code: "ERROR_CEREMONY_ABORTED", cause: e11 });
            } else if ("NotAllowedError" === e11.name) return new l7({ message: e11.message, code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY", cause: e11 });
            else if ("SecurityError" === e11.name) {
              let t12 = window.location.hostname;
              if (!un(t12)) return new l7({ message: `${window.location.hostname} is an invalid domain`, code: "ERROR_INVALID_DOMAIN", cause: e11 });
              if (r10.rpId !== t12) return new l7({ message: `The RP ID "${r10.rpId}" is invalid for this domain`, code: "ERROR_INVALID_RP_ID", cause: e11 });
            } else if ("UnknownError" === e11.name) return new l7({ message: "The authenticator was unable to process the specified options, or could not create a new assertion signature", code: "ERROR_AUTHENTICATOR_GENERAL_ERROR", cause: e11 });
            return new l7({ message: "a Non-Webauthn related error has occurred", code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY", cause: e11 });
          }({ error: t10, options: e10 }) };
        }
      }
      let uo = { hints: ["security-key"], authenticatorSelection: { authenticatorAttachment: "cross-platform", requireResidentKey: false, userVerification: "preferred", residentKey: "discouraged" }, attestation: "direct" }, uc = { userVerification: "preferred", hints: ["security-key"], attestation: "direct" };
      function ul(...e10) {
        let t10 = (e11) => null !== e11 && "object" == typeof e11 && !Array.isArray(e11), r10 = (e11) => e11 instanceof ArrayBuffer || ArrayBuffer.isView(e11), n10 = {};
        for (let s10 of e10) if (s10) for (let e11 in s10) {
          let i10 = s10[e11];
          if (void 0 !== i10) {
            if (Array.isArray(i10)) n10[e11] = i10;
            else if (r10(i10)) n10[e11] = i10;
            else if (t10(i10)) {
              let r11 = n10[e11];
              t10(r11) ? n10[e11] = ul(r11, i10) : n10[e11] = ul(i10);
            } else n10[e11] = i10;
          }
        }
        return n10;
      }
      class uu {
        constructor(e10) {
          this.client = e10, this.enroll = this._enroll.bind(this), this.challenge = this._challenge.bind(this), this.verify = this._verify.bind(this), this.authenticate = this._authenticate.bind(this), this.register = this._register.bind(this);
        }
        async _enroll(e10) {
          return this.client.mfa.enroll(Object.assign(Object.assign({}, e10), { factorType: "webauthn" }));
        }
        async _challenge({ factorId: e10, webauthn: t10, friendlyName: r10, signal: n10 }, s10) {
          try {
            var i10, a10, o10, c10;
            let { data: l10, error: u2 } = await this.client.mfa.challenge({ factorId: e10, webauthn: t10 });
            if (!l10) return { data: null, error: u2 };
            let h2 = null != n10 ? n10 : ur.createNewAbortSignal();
            if ("create" === l10.webauthn.type) {
              let { user: e11 } = l10.webauthn.credential_options.publicKey;
              e11.name || (e11.name = `${e11.id}:${r10}`), e11.displayName || (e11.displayName = e11.name);
            }
            switch (l10.webauthn.type) {
              case "create": {
                let t11 = (i10 = l10.webauthn.credential_options.publicKey, a10 = null == s10 ? void 0 : s10.create, ul(uo, i10, a10 || {})), { data: r11, error: n11 } = await ui({ publicKey: t11, signal: h2 });
                if (r11) return { data: { factorId: e10, challengeId: l10.id, webauthn: { type: l10.webauthn.type, credential_response: r11 } }, error: null };
                return { data: null, error: n11 };
              }
              case "request": {
                let t11 = (o10 = l10.webauthn.credential_options.publicKey, c10 = null == s10 ? void 0 : s10.request, ul(uc, o10, c10 || {})), { data: r11, error: n11 } = await ua(Object.assign(Object.assign({}, l10.webauthn.credential_options), { publicKey: t11, signal: h2 }));
                if (r11) return { data: { factorId: e10, challengeId: l10.id, webauthn: { type: l10.webauthn.type, credential_response: r11 } }, error: null };
                return { data: null, error: n11 };
              }
            }
          } catch (e11) {
            if (lt(e11)) return { data: null, error: e11 };
            return { data: null, error: new ln("Unexpected error in challenge", e11) };
          }
        }
        async _verify({ challengeId: e10, factorId: t10, webauthn: r10 }) {
          return this.client.mfa.verify({ factorId: t10, challengeId: e10, webauthn: r10 });
        }
        async _authenticate({ factorId: e10, webauthn: { rpId: t10 = "undefined" != typeof window ? window.location.hostname : void 0, rpOrigins: r10 = "undefined" != typeof window ? [window.location.origin] : void 0, signal: n10 } = {} }, s10) {
          if (!t10) return { data: null, error: new le("rpId is required for WebAuthn authentication") };
          try {
            if (!us()) return { data: null, error: new ln("Browser does not support WebAuthn", null) };
            let { data: i10, error: a10 } = await this.challenge({ factorId: e10, webauthn: { rpId: t10, rpOrigins: r10 }, signal: n10 }, { request: s10 });
            if (!i10) return { data: null, error: a10 };
            let { webauthn: o10 } = i10;
            return this._verify({ factorId: e10, challengeId: i10.challengeId, webauthn: { type: o10.type, rpId: t10, rpOrigins: r10, credential_response: o10.credential_response } });
          } catch (e11) {
            if (lt(e11)) return { data: null, error: e11 };
            return { data: null, error: new ln("Unexpected error in authenticate", e11) };
          }
        }
        async _register({ friendlyName: e10, webauthn: { rpId: t10 = "undefined" != typeof window ? window.location.hostname : void 0, rpOrigins: r10 = "undefined" != typeof window ? [window.location.origin] : void 0, signal: n10 } = {} }, s10) {
          if (!t10) return { data: null, error: new le("rpId is required for WebAuthn registration") };
          try {
            if (!us()) return { data: null, error: new ln("Browser does not support WebAuthn", null) };
            let { data: i10, error: a10 } = await this._enroll({ friendlyName: e10 });
            if (!i10) return await this.client.mfa.listFactors().then((t11) => {
              var r11;
              return null === (r11 = t11.data) || void 0 === r11 ? void 0 : r11.all.find((t12) => "webauthn" === t12.factor_type && t12.friendly_name === e10 && "unverified" !== t12.status);
            }).then((e11) => e11 ? this.client.mfa.unenroll({ factorId: null == e11 ? void 0 : e11.id }) : void 0), { data: null, error: a10 };
            let { data: o10, error: c10 } = await this._challenge({ factorId: i10.id, friendlyName: i10.friendly_name, webauthn: { rpId: t10, rpOrigins: r10 }, signal: n10 }, { create: s10 });
            if (!o10) return { data: null, error: c10 };
            return this._verify({ factorId: i10.id, challengeId: o10.challengeId, webauthn: { rpId: t10, rpOrigins: r10, type: o10.webauthn.type, credential_response: o10.webauthn.credential_response } });
          } catch (e11) {
            if (lt(e11)) return { data: null, error: e11 };
            return { data: null, error: new ln("Unexpected error in register", e11) };
          }
        }
      }
      !function() {
        if ("object" != typeof globalThis) try {
          Object.defineProperty(Object.prototype, "__magic__", { get: function() {
            return this;
          }, configurable: true }), __magic__.globalThis = __magic__, delete Object.prototype.__magic__;
        } catch (e10) {
          "undefined" != typeof self && (self.globalThis = self);
        }
      }();
      let uh = { url: "http://localhost:9999", storageKey: "supabase.auth.token", autoRefreshToken: true, persistSession: true, detectSessionInUrl: true, headers: c4, flowType: "implicit", debug: false, hasCustomAuthorizationHeader: false, throwOnError: false };
      async function ud(e10, t10, r10) {
        return await r10();
      }
      let up = {};
      class uf {
        get jwks() {
          var e10, t10;
          return null !== (t10 = null === (e10 = up[this.storageKey]) || void 0 === e10 ? void 0 : e10.jwks) && void 0 !== t10 ? t10 : { keys: [] };
        }
        set jwks(e10) {
          up[this.storageKey] = Object.assign(Object.assign({}, up[this.storageKey]), { jwks: e10 });
        }
        get jwks_cached_at() {
          var e10, t10;
          return null !== (t10 = null === (e10 = up[this.storageKey]) || void 0 === e10 ? void 0 : e10.cachedAt) && void 0 !== t10 ? t10 : Number.MIN_SAFE_INTEGER;
        }
        set jwks_cached_at(e10) {
          up[this.storageKey] = Object.assign(Object.assign({}, up[this.storageKey]), { cachedAt: e10 });
        }
        constructor(e10) {
          var t10, r10, n10;
          this.userStorage = null, this.memoryStorage = null, this.stateChangeEmitters = /* @__PURE__ */ new Map(), this.autoRefreshTicker = null, this.visibilityChangedCallback = null, this.refreshingDeferred = null, this.initializePromise = null, this.detectSessionInUrl = true, this.hasCustomAuthorizationHeader = false, this.suppressGetSessionWarning = false, this.lockAcquired = false, this.pendingInLock = [], this.broadcastChannel = null, this.logger = console.log;
          let s10 = Object.assign(Object.assign({}, uh), e10);
          if (this.storageKey = s10.storageKey, this.instanceID = null !== (t10 = uf.nextInstanceID[this.storageKey]) && void 0 !== t10 ? t10 : 0, uf.nextInstanceID[this.storageKey] = this.instanceID + 1, this.logDebugMessages = !!s10.debug, "function" == typeof s10.debug && (this.logger = s10.debug), this.instanceID > 0 && lE()) {
            let e11 = `${this._logPrefix()} Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.`;
            console.warn(e11), this.logDebugMessages && console.trace(e11);
          }
          if (this.persistSession = s10.persistSession, this.autoRefreshToken = s10.autoRefreshToken, this.admin = new l2({ url: s10.url, headers: s10.headers, fetch: s10.fetch }), this.url = s10.url, this.headers = s10.headers, this.fetch = lA(s10.fetch), this.lock = s10.lock || ud, this.detectSessionInUrl = s10.detectSessionInUrl, this.flowType = s10.flowType, this.hasCustomAuthorizationHeader = s10.hasCustomAuthorizationHeader, this.throwOnError = s10.throwOnError, s10.lock ? this.lock = s10.lock : this.persistSession && lE() && (null === (r10 = null == globalThis ? void 0 : globalThis.navigator) || void 0 === r10 ? void 0 : r10.locks) ? this.lock = l3 : this.lock = ud, this.jwks || (this.jwks = { keys: [] }, this.jwks_cached_at = Number.MIN_SAFE_INTEGER), this.mfa = { verify: this._verify.bind(this), enroll: this._enroll.bind(this), unenroll: this._unenroll.bind(this), challenge: this._challenge.bind(this), listFactors: this._listFactors.bind(this), challengeAndVerify: this._challengeAndVerify.bind(this), getAuthenticatorAssuranceLevel: this._getAuthenticatorAssuranceLevel.bind(this), webauthn: new uu(this) }, this.oauth = { getAuthorizationDetails: this._getAuthorizationDetails.bind(this), approveAuthorization: this._approveAuthorization.bind(this), denyAuthorization: this._denyAuthorization.bind(this), listGrants: this._listOAuthGrants.bind(this), revokeGrant: this._revokeOAuthGrant.bind(this) }, this.persistSession ? (s10.storage ? this.storage = s10.storage : lT() ? this.storage = globalThis.localStorage : (this.memoryStorage = {}, this.storage = l5(this.memoryStorage)), s10.userStorage && (this.userStorage = s10.userStorage)) : (this.memoryStorage = {}, this.storage = l5(this.memoryStorage)), lE() && globalThis.BroadcastChannel && this.persistSession && this.storageKey) {
            try {
              this.broadcastChannel = new globalThis.BroadcastChannel(this.storageKey);
            } catch (e11) {
              console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available", e11);
            }
            null === (n10 = this.broadcastChannel) || void 0 === n10 || n10.addEventListener("message", async (e11) => {
              this._debug("received broadcast notification from other tab or client", e11), await this._notifyAllSubscribers(e11.data.event, e11.data.session, false);
            });
          }
          this.initialize();
        }
        isThrowOnErrorEnabled() {
          return this.throwOnError;
        }
        _returnResult(e10) {
          if (this.throwOnError && e10 && e10.error) throw e10.error;
          return e10;
        }
        _logPrefix() {
          return `GoTrueClient@${this.storageKey}:${this.instanceID} (${c6}) ${(/* @__PURE__ */ new Date()).toISOString()}`;
        }
        _debug(...e10) {
          return this.logDebugMessages && this.logger(this._logPrefix(), ...e10), this;
        }
        async initialize() {
          return this.initializePromise || (this.initializePromise = (async () => await this._acquireLock(-1, async () => await this._initialize()))()), await this.initializePromise;
        }
        async _initialize() {
          var e10;
          try {
            let t10 = {}, r10 = "none";
            if (lE() && (t10 = function(e11) {
              let t11 = {}, r11 = new URL(e11);
              if (r11.hash && "#" === r11.hash[0]) try {
                new URLSearchParams(r11.hash.substring(1)).forEach((e12, r12) => {
                  t11[r12] = e12;
                });
              } catch (e12) {
              }
              return r11.searchParams.forEach((e12, r12) => {
                t11[r12] = e12;
              }), t11;
            }(window.location.href), this._isImplicitGrantCallback(t10) ? r10 = "implicit" : await this._isPKCECallback(t10) && (r10 = "pkce")), lE() && this.detectSessionInUrl && "none" !== r10) {
              let { data: n10, error: s10 } = await this._getSessionFromURL(t10, r10);
              if (s10) {
                if (this._debug("#_initialize()", "error detecting session from URL", s10), lt(s10) && "AuthImplicitGrantRedirectError" === s10.name) {
                  let t11 = null === (e10 = s10.details) || void 0 === e10 ? void 0 : e10.code;
                  if ("identity_already_exists" === t11 || "identity_not_found" === t11 || "single_identity_not_deletable" === t11) return { error: s10 };
                }
                return await this._removeSession(), { error: s10 };
              }
              let { session: i10, redirectType: a10 } = n10;
              return this._debug("#_initialize()", "detected session in URL", i10, "redirect type", a10), await this._saveSession(i10), setTimeout(async () => {
                "recovery" === a10 ? await this._notifyAllSubscribers("PASSWORD_RECOVERY", i10) : await this._notifyAllSubscribers("SIGNED_IN", i10);
              }, 0), { error: null };
            }
            return await this._recoverAndRefresh(), { error: null };
          } catch (e11) {
            if (lt(e11)) return this._returnResult({ error: e11 });
            return this._returnResult({ error: new ln("Unexpected error during initialization", e11) });
          } finally {
            await this._handleVisibilityChange(), this._debug("#_initialize()", "end");
          }
        }
        async signInAnonymously(e10) {
          var t10, r10, n10;
          try {
            let { data: s10, error: i10 } = await lV(this.fetch, "POST", `${this.url}/signup`, { headers: this.headers, body: { data: null !== (r10 = null === (t10 = null == e10 ? void 0 : e10.options) || void 0 === t10 ? void 0 : t10.data) && void 0 !== r10 ? r10 : {}, gotrue_meta_security: { captcha_token: null === (n10 = null == e10 ? void 0 : e10.options) || void 0 === n10 ? void 0 : n10.captchaToken } }, xform: lG });
            if (i10 || !s10) return this._returnResult({ data: { user: null, session: null }, error: i10 });
            let a10 = s10.session, o10 = s10.user;
            return s10.session && (await this._saveSession(s10.session), await this._notifyAllSubscribers("SIGNED_IN", a10)), this._returnResult({ data: { user: o10, session: a10 }, error: null });
          } catch (e11) {
            if (lt(e11)) return this._returnResult({ data: { user: null, session: null }, error: e11 });
            throw e11;
          }
        }
        async signUp(e10) {
          var t10, r10, n10;
          try {
            let s10;
            if ("email" in e10) {
              let { email: r11, password: n11, options: i11 } = e10, a11 = null, o11 = null;
              "pkce" === this.flowType && ([a11, o11] = await l$(this.storage, this.storageKey)), s10 = await lV(this.fetch, "POST", `${this.url}/signup`, { headers: this.headers, redirectTo: null == i11 ? void 0 : i11.emailRedirectTo, body: { email: r11, password: n11, data: null !== (t10 = null == i11 ? void 0 : i11.data) && void 0 !== t10 ? t10 : {}, gotrue_meta_security: { captcha_token: null == i11 ? void 0 : i11.captchaToken }, code_challenge: a11, code_challenge_method: o11 }, xform: lG });
            } else if ("phone" in e10) {
              let { phone: t11, password: i11, options: a11 } = e10;
              s10 = await lV(this.fetch, "POST", `${this.url}/signup`, { headers: this.headers, body: { phone: t11, password: i11, data: null !== (r10 = null == a11 ? void 0 : a11.data) && void 0 !== r10 ? r10 : {}, channel: null !== (n10 = null == a11 ? void 0 : a11.channel) && void 0 !== n10 ? n10 : "sms", gotrue_meta_security: { captcha_token: null == a11 ? void 0 : a11.captchaToken } }, xform: lG });
            } else throw new lo("You must provide either an email or phone number and a password");
            let { data: i10, error: a10 } = s10;
            if (a10 || !i10) return await lR(this.storage, `${this.storageKey}-code-verifier`), this._returnResult({ data: { user: null, session: null }, error: a10 });
            let o10 = i10.session, c10 = i10.user;
            return i10.session && (await this._saveSession(i10.session), await this._notifyAllSubscribers("SIGNED_IN", o10)), this._returnResult({ data: { user: c10, session: o10 }, error: null });
          } catch (e11) {
            if (await lR(this.storage, `${this.storageKey}-code-verifier`), lt(e11)) return this._returnResult({ data: { user: null, session: null }, error: e11 });
            throw e11;
          }
        }
        async signInWithPassword(e10) {
          try {
            let t10;
            if ("email" in e10) {
              let { email: r11, password: n11, options: s10 } = e10;
              t10 = await lV(this.fetch, "POST", `${this.url}/token?grant_type=password`, { headers: this.headers, body: { email: r11, password: n11, gotrue_meta_security: { captcha_token: null == s10 ? void 0 : s10.captchaToken } }, xform: lY });
            } else if ("phone" in e10) {
              let { phone: r11, password: n11, options: s10 } = e10;
              t10 = await lV(this.fetch, "POST", `${this.url}/token?grant_type=password`, { headers: this.headers, body: { phone: r11, password: n11, gotrue_meta_security: { captcha_token: null == s10 ? void 0 : s10.captchaToken } }, xform: lY });
            } else throw new lo("You must provide either an email or phone number and a password");
            let { data: r10, error: n10 } = t10;
            if (n10) return this._returnResult({ data: { user: null, session: null }, error: n10 });
            if (!r10 || !r10.session || !r10.user) {
              let e11 = new la();
              return this._returnResult({ data: { user: null, session: null }, error: e11 });
            }
            return r10.session && (await this._saveSession(r10.session), await this._notifyAllSubscribers("SIGNED_IN", r10.session)), this._returnResult({ data: Object.assign({ user: r10.user, session: r10.session }, r10.weak_password ? { weakPassword: r10.weak_password } : null), error: n10 });
          } catch (e11) {
            if (lt(e11)) return this._returnResult({ data: { user: null, session: null }, error: e11 });
            throw e11;
          }
        }
        async signInWithOAuth(e10) {
          var t10, r10, n10, s10;
          return await this._handleProviderSignIn(e10.provider, { redirectTo: null === (t10 = e10.options) || void 0 === t10 ? void 0 : t10.redirectTo, scopes: null === (r10 = e10.options) || void 0 === r10 ? void 0 : r10.scopes, queryParams: null === (n10 = e10.options) || void 0 === n10 ? void 0 : n10.queryParams, skipBrowserRedirect: null === (s10 = e10.options) || void 0 === s10 ? void 0 : s10.skipBrowserRedirect });
        }
        async exchangeCodeForSession(e10) {
          return await this.initializePromise, this._acquireLock(-1, async () => this._exchangeCodeForSession(e10));
        }
        async signInWithWeb3(e10) {
          let { chain: t10 } = e10;
          switch (t10) {
            case "ethereum":
              return await this.signInWithEthereum(e10);
            case "solana":
              return await this.signInWithSolana(e10);
            default:
              throw Error(`@supabase/auth-js: Unsupported chain "${t10}"`);
          }
        }
        async signInWithEthereum(e10) {
          var t10, r10, n10, s10, i10, a10, o10, c10, l10, u2, h2, d2;
          let p2, f2;
          if ("message" in e10) p2 = e10.message, f2 = e10.signature;
          else {
            let u3;
            let { chain: h3, wallet: g2, statement: y2, options: m2 } = e10;
            if (lE()) {
              if ("object" == typeof g2) u3 = g2;
              else {
                let e11 = window;
                if ("ethereum" in e11 && "object" == typeof e11.ethereum && "request" in e11.ethereum && "function" == typeof e11.ethereum.request) u3 = e11.ethereum;
                else throw Error("@supabase/auth-js: No compatible Ethereum wallet interface on the window object (window.ethereum) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'ethereum', wallet: resolvedUserWallet }) instead.");
              }
            } else {
              if ("object" != typeof g2 || !(null == m2 ? void 0 : m2.url)) throw Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");
              u3 = g2;
            }
            let w2 = new URL(null !== (t10 = null == m2 ? void 0 : m2.url) && void 0 !== t10 ? t10 : window.location.href), b2 = await u3.request({ method: "eth_requestAccounts" }).then((e11) => e11).catch(() => {
              throw Error("@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid");
            });
            if (!b2 || 0 === b2.length) throw Error("@supabase/auth-js: No accounts available. Please ensure the wallet is connected.");
            let v2 = l9(b2[0]), _2 = null === (r10 = null == m2 ? void 0 : m2.signInWithEthereum) || void 0 === r10 ? void 0 : r10.chainId;
            _2 || (_2 = parseInt(await u3.request({ method: "eth_chainId" }), 16)), p2 = function(e11) {
              var t11;
              let { chainId: r11, domain: n11, expirationTime: s11, issuedAt: i11 = /* @__PURE__ */ new Date(), nonce: a11, notBefore: o11, requestId: c11, resources: l11, scheme: u4, uri: h4, version: d3 } = e11;
              if (!Number.isInteger(r11)) throw Error(`@supabase/auth-js: Invalid SIWE message field "chainId". Chain ID must be a EIP-155 chain ID. Provided value: ${r11}`);
              if (!n11) throw Error('@supabase/auth-js: Invalid SIWE message field "domain". Domain must be provided.');
              if (a11 && a11.length < 8) throw Error(`@supabase/auth-js: Invalid SIWE message field "nonce". Nonce must be at least 8 characters. Provided value: ${a11}`);
              if (!h4) throw Error('@supabase/auth-js: Invalid SIWE message field "uri". URI must be provided.');
              if ("1" !== d3) throw Error(`@supabase/auth-js: Invalid SIWE message field "version". Version must be '1'. Provided value: ${d3}`);
              if (null === (t11 = e11.statement) || void 0 === t11 ? void 0 : t11.includes("\n")) throw Error(`@supabase/auth-js: Invalid SIWE message field "statement". Statement must not include '\\n'. Provided value: ${e11.statement}`);
              let p3 = l9(e11.address), f3 = u4 ? `${u4}://${n11}` : n11, g3 = e11.statement ? `${e11.statement}
` : "", y3 = `${f3} wants you to sign in with your Ethereum account:
${p3}

${g3}`, m3 = `URI: ${h4}
Version: ${d3}
Chain ID: ${r11}${a11 ? `
Nonce: ${a11}` : ""}
Issued At: ${i11.toISOString()}`;
              if (s11 && (m3 += `
Expiration Time: ${s11.toISOString()}`), o11 && (m3 += `
Not Before: ${o11.toISOString()}`), c11 && (m3 += `
Request ID: ${c11}`), l11) {
                let e12 = "\nResources:";
                for (let t12 of l11) {
                  if (!t12 || "string" != typeof t12) throw Error(`@supabase/auth-js: Invalid SIWE message field "resources". Every resource must be a valid string. Provided value: ${t12}`);
                  e12 += `
- ${t12}`;
                }
                m3 += e12;
              }
              return `${y3}
${m3}`;
            }({ domain: w2.host, address: v2, statement: y2, uri: w2.href, version: "1", chainId: _2, nonce: null === (n10 = null == m2 ? void 0 : m2.signInWithEthereum) || void 0 === n10 ? void 0 : n10.nonce, issuedAt: null !== (i10 = null === (s10 = null == m2 ? void 0 : m2.signInWithEthereum) || void 0 === s10 ? void 0 : s10.issuedAt) && void 0 !== i10 ? i10 : /* @__PURE__ */ new Date(), expirationTime: null === (a10 = null == m2 ? void 0 : m2.signInWithEthereum) || void 0 === a10 ? void 0 : a10.expirationTime, notBefore: null === (o10 = null == m2 ? void 0 : m2.signInWithEthereum) || void 0 === o10 ? void 0 : o10.notBefore, requestId: null === (c10 = null == m2 ? void 0 : m2.signInWithEthereum) || void 0 === c10 ? void 0 : c10.requestId, resources: null === (l10 = null == m2 ? void 0 : m2.signInWithEthereum) || void 0 === l10 ? void 0 : l10.resources }), f2 = await u3.request({ method: "personal_sign", params: [(d2 = p2, "0x" + Array.from(new TextEncoder().encode(d2), (e11) => e11.toString(16).padStart(2, "0")).join("")), v2] });
          }
          try {
            let { data: t11, error: r11 } = await lV(this.fetch, "POST", `${this.url}/token?grant_type=web3`, { headers: this.headers, body: Object.assign({ chain: "ethereum", message: p2, signature: f2 }, (null === (u2 = e10.options) || void 0 === u2 ? void 0 : u2.captchaToken) ? { gotrue_meta_security: { captcha_token: null === (h2 = e10.options) || void 0 === h2 ? void 0 : h2.captchaToken } } : null), xform: lG });
            if (r11) throw r11;
            if (!t11 || !t11.session || !t11.user) {
              let e11 = new la();
              return this._returnResult({ data: { user: null, session: null }, error: e11 });
            }
            return t11.session && (await this._saveSession(t11.session), await this._notifyAllSubscribers("SIGNED_IN", t11.session)), this._returnResult({ data: Object.assign({}, t11), error: r11 });
          } catch (e11) {
            if (lt(e11)) return this._returnResult({ data: { user: null, session: null }, error: e11 });
            throw e11;
          }
        }
        async signInWithSolana(e10) {
          var t10, r10, n10, s10, i10, a10, o10, c10, l10, u2, h2, d2;
          let p2, f2;
          if ("message" in e10) p2 = e10.message, f2 = e10.signature;
          else {
            let h3;
            let { chain: d3, wallet: g2, statement: y2, options: m2 } = e10;
            if (lE()) {
              if ("object" == typeof g2) h3 = g2;
              else {
                let e11 = window;
                if ("solana" in e11 && "object" == typeof e11.solana && ("signIn" in e11.solana && "function" == typeof e11.solana.signIn || "signMessage" in e11.solana && "function" == typeof e11.solana.signMessage)) h3 = e11.solana;
                else throw Error("@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.");
              }
            } else {
              if ("object" != typeof g2 || !(null == m2 ? void 0 : m2.url)) throw Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");
              h3 = g2;
            }
            let w2 = new URL(null !== (t10 = null == m2 ? void 0 : m2.url) && void 0 !== t10 ? t10 : window.location.href);
            if ("signIn" in h3 && h3.signIn) {
              let e11;
              let t11 = await h3.signIn(Object.assign(Object.assign(Object.assign({ issuedAt: (/* @__PURE__ */ new Date()).toISOString() }, null == m2 ? void 0 : m2.signInWithSolana), { version: "1", domain: w2.host, uri: w2.href }), y2 ? { statement: y2 } : null));
              if (Array.isArray(t11) && t11[0] && "object" == typeof t11[0]) e11 = t11[0];
              else if (t11 && "object" == typeof t11 && "signedMessage" in t11 && "signature" in t11) e11 = t11;
              else throw Error("@supabase/auth-js: Wallet method signIn() returned unrecognized value");
              if ("signedMessage" in e11 && "signature" in e11 && ("string" == typeof e11.signedMessage || e11.signedMessage instanceof Uint8Array) && e11.signature instanceof Uint8Array) p2 = "string" == typeof e11.signedMessage ? e11.signedMessage : new TextDecoder().decode(e11.signedMessage), f2 = e11.signature;
              else throw Error("@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields");
            } else {
              if (!("signMessage" in h3) || "function" != typeof h3.signMessage || !("publicKey" in h3) || "object" != typeof h3 || !h3.publicKey || !("toBase58" in h3.publicKey) || "function" != typeof h3.publicKey.toBase58) throw Error("@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API");
              p2 = [`${w2.host} wants you to sign in with your Solana account:`, h3.publicKey.toBase58(), ...y2 ? ["", y2, ""] : [""], "Version: 1", `URI: ${w2.href}`, `Issued At: ${null !== (n10 = null === (r10 = null == m2 ? void 0 : m2.signInWithSolana) || void 0 === r10 ? void 0 : r10.issuedAt) && void 0 !== n10 ? n10 : (/* @__PURE__ */ new Date()).toISOString()}`, ...(null === (s10 = null == m2 ? void 0 : m2.signInWithSolana) || void 0 === s10 ? void 0 : s10.notBefore) ? [`Not Before: ${m2.signInWithSolana.notBefore}`] : [], ...(null === (i10 = null == m2 ? void 0 : m2.signInWithSolana) || void 0 === i10 ? void 0 : i10.expirationTime) ? [`Expiration Time: ${m2.signInWithSolana.expirationTime}`] : [], ...(null === (a10 = null == m2 ? void 0 : m2.signInWithSolana) || void 0 === a10 ? void 0 : a10.chainId) ? [`Chain ID: ${m2.signInWithSolana.chainId}`] : [], ...(null === (o10 = null == m2 ? void 0 : m2.signInWithSolana) || void 0 === o10 ? void 0 : o10.nonce) ? [`Nonce: ${m2.signInWithSolana.nonce}`] : [], ...(null === (c10 = null == m2 ? void 0 : m2.signInWithSolana) || void 0 === c10 ? void 0 : c10.requestId) ? [`Request ID: ${m2.signInWithSolana.requestId}`] : [], ...(null === (u2 = null === (l10 = null == m2 ? void 0 : m2.signInWithSolana) || void 0 === l10 ? void 0 : l10.resources) || void 0 === u2 ? void 0 : u2.length) ? ["Resources", ...m2.signInWithSolana.resources.map((e12) => `- ${e12}`)] : []].join("\n");
              let e11 = await h3.signMessage(new TextEncoder().encode(p2), "utf8");
              if (!e11 || !(e11 instanceof Uint8Array)) throw Error("@supabase/auth-js: Wallet signMessage() API returned an recognized value");
              f2 = e11;
            }
          }
          try {
            let { data: t11, error: r11 } = await lV(this.fetch, "POST", `${this.url}/token?grant_type=web3`, { headers: this.headers, body: Object.assign({ chain: "solana", message: p2, signature: lS(f2) }, (null === (h2 = e10.options) || void 0 === h2 ? void 0 : h2.captchaToken) ? { gotrue_meta_security: { captcha_token: null === (d2 = e10.options) || void 0 === d2 ? void 0 : d2.captchaToken } } : null), xform: lG });
            if (r11) throw r11;
            if (!t11 || !t11.session || !t11.user) {
              let e11 = new la();
              return this._returnResult({ data: { user: null, session: null }, error: e11 });
            }
            return t11.session && (await this._saveSession(t11.session), await this._notifyAllSubscribers("SIGNED_IN", t11.session)), this._returnResult({ data: Object.assign({}, t11), error: r11 });
          } catch (e11) {
            if (lt(e11)) return this._returnResult({ data: { user: null, session: null }, error: e11 });
            throw e11;
          }
        }
        async _exchangeCodeForSession(e10) {
          let t10 = await lO(this.storage, `${this.storageKey}-code-verifier`), [r10, n10] = (null != t10 ? t10 : "").split("/");
          try {
            if (!r10 && "pkce" === this.flowType) throw new lu();
            let { data: t11, error: s10 } = await lV(this.fetch, "POST", `${this.url}/token?grant_type=pkce`, { headers: this.headers, body: { auth_code: e10, code_verifier: r10 }, xform: lG });
            if (await lR(this.storage, `${this.storageKey}-code-verifier`), s10) throw s10;
            if (!t11 || !t11.session || !t11.user) {
              let e11 = new la();
              return this._returnResult({ data: { user: null, session: null, redirectType: null }, error: e11 });
            }
            return t11.session && (await this._saveSession(t11.session), await this._notifyAllSubscribers("SIGNED_IN", t11.session)), this._returnResult({ data: Object.assign(Object.assign({}, t11), { redirectType: null != n10 ? n10 : null }), error: s10 });
          } catch (e11) {
            if (await lR(this.storage, `${this.storageKey}-code-verifier`), lt(e11)) return this._returnResult({ data: { user: null, session: null, redirectType: null }, error: e11 });
            throw e11;
          }
        }
        async signInWithIdToken(e10) {
          try {
            let { options: t10, provider: r10, token: n10, access_token: s10, nonce: i10 } = e10, { data: a10, error: o10 } = await lV(this.fetch, "POST", `${this.url}/token?grant_type=id_token`, { headers: this.headers, body: { provider: r10, id_token: n10, access_token: s10, nonce: i10, gotrue_meta_security: { captcha_token: null == t10 ? void 0 : t10.captchaToken } }, xform: lG });
            if (o10) return this._returnResult({ data: { user: null, session: null }, error: o10 });
            if (!a10 || !a10.session || !a10.user) {
              let e11 = new la();
              return this._returnResult({ data: { user: null, session: null }, error: e11 });
            }
            return a10.session && (await this._saveSession(a10.session), await this._notifyAllSubscribers("SIGNED_IN", a10.session)), this._returnResult({ data: a10, error: o10 });
          } catch (e11) {
            if (lt(e11)) return this._returnResult({ data: { user: null, session: null }, error: e11 });
            throw e11;
          }
        }
        async signInWithOtp(e10) {
          var t10, r10, n10, s10, i10;
          try {
            if ("email" in e10) {
              let { email: n11, options: s11 } = e10, i11 = null, a10 = null;
              "pkce" === this.flowType && ([i11, a10] = await l$(this.storage, this.storageKey));
              let { error: o10 } = await lV(this.fetch, "POST", `${this.url}/otp`, { headers: this.headers, body: { email: n11, data: null !== (t10 = null == s11 ? void 0 : s11.data) && void 0 !== t10 ? t10 : {}, create_user: null === (r10 = null == s11 ? void 0 : s11.shouldCreateUser) || void 0 === r10 || r10, gotrue_meta_security: { captcha_token: null == s11 ? void 0 : s11.captchaToken }, code_challenge: i11, code_challenge_method: a10 }, redirectTo: null == s11 ? void 0 : s11.emailRedirectTo });
              return this._returnResult({ data: { user: null, session: null }, error: o10 });
            }
            if ("phone" in e10) {
              let { phone: t11, options: r11 } = e10, { data: a10, error: o10 } = await lV(this.fetch, "POST", `${this.url}/otp`, { headers: this.headers, body: { phone: t11, data: null !== (n10 = null == r11 ? void 0 : r11.data) && void 0 !== n10 ? n10 : {}, create_user: null === (s10 = null == r11 ? void 0 : r11.shouldCreateUser) || void 0 === s10 || s10, gotrue_meta_security: { captcha_token: null == r11 ? void 0 : r11.captchaToken }, channel: null !== (i10 = null == r11 ? void 0 : r11.channel) && void 0 !== i10 ? i10 : "sms" } });
              return this._returnResult({ data: { user: null, session: null, messageId: null == a10 ? void 0 : a10.message_id }, error: o10 });
            }
            throw new lo("You must provide either an email or phone number.");
          } catch (e11) {
            if (await lR(this.storage, `${this.storageKey}-code-verifier`), lt(e11)) return this._returnResult({ data: { user: null, session: null }, error: e11 });
            throw e11;
          }
        }
        async verifyOtp(e10) {
          var t10, r10;
          try {
            let n10, s10;
            "options" in e10 && (n10 = null === (t10 = e10.options) || void 0 === t10 ? void 0 : t10.redirectTo, s10 = null === (r10 = e10.options) || void 0 === r10 ? void 0 : r10.captchaToken);
            let { data: i10, error: a10 } = await lV(this.fetch, "POST", `${this.url}/verify`, { headers: this.headers, body: Object.assign(Object.assign({}, e10), { gotrue_meta_security: { captcha_token: s10 } }), redirectTo: n10, xform: lG });
            if (a10) throw a10;
            if (!i10) throw Error("An error occurred on token verification.");
            let o10 = i10.session, c10 = i10.user;
            return (null == o10 ? void 0 : o10.access_token) && (await this._saveSession(o10), await this._notifyAllSubscribers("recovery" == e10.type ? "PASSWORD_RECOVERY" : "SIGNED_IN", o10)), this._returnResult({ data: { user: c10, session: o10 }, error: null });
          } catch (e11) {
            if (lt(e11)) return this._returnResult({ data: { user: null, session: null }, error: e11 });
            throw e11;
          }
        }
        async signInWithSSO(e10) {
          var t10, r10, n10, s10, i10;
          try {
            let a10 = null, o10 = null;
            "pkce" === this.flowType && ([a10, o10] = await l$(this.storage, this.storageKey));
            let c10 = await lV(this.fetch, "POST", `${this.url}/sso`, { body: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, "providerId" in e10 ? { provider_id: e10.providerId } : null), "domain" in e10 ? { domain: e10.domain } : null), { redirect_to: null !== (r10 = null === (t10 = e10.options) || void 0 === t10 ? void 0 : t10.redirectTo) && void 0 !== r10 ? r10 : void 0 }), (null === (n10 = null == e10 ? void 0 : e10.options) || void 0 === n10 ? void 0 : n10.captchaToken) ? { gotrue_meta_security: { captcha_token: e10.options.captchaToken } } : null), { skip_http_redirect: true, code_challenge: a10, code_challenge_method: o10 }), headers: this.headers, xform: lQ });
            return (null === (s10 = c10.data) || void 0 === s10 ? void 0 : s10.url) && lE() && !(null === (i10 = e10.options) || void 0 === i10 ? void 0 : i10.skipBrowserRedirect) && window.location.assign(c10.data.url), this._returnResult(c10);
          } catch (e11) {
            if (await lR(this.storage, `${this.storageKey}-code-verifier`), lt(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async reauthenticate() {
          return await this.initializePromise, await this._acquireLock(-1, async () => await this._reauthenticate());
        }
        async _reauthenticate() {
          try {
            return await this._useSession(async (e10) => {
              let { data: { session: t10 }, error: r10 } = e10;
              if (r10) throw r10;
              if (!t10) throw new li();
              let { error: n10 } = await lV(this.fetch, "GET", `${this.url}/reauthenticate`, { headers: this.headers, jwt: t10.access_token });
              return this._returnResult({ data: { user: null, session: null }, error: n10 });
            });
          } catch (e10) {
            if (lt(e10)) return this._returnResult({ data: { user: null, session: null }, error: e10 });
            throw e10;
          }
        }
        async resend(e10) {
          try {
            let t10 = `${this.url}/resend`;
            if ("email" in e10) {
              let { email: r10, type: n10, options: s10 } = e10, { error: i10 } = await lV(this.fetch, "POST", t10, { headers: this.headers, body: { email: r10, type: n10, gotrue_meta_security: { captcha_token: null == s10 ? void 0 : s10.captchaToken } }, redirectTo: null == s10 ? void 0 : s10.emailRedirectTo });
              return this._returnResult({ data: { user: null, session: null }, error: i10 });
            }
            if ("phone" in e10) {
              let { phone: r10, type: n10, options: s10 } = e10, { data: i10, error: a10 } = await lV(this.fetch, "POST", t10, { headers: this.headers, body: { phone: r10, type: n10, gotrue_meta_security: { captcha_token: null == s10 ? void 0 : s10.captchaToken } } });
              return this._returnResult({ data: { user: null, session: null, messageId: null == i10 ? void 0 : i10.message_id }, error: a10 });
            }
            throw new lo("You must provide either an email or phone number and a type");
          } catch (e11) {
            if (lt(e11)) return this._returnResult({ data: { user: null, session: null }, error: e11 });
            throw e11;
          }
        }
        async getSession() {
          return await this.initializePromise, await this._acquireLock(-1, async () => this._useSession(async (e10) => e10));
        }
        async _acquireLock(e10, t10) {
          this._debug("#_acquireLock", "begin", e10);
          try {
            if (this.lockAcquired) {
              let e11 = this.pendingInLock.length ? this.pendingInLock[this.pendingInLock.length - 1] : Promise.resolve(), r10 = (async () => (await e11, await t10()))();
              return this.pendingInLock.push((async () => {
                try {
                  await r10;
                } catch (e12) {
                }
              })()), r10;
            }
            return await this.lock(`lock:${this.storageKey}`, e10, async () => {
              this._debug("#_acquireLock", "lock acquired for storage key", this.storageKey);
              try {
                this.lockAcquired = true;
                let e11 = t10();
                for (this.pendingInLock.push((async () => {
                  try {
                    await e11;
                  } catch (e12) {
                  }
                })()), await e11; this.pendingInLock.length; ) {
                  let e12 = [...this.pendingInLock];
                  await Promise.all(e12), this.pendingInLock.splice(0, e12.length);
                }
                return await e11;
              } finally {
                this._debug("#_acquireLock", "lock released for storage key", this.storageKey), this.lockAcquired = false;
              }
            });
          } finally {
            this._debug("#_acquireLock", "end");
          }
        }
        async _useSession(e10) {
          this._debug("#_useSession", "begin");
          try {
            let t10 = await this.__loadSession();
            return await e10(t10);
          } finally {
            this._debug("#_useSession", "end");
          }
        }
        async __loadSession() {
          this._debug("#__loadSession()", "begin"), this.lockAcquired || this._debug("#__loadSession()", "used outside of an acquired lock!", Error().stack);
          try {
            let t10 = null, r10 = await lO(this.storage, this.storageKey);
            if (this._debug("#getSession()", "session from storage", r10), null !== r10 && (this._isValidSession(r10) ? t10 = r10 : (this._debug("#getSession()", "session from storage is not valid"), await this._removeSession())), !t10) return { data: { session: null }, error: null };
            let n10 = !!t10.expires_at && 1e3 * t10.expires_at - Date.now() < 9e4;
            if (this._debug("#__loadSession()", `session has${n10 ? "" : " not"} expired`, "expires_at", t10.expires_at), !n10) {
              if (this.userStorage) {
                let e11 = await lO(this.userStorage, this.storageKey + "-user");
                (null == e11 ? void 0 : e11.user) ? t10.user = e11.user : t10.user = lK();
              }
              if (this.storage.isServer && t10.user && !t10.user.__isUserNotAvailableProxy) {
                var e10;
                let r11 = { value: this.suppressGetSessionWarning };
                t10.user = (e10 = t10.user, new Proxy(e10, { get: (e11, t11, n11) => {
                  if ("__isInsecureUserWarningProxy" === t11) return true;
                  if ("symbol" == typeof t11) {
                    let r12 = t11.toString();
                    if ("Symbol(Symbol.toPrimitive)" === r12 || "Symbol(Symbol.toStringTag)" === r12 || "Symbol(util.inspect.custom)" === r12 || "Symbol(nodejs.util.inspect.custom)" === r12) return Reflect.get(e11, t11, n11);
                  }
                  return r11.value || "string" != typeof t11 || (console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server."), r11.value = true), Reflect.get(e11, t11, n11);
                } })), r11.value && (this.suppressGetSessionWarning = true);
              }
              return { data: { session: t10 }, error: null };
            }
            let { data: s10, error: i10 } = await this._callRefreshToken(t10.refresh_token);
            if (i10) return this._returnResult({ data: { session: null }, error: i10 });
            return this._returnResult({ data: { session: s10 }, error: null });
          } finally {
            this._debug("#__loadSession()", "end");
          }
        }
        async getUser(e10) {
          if (e10) return await this._getUser(e10);
          await this.initializePromise;
          let t10 = await this._acquireLock(-1, async () => await this._getUser());
          return t10.data.user && (this.suppressGetSessionWarning = true), t10;
        }
        async _getUser(e10) {
          try {
            if (e10) return await lV(this.fetch, "GET", `${this.url}/user`, { headers: this.headers, jwt: e10, xform: lX });
            return await this._useSession(async (e11) => {
              var t10, r10, n10;
              let { data: s10, error: i10 } = e11;
              if (i10) throw i10;
              return (null === (t10 = s10.session) || void 0 === t10 ? void 0 : t10.access_token) || this.hasCustomAuthorizationHeader ? await lV(this.fetch, "GET", `${this.url}/user`, { headers: this.headers, jwt: null !== (n10 = null === (r10 = s10.session) || void 0 === r10 ? void 0 : r10.access_token) && void 0 !== n10 ? n10 : void 0, xform: lX }) : { data: { user: null }, error: new li() };
            });
          } catch (e11) {
            if (lt(e11)) return lt(e11) && "AuthSessionMissingError" === e11.name && (await this._removeSession(), await lR(this.storage, `${this.storageKey}-code-verifier`)), this._returnResult({ data: { user: null }, error: e11 });
            throw e11;
          }
        }
        async updateUser(e10, t10 = {}) {
          return await this.initializePromise, await this._acquireLock(-1, async () => await this._updateUser(e10, t10));
        }
        async _updateUser(e10, t10 = {}) {
          try {
            return await this._useSession(async (r10) => {
              let { data: n10, error: s10 } = r10;
              if (s10) throw s10;
              if (!n10.session) throw new li();
              let i10 = n10.session, a10 = null, o10 = null;
              "pkce" === this.flowType && null != e10.email && ([a10, o10] = await l$(this.storage, this.storageKey));
              let { data: c10, error: l10 } = await lV(this.fetch, "PUT", `${this.url}/user`, { headers: this.headers, redirectTo: null == t10 ? void 0 : t10.emailRedirectTo, body: Object.assign(Object.assign({}, e10), { code_challenge: a10, code_challenge_method: o10 }), jwt: i10.access_token, xform: lX });
              if (l10) throw l10;
              return i10.user = c10.user, await this._saveSession(i10), await this._notifyAllSubscribers("USER_UPDATED", i10), this._returnResult({ data: { user: i10.user }, error: null });
            });
          } catch (e11) {
            if (await lR(this.storage, `${this.storageKey}-code-verifier`), lt(e11)) return this._returnResult({ data: { user: null }, error: e11 });
            throw e11;
          }
        }
        async setSession(e10) {
          return await this.initializePromise, await this._acquireLock(-1, async () => await this._setSession(e10));
        }
        async _setSession(e10) {
          try {
            if (!e10.access_token || !e10.refresh_token) throw new li();
            let t10 = Date.now() / 1e3, r10 = t10, n10 = true, s10 = null, { payload: i10 } = lI(e10.access_token);
            if (i10.exp && (n10 = (r10 = i10.exp) <= t10), n10) {
              let { data: t11, error: r11 } = await this._callRefreshToken(e10.refresh_token);
              if (r11) return this._returnResult({ data: { user: null, session: null }, error: r11 });
              if (!t11) return { data: { user: null, session: null }, error: null };
              s10 = t11;
            } else {
              let { data: n11, error: i11 } = await this._getUser(e10.access_token);
              if (i11) throw i11;
              s10 = { access_token: e10.access_token, refresh_token: e10.refresh_token, user: n11.user, token_type: "bearer", expires_in: r10 - t10, expires_at: r10 }, await this._saveSession(s10), await this._notifyAllSubscribers("SIGNED_IN", s10);
            }
            return this._returnResult({ data: { user: s10.user, session: s10 }, error: null });
          } catch (e11) {
            if (lt(e11)) return this._returnResult({ data: { session: null, user: null }, error: e11 });
            throw e11;
          }
        }
        async refreshSession(e10) {
          return await this.initializePromise, await this._acquireLock(-1, async () => await this._refreshSession(e10));
        }
        async _refreshSession(e10) {
          try {
            return await this._useSession(async (t10) => {
              var r10;
              if (!e10) {
                let { data: n11, error: s11 } = t10;
                if (s11) throw s11;
                e10 = null !== (r10 = n11.session) && void 0 !== r10 ? r10 : void 0;
              }
              if (!(null == e10 ? void 0 : e10.refresh_token)) throw new li();
              let { data: n10, error: s10 } = await this._callRefreshToken(e10.refresh_token);
              return s10 ? this._returnResult({ data: { user: null, session: null }, error: s10 }) : n10 ? this._returnResult({ data: { user: n10.user, session: n10 }, error: null }) : this._returnResult({ data: { user: null, session: null }, error: null });
            });
          } catch (e11) {
            if (lt(e11)) return this._returnResult({ data: { user: null, session: null }, error: e11 });
            throw e11;
          }
        }
        async _getSessionFromURL(e10, t10) {
          try {
            if (!lE()) throw new lc("No browser detected.");
            if (e10.error || e10.error_description || e10.error_code) throw new lc(e10.error_description || "Error in URL with unspecified error_description", { error: e10.error || "unspecified_error", code: e10.error_code || "unspecified_code" });
            switch (t10) {
              case "implicit":
                if ("pkce" === this.flowType) throw new ll("Not a valid PKCE flow url.");
                break;
              case "pkce":
                if ("implicit" === this.flowType) throw new lc("Not a valid implicit grant flow url.");
            }
            if ("pkce" === t10) {
              if (this._debug("#_initialize()", "begin", "is PKCE flow", true), !e10.code) throw new ll("No code detected.");
              let { data: t11, error: r11 } = await this._exchangeCodeForSession(e10.code);
              if (r11) throw r11;
              let n11 = new URL(window.location.href);
              return n11.searchParams.delete("code"), window.history.replaceState(window.history.state, "", n11.toString()), { data: { session: t11.session, redirectType: null }, error: null };
            }
            let { provider_token: r10, provider_refresh_token: n10, access_token: s10, refresh_token: i10, expires_in: a10, expires_at: o10, token_type: c10 } = e10;
            if (!s10 || !a10 || !i10 || !c10) throw new lc("No session defined in URL");
            let l10 = Math.round(Date.now() / 1e3), u2 = parseInt(a10), h2 = l10 + u2;
            o10 && (h2 = parseInt(o10));
            let d2 = h2 - l10;
            1e3 * d2 <= 3e4 && console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${d2}s, should have been closer to ${u2}s`);
            let p2 = h2 - u2;
            l10 - p2 >= 120 ? console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale", p2, h2, l10) : l10 - p2 < 0 && console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew", p2, h2, l10);
            let { data: f2, error: g2 } = await this._getUser(s10);
            if (g2) throw g2;
            let y2 = { provider_token: r10, provider_refresh_token: n10, access_token: s10, expires_in: u2, expires_at: h2, refresh_token: i10, token_type: c10, user: f2.user };
            return window.location.hash = "", this._debug("#_getSessionFromURL()", "clearing window.location.hash"), this._returnResult({ data: { session: y2, redirectType: e10.type }, error: null });
          } catch (e11) {
            if (lt(e11)) return this._returnResult({ data: { session: null, redirectType: null }, error: e11 });
            throw e11;
          }
        }
        _isImplicitGrantCallback(e10) {
          return "function" == typeof this.detectSessionInUrl ? this.detectSessionInUrl(new URL(window.location.href), e10) : !!(e10.access_token || e10.error_description);
        }
        async _isPKCECallback(e10) {
          let t10 = await lO(this.storage, `${this.storageKey}-code-verifier`);
          return !!(e10.code && t10);
        }
        async signOut(e10 = { scope: "global" }) {
          return await this.initializePromise, await this._acquireLock(-1, async () => await this._signOut(e10));
        }
        async _signOut({ scope: e10 } = { scope: "global" }) {
          return await this._useSession(async (t10) => {
            var r10;
            let { data: n10, error: s10 } = t10;
            if (s10) return this._returnResult({ error: s10 });
            let i10 = null === (r10 = n10.session) || void 0 === r10 ? void 0 : r10.access_token;
            if (i10) {
              let { error: t11 } = await this.admin.signOut(i10, e10);
              if (t11 && !(lt(t11) && "AuthApiError" === t11.name && (404 === t11.status || 401 === t11.status || 403 === t11.status))) return this._returnResult({ error: t11 });
            }
            return "others" !== e10 && (await this._removeSession(), await lR(this.storage, `${this.storageKey}-code-verifier`)), this._returnResult({ error: null });
          });
        }
        onAuthStateChange(e10) {
          let t10 = Symbol("auth-callback"), r10 = { id: t10, callback: e10, unsubscribe: () => {
            this._debug("#unsubscribe()", "state change callback with id removed", t10), this.stateChangeEmitters.delete(t10);
          } };
          return this._debug("#onAuthStateChange()", "registered callback with id", t10), this.stateChangeEmitters.set(t10, r10), (async () => {
            await this.initializePromise, await this._acquireLock(-1, async () => {
              this._emitInitialSession(t10);
            });
          })(), { data: { subscription: r10 } };
        }
        async _emitInitialSession(e10) {
          return await this._useSession(async (t10) => {
            var r10, n10;
            try {
              let { data: { session: n11 }, error: s10 } = t10;
              if (s10) throw s10;
              await (null === (r10 = this.stateChangeEmitters.get(e10)) || void 0 === r10 ? void 0 : r10.callback("INITIAL_SESSION", n11)), this._debug("INITIAL_SESSION", "callback id", e10, "session", n11);
            } catch (t11) {
              await (null === (n10 = this.stateChangeEmitters.get(e10)) || void 0 === n10 ? void 0 : n10.callback("INITIAL_SESSION", null)), this._debug("INITIAL_SESSION", "callback id", e10, "error", t11), console.error(t11);
            }
          });
        }
        async resetPasswordForEmail(e10, t10 = {}) {
          let r10 = null, n10 = null;
          "pkce" === this.flowType && ([r10, n10] = await l$(this.storage, this.storageKey, true));
          try {
            return await lV(this.fetch, "POST", `${this.url}/recover`, { body: { email: e10, code_challenge: r10, code_challenge_method: n10, gotrue_meta_security: { captcha_token: t10.captchaToken } }, headers: this.headers, redirectTo: t10.redirectTo });
          } catch (e11) {
            if (await lR(this.storage, `${this.storageKey}-code-verifier`), lt(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async getUserIdentities() {
          var e10;
          try {
            let { data: t10, error: r10 } = await this.getUser();
            if (r10) throw r10;
            return this._returnResult({ data: { identities: null !== (e10 = t10.user.identities) && void 0 !== e10 ? e10 : [] }, error: null });
          } catch (e11) {
            if (lt(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async linkIdentity(e10) {
          return "token" in e10 ? this.linkIdentityIdToken(e10) : this.linkIdentityOAuth(e10);
        }
        async linkIdentityOAuth(e10) {
          var t10;
          try {
            let { data: r10, error: n10 } = await this._useSession(async (t11) => {
              var r11, n11, s10, i10, a10;
              let { data: o10, error: c10 } = t11;
              if (c10) throw c10;
              let l10 = await this._getUrlForProvider(`${this.url}/user/identities/authorize`, e10.provider, { redirectTo: null === (r11 = e10.options) || void 0 === r11 ? void 0 : r11.redirectTo, scopes: null === (n11 = e10.options) || void 0 === n11 ? void 0 : n11.scopes, queryParams: null === (s10 = e10.options) || void 0 === s10 ? void 0 : s10.queryParams, skipBrowserRedirect: true });
              return await lV(this.fetch, "GET", l10, { headers: this.headers, jwt: null !== (a10 = null === (i10 = o10.session) || void 0 === i10 ? void 0 : i10.access_token) && void 0 !== a10 ? a10 : void 0 });
            });
            if (n10) throw n10;
            return !lE() || (null === (t10 = e10.options) || void 0 === t10 ? void 0 : t10.skipBrowserRedirect) || window.location.assign(null == r10 ? void 0 : r10.url), this._returnResult({ data: { provider: e10.provider, url: null == r10 ? void 0 : r10.url }, error: null });
          } catch (t11) {
            if (lt(t11)) return this._returnResult({ data: { provider: e10.provider, url: null }, error: t11 });
            throw t11;
          }
        }
        async linkIdentityIdToken(e10) {
          return await this._useSession(async (t10) => {
            var r10;
            try {
              let { error: n10, data: { session: s10 } } = t10;
              if (n10) throw n10;
              let { options: i10, provider: a10, token: o10, access_token: c10, nonce: l10 } = e10, { data: u2, error: h2 } = await lV(this.fetch, "POST", `${this.url}/token?grant_type=id_token`, { headers: this.headers, jwt: null !== (r10 = null == s10 ? void 0 : s10.access_token) && void 0 !== r10 ? r10 : void 0, body: { provider: a10, id_token: o10, access_token: c10, nonce: l10, link_identity: true, gotrue_meta_security: { captcha_token: null == i10 ? void 0 : i10.captchaToken } }, xform: lG });
              if (h2) return this._returnResult({ data: { user: null, session: null }, error: h2 });
              if (!u2 || !u2.session || !u2.user) return this._returnResult({ data: { user: null, session: null }, error: new la() });
              return u2.session && (await this._saveSession(u2.session), await this._notifyAllSubscribers("USER_UPDATED", u2.session)), this._returnResult({ data: u2, error: h2 });
            } catch (e11) {
              if (await lR(this.storage, `${this.storageKey}-code-verifier`), lt(e11)) return this._returnResult({ data: { user: null, session: null }, error: e11 });
              throw e11;
            }
          });
        }
        async unlinkIdentity(e10) {
          try {
            return await this._useSession(async (t10) => {
              var r10, n10;
              let { data: s10, error: i10 } = t10;
              if (i10) throw i10;
              return await lV(this.fetch, "DELETE", `${this.url}/user/identities/${e10.identity_id}`, { headers: this.headers, jwt: null !== (n10 = null === (r10 = s10.session) || void 0 === r10 ? void 0 : r10.access_token) && void 0 !== n10 ? n10 : void 0 });
            });
          } catch (e11) {
            if (lt(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async _refreshAccessToken(e10) {
          let t10 = `#_refreshAccessToken(${e10.substring(0, 5)}...)`;
          this._debug(t10, "begin");
          try {
            var r10, n10;
            let s10 = Date.now();
            return await (r10 = async (r11) => (r11 > 0 && await lN(200 * Math.pow(2, r11 - 1)), this._debug(t10, "refreshing attempt", r11), await lV(this.fetch, "POST", `${this.url}/token?grant_type=refresh_token`, { body: { refresh_token: e10 }, headers: this.headers, xform: lG })), n10 = (e11, t11) => {
              let r11 = 200 * Math.pow(2, e11);
              return t11 && ld(t11) && Date.now() + r11 - s10 < 3e4;
            }, new Promise((e11, t11) => {
              (async () => {
                for (let s11 = 0; s11 < 1 / 0; s11++) try {
                  let t12 = await r10(s11);
                  if (!n10(s11, null, t12)) {
                    e11(t12);
                    return;
                  }
                } catch (e12) {
                  if (!n10(s11, e12)) {
                    t11(e12);
                    return;
                  }
                }
              })();
            }));
          } catch (e11) {
            if (this._debug(t10, "error", e11), lt(e11)) return this._returnResult({ data: { session: null, user: null }, error: e11 });
            throw e11;
          } finally {
            this._debug(t10, "end");
          }
        }
        _isValidSession(e10) {
          return "object" == typeof e10 && null !== e10 && "access_token" in e10 && "refresh_token" in e10 && "expires_at" in e10;
        }
        async _handleProviderSignIn(e10, t10) {
          let r10 = await this._getUrlForProvider(`${this.url}/authorize`, e10, { redirectTo: t10.redirectTo, scopes: t10.scopes, queryParams: t10.queryParams });
          return this._debug("#_handleProviderSignIn()", "provider", e10, "options", t10, "url", r10), lE() && !t10.skipBrowserRedirect && window.location.assign(r10), { data: { provider: e10, url: r10 }, error: null };
        }
        async _recoverAndRefresh() {
          var e10, t10;
          let r10 = "#_recoverAndRefresh()";
          this._debug(r10, "begin");
          try {
            let n10 = await lO(this.storage, this.storageKey);
            if (n10 && this.userStorage) {
              let t11 = await lO(this.userStorage, this.storageKey + "-user");
              !this.storage.isServer && Object.is(this.storage, this.userStorage) && !t11 && (t11 = { user: n10.user }, await lC(this.userStorage, this.storageKey + "-user", t11)), n10.user = null !== (e10 = null == t11 ? void 0 : t11.user) && void 0 !== e10 ? e10 : lK();
            } else if (n10 && !n10.user && !n10.user) {
              let e11 = await lO(this.storage, this.storageKey + "-user");
              e11 && (null == e11 ? void 0 : e11.user) ? (n10.user = e11.user, await lR(this.storage, this.storageKey + "-user"), await lC(this.storage, this.storageKey, n10)) : n10.user = lK();
            }
            if (this._debug(r10, "session from storage", n10), !this._isValidSession(n10)) {
              this._debug(r10, "session is not valid"), null !== n10 && await this._removeSession();
              return;
            }
            let s10 = (null !== (t10 = n10.expires_at) && void 0 !== t10 ? t10 : 1 / 0) * 1e3 - Date.now() < 9e4;
            if (this._debug(r10, `session has${s10 ? "" : " not"} expired with margin of 90000s`), s10) {
              if (this.autoRefreshToken && n10.refresh_token) {
                let { error: e11 } = await this._callRefreshToken(n10.refresh_token);
                e11 && (console.error(e11), ld(e11) || (this._debug(r10, "refresh failed with a non-retryable error, removing the session", e11), await this._removeSession()));
              }
            } else if (n10.user && true === n10.user.__isUserNotAvailableProxy) try {
              let { data: e11, error: t11 } = await this._getUser(n10.access_token);
              !t11 && (null == e11 ? void 0 : e11.user) ? (n10.user = e11.user, await this._saveSession(n10), await this._notifyAllSubscribers("SIGNED_IN", n10)) : this._debug(r10, "could not get user data, skipping SIGNED_IN notification");
            } catch (e11) {
              console.error("Error getting user data:", e11), this._debug(r10, "error getting user data, skipping SIGNED_IN notification", e11);
            }
            else await this._notifyAllSubscribers("SIGNED_IN", n10);
          } catch (e11) {
            this._debug(r10, "error", e11), console.error(e11);
            return;
          } finally {
            this._debug(r10, "end");
          }
        }
        async _callRefreshToken(e10) {
          var t10, r10;
          if (!e10) throw new li();
          if (this.refreshingDeferred) return this.refreshingDeferred.promise;
          let n10 = `#_callRefreshToken(${e10.substring(0, 5)}...)`;
          this._debug(n10, "begin");
          try {
            this.refreshingDeferred = new lx();
            let { data: t11, error: r11 } = await this._refreshAccessToken(e10);
            if (r11) throw r11;
            if (!t11.session) throw new li();
            await this._saveSession(t11.session), await this._notifyAllSubscribers("TOKEN_REFRESHED", t11.session);
            let n11 = { data: t11.session, error: null };
            return this.refreshingDeferred.resolve(n11), n11;
          } catch (e11) {
            if (this._debug(n10, "error", e11), lt(e11)) {
              let r11 = { data: null, error: e11 };
              return ld(e11) || await this._removeSession(), null === (t10 = this.refreshingDeferred) || void 0 === t10 || t10.resolve(r11), r11;
            }
            throw null === (r10 = this.refreshingDeferred) || void 0 === r10 || r10.reject(e11), e11;
          } finally {
            this.refreshingDeferred = null, this._debug(n10, "end");
          }
        }
        async _notifyAllSubscribers(e10, t10, r10 = true) {
          let n10 = `#_notifyAllSubscribers(${e10})`;
          this._debug(n10, "begin", t10, `broadcast = ${r10}`);
          try {
            this.broadcastChannel && r10 && this.broadcastChannel.postMessage({ event: e10, session: t10 });
            let n11 = [], s10 = Array.from(this.stateChangeEmitters.values()).map(async (r11) => {
              try {
                await r11.callback(e10, t10);
              } catch (e11) {
                n11.push(e11);
              }
            });
            if (await Promise.all(s10), n11.length > 0) {
              for (let e11 = 0; e11 < n11.length; e11 += 1) console.error(n11[e11]);
              throw n11[0];
            }
          } finally {
            this._debug(n10, "end");
          }
        }
        async _saveSession(e10) {
          this._debug("#_saveSession()", e10), this.suppressGetSessionWarning = true, await lR(this.storage, `${this.storageKey}-code-verifier`);
          let t10 = Object.assign({}, e10), r10 = t10.user && true === t10.user.__isUserNotAvailableProxy;
          if (this.userStorage) {
            !r10 && t10.user && await lC(this.userStorage, this.storageKey + "-user", { user: t10.user });
            let e11 = Object.assign({}, t10);
            delete e11.user;
            let n10 = lW(e11);
            await lC(this.storage, this.storageKey, n10);
          } else {
            let e11 = lW(t10);
            await lC(this.storage, this.storageKey, e11);
          }
        }
        async _removeSession() {
          this._debug("#_removeSession()"), this.suppressGetSessionWarning = false, await lR(this.storage, this.storageKey), await lR(this.storage, this.storageKey + "-code-verifier"), await lR(this.storage, this.storageKey + "-user"), this.userStorage && await lR(this.userStorage, this.storageKey + "-user"), await this._notifyAllSubscribers("SIGNED_OUT", null);
        }
        _removeVisibilityChangedCallback() {
          this._debug("#_removeVisibilityChangedCallback()");
          let e10 = this.visibilityChangedCallback;
          this.visibilityChangedCallback = null;
          try {
            e10 && lE() && (null == window ? void 0 : window.removeEventListener) && window.removeEventListener("visibilitychange", e10);
          } catch (e11) {
            console.error("removing visibilitychange callback failed", e11);
          }
        }
        async _startAutoRefresh() {
          await this._stopAutoRefresh(), this._debug("#_startAutoRefresh()");
          let e10 = setInterval(() => this._autoRefreshTokenTick(), 3e4);
          this.autoRefreshTicker = e10, e10 && "object" == typeof e10 && "function" == typeof e10.unref ? e10.unref() : "undefined" != typeof Deno && "function" == typeof Deno.unrefTimer && Deno.unrefTimer(e10), setTimeout(async () => {
            await this.initializePromise, await this._autoRefreshTokenTick();
          }, 0);
        }
        async _stopAutoRefresh() {
          this._debug("#_stopAutoRefresh()");
          let e10 = this.autoRefreshTicker;
          this.autoRefreshTicker = null, e10 && clearInterval(e10);
        }
        async startAutoRefresh() {
          this._removeVisibilityChangedCallback(), await this._startAutoRefresh();
        }
        async stopAutoRefresh() {
          this._removeVisibilityChangedCallback(), await this._stopAutoRefresh();
        }
        async _autoRefreshTokenTick() {
          this._debug("#_autoRefreshTokenTick()", "begin");
          try {
            await this._acquireLock(0, async () => {
              try {
                let e10 = Date.now();
                try {
                  return await this._useSession(async (t10) => {
                    let { data: { session: r10 } } = t10;
                    if (!r10 || !r10.refresh_token || !r10.expires_at) {
                      this._debug("#_autoRefreshTokenTick()", "no session");
                      return;
                    }
                    let n10 = Math.floor((1e3 * r10.expires_at - e10) / 3e4);
                    this._debug("#_autoRefreshTokenTick()", `access token expires in ${n10} ticks, a tick lasts 30000ms, refresh threshold is 3 ticks`), n10 <= 3 && await this._callRefreshToken(r10.refresh_token);
                  });
                } catch (e11) {
                  console.error("Auto refresh tick failed with error. This is likely a transient error.", e11);
                }
              } finally {
                this._debug("#_autoRefreshTokenTick()", "end");
              }
            });
          } catch (e10) {
            if (e10.isAcquireTimeout || e10 instanceof l6) this._debug("auto refresh token tick lock not available");
            else throw e10;
          }
        }
        async _handleVisibilityChange() {
          if (this._debug("#_handleVisibilityChange()"), !lE() || !(null == window ? void 0 : window.addEventListener)) return this.autoRefreshToken && this.startAutoRefresh(), false;
          try {
            this.visibilityChangedCallback = async () => await this._onVisibilityChanged(false), null == window || window.addEventListener("visibilitychange", this.visibilityChangedCallback), await this._onVisibilityChanged(true);
          } catch (e10) {
            console.error("_handleVisibilityChange", e10);
          }
        }
        async _onVisibilityChanged(e10) {
          let t10 = `#_onVisibilityChanged(${e10})`;
          this._debug(t10, "visibilityState", document.visibilityState), "visible" === document.visibilityState ? (this.autoRefreshToken && this._startAutoRefresh(), e10 || (await this.initializePromise, await this._acquireLock(-1, async () => {
            if ("visible" !== document.visibilityState) {
              this._debug(t10, "acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting");
              return;
            }
            await this._recoverAndRefresh();
          }))) : "hidden" === document.visibilityState && this.autoRefreshToken && this._stopAutoRefresh();
        }
        async _getUrlForProvider(e10, t10, r10) {
          let n10 = [`provider=${encodeURIComponent(t10)}`];
          if ((null == r10 ? void 0 : r10.redirectTo) && n10.push(`redirect_to=${encodeURIComponent(r10.redirectTo)}`), (null == r10 ? void 0 : r10.scopes) && n10.push(`scopes=${encodeURIComponent(r10.scopes)}`), "pkce" === this.flowType) {
            let [e11, t11] = await l$(this.storage, this.storageKey), r11 = new URLSearchParams({ code_challenge: `${encodeURIComponent(e11)}`, code_challenge_method: `${encodeURIComponent(t11)}` });
            n10.push(r11.toString());
          }
          if (null == r10 ? void 0 : r10.queryParams) {
            let e11 = new URLSearchParams(r10.queryParams);
            n10.push(e11.toString());
          }
          return (null == r10 ? void 0 : r10.skipBrowserRedirect) && n10.push(`skip_http_redirect=${r10.skipBrowserRedirect}`), `${e10}?${n10.join("&")}`;
        }
        async _unenroll(e10) {
          try {
            return await this._useSession(async (t10) => {
              var r10;
              let { data: n10, error: s10 } = t10;
              return s10 ? this._returnResult({ data: null, error: s10 }) : await lV(this.fetch, "DELETE", `${this.url}/factors/${e10.factorId}`, { headers: this.headers, jwt: null === (r10 = null == n10 ? void 0 : n10.session) || void 0 === r10 ? void 0 : r10.access_token });
            });
          } catch (e11) {
            if (lt(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async _enroll(e10) {
          try {
            return await this._useSession(async (t10) => {
              var r10, n10;
              let { data: s10, error: i10 } = t10;
              if (i10) return this._returnResult({ data: null, error: i10 });
              let a10 = Object.assign({ friendly_name: e10.friendlyName, factor_type: e10.factorType }, "phone" === e10.factorType ? { phone: e10.phone } : "totp" === e10.factorType ? { issuer: e10.issuer } : {}), { data: o10, error: c10 } = await lV(this.fetch, "POST", `${this.url}/factors`, { body: a10, headers: this.headers, jwt: null === (r10 = null == s10 ? void 0 : s10.session) || void 0 === r10 ? void 0 : r10.access_token });
              return c10 ? this._returnResult({ data: null, error: c10 }) : ("totp" === e10.factorType && "totp" === o10.type && (null === (n10 = null == o10 ? void 0 : o10.totp) || void 0 === n10 ? void 0 : n10.qr_code) && (o10.totp.qr_code = `data:image/svg+xml;utf-8,${o10.totp.qr_code}`), this._returnResult({ data: o10, error: null }));
            });
          } catch (e11) {
            if (lt(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async _verify(e10) {
          return this._acquireLock(-1, async () => {
            try {
              return await this._useSession(async (t10) => {
                var r10, n10, s10;
                let { data: i10, error: a10 } = t10;
                if (a10) return this._returnResult({ data: null, error: a10 });
                let o10 = Object.assign({ challenge_id: e10.challengeId }, "webauthn" in e10 ? { webauthn: Object.assign(Object.assign({}, e10.webauthn), { credential_response: "create" === e10.webauthn.type ? (n10 = e10.webauthn.credential_response, "toJSON" in n10 && "function" == typeof n10.toJSON ? n10.toJSON() : { id: n10.id, rawId: n10.id, response: { attestationObject: lS(new Uint8Array(n10.response.attestationObject)), clientDataJSON: lS(new Uint8Array(n10.response.clientDataJSON)) }, type: "public-key", clientExtensionResults: n10.getClientExtensionResults(), authenticatorAttachment: null !== (s10 = n10.authenticatorAttachment) && void 0 !== s10 ? s10 : void 0 }) : function(e11) {
                  var t11;
                  if ("toJSON" in e11 && "function" == typeof e11.toJSON) return e11.toJSON();
                  let r11 = e11.getClientExtensionResults(), n11 = e11.response;
                  return { id: e11.id, rawId: e11.id, response: { authenticatorData: lS(new Uint8Array(n11.authenticatorData)), clientDataJSON: lS(new Uint8Array(n11.clientDataJSON)), signature: lS(new Uint8Array(n11.signature)), userHandle: n11.userHandle ? lS(new Uint8Array(n11.userHandle)) : void 0 }, type: "public-key", clientExtensionResults: r11, authenticatorAttachment: null !== (t11 = e11.authenticatorAttachment) && void 0 !== t11 ? t11 : void 0 };
                }(e10.webauthn.credential_response) }) } : { code: e10.code }), { data: c10, error: l10 } = await lV(this.fetch, "POST", `${this.url}/factors/${e10.factorId}/verify`, { body: o10, headers: this.headers, jwt: null === (r10 = null == i10 ? void 0 : i10.session) || void 0 === r10 ? void 0 : r10.access_token });
                return l10 ? this._returnResult({ data: null, error: l10 }) : (await this._saveSession(Object.assign({ expires_at: Math.round(Date.now() / 1e3) + c10.expires_in }, c10)), await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED", c10), this._returnResult({ data: c10, error: l10 }));
              });
            } catch (e11) {
              if (lt(e11)) return this._returnResult({ data: null, error: e11 });
              throw e11;
            }
          });
        }
        async _challenge(e10) {
          return this._acquireLock(-1, async () => {
            try {
              return await this._useSession(async (t10) => {
                var r10;
                let { data: n10, error: s10 } = t10;
                if (s10) return this._returnResult({ data: null, error: s10 });
                let i10 = await lV(this.fetch, "POST", `${this.url}/factors/${e10.factorId}/challenge`, { body: e10, headers: this.headers, jwt: null === (r10 = null == n10 ? void 0 : n10.session) || void 0 === r10 ? void 0 : r10.access_token });
                if (i10.error) return i10;
                let { data: a10 } = i10;
                if ("webauthn" !== a10.type) return { data: a10, error: null };
                switch (a10.webauthn.type) {
                  case "create":
                    return { data: Object.assign(Object.assign({}, a10), { webauthn: Object.assign(Object.assign({}, a10.webauthn), { credential_options: Object.assign(Object.assign({}, a10.webauthn.credential_options), { publicKey: function(e11) {
                      if (!e11) throw Error("Credential creation options are required");
                      if ("undefined" != typeof PublicKeyCredential && "parseCreationOptionsFromJSON" in PublicKeyCredential && "function" == typeof PublicKeyCredential.parseCreationOptionsFromJSON) return PublicKeyCredential.parseCreationOptionsFromJSON(e11);
                      let { challenge: t11, user: r11, excludeCredentials: n11 } = e11, s11 = oR(e11, ["challenge", "user", "excludeCredentials"]), i11 = l_(t11).buffer, a11 = Object.assign(Object.assign({}, r11), { id: l_(r11.id).buffer }), o10 = Object.assign(Object.assign({}, s11), { challenge: i11, user: a11 });
                      if (n11 && n11.length > 0) {
                        o10.excludeCredentials = Array(n11.length);
                        for (let e12 = 0; e12 < n11.length; e12++) {
                          let t12 = n11[e12];
                          o10.excludeCredentials[e12] = Object.assign(Object.assign({}, t12), { id: l_(t12.id).buffer, type: t12.type || "public-key", transports: t12.transports });
                        }
                      }
                      return o10;
                    }(a10.webauthn.credential_options.publicKey) }) }) }), error: null };
                  case "request":
                    return { data: Object.assign(Object.assign({}, a10), { webauthn: Object.assign(Object.assign({}, a10.webauthn), { credential_options: Object.assign(Object.assign({}, a10.webauthn.credential_options), { publicKey: function(e11) {
                      if (!e11) throw Error("Credential request options are required");
                      if ("undefined" != typeof PublicKeyCredential && "parseRequestOptionsFromJSON" in PublicKeyCredential && "function" == typeof PublicKeyCredential.parseRequestOptionsFromJSON) return PublicKeyCredential.parseRequestOptionsFromJSON(e11);
                      let { challenge: t11, allowCredentials: r11 } = e11, n11 = oR(e11, ["challenge", "allowCredentials"]), s11 = l_(t11).buffer, i11 = Object.assign(Object.assign({}, n11), { challenge: s11 });
                      if (r11 && r11.length > 0) {
                        i11.allowCredentials = Array(r11.length);
                        for (let e12 = 0; e12 < r11.length; e12++) {
                          let t12 = r11[e12];
                          i11.allowCredentials[e12] = Object.assign(Object.assign({}, t12), { id: l_(t12.id).buffer, type: t12.type || "public-key", transports: t12.transports });
                        }
                      }
                      return i11;
                    }(a10.webauthn.credential_options.publicKey) }) }) }), error: null };
                }
              });
            } catch (e11) {
              if (lt(e11)) return this._returnResult({ data: null, error: e11 });
              throw e11;
            }
          });
        }
        async _challengeAndVerify(e10) {
          let { data: t10, error: r10 } = await this._challenge({ factorId: e10.factorId });
          return r10 ? this._returnResult({ data: null, error: r10 }) : await this._verify({ factorId: e10.factorId, challengeId: t10.id, code: e10.code });
        }
        async _listFactors() {
          var e10;
          let { data: { user: t10 }, error: r10 } = await this.getUser();
          if (r10) return { data: null, error: r10 };
          let n10 = { all: [], phone: [], totp: [], webauthn: [] };
          for (let r11 of null !== (e10 = null == t10 ? void 0 : t10.factors) && void 0 !== e10 ? e10 : []) n10.all.push(r11), "verified" === r11.status && n10[r11.factor_type].push(r11);
          return { data: n10, error: null };
        }
        async _getAuthenticatorAssuranceLevel() {
          var e10, t10;
          let { data: { session: r10 }, error: n10 } = await this.getSession();
          if (n10) return this._returnResult({ data: null, error: n10 });
          if (!r10) return { data: { currentLevel: null, nextLevel: null, currentAuthenticationMethods: [] }, error: null };
          let { payload: s10 } = lI(r10.access_token), i10 = null;
          s10.aal && (i10 = s10.aal);
          let a10 = i10;
          return (null !== (t10 = null === (e10 = r10.user.factors) || void 0 === e10 ? void 0 : e10.filter((e11) => "verified" === e11.status)) && void 0 !== t10 ? t10 : []).length > 0 && (a10 = "aal2"), { data: { currentLevel: i10, nextLevel: a10, currentAuthenticationMethods: s10.amr || [] }, error: null };
        }
        async _getAuthorizationDetails(e10) {
          try {
            return await this._useSession(async (t10) => {
              let { data: { session: r10 }, error: n10 } = t10;
              return n10 ? this._returnResult({ data: null, error: n10 }) : r10 ? await lV(this.fetch, "GET", `${this.url}/oauth/authorizations/${e10}`, { headers: this.headers, jwt: r10.access_token, xform: (e11) => ({ data: e11, error: null }) }) : this._returnResult({ data: null, error: new li() });
            });
          } catch (e11) {
            if (lt(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async _approveAuthorization(e10, t10) {
          try {
            return await this._useSession(async (r10) => {
              let { data: { session: n10 }, error: s10 } = r10;
              if (s10) return this._returnResult({ data: null, error: s10 });
              if (!n10) return this._returnResult({ data: null, error: new li() });
              let i10 = await lV(this.fetch, "POST", `${this.url}/oauth/authorizations/${e10}/consent`, { headers: this.headers, jwt: n10.access_token, body: { action: "approve" }, xform: (e11) => ({ data: e11, error: null }) });
              return i10.data && i10.data.redirect_url && lE() && !(null == t10 ? void 0 : t10.skipBrowserRedirect) && window.location.assign(i10.data.redirect_url), i10;
            });
          } catch (e11) {
            if (lt(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async _denyAuthorization(e10, t10) {
          try {
            return await this._useSession(async (r10) => {
              let { data: { session: n10 }, error: s10 } = r10;
              if (s10) return this._returnResult({ data: null, error: s10 });
              if (!n10) return this._returnResult({ data: null, error: new li() });
              let i10 = await lV(this.fetch, "POST", `${this.url}/oauth/authorizations/${e10}/consent`, { headers: this.headers, jwt: n10.access_token, body: { action: "deny" }, xform: (e11) => ({ data: e11, error: null }) });
              return i10.data && i10.data.redirect_url && lE() && !(null == t10 ? void 0 : t10.skipBrowserRedirect) && window.location.assign(i10.data.redirect_url), i10;
            });
          } catch (e11) {
            if (lt(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async _listOAuthGrants() {
          try {
            return await this._useSession(async (e10) => {
              let { data: { session: t10 }, error: r10 } = e10;
              return r10 ? this._returnResult({ data: null, error: r10 }) : t10 ? await lV(this.fetch, "GET", `${this.url}/user/oauth/grants`, { headers: this.headers, jwt: t10.access_token, xform: (e11) => ({ data: e11, error: null }) }) : this._returnResult({ data: null, error: new li() });
            });
          } catch (e10) {
            if (lt(e10)) return this._returnResult({ data: null, error: e10 });
            throw e10;
          }
        }
        async _revokeOAuthGrant(e10) {
          try {
            return await this._useSession(async (t10) => {
              let { data: { session: r10 }, error: n10 } = t10;
              return n10 ? this._returnResult({ data: null, error: n10 }) : r10 ? (await lV(this.fetch, "DELETE", `${this.url}/user/oauth/grants`, { headers: this.headers, jwt: r10.access_token, query: { client_id: e10.clientId }, noResolveJson: true }), { data: {}, error: null }) : this._returnResult({ data: null, error: new li() });
            });
          } catch (e11) {
            if (lt(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async fetchJwk(e10, t10 = { keys: [] }) {
          let r10 = t10.keys.find((t11) => t11.kid === e10);
          if (r10) return r10;
          let n10 = Date.now();
          if ((r10 = this.jwks.keys.find((t11) => t11.kid === e10)) && this.jwks_cached_at + 6e5 > n10) return r10;
          let { data: s10, error: i10 } = await lV(this.fetch, "GET", `${this.url}/.well-known/jwks.json`, { headers: this.headers });
          if (i10) throw i10;
          return s10.keys && 0 !== s10.keys.length && (this.jwks = s10, this.jwks_cached_at = n10, r10 = s10.keys.find((t11) => t11.kid === e10)) ? r10 : null;
        }
        async getClaims(e10, t10 = {}) {
          try {
            let r10 = e10;
            if (!r10) {
              let { data: e11, error: t11 } = await this.getSession();
              if (t11 || !e11.session) return this._returnResult({ data: null, error: t11 });
              r10 = e11.session.access_token;
            }
            let { header: n10, payload: s10, signature: i10, raw: { header: a10, payload: o10 } } = lI(r10);
            (null == t10 ? void 0 : t10.allowExpired) || function(e11) {
              if (!e11) throw Error("Missing exp claim");
              if (e11 <= Math.floor(Date.now() / 1e3)) throw Error("JWT has expired");
            }(s10.exp);
            let c10 = !n10.alg || n10.alg.startsWith("HS") || !n10.kid || !("crypto" in globalThis && "subtle" in globalThis.crypto) ? null : await this.fetchJwk(n10.kid, (null == t10 ? void 0 : t10.keys) ? { keys: t10.keys } : null == t10 ? void 0 : t10.jwks);
            if (!c10) {
              let { error: e11 } = await this.getUser(r10);
              if (e11) throw e11;
              return { data: { claims: s10, header: n10, signature: i10 }, error: null };
            }
            let l10 = function(e11) {
              switch (e11) {
                case "RS256":
                  return { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-256" } };
                case "ES256":
                  return { name: "ECDSA", namedCurve: "P-256", hash: { name: "SHA-256" } };
                default:
                  throw Error("Invalid alg claim");
              }
            }(n10.alg), u2 = await crypto.subtle.importKey("jwk", c10, l10, true, ["verify"]);
            if (!await crypto.subtle.verify(l10, u2, i10, function(e11) {
              let t11 = [];
              return function(e12, t12) {
                for (let r11 = 0; r11 < e12.length; r11 += 1) {
                  let n11 = e12.charCodeAt(r11);
                  if (n11 > 55295 && n11 <= 56319) {
                    let t13 = (n11 - 55296) * 1024 & 65535;
                    n11 = (e12.charCodeAt(r11 + 1) - 56320 & 65535 | t13) + 65536, r11 += 1;
                  }
                  !function(e13, t13) {
                    if (e13 <= 127) {
                      t13(e13);
                      return;
                    }
                    if (e13 <= 2047) {
                      t13(192 | e13 >> 6), t13(128 | 63 & e13);
                      return;
                    }
                    if (e13 <= 65535) {
                      t13(224 | e13 >> 12), t13(128 | e13 >> 6 & 63), t13(128 | 63 & e13);
                      return;
                    }
                    if (e13 <= 1114111) {
                      t13(240 | e13 >> 18), t13(128 | e13 >> 12 & 63), t13(128 | e13 >> 6 & 63), t13(128 | 63 & e13);
                      return;
                    }
                    throw Error(`Unrecognized Unicode codepoint: ${e13.toString(16)}`);
                  }(n11, t12);
                }
              }(e11, (e12) => t11.push(e12)), new Uint8Array(t11);
            }(`${a10}.${o10}`))) throw new lf("Invalid JWT signature");
            return { data: { claims: s10, header: n10, signature: i10 }, error: null };
          } catch (e11) {
            if (lt(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
      }
      uf.nextInstanceID = {};
      let ug = uf, uy = "";
      "undefined" != typeof Deno ? uy = "deno" : "undefined" != typeof document ? uy = "web" : "undefined" != typeof navigator && "ReactNative" === navigator.product ? uy = "react-native" : uy = "node";
      let um = { headers: { "X-Client-Info": `supabase-js-${uy}/2.89.0` } }, uw = { schema: "public" }, ub = { autoRefreshToken: true, persistSession: true, detectSessionInUrl: true, flowType: "implicit" }, uv = {};
      function u_(e10) {
        return (u_ = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e11) {
          return typeof e11;
        } : function(e11) {
          return e11 && "function" == typeof Symbol && e11.constructor === Symbol && e11 !== Symbol.prototype ? "symbol" : typeof e11;
        })(e10);
      }
      function uS(e10, t10) {
        var r10 = Object.keys(e10);
        if (Object.getOwnPropertySymbols) {
          var n10 = Object.getOwnPropertySymbols(e10);
          t10 && (n10 = n10.filter(function(t11) {
            return Object.getOwnPropertyDescriptor(e10, t11).enumerable;
          })), r10.push.apply(r10, n10);
        }
        return r10;
      }
      function uE(e10) {
        for (var t10 = 1; t10 < arguments.length; t10++) {
          var r10 = null != arguments[t10] ? arguments[t10] : {};
          t10 % 2 ? uS(Object(r10), true).forEach(function(t11) {
            !function(e11, t12, r11) {
              var n10;
              (n10 = function(e12, t13) {
                if ("object" != u_(e12) || !e12) return e12;
                var r12 = e12[Symbol.toPrimitive];
                if (void 0 !== r12) {
                  var n11 = r12.call(e12, t13 || "default");
                  if ("object" != u_(n11)) return n11;
                  throw TypeError("@@toPrimitive must return a primitive value.");
                }
                return ("string" === t13 ? String : Number)(e12);
              }(t12, "string"), (t12 = "symbol" == u_(n10) ? n10 : n10 + "") in e11) ? Object.defineProperty(e11, t12, { value: r11, enumerable: true, configurable: true, writable: true }) : e11[t12] = r11;
            }(e10, t11, r10[t11]);
          }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e10, Object.getOwnPropertyDescriptors(r10)) : uS(Object(r10)).forEach(function(t11) {
            Object.defineProperty(e10, t11, Object.getOwnPropertyDescriptor(r10, t11));
          });
        }
        return e10;
      }
      let uk = (e10) => e10 ? (...t10) => e10(...t10) : (...e11) => fetch(...e11), uT = () => Headers, uA = (e10, t10, r10) => {
        let n10 = uk(r10), s10 = uT();
        return async (r11, i10) => {
          var a10;
          let o10 = null !== (a10 = await t10()) && void 0 !== a10 ? a10 : e10, c10 = new s10(null == i10 ? void 0 : i10.headers);
          return c10.has("apikey") || c10.set("apikey", e10), c10.has("Authorization") || c10.set("Authorization", `Bearer ${o10}`), n10(r11, uE(uE({}, i10), {}, { headers: c10 }));
        };
      };
      var uP = class extends ug {
        constructor(e10) {
          super(e10);
        }
      }, uC = class {
        constructor(e10, t10, r10) {
          var n10, s10, i10;
          this.supabaseUrl = e10, this.supabaseKey = t10;
          let a10 = function(e11) {
            let t11 = null == e11 ? void 0 : e11.trim();
            if (!t11) throw Error("supabaseUrl is required.");
            if (!t11.match(/^https?:\/\//i)) throw Error("Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.");
            try {
              return new URL(t11.endsWith("/") ? t11 : t11 + "/");
            } catch (e12) {
              throw Error("Invalid supabaseUrl: Provided URL is malformed.");
            }
          }(e10);
          if (!t10) throw Error("supabaseKey is required.");
          this.realtimeUrl = new URL("realtime/v1", a10), this.realtimeUrl.protocol = this.realtimeUrl.protocol.replace("http", "ws"), this.authUrl = new URL("auth/v1", a10), this.storageUrl = new URL("storage/v1", a10), this.functionsUrl = new URL("functions/v1", a10);
          let o10 = `sb-${a10.hostname.split(".")[0]}-auth-token`, c10 = function(e11, t11) {
            var r11, n11;
            let { db: s11, auth: i11, realtime: a11, global: o11 } = e11, { db: c11, auth: l10, realtime: u2, global: h2 } = t11, d2 = { db: uE(uE({}, c11), s11), auth: uE(uE({}, l10), i11), realtime: uE(uE({}, u2), a11), storage: {}, global: uE(uE(uE({}, h2), o11), {}, { headers: uE(uE({}, null !== (r11 = null == h2 ? void 0 : h2.headers) && void 0 !== r11 ? r11 : {}), null !== (n11 = null == o11 ? void 0 : o11.headers) && void 0 !== n11 ? n11 : {}) }), accessToken: async () => "" };
            return e11.accessToken ? d2.accessToken = e11.accessToken : delete d2.accessToken, d2;
          }(null != r10 ? r10 : {}, { db: uw, realtime: uv, auth: uE(uE({}, ub), {}, { storageKey: o10 }), global: um });
          this.storageKey = null !== (n10 = c10.auth.storageKey) && void 0 !== n10 ? n10 : "", this.headers = null !== (s10 = c10.global.headers) && void 0 !== s10 ? s10 : {}, c10.accessToken ? (this.accessToken = c10.accessToken, this.auth = new Proxy({}, { get: (e11, t11) => {
            throw Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(t11)} is not possible`);
          } })) : this.auth = this._initSupabaseAuthClient(null !== (i10 = c10.auth) && void 0 !== i10 ? i10 : {}, this.headers, c10.global.fetch), this.fetch = uA(t10, this._getAccessToken.bind(this), c10.global.fetch), this.realtime = this._initRealtimeClient(uE({ headers: this.headers, accessToken: this._getAccessToken.bind(this) }, c10.realtime)), this.accessToken && this.accessToken().then((e11) => this.realtime.setAuth(e11)).catch((e11) => console.warn("Failed to set initial Realtime auth token:", e11)), this.rest = new oB(new URL("rest/v1", a10).href, { headers: this.headers, schema: c10.db.schema, fetch: this.fetch }), this.storage = new c8(this.storageUrl.href, this.headers, this.fetch, null == r10 ? void 0 : r10.storage), c10.accessToken || this._listenForAuthEvents();
        }
        get functions() {
          return new oU(this.functionsUrl.href, { headers: this.headers, customFetch: this.fetch });
        }
        from(e10) {
          return this.rest.from(e10);
        }
        schema(e10) {
          return this.rest.schema(e10);
        }
        rpc(e10, t10 = {}, r10 = { head: false, get: false, count: void 0 }) {
          return this.rest.rpc(e10, t10, r10);
        }
        channel(e10, t10 = { config: {} }) {
          return this.realtime.channel(e10, t10);
        }
        getChannels() {
          return this.realtime.getChannels();
        }
        removeChannel(e10) {
          return this.realtime.removeChannel(e10);
        }
        removeAllChannels() {
          return this.realtime.removeAllChannels();
        }
        async _getAccessToken() {
          var e10, t10;
          if (this.accessToken) return await this.accessToken();
          let { data: r10 } = await this.auth.getSession();
          return null !== (e10 = null === (t10 = r10.session) || void 0 === t10 ? void 0 : t10.access_token) && void 0 !== e10 ? e10 : this.supabaseKey;
        }
        _initSupabaseAuthClient({ autoRefreshToken: e10, persistSession: t10, detectSessionInUrl: r10, storage: n10, userStorage: s10, storageKey: i10, flowType: a10, lock: o10, debug: c10, throwOnError: l10 }, u2, h2) {
          let d2 = { Authorization: `Bearer ${this.supabaseKey}`, apikey: `${this.supabaseKey}` };
          return new uP({ url: this.authUrl.href, headers: uE(uE({}, d2), u2), storageKey: i10, autoRefreshToken: e10, persistSession: t10, detectSessionInUrl: r10, storage: n10, userStorage: s10, flowType: a10, lock: o10, debug: c10, throwOnError: l10, fetch: h2, hasCustomAuthorizationHeader: Object.keys(this.headers).some((e11) => "authorization" === e11.toLowerCase()) });
        }
        _initRealtimeClient(e10) {
          return new ct(this.realtimeUrl.href, uE(uE({}, e10), {}, { params: uE(uE({}, { apikey: this.supabaseKey }), null == e10 ? void 0 : e10.params) }));
        }
        _listenForAuthEvents() {
          return this.auth.onAuthStateChange((e10, t10) => {
            this._handleTokenChanged(e10, "CLIENT", null == t10 ? void 0 : t10.access_token);
          });
        }
        _handleTokenChanged(e10, t10, r10) {
          ("TOKEN_REFRESHED" === e10 || "SIGNED_IN" === e10) && this.changedAccessToken !== r10 ? (this.changedAccessToken = r10, this.realtime.setAuth(r10)) : "SIGNED_OUT" === e10 && (this.realtime.setAuth(), "STORAGE" == t10 && this.auth.signOut(), this.changedAccessToken = void 0);
        }
      };
      let uO = (e10, t10, r10) => new uC(e10, t10, r10);
      (function() {
        if ("undefined" != typeof window || "undefined" == typeof process) return false;
        let e10 = process.version;
        if (null == e10) return false;
        let t10 = e10.match(/^v(\d+)\./);
        return !!t10 && 18 >= parseInt(t10[1], 10);
      })() && console.warn("\u26A0\uFE0F  Node.js 18 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 20 or later. For more information, visit: https://github.com/orgs/supabase/discussions/37217");
      let uR = () => {
        let e10 = "https://rrqbzanpgtxljdpcaakg.supabase.co", t10 = process.env.SUPABASE_SERVICE_ROLE_KEY;
        if (!e10 || !t10) throw Error("Missing Supabase environment variables");
        return uO(e10, t10, { auth: { persistSession: false } });
      };
      async function ux(e10) {
        let t10 = e10.user, r10 = t10.email, n10 = t10.sub;
        if (!r10 || !n10) return console.error("Missing email or sub in session"), e10;
        let s10 = uR(), { data: i10 } = await s10.from("customers").select("id, auth0_id").eq("email", r10).single();
        if (i10) return i10.auth0_id !== n10 && await s10.from("customers").update({ auth0_id: n10, sync_status: "pending" }).eq("id", i10.id), e10;
        let { data: a10 } = await s10.from("students").select("id, auth0_id").eq("email", r10).single();
        return a10 ? a10.auth0_id !== n10 && await s10.from("students").update({ auth0_id: n10, sync_status: "pending" }).eq("id", a10.id) : await s10.from("customers").insert({ email: r10, name: t10.name || t10.nickname || r10, auth0_id: n10, type: 1, sync_status: "pending" }), e10;
      }
      let uI = new oO({ async onCallback(e10, t10, r10) {
        if (!e10) {
          if (r10) try {
            await ux(r10);
          } catch (e11) {
            console.error("Identity linking failed", e11);
          }
          return r10;
        }
      } });
      async function uN(e10) {
        return await uI.middleware(e10);
      }
      let uj = { matcher: ["/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|api/webhooks).*)"] };
      r(264);
      let uD = { ...H }, uU = uD.middleware || uD.default, u$ = "/src/middleware";
      if ("function" != typeof uU) throw Error(`The Middleware "${u$}" must export a \`middleware\` or a \`default\` function`);
      function uL(e10) {
        return tP({ ...e10, page: u$, handler: async (...e11) => {
          try {
            return await uU(...e11);
          } catch (s10) {
            let t10 = e11[0], r10 = new URL(t10.url), n10 = r10.pathname + r10.search;
            throw await q(s10, { path: n10, method: t10.method, headers: Object.fromEntries(t10.headers.entries()) }, { routerKind: "Pages Router", routePath: "/middleware", routeType: "middleware", revalidateReason: void 0 }), s10;
          }
        } });
      }
    }, 58: (e, t, r) => {
      "use strict";
      r.d(t, { xl: () => a });
      let n = Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available");
      class s {
        disable() {
          throw n;
        }
        getStore() {
        }
        run() {
          throw n;
        }
        exit() {
          throw n;
        }
        enterWith() {
          throw n;
        }
        static bind(e2) {
          return e2;
        }
      }
      let i = "undefined" != typeof globalThis && globalThis.AsyncLocalStorage;
      function a() {
        return i ? new i() : new s();
      }
    } }, (e) => {
      var t = e(e.s = 815);
      (_ENTRIES = "undefined" == typeof _ENTRIES ? {} : _ENTRIES)["middleware_src/middleware"] = t;
    }]);
  }
});

// node_modules/@opennextjs/cloudflare/node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js
var edgeFunctionHandler_exports = {};
__export(edgeFunctionHandler_exports, {
  default: () => edgeFunctionHandler
});
async function edgeFunctionHandler(request) {
  const path3 = new URL(request.url).pathname;
  const routes = globalThis._ROUTES;
  const correspondingRoute = routes.find((route) => route.regex.some((r) => new RegExp(r).test(path3)));
  if (!correspondingRoute) {
    throw new Error(`No route found for ${request.url}`);
  }
  const entry = await self._ENTRIES[`middleware_${correspondingRoute.name}`];
  const result = await entry.default({
    page: correspondingRoute.page,
    request: {
      ...request,
      page: {
        name: correspondingRoute.name
      }
    }
  });
  globalThis.__openNextAls.getStore()?.pendingPromiseRunner.add(result.waitUntil);
  const response = result.response;
  return response;
}
var init_edgeFunctionHandler = __esm({
  "node_modules/@opennextjs/cloudflare/node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js"() {
    globalThis._ENTRIES = {};
    globalThis.self = globalThis;
    globalThis._ROUTES = [{ "name": "src/middleware", "page": "/", "regex": ["^\\/app(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!_next\\/static|_next\\/image|favicon.ico|sitemap.xml|robots.txt|api\\/webhooks).*))(\\.json)?[\\/#\\?]?$"] }];
    require_edge_runtime_webpack();
    require_middleware();
  }
});

// node_modules/@opennextjs/cloudflare/node_modules/@opennextjs/aws/dist/utils/promise.js
init_logger();
var DetachedPromise = class {
  resolve;
  reject;
  promise;
  constructor() {
    let resolve;
    let reject;
    this.promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    this.resolve = resolve;
    this.reject = reject;
  }
};
var DetachedPromiseRunner = class {
  promises = [];
  withResolvers() {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    return detachedPromise;
  }
  add(promise) {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    promise.then(detachedPromise.resolve, detachedPromise.reject);
  }
  async await() {
    debug(`Awaiting ${this.promises.length} detached promises`);
    const results = await Promise.allSettled(this.promises.map((p) => p.promise));
    const rejectedPromises = results.filter((r) => r.status === "rejected");
    rejectedPromises.forEach((r) => {
      error(r.reason);
    });
  }
};
async function awaitAllDetachedPromise() {
  const store = globalThis.__openNextAls.getStore();
  const promisesToAwait = store?.pendingPromiseRunner.await() ?? Promise.resolve();
  if (store?.waitUntil) {
    store.waitUntil(promisesToAwait);
    return;
  }
  await promisesToAwait;
}
function provideNextAfterProvider() {
  const NEXT_REQUEST_CONTEXT_SYMBOL = Symbol.for("@next/request-context");
  const VERCEL_REQUEST_CONTEXT_SYMBOL = Symbol.for("@vercel/request-context");
  const store = globalThis.__openNextAls.getStore();
  const waitUntil = store?.waitUntil ?? ((promise) => store?.pendingPromiseRunner.add(promise));
  const nextAfterContext = {
    get: () => ({
      waitUntil
    })
  };
  globalThis[NEXT_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  if (process.env.EMULATE_VERCEL_REQUEST_CONTEXT) {
    globalThis[VERCEL_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  }
}
function runWithOpenNextRequestContext({ isISRRevalidation, waitUntil, requestId = Math.random().toString(36) }, fn) {
  return globalThis.__openNextAls.run({
    requestId,
    pendingPromiseRunner: new DetachedPromiseRunner(),
    isISRRevalidation,
    waitUntil,
    writtenTags: /* @__PURE__ */ new Set()
  }, async () => {
    provideNextAfterProvider();
    let result;
    try {
      result = await fn();
    } finally {
      await awaitAllDetachedPromise();
    }
    return result;
  });
}

// node_modules/@opennextjs/cloudflare/node_modules/@opennextjs/aws/dist/adapters/middleware.js
init_logger();

// node_modules/@opennextjs/cloudflare/node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
init_logger();

// node_modules/@opennextjs/cloudflare/node_modules/@opennextjs/aws/dist/core/resolve.js
async function resolveConverter(converter2) {
  if (typeof converter2 === "function") {
    return converter2();
  }
  const m_1 = await Promise.resolve().then(() => (init_edge(), edge_exports));
  return m_1.default;
}
async function resolveWrapper(wrapper) {
  if (typeof wrapper === "function") {
    return wrapper();
  }
  const m_1 = await Promise.resolve().then(() => (init_cloudflare_edge(), cloudflare_edge_exports));
  return m_1.default;
}
async function resolveOriginResolver(originResolver) {
  if (typeof originResolver === "function") {
    return originResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_pattern_env(), pattern_env_exports));
  return m_1.default;
}
async function resolveAssetResolver(assetResolver) {
  if (typeof assetResolver === "function") {
    return assetResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_dummy(), dummy_exports));
  return m_1.default;
}
async function resolveProxyRequest(proxyRequest) {
  if (typeof proxyRequest === "function") {
    return proxyRequest();
  }
  const m_1 = await Promise.resolve().then(() => (init_fetch(), fetch_exports));
  return m_1.default;
}

// node_modules/@opennextjs/cloudflare/node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
async function createGenericHandler(handler3) {
  const config = await import("./open-next.config.mjs").then((m) => m.default);
  globalThis.openNextConfig = config;
  const handlerConfig = config[handler3.type];
  const override = handlerConfig && "override" in handlerConfig ? handlerConfig.override : void 0;
  const converter2 = await resolveConverter(override?.converter);
  const { name, wrapper } = await resolveWrapper(override?.wrapper);
  debug("Using wrapper", name);
  return wrapper(handler3.handler, converter2);
}

// node_modules/@opennextjs/cloudflare/node_modules/@opennextjs/aws/dist/core/routing/util.js
import crypto2 from "node:crypto";
import { parse as parseQs, stringify as stringifyQs } from "node:querystring";

// node_modules/@opennextjs/cloudflare/node_modules/@opennextjs/aws/dist/adapters/config/index.js
init_logger();
import path from "node:path";
globalThis.__dirname ??= "";
var NEXT_DIR = path.join(__dirname, ".next");
var OPEN_NEXT_DIR = path.join(__dirname, ".open-next");
debug({ NEXT_DIR, OPEN_NEXT_DIR });
var NextConfig = { "env": {}, "webpack": null, "eslint": { "ignoreDuringBuilds": false }, "typescript": { "ignoreBuildErrors": false, "tsconfigPath": "tsconfig.json" }, "distDir": ".next", "cleanDistDir": true, "assetPrefix": "/app", "cacheMaxMemorySize": 52428800, "configOrigin": "next.config.ts", "useFileSystemPublicRoutes": true, "generateEtags": true, "pageExtensions": ["tsx", "ts", "jsx", "js"], "poweredByHeader": true, "compress": true, "images": { "deviceSizes": [640, 750, 828, 1080, 1200, 1920, 2048, 3840], "imageSizes": [16, 32, 48, 64, 96, 128, 256, 384], "path": "/app/_next/image", "loader": "default", "loaderFile": "", "domains": [], "disableStaticImages": false, "minimumCacheTTL": 60, "formats": ["image/webp"], "dangerouslyAllowSVG": false, "contentSecurityPolicy": "script-src 'none'; frame-src 'none'; sandbox;", "contentDispositionType": "attachment", "remotePatterns": [], "unoptimized": false }, "devIndicators": { "appIsrStatus": true, "buildActivity": true, "buildActivityPosition": "bottom-right" }, "onDemandEntries": { "maxInactiveAge": 6e4, "pagesBufferLength": 5 }, "amp": { "canonicalBase": "/app" }, "basePath": "/app", "sassOptions": {}, "trailingSlash": false, "i18n": null, "productionBrowserSourceMaps": false, "excludeDefaultMomentLocales": true, "serverRuntimeConfig": {}, "publicRuntimeConfig": {}, "reactProductionProfiling": false, "reactStrictMode": null, "reactMaxHeadersLength": 6e3, "httpAgentOptions": { "keepAlive": true }, "logging": {}, "expireTime": 31536e3, "staticPageGenerationTimeout": 60, "output": "standalone", "modularizeImports": { "@mui/icons-material": { "transform": "@mui/icons-material/{{member}}" }, "lodash": { "transform": "lodash/{{member}}" } }, "outputFileTracingRoot": "/Users/usuario/Desktop/Kupper/Dev/portal", "experimental": { "cacheLife": { "default": { "stale": 300, "revalidate": 900, "expire": 4294967294 }, "seconds": { "stale": 0, "revalidate": 1, "expire": 60 }, "minutes": { "stale": 300, "revalidate": 60, "expire": 3600 }, "hours": { "stale": 300, "revalidate": 3600, "expire": 86400 }, "days": { "stale": 300, "revalidate": 86400, "expire": 604800 }, "weeks": { "stale": 300, "revalidate": 604800, "expire": 2592e3 }, "max": { "stale": 300, "revalidate": 2592e3, "expire": 4294967294 } }, "cacheHandlers": {}, "cssChunking": true, "multiZoneDraftMode": false, "appNavFailHandling": false, "prerenderEarlyExit": true, "serverMinification": true, "serverSourceMaps": false, "linkNoTouchStart": false, "caseSensitiveRoutes": false, "clientSegmentCache": false, "preloadEntriesOnStart": true, "clientRouterFilter": true, "clientRouterFilterRedirects": false, "fetchCacheKeyPrefix": "", "middlewarePrefetch": "flexible", "optimisticClientCache": true, "manualClientBasePath": false, "cpus": 7, "memoryBasedWorkersCount": false, "imgOptConcurrency": null, "imgOptTimeoutInSeconds": 7, "imgOptMaxInputPixels": 268402689, "imgOptSequentialRead": null, "isrFlushToDisk": true, "workerThreads": false, "optimizeCss": false, "nextScriptWorkers": false, "scrollRestoration": false, "externalDir": false, "disableOptimizedLoading": false, "gzipSize": true, "craCompat": false, "esmExternals": true, "fullySpecified": false, "swcTraceProfiling": false, "forceSwcTransforms": false, "largePageDataBytes": 128e3, "turbo": { "root": "/Users/usuario/Desktop/Kupper/Dev/portal" }, "typedRoutes": false, "typedEnv": false, "parallelServerCompiles": false, "parallelServerBuildTraces": false, "ppr": false, "authInterrupts": false, "reactOwnerStack": false, "webpackMemoryOptimizations": false, "optimizeServerReact": true, "useEarlyImport": false, "staleTimes": { "dynamic": 0, "static": 300 }, "serverComponentsHmrCache": true, "staticGenerationMaxConcurrency": 8, "staticGenerationMinPagesPerWorker": 25, "dynamicIO": false, "inlineCss": false, "optimizePackageImports": ["lucide-react", "date-fns", "lodash-es", "ramda", "antd", "react-bootstrap", "ahooks", "@ant-design/icons", "@headlessui/react", "@headlessui-float/react", "@heroicons/react/20/solid", "@heroicons/react/24/solid", "@heroicons/react/24/outline", "@visx/visx", "@tremor/react", "rxjs", "@mui/material", "@mui/icons-material", "recharts", "react-use", "effect", "@effect/schema", "@effect/platform", "@effect/platform-node", "@effect/platform-browser", "@effect/platform-bun", "@effect/sql", "@effect/sql-mssql", "@effect/sql-mysql2", "@effect/sql-pg", "@effect/sql-squlite-node", "@effect/sql-squlite-bun", "@effect/sql-squlite-wasm", "@effect/sql-squlite-react-native", "@effect/rpc", "@effect/rpc-http", "@effect/typeclass", "@effect/experimental", "@effect/opentelemetry", "@material-ui/core", "@material-ui/icons", "@tabler/icons-react", "mui-core", "react-icons/ai", "react-icons/bi", "react-icons/bs", "react-icons/cg", "react-icons/ci", "react-icons/di", "react-icons/fa", "react-icons/fa6", "react-icons/fc", "react-icons/fi", "react-icons/gi", "react-icons/go", "react-icons/gr", "react-icons/hi", "react-icons/hi2", "react-icons/im", "react-icons/io", "react-icons/io5", "react-icons/lia", "react-icons/lib", "react-icons/lu", "react-icons/md", "react-icons/pi", "react-icons/ri", "react-icons/rx", "react-icons/si", "react-icons/sl", "react-icons/tb", "react-icons/tfi", "react-icons/ti", "react-icons/vsc", "react-icons/wi"], "trustHostHeader": false, "isExperimentalCompile": false }, "bundlePagesRouterDependencies": false, "configFileName": "next.config.ts" };
var BuildId = "qSABBn97sHPFgRHJdo-TL";
var RoutesManifest = { "basePath": "/app", "rewrites": { "beforeFiles": [], "afterFiles": [], "fallback": [] }, "redirects": [{ "source": "/app/", "destination": "/app", "basePath": false, "internal": true, "statusCode": 308, "regex": "^/app/$" }, { "source": "/:path+/", "destination": "/:path+", "internal": true, "statusCode": 308, "regex": "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))/$" }], "routes": { "static": [{ "page": "/", "regex": "^/(?:/)?$", "routeKeys": {}, "namedRegex": "^/(?:/)?$" }, { "page": "/_not-found", "regex": "^/_not\\-found(?:/)?$", "routeKeys": {}, "namedRegex": "^/_not\\-found(?:/)?$" }, { "page": "/favicon.ico", "regex": "^/favicon\\.ico(?:/)?$", "routeKeys": {}, "namedRegex": "^/favicon\\.ico(?:/)?$" }], "dynamic": [], "data": { "static": [], "dynamic": [] } }, "locales": [] };
var ConfigHeaders = [];
var PrerenderManifest = { "version": 4, "routes": { "/favicon.ico": { "initialHeaders": { "cache-control": "public, max-age=0, must-revalidate", "content-type": "image/x-icon", "x-next-cache-tags": "_N_T_/layout,_N_T_/favicon.ico/layout,_N_T_/favicon.ico/route,_N_T_/favicon.ico" }, "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/favicon.ico", "dataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/", "dataRoute": "/index.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] } }, "dynamicRoutes": {}, "notFoundRoutes": [], "preview": { "previewModeId": "a3cf5be02f1eb4c058134e485a6a361a", "previewModeSigningKey": "08af9ed0f621e3d058a2d42fab70af04c24c8a1bd01652fb5ae59e688a86d486", "previewModeEncryptionKey": "55e45e7cba655408f0086a0ad761d3c573eeb0519acef5bc75f57b2a552bc471" } };
var MiddlewareManifest = { "version": 3, "middleware": { "/": { "files": ["server/edge-runtime-webpack.js", "server/src/middleware.js"], "name": "src/middleware", "page": "/", "matchers": [{ "regexp": "^\\/app(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!_next\\/static|_next\\/image|favicon.ico|sitemap.xml|robots.txt|api\\/webhooks).*))(\\.json)?[\\/#\\?]?$", "originalSource": "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|api/webhooks).*)" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "qSABBn97sHPFgRHJdo-TL", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "4pO2Cx3XPFcvqwzbovv7nnCVchu9zBwEGBEnN+b11Fc=", "__NEXT_PREVIEW_MODE_ID": "a3cf5be02f1eb4c058134e485a6a361a", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "55e45e7cba655408f0086a0ad761d3c573eeb0519acef5bc75f57b2a552bc471", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "08af9ed0f621e3d058a2d42fab70af04c24c8a1bd01652fb5ae59e688a86d486" } } }, "functions": {}, "sortedMiddleware": ["/"] };
var AppPathRoutesManifest = { "/favicon.ico/route": "/favicon.ico", "/api/version/route": "/api/version", "/_not-found/page": "/_not-found", "/api/sync/outbound/route": "/api/sync/outbound", "/api/webhooks/podio/route": "/api/webhooks/podio", "/page": "/" };
var FunctionsConfigManifest = { "version": 1, "functions": {} };
var PagesManifest = { "/_app": "pages/_app.js", "/_error": "pages/_error.js", "/_document": "pages/_document.js", "/404": "pages/404.html" };
process.env.NEXT_BUILD_ID = BuildId;
process.env.NEXT_PREVIEW_MODE_ID = PrerenderManifest?.preview?.previewModeId;

// node_modules/@opennextjs/cloudflare/node_modules/@opennextjs/aws/dist/http/openNextResponse.js
init_logger();
init_util();
import { Transform } from "node:stream";

// node_modules/@opennextjs/cloudflare/node_modules/@opennextjs/aws/dist/core/routing/util.js
init_util();
init_logger();
import { ReadableStream as ReadableStream3 } from "node:stream/web";

// node_modules/@opennextjs/cloudflare/node_modules/@opennextjs/aws/dist/utils/binary.js
var commonBinaryMimeTypes = /* @__PURE__ */ new Set([
  "application/octet-stream",
  // Docs
  "application/epub+zip",
  "application/msword",
  "application/pdf",
  "application/rtf",
  "application/vnd.amazon.ebook",
  "application/vnd.ms-excel",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  // Fonts
  "font/otf",
  "font/woff",
  "font/woff2",
  // Images
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/tiff",
  "image/vnd.microsoft.icon",
  "image/webp",
  // Audio
  "audio/3gpp",
  "audio/aac",
  "audio/basic",
  "audio/flac",
  "audio/mpeg",
  "audio/ogg",
  "audio/wavaudio/webm",
  "audio/x-aiff",
  "audio/x-midi",
  "audio/x-wav",
  // Video
  "video/3gpp",
  "video/mp2t",
  "video/mpeg",
  "video/ogg",
  "video/quicktime",
  "video/webm",
  "video/x-msvideo",
  // Archives
  "application/java-archive",
  "application/vnd.apple.installer+xml",
  "application/x-7z-compressed",
  "application/x-apple-diskimage",
  "application/x-bzip",
  "application/x-bzip2",
  "application/x-gzip",
  "application/x-java-archive",
  "application/x-rar-compressed",
  "application/x-tar",
  "application/x-zip",
  "application/zip",
  // Serialized data
  "application/x-protobuf"
]);
function isBinaryContentType(contentType) {
  if (!contentType)
    return false;
  const value = contentType.split(";")[0];
  return commonBinaryMimeTypes.has(value);
}

// node_modules/@opennextjs/cloudflare/node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
init_stream();
init_logger();

// node_modules/@opennextjs/cloudflare/node_modules/@opennextjs/aws/dist/core/routing/i18n/accept-header.js
function parse(raw, preferences, options) {
  const lowers = /* @__PURE__ */ new Map();
  const header = raw.replace(/[ \t]/g, "");
  if (preferences) {
    let pos = 0;
    for (const preference of preferences) {
      const lower = preference.toLowerCase();
      lowers.set(lower, { orig: preference, pos: pos++ });
      if (options.prefixMatch) {
        const parts2 = lower.split("-");
        while (parts2.pop(), parts2.length > 0) {
          const joined = parts2.join("-");
          if (!lowers.has(joined)) {
            lowers.set(joined, { orig: preference, pos: pos++ });
          }
        }
      }
    }
  }
  const parts = header.split(",");
  const selections = [];
  const map = /* @__PURE__ */ new Set();
  for (let i = 0; i < parts.length; ++i) {
    const part = parts[i];
    if (!part) {
      continue;
    }
    const params = part.split(";");
    if (params.length > 2) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const token = params[0].toLowerCase();
    if (!token) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const selection = { token, pos: i, q: 1 };
    if (preferences && lowers.has(token)) {
      selection.pref = lowers.get(token).pos;
    }
    map.add(selection.token);
    if (params.length === 2) {
      const q = params[1];
      const [key, value] = q.split("=");
      if (!value || key !== "q" && key !== "Q") {
        throw new Error(`Invalid ${options.type} header`);
      }
      const score = Number.parseFloat(value);
      if (score === 0) {
        continue;
      }
      if (Number.isFinite(score) && score <= 1 && score >= 1e-3) {
        selection.q = score;
      }
    }
    selections.push(selection);
  }
  selections.sort((a, b) => {
    if (b.q !== a.q) {
      return b.q - a.q;
    }
    if (b.pref !== a.pref) {
      if (a.pref === void 0) {
        return 1;
      }
      if (b.pref === void 0) {
        return -1;
      }
      return a.pref - b.pref;
    }
    return a.pos - b.pos;
  });
  const values = selections.map((selection) => selection.token);
  if (!preferences || !preferences.length) {
    return values;
  }
  const preferred = [];
  for (const selection of values) {
    if (selection === "*") {
      for (const [preference, value] of lowers) {
        if (!map.has(preference)) {
          preferred.push(value.orig);
        }
      }
    } else {
      const lower = selection.toLowerCase();
      if (lowers.has(lower)) {
        preferred.push(lowers.get(lower).orig);
      }
    }
  }
  return preferred;
}
function acceptLanguage(header = "", preferences) {
  return parse(header, preferences, {
    type: "accept-language",
    prefixMatch: true
  })[0] || void 0;
}

// node_modules/@opennextjs/cloudflare/node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
function isLocalizedPath(path3) {
  return NextConfig.i18n?.locales.includes(path3.split("/")[1].toLowerCase()) ?? false;
}
function getLocaleFromCookie(cookies) {
  const i18n = NextConfig.i18n;
  const nextLocale = cookies.NEXT_LOCALE?.toLowerCase();
  return nextLocale ? i18n?.locales.find((locale) => nextLocale === locale.toLowerCase()) : void 0;
}
function detectDomainLocale({ hostname, detectedLocale }) {
  const i18n = NextConfig.i18n;
  const domains = i18n?.domains;
  if (!domains) {
    return;
  }
  const lowercasedLocale = detectedLocale?.toLowerCase();
  for (const domain of domains) {
    const domainHostname = domain.domain.split(":", 1)[0].toLowerCase();
    if (hostname === domainHostname || lowercasedLocale === domain.defaultLocale.toLowerCase() || domain.locales?.some((locale) => lowercasedLocale === locale.toLowerCase())) {
      return domain;
    }
  }
}
function detectLocale(internalEvent, i18n) {
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  if (i18n.localeDetection === false) {
    return domainLocale?.defaultLocale ?? i18n.defaultLocale;
  }
  const cookiesLocale = getLocaleFromCookie(internalEvent.cookies);
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  debug({
    cookiesLocale,
    preferredLocale,
    defaultLocale: i18n.defaultLocale,
    domainLocale
  });
  return domainLocale?.defaultLocale ?? cookiesLocale ?? preferredLocale ?? i18n.defaultLocale;
}
function localizePath(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n) {
    return internalEvent.rawPath;
  }
  if (isLocalizedPath(internalEvent.rawPath)) {
    return internalEvent.rawPath;
  }
  const detectedLocale = detectLocale(internalEvent, i18n);
  return `/${detectedLocale}${internalEvent.rawPath}`;
}
function handleLocaleRedirect(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n || i18n.localeDetection === false || internalEvent.rawPath !== "/") {
    return false;
  }
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  const detectedLocale = detectLocale(internalEvent, i18n);
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  const preferredDomain = detectDomainLocale({
    detectedLocale: preferredLocale
  });
  if (domainLocale && preferredDomain) {
    const isPDomain = preferredDomain.domain === domainLocale.domain;
    const isPLocale = preferredDomain.defaultLocale === preferredLocale;
    if (!isPDomain || !isPLocale) {
      const scheme = `http${preferredDomain.http ? "" : "s"}`;
      const rlocale = isPLocale ? "" : preferredLocale;
      return {
        type: "core",
        statusCode: 307,
        headers: {
          Location: `${scheme}://${preferredDomain.domain}/${rlocale}`
        },
        body: emptyReadableStream(),
        isBase64Encoded: false
      };
    }
  }
  const defaultLocale = domainLocale?.defaultLocale ?? i18n.defaultLocale;
  if (detectedLocale.toLowerCase() !== defaultLocale.toLowerCase()) {
    return {
      type: "core",
      statusCode: 307,
      headers: {
        Location: constructNextUrl(internalEvent.url, `/${detectedLocale}`)
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}

// node_modules/@opennextjs/cloudflare/node_modules/@opennextjs/aws/dist/core/routing/queue.js
function generateShardId(rawPath, maxConcurrency, prefix) {
  let a = cyrb128(rawPath);
  let t = a += 1831565813;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  const randomFloat = ((t ^ t >>> 14) >>> 0) / 4294967296;
  const randomInt = Math.floor(randomFloat * maxConcurrency);
  return `${prefix}-${randomInt}`;
}
function generateMessageGroupId(rawPath) {
  const maxConcurrency = Number.parseInt(process.env.MAX_REVALIDATE_CONCURRENCY ?? "10");
  return generateShardId(rawPath, maxConcurrency, "revalidate");
}
function cyrb128(str) {
  let h1 = 1779033703;
  let h2 = 3144134277;
  let h3 = 1013904242;
  let h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ h1 >>> 18, 597399067);
  h2 = Math.imul(h4 ^ h2 >>> 22, 2869860233);
  h3 = Math.imul(h1 ^ h3 >>> 17, 951274213);
  h4 = Math.imul(h2 ^ h4 >>> 19, 2716044179);
  h1 ^= h2 ^ h3 ^ h4, h2 ^= h1, h3 ^= h1, h4 ^= h1;
  return h1 >>> 0;
}

// node_modules/@opennextjs/cloudflare/node_modules/@opennextjs/aws/dist/core/routing/util.js
function isExternal(url, host) {
  if (!url)
    return false;
  const pattern = /^https?:\/\//;
  if (!pattern.test(url))
    return false;
  if (host) {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.host !== host;
    } catch {
      return !url.includes(host);
    }
  }
  return true;
}
function convertFromQueryString(query) {
  if (query === "")
    return {};
  const queryParts = query.split("&");
  return getQueryFromIterator(queryParts.map((p) => {
    const [key, value] = p.split("=");
    return [key, value];
  }));
}
function getUrlParts(url, isExternal2) {
  if (!isExternal2) {
    const regex2 = /\/([^?]*)\??(.*)/;
    const match3 = url.match(regex2);
    return {
      hostname: "",
      pathname: match3?.[1] ? `/${match3[1]}` : url,
      protocol: "",
      queryString: match3?.[2] ?? ""
    };
  }
  const regex = /^(https?:)\/\/?([^\/\s]+)(\/[^?]*)?(\?.*)?/;
  const match2 = url.match(regex);
  if (!match2) {
    throw new Error(`Invalid external URL: ${url}`);
  }
  return {
    protocol: match2[1] ?? "https:",
    hostname: match2[2],
    pathname: match2[3] ?? "",
    queryString: match2[4]?.slice(1) ?? ""
  };
}
function constructNextUrl(baseUrl, path3) {
  const nextBasePath = NextConfig.basePath ?? "";
  const url = new URL(`${nextBasePath}${path3}`, baseUrl);
  return url.href;
}
function convertToQueryString(query) {
  const queryStrings = [];
  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((entry) => queryStrings.push(`${key}=${entry}`));
    } else {
      queryStrings.push(`${key}=${value}`);
    }
  });
  return queryStrings.length > 0 ? `?${queryStrings.join("&")}` : "";
}
function getMiddlewareMatch(middlewareManifest2, functionsManifest) {
  if (functionsManifest?.functions?.["/_middleware"]) {
    return functionsManifest.functions["/_middleware"].matchers?.map(({ regexp }) => new RegExp(regexp)) ?? [/.*/];
  }
  const rootMiddleware = middlewareManifest2.middleware["/"];
  if (!rootMiddleware?.matchers)
    return [];
  return rootMiddleware.matchers.map(({ regexp }) => new RegExp(regexp));
}
function escapeRegex(str, { isPath } = {}) {
  const result = str.replaceAll("(.)", "_\xB51_").replaceAll("(..)", "_\xB52_").replaceAll("(...)", "_\xB53_");
  return isPath ? result : result.replaceAll("+", "_\xB54_");
}
function unescapeRegex(str) {
  return str.replaceAll("_\xB51_", "(.)").replaceAll("_\xB52_", "(..)").replaceAll("_\xB53_", "(...)").replaceAll("_\xB54_", "+");
}
function convertBodyToReadableStream(method, body) {
  if (method === "GET" || method === "HEAD")
    return void 0;
  if (!body)
    return void 0;
  return new ReadableStream3({
    start(controller) {
      controller.enqueue(body);
      controller.close();
    }
  });
}
var CommonHeaders;
(function(CommonHeaders2) {
  CommonHeaders2["CACHE_CONTROL"] = "cache-control";
  CommonHeaders2["NEXT_CACHE"] = "x-nextjs-cache";
})(CommonHeaders || (CommonHeaders = {}));
function normalizeLocationHeader(location, baseUrl, encodeQuery = false) {
  if (!URL.canParse(location)) {
    return location;
  }
  const locationURL = new URL(location);
  const origin = new URL(baseUrl).origin;
  let search = locationURL.search;
  if (encodeQuery && search) {
    search = `?${stringifyQs(parseQs(search.slice(1)))}`;
  }
  const href = `${locationURL.origin}${locationURL.pathname}${search}${locationURL.hash}`;
  if (locationURL.origin === origin) {
    return href.slice(origin.length);
  }
  return href;
}

// node_modules/@opennextjs/cloudflare/node_modules/@opennextjs/aws/dist/core/routingHandler.js
init_logger();

// node_modules/@opennextjs/cloudflare/node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
import { createHash } from "node:crypto";
init_stream();

// node_modules/@opennextjs/cloudflare/node_modules/@opennextjs/aws/dist/utils/cache.js
init_logger();
async function hasBeenRevalidated(key, tags, cacheEntry) {
  if (globalThis.openNextConfig.dangerous?.disableTagCache) {
    return false;
  }
  const value = cacheEntry.value;
  if (!value) {
    return true;
  }
  if ("type" in cacheEntry && cacheEntry.type === "page") {
    return false;
  }
  const lastModified = cacheEntry.lastModified ?? Date.now();
  if (globalThis.tagCache.mode === "nextMode") {
    return tags.length === 0 ? false : await globalThis.tagCache.hasBeenRevalidated(tags, lastModified);
  }
  const _lastModified = await globalThis.tagCache.getLastModified(key, lastModified);
  return _lastModified === -1;
}
function getTagsFromValue(value) {
  if (!value) {
    return [];
  }
  try {
    const cacheTags = value.meta?.headers?.["x-next-cache-tags"]?.split(",") ?? [];
    delete value.meta?.headers?.["x-next-cache-tags"];
    return cacheTags;
  } catch (e) {
    return [];
  }
}

// node_modules/@opennextjs/cloudflare/node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
init_logger();
var CACHE_ONE_YEAR = 60 * 60 * 24 * 365;
var CACHE_ONE_MONTH = 60 * 60 * 24 * 30;
var VARY_HEADER = "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch, Next-Url";
var NEXT_SEGMENT_PREFETCH_HEADER = "next-router-segment-prefetch";
var NEXT_PRERENDER_HEADER = "x-nextjs-prerender";
var NEXT_POSTPONED_HEADER = "x-nextjs-postponed";
async function computeCacheControl(path3, body, host, revalidate, lastModified) {
  let finalRevalidate = CACHE_ONE_YEAR;
  const existingRoute = Object.entries(PrerenderManifest?.routes ?? {}).find((p) => p[0] === path3)?.[1];
  if (revalidate === void 0 && existingRoute) {
    finalRevalidate = existingRoute.initialRevalidateSeconds === false ? CACHE_ONE_YEAR : existingRoute.initialRevalidateSeconds;
  } else if (revalidate !== void 0) {
    finalRevalidate = revalidate === false ? CACHE_ONE_YEAR : revalidate;
  }
  const age = Math.round((Date.now() - (lastModified ?? 0)) / 1e3);
  const hash = (str) => createHash("md5").update(str).digest("hex");
  const etag = hash(body);
  if (revalidate === 0) {
    return {
      "cache-control": "private, no-cache, no-store, max-age=0, must-revalidate",
      "x-opennext-cache": "ERROR",
      etag
    };
  }
  if (finalRevalidate !== CACHE_ONE_YEAR) {
    const sMaxAge = Math.max(finalRevalidate - age, 1);
    debug("sMaxAge", {
      finalRevalidate,
      age,
      lastModified,
      revalidate
    });
    const isStale = sMaxAge === 1;
    if (isStale) {
      let url = NextConfig.trailingSlash ? `${path3}/` : path3;
      if (NextConfig.basePath) {
        url = `${NextConfig.basePath}${url}`;
      }
      await globalThis.queue.send({
        MessageBody: {
          host,
          url,
          eTag: etag,
          lastModified: lastModified ?? Date.now()
        },
        MessageDeduplicationId: hash(`${path3}-${lastModified}-${etag}`),
        MessageGroupId: generateMessageGroupId(path3)
      });
    }
    return {
      "cache-control": `s-maxage=${sMaxAge}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
      "x-opennext-cache": isStale ? "STALE" : "HIT",
      etag
    };
  }
  return {
    "cache-control": `s-maxage=${CACHE_ONE_YEAR}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
    "x-opennext-cache": "HIT",
    etag
  };
}
function getBodyForAppRouter(event, cachedValue) {
  if (cachedValue.type !== "app") {
    throw new Error("getBodyForAppRouter called with non-app cache value");
  }
  try {
    const segmentHeader = `${event.headers[NEXT_SEGMENT_PREFETCH_HEADER]}`;
    const isSegmentResponse = Boolean(segmentHeader) && segmentHeader in (cachedValue.segmentData || {});
    const body = isSegmentResponse ? cachedValue.segmentData[segmentHeader] : cachedValue.rsc;
    return {
      body,
      additionalHeaders: isSegmentResponse ? { [NEXT_PRERENDER_HEADER]: "1", [NEXT_POSTPONED_HEADER]: "2" } : {}
    };
  } catch (e) {
    error("Error while getting body for app router from cache:", e);
    return { body: cachedValue.rsc, additionalHeaders: {} };
  }
}
async function generateResult(event, localizedPath, cachedValue, lastModified) {
  debug("Returning result from experimental cache");
  let body = "";
  let type = "application/octet-stream";
  let isDataRequest = false;
  let additionalHeaders = {};
  if (cachedValue.type === "app") {
    isDataRequest = Boolean(event.headers.rsc);
    if (isDataRequest) {
      const { body: appRouterBody, additionalHeaders: appHeaders } = getBodyForAppRouter(event, cachedValue);
      body = appRouterBody;
      additionalHeaders = appHeaders;
    } else {
      body = cachedValue.html;
    }
    type = isDataRequest ? "text/x-component" : "text/html; charset=utf-8";
  } else if (cachedValue.type === "page") {
    isDataRequest = Boolean(event.query.__nextDataReq);
    body = isDataRequest ? JSON.stringify(cachedValue.json) : cachedValue.html;
    type = isDataRequest ? "application/json" : "text/html; charset=utf-8";
  } else {
    throw new Error("generateResult called with unsupported cache value type, only 'app' and 'page' are supported");
  }
  const cacheControl = await computeCacheControl(localizedPath, body, event.headers.host, cachedValue.revalidate, lastModified);
  return {
    type: "core",
    // Sometimes other status codes can be cached, like 404. For these cases, we should return the correct status code
    // Also set the status code to the rewriteStatusCode if defined
    // This can happen in handleMiddleware in routingHandler.
    // `NextResponse.rewrite(url, { status: xxx})
    // The rewrite status code should take precedence over the cached one
    statusCode: event.rewriteStatusCode ?? cachedValue.meta?.status ?? 200,
    body: toReadableStream(body, false),
    isBase64Encoded: false,
    headers: {
      ...cacheControl,
      "content-type": type,
      ...cachedValue.meta?.headers,
      vary: VARY_HEADER,
      ...additionalHeaders
    }
  };
}
function escapePathDelimiters(segment, escapeEncoded) {
  return segment.replace(new RegExp(`([/#?]${escapeEncoded ? "|%(2f|23|3f|5c)" : ""})`, "gi"), (char) => encodeURIComponent(char));
}
function decodePathParams(pathname) {
  return pathname.split("/").map((segment) => {
    try {
      return escapePathDelimiters(decodeURIComponent(segment), true);
    } catch (e) {
      return segment;
    }
  }).join("/");
}
async function cacheInterceptor(event) {
  if (Boolean(event.headers["next-action"]) || Boolean(event.headers["x-prerender-revalidate"]))
    return event;
  const cookies = event.headers.cookie || "";
  const hasPreviewData = cookies.includes("__prerender_bypass") || cookies.includes("__next_preview_data");
  if (hasPreviewData) {
    debug("Preview mode detected, passing through to handler");
    return event;
  }
  let localizedPath = localizePath(event);
  if (NextConfig.basePath) {
    localizedPath = localizedPath.replace(NextConfig.basePath, "");
  }
  localizedPath = localizedPath.replace(/\/$/, "");
  localizedPath = decodePathParams(localizedPath);
  debug("Checking cache for", localizedPath, PrerenderManifest);
  const isISR = Object.keys(PrerenderManifest?.routes ?? {}).includes(localizedPath ?? "/") || Object.values(PrerenderManifest?.dynamicRoutes ?? {}).some((dr) => new RegExp(dr.routeRegex).test(localizedPath));
  debug("isISR", isISR);
  if (isISR) {
    try {
      const cachedData = await globalThis.incrementalCache.get(localizedPath ?? "/index");
      debug("cached data in interceptor", cachedData);
      if (!cachedData?.value) {
        return event;
      }
      if (cachedData.value?.type === "app" || cachedData.value?.type === "route") {
        const tags = getTagsFromValue(cachedData.value);
        const _hasBeenRevalidated = cachedData.shouldBypassTagCache ? false : await hasBeenRevalidated(localizedPath, tags, cachedData);
        if (_hasBeenRevalidated) {
          return event;
        }
      }
      const host = event.headers.host;
      switch (cachedData?.value?.type) {
        case "app":
        case "page":
          return generateResult(event, localizedPath, cachedData.value, cachedData.lastModified);
        case "redirect": {
          const cacheControl = await computeCacheControl(localizedPath, "", host, cachedData.value.revalidate, cachedData.lastModified);
          return {
            type: "core",
            statusCode: cachedData.value.meta?.status ?? 307,
            body: emptyReadableStream(),
            headers: {
              ...cachedData.value.meta?.headers ?? {},
              ...cacheControl
            },
            isBase64Encoded: false
          };
        }
        case "route": {
          const cacheControl = await computeCacheControl(localizedPath, cachedData.value.body, host, cachedData.value.revalidate, cachedData.lastModified);
          const isBinary = isBinaryContentType(String(cachedData.value.meta?.headers?.["content-type"]));
          return {
            type: "core",
            statusCode: event.rewriteStatusCode ?? cachedData.value.meta?.status ?? 200,
            body: toReadableStream(cachedData.value.body, isBinary),
            headers: {
              ...cacheControl,
              ...cachedData.value.meta?.headers,
              vary: VARY_HEADER
            },
            isBase64Encoded: isBinary
          };
        }
        default:
          return event;
      }
    } catch (e) {
      debug("Error while fetching cache", e);
      return event;
    }
  }
  return event;
}

// node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
function parse2(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path3 = "";
  var tryConsume = function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  };
  var mustConsume = function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  };
  var consumeText = function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  };
  var isSafe = function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  };
  var safePattern = function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  };
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path3 += prefix;
        prefix = "";
      }
      if (path3) {
        result.push(path3);
        path3 = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path3 += value;
      continue;
    }
    if (path3) {
      result.push(path3);
      path3 = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
function compile(str, options) {
  return tokensToFunction(parse2(str, options), options);
}
function tokensToFunction(tokens, options) {
  if (options === void 0) {
    options = {};
  }
  var reFlags = flags(options);
  var _a = options.encode, encode = _a === void 0 ? function(x) {
    return x;
  } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
  var matches = tokens.map(function(token) {
    if (typeof token === "object") {
      return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
    }
  });
  return function(data) {
    var path3 = "";
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (typeof token === "string") {
        path3 += token;
        continue;
      }
      var value = data ? data[token.name] : void 0;
      var optional = token.modifier === "?" || token.modifier === "*";
      var repeat = token.modifier === "*" || token.modifier === "+";
      if (Array.isArray(value)) {
        if (!repeat) {
          throw new TypeError('Expected "'.concat(token.name, '" to not repeat, but got an array'));
        }
        if (value.length === 0) {
          if (optional)
            continue;
          throw new TypeError('Expected "'.concat(token.name, '" to not be empty'));
        }
        for (var j = 0; j < value.length; j++) {
          var segment = encode(value[j], token);
          if (validate && !matches[i].test(segment)) {
            throw new TypeError('Expected all "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
          }
          path3 += token.prefix + segment + token.suffix;
        }
        continue;
      }
      if (typeof value === "string" || typeof value === "number") {
        var segment = encode(String(value), token);
        if (validate && !matches[i].test(segment)) {
          throw new TypeError('Expected "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
        }
        path3 += token.prefix + segment + token.suffix;
        continue;
      }
      if (optional)
        continue;
      var typeOfMessage = repeat ? "an array" : "a string";
      throw new TypeError('Expected "'.concat(token.name, '" to be ').concat(typeOfMessage));
    }
    return path3;
  };
}
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path3 = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    };
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path: path3, index, params };
  };
}
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
function regexpToRegexp(path3, keys) {
  if (!keys)
    return path3;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path3.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path3.source);
  }
  return path3;
}
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path3) {
    return pathToRegexp(path3, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
function stringToRegexp(path3, keys, options) {
  return tokensToRegexp(parse2(path3, options), keys, options);
}
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
function pathToRegexp(path3, keys, options) {
  if (path3 instanceof RegExp)
    return regexpToRegexp(path3, keys);
  if (Array.isArray(path3))
    return arrayToRegexp(path3, keys, options);
  return stringToRegexp(path3, keys, options);
}

// node_modules/@opennextjs/cloudflare/node_modules/@opennextjs/aws/dist/utils/normalize-path.js
import path2 from "node:path";
function normalizeRepeatedSlashes(url) {
  const urlNoQuery = url.host + url.pathname;
  return `${url.protocol}//${urlNoQuery.replace(/\\/g, "/").replace(/\/\/+/g, "/")}${url.search}`;
}

// node_modules/@opennextjs/cloudflare/node_modules/@opennextjs/aws/dist/core/routing/matcher.js
init_stream();
init_logger();

// node_modules/@opennextjs/cloudflare/node_modules/@opennextjs/aws/dist/core/routing/routeMatcher.js
var optionalLocalePrefixRegex = `^/(?:${RoutesManifest.locales.map((locale) => `${locale}/?`).join("|")})?`;
var optionalBasepathPrefixRegex = RoutesManifest.basePath ? `^${RoutesManifest.basePath}/?` : "^/";
var optionalPrefix = optionalLocalePrefixRegex.replace("^/", optionalBasepathPrefixRegex);
function routeMatcher(routeDefinitions) {
  const regexp = routeDefinitions.map((route) => ({
    page: route.page,
    regexp: new RegExp(route.regex.replace("^/", optionalPrefix))
  }));
  const appPathsSet = /* @__PURE__ */ new Set();
  const routePathsSet = /* @__PURE__ */ new Set();
  for (const [k, v] of Object.entries(AppPathRoutesManifest)) {
    if (k.endsWith("page")) {
      appPathsSet.add(v);
    } else if (k.endsWith("route")) {
      routePathsSet.add(v);
    }
  }
  return function matchRoute(path3) {
    const foundRoutes = regexp.filter((route) => route.regexp.test(path3));
    return foundRoutes.map((foundRoute) => {
      let routeType = "page";
      if (appPathsSet.has(foundRoute.page)) {
        routeType = "app";
      } else if (routePathsSet.has(foundRoute.page)) {
        routeType = "route";
      }
      return {
        route: foundRoute.page,
        type: routeType
      };
    });
  };
}
var staticRouteMatcher = routeMatcher([
  ...RoutesManifest.routes.static,
  ...getStaticAPIRoutes()
]);
var dynamicRouteMatcher = routeMatcher(RoutesManifest.routes.dynamic);
function getStaticAPIRoutes() {
  const createRouteDefinition = (route) => ({
    page: route,
    regex: `^${route}(?:/)?$`
  });
  const dynamicRoutePages = new Set(RoutesManifest.routes.dynamic.map(({ page }) => page));
  const pagesStaticAPIRoutes = Object.keys(PagesManifest).filter((route) => route.startsWith("/api/") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  const appPathsStaticAPIRoutes = Object.values(AppPathRoutesManifest).filter((route) => (route.startsWith("/api/") || route === "/api") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  return [...pagesStaticAPIRoutes, ...appPathsStaticAPIRoutes];
}

// node_modules/@opennextjs/cloudflare/node_modules/@opennextjs/aws/dist/core/routing/matcher.js
var routeHasMatcher = (headers, cookies, query) => (redirect) => {
  switch (redirect.type) {
    case "header":
      return !!headers?.[redirect.key.toLowerCase()] && new RegExp(redirect.value ?? "").test(headers[redirect.key.toLowerCase()] ?? "");
    case "cookie":
      return !!cookies?.[redirect.key] && new RegExp(redirect.value ?? "").test(cookies[redirect.key] ?? "");
    case "query":
      return query[redirect.key] && Array.isArray(redirect.value) ? redirect.value.reduce((prev, current) => prev || new RegExp(current).test(query[redirect.key]), false) : new RegExp(redirect.value ?? "").test(query[redirect.key] ?? "");
    case "host":
      return headers?.host !== "" && new RegExp(redirect.value ?? "").test(headers.host);
    default:
      return false;
  }
};
function checkHas(matcher, has, inverted = false) {
  return has ? has.reduce((acc, cur) => {
    if (acc === false)
      return false;
    return inverted ? !matcher(cur) : matcher(cur);
  }, true) : true;
}
var getParamsFromSource = (source) => (value) => {
  debug("value", value);
  const _match = source(value);
  return _match ? _match.params : {};
};
var computeParamHas = (headers, cookies, query) => (has) => {
  if (!has.value)
    return {};
  const matcher = new RegExp(`^${has.value}$`);
  const fromSource = (value) => {
    const matches = value.match(matcher);
    return matches?.groups ?? {};
  };
  switch (has.type) {
    case "header":
      return fromSource(headers[has.key.toLowerCase()] ?? "");
    case "cookie":
      return fromSource(cookies[has.key] ?? "");
    case "query":
      return Array.isArray(query[has.key]) ? fromSource(query[has.key].join(",")) : fromSource(query[has.key] ?? "");
    case "host":
      return fromSource(headers.host ?? "");
  }
};
function convertMatch(match2, toDestination, destination) {
  if (!match2) {
    return destination;
  }
  const { params } = match2;
  const isUsingParams = Object.keys(params).length > 0;
  return isUsingParams ? toDestination(params) : destination;
}
function getNextConfigHeaders(event, configHeaders) {
  if (!configHeaders) {
    return {};
  }
  const matcher = routeHasMatcher(event.headers, event.cookies, event.query);
  const requestHeaders = {};
  const localizedRawPath = localizePath(event);
  for (const { headers, has, missing, regex, source, locale } of configHeaders) {
    const path3 = locale === false ? event.rawPath : localizedRawPath;
    if (new RegExp(regex).test(path3) && checkHas(matcher, has) && checkHas(matcher, missing, true)) {
      const fromSource = match(source);
      const _match = fromSource(path3);
      headers.forEach((h) => {
        try {
          const key = convertMatch(_match, compile(h.key), h.key);
          const value = convertMatch(_match, compile(h.value), h.value);
          requestHeaders[key] = value;
        } catch {
          debug(`Error matching header ${h.key} with value ${h.value}`);
          requestHeaders[h.key] = h.value;
        }
      });
    }
  }
  return requestHeaders;
}
function handleRewrites(event, rewrites) {
  const { rawPath, headers, query, cookies, url } = event;
  const localizedRawPath = localizePath(event);
  const matcher = routeHasMatcher(headers, cookies, query);
  const computeHas = computeParamHas(headers, cookies, query);
  const rewrite = rewrites.find((route) => {
    const path3 = route.locale === false ? rawPath : localizedRawPath;
    return new RegExp(route.regex).test(path3) && checkHas(matcher, route.has) && checkHas(matcher, route.missing, true);
  });
  let finalQuery = query;
  let rewrittenUrl = url;
  const isExternalRewrite = isExternal(rewrite?.destination);
  debug("isExternalRewrite", isExternalRewrite);
  if (rewrite) {
    const { pathname, protocol, hostname, queryString } = getUrlParts(rewrite.destination, isExternalRewrite);
    const pathToUse = rewrite.locale === false ? rawPath : localizedRawPath;
    debug("urlParts", { pathname, protocol, hostname, queryString });
    const toDestinationPath = compile(escapeRegex(pathname, { isPath: true }));
    const toDestinationHost = compile(escapeRegex(hostname));
    const toDestinationQuery = compile(escapeRegex(queryString));
    const params = {
      // params for the source
      ...getParamsFromSource(match(escapeRegex(rewrite.source, { isPath: true })))(pathToUse),
      // params for the has
      ...rewrite.has?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {}),
      // params for the missing
      ...rewrite.missing?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {})
    };
    const isUsingParams = Object.keys(params).length > 0;
    let rewrittenQuery = queryString;
    let rewrittenHost = hostname;
    let rewrittenPath = pathname;
    if (isUsingParams) {
      rewrittenPath = unescapeRegex(toDestinationPath(params));
      rewrittenHost = unescapeRegex(toDestinationHost(params));
      rewrittenQuery = unescapeRegex(toDestinationQuery(params));
    }
    if (NextConfig.i18n && !isExternalRewrite) {
      const strippedPathLocale = rewrittenPath.replace(new RegExp(`^/(${NextConfig.i18n.locales.join("|")})`), "");
      if (strippedPathLocale.startsWith("/api/")) {
        rewrittenPath = strippedPathLocale;
      }
    }
    rewrittenUrl = isExternalRewrite ? `${protocol}//${rewrittenHost}${rewrittenPath}` : new URL(rewrittenPath, event.url).href;
    finalQuery = {
      ...query,
      ...convertFromQueryString(rewrittenQuery)
    };
    rewrittenUrl += convertToQueryString(finalQuery);
    debug("rewrittenUrl", { rewrittenUrl, finalQuery, isUsingParams });
  }
  return {
    internalEvent: {
      ...event,
      query: finalQuery,
      rawPath: new URL(rewrittenUrl).pathname,
      url: rewrittenUrl
    },
    __rewrite: rewrite,
    isExternalRewrite
  };
}
function handleRepeatedSlashRedirect(event) {
  if (event.rawPath.match(/(\\|\/\/)/)) {
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: normalizeRepeatedSlashes(new URL(event.url))
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}
function handleTrailingSlashRedirect(event) {
  const url = new URL(event.rawPath, "http://localhost");
  if (
    // Someone is trying to redirect to a different origin, let's not do that
    url.host !== "localhost" || NextConfig.skipTrailingSlashRedirect || // We should not apply trailing slash redirect to API routes
    event.rawPath.startsWith("/api/")
  ) {
    return false;
  }
  const emptyBody = emptyReadableStream();
  if (NextConfig.trailingSlash && !event.headers["x-nextjs-data"] && !event.rawPath.endsWith("/") && !event.rawPath.match(/[\w-]+\.[\w]+$/g)) {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0]}/${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  if (!NextConfig.trailingSlash && event.rawPath.endsWith("/") && event.rawPath !== "/") {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0].replace(/\/$/, "")}${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  return false;
}
function handleRedirects(event, redirects) {
  const repeatedSlashRedirect = handleRepeatedSlashRedirect(event);
  if (repeatedSlashRedirect)
    return repeatedSlashRedirect;
  const trailingSlashRedirect = handleTrailingSlashRedirect(event);
  if (trailingSlashRedirect)
    return trailingSlashRedirect;
  const localeRedirect = handleLocaleRedirect(event);
  if (localeRedirect)
    return localeRedirect;
  const { internalEvent, __rewrite } = handleRewrites(event, redirects.filter((r) => !r.internal));
  if (__rewrite && !__rewrite.internal) {
    return {
      type: event.type,
      statusCode: __rewrite.statusCode ?? 308,
      headers: {
        Location: internalEvent.url
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
}
function fixDataPage(internalEvent, buildId) {
  const { rawPath, query } = internalEvent;
  const basePath = NextConfig.basePath ?? "";
  const dataPattern = `${basePath}/_next/data/${buildId}`;
  if (rawPath.startsWith("/_next/data") && !rawPath.startsWith(dataPattern)) {
    return {
      type: internalEvent.type,
      statusCode: 404,
      body: toReadableStream("{}"),
      headers: {
        "Content-Type": "application/json"
      },
      isBase64Encoded: false
    };
  }
  if (rawPath.startsWith(dataPattern) && rawPath.endsWith(".json")) {
    const newPath = `${basePath}${rawPath.slice(dataPattern.length, -".json".length).replace(/^\/index$/, "/")}`;
    query.__nextDataReq = "1";
    return {
      ...internalEvent,
      rawPath: newPath,
      query,
      url: new URL(`${newPath}${convertToQueryString(query)}`, internalEvent.url).href
    };
  }
  return internalEvent;
}
function handleFallbackFalse(internalEvent, prerenderManifest) {
  const { rawPath } = internalEvent;
  const { dynamicRoutes = {}, routes = {} } = prerenderManifest ?? {};
  const prerenderedFallbackRoutes = Object.entries(dynamicRoutes).filter(([, { fallback }]) => fallback === false);
  const routeFallback = prerenderedFallbackRoutes.some(([, { routeRegex }]) => {
    const routeRegexExp = new RegExp(routeRegex);
    return routeRegexExp.test(rawPath);
  });
  const locales = NextConfig.i18n?.locales;
  const routesAlreadyHaveLocale = locales?.includes(rawPath.split("/")[1]) || // If we don't use locales, we don't need to add the default locale
  locales === void 0;
  let localizedPath = routesAlreadyHaveLocale ? rawPath : `/${NextConfig.i18n?.defaultLocale}${rawPath}`;
  if (
    // Not if localizedPath is "/" tho, because that would not make it find `isPregenerated` below since it would be try to match an empty string.
    localizedPath !== "/" && NextConfig.trailingSlash && localizedPath.endsWith("/")
  ) {
    localizedPath = localizedPath.slice(0, -1);
  }
  const matchedStaticRoute = staticRouteMatcher(localizedPath);
  const prerenderedFallbackRoutesName = prerenderedFallbackRoutes.map(([name]) => name);
  const matchedDynamicRoute = dynamicRouteMatcher(localizedPath).filter(({ route }) => !prerenderedFallbackRoutesName.includes(route));
  const isPregenerated = Object.keys(routes).includes(localizedPath);
  if (routeFallback && !isPregenerated && matchedStaticRoute.length === 0 && matchedDynamicRoute.length === 0) {
    return {
      event: {
        ...internalEvent,
        rawPath: "/404",
        url: constructNextUrl(internalEvent.url, "/404"),
        headers: {
          ...internalEvent.headers,
          "x-invoke-status": "404"
        }
      },
      isISR: false
    };
  }
  return {
    event: internalEvent,
    isISR: routeFallback || isPregenerated
  };
}

// node_modules/@opennextjs/cloudflare/node_modules/@opennextjs/aws/dist/core/routing/middleware.js
init_stream();
init_utils();
var middlewareManifest = MiddlewareManifest;
var functionsConfigManifest = FunctionsConfigManifest;
var middleMatch = getMiddlewareMatch(middlewareManifest, functionsConfigManifest);
var REDIRECTS = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
function defaultMiddlewareLoader() {
  return Promise.resolve().then(() => (init_edgeFunctionHandler(), edgeFunctionHandler_exports));
}
async function handleMiddleware(internalEvent, initialSearch, middlewareLoader = defaultMiddlewareLoader) {
  const headers = internalEvent.headers;
  if (headers["x-isr"] && headers["x-prerender-revalidate"] === PrerenderManifest?.preview?.previewModeId)
    return internalEvent;
  const normalizedPath = localizePath(internalEvent);
  const hasMatch = middleMatch.some((r) => r.test(normalizedPath));
  if (!hasMatch)
    return internalEvent;
  const initialUrl = new URL(normalizedPath, internalEvent.url);
  initialUrl.search = initialSearch;
  const url = initialUrl.href;
  const middleware = await middlewareLoader();
  const result = await middleware.default({
    // `geo` is pre Next 15.
    geo: {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: decodeURIComponent(headers["x-open-next-city"]),
      country: headers["x-open-next-country"],
      region: headers["x-open-next-region"],
      latitude: headers["x-open-next-latitude"],
      longitude: headers["x-open-next-longitude"]
    },
    headers,
    method: internalEvent.method || "GET",
    nextConfig: {
      basePath: NextConfig.basePath,
      i18n: NextConfig.i18n,
      trailingSlash: NextConfig.trailingSlash
    },
    url,
    body: convertBodyToReadableStream(internalEvent.method, internalEvent.body)
  });
  const statusCode = result.status;
  const responseHeaders = result.headers;
  const reqHeaders = {};
  const resHeaders = {};
  const filteredHeaders = [
    "x-middleware-override-headers",
    "x-middleware-next",
    "x-middleware-rewrite",
    // We need to drop `content-encoding` because it will be decoded
    "content-encoding"
  ];
  const xMiddlewareKey = "x-middleware-request-";
  responseHeaders.forEach((value, key) => {
    if (key.startsWith(xMiddlewareKey)) {
      const k = key.substring(xMiddlewareKey.length);
      reqHeaders[k] = value;
    } else {
      if (filteredHeaders.includes(key.toLowerCase()))
        return;
      if (key.toLowerCase() === "set-cookie") {
        resHeaders[key] = resHeaders[key] ? [...resHeaders[key], value] : [value];
      } else if (REDIRECTS.has(statusCode) && key.toLowerCase() === "location") {
        resHeaders[key] = normalizeLocationHeader(value, internalEvent.url);
      } else {
        resHeaders[key] = value;
      }
    }
  });
  const rewriteUrl = responseHeaders.get("x-middleware-rewrite");
  let isExternalRewrite = false;
  let middlewareQuery = internalEvent.query;
  let newUrl = internalEvent.url;
  if (rewriteUrl) {
    newUrl = rewriteUrl;
    if (isExternal(newUrl, internalEvent.headers.host)) {
      isExternalRewrite = true;
    } else {
      const rewriteUrlObject = new URL(rewriteUrl);
      middlewareQuery = getQueryFromSearchParams(rewriteUrlObject.searchParams);
      if ("__nextDataReq" in internalEvent.query) {
        middlewareQuery.__nextDataReq = internalEvent.query.__nextDataReq;
      }
    }
  }
  if (!rewriteUrl && !responseHeaders.get("x-middleware-next")) {
    const body = result.body ?? emptyReadableStream();
    return {
      type: internalEvent.type,
      statusCode,
      headers: resHeaders,
      body,
      isBase64Encoded: false
    };
  }
  return {
    responseHeaders: resHeaders,
    url: newUrl,
    rawPath: new URL(newUrl).pathname,
    type: internalEvent.type,
    headers: { ...internalEvent.headers, ...reqHeaders },
    body: internalEvent.body,
    method: internalEvent.method,
    query: middlewareQuery,
    cookies: internalEvent.cookies,
    remoteAddress: internalEvent.remoteAddress,
    isExternalRewrite,
    rewriteStatusCode: rewriteUrl && !isExternalRewrite ? statusCode : void 0
  };
}

// node_modules/@opennextjs/cloudflare/node_modules/@opennextjs/aws/dist/core/routingHandler.js
var MIDDLEWARE_HEADER_PREFIX = "x-middleware-response-";
var MIDDLEWARE_HEADER_PREFIX_LEN = MIDDLEWARE_HEADER_PREFIX.length;
var INTERNAL_HEADER_PREFIX = "x-opennext-";
var INTERNAL_HEADER_INITIAL_URL = `${INTERNAL_HEADER_PREFIX}initial-url`;
var INTERNAL_HEADER_LOCALE = `${INTERNAL_HEADER_PREFIX}locale`;
var INTERNAL_HEADER_RESOLVED_ROUTES = `${INTERNAL_HEADER_PREFIX}resolved-routes`;
var INTERNAL_HEADER_REWRITE_STATUS_CODE = `${INTERNAL_HEADER_PREFIX}rewrite-status-code`;
var INTERNAL_EVENT_REQUEST_ID = `${INTERNAL_HEADER_PREFIX}request-id`;
var geoHeaderToNextHeader = {
  "x-open-next-city": "x-vercel-ip-city",
  "x-open-next-country": "x-vercel-ip-country",
  "x-open-next-region": "x-vercel-ip-country-region",
  "x-open-next-latitude": "x-vercel-ip-latitude",
  "x-open-next-longitude": "x-vercel-ip-longitude"
};
function applyMiddlewareHeaders(eventOrResult, middlewareHeaders) {
  const isResult = isInternalResult(eventOrResult);
  const headers = eventOrResult.headers;
  const keyPrefix = isResult ? "" : MIDDLEWARE_HEADER_PREFIX;
  Object.entries(middlewareHeaders).forEach(([key, value]) => {
    if (value) {
      headers[keyPrefix + key] = Array.isArray(value) ? value.join(",") : value;
    }
  });
}
async function routingHandler(event, { assetResolver }) {
  try {
    for (const [openNextGeoName, nextGeoName] of Object.entries(geoHeaderToNextHeader)) {
      const value = event.headers[openNextGeoName];
      if (value) {
        event.headers[nextGeoName] = value;
      }
    }
    for (const key of Object.keys(event.headers)) {
      if (key.startsWith(INTERNAL_HEADER_PREFIX) || key.startsWith(MIDDLEWARE_HEADER_PREFIX)) {
        delete event.headers[key];
      }
    }
    let headers = getNextConfigHeaders(event, ConfigHeaders);
    let eventOrResult = fixDataPage(event, BuildId);
    if (isInternalResult(eventOrResult)) {
      return eventOrResult;
    }
    const redirect = handleRedirects(eventOrResult, RoutesManifest.redirects);
    if (redirect) {
      redirect.headers.Location = normalizeLocationHeader(redirect.headers.Location, event.url, true);
      debug("redirect", redirect);
      return redirect;
    }
    const middlewareEventOrResult = await handleMiddleware(
      eventOrResult,
      // We need to pass the initial search without any decoding
      // TODO: we'd need to refactor InternalEvent to include the initial querystring directly
      // Should be done in another PR because it is a breaking change
      new URL(event.url).search
    );
    if (isInternalResult(middlewareEventOrResult)) {
      return middlewareEventOrResult;
    }
    const middlewareHeadersPrioritized = globalThis.openNextConfig.dangerous?.middlewareHeadersOverrideNextConfigHeaders ?? false;
    if (middlewareHeadersPrioritized) {
      headers = {
        ...headers,
        ...middlewareEventOrResult.responseHeaders
      };
    } else {
      headers = {
        ...middlewareEventOrResult.responseHeaders,
        ...headers
      };
    }
    let isExternalRewrite = middlewareEventOrResult.isExternalRewrite ?? false;
    eventOrResult = middlewareEventOrResult;
    if (!isExternalRewrite) {
      const beforeRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.beforeFiles);
      eventOrResult = beforeRewrite.internalEvent;
      isExternalRewrite = beforeRewrite.isExternalRewrite;
      if (!isExternalRewrite) {
        const assetResult = await assetResolver?.maybeGetAssetResult?.(eventOrResult);
        if (assetResult) {
          applyMiddlewareHeaders(assetResult, headers);
          return assetResult;
        }
      }
    }
    const foundStaticRoute = staticRouteMatcher(eventOrResult.rawPath);
    const isStaticRoute = !isExternalRewrite && foundStaticRoute.length > 0;
    if (!(isStaticRoute || isExternalRewrite)) {
      const afterRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.afterFiles);
      eventOrResult = afterRewrite.internalEvent;
      isExternalRewrite = afterRewrite.isExternalRewrite;
    }
    let isISR = false;
    if (!isExternalRewrite) {
      const fallbackResult = handleFallbackFalse(eventOrResult, PrerenderManifest);
      eventOrResult = fallbackResult.event;
      isISR = fallbackResult.isISR;
    }
    const foundDynamicRoute = dynamicRouteMatcher(eventOrResult.rawPath);
    const isDynamicRoute = !isExternalRewrite && foundDynamicRoute.length > 0;
    if (!(isDynamicRoute || isStaticRoute || isExternalRewrite)) {
      const fallbackRewrites = handleRewrites(eventOrResult, RoutesManifest.rewrites.fallback);
      eventOrResult = fallbackRewrites.internalEvent;
      isExternalRewrite = fallbackRewrites.isExternalRewrite;
    }
    const isNextImageRoute = eventOrResult.rawPath.startsWith("/_next/image");
    const isRouteFoundBeforeAllRewrites = isStaticRoute || isDynamicRoute || isExternalRewrite;
    if (!(isRouteFoundBeforeAllRewrites || isNextImageRoute || // We need to check again once all rewrites have been applied
    staticRouteMatcher(eventOrResult.rawPath).length > 0 || dynamicRouteMatcher(eventOrResult.rawPath).length > 0)) {
      eventOrResult = {
        ...eventOrResult,
        rawPath: "/404",
        url: constructNextUrl(eventOrResult.url, "/404"),
        headers: {
          ...eventOrResult.headers,
          "x-middleware-response-cache-control": "private, no-cache, no-store, max-age=0, must-revalidate"
        }
      };
    }
    if (globalThis.openNextConfig.dangerous?.enableCacheInterception && !isInternalResult(eventOrResult)) {
      debug("Cache interception enabled");
      eventOrResult = await cacheInterceptor(eventOrResult);
      if (isInternalResult(eventOrResult)) {
        applyMiddlewareHeaders(eventOrResult, headers);
        return eventOrResult;
      }
    }
    applyMiddlewareHeaders(eventOrResult, headers);
    const resolvedRoutes = [
      ...foundStaticRoute,
      ...foundDynamicRoute
    ];
    debug("resolvedRoutes", resolvedRoutes);
    return {
      internalEvent: eventOrResult,
      isExternalRewrite,
      origin: false,
      isISR,
      resolvedRoutes,
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(eventOrResult, NextConfig.i18n) : void 0,
      rewriteStatusCode: middlewareEventOrResult.rewriteStatusCode
    };
  } catch (e) {
    error("Error in routingHandler", e);
    return {
      internalEvent: {
        type: "core",
        method: "GET",
        rawPath: "/500",
        url: constructNextUrl(event.url, "/500"),
        headers: {
          ...event.headers
        },
        query: event.query,
        cookies: event.cookies,
        remoteAddress: event.remoteAddress
      },
      isExternalRewrite: false,
      origin: false,
      isISR: false,
      resolvedRoutes: [],
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(event, NextConfig.i18n) : void 0
    };
  }
}
function isInternalResult(eventOrResult) {
  return eventOrResult != null && "statusCode" in eventOrResult;
}

// node_modules/@opennextjs/cloudflare/node_modules/@opennextjs/aws/dist/adapters/middleware.js
globalThis.internalFetch = fetch;
globalThis.__openNextAls = new AsyncLocalStorage();
var defaultHandler = async (internalEvent, options) => {
  const middlewareConfig = globalThis.openNextConfig.middleware;
  const originResolver = await resolveOriginResolver(middlewareConfig?.originResolver);
  const externalRequestProxy = await resolveProxyRequest(middlewareConfig?.override?.proxyExternalRequest);
  const assetResolver = await resolveAssetResolver(middlewareConfig?.assetResolver);
  const requestId = Math.random().toString(36);
  return runWithOpenNextRequestContext({
    isISRRevalidation: internalEvent.headers["x-isr"] === "1",
    waitUntil: options?.waitUntil,
    requestId
  }, async () => {
    const result = await routingHandler(internalEvent, { assetResolver });
    if ("internalEvent" in result) {
      debug("Middleware intercepted event", internalEvent);
      if (!result.isExternalRewrite) {
        const origin = await originResolver.resolve(result.internalEvent.rawPath);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_HEADER_INITIAL_URL]: internalEvent.url,
              [INTERNAL_HEADER_RESOLVED_ROUTES]: JSON.stringify(result.resolvedRoutes),
              [INTERNAL_EVENT_REQUEST_ID]: requestId,
              [INTERNAL_HEADER_REWRITE_STATUS_CODE]: String(result.rewriteStatusCode)
            }
          },
          isExternalRewrite: result.isExternalRewrite,
          origin,
          isISR: result.isISR,
          initialURL: result.initialURL,
          resolvedRoutes: result.resolvedRoutes
        };
      }
      try {
        return externalRequestProxy.proxy(result.internalEvent);
      } catch (e) {
        error("External request failed.", e);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_EVENT_REQUEST_ID]: requestId
            },
            rawPath: "/500",
            url: constructNextUrl(result.internalEvent.url, "/500"),
            method: "GET"
          },
          // On error we need to rewrite to the 500 page which is an internal rewrite
          isExternalRewrite: false,
          origin: false,
          isISR: result.isISR,
          initialURL: result.internalEvent.url,
          resolvedRoutes: [{ route: "/500", type: "page" }]
        };
      }
    }
    if (process.env.OPEN_NEXT_REQUEST_ID_HEADER || globalThis.openNextDebug) {
      result.headers[INTERNAL_EVENT_REQUEST_ID] = requestId;
    }
    debug("Middleware response", result);
    return result;
  });
};
var handler2 = await createGenericHandler({
  handler: defaultHandler,
  type: "middleware"
});
var middleware_default = {
  fetch: handler2
};
export {
  middleware_default as default,
  handler2 as handler
};
