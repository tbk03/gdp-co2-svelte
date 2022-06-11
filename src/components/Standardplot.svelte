<script>

    // -------------------------------------------------------------------------------------------    
    // 0. Setup - imports and variable declarations
    // ------------------------------------------------------------------------------------------- 
    // import libraries

    import { scaleLinear,
			scaleSqrt } from "d3-scale";
    import { extent } from "d3-array";
	import { format	} from "d3-format";
	import { tidy, filter, max, summarize } from '@tidyjs/tidy';
	import { fade } from 'svelte/transition';

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
		marginTop: 50,
		marginBottom: 100,
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
					.range([dms.boundedWidth / 150, dms.boundedWidth / 40]);

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
	let tt = {x:0, y:0}; // hold tooltip top left position which is based on mouse
	let tooltipText = "";
	let showTooltip = false;
	let xRatio;
	let yRatio;

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

	// to keep tooltips within the bounds of the chart
	function adjustTooltipPos(mousePos){
		xRatio = mousePos.x / dms.boundedWidth;
		yRatio = mousePos.y / dms.boundedHeight;
		return {x: xRatio > 0.85 ? tt.x = mousePos.x - 150 : tt.x = mousePos.x,
				y: yRatio > 0.85 ? tt.y = mousePos.y - 150 : tt.y = mousePos.y};
	}

	function mouseOver(event){
        m = getAbsMousePos(event);
		tt = adjustTooltipPos(m);
		showTooltip = true;
		createTooltipText(this.attributes);
    }

    function mouseLeave(event){
        showTooltip = false;
    }

    function mouseMove(event){
        m = getAbsMousePos(event);
		tt = adjustTooltipPos(m);
		showTooltip = true;
    }

	// -------------------------------------------------------------------------------------------
	// 7. Legend
	// -------------------------------------------------------------------------------------------
	export let legendWidth = 175;
	export let legendHeight = 175;

	let legendStops = [1e6, 1e7, 1e8, 1e9];
	let legendLabels = ["1 million people", "10 million", "100 million", "1 billion"];
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
		style="top:{tt.y}px; left:{tt.x}px;"
		>
		<!-- <slot detail={evt.detail.text}></slot> -->
		<!-- <p> {@html `<b>x: </b> ${evt.detail.data.x}`}</p>
		<p> {@html `<b>y: </b> ${evt.detail.data.y}`}</p> -->
		{@html tooltipText}
		</div>
	{/if}

	<!-- x axis label -->
	<div class="axis-label"
		style="top:{dms.height - 70}px; right:{dms.marginRight}px;">
		<p><b>GDP per capita</b></p>
		<p style="font-size: 14px;">2011 USD adjusted for inflation</p>
	</div>

	<!-- y axis label -->
	<div class="axis-label"
		style="top:{dms.marginTop - 50}px; left:{dms.marginLeft - 15}px;">
		<p><b>Carbon emissions per capita</b></p>
		<p style="font-size: 14px;">Tonnes of CO<sub>2</sub> per year</p>
	</div>

	<!-- legend -->
	<div 	class="legend"
			style=	"top:{scaleY(20)}px; 
				left:{scaleX(1.1e5)}px;
				{move(dms.marginLeft, dms.marginTop)}"
			transition:fade={{duration:5000}}
		>
		
		
		<div>
			The size of the circles shows the population of the countries.
		</div>

		{#if dms.width > 800}
		<svg class="legend-items"
			width="{legendWidth}"
			height="{legendHeight}">

			{#each legendStops as n, i}
				<circle cx="{legendWidth / 10}" 
						cy="{(legendHeight / (legendStops.length + 1)) * (i + 1)}" 
						r="{scaleSize(n)}"
						opacity=0.5/>

				<text 	class="legend-item-text"
						x="{legendWidth / 3}" 
						y="{(legendHeight / (legendStops.length + 1)) * (i + 1)}"
						dominant-baseline="middle"
					>
					{legendLabels[i]}
				</text>
			{/each}
		</svg>

		{/if}
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');

	:root {
        --greyMaxEmp: #666666;
        --greyHighEmp: #737373;
        --greyLowEmp: #BFBFBF;
        --greyMinEmp: #E5E5E5;
    }

	.legend, .tooltip, .interactive-chart, .axis-label {
		position: absolute;
	}

	.axis-label{
		max-width: 300px;
		text-align: right;
		line-height: 20%;
		flex-direction: column;
		font-family: 'Lato', sans-serif;
        font-size: 20px;
        color: var(--greyMaxEmp);
        text-anchor: end;
	}

	.legend {
		color: var(--greyMaxEmp);
		border: 1px solid var(--greyLowEmp);
		padding: 15px;
		display:flex;
		flex-direction: column;
		z-index: 14;
		font-family: 'Lato', sans-serif;
		border-radius: 7.5px;
		text-align: left;
		font-size: 16px;
		max-width: 175px;
	}

	.legend-item-text {
		fill: var(--greyMaxEmp);
	}

	.tooltip {
		display: flex;
		flex-direction: column;
		max-height: 20vh;
		max-width: 500px;
		border: 1px solid var(--greyLowEmp);
		font-size: 16px;
		color: var(--greyMaxEmp);
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