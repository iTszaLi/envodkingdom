---
name: d3-geo region map gotchas
description: Pitfalls when building a region-focused vector map with d3-geo + world-atlas topojson (GlobalNetworkMap in envod-kingdom)
---

# Region-focused d3-geo vector map

Stack that worked (React-free, offline, no react-simple-maps — that rejects React 19):
`d3-geo` (geoMercator/geoPath) + `topojson-client` (`feature`) + `world-atlas` `countries-110m.json` bundled as a static import. Draw countries as SVG paths; overlay office markers as HTML positioned by percentage of the viewBox (x/VB_W, y/VB_H).

## fitExtent winding pitfall (cost several attempts)
`projection.fitExtent(extent, geojson)` with a **Polygon** bounding box can silently fit the WHOLE GLOBE instead of the box. d3-geo is spherical: a polygon wound the "wrong" way is interpreted as its complement (everything except the box), so its bounds become the entire sphere and the projection zooms all the way out — the whole world renders with your markers collapsed into one tiny cluster.

**Fix / rule:** fit to a `MultiPoint` of the corner coordinates instead of a Polygon. Points carry no winding ambiguity, so the fit box is always the intended region.
```
const REGION_BOUNDS = { type: "MultiPoint", coordinates: [[minLng,minLat],[maxLng,minLat],[minLng,maxLat],[maxLng,maxLat]] };
projection.fitExtent([[pad,pad],[W-pad,H-pad]], REGION_BOUNDS as never);
```
**Why:** avoids relying on ring winding order, which is easy to get wrong and fails silently (no error, just a wrong zoom).

## world-atlas 110m resolution omits tiny countries
`countries-110m.json` does NOT contain Bahrain (too small at this resolution). Highlighting it by country name is a silent no-op. Markers projected from lat/lng still render fine — only the country-landmass highlight is missing. Use 50m data if small-country landmasses must be highlighted.

## Map orientation vs RTL
Pin the map canvas `dir="ltr"` even in Arabic/RTL — geography must not mirror. Let only the tooltips/labels follow `isRtl`.
