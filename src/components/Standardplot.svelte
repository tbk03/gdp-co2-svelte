<script>

    // -------------------------------------------------------------------------------------------    
    // 0. Setup - imports and variable declarations
    // ------------------------------------------------------------------------------------------- 
    // import libraries
    import { onMount } from 'svelte';

    import { csv } from "d3-fetch";
    import { 	scaleLinear,
				scaleSqrt   } from "d3-scale";
    import {    extent      } from "d3-array";

    // import components
    
    // import scripts
	import move from "../scripts/move";
	import expandScale from "../scripts/expandScale.js";

    // variable declarations

    // -------------------------------------------------------------------------------------------    
    // 1. Access and parse data
    // ------------------------------------------------------------------------------------------- 

    import data from "../data/gdp_co2_2015.json"

    // alternative approach using csv in public folder but required ansyncronous processing
    // the import is more straight forward
    // onMount(async () => {
	// 	// await csv("./data/gdp_co2_2015.csv")
    //     //     .then((d) => data = d);

    //     const res = await fetch("./data/gdp_co2_2015.json");
    //     data = await res.json(); 
    //     console.log(data);
    // })

    
    // -------------------------------------------------------------------------------------------
	// 2. Create accessor functions
    // -------------------------------------------------------------------------------------------

    let accessX = (d) => d.gdp_per_capita;
    let accessY = (d) => d.annual_co2_emissions_per_capita;
    let accessSize = (d) => d.population_historical_estimates;

    // -------------------------------------------------------------------------------------------
	// 3. Define chart structure
	// -------------------------------------------------------------------------------------------
	export let w = 600;			// bound to offsetWidth
	export let h = 600;          // bound to offsetHeight
	let dms = {}; 

	$: dms = {
		width: w,
		height: h,
		marginTop: 20,
		marginBottom: 50,
		marginLeft: 50,
		marginRight: 20
	};

	$: dms.boundedWidth = dms.width - dms.marginLeft - dms.marginRight;
	$: dms.boundedHeight = dms.height - dms.marginTop - dms.marginBottom;

    // -------------------------------------------------------------------------------------------
	// 4. Create scales
	// -------------------------------------------------------------------------------------------

	$: scaleX = scaleLinear()
				.domain(expandScale(extent(data, accessX), 0.1, 0.05))
				.range([0, dms.boundedWidth]);

	$: scaleY = scaleLinear()
				.domain(expandScale(extent(data, accessY), 0.1, 0.05))
				.range([dms.boundedHeight, 0]);
	
	$: scaleSize = scaleSqrt()
					.domain(extent(data, accessSize))
					.range([dms.boundedWidth / 200, dms.boundedWidth / 50]);

	// -------------------------------------------------------------------------------------------
	// 5. Create chart specification object (to pass to other components - axis etc)
	// -------------------------------------------------------------------------------------------

	$: scales = {	x: scaleX, 
					y: scaleY, 
					size: scaleSize	};
	
	let accessors = {	x: accessX, 
						y: accessY, 
						size: accessSize 	};

	$: chartSpecification = {	scales: scales, 
								data: data, 
								accessors: accessors,
								dms: dms	};		
								
	// -------------------------------------------------------------------------------------------
	// 6. Add tooltips
	// -------------------------------------------------------------------------------------------

	let m = {x:0, y:0};

	function getAbsMousePos(event) {

	let chartBounds = document  .getElementById("chart1")
								.getBoundingClientRect();

	return {x: event.clientX - chartBounds.x,
			y: event.clientY - chartBounds.y}

}

	function mouseOver(event){
        // isHovered = true;
        // // m.x = event.layerX;
        // // m.y = event.layerY;

        m = getAbsMousePos(event);
        // d.x = this.attributes.dx.value;
        // d.y = this.attributes.dy.value;
		// m.x = event.clientX;
		// m.y = event.clientY;

        console.log("layerX: ", event.layerX, " layerY: ", event.layerY);
		console.log("m.x: ", m.x, " m.y: ", m.y);
        // console.log("getLayerX", getLayerX(event));

        // dispatch('message', {mouse: m,
        //                     data: d,
        //                     left: false });
    }

    function mouseLeave(event){
        // dispatch('message', {left: true});
    }

    function mouseMove(event){
        // m.x = event.layerX;
        // m.y = event.layerY;

        // m = getAbsMousePos(event);

        // dispatch('message', {mouse: m,
        //                     data: d,
        //                     left: false });
    }

</script>

<div class="interactive-chart">
	
	<!-- the chart (all svg elements) -->
	<svg width="{dms.width}" height="{dms.height}">
		<g style = "{move(dms.marginLeft, dms.marginTop)}">
			{#each data as d}
				<circle
					cx = {scaleX(accessX(d))}
					cy = {scaleY(accessY(d))}
					r = {scaleSize(accessSize(d))}
					
					on:mouseover={mouseOver}
					on:mouseleave={mouseLeave}
					on:focus={mouseOver}
					on:mousemove={mouseMove}

					dx={accessX(d)}
					dy={accessY(d)}/>
			{/each}
		</g>
	</svg>

	<!-- the tooltip (html elements) -->
	<div
      class="tooltip"
      style="
        top:{m.y}px;
        left:{m.x}px;
      "
    >
      <!-- <slot detail={evt.detail.text}></slot> -->
      <!-- <p> {@html `<b>x: </b> ${evt.detail.data.x}`}</p>
      <p> {@html `<b>y: </b> ${evt.detail.data.y}`}</p> -->
	  Hello {m.x}
    </div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');

	.tooltip, .interactive-chart {
		position: absolute;
	}

	.tooltip {
		width: 100px;
		border: 1px solid #ccc;
		font-size: 16px;
		background: rgba(255, 255, 255, 0.85);
		/* transform: translate(-100%, -200%); */
		padding: 1px;
		z-index: 15;
		font-family: 'Lato', sans-serif;
		border-radius: 7.5px;
		text-align: left;
		padding-left: 10px;
		padding-top: 5px;
		padding-bottom: 5px;
		line-height: 0.15;
	}
</style>