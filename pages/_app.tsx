import { Refine } from '@refinedev/core';
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar';
import {
  notificationProvider,
  RefineSnackbarProvider,
  ThemedLayoutV2,
  ThemedTitleV2,
} from '@refinedev/mui';
import routerProvider, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from '@refinedev/nextjs-router';
import type { NextPage } from 'next';
import { AppProps } from 'next/app';

import { Header } from '@components/header';
import { ColorModeContextProvider } from '@contexts';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import { DataProvider } from '@refinedev/strapi-v4';
import { appWithTranslation, useTranslation } from 'next-i18next';
import { authProvider, axiosInstance } from 'src/authProvider';
import { AppIcon } from 'src/components/app-icon';
import { API_URL } from 'src/constants';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  noLayout?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
  const renderComponent = () => {
    if (Component.noLayout) {
      return <Component {...pageProps} />;
    }

    return (
      <ThemedLayoutV2
        Header={() => <Header sticky />}
        Title={({ collapsed }) => (
          <ThemedTitleV2
            collapsed={collapsed}
            text='refine Project'
            icon={<AppIcon />}
          />
        )}
      >
        <Component {...pageProps} />
      </ThemedLayoutV2>
    );
  };

  const { t, i18n } = useTranslation();

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: 'auto' } }} />
          <RefineSnackbarProvider>
            <Refine
              routerProvider={routerProvider}
              authProvider={authProvider}
              dataProvider={DataProvider(API_URL + `/api`, axiosInstance)}
              notificationProvider={notificationProvider}
              i18nProvider={i18nProvider}
              resources={[
                {
                  name: 'evaluations',
                  list: '/evaluations',
                  create: '/evaluations/create',
                  edit: '/evaluations/edit/:id',
                  show: '/evaluations/show/:id',
                  meta: {
                    canDelete: true,
                  },
                },
                {
                  name: 'contrats',
                  list: '/contrats',
                  create: '/contrats/create',
                  edit: '/contrats/edit/:id',
                  show: '/contrats/show/:id',
                  meta: {
                    canDelete: true,
                  },
                },
                {
                  name: 'Participants',
                  list: '/participants',
                  create: '/participants/create',
                  edit: '/participants/edit/:id',
                  show: '/participants/show/:id',
                  meta: {
                    canDelete: true,
                  },
                },
                {
                  name: 'blog-posts',
                  list: '/blog-posts',
                  create: '/blog-posts/create',
                  edit: '/blog-posts/edit/:id',
                  show: '/blog-posts/show/:id',
                  meta: {
                    canDelete: true,
                  },
                },
                {
                  name: 'categories',
                  list: '/categories',
                  create: '/categories/create',
                  edit: '/categories/edit/:id',
                  show: '/categories/show/:id',
                  meta: {
                    canDelete: true,
                  },
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
              }}
            >
              {renderComponent()}
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
