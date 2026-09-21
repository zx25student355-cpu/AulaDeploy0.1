# AulaDeploy

Aplicación web estática y progresiva para acompañar el estudio del despliegue de aplicaciones web. Representa un panel de operaciones con proyectos ficticios de DAW, entornos, versiones e historial de despliegues.

## Ejecutar en local

No requiere instalar dependencias. Desde la raíz del proyecto:

```bash
python3 -m http.server 8080 --directory dist
```

Después se abre `http://localhost:8080`.

## Comprobaciones

```bash
node --check dist/js/app.js
python3 tests/smoke_test.py
```

## Estructura

- `dist/index.html`: estructura y contenido de la interfaz.
- `dist/css/styles.css`: identidad visual y diseño adaptable.
- `dist/js/app.js`: datos de ejemplo, navegación e interacciones.
- `dist/assets/favicon.svg`: icono de la aplicación.
- `tests/smoke_test.py`: prueba básica de integridad.

## Alcance de la versión 0.1

- Panel general con indicadores.
- Catálogo filtrable de cuatro proyectos.
- Ficha detallada e historial por proyecto.
- Formulario validado para registrar solicitudes de despliegue.
- Diseño adaptable y navegación accesible.

La aplicación es demostrativa: no envía datos a un servidor ni realiza despliegues reales.
