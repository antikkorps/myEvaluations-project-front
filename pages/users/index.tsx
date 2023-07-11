import { useEffect, useState } from 'react';
import { MuiListInferencer } from '@refinedev/inferencer/mui';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { authProvider } from 'src/authProvider';
// import Refine from '../../config/api.js';
// const appUrl = process.env.APP_URL;
// const userIndexURL = `${appUrl}/users`;
import axios from 'axios';

export default function UserList() {


  return (
    <MuiListInferencer
    resource="users"
    action='list'
      fieldTransformer={(field) => {
        if (['locale', 'updatedAt', 'publishedAt'].includes(field.key)) {
          return false;
        }
        return field;
      }}
    />
  );
}

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const { authenticated, redirectTo } = await authProvider.check(context);

  const translateProps = await serverSideTranslations(context.locale ?? 'en', [
    'common',
  ]);

  if (!authenticated) {
    return {
      props: {
        ...translateProps,
      },
      redirect: {
        destination: `${redirectTo}?to=${encodeURIComponent('/users')}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...translateProps,
    },
  };
};
