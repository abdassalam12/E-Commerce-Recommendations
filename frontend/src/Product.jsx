import { useState, useEffect } from 'react'; // Fichier CSS pour les styles personnalisés
import Product_detail from './Product_detail.jsx'
import Recieve from './Each.jsx'
// Importation du fichier Tailwind CSS
import Each from './Each.jsx';

import { useSearchParams, useNavigate } from 'react-router-dom';

function Product({ post, type }) {

    let  id;
    if(type =='rec'){
        id  = post.product_id;
    }
    else{
        id  = post.id;
    }
    const navigate = useNavigate();
    const handleProductClick = () => {
        if (type == 'product') {
            navigate(`/product/${id}/`);
        }
        if (type == 'rec') {
            navigate(`/Constent_detail/${id}/`);
        }
        
        if (type == 'cluster') {
            navigate(`/cluster/${id}/`);
        }

    };
    const [SearchParams, setSearchParams] = useSearchParams()
    const productId = SearchParams.get('filter')
    const [mohammed, setmohammed] = useState(0);
    const [className1, setClassName1] = useState("star");
    const [className2, setClassName2] = useState("star");
    const [className3, setClassName3] = useState("star");
    const [className4, setClassName4] = useState("star");
    const [className5, setClassName5] = useState("star");
    let cls;
    let statrs;
    const [isVisible, setIsVisible] = useState(true);
    const [showEach, setShowEach] = useState(false);
    let rate = post.rating;
    const integerPart = Math.floor(rate);
    const fractionalPart = rate - integerPart;
    console.log("Integer part:", integerPart);

    console.log("Fractional part:", fractionalPart);
    return (

        <div>
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />

            <div className="w-500 h-300 bgGray-500  wFull minHScreen gap-6 flexWrap flex justifyCenter itemsCenter" onClick={handleProductClick} >
                {/* Card 1 s*/}
                <div className="h-full w-full p-2 bg-white rounded-xl transform transition-all hover:translate-y-2 duration-300 shadow-lg hover:shadow-2xl mb-4 lg:mt-0" onClick={() => { setIsVisible(false) }}>
<div>
<img src={post.img_link} alt="" className='h-60  rounded-t-xl  mx-auto' />
</div>
                    
                    <div className="p-2">
                        <h2 className="fontBold txt-lg mb-2">{post.title.substring(0, 70) + "  . . ."}</h2>
                        <span className="text-xl fontSemibold">{post.price}  $</span>
                        <div className="flex flex-col items-left gap-0">
                            <span className="text-sm line-through opacity-75">{post.price + 200} $</span>
                            <span className="fontBold text-sm p-2 bgYellow-300  rounded-s-2xl textGray-600">Économisez 10 %</span>
                        </div>
                        <div className="flex itemsCenter mt-0 gap-1">
                            <div className="star-ratings-css-bottom">
                                {[...Array(5)].map((_, index) => (
                                    <span key={index} style={{ color: index < integerPart ? "rgb(255, 247, 0)" : "" }}>★</span>
                                ))}
                            </div>

                            <p className="fontBold text-xs textGray-700">Meilleure cote</p>
                        </div>
                        <p className="text-sm textGray-600 mt-2 mb2"></p>
                    </div>
                    <div className="flex itemCenter justifyCenter gap-2 mb-3">
                        <button className="px-3 py-1 rounded-lg bgGray-300 hover-bgBlue-500">Acheter maintenant</button>
                        <button className="px-3 py-1 rounded-lg bgGray-300 hover-bgGray-500">
                            <img src="src/images/shopping.png" alt="" className="w-6" />
                        </button>
                        <button className="px-3 py-1 rounded-lg bgGray-300 hover-bgGray-500">
                            <img src="src/images/love.png" alt="" className="w-6" />
                        </button>
                    </div>
                </div>
                {/* Card 1 */}
            </div>
        </div>
    )

}

export default Product;
