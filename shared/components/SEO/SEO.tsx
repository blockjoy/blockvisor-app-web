import Head from 'next/head';

interface Props {
  title: string;
  description: string;
  image?: string;
}

export const SEO: React.FC<Props> = ({ title, description, image }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta name="twitter:title" content={title} />

      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta name="twitter:description" content={description} />

      <meta
        property="og:image"
        content={
          image ||
          `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/images/xxx.jpeg`
        }
      />
      <meta
        name="twitter:image"
        content={
          image ||
          `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/images/xxx.jpeg`
        }
      />

      <meta name="twitter:card" content="summary_large_image" />

      <meta charSet="utf-8" />
    </Head>
  );
};
