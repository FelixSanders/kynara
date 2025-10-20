import { useState } from "react";
import { Header } from "./Header";
import { ProductCard, Product } from "./ProductCard";
import { CartSheet, CartItem } from "./CartSheet";
import { toast } from "sonner@2.0.3";

const products: Product[] = [
  {
    id: "1",
    name: "Rainbow Tie-Dye Pillow Case",
    price: 375000,
    image: "https://images.unsplash.com/photo-1597480552972-de9b150b5b43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aWUlMjBkeWUlMjBwaWxsb3d8ZW58MXx8fHwxNzYwNzE2OTIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Vibrant rainbow colors perfect for any bedroom",
  },
  {
    id: "2",
    name: "Sunset Tie-Dye Body Pillow",
    price: 600000,
    image: "https://images.unsplash.com/photo-1635043359868-045bf818b8ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aWUlMjBkeWUlMjBiZWRkaW5nfGVufDF8fHx8MTc2MDcxNjkyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Extra-long body pillow cover with stunning sunset pattern",
  },
  {
    id: "3",
    name: "Ocean Wave Bed Sheet Set",
    price: 1200000,
    image: "https://images.unsplash.com/photo-1700145409701-f0399b602be2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGJlZGRpbmclMjBzaGVldHN8ZW58MXx8fHwxNzYwNzE2OTIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Complete sheet set with calming ocean-inspired tie-dye",
  },
  {
    id: "4",
    name: "Pastel Dream Cushion Cover",
    price: 300000,
    image: "https://images.unsplash.com/photo-1646054346449-ba615db19f5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWluYm93JTIwcGlsbG93fGVufDF8fHx8MTc2MDcxNjkyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Soft pastel tie-dye for a dreamy aesthetic",
  },
  {
    id: "5",
    name: "Purple Haze Pillow Set",
    price: 675000,
    image: "https://images.unsplash.com/photo-1597480552972-de9b150b5b43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aWUlMjBkeWUlMjBwaWxsb3d8ZW58MXx8fHwxNzYwNzE2OTIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Set of 2 pillowcases in purple and lavender swirls",
  },
  {
    id: "6",
    name: "Galaxy Tie-Dye Duvet",
    price: 1350000,
    image: "https://images.unsplash.com/photo-1635043359868-045bf818b8ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aWUlMjBkeWUlMjBiZWRkaW5nfGVufDF8fHx8MTc2MDcxNjkyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Deep space-inspired colors for cosmic dreams",
  },
];

interface ShopPageProps {
  userName: string;
  onLogout: () => void;
  onCheckout: (items: CartItem[]) => void;
  onOrderHistory: () => void;
  activeOrdersCount?: number;
}

export function ShopPage({ userName, onLogout, onCheckout, onOrderHistory, activeOrdersCount = 0 }: ShopPageProps) {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAddToCart = (product: Product) => {
    setCartItems((items) => {
      const existingItem = items.find((item) => item.id === product.id);
      if (existingItem) {
        toast.success("Added to cart");
        return items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        toast.success("Added to cart");
        return [
          ...items,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
          },
        ];
      }
    });
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
    toast.success("Removed from cart");
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header
        cartItemCount={totalItems}
        onCartClick={() => setCartOpen(true)}
        userName={userName}
        onLogout={onLogout}
        onOrderHistory={onOrderHistory}
        activeOrdersCount={activeOrdersCount}
      />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 text-center">
            <h2 className="mb-2">Colorful Tie-Dye Bedding</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Transform your bedroom with our vibrant collection of tie-dye pillows, sheets, and covers. 
              Each piece is uniquely crafted to bring color and comfort to your space.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => {
              const cartItem = cartItems.find((item) => item.id === product.id);
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  cartQuantity={cartItem?.quantity || 0}
              />
              );
            })}
          </div>
        </div>
      </main>

      <footer className="border-t border-border py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 Kynara. Bringing color to your dreams.</p>
        </div>
      </footer>

      <CartSheet
        open={cartOpen}
        onOpenChange={setCartOpen}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setCartOpen(false);
          onCheckout(cartItems);
        }}
      />
    </div>
  );
}
