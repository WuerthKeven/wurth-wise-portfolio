/* @ds-bundle: {"format":4,"namespace":"WRthDesignSystem_8b9de7","components":[{"name":"Button","sourcePath":"components/Button.jsx"},{"name":"WiseCredit","sourcePath":"components/WiseCredit.jsx"}],"sourceHashes":{"components/Button.jsx":"085de2cbef9f","components/WiseCredit.jsx":"a28b2d461130","ui_kits/eshop/Cart.jsx":"a22cdc9f86c9","ui_kits/eshop/CategoryBar.jsx":"ea12214b4733","ui_kits/eshop/EShopApp.jsx":"868fb2f6264d","ui_kits/eshop/Header.jsx":"1aed3b4b7d7b","ui_kits/eshop/ProductDetail.jsx":"bae627b8a707","ui_kits/eshop/ProductGrid.jsx":"599fcb79e1d9","ui_kits/eshop/data.js":"84bf0e03beeb","ui_kits/platform/PlatformApp.jsx":"cd86423fcb2c","ui_kits/platform/Sidebar.jsx":"660608edf639","ui_kits/platform/Topbar.jsx":"486354568a6f","ui_kits/platform/Views.jsx":"5e3b2ac210e7","ui_kits/platform/data.js":"191294738c90","video/animations.jsx":"ebe6809a6cbe","video/scenes.jsx":"ef1c1865f47c"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.WRthDesignSystem_8b9de7 = window.WRthDesignSystem_8b9de7 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/Button.jsx
try { (() => {
/** Würth CI button. Uppercase WuerthGlobal Bold, 4px radius. */
function Button({
  children,
  variant = "red",
  small = false,
  block = false,
  onClick
}) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
    fontFamily: "'WuerthSans', 'Arial Narrow', Arial, sans-serif",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.03em",
    lineHeight: 1,
    fontSize: small ? 11 : 13,
    padding: small ? "7px 14px" : "11px 20px",
    width: block ? "100%" : "auto"
  };
  const variants = {
    red: {
      background: "#CC0000",
      color: "#fff"
    },
    black: {
      background: "#1A1A1A",
      color: "#fff"
    },
    outline: {
      background: "#fff",
      color: "#1A1A1A",
      border: "1.5px solid #E8E8E8"
    },
    ghost: {
      background: "transparent",
      color: "#737373"
    },
    cyan: {
      background: "#0093DD",
      color: "#fff"
    }
  };
  const [hover, setHover] = React.useState(false);
  const hoverBg = {
    red: "#AA0000",
    black: "#262626",
    outline: "#F4F4F4",
    ghost: "#F4F4F4",
    cyan: "#007cbb"
  };
  const style = {
    ...base,
    ...variants[variant]
  };
  if (hover) style.background = hoverBg[variant];
  if (hover && variant === "ghost") style.color = "#1A1A1A";
  return React.createElement("button", {
    style,
    onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Button.jsx", error: String((e && e.message) || e) }); }

// components/WiseCredit.jsx
try { (() => {
const WISE_GRADIENT = 'linear-gradient(120deg, #8B30FF 0%, #B4125E 58%, #B80E4D 100%)';
const GOLD = '#FFB400';

/** "Built by WISE" attribution lockup — WISE team identity.
 *  Uses the resolved logo asset relative to the consuming page, so it also
 *  works when the design system is copied into a skill folder. */
function WiseCredit({
  variant = 'badge',
  on = 'light',
  label = 'Built by',
  accent = true,
  logoBase = '../assets'
}) {
  const dark = on === 'dark';
  const textColor = dark ? '#BFBFBF' : '#737373';
  const logo = dark ? `${logoBase}/wise-logo-dark.png` : `${logoBase}/wise-logo-light.png`;
  const alt = 'WISE — Würth Innovation & Solutions Excellence';
  if (variant === 'bar') {
    return React.createElement('div', {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '14px 18px',
        background: dark ? '#1A1A1A' : '#FFFFFF',
        borderTop: accent ? '3px solid transparent' : 'none',
        borderImage: accent ? `${WISE_GRADIENT} 1` : 'none',
        fontFamily: "'WuerthSans', 'Arial Narrow', Arial, sans-serif"
      }
    }, React.createElement('span', {
      style: {
        fontWeight: 700,
        fontSize: 10,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: textColor
      }
    }, label), React.createElement('img', {
      src: logo,
      alt,
      style: {
        height: 26,
        width: 'auto',
        display: 'block'
      }
    }), React.createElement('span', {
      style: {
        marginLeft: 'auto',
        fontSize: 10,
        letterSpacing: '0.04em',
        color: dark ? '#737373' : '#999999',
        textTransform: 'uppercase'
      }
    }, 'for Würth'));
  }

  // badge
  return React.createElement('div', {
    style: {
      display: 'inline-flex',
      flexDirection: 'column',
      gap: 7,
      fontFamily: "'WuerthSans', 'Arial Narrow', Arial, sans-serif"
    }
  }, React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, React.createElement('span', {
    style: {
      fontWeight: 700,
      fontSize: 10,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: textColor
    }
  }, label), React.createElement('img', {
    src: logo,
    alt,
    style: {
      height: 24,
      width: 'auto',
      display: 'block'
    }
  })), accent && React.createElement('div', {
    style: {
      height: 3,
      width: 96,
      background: WISE_GRADIENT,
      borderRadius: 2
    },
    'aria-hidden': true
  }));
}
Object.assign(__ds_scope, { WiseCredit });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/WiseCredit.jsx", error: String((e && e.message) || e) }); }

// ui_kits/eshop/Cart.jsx
try { (() => {
/* Würth E-Shop — Cart drawer */
function Cart({
  open,
  items,
  onClose,
  onQty,
  onRemove
}) {
  const lines = Object.values(items);
  const subtotal = lines.reduce((s, l) => s + l.p.price * l.qty, 0);
  const vat = Math.round(subtotal * 0.07);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "es-scrim" + (open ? " open" : ""),
    onClick: onClose
  }), /*#__PURE__*/React.createElement("aside", {
    className: "es-drawer" + (open ? " open" : "")
  }, /*#__PURE__*/React.createElement("div", {
    className: "es-drawer-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "es-drawer-title"
  }, "Basket ", /*#__PURE__*/React.createElement("span", {
    className: "es-drawer-ct"
  }, lines.length)), /*#__PURE__*/React.createElement("button", {
    className: "es-drawer-close",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "x"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "es-drawer-body"
  }, lines.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "es-empty"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "shopping-cart"
  }), /*#__PURE__*/React.createElement("p", null, "Your basket is empty.")), lines.map(l => /*#__PURE__*/React.createElement("div", {
    className: "es-line",
    key: l.p.id
  }, /*#__PURE__*/React.createElement("div", {
    className: "es-line-media"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": l.p.icon
  })), /*#__PURE__*/React.createElement("div", {
    className: "es-line-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "es-card-art"
  }, "Art. ", l.p.art), /*#__PURE__*/React.createElement("div", {
    className: "es-line-name"
  }, l.p.name), /*#__PURE__*/React.createElement("div", {
    className: "es-qty es-qty-sm"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onQty(l.p, l.qty - 1)
  }, "\u2013"), /*#__PURE__*/React.createElement("span", null, l.qty), /*#__PURE__*/React.createElement("button", {
    onClick: () => onQty(l.p, l.qty + 1)
  }, "+"))), /*#__PURE__*/React.createElement("div", {
    className: "es-line-right"
  }, /*#__PURE__*/React.createElement("div", {
    className: "es-line-price"
  }, window.fmtBaht(l.p.price * l.qty)), /*#__PURE__*/React.createElement("button", {
    className: "es-line-rm",
    onClick: () => onRemove(l.p)
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "trash-2"
  })))))), lines.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "es-drawer-foot"
  }, /*#__PURE__*/React.createElement("div", {
    className: "es-tot-row"
  }, /*#__PURE__*/React.createElement("span", null, "Subtotal (net)"), /*#__PURE__*/React.createElement("span", null, window.fmtBaht(subtotal))), /*#__PURE__*/React.createElement("div", {
    className: "es-tot-row"
  }, /*#__PURE__*/React.createElement("span", null, "VAT 7%"), /*#__PURE__*/React.createElement("span", null, window.fmtBaht(vat))), /*#__PURE__*/React.createElement("div", {
    className: "es-tot-row es-tot-grand"
  }, /*#__PURE__*/React.createElement("span", null, "Total"), /*#__PURE__*/React.createElement("span", null, window.fmtBaht(subtotal + vat))), /*#__PURE__*/React.createElement("button", {
    className: "es-btn-red es-btn-block"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "lock"
  }), " Proceed to checkout"), /*#__PURE__*/React.createElement("button", {
    className: "es-btn-ghost es-btn-block",
    onClick: onClose
  }, "Continue shopping"))));
}
window.Cart = Cart;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/eshop/Cart.jsx", error: String((e && e.message) || e) }); }

// ui_kits/eshop/CategoryBar.jsx
try { (() => {
/* Würth E-Shop — Category bar (dark nav strip) */
function EShopCategoryBar({
  categories,
  active,
  onSelect
}) {
  return /*#__PURE__*/React.createElement("nav", {
    className: "es-catbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "es-catbar-inner"
  }, /*#__PURE__*/React.createElement("button", {
    className: "es-cat-all"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "menu"
  }), " All categories"), /*#__PURE__*/React.createElement("div", {
    className: "es-cat-list"
  }, categories.map(c => /*#__PURE__*/React.createElement("button", {
    key: c,
    className: "es-cat" + (c === active ? " active" : ""),
    onClick: () => onSelect(c)
  }, c))), /*#__PURE__*/React.createElement("button", {
    className: "es-cat-link"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "zap"
  }), " Quick order")));
}
window.EShopCategoryBar = EShopCategoryBar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/eshop/CategoryBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/eshop/EShopApp.jsx
try { (() => {
/* Würth E-Shop — App shell wiring all components into a click-through */
function EShopKitApp() {
  const [category, setCategory] = React.useState("All products");
  const [query, setQuery] = React.useState("");
  const [view, setView] = React.useState({
    name: "grid",
    product: null
  });
  const [cartOpen, setCartOpen] = React.useState(false);
  const [cart, setCart] = React.useState({});
  React.useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  });
  const products = window.WURTH_PRODUCTS.filter(p => {
    const inCat = category === "All products" || p.cat === category;
    const inQ = !query || (p.name + p.art + p.cat + p.desc).toLowerCase().includes(query.toLowerCase());
    return inCat && inQ;
  });
  const cartCount = Object.values(cart).reduce((s, l) => s + l.qty, 0);
  function addToCart(p, qty = 1) {
    setCart(c => {
      const cur = c[p.id] ? c[p.id].qty : 0;
      return {
        ...c,
        [p.id]: {
          p,
          qty: cur + qty
        }
      };
    });
    setCartOpen(true);
  }
  function setQty(p, qty) {
    setCart(c => {
      if (qty <= 0) {
        const n = {
          ...c
        };
        delete n[p.id];
        return n;
      }
      return {
        ...c,
        [p.id]: {
          p,
          qty
        }
      };
    });
  }
  function removeFromCart(p) {
    setCart(c => {
      const n = {
        ...c
      };
      delete n[p.id];
      return n;
    });
  }
  function openProduct(p) {
    setView({
      name: "detail",
      product: p
    });
    window.scrollTo(0, 0);
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "es-app"
  }, /*#__PURE__*/React.createElement(EShopHeader, {
    cartCount: cartCount,
    onCartClick: () => setCartOpen(true),
    onLogoClick: () => setView({
      name: "grid",
      product: null
    }),
    query: query,
    setQuery: q => {
      setQuery(q);
      setView({
        name: "grid",
        product: null
      });
    }
  }), /*#__PURE__*/React.createElement(EShopCategoryBar, {
    categories: window.WURTH_CATEGORIES,
    active: category,
    onSelect: c => {
      setCategory(c);
      setView({
        name: "grid",
        product: null
      });
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "es-breadcrumb"
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => setView({
      name: "grid",
      product: null
    })
  }, "Home"), /*#__PURE__*/React.createElement("i", {
    "data-lucide": "chevron-right"
  }), /*#__PURE__*/React.createElement("span", null, category), view.name === "detail" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "chevron-right"
  }), /*#__PURE__*/React.createElement("span", {
    className: "cur"
  }, view.product.name))), /*#__PURE__*/React.createElement("main", {
    className: "es-page"
  }, view.name === "grid" ? /*#__PURE__*/React.createElement(ProductGrid, {
    products: products,
    category: category,
    onOpen: openProduct,
    onAdd: addToCart
  }) : /*#__PURE__*/React.createElement(ProductDetail, {
    p: view.product,
    onBack: () => setView({
      name: "grid",
      product: null
    }),
    onAdd: addToCart
  })), /*#__PURE__*/React.createElement("footer", {
    className: "es-footer"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/wurth-logo-negative.png",
    alt: "W\xFCrth"
  }), /*#__PURE__*/React.createElement("span", null, "It's that easy. \u2014 Macht's einfach."), /*#__PURE__*/React.createElement("span", {
    className: "es-footer-credit"
  }, /*#__PURE__*/React.createElement("span", {
    className: "es-footer-by"
  }, "Built by"), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/wise-logo-dark.png",
    alt: "WISE \u2014 W\xFCrth Innovation & Solutions Excellence"
  }))), /*#__PURE__*/React.createElement(Cart, {
    open: cartOpen,
    items: cart,
    onClose: () => setCartOpen(false),
    onQty: setQty,
    onRemove: removeFromCart
  }));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(EShopKitApp, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/eshop/EShopApp.jsx", error: String((e && e.message) || e) }); }

// ui_kits/eshop/Header.jsx
try { (() => {
/* Würth E-Shop — Header (utility strip + main header with search + actions) */
function EShopHeader({
  cartCount,
  onCartClick,
  onLogoClick,
  query,
  setQuery
}) {
  return /*#__PURE__*/React.createElement("header", {
    className: "es-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "es-utility"
  }, /*#__PURE__*/React.createElement("div", {
    className: "es-utility-inner"
  }, /*#__PURE__*/React.createElement("span", {
    className: "es-util-link"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "map-pin"
  }), " Bangkok 10330"), /*#__PURE__*/React.createElement("div", {
    className: "es-util-right"
  }, /*#__PURE__*/React.createElement("span", {
    className: "es-util-link"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "phone"
  }), " 02 693 9300"), /*#__PURE__*/React.createElement("span", {
    className: "es-util-link"
  }, "TH / EN"), /*#__PURE__*/React.createElement("span", {
    className: "es-util-link"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "user"
  }), " Keven W.")))), /*#__PURE__*/React.createElement("div", {
    className: "es-main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "es-main-inner"
  }, /*#__PURE__*/React.createElement("img", {
    className: "es-logo",
    src: "../../assets/wurth-logo.svg",
    alt: "W\xFCrth",
    onClick: onLogoClick
  }), /*#__PURE__*/React.createElement("div", {
    className: "es-search"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Search by article number, keyword or category\u2026",
    value: query,
    onChange: e => setQuery(e.target.value)
  }), /*#__PURE__*/React.createElement("button", {
    className: "es-search-btn"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "search"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "es-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "es-action"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "heart"
  }), /*#__PURE__*/React.createElement("span", null, "Lists")), /*#__PURE__*/React.createElement("button", {
    className: "es-action es-cart",
    onClick: onCartClick
  }, /*#__PURE__*/React.createElement("span", {
    className: "es-cart-ico"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "shopping-cart"
  }), cartCount > 0 && /*#__PURE__*/React.createElement("span", {
    className: "es-cart-count"
  }, cartCount)), /*#__PURE__*/React.createElement("span", null, "Basket"))))));
}
window.EShopHeader = EShopHeader;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/eshop/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/eshop/ProductDetail.jsx
try { (() => {
/* Würth E-Shop — Product detail view */
function ProductDetail({
  p,
  onBack,
  onAdd
}) {
  const [qty, setQty] = React.useState(1);
  return /*#__PURE__*/React.createElement("div", {
    className: "es-detail"
  }, /*#__PURE__*/React.createElement("button", {
    className: "es-back",
    onClick: onBack
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "arrow-left"
  }), " Back to results"), /*#__PURE__*/React.createElement("div", {
    className: "es-detail-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "es-gallery"
  }, /*#__PURE__*/React.createElement("div", {
    className: "es-gallery-main"
  }, p.badge && /*#__PURE__*/React.createElement("span", {
    className: "es-badge" + (p.badge === "Premium" ? " dark" : "")
  }, p.badge), /*#__PURE__*/React.createElement("i", {
    "data-lucide": p.icon
  })), /*#__PURE__*/React.createElement("div", {
    className: "es-gallery-thumbs"
  }, [0, 1, 2].map(i => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "es-thumb" + (i === 0 ? " active" : "")
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": p.icon
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "es-detail-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "es-card-art"
  }, "Art. ", p.art, " \xB7 ", p.cat), /*#__PURE__*/React.createElement("h1", {
    className: "es-detail-name"
  }, p.name), /*#__PURE__*/React.createElement("p", {
    className: "es-detail-desc"
  }, p.desc), /*#__PURE__*/React.createElement(StockTag, {
    stock: p.stock
  }), /*#__PURE__*/React.createElement("div", {
    className: "es-buy"
  }, /*#__PURE__*/React.createElement("div", {
    className: "es-buy-price"
  }, /*#__PURE__*/React.createElement("span", {
    className: "es-price es-price-lg"
  }, window.fmtBaht(p.price)), p.oldPrice && /*#__PURE__*/React.createElement("span", {
    className: "es-price-old"
  }, window.fmtBaht(p.oldPrice)), /*#__PURE__*/React.createElement("span", {
    className: "es-unit"
  }, "/ ", p.unit, " \xB7 net price")), /*#__PURE__*/React.createElement("div", {
    className: "es-buy-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "es-qty"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setQty(Math.max(1, qty - 1))
  }, "\u2013"), /*#__PURE__*/React.createElement("span", null, qty), /*#__PURE__*/React.createElement("button", {
    onClick: () => setQty(qty + 1)
  }, "+")), /*#__PURE__*/React.createElement("button", {
    className: "es-btn-red",
    onClick: () => onAdd(p, qty)
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "shopping-cart"
  }), " Add to basket")), /*#__PURE__*/React.createElement("div", {
    className: "es-buy-meta"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "truck"
  }), " Next-day delivery"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "shield-check"
  }), " 30-day returns"))), /*#__PURE__*/React.createElement("div", {
    className: "es-specs"
  }, /*#__PURE__*/React.createElement("div", {
    className: "es-filter-h"
  }, "Technical data"), /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("tbody", null, Object.entries(p.spec).map(([k, v]) => /*#__PURE__*/React.createElement("tr", {
    key: k
  }, /*#__PURE__*/React.createElement("th", null, k), /*#__PURE__*/React.createElement("td", null, v)))))))));
}
window.ProductDetail = ProductDetail;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/eshop/ProductDetail.jsx", error: String((e && e.message) || e) }); }

// ui_kits/eshop/ProductGrid.jsx
try { (() => {
/* Würth E-Shop — ProductCard + ProductGrid (with filter rail) */
function fmtBaht(n) {
  return "฿" + n.toLocaleString("en-US");
}
function StockTag({
  stock
}) {
  const map = {
    in: ["d-in", "In stock"],
    low: ["d-low", "Low stock"],
    out: ["d-out", "Out of stock"]
  };
  const [cls, label] = map[stock] || map.in;
  return /*#__PURE__*/React.createElement("span", {
    className: "es-stock"
  }, /*#__PURE__*/React.createElement("span", {
    className: "es-dot " + cls
  }), label);
}
function ProductCard({
  p,
  onOpen,
  onAdd
}) {
  return /*#__PURE__*/React.createElement("article", {
    className: "es-card",
    onClick: () => onOpen(p)
  }, /*#__PURE__*/React.createElement("div", {
    className: "es-card-media"
  }, p.badge && /*#__PURE__*/React.createElement("span", {
    className: "es-badge" + (p.badge === "Premium" ? " dark" : "")
  }, p.badge), /*#__PURE__*/React.createElement("i", {
    "data-lucide": p.icon
  })), /*#__PURE__*/React.createElement("div", {
    className: "es-card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "es-card-art"
  }, "Art. ", p.art), /*#__PURE__*/React.createElement("h3", {
    className: "es-card-name"
  }, p.name), /*#__PURE__*/React.createElement("p", {
    className: "es-card-desc"
  }, p.desc), /*#__PURE__*/React.createElement("div", {
    className: "es-card-foot"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "es-price-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "es-price"
  }, fmtBaht(p.price)), p.oldPrice && /*#__PURE__*/React.createElement("span", {
    className: "es-price-old"
  }, fmtBaht(p.oldPrice))), /*#__PURE__*/React.createElement("div", {
    className: "es-unit"
  }, "/ ", p.unit, " \xB7 net")), /*#__PURE__*/React.createElement("button", {
    className: "es-add",
    onClick: e => {
      e.stopPropagation();
      onAdd(p);
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "shopping-cart"
  }))), /*#__PURE__*/React.createElement(StockTag, {
    stock: p.stock
  })));
}
function ProductGrid({
  products,
  category,
  onOpen,
  onAdd
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "es-shop"
  }, /*#__PURE__*/React.createElement("aside", {
    className: "es-filters"
  }, /*#__PURE__*/React.createElement("div", {
    className: "es-filter-grp"
  }, /*#__PURE__*/React.createElement("div", {
    className: "es-filter-h"
  }, "Category"), window.WURTH_CATEGORIES.slice(1).map(c => /*#__PURE__*/React.createElement("label", {
    key: c,
    className: "es-check"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    defaultChecked: category === c
  }), " ", /*#__PURE__*/React.createElement("span", null, c)))), /*#__PURE__*/React.createElement("div", {
    className: "es-filter-grp"
  }, /*#__PURE__*/React.createElement("div", {
    className: "es-filter-h"
  }, "Availability"), /*#__PURE__*/React.createElement("label", {
    className: "es-check"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    defaultChecked: true
  }), " ", /*#__PURE__*/React.createElement("span", null, "In stock")), /*#__PURE__*/React.createElement("label", {
    className: "es-check"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox"
  }), " ", /*#__PURE__*/React.createElement("span", null, "Next-day delivery"))), /*#__PURE__*/React.createElement("div", {
    className: "es-filter-grp"
  }, /*#__PURE__*/React.createElement("div", {
    className: "es-filter-h"
  }, "Price (net)"), /*#__PURE__*/React.createElement("label", {
    className: "es-check"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox"
  }), " ", /*#__PURE__*/React.createElement("span", null, "Under \u0E3F200")), /*#__PURE__*/React.createElement("label", {
    className: "es-check"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox"
  }), " ", /*#__PURE__*/React.createElement("span", null, "\u0E3F200 \u2013 \u0E3F1,000")), /*#__PURE__*/React.createElement("label", {
    className: "es-check"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox"
  }), " ", /*#__PURE__*/React.createElement("span", null, "Over \u0E3F1,000")))), /*#__PURE__*/React.createElement("div", {
    className: "es-results"
  }, /*#__PURE__*/React.createElement("div", {
    className: "es-results-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "es-results-count"
  }, /*#__PURE__*/React.createElement("strong", null, products.length), " articles \xB7 ", category), /*#__PURE__*/React.createElement("div", {
    className: "es-sort"
  }, /*#__PURE__*/React.createElement("span", null, "Sort"), /*#__PURE__*/React.createElement("select", null, /*#__PURE__*/React.createElement("option", null, "Relevance"), /*#__PURE__*/React.createElement("option", null, "Price \u2191"), /*#__PURE__*/React.createElement("option", null, "Price \u2193"), /*#__PURE__*/React.createElement("option", null, "Newest")))), /*#__PURE__*/React.createElement("div", {
    className: "es-grid"
  }, products.map(p => /*#__PURE__*/React.createElement(ProductCard, {
    key: p.id,
    p: p,
    onOpen: onOpen,
    onAdd: onAdd
  })))));
}
window.ProductCard = ProductCard;
window.ProductGrid = ProductGrid;
window.StockTag = StockTag;
window.fmtBaht = fmtBaht;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/eshop/ProductGrid.jsx", error: String((e && e.message) || e) }); }

// ui_kits/eshop/data.js
try { (() => {
/* Würth E-Shop — sample catalog data (Würth-style articles). Plain JS, attaches to window. */
window.WURTH_PRODUCTS = [{
  id: "p1",
  name: "Hex Bolt Set",
  art: "0204 21 6",
  cat: "Fasteners",
  icon: "bolt",
  desc: "DIN 933 fully threaded hex bolt. Stainless steel A2.",
  price: 420,
  unit: "bag of 100",
  badge: "New",
  stock: "in",
  spec: {
    Standard: "DIN 933",
    Material: "Stainless A2",
    Drive: "Hex",
    Thread: "M8 × 40",
    Pack: "100 pcs"
  }
}, {
  id: "p2",
  name: "ASSY Plus Screw",
  art: "0157 38 0",
  cat: "Fasteners",
  icon: "wrench",
  desc: "Universal countersunk wood screw, AW drive. Zinc-plated.",
  price: 285,
  unit: "box of 200",
  stock: "in",
  spec: {
    Drive: "AW20",
    Material: "Steel, zinc",
    Head: "Countersunk",
    Size: "5 × 50",
    Pack: "200 pcs"
  }
}, {
  id: "p3",
  name: "Nylon Wall Plug",
  art: "0912 02 0",
  cat: "Anchors",
  icon: "circle-dot",
  desc: "Universal expansion plug for solid & hollow materials.",
  price: 96,
  unit: "box of 100",
  stock: "low",
  spec: {
    Type: "Universal",
    Material: "Nylon",
    Drill: "8 mm",
    Length: "40 mm",
    Pack: "100 pcs"
  }
}, {
  id: "p4",
  name: "Cordless Impact Driver",
  art: "5701 200 X",
  cat: "Power Tools",
  icon: "drill",
  desc: "M-CUBE 18V brushless impact driver. Body only.",
  price: 8900,
  oldPrice: 9800,
  unit: "each",
  badge: "Premium",
  stock: "in",
  spec: {
    System: "M-CUBE 18V",
    Motor: "Brushless EC",
    Torque: "180 Nm",
    Chuck: '1/4" hex',
    Weight: "1.1 kg"
  }
}, {
  id: "p5",
  name: "Cut-Off Wheel",
  art: "0669 12 5",
  cat: "Abrasives",
  icon: "disc",
  desc: "Thin INOX cutting disc for steel & stainless. 125 mm.",
  price: 540,
  unit: "pack of 25",
  stock: "in",
  spec: {
    Diameter: "125 mm",
    Thickness: "1.0 mm",
    Bore: "22.2 mm",
    For: "INOX / Steel",
    Pack: "25 pcs"
  }
}, {
  id: "p6",
  name: "Cable Ties",
  art: "0501 15 0",
  cat: "Electrical",
  icon: "cable",
  desc: "UV-resistant nylon cable ties, black. 200 mm.",
  price: 130,
  unit: "bag of 100",
  stock: "in",
  spec: {
    Length: "200 mm",
    Width: "3.6 mm",
    Material: "PA 6.6",
    Color: "Black",
    Pack: "100 pcs"
  }
}, {
  id: "p7",
  name: "Mechanic's Gloves",
  art: "0899 401 2",
  cat: "Safety",
  icon: "hand",
  desc: "TIGERFLEX nitrile-coated work glove. Size 10.",
  price: 165,
  unit: "pair",
  badge: "Top seller",
  stock: "in",
  spec: {
    Coating: "Nitrile foam",
    Size: "10 / XL",
    Cat: "EN 388",
    Grip: "High",
    Pack: "1 pair"
  }
}, {
  id: "p8",
  name: "Threadlocker",
  art: "0893 270 0",
  cat: "Chemicals",
  icon: "flask-conical",
  desc: "Medium-strength anaerobic thread locking adhesive.",
  price: 380,
  unit: "50 ml",
  stock: "low",
  spec: {
    Strength: "Medium",
    Color: "Blue",
    Temp: "−55…150°C",
    Cure: "10 min",
    Volume: "50 ml"
  }
}];
window.WURTH_CATEGORIES = ["All products", "Fasteners", "Anchors", "Power Tools", "Abrasives", "Electrical", "Safety", "Chemicals"];
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/eshop/data.js", error: String((e && e.message) || e) }); }

// ui_kits/platform/PlatformApp.jsx
try { (() => {
/* Würth Creative Platform — App shell */
function PlatformKitApp() {
  const [active, setActive] = React.useState("dashboard");
  const titles = {
    dashboard: "Dashboard",
    templates: "Templates",
    catalog: "Catalog",
    reports: "Reports",
    customers: "Customers",
    settings: "Settings"
  };
  React.useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  });
  function openTemplate(t) {
    setActive("templates");
  }
  let view;
  if (active === "templates") view = /*#__PURE__*/React.createElement(Templates, {
    onOpenTemplate: openTemplate
  });else if (active === "reports") view = /*#__PURE__*/React.createElement(Reports, null);else if (active === "dashboard") view = /*#__PURE__*/React.createElement(Dashboard, {
    onOpenTemplate: openTemplate,
    onReview: () => setActive("templates")
  });else view = /*#__PURE__*/React.createElement(Placeholder, {
    label: titles[active]
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "wp-app"
  }, /*#__PURE__*/React.createElement(WPSidebar, {
    active: active,
    onNav: setActive
  }), /*#__PURE__*/React.createElement("div", {
    className: "wp-main"
  }, /*#__PURE__*/React.createElement(WPTopbar, {
    title: titles[active],
    onNew: () => setActive("templates")
  }), /*#__PURE__*/React.createElement("div", {
    className: "wp-scroll"
  }, view)));
}
function Placeholder({
  label
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "wp-view"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wp-empty"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "construction"
  }), /*#__PURE__*/React.createElement("h3", null, label), /*#__PURE__*/React.createElement("p", null, "This surface isn't part of the sample kit. Add it the same way as Dashboard / Templates / Reports.")));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(PlatformKitApp, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/platform/PlatformApp.jsx", error: String((e && e.message) || e) }); }

// ui_kits/platform/Sidebar.jsx
try { (() => {
/* Würth Creative Platform — Sidebar */
function WPSidebar({
  active,
  onNav
}) {
  const groups = [{
    label: "Workspace",
    ids: ["dashboard", "templates", "catalog"]
  }, {
    label: "Insights",
    ids: ["reports", "customers", "settings"]
  }];
  const byId = Object.fromEntries(window.WP_NAV.map(n => [n.id, n]));
  return /*#__PURE__*/React.createElement("aside", {
    className: "wp-sidebar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wp-brand"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/wurth-logo-negative.png",
    alt: "W\xFCrth"
  }), /*#__PURE__*/React.createElement("span", {
    className: "wp-env"
  }, "Sales")), /*#__PURE__*/React.createElement("nav", {
    className: "wp-nav"
  }, groups.map(g => /*#__PURE__*/React.createElement("div", {
    key: g.label
  }, /*#__PURE__*/React.createElement("div", {
    className: "wp-grouplbl"
  }, g.label), g.ids.map(id => {
    const n = byId[id];
    return /*#__PURE__*/React.createElement("button", {
      key: id,
      className: "wp-item" + (active === id ? " active" : ""),
      onClick: () => onNav(id)
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": n.icon
    }), /*#__PURE__*/React.createElement("span", null, n.label), n.count != null && /*#__PURE__*/React.createElement("span", {
      className: "wp-ct"
    }, n.count));
  })))), /*#__PURE__*/React.createElement("div", {
    className: "wp-user"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wp-ava"
  }, "KW"), /*#__PURE__*/React.createElement("div", {
    className: "wp-user-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wp-uname"
  }, "Keven W."), /*#__PURE__*/React.createElement("div", {
    className: "wp-urole"
  }, "Sales Asia")), /*#__PURE__*/React.createElement("span", {
    className: "wp-user-more"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "chevron-up"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "wp-credit"
  }, /*#__PURE__*/React.createElement("span", null, "Built by"), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/wise-logo-dark.png",
    alt: "WISE \u2014 W\xFCrth Innovation & Solutions Excellence"
  }), /*#__PURE__*/React.createElement("span", {
    className: "wp-credit-for"
  }, "for W\xFCrth")));
}
window.WPSidebar = WPSidebar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/platform/Sidebar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/platform/Topbar.jsx
try { (() => {
/* Würth Creative Platform — Topbar + shared pieces */
function WPTopbar({
  title,
  onNew
}) {
  return /*#__PURE__*/React.createElement("header", {
    className: "wp-topbar"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "wp-title"
  }, title), /*#__PURE__*/React.createElement("div", {
    className: "wp-topbar-right"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wp-topsearch"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "search"
  }), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Search templates, articles\u2026"
  })), /*#__PURE__*/React.createElement("button", {
    className: "wp-icon-btn"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "bell"
  })), /*#__PURE__*/React.createElement("button", {
    className: "wp-btn-red",
    onClick: onNew
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "plus"
  }), " New template")));
}
function StatusPill({
  status
}) {
  const map = {
    Published: "ok",
    Draft: "draft",
    Review: "review"
  };
  return /*#__PURE__*/React.createElement("span", {
    className: "wp-status wp-status-" + (map[status] || "draft")
  }, status);
}
window.WPTopbar = WPTopbar;
window.StatusPill = StatusPill;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/platform/Topbar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/platform/Views.jsx
try { (() => {
/* Würth Creative Platform — Views: Dashboard, Templates, Reports + TemplateCard */

function BrandHero({
  onPrimary
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "wp-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wp-hero-top"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/wurth-logo-on-red.svg",
    alt: "W\xFCrth"
  }), /*#__PURE__*/React.createElement("span", {
    className: "wp-hero-eyebrow"
  }, "Smart Catalog \xB7 2026")), /*#__PURE__*/React.createElement("div", {
    className: "wp-hero-rule"
  }), /*#__PURE__*/React.createElement("h2", null, "Good morning, Keven."), /*#__PURE__*/React.createElement("p", {
    className: "wp-hero-claim"
  }, "3 templates need your review. Last sync 2 hours ago."), /*#__PURE__*/React.createElement("button", {
    className: "wp-hero-cta",
    onClick: onPrimary
  }, "Review templates \u2192"));
}
function StatCard({
  s
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "wp-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wp-stat-top"
  }, /*#__PURE__*/React.createElement("span", {
    className: "wp-stat-label"
  }, s.label), /*#__PURE__*/React.createElement("i", {
    "data-lucide": s.icon
  })), /*#__PURE__*/React.createElement("div", {
    className: "wp-stat-value"
  }, s.value), /*#__PURE__*/React.createElement("div", {
    className: "wp-stat-delta " + s.dir
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": s.dir === "up" ? "trending-up" : "trending-down"
  }), " ", s.delta));
}
function TemplateCard({
  t,
  onOpen
}) {
  return /*#__PURE__*/React.createElement("article", {
    className: "wp-tpl",
    onClick: () => onOpen(t)
  }, /*#__PURE__*/React.createElement("div", {
    className: "wp-tpl-thumb"
  }, /*#__PURE__*/React.createElement("span", {
    className: "wp-tpl-cat"
  }, t.cat), /*#__PURE__*/React.createElement("i", {
    "data-lucide": "layout-template"
  }), /*#__PURE__*/React.createElement("div", {
    className: "wp-tpl-hover"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "pencil"
  }), " Open template"))), /*#__PURE__*/React.createElement("div", {
    className: "wp-tpl-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wp-tpl-row"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "wp-tpl-name"
  }, t.name), /*#__PURE__*/React.createElement(StatusPill, {
    status: t.status
  })), /*#__PURE__*/React.createElement("div", {
    className: "wp-tpl-meta"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "package"
  }), " ", t.items, " articles"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "clock"
  }), " ", t.updated))));
}
function Dashboard({
  onOpenTemplate,
  onReview
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "wp-view"
  }, /*#__PURE__*/React.createElement(BrandHero, {
    onPrimary: onReview
  }), /*#__PURE__*/React.createElement("div", {
    className: "wp-stats"
  }, window.WP_STATS.map(s => /*#__PURE__*/React.createElement(StatCard, {
    key: s.label,
    s: s
  }))), /*#__PURE__*/React.createElement("div", {
    className: "wp-cols"
  }, /*#__PURE__*/React.createElement("section", {
    className: "wp-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wp-panel-head"
  }, /*#__PURE__*/React.createElement("h3", null, "Recent templates"), /*#__PURE__*/React.createElement("button", {
    className: "wp-link",
    onClick: onReview
  }, "View all")), /*#__PURE__*/React.createElement("div", {
    className: "wp-tpl-grid"
  }, window.WP_TEMPLATES.slice(0, 4).map(t => /*#__PURE__*/React.createElement(TemplateCard, {
    key: t.id,
    t: t,
    onOpen: onOpenTemplate
  })))), /*#__PURE__*/React.createElement("section", {
    className: "wp-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wp-panel-head"
  }, /*#__PURE__*/React.createElement("h3", null, "Activity")), /*#__PURE__*/React.createElement("div", {
    className: "wp-activity"
  }, window.WP_ACTIVITY.map((a, i) => /*#__PURE__*/React.createElement("div", {
    className: "wp-act",
    key: i
  }, /*#__PURE__*/React.createElement("span", {
    className: "wp-act-ico"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": a.icon
  })), /*#__PURE__*/React.createElement("div", {
    className: "wp-act-text"
  }, /*#__PURE__*/React.createElement("strong", null, a.who), " ", a.action, " ", /*#__PURE__*/React.createElement("span", {
    className: "wp-act-target"
  }, a.target), /*#__PURE__*/React.createElement("div", {
    className: "wp-act-time"
  }, a.time, " ago"))))))));
}
function Templates({
  onOpenTemplate
}) {
  const [filter, setFilter] = React.useState("All");
  const tabs = ["All", "Published", "Draft", "Review"];
  const list = window.WP_TEMPLATES.filter(t => filter === "All" || t.status === filter);
  return /*#__PURE__*/React.createElement("div", {
    className: "wp-view"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wp-tabs"
  }, tabs.map(t => /*#__PURE__*/React.createElement("button", {
    key: t,
    className: "wp-tab" + (filter === t ? " active" : ""),
    onClick: () => setFilter(t)
  }, t)), /*#__PURE__*/React.createElement("div", {
    className: "wp-tabs-right"
  }, /*#__PURE__*/React.createElement("button", {
    className: "wp-icon-btn"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "filter"
  })), /*#__PURE__*/React.createElement("button", {
    className: "wp-icon-btn"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "layout-grid"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "wp-tpl-grid wp-tpl-grid-3"
  }, list.map(t => /*#__PURE__*/React.createElement(TemplateCard, {
    key: t.id,
    t: t,
    onOpen: onOpenTemplate
  }))));
}
function Reports() {
  const max = 100;
  return /*#__PURE__*/React.createElement("div", {
    className: "wp-view"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wp-cols wp-cols-2-1"
  }, /*#__PURE__*/React.createElement("section", {
    className: "wp-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wp-panel-head"
  }, /*#__PURE__*/React.createElement("h3", null, "Orders \u2014 last 6 months"), /*#__PURE__*/React.createElement("span", {
    className: "wp-panel-meta"
  }, "Net, \u0E3F thousands")), /*#__PURE__*/React.createElement("div", {
    className: "wp-chart"
  }, window.WP_REPORT_BARS.map(b => /*#__PURE__*/React.createElement("div", {
    className: "wp-bar-col",
    key: b.m
  }, /*#__PURE__*/React.createElement("div", {
    className: "wp-bar",
    style: {
      height: b.v / max * 160 + "px"
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "wp-bar-lbl"
  }, b.m))))), /*#__PURE__*/React.createElement("section", {
    className: "wp-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wp-panel-head"
  }, /*#__PURE__*/React.createElement("h3", null, "Top categories")), /*#__PURE__*/React.createElement("div", {
    className: "wp-rank"
  }, [["Fasteners", 92], ["Power Tools", 74], ["Abrasives", 58], ["Chemicals", 41], ["Safety", 33]].map(([n, v]) => /*#__PURE__*/React.createElement("div", {
    className: "wp-rank-row",
    key: n
  }, /*#__PURE__*/React.createElement("span", {
    className: "wp-rank-name"
  }, n), /*#__PURE__*/React.createElement("div", {
    className: "wp-rank-track"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wp-rank-fill",
    style: {
      width: v + "%"
    }
  })), /*#__PURE__*/React.createElement("span", {
    className: "wp-rank-val"
  }, v, "%")))))), /*#__PURE__*/React.createElement("section", {
    className: "wp-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wp-panel-head"
  }, /*#__PURE__*/React.createElement("h3", null, "Template performance")), /*#__PURE__*/React.createElement("table", {
    className: "wp-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Template"), /*#__PURE__*/React.createElement("th", null, "Status"), /*#__PURE__*/React.createElement("th", null, "Articles"), /*#__PURE__*/React.createElement("th", null, "Owner"), /*#__PURE__*/React.createElement("th", null, "Updated"))), /*#__PURE__*/React.createElement("tbody", null, window.WP_TEMPLATES.map(t => /*#__PURE__*/React.createElement("tr", {
    key: t.id
  }, /*#__PURE__*/React.createElement("td", {
    className: "wp-td-name"
  }, t.name), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(StatusPill, {
    status: t.status
  })), /*#__PURE__*/React.createElement("td", null, t.items), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: "wp-mini-ava"
  }, t.owner)), /*#__PURE__*/React.createElement("td", {
    className: "wp-td-muted"
  }, t.updated)))))));
}
window.Dashboard = Dashboard;
window.Templates = Templates;
window.Reports = Reports;
window.TemplateCard = TemplateCard;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/platform/Views.jsx", error: String((e && e.message) || e) }); }

// ui_kits/platform/data.js
try { (() => {
/* Würth Creative Platform — sample data. Plain JS, attaches to window. */
window.WP_NAV = [{
  id: "dashboard",
  label: "Dashboard",
  icon: "layout-dashboard"
}, {
  id: "templates",
  label: "Templates",
  icon: "layout-template",
  count: 24
}, {
  id: "catalog",
  label: "Catalog",
  icon: "package",
  count: "1.2k"
}, {
  id: "reports",
  label: "Reports",
  icon: "bar-chart-3"
}, {
  id: "customers",
  label: "Customers",
  icon: "users"
}, {
  id: "settings",
  label: "Settings",
  icon: "settings"
}];
window.WP_STATS = [{
  label: "Active templates",
  value: "24",
  delta: "+3",
  dir: "up",
  icon: "layout-template"
}, {
  label: "Orders this week",
  value: "1,284",
  delta: "+12%",
  dir: "up",
  icon: "shopping-cart"
}, {
  label: "Catalog articles",
  value: "125k",
  delta: "+420",
  dir: "up",
  icon: "package"
}, {
  label: "Avg. basket (net)",
  value: "฿3,940",
  delta: "−2%",
  dir: "down",
  icon: "trending-up"
}];
window.WP_TEMPLATES = [{
  id: "t1",
  name: "Spring Fastener Promo",
  cat: "Promotion",
  items: 18,
  updated: "2 hours ago",
  owner: "KW",
  status: "Published"
}, {
  id: "t2",
  name: "Automotive Workshop Kit",
  cat: "Bundle",
  items: 42,
  updated: "Yesterday",
  owner: "MP",
  status: "Draft"
}, {
  id: "t3",
  name: "Power Tool Catalogue Q3",
  cat: "Catalogue",
  items: 96,
  updated: "2 days ago",
  owner: "KW",
  status: "Published"
}, {
  id: "t4",
  name: "Safety Range Flyer",
  cat: "Flyer",
  items: 12,
  updated: "3 days ago",
  owner: "AL",
  status: "Review"
}, {
  id: "t5",
  name: "Construction Anchors",
  cat: "Bundle",
  items: 28,
  updated: "5 days ago",
  owner: "MP",
  status: "Published"
}, {
  id: "t6",
  name: "Chemicals & Adhesives",
  cat: "Catalogue",
  items: 54,
  updated: "1 week ago",
  owner: "AL",
  status: "Draft"
}];
window.WP_ACTIVITY = [{
  who: "Maya P.",
  action: "published",
  target: "Power Tool Catalogue Q3",
  time: "2h",
  icon: "upload"
}, {
  who: "Keven W.",
  action: "edited",
  target: "Spring Fastener Promo",
  time: "4h",
  icon: "pencil"
}, {
  who: "Alex L.",
  action: "requested review on",
  target: "Safety Range Flyer",
  time: "1d",
  icon: "eye"
}, {
  who: "Maya P.",
  action: "duplicated",
  target: "Automotive Workshop Kit",
  time: "2d",
  icon: "copy"
}];
window.WP_REPORT_BARS = [{
  m: "Jan",
  v: 62
}, {
  m: "Feb",
  v: 71
}, {
  m: "Mar",
  v: 58
}, {
  m: "Apr",
  v: 84
}, {
  m: "May",
  v: 92
}, {
  m: "Jun",
  v: 100
}];
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/platform/data.js", error: String((e && e.message) || e) }); }

// video/animations.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// animations.jsx
// Reusable animation starter: Stage, Timeline, Sprite, easing helpers.
// Exports (to window): Stage, Sprite, PlaybackBar, TextSprite, ImageSprite, RectSprite,
//   useTime, useTimeline, useSprite, Easing, interpolate, animate, clamp.
//
// Usage (in an HTML file that loads React + Babel):
//
//   <Stage width={1280} height={720} duration={10} background="#f6f4ef">
//     <MyScene />
//   </Stage>
//
// <Stage> auto-scales to the viewport and provides the scrubber, play/pause,
// ←/→ seek, space, and 0-to-reset controls, and persists the playhead.
// Inside <Stage>, any child can call useTime() to read the current
// playhead (seconds). Or wrap content in <Sprite start={1} end={4}>...</Sprite>
// to only render during that window -- children receive a `localTime` and
// `progress` via the useSprite() hook. Use Easing + interpolate()/animate()
// for tweens; TextSprite / ImageSprite / RectSprite have built-in entry/exit.
// Build YOUR scenes by composing Sprites inside a Stage.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

// ── Easing functions (hand-rolled, Popmotion-style) ─────────────────────────
// All easings take t ∈ [0,1] and return eased t ∈ [0,1] (may overshoot for back/elastic).
const Easing = {
  linear: t => t,
  // Quad
  easeInQuad: t => t * t,
  easeOutQuad: t => t * (2 - t),
  easeInOutQuad: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  // Cubic
  easeInCubic: t => t * t * t,
  easeOutCubic: t => --t * t * t + 1,
  easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  // Quart
  easeInQuart: t => t * t * t * t,
  easeOutQuart: t => 1 - --t * t * t * t,
  easeInOutQuart: t => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t,
  // Expo
  easeInExpo: t => t === 0 ? 0 : Math.pow(2, 10 * (t - 1)),
  easeOutExpo: t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
  easeInOutExpo: t => {
    if (t === 0) return 0;
    if (t === 1) return 1;
    if (t < 0.5) return 0.5 * Math.pow(2, 20 * t - 10);
    return 1 - 0.5 * Math.pow(2, -20 * t + 10);
  },
  // Sine
  easeInSine: t => 1 - Math.cos(t * Math.PI / 2),
  easeOutSine: t => Math.sin(t * Math.PI / 2),
  easeInOutSine: t => -(Math.cos(Math.PI * t) - 1) / 2,
  // Back (overshoot)
  easeOutBack: t => {
    const c1 = 1.70158,
      c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },
  easeInBack: t => {
    const c1 = 1.70158,
      c3 = c1 + 1;
    return c3 * t * t * t - c1 * t * t;
  },
  easeInOutBack: t => {
    const c1 = 1.70158,
      c2 = c1 * 1.525;
    return t < 0.5 ? Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2) / 2 : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;
  },
  // Elastic
  easeOutElastic: t => {
    const c4 = 2 * Math.PI / 3;
    if (t === 0) return 0;
    if (t === 1) return 1;
    return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  }
};

// ── Core interpolation helpers ──────────────────────────────────────────────

// Clamp a value to [min, max]
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

// interpolate([0, 0.5, 1], [0, 100, 50], ease?) -> fn(t)
// Popmotion-style: linearly maps t across input keyframes to output values,
// with optional easing per segment (single fn or array of fns).
function interpolate(input, output, ease = Easing.linear) {
  return t => {
    if (t <= input[0]) return output[0];
    if (t >= input[input.length - 1]) return output[output.length - 1];
    for (let i = 0; i < input.length - 1; i++) {
      if (t >= input[i] && t <= input[i + 1]) {
        const span = input[i + 1] - input[i];
        const local = span === 0 ? 0 : (t - input[i]) / span;
        const easeFn = Array.isArray(ease) ? ease[i] || Easing.linear : ease;
        const eased = easeFn(local);
        return output[i] + (output[i + 1] - output[i]) * eased;
      }
    }
    return output[output.length - 1];
  };
}

// animate({from, to, start, end, ease})(t) — simpler single-segment tween.
// Returns `from` before `start`, `to` after `end`.
function animate({
  from = 0,
  to = 1,
  start = 0,
  end = 1,
  ease = Easing.easeInOutCubic
}) {
  return t => {
    if (t <= start) return from;
    if (t >= end) return to;
    const local = (t - start) / (end - start);
    return from + (to - from) * ease(local);
  };
}

// ── Timeline context ────────────────────────────────────────────────────────

const TimelineContext = React.createContext({
  time: 0,
  duration: 10,
  playing: false
});
const useTime = () => React.useContext(TimelineContext).time;
const useTimeline = () => React.useContext(TimelineContext);

// ── Sprite ──────────────────────────────────────────────────────────────────
// Renders children only when the playhead is inside [start, end]. Provides
// a sub-context with `localTime` (seconds since start) and `progress` (0..1).
//
//   <Sprite start={2} end={5}>
//     {({ localTime, progress }) => <Thing x={progress * 100} />}
//   </Sprite>
//
// Or as a plain wrapper — children can call useSprite() themselves.

const SpriteContext = React.createContext({
  localTime: 0,
  progress: 0,
  duration: 0
});
const useSprite = () => React.useContext(SpriteContext);
function Sprite({
  start = 0,
  end = Infinity,
  children,
  keepMounted = false
}) {
  const {
    time
  } = useTimeline();
  const visible = time >= start && time <= end;
  if (!visible && !keepMounted) return null;
  const duration = end - start;
  const localTime = Math.max(0, time - start);
  const progress = duration > 0 && isFinite(duration) ? clamp(localTime / duration, 0, 1) : 0;
  const value = {
    localTime,
    progress,
    duration,
    visible
  };
  return /*#__PURE__*/React.createElement(SpriteContext.Provider, {
    value: value
  }, typeof children === 'function' ? children(value) : children);
}

// ── Sample sprite components ────────────────────────────────────────────────

// TextSprite: fades/slides text in on entry, holds, then fades out on exit.
// Props: text, x, y, size, color, font, entryDur, exitDur, align
function TextSprite({
  text,
  x = 0,
  y = 0,
  size = 48,
  color = '#111',
  font = 'Inter, system-ui, sans-serif',
  weight = 600,
  entryDur = 0.45,
  exitDur = 0.35,
  entryEase = Easing.easeOutBack,
  exitEase = Easing.easeInCubic,
  align = 'left',
  letterSpacing = '-0.01em'
}) {
  const {
    localTime,
    duration
  } = useSprite();
  const exitStart = Math.max(0, duration - exitDur);
  let opacity = 1;
  let ty = 0;
  if (localTime < entryDur) {
    const t = entryEase(clamp(localTime / entryDur, 0, 1));
    opacity = t;
    ty = (1 - t) * 16;
  } else if (localTime > exitStart) {
    const t = exitEase(clamp((localTime - exitStart) / exitDur, 0, 1));
    opacity = 1 - t;
    ty = -t * 8;
  }
  const translateX = align === 'center' ? '-50%' : align === 'right' ? '-100%' : '0';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: x,
      top: y,
      transform: `translate(${translateX}, ${ty}px)`,
      opacity,
      fontFamily: font,
      fontSize: size,
      fontWeight: weight,
      color,
      letterSpacing,
      whiteSpace: 'pre',
      lineHeight: 1.1,
      willChange: 'transform, opacity'
    }
  }, text);
}

// ImageSprite: scales + fades in; optional Ken Burns drift during hold.
function ImageSprite({
  src,
  x = 0,
  y = 0,
  width = 400,
  height = 300,
  entryDur = 0.6,
  exitDur = 0.4,
  kenBurns = false,
  kenBurnsScale = 1.08,
  radius = 12,
  fit = 'cover',
  placeholder = null // {label: string} for striped placeholder
}) {
  const {
    localTime,
    duration
  } = useSprite();
  const exitStart = Math.max(0, duration - exitDur);
  let opacity = 1;
  let scale = 1;
  if (localTime < entryDur) {
    const t = Easing.easeOutCubic(clamp(localTime / entryDur, 0, 1));
    opacity = t;
    scale = 0.96 + 0.04 * t;
  } else if (localTime > exitStart) {
    const t = Easing.easeInCubic(clamp((localTime - exitStart) / exitDur, 0, 1));
    opacity = 1 - t;
    scale = (kenBurns ? kenBurnsScale : 1) + 0.02 * t;
  } else if (kenBurns) {
    const holdSpan = exitStart - entryDur;
    const holdT = holdSpan > 0 ? (localTime - entryDur) / holdSpan : 0;
    scale = 1 + (kenBurnsScale - 1) * holdT;
  }
  const content = placeholder ? /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'repeating-linear-gradient(135deg, #e9e6df 0 10px, #dcd8cf 10px 20px)',
      color: '#6b6458',
      fontFamily: 'JetBrains Mono, ui-monospace, monospace',
      fontSize: 13,
      letterSpacing: '0.04em',
      textTransform: 'uppercase'
    }
  }, placeholder.label || 'image') : /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: fit,
      display: 'block'
    }
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: x,
      top: y,
      width,
      height,
      opacity,
      transform: `scale(${scale})`,
      transformOrigin: 'center',
      borderRadius: radius,
      overflow: 'hidden',
      willChange: 'transform, opacity'
    }
  }, content);
}

// RectSprite: simple rectangle that animates position/size/color via props.
// Useful demo primitive — takes a `render` fn for per-frame customization.
function RectSprite({
  x = 0,
  y = 0,
  width = 100,
  height = 100,
  color = '#111',
  radius = 8,
  entryDur = 0.4,
  exitDur = 0.3,
  render // optional: (ctx) => style overrides
}) {
  const spriteCtx = useSprite();
  const {
    localTime,
    duration
  } = spriteCtx;
  const exitStart = Math.max(0, duration - exitDur);
  let opacity = 1;
  let scale = 1;
  if (localTime < entryDur) {
    const t = Easing.easeOutBack(clamp(localTime / entryDur, 0, 1));
    opacity = clamp(localTime / entryDur, 0, 1);
    scale = 0.4 + 0.6 * t;
  } else if (localTime > exitStart) {
    const t = Easing.easeInQuad(clamp((localTime - exitStart) / exitDur, 0, 1));
    opacity = 1 - t;
    scale = 1 - 0.15 * t;
  }
  const overrides = render ? render(spriteCtx) : {};
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: x,
      top: y,
      width,
      height,
      background: color,
      borderRadius: radius,
      opacity,
      transform: `scale(${scale})`,
      transformOrigin: 'center',
      willChange: 'transform, opacity',
      ...overrides
    }
  });
}
function Stage({
  width = 1280,
  height = 720,
  duration = 10,
  background = '#f6f4ef',
  fps = 60,
  loop = true,
  autoplay = true,
  persistKey = 'animstage',
  children
}) {
  const [time, setTime] = React.useState(() => {
    try {
      const v = parseFloat(localStorage.getItem(persistKey + ':t') || '0');
      return isFinite(v) ? clamp(v, 0, duration) : 0;
    } catch {
      return 0;
    }
  });
  const [playing, setPlaying] = React.useState(autoplay);
  const [hoverTime, setHoverTime] = React.useState(null);
  const [scale, setScale] = React.useState(1);
  const stageRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const rafRef = React.useRef(null);
  const lastTsRef = React.useRef(null);

  // Persist playhead
  React.useEffect(() => {
    try {
      localStorage.setItem(persistKey + ':t', String(time));
    } catch {}
  }, [time, persistKey]);

  // Auto-scale to fit viewport
  React.useEffect(() => {
    if (!stageRef.current) return;
    const el = stageRef.current;
    const measure = () => {
      const barH = 44; // playback bar height
      const s = Math.min(el.clientWidth / width, (el.clientHeight - barH) / height);
      setScale(Math.max(0.05, s));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [width, height]);

  // Animation loop
  React.useEffect(() => {
    if (!playing) {
      lastTsRef.current = null;
      return;
    }
    const step = ts => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;
      setTime(t => {
        let next = t + dt;
        if (next >= duration) {
          if (loop) next = next % duration;else {
            next = duration;
            setPlaying(false);
          }
        }
        return next;
      });
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTsRef.current = null;
    };
  }, [playing, duration, loop]);

  // Keyboard: space = play/pause, ← → = seek
  React.useEffect(() => {
    const onKey = e => {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
      if (e.code === 'Space') {
        e.preventDefault();
        setPlaying(p => !p);
      } else if (e.code === 'ArrowLeft') {
        setTime(t => clamp(t - (e.shiftKey ? 1 : 0.1), 0, duration));
      } else if (e.code === 'ArrowRight') {
        setTime(t => clamp(t + (e.shiftKey ? 1 : 0.1), 0, duration));
      } else if (e.key === '0' || e.code === 'Home') {
        setTime(0);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [duration]);
  const displayTime = hoverTime != null ? hoverTime : time;
  const ctxValue = React.useMemo(() => ({
    time: displayTime,
    duration,
    playing,
    setTime,
    setPlaying
  }), [displayTime, duration, playing]);
  return /*#__PURE__*/React.createElement("div", {
    ref: stageRef,
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: '#0a0a0a',
      fontFamily: 'Inter, system-ui, sans-serif'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: canvasRef,
    style: {
      width,
      height,
      background,
      position: 'relative',
      transform: `scale(${scale})`,
      transformOrigin: 'center',
      flexShrink: 0,
      boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(TimelineContext.Provider, {
    value: ctxValue
  }, children))), /*#__PURE__*/React.createElement(PlaybackBar, {
    time: displayTime,
    actualTime: time,
    duration: duration,
    playing: playing,
    onPlayPause: () => setPlaying(p => !p),
    onReset: () => {
      setTime(0);
    },
    onSeek: t => setTime(t),
    onHover: t => setHoverTime(t)
  }));
}

// ── Playback bar ────────────────────────────────────────────────────────────
// Play/pause, return-to-begin, scrub track, time display.
// Uses fixed-width time fields so layout doesn't thrash.

function PlaybackBar({
  time,
  duration,
  playing,
  onPlayPause,
  onReset,
  onSeek,
  onHover
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  const timeFromEvent = React.useCallback(e => {
    const rect = trackRef.current.getBoundingClientRect();
    const x = clamp((e.clientX - rect.left) / rect.width, 0, 1);
    return x * duration;
  }, [duration]);
  const onTrackMove = e => {
    if (!trackRef.current) return;
    const t = timeFromEvent(e);
    if (dragging) {
      onSeek(t);
    } else {
      onHover(t);
    }
  };
  const onTrackLeave = () => {
    if (!dragging) onHover(null);
  };
  const onTrackDown = e => {
    setDragging(true);
    const t = timeFromEvent(e);
    onSeek(t);
    onHover(null);
  };
  React.useEffect(() => {
    if (!dragging) return;
    const onUp = () => setDragging(false);
    const onMove = e => {
      if (!trackRef.current) return;
      const t = timeFromEvent(e);
      onSeek(t);
    };
    window.addEventListener('mouseup', onUp);
    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('mousemove', onMove);
    };
  }, [dragging, timeFromEvent, onSeek]);
  const pct = duration > 0 ? time / duration * 100 : 0;
  const fmt = t => {
    const total = Math.max(0, t);
    const m = Math.floor(total / 60);
    const s = Math.floor(total % 60);
    const cs = Math.floor(total * 100 % 100);
    return `${String(m).padStart(1, '0')}:${String(s).padStart(2, '0')}.${String(cs).padStart(2, '0')}`;
  };
  const mono = 'JetBrains Mono, ui-monospace, SFMono-Regular, monospace';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '8px 16px',
      background: 'rgba(20,20,20,0.92)',
      borderTop: '1px solid rgba(255,255,255,0.08)',
      width: '100%',
      maxWidth: 680,
      alignSelf: 'center',
      borderRadius: 8,
      color: '#f6f4ef',
      fontFamily: 'Inter, system-ui, sans-serif',
      userSelect: 'none',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    onClick: onReset,
    title: "Return to start (0)"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 2v10M12 2L5 7l7 5V2z",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinejoin: "round",
    strokeLinecap: "round"
  }))), /*#__PURE__*/React.createElement(IconButton, {
    onClick: onPlayPause,
    title: "Play/pause (space)"
  }, playing ? /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "2",
    width: "3",
    height: "10",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "8",
    y: "2",
    width: "3",
    height: "10",
    fill: "currentColor"
  })) : /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 2l9 5-9 5V2z",
    fill: "currentColor"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: mono,
      fontSize: 12,
      fontVariantNumeric: 'tabular-nums',
      width: 64,
      textAlign: 'right',
      color: '#f6f4ef'
    }
  }, fmt(time)), /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    onMouseMove: onTrackMove,
    onMouseLeave: onTrackLeave,
    onMouseDown: onTrackDown,
    style: {
      flex: 1,
      height: 22,
      position: 'relative',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      height: 4,
      background: 'rgba(255,255,255,0.12)',
      borderRadius: 2
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      width: `${pct}%`,
      height: 4,
      background: 'oklch(72% 0.12 250)',
      borderRadius: 2
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: `${pct}%`,
      top: '50%',
      width: 12,
      height: 12,
      marginLeft: -6,
      marginTop: -6,
      background: '#fff',
      borderRadius: 6,
      boxShadow: '0 2px 4px rgba(0,0,0,0.4)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: mono,
      fontSize: 12,
      fontVariantNumeric: 'tabular-nums',
      width: 64,
      textAlign: 'left',
      color: 'rgba(246,244,239,0.55)'
    }
  }, fmt(duration)));
}
function IconButton({
  children,
  onClick,
  title
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    title: title,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: 28,
      height: 28,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: hover ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 6,
      color: '#f6f4ef',
      cursor: 'pointer',
      padding: 0,
      transition: 'background 120ms'
    }
  }, children);
}
Object.assign(window, {
  Easing,
  interpolate,
  animate,
  clamp,
  TimelineContext,
  useTime,
  useTimeline,
  Sprite,
  SpriteContext,
  useSprite,
  TextSprite,
  ImageSprite,
  RectSprite,
  Stage,
  PlaybackBar
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "video/animations.jsx", error: String((e && e.message) || e) }); }

// video/scenes.jsx
try { (() => {
/* Würth brand sting — scenes. Composes Sprites from animations.jsx.
   Canvas 1920×1080, duration 8s. */

const CX = 960,
  CY = 540;
const RED = '#CC0000',
  BLACK = '#1A1A1A',
  WHITE = '#FFFFFF';

/* ---- SHOT ONE — logo reveal on white ---- */
function ShotOne() {
  const t = useTime();

  // group ken-burns push (whole shot)
  const groupScale = animate({
    from: 1.0,
    to: 1.04,
    start: 0.35,
    end: 3.4,
    ease: Easing.easeOutSine
  })(t);

  // logo entrance
  const logoOp = animate({
    from: 0,
    to: 1,
    start: 0.35,
    end: 1.15,
    ease: Easing.easeOutCubic
  })(t);
  const logoY = animate({
    from: 44,
    to: 0,
    start: 0.35,
    end: 1.15,
    ease: Easing.easeOutCubic
  })(t);

  // red rule snaps out
  const ruleW = animate({
    from: 0,
    to: 300,
    start: 0.95,
    end: 1.5,
    ease: Easing.easeOutExpo
  })(t);
  const ruleOp = animate({
    from: 0,
    to: 1,
    start: 0.95,
    end: 1.1,
    ease: Easing.linear
  })(t);

  // eyebrow fades in after
  const ebOp = animate({
    from: 0,
    to: 1,
    start: 1.5,
    end: 2.1,
    ease: Easing.easeOutCubic
  })(t);
  const ebLs = animate({
    from: 0.2,
    to: 0.42,
    start: 1.5,
    end: 2.6,
    ease: Easing.easeOutCubic
  })(t);
  const logoW = 780,
    logoH = logoW * (545 / 1500);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      transform: `scale(${groupScale})`,
      transformOrigin: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: CX - logoW / 2,
      top: CY - logoH / 2 - 36,
      width: logoW,
      height: logoH,
      opacity: logoOp,
      transform: `translateY(${logoY}px)`
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../assets/wurth-logo.svg",
    alt: "W\xFCrth",
    style: {
      width: '100%',
      height: '100%',
      display: 'block'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: CX - ruleW / 2,
      top: CY + logoH / 2 + 6,
      width: ruleW,
      height: 7,
      background: RED,
      opacity: ruleOp
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: CY + logoH / 2 + 40,
      textAlign: 'center',
      opacity: ebOp,
      color: BLACK,
      fontFamily: 'WuerthSans, sans-serif',
      fontWeight: 700,
      fontSize: 26,
      textTransform: 'uppercase',
      letterSpacing: `${ebLs}em`,
      paddingLeft: `${ebLs}em`
    }
  }, "The Professional Trade"));
}

/* ---- RED WIPE — field slides up to fill ---- */
function RedWipe() {
  const t = useTime();
  // translateY 100% -> 0 between 3.4 and 4.0
  const y = animate({
    from: 1080,
    to: 0,
    start: 3.4,
    end: 4.05,
    ease: Easing.easeInOutCubic
  })(t);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: 1920,
      height: 1080,
      background: RED,
      transform: `translateY(${y}px)`
    }
  });
}

/* ---- SHOT TWO — reversed logo + claim on red ---- */
function ShotTwo() {
  const t = useTime();
  if (t < 3.9) return null;

  // subtle end zoom on the whole group
  const groupScale = animate({
    from: 1.0,
    to: 1.035,
    start: 4.0,
    end: 8.0,
    ease: Easing.easeOutSine
  })(t);

  // logo settles in
  const logoOp = animate({
    from: 0,
    to: 1,
    start: 4.0,
    end: 4.5,
    ease: Easing.easeOutCubic
  })(t);
  const logoY = animate({
    from: 26,
    to: 0,
    start: 4.0,
    end: 4.6,
    ease: Easing.easeOutCubic
  })(t);

  // white rule grows
  const ruleW = animate({
    from: 0,
    to: 360,
    start: 4.55,
    end: 5.15,
    ease: Easing.easeOutExpo
  })(t);

  // claim lands
  const claimOp = animate({
    from: 0,
    to: 1,
    start: 4.75,
    end: 5.35,
    ease: Easing.easeOutCubic
  })(t);
  const claimY = animate({
    from: 34,
    to: 0,
    start: 4.75,
    end: 5.45,
    ease: Easing.easeOutCubic
  })(t);
  const logoW = 560,
    logoH = logoW * (545 / 1500);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      transform: `scale(${groupScale})`,
      transformOrigin: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: CX - logoW / 2,
      top: CY - logoH / 2 - 132,
      width: logoW,
      height: logoH,
      opacity: logoOp,
      transform: `translateY(${logoY}px)`
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../assets/wurth-logo-on-red.svg",
    alt: "W\xFCrth",
    style: {
      width: '100%',
      height: '100%',
      display: 'block'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: CX - ruleW / 2,
      top: CY + 6,
      width: ruleW,
      height: 5,
      background: WHITE
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: CY + 36,
      textAlign: 'center',
      opacity: claimOp,
      transform: `translateY(${claimY}px)`,
      color: WHITE,
      fontFamily: 'WuerthSans, sans-serif',
      fontWeight: 800,
      fontSize: 96,
      lineHeight: 1,
      textTransform: 'uppercase',
      letterSpacing: '-0.005em'
    }
  }, "It's that easy."), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: CY + 168,
      textAlign: 'center',
      opacity: claimOp,
      color: 'rgba(255,255,255,0.82)',
      fontFamily: 'WuerthSans, sans-serif',
      fontWeight: 400,
      fontSize: 28,
      textTransform: 'uppercase',
      letterSpacing: '0.34em',
      paddingLeft: '0.34em'
    }
  }, "Macht's einfach."));
}

/* ---- timestamp label for review comments ---- */
function TimestampLabel() {
  const t = useTime();
  React.useEffect(() => {
    const root = document.getElementById('video-root');
    if (root) root.setAttribute('data-screen-label', `t=${t.toFixed(1)}s`);
  }, [Math.floor(t)]);
  return null;
}
function BrandSting() {
  return /*#__PURE__*/React.createElement("div", {
    id: "video-root",
    style: {
      position: 'absolute',
      inset: 0
    }
  }, /*#__PURE__*/React.createElement(ShotOne, null), /*#__PURE__*/React.createElement(RedWipe, null), /*#__PURE__*/React.createElement(ShotTwo, null), /*#__PURE__*/React.createElement(TimestampLabel, null));
}
window.BrandSting = BrandSting;
})(); } catch (e) { __ds_ns.__errors.push({ path: "video/scenes.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.WiseCredit = __ds_scope.WiseCredit;

})();
