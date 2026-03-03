import { useState, useEffect, useRef, useCallback } from "react";

const STATUSES = ["Backlog", "Playing", "Completed", "Dropped"];
const PLATFORMS = ["PC", "PlayStation", "Xbox", "Nintendo", "Mobile", "Other"];
const GENRES = ["Action", "RPG", "Strategy", "Puzzle", "Adventure", "Shooter", "Platformer", "Horror", "Simulation", "Sports", "Indie", "Other"];

const STATUS_CONFIG = {
  Backlog: { icon: "📜", color: "#c8a24e", bg: "rgba(200,162,78,0.1)", label: "Awaiting" },
  Playing: { icon: "⚔️", color: "#4ea8c8", bg: "rgba(78,168,200,0.1)", label: "In Progress" },
  Completed: { icon: "🏆", color: "#5cc84e", bg: "rgba(92,200,78,0.1)", label: "Conquered" },
  Dropped: { icon: "💀", color: "#c84e4e", bg: "rgba(200,78,78,0.1)", label: "Abandoned" },
};

const GAME_DATABASE = [
  { title: "Elden Ring", platform: "PC", genre: "RPG" },
  { title: "Elden Ring: Shadow of the Erdtree", platform: "PC", genre: "RPG" },
  { title: "Baldur's Gate 3", platform: "PC", genre: "RPG" },
  { title: "The Legend of Zelda: Tears of the Kingdom", platform: "Nintendo", genre: "Adventure" },
  { title: "The Legend of Zelda: Breath of the Wild", platform: "Nintendo", genre: "Adventure" },
  { title: "God of War Ragnarök", platform: "PlayStation", genre: "Action" },
  { title: "God of War (2018)", platform: "PlayStation", genre: "Action" },
  { title: "Red Dead Redemption 2", platform: "PC", genre: "Action" },
  { title: "The Witcher 3: Wild Hunt", platform: "PC", genre: "RPG" },
  { title: "Cyberpunk 2077", platform: "PC", genre: "RPG" },
  { title: "Hollow Knight", platform: "PC", genre: "Platformer" },
  { title: "Celeste", platform: "PC", genre: "Platformer" },
  { title: "Hades", platform: "PC", genre: "Action" },
  { title: "Hades II", platform: "PC", genre: "Action" },
  { title: "Dark Souls III", platform: "PC", genre: "RPG" },
  { title: "Dark Souls Remastered", platform: "PC", genre: "RPG" },
  { title: "Sekiro: Shadows Die Twice", platform: "PC", genre: "Action" },
  { title: "Bloodborne", platform: "PlayStation", genre: "Action" },
  { title: "Final Fantasy XVI", platform: "PlayStation", genre: "RPG" },
  { title: "Final Fantasy VII Rebirth", platform: "PlayStation", genre: "RPG" },
  { title: "Persona 5 Royal", platform: "PlayStation", genre: "RPG" },
  { title: "Dragon Quest XI", platform: "PC", genre: "RPG" },
  { title: "Monster Hunter: World", platform: "PC", genre: "Action" },
  { title: "Monster Hunter Wilds", platform: "PC", genre: "Action" },
  { title: "Stardew Valley", platform: "PC", genre: "Simulation" },
  { title: "Animal Crossing: New Horizons", platform: "Nintendo", genre: "Simulation" },
  { title: "Minecraft", platform: "PC", genre: "Adventure" },
  { title: "Terraria", platform: "PC", genre: "Adventure" },
  { title: "Valheim", platform: "PC", genre: "Adventure" },
  { title: "Palworld", platform: "PC", genre: "Adventure" },
  { title: "Subnautica", platform: "PC", genre: "Adventure" },
  { title: "No Man's Sky", platform: "PC", genre: "Adventure" },
  { title: "Starfield", platform: "PC", genre: "RPG" },
  { title: "The Elder Scrolls V: Skyrim", platform: "PC", genre: "RPG" },
  { title: "Fallout 4", platform: "PC", genre: "RPG" },
  { title: "Fallout: New Vegas", platform: "PC", genre: "RPG" },
  { title: "Disco Elysium", platform: "PC", genre: "RPG" },
  { title: "Divinity: Original Sin 2", platform: "PC", genre: "RPG" },
  { title: "Mass Effect Legendary Edition", platform: "PC", genre: "RPG" },
  { title: "Star Wars Jedi: Survivor", platform: "PC", genre: "Action" },
  { title: "Hogwarts Legacy", platform: "PC", genre: "RPG" },
  { title: "Spider-Man 2", platform: "PlayStation", genre: "Action" },
  { title: "Horizon Forbidden West", platform: "PlayStation", genre: "Action" },
  { title: "Ghost of Tsushima", platform: "PlayStation", genre: "Action" },
  { title: "The Last of Us Part I", platform: "PlayStation", genre: "Action" },
  { title: "Resident Evil 4 Remake", platform: "PC", genre: "Horror" },
  { title: "Resident Evil Village", platform: "PC", genre: "Horror" },
  { title: "Silent Hill 2 Remake", platform: "PC", genre: "Horror" },
  { title: "Alan Wake 2", platform: "PC", genre: "Horror" },
  { title: "Dead Space Remake", platform: "PC", genre: "Horror" },
  { title: "Phasmophobia", platform: "PC", genre: "Horror" },
  { title: "Lethal Company", platform: "PC", genre: "Horror" },
  { title: "Portal 2", platform: "PC", genre: "Puzzle" },
  { title: "Baba Is You", platform: "PC", genre: "Puzzle" },
  { title: "Return of the Obra Dinn", platform: "PC", genre: "Puzzle" },
  { title: "Outer Wilds", platform: "PC", genre: "Adventure" },
  { title: "Ori and the Will of the Wisps", platform: "PC", genre: "Platformer" },
  { title: "Cuphead", platform: "PC", genre: "Platformer" },
  { title: "Dead Cells", platform: "PC", genre: "Action" },
  { title: "Slay the Spire", platform: "PC", genre: "Strategy" },
  { title: "Balatro", platform: "PC", genre: "Strategy" },
  { title: "Civilization VI", platform: "PC", genre: "Strategy" },
  { title: "Factorio", platform: "PC", genre: "Strategy" },
  { title: "RimWorld", platform: "PC", genre: "Simulation" },
  { title: "Counter-Strike 2", platform: "PC", genre: "Shooter" },
  { title: "Valorant", platform: "PC", genre: "Shooter" },
  { title: "Apex Legends", platform: "PC", genre: "Shooter" },
  { title: "Fortnite", platform: "PC", genre: "Shooter" },
  { title: "Doom Eternal", platform: "PC", genre: "Shooter" },
  { title: "Helldivers 2", platform: "PC", genre: "Shooter" },
  { title: "Deep Rock Galactic", platform: "PC", genre: "Shooter" },
  { title: "Rocket League", platform: "PC", genre: "Sports" },
  { title: "Forza Horizon 5", platform: "Xbox", genre: "Sports" },
  { title: "Mario Kart 8 Deluxe", platform: "Nintendo", genre: "Sports" },
  { title: "Super Smash Bros. Ultimate", platform: "Nintendo", genre: "Action" },
  { title: "Super Mario Odyssey", platform: "Nintendo", genre: "Platformer" },
  { title: "Metroid Dread", platform: "Nintendo", genre: "Action" },
  { title: "Fire Emblem: Three Houses", platform: "Nintendo", genre: "Strategy" },
  { title: "Xenoblade Chronicles 3", platform: "Nintendo", genre: "RPG" },
  { title: "Pokémon Scarlet/Violet", platform: "Nintendo", genre: "RPG" },
  { title: "Astro Bot", platform: "PlayStation", genre: "Platformer" },
  { title: "Returnal", platform: "PlayStation", genre: "Action" },
  { title: "Diablo IV", platform: "PC", genre: "RPG" },
  { title: "Path of Exile 2", platform: "PC", genre: "RPG" },
  { title: "Genshin Impact", platform: "PC", genre: "RPG" },
  { title: "Black Myth: Wukong", platform: "PC", genre: "Action" },
  { title: "Inscryption", platform: "PC", genre: "Strategy" },
  { title: "Vampire Survivors", platform: "PC", genre: "Action" },
  { title: "Cult of the Lamb", platform: "PC", genre: "Action" },
  { title: "Dave the Diver", platform: "PC", genre: "Adventure" },
  { title: "Undertale", platform: "PC", genre: "RPG" },
  { title: "Katana ZERO", platform: "PC", genre: "Action" },
  { title: "Risk of Rain 2", platform: "PC", genre: "Action" },
  { title: "Enter the Gungeon", platform: "PC", genre: "Action" },
  { title: "The Binding of Isaac: Repentance", platform: "PC", genre: "Action" },
  { title: "Among Us", platform: "PC", genre: "Puzzle" },
  { title: "League of Legends", platform: "PC", genre: "Strategy" },
  { title: "World of Warcraft", platform: "PC", genre: "RPG" },
  { title: "GTA V / GTA Online", platform: "PC", genre: "Action" },
  { title: "NieR: Automata", platform: "PC", genre: "RPG" },
  { title: "Hi-Fi Rush", platform: "PC", genre: "Action" },
  { title: "Sifu", platform: "PC", genre: "Action" },
  { title: "Firewatch", platform: "PC", genre: "Adventure" },
  { title: "NBA 2K25", platform: "PC", genre: "Sports" },
  { title: "FIFA / EA FC 25", platform: "PC", genre: "Sports" },
];

// ============================================================
// AD CONFIG — Replace these with your real IDs from AdSense
// ============================================================
const AD_CONFIG = {
  publisherId: "ca-pub-XXXXXXXXXXXXXXXX",  // Your AdSense publisher ID
  bannerSlotId: "1234567890",               // Banner ad slot
  inFeedSlotId: "0987654321",               // In-feed ad slot
  interstitialFrequency: 3,                 // Show interstitial every N actions
};

let actionCount = 0;

// ============================================================
// AD COMPONENTS
// ============================================================

function BannerAd() {
  const adRef = useRef(null);
  const isPlaceholder = AD_CONFIG.publisherId === "ca-pub-XXXXXXXXXXXXXXXX";

  useEffect(() => {
    if (isPlaceholder) return;
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
  }, []);

  if (isPlaceholder) {
    return (
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, height: 56,
        background: "linear-gradient(135deg, #1e1b16 0%, #252118 100%)",
        borderTop: "1px solid #3a3530", display: "flex", alignItems: "center",
        justifyContent: "center", zIndex: 900,
      }}>
        <span style={{ fontSize: 12, color: "#4a4540" }}>📢 Banner ad — swap in your AdSense ID to go live</span>
      </div>
    );
  }

  return (
    <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, minHeight: 50, background: "#131110", borderTop: "1px solid #3a3530", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 900 }}>
      <ins className="adsbygoogle" ref={adRef} style={{ display: "inline-block", width: 320, height: 50 }} data-ad-client={AD_CONFIG.publisherId} data-ad-slot={AD_CONFIG.bannerSlotId} />
    </div>
  );
}

function InFeedAd() {
  const isPlaceholder = AD_CONFIG.publisherId === "ca-pub-XXXXXXXXXXXXXXXX";
  const adRef = useRef(null);
  useEffect(() => { if (isPlaceholder) return; try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {} }, []);

  if (isPlaceholder) {
    return (<div style={{ background: "linear-gradient(135deg, #1a1815 0%, #201d18 100%)", border: "1px dashed #3a3530", borderRadius: 12, padding: "14px", textAlign: "center" }}><span style={{ fontSize: 12, color: "#4a4540" }}>📢 In-feed ad</span></div>);
  }

  return (<div style={{ background: "#1a1712", borderRadius: 12, overflow: "hidden", border: "1px solid #2a2520", minHeight: 100 }}><ins className="adsbygoogle" ref={adRef} style={{ display: "block" }} data-ad-format="fluid" data-ad-layout-key="-6t+ed+2i-1n-4w" data-ad-client={AD_CONFIG.publisherId} data-ad-slot={AD_CONFIG.inFeedSlotId} /></div>);
}

function InterstitialAd({ show, onClose }) {
  const [countdown, setCountdown] = useState(5);
  const isPlaceholder = AD_CONFIG.publisherId === "ca-pub-XXXXXXXXXXXXXXXX";

  useEffect(() => {
    if (!show) { setCountdown(5); return; }
    const t = setInterval(() => setCountdown((c) => { if (c <= 1) { clearInterval(t); return 0; } return c - 1; }), 1000);
    return () => clearInterval(t);
  }, [show]);

  if (!show) return null;

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.92)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 2000, animation: "fadeIn 0.3s ease" }}>
      <div style={{ position: "absolute", top: 20, right: 20 }}>
        {countdown > 0 ? (
          <span style={{ color: "#8a7a60", fontSize: 14, background: "#1e1b16", borderRadius: 20, padding: "6px 14px", border: "1px solid #3a3530" }}>Skip in {countdown}s</span>
        ) : (
          <button onClick={onClose} style={{ background: "linear-gradient(135deg, #c8a24e 0%, #a07830 100%)", color: "#131110", border: "none", borderRadius: 20, padding: "8px 20px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "'Cinzel', serif" }}>✕ Close</button>
        )}
      </div>
      <div style={{ width: "90%", maxWidth: 400, minHeight: 300, background: "#1e1b16", borderRadius: 16, border: "1px solid #3a3530", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}>
        {isPlaceholder ? (<><span style={{ fontSize: 48 }}>📢</span><span style={{ color: "#6a6050", fontSize: 14, textAlign: "center", padding: "0 20px" }}>Interstitial ad<br/><span style={{ fontSize: 12, opacity: 0.7 }}>Shows every {AD_CONFIG.interstitialFrequency} actions</span></span></>) : (
          <ins className="adsbygoogle" style={{ display: "block", width: "100%", height: 300 }} data-ad-client={AD_CONFIG.publisherId} data-ad-slot={AD_CONFIG.bannerSlotId} data-ad-format="auto" />
        )}
      </div>
    </div>
  );
}

// ============================================================
// CORE COMPONENTS
// ============================================================

const storage = {
  get(key) { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : null; } catch { return null; } },
  set(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} }
};

const StarRating = ({ rating, onRate, size = 20, interactive = true }) => {
  const [hover, setHover] = useState(0);
  return (<div style={{ display: "flex", gap: 2 }}>{[1,2,3,4,5].map((star) => (<span key={star} onClick={() => interactive && onRate(star)} onMouseEnter={() => interactive && setHover(star)} onMouseLeave={() => interactive && setHover(0)} style={{ cursor: interactive ? "pointer" : "default", fontSize: size, color: star <= (hover || rating) ? "#c8a24e" : "#3a3530", transition: "color 0.15s, transform 0.15s", transform: star <= hover ? "scale(1.2)" : "scale(1)", display: "inline-block", WebkitTapHighlightColor: "transparent" }}>★</span>))}</div>);
};

const StatCard = ({ label, value, icon }) => (<div style={{ background: "linear-gradient(135deg, #1e1b16 0%, #2a2520 100%)", border: "1px solid #3a3530", borderRadius: 12, padding: "14px 16px", flex: "1 1 calc(50% - 6px)", minWidth: 0 }}><div style={{ fontSize: 20, marginBottom: 2 }}>{icon}</div><div style={{ fontSize: 24, fontWeight: 700, color: "#e8dcc8", fontFamily: "'Cinzel', serif" }}>{value}</div><div style={{ fontSize: 11, color: "#8a8070", textTransform: "uppercase", letterSpacing: 1.2, marginTop: 2 }}>{label}</div></div>);

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (<div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 1000, backdropFilter: "blur(4px)", animation: "fadeIn 0.2s ease" }}><div onClick={(e) => e.stopPropagation()} style={{ background: "linear-gradient(180deg, #252118 0%, #1a1712 100%)", border: "1px solid #3a3530", borderRadius: "16px 16px 0 0", padding: "8px 24px 32px", width: "100%", maxWidth: 520, maxHeight: "90vh", overflowY: "auto", animation: "slideUp 0.25s ease" }}><div style={{ width: 40, height: 4, background: "#3a3530", borderRadius: 2, margin: "8px auto 20px" }} />{children}</div></div>);
};

function GamePicker({ onSelect, onCustom }) {
  const [search, setSearch] = useState("");
  const [showDD, setShowDD] = useState(false);
  const [hl, setHl] = useState(-1);
  const filtered = search.length >= 1 ? GAME_DATABASE.filter((g) => g.title.toLowerCase().includes(search.toLowerCase())).slice(0, 12) : [];
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setHl((h) => Math.min(h + 1, filtered.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setHl((h) => Math.max(h - 1, 0)); }
    else if (e.key === "Enter") { e.preventDefault(); if (hl >= 0 && filtered[hl]) onSelect(filtered[hl]); else if (search.trim()) onCustom(search.trim()); }
    else if (e.key === "Escape") setShowDD(false);
  };
  return (<div style={{ position: "relative" }}><label style={{ fontSize: 12, color: "#8a7a60", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 6, display: "block" }}>Search Games</label><input type="text" value={search} onChange={(e) => { setSearch(e.target.value); setShowDD(true); setHl(-1); }} onFocus={() => setShowDD(true)} onKeyDown={handleKeyDown} placeholder="Search 100+ popular games..." autoFocus />{showDD && search.length >= 1 && (<div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "#1e1b16", border: "1px solid #3a3530", borderTop: "none", borderRadius: "0 0 8px 8px", maxHeight: 240, overflowY: "auto", zIndex: 10 }}>{filtered.map((game, i) => (<div key={game.title + game.platform} onClick={() => { onSelect(game); setShowDD(false); }} style={{ padding: "12px 14px", cursor: "pointer", background: i === hl ? "rgba(200,162,78,0.15)" : "transparent", borderBottom: "1px solid #2a2520" }}><div style={{ color: "#e8dcc8", fontSize: 15 }}>{game.title}</div><div style={{ color: "#6a6050", fontSize: 12, marginTop: 2 }}>{game.platform} · {game.genre}</div></div>))}{filtered.length === 0 && (<div onClick={() => { onCustom(search.trim()); setShowDD(false); }} style={{ padding: 14, cursor: "pointer", textAlign: "center", color: "#c8a24e", fontSize: 14 }}>➕ Add "{search.trim()}" as custom</div>)}{filtered.length > 0 && (<div onClick={() => { onCustom(search.trim()); setShowDD(false); }} style={{ padding: "10px 14px", cursor: "pointer", textAlign: "center", color: "#8a7a60", fontSize: 13, borderTop: "1px solid #2a2520" }}>Not listed? Add custom</div>)}</div>)}</div>);
}

function GameForm({ title: formTitle, initialData, onSubmit, onCancel }) {
  const [mode, setMode] = useState(initialData ? "details" : "search");
  const [form, setForm] = useState({ title: initialData?.title || "", platform: initialData?.platform || "PC", genre: initialData?.genre || "RPG", status: initialData?.status || "Backlog", rating: initialData?.rating || 0, hoursPlayed: initialData?.hoursPlayed || 0, notes: initialData?.notes || "" });
  const update = (key, value) => setForm((p) => ({ ...p, [key]: value }));
  const handleSubmit = () => { if (!form.title.trim()) return; onSubmit(initialData ? { ...initialData, ...form } : form); };
  const labelStyle = { fontSize: 12, color: "#8a7a60", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 6, display: "block" };

  return (<div><h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 20, color: "#c8a24e", marginBottom: 20, textAlign: "center" }}>{formTitle}</h2>
    {mode === "search" && (<div><GamePicker onSelect={(g) => { setForm(f => ({...f, title: g.title, platform: g.platform, genre: g.genre})); setMode("details"); }} onCustom={(t) => { setForm(f => ({...f, title: t})); setMode("details"); }} /><div style={{ textAlign: "center", marginTop: 20 }}><button onClick={onCancel} style={{ background: "transparent", border: "1px solid #3a3530", color: "#8a7a60", borderRadius: 8, padding: "10px 24px", cursor: "pointer", fontFamily: "'Cinzel', serif", fontSize: 14 }}>Cancel</button></div></div>)}
    {mode === "details" && (<div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ background: "rgba(200,162,78,0.08)", border: "1px solid #c8a24e33", borderRadius: 10, padding: "12px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}><div><div style={{ fontFamily: "'Cinzel', serif", fontSize: 16, fontWeight: 600, color: "#e8dcc8" }}>{form.title}</div><div style={{ fontSize: 13, color: "#8a7a60", marginTop: 2 }}>{form.platform} · {form.genre}</div></div>{!initialData && <button onClick={() => setMode("search")} style={{ background: "transparent", border: "1px solid #3a3530", color: "#8a7a60", borderRadius: 6, padding: "6px 12px", cursor: "pointer", fontSize: 12 }}>Change</button>}</div>
      <div style={{ display: "flex", gap: 10 }}><div style={{ flex: 1 }}><label style={labelStyle}>Platform</label><select value={form.platform} onChange={(e) => update("platform", e.target.value)}>{PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}</select></div><div style={{ flex: 1 }}><label style={labelStyle}>Genre</label><select value={form.genre} onChange={(e) => update("genre", e.target.value)}>{GENRES.map(g => <option key={g} value={g}>{g}</option>)}</select></div></div>
      <div style={{ display: "flex", gap: 10 }}><div style={{ flex: 1 }}><label style={labelStyle}>Status</label><select value={form.status} onChange={(e) => update("status", e.target.value)}>{STATUSES.map(s => <option key={s} value={s}>{STATUS_CONFIG[s].icon} {s}</option>)}</select></div><div style={{ flex: 1 }}><label style={labelStyle}>Hours</label><input type="number" min="0" value={form.hoursPlayed} onChange={(e) => update("hoursPlayed", parseInt(e.target.value) || 0)} /></div></div>
      <div><label style={labelStyle}>Rating</label><StarRating rating={form.rating} onRate={(r) => update("rating", r)} size={32} /></div>
      <div><label style={labelStyle}>Notes</label><textarea value={form.notes} onChange={(e) => update("notes", e.target.value)} placeholder="Your thoughts..." rows={3} style={{ resize: "vertical" }} /></div>
      <div style={{ display: "flex", gap: 10, marginTop: 4 }}><button onClick={onCancel} style={{ flex: 1, background: "transparent", border: "1px solid #3a3530", color: "#8a7a60", borderRadius: 10, padding: "12px", cursor: "pointer", fontFamily: "'Cinzel', serif", fontSize: 15 }}>Cancel</button><button onClick={handleSubmit} style={{ flex: 1, background: "linear-gradient(135deg, #c8a24e 0%, #a07830 100%)", color: "#131110", border: "none", borderRadius: 10, padding: "12px", cursor: "pointer", fontFamily: "'Cinzel', serif", fontWeight: 700, fontSize: 15, opacity: form.title.trim() ? 1 : 0.5 }}>{initialData ? "Update" : "Add Quest"}</button></div>
    </div>)}
  </div>);
}

// ============================================================
// MAIN APP
// ============================================================

export default function QuestLog() {
  const [games, setGames] = useState(() => storage.get("questlog-data") || []);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingGame, setEditingGame] = useState(null);
  const [expandedGame, setExpandedGame] = useState(null);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [showInterstitial, setShowInterstitial] = useState(false);

  useEffect(() => { storage.set("questlog-data", games); }, [games]);

  useEffect(() => {
    const handler = (e) => { e.preventDefault(); setInstallPrompt(e); if (!window.matchMedia('(display-mode: standalone)').matches) setShowInstallBanner(true); };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => { if (!installPrompt) return; installPrompt.prompt(); const r = await installPrompt.userChoice; if (r.outcome === 'accepted') setShowInstallBanner(false); setInstallPrompt(null); };

  const triggerAction = useCallback(() => { actionCount++; if (actionCount % AD_CONFIG.interstitialFrequency === 0) setShowInterstitial(true); }, []);

  const addGame = (game) => { setGames((prev) => [{ ...game, id: `game_${Date.now()}`, addedAt: Date.now() }, ...prev]); setShowAddModal(false); triggerAction(); };
  const updateGame = (updated) => { setGames((prev) => prev.map((g) => (g.id === updated.id ? updated : g))); setEditingGame(null); triggerAction(); };
  const deleteGame = (id) => { setGames((prev) => prev.filter((g) => g.id !== id)); setExpandedGame(null); triggerAction(); };

  const filteredGames = games.filter((g) => filter === "All" || g.status === filter).filter((g) => g.title.toLowerCase().includes(searchTerm.toLowerCase())).sort((a, b) => {
    if (sortBy === "recent") return b.addedAt - a.addedAt; if (sortBy === "title") return a.title.localeCompare(b.title);
    if (sortBy === "rating") return b.rating - a.rating; if (sortBy === "hours") return b.hoursPlayed - a.hoursPlayed; return 0;
  });

  const stats = { total: games.length, completed: games.filter(g => g.status === "Completed").length, playing: games.filter(g => g.status === "Playing").length, totalHours: games.reduce((s, g) => s + (g.hoursPlayed || 0), 0), avgRating: games.filter(g => g.rating > 0).length > 0 ? (games.filter(g => g.rating > 0).reduce((s, g) => s + g.rating, 0) / games.filter(g => g.rating > 0).length).toFixed(1) : "—" };

  return (
    <div style={{ minHeight: "100dvh", background: "#131110", color: "#e8dcc8", fontFamily: "'Crimson Text', Georgia, serif", paddingBottom: 70 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400&display=swap');
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(100px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-20px) } to { opacity: 1; transform: translateY(0) } }
        * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
        body { background: #131110; overscroll-behavior: none; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #3a3530; border-radius: 2px; }
        input, select, textarea { background: #1a1712 !important; border: 1px solid #3a3530 !important; color: #e8dcc8 !important; padding: 12px 14px !important; border-radius: 10px !important; font-family: 'Crimson Text', Georgia, serif !important; font-size: 16px !important; outline: none !important; width: 100% !important; -webkit-appearance: none !important; }
        input:focus, select:focus, textarea:focus { border-color: #c8a24e !important; }
        select option { background: #1a1712; color: #e8dcc8; }
      `}</style>

      <InterstitialAd show={showInterstitial} onClose={() => setShowInterstitial(false)} />

      {showInstallBanner && (<div style={{ background: "linear-gradient(135deg, #c8a24e 0%, #a07830 100%)", padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, animation: "slideDown 0.3s ease" }}><div style={{ color: "#131110", fontSize: 14, fontWeight: 600 }}>📱 Install QuestLog!</div><div style={{ display: "flex", gap: 8 }}><button onClick={handleInstall} style={{ background: "#131110", color: "#c8a24e", border: "none", borderRadius: 6, padding: "6px 14px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Install</button><button onClick={() => setShowInstallBanner(false)} style={{ background: "transparent", color: "#131110", border: "1px solid #13111044", borderRadius: 6, padding: "6px 10px", fontSize: 13, cursor: "pointer" }}>✕</button></div></div>)}

      <div style={{ background: "linear-gradient(180deg, #1e1b16 0%, #131110 100%)", borderBottom: "1px solid #2a2520", padding: "max(env(safe-area-inset-top, 16px), 16px) 20px 20px", textAlign: "center" }}>
        <div style={{ fontSize: 12, letterSpacing: 4, color: "#8a7a60", textTransform: "uppercase", marginBottom: 6 }}>◆ Quest Log ◆</div>
        <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: 28, fontWeight: 700, background: "linear-gradient(180deg, #e8dcc8 0%, #c8a24e 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: 1 }}>Game Backlog Tracker</h1>
        <p style={{ color: "#6a6050", marginTop: 6, fontSize: 14, fontStyle: "italic" }}>Track your adventures. Conquer your backlog.</p>
      </div>

      <div style={{ maxWidth: 600, margin: "0 auto", padding: "16px 12px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
          <StatCard label="Total" value={stats.total} icon="📚" />
          <StatCard label="Conquered" value={stats.completed} icon="🏆" />
          <StatCard label="Active" value={stats.playing} icon="⚔️" />
          <StatCard label="Hours" value={stats.totalHours} icon="⏱️" />
        </div>

        <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
          <div style={{ flex: 1 }}><input type="text" placeholder="Search quests..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
          <button onClick={() => setShowAddModal(true)} style={{ background: "linear-gradient(135deg, #c8a24e 0%, #a07830 100%)", color: "#131110", border: "none", borderRadius: 10, padding: "12px 16px", fontFamily: "'Cinzel', serif", fontWeight: 700, fontSize: 18, cursor: "pointer", minWidth: 48 }}>+</button>
        </div>

        <div style={{ marginBottom: 14 }}><select value={sortBy} onChange={(e) => setSortBy(e.target.value)}><option value="recent">Sort: Recent First</option><option value="title">Sort: By Title</option><option value="rating">Sort: By Rating</option><option value="hours">Sort: By Hours</option></select></div>

        <div style={{ display: "flex", gap: 6, marginBottom: 20, overflowX: "auto", paddingBottom: 4 }}>
          {["All", ...STATUSES].map((s) => { const active = filter === s; const config = STATUS_CONFIG[s]; return (<button key={s} onClick={() => setFilter(s)} style={{ background: active ? (config ? config.bg : "rgba(232,220,200,0.1)") : "transparent", border: `1px solid ${active ? (config ? config.color : "#e8dcc8") : "#2a2520"}`, color: active ? (config ? config.color : "#e8dcc8") : "#6a6050", borderRadius: 20, padding: "7px 14px", fontSize: 13, cursor: "pointer", fontFamily: "'Crimson Text', serif", whiteSpace: "nowrap", flexShrink: 0 }}>{config ? `${config.icon} ` : ""}{s === "All" ? `All (${games.length})` : `${config.label} (${games.filter(g => g.status === s).length})`}</button>); })}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {filteredGames.length === 0 && (<div style={{ textAlign: "center", padding: "48px 20px", color: "#6a6050" }}><div style={{ fontSize: 48, marginBottom: 12 }}>📜</div><div style={{ fontStyle: "italic", fontSize: 16, marginBottom: 16 }}>{games.length === 0 ? "Your quest log is empty." : "No matches found."}</div>{games.length === 0 && (<button onClick={() => setShowAddModal(true)} style={{ background: "linear-gradient(135deg, #c8a24e 0%, #a07830 100%)", color: "#131110", border: "none", borderRadius: 10, padding: "12px 24px", fontFamily: "'Cinzel', serif", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>Add Your First Game</button>)}</div>)}
          {filteredGames.map((game, index) => {
            const config = STATUS_CONFIG[game.status];
            const isExpanded = expandedGame === game.id;
            return (<div key={game.id}>
              {index > 0 && index % 5 === 0 && <InFeedAd />}
              <div onClick={() => setExpandedGame(isExpanded ? null : game.id)} style={{ background: "linear-gradient(135deg, #1e1b16 0%, #222018 100%)", border: `1px solid ${isExpanded ? config.color + "44" : "#2a2520"}`, borderRadius: 12, padding: "14px 16px", cursor: "pointer", transition: "all 0.2s" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 22 }}>{config.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: "'Cinzel', serif", fontSize: 15, fontWeight: 600, color: "#e8dcc8", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{game.title}</div><div style={{ fontSize: 12, color: "#8a7a60", marginTop: 2 }}>{game.platform} · {game.genre} {game.hoursPlayed > 0 && `· ${game.hoursPlayed}h`}</div></div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}><span style={{ background: config.bg, color: config.color, padding: "3px 10px", borderRadius: 10, fontSize: 11, fontWeight: 600, whiteSpace: "nowrap" }}>{config.label}</span>{game.rating > 0 && <StarRating rating={game.rating} onRate={() => {}} size={12} interactive={false} />}</div>
                </div>
                {isExpanded && (<div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid #2a2520", animation: "fadeIn 0.2s ease" }} onClick={(e) => e.stopPropagation()}>
                  {game.notes && <p style={{ color: "#a09080", fontStyle: "italic", marginBottom: 12, fontSize: 14 }}>"{game.notes}"</p>}
                  <div style={{ display: "flex", gap: 8 }}>
                    <select value={game.status} onChange={(e) => updateGame({ ...game, status: e.target.value })} style={{ flex: 1, fontSize: "14px !important", padding: "8px 10px !important" }}>{STATUSES.map(s => <option key={s} value={s}>{STATUS_CONFIG[s].icon} {s}</option>)}</select>
                    <button onClick={() => setEditingGame(game)} style={{ background: "rgba(200,162,78,0.15)", color: "#c8a24e", border: "1px solid #c8a24e33", borderRadius: 8, padding: "8px 14px", cursor: "pointer", fontSize: 14 }}>✏️</button>
                    <button onClick={() => { if (confirm("Remove this quest?")) deleteGame(game.id); }} style={{ background: "rgba(200,78,78,0.1)", color: "#c84e4e", border: "1px solid #c84e4e33", borderRadius: 8, padding: "8px 14px", cursor: "pointer", fontSize: 14 }}>🗑️</button>
                  </div>
                </div>)}
              </div>
            </div>);
          })}
        </div>
        <div style={{ textAlign: "center", padding: "32px 0 20px", color: "#3a3530", fontSize: 12 }}>◆ QuestLog ◆</div>
      </div>

      <BannerAd />

      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)}><GameForm title="Add New Quest" onSubmit={addGame} onCancel={() => setShowAddModal(false)} /></Modal>
      <Modal isOpen={!!editingGame} onClose={() => setEditingGame(null)}>{editingGame && <GameForm title="Edit Quest" initialData={editingGame} onSubmit={updateGame} onCancel={() => setEditingGame(null)} />}</Modal>
    </div>
  );
}
