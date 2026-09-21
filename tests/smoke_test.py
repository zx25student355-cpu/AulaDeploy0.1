from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"

required = [
    DIST / "index.html",
    DIST / "css" / "styles.css",
    DIST / "js" / "app.js",
    DIST / "assets" / "favicon.svg",
    ROOT / ".openai" / "hosting.json",
]

missing = [str(path.relative_to(ROOT)) for path in required if not path.is_file()]
assert not missing, f"Faltan archivos: {', '.join(missing)}"

html = (DIST / "index.html").read_text(encoding="utf-8")
js = (DIST / "js" / "app.js").read_text(encoding="utf-8")

for route in ("inicio", "proyectos", "solicitud"):
    assert f'id="{route}"' in html, f"Falta la vista {route}"

for project in ("MiroMarket", "MiroTasks", "MiroEvents", "MiroAPI"):
    assert project in js, f"Falta el proyecto {project}"

for reference in re.findall(r'(?:href|src)="([^"#]+)"', html):
    if reference.startswith(("http://", "https://")):
        continue
    assert (DIST / reference).is_file(), f"Recurso local inexistente: {reference}"

print("OK: estructura, vistas, proyectos y recursos locales verificados.")
