import { useHosts } from '@modules/hosts';
import { useNodeList } from '@modules/node/hooks/useNodeList';
import { ActionRow, AnimatedGraphic, Button } from '@shared/components';
import anime from 'animejs';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { reset } from 'styles/utils.reset.styles';
import { fluid } from 'styles/utils.typography.styles';
import { styles } from './DashboardEmpty.styles';

export function DashboardEmpty() {
  const router = useRouter();
  const { handleAddNode } = useNodeList();
  const { createHostProvision } = useHosts();

  const handleAddHost = async () => {
    createHostProvision((key: string) => {
      router.push(`hosts/install/${key}`);
    });
  };
  useEffect(() => {
    anime({
      targets: '#js-title',
      easing: 'easeOutExpo',
      opacity: [0, 1],
      translateY: [12, 0],
      duration: 1000,
      delay: 100,
    });

    anime({
      targets: '#js-action-rows > li',
      easing: 'easeOutExpo',
      opacity: [0, 1],
      translateY: [12, 0],
      delay: (_, i) => 100 + 300 * (i + 1),
      duration: 800,
    });
  }, []);
  return (
    <section css={[styles.empty]}>
      <div id="js-title" css={[styles.title]}>
        <h2 css={[fluid.xlarge]}>Get Started With Blockvisor!</h2>
        <AnimatedGraphic />
      </div>

      <ul id="js-action-rows" css={[reset.list, styles.content]}>
        <li>
          <ActionRow
            title="Create a New Node"
            description=" Add your nodes and hosts to get started with BlockVisor."
            action={
              <Button style="secondary" size="small" onClick={handleAddNode}>
                Add Node
              </Button>
            }
          />
        </li>
        <li>
          <ActionRow
            title="Create a New Host"
            description="Add your nodes and hosts to get started with BlockVisor."
            action={
              <Button style="secondary" size="small" onClick={handleAddHost}>
                Add Host
              </Button>
            }
          />
        </li>
      </ul>
    </section>
  );
}
