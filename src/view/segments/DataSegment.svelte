<script>
    export let token;
    export let path;
    export let color = "";
    $: value = getProperty(token?.document?.actor.getRollData(), path);
</script>

<span style={color!="" ? `color: ${color};` : ''}>{value}</span>
