#!/usr/bin/env python3
"""
Regenerates the footer location maps:
  public/maps/india.svg       — India's official outline (Natural Earth, India point of view)
  public/maps/world-dots.svg  — land-only dot map (no political borders)
  lib/map-points.ts           — city pin positions (edit the city lists below, then re-run)

Data (public domain, Natural Earth) — download once into a folder, e.g. ./geo:
  https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_0_countries_ind.geojson
  https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_land.geojson

Run:  python3 scripts/build-maps.py ./geo .
"""
import json, math, sys
GEO, OUT = sys.argv[1], sys.argv[2]

def rdp(pts, eps):
    if len(pts) < 3: return pts
    (x1, y1), (x2, y2) = pts[0], pts[-1]
    dx, dy = x2 - x1, y2 - y1; L = math.hypot(dx, dy) or 1e-9
    dmax, idx = 0, 0
    for i in range(1, len(pts) - 1):
        d = abs(dy * pts[i][0] - dx * pts[i][1] + x2 * y1 - y2 * x1) / L
        if d > dmax: dmax, idx = d, i
    if dmax > eps:
        return rdp(pts[: idx + 1], eps)[:-1] + rdp(pts[idx:], eps)
    return [pts[0], pts[-1]]

# ---------- India (India's official boundary, Natural Earth India point of view) ----------
d = json.load(open(f"{GEO}/ne_10m_admin_0_countries_ind.geojson"))
ind = [f for f in d["features"] if f["properties"].get("ADM0_A3") == "IND"][0]["geometry"]["coordinates"]
W, H, M = 600, 680, 20
K = math.cos(math.radians(22.5))
S = (W - 2 * M) / ((97.4 - 68.1) * K)
def pi(lon, lat): return ((lon - 68.1) * K * S + M, (37.6 - lat) * S + M)
parts, dots = [], []
for poly in ind:
    ring = [pi(*c) for c in poly[0]]
    xs = [p[0] for p in ring]; ys = [p[1] for p in ring]
    if (max(xs) - min(xs)) < 2.2 and (max(ys) - min(ys)) < 2.2:
        dots.append((sum(xs) / len(xs), sum(ys) / len(ys))); continue
    half = len(ring) // 2  # closed ring: simplify each half (first point == last point)
    simp = rdp(ring[: half + 1], 0.7)[:-1] + rdp(ring[half:], 0.7)
    if len(simp) < 4:
        dots.append((sum(xs) / len(xs), sum(ys) / len(ys))); continue
    parts.append("M" + "L".join(f"{x:.1f} {y:.1f}" for x, y in simp) + "Z")
path = "".join(parts)
india_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}">
<defs>
<pattern id="d" width="9" height="9" patternUnits="userSpaceOnUse"><circle cx="4.5" cy="4.5" r="1.25" fill="#67e8f9" fill-opacity=".38"/></pattern>
<linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3b82f6" stop-opacity=".30"/><stop offset="1" stop-color="#22d3ee" stop-opacity=".10"/></linearGradient>
</defs>
<path id="in" d="{path}"/>
<use href="#in" fill="url(#g)"/>
<use href="#in" fill="url(#d)" stroke="#93c5fd" stroke-opacity=".75" stroke-width="1.4" stroke-linejoin="round"/>
{"".join(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="1.6" fill="#93c5fd" fill-opacity=".8"/>' for x, y in dots)}
</svg>
'''
open(f"{OUT}/public/maps/india.svg", "w").write(india_svg)

# ---------- World dot map (land only — no political borders) ----------
land = json.load(open(f"{GEO}/ne_110m_land.geojson"))
polys = []
for f in land["features"]:
    g = f["geometry"]
    polys += g["coordinates"] if g["type"] == "MultiPolygon" else [g["coordinates"]]
def pip(x, y, ring):
    c = False; j = len(ring) - 1
    for i in range(len(ring)):
        xi, yi = ring[i]; xj, yj = ring[j]
        if ((yi > y) != (yj > y)) and (x < (xj - xi) * (y - yi) / (yj - yi) + xi): c = not c
        j = i
    return c
boxes = [(min(c[0] for c in p[0]), max(c[0] for c in p[0]), min(c[1] for c in p[0]), max(c[1] for c in p[0]), p) for p in polys]
WW, WH, TOP, BOT = 1000, 375, 78.0, -57.0
def pw(lon, lat): return ((lon + 180) / 360 * WW, (TOP - lat) / (TOP - BOT) * WH)
step = 2.4
segs = []
lat = TOP - step / 2
while lat > BOT:
    lon = -180 + step / 2
    while lon < 180:
        for x0, x1, y0, y1, p in boxes:
            if x0 <= lon <= x1 and y0 <= lat <= y1 and pip(lon, lat, p[0]) and not any(pip(lon, lat, h) for h in p[1:]):
                x, y = pw(lon, lat); segs.append(f"M{x:.1f} {y:.1f}h0"); break
        lon += step
    lat -= step
world_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {WW} {WH}">
<path d="{"".join(segs)}" stroke="#93c5fd" stroke-opacity=".42" stroke-width="3.6" stroke-linecap="round"/>
</svg>
'''
open(f"{OUT}/public/maps/world-dots.svg", "w").write(world_svg)

# ---------- Pin positions (percent of each map) ----------
india = [  # slug, label, lat, lon, primary, label side
    ("delhi", "Delhi NCR", 28.61, 77.21, True, "right"),
    ("gurugram", "Gurugram", 28.46, 77.03, True, "left"),
    ("mumbai", "Mumbai", 19.08, 72.88, True, "left"),
    ("pune", "Pune", 18.52, 73.86, True, "right"),
    ("bangalore", "Bangalore", 12.97, 77.59, True, "left"),
    ("hyderabad", "Hyderabad", 17.39, 78.49, False, "right"),
    ("chennai", "Chennai", 13.08, 80.27, False, "right"),
    ("kolkata", "Kolkata", 22.57, 88.36, False, "right"),
    ("ahmedabad", "Ahmedabad", 23.02, 72.57, False, "left"),
    ("jaipur", "Jaipur", 26.91, 75.79, False, "left"),
    ("chandigarh", "Chandigarh", 30.73, 76.78, False, "right"),
    ("lucknow", "Lucknow", 26.85, 80.95, False, "right"),
]
world = [
    ("/uae/dubai", "Dubai", 25.20, 55.27, "left"),
    ("/uk/london", "London", 51.51, -0.13, "right"),
    ("/usa/new-york", "New York", 40.71, -74.01, "bottom"),
    ("/canada/toronto", "Toronto", 43.65, -79.38, "top"),
    ("/australia/sydney", "Sydney", -33.87, 151.21, "left"),
]
ox, oy = pw(77.21, 28.61)
ts = ["// Generated by the map build script from Natural Earth data — pin positions in % of each map.\n"]
ts.append("export const INDIA_MAP = { width: %d, height: %d };\n" % (W, H))
ts.append("export const INDIA_PINS = [\n")
for slug, label, la, lo, primary, side in india:
    x, y = pi(lo, la)
    ts.append(f'  {{ slug: "{slug}", label: "{label}", href: "/india/{slug}", x: {x / W * 100:.2f}, y: {y / H * 100:.2f}, primary: {str(primary).lower()}, side: "{side}" }},\n')
ts.append("] as const;\n\n")
ts.append("export const WORLD_MAP = { width: %d, height: %d, origin: { x: %.1f, y: %.1f } };\n" % (WW, WH, ox, oy))
ts.append("export const WORLD_PINS = [\n")
for href, label, la, lo, side in world:
    x, y = pw(lo, la)
    ts.append(f'  {{ href: "{href}", label: "{label}", x: {x:.1f}, y: {y:.1f}, side: "{side}" }},\n')
ts.append("] as const;\n")
open(f"{OUT}/lib/map-points.ts", "w").write("".join(ts))
print("india parts", len(parts), "island dots", len(dots), "path chars", len(path), "| world dots", len(segs))
