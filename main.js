import * as compose from "./composition.mjs";
import { assets, colors, layers } from "./assets.mjs";

const mainCanvas = document.getElementById('av');
const mainCtx = mainCanvas.getContext('2d');
var inputs = {};
var pickers = {};
var colorValues = {};
var updatingHash = false;
var ignoreUpdates = false;
var renderTimeout = -1;

async function asyncMain() {
    generateInputs();

    window.onhashchange = (e) => {
        readPonyHash(location.hash);
    };

    if (location.hash != "")
        readPonyHash(location.hash);
}

function generateInputs() {
    const parent = document.querySelector("#propsRoot");
    for (const type in assets) { // generate parts selectors
        const t = assets[type];

        const holder = document.createElement("div");
        parent.appendChild(holder);
        holder.class = "propHolder";

        const selectList = document.createElement("select");
        selectList.id = type + "Selector";
        for (const assetId in t.items) {
            selectList.appendChild(new Option(t.items[assetId].displayName, assetId));
        }
        selectList.onchange = () => update(true);
        inputs[type] = selectList;


        const label = document.createElement("label");
        holder.appendChild(label);
        label.innerText = t.displayName + ": ";
        label.htmlFor = selectList.id;

        holder.appendChild(selectList);
    }

    for (const cname in colors) {
        const c = colors[cname];
        const holder = document.createElement("div");
        parent.appendChild(holder);
        holder.class = "pickerHolder";

        const label = document.createElement("label");
        holder.appendChild(label);
        label.innerText = c.displayName + ": ";

        const code = document.createElement("span");
        code.id = cname + "Hex";
        holder.appendChild(code);
        const picker = new Picker({
            parent: holder,
            popup: 'center',
            color: 'violet',
            alpha: false,
            editorFormat: 'hex',
            onDone: function (color) {
                colorValues[cname] = color.hex;
                code.innerText = color.hex;
                code.style.backgroundColor = color.hex;
                update(true);
            },
        });

        picker.onChange = function (color) {
            if (ignoreUpdates) return;

            colorValues[cname] = color.hex;
            code.innerText = color.hex;
            code.style.backgroundColor = color.hex;
            throttledUpdate();
        }

        picker.id = cname + "Picker";
        picker.codeElement = code;
        pickers[cname] = picker;
    }
}

function readPonyHash(hash) {
    if (updatingHash) {
        console.log("Ignoring hash update")
        updatingHash = false;
        return;
    }
    try {
        ignoreUpdates = true;

        if (hash.startsWith("#"))
            hash = hash.substring(1);

        let split1 = hash.split(":");
        for (const pair of split1[0].split(";")) {
            const split2 = pair.split("=");
            if (!(assets[split2[0]]))
                throw new Error("Invalid group " + split2[0]);
            if (!(assets[split2[0]].items[split2[1]]))
                throw new Error("Invalid part " + split2[1] + " for group " + split2[0]);
            inputs[split2[0]].value = split2[1];
        }
        for (const pair of split1[1].split(";")) {
            const split2 = pair.split("=");
            const colorValue = split2[1];
            if (!(colors[split2[0]]))
                throw new Error("Invalid color " + split2[0]);
            colorValues[split2[0]] = colorValue;
            pickers[split2[0]].setColor(colorValue);
            pickers[split2[0]].codeElement.innerText = colorValue;
            pickers[split2[0]].codeElement.style.backgroundColor = colorValue;
        }
        update(false);
    } catch (e) {
        console.error(e);
    } finally {
        ignoreUpdates = false;
    }
}

function makePonyHash(props) {
    let propParts = [];
    let colorParts = [];
    for (const propName in props) {
        propParts.push(propName + "=" + props[propName]);
    }
    for (const colorName in colorValues) {
        colorParts.push(colorName + "=" + colorValues[colorName]);
    }
    return propParts.join(";") + ":" + colorParts.join(";");
}

function readProps() {
    let props = {};
    for (const type in inputs) {
        const input = inputs[type];
        props[type] = input.value;
    }
    return props;
}

function throttledUpdate() {
    if (renderTimeout != -1) return;

    renderTimeout = setTimeout(() => {
        update(false);

        renderTimeout = -1;
    }, 33)
}

function update(setHash) {
    var props = readProps();

    if (setHash) {
        var hash = makePonyHash(props);

        updatingHash = true;
        location.hash = hash;
    }

    render(props);
}

async function render(props) {
    var componentsByLayer = {};
    for (const layerName in layers) {
        componentsByLayer[layerName] = [];
    }

    for (const groupName in props) {
        const assetType = assets[groupName];
        const prop = props[groupName];
        const arr = (Array.isArray(prop)) ? prop : [prop];

        for (const assetid of arr) {
            const asset = assetType.items[assetid];

            if (asset.type == "image") {
                componentsByLayer[asset.layer].push(asset);
            }
            else if (asset.type == "composite") {
                for (const comp of asset.components) {
                    componentsByLayer[comp.layer].push(comp);
                }
            }
        }
    }

    compose.clear(mainCtx);
    for (const layerName in componentsByLayer) {
        const l = componentsByLayer[layerName];
        for (const comp of l) {
            if (comp.color) {
                await compose.drawColor(mainCtx, comp, colorValues[comp.color]);
            }
            else {
                await compose.draw(mainCtx, comp);
            }

        }
    }
}

if (document.readyState !== "loading") { asyncMain(); }
else { document.onload = asyncMain; }