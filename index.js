import { storage } from "@vendetta/plugin";
import { showToast } from "@vendetta/ui/toasts";
import { findByProps } from "@vendetta/metro";
import { React, ReactNative } from "@vendetta/metro/common";
import { Forms as UiForms } from "@vendetta/ui/components";

const { ScrollView, View, Text, Pressable } = ReactNative;
const Forms = UiForms || findByProps("FormSection", "FormRow", "FormText") || {};
const { FormSection, FormRow, FormText } = Forms;
const ThemedText = FormText ?? Text;

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

function Settings() {
    const days = getDaysToTet();
    const msg = days === 0 ? "Chúc Mừng Năm Mới! 🧧" : `Còn ${days} ngày nữa là Tết!`;
    return React.createElement(ScrollView, { style: { flex: 1 } },
        React.createElement(FormSection, { title: "Tết Âm Lịch" },
            React.createElement(View, { style: { padding: 16 } },
                React.createElement(ThemedText, { style: { fontSize: 20, fontWeight: "700", color: "#ff4d4d" } }, msg)
            ),
            React.createElement(Pressable, {
                onPress: () => showToast(msg),
                style: { backgroundColor: "#ff4d4d", padding: 12, margin: 16, borderRadius: 8, alignItems: "center" }
            }, React.createElement(Text, { style: { color: "#fff", fontWeight: "800" } }, "KIỂM TRA"))
        ),
        React.createElement(FormSection, { title: "About" },
            React.createElement(Forms.FormRow, { label: "Tác giả", subLabel: "linhmc_new" })
        )
    );
}

export default {
    onLoad: () => {
        const todayStr = new Date().toISOString().slice(0, 10);
        if (storage.lastShown !== todayStr) {
            const days = getDaysToTet();
            showToast(days === 0 ? "Chúc Mừng Năm Mới! 🧧🌸" : `Còn ${days} ngày nữa là Tết! 🧧`);
            storage.lastShown = todayStr;
        }
    },
    settings: Settings
};
