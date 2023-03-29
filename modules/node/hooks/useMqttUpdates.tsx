import * as mqtt from 'mqtt';
import { NodeMessage } from '@blockjoy/blockjoy-grpc/dist/out/mqtt_pb';
import { useIdentity } from '@modules/auth';
import { organizationAtoms } from '@modules/organization';
import { env } from '@shared/constants/env';
import { useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { nodeAtoms } from '../store/nodeAtoms';
import { useNodeMetrics } from './useNodeMetrics';
// import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useToast } from '@modules/layout';

export const useMqttUpdates = () => {
  const { loadMetrics } = useNodeMetrics();
  const { user } = useIdentity();
  const toast = useToast();
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
    await loadMetrics();
    toast.mqtt({
      content: `${node.deletedByName} just deleted a node`,
    });
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
    await loadMetrics();

    toast.success({
      content: (
        <div>
          {node.createdByName} launched a node{' '}
          <a onClick={() => router.push(`/nodes/${node.id}`)}>
            Click here to view it
          </a>
        </div>
      ),
    });
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

  const connectMqtt = async (eqmx_url: string) => {
    const tokenString = JSON.parse(
      window.localStorage.getItem('identity') || '{}',
    ).accessToken;

    const token = Buffer.from(tokenString, 'base64').toString('binary');

    console.log('MQTT: Connecting', token);

    console.log('mqtt_client', mqttRef.current);

    if (mqttRef.current.connected) {
      await mqttRef.current.end();
    }

    console.log('mqtt end: ', mqttRef.current);

    mqttRef.current = mqtt.connect(`ws://${eqmx_url}/mqtt`, {
      clean: true,
      connectTimeout: 10000,
      port: 8083,
      protocolId: 'MQTT',
      clientId: 'user_auth',
      keepalive: 1000,
      reconnectPeriod: 10000,
      username: token,
      password: token,
    });

    mqttRef.current.on('connect', async () => {
      console.log('MQTT connected');

      mqttRef.current.connected = true;

      const data = JSON.parse(
        Buffer.from(token?.split('.')[1], 'base64').toString('binary'),
      );

      const channel = `/orgs/${data.data.org_id}/nodes`;

      if (
        currentChannel.current?.length &&
        currentChannel.current !== channel
      ) {
        console.log('currentChannel', currentChannel.current);
        console.log('newChannel', channel);
        const unsubRes = mqttRef.current.unsubscribe(currentChannel.current);
        console.log('unsubRes', unsubRes);
      }

      currentChannel.current = channel;

      if (mqttRef.current.connected && !mqttRef.current.disconnecting) {
        mqttRef.current.subscribe(channel, (err: any) => {
          if (err) {
            console.log('subscription error: ', {
              error: err,
              mqtt_client: mqttRef.current,
            });
          } else {
            console.log(`MQTT subscribed to ${channel}`, mqttRef.current);
          }
        });
      }
    });

    mqttRef.current.on('message', (topic: string, payload: any) => {
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

    mqttRef.current.on('error', (err: any) => {
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
