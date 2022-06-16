<script>
   import ProgressValueSegment from "../segments/ProgressValueSegment.svelte"
    export let token;
    const data = token?.document?.actor.getRollData();
    const s = data.abilities.str.value;
    const enc_colors = {
        0: 'lightgreen',
    };
    enc_colors[s*5] = "yellow";
    enc_colors[s*7.5] = "orange";

</script>

<ProgressValueSegment
    bind:token
    path="attributes.encumbrance"
    label="enc"
    colors={enc_colors}
    icon="icons/svg/item-bag.svg"
/>
