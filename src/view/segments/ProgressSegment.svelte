<script>
    export let value;
    export let max;
    export let color;
</script>

<div class="progress-segment">
    <div class="progress-bar" style="background-color: {color}; width: {value/max*100}%">
        <span class="value">{Math.round(value/max*100)}%</span>
    </div>
</div>


<style lang="scss">
    .progress-segment {
        width: 100px;
        height: 20px;
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
    }
    .value {
        margin-left: 4px;
    }
</style>
