<script>
    export let dms;
    export let title, units, axis;

    let xAxisPos = `top:${dms.height - 70}px; right:${dms.marginRight}px;`;
    let yAxisPos = `top:${dms.marginTop - 50}px; left:${dms.marginLeft - 15}px;`;

    let axisPos = axis == 'x' ? xAxisPos : yAxisPos;
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
