<script>
    export let legendWidth = 175;
    export let legendHeight = 175;
    export let scaleSize;
    export let topPos;
    export let leftPos;
    export let width;
    export let marginAdj;

    let legendStops = [1e6, 1e7, 1e8, 1e9];
    let legendLabels = [
        "1 million people",
        "10 million",
        "100 million",
        "1 billion",
    ];

    $: console.log(leftPos);
</script>

<!-- legend -->
<div
    class="legend"
    style="top:{topPos}px; left:{leftPos}px; {marginAdj}"
>
    <div>The size of the circles shows the population of the countries.</div>

    {#if width > 800}
        <svg class="legend-items" width={legendWidth} height={legendHeight}>
            {#each legendStops as n, i}
                <circle
                    cx={legendWidth / 10}
                    cy={(legendHeight / (legendStops.length + 1)) * (i + 1)}
                    r={scaleSize(n)}
                    fill="white"
                    opacity="0.8"
                />

                <text
                    class="legend-item-text"
                    x={legendWidth / 3}
                    y={(legendHeight / (legendStops.length + 1)) * (i + 1)}
                    dominant-baseline="middle"
                >
                    {legendLabels[i]}
                </text>
            {/each}
        </svg>
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

    .legend {
        position:absolute;
        color: white;
        padding: 15px;
        display: flex;
        flex-direction: column;
        z-index: 14;
        font-family: "Lato", sans-serif;
        border-radius: 7.5px;
        text-align: left;
        font-size: 16px;
        max-width: 175px;
        background-image: url("./images/postittexture.jpg");
        background-size: cover;
        background-blend-mode: color-burn;
        background-color: var(--greyMidEmp);
        box-shadow: 1px 1px 6px var(--greyText);
    }

    .legend-item-text {
        fill: white;
    }
</style>
