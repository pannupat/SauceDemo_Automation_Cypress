Manual Testing DemoQA Practice Form

Overview
ทดสอบ SauceDemo (https://www.saucedemo.com/)  
เพื่อฝึกการออกแบบ Test Case  ตั้งแต่ Positive, Negative, Boundary, ไปจนถึงหลายช่องผิดพร้อมกัน  

ทั้งหมดออกแบบไว้ 32 Test Case และรันจริงครบทุกเคส  


 Approach
- เขียน Test Case ลง Excel แยกชัดเจน (Module, TestID, TestCaseID, Preconditions, Steps, Expected/Actual, Status, Remarks / Attachments, Priority, Serverity)  เน้นให้ครอบคลุมทุก field
- รันทดสอบจริงบน Brave และบันทึกผล  
- บั๊กที่เจอ (Fail) ทำการรายงานลง Jira พร้อม Screenshot  

 Results
- Total: 32 เคส  
- Pass: 28 เคส  
- Fail: 4 เคส  

Reflection
สิ่งที่ได้เรียนรู้จากการเทสเว็บนี้คือ  
- การทำงานบางอย่างไม่มีการคัดกรองไว้อย่างถี่ถ้วนบางฟังก์ชันยังทำงานต่อได้แม้ใส่ข้อมูลไม่ตรงตามที่ควรจะเป็น 
- การออกแบบ Test Case ควรคิดทั้งมุม ใช้ทั่วไป และ Edge Cases ที่ Dev อาจมองข้าม  
- การบันทึกผลและรายงานบั๊กลง Jira ทำให้ traceability ชัดเจนขึ้น และต่อยอดไป Automation ได้ง่าย  

