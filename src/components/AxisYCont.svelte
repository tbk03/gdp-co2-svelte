<!-- Inspired and informed by, and adapted/simplified from:
        https://github.com/mhkeller/layercake/blob/main/src/_components/AxisX.svelte
 -->
<script>
    import { fade } from "svelte/transition";

    // export props
    export let chartSpecification;
    export let showAxisDetail = true;

    export let axisFormatting = {
        tickMajorLen: 7.5,
        tickMinorLen: 5,
        textMajorOffset: 15,
        textMinorOffset: 15,
    };

    export const grid = {
        majorGrid: true,
        minorGrid: true,
    };

    // declare component variables
    let tickValues;
    let scaleTickValues;
    let scaleMax;
    let fadeInTime = 4000;
    let fadeOutTime = 500;

    // access tick values (domain)
    $: tickValues = chartSpecification.scales.y.ticks();

    // calculate scaled tick values (range)
    $: scaleTickValues = tickValues.map((d) => chartSpecification.scales.y(d));

    // calculate coordinates for start and end of axis baseline (range)
    $: scaleMax = chartSpecification.scales.y.range()[0];
</script>

<g class="y-axis">
    <!-- axis baseline -->
    <line class="axis-baseline" x1={0} y1={0} x2={0} y2={scaleMax} />

    {#if showAxisDetail}
        <g
            in:fade={{ duration: fadeInTime }}
            out:fade={{ duration: fadeOutTime }}
        >
            <!-- axis ticks -->
            {#each scaleTickValues as t, i}
                <!-- alternate between major and minor tick lines -->

                <!-- show all non zero major ticks -->
                {#if i % 2 == 0 && tickValues[i] != 0}
                    <line
                        class="major-tick tick"
                        x1={0}
                        y1={t}
                        x2={-axisFormatting.tickMajorLen}
                        y2={t}
                    />

                    <text
                        class="major-tick-text tick-text"
                        x={-axisFormatting.textMajorOffset}
                        y={t}
                        dominant-baseline="middle"
                        text-anchor="end"
                        text-align="end"
                    >
                        <!-- the tick label itself -->
                        {tickValues[i]}
                    </text>

                    <!-- grid lines within plot -->
                    {#if grid.majorGrid}
                        <line
                            class="major-grid"
                            x1="0"
                            y1={t}
                            x2={chartSpecification.dms.boundedWidth}
                            y2={t}
                        />
                    {/if}
                {/if}

                <!-- show minor ticks if height is greater than 600px  -->
                {#if chartSpecification.dms.height > 600 && i % 2 != 0}
                    <line
                        class="minor-tick"
                        x1={0}
                        y1={t}
                        x2={-axisFormatting.tickMajorLen}
                        y2={t}
                    />

                    <text
                        class="minor-tick-text tick-text"
                        x={-axisFormatting.textMajorOffset}
                        y={t}
                        dominant-baseline="middle"
                        text-anchor="end"
                        text-align="end"
                    >
                        <!-- the tick label itself -->
                        {tickValues[i]}
                    </text>

                    <!-- grid lines within plot -->
                    {#if grid.minorGrid}
                        <line
                            class="minor-grid"
                            x1="0"
                            y1={t}
                            x2={chartSpecification.dms.boundedWidth}
                            y2={t}
                        />
                    {/if}
                {/if}
            {/each}
        </g>{/if}
</g>

<style>
    /* axis styling */
    @import url("https://fonts.googleapis.com/css2?family=Lato&display=swap");

    /* set global colours #808080*/
    :root {
        --greyMaxEmp: #666666;
        --greyHighEmp: #737373;
        --greyLowEmp: #bfbfbf;
        --greyMinEmp: #e5e5e5;
    }

    .axis-baseline {
        stroke: var(--greyLowEmp);
        stroke-width: 1.5;
    }

    .major-tick {
        stroke: var(--greyMinEmp);
        stroke-width: 1.5;
    }

    .minor-tick {
        stroke: var(--greyMinEmp);
        stroke-width: 1;
    }

    .tick-text {
        font-family: "Lato", sans-serif;
        font-size: 16px;
    }

    .major-tick-text {
        fill: var(--greyHighEmp);
        font-weight: 550;
    }

    .minor-tick-text {
        fill: var(--greyHighEmp);
        font-weight: 505;
    }

    .major-grid {
        stroke: var(--greyLowEmp);
        stroke-width: 0.5;
    }

    .minor-grid {
        stroke: var(--greyMinEmp);
        stroke-width: 0.5;
    }
</style>
