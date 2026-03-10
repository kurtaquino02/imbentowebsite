// ═══════════════════════════════════════════════════════════════
// PRODUCTS DATABASE — API-Ready Format
// 
// For Laravel transition: Replace this with API endpoint
//   const res = await fetch('/api/products')
//   const productsDB = await res.json()
//
// This maintains the same structure your API will return.
// ═══════════════════════════════════════════════════════════════

const productsDB = [
    {
        id: 101,
        name: 'Safety Wet Floor Sign',
        price: 700,
        oldPrice: 1200,
        category: 'Home & Decor',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
        gallery: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200', 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=200'],
        subtitle: 'Filipino-engineered double-sided caution sign with anti-slip base.',
        stars: 4.9,
        reviewCount: 28,
        stock: 'In Stock',
        seller: { name: 'SafetyPro PH', rating: 4.9, location: 'Quezon City' }
    },
    {
        id: 102,
        name: 'Herbal Muscle Relief Balm',
        price: 450,
        category: 'Health & Wellness',
        image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400',
        gallery: ['https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=200', 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=200'],
        subtitle: 'Made from 100% organic Lagundi and Sambong extracts.',
        stars: 5.0,
        reviewCount: 2400,
        stock: 'In Stock',
        seller: { name: 'HerbalPH', rating: 5.0, location: 'Davao City' }
    },
    {
        id: 103,
        name: 'Solar Garden Lamp',
        price: 950,
        oldPrice: 1500,
        category: 'Lighting',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        gallery: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200'],
        subtitle: 'Eco-friendly lighting for your garden.',
        stars: 4.8,
        reviewCount: 510,
        stock: 'In Stock',
        seller: { name: 'EcoLight PH', rating: 4.8, location: 'Laguna' }
    },
    {
        id: 104,
        name: 'Bamboo Shelf Organizer',
        price: 380,
        category: 'Organization',
        image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400',
        gallery: ['https://images.unsplash.com/photo-1544816155-12df9643f363?w=200'],
        subtitle: 'Minimalist bamboo shelf to declutter your space.',
        stars: 4.9,
        reviewCount: 1850,
        stock: 'In Stock',
        seller: { name: 'BambooCrafts', rating: 4.9, location: 'Pampanga' }
    },
    {
        id: 105,
        name: 'Stainless Steel Water Bottle',
        price: 550,
        oldPrice: 850,
        category: 'Sports & Outdoors',
        image: 'https://images.unsplash.com/photo-1565084888279-aca648b3b250?w=400',
        gallery: ['https://images.unsplash.com/photo-1565084888279-aca648b3b250?w=200'],
        subtitle: 'Keeps drinks cold for 24 hours, hot for 12 hours.',
        stars: 4.9,
        reviewCount: 3200,
        stock: 'In Stock',
        seller: { name: 'HydroGear', rating: 4.9, location: 'Manila' }
    },
    {
        id: 106,
        name: 'Organic Cotton Bedsheet Set',
        price: 1200,
        category: 'Bedding',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400',
        gallery: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200'],
        subtitle: '100% organic cotton, hypoallergenic and breathable.',
        stars: 4.8,
        reviewCount: 920,
        stock: 'In Stock',
        seller: { name: 'PureComfort', rating: 4.8, location: 'Cebu' }
    },
    {
        id: 107,
        name: 'Portable Phone Charger 20000mAh',
        price: 680,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400',
        gallery: ['https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=200'],
        subtitle: 'Fast charging with dual ports.',
        stars: 4.7,
        reviewCount: 1540,
        stock: 'In Stock',
        seller: { name: 'TechHub', rating: 4.7, location: 'Batangas' }
    },
    {
        id: 108,
        name: 'Natural Face Moisturizer',
        price: 380,
        category: 'Beauty & Personal Care',
        image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400',
        gallery: ['https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=200'],
        subtitle: 'Made with natural oils and botanical extracts.',
        stars: 4.9,
        reviewCount: 2100,
        stock: 'In Stock',
        seller: { name: 'PureNature', rating: 4.9, location: 'Batangas' }
    },
    {
        id: 109,
        name: 'Leather Kitchen Apron',
        price: 450,
        category: 'Home & Decor',
        image: 'https://images.unsplash.com/photo-1596040299828-3e2ca5e9c8f8?w=400',
        gallery: ['https://images.unsplash.com/photo-1596040299828-3e2ca5e9c8f8?w=200'],
        subtitle: 'Premium leather with multiple pockets.',
        stars: 4.8,
        reviewCount: 680,
        stock: 'In Stock',
        seller: { name: 'ChefStyle', rating: 4.8, location: 'Manila' }
    },
    {
        id: 110,
        name: 'Natural Moisturizing Bar Soap',
        price: 250,
        oldPrice: 380,
        category: 'Beauty & Personal Care',
        image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400',
        gallery: ['https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=200'],
        subtitle: 'Gentle on skin, made from natural ingredients.',
        stars: 4.9,
        reviewCount: 3500,
        stock: 'In Stock',
        seller: { name: 'PureNature', rating: 4.9, location: 'Batangas' }
    }
];
    {
        id: 105,
        name: 'Men\'s Prestige Perfume',
        price: 700,
        category: 'Beauty',
        image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400',
        gallery: ['https://images.unsplash.com/photo-1541643600914-78b084683601?w=200', 'https://images.unsplash.com/photo-1594035900144-17fc749df9d9?w=200'],
        subtitle: 'A long-lasting fragrance that embodies confidence and sophistication. Locally blended.',
        stars: 4.8,
        reviewCount: 920,
        stock: 'Low Stock',
        seller: { name: 'ScentManila', avatar: 'S', rating: 4.7, productsSold: 800, memberSince: '2024', location: 'Manila' },
        specs: [
            { key: 'Volume', val: '100ml' },
            { key: 'Type', val: 'Eau de Parfum' },
            { key: 'Scent Profile', val: 'Aquatic, Woody' }
        ],
        variants: [],
        reviews: []
    },
     {
        id: 201,
        name: 'Virgin Coconut Oil',
        price: 250,
        category: 'Health',
        image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=400',
        gallery: ['https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=200', 'https://images.unsplash.com/photo-1585232351009-aa14e20d9f8e?w=200'],
        subtitle: 'Pure, cold-pressed virgin coconut oil for cooking, skincare, and hair care.',
        stars: 5.0,
        reviewCount: 432,
        stock: 'In Stock',
        seller: { name: 'CocoBest', avatar: 'C', rating: 4.9, productsSold: 1500, memberSince: '2022', location: 'Quezon Province' },
        specs: [
             { key: 'Volume', val: '250ml' },
             { key: 'Process', val: 'Cold Pressed' },
             { key: 'Origin', val: 'Quezon Province' }
        ],
        variants: [],
        reviews: []
    },
    {
        id: 202,
        name: 'Davao Dark Chocolate',
        price: 180,
        category: 'Food',
        image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400',
        gallery: ['https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=200', 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=200'],
        subtitle: 'Premium single-origin dark chocolate from Davao. Rich, intense, and ethically sourced.',
        stars: 4.9,
        reviewCount: 389,
        stock: 'In Stock',
        seller: { name: 'DavaoCacao', avatar: 'D', rating: 4.9, productsSold: 2200, memberSince: '2021', location: 'Davao City' },
         specs: [
             { key: 'Cocoa Content', val: '70%' },
             { key: 'Weight', val: '100g' },
             { key: 'Origin', val: 'Davao City' }
        ],
        variants: [],
        reviews: []
    },
    {
        id: 203,
        name: 'Cebu Dried Mangoes',
        price: 320,
        category: 'Food',
        image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400',
        gallery: ['https://images.unsplash.com/photo-1553279768-865429fa0078?w=200', 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=200'],
        subtitle: 'The world-famous dried mangoes from Cebu. Sweet, chewy, and naturally delicious.',
        stars: 5.0,
        reviewCount: 312,
        stock: 'In Stock',
        seller: { name: 'CebuSweets', avatar: 'M', rating: 5.0, productsSold: 4000, memberSince: '2020', location: 'Cebu City' },
         specs: [
             { key: 'Weight', val: '200g' },
             { key: 'Ingredients', val: 'Mango, Sugar' },
             { key: 'Origin', val: 'Cebu' }
        ],
        variants: [],
        reviews: []
    },
    {
        id: 106,
        name: 'Eco Mop Set',
        price: 550,
        category: 'Cleaning',
        image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400',
        gallery: ['https://images.unsplash.com/photo-1563453392212-326f5e854473?w=200', 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=200'],
        subtitle: 'Eco-friendly cleaning solution. Durable, efficient, and made from sustainable materials.',
        stars: 4.6,
        reviewCount: 120,
        stock: 'In Stock',
        seller: { name: 'CleanGreen', avatar: 'C', rating: 4.7, productsSold: 500, memberSince: '2023', location: 'Cavite' },
        specs: [
            { key: 'Handle', val: 'Bamboo' },
            { key: 'Head', val: 'Microfiber & Cotton' },
            { key: 'Bucket', val: 'Includes wringer' }
        ],
        variants: [],
        reviews: []
    },
    {
        id: 107,
        name: 'Rattan Planter',
        price: 1200,
        category: 'Home Decor',
        image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400',
        gallery: ['https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=200', 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=200'],
        subtitle: 'Handwoven rattan planter basket. Adds a touch of nature and elegance to your indoor plants.',
        stars: 4.9,
        reviewCount: 85,
        stock: 'In Stock',
        seller: { name: 'NativeCrafts', avatar: 'N', rating: 4.9, productsSold: 320, memberSince: '2022', location: 'Cebu City' },
        specs: [
            { key: 'Material', val: 'Natural Rattan' },
            { key: 'Diameter', val: '30cm' },
            { key: 'Height', val: '35cm' }
        ],
        variants: [],
        reviews: []
    },
    {
        id: 110,
        name: 'Natural Moisturizing Bar Soap',
        price: 250,
        oldPrice: 380,
        category: 'Beauty',
        image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400',
        gallery: ['https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=200', 'https://images.unsplash.com/photo-1600857062241-98e5dba7f214?w=200'],
        subtitle: 'Handmade organic soap with essential oils. Moisturizes and nourishes skin.',
        stars: 4.2,
        reviewCount: 41,
        stock: 'In Stock',
        seller: { name: 'PureNature', avatar: 'P', rating: 4.5, productsSold: 200, memberSince: '2023', location: 'Batangas' },
        specs: [{ key: 'Scent', val: 'Floral' }, { key: 'Weight', val: '135g' }],
        variants: [],
        reviews: []
    },
    {
        id: 111,
        name: 'Smart Cable Organizer',
        price: 700,
        category: 'Technology',
        image: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?w=400',
        gallery: ['https://images.unsplash.com/photo-1588508065123-287b28e013da?w=200', 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=200'],
        subtitle: 'Keep your desk tidy with this smart cable management solution.',
        stars: 4.0,
        reviewCount: 15,
        stock: 'In Stock',
        seller: { name: 'TechEase', avatar: 'T', rating: 4.3, productsSold: 80, memberSince: '2024', location: 'Makati City' },
        specs: [{ key: 'Material', val: 'Silicone' }, { key: 'Colors', val: 'Black, White' }],
        variants: [],
        reviews: []
    },
    {
        id: 112,
        name: 'Handwoven Fabric Tote Bag',
        price: 580,
        category: 'Fashion',
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400',
        gallery: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200', 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200'],
        subtitle: 'Traditional handwoven fabric transformed into a stylish tote bag.',
        stars: 5.0,
        reviewCount: 89,
        stock: 'In Stock',
        seller: { name: 'WovenPh', avatar: 'W', rating: 4.9, productsSold: 400, memberSince: '2021', location: 'Pampanga' },
        specs: [{ key: 'Material', val: 'Cotton Blend' }, { key: 'Size', val: 'Medium' }],
        variants: [],
        reviews: []
    },
    {
        id: 113,
        name: 'Organic Calamansi Jam',
        price: 320,
        category: 'Food',
        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400',
        gallery: ['https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=200', 'https://images.unsplash.com/photo-1587049332298-1c42e83937a7?w=200'],
        subtitle: 'Sweet and tangy calamansi jam made from organic farm-fresh fruits.',
        stars: 4.5,
        reviewCount: 53,
        stock: 'In Stock',
        seller: { name: 'FarmFresh', avatar: 'F', rating: 4.8, productsSold: 150, memberSince: '2023', location: 'Quezon Province' },
        specs: [{ key: 'Weight', val: '250g' }, { key: 'Ingredients', val: 'Calamansi, Sugar' }],
        variants: [],
        reviews: []
    },
    {
        id: 114,
        name: 'Burnay Clay Decorative Pot',
        price: 1200,
        category: 'Art',
        image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400',
        gallery: ['https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=200', 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=200'],
        subtitle: 'Authentic Burnay clay pot, handcrafted by master potters.',
        stars: 5.0,
        reviewCount: 44,
        stock: 'In Stock',
        seller: { name: 'ClayWorks', avatar: 'C', rating: 5.0, productsSold: 90, memberSince: '2020', location: 'Vigan, Ilocos Sur' },
        specs: [{ key: 'Material', val: 'Clay' }, { key: 'Height', val: '40cm' }],
        variants: [],
        reviews: []
    }
];

function getProductById(id) {
    return productsDB.find(p => p.id === parseInt(id));
}
