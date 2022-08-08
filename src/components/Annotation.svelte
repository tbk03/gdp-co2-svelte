<script>
    /**
     * @component Annotation
     *
     * Create an annotation to be positioned within a chart: (0, 0) is the top left corner of the chart.
     *
     * @prop {numeric} topPos - The y position of the top annotation.
     * @prop {numeric} leftPos - The x position of the left of the annotation.
     * @prop {string} marginAdj - a string which adjust the position of the annotation to
     *                            account for the margins of the chart. Added to the
     *                            the annotation div using style="...".
     * @prop {stringText} annotationText - the text show in the annotation
     * @prop {string} theme - defines the visual appearance of the annotation (dark, light or oil)
     *                          applies a class which is picked up in the css
     *
     */

    // ---------------------------------------------------------------------
    // import components
    // ---------------------------------------------------------------------
    import { fade } from "svelte/transition";

    // ---------------------------------------------------------------------
    // define props
    // ---------------------------------------------------------------------
    export let topPos;
    export let leftPos;
    export let marginAdj;
    export let annotationText;
    export let theme = "dark";

    // ---------------------------------------------------------------------
    // allow selection of annotation theme
    // ---------------------------------------------------------------------
    let annotationClass;

    // apply a class to allow different css for each theme
    switch (theme) {
        case "dark":
            annotationClass = "dark-theme";
            break;
        case "light":
            annotationClass = "light-theme";
            break;
        case "oil":
            annotationClass = "oil-theme";
            break;
    }
</script>

<!-- -------------------------------------------------------------------- -->
<!-- The Annotation -->
<!-- -------------------------------------------------------------------- -->
<div
    class="annotation {annotationClass}"
    style="top:{topPos}px; left:{leftPos}px; {marginAdj}"
    in:fade={{ duration: 5000 }}
    out:fade={{ duration: 1500 }}
>
    <div>{@html annotationText}</div>
</div>

<style>
    /* --------------------------------------------------------------------------
    Setup 
    -------------------------------------------------------------------------- */
    @import url("https://fonts.googleapis.com/css2?family=Lato&display=swap");

    :root {
        --greyText: #333333;
        --greyMaxEmp: #666666;
        --greyHighEmp: #737373;
        --greyMidEmp: #8c8c8c;
        --greyLowEmp: #bfbfbf;
        --greyMinEmp: #e5e5e5;
    }

    /* --------------------------------------------------------------------------
    Setup 
    -------------------------------------------------------------------------- */
    .annotation {
        position: absolute;
        display: flex;
        flex-direction: column;
        z-index: 14;

        padding: 15px;
        max-width: 175px;
        background-size: cover;
        box-shadow: 1px 1px 6px var(--greyText);
        border-radius: 7.5px;

        font-family: "Lato", sans-serif;
        text-align: left;
        font-size: 16px;
        
    }

    /* --------------------------------------------------------------------------
    Style by theme 
    -------------------------------------------------------------------------- */

    .dark-theme {
        color: white;
        background-image: url("/images/postittexture.jpg");
        background-color: var(--greyMaxEmp);
        background-blend-mode: color-burn;
    }

    .light-theme {
        color: var(--greyText);
        background-image: url("/images/postittexture.jpg");
        background-color: var(--greyMinEmp);
        background-blend-mode: color;
    }

    .oil-theme {
        color: white;
        background-image: url("/images/oil.jpg");
        background-blend-mode: color-burn;
    }
</style>
