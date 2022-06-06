<!-- Inspired and informed by, and adapted/simplified from:
        https://github.com/mhkeller/layercake/blob/main/src/_components/AxisX.svelte
 -->

<script>
    // export props
    export let chartSpecification;

    export let axisFormatting = {
        tickMajorLen: 7.5,
        tickMinorLen: 5,
        textMajorOffset: 25,
        textMinorOffset: 25
    }

    export const grid = {
        majorGrid: true,
        minorGrid: true
    }

    // declare component variables
    let tickValues;
    let scaleTickValues;
    let scaleMax;

    // access tick values (domain)
   $: tickValues = chartSpecification.scales.x.ticks();

   // calculate scaled tick values (range)
   $: scaleTickValues = tickValues.map(d => chartSpecification.scales.x(d));

   // calculate coordinates for the end of axis baseline (range)
   $: scaleMax = chartSpecification.scales.x.range()[1];

//    console.log(dms.boundedHeight)

</script>

<g class='x-axis'>

    <!-- axis baseline -->
    <line   class="axis-baseline"
            x1={0}
            y1={0} 
            x2={scaleMax} 
            y2={0}/>

    <!-- axis ticks -->
    {#each scaleTickValues as t, i}
        <!-- alternate between major and minor tick lines -->

        <!-- show all non zero major ticks -->
        {#if i % 2 == 0 && tickValues[i] != 0}

            <!-- axis ticks -->
            <line   class="major-tick tick"
                    x1={t} 
                    y1={0} 
                    x2={t} 
                    y2={axisFormatting.tickMajorLen}   />
            
            <!-- axis labels -->
            <text   class="major-tick-text tick-text"
                    x = {t}
                    y = {axisFormatting.textMajorOffset}
                    text-anchor="middle">
                    <!-- the tick label itself -->
                    {tickValues[i]}  </text>
            
            <!-- grid lines within plot -->
            {#if grid.majorGrid}
                <line   class="major-grid"
                        x1 = {t}
                        y1 = 0
                        x2 = {t}
                        y2 = {-chartSpecification.dms.boundedHeight}></line>
            {/if}
        {/if}
        
        <!-- show minor ticks if required and screen is wider than 600px  -->
        {#if i % 2 != 0 && chartSpecification.dms.width > 600}
            <line   class="minor-tick"
                    x1={t} 
                    y1={0} 
                    x2={t} 
                    y2={axisFormatting.tickMinorLen }   />
            
            <text   class="minor-tick-text tick-text"
                    x = {t}
                    y = {axisFormatting.textMinorOffset}
                    text-anchor="middle">
                    <!-- the tick label itself -->
                    {tickValues[i]}  </text>
            
            <!-- grid lines within plot -->
            {#if grid.minorGrid}
                <line   class="minor-grid"
                        x1 = {t}
                        y1 = 0
                        x2 = {t}
                        y2 = {-chartSpecification.dms.boundedHeight}></line>
            {/if}
        
        {/if}

    {/each}
</g>

<style>

   /* axis styling */
	@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');

    /* set global colours #808080*/
    :root {
        --greyMaxEmp: #666666;
        --greyHighEmp: #737373;
        --greyLowEmp: #BFBFBF;
        --greyMinEmp: #E5E5E5
    }

    .axis-baseline{
        stroke: var(--greyLowEmp);
        stroke-width: 1.5;
    }

    .major-tick{
        stroke: var(--greyMinEmp);
        stroke-width: 1.5;
    }

    .minor-tick{
        stroke: var(--greyMinEmp);
        stroke-width: 1;
    }

    .tick-text{
        font-family: 'Lato', sans-serif;
        font-size: 15px;
    }

    .major-tick-text{
        fill: var(--greyHighEmp);
        font-weight: 550
        ;
    }

    .minor-tick-text{
        fill: var(--greyHighEmp);
        font-weight: 505;
    }

    .major-grid{
        stroke: var(--greyLowEmp);
        stroke-width: 0.5;
    }

    .minor-grid{
        stroke: var(--greyMinEmp);
        stroke-width: 0.5;
    }
</style>