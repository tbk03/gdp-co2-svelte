<div class="title-bar">
    
    <div class="title">
        <slot name="title" />
    </div>

    <div class="subtitle">
        <slot name="subtitle" />
    </div>
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

.title-bar {
    padding-top: 5px;
    padding-left: 40px;
    display: flex;
    flex-direction: column;
    z-index: 14;
    font-family: "Lato", sans-serif;
    text-align: left;
    font-size: 16px;
    max-width: 900px;
    background-size: cover;
    box-shadow: 1px 1px 6px var(--greyText);
    margin-bottom: 1rem;

    color: white;
    background-image: url("./images/oil.jpg");
    background-color: var(--greyLowEmp);
    background-blend-mode: color-burn;
}

.title{
    font-size: 1.6rem;
    margin-bottom: 0.2rem;
}

.subtitle{
    font-size: 1.2rem;
    margin-bottom: 0.4rem;
}
</style>
