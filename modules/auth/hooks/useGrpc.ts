import { useEffect, useState } from "react";
import { GrpcClient } from "./stub_client";

export const useGrpc = () => {
    const [client, setClient] = useState<GrpcClient>();

    useEffect(() => {
        const grpcClient = new GrpcClient(
            "http://localhost:8080"
        );
        setClient(grpcClient);
    }, [])

    return client
}
