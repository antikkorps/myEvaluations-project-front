import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { authProvider } from 'src/authProvider';
import { Edit } from '@refinedev/mui';
import { Box, TextField } from '@mui/material';
import { useForm } from '@refinedev/react-hook-form';
import { IResourceComponentsProps, useTranslate } from '@refinedev/core';
import { useRouter } from 'next/router';

export default function RoleEdit() {
  const appUrl = process.env.APP_URL;
  const router = useRouter();
  const { id } = router.query;

  const translate = useTranslate();
  const {
    saveButtonProps,
    refineCore: { queryResult },
    register,
    control,
    formState: { errors },
  } = useForm();

  const rolesData = queryResult?.data?.data;

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Box
        component='form'
        sx={{ display: 'flex', flexDirection: 'column' }}
        autoComplete='off'
      >
        <TextField
          {...register('id', {
            required: 'This field is required',
            valueAsNumber: true,
          })}
          error={!!(errors as any)?.id}
          helperText={(errors as any)?.id?.message}
          margin='normal'
          fullWidth
          InputLabelProps={{ shrink: true }}
          type='number'
          label={translate('rolesId')}
          name='id'
          disabled
        />
        <TextField
          {...register('name', {
            required: 'This field is required',
          })}
          error={!!(errors as any)?.name}
          helperText={(errors as any)?.name?.message}
          margin='normal'
          fullWidth
          InputLabelProps={{ shrink: true }}
          type='text'
          label={translate('roles.fields.name')}
          name='name'
        />
        <TextField
          {...register('description', {
            required: 'This field is required',
          })}
          error={!!(errors as any)?.description}
          helperText={(errors as any)?.description?.message}
          margin='normal'
          fullWidth
          InputLabelProps={{ shrink: true }}
          type='text'
          label={translate('roles.fields.description')}
          name='description'
        />
        <TextField
          {...register('slug', {
            required: 'This field is required',
          })}
          error={!!(errors as any)?.slug}
          helperText={(errors as any)?.slug?.message}
          margin='normal'
          fullWidth
          InputLabelProps={{ shrink: true }}
          type='text'
          label={translate('roles.fields.slug')}
          name='slug'
        />
      </Box>
    </Edit>
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
        destination: `${redirectTo}?to=${encodeURIComponent('/roles')}`,
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
