<div class="footer-bar">
    <div class="footer">
        <slot name="footer" />
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
        --greyUltraMinEmp: #f1f1f1;
    }

    .footer-bar {
        padding: 5px;
        display: flex;
        flex-direction: column;
        z-index: 14;
        font-family: "Lato", sans-serif;
        text-align: right;
        max-width: 900px;
        background-size: cover;
        margin-top: 1.2rem;
        color: var(--greyText);
    }

    .footer {
        font-size: 1.1rem;
    }
</style>
