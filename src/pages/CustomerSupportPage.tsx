import { useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Send, Mail, Phone } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  sendSupportContact,
  sendSupportChatMessage,
  type SupportChatRequest,
} from "@/services/api";
import { toast } from "sonner";

interface ChatMessage {
  id: number;
  sender: "user" | "support";
  text: string;
  timestamp: string;
}

function CustomerSupportPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: "support",
      text: "Xin chào! Tôi có thể hỗ trợ gì cho bạn hôm nay?",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isSendingChat, setIsSendingChat] = useState(false);

  const handleSubmitContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await sendSupportContact({
        name,
        email,
        subject,
        message,
      });

      toast.success("Đã gửi yêu cầu hỗ trợ. Chúng tôi sẽ liên hệ sớm nhất!");
      setSubject("");
      setMessage("");
    } catch (error: any) {
      toast.error(error.message || "Không thể gửi yêu cầu. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendChat = async () => {
    const trimmed = chatInput.trim();
    if (!trimmed) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      sender: "user",
      text: trimmed,
      timestamp: new Date().toLocaleTimeString(),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput("");
    setIsSendingChat(true);

    try {
      const payload: SupportChatRequest = { message: trimmed };
      const response = await sendSupportChatMessage(payload);

      const replyMessage: ChatMessage = {
        id: Date.now() + 1,
        sender: "support",
        text: response.data.reply,
        timestamp: new Date().toLocaleTimeString(),
      };

      setChatMessages((prev) => [...prev, replyMessage]);
    } catch (error: any) {
      toast.error(
        error.message || "Không thể gửi tin nhắn. Vui lòng thử lại sau."
      );
    } finally {
      setIsSendingChat(false);
    }
  };

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
            <span className="text-slate-900">Customer Support</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:py-8">
        <div className="mb-6 flex items-center gap-3 sm:mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white sm:h-12 sm:w-12">
            <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Customer Support
            </h1>
            <p className="mt-1 text-xs text-slate-600 sm:text-sm">
              Liên hệ với chúng tôi qua form hoặc trò chuyện nhanh với bộ phận
              hỗ trợ.
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-8">
          {/* Contact form */}
          <Card className="border-slate-200">
            <CardContent className="space-y-6 p-4 sm:p-6">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
                  Contact Form
                </h2>
                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  Điền thông tin bên dưới, chúng tôi sẽ phản hồi qua email trong
                  vòng 24 giờ.
                </p>
              </div>

              <form className="space-y-4" onSubmit={handleSubmitContact}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-700 sm:text-sm">
                      Họ và tên
                    </label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nguyễn Văn A"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-700 sm:text-sm">
                      Email
                    </label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-700 sm:text-sm">
                    Chủ đề
                  </label>
                  <Input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Ví dụ: Hỗ trợ thanh toán, câu hỏi về đơn hàng..."
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-700 sm:text-sm">
                    Nội dung
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                    placeholder="Mô tả chi tiết vấn đề bạn đang gặp phải..."
                    required
                  />
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-slate-500 sm:text-sm">
                    Hoặc gửi email trực tiếp tới{" "}
                    <span className="font-medium text-slate-900">
                      support@shop.co
                    </span>
                  </p>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-slate-900 text-white hover:bg-slate-800 sm:w-auto"
                  >
                    {isSubmitting ? "Đang gửi..." : "Gửi yêu cầu"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Chat widget + info */}
          <div className="space-y-4 lg:space-y-6">
            <Card className="h-[360px] border-slate-200">
              <CardContent className="flex h-full flex-col p-4 sm:p-5">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white">
                      <MessageCircle className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        Live Support (Beta)
                      </p>
                      <p className="text-xs text-emerald-600">
                        Online • Phản hồi trong vài phút
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex-1 space-y-2 overflow-y-auto rounded-md bg-slate-50 p-3 text-sm">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.sender === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-3 py-2 ${
                          msg.sender === "user"
                            ? "bg-slate-900 text-white rounded-br-sm"
                            : "bg-white text-slate-900 rounded-bl-sm border border-slate-200"
                        }`}
                      >
                        <p className="whitespace-pre-line">{msg.text}</p>
                        <p className="mt-1 text-[10px] opacity-70">
                          {msg.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <form
                  className="mt-3 flex items-center gap-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendChat();
                  }}
                >
                  <Input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Nhập tin nhắn của bạn..."
                    className="text-sm"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={isSendingChat}
                    className="shrink-0 bg-slate-900 text-white hover:bg-slate-800"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardContent className="space-y-3 p-4 sm:p-5">
                <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
                  Thông tin liên hệ khác
                </h3>
                <div className="space-y-2 text-xs text-slate-600 sm:text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-slate-500" />
                    <span>
                      Email:{" "}
                      <span className="font-medium text-slate-900">
                        support@shop.co
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-slate-500" />
                    <span>
                      Hotline:{" "}
                      <span className="font-medium text-slate-900">
                        1900 123 456
                      </span>
                      <span className="ml-1 text-xs text-slate-500">
                        (8:00 - 21:00, Thứ 2 - Chủ nhật)
                      </span>
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerSupportPage;


