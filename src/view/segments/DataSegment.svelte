<script>
    export let token;
    export let path;
    export let color = "";
</script>

<span style={color!="" ? `color: ${color};` : ''}>{getProperty(token?.document?.actor.getRollData(), path)}</span>
