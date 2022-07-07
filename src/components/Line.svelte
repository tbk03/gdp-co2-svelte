<!--Code based on Layer Cake Line component
    https://layercake.graphics/components/Line-D3.svelte 

    Line animation from: https://dev.to/learners/line-chart-with-svelte-and-d3-3086 -->
    
<script>
    import { line, curveLinear } from "d3-shape";

    export let cs, marginAdj, data, clipPath;
    export let stroke = "#ab00d6";

    let path = line()
        .x((d) => cs.scales.x(cs.accessors.x(d)))
        .y((d) => cs.scales.y(cs.accessors.y(d)))
        .curve(curveLinear);
</script>

<path
    class="path-line"
    style="top:0px; left:0px;{marginAdj}"
    d={path(data)}
    {stroke}
    clip-path={clipPath}
/>

<style>
    .path-line {
        fill: none;
        stroke-linejoin: round;
        stroke-linecap: round;
        stroke-width: 2;
        z-index: 5;
        stroke-dasharray: 4400;
        stroke-dashoffset: 0;
        animation: draw 8.5s ease;
    }

    @keyframes draw {
        from {
            stroke-dashoffset: 4400;
        }
        to {
            stroke-dashoffset: 0;
        }
    }
</style>
