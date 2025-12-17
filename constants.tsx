import { UserRole, Recipe, Blueprint } from './types';
import { 
  Megaphone, Mail, ShieldAlert, FileText, UserCheck, 
  Receipt, Code, Bug, TestTube, Zap, Users, BarChart 
} from 'lucide-react';
import React from 'react';

// Helper to render icons based on string ID
export const getIcon = (name: string, className?: string) => {
  const props = { className: className || "w-6 h-6" };
  switch (name) {
    case 'repurpose': return <Megaphone {...props} />;
    case 'email': return <Mail {...props} />;
    case 'objection': return <ShieldAlert {...props} />;
    case 'minute': return <FileText {...props} />;
    case 'cv': return <UserCheck {...props} />;
    case 'invoice': return <Receipt {...props} />;
    case 'doc': return <FileText {...props} />;
    case 'bug': return <Bug {...props} />;
    case 'test': return <TestTube {...props} />;
    case 'automation': return <Zap {...props} />;
    case 'users': return <Users {...props} />;
    case 'chart': return <BarChart {...props} />;
    case 'code': return <Code {...props} />;
    default: return <Zap {...props} />;
  }
};

/* --- SALES DATA (KINH DOANH) --- */
const salesRecipes: Recipe[] = [
  {
    id: 's1', role: UserRole.SALES, title: 'Tái sử dụng Nội dung', description: 'Biến bài Blog thành 3 bài đăng mạng xã hội.', icon: 'repurpose', category: 'Viết',
    inputs: [{ id: 'content', label: 'Nội dung gốc (Blog/Văn bản)', placeholder: 'Dán bài viết của bạn vào đây...', multiline: true }],
    systemPrompt: 'Bạn là một chuyên gia viết quảng cáo (Copywriter). Hãy lấy văn bản được cung cấp và tái sử dụng nó thành 3 bài đăng mạng xã hội riêng biệt (LinkedIn, Twitter Thread, Facebook). Giữ giọng văn thu hút và chuyên nghiệp. Viết bằng tiếng Việt.'
  },
  {
    id: 's2', role: UserRole.SALES, title: 'Cá nhân hóa Email Lạnh', description: 'Tạo email chào hàng được cá nhân hóa.', icon: 'email', category: 'Viết',
    inputs: [
      { id: 'prospect', label: 'Tên & Công ty Khách hàng', placeholder: 'Nguyễn Văn A từ Công ty Acme', multiline: false },
      { id: 'context', label: 'Bối cảnh/Giá trị đề xuất', placeholder: 'Chúng tôi cung cấp dịch vụ tự động hóa AI...', multiline: true }
    ],
    systemPrompt: 'Viết một email chào hàng (cold email) bằng tiếng Việt. Sử dụng một câu mở đầu (hook) dựa trên thông tin khách hàng. Giữ độ dài dưới 150 từ. Tập trung vào giá trị đề xuất được cung cấp.'
  },
  {
    id: 's3', role: UserRole.SALES, title: 'Xử lý Từ chối', description: 'Tạo câu trả lời cho các câu hỏi khó của khách hàng.', icon: 'objection', category: 'Phân tích',
    inputs: [{ id: 'objection', label: 'Lời từ chối của khách', placeholder: "Giá bên bạn quá cao...", multiline: true }],
    systemPrompt: 'Đóng vai một cố vấn bán hàng cấp cao. Cung cấp 3 cách khác nhau để xử lý lời từ chối này bằng tiếng Việt: 1. Đồng cảm và chuyển hướng, 2. Tái định khung tập trung vào giá trị, 3. Cách tiếp cận thách thức.'
  }
];

const salesBlueprint: Blueprint = {
  id: 'bp_sales', role: UserRole.SALES, title: 'Hệ thống Phản hồi Lead Tự động', description: 'Phân tích khách hàng tiềm năng từ Web và soạn thông báo Slack tự động.', icon: 'users',
  videoDuration: '2:15', toolsInvolved: ['Webflow', 'Google Sheets', 'Slack'],
  steps: ['Kết nối Form với Google Sheets', 'Thiết lập Trigger khi có dòng mới', 'Thêm bước AI với "Golden Prompt"', 'Gửi kết quả vào kênh Slack'],
  goldenPrompt: 'Bạn là Trưởng phòng Kinh doanh cấp cao. Phân tích dữ liệu khách hàng tiềm năng sau: [Chèn Dữ liệu]. 1. Phân loại mức độ quan tâm (Nóng/Ấm/Lạnh). 2. Soạn thảo email phản hồi đầu tiên được cá nhân hóa. 3. Liệt kê 2 điểm mấu chốt để nhân viên sales tư vấn. (Trả lời bằng tiếng Việt)'
};

/* --- OPS DATA (VẬN HÀNH) --- */
const opsRecipes: Recipe[] = [
  {
    id: 'o1', role: UserRole.OPS, title: 'Thư ký Cuộc họp (Biên bản)', description: 'Tóm tắt ghi chú thô thành biên bản chuyên nghiệp.', icon: 'minute', category: 'Viết',
    inputs: [{ id: 'notes', label: 'Ghi chú thô', placeholder: '- Tuấn bàn về ngân sách\n- Lan đề cập sự chậm trễ...', multiline: true }],
    systemPrompt: 'Chuyển đổi các ghi chú cuộc họp thô này thành biên bản chuyên nghiệp bằng tiếng Việt. Bao gồm: Thành phần tham dự (suy luận), Các quyết định chính, Các mục hành động (kèm người phụ trách), và Các vấn đề còn tồn đọng.'
  },
  {
    id: 'o2', role: UserRole.OPS, title: 'Lọc Hồ sơ Ứng viên (CV)', description: 'Phân tích CV so với mô tả công việc (JD).', icon: 'cv', category: 'Phân tích',
    inputs: [
      { id: 'jd', label: 'Mô tả công việc (JD)', placeholder: 'Dán JD vào đây...', multiline: true },
      { id: 'resume', label: 'Nội dung CV Ứng viên', placeholder: 'Dán văn bản CV vào đây...', multiline: true }
    ],
    systemPrompt: 'So sánh CV ứng viên với mô tả công việc. Chấm điểm mức độ phù hợp từ 0-100. Liệt kê 3 Điểm mạnh và 3 Cờ đỏ/Kỹ năng còn thiếu. Trả lời bằng tiếng Việt.'
  },
  {
    id: 'o3', role: UserRole.OPS, title: 'Trích xuất Dữ liệu Hóa đơn', description: 'Trích xuất dữ liệu JSON từ văn bản hóa đơn.', icon: 'invoice', category: 'Phân tích',
    inputs: [{ id: 'invoice', label: 'Văn bản Hóa đơn (OCR Output)', placeholder: 'Dán nội dung hóa đơn...', multiline: true }],
    systemPrompt: 'Trích xuất các trường sau từ văn bản hóa đơn và CHỈ trả về định dạng JSON: Invoice Number, Date, Vendor Name, Total Amount, Line Items summary.'
  }
];

const opsBlueprint: Blueprint = {
  id: 'bp_ops', role: UserRole.OPS, title: 'Bộ thu thập Phản hồi', description: 'Tự động phân loại phản hồi nhân viên và thông báo cho HR.', icon: 'chart',
  videoDuration: '1:45', toolsInvolved: ['Typeform', 'Excel Online', 'Email'],
  steps: ['Thu thập dữ liệu qua Form', 'AI Phân tích Cảm xúc (Sentiment)', 'Gửi email các mục Khẩn cấp', 'Ghi log tất cả vào Excel'],
  goldenPrompt: 'Phân tích phản hồi này của nhân viên: "[Chèn Phản hồi]". 1. Xác định Cảm xúc (Tích cực/Trung lập/Tiêu cực). 2. Gán mức độ Khẩn cấp (Thấp/Trung bình/Cao). 3. Tóm tắt vấn đề cốt lõi trong một câu. (Trả lời bằng tiếng Việt)'
};

/* --- TECH DATA (KỸ THUẬT) --- */
const techRecipes: Recipe[] = [
  {
    id: 't1', role: UserRole.TECH, title: 'Tạo Tài liệu Code', description: 'Tạo JSDoc/Python docstrings cho mã nguồn.', icon: 'doc', category: 'Viết',
    inputs: [{ id: 'code', label: 'Mã nguồn (Source Code)', placeholder: 'function processData(data) {...}', multiline: true }],
    systemPrompt: 'Viết tài liệu hướng dẫn toàn diện cho đoạn mã này. Bao gồm các tham số, giá trị trả về và một ví dụ sử dụng ngắn gọn. Sử dụng định dạng chuẩn cho ngôn ngữ lập trình được phát hiện. (Giải thích bằng tiếng Việt)'
  },
  {
    id: 't2', role: UserRole.TECH, title: 'Thợ săn Lỗi (Bug Hunter)', description: 'Tìm các lỗi tiềm ẩn và race conditions.', icon: 'bug', category: 'Phân tích',
    inputs: [{ id: 'code', label: 'Đoạn mã cần phân tích', placeholder: 'Dán code vào đây...', multiline: true }],
    systemPrompt: 'Phân tích đoạn mã này để tìm các lỗi tiềm ẩn, lỗ hổng bảo mật hoặc vấn đề hiệu suất. Giải thích tại sao từng vấn đề lại quan trọng và đề xuất cách sửa lỗi. (Trả lời bằng tiếng Việt)'
  },
  {
    id: 't3', role: UserRole.TECH, title: 'Viết Unit Test', description: 'Tạo kịch bản kiểm thử (Jest/PyTest).', icon: 'test', category: 'Viết',
    inputs: [{ id: 'code', label: 'Hàm cần Test', placeholder: 'Dán code...', multiline: true }],
    systemPrompt: 'Viết một bộ unit tests cho đoạn mã này. Bao gồm các trường hợp happy paths, edge cases, và xử lý lỗi. Sử dụng framework kiểm thử phổ biến phù hợp với ngôn ngữ.'
  }
];

const techBlueprint: Blueprint = {
  id: 'bp_tech', role: UserRole.TECH, title: 'Báo cáo Standup Hàng ngày', description: 'Tổng hợp cập nhật của dev thành báo cáo cho PM.', icon: 'code',
  videoDuration: '2:30', toolsInvolved: ['Slack', 'OpenAI/Gemini API', 'Jira'],
  steps: ['Dev đăng bài trong #standup', 'Bot thu thập tin nhắn lúc 5PM', 'AI tóm tắt tiến độ & khó khăn', 'Gửi Email cho PM'],
  goldenPrompt: 'Tóm tắt các cập nhật sau của lập trình viên thành một báo cáo trạng thái gọn gàng. Nhóm theo: 1. Nhiệm vụ đã hoàn thành, 2. Công việc đang làm, 3. Khó khăn/Rủi ro. Loại bỏ các thông tin tán gẫu rác. (Trả lời bằng tiếng Việt)'
};

/* --- AGGREGATION --- */

export const RECIPES: Recipe[] = [...salesRecipes, ...opsRecipes, ...techRecipes];
export const BLUEPRINTS: Blueprint[] = [salesBlueprint, opsBlueprint, techBlueprint];

// Add dummy "N" recipes for the library exploration
const dummyRecipes: Recipe[] = Array.from({ length: 15 }).map((_, i) => ({
  id: `dummy_${i}`,
  role: i % 3 === 0 ? UserRole.SALES : i % 3 === 1 ? UserRole.OPS : UserRole.TECH,
  title: `Công thức Lưu trữ #${i + 1}`,
  description: 'Quy trình vận hành tiêu chuẩn mẫu cho các tác vụ cũ.',
  icon: 'doc',
  category: i % 2 === 0 ? 'Viết' : 'Đọc',
  inputs: [{ id: 'txt', label: 'Dữ liệu đầu vào', placeholder: '...', multiline: true }],
  systemPrompt: 'Tóm tắt nội dung này bằng tiếng Việt.'
}));

export const ALL_RECIPES = [...RECIPES, ...dummyRecipes];