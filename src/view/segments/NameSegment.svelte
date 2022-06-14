<script>
    export let token;
</script>

<span class="name-segment">
    <span>{token?.data?.name}</span>
    {#if token?.data?.name != token?.document?.actor?.name}
        <i class="fas fa-exclamation-triangle"></i>
    {/if}
</span>


<style lang="scss">
    .name-segment {
        white-space: nowrap;
    }
</style>
