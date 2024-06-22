addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#0ff",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('p', 13)) mult = mult.times(upgradeEffect('p', 13))
        if (hasUpgrade('p', 14)) mult = mult.times(upgradeEffect('p', 14))
            return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        if (hasUpgrade("p", 25)) exp = exp.times(1.25);
        return exp;
     },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            title: "Mult",
            description: "Multiplies your point gain by 2.",
            cost: new Decimal(1),
        },
        12: {
            title: "Prestige Synergy-Mult",
            description: "Multiplies your point gain according to your prestige points.",
            cost: new Decimal(2),
            effect() {
                return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        
        },
        13: {
            title: "Prestige Self-Mult",
            description: "Multiplies your prestige point gain according to your prestige points.",
            cost: new Decimal(4),
            effect() {
                return player[this.layer].points.add(1).pow(0.15)
            },
        },
        14: {
            title: "Reverse Synergy-Mult",
            description: "Multiplies your prestige point gain according to your points.",
            cost: new Decimal(8),
            effect() {
                return player.points.add(1).pow(0.15)
            },
        },
        25: {
            title: "Exp",
            description: "RAISES YOUR PRESTIGE INCOME TO THE POWER OF 1.25!!!111!!!!1!1!!!!!11!! WOOOOOOOOHHHOOOOOOOO (i have autism).",
            cost: new Decimal(30),
        }
    },
}
)
