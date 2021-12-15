import Head from 'next/head';

interface ISiteHeadProps {
  title: string;
  description: string;
  keyWords: string;
  url: string;
  favIcon?: string;
  image?: string;
}

function SiteHead({
  title,
  description,
  keyWords,
  url,
  favIcon = '/images/favicon.ico?v=2',
  image = '/images/card.png',
}: ISiteHeadProps) {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="shortcut icon" href={favIcon} type="image/x-icon" />

      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#317EFB" />
      <meta httpEquiv="cleartype" content="on" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="format-detection" content="address=no" />

      {
        // Open Graph / Facebook
      }
      <meta property="fb:app_id" content="257953674358265" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={image} />
      <link rel="canonical" href={url} />

      {
        // Twitter
      }
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keyWords} />
    </Head>
  );
}

export type { ISiteHeadProps };
export default SiteHead;
