import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function PaymentFailedPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderId = searchParams.get("orderId");
  const message = searchParams.get("message") || "Thanh toán không thành công";

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
            <span className="text-slate-900">Payment Failed</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:py-12">
        <Card className="border-red-200 bg-red-50/50">
          <CardContent className="p-8 text-center">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-red-100 p-4">
                <XCircle className="h-16 w-16 text-red-600" />
              </div>
            </div>

            <h1 className="mb-3 text-2xl font-bold text-slate-900 sm:text-3xl">
              Thanh toán thất bại
            </h1>
            <p className="mb-6 text-sm text-slate-600 sm:text-base">
              {decodeURIComponent(message)}
            </p>

            {orderId && (
              <div className="mb-6 rounded-lg bg-white p-4 text-center">
                <p className="text-xs text-slate-500 sm:text-sm">Mã đơn hàng</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">
                  #{orderId}
                </p>
              </div>
            )}

            <div className="mb-6 rounded-lg bg-white p-4 text-left">
              <h3 className="mb-2 text-sm font-semibold text-slate-900">
                Có thể do các lý do sau:
              </h3>
              <ul className="space-y-1 text-xs text-slate-600 sm:text-sm">
                <li>• Số dư tài khoản không đủ</li>
                <li>• Thông tin thẻ không chính xác</li>
                <li>• Giao dịch bị từ chối bởi ngân hàng</li>
                <li>• Lỗi kết nối mạng</li>
              </ul>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button
                onClick={() => navigate("/checkout")}
                className="bg-slate-900 text-white hover:bg-slate-800"
              >
                Thử lại thanh toán
              </Button>
              <Button
                onClick={() => navigate("/cart")}
                variant="outline"
                className="border-slate-300"
              >
                Quay lại giỏ hàng
              </Button>
            </div>

            <p className="mt-6 text-xs text-slate-500 sm:text-sm">
              Nếu vấn đề vẫn tiếp tục, vui lòng liên hệ với chúng tôi để được hỗ trợ.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default PaymentFailedPage;

