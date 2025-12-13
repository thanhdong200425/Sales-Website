import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    // Clear cart after successful payment
    // This will be handled by the cart context if needed
  }, []);

  return (
    <div className="space-y-0">
      {/* Breadcrumbs */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-3 sm:py-4">
          <nav className="flex items-center gap-2 text-xs text-slate-600 sm:text-sm">
            <Link to="/" className="hover:text-slate-900">
              Home
            </Link>
            <span>/</span>
            <span className="text-slate-900">Payment Success</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:py-12">
        <Card className="border-green-200 bg-green-50/50">
          <CardContent className="p-8 text-center">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-green-100 p-4">
                <CheckCircle2 className="h-16 w-16 text-green-600" />
              </div>
            </div>

            <h1 className="mb-3 text-2xl font-bold text-slate-900 sm:text-3xl">
              Thanh toán thành công!
            </h1>
            <p className="mb-6 text-sm text-slate-600 sm:text-base">
              Cảm ơn bạn đã mua sắm. Đơn hàng của bạn đã được xác nhận và đang được xử lý.
            </p>

            {orderId && (
              <div className="mb-6 rounded-lg bg-white p-4 text-center">
                <p className="text-xs text-slate-500 sm:text-sm">Mã đơn hàng</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">
                  #{orderId}
                </p>
              </div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button
                onClick={() => navigate("/order-status")}
                className="bg-slate-900 text-white hover:bg-slate-800"
              >
                Xem đơn hàng
              </Button>
              <Button
                onClick={() => navigate("/")}
                variant="outline"
                className="border-slate-300"
              >
                Tiếp tục mua sắm
              </Button>
            </div>

            <p className="mt-6 text-xs text-slate-500 sm:text-sm">
              Bạn sẽ nhận được email xác nhận đơn hàng trong vài phút tới.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default PaymentSuccessPage;

