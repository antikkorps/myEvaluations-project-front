import { MuiShowInferencer } from '@refinedev/inferencer/mui';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { authProvider } from 'src/authProvider';

export default function EvaluationShow() {
  return (
    <MuiShowInferencer
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
        destination: `${redirectTo}?to=${encodeURIComponent('/evaluations')}`,
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
