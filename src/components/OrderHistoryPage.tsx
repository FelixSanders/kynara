import { ArrowLeft, Package, Truck, CheckCircle2, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { formatRupiah } from "../utils/currency";

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: "processing" | "shipped" | "delivered";
  paymentMethod: string;
  estimatedDelivery?: string;
}

interface OrderHistoryPageProps {
  orders: Order[];
  userName: string;
  onBack: () => void;
}

const statusConfig = {
  processing: {
    label: "Processing",
    icon: Clock,
    color: "bg-blue-500",
    textColor: "text-blue-500",
  },
  shipped: {
    label: "Shipped",
    icon: Truck,
    color: "bg-purple-500",
    textColor: "text-purple-500",
  },
  delivered: {
    label: "Delivered",
    icon: CheckCircle2,
    color: "bg-green-500",
    textColor: "text-green-500",
  },
};

export function OrderHistoryPage({ orders, userName, onBack }: OrderHistoryPageProps) {
  const sortedOrders = [...orders].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Shop
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="mb-2">Order History</h1>
            <p className="text-muted-foreground">
              Track your orders and delivery status
            </p>
          </div>

          {sortedOrders.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Package className="h-16 w-16 text-muted-foreground opacity-50 mb-4" />
                <h3 className="mb-2">No orders yet</h3>
                <p className="text-muted-foreground text-center mb-6">
                  Start shopping to see your orders here
                </p>
                <Button
                  onClick={onBack}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                >
                  Start Shopping
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {sortedOrders.map((order) => {
                const config = statusConfig[order.status];
                const StatusIcon = config.icon;

                return (
                  <Card key={order.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            Order #{order.id}
                            <Badge className={`${config.color} border-0`}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {config.label}
                            </Badge>
                          </CardTitle>
                          <CardDescription className="mt-1">
                            Placed on {formatDate(order.date)}
                          </CardDescription>
                        </div>
                        <div className="text-right">
                          <p className="text-muted-foreground text-sm">Total</p>
                          <p className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                            {formatRupiah(order.total)}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Order Items */}
                      <div className="space-y-3">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex gap-3">
                            <div className="w-16 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                              <ImageWithFallback
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="line-clamp-1">{item.name}</p>
                              <p className="text-sm text-muted-foreground">
                                Qty: {item.quantity} × {formatRupiah(item.price)}
                              </p>
                            </div>
                            <div className="text-right">
                              <p>{formatRupiah(item.price * item.quantity)}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <Separator />

                      {/* Delivery Status Timeline */}
                      <div className="space-y-3">
                        <p className="text-sm">Delivery Status</p>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-2 flex-1">
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                              order.status === "processing" || order.status === "shipped" || order.status === "delivered"
                                ? "bg-gradient-to-br from-pink-500 to-purple-500"
                                : "bg-muted"
                            }`}>
                              <Clock className="h-4 w-4 text-white" />
                            </div>
                            <div className={`h-1 flex-1 ${
                              order.status === "shipped" || order.status === "delivered"
                                ? "bg-gradient-to-r from-pink-500 to-purple-500"
                                : "bg-muted"
                            }`} />
                          </div>
                          
                          <div className="flex items-center gap-2 flex-1">
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                              order.status === "shipped" || order.status === "delivered"
                                ? "bg-gradient-to-br from-pink-500 to-purple-500"
                                : "bg-muted"
                            }`}>
                              <Truck className="h-4 w-4 text-white" />
                            </div>
                            <div className={`h-1 flex-1 ${
                              order.status === "delivered"
                                ? "bg-gradient-to-r from-pink-500 to-purple-500"
                                : "bg-muted"
                            }`} />
                          </div>
                          
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                            order.status === "delivered"
                              ? "bg-gradient-to-br from-pink-500 to-purple-500"
                              : "bg-muted"
                          }`}>
                            <CheckCircle2 className="h-4 w-4 text-white" />
                          </div>
                        </div>

                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Processing</span>
                          <span>Shipped</span>
                          <span>Delivered</span>
                        </div>

                        {order.estimatedDelivery && order.status !== "delivered" && (
                          <p className="text-sm text-muted-foreground">
                            Estimated delivery: {formatDate(order.estimatedDelivery)}
                          </p>
                        )}
                      </div>

                      <Separator />

                      {/* Payment Method */}
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Payment Method</span>
                        <span>{order.paymentMethod}</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
