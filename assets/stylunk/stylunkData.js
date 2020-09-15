var poses = {
	stand : {
		east : [0,0],
		southeast : [4,0],
		south : [8,0],
		southwest : [12,0],
		west : [0,1],
		northwest : [4,1],
		north : [8,1],
		northeast : [12,1]
	},
	dead : [0,2],
	celebrate : [1,2],
	sit : [2,2],
	seated : [3,2],
	leanleft : [4,2],
	leanright : [5,2],
	akimbo: [6,2],
	bless : [7,2],
	kneel : [8,2],
	lie : [9,2],
	angry : [10,2],
	salute : [11,2],
	bow : [12,2],
	thoughtful : [13,2],
	cry : [14,2],
	surprised : [15,2]
};

var icons = [
{
    name: 'Ghorak Zo',
    variants: [
    {
        name: 'Male',
        image: 453,
        cloakedImage: 3013
    },
    {
        name: 'Male, Unarmed',
        image: 3005,
        cloakedImage: 22
    },
	{
        name: 'Male, Alternate',
        image: 4567,
        cloakedImage: 3013
    },
    {
        name: 'Female',
        image: 460,
        cloakedImage: 3014
    },
    {
        name: 'Female, Unarmed',
        image: 3012,
        cloakedImage: 1583
    },
    {
        name: 'Female, Alternate',
        image: 3456,
        cloakedImage: 3014
    },
    /*{
        name: 'Female, Pants (Unarmed)',
        image: 4458,
        cloakedImage: 1583
    },*/
    ]
},
{
    name: 'Thoom',
    variants: [
    {
        name: 'Male',
        image: 451,
        cloakedImage: 3013
    },
    {
        name: 'Male, Unarmed',
        image: 3003,
        cloakedImage: 22
    },
	{
        name: 'Male, Alternate',
        image: 4180,
        cloakedImage: 3013
    },
    {
        name: 'Female',
        image: 458,
        cloakedImage: 3014
    },
    {
        name: 'Female, Unarmed',
        image: 3010,
        cloakedImage: 1583
    },
	{
        name: 'Female, Alternate',
        image: 4179,
        cloakedImage: 3014
    }
    ]
},
{
    name: 'Sylvan',
    variants: [
    {
        name: 'Male',
        image: 449,
        cloakedImage: 3013
    },
    {
        name: 'Male, Unarmed',
        image: 1854,
        cloakedImage: 22
    },
    {
        name: 'Female',
        image: 456,
        cloakedImage: 3014
    },
    {
        name: 'Female, Unarmed',
        image: 1853,
        cloakedImage: 1583
    }
    ]
},
{
    name: 'Dwarf',
    variants: [
    {
        name: 'Male',
        image: 452,
        cloakedImage: 3355,
		hasHelm: true
    },
    {
        name: 'Male, Unarmed',
        image: 3004,
        cloakedImage: 3324,
		hasHelm: true
    },
    {
        name: 'Male, Alternate',
        image: 1839,
        cloakedImage: 3355,
		hasHelm: true
    },
    {
        name: 'Female',
        image: 459,
        cloakedImage: 3356,
		hasHelm: true
    },
    {
        name: 'Female, Unarmed',
        image: 3011,
        cloakedImage: 3325,
		hasHelm: true
    },
    {
        name: 'Female, Alternate',
        image: 2951,
        cloakedImage: 3356,
		hasHelm: true
    },
    ]
},
{
    name: 'Human',
    variants: [
    {
        name: 'Male',
        image: 447,
        cloakedImage: 3013
    },
    {
        name: 'Male, Unarmed',
        image: 2999,
        cloakedImage: 22
    },
	{
        name: 'Male, Shoulders',
        image: 1841,
        cloakedImage: 3013
    },
    {
        name: 'Male, Slender',
        image: 2166,
        cloakedImage: 3013
    },
    {
        name: 'Female',
        image: 454,
        cloakedImage: 3014
    },
    {
        name: 'Female, Unarmed',
        image: 3006,
        cloakedImage: 1583
    },
    {
        name: 'Female, Pants',
        image: 1934,
        cloakedImage: 3014
    },
    {
        name: 'Female, Untucked',
        image: 1840,
        cloakedImage: 3014
    },
    ]
},
{
    name: 'Halfling',
    variants: [
    {
        name: 'Male',
        image: 448,
        cloakedImage: 3355
    },
    {
        name: 'Male, Unarmed',
        image: 3000,
        cloakedImage: 3324
    },
	{
        name: 'Male, Alternate',
        image: 189,
        cloakedImage: 3355
    },
    {
        name: 'Female',
        image: 455,
        cloakedImage: 3356
    },
    {
        name: 'Female, Unarmed',
        image: 3007,
        cloakedImage: 3325
    },
    {
        name: 'Female, Alternate',
        image: 1426,
        cloakedImage: 3356
    },
    ]
},
{
    name: 'Fen\'Neko',
    variants: [
    {
        name: 'Male',
        image: 450,
        cloakedImage: 3013
    },
    {
        name: 'Male, Unarmed',
        image: 3002,
        cloakedImage: 22
    },
    {
        name: 'Male, Alternate',
        image: 3665,
        cloakedImage: 3013
    },
    /*{
        name: 'Male, Alternate (Unarmed)',
        image: 4419,
        cloakedImage: 3013
    },*/
    {
        name: 'Female',
        image: 457,
        cloakedImage: 3014
    },
    {
        name: 'Female, Unarmed',
        image: 3009,
        cloakedImage: 1583
    },
    {
        name: 'Female, No Shoulders',
        image: 4404,
        cloakedImage: 3014
    },
    {
        name: 'Female, Skirt',
        image: 4513,
        cloakedImage: 3014
    },
    ]
},
{
    name: 'Undisclosed',
	cloakOnly:true,
    variants: [
    {
        name: 'Male',
        image: 3013,
		cloakedImage: 3013
    },
    {
        name: 'Male, Unarmed',
        image: 22,
		cloakedImage: 22
    },
    {
        name: 'Female',
        image: 3014,
		cloakedImage: 3014
    },
    {
        name: 'Female, Unarmed',
        image: 1583,
		cloakedImage: 1583
    },
    {
        name: 'Female, Alternate',
        image: 131,
		cloakedImage: 131
    },
    ]
}];

var underwear = [{
    name: 'Newbie',
    colors: {
        210: [204, 204, 204],
		213: [102, 102, 102],
        197: [153, 51, 0],
        185: [255, 204, 153],
        191: [204, 102, 51],
        47: [204, 204, 204],
        89: [102, 102, 102],
        202: [102, 153, 102],
        195: [153, 153, 204],
        182: [255, 204, 204],
        127: [153, 153, 204],
        170: [102, 153, 102],
    }
},
{
    name: 'Normal',
    colors: {
        210: [204, 204, 204],
		213: [102, 102, 102],
        197: [153, 51, 0],
        185: [255, 204, 153],
        191: [204, 102, 51],
        47: [204, 204, 204],
        89: [102, 102, 102],
        202: [153, 102, 51],
        195: [204, 153, 102],
        182: [255, 204, 153],
        127: [204, 153, 102],
        170: [153, 102, 51],
    }
},
{
    name: 'Taintless',
    colors: {
        210: [102, 204, 204],
		213: [0, 153, 153],
        191: [99, 156, 195],
        185: [102, 204, 204],
        197: [51, 102, 153],
        47: [102, 204, 204],
        89: [51, 102, 153],
        136: [49, 99, 156],
        202: [51, 102, 153],
        195: [102, 153, 204],
        182: [102, 204, 204],
        127: [102, 204, 204],
        170: [51, 102, 153]
    }
}];

var hair = [
{
    name: 'Black',
    colors: {
        129: [51, 0, 51],
        172: [0, 0, 51],
    }
},
{
    name: 'Charcoal',
    colors: {
        129: [51, 51, 51],
        172: [0, 0, 0],
    }
},
{
    name: 'Brown',
    colors: {
        129: [153, 102, 51],
        172: [102, 51, 0],
    }
},
{
    name: 'Red',
    colors: {
        129: [255, 102, 51],
        172: [153, 51, 0],
    }
},
{
    name: 'Bright Red',
    colors: {
        129: [255, 0, 0],
        172: [204, 0, 0],
    }
},
{
    name: 'Blond',
    colors: {
        129: [255, 204, 51],
        172: [153, 102, 0],
    }
},
{
    name: 'Ash Brown',
    colors: {
        129: [255, 204, 153],
        172: [153, 102, 51],
    }
},
{
    name: 'Dirty Blond',
    colors: {
        129: [255, 204, 51],
        172: [204, 153, 51],
    }
},
{
    name: 'Auburn',
    colors: {
        129: [204, 51, 51],
        172: [102, 0, 0],
    }
},
{
    name: 'Strawberry Blond',
    colors: {
        129: [255, 204, 0],
        172: [255, 102, 102],
    }
},
{
    name: 'Golden',
    colors: {
        129: [255, 255, 102],
        172: [255, 204, 51],
    }
},
{
    name: 'Hot Pink',
    colors: {
        129: [255, 51, 204],
        172: [255, 0, 153],
    }
},
{
    name: 'Purple',
    colors: {
        129: [204, 102, 255],
        172: [153, 102, 255],
    }
},
{
    name: 'Green',
    colors: {
        129: [102, 255, 102],
        172: [51, 204, 51],
    }
},
{
    name: 'Blue',
    colors: {
        129: [102, 204, 255],
        172: [51, 153, 255],
    }
},
{
    name: 'Multicoloured',
    colors: {
        129: [102, 204, 204],
        172: [255, 0, 0],
    }
},
{
    name: 'Highlighted',
    colors: {
        129: [255, 255, 102],
        172: [153, 51, 51],
    }
},
{
    name: 'Sandy',
    colors: {
        129: [204, 153, 102],
        172: [153, 102, 51],
    }
},
{
    name: 'White',
    colors: {
        129: [204, 255, 255],
        172: [187, 187, 187],
    }
},
{
    name: 'Gray',
    colors: {
        129: [136, 136, 136],
        172: [102, 102, 153],
    }
}]

var belt = [
{
    name: 'None',
    colors: {}
},
{
    name: 'Bard',
    colors: {
        47: [255, 204, 102],
        89: [255, 204, 51],
    }
},
{
    name: 'Artisan',
    colors: {
        47: [255, 153, 51],
        89: [255, 102, 0],
    }
},
{
    name: '3rd• Fighter',
    colors: {
        47: [204, 255, 255],
        89: [204, 204, 255],
    }
},
{
    name: '4th• Fighter',
    colors: {
        47: [0, 0, 51],
        89: [0, 0, 0],
    }
},
{
    name: '5th• Fighter',
    colors: {
        47: [153, 0, 0],
        89: [102, 0, 0],
    }
},
{
    name: '6th• Fighter',
    colors: {
        47: [0, 51, 204],
        89: [0, 0, 153],
    }
},
{
    name: '7th• Fighter',
    colors: {
        47: [102, 102, 102],
        89: [153, 153, 153],
    }
},
{
    name: 'Belt of the Wild',
    colors: {
        47: [204, 51, 0],
        89: [153, 51, 0],
    }
},
{
    name: 'Stonegirdle',
    colors: {
        47: [153, 153, 153],
        89: [51, 51, 51],
    }
},
{
    name: 'Moonless Sky',
    colors: {
        47: [102, 102, 204],
        89: [51, 51, 153],
    }
},
{
    name: 'Full Moon',
    colors: {
        47: [255, 255, 204],
        89: [255, 204, 204],
    }
}];

var shoes = [
{
    name: 'None',
    colors: {}
},
{
    name: 'Pink Slippers',
    colors: {
        136: [204, 102, 153],
    }
},
{
    name: 'Dark Brown Scuffs',
    colors: {
        136: [102, 51, 51],
    }
},
{
    name: 'Brown Loafers',
    colors: {
        136: [153, 102, 51],
    }
},
{
    name: 'Glossy White Flats',
    colors: {
        136: [204, 204, 204],
    }
},
{
    name: 'White Sneakers',
    colors: {
        136: [153, 204, 204],
    }
},
{
    name: 'Black Riding Boots',
    colors: {
        136: [0, 0, 51],
    }
},
{
    name: 'Grey Cowboy Boots',
    colors: {
        136: [102, 102, 102],
    }
},
{
    name: 'Turquoise Slides',
    colors: {
        136: [102, 204, 153],
    }
},
{
    name: 'Forest Green Huaraches',
    colors: {
        136: [51, 102, 51],
    }
},
{
    name: 'Burnt Leather Espadrilles',
    colors: {
        136: [204, 102, 51],
    }
},
{
    name: 'Orange Moccasins',
    colors: {
        136: [255, 153, 0],
    }
},
{
    name: 'Red Pumps',
    colors: {
        136: [204, 51, 51],
    }
},
{
    name: 'Blue Oxfords',
    colors: {
        136: [0, 102, 204],
    }
},
{
    name: 'Green Clogs',
    colors: {
        136: [0, 153, 51],
    }
},
{
    name: 'Purple Sandals',
    colors: {
        136: [153, 0, 204],
    }
},
{
    name: 'Gold Wing Tips',
    colors: {
        136: [204, 153, 51],
    }
}];

var skin = [
{
    name: 'Light',
    colors: {
        57: [204, 102, 51],
        15: [255, 153, 102],
        8: [255, 204, 153],
    }
},
{
    name: 'Dark',
    colors: {
        57: [102, 51, 0],
        15: [153, 102, 51],
        8: [204, 153, 102],
    }
},
{
    name: 'Pale',
    colors: {
        57: [255, 153, 153],
        15: [255, 204, 204],
        8: [255, 255, 204],
    }
},
{
    name: 'Deep Brown',
    colors: {
        57: [51, 0, 0],
        15: [102, 51, 0],
        8: [102, 51, 51],
    }
}];

var skindye = [{
    name: 'None',
	fadeSteps: 0,
    colors: { }
},{
    name: 'Light',
	fadeSteps: 7,
    colors: {
        57: [204, 102, 51],
        15: [255, 153, 102],
        8: [255, 204, 153],
    }
},
{
    name: 'Dark',
	fadeSteps: 7,
    colors: {
        57: [102, 51, 0],
        15: [153, 102, 51],
        8: [204, 153, 102],
    }
},
{
    name: 'Pale',
	fadeSteps: 7,
    colors: {
        57: [255, 153, 153],
        15: [255, 204, 204],
        8: [255, 255, 204],
    }
},
{
    name: 'Deep Brown',
	fadeSteps: 7,
    colors: {
        57: [51, 0, 0],
        15: [102, 51, 0],
        8: [102, 51, 51],
    }
},
{
    name: 'Yellowish',
	fadeSteps: 7,
    colors: {
        57: [204, 204, 51],
        15: [204, 204, 102],
        8: [255, 255, 153],
    }
},
{
    name: 'Blue',
	fadeSteps: 7,
    colors: {
        57: [51, 51, 204],
        15: [51, 102, 204],
        8: [102, 153, 255],
    }
},
{
    name: 'Green',
	fadeSteps: 7,
    colors: {
        57: [51, 102, 51],
        15: [51, 153, 51],
        8: [51, 204, 51],
    }
},
{
    name: 'Aqua',
	fadeSteps: 7,
    colors: {
        57: [0, 102, 102],
        15: [51, 153, 153],
        8: [102, 204, 204],
    }
},
{
    name: 'Purple',
	fadeSteps: 7,
    colors: {
        57: [102, 0, 204],
        15: [102, 51, 204],
        8: [153, 102, 204],
    }
},
{
    name: 'Ruddy',
	fadeSteps: 7,
    colors: {
        57: [102, 0, 0],
        15: [153, 51, 51],
        8: [204, 51, 51],
    }
},
{
    name: 'Grey',
	fadeSteps: 7,
    colors: {
        57: [51, 51, 51],
        15: [102, 102, 102],
        8: [153, 153, 153],
    }
},
{
    name: 'Black',
	fadeSteps: 7,
    colors: {
        57: [0, 0, 0],
        15: [0, 0, 51],
        8: [51, 0, 0],
    }
},
{
    name: 'Russet',
	fadeSteps: 7,
    colors: {
        57: [204, 51, 0],
        15: [255, 102, 0],
        8: [255, 102, 51],
    }
},
{
    name: 'Tawny',
	fadeSteps: 7,
    colors: {
        57: [204, 102, 0],
        15: [255, 102, 51],
        8: [255, 153, 51],
    }
},
{
    name: 'Light Green Paint',
	fadeSteps: 1,
    colors: {
        57: [0, 204, 102],
        15: [51, 255, 153],
        8: [153, 255, 204],
    }
},
{
    name: 'Light Blue Paint',
	fadeSteps: 1,
    colors: {
        57: [0, 153, 255],
        15: [51, 204, 255],
        8: [102, 204, 255],
    }
},
{
    name: 'Dark Blue Paint',
	fadeSteps: 1,
    colors: {
        57: [51, 0, 153],
        15: [51, 51, 204],
        8: [51, 102, 255],
    }
},
{
    name: 'Yellow Paint',
	fadeSteps: 1,
    colors: {
        57: [255, 204, 51],
        15: [255, 255, 51],
        8: [255, 255, 153],
    }
},
{
    name: 'Pink Paint',
	fadeSteps: 1,
    colors: {
        57: [255, 0, 204],
        15: [255, 51, 255],
        8: [255, 153, 255],
    }
},
{
    name: 'Purple Paint',
	fadeSteps: 1,
    colors: {
        57: [51, 0, 153],
        15: [102, 51, 204],
        8: [153, 102, 204],
    }
},
{
    name: 'Meshra Egg Gray',
	fadeSteps: 1,
    colors: {
        57: [51, 51, 0],
        15: [102, 102, 0],
        8: [153, 153, 102],
    }
}];

var shirt = [
{
    name: 'None',
	category: null,
    colors: {}
},
{
    name: 'Tan',
	category: 'General',
    colors: {
        195: [204, 153, 102],
        182: [255, 204, 153],
        202: [153, 102, 51],
    }
},
{
    name: 'Blue',
	category: 'General',
    colors: {
        195: [51, 51, 153],
        182: [102, 102, 204],
        202: [0, 0, 102],
    }
},
{
    name: 'Muddy Forest',
	category: 'General',
    colors: {
        195: [102, 102, 0],
        182: [153, 102, 0],
        202: [102, 51, 51],
    }
},
{
    name: 'Forest Green',
	category: 'General',
    colors: {
		182: [0, 153, 0],
        195: [0, 102, 0],
        202: [0, 51, 0],
    }
},
/*{
    name: 'Woodland Green',
    colors: {
        195: [0, 0, 0],
        182: [0, 0, 0],
        202: [0, 0, 0],
    }
},*/
{
    name: 'Grassy Green',
	category: 'General',
    colors: {
        195: [51, 204, 102],
        182: [102, 255, 153],
        202: [0, 153, 51],
    }
},
{
    name: 'Grey',
	category: 'General',
    colors: {
        195: [102, 102, 102],
        182: [153, 153, 153],
        202: [51, 51, 51],
    }
},
{
    name: 'Muddy Yellow',
	category: 'General',
    colors: {
        195: [204, 204, 102],
        182: [153, 102, 0],
        202: [153, 102, 0],
    }
},
{
    name: 'Gold',
	category: 'Historical',
    colors: {
		182: [255, 255, 102],
        195: [255, 204, 51],
        202: [204, 153, 0],
    }
},
{
    name: 'Albino Maha Fur',
	category: 'General',
    colors: {
        195: [153, 153, 153],
        182: [102, 102, 102],
        202: [204, 204, 204],
    }
},
{
    name: 'Puma Skin',
	category: 'General',
    colors: {
        195: [51, 51, 51],
        182: [153, 153, 153],
        202: [0, 0, 0],
    }
},
{
    name: 'Purple',
	category: 'General',
    colors: {
        195: [102, 0, 153],
        182: [153, 51, 204],
        202: [51, 0, 102],
    }
},
{
    name: 'White',
	category: 'Healer',
    colors: {
        195: [204, 204, 204],
        182: [204, 255, 255],
        202: [204, 204, 255],
    }
},
{
    name: 'Turquoise (3rd•)',
	category: 'Healer',
    colors: {
        195: [102, 204, 153],
        182: [153, 255, 255],
        202: [51, 102, 102],
    }
},
{
    name: 'Sea Wheat (5th•)',
	category: 'Healer',
    colors: {
        195: [51, 204, 153],
        182: [255, 204, 102],
        202: [51, 102, 255],
    }
},
{
    name: 'Mossy Lavender (7th•)',
	category: 'Healer',
    colors: {
        195: [153, 102, 255],
        182: [0, 204, 102],
        202: [51, 0, 255],
    }
},
{
    name: 'Ice Blue',
	category: 'Carnival',
    colors: {
		182: [51, 204, 255],
        195: [51, 102, 255],
        202: [0, 0, 204],
    }
},
{
    name: 'Bright Green',
	category: 'Carnival',
    colors: {
		182: [255, 255, 51],
        195: [102, 204, 51],
        202: [0, 153, 0],
    }
},
{
    name: 'Bright Sunrise',
	category: 'Carnival',
    colors: {
		182: [255, 204, 51],
        195: [255, 153, 0],
        202: [204, 0, 0],
    }
},
{
    name: 'Newbie Orange',
	category: 'Historical',
    colors: {
        195: [255, 153, 102],
        182: [255, 204, 153],
        202: [204, 102, 51],
    }
},
{
    name: 'Bloodshroud',
	category: 'Special',
	cloakOnly: true,
	locked: true,
    colors: {
        195: [102, 0, 0],
        182: [153, 51, 51],
        202: [51, 0, 0],
    }
},
{
    name: 'Lava Cloak',
	category: 'Special',
	cloakOnly: true,
	locked: true,
    colors: {
        195: [153, 51, 0],
        182: [204, 102, 51],
        202: [102, 0, 0],
    }
},
{
    name: 'Red Team',
	category: 'Special',
	locked: true,
    colors: {
        195: [204, 51, 51],
        182: [255, 0, 0],
        202: [153, 0, 0],
    }
},
{
    name: 'Blue Team',
	category: 'Special',
	locked: true,
    colors: {
        195: [51, 51, 204],
        182: [0, 0, 255],
        202: [0, 0, 153],
    }
},
{
    name: 'Yellow Team',
	category: 'Special',
	locked: true,
    colors: {
        195: [204, 204, 51],
        182: [255, 255, 51],
        202: [153, 153, 0],
    }
},
{
	name: 'Silk',
	category: 'General',
	colors: {
		182: [ 255, 255, 204 ],
        195: [255, 204, 204],
        202: [ 204, 153, 153 ]
	}
},
{
	name: 'Mountain Goat',
	category: 'General',
	colors: {
		182: [ 255, 204, 204 ],
        195: [204, 153, 102],
        202: [ 102, 102, 102 ]
	}
},
{
	name: 'Woodland Green',
	category: 'General',
	colors: {
		182: [ 102, 204, 102 ],
        195: [ 153, 102, 51],
        202: [ 51, 102, 0 ]
	}
},
{
	name: 'Bright Sunset',
	category: 'Carnival',
	colors: {
		182: [ 255, 153, 102 ],
        195: [ 204, 51, 102 ],
        202: [ 51, 0, 102 ]
	}
},
{
	name: 'Thundercloud',
	category: 'Carnival',
	colors: {
		182: [ 102, 153, 204 ],
        195: [51, 51, 51],
        202: [ 0, 0, 51 ]
	}
},
{
	name: 'Bubblegum',
	category: 'Carnival',
	colors: {
		182: [ 255, 204, 204 ],
        195: [ 255, 102, 255],
        202: [ 102, 0, 102 ]
	}
}
]
 var pants = [
{
    name: 'None',
    colors: {}
},
{
    name: 'Tan',
	category: 'General',
    colors: {
        127: [204, 153, 102],
        170: [153, 102, 51],
    }
},
{
    name: 'Blue',
	category: 'General',
    colors: {
        127: [51, 51, 153],
        170: [0, 0, 102],
    }
},
{
    name: 'Forest Green',
	category: 'General',
    colors: {
        127: [0, 102, 0],
        170: [0, 51, 0],
    }
},
{
    name: 'Grey',
	category: 'General',
    colors: {
        127: [153, 153, 153],
        170: [51, 51, 51],
    }
},
{
    name: 'Muddy Yellow',
	category: 'General',
    colors: {
        127: [204, 204, 102],
        170: [153, 102, 0],
    }
},
{
    name: 'Gold',
	category: 'Historical',
    colors: {
        127: [255, 204, 51],
        170: [255, 153, 0],
    }
},
{
    name: 'Albino Maha Fur',
	category: 'General',
    colors: {
        127: [102, 102, 102],
        170: [204, 204, 204],
    }
},
{
    name: 'Puma Skin',
	category: 'General',
    colors: {
        127: [102, 102, 102],
        170: [0, 0, 0],
    }
},
{
    name: 'Brown',
	category: 'General',
    colors: {
        127: [153, 102, 51],
        170: [102, 51, 0],
    }
},
{
    name: 'White (2nd•)',
	category: 'Healer',
    colors: {
        127: [204, 255, 255],
        170: [204, 204, 204],
    }
},
{
    name: 'Turquoise (4th•)',
	category: 'Healer',
    colors: {
        127: [102, 204, 153],
        170: [51, 102, 102],
    }
},
{
    name: 'Sea Wheat (6th•)',
	category: 'Healer',
    colors: {
        127: [51, 204, 153],
        170: [51, 102, 255],
    }
},
{
    name: 'Ocean Blue (8th•)',
	category: 'Healer',
    colors: {
        127: [153, 102, 255],
        170: [51, 0, 255],
    }
},
{
    name: 'Newbie Orange',
	category: 'Historical',
    colors: {
        127: [255, 153, 102],
        170: [204, 102, 51],
    }
},
{
	name: 'Silk',
	category: 'General',
	colors: {
		127: [ 255, 255, 204 ],
        170: [ 204, 153, 153 ]
	}
},
{
	name: 'Gathering Dusk',
	category: 'Estuary Collection',
	colors: {
		127: [ 51, 153, 204 ],
        170: [ 51, 51, 102 ]
	}
},
{
	name: 'Mirror Pond',
	category: 'Estuary Collection',
	colors: {
		127: [ 51, 153, 204 ],
        170: [ 102, 102, 102 ]
	}
},
{
	name: 'Bruised Sapphire',
	category: 'Estuary Collection',
	colors: {
		127: [ 0, 102, 204 ],
        170: [ 51, 51, 51 ]
	}
},
{
	name: 'Floodwater',
	category: 'Estuary Collection',
	colors: {
		127: [ 0, 102, 153 ],
        170: [ 51, 51, 51 ]
	}
},
{
	name: 'Deep Sea Ebony',
	category: 'Estuary Collection',
	colors: {
		127: [ 51, 153, 204 ],
        170: [ 0, 0, 51 ]
	}
}
];

var helm = [{
    name: 'None',
    colors: {}
},
{
	name:'Blue',
	colors: {
		185: [0,0,255],
		191: [0,0,204],
		197: [0,51,153]
	}
},
{
	name:'Red',
	colors: {
		185: [255,0,0],
		191: [204,0,0],
		197: [153,0,0]
	}
},
{
	name:'Gray',
	colors: {
		185: [153,153,153],
		191: [102,102,102],
		197: [51,51,51]
	}
}
];

var weapon = [{
	name: 'Cerulean Blue',
	colors: {
		194: [ 0, 153, 153 ],
		180: [ 0, 255, 255 ],
	}
},
{
	name: 'Iron',
	colors: {
		194: [153,153,153],
		180: [153,153,255],
	}
},
{
	name: 'Dark Grey',
	colors: {
		194: [ 51, 51, 0 ],
		180: [ 51, 51, 51 ],
	}
},
{
	name: 'Black',
	colors: {
		194: [ 0, 0, 0 ],
		180: [ 0, 0, 0 ],
		137: [ 0, 0, 0 ]
	}
},
];
