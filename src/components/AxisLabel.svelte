<script>
    export let chartSpecification;
    export let title, units, axis;

    $: xAxisPos = `top:${chartSpecification.dms.height - 70}px; right:${chartSpecification.dms.marginRight}px;`;
    $: yAxisPos = `top:${chartSpecification.dms.marginTop - 50}px; left:${chartSpecification.dms.marginLeft - 15}px;`;

    $: axisPos = axis == 'x' ? xAxisPos : yAxisPos;
</script>

<div
    class="axis-label"
    style={axisPos}
>
    <p><b>{@html title}</b></p>
    <p style="font-size: 14px;">{@html units}</p>
</div>

<!-- <div
    class="axis-label"
    style={axisPos}
>
    <p><b>GDP per capita</b></p>
    <p style="font-size: 14px;">2011 USD adjusted for inflation</p>
</div> -->

<style>
    @import url("https://fonts.googleapis.com/css2?family=Lato&display=swap");
    
    .axis-label {
        position: absolute;
        max-width: 300px;
        text-align: right;
        line-height: 20%;
        flex-direction: column;
        font-family: "Lato", sans-serif;
        font-size: 20px;
        color: var(--greyText);
        text-anchor: end;
    }
</style>
