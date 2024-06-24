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
        if (hasUpgrade('p', 14)) mult = mult.times(upgradeEffect('p', 14))
            return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        exp = exp.times(1);
        return exp;
     },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    passiveGeneration() { return (hasMilestone("e", 0)) },
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
            title: "Self-Mult",
            description: "Multiplies your point gain according to your points.",
            cost: new Decimal(4),
            effect() {
                if  (hasUpgrade('p', 21)) return player.points.add(1).pow(0.15).add(1).pow(1.01)
                else return player.points.add(1).pow(0.15) 
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        14: {
            title: "Reverse Synergy-Mult",
            description: "Multiplies your prestige point gain according to your points.",
            cost: new Decimal(8),
            effect() {
                return player.points.add(1).pow(0.15).pow(buyableEffect('e', 11))
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }
        },
        21: {
            title: "Self-Mult Boost",
            description: "RAISES YOUR SELF-MULT TO THE POWER OF 1.2!!!111!!!!1!1!!!!!11!! WOOOOOOOOHHHOOOOOOOO (i have autism).",
            cost: new Decimal(30),
        },
        22:{
            title: "Exp",
            description: "RAISES YOUR POINT GAIN TO THE POWER OF 1.2!!!!!11111!!!111!!!1!!1!!11 YAAAAAYAYAYYYAYYYYYYY (i have autism pt.2).",
            cost: new Decimal(100),
            unlocked() { let SDRedstone = false
                if (hasMilestone('e', 0)) SDRedstone = true
                return SDRedstone
            }
        }
    },

    
}
)










addLayer("e", {
    branches: ['p'],
    name: "exponent", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "EX", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
            }},
    color(){let abcdefg ="#44f"
        if (player.e.unlocked) abcdefg ="#44f"
        return abcdefg 
    } ,
    requires() { 
        let x = new Decimal(50)
        return x.times(player[this.layer].points.pow(3).plus(1))}, // Can be a function that takes requirement increases into account
    resource: "exponent points", // Name of prestige currency
    baseResource: "prestige points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.3, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
            return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        return exp;
     },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "e", description: "EX: Reset for exponent points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.p.unlocked},
    
    buyables: {
        11: {title: "Reverse Synergy Boost",
            cost() 
            { return new Decimal(10).times(new Decimal(3.8).pow(new Decimal(2).pow(player[this.layer].buyables[this.id]))).floor().sub(37)},
            
    canAfford() { return player[this.layer].points.gte(this.cost()) },
    buy() {
        player.e.points = player.e.points.sub(this.cost())
        setBuyableAmount('e', 11, getBuyableAmount('e', 11).add(1))
    }, 
    effect() {
        return player.e.buyables[11].times(0.1).plus(1).log(2).plus(1)
    },
    display() { // Everything else displayed in the buyable button after the title
                let display = "Amount: " + player[this.layer].buyables[this.id] +
                 "<br> Cost: " + new Decimal(10).times(new Decimal(3.8).pow(new Decimal(2).pow(player[this.layer].buyables[this.id]))).floor().sub(37) +
                 '<br> Currently: ^' + buyableEffect('e', 11)
                return display
                
    },
    
}
,
}
,









upgrades: { 
    11:{
     title:'Another Exponent?!',
     description: 'Raises point gain to the 1.2th power',
     cost: new Decimal(3)
    },
    12:{
        title: 'Exponent 2?!',
        description: 'Raises point gain to the 1.2th power',
        cost: new Decimal(6)
       },
},
milestones: {
    0: {
        requirementDescription: "8 Exponent Points",
       
        done() { return player.e.points.gte(8) },
    effectDescription: "Generate 100% of prestige points gain per second",

     
}
}
})





