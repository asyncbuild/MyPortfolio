export interface CacheEntry {
  fileId: string;
  fileName: string;
  fetchedAt: number;
}

let memoryCache: CacheEntry | null = null;
const CACHE_TTL_MS = 15 * 1000; // 15 seconds cache to avoid spamming Google, but fast enough for instant updates

export const DRIVE_FOLDER_ID = '1UX5SMG8lc-FwWiNs6VbJmwe7xvk3-c2r';
export const DEFAULT_RESUME_FILE_ID = '1LALaVnCWuSCh8NChgQX1JeaCCi-9P1QV';
export const DEFAULT_RESUME_FILE_NAME = 'DeepeshReddy.pdf';

/**
 * Robust extraction of PDF file metadata from Google Drive folder HTML
 */
export function extractPdfFromDriveHtml(html: string): { fileId: string; fileName: string } | null {
  // Method 1: Matches JSON stringified items in AF_initDataCallback / _DRIVE_ivd
  const m1 = html.match(/\\x22([a-zA-Z0-9_-]{25,35})\\x22[^]*?\\x22([^"\\]+\.pdf)\\x22[^]*?\\x22application\/pdf\\x22/i);
  if (m1) {
    return { fileId: m1[1], fileName: m1[2] };
  }

  // Method 2: AF_initDataCallback JSON structure
  const m2Id = html.match(/\[null,"([a-zA-Z0-9_-]{25,35})"\][^\n]{0,200}"application\/pdf"/i);
  if (m2Id) {
    const m2Name = html.match(/\[\[\["([^"]+\.pdf)"/i) || html.match(/"([^"]+\.pdf)"/i);
    return {
      fileId: m2Id[1],
      fileName: m2Name ? m2Name[1] : DEFAULT_RESUME_FILE_NAME,
    };
  }

  // Method 3: DOM data-id in table row
  const m3 = html.match(/data-id="([a-zA-Z0-9_-]{25,35})"[^>]*?data-target="doc"/i);
  if (m3) {
    const m3Name = html.match(/data-tooltip="([^"]+\.pdf)\s+PDF"/i) || html.match(/"([^"]+\.pdf)"/i);
    return {
      fileId: m3[1],
      fileName: m3Name ? m3Name[1] : DEFAULT_RESUME_FILE_NAME,
    };
  }

  // Method 4: Direct drive view link
  const m4 = html.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]{25,35})\/view/i);
  if (m4) {
    return {
      fileId: m4[1],
      fileName: DEFAULT_RESUME_FILE_NAME,
    };
  }

  return null;
}

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
      const extracted = extractPdfFromDriveHtml(html);

      if (extracted && extracted.fileId) {
        memoryCache = {
          fileId: extracted.fileId,
          fileName: extracted.fileName,
          fetchedAt: now,
        };
        return extracted;
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
    const latest = await getLatestResumeFromDrive(refresh);
    const requestedFileId = parsedUrl.searchParams.get('id') || req.query?.id || latest.fileId;
    const fileId = requestedFileId;
    const fileName = latest.fileName;

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
        redirect: 'follow',
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
      });

      if (!drivePdfRes.ok) {
        throw new Error(`Drive PDF fetch failed with status ${drivePdfRes.status}`);
      }

      const buffer = await drivePdfRes.arrayBuffer();
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `inline; filename="${fileName}"`);
      // Never cache the proxied stream so updates are instant
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      res.statusCode = 200;
      res.end(Buffer.from(buffer));
      return;
    }

    // Default: JSON info
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
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
        pdfProxyUrl: `/api/resume?action=pdf&id=${fileId}`,
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
          pdfProxyUrl: `/api/resume?action=pdf&id=${DEFAULT_RESUME_FILE_ID}`,
        },
      })
    );
  }
}
