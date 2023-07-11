import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { authProvider } from 'src/authProvider';

import React from "react";
import {
    useDataGrid,
    EditButton,
    ShowButton,
    DeleteButton,
    List,
    DateField,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
    IResourceComponentsProps,
    useTranslate,
    useMany,
} from "@refinedev/core";
import { Checkbox } from "@mui/material";

export default function ContratList() {
    const translate = useTranslate();
    const { dataGridProps } = useDataGrid();

    const { data: clientData, isLoading: clientIsLoading } = useMany({
        resource: "clients",
        ids: dataGridProps?.rows?.map((item: any) => item?.client_id) ?? [],
        queryOptions: {
            enabled: !!dataGridProps?.rows,
        },
    });

    const columns = React.useMemo<GridColDef[]>(
        () => [
            {
                field: "id",
                headerName: translate("contrats.fields.id"),
                type: "number",
                minWidth: 50,
            },
            {
                field: "name",
                flex: 1,
                headerName: translate("contrats.fields.name"),
                minWidth: 200,
            },
            {
                field: "description",
                flex: 1,
                headerName: translate("contrats.fields.description"),
                minWidth: 200,
            },
            {
                field: "published",
                headerName: translate("contrats.fields.published"),
                minWidth: 100,
                renderCell: function render({ value }) {
                    return <Checkbox checked={!!value} />;
                },
            },
            {
                field: "begin_date",
                flex: 1,
                headerName: translate("contrats.fields.begin_date"),
                minWidth: 250,
                renderCell: function render({ value }) {
                    return <DateField value={value} />;
                },
            },
            {
                field: "end_date",
                flex: 1,
                headerName: translate("contrats.fields.end_date"),
                minWidth: 250,
                renderCell: function render({ value }) {
                    return <DateField value={value} />;
                },
            },
            {
                field: "theme",
                flex: 1,
                headerName: translate("contrats.fields.theme"),
                minWidth: 200,
            },
            {
                field: "client_id",
                flex: 1,
                headerName: translate("contrats.fields.client_id"),
                minWidth: 300,
                renderCell: function render({ value }) {
                    return clientIsLoading ? (
                        <>Loading...</>
                    ) : (
                        clientData?.data?.find((item) => item.id === value)
                            ?.name
                    );
                },
            },
            {
                field: "actions",
                headerName: translate("table.actions"),
                sortable: false,
                renderCell: function render({ row }) {
                    return (
                        <>
                            <EditButton hideText recordItemId={row.id} />
                            <ShowButton hideText recordItemId={row.id} />
                            <DeleteButton hideText recordItemId={row.id} />
                        </>
                    );
                },
                align: "center",
                headerAlign: "center",
                minWidth: 80,
            },
        ],
        [translate, clientData?.data],
    );

    return (
        <List>
            <DataGrid {...dataGridProps} columns={columns} autoHeight />
        </List>
    );
};

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
        destination: `${redirectTo}?to=${encodeURIComponent('/contrats')}`,
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
