<script>
    export let value;
    export let max;
    export let color;
</script>

<div class="progress-segment">
    <div class="progress-bar" style="background-color: {color}; width: {value/max*100}%">
        <span class="value">{Math.round(value/max*100)}%&nbsp;|&nbsp;{value}/{max}</span>
    </div>
</div>


<style lang="scss">
    .progress-segment {
        min-width: 100px;
        height: 24px;
        display: inline-block;
        border-radius: 4px;
        margin-left: 6px;
        background-color: #eeeeee55;
    }
    .progress-bar {
        height: 100%;
        text-align: center;
        font-size: 16px;
        border-radius: 4px;

        display: flex;
        align-items: center;
        flex-direction: row;
    }
    .value {
        margin-left: 6px;
        margin-right: 6px;
    }
</style>
