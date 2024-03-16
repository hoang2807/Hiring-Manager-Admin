import { Button, Card, Form, Input } from 'antd'
import { useState } from 'react'

const AboutUs = () => {
  const [status, setStatus] = useState<boolean>(false)
  const onEdit = () => {
    setStatus(!status)
  }

  const handleEdit = () => {
    onEdit()
  }

  const handleSave = () => {
    onEdit()
  }

  return (
    <Card>
      <Form layout='vertical'>
        <Form.Item label='Name'>
          <Input disabled={status} />
        </Form.Item>
        <Form.Item label='Email'>
          <Input type='email' disabled={status} />
        </Form.Item>
        <Form.Item label='Address'>
          <Input disabled={status} />
        </Form.Item>
        <Form.Item label='About me'>
          <Input.TextArea
            disabled={status}
            rows={6}
            maxLength={100}
            value='Công ty Cổ phần Smilee Việt Nam được thành lập vào ngày 08/10/2018 mục tiêu trở thành công ty về các nhãn hiệu chăm sóc sức khoẻ số 1 Đông Nam Á.

Năm 2019, Smilee vinh dự được bộ Khoa học & Công nghệ đầu tư, nhận giải thưởng Top Startup cuộc thi khởi nghiệp toàn cầu VietChallenge và Giải nhất cuộc thi WISE - Sáng kiến hỗ trợ Phụ nữ Khởi nghiệp và Kinh doanh năm 2019.

 06 giá trị cốt lõi tại Smilee Việt Nam

1. Học hỏi và cải tiến không ngừng

Luôn cởi mở, tiếp thu ý kiến đóng góp và cập nhật kiến thức liên tục không có điểm dừng

2. Kỷ luật thép

Lời nói và hành động luôn thống nhất với mục tiêu đặt ra, không để mục tiêu bị ảnh hưởng bởi bất kỳ yếu tố nào

3. Ngay thẳng - thẳng thắn

Sẵn sàng làm điều khó nhưng đúng đắn

4. Trách nhiệm cao - Quyết liệt

Tận tâm, tận tình, có trách nhiệm với công việc và quyết tâm hoàn thành mục tiêu đã đặt ra

5. Luôn vị mục tiêu chung

Luôn hành động vì mục tiêu chung, không dựa trên mục tiêu cá nhân nào khác

6. Tiêu chuẩn cao

Luôn so sánh với những cá nhân xuất sắc nhất trong lĩnh vực đang làm

'
          />
        </Form.Item>
        {status ? <Button onClick={handleSave}>Save</Button> : <Button onClick={handleEdit}>Edit</Button>}
        <Button type='primary' danger>
          Delete
        </Button>
      </Form>
    </Card>
  )
}

export default AboutUs
