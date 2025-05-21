import '@astrojs/internal-helpers/path';
import 'kleur/colors';
import { p as NOOP_MIDDLEWARE_HEADER, q as decodeKey } from './chunks/astro/server_BH4wi3OB.mjs';
import 'clsx';
import 'cookie';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from IANA HTTP Status Code Registry
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///home/azyshoo/Portophilio/","cacheDir":"file:///home/azyshoo/Portophilio/node_modules/.astro/","outDir":"file:///home/azyshoo/Portophilio/dist/","srcDir":"file:///home/azyshoo/Portophilio/src/","publicDir":"file:///home/azyshoo/Portophilio/public/","buildClientDir":"file:///home/azyshoo/Portophilio/dist/","buildServerDir":"file:///home/azyshoo/Portophilio/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"posts/1_firstpost/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/posts/1_firstpost","isIndex":false,"type":"page","pattern":"^\\/posts\\/1_firstpost\\/?$","segments":[[{"content":"posts","dynamic":false,"spread":false}],[{"content":"1_firstpost","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/posts/1_firstpost.md","pathname":"/posts/1_firstpost","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"posts/2_portoLife/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/posts/2_portolife","isIndex":false,"type":"page","pattern":"^\\/posts\\/2_portoLife\\/?$","segments":[[{"content":"posts","dynamic":false,"spread":false}],[{"content":"2_portoLife","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/posts/2_portoLife.md","pathname":"/posts/2_portoLife","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"posts/3_LCD/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/posts/3_lcd","isIndex":false,"type":"page","pattern":"^\\/posts\\/3_LCD\\/?$","segments":[[{"content":"posts","dynamic":false,"spread":false}],[{"content":"3_LCD","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/posts/3_LCD.md","pathname":"/posts/3_LCD","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"posts/4_InterviewQns/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/posts/4_interviewqns","isIndex":false,"type":"page","pattern":"^\\/posts\\/4_InterviewQns\\/?$","segments":[[{"content":"posts","dynamic":false,"spread":false}],[{"content":"4_InterviewQns","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/posts/4_InterviewQns.md","pathname":"/posts/4_InterviewQns","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"posts/5_CocoLove/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/posts/5_cocolove","isIndex":false,"type":"page","pattern":"^\\/posts\\/5_CocoLove\\/?$","segments":[[{"content":"posts","dynamic":false,"spread":false}],[{"content":"5_CocoLove","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/posts/5_CocoLove.md","pathname":"/posts/5_CocoLove","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"posts/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/posts","isIndex":true,"type":"page","pattern":"^\\/posts\\/?$","segments":[[{"content":"posts","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/posts/index.astro","pathname":"/posts","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"tags/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/tags","isIndex":true,"type":"page","pattern":"^\\/tags\\/?$","segments":[[{"content":"tags","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/tags/index.astro","pathname":"/tags","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://aishwarya-36.github.io","base":"/.","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/home/azyshoo/Portophilio/src/pages/about.astro",{"propagation":"none","containsHead":true}],["/home/azyshoo/Portophilio/src/pages/posts/index.astro",{"propagation":"none","containsHead":true}],["/home/azyshoo/Portophilio/src/pages/posts/1_firstpost.md",{"propagation":"none","containsHead":true}],["/home/azyshoo/Portophilio/src/pages/tags/[tag].astro",{"propagation":"none","containsHead":true}],["/home/azyshoo/Portophilio/src/pages/tags/index.astro",{"propagation":"none","containsHead":true}],["/home/azyshoo/Portophilio/src/pages/posts/2_portoLife.md",{"propagation":"none","containsHead":true}],["/home/azyshoo/Portophilio/src/pages/posts/3_LCD.md",{"propagation":"none","containsHead":true}],["/home/azyshoo/Portophilio/src/pages/posts/4_InterviewQns.md",{"propagation":"none","containsHead":true}],["/home/azyshoo/Portophilio/src/pages/posts/5_CocoLove.md",{"propagation":"none","containsHead":true}],["/home/azyshoo/Portophilio/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/posts/1_firstpost@_@md":"pages/posts/1_firstpost.astro.mjs","\u0000@astro-page:src/pages/posts/2_portoLife@_@md":"pages/posts/2_portolife.astro.mjs","\u0000@astro-page:src/pages/posts/3_LCD@_@md":"pages/posts/3_lcd.astro.mjs","\u0000@astro-page:src/pages/posts/4_InterviewQns@_@md":"pages/posts/4_interviewqns.astro.mjs","\u0000@astro-page:src/pages/posts/5_CocoLove@_@md":"pages/posts/5_cocolove.astro.mjs","\u0000@astro-page:src/pages/posts/index@_@astro":"pages/posts.astro.mjs","\u0000@astro-page:src/pages/tags/[tag]@_@astro":"pages/tags/_tag_.astro.mjs","\u0000@astro-page:src/pages/tags/index@_@astro":"pages/tags.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_CNYlNMLF.mjs","/home/azyshoo/Portophilio/node_modules/unstorage/drivers/fs-lite.mjs":"chunks/fs-lite_COtHaKzy.mjs","/home/azyshoo/Portophilio/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_C8v2ahPs.mjs","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/./_astro/blogging.J-wdJPoF.jpeg","/./_astro/dog.CTbsoHqP.jpg","/./_astro/coding.BM4DkSGW.png","/./_astro/job_application.CS4BkLj9.png","/./_astro/Lab.B-_O0IhR.jpg","/./_astro/amazon.B-11D4J4.svg","/./_astro/habit.CyJHpKQM.jpg","/./_astro/wiki.Dmn-Zagi.jpg","/./_astro/spotify.DM40tfD-.png","/./_astro/animedb.Bzp_kvkB.jpg","/./_astro/index.DcuaD6oy.css","/./amazon.svg","/./animedb.jpg","/./habit.jpg","/./spotify.png","/./tron.png","/./wiki.jpg","/./logos/CSS3.svg","/./logos/HTML5.svg","/./logos/astro.svg","/./logos/bash.svg","/./logos/git.svg","/./logos/javaScript.svg","/./logos/netlify.svg","/./logos/next.svg","/./logos/nodejs.svg","/./logos/react.svg","/./logos/tailwindcss.svg","/./logos/typeScript.svg","/./about/index.html","/./posts/1_firstpost/index.html","/./posts/2_portoLife/index.html","/./posts/3_LCD/index.html","/./posts/4_InterviewQns/index.html","/./posts/5_CocoLove/index.html","/./posts/index.html","/./tags/index.html","/./index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"8oye4mvWUPSmqeiAFsDclNXFSrPXIs3OAn1IqqFpjN0=","sessionConfig":{"driver":"fs-lite","options":{"base":"/home/azyshoo/Portophilio/node_modules/.astro/sessions"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/fs-lite_COtHaKzy.mjs');

export { manifest };
