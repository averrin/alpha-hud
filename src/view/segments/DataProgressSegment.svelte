<script>
   import ProgressSegment from "../segments/ProgressSegment.svelte"
    import { getContext, onDestroy } from 'svelte';
    let tokenStore = getContext('token');
    let token;
    const unsubscribe = tokenStore.subscribe(value => {
	    token = value;
    });
    onDestroy(unsubscribe);
    export let path;
    export let color = "";
    $: data = getProperty(token?.document?.actor.getRollData(), path);
</script>

<ProgressSegment
	value={data.value}
	max={data.max}
	color={color}
/>
