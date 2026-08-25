import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * SEO component — drop this inside any page to set per-page <title> and meta tags.
 * All props are optional; sensible defaults are provided for the store.
 */
export default function SEO({
  title,
  description,
  image = '/logo.jpeg',
  url,
  type = 'website',
  product, // optional: pass a product object {name, price, image} for product pages
}) {
  const siteName = 'Akilapa & Sons';
  const defaultTitle = `${siteName} | Premium Car Parts & Auto Services`;
  const defaultDesc =
    'Shop genuine car parts, engine oils, batteries, tyres and auto accessories at Akilapa & Sons — Osun State, Nigeria. Expert vehicle diagnostics and fast delivery.';

  const resolvedTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const resolvedDesc = description || defaultDesc;
  const resolvedUrl = url
    ? `https://akilapa-sons.vercel.app${url}`
    : 'https://akilapa-sons.vercel.app/';
  const resolvedImage = image?.startsWith('http')
    ? image
    : `https://akilapa-sons.vercel.app${image}`;

  // Build Product structured data if a product object is passed
  const productSchema = product
    ? JSON.stringify({
        '@context': 'https://schema.org/',
        '@type': 'Product',
        name: product.name,
        image: [product.image || product.imgUrl],
        description: product.description || `Buy ${product.name} at Akilapa & Sons Nigeria`,
        brand: { '@type': 'Brand', name: product.brand || 'Akilapa & Sons' },
        offers: {
          '@type': 'Offer',
          url: resolvedUrl,
          priceCurrency: 'NGN',
          price: product.price,
          availability: 'https://schema.org/InStock',
          seller: { '@type': 'Organization', name: siteName },
        },
      })
    : null;

  return (
    <Helmet>
      <title>{resolvedTitle}</title>
      <meta name="description" content={resolvedDesc} />
      <link rel="canonical" href={resolvedUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={resolvedUrl} />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={resolvedDesc} />
      <meta property="og:image" content={resolvedImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={resolvedUrl} />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDesc} />
      <meta name="twitter:image" content={resolvedImage} />

      {/* Product structured data */}
      {productSchema && (
        <script type="application/ld+json">{productSchema}</script>
      )}
    </Helmet>
  );
}
