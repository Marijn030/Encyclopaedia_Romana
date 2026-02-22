// generate_province_pages.js
const fs = require("fs");
const path = require("path");

const PROVINCES = [
  ["britannia", "Britannia", "A heavily militarized frontier province beyond the Channel, guarded by legions and famous for Hadrian’s Wall and the northern border with Caledonia.", "britannia.html"],
  ["germania_inferior", "Germania Inferior", "Lower Rhine frontier province with major legionary bases and river trade, crucial for defending the empire against raids and incursions from Germania.", "germania-inferior.html"],
  ["belgica", "Belgica", "A northern Gallic province of forests, farms, and towns, linking the Channel coast to the Rhine and serving as a strategic corridor for armies and commerce.", "belgica.html"],
  ["lugdunensis", "Gallia Lugdunensis", "Central Gaul, organized around Lugdunum (Lyon), a key administrative and economic hub connecting Atlantic, Mediterranean, and Rhine networks.", "lugdunensis.html"],
  ["aquitania", "Aquitania", "Southwestern Gaul between the Garonne and the Pyrenees, known for fertile land, Atlantic routes, and a mix of Roman and local cultural traditions.", "aquitania.html"],
  ["narbonensis", "Gallia Narbonensis", "The Romanized Mediterranean corridor of southern Gaul—old, urban, and wealthy—anchored by ports, vineyards, and the overland route into Italy.", "narbonensis.html"],

  ["alpes_maritimae", "Alpes Maritimae", "A compact Alpine province controlling passes between the Riviera and northern Italy, important for movement of troops, goods, and communications.", "alpes-maritimae.html"],
  ["alpes_cottiae", "Alpes Cottiae", "Mountain province centered on key Alpine passes (including routes toward the Montgenèvre area), securing travel between Italy and Gaul.", "alpes-cottiae.html"],
  ["alpes_poeninae", "Alpes Poeninae", "High Alpine territory guarding important transalpine routes (Great St Bernard region), controlling strategic movement across the mountains.", "alpes-poeninae.html"],

  ["germania_superior", "Germania Superior", "Upper Rhine frontier province with forts and the limes system, balancing Roman urban life with constant military readiness along the border zone.", "germania-superior.html"],
  ["raetia", "Raetia", "Alpine and Danubian province guarding mountain passes and the northern approaches to Italy, with forts tied to the frontier defense system.", "raetia.html"],
  ["noricum", "Noricum", "Danubian province famed for mineral resources (including iron) and for guarding key stretches of the river frontier and routes into the Balkans.", "noricum.html"],

  ["pannonia_superior", "Pannonia Superior", "Western Pannonia on the Danube, a major military zone with legionary bases that protected the empire’s middle Danube frontier.", "pannonia-superior.html"],
  ["pannonia_inferior", "Pannonia Inferior", "Eastern Pannonia along the Danube, strategically vital and strongly garrisoned; its towns and roads supported rapid frontier response.", "pannonia-inferior.html"],

  ["dacia", "Dacia", "A trans-Danubian province created after Trajan’s wars, rich in resources and difficult to defend—famous for forts, mines, and later withdrawal.", "dacia.html"],
  ["moesia_inferior", "Moesia Inferior", "Lower Danube province facing steppe and Black Sea threats; its fortresses and river patrols were central to Roman defense in the region.", "moesia-inferior.html"],
  ["moesia_superior", "Moesia Superior", "Upper Moesia in the central Balkans, supporting Danube defenses and internal routes; a key region in later imperial military politics.", "moesia-superior.html"],

  ["italia", "Italia", "The imperial heartland—Rome and its peninsula—dense with roads, cities, and ports; politically central even when emperors ruled from afar.", "italia.html"],
  ["corsica_et_sardinia", "Corsica et Sardinia", "Twin Tyrrhenian islands supplying grain, timber, and strategic harbors; often quieter than frontier provinces but valuable for logistics.", "corsica-et-sardinia.html"],
  ["sicilia", "Sicilia", "A key Mediterranean island province, early and deeply integrated into Roman power; important for grain supply, shipping lanes, and naval reach.", "sicilia.html"],

  ["dalmatia", "Dalmatia", "Rugged Adriatic province with mountainous interior and coastal routes; historically rebellious, later a major recruiting ground and strategic corridor.", "dalmatia.html"],
  ["thracia", "Thracia", "Strategic province bridging the Balkans and the Aegean, controlling routes toward Byzantium and the Hellespont with a mix of cities and forts.", "thracia.html"],
  ["macedonia", "Macedonia", "A Balkan province anchored by the Via Egnatia, linking Adriatic ports to the Aegean—an enduring crossroads of trade, armies, and culture.", "macedonia.html"],
  ["epirus", "Epirus", "Northwestern Greek province of rugged terrain and coastal harbors, important for regional routes and ties between Italy and the Greek world.", "epirus.html"],
  ["achaia", "Achaia", "Southern Greece—highly urban and culturally prestigious—home to famous sanctuaries and cities, and a symbolically important part of the empire.", "achaia.html"],

  ["asia", "Asia", "Wealthy, urbanized western Anatolia with dense Greek city networks, temples, and trade—one of the empire’s most prosperous tax bases.", "asia.html"],
  ["bithynia_et_pontus", "Bithynia et Pontus", "Northern Anatolian province along the Black Sea, mixing coastal commerce with inland towns; notable for imperial attention and famous correspondence under Pliny.", "bithynia-et-pontus.html"],

  ["regnum_bospori", "Regnum Bospori", "A Roman client kingdom around the Cimmerian Bosporus (Crimea region), acting as a buffer and trade partner on the Black Sea’s northern edge.", "regnum-bospori.html"],

  ["tarraconensis", "Tarraconensis", "Largest province of Hispania, spanning much of the peninsula; varied landscapes, mines and farms, and major cities tied to Mediterranean and Atlantic routes.", "tarraconensis.html"],
  ["lusitania", "Lusitania", "Western Iberian province of river valleys and uplands, with important towns and resources; connected by roads linking Atlantic ports to inland regions.", "lusitania.html"],
  ["baetica", "Baetica", "Prosperous southern Hispania—highly Romanized—famous for olive oil exports and wealthy cities; a major contributor to Rome’s food economy.", "baetica.html"],

  ["mauretania_tingitana", "Mauretania Tingitana", "Northwestern African province around the Strait of Gibraltar, guarding Atlantic–Mediterranean passage and connected closely to southern Hispania.", "mauretania-tingitana.html"],
  ["mauretania_caesariensis", "Mauretania Caesariensis", "Central North African coastal province with fertile zones and frontier pressures inland; its ports linked Africa to Italy and the western Mediterranean.", "mauretania-caesariensis.html"],
  ["africa_proconsularis", "Africa Proconsularis", "One of Rome’s richest provinces, centered on Carthage; a powerhouse of grain and olive production that fed cities across the Mediterranean.", "africa-proconsularis.html"],

  ["creta_et_cyrenaica", "Creta et Cyrenaica", "A paired province combining Crete and the Cyrenaican coast—maritime routes, Greek cities, and agricultural estates tied to eastern Mediterranean trade.", "creta-et-cyrenaica.html"],
  ["aegyptus", "Aegyptus", "Imperial-controlled province centered on Alexandria and the Nile; vital grain supply, complex administration, and a cultural powerhouse of the eastern Mediterranean.", "aegyptus.html"],

  ["arabia_petraea", "Arabia Petraea", "Desert province guarding caravan routes and the approaches to the Red Sea; famous for Petra and for linking Syria, Judaea, and Egypt by road.", "arabia-petraea.html"],
  ["judea", "Judaea", "Politically sensitive province on the eastern Mediterranean; shaped by major revolts, strong urban–religious identity, and heavy military oversight.", "judea.html"],
  ["syria", "Syria", "A major eastern province with wealthy cities and strong legions; a strategic base facing Parthia and controlling routes into Mesopotamia and Arabia.", "syria.html"],
  ["cilicia", "Cilicia", "Southern Anatolian province of coastal plains and mountain gates; controlled key passes (like the Cilician Gates) between Anatolia and Syria.", "cilicia.html"],
  ["cyprus", "Cyprus", "Island province rich in copper and maritime connections, positioned on key sea lanes between Anatolia, Syria, and Egypt.", "cyprus.html"],
  ["lycia_et_pamphylia", "Lycia et Pamphylia", "Southern Anatolian coastal province of rugged mountains and harbors; known for seafaring routes, cities, and strong regional identities under Rome.", "lycia-et-pamphylia.html"],
  ["galatia", "Galatia", "Central Anatolian province with a mix of old Celtic heritage and Roman administration; an inland crossroads supporting movement across Asia Minor.", "galatia.html"],
  ["cappadocia", "Cappadocia", "Eastern Anatolian frontier province with powerful garrisons; key base for eastern campaigns and defense against Parthian and later Persian pressure.", "cappadocia.html"],
  ["armenia", "Armenia", "A contested highland kingdom on Rome’s eastern frontier, often a buffer state between Rome and Parthia, with shifting alliances and strategic importance.", "armenia.html"],
  ["mesopotamia", "Mesopotamia", "Eastern frontier province between the great rivers, acquired and contested in wars with Parthia; strategically vital but hard to hold and defend.", "mesopotamia.html"],
  ["assyria", "Assyria", "A short-lived eastern province name associated with Rome’s farthest expansion under Trajan; emblematic of the empire’s reach and frontier ambition.", "assyria.html"],
];

const css = `
:root{--bg:#0b0f14;--panel:rgba(15,20,30,.92);--text:#e9edf3;--muted:#b9c2d0;--accent:#d6b36a;--shadow:0 20px 60px rgba(0,0,0,.45)}
*{box-sizing:border-box}
body{margin:0;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:radial-gradient(1200px 600px at 20% 0%, #172033 0%, var(--bg) 55%);color:var(--text)}
.wrap{max-width:980px;margin:0 auto;padding:22px 16px 60px}
.card{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:18px;overflow:hidden;box-shadow:var(--shadow)}
header{padding:18px 18px 12px;border-bottom:1px solid rgba(255,255,255,0.10)}
h1{margin:0;font-size:28px}
.sub{margin:10px 0 0;color:var(--muted);line-height:1.6;max-width:75ch}
main{padding:16px 18px 18px;color:var(--muted);line-height:1.75}
a{color:var(--accent);text-decoration:none}
a:hover{text-decoration:underline}
.nav{display:flex;gap:10px;flex-wrap:wrap;margin-top:14px}
.btn{display:inline-block;border:1px solid rgba(255,255,255,0.16);background:rgba(255,255,255,0.06);color:var(--text);padding:10px 12px;border-radius:10px;font-weight:700}
.btn:hover{background:rgba(255,255,255,0.10)}
.kv{display:grid;grid-template-columns:160px 1fr;gap:10px;margin:14px 0 0}
.kv div{padding:10px 12px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px}
.kv .k{color:var(--text);font-weight:700}
.small{font-size:13px;color:var(--muted)}
`;

function page({ pid, title, summary }) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${title} — Encyclopaedia Romana</title>
  <style>${css}</style>
</head>
<body>
  <div class="wrap">
    <div class="card">
      <header>
        <h1>${title}</h1>
        <p class="sub">${summary}</p>
        <div class="nav">
          <a class="btn" href="../index.html">← Back to map</a>
        </div>
      </header>

      <main>
        <div class="kv">
          <div class="k">Province ID</div><div><code>${pid}</code></div>
          <div class="k">File</div><div><code>provinces/${slugFromPid(pid)}.html</code></div>
        </div>

        <h2 style="color:var(--text);margin:18px 0 8px">Overview</h2>
        <p>
          Replace this section with your notes: geography, major cities, economy, administration, military presence,
          key events, and notable people.
        </p>

        <h2 style="color:var(--text);margin:18px 0 8px">Sections to build</h2>
        <ul>
          <li>Geography & borders</li>
          <li>Major cities & infrastructure</li>
          <li>Administration & governors</li>
          <li>Military & frontier (if applicable)</li>
          <li>Economy & trade</li>
          <li>Religion & culture</li>
          <li>Key events timeline</li>
          <li>References</li>
        </ul>

        <p class="small">Tip: add a “References” list with primary sources + modern works as you expand.</p>
      </main>
    </div>
  </div>
</body>
</html>`;
}

function slugFromPid(pid) {
  // Match your link filenames (kebab-case, with a few already kebab in your links)
  return pid
    .replace(/_/g, "-")
    .replace(/-et-/g, "-et-"); // keeps et as-is
}

function main() {
  const outDir = path.join(process.cwd(), "provinces");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  for (const [pid, title, summary, filename] of PROVINCES) {
    const html = page({ pid, title, summary });
    fs.writeFileSync(path.join(outDir, filename), html, "utf8");
  }

  console.log(`Generated ${PROVINCES.length} pages in /provinces`);
}

main();