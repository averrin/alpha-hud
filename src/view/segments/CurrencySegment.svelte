<script>
    import { currentSystemProvider } from "../../modules/api.js";
    import { getContext } from 'svelte';
    let token = getContext('token');

    const data = currentSystemProvider.getActorDetails(token.document.actor);
    console.log(data);
</script>

<span class="currency-segment">
    <span class="icon" style="background-image: url(icons/svg/coins.svg)"></span> 
    <span>
    {data.totalGP}
    </span>
</span>

<style lang="scss">
    .currency-segment {
        font-size: 18px !important;
        padding: 6px;
        white-space: nowrap;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
</style>
