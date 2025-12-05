import * as cheerio from 'cheerio';

export async function POST(request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return Response.json({ error: 'URL is required' }, { status: 400 });
    }

    // Validate URL format
    let validUrl;
    try {
      validUrl = new URL(url);
    } catch {
      return Response.json({ error: 'Invalid URL format' }, { status: 400 });
    }

    // Fetch the webpage with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    let response;
    try {
      response = await fetch(validUrl.toString(), {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        },
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        return Response.json({ error: 'Request timeout. The website took too long to respond.' }, { status: 408 });
      }
      throw error;
    }

    if (!response.ok) {
      return Response.json({ error: `Failed to fetch URL: ${response.statusText}` }, { status: response.status });
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract metadata
    const title =
      $('meta[property="og:title"]').attr('content') ||
      $('meta[name="twitter:title"]').attr('content') ||
      $('title').text() ||
      '';

    const description =
      $('meta[property="og:description"]').attr('content') ||
      $('meta[name="twitter:description"]').attr('content') ||
      $('meta[name="description"]').attr('content') ||
      '';

    // Try multiple sources for image
    let image =
      $('meta[property="og:image"]').attr('content') ||
      $('meta[name="twitter:image"]').attr('content') ||
      $('meta[name="twitter:image:src"]').attr('content') ||
      $('link[rel="image_src"]').attr('href') ||
      '';

    // If image is relative, make it absolute
    if (image && !image.startsWith('http')) {
      try {
        image = new URL(image, validUrl.origin).toString();
      } catch {
        image = '';
      }
    }

    // Try to detect tech stack from meta tags or scripts
    const techStack = [];
    const scripts = $('script[src]').toArray();
    const scriptSources = scripts.map((script) => $(script).attr('src') || '').join(' ');

    // Common tech stack detection
    // Check for Next.js first (since it includes React)
    if (scriptSources.includes('next') || html.includes('__NEXT_DATA__') || html.includes('_next/static')) {
      techStack.push('Next.js');
      techStack.push('React'); // Next.js uses React
    } else if (scriptSources.includes('react') || html.includes('react')) {
      techStack.push('React');
    }
    if (scriptSources.includes('vue') || html.includes('vue')) {
      techStack.push('Vue.js');
    }
    if (scriptSources.includes('angular') || html.includes('angular')) {
      techStack.push('Angular');
    }
    if (html.includes('tailwind') || html.includes('tailwindcss')) {
      techStack.push('Tailwind CSS');
    }
    if (html.includes('bootstrap')) {
      techStack.push('Bootstrap');
    }
    if (scriptSources.includes('jquery') || html.includes('jquery')) {
      techStack.push('jQuery');
    }
    if (html.includes('typescript') || scriptSources.includes('.ts')) {
      techStack.push('TypeScript');
    }
    if (html.includes('supabase')) {
      techStack.push('Supabase');
    }
    if (html.includes('firebase')) {
      techStack.push('Firebase');
    }
    if (html.includes('stripe')) {
      techStack.push('Stripe');
    }
    if (html.includes('mongodb') || html.includes('mongoose')) {
      techStack.push('MongoDB');
    }
    if (html.includes('postgres') || html.includes('postgresql')) {
      techStack.push('PostgreSQL');
    }

    // Clean up title and description
    const cleanTitle = title.trim();
    const cleanDescription = description.trim().substring(0, 500); // Limit description length

    return Response.json({
      title: cleanTitle,
      description: cleanDescription,
      image: image,
      link: validUrl.toString(),
      tech_stack: techStack.length > 0 ? techStack.join(', ') : '',
    });
  } catch (error) {
    console.error('Scraping error:', error);
    return Response.json({ error: `Failed to scrape URL: ${error.message}` }, { status: 500 });
  }
}

