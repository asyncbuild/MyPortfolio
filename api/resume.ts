export interface CacheEntry {
  fileId: string;
  fileName: string;
  fetchedAt: number;
}

let memoryCache: CacheEntry | null = null;
const CACHE_TTL_MS = 5 * 60 * 1000; // Cache for 5 minutes

export const DRIVE_FOLDER_ID = '1UX5SMG8lc-FwWiNs6VbJmwe7xvk3-c2r';
export const DEFAULT_RESUME_FILE_ID = '191H04i6tMOif7e_Y5xOD2ygs9Upppwwa';
export const DEFAULT_RESUME_FILE_NAME = 'DeepeshReddy.pdf';

/**
 * Dynamically resolves the latest PDF resume file from the public Google Drive folder.
 */
export async function getLatestResumeFromDrive(forceRefresh = false): Promise<{ fileId: string; fileName: string }> {
  const now = Date.now();
  if (!forceRefresh && memoryCache && now - memoryCache.fetchedAt < CACHE_TTL_MS) {
    return { fileId: memoryCache.fileId, fileName: memoryCache.fileName };
  }

  try {
    const url = `https://drive.google.com/drive/folders/${DRIVE_FOLDER_ID}`;
    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });

    if (response.ok) {
      const html = await response.text();

      // Collect all PDF files found in the folder
      const regex = /\[\[null,"([a-zA-Z0-9_-]{25,})"\][^\]]*?"application\/pdf"[^]*?\[\[\["([^"]+\.pdf)"/gi;
      const pdfs: { id: string; name: string }[] = [];
      let m;
      while ((m = regex.exec(html)) !== null) {
        pdfs.push({ id: m[1], name: m[2] });
      }

      if (pdfs.length > 0) {
        // If multiple PDFs exist, prioritize one with 'resume' or 'deepesh' in the filename, else use the first/latest
        const prioritized = pdfs.find(p => /resume|deepesh|cv/i.test(p.name)) || pdfs[0];
        memoryCache = { fileId: prioritized.id, fileName: prioritized.name, fetchedAt: now };
        return { fileId: prioritized.id, fileName: prioritized.name };
      }

      // Secondary fallback regex if DOM/JSON layout slightly shifts
      const idMatch = html.match(/\[null,"([a-zA-Z0-9_-]{25,})"\][^\n]{0,200}application\/pdf/);
      if (idMatch && idMatch[1]) {
        const nameMatch = html.match(/\[\[\["([^"]+\.pdf)"/i);
        const fileId = idMatch[1];
        const fileName = nameMatch ? nameMatch[1] : DEFAULT_RESUME_FILE_NAME;
        memoryCache = { fileId, fileName, fetchedAt: now };
        return { fileId, fileName };
      }
    }
  } catch (err) {
    console.warn('Failed to query Google Drive folder for latest resume:', err);
  }

  return {
    fileId: DEFAULT_RESUME_FILE_ID,
    fileName: DEFAULT_RESUME_FILE_NAME,
  };
}

export default async function handler(req: any, res: any) {
  // CORS support
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url || '/', `http://${req.headers?.host || 'localhost'}`);
  const action = parsedUrl.searchParams.get('action') || (req.query?.action as string);
  const refresh =
    parsedUrl.searchParams.get('refresh') === '1' ||
    parsedUrl.searchParams.get('refresh') === 'true' ||
    req.query?.refresh === '1';

  try {
    const { fileId, fileName } = await getLatestResumeFromDrive(refresh);
    const folderUrl = `https://drive.google.com/drive/folders/${DRIVE_FOLDER_ID}`;
    const viewUrl = `https://drive.google.com/file/d/${fileId}/view`;
    const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
    const previewUrl = `https://drive.google.com/file/d/${fileId}/preview`;

    if (action === 'download') {
      res.writeHead(302, { Location: downloadUrl });
      res.end();
      return;
    }

    if (action === 'view') {
      res.writeHead(302, { Location: viewUrl });
      res.end();
      return;
    }

    if (action === 'pdf') {
      // Proxy raw PDF bytes to bypass CORS restrictions for client-side viewers
      const drivePdfRes = await fetch(downloadUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        },
      });

      if (!drivePdfRes.ok) {
        throw new Error(`Drive PDF fetch failed with status ${drivePdfRes.status}`);
      }

      const buffer = await drivePdfRes.arrayBuffer();
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `inline; filename="${fileName}"`);
      res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=300');
      res.statusCode = 200;
      res.end(Buffer.from(buffer));
      return;
    }

    // Default: JSON info
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=300, stale-while-revalidate=600');
    res.statusCode = 200;
    res.end(
      JSON.stringify({
        success: true,
        fileId,
        fileName,
        folderUrl,
        viewUrl,
        downloadUrl,
        previewUrl,
        pdfProxyUrl: '/api/resume?action=pdf',
      })
    );
  } catch (err: any) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(
      JSON.stringify({
        success: false,
        error: err?.message || 'Failed to process resume request',
        fallback: {
          fileId: DEFAULT_RESUME_FILE_ID,
          fileName: DEFAULT_RESUME_FILE_NAME,
          folderUrl: `https://drive.google.com/drive/folders/${DRIVE_FOLDER_ID}`,
          viewUrl: `https://drive.google.com/file/d/${DEFAULT_RESUME_FILE_ID}/view`,
          downloadUrl: `https://drive.google.com/uc?export=download&id=${DEFAULT_RESUME_FILE_ID}`,
          previewUrl: `https://drive.google.com/file/d/${DEFAULT_RESUME_FILE_ID}/preview`,
          pdfProxyUrl: '/resume.pdf',
        },
      })
    );
  }
}

