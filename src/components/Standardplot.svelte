<script>

    // -------------------------------------------------------------------------------------------    
    // 0. Setup - imports and variable declarations
    // ------------------------------------------------------------------------------------------- 
    // import libraries
    import { onMount } from 'svelte';

    import { csv } from "d3-fetch";
    import { scaleLinear,
			scaleSqrt } from "d3-scale";
    import { extent } from "d3-array";
	import { format	} from "d3-format";
	import { tidy, filter, max, summarize } from '@tidyjs/tidy';

    // import components
	import AxisXCont from "./AxisXCont.svelte";
	import AxisYCont from "./AxisYCont.svelte";
    
    // import scripts
	import move from "../scripts/move";
	import expandScale from "../scripts/expandScale.js";

    // variable declarations

    // -------------------------------------------------------------------------------------------    
    // 1. Access and parse data
    // ------------------------------------------------------------------------------------------- 

    import dataset from "../data/gdp_co2_2015.json" 

	let data;

	// get the maximum gdp per capital as the default
	export let maxGDP = tidy(dataset, 
							summarize({gdp_per_capita: max('gdp_per_capita')})
							)[0].gdp_per_capita; // get result as single number
												// rather than array of objects

	data = tidy(dataset, filter((d) => d.gdp_per_capita <= maxGDP));

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
	let accessCountry = (d) => d.entity;

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

	$: extentsX = expandScale(extent(data, accessX), 0, 0.05);
	$: extentsY = expandScale(extent(data, accessY), 0, 0.05);

	$: scaleX = scaleLinear()
				.domain(extentsX)
				.range([0, dms.boundedWidth]);

	$: scaleY = scaleLinear()
				.domain(extentsY)
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

	export let chartId;
	let m = {x:0, y:0}; // holds current mouse position
	let tooltipText = "";
	let showTooltip = false;

	// (0, 0) is thetop, left corner of the chart-container div in App.svelte
	function getAbsMousePos(event) {

	let chartBounds = document  .getElementById(chartId)
								.getBoundingClientRect();

	return {x: event.clientX - chartBounds.x,
			y: event.clientY - chartBounds.y}
	}

	function createTooltipText(attributes){
		let line1 = "<p class='country'>" + attributes.country.value + "</p>";
		let line2 = "<p class='gdp'>$" + format(",")(attributes.datax.value) + "</p>";
		let line3 = "<p class='co2'>" + format(".3r")(attributes.datay.value) + " tonnes CO<sub>2</sub></p>";
		tooltipText = line1 + line2 + line3; 
	}

	function mouseOver(event){
        m = getAbsMousePos(event);
		showTooltip = true;
		createTooltipText(this.attributes);
    }

    function mouseLeave(event){
        showTooltip = false;
    }

    function mouseMove(event){
        m = getAbsMousePos(event);
		showTooltip = true;
    }

	// -------------------------------------------------------------------------------------------
	// 7. Choose Chart Size
	// -------------------------------------------------------------------------------------------
	

</script>

<div class="interactive-chart">
	
	<!-- the chart (all svg elements) -->
	<svg width="{dms.width}" height="{dms.height}">

		<!-- axis -->
		<g style = "{move(dms.marginLeft, dms.height - dms.marginBottom)}">
			<AxisXCont {chartSpecification}/>
		</g>
		<g style = "{move(dms.marginLeft, dms.marginTop)}">
			<AxisYCont {chartSpecification}/>
		</g>

		<!-- scatter points -->
		<g style = "{move(dms.marginLeft, dms.marginTop)}">
			{#each data as d}
				<circle
					class="scatter-point"
					cx = {scaleX(accessX(d))}
					cy = {scaleY(accessY(d))}
					r = {scaleSize(accessSize(d))}
					opacity=0.5

					clip-path = 'url(#axis-cutoff)'
					
					on:mouseover={mouseOver}
					on:mouseleave={mouseLeave}
					on:focus={mouseOver}
					on:mousemove={mouseMove}

					datax={accessX(d)}
					datay={accessY(d)}
					country={accessCountry(d)}/>
			{/each}
		</g>
			<!-- clip circles falling outside the axis -->
		<clipPath id='axis-cutoff'>
			<rect   width = {dms.boundedWidth}
					height = {dms.boundedHeight}/>
		</clipPath>
	</svg>

	<!-- the tooltip (html elements) -->
	{#if showTooltip}
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
		{@html tooltipText}
		</div>
	{/if}
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');

	.tooltip, .interactive-chart {
		position: absolute;
	}

	.tooltip {
		display: flex;
		flex-direction: column;
		max-height: 20vh;
		max-width: 500px;
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
		padding-right: 10px;
		padding-top: 5px;
		padding-bottom: 20px;
		line-height: 0.15;
	}

	/* styling html within tooltipString  
	which is created in the script and inserted into the html layer*/
	 div :global(.country) {
		 font-size: 24px;
		 font-weight: bold;
		}

	.scatter-point {
        transition: fill 1s ease, 
                    stroke-width 1s ease,
                    stroke 1s ease;
        /* -webkit-mask-image: url(paper_texture.png);
        mask-image: url(paper_texture.png); */
    }

    /* neater than using this.setAttribute() in mouse handlers */
    .scatter-point:hover{
        fill:white;
        stroke: black;
        stroke-width: 1.25;
        filter: drop-shadow(0 0 0.2rem black);
    }
</style>