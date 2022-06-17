<script>
    import { getContext } from 'svelte';
    let token = getContext('token');
    export let path;
    export let color = "";
    $: value = getProperty(token?.document?.actor.getRollData(), path);
</script>

<span style={color!="" ? `color: ${color};` : ''}>{value}</span>
