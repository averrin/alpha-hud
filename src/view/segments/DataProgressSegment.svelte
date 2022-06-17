<script>
   import ProgressSegment from "../segments/ProgressSegment.svelte"
    import { getContext } from 'svelte';
    let token = getContext('token');
    export let path;
    export let color = "";
    $: data = getProperty(token?.document?.actor.getRollData(), path);
</script>

<ProgressSegment
	value={data.value}
	max={data.max}
	color={color}
/>
