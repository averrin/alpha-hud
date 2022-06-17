<script>
   import DataSegment from "../segments/DataSegment.svelte"
    import { getContext } from 'svelte';
    let token = getContext('token');
    export let label = "";
    export let path;
    export let colors;
    export let icon;

    let color = "";
    let data;
    if (token) {
        data = getProperty(token?.document?.actor.getRollData(), path);

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
    }
</script>

{#if token}
<span class="data-segment"
    title="{Math.round(data.value/data.max*100)}%, left: {data.max-data.value}"
>
    {#if icon != ""}
        <span class="icon" style="background-image: url({icon})"></span>
    {:else}
        {#if label != ""}
            {label}:&nbsp;
        {/if}
    {/if}
    <span>
	    <DataSegment path="{path}.value" color={color}/>
	    /
	    <DataSegment path="{path}.max"/>
    </span>
</span>
{/if}

<style lang="scss">
    .data-segment {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
</style>
