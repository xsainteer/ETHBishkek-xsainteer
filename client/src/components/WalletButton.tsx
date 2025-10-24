import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Wallet, ChevronDown, Copy, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

export default function WalletButton() {
  // todo: remove mock functionality
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState("");
  const { toast } = useToast();

  const connectWallet = () => {
    // Mock wallet connection
    const mockAddress = "0x" + Math.random().toString(16).substring(2, 42);
    setAddress(mockAddress);
    setIsConnected(true);
    toast({
      title: "Wallet Connected",
      description: "Successfully connected to MetaMask",
    });
    console.log('Wallet connected:', mockAddress);
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAddress("");
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected",
    });
    console.log('Wallet disconnected');
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    toast({
      title: "Address Copied",
      description: "Wallet address copied to clipboard",
    });
  };

  if (!isConnected) {
    return (
      <Button 
        onClick={connectWallet}
        className="gap-2 rounded-full"
        data-testid="button-connect-wallet"
      >
        <Wallet className="w-4 h-4" />
        Connect Wallet
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline"
          className="gap-2 rounded-full font-mono"
          data-testid="button-wallet-connected"
        >
          <div className="w-2 h-2 rounded-full bg-status-online"></div>
          {address.substring(0, 6)}...{address.substring(38)}
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem 
          onClick={copyAddress}
          data-testid="menu-copy-address"
        >
          <Copy className="w-4 h-4 mr-2" />
          Copy Address
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={disconnectWallet}
          data-testid="menu-disconnect"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
