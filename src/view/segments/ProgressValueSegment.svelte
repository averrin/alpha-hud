<script>
   import DataSegment from "../segments/DataSegment.svelte"
    export let token;
    export let label = "";
    export let path;

    const data = getProperty(token?.document?.actor.getRollData(), path);
    let color = "";
    if (data.value > data.max) {
        color = "red";
    } else if (data.value == 0) {
        color = "grey";
    }
</script>

<span class="data-segment">
    {#if label != ""}
        {label}:&nbsp;
    {/if}
	<DataSegment bind:token path="{path}.value" color={color}/>
	/
	<DataSegment bind:token path="{path}.max"/>
</span>
