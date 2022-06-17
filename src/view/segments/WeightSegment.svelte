<script>
   import ProgressValueSegment from "../segments/ProgressValueSegment.svelte"
    import { getContext } from 'svelte';
    let token = getContext('token');
    const data = token?.document?.actor.getRollData();
    const hasEnc = globalThis.getProperty(data, "attributes.encumbrance");
    const enc_colors = {
        0: 'lightgreen',
    };
    if (hasEnc) {
        const s = data.abilities.str.value;
        enc_colors[s*5] = "yellow";
        enc_colors[s*7.5] = "orange";
    }

</script>

{#if hasEnc}
<ProgressValueSegment
    path="attributes.encumbrance"
    label="enc"
    colors={enc_colors}
    icon="icons/svg/item-bag.svg"
/>
{/if}
