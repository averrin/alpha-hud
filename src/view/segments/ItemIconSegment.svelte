<script>
    export let item;
    function onClick() {
        item.roll();
    }
</script>

<button class="itemicon-segment icon sq"
    on:click|preventDefault|stopPropagation={onClick}
    on:pointerdown|preventDefault|stopPropagation={()=>null}
    title={item.data.name}
>
    <div class="icon" style="background-image: url({item.data.img})"></div>
</button>
