<script>
    export let topPos;
    export let leftPos;
    export let marginAdj;
    export let annotationText;

</script>

<!-- annotation -->
<div
    class="annotation"
    style="top:{topPos}px; left:{leftPos}px; {marginAdj}"
>
    <div>{@html annotationText}</div>

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

    .annotation {
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
        max-width: 150px;
        background-image: url("./images/postittexture.jpg");
        background-size: cover;
        background-blend-mode: color-burn;
        background-color: var(--greyMaxEmp);
        box-shadow: 1px 1px 6px var(--greyText);
    }

</style>
