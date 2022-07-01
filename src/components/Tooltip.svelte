<script>
    export let tooltipText, x, y;
</script>


<div class="tooltip" style="top:{y}px; left:{x}px;">
    {@html tooltipText}
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

    .tooltip {
            position: absolute;
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
</style>