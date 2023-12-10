let selectedPizza = null;
let receiver = null;

let pizzasSelected = false;
let paymentInProgress = false;

function showPizzaSelection() {
    receiver = Math.random() < 0.5 ? "Kali" : "Kaito";

    document.getElementById("pizza-selection").innerHTML = `
        <h2>${receiver}: Wählen Sie Ihre Pizza</h2>
        <form id="pizza-form">
            <label>
                <input type="checkbox" name="pizza" value="Salami"> Salami
            </label>
            <label>
                <input type="checkbox" name="pizza" value="Margherita"> Margherita
            </label>
            <label>
                <input type="checkbox" name="pizza" value="Funghi"> Funghi
            </label>
            <label>
                <input type="checkbox" name="pizza" value="Quattro Formaggi"> Quattro Formaggi
            </label>
            <label>
                <input type="checkbox" name="pizza" value="Hawaii"> Hawaii
            </label>
            <br>
            <button type="button" onclick="orderSelectedPizza()">Bestellen</button>
            <button id="say-bye-btn" onclick="sayBye()" style="display: none;">Raus gehen</button>
        </form>
    `;

    document.getElementById("order-text").textContent = `Hallo, ich bin ${receiver}. Wählen Sie Ihre Pizza:`;
    document.getElementById("pizza-selection").style.display = "block";

    document.getElementById("order-container").style.display = "none";
    document.getElementById("start-btn").style.display = "none";
}

function orderSelectedPizza() {
    const checkboxes = document.getElementsByName("pizza");
    const selectedCheckboxes = Array.from(checkboxes).filter(checkbox => checkbox.checked);

    if (selectedCheckboxes.length > 0) {
        selectedPizza = selectedCheckboxes.map(checkbox => checkbox.value).join(", ");
        if (selectedCheckboxes.length === checkboxes.length) {
            document.getElementById("order-text").innerHTML = `${receiver}: Oh Wirklich? Einmal Alles? Aber gerne doch :)<br><button onclick="showPizzaSelection()">Los Geht's</button>`;
        } else {
            document.getElementById("order-text").innerHTML = `${receiver}: Alles klar, die Pizza ${selectedPizza} kommt gleich. Einen Moment bitte.`;
        }

        document.getElementById("say-bye-btn").style.display = "none";
        pizzasSelected = true;

        setTimeout(function() {
            document.getElementById("order-text").innerHTML = `${receiver}: Möchten Sie bezahlen? <button onclick="showPayment()">Bezahlen</button>`;
            document.getElementById("say-bye-btn").style.display = "none";
        }, 1000);

    } else {
        document.getElementById("order-text").innerHTML = `${receiver}: Lass dir Zeit :)<br><button onclick="showPizzaSelection()">Los Geht's</button>`;
        pizzasSelected = false;
    }

    checkboxes.forEach(checkbox => checkbox.checked = false);

    document.getElementById("pizza-selection").style.display = "none";
    document.getElementById("order-container").style.display = "block";
}

function sayBye() {
    if (selectedPizza) {
        document.getElementById("order-text").textContent = "Auf Wiedersehen!";
        document.getElementById("say-bye-btn").style.display = "none";

        setTimeout(function() {
            window.location.href = "index.html";
        }, 5000);
    } else {
        document.getElementById("order-text").innerHTML = `${receiver}: Lass dir Zeit!<br> <button onclick="showPizzaSelection()">Los Geht's</button>`;
    }
}

function showPayment() {
    paymentInProgress = true;
    document.getElementById("order-text").innerHTML = `${receiver}: Vielen Dank! Auf Wiedersehen!<br><button onclick="goBack()">Raus gehen</button>`;
    document.getElementById("pay-btn").style.display = "none";
}

function goBack() {
    window.location.href = "index.html";
}
