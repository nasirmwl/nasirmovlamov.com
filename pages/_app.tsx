import { Layout } from '@components/layout/layout';
import { MainLayout } from '@components/layout/MainLayout';
import type { AppProps } from 'next/app';
import '../app/data/translation/i18n';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </Layout>
  );
}

export default MyApp;
