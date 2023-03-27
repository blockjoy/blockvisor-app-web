import * as mqtt from 'mqtt';
import { NodeMessage } from '@blockjoy/blockjoy-grpc/dist/out/mqtt_pb';
import { useIdentity } from '@modules/auth';
import { organizationAtoms } from '@modules/organization';
import { env } from '@shared/constants/env';
import { useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { nodeAtoms } from '../store/nodeAtoms';
import { useNodeMetrics } from './useNodeMetrics';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export const useMqttUpdates = () => {
  const { loadMetrics } = useNodeMetrics();
  const { user } = useIdentity();
  const router = useRouter();

  const [nodeList, setNodeList] = useRecoilState(nodeAtoms.nodeList);
  const [activeNode, setActiveNode] = useRecoilState(nodeAtoms.activeNode);

  const defaultOrganization = useRecoilValue(
    organizationAtoms.defaultOrganization,
  );

  const latestNodeList = useRef(nodeList);
  const latestActiveNode = useRef(activeNode);
  const currentChannel = useRef('');
  const mqttOrgId = useRef('');
  const accessToken = useRef('');

  const deleteFromNodeList = async (node: any) => {
    console.log('deleteFromNodeList', node);
    const nodeListCopy = [...latestNodeList.current];
    setNodeList(nodeListCopy.filter((n) => n.id !== node.nodeId));
    // await loadMetrics();
    toast.success('Someone deleted a node');
  };

  const deleteActiveNode = (node: any) => {
    console.log('delete activeNode', latestActiveNode.current);

    if (node.nodeId === latestActiveNode?.current?.id) {
      setActiveNode(null);
    }
  };

  const addToNodeList = async (data: any) => {
    const { node } = data;
    console.log('addNodeToList', node);
    const nodeListCopy = JSON.parse(JSON.stringify(latestNodeList.current));
    nodeListCopy.push(node);
    setNodeList(nodeListCopy);
    // await loadMetrics();
    toast.success(
      <div>
        {node.createdByName} launched a node{' '}
        <a onClick={() => router.push(`/nodes/${node.id}`)}>
          Click here to view it
        </a>
      </div>,
    );
  };

  const handleNodeUpdate = (payload: any) => {
    const { node, type } = payload;

    console.log('MQTT: Node Update From Server ', node, type);

    switch (type) {
      // case 'update': {
      //   updateNodeList(node);
      //   updateActiveNode(node);
      //   //break;
      // }
      case 'create': {
        addToNodeList(node);
        break;
      }
      case 'delete': {
        deleteFromNodeList(node);
        deleteActiveNode(node);
        break;
      }
    }
  };

  const mqttRef = useRef<any>({});

  const connectMqtt = (eqmx_url: string) => {
    const token = Buffer.from(accessToken.current, 'base64').toString('binary');

    // let token = JSON.parse(
    //   window.localStorage.getItem('identity') || '{}',
    // ).accessToken;

    mqttRef.current = mqtt.connect(`ws://${eqmx_url}/mqtt`, {
      clean: true,
      connectTimeout: 10000,
      port: 8083,
      protocolId: 'MQTT',
      clientId: 'user_auth',
      keepalive: 1000000,
      reconnectPeriod: 10000,
      username: token,
      password: token,
    });

    const mqtt_client = mqttRef.current;

    mqtt_client.on('connect', async () => {
      console.log('MQTT connected');

      const data = JSON.parse(
        Buffer.from(token?.split('.')[1], 'base64').toString('binary'),
      );

      if (currentChannel.current?.length) {
        await mqtt_client.unsubscribe(currentChannel.current);
      }

      const channel = `/orgs/${data.data.org_id}/nodes`;
      currentChannel.current = channel;

      if (mqtt_client.connected && !mqtt_client.disconnecting) {
        await mqtt_client.subscribe(channel, (err: any) => {
          if (err) {
            console.log('subscription error: ', { error: err, mqtt_client });
          } else {
            console.log(`MQTT subscribed to ${channel}`, mqtt_client);
          }
        });
      }
    });

    mqtt_client.on('message', (topic: string, payload: any) => {
      let msg = NodeMessage.deserializeBinary(
        new Uint8Array(payload),
      ).toObject();

      if (msg.deleted) {
        console.log('MQTT payload (node deleted): ', msg.deleted);
        handleNodeUpdate({
          type: 'delete',
          node: msg.deleted,
        });
      } else if (msg.updated) {
        console.log('MQTT payload (node updated): ', msg.updated);
        handleNodeUpdate({
          type: 'update',
          node: msg.updated,
        });
      } else if (msg.created) {
        console.log('MQTT payload (node created): ', msg.created);
        handleNodeUpdate({
          type: 'create',
          node: msg.created,
        });
      }
    });

    mqtt_client.on('error', (err: any) => {
      console.log('MQTT connection error: ', err);
    });
  };

  useEffect(() => {
    latestNodeList.current = nodeList;
  }, [nodeList]);

  useEffect(() => {
    latestActiveNode.current = activeNode;
  }, [activeNode?.id]);

  // reconnect MQTT if organization changed
  useEffect(() => {
    if (defaultOrganization?.id !== mqttOrgId.current) {
      console.log('MQTT: Organization Changed');
      accessToken.current = user?.accessToken!;
      mqttOrgId.current = defaultOrganization?.id!;
      connectMqtt(env.eqmx_url!);
    }
  }, [defaultOrganization?.id]);

  // reconnect MQTT if access token changed
  useEffect(() => {
    if (user?.accessToken !== accessToken.current) {
      console.log('MQTT: Access Token Changed');
      accessToken.current = user?.accessToken!;
      connectMqtt(env.eqmx_url!);
    }
  }, [user?.accessToken]);
};
