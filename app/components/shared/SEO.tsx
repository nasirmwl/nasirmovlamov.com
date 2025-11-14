import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  author?: string;
  keywords?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Nasir Movlamov - Lead Software Engineer & AI Specialist',
  description = 'Lead Software Engineer at ABB specializing in micro-frontend architectures, React ecosystems, and AI. Master\'s in Artificial Intelligence. Building scalable, modern web applications.',
  image = 'https://www.nasirmovlamov.com/og-image.png',
  url = 'https://www.nasirmovlamov.com',
  type = 'website',
  author = 'Nasir Movlamov',
  keywords = 'Software Engineer, React, Micro-frontends, AI, Machine Learning, TypeScript, Next.js, ABB, Frontend Architecture, Full Stack Developer'
}) => {
  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Nasir Movlamov" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:creator" content="@nasirmovlamov" />
      <meta property="twitter:site" content="@nasirmovlamov" />

      {/* LinkedIn specific */}
      <meta property="article:author" content="Nasir Movlamov" />
      
      {/* Additional Meta */}
      <link rel="canonical" href={url} />
      <meta name="theme-color" content="#3498db" />
    </Head>
  );
};

export default SEO;

