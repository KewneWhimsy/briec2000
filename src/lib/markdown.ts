export interface EventData {
  title?: string;
  date?: string;
  description?: string;
  location?: string;
  time?: string;
  image?: string;
  price?: Array<{ name: string; amount: number }>;
  gallery?: { photographer: string; coverImageIndex: number; title?: string };
  menuNotes?: string[];
  draft?: boolean;
}

export function parseFrontmatter(raw: string): { data: EventData; body: string } {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: raw };

  const lines = m[1].split('\n');
  const data: Record<string, unknown> = {};
  let i = 0;

  const scalar = (v: string): unknown => {
    if (v === 'true') return true;
    if (v === 'false') return false;
    if (/^\d{4}-\d{2}-\d{2}$/.test(v)) return v;
    if (/^-?\d+$/.test(v)) return Number(v);
    if (/^-?\d*\.\d+$/.test(v)) return parseFloat(v);
    if (/^["']/.test(v)) return v.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    return v;
  };

  while (i < lines.length) {
    const line = lines[i];
    const top = line.match(/^(\w+):\s*(.*)/);
    if (!top) { i++; continue; }
    const [, key, val] = top;

    if (val.trim() === '') {
      const next = lines[i + 1] ?? '';
      if (next.match(/^  - /)) {
        const items: unknown[] = [];
        i++;
        while (lines[i]?.match(/^  - /)) {
          const itemStr = lines[i].slice(4).trim();
          const km = itemStr.match(/^(\w+):\s*(.*)/);
          if (km) {
            const obj: Record<string, unknown> = { [km[1]]: scalar(km[2].trim()) };
            i++;
            while (lines[i]?.match(/^    \w+:/)) {
              const sm = lines[i].match(/^    (\w+):\s*(.*)/);
              if (sm) obj[sm[1]] = scalar(sm[2].trim());
              i++;
            }
            items.push(obj);
          } else { items.push(scalar(itemStr)); i++; }
        }
        data[key] = items;
      } else if (next.match(/^  \w+:/)) {
        const obj: Record<string, unknown> = {};
        i++;
        while (lines[i]?.match(/^  \w+:/)) {
          const sm = lines[i].match(/^  (\w+):\s*(.*)/);
          if (sm) obj[sm[1]] = scalar(sm[2].trim());
          i++;
        }
        data[key] = obj;
      } else i++;
    } else { data[key] = scalar(val.trim()); i++; }
  }

  return { data: data as EventData, body: m[2].trim() };
}

const q = (s: string) => `"${s.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;

export function buildMarkdown(form: FormData, body: string): string {
  const g = (k: string) => (form.get(k) as string ?? '').trim();
  const title = g('title'), date = g('date'), description = g('description');
  const location = g('location'), time = g('time'), image = g('image');
  const draft = form.get('draft') === 'on';

  const priceNames = form.getAll('price_name') as string[];
  const priceAmounts = form.getAll('price_amount') as string[];
  const prices = priceNames
    .map((n, i) => ({ name: n.trim(), amount: parseFloat(priceAmounts[i] ?? '') }))
    .filter(p => p.name && !isNaN(p.amount));

  const notes = g('menu_notes').split('\n').map(s => s.trim()).filter(Boolean);
  const hasGallery = form.get('has_gallery') === 'on';
  const photographer = g('gallery_photographer');
  const coverIdx = parseInt(g('gallery_cover_index') || '0') || 0;
  const galleryTitle = g('gallery_title');

  let fm = `---\ntitle: ${q(title)}\ndate: ${date}\ndescription: ${q(description)}\nlocation: ${q(location)}\ntime: ${q(time)}`;
  if (image) fm += `\nimage: ${q(image)}`;
  if (prices.length > 0) {
    fm += '\nprice:';
    for (const p of prices) fm += `\n  - name: ${q(p.name)}\n    amount: ${p.amount}`;
  }
  if (hasGallery && photographer) {
    fm += `\ngallery:\n  photographer: ${q(photographer)}\n  coverImageIndex: ${coverIdx}`;
    if (galleryTitle) fm += `\n  title: ${q(galleryTitle)}`;
  }
  if (notes.length > 0) {
    fm += '\nmenuNotes:';
    for (const n of notes) fm += `\n  - ${q(n)}`;
  }
  fm += `\ndraft: ${draft}\n---`;
  return `${fm}\n\n${body.trim()}\n`;
}

export function slugify(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}
