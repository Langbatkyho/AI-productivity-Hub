import { UserRole, Recipe, Blueprint } from './types';
import { 
  Megaphone, Mail, ShieldAlert, FileText, UserCheck, 
  Receipt, Code, Bug, TestTube, Zap, Users, BarChart,
  Search, Target, Database, GitBranch, Globe, FileDiff,
  Wrench, TriangleAlert, Smile, PenTool, ClipboardList, Activity
} from 'lucide-react';

// Helper to render icons based on string ID
export const getIcon = (name: string, className?: string) => {
  const props = { className: className || "w-6 h-6" };
  switch (name) {
    // Existing Icons
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
    case 'search': return <Search {...props} />;
    case 'target': return <Target {...props} />;
    case 'database': return <Database {...props} />;
    case 'git': return <GitBranch {...props} />;
    case 'web': return <Globe {...props} />;
    case 'diff': return <FileDiff {...props} />;
    
    // New Icons for Production
    case 'wrench': return <Wrench {...props} />;
    case 'alert': return <TriangleAlert {...props} />;
    case 'smile': return <Smile {...props} />;
    case 'pen': return <PenTool {...props} />;
    case 'clipboard': return <ClipboardList {...props} />;
    case 'activity': return <Activity {...props} />;
    
    default: return <Zap {...props} />;
  }
};

/* --- PRODUCTION DATA (SẢN XUẤT) - Replaces Sales --- */
const productionRecipes: Recipe[] = [
  {
    id: 'p1', role: UserRole.PRODUCTION, title: 'Trợ lý Dịch & Giải lỗi Kỹ thuật', description: 'Giải thích mã lỗi máy móc và hướng dẫn sửa chữa.', icon: 'wrench', category: 'Phân tích',
    inputs: [
      { id: 'error_code', label: 'Mã lỗi hoặc Mô tả lỗi', placeholder: 'E-401 hoặc chụp ảnh văn bản lỗi...', multiline: false },
      { id: 'machine_name', label: 'Tên loại máy', placeholder: 'Máy CNC, Dây chuyền SMT...', multiline: false }
    ],
    systemPrompt: 'Bạn là chuyên gia kỹ thuật bảo trì với 20 năm kinh nghiệm. Hãy phân tích mã lỗi/vấn đề được cung cấp cho loại máy này. 1. Giải thích ý nghĩa lỗi bằng tiếng Việt đơn giản, dễ hiểu cho công nhân. 2. Đưa ra 3 nguyên nhân khả thi nhất. 3. Hướng dẫn 3 bước khắc phục sơ bộ để máy chạy lại nhanh nhất.'
  },
  {
    id: 'p2', role: UserRole.PRODUCTION, title: 'Web Khởi nghiệp cho Vợ', description: 'Tạo cấu trúc và nội dung web bán hàng nhanh chóng.', icon: 'web', category: 'Viết',
    inputs: [
      { id: 'product', label: 'Sản phẩm muốn bán', placeholder: 'Đặc sản quê, Bánh nhà làm...', multiline: false },
      { id: 'brand_name', label: 'Tên thương hiệu', placeholder: 'Bếp Nhà Mẹ...', multiline: false }
    ],
    systemPrompt: 'Bạn là chuyên gia Marketing và Thiết kế Web. Hãy tạo một gói nội dung Website khởi nghiệp cho sản phẩm và thương hiệu được cung cấp. Bao gồm: 1. Cấu trúc trang chủ (Menu, Sections). 2. Viết 3 bài giới thiệu sản phẩm cực hay và thu hút. 3. Viết một đoạn mã HTML cơ bản cho phần Hero Section (Banner đầu trang) của web.'
  },
  {
    id: 'p3', role: UserRole.PRODUCTION, title: 'Báo cáo Sự cố An toàn', description: 'Chuyển lời kể thành báo cáo ISO chuẩn.', icon: 'alert', category: 'Viết',
    inputs: [{ id: 'voice_text', label: 'Lời kể sự việc (Voice-to-text)', placeholder: 'Lúc 9h sáng máy ép số 3 bị rò dầu...', multiline: true }],
    systemPrompt: 'Bạn là cán bộ An toàn Lao động (HSE). Hãy chuyển đổi đoạn văn bản kể lại sự việc thô này thành một "Báo cáo Sự cố An toàn" chuyên nghiệp theo chuẩn ISO. Cấu trúc gồm: 1. Mô tả chi tiết sự việc (Thời gian, địa điểm, diễn biến). 2. Phân tích Nguyên nhân gốc rễ (Root Cause). 3. Biện pháp khắc phục ngay lập tức và lâu dài. 4. Bài học kinh nghiệm.'
  },
  {
    id: 'p4', role: UserRole.PRODUCTION, title: 'Bố kể chuyện Kỹ thuật', description: 'Giải thích khái niệm khó cho trẻ em.', icon: 'smile', category: 'Viết',
    inputs: [{ id: 'concept', label: 'Khái niệm kỹ thuật', placeholder: 'Nguyên lý động cơ đốt trong, Điện 3 pha...', multiline: false }],
    systemPrompt: 'Bạn đang ở chế độ "Dad Mode" (Ông bố vui tính). Hãy giải thích khái niệm kỹ thuật được cung cấp cho một đứa trẻ 6-10 tuổi. Sử dụng ngôn ngữ cực kỳ đơn giản, vui nhộn và PHẢI dùng các hình ảnh so sánh gần gũi (ví dụ: đồ chơi, con vật, xe cộ) để bé dễ hình dung. Mục tiêu là truyền lửa đam mê kỹ thuật.'
  },
  {
    id: 'p5', role: UserRole.PRODUCTION, title: 'Hồi ký Chuyên gia', description: 'Viết bài Blog LinkedIn từ kinh nghiệm nghề.', icon: 'pen', category: 'Viết',
    inputs: [{ id: 'tips', label: 'Các mẹo/kinh nghiệm tích lũy', placeholder: '- Nghe tiếng máy đoán bệnh\n- Nhìn màu dầu biết độ mòn...', multiline: true }],
    systemPrompt: 'Bạn là một chuyên gia kỳ cựu trong ngành sản xuất. Hãy biến những gạch đầu dòng kinh nghiệm thô này thành một bài Blog chuyên ngành sâu sắc (Thought Leadership) để đăng lên LinkedIn. Văn phong chững chạc, chuyên nghiệp, thể hiện sự am hiểu sâu rộng và tâm huyết nghề nghiệp.'
  },
  {
    id: 'p6', role: UserRole.PRODUCTION, title: 'Nhật ký Giao ca', description: 'Tạo bảng bàn giao ca chi tiết.', icon: 'clipboard', category: 'Viết',
    inputs: [{ id: 'notes', label: 'Ghi chú trong ca', placeholder: 'Máy 2 chạy chậm lúc 10h, Đã thay khuôn máy 5...', multiline: true }],
    systemPrompt: 'Từ các ghi chú thô, hãy lập "Biên bản Bàn giao Ca" rõ ràng, mạch lạc. Chia thành các mục: Tình trạng máy móc, Sản lượng, Sự cố phát sinh. ĐẶC BIỆT: Hãy đánh dấu [QUAN TRỌNG] hoặc dùng biểu tượng cảnh báo cho các vấn đề cần ca sau chú ý xử lý ngay.'
  }
];

const productionBlueprint: Blueprint = {
  id: 'bp_prod', role: UserRole.PRODUCTION, title: 'Hệ thống Nhắc bảo trì Thông minh', description: 'Chuyển từ "Hư mới sửa" sang "Bảo trì dự đoán" bằng Google Sheet và AI.', icon: 'activity',
  toolsInvolved: ['Google Forms', 'Google Sheets', 'Zalo/Telegram'],
  steps: ['Công nhân điền Checklist trên Form', 'Dữ liệu đổ về Sheet', 'AI phân tích chỉ số bất thường', 'Gửi cảnh báo Zalo cho Quản lý'],
  goldenPrompt: 'Phân tích dữ liệu kiểm tra máy móc sau: [Chèn Dữ liệu Dòng]. 1. So sánh với ngưỡng vận hành an toàn (Ví dụ: Nhiệt độ < 80°C, Rung động thấp). 2. Nếu phát hiện chỉ số VƯỢT NGƯỠNG hoặc xu hướng tăng bất thường, hãy soạn ngay một tin nhắn cảnh báo ngắn gọn. 3. Đưa ra dự đoán về bộ phận cần bảo trì/thay thế. (Trả lời bằng tiếng Việt).',
  guideContent: `HƯỚNG DẪN XÂY DỰNG "SMART MAINTENANCE TRACKER"

1. Số hóa quy trình kiểm tra (Digitize)
   - Thay vì dùng giấy, tạo một Google Form "Kiểm tra máy đầu ca".
   - Các trường: Tên máy, Người kiểm tra, Nhiệt độ motor (độ C), Tiếng ồn (Bình thường/Lạ), Mức dầu (%).

2. Cơ sở dữ liệu tập trung (Centralize)
   - Kết nối Form với Google Sheets. Đây sẽ là "bệnh án" của máy móc.

3. Thiết lập "Bộ não AI" (Analyze)
   - Sử dụng Zapier hoặc Make (bản free) để theo dõi dòng mới trên Sheet.
   - Khi có dữ liệu mới -> Gửi tới Gemini API kèm "Golden Prompt" bên phải.
   - AI sẽ đóng vai kỹ sư trưởng, đọc thông số và phát hiện các dấu hiệu "sắp hỏng" mà mắt thường khó thấy qua các con số.

4. Cảnh báo thời gian thực (Alert)
   - Nếu AI trả về kết quả là "Cảnh báo", tự động bắn tin nhắn vào nhóm Zalo/Telegram "Bảo trì Cơ điện".
   - Ví dụ: "⚠️ CẢNH BÁO MÁY #3: Nhiệt độ motor 85°C - Cao hơn trung bình tuần trước (70°C). Cần kiểm tra bạc đạn ngay."

5. Báo cáo tự động
   - Thiết lập một quy trình khác chạy vào chiều thứ 6: Gom toàn bộ dữ liệu tuần -> Nhờ AI tóm tắt thành "Báo cáo sức khỏe nhà máy" gửi Email cho Giám đốc.`
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
  },
  {
    id: 'o4', role: UserRole.OPS, title: 'Soạn thảo Quy trình (SOP)', description: 'Viết quy trình vận hành tiêu chuẩn từ các bước thô.', icon: 'doc', category: 'Viết',
    inputs: [{ id: 'steps', label: 'Các bước thực hiện thô', placeholder: 'Bước 1 làm A, sau đó làm B, nếu lỗi thì làm C...', multiline: true }],
    systemPrompt: 'Bạn là chuyên gia vận hành. Hãy chuyển đổi các bước thô được cung cấp thành một Quy trình Vận hành Tiêu chuẩn (SOP) chuyên nghiệp. Cấu trúc gồm: Mục đích, Phạm vi, Các bước thực hiện chi tiết, và Lưu ý quan trọng. Sử dụng ngôn ngữ rõ ràng, mạch lạc. Viết bằng tiếng Việt.'
  },
  {
    id: 'o5', role: UserRole.OPS, title: 'Thông báo Nội bộ', description: 'Soạn email/thông báo nhân sự trang trọng.', icon: 'email', category: 'Viết',
    inputs: [
      { id: 'topic', label: 'Chủ đề thông báo', placeholder: 'Thay đổi chính sách làm việc tại nhà...', multiline: false },
      { id: 'key_points', label: 'Các ý chính cần truyền đạt', placeholder: 'Áp dụng từ tháng sau, tuần làm 2 ngày ở nhà...', multiline: true }
    ],
    systemPrompt: 'Hãy soạn thảo một thông báo nội bộ (Internal Memo) chuyên nghiệp, giọng văn tích cực nhưng trang trọng. Đảm bảo truyền tải đầy đủ các ý chính được cung cấp. Cấu trúc rõ ràng, dễ đọc. Viết bằng tiếng Việt.'
  },
  {
    id: 'o6', role: UserRole.OPS, title: 'Viết Email Phản hồi Khó', description: 'Từ chối hoặc giải quyết khiếu nại khéo léo.', icon: 'objection', category: 'Viết',
    inputs: [{ id: 'situation', label: 'Tình huống/Email gốc', placeholder: 'Khách hàng phàn nàn về việc giao hàng chậm...', multiline: true }],
    systemPrompt: 'Hãy viết một email phản hồi cho tình huống này. Giọng văn đồng cảm, chuyên nghiệp, xin lỗi (nếu cần) và đưa ra giải pháp nhưng vẫn giữ vững lập trường của công ty. Viết bằng tiếng Việt.'
  }
];

const opsBlueprint: Blueprint = {
  id: 'bp_ops', role: UserRole.OPS, title: 'Bộ thu thập Phản hồi', description: 'Tự động phân loại phản hồi nhân viên và thông báo cho HR.', icon: 'chart',
  toolsInvolved: ['Typeform', 'Excel Online', 'Email'],
  steps: ['Thu thập dữ liệu qua Form', 'AI Phân tích Cảm xúc (Sentiment)', 'Gửi email các mục Khẩn cấp', 'Ghi log tất cả vào Excel'],
  goldenPrompt: 'Phân tích phản hồi này của nhân viên: "[Chèn Phản hồi]". 1. Xác định Cảm xúc (Tích cực/Trung lập/Tiêu cực). 2. Gán mức độ Khẩn cấp (Thấp/Trung bình/Cao). 3. Tóm tắt vấn đề cốt lõi trong một câu. (Trả lời bằng tiếng Việt)',
  guideContent: `QUY TRÌNH THIẾT LẬP HỆ THỐNG lẮNG NGHE

1. Thiết lập Typeform/Google Forms
   - Tạo khảo sát ẩn danh (hoặc công khai) với các câu hỏi mở về môi trường làm việc.
   - Ví dụ: "Điều gì làm bạn chưa hài lòng trong tuần qua?"

2. Excel Online / Google Sheets
   - Tạo file lưu trữ kết quả. Các cột: Thời gian, Nội dung phản hồi, Điểm cảm xúc (AI), Mức độ khẩn cấp (AI), Tóm tắt (AI).

3. Xây dựng Flow Tự động hóa
   - Trigger: Khi có phản hồi mới từ Form.
   - Action 1 (AI): Gọi API Gemini với Prompt Vàng. Input là nội dung phản hồi.
   - Action 2 (Excel): Ghi toàn bộ kết quả phân tích của AI vào các cột tương ứng trong file Excel.

4. Cấu hình Cảnh báo (Routing)
   - Thêm điều kiện (Condition/Filter): Nếu "Mức độ khẩn cấp" chứa chữ "Cao" HOẶC "Cảm xúc" là "Tiêu cực".
   - Action (Email): Gửi email ngay lập tức tới hrm@company.com với tiêu đề "[CẢNH BÁO] Phản hồi nhân viên cần chú ý".

5. Lợi ích
   - HR không cần đọc thủ công hàng trăm phản hồi.
   - Các vấn đề nghiêm trọng được phát hiện realtime.`
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
  },
  {
    id: 't4', role: UserRole.TECH, title: 'Tạo truy vấn SQL', description: 'Chuyển đổi yêu cầu văn bản thành SQL Query.', icon: 'database', category: 'Viết',
    inputs: [
      { id: 'schema', label: 'Cấu trúc bảng (Schema)', placeholder: 'users(id, name, email), orders(id, user_id, amount)...', multiline: true },
      { id: 'request', label: 'Yêu cầu truy vấn', placeholder: 'Lấy top 5 người dùng chi tiêu nhiều nhất tháng qua', multiline: false }
    ],
    systemPrompt: 'Đóng vai chuyên gia Database Administrator. Dựa trên schema và yêu cầu, hãy viết câu lệnh SQL tối ưu (PostgreSQL/MySQL standard). Giải thích ngắn gọn cách hoạt động của câu lệnh.'
  },
  {
    id: 't5', role: UserRole.TECH, title: 'Giải thích Regex', description: 'Phân tích và giải thích ý nghĩa của RegEx.', icon: 'code', category: 'Đọc',
    inputs: [{ id: 'regex', label: 'Biểu thức chính quy (Regex)', placeholder: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$', multiline: false }],
    systemPrompt: 'Hãy phân tích và giải thích chi tiết ý nghĩa của biểu thức chính quy (Regex) này. Giải thích từng thành phần và đưa ra ví dụ về chuỗi khớp và không khớp. Trả lời bằng tiếng Việt.'
  },
  {
    id: 't6', role: UserRole.TECH, title: 'Tối ưu hóa Code (Refactor)', description: 'Đề xuất cách viết code sạch và nhanh hơn.', icon: 'diff', category: 'Phân tích',
    inputs: [{ id: 'code', label: 'Đoạn mã cần tối ưu', placeholder: 'Dán code vào đây...', multiline: true }],
    systemPrompt: 'Đóng vai Senior Developer. Hãy review đoạn mã này và đề xuất phiên bản refactor tốt hơn (Clean Code). Tập trung vào tính dễ đọc, hiệu suất và khả năng bảo trì. Giải thích tại sao phiên bản mới tốt hơn. (Trả lời bằng tiếng Việt)'
  }
];

const techBlueprint: Blueprint = {
  id: 'bp_tech', role: UserRole.TECH, title: 'Báo cáo Standup Hàng ngày', description: 'Tổng hợp cập nhật của dev thành báo cáo cho PM.', icon: 'code',
  toolsInvolved: ['Slack', 'OpenAI/Gemini API', 'Jira'],
  steps: ['Dev đăng bài trong #standup', 'Bot thu thập tin nhắn lúc 5PM', 'AI tóm tắt tiến độ & khó khăn', 'Gửi Email cho PM'],
  goldenPrompt: 'Tóm tắt các cập nhật sau của lập trình viên thành một báo cáo trạng thái gọn gàng. Nhóm theo: 1. Nhiệm vụ đã hoàn thành, 2. Công việc đang làm, 3. Khó khăn/Rủi ro. Loại bỏ các thông tin tán gẫu rác. (Trả lời bằng tiếng Việt)',
  guideContent: `WORKFLOW TỰ ĐỘNG HÓA BÁO CÁO STANDUP

1. Quy định kênh Slack
   - Yêu cầu team Dev post update hàng ngày vào channel #daily-standup theo format định sẵn hoặc tự do.
   - Ví dụ: "Hôm qua làm A, hôm nay làm B, đang kẹt ở C".

2. Slack Workflow Builder (hoặc Script)
   - Tạo một Scheduled Workflow chạy vào 17:00 hàng ngày.
   - Step 1: Lấy lịch sử tin nhắn của channel #daily-standup trong 24h qua.

3. Xử lý dữ liệu (AI Layer)
   - Gom toàn bộ tin nhắn thành một đoạn văn bản dài.
   - Gửi tới Gemini API kèm "Golden Prompt" để AI lọc bỏ các tin nhắn chat chit không liên quan và cấu trúc lại thành bullet points.

4. Đầu ra (Output)
   - Gửi báo cáo tóm tắt đã format sạch đẹp vào channel #project-management để PM nắm tình hình.
   - (Mở rộng) Nếu AI phát hiện từ khóa "Blocker" hoặc "Kẹt", tự động tạo ticket Jira ở cột "To Do" và gán label "High Priority".`
};

/* --- AGGREGATION --- */

export const RECIPES: Recipe[] = [...productionRecipes, ...opsRecipes, ...techRecipes];
export const BLUEPRINTS: Blueprint[] = [productionBlueprint, opsBlueprint, techBlueprint];

export const ALL_RECIPES = [...RECIPES];