import { Host } from "./Hosts";

export const mockHosts: Host[] = [
    {
        id: "1",
        name: "HostFox",
        address: "212.213.214.2",
        location: "Zagreb, Croatia",
        status: "PENDING"
    },
    {
        id: "2",
        name: "HostRabbit",
        address: "212.213.214.2",
        location: "New York, United States",
        status: "NORMAL"
    },
    {
        id: "3",
        name: "HostMongoose",
        address: "212.213.214.2",
        location: "George Town, Cayman Islands",
        status: "LOADED"
    },
    {
        id: "4",
        name: "HostBeaver",
        address: "212.213.214.2",
        location: "Warsaw, Poland",
        status: "ISSUE"
    },
]
