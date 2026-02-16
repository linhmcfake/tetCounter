<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tet Counter - Status</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
            background-color: #fff5f5;
            color: #d33c3c;
            text-align: center;
        }
        .card {
            background: white;
            padding: 2rem;
            border-radius: 20px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            border: 2px solid #ff4d4d;
        }
        h1 { margin-bottom: 0.5rem; }
        p { color: #666; font-size: 1.2rem; }
        .status {
            display: inline-block;
            margin-top: 1rem;
            padding: 5px 15px;
            background: #4caf50;
            color: white;
            border-radius: 50px;
            font-size: 0.9rem;
        }
    </style>
</head>
<body>
    <div class="card">
        <h1>🧧 Tet Counter Plugin</h1>
        <p id="countdown">Đang tính toán ngày...</p>
        <div class="status">Plugin is Active</div>
    </div>

    <script>
        // Bảng ngày Tết từ source code của bạn
        const tetDates = [2024, 2, 10, 2025, 1, 29, 2026, 2, 17, 2027, 2, 6, 2028, 1, 26, 2029, 2, 13, 2030, 2, 3, 2031, 1, 23, 2032, 2, 11, 2033, 1, 31, 2034, 1, 19, 2035, 2, 8];

        function getDaysToTet() {
            const now = new Date();
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            let tetYear = today.getFullYear();
            let tetDate;

            for (let i = 0; i < tetDates.length; i += 3) {
                if (tetDates[i] === tetYear) {
                    tetDate = new Date(tetYear, tetDates[i + 1] - 1, tetDates[i + 2]);
                    break;
                }
            }

            if (!tetDate || today > tetDate) {
                tetYear++;
                for (let i = 0; i < tetDates.length; i += 3) {
                    if (tetDates[i] === tetYear) {
                        tetDate = new Date(tetYear, tetDates[i + 1] - 1, tetDates[i + 2]);
                        break;
                    }
                }
            }

            const diff = tetDate.getTime() - today.getTime();
            return Math.ceil(diff / (1000 * 60 * 60 * 24));
        }

        const days = getDaysToTet();
        document.getElementById('countdown').innerText = days === 0 
            ? "Chúc Mừng Năm Mới Bính Ngọ 2026! 🧧" 
            : `Còn ${days} ngày nữa là đến Tết Âm Lịch!`;
    </script>
</body>
</html>
