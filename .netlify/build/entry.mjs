import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_CNYlNMLF.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/about.astro.mjs');
const _page1 = () => import('./pages/posts/1_firstpost.astro.mjs');
const _page2 = () => import('./pages/posts/2_portolife.astro.mjs');
const _page3 = () => import('./pages/posts/3_lcd.astro.mjs');
const _page4 = () => import('./pages/posts/4_interviewqns.astro.mjs');
const _page5 = () => import('./pages/posts/5_cocolove.astro.mjs');
const _page6 = () => import('./pages/posts.astro.mjs');
const _page7 = () => import('./pages/tags/_tag_.astro.mjs');
const _page8 = () => import('./pages/tags.astro.mjs');
const _page9 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["src/pages/about.astro", _page0],
    ["src/pages/posts/1_firstpost.md", _page1],
    ["src/pages/posts/2_portoLife.md", _page2],
    ["src/pages/posts/3_LCD.md", _page3],
    ["src/pages/posts/4_InterviewQns.md", _page4],
    ["src/pages/posts/5_CocoLove.md", _page5],
    ["src/pages/posts/index.astro", _page6],
    ["src/pages/tags/[tag].astro", _page7],
    ["src/pages/tags/index.astro", _page8],
    ["src/pages/index.astro", _page9]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "27ed818f-805c-4db2-84fc-9f7cae7e71b9"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
