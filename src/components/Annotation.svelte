<script>
    import { fade } from "svelte/transition";

    export let topPos;
    export let leftPos;
    export let marginAdj;
    export let annotationText;
    export let theme = "dark";
    

    // allow selection of annotation theme
    let annotationClass;
    //theme == "dark" ? annotationClass = "dark-theme" : annotationClass = "light-theme";

    switch (theme) {
		case "dark":
            annotationClass = "dark-theme" ;
			break;
		case "light":
            annotationClass = "light-theme";
			break;
        case "oil":
            annotationClass = "oil-theme";
			break;
	}

</script>

<!-- annotation -->
<div
    class="annotation {annotationClass}"
    style="top:{topPos}px; left:{leftPos}px; {marginAdj}"
    in:fade="{{ duration: 5000 }}"
    out:fade="{{ duration: 1500 }}"
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
        padding: 15px;
        display: flex;
        flex-direction: column;
        z-index: 14;
        font-family: "Lato", sans-serif;
        border-radius: 7.5px;
        text-align: left;
        font-size: 16px;
        max-width: 150px;
        background-size: cover;
        box-shadow: 1px 1px 6px var(--greyText);
    }

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
