<script>
    import { getContext, onDestroy } from 'svelte';
    let tokenStore = getContext('token');
    let token;
    const unsubscribe = tokenStore.subscribe(value => {
	    token = value;
    });
    onDestroy(unsubscribe);
    let value;
    let color;
    let item;
    $: {
        const attacks = token?.document?.actor?.items.filter(i => i.hasAttack);
        const withAmmo = attacks.filter(i => i.data.data?.consume?.target);
        if (withAmmo.length > 0) {
            const id = withAmmo[0].data.data?.consume?.target;
            console.log("id");
            let ammo = token?.document?.actor?.items.filter(i => i.id == id);
            if (ammo.length >= 0) {
                item = ammo[0];
                value = item.data.data.quantity;
                if (value == 0) {
                    color = 'red';
                }
            }
        }
    }

</script>

{#if value}
<div class="divider"></div>
<span class="ammo-segment" title={item.name}>
    <span class="icon" style="background-image: url(icons/weapons/ammunition/arrowhead-glowing-blue.webp)"></span>
    <span style={color!="" ? `color: ${color};` : ''}>{value}</span>
</span>
{/if}

<style lang="scss">
    .ammo-segment {
        align-items: center;
        display: flex;
    }
</style>
