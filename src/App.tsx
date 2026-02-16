import { useState, useMemo, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { 
  Search, Eye, EyeOff, Copy, Check, ArrowLeft, ArrowRight, 
  ExternalLink, Lock, Mail, Loader2, ChevronDown, Shield, Layers,
  Users, BarChart3, MessageSquare, FileText, Package, Briefcase,
  Megaphone, TrendingUp, ClipboardList, Headphones, ShoppingCart,
  Target, Star, Zap, User, Link, Brain, Calendar, BookOpen,
  Smartphone, Folder, Database, CheckCircle, Plug, Scale, Bell,
  Warehouse, RefreshCw, Calculator, Heart, GraduationCap, PenTool,
  FlaskConical, DollarSign, AlertTriangle, Building2, Trello, Clock,
  Tag, Globe, Sparkles, ShieldAlert, CreditCard, Truck, Hash, Monitor,
  Settings, LucideIcon
} from 'lucide-react';
import { apps } from './data/apps';
import type { AppData } from './data/apps';

// Icon mapping helper
const iconMap: Record<string, LucideIcon> = {
  Users, BarChart3, MessageSquare, FileText, Package, Briefcase,
  Megaphone, TrendingUp, ClipboardList, Headphones, ShoppingCart, Eye,
  Target, Star, Zap, User, Link, Brain, Calendar, BookOpen,
  Smartphone, Folder, Database, CheckCircle, Plug, Scale, Bell,
  Warehouse, RefreshCw, Calculator, Heart, GraduationCap, PenTool,
  FlaskConical, DollarSign, AlertTriangle, Building2, Trello, Clock,
  Tag, Globe, Sparkles, ShieldAlert, CreditCard, Truck, Search, Hash,
  Monitor, Settings, Mail
};

const getIcon = (iconName: string, size: number = 20, color?: string) => {
  const IconComponent = iconMap[iconName];
  if (!IconComponent) return null;
  return <IconComponent size={size} color={color} strokeWidth={2} />;
};

/* ============================================================
   VALID CREDENTIALS
   ============================================================ */
const VALID_CREDS = [
  { email: 'hola@aintelligence.cl', password: 'Aintelligence2026$' }
];

/* ============================================================
   STATUS BADGE
   ============================================================ */
function StatusBadge({ status }: { status: AppData['status'] }) {
  const m: Record<string, { l: string; c: string; bg: string }> = {
    live: { l: 'Live', c: '#10b981', bg: 'rgba(16,185,129,0.12)' },
    beta: { l: 'Beta', c: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
    'coming-soon': { l: 'Próximamente', c: '#6b7280', bg: 'rgba(107,114,128,0.12)' },
  };
  const { l, c, bg } = m[status];
  return (
    <span
      style={{ background: bg, color: c, border: `1px solid ${c}30` }}
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider"
    >
      <span style={{ background: c }} className={`h-1.5 w-1.5 rounded-full ${status === 'live' ? 'animate-pulse' : ''}`} />
      {l}
    </span>
  );
}

/* ============================================================
   LOGIN PAGE
   ============================================================ */
function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [show, setShow] = useState(false);
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    
    console.log('Email ingresado:', email.toLowerCase().trim());
    console.log('Password ingresado:', pw);
    console.log('Credenciales válidas:', VALID_CREDS);
    
    const ok = VALID_CREDS.some(
      c => c.email.toLowerCase() === email.toLowerCase().trim() && c.password === pw
    );
    
    console.log('Login exitoso:', ok);
    
    setLoading(false);
    if (ok) {
      try { sessionStorage.setItem('ai_auth', 'true'); } catch {}
      onLogin();
    } else {
      setErr('Credenciales incorrectas');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4" style={{ background: 'radial-gradient(ellipse at center, #0a0a1a 0%, #000 70%)' }}>
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] overflow-hidden" style={{ backdropFilter: 'blur(40px)' }}>
          {/* Top line */}
          <div className="h-[2px] w-full" style={{ background: 'linear-gradient(90deg, transparent, #6366f1, transparent)' }} />

          <div className="p-8 sm:p-10">
            {/* Logo */}
            <div className="text-center mb-10">
              <div className="mx-auto mb-5 flex items-center justify-center">
                <img src="/logo_ai.png" alt="AIntelligence" className="h-20 object-contain" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-white mb-1">
                Showroom de Aplicaciones
              </h1>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-white/[0.06]" />
              <span className="text-[11px] text-gray-600 uppercase tracking-widest">Acceso Privado</span>
              <div className="flex-1 h-px bg-white/[0.06]" />
            </div>

            <form onSubmit={submit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Email</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"><Mail size={18} /></span>
                  <input
                    type="email"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setErr(''); }}
                    placeholder="tu@email.com"
                    required
                    className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.03] py-4 pl-12 pr-4 text-[15px] text-white placeholder-gray-600 outline-none transition-all focus:border-indigo-500/40 focus:bg-white/[0.05]"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Contraseña</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"><Lock size={18} /></span>
                  <input
                    type={show ? 'text' : 'password'}
                    value={pw}
                    onChange={e => { setPw(e.target.value); setErr(''); }}
                    placeholder="••••••••••"
                    required
                    className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.03] py-4 pl-12 pr-14 text-[15px] text-white placeholder-gray-600 outline-none transition-all focus:border-indigo-500/40 focus:bg-white/[0.05]"
                  />
                  <button type="button" onClick={() => setShow(!show)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 p-1">
                    {show ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {err && (
                <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-400 flex items-center gap-2">
                  <AlertTriangle size={16} /> {err}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || !email || !pw}
                className="w-full rounded-2xl py-4 text-[15px] font-semibold text-white transition-all hover:opacity-90 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 size={18} className="animate-spin" /> Verificando...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Ingresar al Showroom <ArrowRight size={16} />
                  </span>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-[12px] text-gray-600">
                Acceso exclusivo para equipo AIntelligence.
              </p>
              <p className="text-[12px] text-gray-700 mt-1">
                ¿Necesitas acceso?{' '}
                <a href="https://www.aintelligence.cl" target="_blank" rel="noopener noreferrer" className="text-indigo-400/70 hover:text-indigo-400">
                  Contáctanos
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   APP CARD
   ============================================================ */
function AppCard({ app }: { app: AppData }) {
  const navigate = useNavigate();
  const avail = app.status !== 'coming-soon';
  const [imgOk, setImgOk] = useState(true);

  const handleClick = () => {
    if (avail) {
      navigate(`/${app.id}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all duration-300 ${
        avail ? 'cursor-pointer hover:border-white/[0.12] hover:bg-white/[0.04]' : 'opacity-50'
      }`}
    >
      {/* Image */}
      <div className="relative h-[180px] w-full overflow-hidden bg-black/50 flex-shrink-0">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute top-3 right-3 z-20"><StatusBadge status={app.status} /></div>

        {imgOk && app.previewImage ? (
          <img
            src={app.previewImage}
            alt={app.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgOk(false)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-black/60 to-black/40">
            {getIcon(app.icon, 48, app.color)}
          </div>
        )}

        {/* Icon badge */}
        <div className="absolute bottom-3 left-3 z-20">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ background: `${app.color}25`, border: `1px solid ${app.color}30`, backdropFilter: 'blur(8px)' }}
          >
            {getIcon(app.icon, 20, app.color)}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[15px] font-semibold text-white mb-1.5 tracking-tight">{app.name}</h3>
        <p className="text-[13px] text-gray-500 leading-relaxed flex-1">{app.description}</p>
      </div>
    </div>
  );
}

/* ============================================================
   CREDENTIAL CARD
   ============================================================ */
function CredCard({ cred, color }: { cred: AppData['credentials'][0]; color: string }) {
  const [showPw, setShowPw] = useState(false);
  const [copied, setCopied] = useState('');

  const copy = useCallback(async (text: string, field: string) => {
    try { await navigator.clipboard.writeText(text); } catch {}
    setCopied(field);
    setTimeout(() => setCopied(''), 2000);
  }, []);

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 transition-all hover:border-white/[0.1]">
      {/* Role */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
          <Shield size={16} style={{ color }} />
        </div>
        <span className="text-sm font-semibold text-white">{cred.role}</span>
      </div>

      {/* Email */}
      <div className="mb-3">
        <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1.5 block">Email</label>
        <div className="flex items-center gap-2 rounded-xl bg-black/40 border border-white/[0.06] px-4 py-3">
          <span className="flex-1 text-sm text-gray-300 font-mono truncate">{cred.email}</span>
          <button onClick={() => copy(cred.email, `e-${cred.role}`)} className="shrink-0 flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 text-gray-500 hover:bg-white/10 hover:text-white transition-all">
            {copied === `e-${cred.role}` ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
          </button>
        </div>
      </div>

      {/* Password */}
      <div>
        <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1.5 block">Contraseña</label>
        <div className="flex items-center gap-2 rounded-xl bg-black/40 border border-white/[0.06] px-4 py-3">
          <span className="flex-1 text-sm text-gray-300 font-mono truncate">
            {showPw ? cred.password : '••••••••••'}
          </span>
          <button onClick={() => setShowPw(!showPw)} className="shrink-0 flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 text-gray-500 hover:bg-white/10 hover:text-white transition-all">
            {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
          <button onClick={() => copy(cred.password, `p-${cred.role}`)} className="shrink-0 flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 text-gray-500 hover:bg-white/10 hover:text-white transition-all">
            {copied === `p-${cred.role}` ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   APP DETAIL PAGE
   ============================================================ */
function DetailPage() {
  const { appId } = useParams();
  const navigate = useNavigate();
  const app = apps.find(a => a.id === appId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [appId]);

  if (!app) {
    navigate('/');
    return null;
  }

  const avail = app.status !== 'coming-soon';

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero bg */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full blur-[150px] opacity-10" style={{ backgroundColor: app.color }} />
          <div className="absolute bottom-0 left-0 right-0 h-60 bg-gradient-to-t from-black to-transparent" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 pt-8 pb-12">

          {/* App header */}
          <div className="flex flex-col sm:flex-row items-start gap-5 mb-8">
            <div
              className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl"
              style={{ background: `${app.color}20`, border: `1px solid ${app.color}30`, boxShadow: `0 20px 60px ${app.color}15` }}
            >
              {getIcon(app.icon, 40, app.color)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{app.name}</h1>
                <StatusBadge status={app.status} />
              </div>
              <p className="text-gray-400 text-lg mb-4">{app.description}</p>
              
              {/* Meta info */}
              <div className="flex flex-wrap gap-2">
                {[
                  { label: `v${app.version}`, icon: 'Settings' },
                  { label: app.lastUpdate, icon: 'Calendar' },
                  { label: app.category, icon: 'Tag' },
                ].map(m => (
                  <div key={m.label} className="flex items-center gap-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] px-3 py-1.5 text-xs text-gray-400">
                    {getIcon(m.icon, 12)} <span>{m.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          {avail && (
            <div className="flex flex-col sm:flex-row gap-3 mb-12">
              <a
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-2xl px-8 py-4 text-base font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98]"
                style={{ background: `linear-gradient(135deg, ${app.color}, ${app.color}cc)`, boxShadow: `0 10px 40px ${app.color}30` }}
              >
                <ExternalLink size={18} />
                Abrir {app.name}
              </a>
              
              <button 
                onClick={() => navigate('/')} 
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white/[0.05] border border-white/[0.1] text-base text-gray-300 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.15] transition-all group"
              >
                <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
                Volver al Showroom
              </button>
            </div>
          )}

          {/* Description - Special format for Viewly */}
          {app.id === 'viewly' ? (
            <div className="space-y-6 mb-8">
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <span className="text-3xl">🎯</span> ¿Qué es Viewly?
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Tu centro de comando para marketing digital. Viewly centraliza y analiza todas tus campañas de 
                  <span className="text-blue-400 font-semibold"> Facebook</span>, 
                  <span className="text-pink-400 font-semibold"> Instagram</span>, 
                  <span className="text-purple-400 font-semibold"> TikTok</span> y 
                  <span className="text-red-400 font-semibold"> YouTube</span> en una sola plataforma.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  Olvídate de abrir múltiples pestañas y perder tiempo copiando datos. Con Viewly, conectas tus cuentas una vez 
                  y obtienes métricas en tiempo real, reportes profesionales automáticos y análisis comparativos que impresionan a tus clientes.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 hover:border-white/[0.12] transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">📊</span>
                    <h4 className="font-bold text-white text-lg">Dashboard Unificado</h4>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Visualiza todas tus métricas en tiempo real: impresiones, alcance, engagement, conversiones y ROI. 
                    Todo en un solo panel interactivo con gráficos que se actualizan automáticamente.
                  </p>
                </div>

                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 hover:border-white/[0.12] transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">📄</span>
                    <h4 className="font-bold text-white text-lg">Reportes Profesionales</h4>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Genera reportes impactantes en PDF o Excel con un clic. Incluye gráficos, comparativas y análisis. 
                    Compártelos por email o envíalos directamente por WhatsApp a tus clientes.
                  </p>
                </div>

                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 hover:border-white/[0.12] transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">🔗</span>
                    <h4 className="font-bold text-white text-lg">Integraciones OAuth 2.0</h4>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Conecta directamente con Meta (Facebook & Instagram), YouTube y TikTok. 
                    Autenticación segura que importa tus métricas reales sin trabajo manual.
                  </p>
                </div>

                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 hover:border-white/[0.12] transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">💰</span>
                    <h4 className="font-bold text-white text-lg">ROI y Conversiones</h4>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Rastrea cada peso invertido. Calcula automáticamente el retorno de inversión, costo por clic, 
                    conversiones y métricas que realmente importan para tus clientes.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-8">
                <h4 className="font-bold text-white text-xl mb-4 flex items-center gap-3">
                  <span className="text-3xl">✨</span> Perfecto para:
                </h4>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-white font-semibold">
                      <span className="text-indigo-400 text-xl">•</span> Agencias de Marketing
                    </div>
                    <p className="text-sm text-gray-400 ml-6">Gestiona múltiples clientes con reportes automáticos</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-white font-semibold">
                      <span className="text-indigo-400 text-xl">•</span> Community Managers
                    </div>
                    <p className="text-sm text-gray-400 ml-6">Centraliza todas tus redes sociales en un solo lugar</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-white font-semibold">
                      <span className="text-indigo-400 text-xl">•</span> Equipos de Marketing
                    </div>
                    <p className="text-sm text-gray-400 ml-6">Toma decisiones basadas en datos reales y comparables</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-400 leading-relaxed mb-8 max-w-3xl">{app.longDescription}</p>
          )}
        </div>
      </div>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `${app.color}15`, border: `1px solid ${app.color}25` }}>
            <Sparkles size={20} style={{ color: app.color }} />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Características y Funciones</h2>
        </div>
        <p className="text-gray-500 text-sm mb-8 ml-[52px]">Todo lo que incluye {app.name}</p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {app.features.map((f, i) => (
            <div
              key={i}
              className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 hover:border-white/[0.1] hover:bg-white/[0.04]"
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${app.color}15`, border: `1px solid ${app.color}20` }}
              >
                {getIcon(f.icon, 24, app.color)}
              </div>
              <h3 className="text-[15px] font-semibold text-white mb-2 tracking-tight">{f.title}</h3>
              <p className="text-[13px] text-gray-500 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Credentials */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `${app.color}15`, border: `1px solid ${app.color}25` }}>
            <Shield size={16} style={{ color: app.color }} />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Credenciales de Acceso</h2>
        </div>
        <p className="text-gray-500 text-sm mb-8 ml-[52px]">Usa estas credenciales para ingresar a la aplicación</p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {app.credentials.map((c, i) => (
            <CredCard key={i} cred={c} color={app.color} />
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8">
          <h3 className="text-lg font-bold tracking-tight mb-6 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `${app.color}15`, border: `1px solid ${app.color}25` }}>
              <Settings size={20} style={{ color: app.color }} />
            </span>
            Stack Tecnológico
          </h3>
          <div className="flex flex-wrap gap-3">
            {app.techStack.map(t => (
              <span key={t} className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm text-gray-300 font-medium hover:bg-white/[0.06] transition-all">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack & Tags */}
      <section className="mx-auto max-w-6xl px-6 py-16" style={{ display: 'none' }}>
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Tech */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8">
            <h3 className="text-lg font-bold tracking-tight mb-6 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `${app.color}15`, border: `1px solid ${app.color}25` }}>
                <Settings size={20} style={{ color: app.color }} />
              </span>
              Stack Tecnológico
            </h3>
            <div className="flex flex-wrap gap-3">
              {app.techStack.map(t => (
                <span key={t} className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm text-gray-300 font-medium hover:bg-white/[0.06] transition-all">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8">
            <h3 className="text-lg font-bold tracking-tight mb-6 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `${app.color}15`, border: `1px solid ${app.color}25` }}>
                <Tag size={20} style={{ color: app.color }} />
              </span>
              Etiquetas
            </h3>
            <div className="flex flex-wrap gap-3">
              {app.tags.map(t => (
                <span key={t} className="rounded-xl px-4 py-2.5 text-sm font-medium" style={{ background: `${app.color}10`, color: app.color, border: `1px solid ${app.color}20` }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      {avail && (
        <section className="mx-auto max-w-6xl px-6 pb-20">
          <div
            className="relative overflow-hidden rounded-3xl border border-white/[0.06] p-10 sm:p-14 text-center"
            style={{ background: `linear-gradient(135deg, ${app.color}08, ${app.color}03)` }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[200px] w-[400px] rounded-full blur-[100px] opacity-20" style={{ backgroundColor: app.color }} />
            <div className="relative">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl" style={{ background: `${app.color}20`, border: `1px solid ${app.color}25` }}>
                {getIcon(app.icon, 32, app.color)}
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-3 tracking-tight">¿Listo para probar {app.name}?</h3>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">Usa las credenciales de arriba e ingresa directamente</p>
              <a
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-2xl px-10 py-4 text-base font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98]"
                style={{ background: `linear-gradient(135deg, ${app.color}, ${app.color}cc)`, boxShadow: `0 10px 40px ${app.color}30` }}
              >
                <ExternalLink size={16} />
                Ir a {app.name}
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-white/[0.04] py-10">
        <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/logo_ai.png" alt="AIntelligence" className="h-8 object-contain" />
          </div>
          <p className="text-xs text-gray-600">© {new Date().getFullYear()} AIntelligence. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

/* ============================================================
   SHOWROOM PAGE
   ============================================================ */
function ShowroomPage() {
  const [search, setSearch] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const handleLogout = () => {
    try { sessionStorage.removeItem('ai_auth'); } catch {}
    window.location.reload();
  };

  const filtered = useMemo(() => {
    if (!search) return apps;
    const q = search.toLowerCase();
    return apps.filter(a =>
      a.name.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q) ||
      a.tags.some(t => t.toLowerCase().includes(q))
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-black/80 border-b border-white/[0.05]' : 'bg-transparent'
        }`}
        style={{ backdropFilter: scrolled ? 'blur(20px)' : 'none' }}
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex h-20 items-center justify-between">
            <a href="/" className="flex items-center gap-3">
              <img src="/logo_ai.png" alt="AIntelligence" className="h-10 object-contain" />
            </a>
            <div className="flex items-center gap-3">
              <a
                href="https://www.aintelligence.cl"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}
              >
                Contactar
              </a>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-all border border-white/[0.1] hover:border-white/[0.2]"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden pt-20" style={{ background: 'radial-gradient(ellipse at center, #0a0a1a 0%, #000 70%)' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full bg-indigo-600/[0.06] blur-[120px]" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent" />

        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-8">
            <span className="text-white">Nuestras </span>
            <span style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>aplicaciones</span>
            <br />
            <span className="text-white">de inteligencia artificial</span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-gray-400 leading-relaxed mb-12">
            Explora nuestro ecosistema de soluciones potenciadas con IA.
            Selecciona una aplicación para acceder a su demo.
          </p>

          <div className="flex justify-center text-gray-600">
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs uppercase tracking-widest">Explorar</span>
              <ChevronDown size={16} />
            </div>
          </div>
        </div>
      </section>

      {/* Search */}
      <div className="mx-auto max-w-6xl px-6 mb-10">
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-lg">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"><Search size={16} /></span>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar aplicación..."
              className="w-full rounded-2xl border border-white/[0.06] bg-white/[0.03] py-3 pl-11 pr-4 text-sm text-white placeholder-gray-500 outline-none transition-all focus:border-indigo-500/30 focus:bg-white/[0.05]"
            />
          </div>
          <span className="text-sm text-gray-500">{filtered.length} apps</span>
        </div>
      </div>

      {/* Grid */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <span className="text-4xl mb-4">🔍</span>
            <h3 className="text-lg font-semibold text-white mb-2">No se encontraron aplicaciones</h3>
            <p className="text-sm text-gray-500">Intenta con otra búsqueda</p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" style={{ gridAutoRows: '1fr' }}>
            {filtered.map(app => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        )}
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: 'Apps Activas', value: apps.filter(a => a.status === 'live').length, color: '#10b981' },
            { label: 'En Beta', value: apps.filter(a => a.status === 'beta').length, color: '#f59e0b' },
            { label: 'Próximamente', value: apps.filter(a => a.status === 'coming-soon').length, color: '#6b7280' },
            { label: 'Total Apps', value: apps.length, color: '#6366f1' },
          ].map(s => (
            <div key={s.label} className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-6 text-center transition-all hover:border-white/[0.08] hover:bg-white/[0.03]">
              <div className="text-3xl font-bold mb-1" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.04] py-12">
        <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/logo_ai.png" alt="AIntelligence" className="h-8 object-contain" />
          </div>
          <p className="text-xs text-gray-600">© {new Date().getFullYear()} AIntelligence. Todos los derechos reservados.</p>
          <a href="https://www.aintelligence.cl" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-white transition-colors">
            www.aintelligence.cl
          </a>
        </div>
      </footer>
    </div>
  );
}

/* ============================================================
   MAIN APP - ALL HOOKS AT TOP LEVEL, NO CONDITIONAL RETURNS
   ============================================================ */
function AppContent() {
  const [authed, setAuthed] = useState(() => {
    try { return sessionStorage.getItem('ai_auth') === 'true'; } catch { return false; }
  });

  const handleLogin = useCallback(() => {
    setAuthed(true);
  }, []);

  if (!authed) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <Routes>
      <Route path="/" element={<ShowroomPage />} />
      <Route path="/:appId" element={<DetailPage />} />
    </Routes>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
