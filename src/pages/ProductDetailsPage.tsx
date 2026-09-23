import type { Product } from "../types";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

function ProductPageDetails(){
    const { id } = useParams<{ id: string }>();

    const [count, setCount] = useState<number>(0);

    const [productDetails, setProductsDeatils] = useState<Product | null>(null);
    useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
        .then((res) => res.json())
        .then((data) => setProductsDeatils(data));
      }, [id]);
    return(
        <div>
            <div className="">
            {productDetails?.title}
            <img src={productDetails?.thumbnail} alt={productDetails?.title} />
            </div>
            <div>
                {productDetails?.category}
                {productDetails?.description}
            </div>
            <div>
                <button onClick={() => setCount(count - 1)}>-</button>
                <span>{count}</span>
                <button onClick={() => setCount(count + 1)}>+</button>
            </div>
        </div>
    )
}

export default ProductPageDetails;