import { Plus } from "lucide-react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { formatRupiah } from "../utils/currency";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  cartQuantity?: number;
}

export function ProductCard({ product, onAddToCart, cartQuantity = 0 }: ProductCardProps) {
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
      <CardContent className="p-0 relative">
        <div className="aspect-square overflow-hidden bg-muted">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        {cartQuantity > 0 && (
          <Badge
            className="absolute top-3 right-3 h-8 w-8 flex items-center justify-center p-0 bg-gradient-to-br from-pink-500 to-purple-500 border-0 shadow-lg"
          >
            {cartQuantity}
          </Badge>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-3 p-4">
        <div className="flex-1 w-full">
          <h3 className="line-clamp-1">{product.name}</h3>
          <p className="text-muted-foreground line-clamp-2 mt-1">
            {product.description}
          </p>
        </div>
        <div className="flex items-center justify-between w-full">
          <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            {formatRupiah(product.price)}
          </span>
          <Button
            size="sm"
            onClick={() => onAddToCart(product)}
            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
