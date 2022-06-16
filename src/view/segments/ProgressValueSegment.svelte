<script>
   import DataSegment from "../segments/DataSegment.svelte"
    export let token;
    export let label = "";
    export let path;
    export let colors;
    export let icon;

    const data = getProperty(token?.document?.actor.getRollData(), path);
    let color = "";

    if (colors && typeof colors === "object") {
        for (const [key, value] of Object.entries(colors)) {
            if (data.value >= key) {
                color = value;
            }
        }
    }

    if (data.value > data.max) {
        color = "red";
    } else if (data.value == 0) {
        color = "grey";
    }
</script>

<span class="data-segment">
    {#if icon != ""}
        <span class="icon" style="background-image: url({icon})"></span>
    {:else}
        {#if label != ""}
            {label}:&nbsp;
        {/if}
    {/if}
    <span>
	    <DataSegment bind:token path="{path}.value" color={color}/>
	    /
	    <DataSegment bind:token path="{path}.max"/>
    </span>
</span>

<style lang="scss">
    .data-segment {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
</style>
