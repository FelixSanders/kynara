import { ShoppingCart, LogOut, User, Package } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  userName?: string;
  onLogout?: () => void;
  onOrderHistory?: () => void;
  activeOrdersCount?: number;
}

export function Header({ cartItemCount, onCartClick, userName, onLogout, onOrderHistory, activeOrdersCount = 0 }: HeaderProps) {
  return (
    <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400"></div>
          <h1 className="tracking-tight">Kynara</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="relative"
            onClick={onCartClick}
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <Badge
                className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-gradient-to-br from-pink-500 to-purple-500 border-0"
              >
                {cartItemCount}
              </Badge>
            )}
          </Button>

          {userName && onLogout && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <User className="h-5 w-5" />
                  {activeOrdersCount > 0 && (
                    <Badge
                      className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-gradient-to-br from-pink-500 to-purple-500 border-0 shadow-lg"
                    >
                      {activeOrdersCount}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span>Account</span>
                    <span className="text-muted-foreground">{userName}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {onOrderHistory && (
                  <DropdownMenuItem onClick={onOrderHistory}>
                    <Package className="mr-2 h-4 w-4" />
                    <div className="flex items-center justify-between flex-1">
                      <span>Order History</span>
                      {activeOrdersCount > 0 && (
                        <Badge className="ml-2 h-5 px-2 bg-gradient-to-br from-pink-500 to-purple-500 border-0">
                          {activeOrdersCount}
                        </Badge>
                      )}
                    </div>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={onLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}
