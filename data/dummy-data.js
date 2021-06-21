import Category from '../models/category';
import Product from '../models/product';

export const CATEGORIES = [
    new Category('c1', 'Smartphones', '#f5428d'),
    new Category('c2', 'TVs & Streaming Device', '#f54242'),
    new Category('c3', 'Laptops', '#f5a442'),
    new Category('c4', 'Power Banks', '#f5d142'),
    new Category('c5', 'Smart Wearables', '#368dff'),
    new Category('c6', 'Audio', '#41d95d'),
    new Category('c7', 'Home', '#9eecff'),
    new Category('c8', 'Lifestyle', '#b9ffb0'),
    new Category('c9', 'Luggage & Backpacks', '#ffc7ff'),
    new Category('c10', 'Chargers & Cables', '#47fced'),
    new Category('c11', 'Cases & Protectors', '#47fced'),
    new Category('c12', 'Combos', '#47fced'),
];

export const PRODUCTS = [
  new Product(
    'p1',
    'u1',
    'c1',
    'Mi 11 Ultra 5G',
    'https://i02.appmifile.com/362_operator_in/23/04/2021/b23987f4a6605e2f4be4562bd0149fd8.png',
    69999,
    0,
    'Storage 12GB+256GB',
    5,
    [
        'Mi 11 Ultra',
        'The Superphone',
        'The Mi 11 Ultra goes beyond flagships.',
        'Mi 11 Ultra Features:-',
        'A Triple Primary Camera System that is a true game changer'
    ]
  ),
  new Product(
    'p2',
    'u1',
    'c1',
    'Mi 10',
    'https://i01.appmifile.com/webfile/globalimg/in/cms/D1301D76-E04D-EF09-6195-53229DE6D543.jpg',
    49999,
    54999,
    'Storage 12GB+256GB',
    4,
    [
        'Mi 10',
        'Evoke your imagination!',
        'The revolutionary new smartphone for you!',
        'The Mi 10 is the new smartphone for 5G era. The path breaking 108MP quad camera comes with 8K video recording capability for a truly cinematic experience.'
    ]
  ),
  new Product(
    'p3',
    'u1',
    'c2',
    'Mi Box 4K',
    'https://i01.appmifile.com/webfile/globalimg/in/cms/A18B0B73-E5E6-83B9-B61E-8F1C7B733A55.jpg',
    3499,
    4999,
    'Buy and get Mi Smart Speaker at ₹ 1,999',    
    3,
    [
        'Mi Box 4K',
        'Get ready for the age of streaming!',        
        'With the Mi Box 4K in your home, you will never have to miss the brand new show everyone is talking about. Stream your favourite movies and series in Ultra-HD quality. The Android TV 9.0 is designed to let you discover the best content and make the most of your entertainment experience. That’s not all, the Data Saver function allows you to view your media using your smartphone hotspot.'
    ]
  ),
];

export default PRODUCTS;