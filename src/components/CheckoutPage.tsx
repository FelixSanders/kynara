import { useState } from "react";
import { ArrowLeft, CreditCard, Smartphone, Building2, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { CartItem } from "./CartSheet";
import { toast } from "sonner@2.0.3";
import { formatRupiah } from "../utils/currency";

interface CheckoutPageProps {
  cartItems: CartItem[];
  userName: string;
  onBack: () => void;
  onOrderComplete: (paymentMethod: string, total: number) => void;
}

type PaymentMethod = "debit" | "qris" | "bca" | "mandiri";

const paymentMethodNames: Record<PaymentMethod, string> = {
  debit: "Debit Card",
  qris: "QRIS",
  bca: "BCA Virtual Account",
  mandiri: "MANDIRI Virtual Account",
};

export function CheckoutPage({ cartItems, userName, onBack, onOrderComplete }: CheckoutPageProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("debit");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Payment successful! Order placed.");
      onOrderComplete(paymentMethodNames[paymentMethod], total);
    }, 2000);
  };

  const renderPaymentForm = () => {
    switch (paymentMethod) {
      case "debit":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                maxLength={19}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cardName">Cardholder Name</Label>
              <Input
                id="cardName"
                placeholder="Name on card"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  maxLength={5}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  type="password"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  maxLength={3}
                  required
                />
              </div>
            </div>
          </div>
        );
      case "qris":
        return (
          <div className="space-y-4">
            <div className="bg-muted rounded-lg p-8 flex flex-col items-center justify-center">
              <div className="w-48 h-48 bg-white rounded-lg flex items-center justify-center mb-4">
                <div className="text-center">
                  <Smartphone className="h-16 w-16 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">QR Code</p>
                </div>
              </div>
              <p className="text-center text-muted-foreground">
                Scan this QR code with your mobile banking app
              </p>
            </div>
          </div>
        );
      case "bca":
      case "mandiri":
        return (
          <div className="space-y-4">
            <div className="bg-muted rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="h-8 w-8 text-primary" />
                <div>
                  <h4>{paymentMethod === "bca" ? "BCA" : "MANDIRI"} Virtual Account</h4>
                  <p className="text-muted-foreground">Virtual account number will be generated</p>
                </div>
              </div>
              <div className="bg-background rounded p-4 border-2 border-dashed border-border">
                <p className="text-sm text-muted-foreground mb-1">Virtual Account Number</p>
                <p className="text-2xl tracking-wider">
                  {paymentMethod === "bca" ? "8012345678901234" : "8877665544332211"}
                </p>
              </div>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Instructions:</p>
              <ol className="list-decimal list-inside space-y-1 ml-2">
                <li>Open your {paymentMethod === "bca" ? "BCA" : "MANDIRI"} mobile banking app</li>
                <li>Select "Transfer" or "Virtual Account"</li>
                <li>Enter the virtual account number above</li>
                <li>Verify the amount and complete the transfer</li>
              </ol>
            </div>
          </div>
        );
    }
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
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="mb-2">Checkout</h1>
            <p className="text-muted-foreground">Complete your purchase</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                  <CardDescription>{cartItems.length} items</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <div className="w-16 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                          <ImageWithFallback
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="line-clamp-1 text-sm">{item.name}</p>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                          <p className="text-sm">{formatRupiah(item.price * item.quantity)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{formatRupiah(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax (10%)</span>
                      <span>{formatRupiah(tax)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span>Total</span>
                      <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                        {formatRupiah(total)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Payment Method */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>Select your preferred payment method</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCheckout} className="space-y-6">
                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <Label
                          htmlFor="debit"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer [&:has([data-state=checked])]:border-primary"
                        >
                          <RadioGroupItem value="debit" id="debit" className="sr-only" />
                          <CreditCard className="mb-3 h-6 w-6" />
                          <span>Debit Card</span>
                        </Label>

                        <Label
                          htmlFor="qris"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer [&:has([data-state=checked])]:border-primary"
                        >
                          <RadioGroupItem value="qris" id="qris" className="sr-only" />
                          <Smartphone className="mb-3 h-6 w-6" />
                          <span>QRIS</span>
                        </Label>

                        <Label
                          htmlFor="bca"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer [&:has([data-state=checked])]:border-primary"
                        >
                          <RadioGroupItem value="bca" id="bca" className="sr-only" />
                          <Building2 className="mb-3 h-6 w-6" />
                          <span>BCA VA</span>
                        </Label>

                        <Label
                          htmlFor="mandiri"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer [&:has([data-state=checked])]:border-primary"
                        >
                          <RadioGroupItem value="mandiri" id="mandiri" className="sr-only" />
                          <Building2 className="mb-3 h-6 w-6" />
                          <span>MANDIRI VA</span>
                        </Label>
                      </div>
                    </RadioGroup>

                    <Separator />

                    {renderPaymentForm()}

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                      size="lg"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>Processing...</>
                      ) : (
                        <>
                          <CheckCircle2 className="mr-2 h-5 w-5" />
                          Pay {formatRupiah(total)}
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
