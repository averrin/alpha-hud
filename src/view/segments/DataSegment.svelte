<script>
    import { getContext, onDestroy } from 'svelte';
    let tokenStore = getContext('token');
    let token;
    const unsubscribe = tokenStore.subscribe(value => {
	    token = value;
    });
    onDestroy(unsubscribe);
    export let path;
    export let color = "";
    $: value = globalThis.getProperty(token?.document?.actor.getRollData(), path);
</script>

<span style={color!="" ? `color: ${color};` : ''}>{value}</span>
