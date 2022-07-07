<!--Code based on Layer Cake Line component
    https://layercake.graphics/components/Line-D3.svelte -->

<script>
    import { line, curveLinear } from 'd3-shape';

    export let cs, marginAdj;
    export let stroke = '#ab00d6';

    let path = line()
        .x((d) => cs.scales.x(cs.accessors.x(d)))
        .y((d) => cs.scales.y(cs.accessors.y(d)))
        .curve(curveLinear);

    console.log((d) => cs.scales.x(cs.accessors.x(d)));
</script>

<path   class='path-line' 
        style="top:0px; left:0px;{marginAdj}"
        d='{path(cs.data)}'
        {stroke}/>

<style>
    .path-line {
      fill: none;
      stroke-linejoin: round;
      stroke-linecap: round;
      stroke-width: 2;
      z-index: 40;
    }
  </style>