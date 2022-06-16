<script>
   import ProgressSegment from "../segments/ProgressSegment.svelte"
    export let token;
    export let path;
    export let color = "";
    $: data = getProperty(token?.document?.actor.getRollData(), path);
</script>

<ProgressSegment bind:token
	value={data.value}
	max={data.max}
	color={color}
/>
