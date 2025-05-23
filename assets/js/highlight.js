/*!
  Highlight.js v11.10.0 (git: 366a8bd012)
  (c) 2006-2024 Josh Goebel <hello@joshgoebel.com> and other contributors
  License: BSD-3-Clause
 */
var hljs = function () {
  "use strict"; function e(t) {
    return t instanceof Map ? t.clear = t.delete = t.set = () => {
      throw Error("map is read-only")
    } : t instanceof Set && (t.add = t.clear = t.delete = () => {
      throw Error("set is read-only")
    }), Object.freeze(t), Object.getOwnPropertyNames(t).forEach((n => {
      const i = t[n], s = typeof i; "object" !== s && "function" !== s || Object.isFrozen(i) || e(i)
    })), t
  } class t {
    constructor(e) {
      void 0 === e.data && (e.data = {}), this.data = e.data, this.isMatchIgnored = !1
    }
    ignoreMatch() { this.isMatchIgnored = !0 }
  } function n(e) {
    return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;")
  } function i(e, ...t) {
    const n = Object.create(null); for (const t in e) n[t] = e[t]
      ; return t.forEach((e => { for (const t in e) n[t] = e[t] })), n
  } const s = e => !!e.scope
    ; class o {
    constructor(e, t) {
      this.buffer = "", this.classPrefix = t.classPrefix, e.walk(this)
    } addText(e) {
      this.buffer += n(e)
    } openNode(e) {
      if (!s(e)) return; const t = ((e, { prefix: t }) => {
        if (e.startsWith("language:")) return e.replace("language:", "language-")
          ; if (e.includes(".")) {
            const n = e.split(".")
              ; return [`${t}${n.shift()}`, ...n.map(((e, t) => `${e}${"_".repeat(t + 1)}`))].join(" ")
          } return `${t}${e}`
      })(e.scope, { prefix: this.classPrefix }); this.span(t)
    }
    closeNode(e) { s(e) && (this.buffer += "</span>") } value() { return this.buffer } span(e) {
      this.buffer += `<span class="${e}">`
    }
  } const r = (e = {}) => {
    const t = { children: [] }
      ; return Object.assign(t, e), t
  }; class a {
    constructor() {
      this.rootNode = r(), this.stack = [this.rootNode]
    } get top() {
      return this.stack[this.stack.length - 1]
    } get root() { return this.rootNode } add(e) {
      this.top.children.push(e)
    } openNode(e) {
      const t = r({ scope: e })
        ; this.add(t), this.stack.push(t)
    } closeNode() {
      if (this.stack.length > 1) return this.stack.pop()
    } closeAllNodes() {
      for (; this.closeNode(););
    } toJSON() { return JSON.stringify(this.rootNode, null, 4) }
    walk(e) { return this.constructor._walk(e, this.rootNode) } static _walk(e, t) {
      return "string" == typeof t ? e.addText(t) : t.children && (e.openNode(t),
        t.children.forEach((t => this._walk(e, t))), e.closeNode(t)), e
    } static _collapse(e) {
      "string" != typeof e && e.children && (e.children.every((e => "string" == typeof e)) ? e.children = [e.children.join("")] : e.children.forEach((e => {
        a._collapse(e)
      })))
    }
  } class c extends a {
    constructor(e) { super(), this.options = e }
    addText(e) { "" !== e && this.add(e) } startScope(e) { this.openNode(e) } endScope() {
      this.closeNode()
    } __addSublanguage(e, t) {
      const n = e.root
        ; t && (n.scope = "language:" + t), this.add(n)
    } toHTML() {
      return new o(this, this.options).value()
    } finalize() {
      return this.closeAllNodes(), !0
    }
  } function l(e) {
    return e ? "string" == typeof e ? e : e.source : null
  } function g(e) { return h("(?=", e, ")") }
  function u(e) { return h("(?:", e, ")*") } function d(e) { return h("(?:", e, ")?") }
  function h(...e) { return e.map((e => l(e))).join("") } function f(...e) {
    const t = (e => {
      const t = e[e.length - 1]
        ; return "object" == typeof t && t.constructor === Object ? (e.splice(e.length - 1, 1), t) : {}
    })(e); return "(" + (t.capture ? "" : "?:") + e.map((e => l(e))).join("|") + ")"
  }
  function p(e) { return RegExp(e.toString() + "|").exec("").length - 1 }
  const b = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./
    ; function m(e, { joinWith: t }) {
      let n = 0; return e.map((e => {
        n += 1; const t = n
          ; let i = l(e), s = ""; for (; i.length > 0;) {
            const e = b.exec(i); if (!e) { s += i; break }
            s += i.substring(0, e.index),
              i = i.substring(e.index + e[0].length), "\\" === e[0][0] && e[1] ? s += "\\" + (Number(e[1]) + t) : (s += e[0],
                "(" === e[0] && n++)
          } return s
      })).map((e => `(${e})`)).join(t)
    }
  const E = "[a-zA-Z]\\w*", x = "[a-zA-Z_]\\w*", w = "\\b\\d+(\\.\\d+)?", y = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", _ = "\\b(0b[01]+)", O = {
    begin: "\\\\[\\s\\S]", relevance: 0
  }, v = {
    scope: "string", begin: "'", end: "'",
    illegal: "\\n", contains: [O]
  }, k = {
    scope: "string", begin: '"', end: '"', illegal: "\\n",
    contains: [O]
  }, N = (e, t, n = {}) => {
    const s = i({
      scope: "comment", begin: e, end: t,
      contains: []
    }, n); s.contains.push({
      scope: "doctag",
      begin: "[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",
      end: /(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/, excludeBegin: !0, relevance: 0
    })
      ; const o = f("I", "a", "is", "so", "us", "to", "at", "if", "in", "it", "on", /[A-Za-z]+['](d|ve|re|ll|t|s|n)/, /[A-Za-z]+[-][a-z]+/, /[A-Za-z][a-z]{2,}/)
      ; return s.contains.push({ begin: h(/[ ]+/, "(", o, /[.]?[:]?([.][ ]|[ ])/, "){3}") }), s
  }, S = N("//", "$"), M = N("/\\*", "\\*/"), R = N("#", "$"); var j = Object.freeze({
    __proto__: null, APOS_STRING_MODE: v, BACKSLASH_ESCAPE: O, BINARY_NUMBER_MODE: {
      scope: "number", begin: _, relevance: 0
    }, BINARY_NUMBER_RE: _, COMMENT: N,
    C_BLOCK_COMMENT_MODE: M, C_LINE_COMMENT_MODE: S, C_NUMBER_MODE: {
      scope: "number",
      begin: y, relevance: 0
    }, C_NUMBER_RE: y, END_SAME_AS_BEGIN: e => Object.assign(e, {
      "on:begin": (e, t) => { t.data._beginMatch = e[1] }, "on:end": (e, t) => {
        t.data._beginMatch !== e[1] && t.ignoreMatch()
      }
    }), HASH_COMMENT_MODE: R, IDENT_RE: E,
    MATCH_NOTHING_RE: /\b\B/, METHOD_GUARD: { begin: "\\.\\s*" + x, relevance: 0 },
    NUMBER_MODE: { scope: "number", begin: w, relevance: 0 }, NUMBER_RE: w,
    PHRASAL_WORDS_MODE: {
      begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
    }, QUOTE_STRING_MODE: k, REGEXP_MODE: {
      scope: "regexp", begin: /\/(?=[^/\n]*\/)/,
      end: /\/[gimuy]*/, contains: [O, { begin: /\[/, end: /\]/, relevance: 0, contains: [O] }]
    },
    RE_STARTERS_RE: "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",
    SHEBANG: (e = {}) => {
      const t = /^#![ ]*\//
        ; return e.binary && (e.begin = h(t, /.*\b/, e.binary, /\b.*/)), i({
          scope: "meta", begin: t,
          end: /$/, relevance: 0, "on:begin": (e, t) => { 0 !== e.index && t.ignoreMatch() }
        }, e)
    },
    TITLE_MODE: { scope: "title", begin: E, relevance: 0 }, UNDERSCORE_IDENT_RE: x,
    UNDERSCORE_TITLE_MODE: { scope: "title", begin: x, relevance: 0 }
  }); function A(e, t) {
    "." === e.input[e.index - 1] && t.ignoreMatch()
  } function I(e, t) {
    void 0 !== e.className && (e.scope = e.className, delete e.className)
  } function T(e, t) {
    t && e.beginKeywords && (e.begin = "\\b(" + e.beginKeywords.split(" ").join("|") + ")(?!\\.)(?=\\b|\\s)",
      e.__beforeBegin = A, e.keywords = e.keywords || e.beginKeywords, delete e.beginKeywords,
      void 0 === e.relevance && (e.relevance = 0))
  } function L(e, t) {
    Array.isArray(e.illegal) && (e.illegal = f(...e.illegal))
  } function B(e, t) {
    if (e.match) {
      if (e.begin || e.end) throw Error("begin & end are not supported with match")
        ; e.begin = e.match, delete e.match
    }
  } function P(e, t) {
    void 0 === e.relevance && (e.relevance = 1)
  } const D = (e, t) => {
    if (!e.beforeMatch) return
      ; if (e.starts) throw Error("beforeMatch cannot be used with starts")
        ; const n = Object.assign({}, e); Object.keys(e).forEach((t => {
          delete e[t]
        })), e.keywords = n.keywords, e.begin = h(n.beforeMatch, g(n.begin)), e.starts = {
          relevance: 0, contains: [Object.assign(n, { endsParent: !0 })]
        }, e.relevance = 0, delete n.beforeMatch
  }, H = ["of", "and", "for", "in", "not", "or", "if", "then", "parent", "list", "value"], C = "keyword"
    ; function $(e, t, n = C) {
      const i = Object.create(null)
        ; return "string" == typeof e ? s(n, e.split(" ")) : Array.isArray(e) ? s(n, e) : Object.keys(e).forEach((n => {
          Object.assign(i, $(e[n], t, n))
        })), i; function s(e, n) {
          t && (n = n.map((e => e.toLowerCase()))), n.forEach((t => {
            const n = t.split("|")
              ; i[n[0]] = [e, U(n[0], n[1])]
          }))
        }
    } function U(e, t) {
      return t ? Number(t) : (e => H.includes(e.toLowerCase()))(e) ? 0 : 1
    } const z = {}, W = e => {
      console.error(e)
    }, X = (e, ...t) => { console.log("WARN: " + e, ...t) }, G = (e, t) => {
      z[`${e}/${t}`] || (console.log(`Deprecated as of ${e}. ${t}`), z[`${e}/${t}`] = !0)
    }, K = Error(); function F(e, t, { key: n }) {
      let i = 0; const s = e[n], o = {}, r = {}
        ; for (let e = 1; e <= t.length; e++)r[e + i] = s[e], o[e + i] = !0, i += p(t[e - 1])
          ; e[n] = r, e[n]._emit = o, e[n]._multi = !0
    } function Z(e) {
      (e => {
        e.scope && "object" == typeof e.scope && null !== e.scope && (e.beginScope = e.scope,
          delete e.scope)
      })(e), "string" == typeof e.beginScope && (e.beginScope = {
        _wrap: e.beginScope
      }), "string" == typeof e.endScope && (e.endScope = {
        _wrap: e.endScope
      }), (e => {
        if (Array.isArray(e.begin)) {
          if (e.skip || e.excludeBegin || e.returnBegin) throw W("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),
            K
            ; if ("object" != typeof e.beginScope || null === e.beginScope) throw W("beginScope must be object"),
              K; F(e, e.begin, { key: "beginScope" }), e.begin = m(e.begin, { joinWith: "" })
        }
      })(e), (e => {
        if (Array.isArray(e.end)) {
          if (e.skip || e.excludeEnd || e.returnEnd) throw W("skip, excludeEnd, returnEnd not compatible with endScope: {}"),
            K
            ; if ("object" != typeof e.endScope || null === e.endScope) throw W("endScope must be object"),
              K; F(e, e.end, { key: "endScope" }), e.end = m(e.end, { joinWith: "" })
        }
      })(e)
    } function V(e) {
      function t(t, n) {
        return RegExp(l(t), "m" + (e.case_insensitive ? "i" : "") + (e.unicodeRegex ? "u" : "") + (n ? "g" : ""))
      } class n {
        constructor() {
          this.matchIndexes = {}, this.regexes = [], this.matchAt = 1, this.position = 0
        }
        addRule(e, t) {
          t.position = this.position++, this.matchIndexes[this.matchAt] = t, this.regexes.push([t, e]),
            this.matchAt += p(e) + 1
        } compile() {
          0 === this.regexes.length && (this.exec = () => null)
            ; const e = this.regexes.map((e => e[1])); this.matcherRe = t(m(e, {
              joinWith: "|"
            }), !0), this.lastIndex = 0
        } exec(e) {
          this.matcherRe.lastIndex = this.lastIndex
            ; const t = this.matcherRe.exec(e); if (!t) return null
              ; const n = t.findIndex(((e, t) => t > 0 && void 0 !== e)), i = this.matchIndexes[n]
            ; return t.splice(0, n), Object.assign(t, i)
        }
      } class s {
        constructor() {
          this.rules = [], this.multiRegexes = [],
            this.count = 0, this.lastIndex = 0, this.regexIndex = 0
        } getMatcher(e) {
          if (this.multiRegexes[e]) return this.multiRegexes[e]; const t = new n
            ; return this.rules.slice(e).forEach((([e, n]) => t.addRule(e, n))),
              t.compile(), this.multiRegexes[e] = t, t
        } resumingScanAtSamePosition() {
          return 0 !== this.regexIndex
        } considerAll() { this.regexIndex = 0 } addRule(e, t) {
          this.rules.push([e, t]), "begin" === t.type && this.count++
        } exec(e) {
          const t = this.getMatcher(this.regexIndex); t.lastIndex = this.lastIndex
            ; let n = t.exec(e)
            ; if (this.resumingScanAtSamePosition()) if (n && n.index === this.lastIndex); else {
              const t = this.getMatcher(0); t.lastIndex = this.lastIndex + 1, n = t.exec(e)
            }
          return n && (this.regexIndex += n.position + 1,
            this.regexIndex === this.count && this.considerAll()), n
        }
      }
      if (e.compilerExtensions || (e.compilerExtensions = []),
        e.contains && e.contains.includes("self")) throw Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.")
        ; return e.classNameAliases = i(e.classNameAliases || {}), function n(o, r) {
          const a = o
            ; if (o.isCompiled) return a
              ;[I, B, Z, D].forEach((e => e(o, r))), e.compilerExtensions.forEach((e => e(o, r))),
                o.__beforeBegin = null, [T, L, P].forEach((e => e(o, r))), o.isCompiled = !0; let c = null
            ; return "object" == typeof o.keywords && o.keywords.$pattern && (o.keywords = Object.assign({}, o.keywords),
              c = o.keywords.$pattern,
              delete o.keywords.$pattern), c = c || /\w+/, o.keywords && (o.keywords = $(o.keywords, e.case_insensitive)),
              a.keywordPatternRe = t(c, !0),
              r && (o.begin || (o.begin = /\B|\b/), a.beginRe = t(a.begin), o.end || o.endsWithParent || (o.end = /\B|\b/),
                o.end && (a.endRe = t(a.end)),
                a.terminatorEnd = l(a.end) || "", o.endsWithParent && r.terminatorEnd && (a.terminatorEnd += (o.end ? "|" : "") + r.terminatorEnd)),
              o.illegal && (a.illegalRe = t(o.illegal)),
              o.contains || (o.contains = []), o.contains = [].concat(...o.contains.map((e => (e => (e.variants && !e.cachedVariants && (e.cachedVariants = e.variants.map((t => i(e, {
                variants: null
              }, t)))), e.cachedVariants ? e.cachedVariants : q(e) ? i(e, {
                starts: e.starts ? i(e.starts) : null
              }) : Object.isFrozen(e) ? i(e) : e))("self" === e ? o : e)))), o.contains.forEach((e => {
                n(e, a)
              })), o.starts && n(o.starts, r), a.matcher = (e => {
                const t = new s
                  ; return e.contains.forEach((e => t.addRule(e.begin, {
                    rule: e, type: "begin"
                  }))), e.terminatorEnd && t.addRule(e.terminatorEnd, {
                    type: "end"
                  }), e.illegal && t.addRule(e.illegal, { type: "illegal" }), t
              })(a), a
        }(e)
    } function q(e) {
      return !!e && (e.endsWithParent || q(e.starts))
    } class J extends Error {
    constructor(e, t) { super(e), this.name = "HTMLInjectionError", this.html = t }
  }
  const Y = n, Q = i, ee = Symbol("nomatch"), te = n => {
    const i = Object.create(null), s = Object.create(null), o = []; let r = !0
      ; const a = "Could not find the language '{}', did you forget to load/include a language module?", l = {
        disableAutodetect: !0, name: "Plain text", contains: []
      }; let p = {
        ignoreUnescapedHTML: !1, throwUnescapedHTML: !1, noHighlightRe: /^(no-?highlight)$/i,
        languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i, classPrefix: "hljs-",
        cssSelector: "pre code", languages: null, __emitter: c
      }; function b(e) {
        return p.noHighlightRe.test(e)
      } function m(e, t, n) {
        let i = "", s = ""
          ; "object" == typeof t ? (i = e,
            n = t.ignoreIllegals, s = t.language) : (G("10.7.0", "highlight(lang, code, ...args) has been deprecated."),
              G("10.7.0", "Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277"),
              s = e, i = t), void 0 === n && (n = !0); const o = { code: i, language: s }; N("before:highlight", o)
          ; const r = o.result ? o.result : E(o.language, o.code, n)
          ; return r.code = o.code, N("after:highlight", r), r
      } function E(e, n, s, o) {
        const c = Object.create(null); function l() {
          if (!N.keywords) return void M.addText(R)
            ; let e = 0; N.keywordPatternRe.lastIndex = 0; let t = N.keywordPatternRe.exec(R), n = ""
            ; for (; t;) {
              n += R.substring(e, t.index)
                ; const s = _.case_insensitive ? t[0].toLowerCase() : t[0], o = (i = s, N.keywords[i]); if (o) {
                  const [e, i] = o
                    ; if (M.addText(n), n = "", c[s] = (c[s] || 0) + 1, c[s] <= 7 && (j += i), e.startsWith("_")) n += t[0]; else {
                      const n = _.classNameAliases[e] || e; u(t[0], n)
                    }
                } else n += t[0]
                ; e = N.keywordPatternRe.lastIndex, t = N.keywordPatternRe.exec(R)
            } var i
            ; n += R.substring(e), M.addText(n)
        } function g() {
          null != N.subLanguage ? (() => {
            if ("" === R) return; let e = null; if ("string" == typeof N.subLanguage) {
              if (!i[N.subLanguage]) return void M.addText(R)
                ; e = E(N.subLanguage, R, !0, S[N.subLanguage]), S[N.subLanguage] = e._top
            } else e = x(R, N.subLanguage.length ? N.subLanguage : null)
              ; N.relevance > 0 && (j += e.relevance), M.__addSublanguage(e._emitter, e.language)
          })() : l(), R = ""
        } function u(e, t) {
          "" !== e && (M.startScope(t), M.addText(e), M.endScope())
        } function d(e, t) {
          let n = 1
            ; const i = t.length - 1; for (; n <= i;) {
              if (!e._emit[n]) { n++; continue }
              const i = _.classNameAliases[e[n]] || e[n], s = t[n]; i ? u(s, i) : (R = s, l(), R = ""), n++
            }
        }
        function h(e, t) {
          return e.scope && "string" == typeof e.scope && M.openNode(_.classNameAliases[e.scope] || e.scope),
            e.beginScope && (e.beginScope._wrap ? (u(R, _.classNameAliases[e.beginScope._wrap] || e.beginScope._wrap),
              R = "") : e.beginScope._multi && (d(e.beginScope, t), R = "")), N = Object.create(e, {
                parent: {
                  value: N
                }
              }), N
        } function f(e, n, i) {
          let s = ((e, t) => {
            const n = e && e.exec(t)
              ; return n && 0 === n.index
          })(e.endRe, i); if (s) {
            if (e["on:end"]) {
              const i = new t(e)
                ; e["on:end"](n, i), i.isMatchIgnored && (s = !1)
            } if (s) {
              for (; e.endsParent && e.parent;)e = e.parent; return e
            }
          }
          if (e.endsWithParent) return f(e.parent, n, i)
        } function b(e) {
          return 0 === N.matcher.regexIndex ? (R += e[0], 1) : (T = !0, 0)
        } function m(e) {
          const t = e[0], i = n.substring(e.index), s = f(N, e, i); if (!s) return ee; const o = N
            ; N.endScope && N.endScope._wrap ? (g(),
              u(t, N.endScope._wrap)) : N.endScope && N.endScope._multi ? (g(),
                d(N.endScope, e)) : o.skip ? R += t : (o.returnEnd || o.excludeEnd || (R += t),
                  g(), o.excludeEnd && (R = t)); do {
                    N.scope && M.closeNode(), N.skip || N.subLanguage || (j += N.relevance), N = N.parent
                  } while (N !== s.parent); return s.starts && h(s.starts, e), o.returnEnd ? 0 : t.length
        }
        let w = {}; function y(i, o) {
          const a = o && o[0]; if (R += i, null == a) return g(), 0
            ; if ("begin" === w.type && "end" === o.type && w.index === o.index && "" === a) {
              if (R += n.slice(o.index, o.index + 1), !r) {
                const t = Error(`0 width match regex (${e})`)
                  ; throw t.languageName = e, t.badRule = w.rule, t
              } return 1
            }
          if (w = o, "begin" === o.type) return (e => {
            const n = e[0], i = e.rule, s = new t(i), o = [i.__beforeBegin, i["on:begin"]]
              ; for (const t of o) if (t && (t(e, s), s.isMatchIgnored)) return b(n)
                ; return i.skip ? R += n : (i.excludeBegin && (R += n),
                  g(), i.returnBegin || i.excludeBegin || (R = n)), h(i, e), i.returnBegin ? 0 : n.length
          })(o)
            ; if ("illegal" === o.type && !s) {
              const e = Error('Illegal lexeme "' + a + '" for mode "' + (N.scope || "<unnamed>") + '"')
                ; throw e.mode = N, e
            } if ("end" === o.type) { const e = m(o); if (e !== ee) return e }
          if ("illegal" === o.type && "" === a) return 1
            ; if (I > 1e5 && I > 3 * o.index) throw Error("potential infinite loop, way more iterations than matches")
              ; return R += a, a.length
        } const _ = O(e)
          ; if (!_) throw W(a.replace("{}", e)), Error('Unknown language: "' + e + '"')
            ; const v = V(_); let k = "", N = o || v; const S = {}, M = new p.__emitter(p); (() => {
              const e = []
                ; for (let t = N; t !== _; t = t.parent)t.scope && e.unshift(t.scope)
                  ; e.forEach((e => M.openNode(e)))
            })(); let R = "", j = 0, A = 0, I = 0, T = !1; try {
              if (_.__emitTokens) _.__emitTokens(n, M); else {
                for (N.matcher.considerAll(); ;) {
                  I++, T ? T = !1 : N.matcher.considerAll(), N.matcher.lastIndex = A
                    ; const e = N.matcher.exec(n); if (!e) break; const t = y(n.substring(A, e.index), e)
                    ; A = e.index + t
                } y(n.substring(A))
              } return M.finalize(), k = M.toHTML(), {
                language: e,
                value: k, relevance: j, illegal: !1, _emitter: M, _top: N
              }
            } catch (t) {
              if (t.message && t.message.includes("Illegal")) return {
                language: e, value: Y(n),
                illegal: !0, relevance: 0, _illegalBy: {
                  message: t.message, index: A,
                  context: n.slice(A - 100, A + 100), mode: t.mode, resultSoFar: k
                }, _emitter: M
              }; if (r) return {
                language: e, value: Y(n), illegal: !1, relevance: 0, errorRaised: t, _emitter: M, _top: N
              }
                ; throw t
            }
      } function x(e, t) {
        t = t || p.languages || Object.keys(i); const n = (e => {
          const t = { value: Y(e), illegal: !1, relevance: 0, _top: l, _emitter: new p.__emitter(p) }
            ; return t._emitter.addText(e), t
        })(e), s = t.filter(O).filter(k).map((t => E(t, e, !1)))
          ; s.unshift(n); const o = s.sort(((e, t) => {
            if (e.relevance !== t.relevance) return t.relevance - e.relevance
              ; if (e.language && t.language) {
                if (O(e.language).supersetOf === t.language) return 1
                  ; if (O(t.language).supersetOf === e.language) return -1
              } return 0
          })), [r, a] = o, c = r
          ; return c.secondBest = a, c
      } function w(e) {
        let t = null; const n = (e => {
          let t = e.className + " "; t += e.parentNode ? e.parentNode.className : ""
            ; const n = p.languageDetectRe.exec(t); if (n) {
              const t = O(n[1])
                ; return t || (X(a.replace("{}", n[1])),
                  X("Falling back to no-highlight mode for this block.", e)), t ? n[1] : "no-highlight"
            }
          return t.split(/\s+/).find((e => b(e) || O(e)))
        })(e); if (b(n)) return
          ; if (N("before:highlightElement", {
            el: e, language: n
          }), e.dataset.highlighted) return void console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.", e)
            ; if (e.children.length > 0 && (p.ignoreUnescapedHTML || (console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),
              console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),
              console.warn("The element with unescaped HTML:"),
              console.warn(e)), p.throwUnescapedHTML)) throw new J("One of your code blocks includes unescaped HTML.", e.innerHTML)
          ; t = e; const i = t.textContent, o = n ? m(i, { language: n, ignoreIllegals: !0 }) : x(i)
          ; e.innerHTML = o.value, e.dataset.highlighted = "yes", ((e, t, n) => {
            const i = t && s[t] || n
              ; e.classList.add("hljs"), e.classList.add("language-" + i)
          })(e, n, o.language), e.result = {
            language: o.language, re: o.relevance,
            relevance: o.relevance
          }, o.secondBest && (e.secondBest = {
            language: o.secondBest.language, relevance: o.secondBest.relevance
          }), N("after:highlightElement", { el: e, result: o, text: i })
      } let y = !1; function _() {
        "loading" !== document.readyState ? document.querySelectorAll(p.cssSelector).forEach(w) : y = !0
      } function O(e) { return e = (e || "").toLowerCase(), i[e] || i[s[e]] }
    function v(e, { languageName: t }) {
      "string" == typeof e && (e = [e]), e.forEach((e => {
        s[e.toLowerCase()] = t
      }))
    } function k(e) {
      const t = O(e)
        ; return t && !t.disableAutodetect
    } function N(e, t) {
      const n = e; o.forEach((e => {
        e[n] && e[n](t)
      }))
    }
    "undefined" != typeof window && window.addEventListener && window.addEventListener("DOMContentLoaded", (() => {
      y && _()
    }), !1), Object.assign(n, {
      highlight: m, highlightAuto: x, highlightAll: _,
      highlightElement: w,
      highlightBlock: e => (G("10.7.0", "highlightBlock will be removed entirely in v12.0"),
        G("10.7.0", "Please use highlightElement now."), w(e)), configure: e => { p = Q(p, e) },
      initHighlighting: () => {
        _(), G("10.6.0", "initHighlighting() deprecated.  Use highlightAll() now.")
      },
      initHighlightingOnLoad: () => {
        _(), G("10.6.0", "initHighlightingOnLoad() deprecated.  Use highlightAll() now.")
      }, registerLanguage: (e, t) => {
        let s = null; try { s = t(n) } catch (t) {
          if (W("Language definition for '{}' could not be registered.".replace("{}", e)),
            !r) throw t; W(t), s = l
        }
        s.name || (s.name = e), i[e] = s, s.rawDefinition = t.bind(null, n), s.aliases && v(s.aliases, {
          languageName: e
        })
      }, unregisterLanguage: e => {
        delete i[e]
          ; for (const t of Object.keys(s)) s[t] === e && delete s[t]
      },
      listLanguages: () => Object.keys(i), getLanguage: O, registerAliases: v,
      autoDetection: k, inherit: Q, addPlugin: e => {
        (e => {
          e["before:highlightBlock"] && !e["before:highlightElement"] && (e["before:highlightElement"] = t => {
            e["before:highlightBlock"](Object.assign({ block: t.el }, t))
          }), e["after:highlightBlock"] && !e["after:highlightElement"] && (e["after:highlightElement"] = t => {
            e["after:highlightBlock"](Object.assign({ block: t.el }, t))
          })
        })(e), o.push(e)
      },
      removePlugin: e => { const t = o.indexOf(e); -1 !== t && o.splice(t, 1) }
    }), n.debugMode = () => {
      r = !1
    }, n.safeMode = () => { r = !0 }, n.versionString = "11.10.0", n.regex = {
      concat: h,
      lookahead: g, either: f, optional: d, anyNumberOfTimes: u
    }
      ; for (const t in j) "object" == typeof j[t] && e(j[t]); return Object.assign(n, j), n
  }, ne = te({}); return ne.newInstance = () => te({}), ne
}()
  ; "object" == typeof exports && "undefined" != typeof module && (module.exports = hljs);
// EXCEL Language Syntax
(() => {
  var E = (() => {
    "use strict"; return E => ({
      name: "Excel formulae",
      aliases: ["xlsx", "xls"], case_insensitive: !0, keywords: {
        $pattern: /[a-zA-Z][\w\.]*/,
        built_in: ["ABS", "ACCRINT", "ACCRINTM", "ACOS", "ACOSH", "ACOT", "ACOTH", "AGGREGATE", "ADDRESS", "AMORDEGRC", "AMORLINC", "AND", "ARABIC", "AREAS", "ASC", "ASIN", "ASINH", "ATAN", "ATAN2", "ATANH", "AVEDEV", "AVERAGE", "AVERAGEA", "AVERAGEIF", "AVERAGEIFS", "BAHTTEXT", "BASE", "BESSELI", "BESSELJ", "BESSELK", "BESSELY", "BETADIST", "BETA.DIST", "BETAINV", "BETA.INV", "BIN2DEC", "BIN2HEX", "BIN2OCT", "BINOMDIST", "BINOM.DIST", "BINOM.DIST.RANGE", "BINOM.INV", "BITAND", "BITLSHIFT", "BITOR", "BITRSHIFT", "BITXOR", "CALL", "CEILING", "CEILING.MATH", "CEILING.PRECISE", "CELL", "CHAR", "CHIDIST", "CHIINV", "CHITEST", "CHISQ.DIST", "CHISQ.DIST.RT", "CHISQ.INV", "CHISQ.INV.RT", "CHISQ.TEST", "CHOOSE", "CLEAN", "CODE", "COLUMN", "COLUMNS", "COMBIN", "COMBINA", "COMPLEX", "CONCAT", "CONCATENATE", "CONFIDENCE", "CONFIDENCE.NORM", "CONFIDENCE.T", "CONVERT", "CORREL", "COS", "COSH", "COT", "COTH", "COUNT", "COUNTA", "COUNTBLANK", "COUNTIF", "COUNTIFS", "COUPDAYBS", "COUPDAYS", "COUPDAYSNC", "COUPNCD", "COUPNUM", "COUPPCD", "COVAR", "COVARIANCE.P", "COVARIANCE.S", "CRITBINOM", "CSC", "CSCH", "CUBEKPIMEMBER", "CUBEMEMBER", "CUBEMEMBERPROPERTY", "CUBERANKEDMEMBER", "CUBESET", "CUBESETCOUNT", "CUBEVALUE", "CUMIPMT", "CUMPRINC", "DATE", "DATEDIF", "DATEVALUE", "DAVERAGE", "DAY", "DAYS", "DAYS360", "DB", "DBCS", "DCOUNT", "DCOUNTA", "DDB", "DEC2BIN", "DEC2HEX", "DEC2OCT", "DECIMAL", "DEGREES", "DELTA", "DEVSQ", "DGET", "DISC", "DMAX", "DMIN", "DOLLAR", "DOLLARDE", "DOLLARFR", "DPRODUCT", "DSTDEV", "DSTDEVP", "DSUM", "DURATION", "DVAR", "DVARP", "EDATE", "EFFECT", "ENCODEURL", "EOMONTH", "ERF", "ERF.PRECISE", "ERFC", "ERFC.PRECISE", "ERROR.TYPE", "EUROCONVERT", "EVEN", "EXACT", "EXP", "EXPON.DIST", "EXPONDIST", "FACT", "FACTDOUBLE", "FALSE|0", "F.DIST", "FDIST", "F.DIST.RT", "FILTERXML", "FIND", "FINDB", "F.INV", "F.INV.RT", "FINV", "FISHER", "FISHERINV", "FIXED", "FLOOR", "FLOOR.MATH", "FLOOR.PRECISE", "FORECAST", "FORECAST.ETS", "FORECAST.ETS.CONFINT", "FORECAST.ETS.SEASONALITY", "FORECAST.ETS.STAT", "FORECAST.LINEAR", "FORMULATEXT", "FREQUENCY", "F.TEST", "FTEST", "FV", "FVSCHEDULE", "GAMMA", "GAMMA.DIST", "GAMMADIST", "GAMMA.INV", "GAMMAINV", "GAMMALN", "GAMMALN.PRECISE", "GAUSS", "GCD", "GEOMEAN", "GESTEP", "GETPIVOTDATA", "GROWTH", "HARMEAN", "HEX2BIN", "HEX2DEC", "HEX2OCT", "HLOOKUP", "HOUR", "HYPERLINK", "HYPGEOM.DIST", "HYPGEOMDIST", "IF", "IFERROR", "IFNA", "IFS", "IMABS", "IMAGINARY", "IMARGUMENT", "IMCONJUGATE", "IMCOS", "IMCOSH", "IMCOT", "IMCSC", "IMCSCH", "IMDIV", "IMEXP", "IMLN", "IMLOG10", "IMLOG2", "IMPOWER", "IMPRODUCT", "IMREAL", "IMSEC", "IMSECH", "IMSIN", "IMSINH", "IMSQRT", "IMSUB", "IMSUM", "IMTAN", "INDEX", "INDIRECT", "INFO", "INT", "INTERCEPT", "INTRATE", "IPMT", "IRR", "ISBLANK", "ISERR", "ISERROR", "ISEVEN", "ISFORMULA", "ISLOGICAL", "ISNA", "ISNONTEXT", "ISNUMBER", "ISODD", "ISREF", "ISTEXT", "ISO.CEILING", "ISOWEEKNUM", "ISPMT", "JIS", "KURT", "LARGE", "LCM", "LEFT", "LEFTB", "LEN", "LENB", "LINEST", "LN", "LOG", "LOG10", "LOGEST", "LOGINV", "LOGNORM.DIST", "LOGNORMDIST", "LOGNORM.INV", "LOOKUP", "LOWER", "MATCH", "MAX", "MAXA", "MAXIFS", "MDETERM", "MDURATION", "MEDIAN", "MID", "MIDBs", "MIN", "MINIFS", "MINA", "MINUTE", "MINVERSE", "MIRR", "MMULT", "MOD", "MODE", "MODE.MULT", "MODE.SNGL", "MONTH", "MROUND", "MULTINOMIAL", "MUNIT", "N", "NA", "NEGBINOM.DIST", "NEGBINOMDIST", "NETWORKDAYS", "NETWORKDAYS.INTL", "NOMINAL", "NORM.DIST", "NORMDIST", "NORMINV", "NORM.INV", "NORM.S.DIST", "NORMSDIST", "NORM.S.INV", "NORMSINV", "NOT", "NOW", "NPER", "NPV", "NUMBERVALUE", "OCT2BIN", "OCT2DEC", "OCT2HEX", "ODD", "ODDFPRICE", "ODDFYIELD", "ODDLPRICE", "ODDLYIELD", "OFFSET", "OR", "PDURATION", "PEARSON", "PERCENTILE.EXC", "PERCENTILE.INC", "PERCENTILE", "PERCENTRANK.EXC", "PERCENTRANK.INC", "PERCENTRANK", "PERMUT", "PERMUTATIONA", "PHI", "PHONETIC", "PI", "PMT", "POISSON.DIST", "POISSON", "POWER", "PPMT", "PRICE", "PRICEDISC", "PRICEMAT", "PROB", "PRODUCT", "PROPER", "PV", "QUARTILE", "QUARTILE.EXC", "QUARTILE.INC", "QUOTIENT", "RADIANS", "RAND", "RANDBETWEEN", "RANK.AVG", "RANK.EQ", "RANK", "RATE", "RECEIVED", "REGISTER.ID", "REPLACE", "REPLACEB", "REPT", "RIGHT", "RIGHTB", "ROMAN", "ROUND", "ROUNDDOWN", "ROUNDUP", "ROW", "ROWS", "RRI", "RSQ", "RTD", "SEARCH", "SEARCHB", "SEC", "SECH", "SECOND", "SERIESSUM", "SHEET", "SHEETS", "SIGN", "SIN", "SINH", "SKEW", "SKEW.P", "SLN", "SLOPE", "SMALL", "SQL.REQUEST", "SQRT", "SQRTPI", "STANDARDIZE", "STDEV", "STDEV.P", "STDEV.S", "STDEVA", "STDEVP", "STDEVPA", "STEYX", "SUBSTITUTE", "SUBTOTAL", "SUM", "SUMIF", "SUMIFS", "SUMPRODUCT", "SUMSQ", "SUMX2MY2", "SUMX2PY2", "SUMXMY2", "SWITCH", "SYD", "T", "TAN", "TANH", "TBILLEQ", "TBILLPRICE", "TBILLYIELD", "T.DIST", "T.DIST.2T", "T.DIST.RT", "TDIST", "TEXT", "TEXTJOIN", "TIME", "TIMEVALUE", "T.INV", "T.INV.2T", "TINV", "TODAY", "TRANSPOSE", "TREND", "TRIM", "TRIMMEAN", "TRUE|0", "TRUNC", "T.TEST", "TTEST", "TYPE", "UNICHAR", "UNICODE", "UPPER", "VALUE", "VAR", "VAR.P", "VAR.S", "VARA", "VARP", "VARPA", "VDB", "VLOOKUP", "WEBSERVICE", "WEEKDAY", "WEEKNUM", "WEIBULL", "WEIBULL.DIST", "WORKDAY", "WORKDAY.INTL", "XIRR", "XNPV", "XOR", "YEAR", "YEARFRAC", "YIELD", "YIELDDISC", "YIELDMAT", "Z.TEST", "ZTEST"]
      }, contains: [{ begin: /^=/, end: /[^=]/, returnEnd: !0, illegal: /=/, relevance: 10 }, {
        className: "symbol", begin: /\b[A-Z]{1,2}\d+\b/, end: /[^\d]/, excludeEnd: !0,
        relevance: 0
      }, {
        className: "symbol", begin: /[A-Z]{0,2}\d*:[A-Z]{0,2}\d*/, relevance: 0
      }, E.BACKSLASH_ESCAPE, E.QUOTE_STRING_MODE, {
        className: "number",
        begin: E.NUMBER_RE + "(%)?", relevance: 0
      }, E.COMMENT(/\/\//, /$/, { relevance: 0 }),
      E.COMMENT(/\bN\(/, /\)/, {
        excludeBegin: !0,
        excludeEnd: !0, illegal: /\n/
      })]
    })
  })(); hljs.registerLanguage("excel", E)
})();
// Javascript Language Syntax
(() => {
  var e = (() => {
    "use strict"
      ; const e = "[A-Za-z$_][0-9A-Za-z$_]*", n = ["as", "in", "of", "if", "for", "while", "finally", "var", "new", "function", "do", "return", "void", "else", "break", "catch", "instanceof", "with", "throw", "case", "default", "try", "switch", "continue", "typeof", "delete", "let", "yield", "const", "class", "debugger", "async", "await", "static", "import", "from", "export", "extends"], a = ["true", "false", "null", "undefined", "NaN", "Infinity"], t = ["Object", "Function", "Boolean", "Symbol", "Math", "Date", "Number", "BigInt", "String", "RegExp", "Array", "Float32Array", "Float64Array", "Int8Array", "Uint8Array", "Uint8ClampedArray", "Int16Array", "Int32Array", "Uint16Array", "Uint32Array", "BigInt64Array", "BigUint64Array", "Set", "Map", "WeakSet", "WeakMap", "ArrayBuffer", "SharedArrayBuffer", "Atomics", "DataView", "JSON", "Promise", "Generator", "GeneratorFunction", "AsyncFunction", "Reflect", "Proxy", "Intl", "WebAssembly"], s = ["Error", "EvalError", "InternalError", "RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError"], r = ["setInterval", "setTimeout", "clearInterval", "clearTimeout", "require", "exports", "eval", "isFinite", "isNaN", "parseFloat", "parseInt", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "escape", "unescape"], c = ["arguments", "this", "super", "console", "window", "document", "localStorage", "sessionStorage", "module", "global"], i = [].concat(r, t, s)
      ; return o => {
        const l = o.regex, b = e, d = {
          begin: /<[A-Za-z0-9\\._:-]+/,
          end: /\/[A-Za-z0-9\\._:-]+>|\/>/, isTrulyOpeningTag: (e, n) => {
            const a = e[0].length + e.index, t = e.input[a]
              ; if ("<" === t || "," === t) return void n.ignoreMatch(); let s
              ; ">" === t && (((e, { after: n }) => {
                const a = "</" + e[0].slice(1)
                  ; return -1 !== e.input.indexOf(a, n)
              })(e, { after: a }) || n.ignoreMatch())
              ; const r = e.input.substring(a)
              ; ((s = r.match(/^\s*=/)) || (s = r.match(/^\s+extends\s+/)) && 0 === s.index) && n.ignoreMatch()
          }
        }, g = {
          $pattern: e, keyword: n, literal: a, built_in: i, "variable.language": c
        }, u = "[0-9](_?[0-9])*", m = `\\.(${u})`, E = "0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*", A = {
          className: "number", variants: [{
            begin: `(\\b(${E})((${m})|\\.)?|(${m}))[eE][+-]?(${u})\\b`
          }, {
            begin: `\\b(${E})\\b((${m})\\b|\\.)?|(${m})\\b`
          }, {
            begin: "\\b(0|[1-9](_?[0-9])*)n\\b"
          }, {
            begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"
          }, {
            begin: "\\b0[bB][0-1](_?[0-1])*n?\\b"
          }, { begin: "\\b0[oO][0-7](_?[0-7])*n?\\b" }, {
            begin: "\\b0[0-7]+n?\\b"
          }], relevance: 0
        }, y = {
          className: "subst", begin: "\\$\\{",
          end: "\\}", keywords: g, contains: []
        }, h = {
          begin: ".?html`", end: "", starts: {
            end: "`",
            returnEnd: !1, contains: [o.BACKSLASH_ESCAPE, y], subLanguage: "xml"
          }
        }, N = {
          begin: ".?css`", end: "", starts: {
            end: "`", returnEnd: !1,
            contains: [o.BACKSLASH_ESCAPE, y], subLanguage: "css"
          }
        }, _ = {
          begin: ".?gql`", end: "",
          starts: {
            end: "`", returnEnd: !1, contains: [o.BACKSLASH_ESCAPE, y],
            subLanguage: "graphql"
          }
        }, f = {
          className: "string", begin: "`", end: "`",
          contains: [o.BACKSLASH_ESCAPE, y]
        }, p = {
          className: "comment",
          variants: [o.COMMENT(/\/\*\*(?!\/)/, "\\*/", {
            relevance: 0, contains: [{
              begin: "(?=@[A-Za-z]+)", relevance: 0, contains: [{
                className: "doctag",
                begin: "@[A-Za-z]+"
              }, {
                className: "type", begin: "\\{", end: "\\}", excludeEnd: !0,
                excludeBegin: !0, relevance: 0
              }, {
                className: "variable", begin: b + "(?=\\s*(-)|$)",
                endsParent: !0, relevance: 0
              }, { begin: /(?=[^\n])\s/, relevance: 0 }]
            }]
          }), o.C_BLOCK_COMMENT_MODE, o.C_LINE_COMMENT_MODE]
        }, v = [o.APOS_STRING_MODE, o.QUOTE_STRING_MODE, h, N, _, f, { match: /\$\d+/ }, A]
          ; y.contains = v.concat({
            begin: /\{/, end: /\}/, keywords: g, contains: ["self"].concat(v)
          }); const S = [].concat(p, y.contains), w = S.concat([{
            begin: /(\s*)\(/, end: /\)/,
            keywords: g, contains: ["self"].concat(S)
          }]), R = {
            className: "params", begin: /(\s*)\(/,
            end: /\)/, excludeBegin: !0, excludeEnd: !0, keywords: g, contains: w
          }, O = {
            variants: [{
              match: [/class/, /\s+/, b, /\s+/, /extends/, /\s+/, l.concat(b, "(", l.concat(/\./, b), ")*")],
              scope: { 1: "keyword", 3: "title.class", 5: "keyword", 7: "title.class.inherited" }
            }, {
              match: [/class/, /\s+/, b], scope: { 1: "keyword", 3: "title.class" }
            }]
          }, k = {
            relevance: 0,
            match: l.either(/\bJSON/, /\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/, /\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/, /\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),
            className: "title.class", keywords: { _: [...t, ...s] }
          }, I = {
            variants: [{
              match: [/function/, /\s+/, b, /(?=\s*\()/]
            }, { match: [/function/, /\s*(?=\()/] }],
            className: { 1: "keyword", 3: "title.function" }, label: "func.def", contains: [R],
            illegal: /%/
          }, x = {
            match: l.concat(/\b/, (T = [...r, "super", "import"].map((e => e + "\\s*\\(")),
              l.concat("(?!", T.join("|"), ")")), b, l.lookahead(/\s*\(/)),
            className: "title.function", relevance: 0
          }; var T; const C = {
            begin: l.concat(/\./, l.lookahead(l.concat(b, /(?![0-9A-Za-z$_(])/))), end: b,
            excludeBegin: !0, keywords: "prototype", className: "property", relevance: 0
          }, M = {
            match: [/get|set/, /\s+/, b, /(?=\()/], className: { 1: "keyword", 3: "title.function" },
            contains: [{ begin: /\(\)/ }, R]
          }, B = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + o.UNDERSCORE_IDENT_RE + ")\\s*=>", $ = {
            match: [/const|var|let/, /\s+/, b, /\s*/, /=\s*/, /(async\s*)?/, l.lookahead(B)],
            keywords: "async", className: { 1: "keyword", 3: "title.function" }, contains: [R]
          }
          ; return {
            name: "JavaScript", aliases: ["js", "jsx", "mjs", "cjs"], keywords: g, exports: {
              PARAMS_CONTAINS: w, CLASS_REFERENCE: k
            }, illegal: /#(?![$_A-z])/,
            contains: [o.SHEBANG({ label: "shebang", binary: "node", relevance: 5 }), {
              label: "use_strict", className: "meta", relevance: 10,
              begin: /^\s*['"]use (strict|asm)['"]/
            }, o.APOS_STRING_MODE, o.QUOTE_STRING_MODE, h, N, _, f, p, { match: /\$\d+/ }, A, k, {
              className: "attr", begin: b + l.lookahead(":"), relevance: 0
            }, $, {
              begin: "(" + o.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
              keywords: "return throw case", relevance: 0, contains: [p, o.REGEXP_MODE, {
                className: "function", begin: B, returnBegin: !0, end: "\\s*=>", contains: [{
                  className: "params", variants: [{ begin: o.UNDERSCORE_IDENT_RE, relevance: 0 }, {
                    className: null, begin: /\(\s*\)/, skip: !0
                  }, {
                    begin: /(\s*)\(/, end: /\)/,
                    excludeBegin: !0, excludeEnd: !0, keywords: g, contains: w
                  }]
                }]
              }, {
                  begin: /,/, relevance: 0
                }, { match: /\s+/, relevance: 0 }, {
                  variants: [{ begin: "<>", end: "</>" }, {
                    match: /<[A-Za-z0-9\\._:-]+\s*\/>/
                  }, {
                    begin: d.begin,
                    "on:begin": d.isTrulyOpeningTag, end: d.end
                  }], subLanguage: "xml", contains: [{
                    begin: d.begin, end: d.end, skip: !0, contains: ["self"]
                  }]
                }]
            }, I, {
              beginKeywords: "while if switch catch for"
            }, {
              begin: "\\b(?!function)" + o.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",
              returnBegin: !0, label: "func.def", contains: [R, o.inherit(o.TITLE_MODE, {
                begin: b,
                className: "title.function"
              })]
            }, { match: /\.\.\./, relevance: 0 }, C, {
              match: "\\$" + b,
              relevance: 0
            }, {
              match: [/\bconstructor(?=\s*\()/], className: { 1: "title.function" },
              contains: [R]
            }, x, {
              relevance: 0, match: /\b[A-Z][A-Z_0-9]+\b/,
              className: "variable.constant"
            }, O, M, { match: /\$[(.]/ }]
          }
      }
  })()
    ; hljs.registerLanguage("javascript", e)
})();
// JSON Language Syntax
(() => {
  var e = (() => {
    "use strict"; return e => {
      const a = ["true", "false", "null"], s = {
        scope: "literal", beginKeywords: a.join(" ")
      }; return {
        name: "JSON", aliases: ["jsonc"],
        keywords: { literal: a }, contains: [{
          className: "attr",
          begin: /"(\\.|[^\\"\r\n])*"(?=\s*:)/, relevance: 1.01
        }, {
          match: /[{}[\],:]/,
          className: "punctuation", relevance: 0
        }, e.QUOTE_STRING_MODE, s, e.C_NUMBER_MODE, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE],
        illegal: "\\S"
      }
    }
  })(); hljs.registerLanguage("json", e)
})();
// Markdown Language Syntax
(() => {
  var e = (() => {
    "use strict"; return e => {
      const n = {
        begin: /<\/?[A-Za-z_]/,
        end: ">", subLanguage: "xml", relevance: 0
      }, a = {
        variants: [{
          begin: /\[.+?\]\[.*?\]/,
          relevance: 0
        }, {
          begin: /\[.+?\]\(((data|javascript|mailto):|(?:http|ftp)s?:\/\/).*?\)/,
          relevance: 2
        }, {
          begin: e.regex.concat(/\[.+?\]\(/, /[A-Za-z][A-Za-z0-9+.-]*/, /:\/\/.*?\)/),
          relevance: 2
        }, { begin: /\[.+?\]\([./?&#].*?\)/, relevance: 1 }, {
          begin: /\[.*?\]\(.*?\)/, relevance: 0
        }], returnBegin: !0, contains: [{
          match: /\[(?=\])/
        }, {
          className: "string", relevance: 0, begin: "\\[", end: "\\]", excludeBegin: !0,
          returnEnd: !0
        }, {
          className: "link", relevance: 0, begin: "\\]\\(", end: "\\)",
          excludeBegin: !0, excludeEnd: !0
        }, {
          className: "symbol", relevance: 0, begin: "\\]\\[",
          end: "\\]", excludeBegin: !0, excludeEnd: !0
        }]
      }, i = {
        className: "strong", contains: [],
        variants: [{ begin: /_{2}(?!\s)/, end: /_{2}/ }, { begin: /\*{2}(?!\s)/, end: /\*{2}/ }]
      }, s = {
        className: "emphasis", contains: [], variants: [{ begin: /\*(?![*\s])/, end: /\*/ }, {
          begin: /_(?![_\s])/, end: /_/, relevance: 0
        }]
      }, c = e.inherit(i, {
        contains: []
      }), t = e.inherit(s, { contains: [] }); i.contains.push(t), s.contains.push(c)
        ; let g = [n, a]; return [i, s, c, t].forEach((e => {
          e.contains = e.contains.concat(g)
        })), g = g.concat(i, s), {
          name: "Markdown", aliases: ["md", "mkdown", "mkd"], contains: [{
            className: "section", variants: [{ begin: "^#{1,6}", end: "$", contains: g }, {
              begin: "(?=^.+?\\n[=-]{2,}$)", contains: [{ begin: "^[=-]*$" }, {
                begin: "^", end: "\\n",
                contains: g
              }]
            }]
          }, n, {
            className: "bullet", begin: "^[ \t]*([*+-]|(\\d+\\.))(?=\\s+)",
            end: "\\s+", excludeEnd: !0
          }, i, s, {
            className: "quote", begin: "^>\\s+", contains: g,
            end: "$"
          }, {
            className: "code", variants: [{ begin: "(`{3,})[^`](.|\\n)*?\\1`*[ ]*" }, {
              begin: "(~{3,})[^~](.|\\n)*?\\1~*[ ]*"
            }, { begin: "```", end: "```+[ ]*$" }, {
              begin: "~~~", end: "~~~+[ ]*$"
            }, { begin: "`.+?`" }, {
              begin: "(?=^( {4}|\\t))",
              contains: [{ begin: "^( {4}|\\t)", end: "(\\n)$" }], relevance: 0
            }]
          }, {
            begin: "^[-\\*]{3,}", end: "$"
          }, a, {
            begin: /^\[[^\n]+\]:/, returnBegin: !0, contains: [{
              className: "symbol", begin: /\[/, end: /\]/, excludeBegin: !0, excludeEnd: !0
            }, {
              className: "link", begin: /:\s*/, end: /$/, excludeBegin: !0
            }]
          }, {
            scope: "literal",
            match: /&([a-zA-Z0-9]+|#[0-9]{1,7}|#[Xx][0-9a-fA-F]{1,6});/
          }]
        }
    }
  })()
    ; hljs.registerLanguage("markdown", e)
})();
// Plain Text Language Syntax
(() => {
  var t = (() => {
    "use strict"; return t => ({
      name: "Plain text",
      aliases: ["text", "txt"], disableAutodetect: !0
    })
  })()
    ; hljs.registerLanguage("plaintext", t)
})();
// Python Language Syntax
(() => {
  var e = (() => {
    "use strict"; return e => {
      const n = e.regex, a = /[\p{XID_Start}_]\p{XID_Continue}*/u, s = ["and", "as", "assert", "async", "await", "break", "case", "class", "continue", "def", "del", "elif", "else", "except", "finally", "for", "from", "global", "if", "import", "in", "is", "lambda", "match", "nonlocal|10", "not", "or", "pass", "raise", "return", "try", "while", "with", "yield"], t = {
        $pattern: /[A-Za-z]\w+|__\w+__/, keyword: s,
        built_in: ["__import__", "abs", "all", "any", "ascii", "bin", "bool", "breakpoint", "bytearray", "bytes", "callable", "chr", "classmethod", "compile", "complex", "delattr", "dict", "dir", "divmod", "enumerate", "eval", "exec", "filter", "float", "format", "frozenset", "getattr", "globals", "hasattr", "hash", "help", "hex", "id", "input", "int", "isinstance", "issubclass", "iter", "len", "list", "locals", "map", "max", "memoryview", "min", "next", "object", "oct", "open", "ord", "pow", "print", "property", "range", "repr", "reversed", "round", "set", "setattr", "slice", "sorted", "staticmethod", "str", "sum", "super", "tuple", "type", "vars", "zip"],
        literal: ["__debug__", "Ellipsis", "False", "None", "NotImplemented", "True"],
        type: ["Any", "Callable", "Coroutine", "Dict", "List", "Literal", "Generic", "Optional", "Sequence", "Set", "Tuple", "Type", "Union"]
      }, i = { className: "meta", begin: /^(>>>|\.\.\.) / }, r = {
        className: "subst", begin: /\{/,
        end: /\}/, keywords: t, illegal: /#/
      }, l = { begin: /\{\{/, relevance: 0 }, o = {
        className: "string", contains: [e.BACKSLASH_ESCAPE], variants: [{
          begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?'''/, end: /'''/,
          contains: [e.BACKSLASH_ESCAPE, i], relevance: 10
        }, {
          begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?"""/, end: /"""/,
          contains: [e.BACKSLASH_ESCAPE, i], relevance: 10
        }, {
          begin: /([fF][rR]|[rR][fF]|[fF])'''/, end: /'''/,
          contains: [e.BACKSLASH_ESCAPE, i, l, r]
        }, {
          begin: /([fF][rR]|[rR][fF]|[fF])"""/,
          end: /"""/, contains: [e.BACKSLASH_ESCAPE, i, l, r]
        }, {
          begin: /([uU]|[rR])'/, end: /'/,
          relevance: 10
        }, { begin: /([uU]|[rR])"/, end: /"/, relevance: 10 }, {
          begin: /([bB]|[bB][rR]|[rR][bB])'/, end: /'/
        }, {
          begin: /([bB]|[bB][rR]|[rR][bB])"/,
          end: /"/
        }, {
          begin: /([fF][rR]|[rR][fF]|[fF])'/, end: /'/,
          contains: [e.BACKSLASH_ESCAPE, l, r]
        }, {
          begin: /([fF][rR]|[rR][fF]|[fF])"/, end: /"/,
          contains: [e.BACKSLASH_ESCAPE, l, r]
        }, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE]
      }, b = "[0-9](_?[0-9])*", c = `(\\b(${b}))?\\.(${b})|\\b(${b})\\.`, d = "\\b|" + s.join("|"), g = {
        className: "number", relevance: 0, variants: [{
          begin: `(\\b(${b})|(${c}))[eE][+-]?(${b})[jJ]?(?=${d})`
        }, { begin: `(${c})[jJ]?` }, {
          begin: `\\b([1-9](_?[0-9])*|0+(_?0)*)[lLjJ]?(?=${d})`
        }, {
          begin: `\\b0[bB](_?[01])+[lL]?(?=${d})`
        }, {
          begin: `\\b0[oO](_?[0-7])+[lL]?(?=${d})`
        }, { begin: `\\b0[xX](_?[0-9a-fA-F])+[lL]?(?=${d})` }, {
          begin: `\\b(${b})[jJ](?=${d})`
        }]
      }, p = {
        className: "comment", begin: n.lookahead(/# type:/), end: /$/, keywords: t,
        contains: [{ begin: /# type:/ }, { begin: /#/, end: /\b\B/, endsWithParent: !0 }]
      }, m = {
        className: "params", variants: [{ className: "", begin: /\(\s*\)/, skip: !0 }, {
          begin: /\(/,
          end: /\)/, excludeBegin: !0, excludeEnd: !0, keywords: t,
          contains: ["self", i, g, o, e.HASH_COMMENT_MODE]
        }]
      }; return r.contains = [o, g, i], {
        name: "Python", aliases: ["py", "gyp", "ipython"], unicodeRegex: !0, keywords: t,
        illegal: /(<\/|\?)|=>/, contains: [i, g, {
          scope: "variable.language", match: /\bself\b/
        }, { beginKeywords: "if", relevance: 0 }, {
            match: /\bor\b/, scope: "keyword"
          }, o, p, e.HASH_COMMENT_MODE, {
            match: [/\bdef/, /\s+/, a], scope: {
              1: "keyword",
              3: "title.function"
            }, contains: [m]
          }, {
            variants: [{
              match: [/\bclass/, /\s+/, a, /\s*/, /\(\s*/, a, /\s*\)/]
            }, { match: [/\bclass/, /\s+/, a] }],
            scope: { 1: "keyword", 3: "title.class", 6: "title.class.inherited" }
          }, {
            className: "meta", begin: /^[\t ]*@/, end: /(?=#)|$/, contains: [g, m, o]
          }]
      }
    }
  })()
    ; hljs.registerLanguage("python", e)
})();
// R Language Syntax
(() => {
  var e = (() => {
    "use strict"; return e => {
      const a = e.regex, n = /(?:(?:[a-zA-Z]|\.[._a-zA-Z])[._a-zA-Z0-9]*)|\.(?!\d)/, i = a.either(/0[xX][0-9a-fA-F]+\.[0-9a-fA-F]*[pP][+-]?\d+i?/, /0[xX][0-9a-fA-F]+(?:[pP][+-]?\d+)?[Li]?/, /(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?[Li]?/), s = /[=!<>:]=|\|\||&&|:::?|<-|<<-|->>|->|\|>|[-+*\/?!$&|:<=>@^~]|\*\*/, t = a.either(/[()]/, /[{}]/, /\[\[/, /[[\]]/, /\\/, /,/)
        ; return {
          name: "R", keywords: {
            $pattern: n,
            keyword: "function if in break next repeat else for while",
            literal: "NULL NA TRUE FALSE Inf NaN NA_integer_|10 NA_real_|10 NA_character_|10 NA_complex_|10",
            built_in: "LETTERS letters month.abb month.name pi T F abs acos acosh all any anyNA Arg as.call as.character as.complex as.double as.environment as.integer as.logical as.null.default as.numeric as.raw asin asinh atan atanh attr attributes baseenv browser c call ceiling class Conj cos cosh cospi cummax cummin cumprod cumsum digamma dim dimnames emptyenv exp expression floor forceAndCall gamma gc.time globalenv Im interactive invisible is.array is.atomic is.call is.character is.complex is.double is.environment is.expression is.finite is.function is.infinite is.integer is.language is.list is.logical is.matrix is.na is.name is.nan is.null is.numeric is.object is.pairlist is.raw is.recursive is.single is.symbol lazyLoadDBfetch length lgamma list log max min missing Mod names nargs nzchar oldClass on.exit pos.to.env proc.time prod quote range Re rep retracemem return round seq_along seq_len seq.int sign signif sin sinh sinpi sqrt standardGeneric substitute sum switch tan tanh tanpi tracemem trigamma trunc unclass untracemem UseMethod xtfrm"
          }, contains: [e.COMMENT(/#'/, /$/, {
            contains: [{
              scope: "doctag", match: /@examples/,
              starts: {
                end: a.lookahead(a.either(/\n^#'\s*(?=@[a-zA-Z]+)/, /\n^(?!#')/)),
                endsParent: !0
              }
            }, {
              scope: "doctag", begin: "@param", end: /$/, contains: [{
                scope: "variable", variants: [{ match: n }, { match: /`(?:\\.|[^`\\])+`/ }], endsParent: !0
              }]
            }, { scope: "doctag", match: /@[a-zA-Z]+/ }, { scope: "keyword", match: /\\[a-zA-Z]+/ }]
          }), e.HASH_COMMENT_MODE, {
            scope: "string", contains: [e.BACKSLASH_ESCAPE],
            variants: [e.END_SAME_AS_BEGIN({
              begin: /[rR]"(-*)\(/, end: /\)(-*)"/
            }), e.END_SAME_AS_BEGIN({
              begin: /[rR]"(-*)\{/, end: /\}(-*)"/
            }), e.END_SAME_AS_BEGIN({
              begin: /[rR]"(-*)\[/, end: /\](-*)"/
            }), e.END_SAME_AS_BEGIN({
              begin: /[rR]'(-*)\(/, end: /\)(-*)'/
            }), e.END_SAME_AS_BEGIN({
              begin: /[rR]'(-*)\{/, end: /\}(-*)'/
            }), e.END_SAME_AS_BEGIN({ begin: /[rR]'(-*)\[/, end: /\](-*)'/ }), {
              begin: '"', end: '"',
              relevance: 0
            }, { begin: "'", end: "'", relevance: 0 }]
          }, {
            relevance: 0, variants: [{
              scope: {
                1: "operator", 2: "number"
              }, match: [s, i]
            }, {
              scope: { 1: "operator", 2: "number" },
              match: [/%[^%]*%/, i]
            }, { scope: { 1: "punctuation", 2: "number" }, match: [t, i] }, {
              scope: {
                2: "number"
              }, match: [/[^a-zA-Z0-9._]|^/, i]
            }]
          }, {
            scope: { 3: "operator" },
            match: [n, /\s+/, /<-/, /\s+/]
          }, {
            scope: "operator", relevance: 0, variants: [{ match: s }, {
              match: /%[^%]*%/
            }]
          }, { scope: "punctuation", relevance: 0, match: t }, {
            begin: "`", end: "`",
            contains: [{ begin: /\\./ }]
          }]
        }
    }
  })(); hljs.registerLanguage("r", e)
})();
// SQL Language Syntax
(() => {
  var e = (() => {
    "use strict"; return e => {
      const r = e.regex, t = e.COMMENT("--", "$"), n = ["true", "false", "unknown"], a = ["bigint", "binary", "blob", "boolean", "char", "character", "clob", "date", "dec", "decfloat", "decimal", "float", "int", "integer", "interval", "nchar", "nclob", "national", "numeric", "real", "row", "smallint", "time", "timestamp", "varchar", "varying", "varbinary"], i = ["abs", "acos", "array_agg", "asin", "atan", "avg", "cast", "ceil", "ceiling", "coalesce", "corr", "cos", "cosh", "count", "covar_pop", "covar_samp", "cume_dist", "dense_rank", "deref", "element", "exp", "extract", "first_value", "floor", "json_array", "json_arrayagg", "json_exists", "json_object", "json_objectagg", "json_query", "json_table", "json_table_primitive", "json_value", "lag", "last_value", "lead", "listagg", "ln", "log", "log10", "lower", "max", "min", "mod", "nth_value", "ntile", "nullif", "percent_rank", "percentile_cont", "percentile_disc", "position", "position_regex", "power", "rank", "regr_avgx", "regr_avgy", "regr_count", "regr_intercept", "regr_r2", "regr_slope", "regr_sxx", "regr_sxy", "regr_syy", "row_number", "sin", "sinh", "sqrt", "stddev_pop", "stddev_samp", "substring", "substring_regex", "sum", "tan", "tanh", "translate", "translate_regex", "treat", "trim", "trim_array", "unnest", "upper", "value_of", "var_pop", "var_samp", "width_bucket"], s = ["create table", "insert into", "primary key", "foreign key", "not null", "alter table", "add constraint", "grouping sets", "on overflow", "character set", "respect nulls", "ignore nulls", "nulls first", "nulls last", "depth first", "breadth first"], o = i, c = ["abs", "acos", "all", "allocate", "alter", "and", "any", "are", "array", "array_agg", "array_max_cardinality", "as", "asensitive", "asin", "asymmetric", "at", "atan", "atomic", "authorization", "avg", "begin", "begin_frame", "begin_partition", "between", "bigint", "binary", "blob", "boolean", "both", "by", "call", "called", "cardinality", "cascaded", "case", "cast", "ceil", "ceiling", "char", "char_length", "character", "character_length", "check", "classifier", "clob", "close", "coalesce", "collate", "collect", "column", "commit", "condition", "connect", "constraint", "contains", "convert", "copy", "corr", "corresponding", "cos", "cosh", "count", "covar_pop", "covar_samp", "create", "cross", "cube", "cume_dist", "current", "current_catalog", "current_date", "current_default_transform_group", "current_path", "current_role", "current_row", "current_schema", "current_time", "current_timestamp", "current_path", "current_role", "current_transform_group_for_type", "current_user", "cursor", "cycle", "date", "day", "deallocate", "dec", "decimal", "decfloat", "declare", "default", "define", "delete", "dense_rank", "deref", "describe", "deterministic", "disconnect", "distinct", "double", "drop", "dynamic", "each", "element", "else", "empty", "end", "end_frame", "end_partition", "end-exec", "equals", "escape", "every", "except", "exec", "execute", "exists", "exp", "external", "extract", "false", "fetch", "filter", "first_value", "float", "floor", "for", "foreign", "frame_row", "free", "from", "full", "function", "fusion", "get", "global", "grant", "group", "grouping", "groups", "having", "hold", "hour", "identity", "in", "indicator", "initial", "inner", "inout", "insensitive", "insert", "int", "integer", "intersect", "intersection", "interval", "into", "is", "join", "json_array", "json_arrayagg", "json_exists", "json_object", "json_objectagg", "json_query", "json_table", "json_table_primitive", "json_value", "lag", "language", "large", "last_value", "lateral", "lead", "leading", "left", "like", "like_regex", "listagg", "ln", "local", "localtime", "localtimestamp", "log", "log10", "lower", "match", "match_number", "match_recognize", "matches", "max", "member", "merge", "method", "min", "minute", "mod", "modifies", "module", "month", "multiset", "national", "natural", "nchar", "nclob", "new", "no", "none", "normalize", "not", "nth_value", "ntile", "null", "nullif", "numeric", "octet_length", "occurrences_regex", "of", "offset", "old", "omit", "on", "one", "only", "open", "or", "order", "out", "outer", "over", "overlaps", "overlay", "parameter", "partition", "pattern", "per", "percent", "percent_rank", "percentile_cont", "percentile_disc", "period", "portion", "position", "position_regex", "power", "precedes", "precision", "prepare", "primary", "procedure", "ptf", "range", "rank", "reads", "real", "recursive", "ref", "references", "referencing", "regr_avgx", "regr_avgy", "regr_count", "regr_intercept", "regr_r2", "regr_slope", "regr_sxx", "regr_sxy", "regr_syy", "release", "result", "return", "returns", "revoke", "right", "rollback", "rollup", "row", "row_number", "rows", "running", "savepoint", "scope", "scroll", "search", "second", "seek", "select", "sensitive", "session_user", "set", "show", "similar", "sin", "sinh", "skip", "smallint", "some", "specific", "specifictype", "sql", "sqlexception", "sqlstate", "sqlwarning", "sqrt", "start", "static", "stddev_pop", "stddev_samp", "submultiset", "subset", "substring", "substring_regex", "succeeds", "sum", "symmetric", "system", "system_time", "system_user", "table", "tablesample", "tan", "tanh", "then", "time", "timestamp", "timezone_hour", "timezone_minute", "to", "trailing", "translate", "translate_regex", "translation", "treat", "trigger", "trim", "trim_array", "true", "truncate", "uescape", "union", "unique", "unknown", "unnest", "update", "upper", "user", "using", "value", "values", "value_of", "var_pop", "var_samp", "varbinary", "varchar", "varying", "versioning", "when", "whenever", "where", "width_bucket", "window", "with", "within", "without", "year", "add", "asc", "collation", "desc", "limit", "final", "first", "last", "view"].filter((e => !i.includes(e))), l = {
        begin: r.concat(/\b/, r.either(...o), /\s*\(/), relevance: 0, keywords: { built_in: o }
      }
        ; return {
          name: "SQL", case_insensitive: !0, illegal: /[{}]|<\//, keywords: {
            $pattern: /\b[\w\.]+/, keyword: ((e, { exceptions: r, when: t } = {}) => {
              const n = t
                ; return r = r || [], e.map((e => e.match(/\|\d+$/) || r.includes(e) ? e : n(e) ? e + "|0" : e))
            })(c, { when: e => e.length < 3 }), literal: n, type: a,
            built_in: ["current_catalog", "current_date", "current_default_transform_group", "current_path", "current_role", "current_schema", "current_transform_group_for_type", "current_user", "session_user", "system_time", "strftime", "system_user", "current_time", "localtime", "current_timestamp", "localtimestamp"]
          }, contains: [{
            begin: r.either(...s), relevance: 0, keywords: {
              $pattern: /[\w\.]+/,
              keyword: c.concat(s), literal: n, type: a
            }
          }, {
            className: "type",
            begin: r.either("double precision", "large object", "with timezone", "without timezone")
          }, l, { className: "variable", begin: /@[a-z0-9][a-z0-9_]*/ }, {
            className: "string",
            variants: [{ begin: /'/, end: /'/, contains: [{ begin: /''/ }] }]
          }, {
            begin: /"/, end: /"/,
            contains: [{ begin: /""/ }]
          }, e.C_NUMBER_MODE, e.C_BLOCK_COMMENT_MODE, t, {
            className: "operator", begin: /[-+*/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?/,
            relevance: 0
          }]
        }
    }
  })(); hljs.registerLanguage("sql", e)
})();
// DAX Language Syntax
(() => {
  var dax = (() => {
    "use strict";
    return hljs => ({
      name: "DAX",
      case_insensitive: true,
      keywords: {
        $pattern: /\b[\w\.]+/,
        keyword: [
          "AXIS", "ROWS", "COLUMN", "DEFINE", "DENSIFY", "EVALUATE", "GROUP",
          "MEASURE", "MPARAMETER", "ORDER", "BY", "RETURN", "START", "AT", "TABLE",
          "TOTAL", "VAR", "WITH", "VISUAL", "SHAPE", "IN", "TRUE", "FALSE", "NOT",
          "ASC", "DESC", "SKIP", "DENSE", "BLANKS", "FIRST", "LAST", "WEEK", "BOTH",
          "NONE", "ONEWAY", "KEEP", "REL"
        ],
        built_in: [
          "ABS", "ACCRINT", "ACCRINTM", "ACOS", "ACOSH", "ACOT", "ACOTH", "ADDCOLUMNS", "ADDMISSINGITEMS", "ALL",
          "ALLCROSSFILTERED", "ALLEXCEPT", "ALLNOBLANKROW", "ALLSELECTED", "AMORDEGRC", "AMORLINC", "AND",
          "APPROXIMATEDISTINCTCOUNT", "ASIN", "ASINH", "ATAN", "ATANH", "AVERAGE", "AVERAGEA", "AVERAGEX",
          "BETA.DIST", "BETA.INV", "BITAND", "BITLSHIFT", "BITOR", "BITRSHIFT", "BITXOR", "BLANK", "CALCULATE",
          "CALCULATETABLE", "CALENDAR", "CALENDARAUTO", "CEILING", "CHISQ.DIST", "CHISQ.DIST.RT", "CHISQ.INV",
          "CHISQ.INV.RT", "CLOSINGBALANCEMONTH", "CLOSINGBALANCEQUARTER", "CLOSINGBALANCEYEAR", "COALESCE",
          "COLLAPSE", "COLLAPSEALL", "COLUMNSTATISTICS", "COMBIN", "COMBINA", "COMBINEVALUES", "CONCATENATE",
          "CONCATENATEX", "CONFIDENCE.NORM", "CONFIDENCE.T", "CONTAINS", "CONTAINSROW", "CONTAINSSTRING",
          "CONTAINSSTRINGEXACT", "CONVERT", "COS", "COSH", "COT", "COTH", "COUNT", "COUNTA", "COUNTAX",
          "COUNTBLANK", "COUNTROWS", "COUNTX", "COUPDAYBS", "COUPDAYS", "COUPDAYSNC", "COUPNCD", "COUPNUM",
          "COUPPCD", "CROSSFILTER", "CROSSJOIN", "CUMIPMT", "CUMPRINC", "CURRENCY", "CURRENTGROUP", "CUSTOMDATA",
          "DATATABLE", "DATE", "DATEADD", "DATEDIFF", "DATESBETWEEN", "DATESINPERIOD", "DATESMTD", "DATESQTD",
          "DATESYTD", "DATEVALUE", "DAY", "DB", "DDB", "DEGREES", "DETAILROWS", "DISC", "DISTINCT", "DISTINCTCOUNT",
          "DISTINCTCOUNTNOBLANK", "DIVIDE", "DOLLARDE", "DOLLARFR", "DURATION", "EARLIER", "EARLIEST", "EDATE",
          "EFFECT", "ENDOFMONTH", "ENDOFQUARTER", "ENDOFYEAR", "EOMONTH", "ERROR", "EVALUATEANDLOG", "EVEN",
          "EXACT", "EXCEPT", "EXP", "EXPAND", "EXPANDALL", "EXPON.DIST", "FACT", "FALSE", "FILTER", "FILTERS",
          "FIND", "FIRST", "FIRSTDATE", "FIRSTNONBLANK", "FIRSTNONBLANKVALUE", "FIXED", "FLOOR", "FORMAT", "FV",
          "GCD", "GENERATE", "GENERATEALL", "GENERATESERIES", "GEOMEAN", "GEOMEANX", "GROUPBY", "HASH",
          "HASONEFILTER", "HASONEVALUE", "HOUR", "IF", "IF.EAGER", "IFERROR", "IGNORE", "INDEX", "INT",
          "INTERSECT", "INTRATE", "IPMT", "ISAFTER", "ISATLEVEL", "ISBLANK", "ISCROSSFILTERED", "ISEMPTY",
          "ISERROR", "ISEVEN", "ISFILTERED", "ISINSCOPE", "ISLOGICAL", "ISNONTEXT", "ISNUMBER", "ISO.CEILING",
          "ISODD", "ISONORAFTER", "ISPMT", "ISSELECTEDMEASURE", "ISSUBTOTAL", "ISTEXT", "KEEPFILTERS",
          "KEYWORDMATCH", "LAST", "LASTDATE", "LASTNONBLANK", "LASTNONBLANKVALUE", "LCM", "LEFT", "LEN", "LINEST",
          "LINESTX", "LN", "LOG", "LOG10", "LOOKUP", "LOOKUPVALUE", "LOWER", "MATCHBY", "MAX", "MAXA", "MAXX",
          "MDURATION", "MEDIAN", "MEDIANX", "MID", "MIN", "MINA", "MINUTE", "MINX", "MOD", "MONTH", "MOVINGAVERAGE",
          "MROUND", "NAMEOF", "NATURALINNERJOIN", "NATURALLEFTOUTERJOIN", "NETWORKDAYS", "NEXT", "NEXTDAY",
          "NEXTMONTH", "NEXTQUARTER", "NEXTYEAR", "NOMINAL", "NONVISUAL", "NORM.DIST", "NORM.INV", "NORM.S.DIST",
          "NORM.S.INV", "NOT", "NOW", "NPER", "ODD", "ODDFPRICE", "ODDFYIELD", "ODDLPRICE", "ODDLYIELD", "OFFSET",
          "OPENINGBALANCEMONTH", "OPENINGBALANCEQUARTER", "OPENINGBALANCEYEAR", "OR", "ORDERBY", "PARALLELPERIOD",
          "PARTITIONBY", "PATH", "PATHCONTAINS", "PATHITEM", "PATHITEMREVERSE", "PATHLENGTH", "PDURATION",
          "PERCENTILE.EXC", "PERCENTILE.INC", "PERCENTILEX.EXC", "PERCENTILEX.INC", "PERMUT", "PI", "PMT",
          "POISSON.DIST", "POWER", "PPMT", "PREVIOUS", "PREVIOUSDAY", "PREVIOUSMONTH", "PREVIOUSQUARTER",
          "PREVIOUSYEAR", "PRICE", "PRICEDISC", "PRICEMAT", "PRODUCT", "PRODUCTX", "PV", "QUARTER", "QUOTIENT",
          "RADIANS", "RAND", "RANDBETWEEN", "RANGE", "RANK", "RANK.EQ", "RANKX", "RATE", "RECEIVED", "RELATED",
          "RELATEDTABLE", "REMOVEFILTERS", "REPLACE", "REPT", "RIGHT", "ROLLUP", "ROLLUPADDISSUBTOTAL", "ROLLUPGROUP",
          "ROLLUPISSUBTOTAL", "ROUND", "ROUNDDOWN", "ROUNDUP", "ROW", "ROWNUMBER", "RRI", "RUNNINGSUM",
          "SAMEPERIODLASTYEAR", "SAMPLE", "SAMPLEAXISWITHLOCALMINMAX", "SAMPLECARTESIANPOINTSBYCOVER", "SEARCH",
          "SECOND", "SELECTCOLUMNS", "SELECTEDMEASURE", "SELECTEDMEASUREFORMATSTRING", "SELECTEDMEASURENAME",
          "SELECTEDVALUE", "SIGN", "SIN", "SINH", "SLN", "SQRT", "SQRTPI", "STARTOFMONTH", "STARTOFQUARTER",
          "STARTOFYEAR", "STDEV.P", "STDEV.S", "STDEVX.P", "STDEVX.S", "SUBSTITUTE", "SUBSTITUTEWITHINDEX",
          "SUM", "SUMMARIZE", "SUMMARIZECOLUMNS", "SUMX", "SWITCH", "SYD", "T.DIST", "T.DIST.2T", "T.DIST.RT",
          "T.INV", "T.INV.2T", "TAN", "TANH", "TBILLEQ", "TBILLPRICE", "TBILLYIELD", "TIME", "TIMEVALUE",
          "TOCSV", "TODAY", "TOJSON", "TOPN", "TOPNPERLEVEL", "TOPNSKIP", "TOTALMTD", "TOTALQTD", "TOTALYTD",
          "TREATAS", "TRIM", "TRUE", "TRUNC", "UNICHAR", "UNICODE", "UNION", "UPPER", "USERCULTURE", "USERELATIONSHIP",
          "USERNAME", "USEROBJECTID", "USERPRINCIPALNAME", "UTCNOW", "UTCTODAY", "VALUE", "VALUES", "VAR.P", "VAR.S",
          "VARX.P", "VARX.S", "VDB", "WEEKDAY", "WEEKNUM", "WINDOW", "XIRR", "XNPV", "YEAR", "YEARFRAC", "YIELD",
          "YIELDDISC", "YIELDMAT"
        ],
        type: ["BINARY", "BOOLEAN", "CURRENCY", "DATETIME", "INTEGER", "STRING", "VARIANT"]
      },
      contains: [
        hljs.COMMENT(/(?:\/\/|\-\-)/, '$'),
        {
          className: 'string',
          begin: /"(?:[^"]|"")*"/ // (?!")  --> Negative Lookahead
        },
        {
          className: 'number',
          begin: /\b-?\d+(\.\d+)?\b/
        },
        {
          className: 'operator',
          begin: /[-+*/^]|==?|&&?|\|\||<(?:=>?|<|>)?|>[>=]?/
        },
        {
          className: 'punctuation',
          begin: /[;:()\[\]\{\},.]/
        },
        {
          className: 'entity',
          begin: /\[.+\]/
        }
      ]
    });
  })();
  hljs.registerLanguage("dax", dax);
})();
// M Language Syntax
(() => {
  var m = (() => {
    "use strict";
    return hljs => ({
      name: "M",
      case_insensitive: true,
      keywords: {
        $pattern: /\b[\w\.]+/,
        keyword: [
          "and", "as", "each", "else", "error", "false", "if", "in", "is", "let", "meta",
          "not", "nullable", "otherwise", "section", "shared", "then", "true", "try", "type",
          "type", "with", "section", "shared", "otherwise", "nullable", "not", "meta", "let",
          "is", "in", "if", "false", "error", "else", "each", "as", "and"
        ],
        built_in: [
          "Binary", "Date", "DateTime", "DateTimeZone", "Duration", "Function", "List",
          "Logical", "Number", "Record", "Table", "Text", "Time", "Type", "Value"
        ],
        literal: ["null"]
      },
      contains: [
        hljs.COMMENT('--', '$'),
        {
          className: 'string',
          begin: /"(?:[^"]|"")*"(?!")/
        },
        {
          className: 'number',
          begin: /\b-?\d+(\.\d+)?\b/
        },
        {
          className: 'operator',
          begin: /[-+*/^]|==?|&&?|\|\||<(?:=>?|<|>)?|>[>=]?/
        },
        {
          className: 'punctuation',
          begin: /[;:()\[\]\{\},.]/
        },
        {
          className: 'entity',
          begin: /\[.+\]/
        }
      ]
    });
  })();
  hljs.registerLanguage("m", m);
})();
// Excel VBA Language Syntax
(() => {
  var vba = (() => {
    "use strict";
    return hljs => ({
      name: "VBA",
      case_insensitive: true,
      keywords: {
        $pattern: /\b[\w\.]+/,
        keyword: [
          "Dim", "As", "Sub", "Function", "End", "If", "Then", "Else", "ElseIf", "For", "Each",
          "In", "Next", "While", "Do", "Loop", "Until", "Exit", "With", "Set", "Let", "Call",
          "Private", "Public", "Const", "ReDim", "On", "Error", "Resume", "GoTo", "Select",
          "Case", "Is", "True", "False", "Not", "And", "Or", "ByRef", "ByVal", "Optional",
          "New", "Nothing", "Me", "TypeOf", "String", "Double", "Long", "Variant", "Boolean", "Integer"
        ],
        built_in: [
          "Application", "ActiveWorkbook", "ActiveSheet", "Cells", "Range", "Worksheets",
          "Sheets", "ThisWorkbook", "MsgBox", "InputBox", "Debug", "Err", "CInt", "CLng",
          "CSng", "CStr", "Date", "Now", "Time", "Len", "Mid", "Left", "Right", "Trim", "LTrim",
          "RTrim", "Replace", "Split", "Join", "Instr", "UCase", "LCase", "IsEmpty", "IsNull",
          "IsNumeric", "Fix", "Int", "Abs", "Rnd", "Sqr", "Timer", "DoEvents"
        ],
        literal: ["Nothing", "Null", "True", "False", "Empty"]
      },
      contains: [
        hljs.COMMENT("'", "$"), // Single-line comment
        {
          className: "string",
          begin: /"(?:[^"]|"")*"(?!")/ // Handles double-quoted strings
        },
        {
          className: "number",
          begin: /\b-?\d+(\.\d+)?([eE][-+]?\d+)?\b/ // Matches integers, floats, and scientific notation
        },
        {
          className: "operator",
          begin: /[-+*/^=&<>]|<=|>=|<>/ // Matches VBA operators
        },
        {
          className: "punctuation",
          begin: /[();,]/ // Matches common VBA punctuation
        },
        {
          className: "entity",
          begin: /\b[A-Za-z_]\w*(?=\()/, // Matches function or procedure names followed by '('
          relevance: 0
        }
      ]
    });
  })();
  hljs.registerLanguage("vba", vba);
})();
// C# Language Syntax
(() => {
  var csharp = (() => {
    "use strict";
    return e => {
      const n = {
        keyword: [
          "abstract", "as", "base", "break", "case", "catch", "class", "const", "continue",
          "do", "else", "event", "explicit", "extern", "finally", "fixed", "for", "foreach",
          "goto", "if", "implicit", "in", "interface", "internal", "is", "lock", "namespace",
          "new", "operator", "out", "override", "params", "private", "protected", "public",
          "readonly", "record", "ref", "return", "sealed", "sizeof", "stackalloc", "static",
          "struct", "switch", "this", "throw", "try", "typeof", "unchecked", "unsafe",
          "using", "virtual", "void", "volatile", "while"
        ],
        built_in: [
          "bool", "byte", "char", "decimal", "delegate", "double", "dynamic", "enum", "float",
          "int", "long", "nint", "nuint", "object", "sbyte", "short", "string", "ulong",
          "uint", "ushort"
        ],
        literal: ["default", "false", "null", "true"]
      },
        a = e.inherit(e.TITLE_MODE, {
          begin: "[a-zA-Z](\\.?\\w)*"
        }),
        i = {
          className: "number",
          variants: [{
            begin: "\\b(0b[01']+)"
          }, {
            begin: "(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)(u|U|l|L|ul|UL|f|F|b|B)"
          }, {
            begin: "(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"
          }],
          relevance: 0
        },
        s = {
          className: "string",
          begin: '@"',
          end: '"',
          contains: [{
            begin: '""'
          }]
        },
        t = e.inherit(s, {
          illegal: /\n/
        }),
        r = {
          className: "subst",
          begin: /\{/,
          end: /\}/,
          keywords: n
        },
        l = e.inherit(r, {
          illegal: /\n/
        }),
        c = {
          className: "string",
          begin: /\$"/,
          end: '"',
          illegal: /\n/,
          contains: [{
            begin: /\{\{/
          }, {
            begin: /\}\}/
          }, e.BACKSLASH_ESCAPE, l]
        },
        o = {
          className: "string",
          begin: /\$@"/,
          end: '"',
          contains: [{
            begin: /\{\{/
          }, {
            begin: /\}\}/
          }, {
            begin: '""'
          }, r]
        },
        d = e.inherit(o, {
          illegal: /\n/,
          contains: [{
            begin: /\{\{/
          }, {
            begin: /\}\}/
          }, {
            begin: '""'
          }, l]
        });
      r.contains = [o, c, s, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, i, e.C_BLOCK_COMMENT_MODE],
        l.contains = [d, c, t, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, i, e.C_BLOCK_COMMENT_MODE];
      const g = {
        variants: [o, c, s, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE]
      },
        E = {
          begin: "<",
          end: ">",
          contains: [{
            beginKeywords: "in out"
          }, a]
        },
        _ = e.IDENT_RE + "(<" + e.IDENT_RE + "(\\s*,\\s*" + e.IDENT_RE + ")*>)?(\\[\\])?",
        b = {
          begin: "@" + e.IDENT_RE,
          relevance: 0
        };
      return {
        name: "C#",
        aliases: ["cs", "c#"],
        keywords: n,
        illegal: /::/,
        contains: [e.COMMENT("///", "$", {
          returnBegin: !0,
          contains: [{
            className: "doctag",
            variants: [{
              begin: "///",
              relevance: 0
            }, {
              begin: "\x3c!--|--\x3e"
            }, {
              begin: "</?",
              end: ">"
            }]
          }]
        }), e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, {
          className: "meta",
          begin: "#",
          end: "$",
          keywords: {
            "meta-keyword": "if else elif endif define undef warning error line region endregion pragma checksum"
          }
        }, g, i, {
          beginKeywords: "class interface",
          relevance: 0,
          end: /[{;=]/,
          illegal: /[^\s:,]/,
          contains: [{
            beginKeywords: "where class"
          }, a, E, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE]
        }, {
          beginKeywords: "namespace",
          relevance: 0,
          end: /[{;=]/,
          illegal: /[^\s:]/,
          contains: [a, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE]
        }, {
          beginKeywords: "record",
          relevance: 0,
          end: /[{;=]/,
          illegal: /[^\s:]/,
          contains: [a, E, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE]
        }, {
          className: "meta",
          begin: "^\\s*\\[",
          excludeBegin: !0,
          end: "\\]",
          excludeEnd: !0,
          contains: [{
            className: "meta-string",
            begin: /"/,
            end: /"/
          }]
        }, {
          beginKeywords: "new return throw await else",
          relevance: 0
        }, {
          className: "function",
          begin: "(" + _ + "\\s+)+" + e.IDENT_RE + "\\s*(<[^=]+>\\s*)?\\(",
          returnBegin: !0,
          end: /\s*[{;=]/,
          excludeEnd: !0,
          keywords: n,
          contains: [{
            beginKeywords: "public private protected static internal protected abstract async extern override unsafe virtual new sealed partial",
            relevance: 0
          }, {
            begin: e.IDENT_RE + "\\s*(<[^=]+>\\s*)?\\(",
            returnBegin: !0,
            contains: [e.TITLE_MODE, E],
            relevance: 0
          }, {
            className: "params",
            begin: /\(/,
            end: /\)/,
            excludeBegin: !0,
            excludeEnd: !0,
            keywords: n,
            relevance: 0,
            contains: [g, i, e.C_BLOCK_COMMENT_MODE]
          }, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE]
        }, b]
      }
    }
  })();
  hljs.registerLanguage("csharp", csharp);
})();