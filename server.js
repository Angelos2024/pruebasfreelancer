const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');
const { execFile } = require('child_process');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;
const USER_AGENT = 'pruebasfreelancer-openfood-scanner/1.0 (contact: dev@local.test)';
const PRODUCT_FIELDS = [
  'code',
  'product_name',
  'generic_name',
  'brands',
  'countries',
  'quantity',
  'image_url',
  'image_front_url',
  'ingredients_text',
  'ingredients_text_es',
  'categories',
  'nutriscore_grade',
  'nova_group',
  'ecoscore_grade'
].join(',');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.json': 'application/json; charset=utf-8'
};

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store'
  });
  res.end(JSON.stringify(payload));
}

function sanitizePathname(urlPath) {
  const normalized = path.normalize(urlPath).replace(/^\.+[\\/]/, '');
  const resolved = path.join(ROOT, normalized === '/' ? 'inicio.html' : normalized);
  if (!resolved.startsWith(ROOT)) {
    return null;
  }
  return resolved;
}

function fetchProduct(barcode) {
  const apiUrl = new URL(`https://world.openfoodfacts.org/api/v2/product/${encodeURIComponent(barcode)}`);
  apiUrl.searchParams.set('fields', PRODUCT_FIELDS);

  return new Promise((resolve, reject) => {
    execFile('curl', [
      '--silent',
      '--show-error',
      '--location',
      '--header', `User-Agent: ${USER_AGENT}`,
      '--header', 'Accept: application/json',
      apiUrl.toString()
    ], { maxBuffer: 1024 * 1024 * 4 }, (error, stdout) => {
      if (error) {
        reject(new Error(`curl falló al consultar OpenFoodFacts: ${error.message}`));
        return;
      }

      try {
        resolve(JSON.parse(stdout));
      } catch (parseError) {
        reject(new Error('No se pudo interpretar la respuesta JSON de OpenFoodFacts.'));
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);

  if (requestUrl.pathname.startsWith('/api/product/')) {
    const barcode = requestUrl.pathname.split('/').pop()?.trim() || '';

    if (!/^\d{8,14}$/.test(barcode)) {
      return sendJson(res, 400, {
        error: 'El código de barras debe contener entre 8 y 14 dígitos numéricos.'
      });
    }

    try {
      const data = await fetchProduct(barcode);
      return sendJson(res, 200, data);
    } catch (error) {
      return sendJson(res, 502, {
        error: 'No fue posible consultar OpenFoodFacts en este momento.',
        detail: error.message
      });
    }
  }

  const filePath = sanitizePathname(requestUrl.pathname);
  if (!filePath) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Not Found');
        return;
      }

      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Internal Server Error');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`Servidor disponible en http://localhost:${PORT}`);
});
