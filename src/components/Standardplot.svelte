<script>
	// -------------------------------------------------------------------------------------------
	// 0. Setup - imports and variable declarations
	// -------------------------------------------------------------------------------------------
	// import libraries

	import { scaleLinear, scaleSqrt, scaleSymlog } from "d3-scale";
	import { extent } from "d3-array";
	import { tidy, filter, max, summarize, arrange, desc } from "@tidyjs/tidy";
	import { fade } from "svelte/transition";
	import { cubicInOut } from 'svelte/easing';


	// import components
	import AxisXCont from "./AxisXCont.svelte";
	import AxisYCont from "./AxisYCont.svelte";
	import SizeLegend from "./SizeLegend.svelte";

	// import scripts
	import move from "../scripts/move";
	import expandScale from "../scripts/expandScale.js";

	// variable declarations

	// -------------------------------------------------------------------------------------------
	// 1. Access and parse data
	// -------------------------------------------------------------------------------------------

	import dataset from "../data/gdp_co2_2015.json";
	import Annotation from "./Annotation.svelte";
import Tooltip from "./Tooltip.svelte";

	// order so smaller circles appear near the front
	let data = tidy(
		dataset,
		arrange([desc("population_historical_estimates")])
	);

	// get the maximum gdp per capital as the default
	// export let maxGDP = tidy(dataset,
	// 						summarize({gdp_per_capita: max('gdp_per_capita')})
	// 						)[0].gdp_per_capita; // get result as single number
	// 											// rather than array of objects

	// data = tidy(dataset, filter((d) => d.gdp_per_capita <= maxGDP));

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
	export let w = 600; // bound to offsetWidth
	export let h = 600; // bound to offsetHeight
	let dms = {};

	$: dms = {
		width: w,
		height: h,
		marginTop: 50,
		marginBottom: 100,
		marginLeft: 50,
		marginRight: 20,
	};

	$: dms.boundedWidth = dms.width - dms.marginLeft - dms.marginRight;
	$: dms.boundedHeight = dms.height - dms.marginTop - dms.marginBottom;

	// -------------------------------------------------------------------------------------------
	// 4. Create scales
	// -------------------------------------------------------------------------------------------

	let extentsX = expandScale(extent(data, accessX), 0, 0.05);
	let extentsY = expandScale(extent(data, accessY), 0, 0.05);

	$: scaleX = scaleLinear().domain(extentsX).range([0, dms.boundedWidth]);

	$: scaleY = scaleLinear().domain(extentsY).range([dms.boundedHeight, 0]);

	$: scaleSize = scaleSqrt()
		.domain(extent(data, accessSize))
		.range([dms.boundedWidth / 150, dms.boundedWidth / 40]);

	// -------------------------------------------------------------------------------------------
	// 5. Create chart specification object (to pass to other components - axis etc)
	// -------------------------------------------------------------------------------------------

	$: scales = { x: scaleX, y: scaleY, size: scaleSize };

	let accessors = { x: accessX, y: accessY, size: accessSize };

	$: chartSpecification = {
		scales: scales,
		data: data,
		accessors: accessors,
		dms: dms,
	};

	// -------------------------------------------------------------------------------------------
	// 6. Add tooltips
	// -------------------------------------------------------------------------------------------
	let ttEvent, scatterAttributes;
	let showTooltip = false;
	export let chartId;

	function mouseOver(event) {
		if (this.attributes["data-showtt"].value == "true") {
			ttEvent = event;
			showTooltip = true;
			scatterAttributes = this.attributes;
		}
	}

	function mouseLeave(event) {
		showTooltip = false;
	}

	function mouseMove(event) {
		if (this.attributes["data-showtt"].value == "true") {
			ttEvent = event;
			showTooltip = true;
			scatterAttributes = this.attributes;
		}
	}

	// -------------------------------------------------------------------------------------------
	// 8. Customising the versions of the charts
	// -------------------------------------------------------------------------------------------
	export let plotNumber = 1;
	$: currentPlotNumber = plotNumber;

	let showAxisDetail = false;

	// let showLegend = false;
	// let showSustainable = false;
	let colourScale;
	let basePointColour = "#002DFE";
	let scatterPointHoverClass = "scatter-point-light-bg";
	let scatterAnnimateClass = "scatter-point";
	// let showAnnoP2 = false;
	// let showAnnoP3 = false;
	// let showAnnoP4 = false;
	let createTooltipText;
	let showTT;

	let plotElements = [false, false, false, false];

	let showPlotElements = function(n){
		plotElements = plotElements.map((d, i) => n == (i + 1) ? true : false);
	}

	function setupPlot1() {
		// start points in bottom left corner of graph
		scatterAnnimateClass = "scatter-point";
		data = dataset.map(d => {
			return{...d, 
					annual_co2_emissions_per_capita : 0,
					gdp_per_capita : 0,
					population_historical_estimates : 1
		}});

		// need to wait before sending points to actual positions
		const timeout = setTimeout(
			() => {
					scatterAnnimateClass = "scatter-point-animated";
					data = dataset;
				}, 10)
		
		// show/hide elements specific to the chart
		showPlotElements(1);
		showAxisDetail = true;

		// customise tooltips based on the data
		colourScale = (d) => "black";

		// customise tooltips based on the data
		scatterPointHoverClass = (d) => "scatter-point-light-bg";
		// createTooltipText = createTooltipTextPlot1;
		showTT = (d) => true;

		}

	function setupPlot2() {
		// show elements specific to the chart
		// showSustainable = true; // black background rectangle
		// showAnnoP2 = true;
		scatterAnnimateClass = "scatter-point-animated";
		showPlotElements(2);

		// conditional colouring of scatter points based on the data
		colourScale = (d) => (d.is_sustainable ? "black" : "white");

		// customise tooltips based on the data
		scatterPointHoverClass = (d) =>
			d.is_sustainable
				? "scatter-point-no-hover"
				: "scatter-point-dark-bg";
		// createTooltipText = createTooltipTextPlot2;
		showTT = (d) => (d.is_sustainable ? false : true);
	}

	function setupPlot3() {
		// filter down data to focus on countries with sustainable C02 emissions
		data = tidy(
			dataset,
			filter((d) => accessX(d) <= 20000)
		);
		data = tidy(
			data,
			filter((d) => accessY(d) <= 3.5)
		);

		extentsX = expandScale(extent(data, accessX), 0, 0.05);
		extentsY = expandScale(extent(data, accessY), 0, 0.05);
		scaleX = scaleLinear().domain(extentsX).range([0, dms.boundedWidth]);
		scaleY = scaleLinear().domain(extentsY).range([dms.boundedHeight, 0]);

		scales = { x: scaleX, y: scaleY, size: scaleSize };


		// points = points.map(d => ({ ...d, birthrate: d.year > 2000 ? d.birthrate : 0 }))
		// const timeout = setTimeout(() => {
		// 	points = points.filter(d => d.year > 2000)
		// }, 200)
		showAxisDetail = false;
		const timeout = setTimeout(
			() => {
				chartSpecification = {
					scales: scales,
					data: data,
					accessors: accessors,
					dms: dms,
					}
				showAxisDetail = true;
				}, 2000);


		// show elements specific to the chart
		// showSustainable = true; // black background rectangle
		// showAnnoP3 = true;
		showPlotElements(3);

		// conditional colouring of scatter points based on the data
		colourScale = (d) => (d.is_sustainable ? "black" : "white");

		// customise tooltips so that:
		// * only countries with sustainable emission have tooltips;
		// * and, tooltips work with the background colour.
		scatterPointHoverClass = (d) =>
			d.is_sustainable
				? "scatter-point-light-bg"
				: "scatter-point-no-hover";
		// createTooltipText = createTooltipTextPlot3;
		showTT = (d) => (d.is_sustainable ? true : false);
	}

	function setupPlot4() {
		// reorder to plot the top 20 producers on top of other countries
		data = tidy(
			dataset,
			arrange(["top20_producer", desc("population_historical_estimates")])
		);

		extentsX = expandScale(extent(data, accessX), 0, 0.05);
		extentsY = expandScale(extent(data, accessY), 0, 0.05);
		scaleX = scaleLinear().domain(extentsX).range([0, dms.boundedWidth]);
		scaleY = scaleLinear().domain(extentsY).range([dms.boundedHeight, 0]);

		scales = { x: scaleX, y: scaleY, size: scaleSize };

		showAxisDetail = false;
		const timeout = setTimeout(
			() => {
				chartSpecification = {
					scales: scales,
					data: data,
					accessors: accessors,
					dms: dms,
					}
				showAxisDetail = true;
				}, 2000);

		// show elements specific to the chart
		// showAnnoP4 = true;
		showPlotElements(4);

		// customise tooltips based on the data
		colourScale = (d) => (d.top20_producer ? "black" : "#bfbfbf");

		// customise tooltips based on the data
		scatterPointHoverClass = (d) =>
			d.top20_producer
				? "scatter-point-light-bg"
				: "scatter-point-no-hover";
		// createTooltipText = createTooltipTextPlot4;
		showTT = (d) => (d.top20_producer ? true : false);
	}

	// setup plot based on plot number
	$: switch (currentPlotNumber) {
		case 1:
			setupPlot1();
			break;
		case 2:
			setupPlot2();
			break;
		case 3:
			setupPlot3();
			break;
		case 4:
			setupPlot4();
			break;
	}
</script>

<!-- <img x="0" y="0" src="./images/paper_texture.png"> -->
<div class="interactive-chart">
	<!-- Background rectangle: Plots 2 and 3 -->
	<!-- +/- 10 is to dodge the axis label -->
	{#if plotElements[1] || plotElements[2]}
		<div
			style="width: {dms.boundedWidth}px; 
				left: {dms.marginLeft}px;
				top: {dms.marginTop + 10}px;
				height: {scaleY(2.3) - 10}px;"
			class="sus-rect"
			in:fade="{{duration: 3000}}"
			out:fade="{{duration: 2000}}"
		/>
	{/if}

	<!-- the chart (all svg elements) -->
	<svg width={dms.width} height={dms.height}>
		<!-- axis -->
		<g style={move(dms.marginLeft, dms.height - dms.marginBottom)}>
			<AxisXCont {chartSpecification} {showAxisDetail}/>
		</g>
		<g style={move(dms.marginLeft, dms.marginTop)}>
			<AxisYCont {chartSpecification} />
		</g>

		<!-- scatter points -->
		<!-- the blue I have been using "#002DFE" -->
		<g style={move(dms.marginLeft, dms.marginTop)}>
			{#each data as d}
				<circle
					class="{scatterAnnimateClass} {scatterPointHoverClass(d)}"
					cx={scaleX(accessX(d))}
					cy={scaleY(accessY(d))}
					r={scaleSize(accessSize(d))}
					opacity="0.7"
					fill={colourScale(d)}
					clip-path="url(#axis-cutoff)"
					on:mouseover={mouseOver}
					on:mouseleave={mouseLeave}
					on:focus={mouseOver}
					on:mousemove={mouseMove}
					data-x={accessX(d)}
					data-y={accessY(d)}
					data-country={accessCountry(d)}
					data-population={accessSize(d)}
					data-showTT={showTT(d)}
					data-ff-prod={d.total_ff_prod}

					in:fade="{{duration: 5000,
					easing: cubicInOut}}"
					out:fade="{{duration: 500,
					easing: cubicInOut}}"
				/>
			{/each}
		</g>

		<!-- clip circles falling outside the axis -->
		<clipPath id="axis-cutoff">
			<rect width={dms.boundedWidth} height={dms.boundedHeight} />
		</clipPath>
	</svg>

	<!-- the tooltip (html elements) -->
	{#if showTooltip}
		<Tooltip event={ttEvent} {chartId} {currentPlotNumber} {dms} {scatterAttributes}/>
	{/if}

	<!-- x axis label -->
	<div
		class="axis-label"
		style="top:{dms.height - 70}px; right:{dms.marginRight}px;"
	>
		<p><b>GDP per capita</b></p>
		<p style="font-size: 14px;">2011 USD adjusted for inflation</p>
	</div>

	<!-- y axis label -->
	<div
		class="axis-label"
		style="top:{dms.marginTop - 50}px; left:{dms.marginLeft - 15}px;"
	>
		<p><b>Carbon emissions per capita</b></p>
		<p style="font-size: 14px;">Tonnes of CO<sub>2</sub> per year</p>
	</div>

	<!-- Size Legend: shown in plot 1 -->
	{#if plotElements[0]}
		<SizeLegend
			leftPos={scaleX(1.1e5)}
			topPos={scaleY(25)}
			{scaleSize}
			width={dms.width}
			marginAdj={move(dms.marginLeft, dms.marginTop)}
		/>
	{/if}

	<!-- Annotation: shown in plot 2 -->
	{#if plotElements[1]}
		<Annotation
			leftPos={scaleX(1.1e5)}
			topPos={scaleY(25)}
			marginAdj={move(dms.marginLeft, dms.marginTop)}
			annotationText="Countries with per capita CO<sub>2</sub> emissions above a sustainable level (2.3 tonnes) are shown as white against the dark background."
			theme="light"
		/>

		<Annotation
			leftPos={scaleX(1.1e5)}
			topPos={scaleY(12.5)}
			marginAdj={move(dms.marginLeft, dms.marginTop)}
			annotationText="Hover over the white points for more details."
			theme="light"
		/>
	{/if}

	<!-- Annotation: shown in plot 3 -->
	{#if plotElements[2]}
		<Annotation
			leftPos={scaleX(800)}
			topPos={scaleY(3)}
			marginAdj={move(dms.marginLeft, dms.marginTop)}
			annotationText="Hover over the black points below for more details."
			theme="light"
		/>

		<Annotation
			leftPos={scaleX(1.5e4)}
			topPos={scaleY(1.9)}
			marginAdj={move(dms.marginLeft, dms.marginTop)}
			annotationText="<b>Uruguay</b> has the highest GDP per capita of any country with sustainable carbon emissions (i.e. emissions below 2.3 tonnes CO<sub>2</sub> per capita)."
		/>
	{/if}

	<!-- Annotation: shown in plot 4 -->
	{#if plotElements[3]}
		<Annotation
			leftPos={scaleX(1.1e5)}
			topPos={scaleY(30)}
			marginAdj={move(dms.marginLeft, dms.marginTop)}
			annotationText="The 20 countries with the highest total fossil fuel production (coal, gas and oil combined) in 2015 are shown in black. Hover over the black circles for more details. "
			theme="oil"
		/>

		<Annotation
			leftPos={scaleX(0.9e5)}
			topPos={scaleY(12)}
			marginAdj={move(dms.marginLeft, dms.marginTop)}
			annotationText="<b>Norway</b> is an outlier amongst the major fossil fuel producing countries. It has high GDP per capita and relatively low carbon emissions per capita."
			theme="oil"
		/>
	{/if}
</div>

<style>
	@import url("https://fonts.googleapis.com/css2?family=Lato&display=swap");

	:root {
		--greyText: #333333;
		--greyMaxEmp: #666666;
		--greyHighEmp: #737373;
		--greyMidEmp: #8c8c8c;
		--greyLowEmp: #bfbfbf;
		--greyMinEmp: #e5e5e5;
	}

	.sus-rect {
		z-index: -1;
		background: url("./images/postittexture.jpg"),
			linear-gradient(black, var(--greyMidEmp));
		background-size: cover;
		background-blend-mode: darken;
		transition: all 3s;
	}

	.sus-rect,
	.tooltip,
	.interactive-chart,
	.axis-label {
		position: absolute;
	}

	.interactive-chart {
		z-index: 0;
		box-shadow: 4px 4px 8px var(--greyMaxEmp);
		background-color: #fbfbf8;
		background-image: url("./images/background-texture.jpg");
		background-blend-mode: lighten;
	}

	.axis-label {
		max-width: 300px;
		text-align: right;
		line-height: 20%;
		flex-direction: column;
		font-family: "Lato", sans-serif;
		font-size: 20px;
		color: var(--greyText);
		text-anchor: end;
	}

	.tooltip {
		display: flex;
		flex-direction: column;
		max-height: 50vh;
		max-width: 200px;
		border: 1px solid var(--greyLowEmp);
		font-size: 16px;
		color: var(--greyText);
		/* transform: translate(-100%, -200%); */
		padding: 1px;
		z-index: 15;
		font-family: "Lato", sans-serif;
		border-radius: 7.5px;
		text-align: left;
		padding-left: 10px;
		padding-right: 10px;
		padding-top: 5px;
		padding-bottom: 20px;
		line-height: 1.25;
		background-image: url("./images/postittexture.jpg");
		background-size: cover;
		background-blend-mode: hard-light;
		background-color: var(--greyLowEmp);
		color: var(--greyText);
		box-shadow: 1px 1px 6px var(--greyHighEmp);
	}

	div :global(.tt-line) {
		margin: 0.5em;
	}

	/* styling html within tooltipString  
	which is created in the script and inserted into the html layer*/
	div :global(.data-country) {
		font-size: 24px;
		font-weight: bold;
	}

	.scatter-point {
		transition: fill 1s ease, stroke-width 1s ease, stroke 1s ease;
		/* -webkit-mask-image: url(paper_texture.png);
        mask-image: url(paper_texture.png); */
	}
	.scatter-point-animated {
		transition: fill 1s ease, stroke-width 1s ease, stroke 1s ease, cx 5s, cy 5s;
		/* -webkit-mask-image: url(paper_texture.png);
        mask-image: url(paper_texture.png); */
	}

	/* neater than using this.setAttribute() in mouse handlers */
	.scatter-point-light-bg:hover {
		fill: white;
		stroke: black;
		stroke-width: 1.25;
		filter: drop-shadow(0 0 0.2rem black);
	}

	.scatter-point-dark-bg:hover {
		fill: black;
		stroke: white;
		stroke-width: 1.25;
		filter: drop-shadow(0 0 0.2rem black);
	}
</style>
