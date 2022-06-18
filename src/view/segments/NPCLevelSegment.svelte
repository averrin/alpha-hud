<script>
    import { currentSystemProvider } from "../../modules/api.js";
    import { getContext, onDestroy } from 'svelte';
    let tokenStore = getContext('token');
    let token;
    const unsubscribe = tokenStore.subscribe(value => {
	    token = value;
    });
    onDestroy(unsubscribe);

    $: data = currentSystemProvider.getNPCLevel(token.document.actor);
</script>

<span class="level-segment">
	{data.label}: {data.value}
</span>
