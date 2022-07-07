<script>
	// -------------------------------------------------------------------------------------------
	// 0. Setup - imports and variable declarations
	// -------------------------------------------------------------------------------------------
	// import libraries

	import { scaleLinear, scaleSqrt, scaleSymlog } from "d3-scale";
	import { extent } from "d3-array";
	import { tidy, filter, max, summarize, arrange, desc } from "@tidyjs/tidy";
	import { fade } from "svelte/transition";
	import { cubicInOut } from "svelte/easing";

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
	import lm_data_developing from "../data/lm_developing.json"
	import lm_data_developed from "../data/lm_developed.json"

	import Annotation from "./Annotation.svelte";
	import Tooltip from "./Tooltip.svelte";
	import ScatterPlot from "./ScatterPlot.svelte";
	import Arrow from "./Arrow.svelte";
	import AnnotationPlainText from "./AnnotationPlainText.svelte";
	import AxisLabel from "./AxisLabel.svelte";
	import Line from "./Line.svelte";

	// order so smaller circles appear near the front
	let data = tidy(
		dataset,
		arrange([desc("population_historical_estimates")])
	);

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
	export let w; // bound to offsetWidth
	export let h; // bound to offsetHeight
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

	let accessors = {
		x: accessX,
		y: accessY,
		size: accessSize,
		country: accessCountry,
	};

	$: chartSpecification = {
		scales: scales,
		data: data,
		accessors: accessors,
		dms: dms,
	};

	// -------------------------------------------------------------------------------------------
	// 6. Hangle tooltip messages from ScatterPlot component
	// -------------------------------------------------------------------------------------------
	let ttEvent, scatterAttributes;
	let showTooltip = false;
	export let chartId;

	function handleScatterMsg(msg) {
		ttEvent = msg.detail.event;
		showTooltip = msg.detail.showTT;
		scatterAttributes = msg.detail.attributes;
	}

	// -------------------------------------------------------------------------------------------
	// 8. Customising the versions of the charts
	// -------------------------------------------------------------------------------------------
	export let plotNumber = 1;
	$: currentPlotNumber = plotNumber;

	let showAxisDetail = false;


	let scatterParameters = [
		{plotNum: 1, 	colourScale: (d) => "black",
						scatterAnnimateClass: "scatter-point",
						showTT: (d) => true,
						scatterPointHoverClass: (d) => "scatter-point-light-bg"}, 

		{plotNum: 2, 	colourScale: (d) => (d.is_sustainable ? "black" : "white"),
						scatterAnnimateClass: "scatter-point-animated",
						showTT: (d) => (d.is_sustainable ? false : true),
						scatterPointHoverClass: (d) => d.is_sustainable ? "scatter-point-no-hover" : "scatter-point-dark-bg"},

		{plotNum: 3, 	colourScale: (d) => (d.is_sustainable ? "black" : "white"),
						scatterAnnimateClass: "scatter-point-animated",
						showTT: (d) => (d.is_sustainable ? true : false),
						scatterPointHoverClass: (d) => d.is_sustainable ? "scatter-point-light-bg" : "scatter-point-no-hover"},

		{plotNum: 4, 	colourScale: (d) => (d.top20_producer ? "black" : "#bfbfbf"),
						scatterAnnimateClass: "scatter-point-animated",
						showTT: (d) => (d.top20_producer ? true : false),
						scatterPointHoverClass: (d) => d.top20_producer ? "scatter-point-light-bg" : "scatter-point-no-hover"},
		
		{plotNum: 5, 	colourScale: (d) => (d.is_decoupling ? "black" : "#bfbfbf"),
						scatterAnnimateClass: "scatter-point",
						showTT: (d) => d.is_decoupling ? true : false,
						scatterPointHoverClass: (d) => d.is_decoupling ? "scatter-point-light-bg" : "scatter-point-no-hover"},
		
		{plotNum: 6, 	colourScale: (d) => accessX(d) > 25000 ? "#bfbfbf" : "black",
						scatterAnnimateClass: "scatter-point",
						showTT: (d) => true,
						scatterPointHoverClass: (d) => "scatter-point-light-bg"},
		
		{plotNum: 7, 	colourScale: (d) => accessX(d) > 25000 && d.actual_greater_than_pred ? "black" : "#bfbfbf",
						scatterAnnimateClass: "scatter-point",
						showTT: (d) => true,
						scatterPointHoverClass: (d) => "scatter-point-light-bg"}
	]

	function setupPlot1() {
		
		// data = dataset.map((d) => {
		// 	return {
		// 		...d,
		// 		annual_co2_emissions_per_capita: 0,
		// 		gdp_per_capita: 0,
		// 		population_historical_estimates: 1,
		// 	};
		// });

		// need to wait before sending points to actual positions
		// const timeout = setTimeout(() => {
		// 	scatterAnnimateClass = "scatter-point-animated";
		// 	data = dataset;
		// }, 10);

		// show/hide elements specific to the chart
		showAxisDetail = true;
	}

	function setupPlot2() {

	}

	function setupPlot3() {
		// filter down data to focus on countries with sustainable C02 emissions
		data = tidy(
			dataset,
			filter((d) => accessX(d) <= 20000),
			filter((d) => accessY(d) <= 3.5)
		);

		extentsX = expandScale(extent(data, accessX), 0, 0.05);
		extentsY = expandScale(extent(data, accessY), 0, 0.05);
		scaleX = scaleLinear().domain(extentsX).range([0, dms.boundedWidth]);
		scaleY = scaleLinear().domain(extentsY).range([dms.boundedHeight, 0]);

		scales = { x: scaleX, y: scaleY, size: scaleSize };

		showAxisDetail = false;
		const timeout = setTimeout(() => {
			chartSpecification = {
				scales: scales,
				data: data,
				accessors: accessors,
				dms: dms,
			};
			showAxisDetail = true;
		}, 2000);
	
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
		const timeout = setTimeout(() => {
			chartSpecification = {
				scales: scales,
				data: data,
				accessors: accessors,
				dms: dms,
			};
			showAxisDetail = true;
		}, 2000);
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

<div class="interactive-chart">


	<!-- the chart (all svg elements) -->
	<svg 	width={dms.width} height={dms.height}
			style="z-index: 10;">
		<!-- axis -->
		<g style={move(dms.marginLeft, dms.height - dms.marginBottom)}>
			<AxisXCont {chartSpecification} {showAxisDetail} />
		</g>
		<g style={move(dms.marginLeft, dms.marginTop)}>
			<AxisYCont {chartSpecification} {showAxisDetail}/>
		</g>

		<!-- scatter points -->
		<g style={move(dms.marginLeft, dms.marginTop)}>
			<ScatterPlot
				cs={chartSpecification}
				clipPath="url(#axis-cutoff)"
				scatterAnnimateClass={scatterParameters[currentPlotNumber - 1].scatterAnnimateClass}
				scatterPointHoverClass={scatterParameters[currentPlotNumber - 1].scatterPointHoverClass}
				on:message={handleScatterMsg}
				colourScale={scatterParameters[currentPlotNumber - 1].colourScale}
				showTT={scatterParameters[currentPlotNumber - 1].showTT}
			/>
		</g>

		<!-- clip circles falling outside the axis -->
		<clipPath id="axis-cutoff">
			<rect width={dms.boundedWidth} height={dms.boundedHeight} />
		</clipPath>

		{#if currentPlotNumber == 2}
			<Arrow 	start={{x:scaleX(1e5),y:scaleY(2.3)}} 
				end={{x:scaleX(1e5),y:scaleY(10)}} 
				colour="white"
				strokeWidth=4
				marginAdj={move(dms.marginLeft, dms.marginTop)}
				opacity=0.9/>
		{/if}

		{#if currentPlotNumber == 3}
			<Arrow 	start={{x:scaleX(19200),y:scaleY(1.55)}} 
				end={{x:scaleX(19200),y:scaleY(1.85)}} 
				colour="#333333"
				strokeWidth=3
				marginAdj={move(dms.marginLeft, dms.marginTop)}
				opacity=0.9/>
		{/if}

		{#if currentPlotNumber == 4}
			<Arrow 	
				start={{x:scaleX(90000),y:scaleY(8.8)}} 
				end={{x:scaleX(86000),y:scaleY(8.8)}} 
				colour="#333333"
				strokeWidth=2.8
				marginAdj={move(dms.marginLeft, dms.marginTop)}
				opacity=0.9/>
		{/if}

		{#if currentPlotNumber == 5}
			<Arrow 	
				start={{x:scaleX(90000),y:scaleY(17)}} 
				end={{x:scaleX(57000),y:scaleY(17)}} 
				colour="#333333"
				strokeWidth=2.8
				marginAdj={move(dms.marginLeft, dms.marginTop)}
				opacity=0.9/>
		{/if}

		{#if currentPlotNumber == 6}
			<Line 	cs={chartSpecification}
					marginAdj={move(dms.marginLeft, dms.marginTop)}
					data={lm_data_developing}
					clipPath="url(#axis-cutoff)"/>
		{/if}

		{#if currentPlotNumber == 7}
			<Line 	cs={chartSpecification}
					marginAdj={move(dms.marginLeft, dms.marginTop)}
					data={lm_data_developed}
					clipPath="url(#axis-cutoff)"/>
		{/if}
	</svg>

	<!-- the tooltip (html elements) -->
	{#if showTooltip}
		<Tooltip
			event={ttEvent}
			{chartId}
			{currentPlotNumber}
			{dms}
			{scatterAttributes}
		/>
	{/if}

	<!-- x axis label -->
	<AxisLabel {chartSpecification} axis='x'
	title="GDP per capita"
	units="2011 USD adjusted for inflation"/>

	<!-- y axis label -->
	<AxisLabel {chartSpecification} axis='y'
	title="Carbon emissions per capita"
	units="Tonnes of CO<sub>2</sub> per year"/>

	<!-- Size Legend: shown in plot 1 -->
	{#if currentPlotNumber == 1}
		<SizeLegend
			leftPos={scaleX(1.1e5)}
			topPos={scaleY(25)}
			{scaleSize}
			width={dms.width}
			marginAdj={move(dms.marginLeft, dms.marginTop)}
		/>
	{/if}

	<!-- Annotation: shown in plot 2 -->
	{#if currentPlotNumber == 2}

		<Annotation
			leftPos={scaleX(1.1e5)}
			topPos={scaleY(25.5)}
			marginAdj={move(dms.marginLeft, dms.marginTop)}
			annotationText="Hover over the white points to see how much emissions would need to fall."
			theme="dark"
		/>

		<AnnotationPlainText
			leftPos={scaleX(1.02e5)}
			topPos={scaleY(10)}
			marginAdj={move(dms.marginLeft, dms.marginTop)}
			text="Emissions of more than around 2.3 tonnes of CO<sub>2</sub> per capita are unlikely to be sustainable."/>
	{/if}

	<!-- Background rectangle: Plots 2 and 3 -->
	<!-- +/- 10 is to dodge the axis label -->
	{#if currentPlotNumber == 2 || currentPlotNumber == 3}
		<div
			style="width: {dms.boundedWidth}px; 
				left: {dms.marginLeft}px;
				top: {dms.marginTop + 10}px;
				height: {scaleY(2.3) - 10}px;"
			class="sus-rect"
			in:fade={{ duration: 3000 }}
			out:fade={{ duration: 2000 }}
		/>
	{/if}

	<!-- Annotation: shown in plot 3 -->
	{#if currentPlotNumber == 3}
		<Annotation
			leftPos={scaleX(800)}
			topPos={scaleY(3)}
			marginAdj={move(dms.marginLeft, dms.marginTop)}
			annotationText="Hover over the black points below for more details."
			theme="dark"
		/>

		<Annotation
			leftPos={scaleX(1.5e4)}
			topPos={scaleY(1.5)}
			marginAdj={move(dms.marginLeft, dms.marginTop)}
			annotationText="<b>Uruguay</b> has the highest GDP per capita of any country with sustainable carbon emissions (i.e. emissions below 2.3 tonnes CO<sub>2</sub> per capita)."
		/>
	{/if}

	<!-- Annotation: shown in plot 4 -->
	{#if currentPlotNumber == 4}
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

	{#if currentPlotNumber == 5}
		<Annotation
			leftPos={scaleX(0.9e5)}
			topPos={scaleY(25)}
			marginAdj={move(dms.marginLeft, dms.marginTop)}
			annotationText="The <b>United States</b> is the only one of the top 20 fossil fuel producing countries to have decoupled economic growth from CO<sub>2</sub> emissions."
			theme="oil"
		/>

		<Annotation
			leftPos={scaleX(0.9e5)}
			topPos={scaleY(12)}
			marginAdj={move(dms.marginLeft, dms.marginTop)}
			annotationText="Hover over the black points to see how GDP growth and CO<sub>2</sub> emissions have been decoupled."
			theme="dark"
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
	.interactive-chart {
		position: absolute;
	}

	.interactive-chart {
		z-index: 0;
		box-shadow: 4px 4px 8px var(--greyMaxEmp);
		background-color: #fbfbf8;
		background-image: url("./images/background-texture.jpg");
		background-blend-mode: lighten;
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
</style>
