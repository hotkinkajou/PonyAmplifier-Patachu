export const layers =
{
    "background": {},
    "accessory-back": {},
    "body-back": {},
    "mane-back": {},
    "body": {},
    "body-markings": {},
    "mane-side": {},
    "inmouth": {},
    "mouth": {},
    "ear": {},
    "horn": {},
    "mane-top": {},
    "accessory-top": {}
}

export const colors =
{
    "mane1": { "displayName": "Mane main" },
    "mane2": { "displayName": "Mane secondary" },
    "coat1": { "displayName": "Coat" },
    "eye": { "displayName": "Eye" },
    "bg1": { "displayName": "Background tint" },
    "acc1": { "displayName": "Accessory" },
    "flag1": { "displayName": "Flag 1" },
    "flag2": { "displayName": "Flag 2" },
    "flag3": { "displayName": "Flag 3" },
}

function init() {
    // normalizing assets
    for (const typeName in assets) {
        const type = assets[typeName];
        for (const itemName in type.items) {
            const item = type.items[itemName];
            if (!item.type) item.type = "image";
            if (!item.layer) item.layer = type.layer;
            if (!item.color) item.color = type.color;
            if (!item.displayName) item.displayName = itemName;

            if (item.components) {
                for (const comp of item.components) {
                    if (!comp.layer) comp.layer = item.layer;
                    if (!comp.color && comp.color !== null) comp.color = item.color;
                }
            }
        }
    }
}

export const assets =
{
    "background": {
        "displayName": "Backgrounds",
        "layer": "background",
        "color": "bg1",
        "items":
        {
            "none": {
                "displayName": "Transparent background",
                "type": "composite", "components": []
            },
            "simple": {
                "displayName": "Simple color",
                "url": "assets/background/simple.png"
            }
        }
    },
    "body": {
        "displayName": "Body type",
        "layer": "body",
        "color": "coat1",
        "items":
        {
            "pony": {
                "displayName": "Pony",
                "type": "composite",
                "components":
                    [
                        { "url": "assets/body/ear-back.png", "layer": "body-back" },
                        { "url": "assets/body/eyeball.png", "color": null },
                        { "url": "assets/body/eyes.png", "color": "eye" }, { "url": "assets/body/head-base.png" },
                        { "url": "assets/body/ear-front.png", "layer": "ear" },
                        { "url": "assets/body/mouth.png", "layer": "mouth" }
                    ]
            },
            "unicorn": {
                "displayName": "Unicorn",
                "type": "composite",
                "components":
                    [
                        { "url": "assets/body/ear-back.png", "layer": "body-back" },
                        { "url": "assets/body/eyeball.png", "color": null },
                        { "url": "assets/body/eyes.png", "color": "eye" },
                        { "url": "assets/body/head-base.png" },
                        { "url": "assets/body/ear-front.png", "layer": "ear" },
                        { "url": "assets/body/horn.png", "layer": "horn" },
                        { "url": "assets/body/mouth.png", "layer": "mouth" }
                    ]
            },
        }
    },
    "mane": {
        "displayName": "Manestyles",
        "layer": "mane-top",
        "color": "mane1",
        "items":
        {
            "alpha": {
                "displayName": "Alpha",
                "type": "composite",
                "components":
                    [
                        {
                            "url": "assets/mane/hair-2-side.png",
                            "layer": "mane-side"
                        },
                        {
                            "url": "assets/mane/hair-2-top.png",
                            "layer": "mane-top"
                        }
                    ]
            },
            "sigma": {
                "displayName": "Sigma",
                "type": "composite",
                "components":
                    [
                        {
                            "url": "assets/mane/hair-1-back.png",
                            "layer": "mane-back",
                            "color": "mane2"
                        },
                        {
                            "url": "assets/mane/hair-1-side.png",
                            "layer": "mane-side"
                        },
                        {
                            "url": "assets/mane/hair-1-top.png",
                            "layer": "mane-top"
                        }
                    ]
            },
        }
    },
    "flag": {
        "displayName": "Flag",
        "layer": "accessory-back",
        "color": "acc1",
        "items":
        {
            "none": {
                "displayName": "None",
                "type": "composite", "components": []
            },
            "one": {
                "displayName": "One color",
                "type": "composite",
                "components":
                    [
                        { "url": "assets/flag-back.png" },
                        { "url": "assets/flag.png", "color": "flag1" },
                        { "url": "assets/flag-front.png", "layer": "inmouth" }
                    ]
            },
            "two": {
                "displayName": "Two colors",
                "type": "composite",
                "components":
                    [
                        { "url": "assets/flag-back.png" },
                        { "url": "assets/flag.png", "color": "flag1" },
                        { "url": "assets/flag-half.png", "color": "flag2" },
                        { "url": "assets/flag-front.png", "layer": "inmouth" }
                    ]
            },
            "three": {
                "displayName": "Three colors",
                "type": "composite",
                "components":
                    [
                        { "url": "assets/flag-back.png" },
                        { "url": "assets/flag.png", "color": "flag1" },
                        { "url": "assets/flag-twothird.png", "color": "flag2" },
                        { "url": "assets/flag-third.png", "color": "flag3" },
                        { "url": "assets/flag-front.png", "layer": "inmouth" }
                    ]
            },
            "twovert": {
                "displayName": "Two colors, vertical",
                "type": "composite",
                "components":
                    [
                        { "url": "assets/flag-back.png" },
                        { "url": "assets/flag.png", "color": "flag1" },
                        { "url": "assets/flag-verthalf.png", "color": "flag2" },
                        { "url": "assets/flag-front.png", "layer": "inmouth" }
                    ]
            },
        }
    },
    "snowpitys": {
        "displayName": "Snowpitys",
        "items":
        {
            "hefty": {
                "displayName": "Hefty",
                "type": "composite",
                "components": []
            },
            "sultry": {
                "displayName": "Sultry",
                "type": "composite",
                "components": []
            },
            "cozy": {
                "displayName": "Cozy",
                "type": "composite",
                "components": []
            }
        }
    }
}


init();