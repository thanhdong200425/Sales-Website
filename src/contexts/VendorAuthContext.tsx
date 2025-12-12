import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";

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
}

const VendorAuthContext = createContext<VendorAuthContextType | undefined>(
  undefined
);

export function VendorAuthProvider({ children }: { children: ReactNode }) {
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [token, setToken] = useState<string | null>(null);

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
        isAuthenticated: !!token && !!vendor,
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
  const { isAuthenticated } = useVendorAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/vendor/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
