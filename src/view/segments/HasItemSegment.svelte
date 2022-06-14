<script>
    export let token;
    export let name;
</script>

<span class="hasitem-segment">
    {#if token?.document?.actor?.items.filter(i => i.name == name).length > 0}
        <slot></slot>
    {/if}
</span>
