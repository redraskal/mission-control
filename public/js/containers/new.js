const input = document.getElementById("image");
const suggestions = document.getElementById("suggestions");
let wait = false;
let last;

const name = document.getElementById("name");
let nameEdited = false;

const form = document.querySelector("form");
const submit = form.querySelector("input[type='submit']");

function populate(images) {
    if (images.length == 0) return;
    suggestions.textContent = "";
    for (const image of images) {
        const child = document.createElement("option");
        child.value = image;
        suggestions.appendChild(child);
    }
}

input.addEventListener("keyup", () => {
    if (!nameEdited) {
        const val = `${input.value}`;
        const slash = val.indexOf("/") + 1;
        let tag = val.indexOf(":");
        if (tag == -1) tag = val.length;
        name.value = slash > 0 ? val.slice(slash, tag) : val.slice(0, tag);
    }
    if (wait || last == input.value || input.value.length < 3 || input.value.indexOf(":") > -1) return;
    wait = true;
    last = input.value;
    setTimeout(() => {
        wait = false;
        if (last != input.value && input.value.slice(-1) != ":") ws.send(input.value);
    }, 300);
    ws.send(input.value);
});

name.addEventListener("keyup", () => { nameEdited = true });

ws.addEventListener("message", (event) => {
    populate(JSON.parse(event.data));
});

form.addEventListener("submit", () => {
    submit.value = "Pulling image...";
    submit.disabled = true;
    submit.style.cursor = "wait";
});
