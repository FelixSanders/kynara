import { useState, useEffect } from "react";
import { LoginPage } from "./components/LoginPage";
import { SignupPage } from "./components/SignupPage";
import { ShopPage } from "./components/ShopPage";
import { CheckoutPage } from "./components/CheckoutPage";
import { OrderHistoryPage, Order } from "./components/OrderHistoryPage";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner@2.0.3";
import { CartItem } from "./components/CartSheet";

type Page = "login" | "signup" | "shop" | "checkout" | "orders";

interface User {
  name: string;
  email: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("login");
  const [user, setUser] = useState<User | null>(null);
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Load user and orders from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("kynara_user");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setCurrentPage("shop");
      
      // Load orders for this user
      const savedOrders = localStorage.getItem(`kynara_orders_${userData.email}`);
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
    }
  }, []);

  const handleLogin = (email: string, password: string) => {
    // Mock login - in a real app, this would validate against a backend
    const savedUsers = localStorage.getItem("kynara_users");
    const users = savedUsers ? JSON.parse(savedUsers) : [];
    
    const foundUser = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (foundUser) {
      const loggedInUser = { name: foundUser.name, email: foundUser.email };
      setUser(loggedInUser);
      localStorage.setItem("kynara_user", JSON.stringify(loggedInUser));
      
      // Load orders for this user
      const savedOrders = localStorage.getItem(`kynara_orders_${email}`);
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
      
      setCurrentPage("shop");
      toast.success(`Welcome back, ${foundUser.name}!`);
    } else {
      toast.error("Invalid email or password");
    }
  };

  const handleSignup = (name: string, email: string, password: string) => {
    // Mock signup - in a real app, this would save to a backend
    const savedUsers = localStorage.getItem("kynara_users");
    const users = savedUsers ? JSON.parse(savedUsers) : [];
    
    // Check if email already exists
    if (users.some((u: any) => u.email === email)) {
      toast.error("Email already registered");
      return;
    }

    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem("kynara_users", JSON.stringify(users));

    const loggedInUser = { name, email };
    setUser(loggedInUser);
    localStorage.setItem("kynara_user", JSON.stringify(loggedInUser));
    setCurrentPage("shop");
    toast.success(`Welcome to Kynara, ${name}!`);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("kynara_user");
    setCurrentPage("login");
    toast.success("Logged out successfully");
  };

  const handleGoToCheckout = (items: CartItem[]) => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    setCheckoutItems(items);
    setCurrentPage("checkout");
  };

  const handleOrderComplete = (paymentMethod: string, total: number) => {
    if (!user) return;

    // Create new order
    const newOrder: Order = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      items: checkoutItems,
      total: total,
      status: "processing",
      paymentMethod: paymentMethod,
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    };

    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    
    // Save orders to localStorage
    localStorage.setItem(`kynara_orders_${user.email}`, JSON.stringify(updatedOrders));

    // Simulate order status updates
    setTimeout(() => {
      updateOrderStatus(newOrder.id, "shipped");
    }, 5000);

    setTimeout(() => {
      updateOrderStatus(newOrder.id, "delivered");
    }, 10000);

    setCheckoutItems([]);
    setCurrentPage("shop");
  };

  const updateOrderStatus = (orderId: string, status: Order["status"]) => {
    if (!user) return;
    
    setOrders((prevOrders) => {
      const updated = prevOrders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      );
      localStorage.setItem(`kynara_orders_${user.email}`, JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <>
      {currentPage === "login" && (
        <LoginPage
          onLogin={handleLogin}
          onSwitchToSignup={() => setCurrentPage("signup")}
        />
      )}
      {currentPage === "signup" && (
        <SignupPage
          onSignup={handleSignup}
          onSwitchToLogin={() => setCurrentPage("login")}
        />
      )}
      {currentPage === "shop" && user && (
        <ShopPage
          userName={user.name}
          onLogout={handleLogout}
          onCheckout={handleGoToCheckout}
          onOrderHistory={() => setCurrentPage("orders")}
          activeOrdersCount={orders.filter(order => order.status === "processing" || order.status === "shipped").length}
        />
      )}
      {currentPage === "checkout" && user && (
        <CheckoutPage
          cartItems={checkoutItems}
          userName={user.name}
          onBack={() => setCurrentPage("shop")}
          onOrderComplete={handleOrderComplete}
        />
      )}
      {currentPage === "orders" && user && (
        <OrderHistoryPage
          orders={orders}
          userName={user.name}
          onBack={() => setCurrentPage("shop")}
        />
      )}
      <Toaster />
    </>
  );
}
