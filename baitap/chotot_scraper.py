from selenium import webdriver
from selenium.webdriver.common.by import By
import pymysql
import time

# Cấu hình trình duyệt chạy ẩn
options = webdriver.ChromeOptions()
# options.add_argument("--headless")  # Chạy không hiển thị trình duyệt
# options.add_argument("--disable-gpu")
# options.add_argument("--no-sandbox")

# Khởi động ChromeDriver
driver = webdriver.Chrome(options=options)

# Truy cập trang Chợ Tốt
url = "https://www.chotot.com/mua-ban-dien-thoai-apple-da-nang-sdmd1"
driver.get(url)

time.sleep(5)  # Chờ trang tải hoàn toàn

# Lấy danh sách sản phẩm
products = driver.find_elements(By.XPATH, "//div[@class='ListAds_ListAds__rEu_9 col-xs-12 no-padding'] //li[@itemprop=\"itemListElement\"]")

# Danh sách chứa dữ liệu
data = []

for product in products:
    try:
        # Lấy tên sản phẩm
        name = product.find_element(By.XPATH, "//h3[@class='adonovt']").text
        # Lấy giá sản phẩm
        price = product.find_element(By.XPATH, "//span[@class='bfe6oav tqqmhlc']").text
        print(name)
        print(price)
        data.append((name, price))
    except Exception as e:
        print("Lỗi khi lấy dữ liệu:", e)

driver.quit()  # Đóng trình duyệt

# Kết nối MySQL
# conn = pymysql.connect(
#     host="localhost", user="root", password="", database="chotot_db", charset="utf8mb4"
# )
# cursor = conn.cursor()

# # Tạo bảng nếu chưa có
# cursor.execute("""
# CREATE TABLE IF NOT EXISTS apple_products (
#     id INT AUTO_INCREMENT PRIMARY KEY,
#     name VARCHAR(255),
#     price VARCHAR(50)
# )
# """)

# # Chèn dữ liệu vào SQL
# sql = "INSERT INTO apple_products (name, price) VALUES (%s, %s)"
# cursor.executemany(sql, data)

# conn.commit()  # Lưu thay đổi
# cursor.close()
# conn.close()

print("Đã lưu dữ liệu vào database!")
