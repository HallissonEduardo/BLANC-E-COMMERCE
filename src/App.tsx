import { useRef, useState } from 'react'

type Page =
  | 'home'
  | 'catalog'
  | 'product'
  | 'cart'
  | 'checkout'
  | 'account'
  | 'auth'
  | 'admin-login'
  | 'admin'
  | 'admin-products'
  | 'admin-product'
  | 'admin-orders'
  | 'admin-order'

type IconName =
  | 'search' | 'user' | 'bag' | 'arrow' | 'heart' | 'menu' | 'x' | 'plus' | 'minus'
  | 'truck' | 'store' | 'shield' | 'chat' | 'send' | 'home' | 'box' | 'grid'
  | 'layers' | 'users' | 'settings' | 'chevron' | 'edit' | 'more' | 'filter'
  | 'logout' | 'bell' | 'upload' | 'check' | 'card' | 'pin' | 'clock' | 'eye'

const paths: Record<IconName, React.ReactNode> = {
  search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
  user: <><circle cx="12" cy="8" r="4"/><path d="M4 21c.7-4 3.4-6 8-6s7.3 2 8 6"/></>,
  bag: <><path d="M5 8h14l-1 13H6L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></>,
  arrow: <><path d="M5 12h14M14 7l5 5-5 5"/></>,
  heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5a5.5 5.5 0 0 0 1-8.9Z"/>,
  menu: <path d="M4 7h16M4 12h16M4 17h16"/>,
  x: <path d="m6 6 12 12M18 6 6 18"/>,
  plus: <path d="M12 5v14M5 12h14"/>,
  minus: <path d="M5 12h14"/>,
  truck: <><path d="M3 6h11v11H3zM14 10h4l3 3v4h-7z"/><circle cx="7" cy="19" r="2"/><circle cx="18" cy="19" r="2"/></>,
  store: <><path d="M4 10v11h16V10M3 10l2-6h14l2 6"/><path d="M3 10c1 3 4 3 6 0 2 3 5 3 6 0 2 3 5 3 6 0"/></>,
  shield: <><path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-4"/></>,
  chat: <path d="M21 14a4 4 0 0 1-4 4H8l-5 3 1.5-5A7 7 0 0 1 3 12V8a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v6Z"/>,
  send: <><path d="m22 2-7 20-4-9-9-4 20-7Z"/><path d="M22 2 11 13"/></>,
  home: <><path d="m3 11 9-8 9 8"/><path d="M5 10v11h14V10M9 21v-7h6v7"/></>,
  box: <><path d="m4 7 8-4 8 4-8 4-8-4Z"/><path d="M4 7v10l8 4 8-4V7M12 11v10"/></>,
  grid: <><rect x="4" y="4" width="6" height="6"/><rect x="14" y="4" width="6" height="6"/><rect x="4" y="14" width="6" height="6"/><rect x="14" y="14" width="6" height="6"/></>,
  layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/></>,
  users: <><circle cx="9" cy="8" r="3"/><path d="M3 20c0-4 2-6 6-6s6 2 6 6"/><path d="M16 5c3 0 4 2 4 4s-1 3-3 3M17 15c3 0 4 2 4 5"/></>,
  settings: <><circle cx="12" cy="12" r="3"/><path d="M19 13.5v-3l2-1-2-4-2 1a8 8 0 0 0-3-2V2h-4v2.5a8 8 0 0 0-3 2l-2-1-2 4 2 1v3l-2 1 2 4 2-1a8 8 0 0 0 3 2V22h4v-2.5a8 8 0 0 0 3-2l2 1 2-4-2-1Z"/></>,
  chevron: <path d="m9 18 6-6-6-6"/>,
  edit: <><path d="m14 5 5 5L9 20H4v-5L14 5Z"/><path d="m12 7 5 5"/></>,
  more: <><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></>,
  filter: <path d="M4 5h16M7 12h10M10 19h4"/>,
  logout: <><path d="M10 5H4v14h6M14 8l4 4-4 4M8 12h10"/></>,
  bell: <><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z"/><path d="M10 21h4"/></>,
  upload: <><path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 15v5h16v-5"/></>,
  check: <path d="m5 12 4 4L19 6"/>,
  card: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/></>,
  pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2"/></>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  eye: <><path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2"/></>,
}

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{paths[name]}</svg>
}

const products = [
  { id: 1, brand: 'NIVEA', name: 'Hidratante Facial Aqua Rose', price: 'R$ 44,90', tier: 'Essentials', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=700&q=85' },
  { id: 2, brand: 'BOCA ROSA', name: 'Base Mate Perfect Skin', price: 'R$ 69,90', tier: 'Favorites', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=700&q=85' },
  { id: 3, brand: 'L’ORÉAL PARIS', name: 'Sérum Revitalift Hialurônico', price: 'R$ 89,90', tier: 'Favorites', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=700&q=85' },
  { id: 4, brand: 'BIOSSANCE', name: 'Óleo Facial Squalane + Vitamina C', price: 'R$ 239,90', tier: 'Premium', image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=700&q=85' },
  { id: 5, brand: 'WELLA', name: 'Fusion Máscara de Reparação', price: 'R$ 149,90', tier: 'Premium', image: 'https://images.unsplash.com/photo-1522338140262-f46f5913618a?auto=format&fit=crop&w=700&q=85' },
  { id: 6, brand: 'FRAN BY FR', name: 'Lip Tint Rose Cherry', price: 'R$ 49,90', tier: 'Essentials', image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=700&q=85' },
]

const orders = [
  ['#BL-24081', 'Mariana Costa', 'Hoje, 10:42', 'R$ 289,80', 'Pago'],
  ['#BL-24080', 'Camila Nunes', 'Hoje, 09:18', 'R$ 124,70', 'Em separação'],
  ['#BL-24079', 'Ana Lima', 'Ontem, 18:55', 'R$ 459,90', 'Aguardando'],
  ['#BL-24078', 'Juliana Rocha', 'Ontem, 16:32', 'R$ 89,90', 'Enviado'],
]

function Logo({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  return <button className={`logo ${light ? 'logo-light' : ''}`} aria-label="BLANCÉ - início">
    <span className="logo-mark"><i/><i/></span>
    {!compact && <span>BLANCÉ<small>BEAUTY FOR EVERY YOU</small></span>}
  </button>
}

function Header({ onNav, cartCount }: { onNav: (p: Page) => void; cartCount: number }) {
  const [mobile, setMobile] = useState(false)
  return <>
    <div className="announcement">Frete grátis acima de R$ 199 <span>•</span> Retire grátis na loja</div>
    <header className="header">
      <button className="mobile-menu" onClick={() => setMobile(!mobile)}><Icon name="menu"/></button>
      <div onClick={() => onNav('home')}><Logo/></div>
      <nav className={mobile ? 'open' : ''}>
        <button onClick={() => onNav('catalog')}>Novidades</button>
        <button onClick={() => onNav('catalog')}>Makeup</button>
        <button onClick={() => onNav('catalog')}>Skincare</button>
        <button onClick={() => onNav('catalog')}>Cabelos</button>
        <button onClick={() => onNav('catalog')}>Corpo & Banho</button>
        <button onClick={() => onNav('catalog')}>Marcas</button>
      </nav>
      <div className="header-actions">
        <label className="search-pill" aria-label="Buscar produtos"><Icon name="search" size={18}/><input placeholder="Buscar produtos"/></label>
        <button aria-label="Minha conta" onClick={() => onNav('auth')}><Icon name="user"/></button>
        <button className="cart-icon" aria-label="Carrinho" onClick={() => onNav('cart')}><Icon name="bag"/><b>{cartCount}</b></button>
      </div>
    </header>
  </>
}

function ProductCard({ product, onOpen, onAdd }: { product: typeof products[0]; onOpen: () => void; onAdd: () => void }) {
  return <article className="product-card">
    <div className="product-image" onClick={onOpen}>
      <img src={product.image} alt={product.name}/>
      <span className={`tier ${product.tier === 'Premium' ? 'premium' : ''}`}>{product.tier}</span>
      <button className="heart" aria-label="Favoritar"><Icon name="heart" size={19}/></button>
    </div>
    <div className="product-info">
      <small>{product.brand}</small>
      <h3 onClick={onOpen}>{product.name}</h3>
      <p>{product.price} <span>ou 3x sem juros</span></p>
      <button className="add-btn" onClick={onAdd}>Adicionar <Icon name="plus" size={17}/></button>
    </div>
  </article>
}

function ProductCarousel({ items, onOpen, onAdd, label }: { items: typeof products; onOpen: () => void; onAdd: () => void; label: string }) {
  const track = useRef<HTMLDivElement>(null)
  const scroll = (direction: -1 | 1) => {
    if (!track.current) return
    track.current.scrollBy({ left: direction * track.current.clientWidth * .82, behavior: 'smooth' })
  }
  return <div className="product-carousel" aria-label={label}>
    <button className="carousel-control previous" aria-label="Ver produtos anteriores" onClick={() => scroll(-1)}><Icon name="chevron"/></button>
    <div className="carousel-track" ref={track}>
      {items.map((product, index) => <div className="carousel-slide" key={`${product.id}-${index}`}>
        <ProductCard product={product} onOpen={onOpen} onAdd={onAdd}/>
      </div>)}
    </div>
    <button className="carousel-control next" aria-label="Ver próximos produtos" onClick={() => scroll(1)}><Icon name="chevron"/></button>
    <div className="carousel-hint"><span>Deslize para ver mais</span><i/></div>
  </div>
}

function Home({ onNav, onAdd }: { onNav: (p: Page) => void; onAdd: () => void }) {
  const categories = [
    ['Makeup', 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=500&q=80'],
    ['Skincare', 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=500&q=80'],
    ['Hair Care', 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=500&q=80'],
    ['Body Care', 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=500&q=80'],
    ['Acessórios', 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=500&q=80'],
  ]
  return <main>
    <section className="hero">
      <div className="hero-content">
        <span className="eyebrow">BELEZA PARA TODOS OS SEUS MOMENTOS</span>
        <h1>Beauty for<br/><em>Every You.</em></h1>
        <p>Descubra escolhas que combinam com você, sua rotina e seu jeito de viver a beleza.</p>
        <button className="btn primary" onClick={() => onNav('catalog')}>Explorar produtos <Icon name="arrow"/></button>
      </div>
      <img src={`${import.meta.env.BASE_URL}assets/blance-hero.png`} alt="Cosméticos BLANCÉ em tons claros"/>
      <div className="hero-note">Seleção BLANCÉ <span>Curadoria com propósito</span></div>
    </section>

    <section className="section categories">
      <div className="section-heading">
        <div><span className="eyebrow">EXPLORE</span><h2>Beleza do seu jeito</h2></div>
        <button onClick={() => onNav('catalog')}>Ver todas <Icon name="arrow" size={18}/></button>
      </div>
      <div className="category-grid">{categories.map(([name, image]) =>
        <button className="category" key={name} onClick={() => onNav('catalog')}>
          <img src={image} alt=""/><span>{name}<Icon name="arrow" size={18}/></span>
        </button>
      )}</div>
    </section>

    <section className="tier-section">
      <div className="section-heading centered"><div><span className="eyebrow">CURADORIA BLANCÉ</span><h2>Uma escolha para cada momento</h2><p>Três formas de encontrar a beleza que cabe na sua vida.</p></div></div>
      <div className="tier-grid">
        <article><span>01</span><div className="tier-dot"/><h3>Essentials</h3><p>Os indispensáveis do dia a dia. Práticos, confiáveis e sempre por perto.</p><button onClick={() => onNav('catalog')}>Descobrir <Icon name="arrow" size={17}/></button></article>
        <article className="active"><span>02</span><div className="tier-dot"/><h3>Favorites</h3><p>O equilíbrio perfeito entre preço, performance e aquele toque especial.</p><button onClick={() => onNav('catalog')}>Descobrir <Icon name="arrow" size={17}/></button></article>
        <article><span>03</span><div className="tier-dot"/><h3>Premium Selection</h3><p>Fórmulas especiais e experiências que transformam o seu ritual.</p><button onClick={() => onNav('catalog')}>Descobrir <Icon name="arrow" size={17}/></button></article>
      </div>
    </section>

    <section className="section">
      <div className="section-heading"><div><span className="eyebrow">ESCOLHAS DA SEMANA</span><h2>Queridinhos BLANCÉ</h2></div><button onClick={() => onNav('catalog')}>Ver todos <Icon name="arrow" size={18}/></button></div>
      <ProductCarousel items={products} onOpen={() => onNav('product')} onAdd={onAdd} label="Produtos em destaque"/>
    </section>

    <section className="delivery-banner">
      <div><Icon name="truck" size={34}/><span>Receba em casa<small>Entregas para todo o Brasil</small></span></div>
      <i/>
      <div><Icon name="store" size={34}/><span>Ou retire na loja<small>Sem frete e no seu tempo</small></span></div>
      <button onClick={() => onNav('catalog')}>Escolha como receber <Icon name="arrow"/></button>
    </section>
  </main>
}

function Catalog({ onNav, onAdd }: { onNav: (p: Page) => void; onAdd: () => void }) {
  const [filters, setFilters] = useState(false)
  return <main className="catalog page">
    <div className="breadcrumbs">Início <span>/</span> Todos os produtos</div>
    <div className="catalog-title"><div><span className="eyebrow">DESCUBRA</span><h1>Todos os produtos</h1><p>72 produtos selecionados para você</p></div></div>
    <div className="catalog-toolbar">
      <button className="filter-mobile" onClick={() => setFilters(!filters)}><Icon name="filter"/> Filtrar produtos</button>
      <span>72 produtos</span>
      <label>Ordenar por <select><option>Mais relevantes</option><option>Menor preço</option><option>Mais vendidos</option></select></label>
    </div>
    <div className="catalog-layout">
      <aside className={filters ? 'show' : ''}>
        <h3>Filtros <button onClick={() => setFilters(false)}><Icon name="x"/></button></h3>
        {['Categoria', 'Faixa BLANCÉ', 'Marca', 'Preço'].map((f, i) => <div className="filter-group" key={f}>
          <strong>{f}<Icon name="minus" size={15}/></strong>
          {i === 0 && ['Makeup (18)', 'Skincare (22)', 'Hair Care (14)', 'Body Care (12)', 'Acessórios (6)'].map(x => <label key={x}><input type="checkbox"/> {x}</label>)}
          {i === 1 && ['Essentials', 'Favorites', 'Premium Selection'].map(x => <label key={x}><input type="checkbox"/> {x}</label>)}
          {i === 2 && ['Nivea', 'Boca Rosa', 'L’Oréal Paris', 'Wella'].map(x => <label key={x}><input type="checkbox"/> {x}</label>)}
          {i === 3 && <><div className="price-range"><span>R$ 0</span><span>R$ 350</span></div><input type="range"/></>}
        </div>)}
      </aside>
      <div><div className="active-filters"><span>Favorites <button>×</button></span><button>Limpar filtros</button></div>
        <div className="product-grid">{products.concat(products.slice(0, 3)).map((p, i) => <ProductCard key={`${p.id}-${i}`} product={p} onOpen={() => onNav('product')} onAdd={onAdd}/>)}</div>
        <div className="pagination"><button>‹</button><button className="selected">1</button><button>2</button><button>3</button><span>...</span><button>8</button><button>›</button></div>
      </div>
    </div>
  </main>
}

function ProductPage({ onNav, onAdd }: { onNav: (p: Page) => void; onAdd: () => void }) {
  const [qty, setQty] = useState(1)
  const [photo, setPhoto] = useState(products[2].image)
  return <main className="page">
    <div className="breadcrumbs">Início <span>/</span> Skincare <span>/</span> Sérum Revitalift</div>
    <div className="product-detail">
      <div className="gallery">
        <div className="thumbs">{products.slice(2, 5).map(p => <button onClick={() => setPhoto(p.image)} className={photo === p.image ? 'active' : ''}><img src={p.image}/></button>)}</div>
        <div className="main-photo"><span className="tier">Favorites</span><img src={photo}/><button><Icon name="heart"/></button></div>
      </div>
      <div className="product-copy">
        <span className="eyebrow">L’ORÉAL PARIS</span>
        <h1>Sérum Revitalift Hialurônico</h1>
        <div className="rating">★★★★★ <span>4.9 (128 avaliações)</span></div>
        <p className="description">Sérum facial com 1,5% de ácido hialurônico puro. Hidrata intensamente, preenche linhas finas e devolve a luminosidade natural da pele.</p>
        <div className="price"><strong>R$ 89,90</strong><span>ou 3x de R$ 29,97 sem juros</span></div>
        <div className="stock-warning"><span>●</span> Últimas 6 unidades disponíveis</div>
        <label>Quantidade</label>
        <div className="purchase-row">
          <div className="quantity"><button onClick={() => setQty(Math.max(1, qty - 1))}>−</button><span>{qty}</span><button onClick={() => setQty(qty + 1)}>+</button></div>
          <button className="btn primary grow" onClick={onAdd}>Adicionar ao carrinho <Icon name="bag"/></button>
        </div>
        <div className="benefits">
          <div><Icon name="truck"/><span>Calcule o frete<small>Informe seu CEP no carrinho</small></span></div>
          <div><Icon name="store"/><span>Retirada grátis<small>Disponível em até 2 horas</small></span></div>
          <div><Icon name="shield"/><span>Compra segura<small>Seus dados sempre protegidos</small></span></div>
        </div>
        <details open><summary>Como usar <Icon name="minus"/></summary><p>Aplique 2 a 3 gotas sobre a pele limpa, pela manhã e à noite. Massageie suavemente.</p></details>
        <details><summary>Ingredientes <Icon name="plus"/></summary></details>
      </div>
    </div>
    <section className="related"><div className="section-heading"><div><span className="eyebrow">COMBINE COM</span><h2>Você também pode gostar</h2></div></div><ProductCarousel items={products} onOpen={() => {}} onAdd={onAdd} label="Produtos relacionados"/></section>
  </main>
}

function Cart({ onNav, count, setCount }: { onNav: (p: Page) => void; count: number; setCount: (n: number) => void }) {
  return <main className="page cart-page">
    <div className="breadcrumbs">Início <span>/</span> Carrinho</div>
    <h1>Seu carrinho <small>{count} itens</small></h1>
    {count === 0 ? <div className="empty-state"><Icon name="bag" size={45}/><h2>Seu carrinho está vazio</h2><p>Que tal descobrir algo que combine com você?</p><button className="btn primary" onClick={() => onNav('catalog')}>Explorar produtos</button></div> :
    <div className="cart-layout">
      <div className="cart-items">
        {products.slice(1, 3).map((p, i) => <div className="cart-item" key={p.id}><img src={p.image}/><div><small>{p.brand}</small><h3>{p.name}</h3><span className="tier">{p.tier}</span><button className="remove" onClick={() => setCount(Math.max(0, count - 1))}>Remover</button></div><div className="cart-item-end"><strong>{p.price}</strong><div className="quantity"><button>−</button><span>{i + 1}</span><button>+</button></div></div></div>)}
        <button className="continue" onClick={() => onNav('catalog')}>← Continuar comprando</button>
      </div>
      <OrderSummary onCheckout={() => onNav('checkout')}/>
    </div>}
  </main>
}

function OrderSummary({ onCheckout, checkout = false }: { onCheckout?: () => void; checkout?: boolean }) {
  return <aside className="order-summary"><h3>Resumo do pedido</h3><div><span>Subtotal</span><b>R$ 269,70</b></div><div><span>Frete</span><b className="blue">{checkout ? 'R$ 12,90' : 'Calcular'}</b></div><div className="coupon"><input placeholder="Cupom de desconto"/><button>Aplicar</button></div><div className="total"><span>Total</span><strong>{checkout ? 'R$ 282,60' : 'R$ 269,70'}<small>em até 6x sem juros</small></strong></div>{onCheckout && <button className="btn primary wide" onClick={onCheckout}>Ir para o checkout <Icon name="arrow"/></button>}<p><Icon name="shield" size={16}/> Ambiente seguro e protegido</p></aside>
}

function Checkout({ onNav }: { onNav: (p: Page) => void }) {
  const [step, setStep] = useState(1)
  const [method, setMethod] = useState('delivery')
  const [pay, setPay] = useState('pix')
  const labels = ['Identificação', 'Entrega', 'Pagamento', 'Confirmação']
  return <main className="checkout-page">
    <div className="checkout-head"><div onClick={() => onNav('home')}><Logo/></div><span><Icon name="shield" size={17}/> Compra 100% segura</span></div>
    <div className="stepper">{labels.map((l, i) => <div className={`${step === i + 1 ? 'active' : ''} ${step > i + 1 ? 'done' : ''}`}><b>{step > i + 1 ? '✓' : i + 1}</b><span>{l}</span>{i < 3 && <i/>}</div>)}</div>
    {step === 4 ? <div className="confirmation"><div className="success"><Icon name="check" size={38}/></div><span className="eyebrow">PAGAMENTO APROVADO</span><h1>Pedido confirmado!</h1><p>Obrigada pela sua compra, Mariana. Enviamos todos os detalhes para o seu e-mail.</p><div className="order-number"><span>Número do pedido</span><strong>#BL-24082</strong></div><div className="confirm-grid"><div><Icon name="truck"/><span>Entrega prevista<strong>Até 18 de junho</strong></span></div><div><Icon name="pin"/><span>Entregar em<strong>Rua das Flores, 124</strong></span></div></div><button className="btn primary" onClick={() => onNav('account')}>Acompanhar meu pedido</button><button className="btn text" onClick={() => onNav('home')}>Voltar para a loja</button></div> :
    <div className="checkout-layout">
      <section className="checkout-card">
        {step === 1 && <><span className="eyebrow">ETAPA 1 DE 4</span><h1>Como podemos te identificar?</h1><p>Use seu e-mail para continuar ou acesse sua conta.</p><label>E-mail<input placeholder="voce@email.com" defaultValue="mariana@email.com"/></label><button className="btn primary wide" onClick={() => setStep(2)}>Continuar <Icon name="arrow"/></button><div className="divider"><span>ou</span></div><button className="btn outline wide">Entrar na minha conta</button></>}
        {step === 2 && <><span className="eyebrow">ETAPA 2 DE 4</span><h1>Como você quer receber?</h1><div className="method-tabs"><button className={method === 'delivery' ? 'active' : ''} onClick={() => setMethod('delivery')}><Icon name="truck"/> Entrega</button><button className={method === 'pickup' ? 'active' : ''} onClick={() => setMethod('pickup')}><Icon name="store"/> Retirada</button></div>
          {method === 'delivery' ? <><label>CEP<div className="input-action"><input defaultValue="01310-100"/><button>Buscar</button></div></label><div className="shipping-options"><label><input type="radio" name="ship" defaultChecked/><span><b>Entrega padrão</b><small>Receba em até 4 dias úteis</small></span><strong>R$ 12,90</strong></label><label><input type="radio" name="ship"/><span><b>Entrega expressa</b><small>Receba amanhã</small></span><strong>R$ 24,90</strong></label></div></> : <div className="pickup"><Icon name="pin"/><div><b>BLANCÉ — Shopping Central</b><p>Av. Paulista, 1000 — Bela Vista, São Paulo</p><small>Pronto para retirada em até 2 horas</small></div></div>}
          <div className="step-actions"><button className="btn text" onClick={() => setStep(1)}>Voltar</button><button className="btn primary" onClick={() => setStep(3)}>Ir para pagamento <Icon name="arrow"/></button></div></>}
        {step === 3 && <><span className="eyebrow">ETAPA 3 DE 4</span><h1>Escolha como pagar</h1><div className="pay-options"><button onClick={() => setPay('pix')} className={pay === 'pix' ? 'active' : ''}><b>PIX</b><span>5% de desconto</span></button><button onClick={() => setPay('card')} className={pay === 'card' ? 'active' : ''}><Icon name="card"/> Cartão de crédito</button></div>
          {pay === 'pix' ? <div className="pix-box"><div className="qr"><span/><span/><span/></div><div><h3>Pague R$ 268,47 via Pix</h3><p>O QR Code ficará disponível por <b>14:59</b>. A aprovação é imediata.</p><button className="btn outline">Copiar código Pix</button></div></div> : <div className="card-form"><label>Número do cartão<input placeholder="0000 0000 0000 0000"/></label><div><label>Validade<input placeholder="MM/AA"/></label><label>CVV<input placeholder="123"/></label></div><label>Parcelas<select><option>1x de R$ 282,60 sem juros</option><option>3x de R$ 94,20 sem juros</option></select></label></div>}
          <div className="step-actions"><button className="btn text" onClick={() => setStep(2)}>Voltar</button><button className="btn primary" onClick={() => setStep(4)}>Finalizar pedido <Icon name="arrow"/></button></div></>}
      </section>
      <OrderSummary checkout/>
    </div>}
  </main>
}

function Auth({ onNav }: { onNav: (p: Page) => void }) {
  const hero = `${import.meta.env.BASE_URL}assets/blance-hero.png`
  return <main className="auth-page"><div className="auth-visual" style={{ backgroundImage: `linear-gradient(rgba(28,64,94,.91),rgba(28,64,94,.91)),url("${hero}")` }}><div onClick={() => onNav('home')}><Logo light/></div><div><span className="eyebrow">BEAUTY FOR EVERY YOU</span><h1>Sua beleza,<br/>suas escolhas.</h1><p>Acesse sua conta para acompanhar pedidos, salvar favoritos e ter uma experiência feita para você.</p></div></div><div className="auth-form"><button className="auth-close" onClick={() => onNav('home')}><Icon name="x"/></button><div><span className="eyebrow">BEM-VINDA DE VOLTA</span><h1>Entre na sua conta</h1><p>Novo por aqui? <button>Crie sua conta</button></p><label>E-mail<input placeholder="voce@email.com"/></label><label>Senha<div className="password"><input type="password" placeholder="Sua senha"/><Icon name="eye"/></div></label><button className="forgot">Esqueci minha senha</button><button className="btn primary wide" onClick={() => onNav('account')}>Entrar</button><div className="divider"><span>ou continue com</span></div><button className="btn outline wide">G &nbsp; Google</button></div></div></main>
}

function Account({ onNav }: { onNav: (p: Page) => void }) {
  return <main className="page account-page"><div className="account-head"><span className="eyebrow">MINHA CONTA</span><h1>Olá, Mariana</h1><p>Que bom ter você por aqui.</p></div><div className="account-layout"><aside><button className="active"><Icon name="box"/> Meus pedidos</button><button><Icon name="user"/> Dados pessoais</button><button><Icon name="pin"/> Endereços</button><button><Icon name="heart"/> Favoritos</button><button onClick={() => onNav('home')}><Icon name="logout"/> Sair</button></aside><section><div className="section-heading"><div><h2>Meus pedidos</h2><p>Acompanhe seus pedidos e veja compras anteriores.</p></div></div><div className="order-card"><div className="order-card-head"><div><small>PEDIDO</small><b>#BL-24082</b></div><div><small>REALIZADO EM</small><b>14 jun 2025</b></div><span className="status green">Pago</span></div><div className="order-product"><img src={products[2].image}/><span>{products[2].name}<small>+ 1 item</small></span><strong>R$ 282,60</strong></div><div className="timeline"><i className="done"/><i className="done"/><i/><i/><div><span>Pedido confirmado</span><span>Em separação</span><span>Enviado</span><span>Entregue</span></div></div><div className="order-actions"><button className="btn outline">Ver detalhes</button><span>Entrega prevista até 18 de junho</span></div></div><div className="order-card compact"><div><span><small>PEDIDO #BL-23819</small><b>Concluído em 02 mai 2025</b></span><strong>R$ 149,90</strong><button className="btn text">Ver detalhes <Icon name="chevron"/></button></div></div></section></div></main>
}

function Footer({ onAdmin }: { onAdmin: () => void }) {
  return <footer><div className="footer-main"><div><Logo light/><p>Beleza para todas as suas versões.<br/>Com curadoria, leveza e propósito.</p><div className="social">◎ ◯ ◇</div></div><div><h4>Explore</h4><a>Makeup</a><a>Skincare</a><a>Hair Care</a><a>Body Care</a></div><div><h4>Ajuda</h4><a>Entrega e retirada</a><a>Trocas e devoluções</a><a>Fale conosco</a><a onClick={onAdmin}>Área administrativa</a></div><div><h4>Atendimento</h4><button className="whatsapp">WhatsApp <span>Seg–Sáb, 9h às 18h</span></button></div></div><div className="footer-bottom"><span>© 2025 BLANCÉ. Todos os direitos reservados.</span><span>Privacidade &nbsp; Termos</span></div></footer>
}

function Chatbot({ onOpenProduct }: { onOpenProduct: () => void }) {
  const [open, setOpen] = useState(false)
  const [asked, setAsked] = useState(false)
  return <><button className="chat-fab" onClick={() => setOpen(!open)}>{open ? <Icon name="x"/> : <Icon name="chat"/>}<span>Precisa de ajuda?</span></button>{open && <div className="chat-window"><header><div className="bot-avatar"><Logo compact light/></div><span><b>Assistente BLANCÉ</b><small><i/> Online agora</small></span><button onClick={() => setOpen(false)}><Icon name="minus"/></button></header><div className="chat-body"><div className="bot-message">Oi! Sou a assistente da BLANCÉ. Como posso ajudar você a encontrar sua próxima escolha de beleza?</div>{asked ? <><div className="user-message">Quais hidratantes até R$ 50?</div><div className="bot-message">Separei uma opção queridinha que combina com o que você procura:</div><button className="chat-product" onClick={onOpenProduct}><img src={products[0].image}/><span><small>{products[0].brand}</small><b>{products[0].name}</b><strong>{products[0].price}</strong></span></button></> : <div className="quick-replies"><button onClick={() => setAsked(true)}>Quais hidratantes até R$ 50?</button><button onClick={() => setAsked(true)}>Tem base para pele oleosa?</button><button onClick={() => setAsked(true)}>Quero montar uma rotina de skincare</button></div>}</div><div className="chat-input"><input placeholder="Digite sua mensagem..."/><button><Icon name="send"/></button></div><button className="chat-whatsapp">Falar com atendimento no WhatsApp</button></div>}</>
}

const adminNav: [IconName, string, Page][] = [['home','Dashboard','admin'],['box','Produtos','admin-products'],['grid','Categorias','admin-products'],['layers','Estoque','admin-products'],['bag','Pedidos','admin-orders'],['users','Clientes','admin'],['settings','Configurações','admin']]

function AdminShell({ page, onNav, children }: { page: Page; onNav: (p: Page) => void; children: React.ReactNode }) {
  return <div className="admin-shell"><aside className="admin-sidebar"><Logo light/><nav>{adminNav.map(([icon,label,target]) => <button className={page === target ? 'active' : ''} onClick={() => onNav(target)}><Icon name={icon}/>{label}</button>)}</nav><div className="admin-profile"><span>MC</span><div><b>Marina Castro</b><small>Administrador</small></div><Icon name="more"/></div></aside><main className="admin-main"><header><div className="admin-search"><Icon name="search"/><input placeholder="Buscar no painel..."/></div><div><button><Icon name="bell"/></button><i/><span>Olá, Marina</span></div></header>{children}</main></div>
}

function AdminDashboard({ onNav }: { onNav: (p: Page) => void }) {
  return <div className="admin-content"><div className="admin-heading"><div><p>Quinta-feira, 14 de junho</p><h1>Visão geral</h1></div><select><option>Últimos 30 dias</option></select></div><div className="metric-grid">{[['Vendas hoje','R$ 4.820','+12,5%'],['Pedidos pendentes','18','4 novos'],['Ticket médio','R$ 186,40','+3,2%'],['Estoque baixo','7 produtos','Ver produtos']].map((m,i)=><article><div className={`metric-icon c${i}`}><Icon name={i===0?'card':i===1?'bag':i===2?'arrow':'box'}/></div><span>{m[0]}</span><strong>{m[1]}</strong><small className={i===3?'warning':''}>{m[2]}</small></article>)}</div><div className="dashboard-grid"><section className="admin-card sales-chart"><div className="card-heading"><div><h2>Vendas</h2><p>Desempenho nos últimos 7 dias</p></div><strong>R$ 28.450<small>+8,4% vs. período anterior</small></strong></div><div className="chart"><div className="y-labels"><span>6k</span><span>4k</span><span>2k</span><span>0</span></div><svg viewBox="0 0 700 180" preserveAspectRatio="none"><defs><linearGradient id="fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#A9C4D8" stopOpacity=".5"/><stop offset="1" stopColor="#A9C4D8" stopOpacity="0"/></linearGradient></defs><path className="area" d="M0 140 C80 130 100 90 175 105 S270 150 350 80 S460 110 525 55 S620 70 700 25 L700 180 L0 180Z"/><path className="line" d="M0 140 C80 130 100 90 175 105 S270 150 350 80 S460 110 525 55 S620 70 700 25"/></svg><div className="x-labels"><span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sáb</span><span>Dom</span></div></div></section><section className="admin-card low-stock"><div className="card-heading"><div><h2>Estoque baixo</h2><p>Produtos abaixo do mínimo</p></div><button onClick={() => onNav('admin-products')}>Ver todos</button></div>{products.slice(0,3).map((p,i)=><div><img src={p.image}/><span><b>{p.name}</b><small>Mínimo: 5 un.</small></span><strong>{i+1} un.</strong></div>)}</section></div><section className="admin-card latest-orders"><div className="card-heading"><div><h2>Últimos pedidos</h2><p>Atualizações recentes da loja</p></div><button onClick={() => onNav('admin-orders')}>Ver todos <Icon name="arrow" size={16}/></button></div><AdminTable rows={orders} onRow={() => onNav('admin-order')}/></section></div>
}

function AdminTable({ rows, onRow }: { rows: string[][]; onRow: () => void }) {
  return <div className="admin-table"><div className="tr th"><span>Pedido</span><span>Cliente</span><span>Data</span><span>Total</span><span>Status</span><span/></div>{rows.map(r=><button className="tr" onClick={onRow}>{r.map((c,i)=><span className={i===4?`status ${c==='Pago'?'green':c==='Aguardando'?'amber':'blue-status'}`:''}>{c}</span>)}<span><Icon name="chevron" size={16}/></span></button>)}</div>
}

function AdminProducts({ onNav }: { onNav: (p: Page) => void }) {
  return <div className="admin-content"><div className="admin-heading"><div><p>Catálogo</p><h1>Produtos</h1></div><button className="btn primary" onClick={() => onNav('admin-product')}><Icon name="plus"/> Novo produto</button></div><section className="admin-card"><div className="table-toolbar"><div className="admin-search"><Icon name="search"/><input placeholder="Buscar por nome, marca ou SKU..."/></div><button className="btn outline"><Icon name="filter"/> Filtros</button><select><option>Todos os status</option></select></div><div className="product-table"><div className="ptr th"><input type="checkbox"/><span>Produto</span><span>Categoria</span><span>Faixa</span><span>Preço</span><span>Estoque</span><span>Status</span><span/></div>{products.map((p,i)=><div className="ptr"><input type="checkbox"/><span className="product-cell"><img src={p.image}/><span><b>{p.name}</b><small>SKU BL00{p.id}</small></span></span><span>{i%2?'Makeup':'Skincare'}</span><span>{p.tier}</span><span>{p.price}</span><span className={i===0?'danger':''}>{i===0?'2 un.':`${12+i*4} un.`}</span><span className="status green">Ativo</span><button onClick={() => onNav('admin-product')}><Icon name="more"/></button></div>)}</div><div className="table-footer">Mostrando 1–6 de 72 produtos <div><button>‹</button><button className="active">1</button><button>2</button><button>3</button><button>›</button></div></div></section></div>
}

function AdminProductForm({ onNav }: { onNav: (p: Page) => void }) {
  return <div className="admin-content"><div className="admin-heading"><div><button className="back" onClick={() => onNav('admin-products')}>← Produtos</button><h1>Novo produto</h1><p>Preencha as informações para adicionar ao catálogo.</p></div><div><button className="btn outline" onClick={() => onNav('admin-products')}>Cancelar</button><button className="btn primary" onClick={() => onNav('admin-products')}>Salvar produto</button></div></div><div className="form-layout"><div><section className="admin-card form-card"><h2>Informações básicas</h2><div className="form-grid"><label className="full">Nome do produto *<input placeholder="Ex: Sérum Facial Vitamina C"/></label><label>Marca *<input placeholder="Selecione ou digite"/></label><label>Categoria *<select><option>Selecione</option><option>Skincare</option></select></label><label className="full">Descrição *<textarea placeholder="Descreva benefícios, modo de uso e diferenciais..."/></label></div></section><section className="admin-card form-card"><h2>Fotos do produto</h2><div className="upload-zone"><Icon name="upload" size={30}/><b>Arraste as fotos ou clique para selecionar</b><span>PNG, JPG ou WEBP · Máximo 5 MB por foto</span><button className="btn outline">Selecionar arquivos</button></div></section><section className="admin-card form-card"><h2>Preço e estoque</h2><div className="form-grid"><label>Preço de venda *<div className="prefix"><span>R$</span><input placeholder="0,00"/></div></label><label>Quantidade em estoque *<input placeholder="0"/></label><label>Estoque mínimo<input placeholder="5"/></label><label>SKU<input placeholder="Gerado automaticamente"/></label></div></section></div><aside><section className="admin-card form-card"><h2>Status</h2><div className="toggle-row"><span><b>Produto ativo</b><small>Visível na loja</small></span><button className="toggle on"><i/></button></div></section><section className="admin-card form-card"><h2>Curadoria BLANCÉ</h2><label>Faixa do produto *<select><option>Selecione uma faixa</option><option>Essentials</option><option>Favorites</option><option>Premium Selection</option></select></label><p className="hint">A faixa ajuda clientes a encontrar produtos por perfil e valor.</p></section><section className="admin-card form-card"><h2>Frete</h2><div className="form-grid"><label className="full">Peso (g) *<input placeholder="0"/></label><label>Altura (cm)<input placeholder="0"/></label><label>Largura (cm)<input placeholder="0"/></label><label>Comprimento (cm)<input placeholder="0"/></label></div></section></aside></div></div>
}

function AdminOrders({ onNav }: { onNav: (p: Page) => void }) {
  return <div className="admin-content"><div className="admin-heading"><div><p>Gestão</p><h1>Pedidos</h1></div><button className="btn outline">Exportar pedidos</button></div><div className="order-tabs"><button className="active">Todos <span>42</span></button><button>Aguardando <span>6</span></button><button>Pagos <span>12</span></button><button>Em separação <span>8</span></button><button>Enviados <span>10</span></button></div><section className="admin-card"><div className="table-toolbar"><div className="admin-search"><Icon name="search"/><input placeholder="Buscar pedido ou cliente..."/></div><button className="btn outline"><Icon name="filter"/> Filtros</button><input type="date"/></div><AdminTable rows={orders.concat(orders.slice(0,2))} onRow={() => onNav('admin-order')}/></section></div>
}

function AdminOrderDetail({ onNav }: { onNav: (p: Page) => void }) {
  return <div className="admin-content"><div className="admin-heading"><div><button className="back" onClick={() => onNav('admin-orders')}>← Pedidos</button><div className="title-status"><h1>Pedido #BL-24081</h1><span className="status green">Pago</span></div><p>Realizado em 14 de junho de 2025 às 10:42</p></div><button className="btn primary">Marcar em separação</button></div><div className="order-detail-grid"><div><section className="admin-card form-card"><h2>Itens do pedido <span>2 itens</span></h2>{products.slice(1,3).map((p,i)=><div className="detail-product"><img src={p.image}/><span><b>{p.name}</b><small>SKU BL00{p.id} · Qtd. {i+1}</small></span><strong>{p.price}</strong></div>)}<div className="detail-totals"><span>Subtotal <b>R$ 269,70</b></span><span>Frete <b>R$ 12,90</b></span><span>Total <strong>R$ 282,60</strong></span></div></section><section className="admin-card form-card"><h2>Linha do tempo</h2><div className="vertical-timeline"><div className="done"><i/><span><b>Pagamento aprovado</b><small>14 jun, 10:44</small></span></div><div className="done"><i/><span><b>Pedido realizado</b><small>14 jun, 10:42</small></span></div><div><i/><span><b>Em separação</b><small>Aguardando atualização</small></span></div><div><i/><span><b>Enviado</b></span></div></div></section></div><aside><section className="admin-card form-card"><h2>Cliente</h2><div className="customer"><span>MC</span><div><b>Mariana Costa</b><small>mariana@email.com<br/>(11) 99999-1234</small></div></div><button className="btn text">Ver perfil do cliente</button></section><section className="admin-card form-card"><h2>Entrega</h2><p><b>Entrega padrão</b></p><p>Rua das Flores, 124, ap. 42<br/>Bela Vista — São Paulo, SP<br/>01310-100</p><small>Previsão: até 18 de junho</small><button className="btn outline wide">Gerar etiqueta de envio</button></section><section className="admin-card form-card"><h2>Pagamento</h2><div className="info-row"><span>Método</span><b>Pix</b></div><div className="info-row"><span>Status</span><span className="status green">Aprovado</span></div><div className="info-row"><span>ID</span><b>pix_89abc123</b></div></section><button className="btn danger-btn wide">Cancelar pedido</button></aside></div></div>
}

function AdminLogin({ onNav }: { onNav: (p: Page) => void }) {
  return <main className="admin-login"><section><Logo light/><div><span className="eyebrow">PAINEL DE GESTÃO</span><h1>Beleza em cada detalhe.<br/>Controle em cada escolha.</h1><p>Gerencie a operação da BLANCÉ de forma simples e inteligente.</p></div><small>© 2025 BLANCÉ</small></section><section><div className="login-box"><Logo/><h1>Acessar o painel</h1><p>Entre com suas credenciais de administrador.</p><label>E-mail<input defaultValue="admin@blance.com.br"/></label><label>Senha<div className="password"><input type="password" defaultValue="12345678"/><Icon name="eye"/></div></label><div className="login-meta"><label><input type="checkbox"/> Lembrar de mim</label><button>Esqueci minha senha</button></div><button className="btn primary wide" onClick={() => onNav('admin')}>Entrar no painel <Icon name="arrow"/></button><small>Acesso exclusivo para equipe autorizada.</small></div></section></main>
}

export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [cartCount, setCartCount] = useState(2)
  const [toast, setToast] = useState(false)
  const nav = (p: Page) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const add = () => {
    setCartCount(c => c + 1)
    setToast(true)
    window.setTimeout(() => setToast(false), 4000)
  }
  if (page === 'admin-login') return <AdminLogin onNav={nav}/>
  if (page.startsWith('admin')) return <AdminShell page={page} onNav={nav}>
    {page === 'admin' && <AdminDashboard onNav={nav}/>}
    {page === 'admin-products' && <AdminProducts onNav={nav}/>}
    {page === 'admin-product' && <AdminProductForm onNav={nav}/>}
    {page === 'admin-orders' && <AdminOrders onNav={nav}/>}
    {page === 'admin-order' && <AdminOrderDetail onNav={nav}/>}
  </AdminShell>
  if (page === 'checkout') return <Checkout onNav={nav}/>
  if (page === 'auth') return <Auth onNav={nav}/>
  return <div className="storefront"><Header onNav={nav} cartCount={cartCount}/>
    {page === 'home' && <Home onNav={nav} onAdd={add}/>}
    {page === 'catalog' && <Catalog onNav={nav} onAdd={add}/>}
    {page === 'product' && <ProductPage onNav={nav} onAdd={add}/>}
    {page === 'cart' && <Cart onNav={nav} count={cartCount} setCount={setCartCount}/>}
    {page === 'account' && <Account onNav={nav}/>}
    <Footer onAdmin={() => nav('admin-login')}/><Chatbot onOpenProduct={() => nav('product')}/>
    {toast && <div className="system-toast" role="status" aria-live="polite">
      <span className="toast-check"><Icon name="check" size={16}/></span>
      <span><b>Produto adicionado</b><small>O item está no seu carrinho.</small></span>
      <button onClick={() => nav('cart')}>Ver carrinho</button>
      <button className="toast-close" aria-label="Fechar aviso" onClick={() => setToast(false)}><Icon name="x" size={16}/></button>
    </div>}
  </div>
}
