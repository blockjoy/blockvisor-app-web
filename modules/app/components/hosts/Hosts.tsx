import styled from "@emotion/styled";

import { useRecoilState } from "recoil";

import { useRouter } from 'next/router'

import { appState } from "@modules/app/store";
import { layoutState } from "@modules/layout/store";

import { PageSection, PageHeader, Table, TableSortButton, BlockButton } from "../shared";

import HostsTableBlock from "./HostsTableBlock";

import { useEffect, PropsWithChildren } from "react";

import { mockHosts } from "./mockData";

export type Host = {
    id: string,
    name: string,
    address: string,
    location: string,
    status: string
}

const StyledStatus = styled.span`
    font-size: 12px;
    letter-spacing: 1px;
  color: ${p => p.theme.colorDefault};
`;

const rows = mockHosts.map(host => (
        {
            key: host.id,
            name: host.name,
            isDanger: host.status === "ISSUE",
            cells: [
                { 
                    key: "1",
                    component: <HostsTableBlock key="1" location={host.location} name={host.name} address={host.address} />
                },
                { 
                    key: "2",
                    component: <StyledStatus key="2" className="has-hover-color">{host.status}</StyledStatus>,
                }
            ]
        }
    )
);

export default () => {
    const router = useRouter();

    const [app, setApp] = useRecoilState(appState);
    const [layout, setLayout] = useRecoilState(layoutState);

    const { hostsSortExpression, hostsLoading } = app;

    const handleSort = (hostsSortExpression: string) => {
        setApp({
            ...app,
            hostsSortExpression,
            hostsLoading: true
        });
        setTimeout(() => {
            setApp({
                ...app,
                hostsSortExpression,
                hostsLoading: false
            })
        }, 600)
    }

    const handleAddHost = () => {
        setLayout({
            ...layout,
            isHostsAddOpen: true,
        })
    }

    const handleRowClick = (args: any) => {
        setApp({
            ...app,
            dynamicBreadcrumb: args.name
        });
        router.push(`${router.pathname}/${args.key}`)
    }

    const SortButton: React.FC<PropsWithChildren> = ({ children }) => 
        <TableSortButton activeSortExpression={hostsSortExpression} sortExpression={children?.toString() || ""} onClick={() => handleSort(children?.toString() || "")}>{children}</TableSortButton>

    const headers = [
        {name: "Name", component: <SortButton>name</SortButton>, width: "100px", key: "1" },
        {name: "Status", component: <SortButton>status</SortButton>, width: "100px", key: "2" },
    ];

    useEffect(() => {
        setApp({
            ...app,
            hostsLoading: true
        })

        setTimeout(() => {
            setApp({
                ...app,
                hostsLoading: false
            })
        }, 600)
    }, [])

    return (
        <PageSection>
            <PageHeader>
                Hosts
                <BlockButton onClick={handleAddHost}>Add Host</BlockButton>
            </PageHeader>
            <Table isLoading={hostsLoading} headers={headers} rows={rows} onRowClick={handleRowClick} />
        </PageSection>
    );
}