// Prüft Parser und Gültigkeitsprüfung, ohne Netzwerk. Aufruf: node scripts/mawaqit.test.mjs
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { extractConfData, isValid, build } from "./mawaqit.mjs";

const real = JSON.parse(readFileSync(new URL("../data/mawaqit-confData.json", import.meta.url), "utf8"));
assert.ok(isValid(real), "Fallback-Datei muss gültig sein");

// confData eingebettet in HTML, mit Klammern/Anführungszeichen in Strings, gefolgt von weiterem Skript
const html = `<html><script>var a={x:1};window.confData = ${JSON.stringify({ ...real, name: 'Test {"}" \\ }' })}; var b = {c: 2};</script></html>`;
const got = extractConfData(html);
assert.equal(got?.name, 'Test {"}" \\ }');
assert.deepEqual(got.calendar, real.calendar);
assert.equal(extractConfData("<html>nichts</html>"), null);
assert.equal(extractConfData("confData = {kaputt"), null);
assert.equal(isValid({ calendar: [] }), false);

// Stichtage: Ausgabe == confData
const days = build(real, 2026);
const eq = (date, mo, d) => assert.deepEqual(days[date], [...real.calendar[mo][d], ...real.iqamaCalendar[mo][d]], date);
eq("2026-10-04", 9, "4");
eq("2026-03-29", 2, "29"); // Zeitumstellung Sommerzeit
eq("2026-10-25", 9, "25"); // Zeitumstellung Winterzeit
assert.deepEqual(days["2026-10-04"].slice(0, 6), ["06:21", "07:37", "13:22", "16:24", "19:08", "20:23"]);
assert.equal(days["2027-02-29"], undefined, "kein 29.2. in 2027");
assert.ok(days["2028-01-01"] === undefined && days["2027-02-28"], "Fenster: Jahr + Jan/Feb Folgejahr");
console.log("mawaqit.test: alle Prüfungen bestanden");
