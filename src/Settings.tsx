import { findByProps } from "@vendetta/metro";
import { React, ReactNative } from "@vendetta/metro/common";
import { Forms as UiForms } from "@vendetta/ui/components";
import { showToast } from "@vendetta/ui/toasts";

const { ScrollView, View, Text, Pressable } = ReactNative;

const Forms =
  UiForms ||
  findByProps(
    "FormSection",
    "FormRow",
    "FormText"
  ) ||
  {};

const { FormSection, FormRow, FormText } = Forms;
const ThemedText = FormText ?? Text;

// Same tet date table
const tetDates = [
  2024, 2, 10,
  2025, 1, 29,
  2026, 2, 17,
  2027, 2, 6,
  2028, 1, 26,
  2029, 2, 13,
  2030, 2, 3,
  2031, 1, 23,
  2032, 2, 11,
  2033, 1, 31,
  2034, 1, 19,
  2035, 2, 8
];

function getTetDate(year: number) {
  for (let i = 0; i < tetDates.length; i += 3) {
    if (tetDates[i] === year) {
      return new Date(year, tetDates[i + 1] - 1, tetDates[i + 2]);
    }
  }
  return new Date(year, 1, 1);
}

function getDays() {
  const now = new Date();
  let tet = getTetDate(now.getFullYear());
  if (now > tet) tet = getTetDate(now.getFullYear() + 1);
  return Math.ceil((tet.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export default function Settings() {
  const days = getDays();

  return (
    <ScrollView style={{ flex: 1 }}>
      <FormSection title="Tết Âm Lịch">
        <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
          <ThemedText style={{ fontSize: 22, fontWeight: "700" }}>
            Còn {days} ngày nữa là Tết Âm Lịch! 
          </ThemedText>
        </View>

        <View style={{ paddingHorizontal: 16, paddingBottom: 12 }}>
          <Pressable
            onPress={() => showToast(`Còn ${getDays()} ngày nữa là Tết Âm Lịch!`)}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "#d33c3c" : "#ff4d4d",
                paddingVertical: 10,
                borderRadius: 8,
                alignItems: "center"
              }
            ]}
          >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "700" }}>
              Test Notification
            </Text>
          </Pressable>
        </View>
      </FormSection>

      <FormSection title="About">
        <FormRow label="Made by: linhmc_new" />
      </FormSection>
    </ScrollView>
  );
}
