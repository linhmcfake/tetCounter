export default {
    onLoad() {
        this.interval = setInterval(() => this.update(), 1000);
    },

    onUnload() {
        clearInterval(this.interval);
    },

    getTetDate() {
        const year = new Date().getFullYear() + 1;
        return new Date(year, 0, 29);
    },

    update() {
        const now = new Date();
        const tet = this.getTetDate();
        const diff = tet - now;

        if (diff <= 0) {
            this.title = "Chúc mừng năm mới!";
        } else {
            const days = Math.floor(diff / 86400000);
            const hours = Math.floor((diff / 3600000) % 24);
            const minutes = Math.floor((diff / 60000) % 60);
            this.title = `Còn ${days} ngày ${hours} giờ ${minutes} phút tới Tết Âm`;
        }
    },

    settings() {
        return {
            title: "Tet Counter",
            items: [
                {
                    type: "text",
                    text: this.title || "Đang tải…"
                }
            ]
        }
    }
}
