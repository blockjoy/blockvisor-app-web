<script lang="ts">
    import StateIcon from 'components/StateIcon/StateIcon.svelte';
    import { styles } from '../ActionTitleHeader/ActionTitleHeader.styles';

    export let status: HostState | NodeState;
</script>

<div css={styles.base}>
    <StateIcon {status} />
    {status}
</div>
