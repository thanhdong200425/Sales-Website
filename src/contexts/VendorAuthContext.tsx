import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

interface Vendor {
  id: number;
  email: string;
  businessName: string;
  contactName?: string;
  phone?: string;
  address?: string;
  avatar?: string;
  averageRating: number;
  totalReviews: number;
  responseTime: number;
  fulfillmentRate: number;
  status: string;
}

interface VendorAuthContextType {
  vendor: Vendor | null;
  token: string | null;
  login: (token: string, vendor: Vendor) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isInitialized: boolean;
}

const VendorAuthContext = createContext<VendorAuthContextType | undefined>(
  undefined
);

export function VendorAuthProvider({ children }: { children: ReactNode }) {
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [token, setToken] = useState<string | null>(null);
const [isInitialized, setIsInitialized] = useState(false);
  useEffect(() => {
    // Load vendor data from localStorage on mount
    const storedToken = localStorage.getItem("vendorToken");
    const storedVendor = localStorage.getItem("vendorData");

    if (storedToken && storedVendor) {
      try {
        setToken(storedToken);
        setVendor(JSON.parse(storedVendor));
      } catch (e) {
        console.error("Failed to parse stored vendor data", e);
        localStorage.removeItem("vendorToken");
        localStorage.removeItem("vendorData");
      }
    }
    setIsInitialized(true);
  }, []);

  const login = (newToken: string, vendorData: Vendor) => {
    setToken(newToken);
    setVendor(vendorData);
    localStorage.setItem("vendorToken", newToken);
    localStorage.setItem("vendorData", JSON.stringify(vendorData));
  };

  const logout = () => {
    setToken(null);
    setVendor(null);
    localStorage.removeItem("vendorToken");
    localStorage.removeItem("vendorData");
  };

  return (
    <VendorAuthContext.Provider
      value={{
        vendor,
        token,
        login,
        logout,
        isAuthenticated: !!token ,
        isInitialized,
      }}
    >
      {children}
    </VendorAuthContext.Provider>
  );
}

export function useVendorAuth() {
  const context = useContext(VendorAuthContext);
  if (context === undefined) {
    throw new Error("useVendorAuth must be used within a VendorAuthProvider");
  }
  return context;
}

// Protected Route Component
export function ProtectedVendorRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isInitialized } = useVendorAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      navigate("/vendor/login");
    }
  }, [isAuthenticated, isInitialized, navigate]);

  if (!isInitialized) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
