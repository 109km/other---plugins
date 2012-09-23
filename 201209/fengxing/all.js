var T, baidu = T = baidu || {
    version: "1.3.9"
};
baidu.guid = "$BAIDU$";
baidu.$$ = window[baidu.guid] = window[baidu.guid] || {
    global: {}
};
baidu.fn = baidu.fn || {};
baidu.fn.blank = function () {};
baidu.fn.bind = function (b, a) {
    var c = arguments.length > 2 ? [].slice.call(arguments, 2) : null;
    return function () {
        var e = baidu.lang.isString(b) ? a[b] : b,
            d = (c) ? c.concat([].slice.call(arguments, 0)) : arguments;
        return e.apply(a || e, d)
    }
};
baidu.array = baidu.array || {};
baidu.each = baidu.array.forEach = baidu.array.each = function (g, e, b) {
    var d, f, c, a = g.length;
    if ("function" == typeof e) {
        for (c = 0; c < a; c++) {
            f = g[c];
            d = e.call(b || g, f, c);
            if (d === false) {
                break
            }
        }
    }
    return g
};
baidu.array.filter = function (h, f, d) {
    var c = [],
        b = 0,
        a = h.length,
        g, e;
    if ("function" == typeof f) {
        for (e = 0; e < a; e++) {
            g = h[e];
            if (true === f.call(d || h, g, e)) {
                c[b++] = g
            }
        }
    }
    return c
};
baidu.array.indexOf = function (e, b, d) {
    var a = e.length,
        c = b;
    d = d | 0;
    if (d < 0) {
        d = Math.max(0, a + d)
    }
    for (; d < a; d++) {
        if (d in e && e[d] === b) {
            return d
        }
    }
    return -1
};
baidu.array.unique = function (e, f) {
    var b = e.length,
        a = e.slice(0),
        d, c;
    if ("function" != typeof f) {
        f = function (h, g) {
            return h === g
        }
    }
    while (--b > 0) {
        c = a[b];
        d = b;
        while (d--) {
            if (f(c, a[d])) {
                a.splice(b, 1);
                break
            }
        }
    }
    return a
};
baidu.array.remove = function (c, b) {
    var a = c.length;
    while (a--) {
        if (a in c && c[a] === b) {
            c.splice(a, 1)
        }
    }
    return c
};
baidu.array.removeAt = function (b, a) {
    return b.splice(a, 1)[0]
};
baidu.browser = baidu.browser || {};
baidu.ua = navigator.userAgent || "";
baidu.browser.firefox = /firefox\/(\d+\.\d+)/i.test(baidu.ua) ? +RegExp["\x241"] : undefined;
baidu.browser.ie = baidu.ie = /msie (\d+\.\d+)/i.test(baidu.ua) ? (document.documentMode || +RegExp["\x241"]) : undefined;
baidu.browser.ieTrue = baidu.ieTrue = /msie (\d+\.\d+)/i.test(baidu.ua) ? +RegExp["\x241"] : undefined;
baidu.browser.isGecko = /gecko/i.test(baidu.ua) && !/like gecko/i.test(baidu.ua);
baidu.browser.isStrict = document.compatMode == "CSS1Compat";
baidu.browser.isWebkit = /webkit/i.test(baidu.ua);
baidu.browser.opera = /opera(\/| )(\d+(\.\d+)?)(.+?(version\/(\d+(\.\d+)?)))?/i.test(baidu.ua) ? +(RegExp["\x246"] || RegExp["\x242"]) : undefined;
baidu.browser.safari = /(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(baidu.ua) && !/chrome/i.test(baidu.ua) ? +(RegExp["\x241"] || RegExp["\x242"]) : undefined;
baidu.platform = baidu.platform || {};
baidu.platform.isAndroid = /android/i.test(baidu.ua);
baidu.platform.isIpad = /ipad/i.test(baidu.ua);
baidu.platform.isIphone = /iphone/i.test(baidu.ua);
baidu.platform.isMacintosh = /macintosh/i.test(baidu.ua);
baidu.platform.isWindows = /windows/i.test(baidu.ua) || navigator.platform == "Win32" || navigator.platform == "Windows";
baidu.platform.isX11 = /x11/i.test(baidu.ua);
baidu.date = baidu.date || {};
baidu.number = baidu.number || {};
baidu.number.pad = function (d, c) {
    var e = "",
        b = (d < 0),
        a = String(Math.abs(d));
    if (a.length < c) {
        e = (new Array(c - a.length + 1)).join("0")
    }
    return (b ? "-" : "") + e + a
};
baidu.date.format = function (a, f) {
    if ("string" != typeof f) {
        return a.toString()
    }
    function d(l, k) {
        f = f.replace(l, k)
    }
    var b = baidu.number.pad,
        g = a.getFullYear(),
        e = a.getMonth() + 1,
        j = a.getDate(),
        h = a.getHours(),
        c = a.getMinutes(),
        i = a.getSeconds();
    d(/yyyy/g, b(g, 4));
    d(/yy/g, b(parseInt(g.toString().slice(2), 10), 2));
    d(/MM/g, b(e, 2));
    d(/M/g, e);
    d(/dd/g, b(j, 2));
    d(/d/g, j);
    d(/HH/g, b(h, 2));
    d(/H/g, h);
    d(/hh/g, b(h % 12, 2));
    d(/h/g, h % 12);
    d(/mm/g, b(c, 2));
    d(/m/g, c);
    d(/ss/g, b(i, 2));
    d(/s/g, i);
    return f
};
baidu.date.parse = function (c) {
    var a = new RegExp("^\\d+(\\-|\\/)\\d+(\\-|\\/)\\d+\x24");
    if ("string" == typeof c) {
        if (a.test(c) || isNaN(Date.parse(c))) {
            var f = c.split(/ |T/),
                b = f.length > 1 ? f[1].split(/[^\d]/) : [0, 0, 0],
                e = f[0].split(/[^\d]/);
            return new Date(e[0] - 0, e[1] - 1, e[2] - 0, b[0] - 0, b[1] - 0, b[2] - 0)
        } else {
            return new Date(c)
        }
    }
    return new Date()
};
baidu.dom = baidu.dom || {};
baidu.dom._NAME_ATTRS = (function () {
    var a = {
        cellpadding: "cellPadding",
        cellspacing: "cellSpacing",
        colspan: "colSpan",
        rowspan: "rowSpan",
        valign: "vAlign",
        usemap: "useMap",
        frameborder: "frameBorder"
    };
    if (baidu.browser.ie < 8) {
        a["for"] = "htmlFor";
        a["class"] = "className"
    } else {
        a.htmlFor = "for";
        a.className = "class"
    }
    return a
})();
baidu.lang = baidu.lang || {};
baidu.lang.isString = function (a) {
    return "[object String]" == Object.prototype.toString.call(a)
};
baidu.isString = baidu.lang.isString;
baidu.dom._g = function (a) {
    if (baidu.lang.isString(a)) {
        return document.getElementById(a)
    }
    return a
};
baidu._g = baidu.dom._g;
baidu.dom.g = function (a) {
    if (!a) {
        return null
    }
    if ("string" == typeof a || a instanceof String) {
        return document.getElementById(a)
    } else {
        if (a && a.nodeName && (a.nodeType == 1 || a.nodeType == 9)) {
            return a
        }
    }
    return null
};
baidu.get = baidu.g = baidu.G = baidu.dom.g;
baidu.dom._matchNode = function (a, c, d) {
    a = baidu.dom.g(a);
    for (var b = a[d]; b; b = b[c]) {
        if (b.nodeType == 1) {
            return b
        }
    }
    return null
};
baidu.dom._styleFilter = baidu.dom._styleFilter || [];
baidu.dom._styleFilter[baidu.dom._styleFilter.length] = {
    get: function (c, d) {
        if (/color/i.test(c) && d.indexOf("rgb(") != -1) {
            var e = d.split(",");
            d = "#";
            for (var b = 0, a; a = e[b]; b++) {
                a = parseInt(a.replace(/[^\d]/gi, ""), 10).toString(16);
                d += a.length == 1 ? "0" + a : a
            }
            d = d.toUpperCase()
        }
        return d
    }
};
baidu.dom._styleFilter.filter = function (b, e, f) {
    for (var a = 0, d = baidu.dom._styleFilter, c; c = d[a]; a++) {
        if (c = c[f]) {
            e = c(b, e)
        }
    }
    return e
};
baidu.dom._styleFilter[baidu.dom._styleFilter.length] = {
    set: function (a, b) {
        if (b.constructor == Number && !/zIndex|fontWeight|opacity|zoom|lineHeight/i.test(a)) {
            b = b + "px"
        }
        return b
    }
};
baidu.dom._styleFixer = baidu.dom._styleFixer || {};
baidu.dom._styleFixer.display = baidu.browser.ie && baidu.browser.ie < 8 ? {
    set: function (a, b) {
        a = a.style;
        if (b == "inline-block") {
            a.display = "inline";
            a.zoom = 1
        } else {
            a.display = b
        }
    }
} : baidu.browser.firefox && baidu.browser.firefox < 3 ? {
    set: function (a, b) {
        a.style.display = b == "inline-block" ? "-moz-inline-box" : b
    }
} : null;
baidu.dom._styleFixer["float"] = baidu.browser.ie ? "styleFloat" : "cssFloat";
baidu.dom.getAncestorByClass = function (a, b) {
    a = baidu.dom.g(a);
    b = new RegExp("(^|\\s)" + baidu.string.trim(b) + "(\\s|\x24)");
    while ((a = a.parentNode) && a.nodeType == 1) {
        if (b.test(a.className)) {
            return a
        }
    }
    return null
};
baidu.dom._styleFixer.opacity = baidu.browser.ie ? {
    get: function (a) {
        var b = a.style.filter;
        return b && b.indexOf("opacity=") >= 0 ? (parseFloat(b.match(/opacity=([^)]*)/)[1]) / 100) + "" : "1"
    },
    set: function (a, c) {
        var b = a.style;
        b.filter = (b.filter || "").replace(/alpha\([^\)]*\)/gi, "") + (c == 1 ? "" : "alpha(opacity=" + c * 100 + ")");
        b.zoom = 1
    }
} : null;
baidu.string = baidu.string || {};
(function () {
    var a = new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)", "g");
    baidu.string.trim = function (b) {
        return String(b).replace(a, "")
    }
})();
baidu.trim = baidu.string.trim;
baidu.string.stripTags = function (a) {
    return String(a || "").replace(/<[^>]+>/g, "")
};
baidu.dom.addClass = function (f, g) {
    f = baidu.dom.g(f);
    var b = g.split(/\s+/),
        a = f.className,
        e = " " + a + " ",
        d = 0,
        c = b.length;
    for (; d < c; d++) {
        if (e.indexOf(" " + b[d] + " ") < 0) {
            a += (a ? " " : "") + b[d]
        }
    }
    f.className = a;
    return f
};
baidu.addClass = baidu.dom.addClass;
baidu.dom.children = function (b) {
    b = baidu.dom.g(b);
    for (var a = [], c = b.firstChild; c; c = c.nextSibling) {
        if (c.nodeType == 1) {
            a.push(c)
        }
    }
    return a
};
baidu.dom.contains = function (a, b) {
    var c = baidu.dom._g;
    a = c(a);
    b = c(b);
    return a.contains ? a != b && a.contains(b) : !! (a.compareDocumentPosition(b) & 16)
};
baidu.dom.hasAttr = function (c, b) {
    c = baidu.g(c);
    var a = c.attributes.getNamedItem(b);
    return !!(a && a.specified)
};
baidu.dom.setAttr = function (b, a, c) {
    b = baidu.dom.g(b);
    if ("style" == a) {
        b.style.cssText = c
    } else {
        a = baidu.dom._NAME_ATTRS[a] || a;
        b.setAttribute(a, c)
    }
    return b
};
baidu.setAttr = baidu.dom.setAttr;
baidu.dom.setAttrs = function (c, a) {
    c = baidu.dom.g(c);
    for (var b in a) {
        baidu.dom.setAttr(c, b, a[b])
    }
    return c
};
baidu.setAttrs = baidu.dom.setAttrs;
baidu.dom.create = function (c, a) {
    var d = document.createElement(c),
        b = a || {};
    return baidu.dom.setAttrs(d, b)
};
baidu.dom.first = function (a) {
    return baidu.dom._matchNode(a, "nextSibling", "firstChild")
};
baidu.dom.getAttr = function (b, a) {
    b = baidu.dom.g(b);
    if ("style" == a) {
        return b.style.cssText
    }
    a = baidu.dom._NAME_ATTRS[a] || a;
    return b.getAttribute(a)
};
baidu.getAttr = baidu.dom.getAttr;
baidu.dom.getDocument = function (a) {
    a = baidu.dom.g(a);
    return a.nodeType == 9 ? a : a.ownerDocument || a.document
};
baidu.dom.getWindow = function (a) {
    a = baidu.dom.g(a);
    var b = baidu.dom.getDocument(a);
    return b.parentWindow || b.defaultView || null
};
baidu.dom.getComputedStyle = function (b, a) {
    b = baidu.dom._g(b);
    var d = baidu.dom.getDocument(b),
        c;
    if (d.defaultView && d.defaultView.getComputedStyle) {
        c = d.defaultView.getComputedStyle(b, null);
        if (c) {
            return c[a] || c.getPropertyValue(a)
        }
    }
    return ""
};
baidu.string.toCamelCase = function (a) {
    if (a.indexOf("-") < 0 && a.indexOf("_") < 0) {
        return a
    }
    return a.replace(/[-_][^-_]/g, function (b) {
        return b.charAt(1).toUpperCase()
    })
};
baidu.dom.getStyle = function (c, b) {
    var e = baidu.dom;
    c = e.g(c);
    b = baidu.string.toCamelCase(b);
    var d = c.style[b] || (c.currentStyle ? c.currentStyle[b] : "") || e.getComputedStyle(c, b);
    if (!d) {
        var a = e._styleFixer[b];
        if (a) {
            d = a.get ? a.get(c) : baidu.dom.getStyle(c, a)
        }
    }
    if (a = e._styleFilter) {
        d = a.filter(b, d, "get")
    }
    return d
};
baidu.getStyle = baidu.dom.getStyle;
baidu.dom.getPosition = function (a) {
    a = baidu.dom.g(a);
    var j = baidu.dom.getDocument(a),
        d = baidu.browser,
        g = baidu.dom.getStyle,
        c = d.isGecko > 0 && j.getBoxObjectFor && g(a, "position") == "absolute" && (a.style.top === "" || a.style.left === ""),
        h = {
            left: 0,
            top: 0
        }, f = (d.ie && !d.isStrict) ? j.body : j.documentElement,
        k, b;
    if (a == f) {
        return h
    }
    if (a.getBoundingClientRect) {
        b = a.getBoundingClientRect();
        h.left = Math.floor(b.left) + Math.max(j.documentElement.scrollLeft, j.body.scrollLeft);
        h.top = Math.floor(b.top) + Math.max(j.documentElement.scrollTop, j.body.scrollTop);
        h.left -= j.documentElement.clientLeft;
        h.top -= j.documentElement.clientTop;
        var i = j.body,
            l = parseInt(g(i, "borderLeftWidth")),
            e = parseInt(g(i, "borderTopWidth"));
        if (d.ie && !d.isStrict) {
            h.left -= isNaN(l) ? 2 : l;
            h.top -= isNaN(e) ? 2 : e
        }
    } else {
        k = a;
        do {
            h.left += k.offsetLeft;
            h.top += k.offsetTop;
            if (d.isWebkit > 0 && g(k, "position") == "fixed") {
                h.left += j.body.scrollLeft;
                h.top += j.body.scrollTop;
                break
            }
            k = k.offsetParent
        } while (k && k != a);
        if (d.opera > 0 || (d.isWebkit > 0 && g(a, "position") == "absolute")) {
            h.top -= j.body.offsetTop
        }
        k = a.offsetParent;
        while (k && k != j.body) {
            h.left -= k.scrollLeft;
            if (!d.opera || k.tagName != "TR") {
                h.top -= k.scrollTop
            }
            k = k.offsetParent
        }
    }
    return h
};
baidu.dom.hasClass = function (c, d) {
    c = baidu.dom.g(c);
    var b = baidu.string.trim(d).split(/\s+/),
        a = b.length;
    d = c.className.split(/\s+/).join(" ");
    while (a--) {
        if (!(new RegExp("(^| )" + b[a] + "( |\x24)")).test(d)) {
            return false
        }
    }
    return true
};
baidu.dom.hide = function (a) {
    a = baidu.dom.g(a);
    if (a) {
        a.style.display = "none"
    }
    return a
};
baidu.hide = baidu.dom.hide;
baidu.dom.insertAfter = function (d, c) {
    var b, a;
    b = baidu.dom._g;
    d = b(d);
    c = b(c);
    a = c.parentNode;
    if (a) {
        a.insertBefore(d, c.nextSibling)
    }
    return d
};
baidu.dom.insertBefore = function (d, c) {
    var b, a;
    b = baidu.dom._g;
    d = b(d);
    c = b(c);
    a = c.parentNode;
    if (a) {
        a.insertBefore(d, c)
    }
    return d
};
baidu.dom.insertHTML = function (d, a, c) {
    d = baidu.dom.g(d);
    var b, e;
    if (d.insertAdjacentHTML && !baidu.browser.opera) {
        d.insertAdjacentHTML(a, c)
    } else {
        b = d.ownerDocument.createRange();
        a = a.toUpperCase();
        if (a == "AFTERBEGIN" || a == "BEFOREEND") {
            b.selectNodeContents(d);
            b.collapse(a == "AFTERBEGIN")
        } else {
            e = a == "BEFOREBEGIN";
            b[e ? "setStartBefore" : "setEndAfter"](d);
            b.collapse(e)
        }
        b.insertNode(b.createContextualFragment(c))
    }
    return d
};
baidu.insertHTML = baidu.dom.insertHTML;
baidu.dom.next = function (a) {
    return baidu.dom._matchNode(a, "nextSibling", "nextSibling")
};
baidu.dom.prev = function (a) {
    return baidu.dom._matchNode(a, "previousSibling", "previousSibling")
};
baidu.string.escapeReg = function (a) {
    return String(a).replace(new RegExp("([.*+?^=!:\x24{}()|[\\]/\\\\])", "g"), "\\\x241")
};
baidu.dom.q = function (h, e, b) {
    var j = [],
        d = baidu.string.trim,
        g, f, a, c;
    if (!(h = d(h))) {
        return j
    }
    if ("undefined" == typeof e) {
        e = document
    } else {
        e = baidu.dom.g(e);
        if (!e) {
            return j
        }
    }
    b && (b = d(b).toUpperCase());
    if (e.getElementsByClassName) {
        a = e.getElementsByClassName(h);
        g = a.length;
        for (f = 0; f < g; f++) {
            c = a[f];
            if (b && c.tagName != b) {
                continue
            }
            j[j.length] = c
        }
    } else {
        h = new RegExp("(^|\\s)" + baidu.string.escapeReg(h) + "(\\s|\x24)");
        a = b ? e.getElementsByTagName(b) : (e.all || e.getElementsByTagName("*"));
        g = a.length;
        for (f = 0; f < g; f++) {
            c = a[f];
            h.test(c.className) && (j[j.length] = c)
        }
    }
    return j
};
baidu.q = baidu.Q = baidu.dom.q;
/*
 * Sizzle CSS Selector Engine
 *  Copyright 2011, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */ (function () {
    var n = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
        i = "sizcache" + (Math.random() + "").replace(".", ""),
        o = 0,
        r = Object.prototype.toString,
        h = false,
        g = true,
        q = /\\/g,
        u = /\r\n/g,
        w = /\W/;
    [0, 0].sort(function () {
        g = false;
        return 0
    });
    var d = function (B, e, E, F) {
        E = E || [];
        e = e || document;
        var H = e;
        if (e.nodeType !== 1 && e.nodeType !== 9) {
            return []
        }
        if (!B || typeof B !== "string") {
            return E
        }
        var y, J, M, x, I, L, K, D, A = true,
            z = d.isXML(e),
            C = [],
            G = B;
        do {
            n.exec("");
            y = n.exec(G);
            if (y) {
                G = y[3];
                C.push(y[1]);
                if (y[2]) {
                    x = y[3];
                    break
                }
            }
        } while (y);
        if (C.length > 1 && j.exec(B)) {
            if (C.length === 2 && k.relative[C[0]]) {
                J = s(C[0] + C[1], e, F)
            } else {
                J = k.relative[C[0]] ? [e] : d(C.shift(), e);
                while (C.length) {
                    B = C.shift();
                    if (k.relative[B]) {
                        B += C.shift()
                    }
                    J = s(B, J, F)
                }
            }
        } else {
            if (!F && C.length > 1 && e.nodeType === 9 && !z && k.match.ID.test(C[0]) && !k.match.ID.test(C[C.length - 1])) {
                I = d.find(C.shift(), e, z);
                e = I.expr ? d.filter(I.expr, I.set)[0] : I.set[0]
            }
            if (e) {
                I = F ? {
                    expr: C.pop(),
                    set: l(F)
                } : d.find(C.pop(), C.length === 1 && (C[0] === "~" || C[0] === "+") && e.parentNode ? e.parentNode : e, z);
                J = I.expr ? d.filter(I.expr, I.set) : I.set;
                if (C.length > 0) {
                    M = l(J)
                } else {
                    A = false
                }
                while (C.length) {
                    L = C.pop();
                    K = L;
                    if (!k.relative[L]) {
                        L = ""
                    } else {
                        K = C.pop()
                    }
                    if (K == null) {
                        K = e
                    }
                    k.relative[L](M, K, z)
                }
            } else {
                M = C = []
            }
        }
        if (!M) {
            M = J
        }
        if (!M) {
            d.error(L || B)
        }
        if (r.call(M) === "[object Array]") {
            if (!A) {
                E.push.apply(E, M)
            } else {
                if (e && e.nodeType === 1) {
                    for (D = 0; M[D] != null; D++) {
                        if (M[D] && (M[D] === true || M[D].nodeType === 1 && d.contains(e, M[D]))) {
                            E.push(J[D])
                        }
                    }
                } else {
                    for (D = 0; M[D] != null; D++) {
                        if (M[D] && M[D].nodeType === 1) {
                            E.push(J[D])
                        }
                    }
                }
            }
        } else {
            l(M, E)
        }
        if (x) {
            d(x, H, E, F);
            d.uniqueSort(E)
        }
        return E
    };
    d.uniqueSort = function (x) {
        if (p) {
            h = g;
            x.sort(p);
            if (h) {
                for (var e = 1; e < x.length; e++) {
                    if (x[e] === x[e - 1]) {
                        x.splice(e--, 1)
                    }
                }
            }
        }
        return x
    };
    d.matches = function (e, x) {
        return d(e, null, null, x)
    };
    d.matchesSelector = function (e, x) {
        return d(x, null, null, [e]).length > 0
    };
    d.find = function (D, e, E) {
        var C, y, A, z, B, x;
        if (!D) {
            return []
        }
        for (y = 0, A = k.order.length; y < A; y++) {
            B = k.order[y];
            if ((z = k.leftMatch[B].exec(D))) {
                x = z[1];
                z.splice(1, 1);
                if (x.substr(x.length - 1) !== "\\") {
                    z[1] = (z[1] || "").replace(q, "");
                    C = k.find[B](z, e, E);
                    if (C != null) {
                        D = D.replace(k.match[B], "");
                        break
                    }
                }
            }
        }
        if (!C) {
            C = typeof e.getElementsByTagName !== "undefined" ? e.getElementsByTagName("*") : []
        }
        return {
            set: C,
            expr: D
        }
    };
    d.filter = function (H, G, K, A) {
        var C, e, F, M, J, x, z, B, I, y = H,
            L = [],
            E = G,
            D = G && G[0] && d.isXML(G[0]);
        while (H && G.length) {
            for (F in k.filter) {
                if ((C = k.leftMatch[F].exec(H)) != null && C[2]) {
                    x = k.filter[F];
                    z = C[1];
                    e = false;
                    C.splice(1, 1);
                    if (z.substr(z.length - 1) === "\\") {
                        continue
                    }
                    if (E === L) {
                        L = []
                    }
                    if (k.preFilter[F]) {
                        C = k.preFilter[F](C, E, K, L, A, D);
                        if (!C) {
                            e = M = true
                        } else {
                            if (C === true) {
                                continue
                            }
                        }
                    }
                    if (C) {
                        for (B = 0;
                        (J = E[B]) != null; B++) {
                            if (J) {
                                M = x(J, C, B, E);
                                I = A ^ M;
                                if (K && M != null) {
                                    if (I) {
                                        e = true
                                    } else {
                                        E[B] = false
                                    }
                                } else {
                                    if (I) {
                                        L.push(J);
                                        e = true
                                    }
                                }
                            }
                        }
                    }
                    if (M !== undefined) {
                        if (!K) {
                            E = L
                        }
                        H = H.replace(k.match[F], "");
                        if (!e) {
                            return []
                        }
                        break
                    }
                }
            }
            if (H === y) {
                if (e == null) {
                    d.error(H)
                } else {
                    break
                }
            }
            y = H
        }
        return E
    };
    d.error = function (e) {
        throw "Syntax error, unrecognized expression: " + e
    };
    var b = d.getText = function (A) {
        var y, z, e = A.nodeType,
            x = "";
        if (e) {
            if (e === 1) {
                if (typeof A.textContent === "string") {
                    return A.textContent
                } else {
                    if (typeof A.innerText === "string") {
                        return A.innerText.replace(u, "")
                    } else {
                        for (A = A.firstChild; A; A = A.nextSibling) {
                            x += b(A)
                        }
                    }
                }
            } else {
                if (e === 3 || e === 4) {
                    return A.nodeValue
                }
            }
        } else {
            for (y = 0;
            (z = A[y]); y++) {
                if (z.nodeType !== 8) {
                    x += b(z)
                }
            }
        }
        return x
    };
    var k = d.selectors = {
        order: ["ID", "NAME", "TAG"],
        match: {
            ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
            CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
            NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
            ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
            TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
            CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
            POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
            PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
        },
        leftMatch: {},
        attrMap: {
            "class": "className",
            "for": "htmlFor"
        },
        attrHandle: {
            href: function (e) {
                return e.getAttribute("href")
            },
            type: function (e) {
                return e.getAttribute("type")
            }
        },
        relative: {
            "+": function (C, x) {
                var z = typeof x === "string",
                    B = z && !w.test(x),
                    D = z && !B;
                if (B) {
                    x = x.toLowerCase()
                }
                for (var y = 0, e = C.length, A; y < e; y++) {
                    if ((A = C[y])) {
                        while ((A = A.previousSibling) && A.nodeType !== 1) {}
                        C[y] = D || A && A.nodeName.toLowerCase() === x ? A || false : A === x
                    }
                }
                if (D) {
                    d.filter(x, C, true)
                }
            },
            ">": function (C, x) {
                var B, A = typeof x === "string",
                    y = 0,
                    e = C.length;
                if (A && !w.test(x)) {
                    x = x.toLowerCase();
                    for (; y < e; y++) {
                        B = C[y];
                        if (B) {
                            var z = B.parentNode;
                            C[y] = z.nodeName.toLowerCase() === x ? z : false
                        }
                    }
                } else {
                    for (; y < e; y++) {
                        B = C[y];
                        if (B) {
                            C[y] = A ? B.parentNode : B.parentNode === x
                        }
                    }
                    if (A) {
                        d.filter(x, C, true)
                    }
                }
            },
            "": function (z, x, B) {
                var A, y = o++,
                    e = t;
                if (typeof x === "string" && !w.test(x)) {
                    x = x.toLowerCase();
                    A = x;
                    e = a
                }
                e("parentNode", x, y, z, A, B)
            },
            "~": function (z, x, B) {
                var A, y = o++,
                    e = t;
                if (typeof x === "string" && !w.test(x)) {
                    x = x.toLowerCase();
                    A = x;
                    e = a
                }
                e("previousSibling", x, y, z, A, B)
            }
        },
        find: {
            ID: function (x, y, z) {
                if (typeof y.getElementById !== "undefined" && !z) {
                    var e = y.getElementById(x[1]);
                    return e && e.parentNode ? [e] : []
                }
            },
            NAME: function (y, B) {
                if (typeof B.getElementsByName !== "undefined") {
                    var x = [],
                        A = B.getElementsByName(y[1]);
                    for (var z = 0, e = A.length; z < e; z++) {
                        if (A[z].getAttribute("name") === y[1]) {
                            x.push(A[z])
                        }
                    }
                    return x.length === 0 ? null : x
                }
            },
            TAG: function (e, x) {
                if (typeof x.getElementsByTagName !== "undefined") {
                    return x.getElementsByTagName(e[1])
                }
            }
        },
        preFilter: {
            CLASS: function (z, x, y, e, C, D) {
                z = " " + z[1].replace(q, "") + " ";
                if (D) {
                    return z
                }
                for (var A = 0, B;
                (B = x[A]) != null; A++) {
                    if (B) {
                        if (C ^ (B.className && (" " + B.className + " ").replace(/[\t\n\r]/g, " ").indexOf(z) >= 0)) {
                            if (!y) {
                                e.push(B)
                            }
                        } else {
                            if (y) {
                                x[A] = false
                            }
                        }
                    }
                }
                return false
            },
            ID: function (e) {
                return e[1].replace(q, "")
            },
            TAG: function (x, e) {
                return x[1].replace(q, "").toLowerCase()
            },
            CHILD: function (e) {
                if (e[1] === "nth") {
                    if (!e[2]) {
                        d.error(e[0])
                    }
                    e[2] = e[2].replace(/^\+|\s*/g, "");
                    var x = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(e[2] === "even" && "2n" || e[2] === "odd" && "2n+1" || !/\D/.test(e[2]) && "0n+" + e[2] || e[2]);
                    e[2] = (x[1] + (x[2] || 1)) - 0;
                    e[3] = x[3] - 0
                } else {
                    if (e[2]) {
                        d.error(e[0])
                    }
                }
                e[0] = o++;
                return e
            },
            ATTR: function (A, x, y, e, B, C) {
                var z = A[1] = A[1].replace(q, "");
                if (!C && k.attrMap[z]) {
                    A[1] = k.attrMap[z]
                }
                A[4] = (A[4] || A[5] || "").replace(q, "");
                if (A[2] === "~=") {
                    A[4] = " " + A[4] + " "
                }
                return A
            },
            PSEUDO: function (A, x, y, e, B) {
                if (A[1] === "not") {
                    if ((n.exec(A[3]) || "").length > 1 || /^\w/.test(A[3])) {
                        A[3] = d(A[3], null, null, x)
                    } else {
                        var z = d.filter(A[3], x, y, true ^ B);
                        if (!y) {
                            e.push.apply(e, z)
                        }
                        return false
                    }
                } else {
                    if (k.match.POS.test(A[0]) || k.match.CHILD.test(A[0])) {
                        return true
                    }
                }
                return A
            },
            POS: function (e) {
                e.unshift(true);
                return e
            }
        },
        filters: {
            enabled: function (e) {
                return e.disabled === false && e.type !== "hidden"
            },
            disabled: function (e) {
                return e.disabled === true
            },
            checked: function (e) {
                return e.checked === true
            },
            selected: function (e) {
                if (e.parentNode) {
                    e.parentNode.selectedIndex
                }
                return e.selected === true
            },
            parent: function (e) {
                return !!e.firstChild
            },
            empty: function (e) {
                return !e.firstChild
            },
            has: function (y, x, e) {
                return !!d(e[3], y).length
            },
            header: function (e) {
                return (/h\d/i).test(e.nodeName)
            },
            text: function (y) {
                var e = y.getAttribute("type"),
                    x = y.type;
                return y.nodeName.toLowerCase() === "input" && "text" === x && (e === x || e === null)
            },
            radio: function (e) {
                return e.nodeName.toLowerCase() === "input" && "radio" === e.type
            },
            checkbox: function (e) {
                return e.nodeName.toLowerCase() === "input" && "checkbox" === e.type
            },
            file: function (e) {
                return e.nodeName.toLowerCase() === "input" && "file" === e.type
            },
            password: function (e) {
                return e.nodeName.toLowerCase() === "input" && "password" === e.type
            },
            submit: function (x) {
                var e = x.nodeName.toLowerCase();
                return (e === "input" || e === "button") && "submit" === x.type
            },
            image: function (e) {
                return e.nodeName.toLowerCase() === "input" && "image" === e.type
            },
            reset: function (x) {
                var e = x.nodeName.toLowerCase();
                return (e === "input" || e === "button") && "reset" === x.type
            },
            button: function (x) {
                var e = x.nodeName.toLowerCase();
                return e === "input" && "button" === x.type || e === "button"
            },
            input: function (e) {
                return (/input|select|textarea|button/i).test(e.nodeName)
            },
            focus: function (e) {
                return e === e.ownerDocument.activeElement
            }
        },
        setFilters: {
            first: function (x, e) {
                return e === 0
            },
            last: function (y, x, e, z) {
                return x === z.length - 1
            },
            even: function (x, e) {
                return e % 2 === 0
            },
            odd: function (x, e) {
                return e % 2 === 1
            },
            lt: function (y, x, e) {
                return x < e[3] - 0
            },
            gt: function (y, x, e) {
                return x > e[3] - 0
            },
            nth: function (y, x, e) {
                return e[3] - 0 === x
            },
            eq: function (y, x, e) {
                return e[3] - 0 === x
            }
        },
        filter: {
            PSEUDO: function (y, D, C, E) {
                var e = D[1],
                    x = k.filters[e];
                if (x) {
                    return x(y, C, D, E)
                } else {
                    if (e === "contains") {
                        return (y.textContent || y.innerText || b([y]) || "").indexOf(D[3]) >= 0
                    } else {
                        if (e === "not") {
                            var z = D[3];
                            for (var B = 0, A = z.length; B < A; B++) {
                                if (z[B] === y) {
                                    return false
                                }
                            }
                            return true
                        } else {
                            d.error(e)
                        }
                    }
                }
            },
            CHILD: function (y, A) {
                var z, G, C, F, e, B, E, D = A[1],
                    x = y;
                switch (D) {
                case "only":
                case "first":
                    while ((x = x.previousSibling)) {
                        if (x.nodeType === 1) {
                            return false
                        }
                    }
                    if (D === "first") {
                        return true
                    }
                    x = y;
                case "last":
                    while ((x = x.nextSibling)) {
                        if (x.nodeType === 1) {
                            return false
                        }
                    }
                    return true;
                case "nth":
                    z = A[2];
                    G = A[3];
                    if (z === 1 && G === 0) {
                        return true
                    }
                    C = A[0];
                    F = y.parentNode;
                    if (F && (F[i] !== C || !y.nodeIndex)) {
                        B = 0;
                        for (x = F.firstChild; x; x = x.nextSibling) {
                            if (x.nodeType === 1) {
                                x.nodeIndex = ++B
                            }
                        }
                        F[i] = C
                    }
                    E = y.nodeIndex - G;
                    if (z === 0) {
                        return E === 0
                    } else {
                        return (E % z === 0 && E / z >= 0)
                    }
                }
            },
            ID: function (x, e) {
                return x.nodeType === 1 && x.getAttribute("id") === e
            },
            TAG: function (x, e) {
                return (e === "*" && x.nodeType === 1) || !! x.nodeName && x.nodeName.toLowerCase() === e
            },
            CLASS: function (x, e) {
                return (" " + (x.className || x.getAttribute("class")) + " ").indexOf(e) > -1
            },
            ATTR: function (B, z) {
                var y = z[1],
                    e = d.attr ? d.attr(B, y) : k.attrHandle[y] ? k.attrHandle[y](B) : B[y] != null ? B[y] : B.getAttribute(y),
                    C = e + "",
                    A = z[2],
                    x = z[4];
                return e == null ? A === "!=" : !A && d.attr ? e != null : A === "=" ? C === x : A === "*=" ? C.indexOf(x) >= 0 : A === "~=" ? (" " + C + " ").indexOf(x) >= 0 : !x ? C && e !== false : A === "!=" ? C !== x : A === "^=" ? C.indexOf(x) === 0 : A === "$=" ? C.substr(C.length - x.length) === x : A === "|=" ? C === x || C.substr(0, x.length + 1) === x + "-" : false
            },
            POS: function (A, x, y, B) {
                var e = x[2],
                    z = k.setFilters[e];
                if (z) {
                    return z(A, y, x, B)
                }
            }
        }
    };
    var j = k.match.POS,
        c = function (x, e) {
            return "\\" + (e - 0 + 1)
        };
    for (var f in k.match) {
        k.match[f] = new RegExp(k.match[f].source + (/(?![^\[]*\])(?![^\(]*\))/.source));
        k.leftMatch[f] = new RegExp(/(^(?:.|\r|\n)*?)/.source + k.match[f].source.replace(/\\(\d+)/g, c))
    }
    var l = function (x, e) {
        x = Array.prototype.slice.call(x, 0);
        if (e) {
            e.push.apply(e, x);
            return e
        }
        return x
    };
    try {
        Array.prototype.slice.call(document.documentElement.childNodes, 0)[0].nodeType
    } catch (v) {
        l = function (A, z) {
            var y = 0,
                x = z || [];
            if (r.call(A) === "[object Array]") {
                Array.prototype.push.apply(x, A)
            } else {
                if (typeof A.length === "number") {
                    for (var e = A.length; y < e; y++) {
                        x.push(A[y])
                    }
                } else {
                    for (; A[y]; y++) {
                        x.push(A[y])
                    }
                }
            }
            return x
        }
    }
    var p, m;
    if (document.documentElement.compareDocumentPosition) {
        p = function (x, e) {
            if (x === e) {
                h = true;
                return 0
            }
            if (!x.compareDocumentPosition || !e.compareDocumentPosition) {
                return x.compareDocumentPosition ? -1 : 1
            }
            return x.compareDocumentPosition(e) & 4 ? -1 : 1
        }
    } else {
        p = function (E, D) {
            if (E === D) {
                h = true;
                return 0
            } else {
                if (E.sourceIndex && D.sourceIndex) {
                    return E.sourceIndex - D.sourceIndex
                }
            }
            var B, x, y = [],
                e = [],
                A = E.parentNode,
                C = D.parentNode,
                F = A;
            if (A === C) {
                return m(E, D)
            } else {
                if (!A) {
                    return -1
                } else {
                    if (!C) {
                        return 1
                    }
                }
            }
            while (F) {
                y.unshift(F);
                F = F.parentNode
            }
            F = C;
            while (F) {
                e.unshift(F);
                F = F.parentNode
            }
            B = y.length;
            x = e.length;
            for (var z = 0; z < B && z < x; z++) {
                if (y[z] !== e[z]) {
                    return m(y[z], e[z])
                }
            }
            return z === B ? m(E, e[z], - 1) : m(y[z], D, 1)
        };
        m = function (x, e, y) {
            if (x === e) {
                return y
            }
            var z = x.nextSibling;
            while (z) {
                if (z === e) {
                    return -1
                }
                z = z.nextSibling
            }
            return 1
        }
    }(function () {
        var x = document.createElement("div"),
            y = "script" + (new Date()).getTime(),
            e = document.documentElement;
        x.innerHTML = "<a name='" + y + "'/>";
        e.insertBefore(x, e.firstChild);
        if (document.getElementById(y)) {
            k.find.ID = function (A, B, C) {
                if (typeof B.getElementById !== "undefined" && !C) {
                    var z = B.getElementById(A[1]);
                    return z ? z.id === A[1] || typeof z.getAttributeNode !== "undefined" && z.getAttributeNode("id").nodeValue === A[1] ? [z] : undefined : []
                }
            };
            k.filter.ID = function (B, z) {
                var A = typeof B.getAttributeNode !== "undefined" && B.getAttributeNode("id");
                return B.nodeType === 1 && A && A.nodeValue === z
            }
        }
        e.removeChild(x);
        e = x = null
    })();
    (function () {
        var e = document.createElement("div");
        e.appendChild(document.createComment(""));
        if (e.getElementsByTagName("*").length > 0) {
            k.find.TAG = function (x, B) {
                var A = B.getElementsByTagName(x[1]);
                if (x[1] === "*") {
                    var z = [];
                    for (var y = 0; A[y]; y++) {
                        if (A[y].nodeType === 1) {
                            z.push(A[y])
                        }
                    }
                    A = z
                }
                return A
            }
        }
        e.innerHTML = "<a href='#'></a>";
        if (e.firstChild && typeof e.firstChild.getAttribute !== "undefined" && e.firstChild.getAttribute("href") !== "#") {
            k.attrHandle.href = function (x) {
                return x.getAttribute("href", 2)
            }
        }
        e = null
    })();
    if (document.querySelectorAll) {
        (function () {
            var e = d,
                z = document.createElement("div"),
                y = "__sizzle__";
            z.innerHTML = "<p class='TEST'></p>";
            if (z.querySelectorAll && z.querySelectorAll(".TEST").length === 0) {
                return
            }
            d = function (K, B, F, J) {
                B = B || document;
                if (!J && !d.isXML(B)) {
                    var I = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(K);
                    if (I && (B.nodeType === 1 || B.nodeType === 9)) {
                        if (I[1]) {
                            return l(B.getElementsByTagName(K), F)
                        } else {
                            if (I[2] && k.find.CLASS && B.getElementsByClassName) {
                                return l(B.getElementsByClassName(I[2]), F)
                            }
                        }
                    }
                    if (B.nodeType === 9) {
                        if (K === "body" && B.body) {
                            return l([B.body], F)
                        } else {
                            if (I && I[3]) {
                                var E = B.getElementById(I[3]);
                                if (E && E.parentNode) {
                                    if (E.id === I[3]) {
                                        return l([E], F)
                                    }
                                } else {
                                    return l([], F)
                                }
                            }
                        }
                        try {
                            return l(B.querySelectorAll(K), F)
                        } catch (G) {}
                    } else {
                        if (B.nodeType === 1 && B.nodeName.toLowerCase() !== "object") {
                            var C = B,
                                D = B.getAttribute("id"),
                                A = D || y,
                                M = B.parentNode,
                                L = /^\s*[+~]/.test(K);
                            if (!D) {
                                B.setAttribute("id", A)
                            } else {
                                A = A.replace(/'/g, "\\$&")
                            }
                            if (L && M) {
                                B = B.parentNode
                            }
                            try {
                                if (!L || M) {
                                    return l(B.querySelectorAll("[id='" + A + "'] " + K), F)
                                }
                            } catch (H) {} finally {
                                if (!D) {
                                    C.removeAttribute("id")
                                }
                            }
                        }
                    }
                }
                return e(K, B, F, J)
            };
            for (var x in e) {
                d[x] = e[x]
            }
            z = null
        })()
    }(function () {
        var e = document.documentElement,
            y = e.matchesSelector || e.mozMatchesSelector || e.webkitMatchesSelector || e.msMatchesSelector;
        if (y) {
            var A = !y.call(document.createElement("div"), "div"),
                x = false;
            try {
                y.call(document.documentElement, "[test!='']:sizzle")
            } catch (z) {
                x = true
            }
            d.matchesSelector = function (C, E) {
                E = E.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
                if (!d.isXML(C)) {
                    try {
                        if (x || !k.match.PSEUDO.test(E) && !/!=/.test(E)) {
                            var B = y.call(C, E);
                            if (B || !A || C.document && C.document.nodeType !== 11) {
                                return B
                            }
                        }
                    } catch (D) {}
                }
                return d(E, null, null, [C]).length > 0
            }
        }
    })();
    (function () {
        var e = document.createElement("div");
        e.innerHTML = "<div class='test e'></div><div class='test'></div>";
        if (!e.getElementsByClassName || e.getElementsByClassName("e").length === 0) {
            return
        }
        e.lastChild.className = "e";
        if (e.getElementsByClassName("e").length === 1) {
            return
        }
        k.order.splice(1, 0, "CLASS");
        k.find.CLASS = function (x, y, z) {
            if (typeof y.getElementsByClassName !== "undefined" && !z) {
                return y.getElementsByClassName(x[1])
            }
        };
        e = null
    })();

    function a(x, C, B, F, D, E) {
        for (var z = 0, y = F.length; z < y; z++) {
            var e = F[z];
            if (e) {
                var A = false;
                e = e[x];
                while (e) {
                    if (e[i] === B) {
                        A = F[e.sizset];
                        break
                    }
                    if (e.nodeType === 1 && !E) {
                        e[i] = B;
                        e.sizset = z
                    }
                    if (e.nodeName.toLowerCase() === C) {
                        A = e;
                        break
                    }
                    e = e[x]
                }
                F[z] = A
            }
        }
    }
    function t(x, C, B, F, D, E) {
        for (var z = 0, y = F.length; z < y; z++) {
            var e = F[z];
            if (e) {
                var A = false;
                e = e[x];
                while (e) {
                    if (e[i] === B) {
                        A = F[e.sizset];
                        break
                    }
                    if (e.nodeType === 1) {
                        if (!E) {
                            e[i] = B;
                            e.sizset = z
                        }
                        if (typeof C !== "string") {
                            if (e === C) {
                                A = true;
                                break
                            }
                        } else {
                            if (d.filter(C, [e]).length > 0) {
                                A = e;
                                break
                            }
                        }
                    }
                    e = e[x]
                }
                F[z] = A
            }
        }
    }
    if (document.documentElement.contains) {
        d.contains = function (x, e) {
            return x !== e && (x.contains ? x.contains(e) : true)
        }
    } else {
        if (document.documentElement.compareDocumentPosition) {
            d.contains = function (x, e) {
                return !!(x.compareDocumentPosition(e) & 16)
            }
        } else {
            d.contains = function () {
                return false
            }
        }
    }
    d.isXML = function (e) {
        var x = (e ? e.ownerDocument || e : 0).documentElement;
        return x ? x.nodeName !== "HTML" : false
    };
    var s = function (y, e, C) {
        var B, D = [],
            A = "",
            E = e.nodeType ? [e] : e;
        while ((B = k.match.PSEUDO.exec(y))) {
            A += B[0];
            y = y.replace(k.match.PSEUDO, "")
        }
        y = k.relative[y] ? y + "*" : y;
        for (var z = 0, x = E.length; z < x; z++) {
            d(y, E[z], D, C)
        }
        return d.filter(A, D)
    };
    baidu.query = baidu.dom.query = d
})();
(function () {
    var a = baidu.dom.ready = function () {
        var g = false,
            f = [],
            c;
        if (document.addEventListener) {
            c = function () {
                document.removeEventListener("DOMContentLoaded", c, false);
                d()
            }
        } else {
            if (document.attachEvent) {
                c = function () {
                    if (document.readyState === "complete") {
                        document.detachEvent("onreadystatechange", c);
                        d()
                    }
                }
            }
        }
        function d() {
            if (!d.isReady) {
                d.isReady = true;
                for (var k = 0, h = f.length; k < h; k++) {
                    f[k]()
                }
            }
        }
        function b() {
            try {
                document.documentElement.doScroll("left")
            } catch (h) {
                setTimeout(b, 1);
                return
            }
            d()
        }
        function e() {
            if (g) {
                return
            }
            g = true;
            if (document.addEventListener) {
                document.addEventListener("DOMContentLoaded", c, false);
                window.addEventListener("load", d, false)
            } else {
                if (document.attachEvent) {
                    document.attachEvent("onreadystatechange", c);
                    window.attachEvent("onload", d);
                    var h = false;
                    try {
                        h = window.frameElement == null
                    } catch (i) {}
                    if (document.documentElement.doScroll && h) {
                        b()
                    }
                }
            }
        }
        e();
        return function (h) {
            d.isReady ? h() : f.push(h)
        }
    }();
    a.isReady = false
})();
baidu.ready = baidu.dom.ready;
baidu.dom.remove = function (a) {
    a = baidu.dom._g(a);
    var b = a.parentNode;
    b && b.removeChild(a)
};
baidu.dom.removeClass = function (f, g) {
    f = baidu.dom.g(f);
    var d = f.className.split(/\s+/),
        h = g.split(/\s+/),
        b, a = h.length,
        c, e = 0;
    for (; e < a; ++e) {
        for (c = 0, b = d.length; c < b; ++c) {
            if (d[c] == h[e]) {
                d.splice(c, 1);
                break
            }
        }
    }
    f.className = d.join(" ");
    return f
};
baidu.removeClass = baidu.dom.removeClass;
baidu.dom.setStyle = function (c, b, d) {
    var e = baidu.dom,
        a;
    c = e.g(c);
    b = baidu.string.toCamelCase(b);
    if (a = e._styleFilter) {
        d = a.filter(b, d, "set")
    }
    a = e._styleFixer[b];
    (a && a.set) ? a.set(c, d) : (c.style[a || b] = d);
    return c
};
baidu.setStyle = baidu.dom.setStyle;
baidu.dom.setStyles = function (b, c) {
    b = baidu.dom.g(b);
    for (var a in c) {
        baidu.dom.setStyle(b, a, c[a])
    }
    return b
};
baidu.setStyles = baidu.dom.setStyles;
baidu.removeStyle = baidu.dom.removeStyle = function () {
    var b = document.createElement("DIV"),
        a, c = baidu.dom._g;
    if (b.style.removeProperty) {
        a = function (e, d) {
            e = c(e);
            e.style.removeProperty(d);
            return e
        }
    } else {
        if (b.style.removeAttribute) {
            a = function (e, d) {
                e = c(e);
                e.style.removeAttribute(baidu.string.toCamelCase(d));
                return e
            }
        }
    }
    b = null;
    return a
}();
baidu.dom.show = function (a) {
    a = baidu.dom.g(a);
    if (a) {
        a.style.display = "block"
    }
    return a
};
baidu.show = baidu.dom.show;
baidu.dom.toggle = function (a) {
    a = baidu.dom.g(a);
    a.style.display = a.style.display == "none" ? "" : "none";
    return a
};
baidu.event = baidu.event || {};
baidu.event.getPageX = function (b) {
    var a = b.pageX,
        c = document;
    if (!a && a !== 0) {
        a = (b.clientX || 0) + (c.documentElement.scrollLeft || c.body.scrollLeft)
    }
    return a
};
baidu.event.getPageY = function (b) {
    var a = b.pageY,
        c = document;
    if (!a && a !== 0) {
        a = (b.clientY || 0) + (c.documentElement.scrollTop || c.body.scrollTop)
    }
    return a
};
baidu.event.EventArg = function (c, e) {
    e = e || window;
    c = c || e.event;
    var d = e.document;
    this.target = (c.target) || c.srcElement;
    this.keyCode = c.which || c.keyCode;
    for (var a in c) {
        var b = c[a];
        if ("function" != typeof b) {
            this[a] = b
        }
    }
    if (!this.pageX && this.pageX !== 0) {
        this.pageX = (c.clientX || 0) + (d.documentElement.scrollLeft || d.body.scrollLeft);
        this.pageY = (c.clientY || 0) + (d.documentElement.scrollTop || d.body.scrollTop)
    }
    this._event = c
};
baidu.event.EventArg.prototype.preventDefault = function () {
    if (this._event.preventDefault) {
        this._event.preventDefault()
    } else {
        this._event.returnValue = false
    }
    return this
};
baidu.event.EventArg.prototype.stopPropagation = function () {
    if (this._event.stopPropagation) {
        this._event.stopPropagation()
    } else {
        this._event.cancelBubble = true
    }
    return this
};
baidu.event.EventArg.prototype.stop = function () {
    return this.stopPropagation().preventDefault()
};
baidu.event._listeners = baidu.event._listeners || [];
baidu.event.get = function (a, b) {
    return new baidu.event.EventArg(a, b)
};
baidu.event.getTarget = function (a) {
    return a.target || a.srcElement
};
baidu.event.on = function (b, e, g) {
    e = e.replace(/^on/i, "");
    b = baidu.dom._g(b);
    var f = function (i) {
        g.call(b, i)
    }, a = baidu.event._listeners,
        d = baidu.event._eventFilter,
        h, c = e;
    e = e.toLowerCase();
    if (d && d[e]) {
        h = d[e](b, e, f);
        c = h.type;
        f = h.listener
    }
    if (b.addEventListener) {
        b.addEventListener(c, f, false)
    } else {
        if (b.attachEvent) {
            b.attachEvent("on" + c, f)
        }
    }
    a[a.length] = [b, e, g, f, c];
    return b
};
baidu.on = baidu.event.on;
baidu.hover = function (d, e, b) {
    var c = baidu.isString(d) ? baidu.query(d) : [baidu.dom.g(d)];
    if (baidu.isString(e)) {
        var a = e;
        e = function (f) {
            baidu.event.stopPropagation(f);
            baidu.addClass(this, a)
        };
        b = function (f) {
            baidu.event.stopPropagation(f);
            baidu.removeClass(this, a)
        }
    }
    baidu.object.each(c, function (f) {
        baidu.event.on(f, "mouseover", e);
        baidu.event.on(f, "mouseout", b)
    });
    return baidu
};
baidu.event.preventDefault = function (a) {
    if (a.preventDefault) {
        a.preventDefault()
    } else {
        a.returnValue = false
    }
};
baidu.event.stopPropagation = function (a) {
    if (a.stopPropagation) {
        a.stopPropagation()
    } else {
        a.cancelBubble = true
    }
};
baidu.event.stop = function (a) {
    var b = baidu.event;
    b.stopPropagation(a);
    b.preventDefault(a)
};
baidu.event.un = function (c, f, b) {
    c = baidu.dom._g(c);
    f = f.replace(/^on/i, "").toLowerCase();
    var i = baidu.event._listeners,
        d = i.length,
        e = !b,
        h, g, a;
    while (d--) {
        h = i[d];
        if (h[1] === f && h[0] === c && (e || h[2] === b)) {
            g = h[4];
            a = h[3];
            if (c.removeEventListener) {
                c.removeEventListener(g, a, false)
            } else {
                if (c.detachEvent) {
                    c.detachEvent("on" + g, a)
                }
            }
            i.splice(d, 1)
        }
    }
    return c
};
baidu.un = baidu.event.un;
baidu.json = baidu.json || {};
baidu.json.parse = function (a) {
    a = a.toString();
    if (!a.length) {
        return null
    }
    try {
        return (new Function("return (" + a + ")"))()
    } catch (b) {
        return null
    }
};
baidu.json.encode = baidu.json.stringify = (function () {
    var b = {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    };

    function a(f) {
        if (/["\\\x00-\x1f]/.test(f)) {
            f = f.replace(/["\\\x00-\x1f]/g, function (g) {
                var h = b[g];
                if (h) {
                    return h
                }
                h = g.charCodeAt();
                return "\\u00" + Math.floor(h / 16).toString(16) + (h % 16).toString(16)
            })
        }
        return '"' + f + '"'
    }
    function d(m) {
        var g = ["["],
            h = m.length,
            f, j, k;
        for (j = 0; j < h; j++) {
            k = m[j];
            switch (typeof k) {
            case "undefined":
            case "function":
            case "unknown":
                break;
            default:
                if (f) {
                    g.push(",")
                }
                g.push(baidu.json.stringify(k));
                f = 1
            }
        }
        g.push("]");
        return g.join("")
    }
    function c(f) {
        return f < 10 ? "0" + f : f
    }
    function e(f) {
        return '"' + f.getFullYear() + "-" + c(f.getMonth() + 1) + "-" + c(f.getDate()) + "T" + c(f.getHours()) + ":" + c(f.getMinutes()) + ":" + c(f.getSeconds()) + '"'
    }
    return function (k) {
        switch (typeof k) {
        case "undefined":
            return "undefined";
        case "number":
            return isFinite(k) ? String(k) : "null";
        case "string":
            return a(k);
        case "boolean":
            return String(k);
        default:
            if (k === null) {
                return "null"
            } else {
                if (k instanceof Array) {
                    return d(k)
                } else {
                    if (k instanceof Date) {
                        return e(k)
                    } else {
                        var g = ["{"],
                            j = baidu.json.stringify,
                            f, i;
                        for (var h in k) {
                            if (Object.prototype.hasOwnProperty.call(k, h)) {
                                i = k[h];
                                switch (typeof i) {
                                case "undefined":
                                case "unknown":
                                case "function":
                                    break;
                                default:
                                    if (f) {
                                        g.push(",")
                                    }
                                    f = 1;
                                    g.push(j(h) + ":" + j(i))
                                }
                            }
                        }
                        g.push("}");
                        return g.join("")
                    }
                }
            }
        }
    }
})();
baidu.lang.guid = function () {
    return "TANGRAM$" + baidu.$$._counter++
};
baidu.$$._counter = baidu.$$._counter || 1;
window[baidu.guid]._instances = window[baidu.guid]._instances || {};
baidu.isFunction = baidu.lang.isFunction = function (a) {
    return "[object Function]" == Object.prototype.toString.call(a)
};
baidu.lang.Class = function (a) {
    this.guid = a || baidu.lang.guid();
    window[baidu.guid]._instances[this.guid] = this
};
window[baidu.guid]._instances = window[baidu.guid]._instances || {};
baidu.lang.Class.prototype.dispose = function () {
    delete window[baidu.guid]._instances[this.guid];
    for (var a in this) {
        if (!baidu.lang.isFunction(this[a])) {
            delete this[a]
        }
    }
    this.disposed = true
};
baidu.lang.Class.prototype.toString = function () {
    return "[object " + (this._className || "Object") + "]"
};
baidu.lang.Event = function (a, b) {
    this.type = a;
    this.returnValue = true;
    this.target = b || null;
    this.currentTarget = null
};
baidu.lang.Class.prototype.add = baidu.lang.Class.prototype.addEventListener = function (d, c, b) {
    if (!baidu.lang.isFunction(c)) {
        return this
    }!this.__listeners && (this.__listeners = {});
    var a = this.__listeners,
        e;
    if (typeof b == "string" && b) {
        if (/[^\w\-]/.test(b)) {
            throw ("nonstandard key:" + b)
        } else {
            c.hashCode = b;
            e = b
        }
    }
    d.indexOf("on") != 0 && (d = "on" + d);
    typeof a[d] != "object" && (a[d] = {});
    e = e || baidu.lang.guid();
    c.hashCode = e;
    a[d][e] = c;
    return this
};
baidu.lang.Class.prototype.remove = baidu.lang.Class.prototype.removeEventListener = function (d, c) {
    if (typeof c != "undefined") {
        if ((baidu.lang.isFunction(c) && !(c = c.hashCode)) || (!baidu.lang.isString(c))) {
            return this
        }
    }!this.__listeners && (this.__listeners = {});
    d.indexOf("on") != 0 && (d = "on" + d);
    var b = this.__listeners;
    if (!b[d]) {
        return this
    }
    if (typeof c != "undefined") {
        b[d][c] && delete b[d][c]
    } else {
        for (var a in b[d]) {
            delete b[d][a]
        }
    }
    return this
};
baidu.lang.Class.prototype.send = baidu.lang.Class.prototype.dispatchEvent = function (d, a) {
    if (baidu.lang.isString(d)) {
        d = new baidu.lang.Event(d)
    }!this.__listeners && (this.__listeners = {});
    a = a || {};
    for (var c in a) {
        d[c] = a[c]
    }
    var c, b = this.__listeners,
        e = d.type;
    d.target = d.target || this;
    d.currentTarget = this;
    e.indexOf("on") != 0 && (e = "on" + e);
    baidu.lang.isFunction(this[e]) && this[e].apply(this, arguments);
    if (typeof b[e] == "object") {
        for (c in b[e]) {
            b[e][c].apply(this, arguments)
        }
    }
    return d.returnValue
};
baidu.lang.inherits = function (g, e, d) {
    var c, f, a = g.prototype,
        b = new Function();
    b.prototype = e.prototype;
    f = g.prototype = new b();
    for (c in a) {
        f[c] = a[c]
    }
    g.prototype.constructor = g;
    g.superClass = e.prototype;
    if ("string" == typeof d) {
        f._className = d
    }
};
baidu.inherits = baidu.lang.inherits;
baidu.lang.instance = function (a) {
    return window[baidu.guid]._instances[a] || null
};
baidu.isArray = baidu.lang.isArray = function (a) {
    return "[object Array]" == Object.prototype.toString.call(a)
};
baidu.isElement = baidu.lang.isElement = function (a) {
    return !!(a && a.nodeName && a.nodeType == 1)
};
baidu.isNumber = baidu.lang.isNumber = function (a) {
    return "[object Number]" == Object.prototype.toString.call(a) && isFinite(a)
};
baidu.lang.isObject = function (a) {
    return "function" == typeof a || !! (a && "object" == typeof a)
};
baidu.isObject = baidu.lang.isObject;
baidu.lang.Class.prototype.adds = baidu.lang.Class.prototype.addEventListeners = function (c, d) {
    if (typeof d == "undefined") {
        for (var b in c) {
            this.addEventListener(b, c[b])
        }
    } else {
        c = c.split(",");
        var b = 0,
            a = c.length,
            e;
        for (; b < a; b++) {
            this.addEventListener(baidu.trim(c[b]), d)
        }
    }
};
baidu.lang.Class.prototype.addOne = function (c, b, a) {
    this.remove(c, b).add(c, b, a);
    return this
};
baidu.lang.createClass = function (f, b) {
    b = b || {};
    var e = b.superClass || baidu.lang.Class;
    var d = function () {
        if (e != baidu.lang.Class) {
            e.apply(this, arguments)
        } else {
            e.call(this)
        }
        f.apply(this, arguments)
    };
    d.options = b.options || {};
    var h = function () {}, g = f.prototype;
    h.prototype = e.prototype;
    var a = d.prototype = new h();
    for (var c in g) {
        a[c] = g[c]
    }
    typeof b.className == "string" && (a._className = b.className);
    a.constructor = g.constructor;
    d.extend = function (k) {
        for (var j in k) {
            d.prototype[j] = k[j]
        }
        return d
    };
    return d
};
baidu.lang.decontrol = function (b) {
    var a = window[baidu.guid];
    a._instances && (delete a._instances[b])
};
baidu.lang.createSingle = function (b) {
    var d = new baidu.lang.Class();
    for (var a in b) {
        d[a] = b[a]
    }
    return d
};
baidu.lang.eventCenter = baidu.lang.eventCenter || baidu.lang.createSingle();
T.observer = T.lang.eventCenter;
baidu.lang.module = function (name, module, owner) {
    var packages = name.split("."),
        len = packages.length - 1,
        packageName, i = 0;
    if (!owner) {
        try {
            if (!(new RegExp("^[a-zA-Z_\x24][a-zA-Z0-9_\x24]*\x24")).test(packages[0])) {
                throw ""
            }
            owner = eval(packages[0]);
            i = 1
        } catch (e) {
            owner = window
        }
    }
    for (; i < len; i++) {
        packageName = packages[i];
        if (!owner[packageName]) {
            owner[packageName] = {}
        }
        owner = owner[packageName]
    }
    if (!owner[packages[len]]) {
        owner[packages[len]] = module
    }
};
baidu.lang.toArray = function (b) {
    if (b === null || b === undefined) {
        return []
    }
    if (baidu.lang.isArray(b)) {
        return b
    }
    if (typeof b.length !== "number" || typeof b === "string" || baidu.lang.isFunction(b)) {
        return [b]
    }
    if (b.item) {
        var a = b.length,
            c = new Array(a);
        while (a--) {
            c[a] = b[a]
        }
        return c
    }
    return [].slice.call(b)
};
baidu.object = baidu.object || {};
baidu.object.isPlain = function (c) {
    var b = Object.prototype.hasOwnProperty,
        a;
    if (!c || Object.prototype.toString.call(c) !== "[object Object]" || !("isPrototypeOf" in c)) {
        return false
    }
    if (c.constructor && !b.call(c, "constructor") && !b.call(c.constructor.prototype, "isPrototypeOf")) {
        return false
    }
    for (a in c) {}
    return a === undefined || b.call(c, a)
};
baidu.object.clone = function (e) {
    var b = e,
        c, a;
    if (!e || e instanceof Number || e instanceof String || e instanceof Boolean) {
        return b
    } else {
        if (baidu.lang.isArray(e)) {
            b = [];
            var d = 0;
            for (c = 0, a = e.length; c < a; c++) {
                b[d++] = baidu.object.clone(e[c])
            }
        } else {
            if (baidu.object.isPlain(e)) {
                b = {};
                for (c in e) {
                    if (e.hasOwnProperty(c)) {
                        b[c] = baidu.object.clone(e[c])
                    }
                }
            }
        }
    }
    return b
};
baidu.extend = baidu.object.extend = function (c, a) {
    for (var b in a) {
        if (a.hasOwnProperty(b)) {
            c[b] = a[b]
        }
    }
    return c
};
baidu.object.each = function (e, c) {
    var b, a, d;
    if ("function" == typeof c) {
        for (a in e) {
            if (e.hasOwnProperty(a)) {
                d = e[a];
                b = c.call(e, d, a);
                if (b === false) {
                    break
                }
            }
        }
    }
    return e
};
baidu.page = baidu.page || {};
baidu.page.getHeight = function () {
    var d = document,
        a = d.body,
        c = d.documentElement,
        b = d.compatMode == "BackCompat" ? a : d.documentElement;
    return Math.max(c.scrollHeight, a.scrollHeight, b.clientHeight)
};
baidu.page.getWidth = function () {
    var d = document,
        a = d.body,
        c = d.documentElement,
        b = d.compatMode == "BackCompat" ? a : d.documentElement;
    return Math.max(c.scrollWidth, a.scrollWidth, b.clientWidth)
};
baidu.page.getScrollTop = function () {
    var a = document;
    return window.pageYOffset || a.documentElement.scrollTop || a.body.scrollTop
};
baidu.page.getScrollLeft = function () {
    var a = document;
    return window.pageXOffset || a.documentElement.scrollLeft || a.body.scrollLeft
};
baidu.page.getViewHeight = function () {
    var b = document,
        a = b.compatMode == "BackCompat" ? b.body : b.documentElement;
    return a.clientHeight
};
baidu.page.getViewWidth = function () {
    var b = document,
        a = b.compatMode == "BackCompat" ? b.body : b.documentElement;
    return a.clientWidth
};
(function () {
    var c = {}, b = [],
        a = 0;
    var d = function () {
        return baidu.page.getScrollTop() + baidu.page.getViewHeight() + c.preloadHeight
    };
    var f = function () {
        clearTimeout(a);
        var h = d(),
            k, m = true,
            j = 0,
            g = b.length,
            l = null;
        for (; j < g; ++j) {
            l = b[j];
            k = l.getAttribute(c.attr);
            k && (m = false);
            if (baidu.dom.getPosition(l).top < h && k) {
                l.src = k;
                l.removeAttribute(c.attr);
                baidu.lang.isFunction(c.onlazyload) && c.onlazyload(l)
            }
        }
        if (m) {
            baidu.page.lazyLoadDispose()
        }
    };
    var e = function () {
        clearTimeout(a);
        a = setTimeout(f, 100)
    };
    baidu.page.lazyLoadImage = function (j) {
        this.lazyLoadDispose();
        c = j || {};
        c.preloadHeight = c.preloadHeight || 0;
        c.attr = c.attr || "_lazysrc";
        var k = document.getElementsByTagName("IMG"),
            g = k.length,
            h = 0;
        b = [];
        for (; h < g; ++h) {
            if (baidu.dom.hasAttr(k[h], c.attr)) {
                b.push(k[h])
            }
        }
        f();
        baidu.on(window, "scroll", e);
        baidu.on(window, "resize", e)
    };
    baidu.page.lazyLoadDispose = function () {
        clearTimeout(a);
        baidu.un(window, "scroll", f);
        baidu.un(window, "resize", f)
    }
})();
baidu.string.decodeHTML = function (a) {
    var b = String(a).replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
    return b.replace(/&#([\d]+);/g, function (d, c) {
        return String.fromCharCode(parseInt(c, 10))
    })
};
baidu.decodeHTML = baidu.string.decodeHTML;
baidu.string.encodeHTML = function (a) {
    return String(a).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
};
baidu.encodeHTML = baidu.string.encodeHTML;
baidu.string.subByte = function (c, b, a) {
    c = String(c);
    a = a || "";
    if (b < 0 || baidu.string.getByteLength(c) <= b) {
        return c + a
    }
    c = c.substr(0, b).replace(/([^\x00-\xff])/g, "\x241 ").substr(0, b).replace(/[^\x00-\xff]$/, "").replace(/([^\x00-\xff]) /g, "\x241");
    return c + a
};
baidu.string.format = function (c, a) {
    c = String(c);
    var b = Array.prototype.slice.call(arguments, 1),
        d = Object.prototype.toString;
    if (b.length) {
        b = b.length == 1 ? (a !== null && (/\[object Array\]|\[object Object\]/.test(d.call(a))) ? a : b) : b;
        return c.replace(/#\{(.+?)\}/g, function (e, g) {
            var f = b[g];
            if ("[object Function]" == d.call(f)) {
                f = f(g)
            }
            return ("undefined" == typeof f ? "" : f)
        })
    }
    return c
};
baidu.format = baidu.string.format;
baidu.string.getByteLength = function (a) {
    return String(a).replace(/[^\x00-\xff]/g, "ci").length
};
baidu.swf = baidu.swf || {};
baidu.swf.version = (function () {
    var h = navigator;
    if (h.plugins && h.mimeTypes.length) {
        var d = h.plugins["Shockwave Flash"];
        if (d && d.description) {
            return d.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s)+r/, ".") + ".0"
        }
    } else {
        if (window.ActiveXObject && !window.opera) {
            for (var b = 12; b >= 2; b--) {
                try {
                    var g = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + b);
                    if (g) {
                        var a = g.GetVariable("$version");
                        return a.replace(/WIN/g, "").replace(/,/g, ".")
                    }
                } catch (f) {}
            }
        }
    }
})();
baidu.swf.createHTML = function (s) {
    s = s || {};
    var j = baidu.swf.version,
        g = s.ver || "6.0.0",
        f, d, e, c, h, r, a = {}, o = baidu.string.encodeHTML;
    for (c in s) {
        a[c] = s[c]
    }
    s = a;
    if (j) {
        j = j.split(".");
        g = g.split(".");
        for (e = 0; e < 3; e++) {
            f = parseInt(j[e], 10);
            d = parseInt(g[e], 10);
            if (d < f) {
                break
            } else {
                if (d > f) {
                    return ""
                }
            }
        }
    } else {
        return ""
    }
    var m = s.vars,
        l = ["classid", "codebase", "id", "width", "height", "align"];
    s.align = s.align || "middle";
    s.classid = "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000";
    s.codebase = "http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0";
    s.movie = s.url || "";
    delete s.vars;
    delete s.url;
    if ("string" == typeof m) {
        s.flashvars = m
    } else {
        var p = [];
        for (c in m) {
            r = m[c];
            p.push(c + "=" + encodeURIComponent(r))
        }
        s.flashvars = p.join("&")
    }
    var n = ["<object "];
    for (e = 0, h = l.length; e < h; e++) {
        r = l[e];
        n.push(" ", r, '="', o(s[r]), '"')
    }
    n.push(">");
    var b = {
        wmode: 1,
        scale: 1,
        quality: 1,
        play: 1,
        loop: 1,
        menu: 1,
        salign: 1,
        bgcolor: 1,
        base: 1,
        allowscriptaccess: 1,
        allownetworking: 1,
        allowfullscreen: 1,
        seamlesstabbing: 1,
        devicefont: 1,
        swliveconnect: 1,
        flashvars: 1,
        movie: 1
    };
    for (c in s) {
        r = s[c];
        c = c.toLowerCase();
        if (b[c] && (r || r === false || r === 0)) {
            n.push('<param name="' + c + '" value="' + o(r) + '" />')
        }
    }
    s.src = s.movie;
    s.name = s.id;
    delete s.id;
    delete s.movie;
    delete s.classid;
    delete s.codebase;
    s.type = "application/x-shockwave-flash";
    s.pluginspage = "http://www.macromedia.com/go/getflashplayer";
    n.push("<embed");
    var q;
    for (c in s) {
        r = s[c];
        if (r || r === false || r === 0) {
            if ((new RegExp("^salign\x24", "i")).test(c)) {
                q = r;
                continue
            }
            n.push(" ", c, '="', o(r), '"')
        }
    }
    if (q) {
        n.push(' salign="', o(q), '"')
    }
    n.push("></embed></object>");
    return n.join("")
};
baidu.swf.create = function (a, c) {
    a = a || {};
    var b = baidu.swf.createHTML(a) || a.errorMessage || "";
    if (c && "string" == typeof c) {
        c = document.getElementById(c)
    }
    if (c) {
        c.innerHTML = b
    } else {
        document.write(b)
    }
};
baidu.swf.getMovie = function (c) {
    var a = document[c],
        b;
    if (a && a.length) {
        a = (b = baidu.array.remove(baidu.lang.toArray(a), function (d) {
            return d.tagName.toLowerCase() != "embed"
        })).length >= 1 ? b[0] : b
    }
    return baidu.browser.ie == 9 ? a : a || window[c]
};
baidu.url = baidu.url || {};
baidu.url.getQueryValue = function (c, b) {
    var d = new RegExp("(^|&|\\?|#)" + baidu.string.escapeReg(c) + "=([^&#]*)(&|\x24|#)", "");
    var a = (b || window.location.href).match(d);
    if (a) {
        return a[2]
    }
    return null
};
baidu.url.escapeSymbol = function (a) {
    return String(a).replace(/[#%&+=\/\\\ \\u3000\f\r\n\t]/g, function (b) {
        return "%" + (256 + b.charCodeAt()).toString(16).substring(1).toUpperCase()
    })
};
baidu.url.jsonToQuery = function (c, e) {
    var a = [],
        d, b = e || function (f) {
            return baidu.url.escapeSymbol(f)
        };
    baidu.object.each(c, function (g, f) {
        if (baidu.lang.isArray(g)) {
            d = g.length;
            while (d--) {
                a.push(f + "=" + b(g[d], f))
            }
        } else {
            a.push(f + "=" + b(g, f))
        }
    });
    return a.join("&")
};
baidu.url.queryToJson = function (a) {
    var f = a.substr(a.lastIndexOf("?") + 1),
        c = f.split("&"),
        e = c.length,
        k = {}, d = 0,
        h, g, j, b;
    for (; d < e; d++) {
        if (!c[d]) {
            continue
        }
        b = c[d].split("=");
        h = b[0];
        g = b[1];
        j = k[h];
        if ("undefined" == typeof j) {
            k[h] = g
        } else {
            if (baidu.lang.isArray(j)) {
                j.push(g)
            } else {
                k[h] = [j, g]
            }
        }
    }
    return k
};
window.F = window.F || {};
window.$ = T.get;
F.version = "20120511";
F.config = T.object.extend({
    timeStrart: (new Date()).getTime(),
    ctrlname: "",
    ipcollect: 0,
    firstTimeSetting: 300,
    normalTimeSetting: 3600,
    server_time: (new Date()).getTime(),
    media_module: "subject",
    jsdate: "new",
    down_url: "http://partner.funshion.com/partner/download.php?id=1024",
    down_version: "2.4.5",
    down_build: "Build25",
    debug: 0,
    mmCode: "",
    mmCode2: "",
    mmCode3: ""
}, F.config || {});
F.config.staticHost = "http://www.funshion.com";
F.config.fsHost = "http://fs.funshion.com";
F.config.fsqqHost = "http://fsqq.funshion.com";
F.config.imgHost = "http://img.funshion.com";
F.config.statHost = "http://stat.funshion.net";
F.config.gstatHost = "http://gstat.funshion.com";
F.config.bms = "http://bms.funshion.com";
F.config.api = "http://api.funshion.com";
F.config.q = "http://q.funshion.com";
F.config.isFsHostTrue = F.config.fsHost.indexOf(window.location.host) == -1 ? false : true;
F.config.isFsqqHost = F.config.fsqqHost.indexOf(window.location.host) == -1 ? false : true;
F.config.isFsHost = F.config.isFsHostTrue || F.config.isFsqqHost;
F.each = function (b, d) {
    for (var c = 0; c < b.length; c++) {
        d.call(b[c], c, b)
    }
};
F.collect = function () {
    if (T.isFunction(window.CollectGarbage)) {
        CollectGarbage()
    }
};
F.string = {};
(function () {
    var a = function (g, d) {
        var h = "",
            j = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
            b = Math.max(g.length, d.length);
        for (var f = 0; f < b; f++) {
            var c = g.charCodeAt(f) ^ d.charCodeAt(f);
            h += j.charAt(c % 52)
        }
        return h
    };
    F.string.hash = function (g, c) {
        var c = c || 32,
            h = 0,
            f = 0,
            b = "",
            d = c - g.length % c;
        for (f = 0; f < d; f++) {
            g += "0"
        }
        while (h < g.length) {
            b = a(b, g.substr(h, c));
            h += c
        }
        return b
    }
})();
F.string.stripscript = function (a) {
    return a.toString().replace(/<script.*?>[^\x00]*?<\/script>/ig, "")
};
(function () {
    var a = [];
    var b = function (h, g, c, k) {
        var j = F.string.hash(h + g);
        if (!c && T.array.indexOf(a, j) > -1) {
            return
        }
        if (c && T.get(j)) {
            T.dom.remove(T.get)
        }
        a.push(j);
        var f = T.dom.create("script", {
            type: "text/javascript",
            id: j,
            charset: "utf-8"
        });
        try {
            if (h) {
                f.src = h
            } else {
                if (g) {
                    f.text = g
                }
            }
            T.dom.insertBefore(f, document.body.firstChild)
        } catch (d) {}
    };
    F.string.evalscript = function (g) {
        if (g.indexOf("<script") == -1) {
            return g
        }
        var h = /<script[^\>]*?>([^\x00]*?)<\/script>/ig,
            c = [],
            d = this;
        while (c = h.exec(g)) {
            var j = /<script[^\>]*?src=\"([^\>]*?)\"[^\>]*?(reload=\"1\")?(?:charset=\"([\w\-]+?)\")?><\/script>/i;
            var f = [];
            f = j.exec(c[0]);
            if (f) {
                b(f[1], "", f[2], f[3])
            } else {
                j = /<script(.*?)>([^\x00]+?)<\/script>/i;
                f = j.exec(c[0]);
                b("", f[2], f[1].indexOf("reload=") != -1)
            }
        }
        return g
    }
})();
F.http = F.http || {};
(function () {
    var a = function (j, h) {
        return "callback_" + F.string.hash(F.string.hash(j) + "-" + F.string.hash(h.toString())).toLowerCase()
    };
    var g = function (j) {
        var h = T.isString(j.data) ? T.json.parse(j.data) : j.data;
        if (h && h.key && T.isFunction(c[h.key])) {
            c[h.key](h.data, h.transport);
            c[h.key] = undefined;
            try {
                delete c[h.key]
            } catch (j) {}
            if (!h.proxy) {
                return
            }
            if (T.get(h.proxy)) {
                T.dom.remove(h.proxy)
            }
        }
    };
    var b = {};
    var d = {};
    var f = {};
    var c = {};
    T.on(window, "message", g);
    T.observer.add("ajax-proxy", g);
    F.http.get = function (j, h) {
        return new this.request(j, {
            method: "get",
            onComplete: h
        })
    };
    F.get = F.http.get;
    F.http.post = function (j, k, h) {
        return new this.request(j, {
            method: "post",
            parameters: k,
            onComplete: h
        })
    };
    F.post = F.http.post;
    F.jsonp = F.http.jsonp = function (j, h) {
        var h = h || function () {};
        var k = a(j, h);
        window[k] = function (l) {
            h(l);
            setTimeout(function () {
                var n = document.getElementsByTagName("script");
                for (var m = n.length - 1, o; m >= 0; m--) {
                    n[m] && (o = n[m]);
                    console.log(o);
                    if (o && o.getAttribute("src") && (o.getAttribute("src").indexOf(k) > -1)) {
                        o.parentNode.removeChild(o);
                    }
                }
            }, 100);
        };
        setTimeout(function () {
            F.http.loadJs(j + (j.match(/\?/) ? "&" : "?") + "callback=" + k);
        }, 100);
    };
    F.http.setProxy = function (j) {
        var h = j.match(/.*\:\/\/([^\/]*).*/);
        if (!h) {
            return
        }
        f[h[1]] = j
    };
    F.http.request = function (j, k) {
        this.url = j;
        this.transport = null;
        this.proxyKey = "";
        this.options = {
            method: "GET",
            asyn: true,
            format: "text",
            contentType: "application/x-www-form-urlencoded",
            parameters: "",
            timeout: 0,
            onComplete: function () {}
        };
        this.options = T.object.extend(this.options, k || {});
        if (!T.isFunction(this.options.onComplete)) {
            this.options.onComplete = T.fn.blank
        }
        if (!T.isString(this.options.parameters)) {
            this.options.parameters = T.url.jsonToQuery(this.options.parameters, window.encodeURIComponent)
        }
        var h = this.url.match(/.*\:\/\/([^\/]*).*/);
        if (h && h[1] != window.location.host) {
            this._sendProxy(h[1])
        } else {
            this._sendLocal()
        }
    };
    F.http.request.prototype._getTransport = function () {
        if (window.ActiveXObject && !window.XMLHttpRequest) {
            var k = ["Msxml2.XMLHTTP.5.0", "Msxml2.XMLHTTP.4.0", "Msxml2.XMLHTTP.3.0", "Msxml2.XMLHTTP", "Microsoft.XMLHTTP"];
            for (var h = 0; h < k.length; h++) {
                try {
                    return new window.ActiveXObject(k[h])
                } catch (j) {}
            }
            return null
        } else {
            return new XMLHttpRequest()
        }
    };
    F.http.request.prototype._complete = function () {
        var j = null;
        switch (this.options.format.toLowerCase()) {
        case "json":
            try {
                j = T.json.parse(this.transport.responseText)
            } catch (h) {}
            break;
        case "xml":
            try {
                j = this.transport.responseXML
            } catch (h) {}
            break;
        case "text":
        default:
            j = this.transport.responseText;
            break
        }
        var k = {
            status: this.transport.status,
            option: this.options,
            url: this.url
        };
        if (T.isFunction(this.options.onComplete)) {
            this.options.onComplete(j, k)
        }
    };
    F.http.request.prototype._sendProxy = function (k) {
        var j = k.replace(/\./g, "_") + "_ajax_proxy";
        var h = this;
        var m = function (p) {
            if (!d[p] || !d[p].sc) {
                var n = arguments;
                return setTimeout(function () {
                    n.callee(p)
                }, 100)
            }
            h.proxyKey = p;
            var q = d[p].sc.contentWindow;
            var o = T.json.stringify({
                url: h.url,
                option: h.options,
                key: p,
                proxy: p
            });
            c[p] = h.options.onComplete;
            if (q.postMessage) {
                q.postMessage(o, "*")
            } else {
                (function () {
                    var r = arguments;
                    if (d[p] && d[p].sc) {
                        d[p].sc.contentWindow.name = o
                    } else {
                        setTimeout(r.callee, 100)
                    }
                })()
            }
        };
        d[j] = {};
        var l = f[k] || "http://" + k + "/html/ajax_proxy.html?v=" + F.version + "&jsdate=" + F.config.jsdate + "&host=" + window.location.hostname + "&domain=" + (document.domain == window.location.hostname ? 0 : 1);
        F.http.proxy(l, "iframe", 50, function (n) {
            b[j] = true;
            d[n] = d[n] || {};
            d[n].sc = T.get(n);
            m(n)
        }, "proxy_ajax_" + j + "_" + (+new Date()).toString())
    };
    F.http.request.prototype._sendLocal = function () {
        if (this.options.method.toUpperCase() == "GET" && this.options.parameters.length > 0) {
            this.url += (this.url.match(/\?/) ? "&" : "?") + this.options.parameters
        }
        this.transport = this._getTransport();
        this.transport.open(this.options.method.toUpperCase(), this.url, this.options.asyn);
        if (this.options.asyn) {
            var h = this;
            this.transport.onreadystatechange = function () {
                switch (h.transport.readyState) {
                case 4:
                    h._complete();
                    break
                }
            }
        }
        this.requestHeaders = ["X-Requested-With", "XMLHttpRequest", "Accept", "text/javascript, text/html, application/xml, text/xml, */*"];
        if (this.options.method.toUpperCase() == "POST") {
            this.requestHeaders.push("Content-type", this.options.contentType)
        }
        for (var k = 0; k < this.requestHeaders.length; k += 2) {
            this.transport.setRequestHeader(this.requestHeaders[k], this.requestHeaders[k + 1])
        }
        this.transport.send(this.options.method.toUpperCase() == "POST" ? this.options.parameters : null);
        if (!this.options.asyn) {
            this._complete()
        }
    };
    F.http.request.prototype.abort = function () {
        if (this.transport) {
            this.options.onComplete = null;
            this.transport.abort();
            return
        }
        var h = T.get(this.proxyKey);
        if (this.proxyKey && h) {
            if (c[this.proxyKey]) {
                c[this.proxyKey] = undefined;
                try {
                    delete c[this.proxyKey]
                } catch (j) {}
            }
            h.src = "about:blank";
            setTimeout(function () {
                T.dom.remove(h)
            }, 50)
        }
    };
    F.http.loadJs = function (l, h, p) {
        var j = "",
            p = p || "utf-8",
            h = h || function () {};
        if (T.isArray(l)) {
            if (l.length == 0) {
                return h()
            }
            j = l.shift();
            var k = h,
                n = this;
            var h = function () {
                n.loadJs(l, k)
            }
        } else {
            j = l.toString();
        }
        var m = T.dom.create("script", {
            type: "text/javascript",
            charset: p,
            async: "async",
            src: j
        });
        if (document.all) {
            m.onreadystatechange = function () {
                if (m.readyState == "loaded" || m.readyState == "complete") {
                    h();
                }
            }
        } else {
            m.onload = h;
        }
        T.dom.insertBefore(m, document.documentElement.firstChild.lastChild);
    };
    F.http.proxy = function (k, l, j, o, n) {
        var h = this;
        var o = o || function () {}, j = isNaN(parseInt(j)) ? 1 : parseInt(j);
        if (j) {
            return setTimeout(function () {
                h.proxy(k, l, 0, o, n)
            }, j)
        }
        var n = n || (k.toString().substr(0, 6) == "fsp://" ? "proxy_fsp" : "proxy_" + F.string.hash(k));
        if (T.get(n) != null) {
            T.dom.remove(T.get(n));
            return setTimeout(function () {
                h.proxy(k, l, 0, o, n)
            }, 100)
        }
        if (l.toLowerCase() == "script") {
            return this.loadJs(k, o)
        }
        var m = T.dom.create(l, {
            id: n,
            src: k
        });
        T.on(m, "load", function () {
            o(n)
        });
        T.dom.setStyles(m, {
            display: "none"
        });
        T.dom.insertBefore(m, document.body.firstChild)
    };
    F.http.crossDomain = function (h, k, n) {
        var m = T.dom.create("iframe", {
            src: "about:blank"
        });
        T.setStyles(m, {
            width: 1,
            height: 1,
            display: "none"
        });
        T.dom.insertBefore(m, document.body.firstChild);
        var j = T.json.stringify(k);
        h += (h.indexOf("?") > -1 ? "&" : "?") + "proxyDomain=" + (n || 0);
        try {
            m.contentWindow.document.write('<!DOCTYPE HTML><html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /></head><body><script type="text/javascript" charset="utf-8">window.loadEvent = function(){window.name=\'' + j + "';window.location.replace(\"" + h + '");};setTimeout(window.loadEvent, 50);<\/script></body></html>')
        } catch (l) {}
    }
})();
F.request = F.http.request;
F.math = {
    tweener: {
        simple: function (f, a, h, g) {
            return h * f / g + a
        },
        easeInCubic: function (f, a, h, g) {
            return h * (f /= g) * f * f + a
        },
        easeInOutCubic: function (f, a, h, g) {
            if ((f /= g / 2) < 1) {
                return h / 2 * f * f * f + a
            }
            return h / 2 * ((f -= 2) * f * f + 2) + a
        },
        easeOutCubic: function (f, a, h, g) {
            return h * ((f = f / g - 1) * f * f + 1) + a
        },
        easeOutInCubic: function (f, a, h, g) {
            if (f < g / 2) {
                return F.math.tweener.easeOutCubic(f * 2, a, h / 2, g)
            }
            return F.math.tweener.easeInCubic((f * 2) - g, a + h / 2, h / 2, g)
        },
        easeInQuint: function (f, a, h, g) {
            return h * (f /= g) * f * f * f * f + a
        },
        easeOutQuint: function (f, a, h, g) {
            return h * ((f = f / g - 1) * f * f * f * f + 1) + a
        },
        easeInExpo: function (f, a, h, g) {
            return (f == 0) ? a : h * Math.pow(2, 10 * (f / g - 1)) + a - h * 0.001
        },
        easeOutBack: function (f, a, j, h, g) {
            if (g == undefined) {
                g = 1.70158
            }
            return j * ((f = f / h - 1) * f * ((g + 1) * f + g) + 1) + a
        }
    }
};
F.tool = F.tool || {};
F.tool.addSheet = function (b) {
    if (!-[1, ]) {
        b = b.replace(/opacity:\s*(\d?\.\d+)/g, function (j, h) {
            h = parseFloat(h) * 100;
            if (h < 0 || h > 100) {
                return ""
            }
            return "filter:alpha(opacity=" + h + ");"
        })
    }
    b += "\n";
    var g = document,
        a = g.getElementsByTagName("head")[0],
        d = a.getElementsByTagName("style"),
        c, f;
    if (d.length == 0) {
        if (g.createStyleSheet) {
            g.createStyleSheet()
        } else {
            c = g.createElement("style");
            c.setAttribute("type", "text/css");
            a.insertBefore(c, null)
        }
    }
    c = d[0];
    f = c.getAttribute("media");
    if (f === null && !/screen/i.test(f)) {
        c.setAttribute("media", "all")
    }
    if (c.styleSheet) {
        c.styleSheet.cssText += b
    } else {
        if (g.getBoxObjectFor) {
            c.innerHTML += b
        } else {
            c.appendChild(g.createTextNode(b))
        }
    }
};
F.tool.cookie = {
    get: function (b) {
        var g = document.cookie;
        if (!g.length) {
            return ""
        }
        var f = g.split("; ");
        for (var d = f.length - 1; d >= 0; d--) {
            var a = f[d].split("=");
            if (a.length > 1 && a[0] == b && a[1]) {
                return unescape(T.trim(a[1]))
            }
        }
        return ""
    },
    set: function (c, g, b, f, d) {
        var b = b || 365,
            a = new Date(),
            f = f || ".funshion.com",
            d = d || 0;
        a.setTime((new Date()).getTime() + 3600 * 24 * 1000 * b);
        document.cookie = c + "=" + escape(g) + "; path=/; " + (d ? "host" : "domain") + "=" + f + (b == -1 ? "" : ";expires=" + a.toGMTString())
    },
    del: function (a) {
        this.set(a, "", - 365, null, 0);
        this.set(a, "", - 365, document.location.host, 1)
    }
};
F.cookie = F.tool.cookie;
F.tool.form = {
    serialize: function (f) {
        var k = document.forms[f];
        if (!k) {
            return false
        }
        var b = "",
            a = k.elements,
            h = {};
        for (var g = 0, d; d = a[g]; g++) {
            if (d.disabled || !d.name) {
                continue
            }
            if (d.type && T.array.indexOf(["radio", "checkbox"], d.type.toLowerCase()) > -1 && !d.checked) {
                continue
            }
            var c = d.name;
            if (typeof h[c] == "undefined" || typeof h[c] == "unknown") {
                h[c] = []
            }
            h[c].push(encodeURIComponent(d.value))
        }
        var b = [];
        for (var f in h) {
            for (var g = 0; g < h[f].length; g++) {
                b[b.length] = f + "=" + h[f][g]
            }
        }
        return b.join("&")
    },
    disabledCtrl: function (a) {
        var a = a || window.event;
        if (a.keyCode == 13 || a.keyCode == 17) {
            return false
        }
    },
    send: function (c, a) {
        var f = document.forms[c];
        if (typeof f == "undefined" || typeof f == "unknown") {
            return false
        }
        var b = f.getAttribute("action"),
            d = this.serialize(c);
        F.http.post(b, d + "&myFormAc=update", function (g) {
            if (typeof a == "function") {
                a(g)
            } else {
                F.string.evalscript(g)
            }
            return true
        });
        return false
    },
    formPost: function (c) {
        var d = T.dom.create("form", {
            name: "post_form_temp",
            id: "post_form_temp",
            action: c,
            method: "POST",
            target: "_self"
        });
        var b = T.dom.create("input", {
            type: "hidden",
            name: "myFormAc",
            value: "op"
        });
        d.appendChild(b);
        T.dom.insertBefore(d, document.body.firstChild);
        document.forms.post_form_temp.submit()
    }
};
F.form = F.tool.form;
F.tool.searchTip = function (a, b) {
    a = T.get(a), b = T.get(b);
    if (a == null || b == null) {
        return
    }
    b.style.display = "";
    var c = function (d) {
        T.hide(b);
        if (d.getAttribute("rel") && d.value == "") {
            d.value = d.getAttribute("rel");
            d.select()
        }
    };
    T.event.on(a, "focus", function () {
        c(this)
    });
    T.event.on(a, "blur", function () {
        if (T.trim(a.value).length == 0) {
            T.show(b)
        } else {
            T.hide(b)
        }
    });
    T.event.on(b, "click", function () {
        T.hide(b);
        a.focus()
    });
    if (T.trim(a.value).length) {
        c(a)
    }
};
(function () {
    var g = {}, d = [];
    var b = {
        "tool.playInfo": ["tool.pager"],
        "tool.clientStop": ["tool.dialog"],
        "tool.turn": ["tool.dialog"],
        "tool.replyNew": ["tool.rightMenu"],
        "tool.mediaVoteMore": ["tool.rightMenu"],
        "bms.mediaCommend": ["tool.dialog"],
        "html.novice": ["tool.dialog"]
    };
    var f = function (h) {
        if (!T.isArray(g[h])) {
            return
        }
        while (g[h].length > 20) {
            g[h].shift()
        }
        T.array.each(g[h], function (k) {
            var j = k[0].split(".");
            if (j.length == 1) {
                j.unshift("tool")
            }
            if (F[j[0]] && F[j[0]][j[1]]) {
                T.fn.bind(k[1], F[j[0]][j[1]])()
            }
        });
        delete g[h]
    };
    var a = function (k) {
        if (!T.isArray(b[k])) {
            return []
        }
        var j = [],
            h = [];
        var l = function (m) {
            if (T.array.indexOf(h, m) > -1) {
                return
            }
            h.push(m);
            var n = b[m] || [];
            j = j.concat(n);
            T.array.each(n, function (p, o) {
                l(p)
            })
        };
        l(k);
        return j
    };
    var c = function (k, h) {
        var h = h || T.fn.blank,
            k = T.isArray(k) ? k : String(k).split(","),
            j = [],
            n = [],
            m = k[k.length - 1],
            l = F.string.hash(k.join("_"));
        T.array.each(k, function (p) {
            var o = p.split("."),
                r, q = 0;
            if (o.length == 1) {
                o.unshift("tool")
            }
            r = o.join(".");
            n = n.concat(r).concat(a(r))
        });
        n = n.reverse();
        T.array.each(T.array.unique(n), function (q, p) {
            var o = q.split(".");
            if (F[o[0]] && F[o[0]][o[1]]) {
                return
            }
            j.push(q.replace(".", "/") + (F.config.debug ? "" : "-min") + ".js")
        });
        if (T.isArray(g[l])) {
            g[l].push([m, h]);
            return
        }
        g[l] = [];
        g[l].push([m, h]);
        if (!j.length) {
            return f(l)
        }
        new F.http.loadJs(j.length == 1 ? "http://static.funshion.com/main/" + F.config.jsdate + "/js/v8/" + j[0] + "?v=" + F.version : F.config.q + "/js.php?jsdate=" + F.config.jsdate + "&js=" + j.join(",").replace(/\-min/ig, ""), function () {
            f(l)
        })
    };
    F.load = F.tool.load = function (k, j) {
        var h = arguments;
        if (k) {
            if (h.length > 2 && T.isString(h[2])) {
                k = h[2] + (k.indexOf(".") > -1 ? "" : ".") + k.slice(Math.max(0, k.indexOf(".")))
            }
            new c(k, j)
        }
        return false
    }
})();
F.play = F.tool.play = function (a, b, c) {
    if (!F.client.isSetup(1)) {
        window.location.href = "/" + F.config.media_module + "/" + a;
        return false
    }
    if (!b.getAttribute("id")) {
        b.setAttribute("id", T.lang.guid())
    }
    var d = String(b.getAttribute("id"));
    c = c || baidu.dom.getPosition(b);
    if (T.observer.dispatchEvent("playInfo.show.click", {
        mediaid: a,
        target: d,
        x: c.left,
        y: c.top
    })) {
        setTimeout(function () {
            F.load("playInfo", function () {
                this.show(a, c, d)
            })
        }, 13)
    }
    return false
};
window.playstopad = function () {
    try {
        T.observer.send("client.stop.show", {})
    } catch (a) {}
};
F.client = {
    version: function () {
        try {
            if (window.external) {
                var a = window.external.GetVersion();
                if (a) {
                    return a
                }
            }
        } catch (d) {}
        var b = T.trim(F.cookie.get("_version")).split(" ")[0];
        var c = "";
        if (b || !F.tool.localStorage || !F.tool.localStorage.hasReady()) {
            return b
        }
        F.tool.localStorage.get("_version", function (f) {
            c = f ? f : ""
        });
        return c
    },
    versionCompare: function (a, d) {
        var b = /\d\.\d+\.\d+\.\d+/;
        a = b.exec(a);
        d = b.exec(d);
        var c = function (g) {
            var f = g.split(".");
            return parseInt(f[0]) * (200 * 200 * 200) + parseInt(f[1]) * (200 * 200) + parseInt(f[2]) * 200 + parseInt(f[3])
        };
        if (!a || !d) {
            return -1
        }
        a = c(a[0]);
        d = c(d[0]);
        if (a > d) {
            return 1
        } else {
            if (a == d) {
                return 0
            }
        }
        return -1
    },
    swfVersionCompare: function (d) {
        d = d || "9.0.124";
        var f = d.split(".");
        var b = (T.swf.version || "").split(".");
        var c, a;
        for (i = 0; i < 3; i++) {
            c = parseInt(b[i], 10);
            a = parseInt(f[i], 10);
            if (a < c) {
                break
            } else {
                if (a > c) {
                    return true
                }
            }
        }
        return false
    },
    startClientToTray: function () {
        if (!T.browser.ie) {
            return false
        }
        try {
            var a = new ActiveXObject("Fun.OnlineInstallCtrl.1");
            if (a) {
                a.StartFunToTray();
                return true
            }
        } catch (b) {}
        return false
    },
    isActiveX: function () {
        try {
            var a = new ActiveXObject("Fun.OnlineInstallCtrl.1");
            if (a) {
                return true
            }
        } catch (b) {}
        return false
    },
    isSetup: function (d) {
        try {
            if (window.external) {
                var a = window.external.GetVersion();
                if (a) {
                    return true
                }
            }
        } catch (h) {}
        try {
            var b = new ActiveXObject("Fun.OnlineInstallCtrl.1");
            if (b) {
                try {
                    b.getIsInstallFun();
                    var g = !! parseInt(b.bInstallFun);
                    if (g) {
                        return true
                    }
                } catch (h) {}
            }
        } catch (h) {}
        if (F.config.isFsHost) {
            return true
        }
        if (!T.platform.isWindows) {
            return false
        }
        var c = "funshion_setup",
            f = !! (parseInt(F.cookie.get(c)) || 0);
        if (f || !d || !F.tool.localStorage || !F.tool.localStorage.hasReady()) {
            return f
        }
        F.tool.localStorage.get(c, function (j) {
            f = j ? parseInt(j) : 0
        });
        return !!f
    },
    limitSpeed: function (b) {
        var a = /[0|1]/.exec(String(b) || 0);
        if (!window.external || !a) {
            return
        }
        try {
            window.external.PlayVideo(parseInt(a[0]))
        } catch (c) {}
        if (window.console) {
            console.log("limitSpeed : " + b)
        }
    },
    login: function () {
        try {
            if (F.config.isFsHost && window.external) {
                window.external.login()
            }
        } catch (a) {}
    },
    logout: function () {
        try {
            if (F.config.isFsHost && window.external) {
                window.external.logout()
            }
        } catch (a) {}
    },
    video: function (b) {
        var a = {
            mp4: false,
            ts: false
        };
        a = T.extend(a, b || {});
        if (!a.mp4 && !a.ts) {
            return "none"
        }
        if (a.mp4 && T.swf.version) {
            return "flash"
        }
        if (T.browser.safari && (T.platform.isIpad || T.platform.isIphone || T.platform.isMacintosh)) {
            return a.ts ? "ts" : "apple-mp4"
        }
        if (a.mp4) {
            if (T.platform.isMacintosh || T.platform.isWindows || T.platform.isX11 || T.swf.version) {
                return "flash"
            }
            var c = document.createElement("video");
            if (c && T.isFunction(c.canPlayType) && String(c.canPlayType("video/mp4; codecs=avc1")).toLowerCase() == "probably") {
                return "mp4"
            }
            c = null;
            if (T.platform.isAndroid) {
                return "flash"
            }
        }
        return "none"
    },
    web: {
        init: function () {
            T.observer.send("webplay.init", {})
        },
        playerCallEvent: function (b, a) {
            T.observer.send("webplay.callEvent", {
                param: b,
                fullScreen: a
            })
        },
        install: function () {
            T.observer.send("webplay.install", {});
            return true
        },
        next: function (c, a) {
            var b = {
                desc: c,
                pid: a
            };
            T.observer.send("webplay.next", {
                param: b
            })
        }
    },
    eventCenter: function (a, b) {
        T.observer.send(a, T.json.parse(b) || {})
    }
};
F.thirdConn = {
    build: function (b, d, c) {
        c = c || "small";
        var a = "http://" + location.host + "/account/information?open=" + c;
        return b + encodeURIComponent("http://sso.funshion.com/sso/oauth/account/bind?oauth_provider=" + d + "&service=" + encodeURIComponent(a))
    },
    complete: function (a, f, b) {
        a = parseInt(a);
        var d = window.opener || window;
        try {
            if (d && d.T) {
                d.T.observer.send("third.bind", {
                    s: a,
                    m: f,
                    t: b
                })
            }
        } catch (c) {}
        if (T.url.getQueryValue("open") == "small") {
            try {
                window.close()
            } catch (c) {}
        }
    }
};
T.observer.add("third.bind", function (a) {
    if (a && a.m) {
        F.load("dialog", function () {
            var b = this.alert("\u98ce\u884c\u63d0\u793a\u60a8", '<p class="padding">' + a.m + "</p>");
            b.close(3000)
        })
    }
});
(function () {
    F.setTimeout = function (d, b, c) {
        if (!T.isFunction(d)) {
            throw ("nonstandard function")
        }
        var f = arguments.length > 3 ? [].slice.call(arguments, 3) : null;
        var a = function () {
            var g = (f) ? f.concat([].slice.call(arguments, 1)) : arguments;
            return d.apply(c || window, g)
        };
        return window.setTimeout(a, b || 0)
    };
    F.clearTimeout = function (a) {
        window.clearTimeout(a)
    }
})();
F.tpl = (function () {
    var root = null;

    function simple(key, kv) {
        var keys = key.split("."),
            i = 0,
            len = keys.length;
        if (keys[0] == "super") {
            keys.shift();
            len--;
            kv = root
        }
        do {
            kv = kv[keys[i]];
            i++;
            if (kv == null) {
                break
            }
        } while (i < len && typeof (kv) == "object");
        return kv
    }
    function _parseMapTpl(tpl, values, renderer, pk, parent) {
        var re = /\$\{([^\}]+?)\}/ig;
        var view = tpl.replace(re, function ($0, $1) {
            try {
                var val = simple($1, values);
                val = (val == null ? "" : val);
                if (typeof renderer == "function") {
                    var tmp = renderer.call(this, $1, val, values, pk, parent);
                    return tmp == null ? val : tmp
                }
                return val
            } catch (e) {
                if (window.console) {
                    console.log($1 || e.message || e)
                }
                return null
            }
        });
        return view
    }
    function _parseEnter(tpl, data, renderer, pk, parent) {
        var map = ["loop", "if"];
        for (var m = 0; m < map.length; m++) {
            var regx = new RegExp("<" + map[m] + "\\s+(.+?)>([\\s\\S]+?)<\\/" + map[m] + ">", "ig");
            if (regx.test(tpl)) {
                tpl = tpl.replace(regx, function ($0, $1, $2, $3, $4) {
                    var output = "";
                    if (map[m].toUpperCase() == "LOOP") {
                        var arr = data;
                        if ($1 != ".") {
                            arr = simple($1, data)
                        }
                        for (var i = 0; arr != null && i < arr.length; i++) {
                            var item = {};
                            if (typeof (arr[i]) != "object") {
                                item.__val = arr[i]
                            } else {
                                item = arr[i]
                            }
                            item.__offset = i;
                            output += _parseEnter($2, item, renderer, $1, arr)
                        }
                    } else {
                        if (map[m].toUpperCase() == "IF") {
                            try {
                                var _if = _parseEnter($1, data);
                                if (eval(_if)) {
                                    return _parseEnter($2, data, renderer, pk, parent)
                                }
                            } catch (e) {
                                if (window.console) {
                                    console.log($1 || e.message || e)
                                }
                            }
                        }
                    }
                    return output
                })
            }
        }
        return _parseMapTpl(tpl, data, renderer, pk, parent)
    }
    function parse(tpl, data, renderer, pk, parent) {
        root = data;
        return _parseEnter(tpl, data, renderer, pk, parent)
    }
    return function () {
        this.val = simple;
        this.parse = parse;
        return this
    }
})()();
(function () {
    var c = [];
    var a = {
        tl: {
            radius: 4
        },
        tr: {
            radius: 4
        },
        bl: {
            radius: 4
        },
        br: {
            radius: 4
        },
        antiAlias: true
    };
    var b = function (d, f) {
        if (T.isFunction(window.curvyCorners)) {
            window.curvyCorners(f || a, d)
        } else {
            c.push({
                target: d,
                param: f
            })
        }
    };
    T.lang.eventCenter.addEventListener("corner", function (d) {
        if (!document.all || !d.target) {
            return
        }
        b(d.target, d.param)
    });
    T.ready(function () {
        if (!document.all || (T.browser.ieTrue && T.browser.ieTrue >= 9)) {
            return
        }
        F.http.loadJs("http://static.funshion.com/main/" + F.config.jsdate + "/js/v8/curvycorners-min.js?v=" + F.version, function () {
            if (!T.isFunction(window.curvyCorners)) {
                return setTimeout(arguments.callee, 100)
            }
            T.array.each(c, function (d) {
                curvyCorners(d.param || a, d.target)
            });
            c = []
        })
    });
    F.corner = function (d, f) {
        if (!document.all) {
            return this
        }
        b(d, f);
        return this
    };
    F.cornerSetting = function (d) {
        if (!document.all) {
            return
        }
        a = d
    }
})();
(function () {
    var a = {};
    var d = function (g, f, h) {
        if (!T.isFunction(f)) {
            return false
        }
        if (!a[g]) {
            a[g] = []
        }
        h = h || T.lang.guid();
        f.deleHashKey = h;
        var j = {
            index: a[g].length,
            name: g,
            key: h,
            fun: f
        };
        a[g].push(j);
        return j
    };
    var b = function (f, h) {
        if (!a[f]) {
            return false
        }
        var j = a[f];
        if (T.isFunction(h) || T.isString(h)) {
            if (T.isFunction(h)) {
                h = h.deleHashKey
            }
            for (var g = j.length - 1; g >= 0; g--) {
                if (j[g].key == h) {
                    j.splice(g, 1)
                }
            }
        } else {
            if (T.isNumber(h)) {
                j.splice(h, 1)
            } else {
                a[f] = []
            }
        }
        return true
    };
    var c = function (k) {
        if (T.isString(k)) {
            k = {
                name: k
            }
        }
        if (!(k.name != undefined && a[k.name] && a[k.name].length)) {
            return false
        }
        var l = a[k.name],
            h, g = arguments.length > 1 ? [].slice.call(arguments, 1) : null;
        k.scope = k.scope || window;
        for (var j = 0, f = l.length; j < f; j++) {
            h = l[j].fun.apply(k.scope, g);
            if (typeof h == "boolean") {
                if (h === false) {
                    break
                }
            } else {
                if (T.isArray(h) || T.isObject(h)) {
                    T.extend(g, h)
                } else {
                    if (h == undefined) {} else {
                        g[0] = h
                    }
                }
            }
        }
        return g
    };
    F.delegate = {
        add: d,
        del: b,
        call: c
    }
})();
if (T.browser.ieTrue < 7) {
    try {
        document.execCommand("BackgroundImageCache", false, true)
    } catch (e) {}
};
window.F = window.F || {};
window.F.tool = window.F.tool || {};
(function () {
    var b = [".js-pager{clear:both;text-align:left;margin:10px 0;padding-left:12px;}", ".js-pager a, .js-pager span, .js-pager a.disabled, .js-pager b{cursor:pointer;display:inline-block;border:1px solid #ccc;color:#666;padding:2px 9px;line-height:18px;margin:0 2px;font-size:14px;font-family:Verdana,Arial,Helvetica,sans-serif;vertical-align : top}", ".js-pager a.p-current, .js-pager a:hover {background-color:#ffede1;color:#ff6600;border:1px solid #ff6600;}", ".js-pager a.p-current{cursor:default;font-weight:bold;}", ".js-pager a.p-info{cursor:default;}", ".js-pager a.p-first{margin-left:0;}", ".js-pager a.p-first, .js-pager a.p-next, .js-pager a.p-pre,.js-pager a.p-last{padding-top:3px\9;padding-bottom:1px\9;}", ".js-pager span.disc{cursor:default;border:0;vertical-align:text-bottom}"].join(""),
        a = 0;
    F.tool.pager = function (j) {
        this.options = {
            cls: "",
            currentPage: 1,
            pageSize: 10,
            total: 0,
            pageCount: 0,
            pageButtonNumber: 10,
            lang: {
                first: "\u7b2c\u4e00\u9875",
                pre: "\u4e0a\u4e00\u9875",
                next: "\u4e0b\u4e00\u9875",
                last: "\u6700\u540e\u4e00\u9875",
                n: "#n#"
            },
            show: {
                first: false,
                pre: true,
                next: true,
                last: false,
                more: true,
                info: false
            },
            ui: null,
            uiDelay: 100,
            uiResponse: "mouseover",
            uiHover: "p-current",
            update: T.fn.blank,
            renderTo: null
        };
        j = j || {};
        j.show = T.object.extend(this.options.show, j.show || {});
        j.lang = T.object.extend(this.options.lang, j.lang || {});
        this.options = T.object.extend(this.options, j || {});
        this.pageCount = this.options.pageCount || Math.max(1, Math.ceil(this.options.total / this.options.pageSize));
        if (this.options.currentPage > this.pageCount) {
            this.options.currentPage = this.pageCount
        }
        if (this.options.currentPage < 1) {
            this.options.currentPage = 1
        }
        if (this.options.pageButtonNumber % 2 == 0) {
            this.options.pageButtonNumber++
        }
        this.options.renderTo = T.get(this.options.renderTo);
        var m = this,
            l = [],
            f = false,
            d = 0,
            n = [];
        if (!a) {
            F.tool.addSheet(b)
        }
        a = 1;
        var k = function (r) {
            var r = r || window.event;
            T.event.stopPropagation(r);
            T.event.stop(r);
            var q = T.event.getTarget(r);
            if (!q || q.tagName.toLowerCase() != "a") {
                return false
            }
            var p = {
                first: 1,
                pre: Math.max(1, m.options.currentPage - 1),
                next: Math.min(m.options.currentPage + 1, m.pageCount),
                last: m.pageCount
            };
            var o = parseInt(q.getAttribute("rel")) || p[String(q.className).toLowerCase().substr(2)];
            if (!o) {
                return false
            }
            m.gopage(o)
        };
        var h = function (p) {
            var p = p || window.event;
            T.event.stopPropagation(p);
            T.event.stop(p);
            var q = T.event.getTarget(p);
            var o = parseInt(q.getAttribute("_page"));
            if (!o) {
                return
            }
            F.clearTimeout(d);
            if (m.options.uiDelay) {
                d = F.setTimeout(m.gopage, m.options.uiDelay, m, o)
            } else {
                m.gopage(o)
            }
        };
        var c = 0,
            e = 0;
        var i = function (o) {
            return String(m.options.lang.n).replace(/#n#/ig, o) || o
        };
        var g = function (o) {
            if (o > m.pageCount) {
                return false
            }
            c = Math.max(o, c);
            if (o == m.options.currentPage) {
                l.push("<a class='p-current' href='javascript:;'>" + i(o) + "</a>")
            } else {
                l.push("<a rel='" + o + "' title='\u7b2c" + o + "\u9875' href='javascript:;'>" + i(o) + "</a>")
            }
            return true
        };
        if (this.options.renderTo && !this.options.ui) {
            T.on(this.options.renderTo, "click", k)
        }
        this.gopage = function (o) {
            m.options.currentPage = o;
            if (T.isFunction(m.options.update)) {
                T.fn.bind(m.options.update, m)()
            }
            m.update()
        };
        this.update = function (s) {
            if (!this.options.renderTo) {
                return
            }
            c = 0;
            e = 0;
            s = s || {};
            s.show = T.object.extend(this.options.show, s.show || {});
            s.lang = T.object.extend(this.options.lang, s.lang || {});
            this.options = T.object.extend(this.options, s || {});
            l = [];
            if (!this.options.ui) {
                this.pageCount = Math.max(1, Math.ceil(this.options.total / this.options.pageSize));
                this.options.currentPage = Math.min(this.options.currentPage, this.pageCount);
                l.push("<div class='js-pager " + this.options.cls + " clearfix'>");
                if (this.pageCount < 2) {
                    l.push("</div>");
                    this.options.renderTo.innerHTML = l.join("");
                    return
                }
                var p = parseInt(this.options.pageButtonNumber / 2),
                    r = max = 0;
                if (this.options.currentPage > 1) {
                    if (this.options.show.pre) {
                        l.push("<a class='p-pre' title='\u4e0a\u4e00\u9875' href='javascript:;'>" + this.options.lang.pre + "</a>")
                    }
                }
                if (this.options.show.more && this.options.currentPage - p > 1) {
                    l.push("<span class='disc'>...</span>")
                }
                if (this.options.currentPage <= p) {
                    e = 1;
                    for (var q = 1; q <= this.options.pageButtonNumber; q++) {
                        if (false == g(q)) {
                            break
                        }
                    }
                } else {
                    if (this.options.currentPage + p > this.pageCount) {
                        e = this.pageCount - this.options.pageButtonNumber + 1 > 0 ? this.pageCount - this.options.pageButtonNumber + 1 : 1;
                        for (var q = e; q <= this.pageCount; q++) {
                            if (false == g(q)) {
                                break
                            }
                        }
                    } else {
                        e = this.options.currentPage - p > 0 ? this.options.currentPage - p : 1;
                        for (var q = e; q <= this.options.currentPage + p; q++) {
                            if (false == g(q)) {
                                break
                            }
                        }
                    }
                }
                if (this.options.show.more && this.options.currentPage + p < this.pageCount) {
                    l.push("<span class='disc'>...</span>")
                }
                if (this.options.currentPage < this.pageCount) {
                    if (this.options.show.last && c < this.pageCount) {
                        l.push("<a class='p-last' title='\u6700\u540e\u4e00\u9875' href='javascript:;'>" + this.options.lang.last + "</a>")
                    }
                    if (this.options.show.next) {
                        l.push("<a class='p-next' title='\u4e0b\u4e00\u9875' href='javascript:;'>" + this.options.lang.next + "</a>")
                    }
                }
                if (this.options.show.info) {
                    l.push("<a class='p-info' title='\u5f53\u524d\u7b2c" + this.options.currentPage + "\u9875\uff0c\u4e00\u5171" + this.pageCount + "\u9875' href='javascript:;'>" + this.options.currentPage + "/" + this.pageCount + "</a>")
                }
                l.push("</div>");
                if (this.options.currentPage > 1 && this.options.show.first && e > 1) {
                    l = l.slice(0, 2).concat("<a class='p-first' rel='1' title='\u9996\u9875' href='javascript:;'>" + this.options.lang.first + "</a>").concat(l.slice(2))
                }
                this.options.renderTo.innerHTML = l.join("");
                l = []
            } else {
                if (this.options.cls) {
                    T.addClass(this.options.renderTo, this.options.cls)
                }
                if (!f) {
                    f = true;
                    n = T.query(this.options.ui, this.options.renderTo);
                    this.pageCount = n.length;
                    for (var q = 0, o = this.pageCount; q < o; q++) {
                        T.dom.setAttr(n[q], "_page", (q + 1).toString());
                        T.on(n[q], this.options.uiResponse, h)
                    }
                } else {
                    T.array.each(n, function (u, t) {
                        if (t + 1 == m.options.currentPage) {
                            T.addClass(u, m.options.uiHover)
                        } else {
                            T.removeClass(u, m.options.uiHover)
                        }
                    })
                }
            }
        };
        this.dispose = function () {
            if (this.options.renderTo) {
                if (!this.options.ui) {
                    T.un(this.options.renderTo, "click", k);
                    this.options.renderTo.innerHTML = ""
                } else {
                    for (var p = 0, o = n.length; p < o; p++) {
                        T.un(n[p], this.options.uiResponse, h)
                    }
                }
            }
            this.options.renderTo = null;
            f = false
        };
        this.update()
    }
})();