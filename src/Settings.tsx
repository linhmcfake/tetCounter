import { storage } from "@vendetta/plugin";
import { showToast } from "@vendetta/ui/toasts";
import { findByProps } from "@vendetta/metro";
import { React, ReactNative } from "@vendetta/metro/common";
import { Forms as UiForms } from "@vendetta/ui/components";

const { ScrollView, View, Text, Pressable } = ReactNative;
const Forms = UiForms || findByProps("FormSection", "FormRow", "FormText") || {};
const { FormSection, FormRow, FormText } = Forms;
const ThemedText = FormText ?? Text;

// Bảng ngày Tết
const tetDates = [2024, 2, 10, 2025, 1, 29, 2026, 2, 17, 2027, 2, 6, 2028, 1, 26, 2029, 2, 13, 2030, 2, 3, 2031, 1, 23, 2032, 2, 11, 2033, 1, 31, 2034, 1, 19, 2035, 2, 8];

function getDaysToTet() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let tetYear = today.getFullYear();
    let tetDate;
    
    const findDate = (y) => {
        for (let i = 0; i < tetDates.length; i += 3) {
            if (tetDates[i] === y) return new Date(y, tetDates[i + 1] - 1, tetDates[i + 2]);
        }
        return new Date(y, 1, 1);
    };

    tetDate = findDate(tetYear);
    if (today > tetDate) tetDate = findDate(tetYear + 1);

    const diff = tetDate.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

// Giao diện Settings (Chuyển từ JSX sang JS thuần)
function Settings() {
    const days = getDaysToTet();
    const label = days === 0 ? "Hôm nay là Tết rồi! 🧧" : `Còn ${days} ngày nữa là Tết Âm Lịch!`;

    return React.createElement(ScrollView, { style: { flex: 1 } },
        React.createElement(FormSection, { title: "Tết Âm Lịch" },
            React.createElement(View, { style: { paddingHorizontal: 16, paddingVertical: 15 } },
                React.createElement(ThemedText, { style: { fontSize: 20, fontWeight: "700", color: "#ff4d4d" } }, label)
            ),
            React.createElement(View, { style: { paddingHorizontal: 16, paddingBottom: 20 } },
                React.createElement(Pressable, {
                    onPress: () => showToast(label),
                    style: ({ pressed }) => ({
                        backgroundColor: pressed ? "#d33c3c" : "#ff4d4d",
                        paddingVertical: 12,
                        borderRadius: 10,
                        alignItems: "center"
                    })
                }, React.createElement(Text, { style: { color: "white", fontSize: 16, fontWeight: "800" } }, "TEST NOTIFICATION"))
            )
        ),
        React.createElement(FormSection, { title: "About" },
            React.createElement(Forms.FormRow, { label: "Made by: linhmc_new" })
        )
    );
}

export default {
    onLoad() {
        const todayStr = new Date().toISOString().slice(0, 10);
        if (storage.lastShown !== todayStr) {
            const days = getDaysToTet();
            showToast(days === 0 ? "Chúc Mừng Năm Mới! 🧧🌸" : `Còn ${days} ngày nữa là Tết Âm Lịch! 🧧`);
            storage.lastShown = todayStr;
        }
    },
    settings: Settings
};
